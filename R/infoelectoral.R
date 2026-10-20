# Lector de los ficheros de resultados del Ministerio del Interior (infoelectoral, «apliextr»).
# Diseño de registro en el FICHEROS.doc que va dentro de cada zip. Lo usan R/01 y R/09.

library(tidyverse)

url_interior <- \(eleccion) str_glue("https://infoelectoral.interior.gob.es/estaticos/docxl/apliextr/02{eleccion}_MUNI.zip")

zip_interior <- \(eleccion) {
  dir <- file.path(tools::R_user_dir("juegos29n", "cache"), "interior", eleccion)
  if (!dir.exists(dir)) {
    dir.create(dir, recursive = TRUE)
    zip <- file.path(dir, "MUNI.zip")
    httr2::request(url_interior(eleccion)) |>
      httr2::req_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)") |>
      httr2::req_perform(path = zip)
    unzip(zip, exdir = dir)
  }
  dir
}

lee_dat <- \(eleccion, tipo, campos) {
  f <- list.files(zip_interior(eleccion), str_c("^", tipo, ".*\\.DAT$"), full.names = TRUE)
  read_fwf(f, fwf_positions(map_int(campos, 1), map_int(campos, 2), names(campos)),
           col_types = cols(.default = "c"), locale = locale(encoding = "latin1")) |>
    mutate(across(everything(), \(x) str_squish(str_remove_all(x, '"'))))
}

# 03: candidaturas, con la cabecera de acumulación nacional
candidaturas <- \(eleccion) lee_dat(eleccion, "03", list(
  codigo = c(9, 14), siglas = c(15, 64), denominacion = c(65, 214), cabecera = c(227, 232)))

# 07: datos comunes de ámbito superior al municipio (provincia, comunidad y total nacional; incluyen el CERA)
ambitos <- \(eleccion) lee_dat(eleccion, "07", list(
  ccaa = c(10, 11), provincia = c(12, 13), distrito = c(14, 14), nombre = c(15, 64),
  censo = c(86, 93), blancos = c(126, 133), nulos = c(134, 141), votos_candidaturas = c(142, 149),
  escanos = c(150, 155))) |>
  mutate(across(censo:escanos, as.numeric))

# 08: votos y escaños por candidatura en esos mismos ámbitos
votos_ambitos <- \(eleccion) lee_dat(eleccion, "08", list(
  ccaa = c(10, 11), provincia = c(12, 13), distrito = c(14, 14), codigo = c(15, 20),
  votos = c(21, 28), escanos = c(29, 33))) |>
  mutate(across(c(votos, escanos), as.numeric))

# 05: datos comunes por municipio (solo residentes en España: el CERA no está en los municipios)
municipios <- \(eleccion) lee_dat(eleccion, "05", list(
  provincia = c(12, 13), municipio = c(14, 16), distrito_municipal = c(17, 18),
  censo = c(150, 157), blancos = c(190, 197), nulos = c(198, 205), votos_candidaturas = c(206, 213))) |>
  filter(distrito_municipal == "99") |>
  mutate(across(censo:votos_candidaturas, as.numeric))
