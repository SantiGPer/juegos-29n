# Valores por provincia de los seis mapas de A7 y de sus siete señuelos -> data/mapas_a07.json
# Encargo del 21-10-2026 (A7). Definiciones y señuelos de editorial/contenido/a07-que-mapa-es-este.md, sobre
# data/resultados_2023_prov.json. Sin redondear. Una candidatura que no se presentó en una provincia da NA (null).

library(tidyverse)
library(jsonlite)

p <- as_tibble(fromJSON("data/resultados_2023_prov.json")$provincias)

# Votos de una candidatura nacional (cabecera) por provincia; NA donde no se presentó
voto <- \(cabecera) map_dbl(p$candidaturas, \(c) if (any(c$cabecera == cabecera)) sum(c$votos[c$cabecera == cabecera]) else NA)

mapas <- p |> transmute(
  id = provincia,
  abstencion = 100 * (1 - votantes_residentes / censo_residentes),
  habitantes_escano = poblacion_2025 / escanos_2026,
  nulo = 100 * nulos / votantes,
  sumar = 100 * voto("000010") / validos,
  extranjero = 100 * nacidos_extranjero_2023 / poblacion_padron_2023,
  vox = 100 * voto("000006") / validos
)

senuelos <- p |> transmute(
  id = provincia,
  pp = 100 * voto("000005") / validos,
  psoe = 100 * voto("000002") / validos,
  blanco = 100 * blancos / validos,
  cera = 100 * censo_cera / censo,
  poblacion = poblacion_2025,
  crecimiento = 100 * (poblacion_2025 / poblacion_2023 - 1),
  pacma = 100 * voto("000007") / validos
)

por_id <- \(t) t |> select(-id) |> map(\(v) set_names(as.list(v), t$id))

list(
  nota = "Valores por provincia (código INE) sin redondear. `mapas`: los seis que se dibujan; `senuelos`: variables de las etiquetas señuelo, que no se dibujan y sirven para elegir los distractores. null = la candidatura no se presentó (Vox en Santa Cruz de Tenerife, PACMA en Ceuta).",
  fuente = "data/resultados_2023_prov.json (Ministerio del Interior, INE y RD 806/2026)",
  mapas = por_id(mapas),
  senuelos = por_id(senuelos)
) |>
  write_json("data/mapas_a07.json", auto_unbox = TRUE, digits = NA, na = "null")
