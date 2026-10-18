# Llamadas al orden en el Pleno del Congreso -> data/llamadas_al_orden.json
# Unidad: acto de llamada (editorial/decisiones.md, 15-10-2026). Fórmula ampliada y rango: 18-10-2026
# (solo legislaturas con investidura: fuera la XI y la XIII).

library(tidyverse)
library(pdftools)
library(jsonlite)

legs <- c(8, 9, 10, 12, 14, 15)
cache <- \(leg) {
  d <- file.path(tools::R_user_dir("juegos29n", "cache"), "ds", leg)
  dir.create(d, recursive = TRUE, showWarnings = FALSE)
  d
}

# Hasta el diario 53 de la X, PL_<nnn>.PDF a dos columnas; después, DSCD-<leg>-PL-<n>.PDF
nombre <- \(leg, n, parte = "") {
  if (leg >= 11 || (leg == 10 && n >= 54)) sprintf("DSCD-%d-PL-%d%s.PDF", leg, n, parte) else sprintf("PL_%03d.PDF", n)
}
url_ds <- \(leg, n, parte = "") sprintf("https://www.congreso.es/public_oficiales/L%d/CONG/DS/PL/%s", leg, nombre(leg, n, parte))

# El servidor devuelve 403 sin User-Agent de navegador y, si se le pide más de un PDF por segundo,
# páginas de bloqueo con estado 200: se espera y se repite en lugar de tomarlas por huecos
descarga_url <- \(leg, n, parte = "") {
  f <- file.path(cache(leg), nombre(leg, n, parte))
  if (file.exists(f)) return(f)
  for (i in 1:12) {
    Sys.sleep(runif(1, 2, 4))
    r <- tryCatch(
      httr2::request(url_ds(leg, n, parte)) |>
        httr2::req_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)") |>
        httr2::req_error(is_error = \(r) FALSE) |>
        httr2::req_perform(),
      error = \(e) NULL
    )
    if (!is.null(r) && httr2::resp_status(r) == 404) return(NA_character_)
    b <- if (is.null(r)) raw() else httr2::resp_body_raw(r)
    if (length(b) > 4 && identical(b[1:4], charToRaw("%PDF"))) {
      writeBin(b, f)
      return(f)
    }
    Sys.sleep(60 * i)
  }
  stop("bloqueo persistente en ", url_ds(leg, n, parte))
}

# Algunas sesiones se publican partidas (DSCD-15-PL-23-C1.PDF, -C2…) en lugar del diario entero,
# y no siempre desde -C1 (la constitutiva de la XIII solo está como DSCD-13-PL-1-C2.PDF)
descarga <- \(leg, n) {
  f <- descarga_url(leg, n)
  if (!is.na(f) || str_starts(nombre(leg, n), "PL_")) return(na.omit(f))
  na.omit(map_chr(str_c("-C", 1:4), \(p) descarga_url(leg, n, p)))
}

# La numeración tiene huecos: se para tras diez números seguidos sin diario
diarios <- \(leg) {
  ficheros <- character()
  n <- 1
  fallos <- 0
  while (fallos < 10) {
    f <- descarga(leg, n)
    fallos <- if (length(f) == 0) fallos + 1 else 0
    ficheros <- c(ficheros, f)
    n <- n + 1
  }
  ficheros
}

meses <- c("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
           "agosto", "septiembre", "octubre", "noviembre", "diciembre")
fecha_iso <- \(x) {
  m <- str_match(x, "(\\d{1,2}) de (\\w+) de (\\d{4})")
  sprintf("%s-%02d-%02d", m[, 4], match(str_to_lower(m[, 3]), meses), as.integer(m[, 2]))
}

cabecera <- "^DIARIO DE SESIONES DEL CONGRESO DE LOS DIPUTADOS PLENO Y DIPUTACIÓN PERMANENTE Núm\\. \\d+ .{0,30}? Pág\\. \\d+ "
cve <- "cve: DSCD-\\d+-PL-\\d+ ?"
pagina <- "§(\\d+)§ "
orador <- "(?:El señor|La señora) [A-ZÁÉÍÓÚÜÑ][A-ZÁÉÍÓÚÜÑ\\-]+(?: (?:DE |DEL |LA |LOS |Y |I )?[A-ZÁÉÍÓÚÜÑ][A-ZÁÉÍÓÚÜÑ\\-]+)*(?: \\([^)]{1,80}\\))?:"
mesa <- "^(?:El señor|La señora) VI(?:CE)?PRESIDENT[EA](?: PRIMER[OA]| SEGUND[OA]| TERCER[OA]| CUART[OA])?(?: \\([^)]+\\))?:$|^(?:El señor|La señora) PRESIDENT[EA](?: \\([^)]+\\))?:$"

# PDF PL_ a dos columnas: sin cabecera ni folio, corte por el tramo central con menos comienzos de
# palabra y lectura columna a columna
columnas <- \(w, ancho) {
  w <- filter(w, y > max(y) * 0.06, y < max(y) * 0.97)
  tramos <- seq(ancho * 0.40, ancho * 0.62, 8)
  corte <- tramos[which.min(map_int(tramos, \(a) sum(w$x >= a & w$x < a + 8)))] + 4
  w |>
    mutate(col = as.integer(x >= corte)) |>
    arrange(col, y) |>
    group_by(col) |>
    mutate(linea = cumsum(c(1, diff(y) > 3))) |>
    ungroup() |>
    arrange(col, linea, x) |>
    pull(text) |>
    str_c(collapse = " ")
}

# Fórmula y perífrasis con valor de llamada («le tengo que llamar al orden», «le voy a llamar al orden»,
# «me obliga a llamarle al orden», «llamo al orden al señor…»). Las coincidencias de las perífrasis
# se revisan a mano: los avisos condicionales van a `descartes`
llamada <- regex(str_c(
  "\\bl(?:e|es|a|o|os|as) llamo (?:\\w+ ){0,3}al orden",
  "(?:queda|quedan|está|están) llamad[oa]s? al orden",
  "\\b(?:tengo|voy|vuelvo) (?:que |a )?llamarl?(?:[eao]s?)? (?:\\w+ ){0,2}al orden",
  "\\bme obligan? a llamarl[eao]s? (?:\\w+ ){0,2}al orden",
  "\\bllamo (?:\\w+ ){0,3}al orden",
  sep = "|"
), ignore_case = TRUE)
previa <- regex("\\bllam\\w*(?: \\w+){0,3} al orden", ignore_case = TRUE)

# Por memoria, de cada diario solo se guardan la primera fila (sesión, fecha y presidencia para el
# denominador) y las intervenciones de la mesa que mencionan llamar al orden, en una caché por diario
lee <- \(leg, f) {
  rds <- str_c(f, ".lee.rds")
  if (file.exists(rds)) return(readRDS(rds))
  hojas <- str_squish(str_remove_all(pdf_text(f), "­"))
  dos_columnas <- str_starts(basename(f), "PL_")
  cuerpo <- if (dos_columnas) {
    map2_chr(pdf_data(f), pdf_pagesize(f)$width, \(w, a) if (nrow(w)) columnas(w, a) else "") |>
      str_remove("^Congreso ")
  } else {
    str_remove_all(str_remove(hojas, cabecera), cve)
  }
  # Una hoja sin folio (en blanco, láminas) toma el de la anterior; con NA se perdería el diario entero
  num <- if (dos_columnas) str_match(hojas, "(\\d+)$")[, 2] else str_match(hojas, "Pág\\. (\\d+)")[, 2]
  num <- vctrs::vec_fill_missing(num, direction = "downup")
  # Palabras partidas a final de línea («al or- den»)
  texto <- str_c("§", num, "§ ", cuerpo, collapse = " ") |>
    str_remove_all("­") |>
    str_replace_all("(\\p{Ll})- (\\p{Ll})", "\\1\\2")
  marcas <- str_locate_all(texto, pagina)[[1]][, 1]
  ini <- str_locate_all(texto, orador)[[1]]
  t <- tibble(
    legislatura = leg,
    diario = as.integer(str_match(basename(f), "PL[_-](\\d+)")[, 2]),
    parte = basename(f),
    sesion = as.integer(str_match(hojas[1], "Sesión (?:[Pp]lenaria )?núm\\. (\\d+)")[, 2]),
    fecha = fecha_iso(str_match(hojas[1], "celebrada el \\w+,? (\\d{1,2} de \\w+ de \\d{4})")[, 2]),
    preside = str_to_title(str_match(hojas[1], regex("PRESIDENCIA .{0,25}?\\bD\\.ª? (.+?) Sesión", ignore_case = TRUE))[, 2]),
    orador = str_sub(texto, ini[, 1], ini[, 2]),
    pagina_inicio = str_match(str_sub(texto, marcas[findInterval(ini[, 1], marcas)], ini[, 1]), pagina)[, 2],
    texto = str_sub(texto, ini[, 2] + 1, lead(ini[, 1], default = nchar(texto) + 1) - 1)
  ) |>
    filter(row_number() == 1 | (str_detect(orador, mesa) & str_detect(texto, previa)))
  saveRDS(t, rds)
  t
}

# Solo sesiones plenarias: los diarios de la Diputación Permanente no llevan número de sesión plenaria
# («Sesión plenaria núm. N» o, en algunas portadas, «Sesión núm. N»).
# Las partes -C2… de un diario toman la sesión, fecha y presidencia de la primera.
intervenciones <- map(legs, \(leg) map(diarios(leg), \(f) lee(leg, f), .progress = str_c("L", leg))) |>
  list_flatten() |>
  list_rbind() |>
  arrange(legislatura, diario, parte) |>
  group_by(legislatura, diario) |>
  fill(sesion, fecha, preside) |>
  ungroup() |>
  filter(!is.na(sesion)) |>
  # Errata de portada: el diario 87 de la VIII (28-04-2005) dice «Sesión plenaria núm. 81», como el 86
  mutate(sesion = if_else(legislatura == 8 & diario == 87, 82L, sesion), id = row_number())

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
                       str_extract(str_sub(texto, pmax(start - 20, 1), start - 1), "primera|segunda|tercera")),
    cita = limpio(str_sub(texto, pmax(start - 80, 1), end))
  )

# Revisión manual (decisión del 18-10-2026): avisos condicionales y negaciones que la fórmula recoge.
# Se quitan antes de fusionar, para que no unan dos actos ni abran uno con otro ordinal.
# Cada `literal` es el final del texto de una sola coincidencia.
descartes <- tribble(
  ~legislatura, ~diario, ~pagina, ~literal, ~motivo,
  8, 49, "2275", "a pesar de que llamo al orden", "mención genérica",
  8, 84, "4150", "Si no lo retira le llamo al orden", "aviso condicional",
  9, 239, "11", "no llamo a su señoría al orden", "negación",
  9, 256, "18", "A la próxima le llamo al orden", "aviso condicional",
  10, 140, "35", "si no lo hace, la llamo al orden", "aviso condicional",
  10, 267, "43", "no le voy a llamar al orden", "negación",
  10, 306, "115", "como siga así le voy a llamar al orden", "aviso condicional",
  12, 22, "23", "no llamo al orden", "negación",
  12, 132, "49", "si tengo que llamar a alguno al orden", "aviso condicional",
  12, 156, "41", "si le tengo que llamar al orden", "aviso condicional",
  15, 43, "32", "si le tengo que llamar al orden", "aviso condicional",
  15, 177, "59", "si le tengo que llamar al orden", "aviso condicional",
  15, 207, "22", "Si tengo que llamarla al orden", "aviso condicional"
)
fuera <- pmap(descartes, \(legislatura, diario, pagina, literal, motivo) which(
  coincidencias$legislatura == legislatura & coincidencias$diario == diario &
    coincidencias$pagina == pagina & str_ends(coincidencias$cita, fixed(literal))))
stopifnot(lengths(fuera) == 1)
coincidencias <- coincidencias[-unlist(fuera), ]

# Fusión: misma intervención, a 150 caracteres o menos, sin nombrar a otra persona entre medias
# y sin cambio de ordinal («primera» -> «segunda» son dos llamadas). Fusión a mano a más distancia:
# XV, DS 43, pág. 32, la misma «primera vez» a Tellado repetida (decisión del autor, 18-10-2026).
# Las llamadas colectivas («les voy a llamar al orden», XII, DS 61) cuentan como acto
a_mano <- tibble(legislatura = 15, diario = 43, pagina = "32")
otro_nombre <- \(hueco, destinatario) {
  apellido <- str_match(destinatario, nombrado)[, 2]
  nombres <- str_match_all(hueco, nombrado)[[1]][, 2]
  any(is.na(apellido) & length(nombres) > 0, !is.na(apellido) & nombres != apellido)
}

actos <- coincidencias |>
  left_join(mutate(a_mano, fusion = TRUE), by = c("legislatura", "diario", "pagina")) |>
  group_by(id) |>
  arrange(start, .by_group = TRUE) |>
  mutate(
    hueco = limpio(str_sub(texto, lag(end, default = 0) + 1, start - 1)),
    ordinal_previo = lag(accumulate(ordinal, \(a, b) coalesce(b, a))),
    nuevo = row_number() == 1 | (nchar(hueco) > 150 & is.na(fusion)) |
      map2_lgl(hueco, lag(destinatario), otro_nombre) |
      coalesce(ordinal != ordinal_previo, FALSE),
    acto = cumsum(nuevo)
  ) |>
  group_by(id, acto) |>
  summarise(
    legislatura = as.character(as.roman(first(legislatura))),
    diario = first(diario), sesion = first(sesion), fecha = first(fecha), pagina = as.integer(first(pagina)),
    presidencia = if_else(str_detect(first(orador), "\\("), str_match(first(orador), "\\((.+)\\)")[, 2], first(preside)),
    cargo = if_else(str_detect(first(orador), "VI(?:CE)?PRESIDENT"), "Vicepresidencia", "Presidencia"),
    destinatario = first(destinatario),
    ordinal = first(na.omit(ordinal)),
    coincidencias = n(),
    fragmento = limpio(str_sub(first(texto), max(first(start) - 160, 1), last(end) + 60)),
    .groups = "drop"
  ) |>
  arrange(id, acto) |>
  select(-id, -acto)

resumen <- intervenciones |>
  group_by(legislatura) |>
  summarise(diarios = n_distinct(diario), sesiones_plenarias = n_distinct(sesion)) |>
  mutate(legislatura = as.character(as.roman(legislatura))) |>
  left_join(count(actos, legislatura, name = "llamadas"), by = "legislatura") |>
  mutate(llamadas = coalesce(llamadas, 0L))

list(
  fuente = "Diario de Sesiones del Congreso de los Diputados, Pleno (PDF)",
  url = "https://www.congreso.es/public_oficiales/L<legislatura>/CONG/DS/PL/",
  consulta = as.character(Sys.Date()),
  metodo = "Acto de llamada al orden pronunciado por la Presidencia o una Vicepresidencia en sesión plenaria, con la fórmula («le llamo al orden») o una perífrasis con valor de llamada («le tengo que llamar al orden», «le voy a llamar al orden», «me obliga a llamarle al orden», «llamo al orden al señor…»). Repeticiones a 150 caracteres o menos dentro de la misma intervención se fusionan si entre ellas no se nombra a otra persona ni cambia el ordinal; a mano, también la repetición de la XV, DS 43, pág. 32 (ver `fusiones_a_mano`). Las llamadas colectivas («les voy a llamar al orden») cuentan. No cuentan avisos (tampoco los condicionales, descontados a mano: ver `descartes`), menciones a llamadas previas, retiradas de expresiones ni sesiones de la Diputación Permanente. Solo legislaturas con investidura.",
  legislaturas = resumen,
  descartes = mutate(descartes, legislatura = as.character(as.roman(legislatura))),
  fusiones_a_mano = mutate(a_mano, legislatura = as.character(as.roman(legislatura))),
  actos = actos
) |>
  write_json("data/llamadas_al_orden.json", auto_unbox = TRUE, pretty = TRUE, na = "null")
