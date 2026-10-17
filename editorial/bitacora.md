# Bitácora de Claude Code

Una entrada por sesión, la más reciente arriba. Formato: fecha · juego/motor · hecho · falta · dudas para el autor.

## 2026-10-17 (2) — Paso 1 del orden de trabajo: base.css y motores al diseño arcade

**Hecho** (plan confirmado por el autor)
- `shared/base.css`:
  - Tokens `--s1…--s6`, título a 1.75 rem y pregunta a 1.375 rem en 800.
  - Tres zonas: `.cuerpo` y `.barra`. La barra va fija abajo (sticky, con `env(safe-area-inset-bottom)`). Desde 768 px va tras el contenido y la columna de 38 em se centra.
  - Opciones de 52 px separadas 8 px.
- `shared/util.js`:
  - `monta()` (cuerpo + barra) y `accion()`.
  - `muestra()`: scroll suave hasta la explicación, instantáneo con movimiento reducido.
  - `cifra()`: cifras de casillas en 5×7, con coma para el medio punto de A2 («01,5»).
  - `celdas()`: pista de 22 px con tic y aspa de píxeles, medio relleno y celda en curso con borde de 3 px.
  - `marcador()`: cabecera compacta con nombre, puntos a dos dígitos y pista, cursor de píxeles que salta con `steps()` y «+N» al sumar (oculto con movimiento reducido).
- `shared/iconos.js`: tic, aspa, urna y candado. `shared/urna.svg` es el favicon de todas las páginas, y se añade `viewport-fit=cover`.
- `shared/motores/quiz.js` (opciones, ordenar y pistas) y `agrupar.js` usan las tres zonas. El botón principal no cambia de sitio, solo de verbo, y va apagado sin elección. En A2, las cuatro celdas de la ronda en curso llevan el borde de 3 px; en A12, la celda de la pista vigente.
- `shared/cierre.js`:
  - «Fin de la partida» y cifra de casillas sobre banda de marcador, con la pista fija debajo (las palabras de A10 siguen con la pasada de marcador).
  - El recibo empieza por «Juegos 29N, día N» y lleva el enlace sin `https://`.
  - «Copiado» durante 2 s.
  - Candado con «Mañana, otro juego.» y enlace «Todos los juegos».
- Pruebas: arnés en iframe (fuera del repo) que juega partidas enteras. A1, A2, A10 y A12 terminan sin errores de JS ni scroll horizontal a 320, 375 y 1280 px. Capturas a 375 × 560 y 1280 revisadas contra la lista negra: sin sombras, radios, degradados, flechas ni eyebrows. A 320 px, la pista de A2 parte en dos líneas por tramos y el cursor sigue a la celda.

**Falta**
- Paso 2: portada común `shared/portada.js` (G1) en A1, A2, A10 y A12.
- Paso 3: cambios de A2, A10 (corazones) y A12.
- El índice sigue siendo la lista provisional; el selector de días va cuando haya fichas.

**Dudas para el autor**
- **Día N del recibo.** El reparto de días no está fijado (decisión del 16-10), así que el recibo dice «Juegos 29N, día TODO». Los motores leen un campo `dia` del `data.json` (en A12, de `game.js`): basta con añadirlo cuando se fije el reparto.
- **A10 sin pista ni puntos.** Su cabecera lleva vidas en lugar de puntos y celdas, porque «puntos» no nombra ninguna regla de A10.
- **«+N» en A2 y A12.** El «+1» aparece como «+1,5» en A2 (suma de la ronda) y como «+5» en A12 (puntos al acertar). ¿Vale, o en esos juegos se quita?
- **Recibo de A2.** Las celdas de medio punto salen como ⬜ en el recibo (regla 🟨⬜ con la nota decimal), pero en pantalla se ven medio llenas.

**Hecho: comprobaciones de fuentes de A4 y A13** (encargos del 17-10)
- Resultado de A4 en `editorial/fuentes/a04-promesas.md`, con citas literales y URL. Las fuentes las buscó un agente en la web y las citas llevan su URL; yo no he vuelto a abrir cada documento. El PDF del acuerdo PSOE-Sumar consultado es la copia que aloja el PSC.
- No se ha tocado el contenido de A4 ni el de A13.

**Dudas para el autor (A4)**
- **P5, energéticas.** Confirmada. El acuerdo (pág. 38) dice «Revisaremos los gravámenes sobre la banca y las empresas energéticas con el objetivo de readaptarlos y mantenerlos». La fuente «[VERIFICAR literal]» puede pasar a «Acuerdo PSOE-Sumar, 24-10-2023, pág. 38».
- **P8, art. 49.** La promesa estaba en el programa del PSOE 2023 y en el acuerdo PSOE-Sumar (pág. 24: «Culminaremos la reforma del artículo 49 de la Constitución para suprimir el término “disminuidos”…»). El pacto con el PP de diciembre de 2023 fue la vía para cumplirla, no su origen. Propuesta: citar el acuerdo PSOE-Sumar como origen y el BOE-A-2024-3099 como cumplimiento. La página del programa del PSOE no se ha podido leer, porque psoe.es está bloqueado (`TODO`).
- **P12, paridad.**
  - Origen: acuerdo PSOE-Sumar, pág. 34. El proyecto anterior decayó con la disolución de 2023, y su visto bueno fue el 23-05-2023, no en 2022.
  - Discrepancia en la explicación: dice «consejos de administración de grandes empresas», pero la LO 2/2024 lo exige a las sociedades cotizadas y a las entidades de interés público de más de 250 trabajadores, no a todas las grandes empresas.
  - Identificador del BOE: BOE-A-2024-15936.
  - Además de listas y consejos, la ley alcanza al Gobierno, los órganos constitucionales, la AGE y los jurados de premios. Los colegios profesionales no tienen cuota obligatoria.

**Dudas para el autor (A13)**
- **Bisagra.** El DLE no tiene acepción política de «bisagra»; sus tres acepciones son de herraje, zapatería y encuadernación. Lo que existe es la forma compleja «partido bisagra», definida s. v. «partido»: «partido político minoritario que funciona entre otros dos mayores asegurando con su apoyo la función del que gobierna». La fuente correcta sería «DLE, s. v. «partido» (partido bisagra)». ¿Se mantiene «Bisagra» como respuesta principal?
- **Hare.**
  - Ediciones de Nohlen, «Sistemas electorales y partidos políticos»: 1.ª en UNAM-FCE, 1994 (en acceso abierto); 2.ª en FCE, 1998; 3.ª en FCE, 2004; y una edición revisada en Tirant lo Blanch, 2022.
  - La 1.ª trata el «método de Hare (impulsado por Thomas Hare)» en la p. 70.
  - Nohlen no dice que Hare fuera «abogado inglés». Hace falta otra fuente para ese dato de la pista o recortarlo.

## 2026-10-17 — A3: VIII a XV contadas y validadas; encargos nuevos del 16-10 en A1, A2 y A10

**Hecho: A3**
- `R/05_llamadas_al_orden.R` recorre de la VIII a la XV:
  - Nombre de fichero por formato: `PL_<nnn>` hasta el diario 53 de la X y `DSCD-` después.
  - Los PDF `PL_` (dos columnas) se leen por columnas, con las coordenadas de cada palabra. Se unen las palabras partidas a final de línea.
  - Ante una página de bloqueo, espera y repite en lugar de tomarla por hueco.
  - Busca las partes `-C1` a `-C4` (la constitutiva de la XIII solo existe como `-C2`).
  - Por memoria, de cada diario solo guarda lo necesario para el denominador y las intervenciones de la mesa con la fórmula. La pasada completa la tuvo que lanzar el autor fuera de Claude Code: Claude Code paró tres veces el proceso en segundo plano por falta de memoria del sistema.
- **Fallo corregido que afecta a la XV:** un diario con alguna hoja sin folio se quedaba entero sin texto, aunque contaba como sesión. La XV pasa de **83 a 90** llamadas. Las siete nuevas son reales y están en los diarios 182, 196, 207 y 210. En la IX el fallo vaciaba 14 diarios.
- Denominador con el criterio de la XV. Numeración sin huecos de la sesión 1 a la última en todas las legislaturas, después de dos correcciones:
  - Portadas con «Sesión núm.» o «Sesión Plenaria núm.».
  - Errata del diario 87 de la VIII, que dice «núm. 81» y es la 82.
- Validación en `editorial/fuentes/a03-validacion-viii-x.md`:
  - **Precisión VIII–X:** 105 de 108 actos son llamadas reales (97 %).
  - **Atribución a la Presidencia o una Vicepresidencia:** correcta en los 108, también en los PDF a dos columnas.
  - **Exhaustividad VIII–X:** 95 % (en la X sola, 91 %).
- `data/SOURCES.md` al día.

| Leg. | Presidencia del Congreso | Sesiones plenarias | Llamadas | Por 100 sesiones |
| --- | --- | --- | --- | --- |
| VIII | Marín | 288 | 40 | 13,9 |
| IX | Bono | 262 | 4 | 1,5 |
| X | Posada | 293 | 64 | 21,8 |
| XI | López | 13 | 2 | 15,4 |
| XII | Pastor | 176 | 23 | 13,1 |
| XIII | Batet | 9 | 0 | 0,0 |
| XIV | Batet | 262 | 48 | 18,3 |
| XV | Armengol | 203 | 90 | 44,3 |

- XI y XIII tienen muy pocas sesiones (13 y 9), y su tasa es frágil: una llamada más o menos mueve la cifra varios puntos.

**Hecho: encargos del 16-10 (tarde)**
- Commit aparte con los cambios de Cowork en `editorial/` y `docs/` (catálogos, contenido nuevo, decisiones).
- **A2:**
  - `data.json` regenerado con los 12 hitos y las 3 rondas nuevas.
  - Incidencia de los ítems 2 y 3 invertidos: **no se reproduce**. Solo ha existido una versión de `data.json`, con fechas ISO, y es la que está en Pages. `pruebas/ordenar.html` juega 100 partidas con el motor real y comprueba que la lista resuelta de cada ronda sale ordenada por fecha. Pasa con el contenido nuevo y con el publicado. Se ejecuta sirviendo la raíz del repo y abriéndola, o con `chrome --headless --dump-dom`.
  - Hipótesis: al comprobar, la lista del jugador se sustituye por la solución, así que dos hitos que el jugador tenía cambiados (½ punto cada uno) se ven «invertidos» respecto a lo que había ordenado.
- **A10:** `data.json` con los grupos A, J, H y D. Colores de grupo según la decisión de diseño:
  - `--senado`, `--senal` y `--grupo-1…4` en `base.css`.
  - Recibo 🟨🟫🟧⬛.
  - Grupo resuelto con fondo de su color; texto en papel en el grupo 4.
  - Grupo perdido en papel, con muestra de color.
  - Capturas a 375 px (cuatro grupos resueltos, partida perdida y cierre) y a 1280 px, revisadas.
- **A1:**
  - `data.json` regenerado desde el contenido nuevo, con las preguntas en el orden fijo del fichero.
  - Cotejo literal ampliado con CE 68.1 y 68.3 y LOREG 51, 162.1, 166.1, 25.1, 26.2 y 27, con la numeración nueva. Las citas que ya no usa ninguna pregunta quedan marcadas como «fuera desde el 16-10».
  - Todos los textos de A1, A2 y A10 aparecen literales en su contenido. Hay dos excepciones que no vienen de él: la instrucción de A2, que ya estaba, y la fuente general de A10, compuesta con las fuentes de cada grupo.

**Falta**
- A3: validación del OCR de I–VII (muestra de 20 sesiones frente a lectura manual, umbral del 95 %), que el encargo deja para después de VIII–XV. Los PDF de I–VII están sin descargar: unos 1.800 diarios y varios GB.
- A3: el juego en sí (M4 cadena mayor/menor y pantalla final con `legislaturas.json`).
- A4: el contenido y el catálogo están en `editorial/`, pero no hay encargo para Code. Queda pendiente la propuesta de no barajar las opciones.
- Pasar los motores al diseño arcade (pendiente de la sesión del 16-10).
- ~~Push a Pages de A1, A2 y A10 regenerados.~~ Hecho el 17-10-2026 con confirmación del autor (`6d4e728`).
- Siguiente sesión: paso 1 del orden de trabajo del 17-10 (diseño arcade en `base.css` y motores), con plan previo.

**Dudas para el autor**
- **A3, fórmula.** La regla fijada no recoge las perífrasis con valor de llamada: «le tengo que llamar al orden por primera vez», «le voy a llamar al orden por primera vez», «me obliga a llamarle al orden por segunda vez», «llamo al orden por primera vez al señor…». Se pierden 6 en la X (la mayoría de Posada), 4 en la XV, 1 en la XII y 1 en la XIV. La X queda infravalorada en torno a un 9 %. Si se amplía la fórmula, habría que revisar a mano las coincidencias nuevas, porque la misma perífrasis aparece también en avisos («si sigue, le tendré que llamar al orden»).
- **A3, condicionales.** Tres avisos con la fórmula cuentan como llamada: «Si no lo retira le llamo al orden por primera vez» (VIII), «A la próxima le llamo al orden» (IX) y «si no lo hace, la llamo al orden» (X). ¿Se descuentan a mano o se deja la regla tal cual y se explica en la nota metodológica?
- **A3, cifra de la XV.** Pasa de 83 a 90 por el fallo corregido. Es la que debe ir en el juego.
- **A3, rango.** XI y XIII tienen 13 y 9 sesiones. ¿Entran en la cadena, que da 7 decisiones, o se agrupan o se marcan?
- **A1, pregunta 9.** El art. 26.2 sortea «entre la totalidad de las personas incluidas en la lista de electores de la **Mesa** correspondiente», y la opción correcta y la explicación dicen «de la **sección**»; una sección puede tener varias mesas. Además, desde los 65 años se puede renunciar.
- **A1, pregunta 10.** «Solo si también fracasa se tramitan nuevas propuestas» está en el art. 99.4, pero la pregunta solo cita el 99.3.
- **A10, grupo 3.** La fuente sale en pantalla con «[VERIFICAR fechas de cada cargo]», copiada literal del contenido.
- **A10, recibo.** Con la fuente de emojis de Windows, 🟨 se ve anaranjado y queda cerca de 🟧. Es cuestión del chat de diseño.
- **A2.** ¿Se muestra, al comprobar, la posición que había puesto el jugador junto a la solución? Resolvería la confusión de la incidencia. Es decisión de diseño.
- **Capturas.** En esta máquina no hay Node ni Playwright, aunque la decisión del 16-10 habla del «Chromium preinstalado». Sigo usando Chrome headless con un iframe del ancho exacto (375 px).

## 2026-10-16 (2) — M1 ordenar y pistas, M6 agrupar; A2, A10 y A12 jugables

**Hecho** (plan confirmado por el autor: motores y juegos sobre el `base.css` actual; el paso al diseño arcade va después)
- `shared/motores/quiz.js` (M1) elige variante con `variante` en la configuración: `opciones` (la de A1, sin cambios de comportamiento), `ordenar` y `pistas`.
  - **ordenar (A2):** rondas de hitos barajados; cada fila tiene dos botones de 44 px con triángulos de píxeles para subir y bajar. La fila movida se ilumina un instante en marcador y el foco sigue a la fila. Al pulsar «Comprobar orden», la ronda se muestra en orden cronológico con fecha, explicación, fuente y una casilla por hito: marcador si está en su sitio, medio relleno si está a una posición, vacía en otro caso. Nota con decimal («4,5 de 12»). Recibo con 🟨⬜, cuatro por línea.
  - **pistas (A12):** presidente al azar; los siete botones siempre visibles en el orden del contenido. Cada fallo tacha la opción y revela la pista siguiente. Puntos = pistas que quedaban, incluida la que lo resolvió (de 5 a 1; 0 si se agotan). La pista de partida tiene cinco celdas: aspa por fallo y marcador por cada punto. Al terminar se ven las cinco pistas, el nombre completo, la nota (Suárez) y la fuente. El color del partido solo aparece como muestra junto a la pista 5. Etiqueta «Pista N de 5» y «Fin de la partida».
- `shared/motores/agrupar.js` (M6, A10): rejilla de 4×4 barajada; se marcan cuatro ítems y se pulsa «Comprobar». Cuatro vidas con los iconos papeleta y nula de la maqueta. Un grupo acertado sale en un bloque de marcador con su nombre, ítems y explicación; la fuente de cada grupo solo aparece al terminar, para no empujar la rejilla. Si se pierde, los grupos sin resolver se muestran con borde. Cierre: «Resuelto» o «No resuelto», número de fallos y recibo con una fila por intento.
- Compartido nuevo: `shared/util.js` (`el`, `baraja`, `casillas`) y `shared/iconos.js` (papeleta, nula y triángulos, de la maqueta arcade). `cierre.js` acepta un resultado sin total («Resuelto») y una puntuación con decimal. `base.css`: medio relleno, filas para ordenar, rejilla de 16, bloques de grupo, vidas, pistas y muestra de partido.
- Juegos: `juegos/a02-cronologia-legislatura/`, `juegos/a10-agrupar-16/` y `juegos/a12-presidentle/` (este lee `data/presidentes.json`). Los `data.json` de A2 y A10 copian literalmente el contenido; en A2 las fechas van en ISO para poder ordenarlas y en pantalla salen como en el contenido.
- Pruebas: arnés propio en el scratchpad (sin dependencias nuevas) que carga cada juego en un iframe, lo recorre entero pulsando botones y registra errores de JS y scroll horizontal. A1, A2, A10 y A12 terminan sin errores y sin scroll horizontal a 375 px. Capturas a 375 y 1280 px revisadas contra la lista negra. He comprobado a mano la puntuación de A2 en tres órdenes al azar.

**Falta**
- Paso 3 del plan: llevar `base.css` y los motores al diseño arcade (marcador de partida con tic, aspa y cursor, cifras de casillas, barra de acción fija, «Juegos 29N, día N» en el recibo, «Fin de la partida» en el cierre).
- Los juegos nuevos no están enlazados en `index.html`. La serie se va descubriendo y el índice pasará a ser el selector de días.

**Dudas para el autor**
- A10, recibo: una fila por intento con un color por grupo, por orden de dificultad (🟨🟩🟦🟪). Ningún documento fija esos colores; es lo que da sentido a «una fila por intento». ¿Valen, o prefieres otra codificación?
- A10: tras un intento fallido se desmarcan los cuatro ítems (así no se puede gastar dos vidas con el mismo intento) y sale «No es un grupo.». No hay aviso de «a uno de distancia» porque el contenido no lo pide.
- A2: un hito con 0 puntos queda en celda vacía, igual que uno pendiente, como dice la decisión del 16-10. En la pista de partida no se distinguen hasta que avanza la ronda.
- Pendientes de verificación según las propias fichas de fuentes de Cowork, aunque el contenido está cerrado:
  - A2: la fila del apagón dice «[FUENTE PENDIENTE]», pero el contenido cita el Diari de Tarragona. Faltan además la cifra oficial de la dana y el Diario de Sesiones y el BOE de la amnistía.
  - A10: falta la fuente del Congreso de Posada y los enlaces del BOE de las cuatro leyes.

## 2026-10-16 — A3: sondeo de legislaturas, legislaturas.json y sesiones de la XV que faltaban; correcciones de A1 y A12

**Hecho**
- A1: cita literal del art. 96.5 en `editorial/fuentes/a01-cotejo-boe.md` («Se considera voto en blanco, pero válido, el sobre que no contenga papeleta…») y 163.1.d como fuente de la pregunta 9 (el 163.1.c queda marcado como cita anterior). `data.json` regenerado con las fuentes corregidas de las preguntas 5 y 9; coincide literalmente con el contenido.
- A12: pista 3 de González en `data/presidentes.json` → «…; abogado.»
- **A3, XV: faltaban cuatro sesiones.** Los diarios 23, 41, 137 y 163 no estaban como `DSCD-15-PL-<n>.PDF`, sino como `DSCD-15-PL-<n>-C1.PDF`, y son las sesiones plenarias 21, 39, 132 y 157. `R/05_llamadas_al_orden.R` ahora prueba las partes `-C1`, `-C2`… cuando falta el diario entero.
  - He comprobado que cada `-C1` está completo: el sumario no cita páginas más allá del fichero.
  - Resultado: **XV = 83 llamadas en 203 sesiones plenarias** (antes, 81 en 199). Las dos nuevas son «Señor Conde, le llamo al orden por primera vez» (22-05-2024) y «Señor Sánchez, le llamo al orden por primera vez» (17-09-2025). Ninguna es una fusión, así que la revisión manual de las 12 fusiones sigue valiendo.
  - El denominador 203 son las sesiones 1 a 203, todas consecutivas. El diario 9 (constitución de la Diputación Permanente) lleva en portada «Sesión plenaria núm. 1», pero no suma.
- A3: `R/02_legislaturas.R` → `data/legislaturas.json`, de la Constituyente a la XV: presidencia del Congreso, partido, fechas y actas de elección de congreso.es. Fuente: el anexo de Wikipedia, en una revisión fijada. Contraste con la portada de los diarios de la muestra («PRESIDENCIA DE…»): coinciden todas las legislaturas muestreadas (de la I a la XIII y la XV; la XIV no se pudo mirar porque las descargas eran páginas de bloqueo).
- A3: sondeo de los Diarios de Sesiones del Pleno de la I a la XIV. Por legislatura, he buscado el último diario (HEAD) y he descargado el de mitad de legislatura y los tres últimos.

| Leg. | Patrón de URL | Diarios | Texto | Presidencia distinguible | Fórmula vista en la muestra | Sesión plenaria más alta vista |
| --- | --- | --- | --- | --- | --- | --- |
| XIV | `DSCD-14-PL-<n>.PDF` | 275 | sin mirar (descarga bloqueada) | — | — | — |
| XIII | ídem | 15 | nativo, una columna, limpio | sí | «le llamo al orden» | — |
| XII | ídem | 186 | nativo, una columna, limpio | sí | «le llamo al orden» | 176 (diario 184) |
| XI | ídem | 15 | nativo, una columna, limpio | sí | (no sale en la muestra) | 13 (diario 14) |
| X | `PL_001`–`PL_053` y `DSCD-10-PL-54`–`315` | 315 | primer tramo a dos columnas; segundo sin mirar | sí | (no sale) | 50 (diario 53) |
| IX | `PL_<nnn>.PDF` | 279 | nativo, dos columnas | sí | (no sale) | 131 (diario 140) |
| VIII | ídem | 315 | nativo, dos columnas | sí | (no sale) | 147 (diario 158) |
| VII | ídem | 310 | nativo, dos columnas | sí | (no sale) | 295 (diario 308) |
| VI | ídem | 286 | nativo, dos columnas | sí | «Señorías, les llamo al orden» | 138 (diario 143) |
| V | ídem | 197 | capa OCR, dos columnas, errores sueltos («ALB:tSTUR MARIN») | sí | «Le llamo al orden, señor Albistur» | 193 (diario 195) |
| IV | ídem | 265 | capa OCR, dos columnas | sí | (no sale) | 257 (diario 263) |
| III | ídem | 208 | capa OCR, dos columnas | sí | solo una mención («la Presidencia nos llamaría al orden») | 199 (diario 206) |
| II | ídem | 281 | capa OCR, dos columnas | sí | (no sale) | 281 (= nº de diario) |
| I | ídem | 255 | capa OCR, dos columnas, letras espaciadas («L A N D E L I N O») | sí | (no sale) | 255 (= nº de diario) |

  - «Diarios» es el número del último diario, incluidos los de la Diputación Permanente; los huecos sueltos no están descontados. La columna «Sesión plenaria» es la más alta que aparece en la muestra, **no** el denominador. El denominador exacto exige descargar la legislatura entera, como en la XV.
  - Todas las legislaturas tienen capa de texto (la proporción de palabras comunes, unos 0,37, es igual a la de la XV), así que no hace falta pasar OCR. De la I a la V es un OCR antiguo con errores que pueden romper algún nombre o alguna fórmula.
  - **Problema técnico de I a X (formato `PL_`):** son dos columnas y `pdf_text` mezcla las dos en cada línea. Lo he resuelto en una prueba leyendo las coordenadas de cada palabra (`pdf_data`) y cortando por el hueco central: el texto sale ordenado («El señor VICEPRESIDENTE (Beviá Pastor): Le llamo al orden, señor Albistur.»). Los sumarios con líneas de puntos siguen saliendo revueltos, pero no afectan.
  - Que la fórmula no salga en la muestra no quiere decir nada: son 4 diarios por legislatura y en la XV sale una llamada cada 2,4 sesiones.
  - ParlaMint-ES cubre sobre todo de 2015 a mediados de 2022 (según la documentación general de ParlaMint; el rango exacto del corpus español no lo he confirmado). Solapa con XI–XIV, que ya salen limpias en PDF, y no sirve de recambio para I–X.
- Servidor del Congreso: a más de una petición por segundo bloquea durante varios minutos y responde con páginas de bloqueo de unos 440 bytes **con estado 200**. Ahora la descarga comprueba que el fichero empieza por `%PDF` y va a una petición cada 2–4 s.

**Estimación antes del 26-oct** (a ~15 PDF por minuto, el ritmo que el servidor tolera):
- XI–XIV: 491 diarios, unos 35 min de descarga. Mismo formato que la XV y el script vale tal cual. **Seguro**, con validación incluida en una sesión.
- VIII–X: 909 diarios, aproximadamente 1 h. Hay que pasar a `R/05` el lector por columnas y validar con una muestra manual (precisión de la fórmula y de la atribución a la Presidencia). **Probable**, en una o dos sesiones.
- I–VII: 1.802 diarios, unas 2 h y varios GB (los de I–V pesan de 2 a 9 MB). Lector por columnas más OCR antiguo: la exhaustividad depende de cuántas fórmulas rompa el OCR y habría que medirla a mano. **Posible**, pero con menos garantías y quizá con nota metodológica.

**Falta**
- Que el autor fije el rango; después, descargar y contar las legislaturas de ese rango.
- Pasar a `R/05` el lector por columnas y el bucle por legislaturas (ahora tiene `leg <- 15` fijo).

**Dudas para el autor**
- Rango del Crispómetro (todas o desde la VIII) con la tabla de arriba. Desde la VIII la calidad es homogénea (texto nativo); de la I a la VII hay OCR antiguo.
- La cifra confirmada de la XV cambia de 81/199 a **83/203** por las cuatro sesiones publicadas en partes. ¿De acuerdo con dar por buena la nueva?
- `legislaturas.json`: Wikipedia pone a Batet como **PSC** (fue elegida por el Grupo Socialista). ¿En la pantalla final va PSC o PSOE? ¿Y con qué color?
- `legislaturas.json` incluye la Constituyente («C»). Si el rango empieza en la I o en la VIII, sobra; la dejo por si A5 la usa.

## 2026-10-15 (3) — Encargos del 15-10: cotejo legal de A1, presidentes.json, color de UCD y data.json de A1

**Hecho**
- Cotejo legal de A1. `R/cotejo_a01_boe.R` → `editorial/fuentes/a01-cotejo-boe.md`.
  - Fuente: API de legislación consolidada del BOE, con User-Agent de navegador. Caché de XML fuera del repo (`tools::R_user_dir("juegos29n", "cache")/boe`).
  - Confirmado: la última versión de la LOREG es del 02-07-2026. La de la Constitución es del 20-05-2026 (reforma del art. 69.3: Ibiza y Formentera, circunscripciones separadas al Senado).
  - Trampa del XML: las versiones de cada artículo no vienen en orden. En el art. 75 hay entradas de 2009 y 2012 (solo notas «Véase») que arrastran el texto con voto rogado. El script elige la versión de vigencia más reciente; para el 75.1 es la LO 12/2022.
  - Cotejo, pregunta por pregunta, contra el texto literal:
    - P1 (162.2 y 162.3): correcta. Mínimo de dos por provincia; Ceuta y Melilla, uno cada una.
    - P2 (72.a): correcta. «hasta el décimo día anterior a la votación»; 29 − 10 = 19-11.
    - P3 (69.7): correcta. «Durante los cinco días anteriores al de la votación»; del 24 al 28-11. La ley dice «publicación y difusión o reproducción».
    - P5 (163.1.a): correcta. «el 3 por 100 de los votos válidos emitidos en la circunscripción».
    - P6 (75.1, LO 12/2022): correcta. La documentación se remite «de oficio».
    - P7 (CE 69.2 y LOREG 166.1.a): correcta. Cuatro senadores; «un máximo de tres candidatos en las circunscripciones provinciales».
    - P8 (169.3, LO 2/2011): correcta. 0,1 % para partidos sin representación en ninguna Cámara; 1 % para agrupaciones de electores (la opción c); «Ningún elector podrá prestar su firma a más de una candidatura».
    - P9: **discrepancia de referencia** (ver dudas). El contenido es correcto.
    - P10 (CE 99.3 y 99.5): correcta.
    - P4 no cita ningún artículo (anexos de los RD); queda fuera del cotejo.
- `data/presidentes.json`: pistas, nota y fuente copiadas literalmente de `editorial/contenido/a12-presidentle.md`, y fechas de `editorial/fuentes/a12-presidentes.md`. He comprobado que las edades y los tiempos de las pistas 1 y 2 salen de las fechas (los siete coinciden). Entrada nueva en `data/SOURCES.md`.
- `shared/base.css`: `--ucd: #197E36`, de la misma revisión 173877042 de la plantilla («UCD / Unión de Centro Democrático»); fila añadida en `SOURCES.md`.
- `juegos/a01-quiz-sistema-electoral/data.json` regenerado desde el contenido definitivo: nuevo orden, pregunta 8 nueva, preguntas antiguas de 350 diputados y 15 días fuera, y fuente general actualizada. He comprobado que cada texto aparece literal en el markdown. Carga bien en el navegador.
- `CLAUDE.md`: `R/04_diputados.R` sale del árbol y entra `R/cotejo_a01_boe.R`; `presidentes.json` en la tabla de datos; `diputados_xv.json` pasa a la reserva.
- Push hecho: A1 con el contenido definitivo ya está en Pages.

**Falta**
- A12 jugable con M1 pistas progresivas (entrega del 26-oct).
- Captura de A1 a 375 px con un método que respete el ancho: Chrome headless impone un viewport mínimo de unos 500 px y recorta la captura. El cambio de hoy es solo de datos.

**Dudas para el autor**
- A1, pregunta 9: la fuente cita «LOREG, art. 163.1.c», pero el desempate está en el **163.1.d**: «Cuando en la relación de cocientes coincidan dos correspondientes a distintas candidaturas, el escaño se atribuirá a la que mayor número total de votos hubiese obtenido. Si hubiera dos candidaturas con igual número total de votos, el primer empate se resolverá por sorteo y los sucesivos de forma alternativa.» La explicación coincide con la letra d. En `data.json` sigue «163.1.c» hasta que lo corrijas en el contenido.
- A1, pregunta 5: «que incluyen el voto en blanco» no está en el 163.1.a. Si se quiere cita literal, está en otro artículo de la LOREG que no estaba en el encargo.
- A12: siguen pendientes de cotejo «abogado laboralista» (González) e «inspector de Finanzas del Estado» (Aznar). En el JSON están tal como vienen en el contenido.

## 2026-10-15 (2) — CLAUDE.md al día con las decisiones del 15-10

**Hecho**
- `CLAUDE.md` alineado con `docs/documento-base.md` y `editorial/decisiones.md` (commit `9034224`):
  - Principios: una sola edición por juego; solo se rejuega dentro de la misma edición; B1 y B2, una pieza por debate.
  - Motores: M1 sirve a A12; M7 sin uso; nuevo M9 rosco para A13.
  - Juegos: A10 con una sola edición; A12 Presidentle (M1 pistas progresivas, 7 presidentes, una ronda aleatoria); A13 Rosco del politólogo (M9).
  - Datos: `diputados_xv.json` ya no lo usa ningún juego.
  - Calendario: 26-oct A1, A2, A10, A12; 2-nov M9 y A3, A4, A11, A13 (8); 9-nov A5, A6, A7, A8 (12), sin M7.
- Borrada la carpeta `Claude outputs/` de la raíz (copia idéntica de `docs/maquetas/maqueta-disposicion-v6.html`).
- Commit de los cambios del autor en `docs/` y `editorial/`, maquetas incluidas.

**Falta**
- Nada pendiente de esta tarea.

**Dudas para el autor**
- `R/04_diputados.R` sigue en el árbol del repo de `CLAUDE.md` aunque ningún juego lo usa: ¿se borra o se guarda para la reserva?
- Las fichas de presidentes de A12 se hacen a mano: ¿van en `data/` con entrada en `SOURCES.md` (mi propuesta, por el principio de fuente citada) o en el `data.json` del juego?

## 2026-10-15 — A3: llamadas al orden de la XV con la unidad decidida

**Hecho**
- `editorial/fuentes/a03-ejemplos-llamadas.md`, encargado por el autor: cinco fragmentos literales con diario, sesión y página.
- `R/05_llamadas_al_orden.R` → `data/llamadas_al_orden.json`, con las decisiones del 15-10:
  - Unidad: acto de llamada pronunciado por la Presidencia o una Vicepresidencia en sesión plenaria.
  - Fuera avisos, menciones a llamadas previas, retiradas y Diputación Permanente (decisión del autor en sesión).
  - Caché de PDF fuera del repo (`tools::R_user_dir("juegos29n", "cache")`).
- Resultado XV: **81 llamadas en 199 sesiones plenarias** (200 diarios). 42 de la presidenta Armengol y 39 del vicepresidente Rodríguez Gómez de Celis (ninguna de las demás vicepresidencias). Ordinal: 65 «primera», 8 «segunda», 8 sin ordinal.
- Cada acto lleva diario, sesión, fecha ISO, página del Diario, presidencia y cargo, destinatario tal como lo nombra la Presidencia, ordinal, número de coincidencias fusionadas y fragmento.
- Validación: solo hay 12 fusiones de repeticiones en toda la XV (no llegan a las 20 de la muestra), así que las he revisado todas a mano. Con la regla tal como estaba escrita, 10 eran correctas y 2 no: Conde Bajén (DS 87, pág. 18) y De Rosa Torner (DS 127, pág. 49) juntaban una «primera» y una «segunda» llamada, porque entre ellas solo se nombra al mismo diputado. He añadido una condición: **si cambia el ordinal, es un acto nuevo**. Con ella, las 12 fusiones resultantes son correctas: misma llamada repetida, mismo destinatario, mismo o ningún ordinal. El conteo pasa de 79 a 81.
- `data/SOURCES.md`: entrada del JSON; los colores quedan con el criterio de color vigente y Junts `#20C0C2`.

**Falta**
- Ver si las legislaturas anteriores tienen el mismo patrón de URL y formato de PDF, para fijar el rango del Crispómetro.
- `legislaturas.json` (presidencia y partido por legislatura) para la pantalla final de A3.
- CC y ERC frente al marcador: al diseñar A5 y A7, según lo decidido.

**Dudas para el autor**
- ~~Confirmar la condición añadida a la regla de fusión (un cambio de ordinal abre acto nuevo).~~ Confirmada por el autor el 15-10-2026: el conteo de la XV queda en 81.
- `destinatario` es el vocativo literal («Señor Hernando», «Señoría»); en 6 actos no hay vocativo cerca. Si A3 necesita grupo parlamentario por llamada, habría que cruzarlo a mano o con `diputados_xv.json`. La ficha actual no lo pide.

## 2026-10-14 (2) — cierre.js, M1 + A1, colores de partido, primer scraping de llamadas al orden

**Hecho**
- Commit y push de lo que dejó Cowork (contenido de A1, decisiones, documento base).
- `shared/cierre.js`: juego, nivel y fuente se pintan con `textContent`; si el portapapeles falla o no existe, el botón dice «Selecciona y copia el texto». Cierre solo de texto.
- Motor M1 en `shared/motores/quiz.js` y A1 en `juegos/a01-quiz-sistema-electoral/` (`index.html`, `game.js`, `data.json`). El JSON copia literalmente el markdown provisional, incluido el `[VERIFICAR …]` de la pregunta 7. Las opciones se barajan; la correcta se guarda por letra. Elegir, «Responder», correcta con marcador y fallada tachada, explicación y fuente, «Siguiente pregunta» / «Ver resultado», y `cerrar()` con aciertos/10, etiqueta de nivel y cuadrícula 🟨⬜.
- Capturas a 375 y 1280 px revisadas contra la lista negra: sin scroll horizontal, sin sombras, radios, degradados ni flechas. En `base.css` se añade una regla para que la opción correcta y la fallada no salgan en gris al deshabilitarse.
- A1 enlazado desde `index.html` (que ya carga `base.css`). Comprobado en https://santigper.github.io/juegos-29n/juegos/a01-quiz-sistema-electoral/.
- Colores de partido en `shared/base.css` (PP, PSOE, Vox, Sumar, Podemos, ERC, Junts, EH Bildu, PNV, BNG, CC, UPN) copiados de la Plantilla:Color político de es.wikipedia, revisión 173877042; cita en `data/SOURCES.md`.
- Scraping de llamadas al orden de la XV, todavía exploratorio (script en local, sin pasar al repo):
  - Fuente: PDF del Diario de Sesiones del Pleno (`congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-<n>.PDF`), leídos con `pdftools`. El servidor exige User-Agent de navegador (devuelve 403 si no lo lleva) y la numeración tiene huecos (no existen el 23, 41, 137 ni 163).
  - 206 diarios; 6 son de Diputación Permanente (sin «Sesión plenaria núm.») y se excluyen; quedan 199 sesiones plenarias distintas para normalizar.
  - Calidad: el texto sale limpio, sin OCR, con las intervenciones marcadas («La señora PRESIDENTA:», «El señor VICEPRESIDENTE (…):»), así que se puede buscar solo dentro de lo que dice la Presidencia. Quedan restos de cabecera de página («cve: DSCD-…») que no afectan al conteo.
  - Resultado: 102 apariciones de «le/la llamo (por primera vez) al orden» en intervenciones de la Presidencia; en una muestra de 15, las 15 son llamadas reales. Pero la Presidencia a menudo repite la fórmula en el mismo acto («le llamo al orden por primera vez. Le llamo al orden»). Fusionando las repeticiones a menos de 150 caracteres quedan unas 70 llamadas, en 53 sesiones (42 de la presidenta Armengol y 28 del vicepresidente Rodríguez Gómez de Celis; ninguna de Bermúdez de Castro). Ordinales: 82 «primera», 10 «segunda», 1 «tercera».
  - Lo que no cuenta: avisos («no me haga llamarle al orden», «antes de que le llame»), «orden del día», «conforme al orden remitido».
  - «Retire esa expresión» sale poco (12) y con formas muy variadas, incluida la retirada de oficio del Diario de Sesiones («quedan retiradas todas esas palabras del señor Abascal»).

**Falta**
- Pasar el scraping a `R/05_llamadas_al_orden.R` con salida `data/llamadas_al_orden.json` y su entrada en `SOURCES.md`, una vez decidida la unidad de conteo (ver dudas).
- Ver si las legislaturas anteriores siguen el mismo patrón de URL y formato de PDF; de eso depende el rango del Crispómetro. La XV, al menos, sale limpia.
- Colores de legislaturas anteriores (IU, CiU, UPyD, Cs, Unidas Podemos, etc.) para A5: se añadirán al construir A5, de la misma plantilla.

**Dudas para el autor**
- Unidad de conteo del Crispómetro: ¿cada aparición de la fórmula (102), cada acto de llamada fusionando repeticiones (unas 70), o solo las llamadas con ordinal (93)? ¿Cuentan también las peticiones de retirar expresiones, aparte o sumadas?
- Junts: la plantilla de Wikipedia tiene dos colores, «JxCat» `#EE5976` y «Junts» `#20C0C2`. He puesto `#20C0C2`, que es el que devuelve la plantilla para «Junts», pero no es inequívoco: confírmalo.
- La plantilla tiene colores fechados para PP (2008-2022 `#1D84CE`) y EH Bildu (2012-2023 `#C4D600`). En A5, ¿cada legislatura con el color de su época o todas con el vigente?
- Coalición Canaria (`#FFD700`) y ERC (`#FFB32E`) son amarillos cercanos al marcador `#f2c200`. Sin conflicto mientras el marcador no conviva con colores de partido, pero conviene tenerlo en cuenta en A5 y A7.
- A1 sigue con el contenido provisional; la pregunta 7 enseña en pantalla el `[VERIFICAR …]` hasta que llegue la fecha real.

## 2026-10-14 — Estructura inicial, plan de diseño, base.css y cierre.js

**Hecho**
- Git inicializado con rama `main` y `.gitignore` para HTML/JS + R (no ignora `data/` ni `docs/`).
- Creadas `shared/motores/`, `juegos/`, `data/` y `R/`; `data/SOURCES.md` solo con el título.
- `index.html` mínimo en la raíz, sin CSS: título y fecha de inicio de la serie.
- `docs/documento-base.md.md` renombrado a `docs/documento-base.md`, como lo cita CLAUDE.md.
- Remoto `origin` → https://github.com/SantiGPer/juegos-29n.git, con push hecho.
- Las carpetas vacías de `editorial/` (`contenido/`, `fuentes/`, `posts/`) no se versionan hasta que tengan ficheros; no se les añade `.gitkeep` por ser territorio de Cowork.
- `docs/diseno-plan.md` escrito y aprobado por el autor: acento amarillo marcador `#f2c200` (siempre de fondo, nunca como texto), tipografía Archivo, solo modo claro, fallo marcado con tachado en lugar de rojo.
- `shared/base.css` con los tokens del plan, opciones, progreso en casillas, cifra con pasada del marcador y recibo.
- `shared/cierre.js`: `cerrar({ juego, puntuacion, total, nivel, cuadricula, fuente }, contenedor)` pinta puntuación, recibo en texto plano y botón "Copiar resultado".
- GitHub Pages activado por el autor; añadido `.nojekyll` en la raíz.

**Falta**
- Plantilla de juego y prueba de `cierre.js` en navegador (375 px y 1280 px): esperan al contenido de A1 en `editorial/contenido/a01-quiz-sistema-electoral.md`.
- Variante de afinidad en `cierre.js`: se añade al construir M8 (A14).
- Scraping de llamadas al orden sobre la XV (entrega del 19 oct).

**Dudas para el autor**
- Colores de partido (`--pp`, `--psoe`, `--vox`, `--sumar`, …): qué paleta de referencia usar (la convencional de los medios, la de un medio concreto o la de Wikipedia). Están como `TODO` en `shared/base.css`; no hacen falta hasta A5 y A7.
- Etiquetas de nivel del cierre de A1 ("nota sobre 10 + nivel"): las fija el contenido de Cowork.
