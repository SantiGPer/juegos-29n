# Voto declarado a PP, PSOE, Vox y Sumar por edad, sexo y hábitat (CIS 3420) -> data/cis_postelectoral_2023.json
# Encargo del 20-10-2026 (A8). Fuente: CIS, estudio 3420, «Barómetro de septiembre 2023. Postelectoral elecciones
# generales 2023», microdato https://www.cis.es/documents/d/cis/MD3420 (CATI, 1 al 12-09-2023).
# Base: voto válido declarado en RECUVOTOG1 (partidos y «Otro partido»), sin abstención, blanco, nulo, «No recuerda»
# ni N.C. Ponderación PESO (la de la muestra nacional según la ficha técnica). Intervalo al 95 % con la n efectiva
# de Kish, porque los pesos varían por comunidad.

library(tidyverse)
library(jsonlite)

estudio <- "3420"
url_md <- str_c("https://www.cis.es/documents/d/cis/MD", estudio)
dir <- file.path(tools::R_user_dir("juegos29n", "cache"), "cis", estudio)
if (!dir.exists(dir)) {
  dir.create(dir, recursive = TRUE)
  zip <- file.path(dir, "MD.zip")
  httr2::request(url_md) |> httr2::req_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)") |> httr2::req_perform(path = zip)
  unzip(zip, exdir = dir)
}
d <- haven::read_sav(file.path(dir, str_c(estudio, ".sav")))

partidos <- c(PP = 2, PSOE = 1, Vox = 3, Sumar = 21)
excluidos <- c(blanco = 8996, nulo = 9977, no_recuerda = 9998, nc = 9999)

# Tramos de edad de los marginales del propio CIS (pregunta 0b)
tramos <- c(-Inf, 24, 34, 44, 54, 64, 74, Inf)
nombres_edad <- c("18 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "65 a 74", "75 y más")

v <- d |>
  transmute(voto = as.numeric(RECUVOTOG1), peso = as.numeric(PESO),
            edad = cut(as.numeric(EDAD), tramos, nombres_edad),
            sexo = haven::as_factor(SEXO, levels = "labels") |> fct_drop(),
            habitat = haven::as_factor(TAMUNI, levels = "labels") |> fct_drop()) |>
  filter(!is.na(voto), !voto %in% excluidos)

celdas <- \(segmentacion, datos = v) datos |>
  rename(segmento = all_of(segmentacion)) |>
  cross_join(enframe(partidos, "partido", "codigo")) |>
  summarise(
    n = n(),
    n_partido = sum(voto == codigo),
    p = sum(peso * (voto == codigo)) / sum(peso),
    n_efectiva = sum(peso)^2 / sum(peso^2),
    .by = c(segmento, partido)
  ) |>
  arrange(segmento) |>
  mutate(
    segmento = as.character(segmento),
    segmentacion = segmentacion,
    pct = 100 * p,
    ic95_inf = 100 * pmax(0, p - 1.96 * sqrt(p * (1 - p) / n_efectiva)),
    ic95_sup = 100 * pmin(1, p + 1.96 * sqrt(p * (1 - p) / n_efectiva)),
    n_menor_100 = n < 100
  ) |>
  select(segmentacion, segmento, partido, pct, ic95_inf, ic95_sup, n, n_partido, n_efectiva, n_menor_100)

resultado <- map(c("edad", "sexo", "habitat"), celdas) |> list_rbind()
total <- celdas("todos", mutate(v, todos = "Total"))

# Comparación: resultado real de 2023 (data/resultados_2023_prov.json, con el CERA)
r <- fromJSON("data/resultados_2023_prov.json")
cabeceras <- c(PP = "000005", PSOE = "000002", Vox = "000006", Sumar = "000010")
votos_real <- r$provincias |> select(candidaturas) |> unnest(candidaturas) |>
  summarise(votos = sum(votos), .by = cabecera)
real <- enframe(cabeceras, "partido", "cabecera") |>
  left_join(votos_real, "cabecera") |>
  mutate(pct_validos = 100 * votos / r$nacional$validos,
         pct_candidaturas = 100 * votos / (r$nacional$validos - r$nacional$blancos)) |>
  select(-cabecera)

stopifnot(nrow(resultado) == (7 + 2 + 7) * 4, !anyNA(resultado))

list(
  estudio = str_glue("CIS {estudio}, Barómetro de septiembre 2023. Postelectoral elecciones generales 2023"),
  url = url_md,
  campo = "CATI, del 1 al 12 de septiembre de 2023",
  casos_microdato = nrow(d),
  base = "Voto válido declarado (RECUVOTOG1): partidos y «Otro partido». Fuera: abstención, blanco, nulo, «No recuerda» y N.C.",
  ponderacion = "PESO",
  intervalo = "95 %, normal con n efectiva de Kish (suma de pesos al cuadrado entre suma de pesos al cuadrado)",
  n = "Casos sin ponderar de la base en el segmento; n_partido, los que declaran ese partido. n_menor_100 marca la base del segmento.",
  celdas = resultado,
  total = total,
  real_2023 = list(
    nota = "pct_validos: sobre voto válido oficial (con blanco). pct_candidaturas: sobre votos a candidaturas (sin blanco), la base comparable a la de la encuesta.",
    partidos = real
  )
) |>
  write_json("data/cis_postelectoral_2023.json", auto_unbox = TRUE, pretty = TRUE, digits = NA)
