# A7 · ¿Qué mapa es este?

Estado: **aprobado por el autor** (2026-10-21): portada, orden de rondas, distractores, cortes y explicaciones. Criterios del autor del 20-10 en editorial/decisiones.md; diseño en docs/maquetas/maqueta-mapas-v10.html (variante A).

- Ámbito: 52 provincias (con Ceuta y Melilla). Datos en `data/resultados_2023_prov.json`.
- Mecánica: seis rondas con el encadenador; en cada una, un mapa sin título ni leyenda y cuatro etiquetas (la correcta y tres distractores). 1 punto por acierto; 6 en total.
- Distractores (decisión del autor, 21-10; sustituye a «tres del mismo juego» del 20-10):
  1. Un mapa ya resuelto no vuelve como opción. Los distractores salen de los mapas que aún no han salido y de siete etiquetas señuelo (tabla «Señuelos»): variables reales calculadas con los mismos datos, cuyo mapa no se enseña.
  2. Siempre los tres más parecidos al mapa de la ronda (Spearman entre provincias), excluidos los casi idénticos (ρ > 0,9).
  3. Cada señuelo sale como mucho tres veces en la partida.
  Las etiquetas son nominales: se barajan (criterio del 19-10). Si cambia el orden de las rondas, los distractores se recalculan.
- Escala: cinco tramos, del sepia a la tinta. Cortes: ver la tabla «Cortes» (método pendiente del autor).
- Fuente general: Ministerio del Interior (infoelectoral), elecciones generales del 23-07-2023; INE, cifras oficiales de población a 1-1-2025 y Estadística del Padrón Continuo a 1-1-2023; Real Decreto 806/2026 (escaños de 2026).

## Portada

**Texto:** El verdadero mapa político de España es el de la geografía electoral: seis mapas sin título ni leyenda para poner a prueba tu instinto. Mira dónde se oscurece y adivina qué cuenta cada uno.

**Reglas:**
- (papeleta) 6 mapas: elige qué muestra cada uno entre cuatro opciones.
- (urna) 1 punto por mapa acertado.

## Definiciones

Mientras se juega, encima del mapa: «Datos de AAAA» (2023 en todos salvo el ratio habitantes/escaño, «Datos de 2026»; decisión del autor, 24 y 25-10). La etiqueta «Habitantes por escaño» pasa a «Ratio habitantes/escaño» en las opciones y el título (25-10); en la prosa de las explicaciones se mantiene «habitantes por escaño».

| Mapa | Etiqueta (opción) | Título al resolver | Cálculo |
| --- | --- | --- | --- |
| Abstención | Abstención | Abstención (% del censo residente), 2023 | 1 − votantes residentes / censo residente (sin CERA) |
| Habitantes por escaño | Ratio habitantes/escaño | Ratio habitantes/escaño, 2026 | Población a 1-1-2025 / escaños de 2026 |
| Voto nulo | Voto nulo | Voto nulo (% de votantes), 2023 | Nulos / votantes (con CERA) |
| Voto a Sumar | Voto a Sumar | Voto a Sumar (% del voto válido), 2023 | Votos de la candidatura de acumulación de Sumar / válidos |
| Nacidos en el extranjero | Nacidos en el extranjero | Nacidos en el extranjero (% de la población), 2023 | Nacidos en el extranjero / total del Padrón Continuo a 1-1-2023 |
| Voto a Vox | Voto a Vox | Voto a Vox (% del voto válido), 2023 | Votos de Vox / válidos; Santa Cruz de Tenerife sin candidatura (sin dato) |

## Señuelos (etiquetas que nunca son la respuesta)

| Etiqueta | Cálculo (no se dibuja) |
| --- | --- |
| Voto al PP | Votos del PP / válidos, 2023 |
| Voto al PSOE | Votos del PSOE / válidos, 2023 |
| Voto en blanco | Blancos / válidos, 2023 |
| Electores en el extranjero | Censo CERA / censo total, 2023 |
| Población | Población a 1-1-2025 |
| Crecimiento de la población | Población 1-1-2025 / 1-1-2023 − 1 |
| Voto a PACMA | Votos de PACMA / válidos, 2023 (Ceuta sin candidatura, fuera del cálculo) |

Excluido por casi idéntico: Población frente a Habitantes por escaño (ρ = 0,97).

## Parecido entre mapas (Spearman, 52 provincias)

| | Abstención | Hab./escaño | Nulo | Sumar | Extranjero | Vox |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Abstención | 1 | 0,44 | −0,14 | 0,27 | 0,37 | −0,15 |
| Hab./escaño | 0,44 | 1 | −0,11 | 0,79 | 0,31 | 0,09 |
| Nulo | −0,14 | −0,11 | 1 | −0,15 | −0,28 | 0,35 |
| Sumar | 0,27 | 0,79 | −0,15 | 1 | 0,24 | −0,09 |
| Extranjero | 0,37 | 0,31 | −0,28 | 0,24 | 1 | 0,14 |
| Vox | −0,15 | 0,09 | 0,35 | −0,09 | 0,14 | 1 |

En Vox, 51 provincias (sin Santa Cruz de Tenerife).

## Cortes (método B, decisión del autor del 21-10)

Dos métodos. **A, quintiles exactos:** diez u once provincias por tramo, pero cortes con decimales poco legibles en la leyenda. **B, cortes redondos cerca de los quintiles (recomendado):** la leyenda se lee de un vistazo y los tramos quedan entre 8 y 13 provincias. Los datos no se redondean: solo los cortes son cifras redondas.

| Mapa | A · Quintiles | B · Redondos | Provincias por tramo (B) |
| --- | --- | --- | --- |
| Abstención (%) | 25,63 · 26,68 · 28,86 · 34,02 | 25,5 · 26,5 · 29 · 34 | 9 · 12 · 11 · 10 · 10 |
| Habitantes por escaño | 81.822 · 107.141 · 132.777 · 154.632 | 80.000 · 105.000 · 135.000 · 155.000 | 9 · 11 · 13 · 11 · 8 |
| Voto nulo (%) | 0,94 · 1,05 · 1,19 · 1,32 | 0,95 · 1,05 · 1,2 · 1,3 | 12 · 10 · 10 · 9 · 11 |
| Voto a Sumar (%) | 6,06 · 8,23 · 10,92 · 13,19 | 6 · 8 · 11 · 13 | 10 · 10 · 13 · 9 · 10 |
| Nacidos en el extranjero (%) | 8,89 · 11,90 · 15,46 · 22,10 | 9 · 12 · 16 · 22 | 11 · 11 · 10 · 10 · 10 |
| Voto a Vox (%) | 7,56 · 13,20 · 14,75 · 16,12 | 7,5 · 13 · 15 · 16 | 10 · 9 · 13 · 9 · 10 |

Leyenda: «menos de X», «X–Y», …, «Z o más». Un valor igual al corte va al tramo superior.

---

## Ronda 1 · Voto a Vox

**Opciones:** Voto a Vox · Voto nulo · Voto a PACMA · Crecimiento de la población

**Parecido de los distractores (Spearman):** Voto nulo 0,35 · PACMA 0,28 · Crecimiento 0,23

**Explicación:** Vox superó el 21 % en Almería, Murcia y Ceuta, su mejor provincia (23,3 %), y no llegó al 4 % en ninguna de las tres provincias vascas. En Santa Cruz de Tenerife no presentó candidatura, y por eso el mapa la deja sin dato.

**Datos:** máximo Ceuta 23,26 %; Murcia 21,81 %; Almería 21,28 %. Mínimo Gipuzkoa 2,09 %; Bizkaia 2,64 %; Araba/Álava 3,89 %.

**Fuente:** Ministerio del Interior, resultados del Congreso del 23-07-2023.

---

## Ronda 2 · Nacidos en el extranjero

**Opciones:** Nacidos en el extranjero · Crecimiento de la población · Voto a PACMA · Abstención

**Parecido de los distractores (Spearman):** Crecimiento 0,85 · PACMA 0,54 · Abstención 0,37

**Explicación:** Illes Balears (26,4 %), Alicante (26,3 %) y Girona (25,3 %) son las provincias con más población nacida en el extranjero, y Jaén (4,3 %), la que menos. La cifra del INE incluye a los nacidos en antiguos territorios españoles.

**Datos:** mínimo Jaén 4,31 %; Córdoba 4,71 %; Badajoz 4,72 %.

**Fuente:** INE, Estadística del Padrón Continuo a 1-1-2023 (tabla 68526).

---

## Ronda 3 · Abstención

**Opciones:** Abstención · Voto a PACMA · Ratio habitantes/escaño · Población

**Parecido de los distractores (Spearman):** PACMA 0,60 · Habitantes por escaño 0,44 · Población 0,35

**Explicación:** Melilla (50,2 %) y Ceuta (44,3 %) tuvieron la abstención más alta, seguidas de Lleida y Girona, por encima del 37 %; la más baja fue la de Segovia (22,8 %). Se calcula sobre los electores que viven en España, sin el voto exterior.

**Datos:** Lleida 38,06 %; Girona 37,82 %; Las Palmas 36,88 %. Mínimo Segovia 22,82 %; Cuenca 23,11 %; Ávila 23,43 %.

**Fuente:** Ministerio del Interior, resultados del Congreso del 23-07-2023 (censo y votantes residentes).

---

## Ronda 4 · Habitantes por escaño

**Opciones:** Ratio habitantes/escaño · Voto a Sumar · Crecimiento de la población · Voto en blanco

**Parecido de los distractores (Spearman):** Sumar 0,79 · Crecimiento 0,47 · Blanco 0,12

**Explicación:** Un diputado de Soria representa a 45.117 habitantes y uno de Madrid, a 187.817: más de cuatro veces más. Es el efecto del mínimo de dos diputados por provincia que fija la LOREG antes de repartir el resto por población.

**Datos:** Soria 45.117; Teruel 45.399; Segovia 52.823. Madrid 187.817; Barcelona 186.979; Valencia 172.415. Población a 1-1-2025; escaños de 2026 (Madrid 38).

**Fuente:** INE, cifras oficiales de población a 1-1-2025; Real Decreto 806/2026; LOREG, art. 162.2.

---

## Ronda 5 · Voto a Sumar

**Opciones:** Voto a Sumar · Población · Voto en blanco · Voto al PSOE

**Parecido de los distractores (Spearman):** Población 0,81 · Blanco 0,22 · PSOE −0,04

**Explicación:** Sumar tuvo sus mejores resultados en Valencia (16,9 %, con Compromís), Illes Balears (16,6 %, con Més) y Madrid (15,5 %), y los peores en Ceuta, Melilla y Soria, por debajo del 3,5 %. Su mapa se parece mucho al de habitantes por escaño: le fue mejor cuanto más poblada es la provincia.

**Datos:** Ceuta 2,46 %; Melilla 3,02 %; Soria 3,37 %. Spearman con habitantes por escaño: 0,79. Incluye las listas territoriales de la candidatura de acumulación de Sumar (Sumar-En Comú Podem, Compromís-Sumar, Sumar Més y otras).

**Fuente:** Ministerio del Interior, resultados del Congreso del 23-07-2023; INE, población a 1-1-2025.

---

## Ronda 6 · Voto nulo

**Opciones:** Voto nulo · Voto al PSOE · Voto en blanco · Voto al PP

**Parecido de los distractores (Spearman):** PSOE 0,54 · Blanco 0,49 · PP 0,17

**Explicación:** Badajoz (1,70 %), Cáceres (1,63 %) y Huelva (1,56 %) tuvieron más voto nulo, y Gipuzkoa (0,62 %), el que menos. El nulo no es el voto en blanco: el blanco cuenta como voto válido y el nulo no.

**Datos:** mínimo Gipuzkoa 0,62 %; Soria 0,76 %; Barcelona 0,79 %.

**Fuente:** Ministerio del Interior, resultados del Congreso del 23-07-2023; LOREG, art. 96.5.
