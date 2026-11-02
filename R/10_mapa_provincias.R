# Trazados SVG de las 52 provincias para A7 -> data/mapa_provincias.json
# Encargo del 21-10-2026 (A7, geometría). Diseño del 20-10 (docs/maquetas/maqueta-mapas-v10.html, variante A).
# Fuente: es-atlas 0.6.0 (provincias del IGN, BDLJE, CC BY 4.0), objeto `provinces`, sin Gibraltar.
# Península, Baleares, Ceuta y Melilla: cónica conforme de d3 (rotate [3.5, 0], parallels [37, 43]) sobre la esfera,
# ajustada a W de ancho. Canarias, con su propia cónica conforme, en el recuadro de abajo a la izquierda.

library(tidyverse)
library(jsonlite)
library(sf)

W <- 343
recuadro <- list(x1 = 116, y0 = 276, y1 = 332, margen = 2)
H <- recuadro$y1 + recuadro$margen
canarias <- c("35", "38")

url <- "https://cdn.jsdelivr.net/npm/es-atlas@0.6.0/es/provinces.json"
dir <- file.path(tools::R_user_dir("juegos29n", "cache"), "es-atlas", "0.6.0")
f <- file.path(dir, "provinces.json")
if (!file.exists(f)) {
  dir.create(dir, recursive = TRUE)
  download.file(url, f, mode = "wb")
}

lcc <- \(lon0, lat1, lat2) str_glue("+proj=lcc +lat_1={lat1} +lat_2={lat2} +lat_0=0 +lon_0={lon0} +R=6371008.8 +units=m")

nombres <- fromJSON("data/resultados_2023_prov.json")$provincias |> select(id = provincia, n = nombre)

prov <- st_read(f, layer = "provinces", quiet = TRUE) |>
  st_set_crs(4326) |>
  filter(id %in% nombres$id) |>
  select(id)
stopifnot(nrow(prov) == 52)

# Encaje de las coordenadas proyectadas en la caja de esquina (x0, y0) conservando la proporción, centradas y con y
# hacia abajo: x = k (X - xmin) + dx, y = -k (Y - ymax) + dy. Sin alto, se ajusta solo al ancho.
encaje <- \(g, x0, y0, ancho, alto = Inf) {
  b <- st_bbox(g)
  bw <- b[["xmax"]] - b[["xmin"]]
  bh <- b[["ymax"]] - b[["ymin"]]
  k <- min(ancho / bw, alto / bh)
  list(k = k, xmin = b[["xmin"]], ymax = b[["ymax"]], dx = x0 + (ancho - k * bw) / 2, dy = y0 + if (is.finite(alto)) (alto - k * bh) / 2 else 0)
}
aplica <- \(g, e) (g - c(e$xmin, e$ymax)) * matrix(c(e$k, 0, 0, -e$k), 2) + c(e$dx, e$dy)

m <- recuadro$margen
conicas <- list(peninsula = c(lon0 = -3.5, lat1 = 37, lat2 = 43), canarias = c(lon0 = -15.75, lat1 = 27.5, lat2 = 29.5))
peninsula <- prov |> filter(!id %in% canarias) |> st_transform(exec(lcc, !!!conicas$peninsula))
islas <- prov |> filter(id %in% canarias) |> st_transform(exec(lcc, !!!conicas$canarias))
encajes <- list(
  peninsula = encaje(st_geometry(peninsula), 0, 0, W),
  canarias = encaje(st_geometry(islas), m, recuadro$y0 + 2 * m, recuadro$x1 - 4 * m, recuadro$y1 - recuadro$y0 - 2 * m)
)
st_geometry(peninsula) <- aplica(st_geometry(peninsula), encajes$peninsula)
st_geometry(islas) <- aplica(st_geometry(islas), encajes$canarias)

# La península no puede entrar en el recuadro de Canarias
esquina <- st_coordinates(peninsula) |> as_tibble() |> filter(X < recuadro$x1)
stopifnot(max(esquina$Y) < recuadro$y0)

anillo <- \(xy) {
  xy <- round(xy[-nrow(xy), 1:2], 2)
  xy <- xy[c(TRUE, rowSums(abs(diff(xy))) > 0), , drop = FALSE]
  str_c("M", str_c(xy[, 1], ",", xy[, 2], collapse = "L"), "Z")
}
trazado <- \(g) g |> st_cast("POLYGON") |> map(\(p) map_chr(p, anillo)) |> unlist() |> str_c(collapse = "")

todas <- bind_rows(peninsula, islas)
p <- todas |>
  st_drop_geometry() |>
  mutate(d = map_chr(st_geometry(todas), \(g) trazado(st_sfc(g))),
         c = map(st_centroid(st_geometry(todas)), \(x) round(as.numeric(x), 2))) |>
  left_join(nombres, "id") |>
  select(id, n, d, c) |>
  arrange(id)

list(
  nota = "Trazados en coordenadas SVG (viewBox 0 0 W H), ya proyectados. `borde` es la escuadra del recuadro de Canarias (lados superior y derecho). `c` es el centroide de cada provincia, para las casillas de Ceuta y Melilla. `proyecciones`: cónica conforme sobre la esfera (R = 6.371.008,8 m, lat0 = 0) de la península y de Canarias, y su encaje: x = k (X - xmin) + dx, y = -k (Y - ymax) + dy (A15).",
  fuente = "es-atlas 0.6.0 (provinces.json), a partir del IGN (BDLJE, CC BY 4.0)",
  W = W,
  H = H,
  borde = str_glue("M0,{recuadro$y0}H{recuadro$x1}V{recuadro$y1}"),
  proyecciones = imap(conicas, \(c, panel) c(as.list(c), encajes[[panel]])),
  p = p
) |>
  write_json("data/mapa_provincias.json", auto_unbox = TRUE, digits = NA)
