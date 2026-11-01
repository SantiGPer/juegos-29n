# Catálogo de municipios para A15: los más extremos por indicador y umbral de población -> editorial/catalogos/a15-catalogo.md
# Encargo del 01-11-2026. Mismo método para los cuatro partidos: voto a la cabecera nacional sobre voto válido.

library(tidyverse)
library(jsonlite)

d <- fromJSON("data/resultados_2023_mun.json")
cand <- as_tibble(d$candidaturas)
m <- as_tibble(d$municipios)

partidos <- c(PP = "000005", PSOE = "000002", Vox = "000006", Sumar = "000010")

voto_cabecera <- m |>
  select(ine, validos, votos) |>
  mutate(votos = map(votos, \(v) tibble(codigo = v[, 1], votos = as.numeric(v[, 2])))) |>
  unnest(votos) |>
  left_join(select(cand, codigo, cabecera), "codigo") |>
  filter(cabecera %in% partidos) |>
  summarise(pct = sum(votos) / first(validos), .by = c(ine, cabecera)) |>
  mutate(indicador = names(partidos)[match(cabecera, partidos)]) |>
  select(ine, indicador, valor = pct)

indicadores <- bind_rows(
  voto_cabecera,
  m |> transmute(ine, indicador = "Participación más alta", valor = participacion),
  m |> transmute(ine, indicador = "Participación más baja", valor = -participacion)
) |>
  left_join(select(m, ine, nombre, provincia_nombre, poblacion_2023), "ine")

umbrales <- c(1000, 5000, 20000)
pct <- \(x) str_c(formatC(100 * abs(x), format = "f", digits = 2, decimal.mark = ","), " %")
miles <- \(x) formatC(x, format = "d", big.mark = ".")

tabla <- \(ind, umbral) {
  t <- indicadores |>
    filter(indicador == ind, poblacion_2023 >= umbral) |>
    mutate(puesto = min_rank(-valor), total = n()) |>
    filter(puesto <= 5) |>
    arrange(puesto)
  str_c(
    "#### ", miles(umbral), " habitantes o más (", miles(t$total[1]), " municipios)\n\n",
    "| Puesto | Municipio | Provincia | Población | Valor |\n| --- | --- | --- | --- | --- |\n",
    str_c("| ", t$puesto, " | ", t$nombre, " | ", t$provincia_nombre, " | ", miles(t$poblacion_2023), " | ", pct(t$valor), " |", collapse = "\n"),
    "\n"
  )
}

titulos <- c(PP = "Voto al PP", PSOE = "Voto al PSOE", Vox = "Voto a Vox", Sumar = "Voto a Sumar",
             "Participación más alta" = "Participación más alta", "Participación más baja" = "Participación más baja")

secciones <- imap_chr(titulos, \(t, ind) str_c("### ", t, "\n\n", str_c(map_chr(umbrales, \(u) tabla(ind, u)), collapse = "\n")))

str_c(
  "# A15 · Catálogo de municipios\n\n",
  "Generado por `R/catalogo_a15.R` desde `data/resultados_2023_mun.json` (Interior, generales del 23-07-2023; INE, población a 1-1-2023). ",
  "Para que el autor elija los municipios y la regla de selección.\n\n",
  "- Voto a cada partido: votos de todas las candidaturas de su cabecera nacional (por ejemplo, PSC dentro del PSOE) sobre el voto válido del municipio. El mismo método para los cuatro.\n",
  "- Participación: votantes sobre censo, sin el CERA, que no se publica por municipio.\n",
  "- Puesto entre los municipios del umbral; los empates comparten puesto. Población: cifras oficiales del INE a 1-1-2023.\n",
  "- Vox no se presentó en Santa Cruz de Tenerife: sus municipios no entran en la tabla de Vox.\n\n",
  str_c(secciones, collapse = "\n")
) |>
  write_file("editorial/catalogos/a15-catalogo.md")
