# A3 · Plenopedia

Estado: **textos aprobados por el autor** (2026-10-19). Cifras confirmadas por Code el 18-10 (9).

- Ámbito: Pleno del Congreso, XV legislatura (203 sesiones, 17-08-2023 a 06-10-2026).
- Motor: encadenador de rondas (`shared/motores/rondas.js`), 10 rondas de tipos distintos, una puntuación sobre 10.
- Puntuación por ronda: 1 si se acierta. En ordenar y estimar se puede sacar ½ (criterio en cada ronda).
- Orden de las opciones: criterio universal de M1. Las cifras y las horas van de mayor a menor; los nombres se barajan.
- Tono de las preguntas: natural, con algún guiño ligero y sin sátira; no definen el indicador, que va en la explicación (decisión del autor, 19-10).
- Fuente general: Diario de Sesiones del Congreso de los Diputados, Pleno, XV legislatura. Elaboración propia (`data/plenopedia_xv.json`).

## Portada

**Texto:** Tres años de plenos, 9,3 millones de palabras y unas cuantas broncas. ¿Has estado atento a la legislatura o te has quedado dormido en el escaño?

**Reglas:**
- (papeleta) 10 preguntas: elegir, ordenar, estimar y un duelo.
- (urna) 1 punto por acierto; al ordenar y al estimar, medio punto si te acercas.

## Nota metodológica (al final de la partida)

Todo sale de los Diarios de Sesiones del Pleno de la XV legislatura, leídos intervención a intervención. Las palabras se cuentan en castellano: de las intervenciones en catalán, euskera o gallego se toma la interpretación que publica el propio Diario. El presidente y los ministros cuentan como Gobierno y no como su partido, y la Mesa queda aparte. Rumores, risas y aplausos son las acotaciones del Diario y se atribuyen a quien tiene la palabra; para comparar grupos se dan por cada 10.000 palabras. Las llamadas al orden las impone la Presidencia y se cuentan una vez por acto, aunque se repita la fórmula. Todos los grupos se miden con el mismo método.

---

## 1 · Opciones

**Pregunta:** ¿Qué diputado habló más en los plenos de la legislatura?

**Opciones:** Néstor Rego (BNG) · Idoia Sagastizabal (PNV) · Alberto Núñez Feijóo (PP) · Gabriel Rufián (ERC)

**Correcta:** Néstor Rego (BNG)

**Explicación:** Néstor Rego, único diputado del BNG, pronunció 203.982 palabras, casi 60.000 más que la segunda, Idoia Sagastizabal (PNV). En los grupos pequeños el turno se reparte entre muy pocos diputados, y eso dispara la cuenta de cada uno.

**Datos:** Rego 203.982 · Sagastizabal 145.571 · Feijóo 128.034 · Rufián 91.871 palabras.

---

## 2 · Opciones

**Pregunta:** Cuando toma la palabra, ¿quién levanta más murmullos en el hemiciclo?

**Opciones:** Gobierno · PSOE · PP · Vox

**Correcta:** Gobierno

**Explicación:** El Diario de Sesiones anota «(Rumores)» cada vez que el hemiciclo murmulla: durante las intervenciones del Gobierno salen 13,2 por cada 10.000 palabras, más que con cualquier grupo. Le siguen el PSOE (8,4) y el PP (7,3).

**Datos:** Gobierno 13,2 · PSOE 8,42 · PP 7,30 · Vox 3,64 por cada 10.000 palabras.

---

## 3 · Estimación

**Pregunta:** Hay jornadas que no se acaban nunca. ¿Cuánto duró el pleno más largo de la legislatura?

**Rango:** de 6 h a 16 h, en pasos de 30 minutos (decisión del 18-10-2026). Formato: horas y minutos.

**Dato:** 12 h 21 min.

**Puntuación:** 1 punto si eliges una de las dos posiciones que rodean el dato (12 h o 12 h 30 min; error menor de 30 min); ½ si te quedas a una posición más, a media hora (11 h 30 min o 13 h; error de 1 h o menos); 0 en otro caso (decisión del 18-10-2026).

**Explicación:** Fue el 10 de septiembre de 2025, de las 9.00 a las 21.21 y sin pausas. Ese día el Congreso tumbó la reducción de la jornada laboral a 37,5 horas.

---

## 4 · Opciones

**Pregunta:** En el Congreso no hay tarjetas amarillas, pero casi. ¿Qué diputado se llevó más llamadas al orden?

**Opciones:** Miguel Tellado (PP) · Rafael Hernando (PP) · José María Sánchez García (Vox) · Agustín Conde (PP)

**Correcta:** Miguel Tellado (PP)

**Explicación:** Miguel Tellado acumuló 18 de las 90 llamadas al orden de la legislatura, siete más que el segundo, Rafael Hernando. Las llamadas las impone la Presidencia cuando un diputado interrumpe o no respeta el turno.

**Datos:** Tellado 18 · Hernando 11 · Sánchez García 8 · Conde 6.

---

## 5 · Ordenar

**Pregunta:** ¿Qué palabras se oyeron más en el hemiciclo? Ordénalas de la más repetida a la menos.

**Ítems (valor):** España (20.126) · vivienda (10.239) · Cataluña (6.635) · corrupción (4.733) · ETA (859)

**Puntuación:** 1 punto con todo en su sitio; ½ con al menos tres palabras en su posición exacta.

**Explicación:** «España» se pronunció 20.126 veces, el doble que «vivienda»; «ETA», 859. Se cuenta también el plural de «vivienda» y de «corrupción».

---

## 6 · Duelo

**Pregunta:** En política también hay espacio para la comedia: ¿quién hizo reír más veces a la Cámara?

**Fichas:** Pedro Sánchez (Gobierno) · Alberto Núñez Feijóo (PP)

**Correcta:** Pedro Sánchez

**Explicación:** El Diario anota 266 «(Risas)» durante las intervenciones de Pedro Sánchez y 228 durante las de Alberto Núñez Feijóo. Entre los dos suman más de una cuarta parte de todas las risas de la legislatura (1.764).

**Pendiente de diseño:** la muestra de color del Gobierno, que no es un partido.

---

## 7 · Opciones (cifras, de mayor a menor)

**Pregunta:** Hay quien prefiere escuchar. ¿Cuántos diputados pasaron toda la legislatura sin tomar la palabra ni una vez en los plenos?

**Opciones:** 21 · 15 · 4 · 0

**Correcta:** 4

**Explicación:** Fueron cuatro, todos del PP. Si se cuentan también los que solo ocuparon el escaño una parte de la legislatura, la cifra sube a 21.

---

## 8 · Opciones (horas, de la más tardía a la más temprana)

**Pregunta:** Algunos plenos terminaron a deshoras. ¿A qué hora acabó el más tardío?

**Opciones:** 23.25 · 22.55 · 22.11 · 21.35

**Correcta:** 23.25

**Explicación:** Fue el 19 de diciembre de 2023, a las 23.25. La segunda más tardía también cayó ese mes: el 12 de diciembre, a las 22.55.

---

## 9 · Opciones

**Pregunta:** Cuando sus diputados toman la palabra, ¿qué grupo recibe más aplausos?

**Opciones:** PP · PSOE · Vox · Sumar

**Correcta:** PP

**Explicación:** El Diario anota los aplausos durante cada intervención: con los oradores del PP salen 63,7 por cada 10.000 palabras, por delante del PSOE (55,6) y de Vox (54,1). En el otro extremo está Junts, con 0,7.

**Datos:** PP 63,7 · PSOE 55,6 · Vox 54,1 · Sumar 39,5.

---

## 10 · Opciones (cifras, de mayor a menor)

**Pregunta:** A veces el hemiciclo enmudece por respeto. ¿Cuántos minutos de silencio se guardaron en la legislatura?

**Opciones:** 112 · 66 · 31 · 12

**Correcta:** 66

**Explicación:** La Cámara se puso en pie 66 veces en 203 sesiones, algo más de una de cada tres. Uno de ellos, por la dana, abrió el 30 de octubre de 2024 la sesión más corta de la legislatura: 25 minutos.
