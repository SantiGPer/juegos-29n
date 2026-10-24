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

## 2026-10-18

- A3: la cifra de la XV es de 90 llamadas en 203 sesiones plenarias, tras el fallo de texto corregido por Code. Sustituye a 83/203.
- A3, fórmula: se amplía a las perífrasis con valor de llamada («le tengo que llamar al orden», «le voy a llamar al orden», «me obliga a llamarle al orden», «llamo al orden al señor…»). Cada coincidencia nueva se revisa a mano.
- A3: no cuentan los avisos condicionales («si no lo retira, le llamo al orden», «a la próxima le llamo al orden»), estén redactados con la fórmula o con una perífrasis. Se descuentan a mano.
- A3, rango: solo entran las legislaturas en las que hubo investidura. Quedan fuera la XI y la XIII (sin investidura, con 13 y 9 sesiones), y el juego lo explica en la nota metodológica. Rango del juego: VIII, IX, X, XII, XIV y XV, que dan 6 legislaturas y 5 decisiones en la cadena. Si después entran las legislaturas I–VII, se aplica el mismo criterio.
- A1, pregunta 9: el sorteo es entre los electores de la mesa, no de la sección, y la explicación añade que desde los 65 años se puede renunciar. Pregunta 10: la fuente pasa a «CE, art. 99.3 y 99.4».
- A4: fuentes cerradas.
  - Energéticas: acuerdo PSOE-Sumar, pág. 38.
  - Art. 49: acuerdo PSOE-Sumar, pág. 24, y BOE-A-2024-3099.
  - Paridad: acuerdo, pág. 34, y BOE-A-2024-15936. La explicación queda en «sociedades cotizadas», no en «grandes empresas».
- A13, B: la respuesta es «Bisagra» y se acepta «partido bisagra»; la fuente es DLE, s. v. «partido» (partido bisagra).
- A13, H: la pista queda en «apellido que da nombre a la cuota…», sin «abogado inglés». Fuente: Nohlen, 1.ª ed., 1994, p. 70.
- A10, grupo 3: fechas verificadas en editorial/fuentes/a10-agrupar.md; se quita el [VERIFICAR] de la fuente en pantalla.
- Encargos para Code:
  - A3: aplicar la fórmula ampliada con revisión manual, descontar los avisos condicionales y regenerar llamadas_al_orden.json con las seis legislaturas del rango. Después, montar M4 y el juego A3. Es el juego del día 1 y va antes que el resto.
  - Regenerar los data.json de A1 y A10 con el contenido corregido.
  - Pasar las correcciones de fuentes al contenido de A4 y A13 cuando se monten.
- Portadas: tono poco pedante, planteado como desafío en clave divertida y con metáforas, símiles y otros recursos narrativos de la política. Las reglas siguen siendo literales. Queda recogido en editorial/COWORK.md.
- A1 se llama **ElectoQuiz**: sustituye a «Quiz del sistema electoral» en el título, la portada, el recibo y el índice. La carpeta del juego puede conservar su nombre.
- Portadas de A1, A2, A10 y A12 cerradas por el autor. Están en la sección «Portada» de cada fichero de editorial/contenido/; en A10 la regla de vidas usa el icono de corazón.
- Encargo para Code:
  - pasar los textos y las reglas de portada a los data.json de A1, A2 y A10, y al game.js de A12, en sustitución de los TODO;
  - cambiar el título de A1 a «ElectoQuiz» en el juego, el recibo y el índice;
  - de paso, regenerar los data.json de A1 y A10 con las correcciones de contenido del 18-10.

## 2026-10-19

Decisiones del autor tomadas el 18-10 en una sesión con Code (bitácora 18-10 (3)), pasadas aquí:
- M1, criterio universal de orden de opciones:
  - si las opciones son ordinales, no se barajan y van de mayor a menor;
  - si son nominales, se barajan;
  - las opciones de cierre («Ninguno», «No lo sé», blanco, nulo, otros…) van siempre al final, sin barajar.
  
  En A1 se aplica a las preguntas 1, 2, 4 y 7 (todas ordinales). Confirmado.
- A10, cierre: muestra los grupos encontrados («N de 4») y los fallos. El recibo pasa a «N/4 grupos», sin emojis. Sustituye al recibo de colores por grupo.
- A12: un presidente al azar en cada partida. El cierre incluye «Otro presidente», que abre una partida nueva con un presidente distinto del anterior.
- A3: la cifra de la XV queda en 95 llamadas en 203 sesiones, con la fórmula ampliada y los avisos descontados. Sustituye a 90/203.
- A10, fuente del grupo 3 en pantalla: sin ruta interna. Basta con quitar el [VERIFICAR], como ha hecho Code.
- A3, conteo:
  - la llamada colectiva de la XII (DS 61, «les voy a llamar al orden») cuenta como acto válido;
  - en la XV (DS 43), las dos frases «le llamo al orden por primera vez» al mismo diputado se fusionan en un solo acto. Regla general: el mismo destinatario con el mismo ordinal en la misma intervención es un solo acto, aunque haya más de 150 caracteres entre las frases. La XV baja previsiblemente a 94.
- A3: el periodo de la XV es 2023–2026 (termina con la disolución), no «Desde 2023».
- A3, en revisión: el autor quiere ampliar el juego a otros indicadores del Diario de Sesiones, además de las llamadas al orden. La portada y la nota quedan en suspenso hasta definir el nuevo planteamiento. Code no debe tocar A3 más allá de las dos correcciones de conteo y del periodo.
- **A3 se replantea como «Plenopedia»:** un juego sobre la actividad del Pleno en la XV legislatura, con varios indicadores muy fiables del Diario de Sesiones, cruzados con el grupo parlamentario o con el diputado:
  - llamadas al orden;
  - rumores, protestas y risas;
  - aplausos;
  - votaciones;
  - duración de las sesiones;
  - minutos de silencio;
  - fórmulas de acatamiento;
  - léxico (por ejemplo, menciones a ETA);
  - menciones a líderes.
- Plenopedia mezcla mecánicas: opción múltiple, ordenar, más o menos y quizá estimación. Es el primer juego que se publica (13-N) y sustituye al Crispómetro, que pasa a ser una parte. Las legislaturas VIII–XIV quedan contadas y en reserva (para A11 o para posts).
- Plenopedia: el catálogo de preguntas candidatas está en editorial/catalogos/a03-plenopedia-catalogo.md. La selección se hará con las cifras de la prueba de viabilidad.
- **Encargo para Code: prueba de viabilidad de Plenopedia, solo XV.** No se monta todavía el juego.
  1. Aplicar las dos correcciones de conteo del 19-10 (llamada colectiva y fusión del DS 43) y el periodo 2023–2026.
  2. Atribuir cada intervención a su orador y a su grupo. Hay que revivir diputados_xv.json, que estaba en reserva. El presidente y los ministros van a la categoría «Gobierno», no a su grupo; hay que tener en cuenta los cambios de Gobierno durante la legislatura. Todos los desgloses por grupo se normalizan por cada 10.000 palabras del grupo.
  3. Contar en cada sesión, con los diarios que ya están en caché:
     - acotaciones «(Rumores.)», «(Protestas.)», «(Risas.)» y «(Aplausos…)», con el grupo que aplaude si el Diario lo indica, y el orador en el uso de la palabra;
     - hora de apertura y de cierre;
     - «minuto de silencio»;
     - palabras pronunciadas por orador y por grupo, que sirven de denominador y también para el Charlatán y las palabras por escaño (ver la decisión siguiente);
     - menciones de una lista de prueba, por grupo del orador: ETA, Franco, Venezuela, España, Cataluña, vivienda, corrupción, Europa, amnistía, Palestina, Sánchez, Feijóo, Abascal, Puigdemont.
  4. Para cada indicador: si el formato es estable en toda la XV, un ejemplo literal, el total y el desglose por grupo. La salida va en editorial/fuentes/a03-plenopedia-viabilidad.md y el resumen en la bitácora. No hay que preparar las preguntas.
- Plenopedia, ajustes del autor (19-10):
  - salen las votaciones y el acatamiento;
  - entra «el Charlatán» (definición corregida más abajo, el 19-10).
- Plenopedia, método:
  - todos los indicadores por grupo se normalizan por cada 10.000 palabras pronunciadas por ese grupo;
  - el presidente y los ministros cuentan como «Gobierno», no como su partido, y sus palabras no suman a ningún grupo parlamentario;
  - la lista de términos del léxico recoge temas recurrentes de todos los bloques.
  
  Estas reglas sustituyen a lo que diga en contra el encargo de viabilidad anterior: sin votaciones, sin acatamiento y con el Gobierno como categoría propia.
- Plenopedia, Charlatán y grupos (sustituye a «la mayor proporción de palabras de su grupo»):
  - **Charlatán:** palabras totales pronunciadas en el Pleno por cada diputado durante toda la XV, en un ranking único de los 350. Los miembros del Gobierno quedan fuera y tienen su propio ranking («¿qué ministro habló más?»).
  - **Grupos:** palabras por escaño, es decir, las palabras del grupo divididas entre su número de diputados. Como dato de apoyo para la explicación, el cociente entre el porcentaje de palabras y el porcentaje de escaños; si es mayor que 1, el grupo habla más de lo que le corresponde por tamaño.
  - **Cambios de grupo:** las palabras cuentan para el grupo en el que estaba el diputado ese día (por ejemplo, Podemos al Mixto en diciembre de 2023).
  - **Grupo Mixto:** se cuenta como grupo, que es la unidad oficial, con el desglose por partido al lado (BNG, CC, UPN, Podemos…).

Decisiones del autor del 18-10 en sesión con Code (bitácora 18-10 (6)), pasadas aquí el 19-10:
- Llamadas al orden: solo se fusiona a mano el DS 43 de la XV, y la regla general por ordinal no se aplica. **XV = 94/203.** El resto de legislaturas no cambia (XIV, 49/262). Sustituye a la regla general anotada antes el 19-10.
- Plenopedia no compara legislaturas: todo va sobre la XV.
- La Mesa queda fuera del Charlatán y de los grupos. Feijóo como candidato cuenta para el PP y Sánchez como candidato, para el Gobierno.
- Aplausos: se cuenta que hay aplauso durante la intervención de cada grupo, no quién aplaude. La pregunta 8 del catálogo sale.
- Los cuatro oradores que no son diputados de la XV (probablemente promotores de iniciativas legislativas populares) se quedan en «Otros».
- Plenopedia, selección del autor (19-10). Diez preguntas, con planteamiento y mecánica pendientes de su visto bueno:
  1. Charlatán.
  2. Los mudos (diputados que nunca hablaron en el Pleno).
  3. Diputado con más llamadas al orden.
  4. Grupo con más llamadas al orden.
  5. Rumores.
  6. Duración, como estimación en horas.
  7. La sesión que acabó más tarde.
  8. Léxico, ordenar términos.
  9. Aplausos.
  10. Risas.

## 2026-10-18 (diseño, distribución de opciones)

Revisión de Presidentle y Agrupar 16 jugados en el repositorio. Referencia: docs/maquetas/maqueta-opciones-v8.html.

- Diseño, cabecera compacta común (todos los juegos con pista):
  - Primera línea: nombre del juego (1 rem, 800).
  - Segunda línea: pista a la izquierda y puntos a la derecha («Puntos» en etiqueta y cifras de casillas a escala 3).
  - Los puntos ya no ocupan una fila propia. En A10, en lugar de puntos van los corazones de vida, en la misma línea que el nombre.
- Diseño, A12 Presidentle:
  - Opciones en dos filas que ocupan todo el ancho, en orden cronológico: cuatro arriba (Suárez, Calvo-Sotelo, González, Aznar) y tres abajo (Zapatero, Rajoy, Sánchez). Rejilla de 12 columnas: span 3 en la primera fila y span 4 en la segunda, con 8 px de separación.
  - Casillas de 56 px de alto como mínimo, texto centrado a 0,875 rem en 800, sin partir palabras («Calvo-Sotelo» solo parte por el guion).
  - Seleccionada invertida; fallada tachada, en lápiz y con borde raya.
  - La etiqueta de opción de Rodríguez Zapatero pasa a «Zapatero» (`opcion` en data/presidentes.json). El nombre completo se mantiene en `nombre` y en el cierre.
  - Pistas: la nueva en 1,125 rem y 800; las anteriores en 1 rem, 400 y lápiz.
- Diseño, A10 Agrupar 16:
  - Fichas cuadradas (`aspect-ratio: 1`, como máximo 96 px), 6 px de separación, texto centrado a 0,875 rem en 800 y sin partir palabras.
  - En 375 px salen de unos 81 px y la rejilla llena el centro de la pantalla.
  - Cada grupo resuelto ocupa exactamente la altura de una fila de fichas (nombre en 800 e ítems en una línea, sobre su color), así que la rejilla no salta.
  - El aviso («No es un grupo.», «Ya lo has probado.») va bajo la rejilla con su altura de una línea reservada aunque esté vacío.
  - En escritorio la rejilla no supera los 38 em de la columna.
- Plenopedia, planteamiento aprobado de las diez preguntas, con la mecánica de cada una:
  1. Charlatán: opción múltiple.
  2. Mudos: opción múltiple con cifras, de mayor a menor.
  3. Diputado con más llamadas al orden: opción múltiple.
  4. Grupos por diputados llamados al orden: ordenar.
  5. Rumores por cada 10.000 palabras: opción múltiple.
  6. Sesión más larga: estimación en horas.
  7. Hora de cierre más tardía: opción múltiple con horas en orden.
  8. Léxico: ordenar España, vivienda, Cataluña, corrupción y ETA.
  9. Aplausos por cada 10.000 palabras: opción múltiple.
  10. Risas: duelo entre Sánchez y Feijóo.
- Plenopedia, pregunta 6: se estima la duración de la sesión más larga de la legislatura (DS 135, 10-09-2025, 12 h 21 min), no el total de horas de Pleno.
- Plenopedia, pregunta 2 (mudos): solo cuentan los diputados que estuvieron toda la legislatura, desde la sesión constitutiva hasta la disolución, sin bajas ni sustituciones.
- Plenopedia, nota metodológica: explicará que las llamadas al orden las impone la Presidencia y que todos los grupos se miden con el mismo método. El texto lo escribe Cowork.
- Encargos para Code (Plenopedia), en este orden:
  1. **Datos:**
     - revisar a mano las 29 llamadas al orden sin destinatario automático y recalcular el diputado y el grupo más llamados;
     - número de mudos que estuvieron toda la legislatura, con la lista;
     - para los distractores, los datos de los cuatro primeros de cada pregunta: palabras de Rego, Sagastizabal, Feijóo y Rufián; llamadas de los cuatro diputados más llamados; rumores y aplausos de Gobierno, PSOE, PP, Vox y Sumar; las cinco horas de cierre más tardías; los totales de los cinco términos;
     - revisar a mano los minutos de silencio de los DS 91 y 147.
     
     El resultado va en editorial/fuentes/a03-plenopedia-viabilidad.md y en la bitácora. Con eso, Cowork redacta el contenido.
  2. **Motores, en paralelo:**
     - encadenador de rondas para un juego con mecánicas mezcladas: una sola puntuación, una sola pista de partida y un solo cierre;
     - motor M2 de estimación (deslizador y error respecto al dato), adelantado del 9-N porque Plenopedia sale el 13-N;
     - duelo de dos opciones.
  3. **Montar Plenopedia** en juegos/a03-plenopedia/ cuando llegue el contenido. El Crispómetro queda en el repo pero sale del índice.
- Plenopedia: la pregunta de grupos llamados al orden (empate entre PSOE y Sumar) se sustituye por los minutos de silencio (66), en opciones con cifras de mayor a menor.
- Llamadas al orden: se fusionan todos los casos en los que la misma persona recibe dos veces la fórmula en la misma intervención. Son el DS 43, el DS 67 y el DS 169 (Tellado), el DS 27 (Sánchez García) y el DS 126 (Alfonso Silvestre). La XV queda previsiblemente en 90/203 y Tellado en 18. Sustituye a la fusión solo del DS 43.
- Plenopedia, estimación: 1 punto con un error de 30 minutos o menos y ½ hasta 1 h 30 min. Deslizador de 6 a 16 horas, en pasos de 15 minutos.
- Plenopedia: se mantienen las preguntas en las que la respuesta es el PP (mudos, más llamado, aplausos). La nota metodológica explica el método común y que las llamadas las impone la Presidencia.
- A2: en el hito del aval del Constitucional se añade que no se pronunció sobre la malversación. Fuentes: nota informativa 61/2025 del Tribunal Constitucional y BOE-A-2025-15939.
- Plenopedia, contenido redactado por Cowork en editorial/contenido/a03-plenopedia.md, pendiente de visto bueno del autor.
- Plenopedia: las preguntas usan el tono de las portadas (desafío, metáforas, nada literal) y no definen el indicador; la definición va en la explicación. Se evita «el Pleno» en singular cuando se habla de toda la legislatura: «los plenos» o «el hemiciclo».
- Plenopedia, tono corregido: preguntas naturales, con algún guiño ligero y sin sátira ni teatralidad. Las preguntas 2, 4 y 10 quedan como modelo.
- Plenopedia: textos aprobados por el autor el 19-10 (portada, diez preguntas, explicaciones y nota metodológica) en editorial/contenido/a03-plenopedia.md.
- **Encargo para Code (Plenopedia), en este orden:**
  1. Aplicar la fusión de todas las llamadas repetidas a la misma persona en la misma intervención: DS 43, 67, 169, 27 y 126. Confirmar el total de la XV y las llamadas de Tellado, Hernando Fraile, Sánchez García y Conde Bajén.
  2. Confirmar las cifras marcadas con [VERIFICAR] en el contenido:
     - total de llamadas y de Tellado (pregunta 4);
     - diputados con cero palabras contando los que no estuvieron toda la legislatura, sin Armengol ni Sánchez (pregunta 7, calculado en 32);
     - nombres de pila de Sánchez García y Conde Bajén.
     
     Si alguna cifra no coincide, se usa la de los datos y se anota en la bitácora. Las opciones se ajustan si es necesario: por ejemplo, en la pregunta 7 el distractor «32» pasa a la cifra real.
  3. Montar Plenopedia en juegos/a03-plenopedia/ con el encadenador de rondas, a partir del contenido. Portada, nota metodológica al final y fuente general.
     - Pregunta 3: la estimación con los tramos y el deslizador aprobados.
     - Pregunta 5: ordenar, con ½ si hay al menos tres palabras en su posición exacta.
     - Pregunta 6: el duelo.
  4. Sacar el Crispómetro del índice, aunque se queda en el repo.
  5. A2: regenerar el data.json con la explicación y las fuentes nuevas del hito del Constitucional.
  6. Pendiente del chat de diseño, sin bloquear el montaje: la muestra de color del Gobierno en el duelo y el tirador del deslizador.

## 2026-10-18 (diseño, Plenopedia: deslizador y duelo)

Pendientes de diseño de la bitácora de Code (entrada 2026-10-18 (9), punto 6). Referencia: docs/maquetas/maqueta-deslizador-duelo-v9.html.

- Diseño, M2 deslizador de píxel:
  - Tirador cuadrado de 28 × 28 px en tinta, sin radio ni sombra (`appearance: none` y estilo propio de thumb en WebKit y Firefox), sobre una línea de 2 px en tinta.
  - Una marca de 1 × 8 px por cada hora bajo la línea. En el eje, etiquetas solo en los extremos y en el punto medio («6 h», «11 h», «16 h»).
  - Zona táctil de 44 px de alto. El foco visible va solo en el tirador (contorno de 3 px a 3 px), no en todo el control.
  - Botones «−» y «+» cuadrados de 44 px a los lados de la cifra, con el borde de las opciones. Mueven un paso, llevan `aria-label` («Quitar 30 minutos», «Añadir 30 minutos») y no van en la barra.
  - Antes del primer movimiento, la cifra es «?» y el tirador está en el centro; «Responder» sigue apagado hasta que se mueve el tirador o se pulsa − o +.
  - Al responder, el deslizador y los botones se apagan (tinta → raya) y aparece la regla de trama, sólido y hueco ya aprobada.
- Plenopedia, pregunta 3 (decisión del autor):
  - Paso del deslizador de 30 minutos, en lugar de 15.
  - Tramos: 1 punto si el error es menor de 30 min (las dos posiciones que rodean el dato de 12 h 21 min: 12 h y 12 h 30 min); ½ punto si el error es de 1 h o menos (11 h 30 min o 13 h, a media hora de las anteriores); 0 en otro caso.
  - Sustituye a los tramos de ±30 min y ±1 h 30 min. Contenido actualizado en editorial/contenido/a03-plenopedia.md.
- Diseño, Gobierno como categoría: token nuevo `--gobierno: var(--tinta)` en `:root`. No es color de partido. Se usa en el duelo y en cualquier gráfico o ranking donde el Gobierno aparezca como categoría.
- Diseño, duelo: muestra de color de 12 px con borde de 1 px tinta junto a la afiliación de cada lado, no junto al nombre («Gobierno» con `--gobierno`, «PP» con `--pp`). En la ficha perdedora, la muestra va al 50 % de opacidad. En Plenopedia, pregunta 6, `color` de Sánchez = `--gobierno` y de Feijóo = `--pp`.
- Diseño, corrección del «+N» de los puntos: en la cabecera compacta, «Puntos» va a la izquierda de las cifras y el «+N» sale justo encima de las cifras, alineado a la derecha, y sube 6 px antes de apagarse. Nunca se superpone a la etiqueta. Vale para todos los juegos con puntos.
- Encargo para Code: aplicar estos cinco puntos en `shared/motores/estimacion.js`, `shared/motores/duelo.js`, `shared/base.css` y `juegos/a03-plenopedia/data.json`. Partida completa a 320, 375 y 1280 px; capturas revisadas contra la lista negra, commit y entrada en la bitácora.

## 2026-10-20

Decisiones del autor tomadas en sesión con Code, pasadas aquí:
- **Nombre y apellido** en toda referencia a una persona, no solo el apellido (18-10). Sustituye a la etiqueta corta «Zapatero» de A12. Los apodos de leyes de A10 («Wert», «Zerolo») se quedan como están. El contenido de A2, A10 y A12 ya está sincronizado; A4 y A13 no nombran a personas.
- A13, rosco del cierre: va encima de la nota, entre «Fin de la partida» y la cifra; la ficha de la letra tocada va debajo (20-10).
- A13: la letra actual lleva siempre borde de tinta, también cuando es una pasada (20-10).

Plenopedia, ajustes tras la confirmación de cifras de Code (18-10 (9)):
- Pregunta 4: la explicación pasa a «18 de las 90 llamadas, siete más que el segundo, Rafael Hernando», no «casi el doble». La opción de Conde Bajén es «Agustín Conde (PP)».
- Pregunta 7: la cifra con los diputados que no estuvieron toda la legislatura es 21, no 32, porque también se excluyen los 12 miembros del Gobierno que hablaron como Gobierno. Cambian el distractor y la explicación.
- Pregunta 10: «algo más de una de cada tres sesiones» (66 de 203), no «casi una de cada tres».
- Encargo para Code: regenerar el data.json de Plenopedia con estos tres cambios.
- **Preguntas de ordenar, al comprobar** (decisión del autor, 20-10): la lista se queda en el orden que dio el jugador y no se recoloca en el orden correcto. Junto a cada ítem se indica su posición real («Era el 2.º») y su casilla de acierto, medio o fallo. Hasta ahora se mostraba la solución ordenada con «Tu posición». Se aplica a la pregunta 5 de Plenopedia (`rondas.js`, tipo `ordenar`) y a A2 Cronología (`quiz.js`, variante `ordenar`). En A2 desaparece la lista recolocada con «Tu posición»; la explicación y la fuente plegadas se mantienen bajo cada hito.
- Plenopedia, nuevos enunciados (20-10):
  - pregunta 1: «¿Qué diputado habló más en los plenos de la legislatura?»;
  - pregunta 2: «Cuando toma la palabra, ¿quién levanta más murmullos en el hemiciclo?».
- **Encargo para Code (20-10):**
  1. Regenerar el data.json de Plenopedia con los enunciados de las preguntas 1 y 2 y con los ajustes de las preguntas 4, 7 y 10.
  2. Cambiar la comprobación de ordenar en Plenopedia y en A2: la lista se queda como la dejó el jugador, con la posición real («Era el 2.º») y la casilla de cada ítem.
- A13, portada (texto del autor, con un retoque mínimo): «La adaptación que nadie pidió: el rosco, pero con conceptos de ciencia política (y sin bote). ¿Podrás completarlo sin pasar palabra?». Las reglas y la fuente general están en editorial/contenido/a13-rosco-politologo.md. La regla de «Pasar» usa el icono de la maqueta v7.
- A4, portada aprobada y campo `origen` en cada promesa (A4.2), en editorial/contenido/a04-promesas-2023.md. Dos orígenes por confirmar: la moratoria de desahucios y la financiación autonómica.
- **Encargo para Code (20-10, A4 y A13):**
  1. Cotejar en el texto del acuerdo PSOE-Sumar (24-10-2023) si recoge la moratoria de desahucios y el nuevo modelo de financiación autonómica, con página y cita literal. Si no los recoge, buscar el acuerdo de origen: PSOE-ERC, PSOE-Junts u otro. Anotarlo en editorial/fuentes/a04-promesas.md; la etiqueta no se cambia sin el visto bueno del autor.
  2. Montar A4 en juegos/a04-promesas-2023/, según A4.1 a A4.3 y el contenido, con su portada.
  3. Poner en A13 la portada, las reglas y la fuente general del contenido, en sustitución de los TODO.

Decisiones del autor del 20-10 en sesión con Code, pasadas aquí:
- Ordenar (A2 y Plenopedia): «Era el N.º» solo aparece en los ítems mal colocados. Los ítems con 0 puntos llevan el aspa de fallo en su casilla de la lista resuelta. La pista de partida de la cabecera de A2 no cambia.
- A4, pregunta 9: sale la moratoria de desahucios, porque su origen no está en el ámbito de A4 (no figura en el acuerdo PSOE-Sumar; viene de un acuerdo del Gobierno con EH Bildu de diciembre de 2025). La sustituye una promesa bloqueada con origen verificado, que elige el autor.
- A4, pregunta 10: origen confirmado (acuerdo PSOE-Sumar, pág. 40). Se quita el [VERIFICAR].
- A4, fuente general: «Acuerdo PSOE-Sumar (24-10-2023), acuerdos de investidura, BOE, Diario de Sesiones del Congreso y prensa citada en cada promesa».
- A4, pregunta 9 (bloqueada): la moratoria de desahucios se sustituye por la ley abolicionista contra el proxenetismo. La toma en consideración de la proposición de ley del PSOE se rechazó el 21-05-2024, con los votos en contra de PP, Sumar, ERC, Junts, PNV y EH Bildu.
- **Encargo para Code (A4, pregunta 9):**
  1. Cotejar en el programa del PSOE de 2023 el compromiso de una ley abolicionista o contra el proxenetismo, con página y cita literal. Si psoe.es sigue bloqueado, buscar otra copia del PDF (Fundación Pablo Iglesias, Manifesto Project u otra) y anotar de dónde sale.
  2. Cotejar en el Diario de Sesiones del 21-05-2024 el resultado exacto de la votación (sí, no, abstenciones) y el sentido de voto de cada grupo.
  3. Anotar el resultado en editorial/fuentes/a04-promesas.md, completar la pregunta 9 en el data.json sustituyendo los [VERIFICAR] por el dato y regenerar A4.
  
  Si el programa no recoge la promesa, se avisa en la bitácora y no se monta.
- A4, pregunta 9, cotejada por Code (20-10):
  - Origen: programa del PSOE de 2023, pág. 153 («Desarrollaremos una ley para prohibir el proxenetismo en todas sus formas…»).
  - Votación del 21-05-2024: 184 en contra, 122 a favor y 36 abstenciones; Vox y Podemos se abstuvieron.
  - El contenido ya está al día con el data.json.
- A4, fuente general (decisión del autor, 20-10): «Acuerdo PSOE-Sumar (24-10-2023), programa electoral del PSOE de 2023, acuerdos de investidura, BOE, Diario de Sesiones del Congreso y prensa citada en cada promesa».
- **El Crispómetro sale del repo** (decisión del autor, 20-10): lo sustituye Plenopedia. Se quedan el motor M4, para A11, y llamadas_al_orden.json (VIII–XV), en reserva para A11 o para posts.
- A7, selección del autor (20-10), seis mapas provinciales:
  - partido más votado en 2023 (de categorías);
  - habitantes por escaño;
  - voto nulo (%);
  - voto a Sumar (%);
  - población nacida en el extranjero (%);
  - voto a Vox (%).
  
  Catálogo y criterios de juego, en editorial/catalogos/ y en esta misma página cuando el autor los cierre.
- **Encargo para Code (A7, datos; se puede empezar ya):**
  1. `R/01_resultados_2023_prov.R` → `data/resultados_2023_prov.json`, con los resultados de las generales del 23-07-2023 por provincia (Ministerio del Interior, infoelectoral):
     - censo (con y sin CERA), votantes, votos válidos, blancos y nulos;
     - votos de cada candidatura y partido más votado;
     - escaños de 2023.
     
     Sirve también para A9 y A11.
  2. Población por provincia (INE, padrón continuo) a 1-1-2023 y la más reciente, con los escaños de 2023 (RD 400/2023) y de 2026 (RD 806/2026), para calcular los habitantes por escaño de los dos años.
  3. Población nacida en el extranjero por provincia (INE, padrón continuo, 1-1-2023).
  4. Fuente, URL y fecha de descarga en SOURCES.md. Comprobar que los totales cuadran con el resultado nacional publicado.
- A7, criterios (20-10):
  - **Mecánica:** un mapa por ronda, sin leyenda, con cuatro etiquetas para elegir (la correcta y tres del mismo juego, con el mapa más parecido entre ellas). Seis rondas con el encadenador.
  - **Partido más votado:** sale y entra la **abstención** (%). Los seis mapas son abstención, habitantes por escaño, voto nulo, voto a Sumar, población nacida en el extranjero y voto a Vox.
  - **Habitantes por escaño:** con los escaños de 2026 (RD 806/2026) y la población más reciente del INE.
  - **Escala:** cinco tramos con cortes propios en cada mapa. Los colores los decide el chat de diseño.
  - **Abstención:** sobre el censo de residentes en España, sin el voto exterior (CERA). Confirmado por el autor el 20-10.
- A6, enfoque: producción legislativa y control al Gobierno comparados entre legislaturas, sin repetir lo que ya cubre Plenopedia (el Pleno de la XV).
- A6, selección del autor (20-10), seis métricas:
  1. leyes aprobadas por año de legislatura;
  2. peso de los decretos-ley sobre el total de normas con rango de ley;
  3. proposiciones de ley presentadas por grupo;
  4. proposiciones de ley que llegaron a ser ley, por grupo;
  5. preguntas orales al presidente del Gobierno en el Pleno, por legislatura;
  6. comparecencias de ministros, por legislatura.
- A6, propuesta de Cowork pendiente de confirmar por el autor:
  - **Rango:** las mismas legislaturas que el análisis de llamadas al orden, es decir, VIII, IX, X, XII, XIV y XV, las que tuvieron investidura.
  - **Por grupo:** las métricas 3 y 4 solo en la XV, normalizadas por diputado.
- **Encargo para Code (A6, viabilidad; sin montar el juego):** comprobar en los datos abiertos del Congreso, y en el BOE para las leyes y los decretos-ley, si las seis métricas se pueden sacar de forma fiable para ese rango. Para cada una:
  - fuente y URL;
  - si el formato es estable entre legislaturas;
  - cifras por legislatura (o por grupo en la XV);
  - límites, por ejemplo cómo se cuentan las comparecencias en comisión frente al Pleno, o las proposiciones conjuntas de varios grupos.
  
  Salida en editorial/fuentes/a06-viabilidad.md y resumen en la bitácora. Va después del encargo de datos de A7.
- A8, selección del autor (20-10): cuatro partidos (PP, PSOE, Vox y Sumar) y tres segmentaciones (edad, sexo y hábitat).
- **Encargo para Code (A8, datos; va después de A7 y de la viabilidad de A6):**
  1. Localizar el estudio postelectoral del CIS de las generales de 2023 y descargar el microdato, con número de estudio, URL y fecha.
  2. Calcular, con la ponderación del estudio, el voto declarado a PP, PSOE, Vox y Sumar sobre el voto válido declarado, es decir, sin abstención, blanco, nulo ni NS/NC, por:
     - edad, en los tramos del propio CIS;
     - sexo;
     - tamaño de hábitat, en los tramos del propio CIS.
  3. Para cada celda, el porcentaje, la n sin ponderar y el intervalo de confianza al 95 %. Marcar las celdas con n < 100.
  4. Para comparar, el resultado real de 2023 sobre voto válido.
  
  Salida en data/cis_postelectoral_2023.json, con el detalle en editorial/fuentes/a08-cis.md. No se monta el juego.
- A8, mecánica (20-10): entre seis y ocho estimaciones sueltas con el motor M2, cada una sobre una celda de partido y segmento elegida por lo que sorprende. La selección se hará sobre un catálogo de celdas con el dato y la n, cuando Code tenga las cifras. Las celdas con n < 100 quedan fuera.

## 2026-10-20 (diseño, A7 ¿Qué mapa es este?)

Aprobado por el autor. Referencia: docs/maquetas/maqueta-mapas-v10.html (variante A).

- Diseño, A7, escala de color:
  - Una sola escala neutra para los seis mapas, «del sepia a la tinta», con cinco tramos como tokens en `:root`: `--m0: #f3ebdc`, `--m1: #dcc7a1` (senado), `--m2: #ab9472`, `--m3: #615341`, `--m4: #000000`.
  - Nunca colores de partido, tampoco en los mapas de voto a Vox o a Sumar: el color no puede dar la respuesta.
  - Excepción aprobada: senado entra en un gráfico porque en A7 no hay colores de partido.
- Diseño, A7, mapa:
  - SVG provincial con proyección cónica conforme (d3-geo, `geoConicConformal().rotate([3.5,0]).parallels([37,43])`), ajustado al ancho de la columna con la península, Baleares, Ceuta y Melilla. Sin Gibraltar, Portugal, Francia ni mar.
  - Canarias, con su propia proyección, en un recuadro abajo a la izquierda, por debajo de Huelva, Cádiz y Ceuta y sin solaparse con la península. El recuadro lleva una escuadra raya de 1 px en sus lados superior y derecho. Con 343 px de ancho, el mapa mide unos 343 × 334 px.
  - Geometría de referencia: es-atlas (provincias del IGN, `provinces.json`), con la fuente citada en data/SOURCES.md. Los recortes se generan una vez y se guardan como datos, no en el navegador.
  - Provincias rellenas con su tramo y separadas por un trazo de papel de 0,6 px, sin contorno exterior.
  - Ceuta y Melilla llevan además una casilla de 8 × 8 px con su tramo y borde de 1 px tinta, centrada en su posición.
- Diseño, A7, ronda:
  - Mientras se juega:
    - etiqueta «Ronda N de 6. ¿Qué muestra este mapa?»;
    - mapa sin título ni leyenda, ajustado en alto para que las cuatro opciones quepan sin scroll en 375 × 560 (unos 216 px de alto; nunca menos de 200 px) y centrado;
    - opciones en una rejilla de 2 × 2, de 52 px de alto como mínimo y texto a 0,9375 rem en 800. Tocar elige y «Responder» confirma.
    - El mapa no reacciona al toque.
  - Al resolver:
    - el mapa recupera el ancho completo;
    - encima van el título real (1.125 rem, 800, por ejemplo «Voto nulo (% de votantes), 2023») y la leyenda de cinco casillas con sus cortes debajo (0,6875 rem, lápiz);
    - las opciones se marcan como en el resto de la serie (acierto en marcador, fallo tachado);
    - debajo, explicación de dos frases y fuente.
  - Tras resolver, tocar una provincia la marca con contorno de 2 px tinta y escribe su nombre y su valor en una franja fija bajo la leyenda (borde superior tinta e inferior raya). Una sola provincia marcada a la vez.
  - Pista de seis celdas y recibo 🟨⬜, como en el resto de la serie.
- Encargo para Code: montar A7 con estas reglas cuando estén los datos (encargo del 20-10) y el contenido (títulos, cortes de los cinco tramos de cada mapa, distractores y explicaciones, de Cowork editorial). Captura a 320, 375 × 560 y 1280, revisión contra la lista negra, commit y entrada en la bitácora.
- A5, criterios del autor (20-10):
  - **Escaños:** por candidatura en las elecciones generales (Ministerio del Interior), con el nombre de la época. Las candidaturas con menos de cinco escaños se agrupan en «Otros».
  - **Rondas:** cuatro, una por etapa: 1982 (mayoría absoluta del PSOE), 2000 (mayoría absoluta del PP), 2015 (fin del bipartidismo) y 2023.
- **Encargo para el chat de diseño (A5):** definir cómo reparte el jugador los 350 escaños en el móvil y cómo se compara su reparto con el real. Incluye:
  - el control por partido (deslizador, campo numérico u otro);
  - el contador de escaños por asignar;
  - el dibujo del hemiciclo en SVG;
  - la superposición de la respuesta (trama) y el dato real (sólido), según la decisión de diseño del 15-10;
  - los colores de las candidaturas históricas (UCD, AP, CDS, IU, CiU, Podemos, Ciudadanos…), sacados de la paleta de Wikipedia que ya se usa;
  - el aspecto de la puntuación (error medio por partido).
  
  La puntuación concreta, es decir, cuánto error vale cada punto, la decide el autor con Cowork después de ver la propuesta.
- **Encargo para Code (A5, datos; puede ir en paralelo a diseño):** `R/02_legislaturas.R` o un script nuevo → escaños por candidatura en las generales de 1982, 2000, 2015 y 2023 (Ministerio del Interior, infoelectoral), con nombre de la candidatura, siglas, escaños y votos, y las de menos de cinco escaños agrupadas en «Otros». Fuente en SOURCES.md; los totales tienen que sumar 350 en cada año.

## 2026-10-20 (diseño, pendientes del chat de diseño)

Aprobado por el autor. Referencia: docs/maquetas/maqueta-pendientes-v11.html.

- Diseño, cabecera con pistas largas (duda de la bitácora):
  - Cuando la pista tiene más de seis rondas, las celdas bajan a 18 px con 2 px de separación (tic y aspa a escala 1,6) y los puntos pasan a cifras de casillas de escala 2, con «Puntos» a 0,75 rem.
  - Desde 360 px de ancho cabe todo en una fila. Por debajo, los puntos bajan a una segunda línea, alineados a la derecha.
  - Con seis rondas o menos, no cambia nada (celdas de 22 px y escala 3).
- Diseño, fichas a 320 px (A10, A12): `--ficha: clamp(13px, 3.75vw, 0.875rem)`, con un suelo de 13 px. Si una palabra no cabe, `hyphens: auto` (el documento ya lleva `lang="es"`).
- Diseño, índice en escritorio: la rejilla de días tiene un ancho máximo de 26 rem (416 px), con casillas de unos 78 px y cifras a escala 3, alineada a la izquierda con la columna. Las cifras no se agrandan.
- Diseño, A10, recibo en Windows: se mantiene 🟨🟫🟧⬛. Las alternativas a 🟧 (🟥, 🟪) llevan color de partido.
- Diseño, A5 Hemiciclos (respuesta al encargo del 20-10):
  - **Hemiciclo:**
    - SVG de 350 casillas cuadradas en 10 filas de semicírculo, repartidas por fila en proporción al radio y ordenadas por ángulo de izquierda a derecha.
    - Mientras se reparte va fijo arriba (sticky), con unos 132 px de alto en móvil y la cabecera compacta encima.
    - Asientos sin asignar: papel con borde raya de 0,6 px.
  - **Reparto del jugador:** trama al 50 % del color de cada candidatura (patrón SVG de 2×2), que se actualiza con cada cambio.
  - **Orden:** las candidaturas se listan y se sientan por orden alfabético de siglas, con «Otros» al final, en la lista y en el hemiciclo.
  - **Fila de la lista:**
    - muestra de 14 px con borde tinta;
    - siglas en 800 y el nombre de la época debajo, a 0,75 rem en lápiz;
    - botón «−» de 44 px, campo numérico de 64 × 44 px (`inputmode="numeric"`, cifra centrada en 800 y tabular) y botón «+» de 44 px. Los botones mueven de uno en uno y repiten al mantenerlos pulsados.
    - Todo empieza en 0.
  - **Barra:**
    - a la izquierda, «Quedan» con las cifras de casillas a escala 3;
    - a la derecha, «Comprobar», apagado mientras no queden 0;
    - si el jugador se pasa, el contador dice «Sobran N» y «Comprobar» sigue apagado.
  - **Al comprobar:**
    - el hemiciclo pasa de trama a sólido con el reparto real, de izquierda a derecha en una sola pasada (600 ms, por pasos; sin animación con prefers-reduced-motion);
    - cada fila sustituye los controles por dos barras finas (tu reparto en trama y el real en sólido), los escaños reales en 800 y la diferencia («+7», «−4», «=»);
    - encima del hemiciclo, el error medio por candidatura en cifras de casillas a escala 4, seguido de «escaños de error medio».
  - **Puntuación por ronda:** la pista de cuatro celdas sigue la regla de llena, media o vacía. Los umbrales de error los deciden el autor y Cowork.
  - **Colores históricos:** se añaden a `:root` desde la misma plantilla de Wikipedia y la misma revisión que los actuales (UCD ya está; faltan AP, CDS, IU, CiU, Podemos, Ciudadanos y las que salgan con cinco o más escaños en 1982, 2000 y 2015), citados en SOURCES.md. «Otros» va en raya. Si dos candidaturas de una misma ronda tienen colores casi iguales, Code lo anota en la bitácora antes de montar.
- Encargo para Code:
  - Aplicar la cabecera con pistas largas, el suelo de las fichas y el ancho del índice en `shared/base.css`.
  - Montar A5 con estas reglas cuando estén los datos (encargo del 20-10) y los umbrales de puntuación.
  - Captura a 320, 375 × 560 y 1280; revisión contra la lista negra; commit y entrada en la bitácora.

## 2026-10-20 (dudas de la bitácora del 20-10, entrada 6)

- A7, Vox en Santa Cruz de Tenerife: no se presentó. El mapa la pinta como «sin candidatura» (sin dato), nunca como 0 %, y la explicación lo dice.
- A7, nacidos en el extranjero: el denominador es el total del propio padrón. La población es la de 1-1-2025, la misma cifra oficial que fija el reparto de escaños de 2026.
- A5, 2015: En Comú Podem (12), Compromís-Podemos (9) y En Marea (6) se agrupan con Podemos (42) en una sola fila, «Podemos y confluencias» (69). La nota da el desglose 42 + 12 + 9 + 6.
- A5, nombres de época: los fija Cowork en el contenido.
- A6, métrica 2: los reales decretos legislativos quedan fuera. El ratio es decretos-ley / (leyes + decretos-ley).
- A6, métrica 6: las comparecencias cuentan Pleno y Comisión juntos, y la explicación lo aclara.
- A6, rango: legislaturas VIII, IX, X, XII, XIV y XV. La XI y la XIII se excluyen por cortas. Las métricas 3 y 4 solo en la XV, por diputado.
- Pendiente: A8, cómo tratar la desviación del recuerdo de voto del CIS frente al resultado real.
- Encargo para Code:
  - A7: en `data/` y en el juego, Vox en Santa Cruz de Tenerife como NA (sin candidatura), no como 0.
  - A5: fusionar las confluencias de 2015 con Podemos en una sola candidatura («Podemos y confluencias», 69) y conservar el desglose en el JSON para la nota.
  - A6: recalcular la métrica 2 sin reales decretos legislativos y la 6 con Pleno y Comisión juntos, en el rango VIII, IX, X, XII, XIV y XV.
  - CLAUDE.md: añadir `R/09_escanos_generales.R` y `R/infoelectoral.R` al esquema de `R/`.
- Encargo para el chat de diseño: a 375 px, la cabecera de A2 se queda 1 px corta.
- A8, fuente (20-10): se sustituye el postelectoral del CIS (3420) por el barómetro de 40dB, que se desvía menos del resultado real. Quedan por fijar la oleada y el formato de la publicación; el criterio de fuente pública y fechada se mantiene.
- A8, oleada (20-10): el primer barómetro de 40dB posterior al 23-J. Candidato: septiembre de 2023 (https://ep00.epimg.net/infografias/encuestas40db/2023Sept/2023_09_informe.pdf); Code confirma que no hubo otra oleada entre el 24-07 y esa fecha. El planteamiento (porcentaje por segmento con nota, o composición del electorado de cada partido) se decide al ver el análisis de Code.
- Encargo para Code (A8): comprobar que las tablas publicadas de esa oleada traen el recuerdo de voto 2023 cruzado por edad, sexo y hábitat, con la n de cada segmento. Medir la desviación del recuerdo frente al resultado real sobre la misma base que en el CIS. Aplicar la regla n ≥ 100. El script del CIS y su JSON se conservan como respaldo.

## 2026-10-21

- **A8 Demografía del voto sale de la serie.** El informe publicado del barómetro de 40dB de septiembre de 2023 no trae cruces por edad, sexo ni hábitat (bitácora 20-10 (7)), y el autor opta por sustituir el juego. Queda sin efecto el encargo de A8 del 20-10. `R/06_cis_postelectoral.R`, `data/cis_postelectoral_2023.json` y `editorial/fuentes/a08-*.md` se conservan en reserva.
- «Qué sonaba cuando» (adivinar el número 1 de las listas el día de un suceso político) no entra: la única serie pública y homogénea (PROMUSICAE en elportaldemusica.es) empieza en 2009, y solo mide lo mismo desde 2015. El autor quiere un alcance temporal más largo.
- **Nuevo A8: «Los que nunca votas» (nombre provisional).** Juego sobre las candidaturas minoritarias de las generales del 23-07-2023 y sus votos. Fuente: Ministerio del Interior, ya en `data/resultados_2023_prov.json` (59 candidaturas de acumulación nacional, 48 sin escaño, de 169.237 votos de PACMA a 115 de Fuerza Cívica). Mecánica, catálogo y nombre, pendientes.
- **Reserva:** entra «Lemas de campaña» (emparejar el lema con su partido y su año, generales de 1977 a 2023; fuentes: archivos de fundaciones de partido y hemeroteca; coste medio). Es el primer suplente si cae otro juego.
- Serie: no abusar del quiz clásico (pregunta y cuatro opciones). Se estudia una mecánica de emparejar; la variante está pendiente de decidir.
- **Encargo para Code:**
  - No seguir con el encargo de A8 del 20-10 (tablas de 40dB).
  - Actualizar `CLAUDE.md`: ficha de A8 provisional («Los que nunca votas», datos de `resultados_2023_prov.json`, mecánica pendiente) y `cis_postelectoral_2023.json` en reserva en la tabla de datos.
  - No crear todavía la carpeta del juego: el nombre no está fijado.
- **A8, mecánica (decisión del autor, 21-10): mixta.** Rondas de emparejar candidatura con votos y un duelo final, con el encadenador (`rondas.js`), una sola puntuación y un solo cierre. El duelo final enfrenta a una candidatura sin escaño con otra que lo tiene y sacó menos votos (gancho: PACMA, 169.237 votos y 0 escaños, frente a BNG, CC o UPN, con un escaño cada uno).
- **Motor nuevo M10 emparejar** (la variante «columnas» que se estudiaba):
  - una columna fija de ítems (aquí, candidaturas) y otra barajada de respuestas (aquí, cifras de votos) con una respuesta de más, la trampa, para que la última pareja no salga por descarte;
  - el jugador forma todas las parejas y se corrige al final, con 1 punto por pareja acertada;
  - la trampa es siempre un dato real de otro ítem del catálogo que no juega en esa ronda, nunca una cifra inventada; la explicación dice de quién es;
  - se diseña para reutilizarse (candidatos de B1, A9 y «Lemas de campaña» si entra).
- Catálogo de A8 en editorial/catalogos/a08-nunca-votas-catalogo.md (48 candidaturas sin escaño y 4 duelos posibles). Estructura propuesta, pendiente del autor: dos rondas de 4 candidaturas + 1 trampa y el duelo, 9 puntos.
- **Encargo para el chat de diseño (M10):** cómo se forma una pareja en el móvil a 375 × 560 (tocar ítem y tocar respuesta, o arrastrar como extra), cómo se ve una pareja hecha y cómo se deshace, la pista de partida y el aspecto de la corrección (acierto, fallo con la respuesta correcta, y la trampa al descubierto).
- **Encargo para Code:** montar M10 cuando llegue el diseño; no depende del contenido. Entra en la entrega del 9-nov con A8.
- **A8, candidatura inventada (decisión del autor, 21-10):** cada ronda de emparejar incluye, además de las reales, una candidatura que no existe, con nombre inventado en la línea de las reales, con algo de gracia pero creíble. Primero se observa la tónica de los nombres reales (hecho, en el catálogo de A8) y después se proponen nombres para que elija el autor. Encaje con la cifra trampa y puntuación, pendientes.
- **A8 y M10, trampa (decisión del autor, 21-10):** la candidatura inventada sustituye a la cifra trampa. Cada ronda tiene 5 candidaturas (4 reales y 1 inventada) y 5 respuestas: las 4 cifras reales y una tarjeta «No existe». Emparejar la inventada con «No existe» es una pareja más. Ronda de 5 puntos; con dos rondas y el duelo, 11 puntos. Sustituye a la regla de la cifra trampa anotada hoy: en A8 ninguna cifra es inventada.
- M10 admite, por configuración, una respuesta especial sin dato («No existe»). La candidatura inventada se dice de forma explícita al resolver y en el recibo.
- Toda candidatura inventada se comprueba antes en el Registro de Partidos Políticos del Ministerio del Interior: no puede coincidir con un partido inscrito, ni en nombre ni en siglas.
- **Encargo para el chat de diseño (M10, añadido):** aspecto de la tarjeta «No existe» y de la candidatura inventada al descubierto.
- **A8, selección del autor (21-10)** sobre editorial/catalogos/a08-nunca-votas-catalogo.md: candidaturas 18 (Caminando Juntos, 5.620), 22 (Partido Humanista, 2.902), 28 (Por Mi Región, 1.698), 30 (Partido Autónomos, 1.446), 39 (Tercera Edad en Acción, 484), 44 (Libres, 263), 46 (Referéndum Sistema Dinero, 165) y 48 (Fuerza Cívica, 115). Duelo final: D3, PACMA (169.237 votos, 0 escaños) frente a UPN (52.188 votos, 1 escaño). Reparto en rondas e inventadas, pendientes.
- **A8, candidaturas inventadas (decisión del autor, 21-10):** I4, «Por Mi Comarca y la de al Lado» (PMC+), e I8, «Horario Europeo Ya» (HEY). Sin suplentes por ahora. (Corregido el mismo 21-10: el autor había anotado por error I14 e I18.)
- **A8: cada candidatura muestra las provincias en las que se presentó** (decisión del autor, 21-10). Las provincias de las inventadas son parte de la ficción y se desvelan al resolver.
- Borrador de contenido de A8 en editorial/contenido/a08-fondo-de-la-urna.md, pendiente del visto bueno del autor: reparto en rondas, provincias de las inventadas, portada, explicaciones, duelo y nombre.
- **Encargo para Code (A8, comprobación de las inventadas):** consultar el Registro de Partidos Políticos del Ministerio del Interior (https://servicio.mir.es/nfrontal/webpartido_politico.html o sede.interior.gob.es; Cowork no ha podido acceder) por denominación y por siglas: «Por Mi Comarca y la de al Lado», PMC, PMC+, «Horario Europeo Ya» y HEY, y por las cadenas «Por Mi Comarca», «Horario Europeo» y «Horario Europeo Ya». Anotar coincidencias exactas o cercanas en editorial/fuentes/a08-inventadas.md. Las agrupaciones de electores no se inscriben en el Registro: cuando se publiquen en el BOE las candidaturas proclamadas para el 29-N, repetir la búsqueda en ellas. No se monta A8 hasta que las dos estén limpias.
- **A8 se llama «El fondo de la urna»** (decisión del autor, 21-10). Sustituye al provisional «Los que nunca votas» en el título, la portada, el recibo y el índice. Carpeta propuesta: `juegos/a08-fondo-de-la-urna/`.
- A8: el autor confirma el reparto en rondas (I4 en la ronda 1 con Albacete y Cuenca; I8 en la ronda 2 con Barcelona, Madrid, Málaga, Sevilla, Valencia y Zaragoza) y aprueba los textos de editorial/contenido/a08-fondo-de-la-urna.md: portada, explicaciones, textos de las inventadas y duelo.
- **Encargo para Code (A8):**
  1. Actualizar `CLAUDE.md` con A8 «El fondo de la urna» (M10 emparejar + duelo con el encadenador; datos de `resultados_2023_prov.json`) y M10 en la tabla de motores.
  2. Comprobar las dos inventadas en el Registro de Partidos (encargo anterior de hoy).
  3. Montar A8 desde el contenido cuando estén el diseño de M10 y la comprobación; las provincias y los votos de las candidaturas reales se leen de `resultados_2023_prov.json` y se cotejan con el contenido.

## 2026-10-21 (diseño, M10 emparejar)

Respuesta a los encargos de diseño del 21-10 (M10 y añadido), aprobada por el autor. Referencia: docs/maquetas/maqueta-emparejar-v12.html.

- Diseño, M10, disposición a 375 × 560 (todo cabe sin scroll):
  - Cabecera compacta con la pista larga (ver abajo).
  - Enunciado en una línea: «Ronda N de 3.» en etiqueta y el texto del enunciado en 1 rem y 800.
  - **Filas de ítem:** una por candidatura, separadas 4 px, con borde de 1 px tinta y alto mínimo de 48 px. Rejilla de dos columnas: `1fr` y 88 px.
    - Nombre en 0,875 rem y 800.
    - Debajo, las provincias en 0,75 rem y lápiz: hasta tres se nombran; desde cuatro, «N provincias», y la lista completa va en la explicación.
    - A la derecha, el hueco: 88 × 38 px, borde discontinuo de 1 px raya y «?» en raya.
  - **Bandeja:** las cinco respuestas como fichas en una rejilla de cinco columnas iguales (6 px de separación, 48 px de alto), dentro de la barra fija, justo encima del botón principal. Siempre visible.
  - **Fichas:** cifras en Archivo 800 tabular con punto de miles («5.620»), no en cifras de casillas.
  - **Tamaño fijo de las fichas:** todas miden lo mismo. En la bandeja, una quinta parte del ancho; en el hueco, 88 × 38 px, igual que el hueco vacío, tanto con cifra como con «No existe». Nunca se ajustan al texto.
  - **Orden:** ítems en orden alfabético; respuestas de mayor a menor y «No existe» al final.
- Diseño, M10, interacción:
  - **Formar una pareja:** tocar una fila (borde de 3 px) y después una ficha (se invierte), o al revés. La ficha salta al hueco y en la bandeja deja su sitio vacío con borde discontinuo raya, para que nada se recoloque.
  - **Deshacer:** tocar una ficha colocada la devuelve a su sitio. Elegir una ficha para una fila ya ocupada sustituye a la anterior, que vuelve sola a la bandeja.
  - En escritorio, arrastrar una ficha al hueco es un extra, nunca obligatorio.
  - El botón principal dice «Empareja las 5 (N de 5)», apagado, hasta completar las cinco parejas; entonces pasa a «Comprobar». Se corrige todo al final.
- Diseño, M10, corrección:
  - Pareja acertada: ficha en marcador.
  - Pareja fallada: ficha tachada, en lápiz y con borde raya; debajo, alineado a la derecha, «Era: 484» o «Era: no existe» (0,75 rem, 800, tinta).
  - Las filas no cambian de tamaño al corregir.
- Diseño, M10, «No existe» y candidatura inventada:
  - La ficha «No existe» lleva delante el icono «nula» de 10×10 (escala 1,4 en la bandeja y 1,2 en el hueco). En la bandeja su texto va a 0,8125 rem y en el hueco a 0,75 rem, para que quepa en una línea.
  - Al corregir, la fila de la candidatura inventada pasa a borde discontinuo de 1 px tinta, con el icono «nula» delante del nombre y, bajo las provincias, la línea «Candidatura inventada. Sus provincias, también.» (0,75 rem, tinta). El texto exacto de la línea puede venir del contenido.
- Diseño, pista y recibo de A8:
  - Pista de 11 celdas en tres tramos (5, 5 y 1: dos rondas y el duelo), con la cabecera de pistas largas (celdas de 18 px).
  - Al resolver una ronda se rellenan de golpe sus cinco celdas.
  - Separación entre tramos de 8 px. Se aplica también a Cronología (duda de la bitácora del 20-10 (6)).
  - Recibo: 🟨⬜ en tres líneas (5 + 5 + 1).
- Encargo para Code: montar M10 en `shared/motores/emparejar.js` con estas reglas (ronda para el encadenador `rondas.js`, respuesta especial «No existe» por configuración) y ajustar la separación entre tramos en `base.css`. Captura a 320, 375 × 560 y 1280, revisión contra la lista negra, commit y entrada en la bitácora.
- Aviso para editorial: en editorial/contenido/a08-fondo-de-la-urna.md, a la tabla de la ronda 1 le falta la fila de Caminando Juntos (10 provincias, 5.620 votos), que sí está en las respuestas y en la explicación.

## 2026-10-21 (tarde, tras la bitácora del 21-10 y el diseño de M10)

- **A8, Registro de Partidos:** el autor ha comprobado a mano en el buscador del Registro (21-10) que «Por Mi Comarca y la de al Lado» (PMC+) y «Horario Europeo Ya» (HEY) no existen. Las inventadas quedan limpias. Code deja la descarga del listado completo y anota en editorial/fuentes/a08-inventadas.md la comprobación del autor y sus cinco búsquedas con 0 resultados. Sigue pendiente repetirla en las candidaturas proclamadas para el 29-N cuando se publiquen en el BOE.
- **A8, contenido corregido** (aviso del chat de diseño y duda de la bitácora del 21-10): a la tabla de la ronda 1 le faltaba la fila de Caminando Juntos por un error de Cowork al cambiar las inventadas. Repuesta como «Caminando Juntos (CJ)», 10 provincias, 5.620 votos. En pantalla, todas las candidaturas con siglas entre paréntesis salvo las que no las tienen distintas del nombre.
- A8, adaptación del contenido al diseño de M10: desde cuatro provincias se muestra «N provincias» y la lista completa va en la explicación (Caminando Juntos y Horario Europeo Ya; la de esta última, inventada). La fila de la inventada usa al corregir la línea del diseño, «Candidatura inventada. Sus provincias, también.», y el texto «La inventada» de cada ronda va en la explicación, tras las dos frases.
- A7, método A de cortes: la discrepancia de quintiles con R (tipo 7) se debe al cálculo de Cowork, no a los datos. Si el autor elige el método A, valen los de R. El método B (recomendado) no cambia.
- **Encargo para Code:**
  1. Montar M10 en `shared/motores/emparejar.js` según el diseño del 21-10 (maqueta v12) y la separación de 8 px entre tramos en `base.css`; muestra el diff de `shared/`.
  2. Montar A8 en `juegos/a08-fondo-de-la-urna/` desde editorial/contenido/a08-fondo-de-la-urna.md, cotejando votos y provincias con `resultados_2023_prov.json`.
  3. Escribir editorial/fuentes/a08-inventadas.md (punto anterior).
  4. `CLAUDE.md`, fichas y tablas:
     - **A3 Plenopedia** (medio en datos). Diez preguntas sobre el Pleno de la XV (203 sesiones, 2023–2026) con mecánicas mezcladas en el encadenador: opción múltiple, ordenar, estimación (M2) y duelo. Indicadores del Diario de Sesiones: palabras por diputado, rumores, aplausos y risas por cada 10.000 palabras, llamadas al orden, duración y hora de cierre de las sesiones, minutos de silencio y léxico. El Gobierno cuenta como categoría propia. Primer juego de la serie (13-N). Cierre: puntos sobre 10. Sustituye al Crispómetro (20-10).
     - **A7 ¿Qué mapa es este?** (medio). Seis mapas provinciales sin leyenda (abstención, habitantes por escaño, voto nulo, voto a Sumar, nacidos en el extranjero y voto a Vox), con cuatro etiquetas por mapa; ronda de tipo mapa en el encadenador y geometría de `mapa_provincias.json`. Cierre: aciertos sobre 6.
     - Tabla de motores: M3 solo para A5 y A6; M4 solo para A11 (A3 ya no lo usa); el encadenador (`rondas.js`) para A3, A7 y A8.
     - Tabla de datos: fuera `renta_prov.json` (A7 ya no tiene mapa de renta).
- **A7, cortes (decisión del autor, 21-10): método B,** cortes redondos cerca de los quintiles, con la tabla de editorial/contenido/a07-que-mapa-es-este.md. Solo se redondean los cortes, nunca los datos. Un valor igual al corte va al tramo superior.
- **A7, distractores (decisión del autor, 21-10; sustituye a «tres del mismo juego» del 20-10):** un mapa ya resuelto no vuelve como opción; los distractores salen de los mapas aún no jugados y de siete señuelos (voto al PP, voto al PSOE, voto en blanco, electores en el extranjero, población, crecimiento de la población 2023-2025 y voto a PACMA), variables reales de los mismos datos cuyo mapa no se enseña; siempre los tres más parecidos por Spearman, excluidos los casi idénticos (ρ > 0,9); cada señuelo, como mucho tres veces. Opciones de cada ronda en el contenido.
- A7, orden de rondas (decisión del autor, 21-10): Vox, nacidos en el extranjero, abstención, habitantes por escaño, Sumar y voto nulo.
- A7, portada (texto del autor, 21-10, unido en dos frases y con «adivina» corregido): «El verdadero mapa político de España es el de la geografía electoral: seis mapas sin título ni leyenda para poner a prueba tu instinto. Mira dónde se oscurece y adivina qué cuenta cada uno.» Explicaciones y reglas, aprobadas. Contenido completo en editorial/contenido/a07-que-mapa-es-este.md.
- **Encargo para Code (A7):** montar A7 en `juegos/a07-que-mapa-es-este/` desde el contenido, con el diseño del 20-10 (maqueta v10), los cortes del método B y la geometría de `mapa_provincias.json`. La ronda de tipo mapa en el encadenador es un cambio en `shared/`: diff para el autor antes del commit. Cotejar los cortes y las provincias por tramo con el contenido, y las correlaciones de los distractores con el JSON; las discrepancias, a la bitácora.

## 2026-10-21 (diseño, duelo con «VS»)

Aprobado por el autor. Se aplica a todos los duelos (Plenopedia, pregunta 6, y duelo final de A8). Referencia: docs/maquetas/maqueta-duelo-vs-v13.html.

- Diseño, duelo:
  - Las dos fichas van en `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)` con 8 px de separación: miden siempre lo mismo y el «VS» queda en el centro exacto, sea cual sea la cifra.
  - La ficha derecha alinea su texto a la derecha, en espejo con la izquierda.
  - Alto mínimo de ficha: 136 px.
  - Las cifras de más de cinco caracteres («169.237») van en cifras de casillas a escala 2; el resto, a escala 3.
- Diseño, «VS»:
  - V y S dibujadas en la rejilla de 5×7 de las cifras de casillas (matrices en la maqueta), a escala 2, en papel sobre un cuadrado de tinta de 44 × 44 px.
  - Centrado en horizontal entre las dos fichas y en vertical sobre su centro, con un contorno de 4 px de papel.
  - Es decorativo: `aria-hidden`.
- Diseño, barras de energía:
  - Encima de cada ficha, diez segmentos de 10 px de alto con 2 px de separación, en espejo: crecen desde el centro hacia fuera.
  - Antes de responder, todos vacíos con borde raya.
  - Al resolver, segmentos en tinta en proporción al dato: el ganador, 10; el otro, `round(10 × valor / valor del ganador)`.
  - El llenado avanza un segmento cada 40 ms, de dentro afuera.
  - Siempre en tinta: el color de partido sigue solo en la muestra junto a la afiliación.
- Diseño, entrada:
  - Al llegar al duelo (después de pulsar «Siguiente»), las fichas entran desde los lados (40 px, 280 ms, `steps(4)`) y el «VS» cae en el centro (360 ms, `steps(3)`, 200 ms de retardo).
  - Una sola vez por duelo.
  - Con prefers-reduced-motion no hay entrada ni llenado animado: todo aparece en su estado final.
- Diseño, etiqueta: «Duelo» en Plenopedia y «Duelo final» en A8, en lugar de «Pregunta N de 10». La pista sigue marcando el avance.
- Encargo para Code: aplicarlo en `shared/motores/duelo.js` y `shared/base.css`, y volver a probar Plenopedia y, cuando esté montado, A8. Captura a 320, 375 × 560 y 1280, revisión contra la lista negra, commit y entrada en la bitácora.
- **A8, dudas de la bitácora del 21-10 (2)** (decisiones del autor, 21-10):
  - Explicación: se acepta la lista completa de provincias como párrafo de la explicación y sin la marca «[inventado]». En la ronda 1, la lista de Caminando Juntos va justo después de las dos frases y antes del texto «La inventada»; en la ronda 2 se queda como está (la lista de Horario Europeo Ya, al final).
  - Duelo: PACMA lleva color de partido, `#00FF7F` (indicado por el autor). Si coincide con la entrada de la Plantilla:Color político (revisión 173877042), se cita la plantilla en data/SOURCES.md; si no, se anota como decisión del autor. UPN usa el `--upn` que ya existe. Pendiente de diseño solo cómo encaja en el duelo con «VS» (v13), que ya prevé la muestra junto a la afiliación.
  - Calendario: A8 va, provisionalmente, el día 5 (17-11). Aviso de Cowork: si el cara a cara del 16-11 se confirma, el 17-11 es el día de «Quién dijo qué» (B1); entonces A8 se mueve.
  - Las inventadas se vuelven a comprobar en las candidaturas proclamadas para el 29-N cuando las publique el BOE (aviso programado por Cowork).
- **Encargo para Code (A8):** reordenar la explicación de la ronda 1; añadir `--pacma: #00FF7F` a `base.css` con su fuente en SOURCES.md y poner los colores en el duelo final; día 5 provisional de A8 en `calendario.json`. Va junto con el encargo de diseño del duelo con «VS» (v13).

## 2026-10-21 (diseño, dudas de Code sobre A8)

Respuestas a las dudas de diseño de la bitácora 2026-10-21 (2), aprobadas por el autor.

- Diseño, M10, «No existe» en la bandeja: una sola forma para todos los anchos. Icono «nula» arriba, centrado (escala 1,4), y debajo «No / existe» en dos líneas, a 0,75 rem y 800, centrado, dentro de los 48 px de alto de la pieza. Sustituye a la solución actual (dos líneas a 0,8125 rem y, por debajo de 360 px, icono encima con texto a 0,6875 rem). En el hueco de la fila (88 × 38 px) sigue en una línea, con el icono a la izquierda y el texto a 0,75 rem.
- Diseño, regla de altura en móvil: «todo cabe sin scroll» se exige desde 360 px de ancho. A 320 × 560 se admite scroll del cuerpo, siempre que la barra fija (con la bandeja, en M10) quede visible. Vale para todos los juegos.
- Diseño, cifras de casillas: el punto y la coma son glifos estrechos de 2 columnas × 7 filas (punto: los dos píxeles de las dos últimas filas; coma: el píxel de la columna derecha en la fila 6 y el de la izquierda en la fila 7, o equivalente legible). La separación con las cifras vecinas es la misma que entre cifras. Vale para todas las cifras de casillas de la serie («169.237», «13,5», «01,5»…).
- Diseño, muestras de color en el duelo:
  - Si la ficha es una persona, la muestra va junto a su afiliación (Plenopedia: Sánchez con `--gobierno`, Feijóo con `--pp`).
  - Si la ficha es un partido, va junto a su nombre.
  - En A8: PACMA con `--pacma` y UPN con `--upn`.
- Color nuevo: `--pacma: #00FF7F`, dato del autor (21-10). Code lo coteja con la Plantilla:Color político de es.wikipedia en la revisión ya citada; si no coincide, lo anota en la bitácora y usa el del autor. Se cita en data/SOURCES.md.
- Encargo para Code: aplicar estos puntos en `shared/motores/emparejar.js`, `shared/motores/duelo.js`, `shared/util.js` (glifos estrechos), `shared/base.css` (token `--pacma`) y `juegos/a08-fondo-de-la-urna/data.json` (`color` de los dos lados del duelo). Volver a probar A8 y Plenopedia a 320, 375 × 560 y 1280; capturas revisadas contra la lista negra; commit y entrada en la bitácora.
- Pendiente de editorial (no es de diseño): fila de Caminando Juntos en la tabla de la ronda 1 de A8 y su nombre en pantalla (¿«Caminando Juntos (CJ)»?).
- **Cerrado el pendiente de editorial del chat de diseño (A8, ronda 1):** la fila de Caminando Juntos ya está en el contenido y en el `data.json` (montado por Code el 21-10), con el nombre en pantalla «Caminando Juntos (CJ)». Criterio: siglas entre paréntesis salvo cuando coinciden con el nombre (Por Mi Región, Fuerza Cívica, Libres, Partido Autónomos).
- A8, calendario (decisión del autor, 21-10): si se confirma el cara a cara del 16-11 y el 17-11 pasa a ser día de «Quién dijo qué», A8 se mueve al día 6 (18-11).

## 2026-10-22 (diseño, A7 montado: dudas de Code)

Respuestas a las dudas de diseño de la bitácora 2026-10-21 (3), aprobadas por el autor tras jugar A7 a 375 y 320 px. Referencia: docs/maquetas/maqueta-leyenda-a7-v14.html.

- Diseño, A7, leyenda:
  - Sustituye a la leyenda de cinco casillas con su intervalo debajo.
  - Las cinco casillas de 14 px de alto van pegadas en una sola barra a todo el ancho de la leyenda, con borde de 1 px tinta y sin separación.
  - Los cuatro cortes se escriben centrados en las fronteras entre casillas, con una marca vertical de 1 × 5 px en tinta, a 0,6875 rem, en lápiz, con cifras tabulares y sin unidad (la unidad va en el título).
  - Formato del contenido: «7,5», «105.000». Nada de «menos de», «o más» ni guiones.
- Diseño, A7, provincia sin dato:
  - Se valida lo que montó Code: papel con borde raya de 0,6 px y, al tocarla, «Sin candidatura» (o el texto que dé el contenido) en la franja.
  - Además, en los mapas con alguna provincia sin dato, la leyenda lleva a la derecha, separada 10 px de la barra, una casilla de 14 px en papel con borde raya y el rótulo «sin dato» (0,6875 rem, lápiz). En los demás mapas no aparece.
- Diseño, A7, franja: se valida tal como está.
  - Va bajo el mapa (no bajo la leyenda, como decía la decisión del 20-10, que queda corregida).
  - Antes de tocar, «Toca una provincia para ver su dato.» en lápiz a 0,875 rem.
  - Al tocar, nombre en 800 y valor a la derecha.
- Diseño, cifras de casillas, coma y punto (corrige la decisión del 21-10):
  - Coma de tres píxeles en un glifo de 2 × 7: columna derecha en las filas 5 y 6, columna izquierda en la fila 7.
  - Punto de 2 × 2 en las filas 6 y 7.
  - Vale para toda la serie.
- Encargo para Code: aplicarlo en `shared/motores/mapa.js`, `shared/util.js` y `shared/base.css`, y hacer commit de A7 con el visto bueno del autor al diff de `shared/`. Volver a probar A7, Plenopedia y A8 a 320, 375 × 560 y 1280; capturas revisadas contra la lista negra; entrada en la bitácora.

## 2026-10-22

- **A5, nombres en pantalla (decisión del autor):** «Cs» (no «C's»); «PSOE» también en 2000, con «PSOE-Progresistas» como nombre de la época; «PNV» (no «EAJ-PNV») en las cuatro rondas. Resto de siglas y nombres de época, como en editorial/contenido/a05-hemiciclos.md.
- **A5, puntuación (decisión del autor, criterio benévolo):** error medio absoluto por candidatura, «Otros» incluida. Celda llena con 4 escaños o menos; media, más de 4 y hasta 8; vacía, más de 8. Mismos umbrales en las cuatro rondas. Sustituye a la propuesta de 3 y 6 de Cowork.
- A5, portada: «Cuatro elecciones, 350 escaños en cada una y ningún ujier que te diga dónde se sienta cada diputado. Reparte el hemiciclo como lo dejaron las urnas.» Reglas y explicaciones aprobadas; contenido completo en editorial/contenido/a05-hemiciclos.md.
- **Encargo para Code (A5):**
  1. Cotejar con la serie de Interior (infoelectoral, generales de 1977 a 2023) los dos [VERIFICAR] de las explicaciones: que los 202 escaños del PSOE en 1982 son la mayoría más amplia de la democracia y que 2015 es la primera elección con cuatro candidaturas por encima de 40 escaños. Si alguno falla, a la bitácora; no se cambia el texto sin el autor.
  2. Montar A5 en `juegos/a05-hemiciclos/` con el diseño del 20-10 (maqueta v11), los colores históricos de la Plantilla:Color político y el contenido. Las colisiones de color dentro de una ronda, a la bitácora antes de montar (decisión de diseño del 20-10).

## 2026-10-24 (decisiones del autor en sesión con Code, pasadas por Cowork)

- A8, ronda 2 (22-10): el texto de la inventada queda en «Horario Europeo Ya tampoco existe: es inventada.». La explicación no cuenta cómo se creó el nombre. La ronda 1 no cambia. Contenido actualizado.
- A13 (22-10): cuando la respuesta tiene más de una palabra o es un anglicismo, la definición lo dice al final: «(Dos palabras)», «(Anglicismo)» o «(Dos palabras, anglicismo)». El anglicismo se marca en el contenido (K, Think tank, y W, Swing voter); el número de palabras sale solo. Contenido actualizado.
- Push a Pages del 22-10 (`4b088b3..1c96d92`) con confirmación del autor: A7, A8, duelo con «VS» y cambios del 21 y el 22-10.
- **Encargo para Code (M8 afinidad, entrega del 26-10):** montar el motor en `shared/motores/afinidad.js` sin esperar al contenido de A14, con datos de prueba marcados como tales. Según la ficha de A14 en docs/documento-base.md:
  - el jugador ordena ocho temas, con el mismo control de ordenar de la serie (dos botones por fila; arrastrar, solo como extra en escritorio);
  - se calcula la correlación de Spearman entre su orden y el perfil de cada partido (orden de los temas por proporción de medidas del programa);
  - cierre: «Tu agenda se parece a la de X» (saliencia, no posición), con el nombre sobre una banda de su color (decisión de diseño del 15-10) y una barra por partido con su ρ; recibo copiable;
  - todo el contenido (temas, partidos y perfiles) llega en el `data.json`; el motor no sabe de A14.
  
  Los temas, los partidos y los perfiles quedan pendientes de los programas del 29-N. Lo que necesite de diseño (barras de afinidad, empates de ρ), a la bitácora como duda para el chat de diseño.
- A11: catálogo de rondas en editorial/catalogos/a11-catalogo.md, pendiente de la selección del autor.

## 2026-10-24 (diseño, M8 afinidad)

Aprobado por el autor, como respuesta anticipada a las dudas de diseño del encargo de M8 del 24-10. Referencia: docs/maquetas/maqueta-afinidad-v15.html (valores inventados).

- Diseño, M8, partida:
  - Sin pista ni puntos: es un juego de opinión, sin respuesta correcta. La cabecera lleva solo el nombre del juego.
  - Pregunta en 1,125 rem y 800.
  - Control de ordenar de la serie (dos botones de 44 px por fila con triángulos de píxeles, fila movida en marcador un instante, arrastrar solo como extra en escritorio), con «Más importante» encima de la lista y «Menos importante» debajo, en 0,75 rem y lápiz.
  - Botón de la barra: «Ver mi afinidad».
- Diseño, M8, cierre:
  - «Fin de la partida» (etiqueta) y «Tu agenda se parece a la de…» (1,125 rem). Debajo, el partido de mayor ρ sobre una banda de su color (1,75 rem, 800), con el texto en tinta o papel según el contraste (decisión del 15-10).
  - Bajo la banda, línea fija en lápiz: «Mide qué temas pesan más en cada programa, no qué propone cada partido sobre ellos.»
  - Barras de todos los partidos, siempre, ordenadas de mayor a menor ρ. Cada fila: muestra de 12 px y siglas en 800; barra divergente de 16 px de alto en el color del partido, con el eje de 1 px tinta en 0 (hacia la derecha si ρ ≥ 0 y hacia la izquierda si es negativa, de −1 a 1); el valor con dos decimales a la derecha («0,71», «−0,31»), en 800 y tabular.
  - Bajo las barras, la escala «−1 · 0 · 1» en 0,6875 rem y la línea «1: el mismo orden que el tuyo. 0: ninguna relación. −1: el orden contrario.» en 0,8125 rem y lápiz. La palabra «Spearman» no sale en pantalla; va en la fuente.
  - Comparación: dos columnas con los ocho temas, «Tu orden» y el orden del partido de mayor ρ. Los temas en la misma posición en las dos columnas van en 800.
- Diseño, M8, empates: si dos o más partidos comparten el ρ más alto, redondeado a dos decimales, se ponen todas sus bandas, una debajo de otra, en orden alfabético, y el titular dice «Tu agenda se parece por igual a la del PP y a la del PSOE». En las barras, los empatados van en orden alfabético. La comparación de órdenes usa el primero en orden alfabético.
- Contenido para M8: cada partido trae en el `data.json` su artículo para el titular (campo `de`: «del PP», «del PSOE», «de Vox», «de Sumar»…). No se calcula.
- Diseño, M8, recibo: solo texto, sin emojis de color. «Juegos 29N, día N» / nombre del juego / «Mi agenda se parece a la de X (0,71)» / «Mis tres primeros: …» / URL. Botón «Copiar resultado» en la barra.
- Encargo para Code: aplicarlo al montar `shared/motores/afinidad.js` (encargo del 24-10), con datos de prueba marcados como tales. Captura a 320, 375 × 560 y 1280; revisión contra la lista negra; commit y entrada en la bitácora.
