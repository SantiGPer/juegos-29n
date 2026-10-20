# A8 · Voto declarado por edad, sexo y hábitat (CIS 3420)

Encargo del 20-10-2026 (A8, datos). Generado con `R/06_cis_postelectoral.R` → `data/cis_postelectoral_2023.json`. Consulta: 20-10-2026. No se monta el juego.

## Estudio

- **CIS 3420**, «Barómetro de septiembre 2023. Postelectoral elecciones generales 2023». Es el postelectoral de las generales del 23-J: el CIS lo hizo dentro del barómetro de septiembre y no como estudio aparte.
- Campo: del 1 al 12-09-2023, entrevista telefónica (CATI), con un 19,4 % de fijos y un 80,6 % de móviles y cuotas de sexo y edad.
- Muestra: 10.101 entrevistas en el microdato. El avance de resultados dice 10.104; el microdato tiene tres casos menos, sin explicación en la ficha.
- Microdato: https://www.cis.es/documents/d/cis/MD3420 (zip con `3420.sav`, cuestionario, libro de códigos y ficha técnica), descargado el 20-10-2026.
- Ficha del estudio: https://www.cis.es/en/surveys/barometro-de-septiembre-2023.-postelectoral-elecciones-generales-2023

## Método

- **Variable de voto:** `RECUVOTOG1`, «Recuerdo de voto en las elecciones generales de 2023 de los votantes» (P6a). Solo la responden quienes dicen haber votado, en el colegio o por correo.
- **Base de cada porcentaje:** voto válido declarado, es decir, los cuatro partidos, el resto de partidos y «Otro partido». Quedan fuera la abstención, el blanco, el nulo, «No recuerda» y N.C., como pide el encargo. Son 7.537 casos.
- **Ponderación:** `PESO`, que según la ficha técnica es la que corrige la afijación no proporcional por comunidad para la muestra nacional. `PESOCCAA` solo sirve para estimar cada comunidad.
- **Tramos:**
  - Edad: los de los marginales del propio CIS (pregunta 0b): 18 a 24, 25 a 34, 35 a 44, 45 a 54, 55 a 64, 65 a 74 y 75 y más. El microdato solo trae la edad en años.
  - Hábitat: los siete de `TAMUNI`, que también estratifican la muestra.
- **Intervalo de confianza al 95 %:** aproximación normal con la n efectiva de Kish, n_ef = (Σw)² / Σw². Los pesos varían entre comunidades, así que la n efectiva es algo menor que la n sin ponderar. No recoge el efecto del diseño por cuotas: es un intervalo orientativo, como el error muestral de la ficha técnica.
- **n:** casos sin ponderar de la base en cada segmento. El JSON trae también `n_partido`, los casos que declaran ese partido. Ninguna base de segmento baja de 100. La celda más pequeña es Vox entre los mayores de 75 años: 32 casos sobre una base de 648.

## Comprobación

Con `PESO`, el microdato reproduce décima a décima los marginales publicados en el avance de resultados (https://cis.es/documents/d/cis/es3420marMT_a):

- edad: 8,4, 12,0, 16,4, 19,7, 17,5, 12,9 y 13,1;
- sexo: 48,3 y 51,7;
- recuerdo de voto sobre votantes (P6aR): PP 23,9, PSOE 28,7, Vox 7,5 y Sumar 15,3.

## Aviso para el contenido: el recuerdo se separa del resultado real

Sobre la misma base, el recuerdo de voto del CIS da al PSOE 2,4 puntos más que el resultado real y a Sumar 5,9 más. A Vox le da 3,5 puntos menos y al PP 4,8 menos (tabla del final). Es el sesgo de recuerdo habitual en las encuestas postelectorales. Si A8 compara la estimación del jugador con el CIS, el jugador compite contra lo que dicen los encuestados, no contra el voto real. Que el autor decida si eso se explica en la nota o se cambia el planteamiento (por ejemplo, comparar la estructura por segmento y no el nivel).

## Cifras

Porcentaje sobre voto válido declarado, con el intervalo al 95 % entre paréntesis.

### Edad

| Segmento | n | PP | PSOE | Vox | Sumar |
| --- | ---: | ---: | ---: | ---: | ---: |
| 18 a 24 | 477 | 20,3 (16,6–24,0) | 33,3 (29,0–37,7) | 11,8 (8,8–14,8) | 23,8 (19,9–27,8) |
| 25 a 34 | 885 | 21,6 (18,8–24,3) | 30,1 (27,1–33,2) | 12,8 (10,5–15,0) | 24,6 (21,7–27,5) |
| 35 a 44 | 1.316 | 25,9 (23,5–28,3) | 28,3 (25,8–30,8) | 9,4 (7,8–11,0) | 25,9 (23,5–28,3) |
| 45 a 54 | 1.660 | 32,5 (30,2–34,8) | 29,4 (27,2–31,7) | 9,9 (8,4–11,3) | 18,8 (16,9–20,7) |
| 55 a 64 | 1.504 | 28,6 (26,2–30,9) | 38,0 (35,5–40,5) | 8,6 (7,2–10,1) | 14,8 (12,9–16,6) |
| 65 a 74 | 1.047 | 27,7 (24,9–30,5) | 43,2 (40,2–46,3) | 6,3 (4,8–7,8) | 13,3 (11,2–15,4) |
| 75 y más | 648 | 39,1 (35,3–43,0) | 40,5 (36,6–44,3) | 4,8 (3,1–6,5) | 7,8 (5,7–9,9) |

### Sexo

| Segmento | n | PP | PSOE | Vox | Sumar |
| --- | ---: | ---: | ---: | ---: | ---: |
| Hombre | 3.833 | 28,6 (27,1–30,1) | 30,6 (29,1–32,1) | 12,1 (11,0–13,1) | 18,0 (16,7–19,2) |
| Mujer | 3.704 | 28,5 (27,0–30,0) | 37,9 (36,3–39,5) | 6,0 (5,2–6,8) | 18,7 (17,4–20,0) |

### Tamaño de hábitat

| Segmento | n | PP | PSOE | Vox | Sumar |
| --- | ---: | ---: | ---: | ---: | ---: |
| Menos o igual a 2.000 habitantes | 444 | 29,3 (24,9–33,7) | 34,2 (29,6–38,8) | 9,8 (6,9–12,7) | 16,5 (12,9–20,0) |
| 2.001 a 10.000 habitantes | 997 | 27,6 (24,8–30,5) | 35,3 (32,2–38,4) | 8,6 (6,8–10,4) | 15,6 (13,3–18,0) |
| 10.001 a 50.000 habitantes | 1.847 | 24,8 (22,8–26,9) | 36,0 (33,8–38,3) | 9,3 (7,9–10,6) | 19,1 (17,3–21,0) |
| 50.001 a 100.000 habitantes | 990 | 33,5 (30,5–36,5) | 32,6 (29,6–35,6) | 10,3 (8,3–12,2) | 16,9 (14,6–19,3) |
| 100.001 a 400.000 habitantes | 1.822 | 29,4 (27,2–31,5) | 34,0 (31,8–36,3) | 7,5 (6,3–8,8) | 18,0 (16,1–19,8) |
| 400.001 a 1.000.000 habitantes | 615 | 31,6 (27,9–35,4) | 33,5 (29,7–37,3) | 10,9 (8,4–13,4) | 21,3 (18,0–24,5) |
| Más de 1.000.000 habitantes | 822 | 28,9 (25,7–32,0) | 32,0 (28,8–35,3) | 8,3 (6,4–10,3) | 21,5 (18,6–24,3) |

### Total

| Segmento | n | PP | PSOE | Vox | Sumar |
| --- | ---: | ---: | ---: | ---: | ---: |
| Total | 7.537 | 28,6 (27,5–29,6) | 34,3 (33,2–35,4) | 9,0 (8,3–9,6) | 18,3 (17,4–19,2) |

### Resultado real de 2023

| | PP | PSOE | Vox | Sumar |
| --- | ---: | ---: | ---: | ---: |
| Sobre voto válido (con blanco) | 33,1 | 31,7 | 12,4 | 12,3 |
| Sobre votos a candidaturas (sin blanco) | 33,3 | 31,9 | 12,5 | 12,4 |
