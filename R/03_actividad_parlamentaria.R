# Producción legislativa y control al Gobierno por legislatura -> data/actividad_parlamentaria.json
# Encargo del 20-10-2026 (A6). Métricas 1, 2, 5 y 6 en VIII, IX, X, XII, XIV y XV; método en editorial/fuentes/a06-viabilidad.md.
# Fuentes:
# - BOE, buscador del diario: leyes, leyes orgánicas y decretos-ley (sección I, Jefatura del Estado).
# - Diario de Sesiones del Pleno, sumarios: preguntas orales al presidente del Gobierno (caché de PDF de R/05).
# - Congreso, buscador de iniciativas: comparecencias de ministros en Pleno (210) y Comisión (213 y 214).

library(tidyverse)
library(jsonlite)

ua <- "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
rango <- c("VIII", "IX", "X", "XII", "XIV", "XV")
numero <- c(VIII = 8, IX = 9, X = 10, XII = 12, XIV = 14, XV = 15)
corte <- as.character(Sys.Date())

legislaturas <- fromJSON("data/legislaturas.json")$legislaturas |>
  as_tibble() |>
  filter(legislatura %in% rango) |>
  transmute(legislatura, inicio, fin_boe = coalesce(fin, corte), fin_anos = coalesce(fin, disolucion),
            anos = as.numeric(ymd(fin_anos) - ymd(inicio)) / 365.25)

# 1 y 2. BOE ---------------------------------------------------------------------------------------
# Por publicación: un Gobierno en funciones puede seguir publicando decretos-ley tras la disolución (hasta `corte`)

normas_boe <- \(desde, hasta) {
  q <- list(`campo[0]` = "ORIS", `dato[0][1]` = "1", `operador[0]` = "and",
            `campo[2]` = "DEM", `dato[2]` = "Jefatura del Estado", `operador[2]` = "and",
            `campo[6]` = "FPU", `dato[6][0]` = desde, `dato[6][1]` = hasta, `operador[6]` = "and",
            page_hits = "2000", `sort_field[0]` = "FPU", `sort_order[0]` = "asc", accion = "Buscar")
  items <- httr2::request("https://www.boe.es/buscar/boe.php") |>
    httr2::req_url_query(!!!q) |> httr2::req_user_agent(ua) |> httr2::req_perform() |>
    httr2::resp_body_string() |> rvest::read_html() |> rvest::html_elements("li.resultado-busqueda")
  stopifnot(length(items) < 2000)
  map_chr(items, \(i) rvest::html_text2(rvest::html_elements(i, "p"))[3])
}

boe <- legislaturas |>
  mutate(titulos = map2(inicio, fin_boe, normas_boe)) |>
  transmute(legislatura,
            leyes_organicas = map_int(titulos, \(t) sum(str_detect(t, "^Ley Orgánica \\d+/\\d{4}, de"))),
            leyes_ordinarias = map_int(titulos, \(t) sum(str_detect(t, "^Ley \\d+/\\d{4}, de"))),
            decretos_ley = map_int(titulos, \(t) sum(str_detect(t, "^Real Decreto-ley \\d+/\\d{4}, de"))))

# 5. Preguntas orales al presidente del Gobierno -----------------------------------------------------
# «Del diputado don X, del Grupo …, que formula al señor presidente del Gobierno»: cada pregunta sale dos veces en el
# sumario y un diputado no pregunta dos veces al presidente en una sesión, así que se cuentan nombres distintos

columnas <- \(w, ancho) {  # lector por columnas de los PDF `PL_`, el mismo de R/05
  w <- filter(w, y > max(y) * 0.06, y < max(y) * 0.97)
  tramos <- seq(ancho * 0.40, ancho * 0.62, 8)
  corte <- tramos[which.min(map_int(tramos, \(a) sum(w$x >= a & w$x < a + 8)))] + 4
  w |> mutate(col = as.integer(x >= corte)) |> arrange(col, y) |> group_by(col) |>
    mutate(linea = cumsum(c(1, diff(y) > 3))) |> ungroup() |> arrange(col, linea, x) |> pull(text) |> str_c(collapse = " ")
}

patron <- regex(str_c("de(?:l| la) diputad[oa] (?:don|doña|D\\.|D\\.ª) ([^,]{3,60}),[^¿]{0,200}?formula al ",
                      "(?:(?:se(?:ñ|n)or|Sr\\.?|Excmo\\.? (?:Sr\\.?|se(?:ñ|n)or)) )?president[ea] del Gobierno"), ignore_case = TRUE)

sumario <- \(f) {
  tmp <- tempfile(fileext = ".pdf")
  qpdf::pdf_subset(f, pages = seq_len(min(pdftools::pdf_info(f)$pages, 12)), output = tmp)
  t <- if (str_starts(basename(f), "PL_"))
    map2_chr(pdftools::pdf_data(tmp), pdftools::pdf_pagesize(tmp)$width, \(w, a) if (nrow(w)) columnas(w, a) else "") |> str_flatten(" ")
  else str_flatten(pdftools::pdf_text(tmp), " ")
  unlink(tmp)
  str_squish(str_remove_all(t, "-\\s+(?=[a-záéíóúñ])"))
}

preguntas_diario <- \(f) str_match_all(sumario(f), patron)[[1]][, 2] |>
  str_squish() |> str_to_lower() |> (\(x) coalesce(word(x, 1, 3), x))() |> unique() |> length()

preguntas <- map(rango, \(leg) {
  fs <- list.files(file.path(tools::R_user_dir("juegos29n", "cache"), "ds", numero[[leg]]), "\\.PDF$", full.names = TRUE)
  stopifnot(length(fs) > 0)
  tibble(legislatura = leg, diario = basename(fs), preguntas = map_int(fs, preguntas_diario))
}) |>
  list_rbind()

control <- preguntas |>
  summarise(diarios = n(), sesiones_con_preguntas = sum(preguntas > 0), preguntas_presidente = sum(preguntas),
            sesiones_mas_de_tres = sum(preguntas > 3), .by = legislatura)

# 6. Comparecencias de ministros -------------------------------------------------------------------
# Solicitudes atendidas («Tramitado por completo») cuyo título nombra a un ministro, una vicepresidencia o la
# Presidencia del Gobierno; Pleno y Comisión juntos (decisión del 20-10)

url_iniciativas <- str_c("https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=2",
                         "&p_p_state=normal&p_p_mode=view&p_p_resource_id=filtrarListado&p_p_cacheability=cacheLevelPage")

pagina <- \(leg, tipo, p) {
  Sys.sleep(0.3)
  httr2::request(url_iniciativas) |> httr2::req_user_agent(ua) |>
    httr2::req_body_form(`_iniciativas_legislatura` = leg, `_iniciativas_tipo` = tipo, `_iniciativas_paginaActual` = p) |>
    httr2::req_retry(max_tries = 4) |> httr2::req_perform() |> httr2::resp_body_string() |> fromJSON(simplifyVector = FALSE)
}

# El buscador a veces devuelve páginas vacías sin dar error: se repite la descarga hasta que cuadra con el total
iniciativas <- \(leg, tipo, intentos = 4) {
  n <- as.integer(pagina(leg, tipo, 1)$iniciativas_encontradas)
  x <- map(seq_len(ceiling(n / 25)), \(p) pagina(leg, tipo, p)$lista_iniciativas) |>
    list_flatten() |>
    map(\(i) tibble(titulo = i$titulo, resultado = i$resultado_tram %||% NA_character_)) |>
    list_rbind()
  if (nrow(x) == n) return(mutate(x, tipo = tipo))
  stopifnot(intentos > 1)
  iniciativas(leg, tipo, intentos - 1)
}

comparecencias <- expand_grid(legislatura = rango, tipo = c("210", "213", "214")) |>
  mutate(datos = map2(legislatura, tipo, \(l, t) iniciativas(numero[[l]], t))) |>
  select(-tipo) |>
  unnest(datos) |>
  filter(str_detect(titulo, regex("minist|vicepresident|presidente del gobierno", ignore_case = TRUE)),
         str_detect(coalesce(resultado, ""), "Tramitado por completo")) |>
  count(legislatura, tipo) |>
  pivot_wider(names_from = tipo, values_from = n, values_fill = 0) |>
  transmute(legislatura, comparecencias_pleno = `210`, comparecencias_comision = `213` + `214`,
            comparecencias = comparecencias_pleno + comparecencias_comision)

# Salida ------------------------------------------------------------------------------------------

salida <- legislaturas |>
  left_join(boe, "legislatura") |>
  left_join(control, "legislatura") |>
  left_join(comparecencias, "legislatura") |>
  mutate(leyes = leyes_organicas + leyes_ordinarias,
         leyes_por_ano = round(leyes / anos, 1),
         pct_decretos_ley = round(100 * decretos_ley / (leyes + decretos_ley), 1),
         anos = round(anos, 2)) |>
  select(legislatura, inicio, fin = fin_anos, anos, leyes_organicas, leyes_ordinarias, leyes, leyes_por_ano,
         decretos_ley, pct_decretos_ley, preguntas_presidente, sesiones_con_preguntas, sesiones_mas_de_tres,
         diarios, comparecencias_pleno, comparecencias_comision, comparecencias)

stopifnot(nrow(salida) == length(rango), !anyNA(salida))

list(
  corte = corte,
  rango = "VIII, IX, X, XII, XIV y XV: las legislaturas con investidura. La XI y la XIII quedan fuera por cortas (decisión del 20-10).",
  notas = list(
    anos = "De la sesión constitutiva al día anterior a la siguiente; en la XV, hasta la disolución.",
    leyes = "Leyes y leyes orgánicas publicadas en el BOE dentro de las fechas de la legislatura (en la XV, hasta `corte`).",
    pct_decretos_ley = "Decretos-ley / (leyes + leyes orgánicas + decretos-ley). Sin reales decretos legislativos (decisión del 20-10).",
    preguntas_presidente = "Preguntas orales al presidente del Gobierno en el Pleno, contadas en el sumario del Diario de Sesiones. Pendiente de validación manual de las sesiones con más de tres preguntas (sesiones_mas_de_tres).",
    comparecencias = "Solicitudes de comparecencia de ministros, vicepresidencias o la Presidencia del Gobierno tramitadas por completo, en Pleno (210) y en Comisión (213 y 214). Mide solicitudes atendidas, no sesiones."
  ),
  legislaturas = salida
) |>
  write_json("data/actividad_parlamentaria.json", auto_unbox = TRUE, pretty = TRUE, digits = NA)
