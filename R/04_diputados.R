# Diputados de la XV y su grupo parlamentario por periodo -> data/diputados_xv.json
# Fuente: datos abiertos del Congreso (DiputadosActivos y DiputadosDeBaja). Solo dan el último grupo
# de cada diputado: si entró en él más de 30 días después de su alta, antes estuvo en el grupo de su
# formación electoral (Podemos, Micó, Ábalos y Ortega Smith al Mixto). Decisión del 19-10-2026:
# las palabras cuentan para el grupo en el que estaba el diputado ese día.

library(tidyverse)
library(jsonlite)

ua <- "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
portada <- "https://www.congreso.es/es/opendata/diputados"
enlaces <- httr2::request(portada) |> httr2::req_user_agent(ua) |> httr2::req_perform() |>
  httr2::resp_body_string() |>
  str_extract_all("/webpublica/opendata/diputados/(?:DiputadosActivos|DiputadosDeBaja)__\\d+\\.json") |>
  pluck(1) |>
  unique()

diputados <- map(enlaces, \(e) {
  Sys.sleep(3)
  httr2::request(str_c("https://www.congreso.es", e)) |> httr2::req_user_agent(ua) |> httr2::req_perform() |>
    httr2::resp_body_string() |> fromJSON() |> as_tibble()
}) |>
  list_rbind() |>
  select(-BIOGRAFIA) |>
  mutate(across(starts_with("FECHA"), dmy))

grupos <- c(
  "Grupo Parlamentario Popular en el Congreso" = "PP",
  "Grupo Parlamentario Socialista" = "PSOE",
  "Grupo Parlamentario VOX" = "Vox",
  "Grupo Parlamentario Plurinacional SUMAR" = "Sumar",
  "Grupo Parlamentario Republicano" = "ERC",
  "Grupo Parlamentario Junts per Catalunya" = "Junts",
  "Grupo Parlamentario Euskal Herria Bildu" = "EH Bildu",
  "Grupo Parlamentario Vasco (EAJ-PNV)" = "PNV",
  "Grupo Parlamentario Mixto" = "Mixto"
)

# Grupo de origen de cada formación: el más frecuente entre sus diputados
origen <- diputados |>
  count(FORMACIONELECTORAL, GRUPOPARLAMENTARIO) |>
  slice_max(n, by = FORMACIONELECTORAL, with_ties = FALSE) |>
  select(FORMACIONELECTORAL, grupo_origen = GRUPOPARLAMENTARIO)

# Partido dentro del Mixto, a mano: BNG, CC y UPN por su formación; los diputados de SUMAR que pasan
# al Mixto el 05-12-2023 son los de Podemos; Micó es de Compromís; Ábalos y Ortega Smith, a título propio
mixto <- c(
  "BNG" = "BNG", "CCa" = "CC", "UPN" = "UPN",
  "Micó Micó, Àgueda" = "Compromís",
  "Ábalos Meco, José Luis" = "Ábalos",
  "Ortega Smith-Molina, Francisco Javier" = "Ortega Smith"
)

actual <- diputados |>
  left_join(origen, by = "FORMACIONELECTORAL") |>
  transmute(
    nombre = NOMBRE, circunscripcion = CIRCUNSCRIPCION, formacion = FORMACIONELECTORAL,
    grupo_oficial = GRUPOPARLAMENTARIO, grupo_origen,
    cambio = FECHAALTAENGRUPOPARLAMENTARIO - FECHAALTA > 30 & grupo_origen != GRUPOPARLAMENTARIO,
    desde = if_else(cambio, FECHAALTAENGRUPOPARLAMENTARIO, FECHAALTA),
    hasta = FECHABAJA,
    alta = FECHAALTA
  )

anterior <- actual |>
  filter(cambio) |>
  transmute(nombre, circunscripcion, formacion, grupo_oficial = grupo_origen, hasta = desde - 1, desde = alta)

periodos <- bind_rows(actual, anterior) |>
  mutate(
    grupo = grupos[grupo_oficial],
    partido_mixto = if_else(grupo == "Mixto", coalesce(mixto[nombre], mixto[formacion], if_else(desde == ymd("2023-12-05"), "Podemos", NA_character_)), NA_character_),
    apellidos = str_remove(nombre, ",.*$")
  ) |>
  select(nombre, apellidos, circunscripcion, formacion, grupo, grupo_oficial, partido_mixto, desde, hasta) |>
  arrange(nombre, desde)

stopifnot(!anyNA(periodos$grupo), !any(periodos$grupo == "Mixto" & is.na(periodos$partido_mixto)))

list(
  fuente = "Congreso de los Diputados, datos abiertos: DiputadosActivos y DiputadosDeBaja (JSON)",
  url = portada,
  ficheros = basename(enlaces),
  consulta = as.character(Sys.Date()),
  nota = "Una fila por diputado y periodo en un grupo. Los datos abiertos solo dan el último grupo: si el alta en él es más de 30 días posterior al alta como diputado, el periodo anterior se asigna al grupo de su formación electoral. Primer periodo desde el alta como diputado. `hasta` nulo: en el cargo en la fecha de consulta (Diputación Permanente). `partido_mixto`, a mano.",
  periodos = periodos
) |>
  write_json("data/diputados_xv.json", auto_unbox = TRUE, pretty = TRUE, na = "null")
