# Resultados de las generales del 23-07-2023 por provincia, con población y escaños -> data/resultados_2023_prov.json
# Encargo del 20-10-2026 (A7; sirve también para A9 y A11). Población de 2022 añadida el 25-10 para A9.
# Fuentes:
# - Ministerio del Interior, infoelectoral: ficheros 03, 05, 07 y 08 del proceso 02202307.
# - INE, Cifras oficiales de población (revisión del Padrón), tablas provinciales «Población por municipios y sexo».
# - INE, Estadística del Padrón Continuo, tabla 68526: población por relación entre lugar de nacimiento y residencia.
# - BOE: anexos del RD 400/2023 (escaños de 2023) y del RD 806/2026 (escaños de 2026).

library(tidyverse)
library(jsonlite)
source("R/infoelectoral.R")

eleccion <- "202307"
ua <- "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
pide <- \(url) httr2::request(url) |> httr2::req_user_agent(ua) |> httr2::req_perform()
ine <- \(ruta) pide(str_c("https://servicios.ine.es/wstempus/js/ES/", ruta)) |> httr2::resp_body_json()

# Interior ---------------------------------------------------------------------------------------

cand <- candidaturas(eleccion)
amb <- ambitos(eleccion)
prov <- amb |> filter(provincia != "99", distrito == "9")

residentes <- municipios(eleccion) |>
  summarise(censo_residentes = sum(censo), votantes_residentes = sum(blancos + nulos + votos_candidaturas), .by = provincia)

votos <- votos_ambitos(eleccion) |>
  filter(provincia != "99", distrito == "9", votos > 0) |>
  left_join(cand, "codigo") |>
  arrange(provincia, -votos)

# INE: cifras oficiales a 1-1-2022 (las del RD 400/2023, para A9), a 1-1-2023 y la más reciente ------------------------------------------------

tablas_dpop <- ine("TABLAS_OPERACION/DPOP") |>
  keep(\(t) str_detect(t$Nombre, ":\\s*Población por municipios y sexo")) |>
  map_int("Id")

poblacion <- map(tablas_dpop, \(id) {
  total <- ine(str_glue("DATOS_TABLA/{id}?nult=10&tip=AM")) |>
    detect(\(s) s$MetaData[[1]]$T3_Variable == "Provincias" && s$MetaData[[2]]$Nombre == "Total")
  tibble(provincia = total$MetaData[[1]]$Codigo, anyo = map_int(total$Data, "Anyo"), valor = map_dbl(total$Data, "Valor"))
}) |>
  list_rbind()

anyo_reciente <- max(poblacion$anyo)
pob <- poblacion |>
  filter(anyo %in% c(2022, 2023, anyo_reciente)) |>
  pivot_wider(names_from = anyo, values_from = valor, names_prefix = "poblacion_")

# INE: nacidos en el extranjero a 1-1-2023 (Padrón Continuo, tabla 68526) ------------------------

tabla_nacimiento <- 68526
meta <- \(s, variable) detect(s$MetaData, \(m) m$T3_Variable == variable)$Nombre %||% ""
nacimiento <- ine(str_glue("DATOS_TABLA/{tabla_nacimiento}?nult=4&tip=AM")) |>
  keep(\(s) meta(s, "Provincias") != "" && meta(s, "Totales de edad") == "Todas las edades" && meta(s, "Sexo") == "Total") |>
  map(\(s) tibble(provincia = detect(s$MetaData, \(m) m$T3_Variable == "Provincias")$Codigo,
                  lugar = meta(s, "Relacion entre lugar de nacimiento y residencia"),
                  valor = detect(s$Data, \(x) x$Anyo == 2023)$Valor)) |>
  list_rbind() |>
  filter(lugar %in% c("Total", "Nacido en el extranjero o en antiguos territorios españoles")) |>
  pivot_wider(names_from = lugar, values_from = valor) |>
  select(provincia, poblacion_padron_2023 = Total, nacidos_extranjero_2023 = last_col())

# BOE: escaños de cada circunscripción ------------------------------------------------------------

unidades <- c(uno = 1, dos = 2, tres = 3, cuatro = 4, cinco = 5, seis = 6, siete = 7, ocho = 8, nueve = 9,
              diez = 10, once = 11, doce = 12, trece = 13, catorce = 14, quince = 15, dieciséis = 16,
              diecisiete = 17, dieciocho = 18, diecinueve = 19, veinte = 20, veintiuno = 21, veintidós = 22,
              veintitrés = 23, veinticuatro = 24, veinticinco = 25, veintiséis = 26, veintisiete = 27,
              veintiocho = 28, veintinueve = 29, treinta = 30)
# El anexo de 2023 va en cifras; el de 2026, en letra («Treinta y ocho.»)
cifra <- \(x) {
  x <- str_to_lower(str_remove(str_trim(x), "\\.$"))
  if (str_detect(x, "^\\d+$")) as.numeric(x) else sum(unidades[str_split(x, " y ")[[1]]])
}
# Clave de nombre: sin tildes ni puntuación, sin el artículo («Balears (Illes)», «A Coruña») y con la
# primera en orden alfabético de las dos formas bilingües («Alicante/Alacant»)
clave <- \(x) x |>
  str_remove_all("\\(.*?\\)|,.*$") |>
  str_remove("^(A|La|Las|Illes) ") |>
  stringi::stri_trans_general("Latin-ASCII") |> str_to_lower() |>
  str_split("/") |> map_chr(\(p) min(str_remove_all(p, "[^a-z]")))

anexo <- \(id) {
  html <- pide(str_c("https://www.boe.es/diario_boe/xml.php?id=", id)) |> httr2::resp_body_string() |> xml2::read_xml()
  filas <- xml2::xml_find_all(html, "//table//tbody/tr")
  tibble(nombre = map_chr(filas, \(f) xml2::xml_text(xml2::xml_find_all(f, "td")[[1]])),
         escanos = map_dbl(filas, \(f) cifra(xml2::xml_text(xml2::xml_find_all(f, "td")[[2]])))) |>
    mutate(nombre = str_remove(nombre, "\\.$"), clave = clave(nombre))
}
rd_2023 <- "BOE-A-2023-12663"
rd_2026 <- "BOE-A-2026-20742"
esc <- full_join(anexo(rd_2023) |> select(clave, escanos_2023 = escanos),
                 anexo(rd_2026) |> select(clave, escanos_2026 = escanos), "clave")

# Unión y comprobaciones --------------------------------------------------------------------------

provincias <- prov |>
  transmute(provincia, nombre, ccaa, censo, votantes = blancos + nulos + votos_candidaturas, blancos, nulos,
            validos = blancos + votos_candidaturas, escanos_interior = escanos, clave = clave(nombre)) |>
  left_join(residentes, "provincia") |>
  mutate(censo_cera = censo - censo_residentes, votantes_cera = votantes - votantes_residentes) |>
  left_join(esc, "clave") |>
  left_join(pob, "provincia") |>
  left_join(nacimiento, "provincia")

stopifnot(
  nrow(provincias) == 52,
  !anyNA(provincias),
  sum(provincias$escanos_2023) == 350, sum(provincias$escanos_2026) == 350,
  all(provincias$escanos_2023 == provincias$escanos_interior),
  votos |> summarise(e = sum(escanos), .by = provincia) |> left_join(provincias, "provincia") |>
    with(all(e == escanos_2023)),
  all(provincias$censo_cera >= 0), all(provincias$votantes_cera >= 0)
)

nacional <- amb |> filter(ccaa == "99")
stopifnot(
  sum(provincias$censo) == nacional$censo,
  sum(provincias$votantes) == nacional$blancos + nacional$nulos + nacional$votos_candidaturas,
  sum(provincias$nulos) == nacional$nulos, sum(provincias$blancos) == nacional$blancos
)

# Salida ------------------------------------------------------------------------------------------

lista_votos <- votos |>
  select(provincia, codigo, siglas, denominacion, cabecera, votos, escanos) |>
  nest(candidaturas = -provincia)

# Candidaturas nacionales (presentes en la mitad de las provincias o más) que no se presentaron en la provincia:
# su voto es NA, no 0 (Vox en Santa Cruz de Tenerife; decisión del 20-10)
nacionales <- votos |> count(cabecera) |> filter(n >= 26) |>
  left_join(votos |> filter(codigo == cabecera) |> distinct(cabecera, siglas), "cabecera")
sin_candidatura <- provincias |>
  select(provincia) |>
  cross_join(nacionales) |>
  anti_join(votos, c("provincia", "cabecera")) |>
  summarise(sin_candidatura = list(siglas), .by = provincia)

salida <- provincias |>
  left_join(lista_votos, "provincia") |>
  left_join(sin_candidatura, "provincia") |>
  mutate(mas_votado = map_chr(candidaturas, \(d) d$siglas[1]),
         sin_candidatura = map(sin_candidatura, \(s) s %||% character())) |>
  select(provincia, nombre, ccaa, censo, censo_residentes, censo_cera, votantes, votantes_residentes,
         votantes_cera, blancos, nulos, validos, mas_votado, escanos_2023, escanos_2026,
         starts_with("poblacion_"), nacidos_extranjero_2023, sin_candidatura, candidaturas)

list(
  eleccion = "Congreso de los Diputados, 23-07-2023",
  notas = list(
    censo = "Censo de escrutinio con el CERA; censo_residentes suma los municipios (sin CERA); censo_cera es la diferencia.",
    votos = "Votos oficiales de cada candidatura, con el CERA. validos = blancos + votos a candidaturas.",
    candidaturas = "Siglas de la candidatura en la provincia; cabecera es el código de su candidatura de acumulación nacional.",
    sin_candidatura = "Siglas nacionales de las candidaturas presentes en 26 provincias o más que no se presentaron en esta. Su voto es NA (sin candidatura), no 0: en los mapas se pinta como sin dato.",
    poblacion = str_glue("Cifras oficiales del INE a 1 de enero de 2022 (las que fijaron los escaños de 2023, RD 400/2023), de 2023 y de {anyo_reciente} (la revisión más reciente)."),
    nacidos_extranjero_2023 = "INE, Estadística del Padrón Continuo a 1-1-2023 (tabla 68526), categoría «Nacido en el extranjero o en antiguos territorios españoles»; poblacion_padron_2023 es su total, el denominador del mismo origen."
  ),
  nacional = list(censo = nacional$censo, votantes = sum(salida$votantes), blancos = nacional$blancos,
                  nulos = nacional$nulos, validos = nacional$blancos + nacional$votos_candidaturas),
  provincias = salida
) |>
  write_json("data/resultados_2023_prov.json", auto_unbox = TRUE, pretty = TRUE, digits = NA)
