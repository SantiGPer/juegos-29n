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
