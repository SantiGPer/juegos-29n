# Fuentes de datos

## Colores de partido (`shared/base.css`)

- Fuente: Wikipedia en español, [Plantilla:Color político](https://es.wikipedia.org/wiki/Plantilla:Color_pol%C3%ADtico), sección «España».
- Revisión usada: [173877042](https://es.wikipedia.org/w/index.php?title=Plantilla:Color_pol%C3%ADtico&oldid=173877042) (10-06-2026).
- Consultada: 14-10-2026.
- Valores copiados sin modificar:

| Variable | Entrada de la plantilla | Color |
| --- | --- | --- |
| `--pp` | PP / Partido Popular | `#1E4B8F` |
| `--psoe` | PSOE / Partido Socialista Obrero Español | `#FF0000` |
| `--vox` | Vox / Vox (partido político) | `#63BE21` |
| `--sumar` | Sumar / Movimiento Sumar | `#E51C55` |
| `--podemos` | Podemos | `#9370DB` |
| `--erc` | ERC / Esquerra Republicana de Catalunya | `#FFB32E` |
| `--junts` | Junts | `#20C0C2` |
| `--bildu` | EH Bildu / Euskal Herria Bildu | `#00D0B6` |
| `--pnv` | PNV / Partido Nacionalista Vasco | `#008000` |
| `--bng` | BNG / Bloque Nacionalista Galego | `#ADCFEF` |
| `--cc` | CC / Coalición Canaria | `#FFD700` |
| `--upn` | UPN / Unión del Pueblo Navarro | `#2A52BE` |
| `--ucd` | UCD / Unión de Centro Democrático | `#197E36` |

`--ucd` se añadió el 15-10-2026 para A12, de la misma revisión 173877042.

Se usa siempre el color vigente de cada partido, en todas las legislaturas (decisión del 15-10-2026), aunque la plantilla tenga entradas fechadas (PP 2008-2022 `#1D84CE`, EH Bildu 2012-2023 `#C4D600`). Para Junts la plantilla tiene «JxCat» `#EE5976` y «Junts» `#20C0C2`; se usa `#20C0C2` por decisión del autor.

## `resultados_2023_prov.json`

- Script: `R/01_resultados_2023_prov.R` (lector común en `R/infoelectoral.R`). Juegos: A7; también para A9 y A11.
- Resultados del Congreso del 23-07-2023: Ministerio del Interior, infoelectoral, https://infoelectoral.interior.gob.es/estaticos/docxl/apliextr/02202307_MUNI.zip, ficheros 03 (candidaturas), 05 (municipios), 07 (provincias) y 08 (votos por candidatura). Diseño de registro en el `FICHEROS.doc` del zip. Descargado el 20-10-2026; el zip no se versiona (caché de R).
  - `censo` y `votantes`, con el CERA (07). `censo_residentes` y `votantes_residentes` suman los municipios del 05, que no incluyen el CERA; `censo_cera` y `votantes_cera` son la diferencia.
  - Votos de candidatura con el CERA (08). `cabecera` es la candidatura de acumulación nacional (03): PSC, PSIB-PSOE… en PSOE; las variantes de SUMAR en SUMAR.
  - `sin_candidatura`: candidaturas nacionales (con lista en 26 provincias o más) que no se presentaron en la provincia. Su voto es NA, no 0 (decisión del 20-10-2026). Caso relevante: VOX en Santa Cruz de Tenerife (renuncias de última hora; RTVC, 2023).
- Escaños: anexo del RD 400/2023 (BOE-A-2023-12663, https://www.boe.es/diario_boe/xml.php?id=BOE-A-2023-12663) y del RD 806/2026 (BOE-A-2026-20742, https://www.boe.es/diario_boe/xml.php?id=BOE-A-2026-20742). Leídos el 20-10-2026. Cambian Madrid (37 → 38) y Cádiz (9 → 8).
- Población: INE, Cifras oficiales de población de los municipios españoles: revisión del Padrón Municipal (operación DPOP), tablas «<provincia>: Población por municipios y sexo», serie del total provincial, a 1-1-2023 y a 1-1-2025 (la revisión más reciente). API: https://servicios.ine.es/wstempus/js/ES/TABLAS_OPERACION/DPOP. Consultado el 20-10-2026.
- Nacidos en el extranjero: INE, Estadística del Padrón Continuo, tabla 68526 («Población por sexo y edad según la relación entre lugar de nacimiento y lugar de residencia»), a 1-1-2023, categoría «Nacido en el extranjero o en antiguos territorios españoles». API: https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/68526. Consultado el 20-10-2026. Su total (`poblacion_padron_2023`) no coincide con las cifras oficiales (387.529 frente a 387.174 en Albacete), y es el denominador que corresponde a esta cifra.
- Comprobado al generar: las 52 provincias suman el total nacional de Interior en censo, votantes, blancos y nulos (votantes: 24.952.447). Los escaños de Interior coinciden con el anexo del RD 400/2023 y suman 350 por provincia y por candidatura.
- Cotejo con la resolución de la Junta Electoral Central de 30-08-2023 (BOE-A-2023-18907), Cuadro II: 206 cifras de votos y escaños de los partidos con escaño casan por siglas sin ninguna discrepancia. Las 23 restantes no casan por las variantes de siglas (PSIB-PSOE, SUMAR ARAGÓN…). El Cuadro I va como imagen en el BOE y no se pudo cotejar de forma automática.

## `escanos_generales.json`

- Script: `R/09_escanos_generales.R` (lector común en `R/infoelectoral.R`). Juego: A5.
- Fuente: Ministerio del Interior, infoelectoral, `02<aaaamm>_MUNI.zip` de 198210, 200003, 201512 y 202307 (ficheros 02, 03 y 08, total nacional). Descargados el 20-10-2026.
- El total nacional de Interior acumula cada candidatura con su cabecera nacional (PSC en PSOE en 1982, PSUC en PCE…). En 2015, En Comú Podem, Compromís-Podemos y En Marea son candidaturas distintas de PODEMOS; por decisión del 20-10-2026 se agrupan con ella en una sola fila, «Podemos y confluencias» (69 = 42 + 12 + 9 + 6), con el desglose en `desglose`.
- Siglas y denominación tal como las publica Interior, en mayúsculas. Las candidaturas con menos de cinco escaños se agrupan en `otros`, con su lista. Cada año suma 350.

## `actividad_parlamentaria.json`

- Script: `R/03_actividad_parlamentaria.R`. Juego: A6. Método y límites en `editorial/fuentes/a06-viabilidad.md`. Rango: VIII, IX, X, XII, XIV y XV (decisión del 20-10-2026). Fechas de cada legislatura, de `legislaturas.json`.
- Leyes, leyes orgánicas y decretos-ley: BOE, buscador del diario (https://www.boe.es/buscar/boe.php), sección I, departamento «Jefatura del Estado», por fecha de publicación; rango según el título. El peso de los decretos-ley no incluye los reales decretos legislativos (decisión del 20-10-2026). Consultado el 20-10-2026, que es también el corte de la XV (`corte`).
- Preguntas orales al presidente del Gobierno: sumarios del Diario de Sesiones del Pleno (https://www.congreso.es/public_oficiales/L<legislatura>/CONG/DS/PL/), los PDF de la caché de `R/05`. Se cuentan los diputados distintos por sesión. Las sesiones con más de tres preguntas están pendientes de validación manual.
- Comparecencias de ministros: Congreso, buscador de iniciativas (https://www.congreso.es/es/busqueda-de-iniciativas), tipos 210 (Pleno), 213 y 214 (Comisión). Pleno y Comisión van juntos (decisión del 20-10-2026). Se cuentan las solicitudes tramitadas por completo, no las sesiones. Consultado el 20-10-2026.

## `cis_postelectoral_2023.json`

- Script: `R/06_cis_postelectoral.R`. Juego: A8. Detalle en `editorial/fuentes/a08-cis.md`.
- Fuente: CIS, estudio 3420, «Barómetro de septiembre 2023. Postelectoral elecciones generales 2023» (CATI, 1 al 12-09-2023). Microdato: https://www.cis.es/documents/d/cis/MD3420 (zip con `3420.sav`, cuestionario, libro de códigos y ficha técnica), descargado el 20-10-2026. El zip no se versiona (caché de R).
- Base: voto válido declarado en `RECUVOTOG1` (partidos y «Otro partido»), sin abstención, blanco, nulo, «No recuerda» ni N.C. Ponderación `PESO`. Tramos de edad de los marginales del propio CIS (pregunta 0b); hábitat en los siete tramos de `TAMUNI`.
- Comprobado al generar: con `PESO`, la edad, el sexo y el recuerdo de voto reproducen décima a décima los marginales publicados del estudio (avance de resultados, https://cis.es/documents/d/cis/es3420marMT_a).
- La comparación con el resultado real sale de `resultados_2023_prov.json`.

## `llamadas_al_orden.json`

- Script: `R/05_llamadas_al_orden.R`. Legislaturas con investidura de la VIII a la XV: VIII, IX, X, XII, XIV y XV (decisión del 18-10-2026; la XI y la XIII quedan fuera).
- Fuente: Diario de Sesiones del Congreso de los Diputados, Pleno y Diputación Permanente, en PDF, en `https://www.congreso.es/public_oficiales/L<n>/CONG/DS/PL/`:
  - VIII, IX y X hasta el diario 53: `PL_<nnn>.PDF`, a dos columnas, leídos por columnas con las coordenadas de cada palabra.
  - X desde el diario 54, y XI a XV: `DSCD-<n>-PL-<d>.PDF`. Algunas sesiones están partidas en `-C1`, `-C2`…, y no siempre empiezan en `-C1`: la constitutiva de la XIII solo existe como `DSCD-13-PL-1-C2.PDF`.
- PDF de la XV descargados el 14-10-2026 (diarios nuevos buscados el 15 y el 16-10). Los de VIII a XIV, el 16-10-2026.
- Denominador: sesiones plenarias distintas según la portada («Sesión plenaria núm. N», o «Sesión núm. N» en algunas de la XII), sin la Diputación Permanente. Son consecutivas desde la 1 en todas las legislaturas.
  - XV: el diario 9 (constitución de la Diputación Permanente, 21-11-2023) lleva «Sesión plenaria núm. 1» y no suma.
  - VIII: el diario 87 (28-04-2005) lleva por errata «Sesión plenaria núm. 81», como el 86; se cuenta como la 82.
- 16-10-2026: corregido un fallo que dejaba sin texto los diarios con alguna hoja sin folio. La XV pasa de 83 a 90 llamadas (diarios 182, 196, 207 y 210).
- Método: en el campo `metodo` del JSON. Validación: revisión manual de las 12 fusiones de la XV (bitácora del 15-10-2026) y precisión, atribución y exhaustividad de VIII a XV en `editorial/fuentes/a03-validacion-viii-x.md`.
- 18-10-2026, correcciones del 19-10: la repetición de la XV, DS 43, pág. 32, se fusiona a mano (`fusiones_a_mano`), y la llamada colectiva de la XII (DS 61) cuenta. La XV pasa de 95 a 94.
- 18-10-2026, decisión del 19-10: se fusionan a mano todas las llamadas repetidas a la misma persona en la misma intervención (XV, DS 43, 67, 169, 27 y 126; ver `fusiones_a_mano`). La XV pasa de 94 a 90; el resto de legislaturas no cambia.

## `legislaturas.json`

- Script: `R/02_legislaturas.R`.
- Fuente: Wikipedia en español, [Anexo:Presidentes del Congreso de los Diputados](https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Congreso_de_los_Diputados), revisión fijada [175471021](https://es.wikipedia.org/w/index.php?title=Anexo:Presidentes_del_Congreso_de_los_Diputados&oldid=175471021), sección «Periodo democrático» y tabla de Felipe VI. Consultada el 16-10-2026.
- Cada fila guarda las actas de elección de la presidencia en congreso.es que cita Wikipedia (Constituyente a XII). XIII, XIV y XV citan prensa, no actas del Congreso, y quedan con la lista vacía.
- Partido = el del grupo parlamentario por el que fue elegida la presidencia (decisión del 16-10-2026). Batet figura como PSOE; la fuente la da como PSC, que queda en `afiliacion`. Regenerado el 18-10-2026.
- Contraste con la fuente primaria: la portada de cada Diario de Sesiones del Pleno («PRESIDENCIA DE…»), revisada en la muestra del sondeo de A3 (bitácora del 16-10-2026).
- `disolucion` (solo XV): 06-10-2026, fecha de baja de todos los diputados en los datos abiertos del Congreso (ver `diputados_xv.json`). Da el periodo 2023–2026 (decisión del 19-10-2026).

## `diputados_xv.json`

- Script: `R/04_diputados.R`. Lo usa `R/08_plenopedia_xv.R` (A3 Plenopedia).
- Fuente: Congreso de los Diputados, datos abiertos, https://www.congreso.es/es/opendata/diputados: ficheros `DiputadosActivos` y `DiputadosDeBaja` en JSON (el nombre exacto, con fecha, va en `ficheros`). Consultados el 18-10-2026.
- Los datos abiertos solo dan el último grupo de cada diputado. Si el alta en el grupo es más de 30 días posterior al alta como diputado y el grupo no es el de su formación, el periodo anterior se asigna al grupo de su formación electoral: Podemos (cinco diputados, 05-12-2023), Ábalos (27-02-2024), Micó (03-07-2025) y Ortega Smith (17-07-2026).
- `partido_mixto`, puesto a mano: BNG, CC y UPN por su formación; los diputados de SUMAR que pasan al Mixto el 05-12-2023, Podemos; Micó, Compromís; Ábalos y Ortega Smith, a título propio.

## `plenopedia_xv.json`

- Script: `R/08_plenopedia_xv.R`. Prueba de viabilidad de A3 Plenopedia (encargo del 19-10-2026); todavía no lo lee ningún juego.
- Fuente: Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura, los mismos PDF que `llamadas_al_orden.json` (caché de `R/05`), más `diputados_xv.json` y `llamadas_al_orden.json`.
- Método: en el campo `metodo` del JSON y en `editorial/fuentes/a03-plenopedia-viabilidad.md`, con ejemplos literales, controles y límites de cada indicador.
- Revisiones a mano (18-10-2026), escritas en el script: destinatario de 29 llamadas al orden (`llamadas_destinatario`, `revision = "manual"`, con nota) y minutos de silencio de los DS 91 y 147.

## `presidentes.json`

- Sin script: siete fichas hechas a mano, copiadas de `editorial/contenido/a12-presidentle.md` (pistas, nota y fuente) y de `editorial/fuentes/a12-presidentes.md` (fechas). Juego: A12 Presidentle.
- Fuentes, consultadas el 15-10-2026:
  - La Moncloa, Presidentes del Gobierno (reales decretos de nombramiento y biografías): https://www.lamoncloa.gob.es/presidente/presidentes/paginas/index.aspx
  - BOE núm. 49, de 26-02-1981 (RD 249/1981, cese de Suárez; RD 250/1981, nombramiento de Calvo-Sotelo): https://boe.es/boe/dias/1981/02/26/pdfs/BOE-S-1981-49.pdf
  - BOE de 05-05-1996 (nombramiento de Aznar): https://boe.es/boe/dias/1996/05/05/pdfs/A15699-15699.pdf
  - CIDOB, biografías de líderes políticos y cronología de gobiernos de España: https://www.cidob.org/lider-politico
  - Enciclopèdia Catalana (fecha de nacimiento de Calvo-Sotelo): https://www.enciclopedia.cat/EC-GEC-0013721
- Criterios: en el campo `criterios` del JSON. Sánchez sin fecha de fin; su tiempo se cuenta hasta `corte` (29-11-2026). En Suárez, `referencia` (1977) es el año que usan la edad y la pista 5; el tiempo cuenta desde `inicio` (1976).
- Comprobado al generar: edades y tiempos de las pistas 1 y 2 coinciden con los calculados a partir de las fechas.
