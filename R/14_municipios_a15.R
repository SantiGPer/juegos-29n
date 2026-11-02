# Fichas de los cinco municipios de A15 -> data/municipios_a15.json
# Encargo del 02-11-2026 (A15, diseño). Selección PROVISIONAL de Code, pendiente del autor sobre el catálogo
# (editorial/catalogos/a15-catalogo.md), con la regla del 01-11: dificultad creciente y nunca dos en la misma comunidad.
# Rótulos (decisión del 02-11): partidos estatales por su cabecera nacional; territoriales con su nombre.

library(tidyverse)
library(jsonlite)

d <- fromJSON("data/resultados_2023_mun.json")
cand <- as_tibble(d$candidaturas)

seleccion <- tribble(
  ~ine, ~ccaa, ~criterio,
  "20063", "País Vasco", "Feudo de EH Bildu (1.º en voto a EH Bildu, 5.000 habitantes o más)",
  "36024", "Galicia", "Extremo del PP (1.º en voto al PP, 5.000 habitantes o más)",
  "41013", "Andalucía", "Extremo del PSOE (1.º en voto al PSOE, 5.000 habitantes o más)",
  "19220", "Castilla-La Mancha", "Extremo de Vox (1.º en voto a Vox, 5.000 habitantes o más)",
  "35028", "Canarias", "«España en pequeño» (1.º, 7,13 puntos de distancia al reparto nacional)"
)

# Cabecera de 2023 -> rótulo y token de color de shared/base.css
partidos <- tribble(
  ~cabecera, ~etiqueta, ~color,
  "000005", "PP", "--pp", "000002", "PSOE", "--psoe", "000006", "Vox", "--vox", "000010", "Sumar", "--sumar",
  "000071", "EH Bildu", "--bildu", "000065", "BNG", "--bng", "000050", "ERC", "--erc", "000057", "Junts", "--junts",
  "000075", "PNV", "--pnv", "000031", "CC", "--cc", "000032", "NC", "--nc", "000023", "Teruel Existe", "--te",
  "000074", "UPN", "--upn", "000007", "PACMA", "--pacma"
)

# Siglas de la cabecera de 2008 (Interior) -> rótulo y token
partidos_2008 <- tribble(
  ~siglas, ~etiqueta, ~color,
  "P.P.", "PP", "--pp", "P.S.O.E.", "PSOE", "--psoe", "EAJ-PNV", "PNV", "--pnv", "CiU", "CiU", "--ciu",
  "B.N.G.", "BNG", "--bng", "ERC", "ERC", "--erc", "CC-PNC", "CC", "--cc"
)

# Nombre de la provincia como en el mapa («Las Palmas», no «Palmas, Las»)
provincias <- fromJSON("data/resultados_2023_prov.json")$provincias |> select(cod = provincia, provincia = nombre)

m <- as_tibble(d$municipios) |>
  filter(ine %in% seleccion$ine) |>
  mutate(cod = str_sub(ine, 1, 2)) |>
  left_join(provincias, "cod")
stopifnot(nrow(m) == 5, !anyNA(m$g2008_siglas))

reparto <- m |>
  select(ine, validos, votos) |>
  mutate(votos = map(votos, \(v) tibble(codigo = v[, 1], votos = as.numeric(v[, 2])))) |>
  unnest(votos) |>
  left_join(select(cand, codigo, cabecera), "codigo") |>
  summarise(votos = sum(votos), validos = first(validos), .by = c(ine, cabecera)) |>
  mutate(pct = 100 * votos / validos) |>
  arrange(ine, desc(votos)) |>
  mutate(pinta = pct >= 1 & row_number() <= 7, .by = ine) |>
  left_join(partidos, "cabecera")

stopifnot(!anyNA(filter(reparto, pinta)$etiqueta))

redondea <- \(x) round(x, 1)

fichas <- seleccion |>
  left_join(m, "ine") |>
  left_join(partidos_2008, by = c(g2008_siglas_cabecera = "siglas")) |>
  rename(etiqueta_2008 = etiqueta, color_2008 = color) |>
  pmap(\(ine, ccaa, criterio, nombre, provincia, poblacion_2023, lon, lat, votantes, blancos, nulos, validos, participacion, etiqueta_2008, color_2008, ...) {
    r <- filter(reparto, ine == !!ine)
    pintadas <- filter(r, pinta)
    stopifnot(!is.na(etiqueta_2008))
    list(
      ine = ine, nombre = nombre, provincia = provincia, ccaa = ccaa, criterio = criterio,
      lon = lon, lat = lat,
      ganador = list(etiqueta = pintadas$etiqueta[1], color = pintadas$color[1]),
      participacion = redondea(100 * participacion),
      reparto = transmute(pintadas, etiqueta, color, pct = redondea(pct)),
      otros = redondea(sum(filter(r, !pinta)$pct)),
      poblacion = poblacion_2023,
      blanco = redondea(100 * blancos / validos),
      nulo = redondea(100 * nulos / votantes),
      ganador_2008 = list(etiqueta = etiqueta_2008, color = color_2008)
    )
  })

list(
  nota = str_c(
    "Fichas de A15. SELECCIÓN PROVISIONAL de Code (02-11), pendiente del autor. Porcentajes con un decimal: ",
    "reparto, otros y blanco sobre voto válido; nulo sobre votantes; participación, votantes sobre censo sin CERA. ",
    "Reparto por cabecera nacional, hasta siete candidaturas con un 1 % o más; el resto, en otros. ",
    "lon y lat: núcleo capital (IGN). Ganador de 2008: candidatura más votada en las generales del 09-03-2008."
  ),
  fuente = "Ministerio del Interior (generales de 2023 y 2008); INE, padrón a 1-1-2023; IGN, Nomenclátor",
  municipios = fichas
) |>
  write_json("data/municipios_a15.json", auto_unbox = TRUE, digits = NA, pretty = TRUE)
