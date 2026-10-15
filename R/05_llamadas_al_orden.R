# Llamadas al orden en el Pleno del Congreso, XV legislatura -> data/llamadas_al_orden.json
# Unidad: acto de llamada (editorial/decisiones.md, 15-10-2026).

library(tidyverse)
library(pdftools)
library(jsonlite)

leg <- 15
cache <- file.path(tools::R_user_dir("juegos29n", "cache"), "ds", leg)
dir.create(cache, recursive = TRUE, showWarnings = FALSE)

url_ds <- \(n) sprintf("https://www.congreso.es/public_oficiales/L%d/CONG/DS/PL/DSCD-%d-PL-%d.PDF", leg, leg, n)

# El servidor devuelve 403 sin User-Agent de navegador
descarga <- \(n) {
  f <- file.path(cache, basename(url_ds(n)))
  if (file.exists(f)) return(f)
  tryCatch({
    httr2::request(url_ds(n)) |>
      httr2::req_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)") |>
      httr2::req_retry(max_tries = 3) |>
      httr2::req_perform(path = f)
    f
  }, error = \(e) { unlink(f); NA_character_ })
}

# La numeración tiene huecos: se para tras diez números seguidos sin diario
ficheros <- character()
n <- 1
fallos <- 0
while (fallos < 10) {
  f <- descarga(n)
  fallos <- if (is.na(f)) fallos + 1 else 0
  ficheros <- c(ficheros, na.omit(f))
  n <- n + 1
}

meses <- c("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
           "agosto", "septiembre", "octubre", "noviembre", "diciembre")
fecha_iso <- \(x) {
  m <- str_match(x, "(\\d{1,2}) de (\\w+) de (\\d{4})")
  sprintf("%s-%02d-%02d", m[, 4], match(m[, 3], meses), as.integer(m[, 2]))
}

cabecera <- "^DIARIO DE SESIONES DEL CONGRESO DE LOS DIPUTADOS PLENO Y DIPUTACIÓN PERMANENTE Núm\\. \\d+ .{0,30}? Pág\\. \\d+ "
cve <- "cve: DSCD-\\d+-PL-\\d+ ?"
pagina <- "§(\\d+)§ "
orador <- "(?:El señor|La señora) [A-ZÁÉÍÓÚÜÑ][A-ZÁÉÍÓÚÜÑ\\-]+(?: (?:DE |DEL |LA |LOS |Y |I )?[A-ZÁÉÍÓÚÜÑ][A-ZÁÉÍÓÚÜÑ\\-]+)*(?: \\([^)]{1,80}\\))?:"
mesa <- "^(?:El señor|La señora) VI(?:CE)?PRESIDENT[EA](?: PRIMER[OA]| SEGUND[OA]| TERCER[OA]| CUART[OA])?(?: \\([^)]+\\))?:$|^(?:El señor|La señora) PRESIDENT[EA](?: \\([^)]+\\))?:$"

lee <- \(f) {
  hojas <- str_squish(pdf_text(f))
  sesion <- as.integer(str_match(hojas[1], "Sesión plenaria núm\\. (\\d+)")[, 2])
  texto <- str_c("§", str_match(hojas, "Pág\\. (\\d+)")[, 2], "§ ",
                 str_remove_all(str_remove(hojas, cabecera), cve), collapse = " ")
  marcas <- str_locate_all(texto, pagina)[[1]][, 1]
  ini <- str_locate_all(texto, orador)[[1]]
  tibble(
    diario = as.integer(str_extract(basename(f), "\\d+(?=\\.PDF)")),
    sesion = sesion,
    fecha = fecha_iso(str_match(hojas[1], "celebrada el \\w+ (\\d{1,2} de \\w+ de \\d{4})")[, 2]),
    preside = str_to_title(str_match(hojas[1], "PRESIDENCIA DE (?:LA EXCMA\\. SRA\\. D\\.ª|EL EXCMO\\. SR\\. D\\.) (.+?) Sesión")[, 2]),
    orador = str_sub(texto, ini[, 1], ini[, 2]),
    pagina_inicio = str_match(str_sub(texto, marcas[findInterval(ini[, 1], marcas)], ini[, 1]), pagina)[, 2],
    texto = str_sub(texto, ini[, 2] + 1, lead(ini[, 1], default = nchar(texto) + 1) - 1)
  )
}

# Solo sesiones plenarias: los diarios de la Diputación Permanente no llevan número de sesión plenaria
intervenciones <- map(ficheros, lee, .progress = TRUE) |>
  list_rbind() |>
  filter(!is.na(sesion)) |>
  mutate(id = row_number())

llamada <- regex("\\bl(?:e|es|a|o|os|as) llamo (?:\\w+ ){0,3}al orden|queda(?:n)? llamad[oa]s? al orden", ignore_case = TRUE)
nombrado <- "(?:[Ss]eñor|[Ss]eñora) (?:de |del |De |Del )?([A-ZÁÉÍÓÚÑ][\\wáéíóúñü]+)"
limpio <- \(x) str_squish(str_remove_all(x, pagina))

coincidencias <- intervenciones |>
  filter(str_detect(orador, mesa), str_detect(texto, llamada)) |>
  mutate(m = map(str_locate_all(texto, llamada), as_tibble)) |>
  unnest(m) |>
  mutate(
    pagina = map2_chr(str_sub(texto, 1, start), pagina_inicio, \(x, p) coalesce(last(str_match_all(x, pagina)[[1]][, 2]), p)),
    antes = limpio(str_sub(texto, pmax(start - 120, 1), start - 1)),
    destinatario = map_chr(str_extract_all(antes, str_c(nombrado, "|[Ss]eñoría|[Ss]eñor diputado|[Ss]eñora diputada")), \(x) last(x) %||% NA_character_),
    ordinal = coalesce(str_extract(str_sub(texto, start, end + 25), "primera|segunda|tercera"),
                       str_extract(str_sub(texto, pmax(start - 20, 1), start - 1), "primera|segunda|tercera"))
  )

# Fusión: misma intervención, a 150 caracteres o menos, sin nombrar a otra persona entre medias
# y sin cambio de ordinal («primera» -> «segunda» son dos llamadas)
otro_nombre <- \(hueco, destinatario) {
  apellido <- str_match(destinatario, nombrado)[, 2]
  nombres <- str_match_all(hueco, nombrado)[[1]][, 2]
  any(is.na(apellido) & length(nombres) > 0, !is.na(apellido) & nombres != apellido)
}

actos <- coincidencias |>
  group_by(id) |>
  arrange(start, .by_group = TRUE) |>
  mutate(
    hueco = limpio(str_sub(texto, lag(end, default = 0) + 1, start - 1)),
    ordinal_previo = lag(accumulate(ordinal, \(a, b) coalesce(b, a))),
    nuevo = row_number() == 1 | nchar(hueco) > 150 | map2_lgl(hueco, lag(destinatario), otro_nombre) |
      coalesce(ordinal != ordinal_previo, FALSE),
    acto = cumsum(nuevo)
  ) |>
  group_by(id, acto) |>
  summarise(
    diario = first(diario), sesion = first(sesion), fecha = first(fecha), pagina = as.integer(first(pagina)),
    presidencia = if_else(str_detect(first(orador), "\\("), str_match(first(orador), "\\((.+)\\)")[, 2], first(preside)),
    cargo = if_else(str_detect(first(orador), "VI(?:CE)?PRESIDENT"), "Vicepresidencia", "Presidencia"),
    destinatario = first(destinatario),
    ordinal = first(na.omit(ordinal)),
    coincidencias = n(),
    fragmento = limpio(str_sub(first(texto), max(first(start) - 160, 1), last(end) + 60)),
    .groups = "drop"
  ) |>
  arrange(diario, id, acto) |>
  select(-id, -acto)

list(
  legislatura = "XV",
  fuente = "Diario de Sesiones del Congreso de los Diputados, Pleno (PDF)",
  url = sprintf("https://www.congreso.es/public_oficiales/L%d/CONG/DS/PL/", leg),
  consulta = as.character(Sys.Date()),
  metodo = "Acto de llamada al orden pronunciado por la Presidencia o una Vicepresidencia en sesión plenaria. Repeticiones de la fórmula a 150 caracteres o menos dentro de la misma intervención se fusionan si entre ellas no se nombra a otra persona ni cambia el ordinal. No cuentan avisos, menciones a llamadas previas, retiradas de expresiones ni sesiones de la Diputación Permanente.",
  diarios = n_distinct(intervenciones$diario),
  sesiones_plenarias = n_distinct(intervenciones$sesion),
  llamadas = nrow(actos),
  actos = actos
) |>
  write_json("data/llamadas_al_orden.json", auto_unbox = TRUE, pretty = TRUE, na = "null")
