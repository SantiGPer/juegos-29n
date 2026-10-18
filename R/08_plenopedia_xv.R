# Plenopedia (A3), prueba de viabilidad: indicadores del Pleno de la XV -> data/plenopedia_xv.json
# Encargo del 19-10-2026. Lee los PDF del Diario de Sesiones que ya descargó R/05 (misma caché).
# Unidad de texto: intervención (de una etiqueta de orador a la siguiente). Palabras = las del orador,
# sin acotaciones ni el original en catalán, gallego o euskera (el Diario publica el original y la
# interpretación al castellano: solo se cuenta la interpretación).

library(tidyverse)
library(pdftools)
library(jsonlite)

cache <- file.path(tools::R_user_dir("juegos29n", "cache"), "ds", 15)
diarios <- list.files(cache, "^DSCD-15-PL-\\d+(-C\\d)?\\.PDF$", full.names = TRUE)
if (nzchar(Sys.getenv("PRUEBA"))) diarios <- diarios[str_detect(basename(diarios), Sys.getenv("PRUEBA"))]

meses <- c("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
           "agosto", "septiembre", "octubre", "noviembre", "diciembre")
fecha_iso <- \(x) {
  m <- str_match(x, "(\\d{1,2}) de (\\w+) de (\\d{4})")
  sprintf("%s-%02d-%02d", m[, 4], match(str_to_lower(m[, 3]), meses), as.integer(m[, 2]))
}

# Horas en letra: «a las tres y un minuto de la tarde», «Eran las doce y cuarto de la noche»
unidades <- c(un = 1, una = 1, uno = 1, dos = 2, tres = 3, cuatro = 4, cinco = 5, seis = 6, siete = 7,
              ocho = 8, nueve = 9, diez = 10, once = 11, doce = 12, trece = 13, catorce = 14, quince = 15,
              dieciséis = 16, diecisiete = 17, dieciocho = 18, diecinueve = 19, veinte = 20, veintiún = 21,
              veintiuno = 21, veintiuna = 21, veintidós = 22, veintitrés = 23, veinticuatro = 24,
              veinticinco = 25, veintiséis = 26, veintisiete = 27, veintiocho = 28, veintinueve = 29,
              cuarto = 15, media = 30)
decenas <- c(treinta = 30, cuarenta = 40, cincuenta = 50)
numero <- \(x) {
  p <- str_split_1(str_squish(x), " y ")
  sum(coalesce(decenas[p], unidades[p]))
}
hora <- \(x) {
  m <- str_match(x, "las? (\\w+)(?: horas)?(?: (y|menos) ([\\wáéíóú ]+?))?(?: minutos?)?(?: en punto)? (?:de la|del) (mañana|mediodía|tarde|noche|madrugada)")
  if (is.na(m[1])) return(NA_real_)
  h <- unidades[[m[2]]]
  min <- if (is.na(m[3])) 0 else if (m[3] == "y") numero(m[4]) else -numero(m[4])
  h <- case_when(
    m[5] %in% c("tarde", "mediodía") & h < 12 ~ h + 12,
    m[5] == "noche" & h >= 6 & h < 12 ~ h + 12,
    m[5] == "noche" & h == 12 ~ 24,
    m[5] == "noche" & h < 6 ~ h + 24,
    m[5] == "madrugada" ~ h + 24,
    .default = h
  )
  h + min / 60
}

# Idioma de un párrafo: palabras funcionales exclusivas del castellano frente a las del catalán,
# el gallego y el euskera
castellano <- c("y", "los", "las", "muy", "hay", "usted", "ustedes", "también", "el", "del", "no", "con",
                "pero", "gracias", "señor", "señora", "señorías", "porque", "esto", "eso", "hoy", "es", "son",
                "está", "tiene", "lo", "le", "doña", "don")
otras <- c("i", "els", "amb", "però", "molt", "això", "aquest", "aquesta", "vostè", "vostès", "perquè",
           "gràcies", "moltes", "senyor", "senyora", "senyories", "avui", "hem", "és",
           "e", "os", "non", "unha", "tamén", "moi", "hai", "vostede", "grazas", "moito", "obrigado", "polo",
           "pola", "ao", "nós", "xa", "isto", "iso", "señorías", "eta", "ez", "bat", "dugu", "du", "baina",
           "ere", "dira", "gara", "dute", "behar", "eskerrik", "asko", "egun", "on", "hori", "hau", "dago")
otras <- setdiff(otras, castellano)
es_castellano <- \(p) {
  w <- str_to_lower(str_extract_all(p, "\\p{L}+")[[1]])
  sum(w %in% castellano) >= sum(w %in% otras) + str_count(p, "[àèòïç]|l·l")
}

# Etiqueta de orador en mayúsculas, con las erratas del Diario: «EL señor», «El Señor», punto en lugar
# de dos puntos o sin signo («La señora PRESIDENTA Ha habido un empate»)
mayus <- "(?:[\\p{Lu}\\d][\\p{Lu}\\d'’·\\-,]+|Y|I|E|O|A)"
etiqueta <- str_c("^(?:E[Ll] [Ss]eñor|L[Aa] [Ss]eñora) (", mayus, "(?: ", mayus, ")*)(?: \\(([^)]{1,150})\\))?(?:[:.]| (?=\\p{Lu}\\p{Ll}))")
empieza_etiqueta <- "^(?:E[Ll] [Ss]eñor|L[Aa] [Ss]eñora) \\p{Lu}{2,}"
acotacion <- "\\(([^()]*)\\)"
interjeccion <- "^(?:El|La|Un|Una|Unos|Unas|Varios|Varias) (?:señor|señora|señores|señoras)[^:]{0,150}:"
cierre <- "^(?:Eran? las?|Se (?:suspende|levanta) la sesión a l)"
narracion <- "^(?:Efectuada la votación|Se (?:abre|reanuda|suspende|levanta) la sesión|Eran? las?)"

terminos <- list(
  ETA = regex("\\bETA\\b"),
  Franco = regex("(?<!señora |señor )\\bFranco\\b"),
  Venezuela = regex("\\bVenezuela\\b"),
  España = regex("\\bEspaña\\b"),
  Cataluña = regex("\\bCataluña\\b"),
  vivienda = regex("\\bviviendas?\\b", ignore_case = TRUE),
  corrupción = regex("\\bcorrupci(?:ón|ones)\\b", ignore_case = TRUE),
  Europa = regex("\\bEuropa\\b"),
  amnistía = regex("\\bamnist[íi]a\\b", ignore_case = TRUE),
  Palestina = regex("\\bPalestina\\b"),
  Sánchez = regex("\\bSánchez\\b"),
  Feijóo = regex("\\bFeij[óo]o\\b"),
  Abascal = regex("\\bAbascal\\b"),
  Puigdemont = regex("\\bPuigdemont\\b")
)


palabras <- \(x) str_count(x, "[\\p{L}\\p{N}]+(?:[’'·.,\\-][\\p{L}\\p{N}]+)*")

# Un diario -> lista de tablas pequeñas; el texto completo no sale de la función (memoria)
lee <- \(f) {
  rds <- str_c(f, ".pleno.rds")
  if (file.exists(rds)) return(readRDS(rds))
  hojas <- pdf_text(f)
  portada <- str_squish(hojas[1])
  lineas <- map(hojas, \(h) {
    # El sello «cve:» va al margen y a veces comparte línea con el texto («Eran las…  cve: DSCD-15-PL-46»)
    l <- str_remove(str_split_1(h, "\n"), "\\s*cve: DSCD-\\S+\\s*$")
    l <- l[!str_detect(l, "DIARIO DE SESIONES DEL CONGRESO|^\\s*PLENO Y DIPUTACIÓN PERMANENTE|^\\s*Núm\\. \\d+ .*Pág\\. \\d+")]
    # Párrafo nuevo: línea sangrada, título en mayúsculas, etiqueta de orador o narración. Las líneas en
    # blanco no separan: el sello «cve:» deja huecos a mitad de párrafo
    l <- l[str_detect(l, "\\S")]
    ind <- str_length(str_extract(l, "^ *"))
    letras <- str_count(l, "\\p{L}")
    titulo <- letras >= 3 & str_count(l, "\\p{Lu}") > 0.6 * letras
    base <- as.integer(names(which.max(table(ind))))
    tibble(linea = str_trim(l)) |>
      mutate(nuevo = ind >= base + 3 | titulo | lag(titulo, default = FALSE) |
               str_detect(linea, empieza_etiqueta) | str_detect(linea, narracion))
  }) |>
    list_rbind() |>
    mutate(parrafo = cumsum(nuevo)) |>
    filter(linea != "")
  parrafos <- lineas |>
    summarise(texto = str_c(linea, collapse = " "), .by = parrafo) |>
    mutate(texto = str_remove_all(texto, "[­​‌]") |>
             str_replace_all("‑", "-") |>
             str_replace_all("(\\p{Ll})- (\\p{Ll})", "\\1\\2"))
  # Etiquetas largas que el maquetado parte en dos párrafos: se unen al siguiente
  partida <- which(str_detect(parrafos$texto, empieza_etiqueta) & !str_detect(parrafos$texto, etiqueta))
  unida <- str_c(parrafos$texto[partida], " ", coalesce(parrafos$texto[partida + 1], ""))
  partida <- partida[str_detect(unida, etiqueta)]
  if (length(partida)) {
    parrafos$texto[partida] <- str_c(parrafos$texto[partida], " ", parrafos$texto[partida + 1])
    parrafos <- parrafos[-(partida + 1), ]
  }
  inicio <- which(str_detect(parrafos$texto, etiqueta))[1]
  fin <- max(which(str_detect(parrafos$texto, cierre)), inicio)
  apertura <- last(keep(parrafos$texto[seq_len(inicio)], \(p) str_detect(p, "^Se (?:abre|reanuda) la sesión")))
  cuerpo <- parrafos[inicio:fin, ] |>
    mutate(
      texto = str_replace_all(texto, "\\((EAJ-PNV)\\)", "[\\1]"),
      nueva = str_detect(texto, etiqueta),
      intervencion = cumsum(nueva),
      orador = if_else(nueva, str_extract(texto, etiqueta), NA_character_),
      texto = if_else(nueva, str_remove(texto, etiqueta), texto)
    ) |>
    fill(orador)
  acots <- cuerpo |>
    mutate(a = str_match_all(texto, acotacion)) |>
    select(intervencion, orador, parrafo, a) |>
    mutate(a = map(a, \(m) m[, 2])) |>
    unnest(a)
  habla <- cuerpo |>
    mutate(texto = str_squish(str_remove_all(texto, acotacion))) |>
    filter(!str_detect(texto, narracion), str_count(texto, "\\p{Lu}") <= 0.6 * str_count(texto, "\\p{L}")) |>
    mutate(castellano = map_lgl(texto, es_castellano))
  intervenciones <- habla |>
    summarise(
      orador = first(orador),
      palabras = sum(palabras(texto[castellano])),
      palabras_otra_lengua = sum(palabras(texto[!castellano])),
      texto = str_c(texto[castellano], collapse = " "),
      .by = intervencion
    ) |>
    mutate(map_dfc(terminos, \(t) str_count(texto, t))) |>
    select(-texto)
  res <- list(
    diario = basename(f),
    portada = portada,
    apertura = apertura,
    cierre = parrafos$texto[fin],
    pausas = keep(parrafos$texto[inicio:fin], \(p) str_detect(p, "^Se (?:suspende|reanuda) la sesión")),
    intervenciones = intervenciones,
    acotaciones = acots,
    otra_lengua = habla |> filter(!castellano) |> transmute(intervencion, muestra = str_trunc(texto, 160)),
    # Párrafos con forma de etiqueta que la expresión no reconoce: control de la atribución
    sospechosos = parrafos$texto[str_detect(parrafos$texto, "^(?i:el|la) (?i:señor|señora) \\p{Lu}{2,}") &
                                   !str_detect(parrafos$texto, etiqueta)],
    sin_cierre = !any(str_detect(parrafos$texto, cierre))
  )
  saveRDS(res, rds)
  res
}

leidos <- map(diarios, lee, .progress = "diarios")
apila <- \(campo) map(leidos, \(r) mutate(as_tibble(r[[campo]]), diario = r$diario)) |> list_rbind()

# Pausas dentro de la jornada: «Se suspende la sesión a las…» seguido de «Se reanuda la sesión a las…».
# Si la suspensión no lleva hora, la duración neta queda sin calcular
pausa <- \(p) {
  h <- map_dbl(p, hora)
  s <- str_detect(p, "^Se suspende")
  i <- which(s & lead(!s, default = FALSE))
  sum(h[i + 1] - h[i])
}

# Jornadas: un diario (con sus partes -C1, -C2…) es un día de sesión. Fuera la Diputación Permanente
# (sin número de sesión plenaria) y el diario 9, su constitución, que lleva «Sesión plenaria núm. 1»
jornadas <- map(leidos, \(r) tibble(diario = r$diario, portada = r$portada, apertura = r$apertura,
                                    cierre = r$cierre, sin_cierre = r$sin_cierre, pausas = length(r$pausas),
                                    horas_pausa = pausa(r$pausas))) |>
  list_rbind() |>
  mutate(
    numero = as.integer(str_match(diario, "PL-(\\d+)")[, 2]),
    parte = coalesce(as.integer(str_match(diario, "-C(\\d)")[, 2]), 0L),
    sesion = as.integer(str_match(portada, "Sesión (?:[Pp]lenaria )?núm\\. (\\d+)")[, 2]),
    fecha = fecha_iso(str_match(portada, "celebrada el \\w+,? (\\d{1,2} de \\w+ de \\d{4})")[, 2]),
    minuto_silencio_orden_del_dia = str_detect(portada, "Minuto de silencio")
  ) |>
  arrange(numero, parte) |>
  group_by(numero) |>
  fill(sesion, fecha) |>
  ungroup() |>
  filter(!is.na(sesion), numero != 9)

partes <- select(jornadas, diario, numero, sesion, fecha)
jornadas <- jornadas |>
  summarise(sesion = first(sesion), fecha = first(fecha), apertura = first(apertura), cierre = last(cierre),
            sin_cierre = any(sin_cierre), pausas = sum(pausas), horas_pausa = sum(horas_pausa),
            minuto_silencio_orden_del_dia = any(minuto_silencio_orden_del_dia), .by = numero) |>
  mutate(
    cierre = str_remove(cierre, "(?<=\\.) (?:En el caso|http).*$"),
    hora_apertura = map_dbl(apertura, hora),
    hora_cierre = if_else(sin_cierre, NA_real_, map_dbl(cierre, hora)),
    horas = hora_cierre - hora_apertura,
    horas_netas = horas - horas_pausa
  )

# Oradores: Mesa, Gobierno (presidente, vicepresidentes y ministros, también en funciones), diputados
# con el grupo de ese día y otros (representantes autonómicos, Defensor del Pueblo…).
# Entre paréntesis va el nombre («MINISTRO DEL INTERIOR (Grande-Marlaska Gómez)») o, en minúscula, la
# función («NÚÑEZ FEIJÓO (candidato a la Presidencia del Gobierno)»)
norm <- \(x) str_squish(str_replace_all(stringi::stri_trans_general(str_to_upper(x), "Latin-ASCII"), "[^A-Z ]", " "))
clave <- \(x) str_squish(str_remove_all(norm(x), "\\b(?:DE|DEL|LA|LOS|LAS|Y|I|E)\\b"))
fichas <- \(x) str_split(x, " ")
ordinal <- "(?: PRIMER[OA]| SEGUND[OA]| TERCER[OA]| CUART[OA])?"
mesa <- str_c("^(?:PRESIDENT[EA]|VICEPRESIDENT[EA]", ordinal, "|SECRETARI[OA]", ordinal,
              "|PRESIDENT[EA] DE LA MESA DE EDAD|SECRETARI[OA] DE LA MESA DE EDAD|PRESIDENT[EA] DEL CONGRESO DE LOS DIPUTADOS)$")

periodos <- fromJSON("data/diputados_xv.json")$periodos |>
  as_tibble() |>
  mutate(desde = ymd(desde), hasta = coalesce(ymd(hasta), ymd("2026-12-31")))
diputados <- distinct(periodos, nombre, apellidos) |> mutate(k = clave(apellidos))
stopifnot(!anyDuplicated(diputados$k))

# Apellidos de la etiqueta -> diputado: igual; si no, a dos letras o menos de uno solo (erratas como
# «GAMARA», «ÁLVREZ»); si no, uno solo que empiece igual («RODRÍGUEZ DE MILLÁN») o cuyos apellidos
# estén todos en la etiqueta («MARTA MADRENAS I MIR»). Las etiquetas con nombre entre paréntesis
# (representantes autonómicos, Defensor del Pueblo…) solo valen si coinciden exactamente
uno <- \(x) if (length(x) == 1) x else NA_character_
resuelve <- \(k, exacto) map2_chr(k, exacto, \(x, e) {
  igual <- diputados$nombre[diputados$k == x]
  if (length(igual) == 1 || e) return(uno(igual))
  d <- adist(x, diputados$k)[1, ]
  if (min(d) <= 2 && sum(d == min(d)) == 1) return(diputados$nombre[which.min(d)])
  t <- fichas(x)[[1]]
  empieza <- diputados$nombre[map_lgl(fichas(diputados$k), \(u) identical(head(u, length(t)), t))]
  if (length(empieza) == 1) return(empieza)
  uno(diputados$nombre[map_lgl(fichas(diputados$k), \(u) all(u %in% t))])
})

# Un mismo miembro del Gobierno escrito de varias formas («Grande-Marlaska», «Grande Marlaska Gómez»,
# «Pérez SánchezCastejón», «Cuerpo Cabello»): se une a la forma más frecuente si unas palabras contienen
# a las otras, si tienen las mismas letras o si difieren en tres letras o menos (dos en claves cortas)
letras <- \(x) str_c(sort(str_split_1(str_remove_all(x, " "), "")), collapse = "")
parecidas <- \(x, c) all(fichas(x)[[1]] %in% fichas(c)[[1]]) || all(fichas(c)[[1]] %in% fichas(x)[[1]]) ||
  letras(x) == letras(c) || adist(x, c) <= if_else(min(nchar(x), nchar(c)) >= 12, 3, 2)
une <- \(k, peso) {
  orden <- unique(k[order(-peso)])
  canon <- reduce(orden, \(acc, x) {
    previa <- keep(unname(acc), \(c) parecidas(x, c))
    c(acc, set_names(if (length(previa)) previa[1] else x, x))
  }, .init = character())
  unname(canon[k])
}

intervenciones <- apila("intervenciones") |>
  inner_join(partes, by = "diario") |>
  # La etiqueta sin signo final solo se reconoce seguida de texto: se le añade un relleno
  mutate(
    cargo = str_match(str_c(str_trim(orador), " Xx"), etiqueta)[, 2],
    parentesis = str_match(str_c(str_trim(orador), " Xx"), etiqueta)[, 3],
    rol = coalesce(str_detect(parentesis, "^\\p{Ll}"), FALSE),
    persona = if_else(rol | is.na(parentesis), cargo, parentesis),
    funcion = if_else(rol, parentesis, cargo),
    candidato = str_detect(funcion, regex("candidat", ignore_case = TRUE)),
    tipo = case_when(
      !rol & str_detect(cargo, mesa) ~ "Mesa",
      candidato & clave(persona) == "SANCHEZ PEREZ CASTEJON" ~ "Gobierno",
      !candidato & str_detect(funcion, regex("ministr|del gobierno", ignore_case = TRUE)) ~ "Gobierno",
      .default = "Diputado"
    ),
    exacto = !rol & !is.na(parentesis),
    k = clave(persona),
    dia = ymd(fecha)
  )

nombres <- intervenciones |>
  filter(tipo == "Diputado") |>
  distinct(k, persona, exacto) |>
  mutate(nombre = resuelve(k, exacto))
# Las etiquetas del Gobierno sin nombre («El señor PRESIDENTE DEL GOBIERNO:») no entran en la unión:
# toman el miembro del mismo cargo en el mismo diario
gobierno_k <- intervenciones |>
  filter(tipo == "Gobierno", persona != funcion) |>
  summarise(palabras = sum(palabras), .by = k) |>
  mutate(miembro = une(k, palabras))

intervenciones <- intervenciones |>
  left_join(distinct(nombres, k, exacto, nombre), by = c("k", "exacto")) |>
  left_join(select(gobierno_k, k, miembro), by = "k") |>
  group_by(diario, funcion) |>
  fill(miembro, .direction = "downup") |>
  ungroup() |>
  left_join(select(periodos, nombre, grupo, partido_mixto, desde, hasta), by = join_by(nombre, between(dia, desde, hasta))) |>
  mutate(
    nombre = if_else(tipo == "Diputado", nombre, NA_character_),
    categoria = case_when(tipo != "Diputado" ~ tipo, !is.na(grupo) ~ grupo, .default = "Otros")
  ) |>
  select(-desde, -hasta)

# Nombre legible de cada miembro del Gobierno: la grafía más frecuente de su grupo de claves
miembros <- intervenciones |>
  filter(tipo == "Gobierno") |>
  count(miembro, persona, wt = palabras) |>
  slice_max(n, by = miembro, with_ties = FALSE) |>
  select(miembro, miembro_nombre = persona)
intervenciones <- left_join(intervenciones, miembros, by = "miembro")

grupos <- c("PP", "PSOE", "Vox", "Sumar", "ERC", "Junts", "EH Bildu", "PNV", "Mixto")
inicio_xv <- ymd("2023-08-17")
fin_xv <- ymd("2026-10-06")
dias_xv <- as.numeric(fin_xv - inicio_xv) + 1
escanos <- periodos |>
  mutate(dias = pmax(0, as.numeric(pmin(hasta, fin_xv) - pmax(desde, inicio_xv)) + 1)) |>
  summarise(escanos = sum(dias) / dias_xv, .by = c(grupo, partido_mixto))

por_grupo <- intervenciones |>
  filter(categoria %in% grupos) |>
  summarise(palabras = sum(palabras), .by = grupo) |>
  left_join(summarise(escanos, escanos = sum(escanos), .by = grupo), by = "grupo") |>
  mutate(
    palabras_por_escano = palabras / escanos,
    cociente = (palabras / sum(palabras)) / (escanos / sum(escanos))
  ) |>
  arrange(desc(palabras_por_escano))

mixto <- intervenciones |>
  filter(categoria == "Mixto") |>
  summarise(palabras = sum(palabras), .by = partido_mixto) |>
  left_join(filter(escanos, grupo == "Mixto"), by = "partido_mixto") |>
  mutate(palabras_por_escano = palabras / escanos) |>
  arrange(desc(palabras_por_escano))

# Charlatán: los diputados, sin el Gobierno ni la Mesa; los que no hablaron cuentan con 0
charlatan <- intervenciones |>
  filter(tipo == "Diputado", !is.na(nombre)) |>
  summarise(palabras = sum(palabras), intervenciones = n(), grupos = str_c(unique(grupo), collapse = " → "), .by = nombre) |>
  right_join(distinct(periodos, nombre), by = "nombre") |>
  mutate(across(c(palabras, intervenciones), \(x) coalesce(x, 0L))) |>
  arrange(desc(palabras))

gobierno <- intervenciones |>
  filter(tipo == "Gobierno") |>
  summarise(palabras = sum(palabras), intervenciones = n(), grafias = str_c(unique(persona), collapse = " | "),
            cargos = str_c(unique(funcion), collapse = " | "), .by = miembro_nombre) |>
  arrange(desc(palabras))

otros <- intervenciones |>
  filter(categoria == "Otros") |>
  summarise(palabras = sum(palabras), intervenciones = n(), .by = orador) |>
  arrange(desc(palabras))

# Acotaciones: cada pieza entre rayas cuenta una vez («Rumores.―Aplausos» = un rumor y un aplauso).
# Se atribuyen a la intervención en curso. Las interjecciones («El señor X: ¡Mentira!») no cuentan
piezas <- apila("acotaciones") |>
  inner_join(select(intervenciones, diario, intervencion, categoria, dia), by = c("diario", "intervencion")) |>
  mutate(pieza = str_split(a, "\\.?\\s*[―—]\\s*")) |>
  unnest(pieza) |>
  mutate(
    pieza = str_squish(pieza),
    interjeccion = str_detect(pieza, interjeccion),
    aplausos = !interjeccion & str_detect(pieza, regex("aplau", ignore_case = TRUE)),
    rumores = !interjeccion & str_detect(pieza, regex("rumor", ignore_case = TRUE)),
    protestas = !interjeccion & str_detect(pieza, regex("protesta", ignore_case = TRUE)),
    risas = !interjeccion & str_detect(pieza, regex("\\brisas?\\b", ignore_case = TRUE)),
    silencio = !interjeccion & str_detect(pieza, regex("minuto de silencio", ignore_case = TRUE))
  )

acotaciones_grupo <- piezas |>
  summarise(across(c(rumores, protestas, risas, aplausos), sum), .by = categoria) |>
  left_join(summarise(intervenciones, palabras = sum(palabras), .by = categoria), by = "categoria") |>
  mutate(across(c(rumores, protestas, risas, aplausos), \(x) x / palabras * 1e4, .names = "{.col}_10k")) |>
  arrange(desc(palabras))

risas_orador <- piezas |>
  filter(risas) |>
  inner_join(select(intervenciones, diario, intervencion, nombre, miembro_nombre, persona, tipo),
             by = c("diario", "intervencion")) |>
  mutate(orador = coalesce(nombre, miembro_nombre, persona)) |>
  count(orador, tipo, categoria, sort = TRUE)

silencios <- piezas |>
  filter(silencio) |>
  distinct(diario, intervencion, pieza, dia)

menciones <- intervenciones |>
  summarise(palabras = sum(palabras), across(all_of(names(terminos)), sum), .by = categoria) |>
  arrange(desc(palabras))

# Estabilidad del formato por trimestre
trimestres <- piezas |>
  mutate(trimestre = str_c(year(dia), "-T", quarter(dia))) |>
  summarise(across(c(rumores, protestas, risas, aplausos, silencio), sum), .by = trimestre) |>
  left_join(intervenciones |> mutate(trimestre = str_c(year(dia), "-T", quarter(dia))) |>
              summarise(palabras = sum(palabras), otra_lengua = sum(palabras_otra_lengua), jornadas = n_distinct(numero),
                        .by = trimestre), by = "trimestre") |>
  arrange(trimestre)

# Llamadas al orden de la XV (R/05) por grupo del diputado llamado. Candidatos: diputados en el cargo ese
# día cuyos apellidos contienen el del vocativo («Señor Conde», «Señor De Rosa», «Señor Abrines»); si hay
# varios, los que el fragmento nombra con los dos apellidos («El señor Conde Bajén: …»)
llamados <- fromJSON("data/llamadas_al_orden.json")$actos |>
  as_tibble() |>
  filter(legislatura == "XV") |>
  mutate(
    fila = row_number(),
    vocativo = clave(str_match(destinatario, "[Ss]eñora? ((?:[Dd]e |[Dd]el |[Dd]e la )?\\S+)")[, 2]),
    dia = ymd(fecha)
  ) |>
  left_join(periodos |> mutate(k = clave(apellidos)) |> select(k, nombre, apellidos, grupo, desde, hasta),
            by = join_by(between(dia, desde, hasta))) |>
  filter(!is.na(vocativo), map2_lgl(fichas(vocativo), fichas(k), \(v, t) all(v %in% t))) |>
  mutate(n = n(), en_fragmento = str_detect(norm(fragmento), fixed(norm(apellidos))), .by = fila) |>
  filter(n == 1 | (en_fragmento & sum(en_fragmento) == 1), .by = fila) |>
  select(fila, nombre, grupo)
llamados <- fromJSON("data/llamadas_al_orden.json")$actos |>
  as_tibble() |>
  filter(legislatura == "XV") |>
  mutate(fila = row_number()) |>
  left_join(llamados, by = "fila") |>
  select(fecha, diario, pagina, presidencia, destinatario, nombre, grupo)

list(
  fuente = "Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura (PDF); diputados: data/diputados_xv.json",
  url = "https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/",
  consulta = as.character(Sys.Date()),
  metodo = "Prueba de viabilidad (encargo del 19-10-2026). Palabras: las de cada intervención, sin acotaciones ni el original en otra lengua cooficial (se cuenta la interpretación al castellano). Gobierno: presidente, vicepresidentes y ministros, por la etiqueta del Diario; el candidato Sánchez de la investidura de 2023 también. Mesa aparte. Grupo: el del diputado ese día. Escaños: media diaria de diputados del grupo entre el 17-08-2023 y el 06-10-2026. Acotaciones: cada pieza entre rayas cuenta una vez y se atribuye al orador en el uso de la palabra.",
  jornadas = select(jornadas, -sin_cierre),
  grupos = por_grupo,
  mixto = mixto,
  charlatan = charlatan,
  gobierno = gobierno,
  otros_oradores = otros,
  acotaciones = acotaciones_grupo,
  risas_orador = risas_orador,
  minutos_de_silencio = silencios,
  menciones = menciones,
  trimestres = trimestres,
  llamadas_por_grupo = count(llamados, grupo),
  llamadas_destinatario = llamados,
  control = list(
    sin_etiqueta = map(leidos, \(r) tibble(diario = r$diario, texto = str_trunc(r$sospechosos, 200))) |> list_rbind(),
    cruces_aproximados = nombres |> filter(!is.na(nombre), k != clave(diputados$apellidos[match(nombre, diputados$nombre)])),
    sin_cruce = nombres |> filter(is.na(nombre))
  )
) |>
  write_json("data/plenopedia_xv.json", auto_unbox = TRUE, pretty = TRUE, na = "null", digits = NA)

