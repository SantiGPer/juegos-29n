# Cotejo de las cifras y posiciones del contenido de A11 con data/resultados_2023_prov.json
# -> editorial/fuentes/a11-cotejo.md. Encargo del 24-10-2026. Porcentajes de voto sobre voto válido, por cabecera
# nacional (el PSC cuenta como PSOE); voto en blanco sobre válidos; CERA sobre censo total; crecimiento 2023-2025
# con las cifras oficiales de población.

library(tidyverse)
library(jsonlite)

prov <- fromJSON("data/resultados_2023_prov.json")$provincias |> as_tibble()

cabecera <- \(siglas) prov$candidaturas |> list_rbind() |> filter(siglas == .env$siglas) |> pull(cabecera) |> first()
voto <- \(siglas) {
  cab <- cabecera(siglas)
  prov |> transmute(nombre, valor = map2_dbl(candidaturas, validos, \(c, v) sum(c$votos[c$cabecera == cab]) / v * 100))
}

variables <- list(
  PP = voto("PP"),
  PSOE = voto("PSOE"),
  PACMA = voto("PACMA"),
  `Voto en blanco` = transmute(prov, nombre, valor = blancos / validos * 100),
  `CERA sobre censo` = transmute(prov, nombre, valor = censo_cera / censo * 100),
  `Crecimiento 2023-2025` = transmute(prov, nombre, valor = (poblacion_2025 / poblacion_2023 - 1) * 100)
) |>
  imap(\(d, v) d |> mutate(variable = v, puesto = min_rank(desc(valor)))) |>
  list_rbind()

duelos <- tribble(
  ~duelo, ~variable, ~a, ~b,
  1, "PSOE", "Barcelona", "Madrid",
  2, "Crecimiento 2023-2025", "Soria", "Zamora",
  3, "PP", "Lugo", "Madrid",
  4, "Voto en blanco", "Lleida", "València/Valencia",
  5, "PP", "Jaén", "Sevilla",
  6, "Crecimiento 2023-2025", "Guadalajara", "Barcelona",
  7, "CERA sobre censo", "Soria", "Madrid",
  8, "PSOE", "Badajoz", "Sevilla",
  9, "PACMA", "Santa Cruz de Tenerife", "Barcelona",
  10, "PP", "Ourense", "Melilla"
)

fila <- \(v, n) filter(variables, variable == v, nombre == n)
lados <- duelos |>
  mutate(texto = pmap_chr(list(variable, a, b), \(v, a, b) {
    x <- bind_rows(fila(v, a), fila(v, b))
    str_c(str_glue_data(x, "{nombre} {sprintf('%.2f', valor)} % (puesto {puesto})"), collapse = " · ")
  }))

top <- \(v, n = 5, asc = FALSE) variables |> filter(variable == v) |> arrange(if (asc) valor else desc(valor)) |> head(n) |>
  str_glue_data("{nombre} {sprintf('%.2f', valor)}") |> str_c(collapse = ", ")

c(
  "# A11 · Cotejo con los datos",
  "",
  str_glue("Generado por `R/cotejo_a11_datos.R` el {Sys.Date()} a partir de `data/resultados_2023_prov.json`. Puesto: 1 = valor más alto de las 52 circunscripciones."),
  "",
  "## Lados de cada duelo",
  "",
  str_glue_data(lados, "- Duelo {duelo} ({variable}): {texto}"),
  "",
  "## Posiciones citadas en las explicaciones",
  "",
  str_glue("- PSOE, cinco primeras: {top('PSOE')}"),
  str_glue("- PP, cinco primeras: {top('PP')}; por encima del 50 %: {variables |> filter(variable == 'PP', valor > 50) |> pull(nombre) |> str_c(collapse = ', ')}"),
  str_glue("- PSOE en Jaén: {sprintf('%.2f', fila('PSOE', 'Jaén')$valor)} % (puesto {fila('PSOE', 'Jaén')$puesto})"),
  str_glue("- Voto en blanco, tres primeras: {top('Voto en blanco', 3)}"),
  str_glue("- Crecimiento, cinco primeras: {top('Crecimiento 2023-2025')}"),
  str_glue("- Provincias que perdieron población: {variables |> filter(variable == 'Crecimiento 2023-2025', valor < 0) |> arrange(valor) |> str_glue_data('{nombre} {sprintf(\"%.2f\", valor)}') |> str_c(collapse = ', ')}"),
  str_glue("- CERA sobre censo, tres primeras: {top('CERA sobre censo', 3)}"),
  str_glue("- PACMA, tres primeras: {top('PACMA', 3)}")
) |>
  write_lines("editorial/fuentes/a11-cotejo.md")
