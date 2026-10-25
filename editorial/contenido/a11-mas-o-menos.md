# A11 · Duelo de circunscripciones

Estado: **en la serie** (vuelve de la reserva por decisión del autor, 24-10). **Contenido aprobado por el autor** (24-10); falta el diseño de la barra de vida. Selección y estructura, del autor (24-10).

- Selección del autor (24-10) sobre editorial/catalogos/a11-catalogo.md: P1, P2, P3, P4, P5, P6, P7, P9, P10 y P11.
- Estructura (decisión del autor, 24-10): diez duelos seguidos con el duelo con «VS» del encadenador (maqueta v13).
- Vida (decisión del autor, 24-10; sustituye a la racha): barra de vida que se vacía con cada fallo; con 5 fallos llega a cero y la partida termina. Puntos = aciertos sobre 10. Estética de barra de juego de lucha arcade, pendiente del chat de diseño.
- Línea de unidad bajo cada pregunta (escrita por Code, aprobada por el autor el 24-10), porque las cifras de casillas no llevan «%».
- Lados de cada duelo: nominales, se barajan (criterio del 19-10). Cifra con dos decimales, como en los datos.
- Orden (propuesta de Cowork): dificultad creciente, sin dos duelos seguidos con la misma provincia ni la misma variable.
- Datos: `data/mapas_a07.json` y `data/resultados_2023_prov.json`.
- Fuente general: Ministerio del Interior (infoelectoral), elecciones generales del 23-07-2023; INE, cifras oficiales de población a 1-1-2023 y 1-1-2025.

## Portada

**Texto:** Cincuenta y dos circunscripciones, diez combates y una sola pregunta: ¿quién tiene más? Cada fallo te quita vida, y al quinto te quedas fuera del hemiciclo.

**Reglas:**
- (papeleta) 10 duelos: elige qué circunscripción tiene más.
- (vida) Cada fallo te quita vida; con 5 fallos, fin de la partida.
- (urna) 1 punto por acierto.

---

## Duelo 1 · P4

**Pregunta:** ¿Dónde sacó más porcentaje el PSOE?

**Unidad (bajo la pregunta):** % sobre voto válido

**Lados:** Barcelona 35,70 % · Madrid 27,84 %

**Correcta:** Barcelona

**Explicación:** El PSOE, que en Cataluña se presenta como PSC, sacó en Barcelona el 35,7 % y fue su séptima mejor provincia. En Madrid se quedó en el 27,8 %, la 45.ª de 52.

**Fuente:** Ministerio del Interior, Congreso, 23-07-2023 (% sobre voto válido).

---

## Duelo 2 · P10

**Pregunta:** ¿Qué provincia creció más entre 2023 y 2025?

**Unidad (bajo la pregunta):** % de variación de la población

**Lados:** Soria +0,84 % · Zamora −0,66 %

**Correcta:** Soria

**Explicación:** Soria ganó un 0,8 % de población en esos dos años y Zamora perdió un 0,7 %, la mayor caída de España. Solo cinco provincias perdieron población: Zamora, Jaén, Córdoba, Badajoz y León.

**Fuente:** INE, cifras oficiales de población a 1-1-2023 y 1-1-2025.

---

## Duelo 3 · P1

**Pregunta:** ¿Dónde sacó más porcentaje el PP?

**Unidad (bajo la pregunta):** % sobre voto válido

**Lados:** Lugo 50,24 % · Madrid 40,55 %

**Correcta:** Lugo

**Explicación:** Lugo fue la provincia con más voto al PP, el 50,2 %. En Madrid sacó el 40,6 %, casi diez puntos menos.

**Fuente:** Ministerio del Interior, Congreso, 23-07-2023 (% sobre voto válido).

---

## Duelo 4 · P6

**Pregunta:** ¿Dónde hubo más voto en blanco?

**Unidad (bajo la pregunta):** % sobre voto válido

**Lados:** Lleida 1,12 % · Valencia 0,75 %

**Correcta:** Lleida

**Explicación:** Lleida fue la provincia con más voto en blanco, el 1,12 % de los votos válidos, una centésima más que Cádiz; Valencia se quedó en el 0,75 %. El voto en blanco cuenta como válido; el nulo, no.

**Fuente:** Ministerio del Interior, Congreso, 23-07-2023; LOREG, art. 96.5.

---

## Duelo 5 · P3 (reformulado, 24-10)

**Pregunta:** ¿Dónde sacó más porcentaje el PP?

**Unidad (bajo la pregunta):** % sobre voto válido

**Lados:** Jaén 37,32 % · Sevilla 33,38 %

**Correcta:** Jaén

**Explicación:** El PP sacó en Jaén el 37,3 %, casi cuatro puntos más que en Sevilla (33,4 %), y además superó al PSOE (36,3 %). Aun así, Jaén fue la quinta provincia con más voto al PSOE.

**Fuente:** Ministerio del Interior, Congreso, 23-07-2023 (% sobre voto válido).

---

## Duelo 6 · P9

**Pregunta:** ¿Qué provincia creció más entre 2023 y 2025?

**Unidad (bajo la pregunta):** % de variación de la población

**Lados:** Guadalajara +3,93 % · Barcelona +3,06 %

**Correcta:** Guadalajara

**Explicación:** Guadalajara creció un 3,9 % en dos años, casi un punto más que Barcelona (3,1 %). Solo Alicante (4,1 %) y Madrid (4,0 %) crecieron más.

**Fuente:** INE, cifras oficiales de población a 1-1-2023 y 1-1-2025.

---

## Duelo 7 · P7

**Pregunta:** ¿Dónde vive en el extranjero una parte mayor del censo?

**Unidad (bajo la pregunta):** % del censo electoral que vive en el extranjero

**Lados:** Soria 9,64 % · Madrid 7,21 %

**Correcta:** Soria

**Explicación:** El 9,6 % de los electores de Soria vive en el extranjero, frente al 7,2 % de Madrid. Ourense encabeza la lista: casi tres de cada diez (28,9 %).

**Fuente:** Ministerio del Interior, censo electoral de las generales del 23-07-2023 (CERA sobre censo total).

---

## Duelo 8 · P5

**Pregunta:** ¿Dónde sacó más porcentaje el PSOE?

**Unidad (bajo la pregunta):** % sobre voto válido

**Lados:** Badajoz 39,21 % · Sevilla 36,60 %

**Correcta:** Badajoz

**Explicación:** Badajoz fue la provincia con más voto al PSOE (39,2 %), por delante de Sevilla (36,6 %). Las dos extremeñas encabezan la lista: Cáceres fue la segunda (38,9 %).

**Fuente:** Ministerio del Interior, Congreso, 23-07-2023 (% sobre voto válido).

---

## Duelo 9 · P11

**Pregunta:** ¿Dónde sacó más porcentaje PACMA?

**Unidad (bajo la pregunta):** % sobre voto válido

**Lados:** Santa Cruz de Tenerife 1,24 % · Barcelona 1,06 %

**Correcta:** Santa Cruz de Tenerife

**Explicación:** Santa Cruz de Tenerife fue la provincia donde PACMA sacó más porcentaje, el 1,24 %; en Barcelona, el 1,06 %. No logró escaño en ninguna.

**Fuente:** Ministerio del Interior, Congreso, 23-07-2023 (% sobre voto válido).

---

## Duelo 10 · P2

**Pregunta:** ¿Dónde sacó más porcentaje el PP?

**Unidad (bajo la pregunta):** % sobre voto válido

**Lados:** Ourense 50,02 % · Melilla 49,16 %

**Correcta:** Ourense

**Explicación:** Ourense (50,0 %) y Lugo (50,2 %) fueron las dos únicas provincias donde el PP pasó del 50 %. Melilla se quedó a menos de un punto del 50 %, con el 49,2 %.

**Fuente:** Ministerio del Interior, Congreso, 23-07-2023 (% sobre voto válido).
