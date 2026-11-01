# Resultados de las generales del 23-07-2023 por municipio, con población, coordenadas y ganador en 2019 y 2008 -> data/resultados_2023_mun.json
# Encargo del 01-11-2026 (A15). Fuentes:
# - Ministerio del Interior, infoelectoral: ficheros 03, 05 y 06 de los procesos 02202307, 02201911, 02201904 y 02200803.
# - INE, Cifras oficiales de población de los municipios españoles (revisión del Padrón a 1-1-2023), pobmun23.xlsx de pob_xls/pobmun.zip.
# - IGN/CNIG, Nomenclátor Geográfico de Municipios y Entidades de Población (NGMEP 202603), MUNICIPIOS.csv: coordenadas del núcleo capital.
#   El Centro de Descargas del CNIG pide aceptar sus condiciones: el zip se baja a mano y se deja en la caché (cnig/).

library(tidyverse)
library(jsonlite)
source("R/infoelectoral.R")

cache <- tools::R_user_dir("juegos29n", "cache")

# 06: votos por candidatura y municipio (total municipal, sin el CERA)
votos_municipios <- \(eleccion) lee_dat(eleccion, "06", list(
  provincia = c(10, 11), municipio = c(12, 14), distrito_municipal = c(15, 16), codigo = c(17, 22), votos = c(23, 30))) |>
  filter(distrito_municipal == "99") |>
  transmute(ine = str_c(provincia, municipio), codigo, votos = as.numeric(votos)) |>
  filter(votos > 0)

datos_municipios <- \(eleccion) municipios(eleccion) |>
  transmute(ine = str_c(provincia, municipio), censo, blancos, nulos, votos_candidaturas)

ganador <- \(eleccion) votos_municipios(eleccion) |>
  left_join(candidaturas(eleccion), "codigo") |>
  slice_max(votos, n = 1, by = ine, with_ties = FALSE) |>
  left_join(candidaturas(eleccion) |> select(cabecera = codigo, siglas_cabecera = siglas), "cabecera") |>
  select(ine, siglas, siglas_cabecera)

# Interior, 2023 ----------------------------------------------------------------------------------

eleccion <- "202307"
cand <- candidaturas(eleccion)
votos <- votos_municipios(eleccion)
nombres <- lee_dat(eleccion, "05", list(provincia = c(12, 13), municipio = c(14, 16), distrito_municipal = c(17, 18), nombre = c(19, 118))) |>
  filter(distrito_municipal == "99") |>
  transmute(ine = str_c(provincia, municipio), nombre)

# INE: cifras oficiales a 1-1-2023 ----------------------------------------------------------------

poblacion <- readxl::read_excel(file.path(cache, "ine", "pobmun", "pobmun", "pobmun23.xlsx"), skip = 1, col_types = "text") |>
  transmute(ine = str_c(CPRO, CMUN), provincia_nombre = PROVINCIA, poblacion_2023 = as.numeric(POB23))

# IGN/CNIG: núcleo capital de cada municipio ------------------------------------------------------

nomenclator <- read_delim(file.path(cache, "cnig", "MUNICIPIOS.csv"), delim = ";", col_types = cols(.default = "c"),
                          locale = locale(encoding = "latin1", decimal_mark = ",")) |>
  transmute(ine = str_sub(COD_INE, 1, 5), capital = CAPITAL,
            lon = parse_double(LONGITUD_ETRS89_REGCAN95, locale = locale(decimal_mark = ",")),
            lat = parse_double(LATITUD_ETRS89_REGCAN95, locale = locale(decimal_mark = ",")))

# Unión y comprobaciones --------------------------------------------------------------------------

anteriores <- c(g2019_11 = "201911", g2019_04 = "201904", g2008 = "200803") |>
  imap(\(e, nombre) ganador(e) |> rename_with(\(x) str_c(nombre, "_", x), -ine))

municipios_2023 <- datos_municipios(eleccion) |>
  left_join(nombres, "ine") |>
  left_join(poblacion, "ine") |>
  left_join(nomenclator, "ine") |>
  mutate(votantes = blancos + nulos + votos_candidaturas, validos = blancos + votos_candidaturas,
         participacion = votantes / censo) |>
  left_join(ganador(eleccion) |> rename(ganador = siglas, ganador_cabecera = siglas_cabecera), "ine") |>
  reduce(anteriores, left_join, by = "ine", .init = _)

stopifnot(
  nrow(municipios_2023) == nrow(poblacion),
  !anyNA(select(municipios_2023, poblacion_2023, lon, lat, ganador)),
  votos |> summarise(v = sum(votos), .by = ine) |> left_join(municipios_2023, "ine") |> with(all(v == votos_candidaturas)),
  # Lo municipal no supera lo provincial (que además lleva el CERA)
  votos |> mutate(provincia = str_sub(ine, 1, 2)) |> summarise(v = sum(votos), .by = c(provincia, codigo)) |>
    left_join(votos_ambitos(eleccion) |> filter(distrito == "9"), c("provincia", "codigo")) |> with(all(v <= votos)),
  between(municipios_2023$lat, 27, 44), between(municipios_2023$lon, -18.5, 4.5)
)

# Salida ------------------------------------------------------------------------------------------

# Candidaturas como diccionario y votos como pares [código, votos], para que el fichero se quede en unos 5 MB
lista_votos <- votos |>
  arrange(ine, -votos) |>
  summarise(votos = list(map2(codigo, votos, \(c, v) list(c, v))), .by = ine)

list(
  eleccion = "Congreso de los Diputados, 23-07-2023",
  notas = list(
    ambito = "Total municipal de residentes en España: el CERA solo se publica por provincia, no por municipio.",
    participacion = "votantes / censo, ambos sin el CERA. validos = blancos + votos a candidaturas.",
    votos = "Pares [código de candidatura, votos], de más a menos votada; solo candidaturas con votos. Siglas en candidaturas.",
    ganador = "Siglas de la candidatura más votada en el municipio y de su cabecera nacional, en 2023 y en las generales de noviembre y abril de 2019 y de 2008. NA si el municipio no existía con ese código.",
    poblacion_2023 = "Cifras oficiales del INE a 1-1-2023 (revisión del Padrón).",
    coordenadas = "Núcleo capital del municipio, del Nomenclátor del IGN (NGMEP 202603), en grados ETRS89 (REGCAN95 en Canarias)."
  ),
  candidaturas = cand |> filter(codigo %in% votos$codigo) |> select(codigo, siglas, denominacion, cabecera),
  municipios = municipios_2023 |>
    left_join(lista_votos, "ine") |>
    select(ine, nombre, capital, provincia_nombre, poblacion_2023, lon, lat, censo, votantes, blancos, nulos, validos,
           participacion, ganador, ganador_cabecera, starts_with("g20"), votos)
) |>
  write_json("data/resultados_2023_mun.json", auto_unbox = TRUE, digits = NA)
