# Presidencia del Congreso y su partido por legislatura -> data/legislaturas.json
# Fuente: Anexo:Presidentes del Congreso de los Diputados (es.wikipedia, revisión fijada),
# con el acta de elección del Congreso que cita cada fila.

library(tidyverse)
library(jsonlite)

revision <- 175471021
url_wiki <- str_glue("https://es.wikipedia.org/w/index.php?title=Anexo:Presidentes_del_Congreso_de_los_Diputados&oldid={revision}")

texto <- httr2::request(str_c(url_wiki, "&action=raw")) |>
  httr2::req_user_agent("juegos29n (github.com/SantiGPer/juegos-29n)") |>
  httr2::req_perform() |>
  httr2::resp_body_string()

meses <- c(ene = 1, feb = 2, mar = 3, abr = 4, may = 5, jun = 6, jul = 7, ag = 8, sep = 9, oct = 10, nov = 11, dic = 12)
fecha <- \(x) {
  m <- str_match(x, "(\\d{1,2}) de (\\w+)\\.? de (\\d{4})")
  if_else(is.na(m[, 1]), NA_character_, sprintf("%s-%02d-%02d", m[, 4], meses[m[, 3]], as.integer(m[, 2])))
}
romanos <- c(C = 0, I = 1, II = 2, III = 3, IV = 4, V = 5, VI = 6, VII = 7, VIII = 8, IX = 9, X = 10,
             XI = 11, XII = 12, XIII = 13, XIV = 14, XV = 15)

celdas <- \(fila) str_split(fila, "\n\\|")[[1]] |> str_remove("^\\|") |> str_trim()
partes <- \(x) str_split(x, "<hr>")[[1]]

filas <- str_split(str_sub(texto, str_locate(texto, "Periodo democrático")[1]), "\n\\|-\n")[[1]] |>
  keep(\(f) str_detect(f, "[Ll]egislatura (?:constituyente )?de España\\|"))

presidencias <- map(filas, \(f) {
  c <- celdas(f)
  nombre <- str_match(c[3], "\\[\\[(?:[^|\\]]+\\|)?([^\\]]+)\\]\\]")[, 2]
  legs <- str_match_all(c[6], "España\\|(\\w+)\\]\\]")[[1]][, 2]
  ini <- fecha(partes(c[4]))
  fin <- fecha(partes(c[5]))
  actas <- str_extract_all(f, "https?://www\\.congreso\\.es/[^<\\s]+\\.pdf")[[1]]
  # Una legislatura con varias fechas (presidencia interina y definitiva): primera y última
  if (length(legs) == 1) { ini <- first(ini); fin <- last(fin) }
  tibble(
    legislatura = legs,
    numero = unname(romanos[legs]),
    presidencia = nombre,
    partido = str_match(c[7], "\\|([^\\]]+)\\]\\]")[, 2],
    inicio = ini,
    fin = fin,
    actas_eleccion = if (length(actas) == length(legs)) as.list(actas) else list(actas)
  )
}) |>
  list_rbind() |>
  distinct(legislatura, .keep_all = TRUE) |>
  arrange(numero) |>
  # El partido es el del grupo parlamentario (decisión del 16-10-2026): Batet, PSOE; afiliación PSC
  mutate(
    afiliacion = if_else(partido == "PSC", partido, NA_character_),
    partido = if_else(partido == "PSC", "PSOE", partido),
    actas_eleccion = map(actas_eleccion, I)
  )

stopifnot(identical(presidencias$numero, as.numeric(0:15)), !anyNA(presidencias$partido))

list(
  fuente = "Wikipedia, Anexo:Presidentes del Congreso de los Diputados (contraste); actas de elección del Congreso de los Diputados enlazadas en cada fila",
  url = as.character(url_wiki),
  consulta = as.character(Sys.Date()),
  nota = "Una fila por legislatura. Partido = el del grupo parlamentario por el que fue elegida la presidencia; si la fuente da otra afiliación, va en `afiliacion`. Fechas de la presidencia: elección y cese; en la Constituyente y la I, desde la presidencia interina. Fin nulo = en el cargo.",
  legislaturas = presidencias
) |>
  write_json("data/legislaturas.json", auto_unbox = TRUE, pretty = TRUE, na = "null")
