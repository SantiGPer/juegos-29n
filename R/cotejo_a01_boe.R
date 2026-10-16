# Cotejo legal de A1: texto literal vigente de los artículos citados -> editorial/fuentes/a01-cotejo-boe.md
# Encargo de editorial/decisiones.md (15-10-2026). Caché de XML fuera del repo.

library(tidyverse)
library(xml2)

cache <- file.path(tools::R_user_dir("juegos29n", "cache"), "boe")
dir.create(cache, recursive = TRUE, showWarnings = FALSE)

api <- "https://www.boe.es/datosabiertos/api/legislacion-consolidada/id/"

# Mismo User-Agent de navegador que el scraping del Diario de Sesiones
descarga <- \(id) {
  f <- file.path(cache, str_c(id, ".xml"))
  if (!file.exists(f)) {
    httr2::request(str_c(api, id, "/texto")) |>
      httr2::req_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)") |>
      httr2::req_headers(Accept = "application/xml") |>
      httr2::req_retry(max_tries = 3) |>
      httr2::req_perform(path = f)
  }
  read_xml(f)
}

normas <- tibble(
  id = c("BOE-A-1985-11672", "BOE-A-1978-31229"),
  nombre = c("LOREG (Ley Orgánica 5/1985)", "Constitución Española"),
  corto = c("LOREG", "CE")
) |>
  mutate(
    xml = map(id, descarga),
    descarga = map_chr(id, \(i) format(file.mtime(file.path(cache, str_c(i, ".xml"))), "%d-%m-%Y")),
    ultima = map_chr(xml, \(x) max(xml_attr(xml_find_all(x, "//version"), "fecha_publicacion"))),
    url = str_c("https://www.boe.es/buscar/act.php?id=", id)
  )

citas <- tribble(
  ~corto,  ~bloque,                 ~articulo, ~apartado, ~letra, ~preguntas,
  "LOREG", "asesentaynueve",        "69",      "7",       NA,     "3",
  "LOREG", "asetentaydos",          "72",      NA,        NA,     "2",
  "LOREG", "asetentaycinco",        "75",      "1",       NA,     "6",
  "LOREG", "acientosesentaydos",    "162",     "2",       NA,     "1",
  "LOREG", "acientosesentaydos",    "162",     "3",       NA,     "1",
  "LOREG", "acientosesentaytres",   "163",     "1",       "a",    "5",
  "LOREG", "anoventayseis",         "96",      "5",       NA,     "5",
  "LOREG", "acientosesentaytres",   "163",     "1",       "c",    "9, cita anterior al 16-10",
  "LOREG", "acientosesentaytres",   "163",     "1",       "d",    "9",
  "LOREG", "acientosesentayseis",   "166",     "1",       "a",    "7",
  "LOREG", "acientosesentaynueve",  "169",     "3",       NA,     "8",
  "CE",    "a69",                   "69",      "2",       NA,     "7",
  "CE",    "a99",                   "99",      "3",       NA,     "10",
  "CE",    "a99",                   "99",      "5",       NA,     "10"
)

# Párrafos de la versión vigente del bloque, sin título ni notas al pie.
# Las versiones no vienen en orden: algunas solo añaden notas «Véase» y arrastran texto anterior a reformas posteriores.
parrafos <- \(xml, bloque) {
  vs <- xml_find_all(xml, str_glue("//bloque[@id='{bloque}']/version"))
  v <- vs[[which.max(as.integer(xml_attr(vs, "fecha_vigencia")))]]
  list(
    fecha = xml_attr(v, "fecha_publicacion"),
    norma = xml_attr(v, "id_norma"),
    p = xml_find_all(v, "./p[not(@class='articulo')]") |> xml_text() |> str_squish()
  )
}

# Tramo que empieza en el primer párrafo que casa con `ini` y acaba antes del siguiente que casa con `fin`
tramo <- \(p, ini, fin) {
  i <- detect_index(p, \(x) str_detect(x, ini))
  if (i == 0) return(character())
  resto <- p[-seq_len(i)]
  j <- detect_index(resto, \(x) str_detect(x, fin))
  c(p[i], if (j == 0) resto else head(resto, j - 1))
}

extrae <- \(p, apartado, letra) {
  if (!is.na(apartado)) p <- tramo(p, str_glue("^{apartado}\\. "), "^\\d+\\. ")
  if (!is.na(letra)) p <- tramo(p, str_glue("^{letra}\\) "), "^[a-z]\\) ")
  p
}

fecha_es <- \(x) format(as.Date(x, "%Y%m%d"), "%d-%m-%Y")

resultado <- citas |>
  left_join(select(normas, corto, xml), by = "corto") |>
  mutate(
    version = map2(xml, bloque, parrafos),
    texto = pmap(list(version, apartado, letra), \(v, a, l) extrae(v$p, a, l)),
    ref = str_c(corto, ", art. ", articulo, if_else(is.na(apartado), "", str_c(".", apartado)),
                if_else(is.na(letra), "", str_c(".", letra)))
  )

stopifnot(all(lengths(resultado$texto) > 0))

seccion <- \(ref, preguntas, version, texto) str_c(
  "### ", ref, " (pregunta ", preguntas, ")\n\n",
  "Versión vigente publicada el ", fecha_es(version$fecha), " (", version$norma, ").\n\n",
  str_c("> ", texto, collapse = "\n>\n"), "\n"
)

cabecera <- str_c(
  "# A1 · Cotejo literal en el BOE\n\n",
  "Generado por `R/cotejo_a01_boe.R` desde la API de legislación consolidada del BOE. ",
  "Texto literal de la versión vigente de cada artículo; se omiten las notas al pie del BOE y las tablas (el cuadro del ejemplo del art. 163.1.c).\n\n",
  str_c("- ", normas$nombre, ": ", normas$url, " — última versión de la norma publicada el ",
        fecha_es(normas$ultima), "; descarga el ", normas$descarga, ".", collapse = "\n"),
  "\n\n## Texto literal\n\n"
)

str_c(cabecera, str_c(pmap_chr(select(resultado, ref, preguntas, version, texto), seccion), collapse = "\n")) |>
  write_file("editorial/fuentes/a01-cotejo-boe.md")
