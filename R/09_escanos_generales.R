# Escaños y votos por candidatura en las generales de 1982, 2000, 2015 y 2023 -> data/escanos_generales.json
# Encargo del 20-10-2026 (A5). Fuente: Ministerio del Interior, infoelectoral, ficheros 02, 03 y 08 (total nacional,
# que acumula cada candidatura con su cabecera nacional: PSC en PSOE, PSUC en PCE…). Siglas y denominación, las de
# la época tal como las publica Interior. Las candidaturas con menos de cinco escaños van en «Otros».

library(tidyverse)
library(jsonlite)
source("R/infoelectoral.R")

elecciones <- c("198210", "200003", "201512", "202307")

fecha <- \(eleccion) {
  f <- lee_dat(eleccion, "02", list(dia = c(13, 14), mes = c(15, 16), anyo = c(17, 20)))
  str_glue("{f$anyo}-{f$mes}-{f$dia}")
}

reparto <- \(eleccion) {
  nac <- votos_ambitos(eleccion) |>
    filter(ccaa == "99", escanos > 0) |>
    left_join(candidaturas(eleccion), "codigo") |>
    select(codigo, siglas, denominacion, votos, escanos) |>
    arrange(-escanos, -votos)
  stopifnot(sum(nac$escanos) == 350)
  otros <- filter(nac, escanos < 5)
  list(
    eleccion = eleccion,
    fecha = fecha(eleccion),
    candidaturas = filter(nac, escanos >= 5),
    otros = list(escanos = sum(otros$escanos), votos = sum(otros$votos), candidaturas = otros)
  )
}

list(
  nota = "Total nacional de Interior. Solo candidaturas con escaño; «Otros» agrupa las de menos de cinco escaños.",
  elecciones = map(elecciones, reparto)
) |>
  write_json("data/escanos_generales.json", auto_unbox = TRUE, pretty = TRUE, digits = NA)
