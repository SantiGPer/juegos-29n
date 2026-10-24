# Cotejo de los dos [VERIFICAR] de A5 con la serie de generales de Interior (1977-2023) -> editorial/fuentes/a05-cotejo-interior.md
# Encargo del 22-10-2026. Candidaturas tal como las acumula Interior en el total nacional (sin fusionar confluencias).

library(tidyverse)
source("R/infoelectoral.R")

elecciones <- c("197706", "197903", "198210", "198606", "198910", "199306", "199603", "200003", "200403",
                "200803", "201111", "201512", "201606", "201904", "201911", "202307")

serie <- map(elecciones, \(e) votos_ambitos(e) |>
  filter(ccaa == "99", escanos > 0) |>
  left_join(candidaturas(e), "codigo") |>
  transmute(eleccion = e, siglas, escanos)) |>
  list_rbind()

resumen <- serie |>
  summarise(total = sum(escanos), primera = siglas[which.max(escanos)], max = max(escanos),
            mas_de_40 = sum(escanos > 40), desde_40 = sum(escanos >= 40),
            con_40 = str_c(siglas[escanos >= 40], " ", escanos[escanos >= 40], collapse = ", "),
            .by = eleccion)

stopifnot(all(resumen$total == 350))

c(
  "# A5 · Cotejo con la serie de Interior",
  "",
  str_glue("Generado por `R/cotejo_a05_interior.R` el {Sys.Date()}. Fuente: Ministerio del Interior, infoelectoral, ficheros 03 y 08 (total nacional) de las 16 generales de 1977 a 2023 ({url_interior('AAAAMM')})."),
  "",
  "| Elección | Primera candidatura | Escaños | Más de 40 | 40 o más: candidaturas |",
  "| --- | --- | ---: | ---: | --- |",
  str_glue_data(resumen, "| {eleccion} | {primera} | {max} | {mas_de_40} | {desde_40}: {con_40} |"),
  "",
  str_glue("- Mayor número de escaños de una candidatura: {max(resumen$max)} ({resumen$primera[which.max(resumen$max)]}, {resumen$eleccion[which.max(resumen$max)]})."),
  str_glue("- Elecciones con cuatro candidaturas de más de 40 escaños: {sum(resumen$mas_de_40 >= 4)}."),
  str_glue("- Primera elección con cuatro candidaturas de 40 escaños o más: {resumen$eleccion[which(resumen$desde_40 >= 4)[1]]}."),
  "- Las confluencias de Podemos se cuentan por separado, como las publica Interior. Juntarlas no cambia la conclusión: en 2015 Podemos ya pasa de 40 sin ellas y antes no se presentaba."
) |>
  write_lines("editorial/fuentes/a05-cotejo-interior.md")
