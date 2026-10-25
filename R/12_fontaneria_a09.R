# Escaños de 2023 con otras reglas para A9 Fontanería electoral -> data/fontaneria_a09.json
# Encargo del 25-10-2026 (A9). Todas las configuraciones de editorial/catalogos/a09-fontaneria-catalogo.md sobre
# data/resultados_2023_prov.json: mismo voto (oficial, con el CERA), candidaturas por su cabecera nacional.
# Reglas vigentes: LOREG, art. 162 (escaños por provincia) y art. 163 (D'Hondt, barrera del 3 % de los válidos).

library(tidyverse)
library(jsonlite)

p <- as_tibble(fromJSON("data/resultados_2023_prov.json")$provincias)
votos <- p |> select(provincia, candidaturas) |> unnest(candidaturas)

etiquetas <- c(`000005` = "PP", `000002` = "PSOE", `000006` = "Vox", `000010` = "Sumar", `000050` = "ERC",
               `000057` = "Junts", `000071` = "EH Bildu", `000075` = "PNV", `000065` = "BNG", `000031` = "CC",
               `000074` = "UPN", `000032` = "Nueva Canarias", `000023` = "Teruel Existe", `000007` = "PACMA",
               `000053` = "CUP", `000001` = "Frente Obrero", `000043` = "Soria ¡Ya!", `000014` = "Escaños en Blanco")
etiqueta <- \(cabecera) coalesce(etiquetas[cabecera], cabecera)

# Fórmulas: reciben votos de las candidaturas que pasan la barrera y escaños; devuelven escaños por candidatura.
# Un empate en el último escaño para el cálculo: se resolvería por sorteo y la cifra no sería única.
por_divisores <- \(divisor) \(v, s) {
  cocientes <- outer(v, 0:(s - 1), \(x, k) x / divisor(k))
  orden <- order(cocientes, decreasing = TRUE)
  if (length(cocientes) > s && cocientes[orden[s]] == cocientes[orden[s + 1]]) stop("Empate en el último escaño")
  tabulate(row(cocientes)[orden[1:s]], length(v))
}
por_cuota <- \(cuota) \(v, s) {
  q <- cuota(sum(v), s)
  enteros <- floor(v / q)
  restos <- v / q - enteros
  falta <- s - sum(enteros)
  if (falta > 0 && falta < length(v) && sort(restos, TRUE)[falta] == sort(restos, TRUE)[falta + 1]) stop("Empate en los restos")
  enteros + (rank(-restos, ties.method = "first") <= falta)
}
dhondt <- por_divisores(\(k) k + 1)
sainte_lague <- por_divisores(\(k) 2 * k + 1)
sainte_lague_mod <- por_divisores(\(k) if_else(k == 0, 1.4, 2 * k + 1))
hare <- por_cuota(\(v, s) v / s)
droop <- por_cuota(\(v, s) floor(v / (s + 1)) + 1)

# Una circunscripción: barrera sobre `base` (los válidos, con el blanco) y reparto entre las que la pasan
reparto <- \(cand, base, s, formula, barrera) {
  entra <- cand$votos >= barrera * base
  escanos <- integer(nrow(cand))
  escanos[entra] <- formula(cand$votos[entra], s)
  mutate(cand, escanos = escanos)
}

# Circunscripciones: provincia, comunidad autónoma (Ceuta y Melilla aparte; ya lo son en `ccaa`) o una sola
circunscripciones <- \(clave, escanos = p$escanos_2023, base = p$validos) {
  tibble(circ = clave, base, escanos) |>
    summarise(base = sum(base), escanos = sum(escanos), .by = circ) |>
    left_join(votos |> mutate(circ = clave[match(provincia, p$provincia)]) |>
                summarise(votos = sum(votos), .by = c(circ, cabecera)) |> nest(cand = -circ), "circ")
}

simula <- \(circs, formula = dhondt, barrera = 0.03, fuera = character()) {
  circs |>
    mutate(r = pmap(list(cand, base, escanos), \(c, b, s) reparto(filter(c, !cabecera %in% fuera), b, s, formula, barrera))) |>
    select(r) |> unnest(r) |>
    summarise(escanos = sum(escanos), .by = cabecera) |>
    filter(escanos > 0) |>
    arrange(-escanos)
}

# LOREG, art. 162: 1 escaño a Ceuta y otro a Melilla, `minimo` por provincia y el resto por cuota de población
# de las 50 provincias, con restos mayores
loreg_162 <- \(poblacion, total = 350, minimo = 2) {
  ciudades <- p$provincia %in% c("51", "52")
  resto <- total - sum(ciudades) - minimo * sum(!ciudades)
  cuota <- sum(poblacion[!ciudades]) / resto
  enteros <- floor(poblacion / cuota)
  restos <- poblacion / cuota - enteros
  restos[ciudades] <- -Inf
  enteros[ciudades] <- 0
  falta <- resto - sum(enteros)
  if_else(ciudades, 1, minimo + enteros + (rank(-restos, ties.method = "first") <= falta))
}

# Comprobaciones: la LOREG reproduce los escaños de 2023 (población a 1-1-2022) y de 2026 (a 1-1-2025),
# y la simulación vigente reproduce el reparto oficial de cada provincia
provincias <- circunscripciones(p$provincia)
real <- votos |> summarise(escanos = sum(escanos), .by = cabecera) |> filter(escanos > 0) |> arrange(-escanos)
oficial <- votos |> filter(escanos > 0) |> select(provincia, cabecera, escanos) |> arrange(provincia, cabecera)
simulado <- provincias |>
  mutate(r = pmap(list(cand, base, escanos), \(c, b, s) reparto(c, b, s, dhondt, 0.03))) |>
  select(provincia = circ, r) |> unnest(r) |> filter(escanos > 0) |> select(provincia, cabecera, escanos) |>
  arrange(provincia, cabecera)
stopifnot(
  all(loreg_162(p$poblacion_2022) == p$escanos_2023),
  all(loreg_162(p$poblacion_2025) == p$escanos_2026),
  identical(simulado, oficial)
)

# Configuraciones del catálogo ----------------------------------------------------------------------

nacional <- votos |> summarise(votos = sum(votos), .by = cabecera) |> mutate(pct = 100 * votos / sum(p$validos))
bajo <- \(pct) nacional$cabecera[nacional$pct < pct]
por_tamano <- \(total, minimo) circunscripciones(p$provincia, escanos = loreg_162(p$poblacion_2022, total, minimo))

configuraciones <- list(
  B1 = list("Sin barrera", simula(provincias, barrera = 0)),
  B2 = list("Barrera del 5 %", simula(provincias, barrera = 0.05)),
  B3 = list("Barrera del 10 %", simula(provincias, barrera = 0.10)),
  B4 = list("Barrera del 3 % en toda España, además de la provincial", simula(provincias, fuera = bajo(3))),
  B5 = list("Barrera del 5 % en toda España, además de la provincial", simula(provincias, fuera = bajo(5))),
  B6 = list("Barrera del 3 % sin contar el voto en blanco",
            simula(circunscripciones(p$provincia, base = p$validos - p$blancos))),
  F1 = list("Sainte-Laguë", simula(provincias, sainte_lague)),
  F2 = list("Sainte-Laguë modificada (primer divisor 1,4)", simula(provincias, sainte_lague_mod)),
  F3 = list("Cuota Hare y restos mayores", simula(provincias, hare)),
  F4 = list("Cuota Droop y restos mayores", simula(provincias, droop)),
  C1 = list("Una circunscripción por comunidad autónoma", simula(circunscripciones(p$ccaa))),
  C2 = list("Circunscripción única, D'Hondt y barrera del 3 %", simula(circunscripciones(rep("ES", nrow(p))))),
  C3 = list("Circunscripción única, D'Hondt sin barrera", simula(circunscripciones(rep("ES", nrow(p))), barrera = 0)),
  C4 = list("Circunscripción única, Sainte-Laguë sin barrera",
            simula(circunscripciones(rep("ES", nrow(p))), sainte_lague, barrera = 0)),
  T1 = list("300 diputados", simula(por_tamano(300, 2))),
  T2 = list("400 diputados", simula(por_tamano(400, 2))),
  T3 = list("Mínimo de 1 diputado por provincia", simula(por_tamano(350, 1))),
  T4 = list("400 diputados y mínimo de 1", simula(por_tamano(400, 1)))
)

# Escaños como objeto {etiqueta: escaños}, de más a menos
escanos <- \(r) as.list(set_names(r$escanos, etiqueta(r$cabecera)))

# Detalle para las explicaciones: % de la candidatura en cada provincia donde la barrera del 10 % la deja fuera
# de un escaño que hoy tiene o que tendría, y escaños por provincia con 300 y con mínimo 1
b3 <- provincias |>
  mutate(r = pmap(list(cand, base, escanos), \(c, b, s) {
    hoy <- reparto(c, b, s, dhondt, 0.03)
    con <- reparto(c, b, s, dhondt, 0.10)
    hoy |> mutate(con = con$escanos, pct = 100 * votos / b) |> filter(escanos != con)
  })) |>
  select(provincia = circ, r) |> unnest(r) |>
  left_join(p |> select(provincia, nombre), "provincia") |>
  transmute(provincia = nombre, candidatura = etiqueta(cabecera), pct, real = escanos, con_el_cambio = con)

tamano <- p |> transmute(provincia = nombre, poblacion_2022, escanos_2023,
                         t1 = loreg_162(poblacion_2022, 300, 2), t2 = loreg_162(poblacion_2022, 400, 2),
                         t3 = loreg_162(poblacion_2022, 350, 1), t4 = loreg_162(poblacion_2022, 400, 1))

list(
  fuente = "Ministerio del Interior (infoelectoral), generales del 23-07-2023; INE, población a 1-1-2022; LOREG, arts. 162 y 163. Elaboración propia.",
  notas = list(
    voto = "Votos oficiales por provincia con el CERA; candidaturas agrupadas por su cabecera nacional.",
    barrera = "Porcentaje de los votos válidos (con el blanco) de la circunscripción; una candidatura con el porcentaje justo entra.",
    droop = "Cuota Droop = parte entera de votos / (escaños + 1), más 1.",
    tamano = "Escaños por provincia con la regla del art. 162 de la LOREG y la población a 1-1-2022, la del RD 400/2023."
  ),
  real = escanos(real),
  configuraciones = imap(configuraciones, \(c, id) list(id = id, nombre = c[[1]], escanos = escanos(c[[2]]))) |> unname(),
  voto_nacional = nacional |> arrange(-votos) |> filter(pct >= 0.1) |> transmute(candidatura = etiqueta(cabecera), votos, pct),
  barrera_10 = b3,
  escanos_por_tamano = tamano
) |>
  write_json("data/fontaneria_a09.json", auto_unbox = TRUE, pretty = TRUE, digits = NA)
