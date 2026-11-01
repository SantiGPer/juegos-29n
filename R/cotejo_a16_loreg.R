# Viabilidad de A16: cómo se ordenan los candidatos en la papeleta del Senado -> editorial/fuentes/a16-papeleta-loreg.md
# Encargo de editorial/decisiones.md (01-11-2026). LOREG art. 172.3 (todas sus versiones) y modelo P.2 del RD 605/1999.

library(tidyverse)
library(xml2)

cache <- file.path(tools::R_user_dir("juegos29n", "cache"), "boe")
dir.create(cache, recursive = TRUE, showWarnings = FALSE)

descarga <- \(id) {
  f <- file.path(cache, str_c(id, ".xml"))
  if (!file.exists(f)) {
    httr2::request(str_c("https://www.boe.es/datosabiertos/api/legislacion-consolidada/id/", id, "/texto")) |>
      httr2::req_user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)") |>
      httr2::req_headers(Accept = "application/xml") |>
      httr2::req_retry(max_tries = 3) |>
      httr2::req_perform(path = f)
  }
  read_xml(f)
}

fecha_es <- \(x) format(as.Date(x, "%Y%m%d"), "%d-%m-%Y")
cita <- \(p) str_c("> ", p, collapse = "\n>\n")
parrafos <- \(v) xml_find_all(v, "./p[not(@class='articulo')]") |> xml_text() |> str_squish() |> discard(\(p) str_starts(p, "Se modifica"))

# LOREG, art. 172: todas las versiones, para ver desde cuándo rige el orden actual
loreg <- descarga("BOE-A-1985-11672")
versiones_172 <- xml_find_all(loreg, "//bloque[@id='acientosetentaydos']/version") |>
  map(\(v) list(
    publicacion = xml_attr(v, "fecha_publicacion"), vigencia = xml_attr(v, "fecha_vigencia"),
    norma = xml_attr(v, "id_norma"), p = keep(parrafos(v), \(p) str_detect(p, "^(3\\.|[a-e]\\) )"))
  )) |>
  keep(\(v) any(str_detect(v$p, "^a\\) "))) |>
  (\(vs) vs[order(map_chr(vs, "vigencia"))])()

# RD 605/1999, anexo 3: especificaciones del modelo P.2 (papeleta del Senado), versión vigente
rd <- descarga("BOE-A-1999-8583")
vs_an3 <- xml_find_all(rd, "//bloque[@id='an3']/version")
an3 <- vs_an3[[which.max(as.integer(xml_attr(vs_an3, "fecha_vigencia")))]]
p_an3 <- xml_find_all(an3, ".//p") |> xml_text() |> str_squish()
ini <- detect_index(p_an3, \(p) p == "P.2 Modelo de papeleta para el Senado.")
p2 <- p_an3[ini:length(p_an3)] |> head(12) |> keep(\(p) str_detect(p, "^(Uno|Dos|Tres|Cuatro)\\.|^‒ "))
nota_p2 <- keep(p_an3, \(p) str_detect(p, "modelo P\\.2 por"))

stopifnot(length(versiones_172) >= 2, length(p2) > 0)

seccion_172 <- \(v) str_c(
  "### LOREG, art. 172.3, en vigor desde el ", fecha_es(v$vigencia), " (", v$norma, ")\n\n", cita(v$p), "\n")

str_c(
  "# A16 · Orden de los candidatos en la papeleta del Senado\n\n",
  "Generado por `R/cotejo_a16_loreg.R` desde la API de legislación consolidada del BOE (descarga del ",
  format(file.mtime(file.path(cache, "BOE-A-1985-11672.xml")), "%d-%m-%Y"), " para la LOREG y del ",
  format(file.mtime(file.path(cache, "BOE-A-1999-8583.xml")), "%d-%m-%Y"), " para el RD 605/1999). Texto literal.\n\n",
  "- LOREG (Ley Orgánica 5/1985): https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672\n",
  "- Real Decreto 605/1999, de regulación complementaria de los procesos electorales: https://www.boe.es/buscar/act.php?id=BOE-A-1999-8583\n\n",
  "## Lo que dice\n\n",
  "- Desde la Ley Orgánica 8/2010 (en vigor el 05-11-2010), los candidatos de una misma candidatura aparecen «en el orden que libremente establezca la entidad que presenta cada una de las candidaturas». Rige en las generales de 2011, 2015, 2016, 2019 (abril y noviembre) y 2023.\n",
  "- Hasta entonces (redacción original de 1985, generales de 1986 a 2008), iban «por orden alfabético a partir de la inicial del primer apellido».\n",
  "- El modelo oficial de papeleta (P.2) dice lo mismo que la ley vigente: los candidatos van «en el orden que establezca cada una de las formaciones políticas».\n\n",
  "## Texto literal\n\n",
  str_c(map_chr(versiones_172, seccion_172), collapse = "\n"), "\n",
  "### RD 605/1999, anexo 3, modelo P.2 (papeleta para el Senado), versión vigente publicada el ",
  fecha_es(xml_attr(an3, "fecha_publicacion")), " (", xml_attr(an3, "id_norma"), ")\n\n",
  cita(p2), "\n\n", str_c(nota_p2, collapse = " "), "\n"
) |>
  write_file("editorial/fuentes/a16-papeleta-loreg.md")
