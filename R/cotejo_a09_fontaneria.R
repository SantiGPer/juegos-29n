# Cotejo de las cifras de A9 Fontanería electoral con el cálculo en R -> editorial/fuentes/a09-cotejo.md
# Encargo del 25-10-2026. Lee data/fontaneria_a09.json (R/12_fontaneria_a09.R) y lo compara con las tablas
# «Escaños» de editorial/contenido/a09-fontaneria-electoral.md y con las cifras del catálogo
# (editorial/catalogos/a09-fontaneria-catalogo.md) y de las explicaciones, copiadas abajo tal como están.

library(tidyverse)
library(jsonlite)

a9 <- fromJSON("data/fontaneria_a09.json", simplifyVector = FALSE)
real <- unlist(a9$real)
conf <- set_names(map(a9$configuraciones, \(c) unlist(c$escanos)), map_chr(a9$configuraciones, "id"))

# Diferencia con el real de todas las candidaturas que cambian, como «PP −10»
diferencias <- \(r) {
  todas <- union(names(real), names(r))
  d <- set_names(coalesce(r[todas], 0) - coalesce(real[todas], 0), todas)
  d[d != 0]
}
texto <- \(d) if (length(d) == 0) "nada cambia" else str_c(names(d), " ", if_else(d > 0, "+", "−"), abs(d), collapse = ", ")
lee <- \(x) if (x == "") integer() else {
  partes <- str_match(str_split(x, ", ")[[1]], "^(.+) ([+−])(\\d+)$")
  set_names(as.integer(partes[, 4]) * if_else(partes[, 3] == "+", 1L, -1L), partes[, 2])
}
coincide <- \(dicho, calculado, completo) {
  iguales <- all(coalesce(calculado[names(dicho)], 0L) == dicho)
  if (!iguales) "**no**" else if (completo && length(setdiff(names(calculado), names(dicho))) > 0) "sí, pero incompleto" else "sí"
}

# 1. Tablas «Escaños» del contenido (preguntas 1 a 5) ---------------------------------------------------

contenido <- read_lines("editorial/contenido/a09-fontaneria-electoral.md")
preguntas <- tibble(id = str_match(contenido, "^## \\d · (\\w\\d) ·")[, 2], linea = contenido) |>
  fill(id) |>
  filter(str_detect(linea, "^\\*\\*Escaños")) |>
  mutate(tabla = map(linea, \(l) {
    m <- str_match_all(str_remove(l, "^\\*\\*Escaños[^*]*\\*\\* "), "([^·]+?) (\\d+) → (\\d+)")[[1]]
    tibble(candidatura = str_trim(m[, 2]), real = as.integer(m[, 3]), cambio = as.integer(m[, 4]))
  })) |>
  select(id, tabla) |>
  unnest(tabla) |>
  mutate(real_r = coalesce(.env$real[candidatura], 0), cambio_r = map2_dbl(id, candidatura, \(i, c) coalesce(conf[[i]][c], 0)))
faltan <- preguntas |> distinct(id) |>
  mutate(fuera = map(id, \(i) setdiff(names(conf[[i]]), preguntas$candidatura[preguntas$id == i])))

# 2. Diferencias que dicen el catálogo y las explicaciones ---------------------------------------------

catalogo <- tribble(
  ~id, ~fuente, ~dicho, ~completo,
  "B1", "Catálogo", "", TRUE,
  "B2", "Catálogo", "", TRUE,
  "B3", "Catálogo", "PP +2, PSOE +3, ERC +1, Vox −2, Junts −3, BNG −1", TRUE,
  "B4", "Catálogo", "ERC −7, Junts −7, EH Bildu −6, PNV −5, BNG −1, CC −1, UPN −1, PSOE +14, Sumar +7, PP +5, Vox +2", TRUE,
  "B5", "Catálogo («igual que B4»)", "ERC −7, Junts −7, EH Bildu −6, PNV −5, BNG −1, CC −1, UPN −1, PSOE +14, Sumar +7, PP +5, Vox +2", TRUE,
  "B6", "Catálogo", "", TRUE,
  "F1", "Catálogo", "PP −10, PSOE −7, Junts −1, PNV −1, Vox +10, Sumar +6, BNG +1, Nueva Canarias +1, Aragón Existe +1", TRUE,
  "F2", "Catálogo", "PP −7, PSOE −2, Junts −1, PNV −1, Vox +5, Sumar +4, BNG +1, Nueva Canarias +1", TRUE,
  "F2", "Explicación de la pregunta 2 («Vox ganaría 5»)", "Vox +5", FALSE,
  "F3", "Catálogo", "PP −13, PSOE −9, Junts −1, PNV −1, Vox +13, Sumar +6, BNG +3, Nueva Canarias +1, Aragón Existe +1", TRUE,
  "F4", "Catálogo", "PP −4, PSOE −4, Junts −1, PNV −1, Vox +4, Sumar +3, BNG +1, Nueva Canarias +1, Aragón Existe +1", TRUE,
  "F4", "Explicación de la pregunta 3 («el BNG se quedaría en 2»)", "BNG +1", FALSE,
  "C1", "Catálogo", "PP −12, PSOE −2, Junts −2, EH Bildu −1, Vox +9, Sumar +6, BNG +1, CC +1", TRUE,
  "C2", "Catálogo", "ERC −7, Junts −7, EH Bildu −6, PNV −5, BNG −1, CC −1, UPN −1, Sumar +17, Vox +15, PSOE +3, PP −7", TRUE,
  "C3", "Catálogo", "PP −17, PSOE −6, Vox +12, Sumar +14, PACMA +2, CUP +1, UPN −1", TRUE,
  "C3", "Explicación de la pregunta 5 («entrarían PACMA (2 escaños) y la CUP (1)»)", "PACMA +2, CUP +1", FALSE,
  "C4", "Catálogo", "PP −20, PSOE −8, Vox +11, Sumar +13, PACMA +2, CUP +1, Frente Obrero +1, Nueva Canarias +1", TRUE,
  "T1", "Explicación de la pregunta 6", "PP −15, PSOE −14, Vox −7, Sumar −7, BNG −1", TRUE,
  "T2", "Explicación de la pregunta 6 («entraría Soria ¡Ya!»)", "Soria ¡Ya! +1", FALSE,
  "T3", "Explicación de la pregunta 7", "PP −6, PNV −2, Sumar +4", TRUE,
  "T4", "Explicación de la pregunta 7 («el PSOE ganaría 21»)", "PSOE +21", FALSE
) |>
  mutate(calculado = map(id, \(i) diferencias(conf[[i]])),
         resultado = pmap_chr(list(map(dicho, lee), calculado, completo), coincide),
         calculado = map_chr(calculado, texto),
         dicho = if_else(dicho == "", "nada cambia", dicho))

# 3. Cifras sueltas de las explicaciones ---------------------------------------------------------------

b3 <- map(a9$barrera_10, as_tibble) |> list_rbind()
pct_b3 <- \(prov, cand) b3$pct[b3$provincia == prov & b3$candidatura == cand]
nac <- map(a9$voto_nacional, as_tibble) |> list_rbind()
pct <- \(x, d = 1) formatC(x, format = "f", digits = d, decimal.mark = ",")
cifras <- tribble(
  ~pregunta, ~dicho, ~calculado,
  "1 · B3", "Barcelona deja fuera a Junts (9,7 %)", pct(pct_b3("Barcelona", "Junts")),
  "1 · B3", "y a Vox (7,6 %)", pct(pct_b3("Barcelona", "Vox")),
  "1 · B3", "A Coruña, al BNG (9,98 %, por dos centésimas)", pct(pct_b3("A Coruña", "BNG"), 2),
  "1 · B3", "Murcia, a Sumar (9,6 %)", pct(pct_b3("Murcia", "Sumar")),
  "1 · B3", "Solo muerde en tres provincias", str_c(n_distinct(b3$provincia), ": ", str_c(unique(b3$provincia), collapse = ", ")),
  "1 · B3", "Con el 5 %, o sin barrera, no cambiaría ni un escaño", str_c("B2: ", texto(diferencias(conf$B2)), "; B1: ", texto(diferencias(conf$B1))),
  "2 · F1", "Vox pasaría de 33 a 43 y Sumar, de 31 a 37", str_c("Vox ", conf$F1["Vox"], ", Sumar ", conf$F1["Sumar"]),
  "2 · F1", "PP y PSOE perderían 17 entre los dos", as.character(sum(real[c("PP", "PSOE")]) - sum(conf$F1[c("PP", "PSOE")])),
  "3 · F3", "Vox ganaría 13, los mismos que perdería el PP", str_c("Vox +", conf$F3["Vox"] - real["Vox"], ", PP −", real["PP"] - conf$F3["PP"]),
  "5 · C2", "ERC, la siguiente, se queda en el 1,9 %", str_c(nac$candidatura[5], " ", pct(nac$pct[5])),
  "5 · C2", "Solo PP, PSOE, Vox y Sumar pasan del 3 % nacional", str_c(nac$candidatura[nac$pct >= 3], collapse = ", "),
  "5 · C2", "Una barrera nacional del 3 % que mantuviera las provincias borraría a los mismos siete", str_c("B4: ", texto(diferencias(conf$B4)))
)

# 4. Respuestas correctas de T1 y T3 con la población de 2022 ----------------------------------------------

t1 <- diferencias(conf$T1)
t3 <- diferencias(conf$T3)
correctas <- c(
  str_c("- Pregunta 6 (T1, «¿Qué partido se queda sin escaño?», opciones BNG, CC, UPN y PNV): con 300 se quedan sin escaño ",
        str_c(setdiff(names(real), names(conf$T1)), collapse = ", "), ". CC ", conf$T1["CC"], ", UPN ", conf$T1["UPN"], " y PNV ", conf$T1["PNV"], "."),
  str_c("- Pregunta 7 (T3, «¿Qué partido pierde más escaños?», opciones PP, PSOE, Vox y PNV): ",
        texto(t3[c("PP", "PSOE", "Vox", "PNV")[c("PP", "PSOE", "Vox", "PNV") %in% names(t3)]]),
        ". La que más pierde es ", names(which.min(t3)), ".")
)

# 5. Escaños por provincia con cada tamaño (población de 2022) -------------------------------------------------

tam <- map(a9$escanos_por_tamano, as_tibble) |> list_rbind()
cambios_tam <- tam |>
  filter(t1 != escanos_2023 | t2 != escanos_2023 | t3 != escanos_2023 | t4 != escanos_2023) |>
  arrange(-poblacion_2022)

tabla <- \(d) c(str_c("| ", str_c(names(d), collapse = " | "), " |"), str_c("|", strrep(" --- |", ncol(d))),
                 pmap_chr(d, \(...) str_c("| ", str_c(c(...), collapse = " | "), " |")))

c(
  "# A9 · Cotejo de Fontanería electoral con el cálculo en R",
  "",
  "Generado por `R/cotejo_a09_fontaneria.R` el 25-10-2026 sobre `data/fontaneria_a09.json` (`R/12_fontaneria_a09.R`).",
  "",
  "## Comprobaciones previas",
  "",
  "- La regla del art. 162 de la LOREG (1 escaño a Ceuta y otro a Melilla, 2 por provincia y el resto por cuota de población de las 50 provincias, con restos mayores) reproduce los escaños de las 52 circunscripciones de 2023 con la población oficial a 1-1-2022, y los de 2026 con la de 1-1-2025.",
  "- La simulación con las reglas vigentes (D'Hondt y barrera del 3 % de los válidos con el blanco, en cada provincia) reproduce el reparto oficial de 2023 provincia a provincia.",
  "- Ninguna configuración tiene empates en el último escaño ni en los restos.",
  "",
  "## 1. Tablas «Escaños» del contenido (preguntas 1 a 5)",
  "",
  str_glue("Filas cotejadas: {nrow(preguntas)}. Distintas del cálculo: {sum(preguntas$real != preguntas$real_r | preguntas$cambio != preguntas$cambio_r)}."),
  if (any(lengths(faltan$fuera) > 0)) str_c("Candidaturas con escaño que faltan en la tabla: ", str_c(faltan$id, ": ", map_chr(faltan$fuera, str_c, collapse = ", "), collapse = "; "), ".") else "No falta ninguna candidatura con escaño en las tablas.",
  "",
  tabla(preguntas |> filter(real != real_r | cambio != cambio_r) |> transmute(Pregunta = id, Candidatura = candidatura, Contenido = str_c(real, " → ", cambio), R = str_c(real_r, " → ", cambio_r))) |>
    (\(x) if (length(x) > 2) x else character())(),
  "",
  "## 2. Diferencias con el real que dicen el catálogo y las explicaciones",
  "",
  "«Incompleto»: lo que se dice es correcto, pero hay más candidaturas que cambian. T1 a T4 se calculan con la población a 1-1-2022 y se comparan con el resultado real de 2023; el catálogo usaba la de 2025 y el reparto de 2026.",
  "",
  tabla(catalogo |> transmute(Cambio = id, Fuente = fuente, Dice = dicho, `Cálculo en R` = calculado, Coincide = resultado)),
  "",
  "## 3. Cifras sueltas de las explicaciones",
  "",
  tabla(cifras |> rename(Pregunta = pregunta, `Dice el contenido` = dicho, `Cálculo en R` = calculado)),
  "",
  "## 4. Respuestas correctas de T1 y T3 con la población de 2022",
  "",
  correctas,
  "",
  "## 5. Escaños por provincia con cada tamaño (población de 2022)",
  "",
  "Solo las provincias que cambian en alguna de las cuatro configuraciones, de más a menos población.",
  "",
  tabla(cambios_tam |> transmute(Provincia = provincia, `Población 2022` = format(poblacion_2022, big.mark = ".", trim = TRUE), `2023` = escanos_2023,
                                 `T1 (300)` = t1, `T2 (400)` = t2, `T3 (mín. 1)` = t3, `T4 (400, mín. 1)` = t4))
) |>
  write_lines("editorial/fuentes/a09-cotejo.md")
