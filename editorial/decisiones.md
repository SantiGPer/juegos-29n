# Decisiones

Log fechado de decisiones sustantivas del autor. Claude Code lo lee al empezar cada sesión.

## 2026-10-14

- Pool cerrado: A1–A14 antes del 13-N, B1–B2 en campaña. Ver docs/documento-base.md.
- Crispómetro (A3): normalización por sesiones plenarias; pantalla final con presidencia y partido. Rango de legislaturas: pendiente, decidir con el dato.
- A14: unidad = medidas numeradas; validación con léxico; afinidad por Spearman sobre orden de 8 temas.
- Sin backend. Sin predicción electoral.
- GitHub Pages activado (rama main, raíz) con .nojekyll; sitio en santigper.github.io/juegos-29n/.
- Diseño: docs/diseno-plan.md aprobado (amarillo marcador #f2c200 solo de fondo; Archivo; solo modo claro; fallo tachado, sin color).
- Cierre: solo texto copiable (recibo en texto plano); sin imagen generada en el navegador.
- Colores de partido: paleta de Wikipedia (plantillas de color de partidos políticos españoles), citada en data/SOURCES.md. Sustituye los TODO de shared/base.css; no urge hasta A5 y A7.
- A1: borrador-plantilla en editorial/contenido/a01-quiz-sistema-electoral.md (10 preguntas + niveles del cierre). Contenido provisional: solo sirve para montar la plantilla M1 y probar cierre.js. Las preguntas definitivas se deciden entre autor y Cowork (nivel y gancho) y se verifican contra el BOE.
- Incidencia cierre.js: pasar juego, nivel y fuente con textContent en vez de interpolarlos en innerHTML, y mostrar "Selecciona y copia el texto" si falla el portapapeles.
- M1: opciones barajadas en pantalla; el fichero de contenido guarda la correcta por letra.

## 2026-10-15

- Crispómetro (A3): unidad = acto de llamada al orden. Se fusionan las repeticiones de la fórmula dentro de 150 caracteres solo si entre ellas no se nombra a otro diputado; validar con una muestra manual de 20 fusiones antes de cerrar el conteo. No cuentan avisos ("no me haga llamarle al orden") ni menciones a llamadas previas. Ejemplos en editorial/fuentes/a03-ejemplos-llamadas.md.
- Crispómetro (A3): las retiradas de expresiones ("retire esa expresión") no entran en la métrica.
- Colores de partido: siempre el color vigente de cada partido, en todas las legislaturas. Junts = #20C0C2.
- Colores de CC y ERC próximos al marcador: se resuelve al diseñar A5 y A7.
- Crispómetro (A3): refinamiento de la regla de fusión. Si cambia el ordinal ("primera" → "segunda"), es un acto nuevo aunque no se nombre a otro diputado. Se revisaron a mano las 12 fusiones de la XV (todas, en lugar de la muestra de 20) y las 12 son correctas. XV = 81 llamadas en 199 sesiones plenarias.
- Crispómetro (A3): solo cuentan las sesiones plenarias; la Diputación Permanente queda fuera, también del denominador.
- Diseño: estética arcade de nivel 2 sobre la base de papel y tinta. Referencia visual: docs/maquetas/maqueta-arcade-v2.html. Nunca se usa la palabra «pantalla». La primera línea del recibo es «Juegos 29N, día N».
- Diseño: marcador de partida en todos los juegos de acierto.
  - Pista de una celda por ronda (22 px, separación de 3 px). Acierto: fondo marcador y tic de píxeles. Fallo: fondo raya y aspa de píxeles. Pendiente: vacía. Ronda en curso: borde de 3 px.
  - Bajo la celda en curso, un cursor triangular de píxeles que salta con steps().
  - Puntos a dos dígitos. Al acertar sale un «+1» que sube y se apaga (700 ms, steps); con prefers-reduced-motion no aparece.
  - En el cierre, la pista queda fija bajo la cifra final. El recibo sigue con 🟨⬜.
- Diseño: todas las cifras de juego (puntos, cifra final, números del selector) se dibujan con casillas en una rejilla de 5×7, con 1 px de separación y en color tinta. La cifra final lleva una banda de marcador detrás. Archivo sigue siendo la única fuente: no hay fuente de píxel.
- Diseño: el índice es un selector de días.
  - 15 casillas en rejilla de 5×3. Hoy: fondo marcador. Abiertas: borde de tinta. Cerradas: borde raya con candado y sin desvelar el nombre. La elegida lleva borde de 3 px.
  - Debajo, la ficha del día elegido: fecha, título, dos frases con tono, dos reglas con icono (cuántos ítems y cómo se puntúa) y el botón «Jugar», o «Jugar el del N» si es un día pasado.
  - El texto de cada ficha llega en editorial/contenido/.
- Diseño: iconos propios en rejilla de 10×10 (SVG, crispEdges), solo en tinta, lápiz o raya: urna, papeleta, nula, candado y escaño.
  - Papeleta y urna: reglas de la ficha.
  - Candado: días cerrados y cierre («Mañana, otro juego.»).
  - Nula: vida perdida en A10 (cuatro papeletas que se anulan).
  - Urna: favicon.
  - Escaño: reservado para A5 y A12.
  - Nunca como adorno ni en botones.
- Diseño: vocabulario de juego, solo donde nombra una regla que existe: «partida» y «Fin de la partida», «puntos», «racha» (M4), «vidas» (A10), «intentos» (A12) y «nivel» (A1). Fuera: «Game over», «Insert coin», «Player 1», «High score» y «récord».
- Diseño: la respuesta del jugador frente al dato real (A5, A6, A8) se pinta con una trama de píxeles al 50 % (patrón SVG de 2×2 px) en el mismo color que el dato: tinta en las métricas generales y color de partido cuando la serie es por partido. El dato real va en sólido. Mientras el jugador responde solo se ve la trama; el sólido aparece al revelar. Referencia: docs/maquetas/maqueta-color-v3.html.
- Diseño: cuando la respuesta es un partido, su color sustituye al marcador. En A14, el nombre del partido del cierre va sobre una banda de su color. En A12, una pastilla del color del partido acompaña al partido de cada intento; el acierto lo sigue marcando el marcador. El texto sobre un color de partido va en tinta o en papel, el que más contraste dé (mínimo 4,5:1, o 3:1 en titulares de 24 px o más en negrita).
- Diseño: en las pantallas con colores de partido, el marcador nunca entra en el gráfico (mapa, hemiciclo, barras); el acierto se lee en la pista y en las celdas. Con esto queda resuelto el choque de CC y ERC con el marcador.
- Diseño: un sexto icono, el bocadillo, marca en el selector los días con contenido de debate (bingo la víspera, «Quién dijo qué» el día siguiente), también en los días cerrados. La ficha de ese día lo anuncia en un recuadro con borde de 1 px de tinta. Fechas según el calendario de debates.
- Diseño: los aciertos consecutivos no se sueldan en la pista; cada celda queda separada.
- A12: Diputadle se sustituye por Presidentle. Adivinar un presidente del Gobierno de la democracia con cinco pistas en este orden: edad en la primera toma de posesión, tiempo en el cargo, formación, provincia de nacimiento, partido y año. Motor M1 variante pistas progresivas (el de A13); M7 queda sin uso. Datos: siete fichas a mano (La Moncloa y BOE). Pendiente: número de rondas, criterio para Suárez (1976 o 1977) y formato del tiempo en el cargo. Ficha completa en docs/documento-base.md.
- A12 Presidentle: una ronda por partida, con presidente aleatorio entre los siete para poder repetir. Se cuenta desde la toma de posesión tras elecciones: en Suárez, 1977 (nota aclaratoria en el juego sobre su nombramiento de 1976). Tiempo en el cargo en años y meses; en Sánchez, con corte el 29-11-2026, indicado en la pista.
- A13: Pistas progresivas se fusiona en A12 Presidentle (que usa su mecánica). El hueco de A13 lo ocupa el Rosco electoral: una definición por letra (empieza por o contiene), con vocabulario electoral, político y de ciencia política. Motor nuevo M9. Pendiente: nombre, letras incluidas, cronómetro y número de ediciones. Ficha en docs/documento-base.md.
- A13 Rosco del politólogo: Ñ, K, W, X e Y entran por "contiene"; el jugador elige al empezar si juega con cronómetro o sin él; una sola edición.
- Serie: no se repiten juegos. Cada juego se publica una vez, con una sola edición (afecta a A10 y A13). Rejugar es posible solo dentro de la misma edición (p. ej., el presidente aleatorio de A12).
- A12 Presidentle: se muestran siempre los siete presidentes como opciones.
- B1 y B2: una pieza por debate, con contenido propio; no cuentan como repetición de juego.
- Calendario: A12 Presidentle pasa a la semana 2 (entrega 26-oct: A1, A2, A10, A12) y A13 Rosco del politólogo, con su motor M9, a la semana 3 (entrega 2-nov: A3, A4, A11, A13; 8 juegos en total). La semana 4 queda con A5, A6, A7 y A8 (12 en total el 9-nov).
- Diseño (PROVISIONAL, se confirma o se ajusta al verlo implementado): cercanía según docs/maquetas/maqueta-cercania-v4.html.
  - En los juegos con puntuación parcial (A2, A5), la celda medio llena de marcador vale ½.
  - En A12 se usa medio relleno más flecha de dirección.
  - En los juegos de estimación (A6, A8), la distancia se escribe («Te quedaste a 7 puntos») y el hueco entre la respuesta del jugador (trama) y el dato (sólido) se pinta en marcador.
  - El recibo es siempre 🟨⬜, con la nota con decimal.
  - Cuánto vale el «casi» en cada juego se decide en contenido.
- Diseño: nuevo color de serie, «senado» `#dcc7a1`, tomado de la papeleta sepia del Senado (RD 605/1999). El hexadecimal es aproximado y se ajusta con una papeleta real. Es el segundo papel: días cerrados del selector (fondo y borde senado, candado en lápiz), superficies de la serie y vista previa al compartir. Solo aparece en el marco de la serie; nunca en gráficos con colores de partido ni como fondo de página. Referencia: docs/maquetas/maqueta-paleta-v5.html (variante A).
- Diseño: vista previa al compartir (og:image, 1200×630) estática y distinta cada día: título de la serie, tira de 15 casillas (jugadas en papel, hoy en marcador, futuras en senado), «Día N.» con el nombre del juego, y la urna. Se genera fuera del navegador.
- Diseño: nuevo color «señal» `#ff5f1f`, solo para el relleno del icono bocadillo (días de debate). El contorno del bocadillo sigue en tinta para que se lea sobre papel, senado o marcador. Ningún otro elemento usa señal: ni casillas, ni recuadros, ni texto.
- Diseño: el botón «Jugar» de la ficha del selector va en marcador: fondo `#f2c200`, texto tinta 800 y borde de 1 px tinta. Al pulsarlo se invierte (tinta con texto papel), igual que una opción seleccionada. Es el único botón con color de la serie; los botones dentro de los juegos («Responder», «Siguiente pregunta», «Copiar resultado») siguen en papel con borde de tinta, para no confundirse con la respuesta correcta, que también va en marcador. No se usa señal en botones.
- Diseño: no hay bloque «29 de noviembre / A votar» en el selector ni casilla del 29N en la vista previa. Lo último del índice antes de la ficha es la rejilla de 15 días.
- Diseño: disposición pensada primero para móvil, según docs/maquetas/maqueta-disposicion-v6.html.
  - Se diseña a 375 px y se comprueba a 320 px (sin scroll horizontal) y a 375 × 560 (zona visible dentro de la app de LinkedIn).
  - Cada pantalla tiene tres zonas:
    1. Mientras se juega, una cabecera compacta y no fija: nombre del juego a 1 rem en 800, puntos a la derecha y la pista debajo.
    2. La zona de juego: pregunta a 1.375 rem en 800; opciones de 52 px de alto como mínimo, separadas 8 px.
    3. Una barra de acción fija abajo, con borde superior de 1 px tinta, padding con env(safe-area-inset-bottom) y un único botón principal de 52 px a todo el ancho. Cambia de verbo según la fase (Jugar, Responder, Siguiente pregunta, Comprobar orden, Ver resultado, Copiar resultado), pero nunca de sitio.
  - El título grande (1.75 rem) solo va en el índice y en el cierre.
- Diseño: en el índice, la barra muestra el día y el juego elegidos más el botón «Jugar» en marcador; al tocar otra casilla, la barra cambia. Orden de arriba abajo: título, subtítulo, rejilla y ficha.
- Diseño: en las preguntas, tocar elige y «Responder» confirma. Sin elección, el botón va apagado (borde raya, texto lápiz). Tras responder, la explicación aparece bajo las opciones con scroll suave hasta ella, instantáneo con prefers-reduced-motion.
- Diseño: para ordenar (A2, A14) se usan dos botones de 44 px por fila con triángulos de píxeles para subir y bajar. Arrastrar nunca es obligatorio (en escritorio puede ser un extra). La fila que se mueve se ilumina un instante en marcador.
- Diseño: tras «Copiar resultado», el botón dice «Copiado» durante 2 s.
- Diseño: escala de espacios en múltiplos de 4, como tokens --s1…--s6 (4, 8, 12, 16, 24, 32). Excepción: 6 px entre las casillas de la rejilla.
- Diseño: objetivos táctiles de 44 px como mínimo. Alturas en dvh, no en vh.
- Diseño: en A12, el campo de texto va arriba y las sugerencias justo debajo; mientras el teclado está abierto no se muestra la barra fija.
- Diseño: a partir de 768 px, la barra deja de ser fija y va tras el contenido. La columna de 38 em se centra en la ventana, con el texto alineado a la izquierda.
- Diseño A12 (corrige las líneas anteriores del 15-10 escritas para Diputadle): Presidentle no lleva pastilla de partido por intento, ni medio relleno con flecha de dirección, ni campo de texto con sugerencias. Usa siete botones de opción fijos y la pista revelada aparece encima. La pista de partida tiene cinco celdas, una por pista. En A12 el vocabulario es «pistas», no «intentos». El color del partido solo aparece en la pista 5.
- A12: fichas de presidentes en data/presidentes.json con entrada en data/SOURCES.md (La Moncloa y BOE).
- R/04_diputados.R sale del esquema de CLAUDE.md; diputados_xv.json pasa a la reserva.
- A3: no se cruza el destinatario de cada llamada con su grupo parlamentario; la ficha no lo pide.
- A12: la referencia de edad y año es la primera toma de posesión de cada presidente (Calvo-Sotelo, 1981; Sánchez, 2018). Única excepción: Suárez, que cuenta desde las elecciones de 1977 (nombramiento de 1976 anterior a ellas).
- A12: la pista 3 combina formación y profesión u oposición (registrador, inspector de Finanzas, profesor…).
- A12: las coincidencias entre presidentes en una pista (Derecho, Madrid, 43 años) se mantienen: acotan el círculo.
- A12: UCD toma su color de la misma plantilla de Wikipedia que el resto de partidos.
- A12: el tiempo en el cargo de Suárez se cuenta desde 1976 (4 años y 7 meses, el tiempo real); la edad y el año siguen siendo los de 1977. La nota aclaratoria lo explica.
- A1: curva de dificultad 3-4-3 (tres fáciles, cuatro medias, tres difíciles). Salen las dos preguntas más obvias (350 diputados y 15 días de campaña).
- A1: entran dos ganchos del 29-N: los escaños que cambian respecto a 2023 (Madrid +1, Cádiz −1) y las fechas reales (voto por correo hasta el 19-nov; sin encuestas publicadas desde el 24-nov).
- A12: contenido cerrado en editorial/contenido/a12-presidentle.md; verificación en editorial/fuentes/a12-presidentes.md. Criterio de fechas: inicio = promesa o juramento ante el Rey; fin = toma de posesión del sucesor; Sánchez con corte el 29-11-2026. Ninguna cifra cambia si se usa la fecha del real decreto.
- A1: contenido definitivo en editorial/contenido/a01-quiz-sistema-electoral.md; sustituye a la plantilla del 14-10 y cierra el [VERIFICAR] de la pregunta 7 (ahora pregunta 2). Verificación en editorial/fuentes/a01-quiz.md. Niveles del cierre sin cambios.
- A1: la pregunta nueva de la parte difícil son las firmas de los partidos sin representación (0,1 % del censo de la circunscripción, LOREG art. 169.3).

### Encargos para Code (2026-10-15)

- A12: crear data/presidentes.json desde editorial/contenido/a12-presidentle.md, con su entrada en data/SOURCES.md; añadir el color de UCD a shared/base.css desde la misma plantilla de Wikipedia.
- A1: regenerar juegos/a01-quiz-sistema-electoral/data.json desde el nuevo contenido (orden, pregunta 8 nueva, preguntas 1 y 9 antiguas fuera).
- Cotejo legal de A1. Descargar desde R, con User-Agent de navegador como en el scraping del Diario de Sesiones, el texto consolidado de la LOREG (BOE-A-1985-11672, versión del 02-07-2026) y el de la Constitución (BOE-A-1978-31229). Extraer el texto literal de los artículos siguientes y cotejarlo con la pregunta, la respuesta y la explicación de A1:
  - LOREG: 69.7, 72, 75.1, 162.2, 162.3, 163.1.a, 163.1.c, 166.1.a y 169.3.
  - Constitución: 69.2, 99.3 y 99.5.
- Cotejo legal de A1, salida: escribir la cita literal de cada artículo en editorial/fuentes/a01-cotejo-boe.md, con la URL y la fecha de descarga. No se tocan las preguntas: cualquier discrepancia se anota en la bitácora como duda para el autor. Los textos descargados no se versionan (caché fuera del repo, como los PDF del Diario).

## 2026-10-16

- A1, pregunta 9: la fuente es LOREG art. 163.1.d (desempate de cocientes), no el 163.1.c. Corregido en el contenido.
- A1, pregunta 5: la fuente pasa a «LOREG, arts. 163.1.a y 96.5» (el 96.5 dice que el voto en blanco es válido). Corregido en el contenido.
- A12, pista 3: González, «Licenciado en Derecho por la Universidad de Sevilla; abogado» (se quita «laboralista»). Aznar se queda con «inspector de Finanzas del Estado».
- Calendario: A3 Crispómetro se publica el primer día de campaña (13-N), como gancho de la serie. Pasa a ser la prioridad de datos.
- Índice: el texto de la ficha de cada día se escribe al cerrar cada juego, no antes.
- Calendario: el reparto de los 15 días se ajusta conforme haya juegos terminados; no se fija por adelantado.

### Encargos para Code (2026-10-16)

- A3, prioridad: comprobar los Diarios de Sesiones del Pleno de las legislaturas anteriores a la XV, de la XIV hacia atrás, hasta donde se pueda. Por legislatura:
  - si existe el patrón de URL y cuántos diarios hay;
  - si el texto sale limpio, o es escaneado y necesita OCR;
  - si se distinguen las intervenciones de la Presidencia;
  - si la fórmula «llamo al orden» aparece igual;
  - el número de sesiones plenarias (el denominador).
  
  Donde el PDF no sirva, valorar ParlaMint-ES. Con eso, una tabla en la bitácora para que el autor fije el rango (todas o desde la VIII), y una estimación de cuántas legislaturas se pueden contar antes del 26-oct. No se decide el rango en Code.
- A3: preparar `legislaturas.json` con la presidencia del Congreso y su partido por legislatura, para la pantalla final.
- A1: añadir al cotejo (`editorial/fuentes/a01-cotejo-boe.md`) la cita literal del art. 96.5 de la LOREG y regenerar el `data.json` con las fuentes corregidas de las preguntas 5 y 9.
- A12: actualizar en `data/presidentes.json` la pista 3 de González.
- A2: ordenar por rondas de 4 hitos, que el jugador ordena del más antiguo al más reciente. Puntuación por hito: 1 punto en la posición exacta dentro de la ronda, ½ a una posición de distancia y 0 en otro caso. Con esto se confirma la regla provisional de cercanía para A2.
- A2: además de los 12 hitos fijos, entran cuatro: convocatoria (05-10-2026), incendios, Podemos deja Sumar (05-12-2023) y Ábalos en prisión (27-11-2025). Borrador en editorial/contenido/a02-cronologia-legislatura.md (16 hitos en 4 rondas, pendiente de revisión del autor).
- A2 (corrige la línea anterior): 3 rondas de 4, con 12 hitos en total y puntuación sobre 12. Sale la antigua ronda 3: Podemos deja Sumar, la carta de los cinco días, Las Médulas y la moción por la cuestión de confianza.
- Criterio de fecha para los incendios, si vuelven a entrar en algún juego: la de la declaración del incendio.
- A2: la pista de partida tiene 12 celdas, una por hito, en tres grupos de cuatro. Hito en su posición exacta: celda en marcador. A una posición: medio relleno (½). Resto: vacía. Excepción a la regla general de una celda por ronda.
- A2: contenido cerrado en editorial/contenido/a02-cronologia-legislatura.md (12 hitos, 3 rondas). Encargo para Code: pasarlo a juegos/a02-cronologia-legislatura/data.json y montar el juego sobre M1 variante ordenar, con las reglas de puntuación y pista de partida del 16-10.
- A10: edición cerrada en editorial/contenido/a10-agrupar-16.md, con cuatro grupos:
  1. Presidieron el Congreso.
  2. Leyes conocidas por el apellido de su ministro, solo leyes completas: Corcuera, Aído, Wert y Celaá. Sinde queda fuera.
  3. Fueron ministros de Educación.
  4. Perdieron al menos una votación de investidura.
  
  Nivel aprobado. Wert, Celaá y Rajoy encajan en dos grupos, pero la solución es única.
- A10, encargo para Code: pasar el contenido a juegos/a10-agrupar-16/data.json y montar el juego sobre M6, con 4 vidas (icono «nula») y el cierre resuelto/no resuelto más el número de fallos.
- A3, rango: de la VIII a la XV (8 legislaturas, 7 decisiones en la cadena). Las legislaturas I–VII solo se añaden si superan una validación manual del OCR: en una muestra de 20 sesiones de I–VII leídas a mano, el script debe encontrar al menos el 95 % de las llamadas al orden que encuentre la lectura manual. Si no llega, quedan fuera y el juego lo explica en una nota metodológica.
- A3: la cifra de la XV queda en 83 llamadas en 203 sesiones plenarias, porque se incorporan las cuatro sesiones publicadas en partes. Sustituye a 81/199.
- A3, pantalla final: el partido de cada presidencia del Congreso es el de su grupo parlamentario. Batet figura como PSOE, con color PSOE; su afiliación al PSC queda anotada en el JSON. El mismo criterio vale para Pons y para el resto.
- legislaturas.json conserva la Constituyente, por si la usa A5; A3 no la muestra.

### Encargos para Code (2026-10-16, tarde)

- A3, en este orden:
  1. Pasar a R/05 el bucle por legislaturas y el lector por columnas de los PDF `PL_`.
  2. Descargar y contar XI–XIV.
  3. Descargar y contar VIII–X, con muestra manual de validación: precisión de la fórmula y de la atribución a la Presidencia.
  4. Denominador exacto de sesiones plenarias por legislatura, con el mismo criterio que en la XV.
  5. Tabla final en la bitácora.
- A3, validación del OCR de I–VII: muestra de 20 sesiones leídas a mano frente al conteo del script, con el umbral del 95 % fijado arriba. Solo después de cerrar VIII–XV.
- A12, A2 y A10 jugables para el 26-oct, con el contenido de editorial/contenido/.
- Capturas a 375 px: usar la emulación de viewport de Playwright (el Chromium preinstalado) en lugar del tamaño de ventana de Chrome headless.
- Incidencia A2 (16-10, pendiente de captura del autor): en una partida de prueba, el autor vio en la ronda 2, después de pulsar «Comprobar orden», la solución con los ítems 2 y 3 invertidos. Cowork ha revisado el contenido, el data.json y el motor (`ordenar` en shared/motores/quiz.js) y no encuentra la causa: el orden correcto sale de ordenar por fecha y los datos están bien. Encargo para Code:
  - intentar reproducirlo, incluida una versión antigua en caché de Pages;
  - añadir una comprobación automática de que la lista resuelta de cada ronda sale ordenada por fecha;
  - anotar el resultado en la bitácora.
- Método de contenido: en los juegos de contenido (quiz, ordenar, agrupar, rosco, promesas, bingo, «Quién dijo qué» y similares), Cowork presenta un catálogo amplio de candidatos y el autor elige cuáles entran. Cowork no decide la selección. El procedimiento está en editorial/COWORK.md.
- A1, selección del autor sobre el catálogo (editorial/catalogos/a01-catalogo.md): 1, 2, 7, 8, 17, 18, 25, 27, 28 y 34 (corregida por el autor: entra la 28, días de campaña, y sale la 19, senadores autonómicos). Sustituye a la selección del 15-10. Salen los ganchos del 29-N (escaños de Madrid y Cádiz, voto por correo, veda de encuestas), el desempate de D'Hondt, las firmas y la repetición electoral. La curva pasa a 4-4-2 (cuatro fáciles, cuatro medias, dos difíciles); la mesa electoral y la investidura se plantean en su versión difícil (requisitos del sorteo; segunda votación a las 48 horas). Niveles del cierre sin cambios.
- A1, encargo para Code:
  - regenerar juegos/a01-quiz-sistema-electoral/data.json desde el contenido nuevo;
  - ampliar el cotejo literal (editorial/fuentes/a01-cotejo-boe.md) con los artículos nuevos: CE 68.1 y 68.3, y LOREG 51, 162.1, 166.1, 25.1, 26.2 y 27;
  - anotar en la bitácora cualquier discrepancia; no se tocan las preguntas.
- A1 (corrige la selección anterior): sale la 18 del catálogo (Senado, votar a candidatos de partidos distintos) y entra la 5 (Madrid gana un escaño y Cádiz lo pierde). Selección final: 1, 2, 5, 7, 8, 17, 25, 27, 28 y 34. Ya no hay curva de dificultad fija.
- A1: las preguntas salen en el orden fijo del fichero de contenido; solo se barajan las opciones. (El autor descartó el orden aleatorio de las preguntas el mismo 16-10: no hay encargo para Code sobre esto.)
- A2, selección del autor sobre el catálogo (editorial/catalogos/a02-catalogo.md): 2, 5, 6, 13, 16, 21, 24, 25, 29, 31, 36 y 37. Sustituye a la selección anterior. Sale la aprobación de la amnistía (14) y entran las elecciones en Extremadura (29).
- A2, rondas aprobadas:
  - Ronda 1: Feijóo, CGPJ, el Constitucional avala la amnistía y el decreto antidesahucios.
  - Ronda 2: investidura de Sánchez, Podemos, decretos de vivienda y anuncio de elecciones.
  - Ronda 3: Palestina, Junts, Mazón y Extremadura.
- A2, encargo para Code: regenerar juegos/a02-cronologia-legislatura/data.json desde el contenido nuevo.
- A10, selección del autor sobre el catálogo (editorial/catalogos/a10-catalogo.md): grupos A (presidieron el Congreso), J (apodos de leyes), H (ministros que después presidieron su comunidad) y D (perdieron una votación de investidura). Ítems:
  - A: Armengol, Pastor, Posada, Bono.
  - J: Mordaza, Wert, Solo sí es sí, Zerolo.
  - H: Aguirre, Cascos, Montilla, Illa.
  - D: Calvo-Sotelo, Zapatero, Rajoy, Feijóo.
  
  Sustituye a la edición del 16-10 por la mañana.
- A10, encargo para Code: regenerar juegos/a10-agrupar-16/data.json desde el contenido nuevo, con el orden de dificultad A, J, H, D.
- A10: el recibo lleva un color por grupo, en excepción al 🟨⬜ del resto de la serie. Qué colores o emojis concretos son y cómo encajan con la paleta lo decide el chat de Cowork de diseño, no el editorial. Hasta entonces, M6 mantiene 🟨🟩🟦🟪 como provisional.

## 2026-10-16 (diseño)

- Diseño, A10: color por grupo tomado de la paleta propia de la serie, de más fácil a más difícil. No se usan emojis ni tonos de partido: 🟩, 🟦, 🟪 y 🟥 leerían un grupo como «el del PP», «el de Vox», etc.
  - Grupo 1: marcador `#f2c200`, 🟨.
  - Grupo 2: senado `#dcc7a1`, 🟫.
  - Grupo 3: señal `#ff5f1f`, 🟧.
  - Grupo 4: tinta `#000000`, ⬛.
  - El orden es el de dificultad del contenido (A10: 1 A, 2 J, 3 H, 4 D).
- Diseño: excepción a la regla de señal. Además del relleno del bocadillo, señal se usa solo como color del grupo 3 de A10. Ningún otro juego ni elemento la usa.
- Diseño, A10, encargo para Code:
  - **Tokens.** En `shared/base.css`, `--grupo-1: var(--marcador)`, `--grupo-2: var(--senado)`, `--grupo-3: var(--senal)` y `--grupo-4: var(--tinta)`. Si `--senado` y `--senal` no existen aún, se crean con los valores de arriba. Solo los usa M6.
  - **Recibo.** En `shared/motores/agrupar.js`, `emoji = ['🟨', '🟫', '🟧', '⬛']`, que sustituye al provisional 🟨🟩🟦🟪. Se mantiene una fila por intento.
  - **Grupo resuelto.** Bloque con fondo del color de su grupo, sin borde. En los grupos 1 a 3, todo el texto del bloque (nombre, ítems, explicación y fuente) va en tinta; en el grupo 4 va en papel. Contrastes: tinta sobre marcador ≈ 11:1, sobre senado ≈ 12:1 y sobre señal ≈ 6,9:1; papel sobre tinta 21:1.
  - **Grupo sin resolver** al perder: se mantiene en papel con borde de 1 px tinta y lleva delante del nombre una muestra cuadrada de su color (0,8 em, borde de 1 px tinta, la misma pieza que `.muestra-partido`). Así el recibo se puede leer contra la pantalla.
  - **Rejilla en juego.** Sin colores de grupo mientras se juega: los ítems siguen en papel y el seleccionado se invierte a tinta.
  - Captura a 375 px con los cuatro grupos resueltos y con una partida perdida, revisada contra la lista negra antes del commit.
- A4, ámbito: solo promesas del Gobierno: programas de PSOE y Sumar de 2023, acuerdo de coalición y acuerdos de investidura.
- A4, definiciones aprobadas:
  - **Cumplida:** se aprobó la norma o se ejecutó la medida.
  - **Bloqueada:** una votación del Congreso la tumbó, documentada con fecha y resultado.
  - **Incumplida:** no se aprobó y no hubo votación en contra.
- A4: las promesas cumplidas a medias no entran.
- A4: reparto equilibrado de respuestas, unas cuatro de cada tipo.
- A4, selección del autor sobre el catálogo (editorial/catalogos/a04-catalogo.md): 1, 4, 6, 7, 8, 10, 11, 12, 13, 15, 22 y 26. Borrador en editorial/contenido/a04-promesas-2023.md.


## 2026-10-17

- A4: sale el salario mínimo al 60 % del salario medio (6 del catálogo), porque el Gobierno aún lo presenta como objetivo. Entra la ley de paridad (2). Selección final: 1, 2, 4, 7, 8, 10, 11, 12, 13, 15, 22 y 26. Reparto: 4 cumplidas, 4 bloqueadas y 4 incumplidas.
- A4: las opciones no se barajan. Van siempre en el orden Cumplida, Incumplida, Bloqueada en el Congreso.
- A4, encargo para Code (comprobaciones; el resultado se anota en editorial/fuentes/a04-promesas.md y las discrepancias en la bitácora, sin tocar el contenido):
  1. Texto literal del acuerdo PSOE-Sumar del 24-10-2023 sobre el impuesto a las energéticas, para confirmar que la promesa era mantenerlo.
  2. Origen de la promesa de reformar el art. 49 de la Constitución: programa del PSOE de 2023, acuerdo PSOE-Sumar o anuncio del Gobierno en diciembre de 2023. Cita literal.
  3. Origen de la promesa de la ley de paridad y alcance de la LO 2/2024: listas electorales, consejos de administración y otros órganos. Cita literal del BOE.
  4. Después, montar A4 en juegos/a04-promesas-2023/ con M1 y las opciones en orden fijo, a partir de editorial/contenido/a04-promesas-2023.md.
- A13, términos elegidos por el autor (una palabra por letra): Abstención, Bisagra (sustituye a Bancada, 17-10), Clivaje, D'Hondt, Escaño, Fragmentación, Grupo Mixto, Hare, Investidura, Junta Electoral, Think tank, LOREG, Mitin, Nulo, Señoría, Oligarquía, Plurinominal, Quórum, Referéndum, Senado, Tránsfuga, Urna, Volatilidad, Swing voter, Extraparlamentario, Mayoría y Zarzuela.
- A13: las pistas siguen la fórmula del concurso: «Empieza por la X, …» o «Contiene la X, …».
- A13: pistas revisadas por el autor (17-10). Recortó C, E, F, N, O, P, R, V y W, y las demás quedan como las redactó Cowork, incluidas D, J, S y Z. No hay un criterio general de recorte: cada pista se decide una a una. Contenido en editorial/contenido/a13-rosco-politologo.md.
- A13, encargo para Code: montar el motor M9 y A13 a partir de ese contenido (entrega del 2-nov). Antes, comprobar dos fuentes:
  - la acepción política de «bisagra» en el DLE;
  - la edición del manual de Nohlen citado para Hare.
  
  Las discrepancias se anotan en la bitácora.

## 2026-10-17 (diseño y jugabilidad de los juegos cerrados)

Revisión de A1, A2, A4, A10, A12 y A13 hecha por el autor con el chat de diseño. Referencias: docs/maquetas/maqueta-disposicion-v6.html y docs/maquetas/maqueta-portada-rosco-v7.html.

### G · Común a todos los juegos
- G1, portada: componente compartido nuevo (`shared/portada.js`, en paralelo a `cierre.js`) que se muestra al entrar en cualquier juego.
  - Contenido, en este orden: «Juegos 29N, día N» (etiqueta), título (1.75 rem, 800), dos frases (1.0625 rem), lista de reglas con icono de 10×10 a la izquierda (dos o tres reglas, separadas por rayas de 1 px raya, con borde superior tinta) y fuente general (etiqueta, lápiz).
  - Botón «Jugar» en marcador, en la barra fija.
  - El texto de cada portada llega en el contenido de cada juego con los campos `portada.texto` y `portada.reglas` (icono y texto). Es el mismo texto que la ficha del índice.
- G2: el paso de base.css y los motores al diseño arcade sigue pendiente (marcador de partida con tic, aspa y cursor, cifras de casillas, barra de acción fija, cabecera compacta, «+1», «Juegos 29N, día N» en el recibo). Va antes de seguir puliendo juegos sueltos.

### A1 · Quiz
- Sin cambios.

### A2 · Cronología
- A2.1: «Más antiguo» encima de la lista y «Más reciente» debajo, en etiqueta (lápiz).
- A2.2: la etiqueta de ronda incluye el criterio de la ronda: «Ronda 1 de 3. Más de un año entre hitos». El texto sale del título de ronda del contenido.
- A2.3: ronda resuelta compacta. Por hito, en orden cronológico: casilla de puntos, fecha y texto del hito; si no está en su sitio, «Tu posición: 3.º» en lápiz. La explicación y la fuente van plegadas en un `<details>` con el texto «Ver explicación».

### A10 · Agrupar 16
- A10.1: mientras se juega, cada grupo resuelto se muestra compacto: nombre e ítems sobre el color de su grupo. La explicación y la fuente de los cuatro grupos se ven al terminar la partida.
- A10.2: botón secundario «Barajar», que reordena los ítems sin resolver. Va junto a «Comprobar», en la barra, con estilo secundario (papel, peso 400).
- A10.3: si se repite una combinación de cuatro ya fallada, sale «Ya lo has probado.» y no se gasta vida.
- A10.4: con menos de cuatro ítems marcados, el botón principal está apagado y dice «Marca 4 (N de 4)»; con cuatro marcados pasa a «Comprobar».
- A10.5, vidas con corazones de píxel (variante A), en rejilla de 9×8, SVG con crispEdges, a escala 3:
  - vida: corazón relleno en tinta; vida perdida: solo el contorno, en raya.
  - Al fallar, el corazón pasa por un fotograma intermedio de medio vacío (dos saltos, steps). Con prefers-reduced-motion cambia sin animación.
  - Sustituyen a los iconos papeleta y nula en A10. Los corazones quedan en `shared/iconos.js` como icono de vida para cualquier juego con vidas.
  - Matrices en la maqueta v7: `lleno`, `mitad` y `vacio`.

### A12 · Presidentle
- A12.1: las siete opciones en dos columnas (rejilla de 2, separación de 8 px y altura mínima de 52 px; los nombres largos pueden partir en dos líneas).
- A12.2: la pista recién revelada en negrita y en tinta; las anteriores en peso 400 y lápiz.

### A4 · Promesas
- A4.1: las tres opciones van en una fila de tres botones iguales, siempre en el mismo orden (Cumplida, Incumplida, Bloqueada) y con altura mínima de 52 px. En pantalla, la opción c se rotula «Bloqueada»; en la explicación se mantiene «Bloqueada en el Congreso».
- A4.2: la promesa se muestra como tarjeta de texto (1.375 rem, 800), con su origen encima en etiqueta («Acuerdo PSOE-Sumar», «Programa de Sumar 2023»…). El origen llega en un campo nuevo `origen` del contenido.
- A4.3: el cierre añade, bajo la nota, un desglose de aciertos por tipo de respuesta correcta: «Cumplidas 3 de 4», «Incumplidas 4 de 4», «Bloqueadas 2 de 4». Una línea por tipo, con cifras tabulares.

### A13 · Rosco
- A13.0: sin reloj. Se elimina el cronómetro opcional.
- A13.1, dos formas según el teclado:
  - Sin teclado: rosco circular de 252 px, con casillas de 24 px por letra; en el centro, la letra actual (3.25 rem, 800) y los aciertos en cifras de casillas. Debajo, la pista («Empieza por la **F**, …», con la letra en 1.375 rem), el campo y los botones.
  - Con el campo enfocado (teclado abierto): el rosco se pliega en una tira de 27 casillas en dos filas (14 + 13) y los aciertos pasan a la cabecera.
  - La barra fija no se muestra en este juego. Los botones van pegados al campo: «Responder» a la derecha del campo y «Pasar» debajo, a todo el ancho.
- A13.2, estados de letra: pendiente en papel con borde tinta; acierto en marcador; fallo en raya; pasada en senado (fondo y borde); actual con borde de 3 px.
- A13.3: campo con `autocapitalize="off"`, `autocorrect="off"`, `spellcheck="false"` y `enterkeyhint="send"`; Intro responde.
- A13.4: tras un fallo aparece «Era: <respuesta>» con la respuesta sobre raya y el juego avanza solo a la siguiente letra sin cerrar el teclado.
- A13.5: cuando solo quedan letras pasadas, aparece «Terminar» junto a «Pasar». Al terminar, las pasadas cuentan como no respondidas.
- A13.6, cierre:
  - Rosco circular completo con el estado final de cada letra: acierto en marcador, fallo en raya, sin responder en senado. Es el resumen del resultado, encima de la nota «N de 27».
  - Tocar una letra del rosco del cierre muestra debajo su pista, su respuesta y su fuente.
  - Recibo: 27 casillas en tres filas de 9 (🟨 acierto, ⬜ fallo o sin responder).

### Encargo para Code, orden de trabajo (2026-10-17)
1. Pasar `shared/base.css` y los motores al diseño arcade aprobado (decisiones de diseño del 15 y del 16-10; maquetas v2, v3, v5 y v6 en docs/maquetas/). Incluye barra de acción fija, cabecera compacta, marcador de partida, cifras de casillas, colores senado y señal, «+1», recibo con «Juegos 29N, día N» y cierre con «Fin de la partida».
2. Portada común `shared/portada.js` (G1), montada en A1, A2, A10 y A12. Mientras falte el texto de portada en el contenido, deja `TODO` visible.
3. Cambios de los juegos montados: A2 (A2.1 a A2.3), A10 (A10.1 a A10.5, con corazones) y A12 (A12.1 y A12.2).
4. A4 y A13, cuando su contenido esté completo (A4 necesita el campo `origen`; A13 tiene dos fuentes por verificar).

Tras cada paso: capturas a 375 × 560 y a 1280, revisión contra la lista negra, commit y entrada en la bitácora. No hagas push sin confirmación del autor.
