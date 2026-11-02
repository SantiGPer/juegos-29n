# Catálogo de municipios para A15: los más extremos por indicador y umbral de población -> editorial/catalogos/a15-catalogo.md
# Encargos del 01-11-2026. Mismo método para todos los partidos: voto a la cabecera nacional sobre voto válido.

library(tidyverse)
library(jsonlite)

d <- fromJSON("data/resultados_2023_mun.json")
cand <- as_tibble(d$candidaturas)

ccaa <- c(
  "04" = "Andalucía", "11" = "Andalucía", "14" = "Andalucía", "18" = "Andalucía", "21" = "Andalucía", "23" = "Andalucía", "29" = "Andalucía", "41" = "Andalucía",
  "22" = "Aragón", "44" = "Aragón", "50" = "Aragón", "33" = "Asturias", "07" = "Illes Balears", "35" = "Canarias", "38" = "Canarias", "39" = "Cantabria",
  "05" = "Castilla y León", "09" = "Castilla y León", "24" = "Castilla y León", "34" = "Castilla y León", "37" = "Castilla y León", "40" = "Castilla y León",
  "42" = "Castilla y León", "47" = "Castilla y León", "49" = "Castilla y León",
  "02" = "Castilla-La Mancha", "13" = "Castilla-La Mancha", "16" = "Castilla-La Mancha", "19" = "Castilla-La Mancha", "45" = "Castilla-La Mancha",
  "08" = "Cataluña", "17" = "Cataluña", "25" = "Cataluña", "43" = "Cataluña", "03" = "Comunitat Valenciana", "12" = "Comunitat Valenciana", "46" = "Comunitat Valenciana",
  "06" = "Extremadura", "10" = "Extremadura", "15" = "Galicia", "27" = "Galicia", "32" = "Galicia", "36" = "Galicia", "28" = "Madrid", "30" = "Murcia",
  "31" = "Navarra", "01" = "País Vasco", "20" = "País Vasco", "48" = "País Vasco", "26" = "La Rioja", "51" = "Ceuta", "52" = "Melilla"
)

m <- as_tibble(d$municipios) |> mutate(ccaa = ccaa[str_sub(ine, 1, 2)])

estatales <- c(PP = "000005", PSOE = "000002", Vox = "000006", Sumar = "000010")
territoriales <- c("EH Bildu" = "000071", BNG = "000065", ERC = "000050", Junts = "000057", PNV = "000075", CC = "000031")
partidos <- c(estatales, territoriales)

voto_cabecera <- m |>
  select(ine, validos, votos) |>
  mutate(votos = map(votos, \(v) tibble(codigo = v[, 1], votos = as.numeric(v[, 2])))) |>
  unnest(votos) |>
  left_join(select(cand, codigo, cabecera), "codigo") |>
  summarise(votos = sum(votos), validos = first(validos), .by = c(ine, cabecera))

pct_partidos <- voto_cabecera |>
  filter(cabecera %in% partidos) |>
  transmute(ine, indicador = names(partidos)[match(cabecera, partidos)], valor = votos / validos)

indicadores <- bind_rows(
  pct_partidos,
  m |> transmute(ine, indicador = "Participación más alta", valor = participacion),
  m |> transmute(ine, indicador = "Participación más baja", valor = -participacion)
) |>
  left_join(select(m, ine, nombre, provincia_nombre, ccaa, poblacion_2023), "ine")

# Selección del 01-11: 5.000 habitantes o más, sin Ceuta, Melilla ni municipios creados después de 2008
seleccionables <- m |> filter(poblacion_2023 >= 5000, !ccaa %in% c("Ceuta", "Melilla"), !is.na(g2008_siglas)) |> pull(ine)

pct <- \(x, digitos = 2) str_c(formatC(100 * abs(x), format = "f", digits = digitos, decimal.mark = ","), " %")
pts <- \(x) formatC(x, format = "f", digits = 2, decimal.mark = ",")
miles <- \(x) formatC(x, format = "d", big.mark = ".")
cabecera_md <- \(cols) str_c("| ", str_c(cols, collapse = " | "), " |\n|", strrep(" --- |", length(cols)), "\n")
filas_md <- \(...) str_c("| ", str_c(..., sep = " | "), " |", collapse = "\n")

tabla <- \(ind, umbral) {
  t <- indicadores |>
    filter(indicador == ind, poblacion_2023 >= umbral) |>
    mutate(puesto = min_rank(-valor), total = n()) |>
    filter(puesto <= 5) |>
    arrange(puesto)
  str_c(
    "#### ", miles(umbral), " habitantes o más (", miles(t$total[1]), " municipios)\n\n",
    cabecera_md(c("Puesto", "Municipio", "Provincia", "Comunidad", "Población", "Valor")),
    filas_md(t$puesto, t$nombre, t$provincia_nombre, t$ccaa, miles(t$poblacion_2023), pct(t$valor)),
    "\n"
  )
}

titulos <- c(PP = "Voto al PP", PSOE = "Voto al PSOE", Vox = "Voto a Vox", Sumar = "Voto a Sumar",
             "Participación más alta" = "Participación más alta", "Participación más baja" = "Participación más baja")

secciones <- imap_chr(titulos, \(t, ind) str_c("### ", t, "\n\n", str_c(map_chr(c(1000, 5000, 20000), \(u) tabla(ind, u)), collapse = "\n")))

# 1. Feudos de los partidos territoriales
feudo <- \(ind) {
  t <- indicadores |>
    filter(indicador == ind, ine %in% seleccionables) |>
    mutate(puesto = min_rank(-valor), total = n()) |>
    filter(puesto <= 5) |>
    arrange(puesto)
  str_c(
    "#### ", ind, " (", miles(t$total[1]), " municipios con voto a ", ind, ")\n\n",
    cabecera_md(c("Puesto", "Municipio", "Provincia", "Comunidad", "Población", "Valor")),
    filas_md(t$puesto, t$nombre, t$provincia_nombre, t$ccaa, miles(t$poblacion_2023), pct(t$valor)),
    "\n"
  )
}

# 2. «España en pequeño»: L1 en puntos sobre PP, PSOE, Vox, Sumar y Otros, frente a la suma de todos los municipios
bloques <- voto_cabecera |>
  mutate(bloque = coalesce(names(estatales)[match(cabecera, estatales)], "Otros")) |>
  summarise(votos = sum(votos), validos = first(validos), .by = c(ine, bloque)) |>
  complete(ine, bloque, fill = list(votos = 0)) |>
  group_by(ine) |>
  fill(validos, .direction = "downup") |>
  ungroup() |>
  mutate(votos = if_else(bloque == "Otros", votos + m$blancos[match(ine, m$ine)], votos))

nacional <- bloques |>
  summarise(votos = sum(votos), .by = bloque) |>
  mutate(nac = 100 * votos / sum(votos)) |>
  select(bloque, nac)

espana <- bloques |>
  filter(ine %in% seleccionables) |>
  mutate(p = 100 * votos / validos) |>
  left_join(nacional, "bloque") |>
  summarise(distancia = sum(abs(p - nac)), reparto = list(set_names(p, bloque)), .by = ine) |>
  mutate(puesto = min_rank(distancia)) |>
  filter(puesto <= 10) |>
  arrange(puesto) |>
  left_join(select(m, ine, nombre, provincia_nombre, ccaa, poblacion_2023), "ine")

orden_bloques <- c(names(estatales), "Otros")
reparto_md <- \(r) map_chr(orden_bloques, \(b) str_c(formatC(r[[b]], format = "f", digits = 1, decimal.mark = ","))) |> str_c(collapse = " | ")
nac_txt <- str_c(orden_bloques, " ", formatC(nacional$nac[match(orden_bloques, nacional$bloque)], format = "f", digits = 2, decimal.mark = ","), collapse = "; ")

seccion_espana <- str_c(
  "### «España en pequeño»\n\n",
  "Medida (decisión del autor, 02-11): suma de las diferencias absolutas, en puntos, entre el reparto del municipio y el nacional en cinco bloques sobre el voto válido: PP, PSOE, Vox, Sumar (cabeceras nacionales) y Otros (el resto de candidaturas y el voto en blanco). ",
  "Reparto nacional de referencia: la suma de todos los municipios, sin el CERA, para que la base sea la misma (", nac_txt, " %). ",
  "Cuanto menor la distancia, más se parece. Los cinco bloques del municipio, en %, con un decimal.\n\n",
  cabecera_md(c("Puesto", "Municipio", "Provincia", "Comunidad", "Población", "Distancia (puntos)", orden_bloques)),
  filas_md(espana$puesto, espana$nombre, espana$provincia_nombre, espana$ccaa, miles(espana$poblacion_2023), pts(espana$distancia), map_chr(espana$reparto, reparto_md)),
  "\n"
)

# 3. Empate más ajustado entre PP y PSOE
duelo <- voto_cabecera |>
  filter(ine %in% seleccionables, cabecera %in% estatales[c("PP", "PSOE")]) |>
  mutate(partido = names(estatales)[match(cabecera, estatales)]) |>
  select(ine, partido, votos, validos) |>
  pivot_wider(names_from = partido, values_from = votos) |>
  mutate(dif_votos = abs(PP - PSOE), dif_puntos = 100 * dif_votos / validos, delante = case_when(PP > PSOE ~ "PP", PSOE > PP ~ "PSOE", .default = "Empate")) |>
  left_join(select(m, ine, nombre, provincia_nombre, ccaa, poblacion_2023, ganador_cabecera), "ine")

tabla_duelo <- \(criterio, titulo) {
  t <- duelo |>
    mutate(puesto = min_rank(.data[[criterio]])) |>
    filter(puesto <= 5) |>
    arrange(puesto)
  str_c(
    "#### ", titulo, "\n\n",
    cabecera_md(c("Puesto", "Municipio", "Provincia", "Comunidad", "Población", "PP", "PSOE", "Diferencia (votos)", "Diferencia (puntos)", "Por delante", "Ganador del municipio")),
    filas_md(t$puesto, t$nombre, t$provincia_nombre, t$ccaa, miles(t$poblacion_2023), miles(t$PP), miles(t$PSOE), miles(t$dif_votos), pts(t$dif_puntos), t$delante, t$ganador_cabecera),
    "\n"
  )
}

seccion_duelo <- str_c(
  "### Empate más ajustado entre PP y PSOE\n\n",
  "Votos de cada cabecera nacional (PSC dentro del PSOE). Puntos: diferencia sobre el voto válido del municipio. «Ganador del municipio»: candidatura más votada (cabecera).\n\n",
  tabla_duelo("dif_votos", "Menor diferencia en votos"), "\n",
  tabla_duelo("dif_puntos", "Menor diferencia en puntos")
)

str_c(
  "# A15 · Catálogo de municipios\n\n",
  "Generado por `R/catalogo_a15.R` desde `data/resultados_2023_mun.json` (Interior, generales del 23-07-2023; INE, población a 1-1-2023). ",
  "Para que el autor elija los municipios y la regla de selección.\n\n",
  "- Voto a cada partido: votos de todas las candidaturas de su cabecera nacional (por ejemplo, PSC dentro del PSOE) sobre el voto válido del municipio. El mismo método para todos.\n",
  "- Participación: votantes sobre censo, sin el CERA, que no se publica por municipio.\n",
  "- Puesto entre los municipios del umbral; los empates comparten puesto. Población: cifras oficiales del INE a 1-1-2023.\n",
  "- Vox no se presentó en Santa Cruz de Tenerife: sus municipios no entran en la tabla de Vox.\n",
  "- Comunidad: la de la provincia del municipio, para aplicar la regla de no repetir comunidad.\n\n",
  "## Extremos de los partidos estatales y de la participación (encargo del 01-11)\n\n",
  "Todos los municipios del umbral, con Ceuta y Melilla y los creados después de 2008.\n\n",
  str_c(secciones, collapse = "\n"),
  "\n## Catálogo ampliado (encargo del 01-11, dudas de la bitácora)\n\n",
  "Solo municipios seleccionables (decisión del autor, 01-11): ", miles(length(seleccionables)), " municipios de 5.000 habitantes o más, sin Ceuta, Melilla ni los 23 creados después de 2008.\n\n",
  "### Feudos de los partidos territoriales\n\n",
  str_c(map_chr(names(territoriales), feudo), collapse = "\n"), "\n",
  seccion_espana, "\n",
  seccion_duelo
) |>
  write_file("editorial/catalogos/a15-catalogo.md")
