# CLAUDE.md — Juegos de campaña 29N

Serie de juegos políticos sencillos, uno por cada día de campaña de las elecciones generales del 29 de noviembre de 2026 (campaña del 13 al 27 de noviembre), publicados en LinkedIn y alojados en GitHub Pages. Autor: analista cuantitativo; los juegos viven de que el dato sea riguroso y público.

## Principios innegociables

- **100 % estático.** Sin backend, sin cuentas, sin almacenar respuestas. Todo corre en el navegador. Si una idea necesita servidor, se descarta.
- **Un juego = una pantalla.** Interfaz mínima tipo Wordle / Connections / Higher or Lower. Funciona en móvil primero.
- **Todo juego termina en un cierre comparable:** puntuación (juegos de acierto/error) o afinidad con un partido (juegos de opinión). Nunca termina "en nada".
- **Una sola edición por juego.** La serie no repite juegos: cada uno se publica una vez. Rejugar solo dentro de la misma edición (p. ej., el presidente aleatorio de A12).
- **Resultado compartible:** texto copiable para LinkedIn (cuadrícula de emojis donde aplique). Imagen generada en navegador solo si sobra tiempo.
- **El dato manda.** Cada cifra sale de una fuente pública citada en `data/SOURCES.md`. Se mide a todos los grupos con el mismo método aunque el foco editorial sea uno. Nunca inventar ni redondear datos: si falta, se deja un `TODO` visible.
- **Sin fotos de agencia ni marcas ajenas.** "Wordle" es marca del NYT: cada juego lleva nombre propio.
- **Sin dependencias pesadas.** HTML + CSS + JS vanilla. Librerías solo desde CDN pinneado si son imprescindibles (p. ej. D3 para el mapa). Nada de frameworks ni bundlers.

## Estilo de código

- Minimal y directo. Nada de código defensivo, verboso o sobre-andamiado: sin validaciones de entradas que controlamos, sin abstracciones "por si acaso", sin comentarios que repitan lo que dice el código.
- JS: funciones cortas, `const`, `map/filter/reduce` antes que bucles con índices, sin clases salvo necesidad clara.
- R: tidyverse vectorizado, `purrr` antes que `for`, un script = una salida JSON. Sin `tryCatch` salvo en scraping de red.
- Un juego = una carpeta con `index.html`, `game.js`, `data.json` (o enlace a `data/`). CSS y lógica compartidos en `shared/`.
- Antes de tocar más de dos ficheros: expón el plan en tres líneas y espera confirmación. Muestra el diff de cualquier cambio en `shared/` o en un motor.
- Commit pequeño al cerrar cada tarea, con mensaje en español en imperativo: `Añade motor M4 cadena mayor/menor`.

## Estructura del repositorio

```
/
├── index.html            # índice de la serie, un enlace por juego, se va descubriendo
├── shared/
│   ├── base.css          # estilo común, modo claro/oscuro
│   ├── cierre.js         # pantalla final: puntuación/afinidad + texto copiable
│   └── motores/          # un fichero por motor (quiz.js, estimacion.js, ...)
├── juegos/
│   ├── a01-quiz-sistema-electoral/
│   ├── a02-cronologia-legislatura/
│   └── ...               # a01–a14 y b01; nombre = id + slug
├── data/
│   ├── *.json            # datos consumidos por los juegos
│   └── SOURCES.md        # fuente, URL y fecha de descarga de cada JSON
├── R/
│   ├── infoelectoral.R   # lector común de los ficheros de Interior (lo usan 01 y 09)
│   ├── 01_resultados_2023_prov.R
│   ├── 02_legislaturas.R
│   ├── 03_actividad_parlamentaria.R
│   ├── 04_diputados.R    # grupo de cada diputado de la XV por periodo
│   ├── 05_llamadas_al_orden.R
│   ├── 06_cis_postelectoral.R
│   ├── 07_programas.R    # pesos temáticos para A14
│   ├── 08_plenopedia_xv.R # indicadores del Pleno de la XV para A3
│   ├── 09_escanos_generales.R # escaños por candidatura de 1982, 2000, 2015 y 2023 para A5
│   ├── 10_mapa_provincias.R # trazados SVG de las provincias (es-atlas/IGN) para A7
│   ├── 11_mapas_a07.R    # valores por provincia de los seis mapas de A7 y sus señuelos
│   ├── 12_fontaneria_a09.R # escaños de 2023 con otras reglas (catálogo de A9)
│   ├── cotejo_a01_boe.R  # texto literal del BOE para A1 → editorial/fuentes/
│   ├── cotejo_a05_interior.R # serie de generales 1977–2023 para las explicaciones de A5 → editorial/fuentes/
│   ├── cotejo_a09_fontaneria.R # cifras del contenido y del catálogo de A9 frente al cálculo → editorial/fuentes/
│   └── cotejo_a11_datos.R # cifras y puestos de los duelos de A11 → editorial/fuentes/
├── docs/
│   ├── documento-base.md # fichas completas, calendario, reserva
│   ├── diseno.md         # reglas visuales: lista negra de estética IA y dirección inicial
│   └── diseno-plan.md    # plan de diseño aprobado antes de escribir CSS
└── editorial/            # territorio de Cowork; aquí solo lees y escribes la bitácora
    ├── decisiones.md     # decisiones del autor que te vinculan; léelo al empezar
    ├── bitacora.md       # tu resumen al cerrar cada sesión
    ├── contenido/        # borradores en markdown que conviertes a JSON
    └── posts/            # no lo tocas
```

## Diseño visual

`docs/diseno.md` manda sobre cualquier decisión estética y se lee antes de escribir una línea de CSS. Resumen de lo innegociable: sin degradados, sin glassmorphism, sin Inter/Roboto/Poppins, sin tres tarjetas en fila, sin sombras ni radios por sistema, sin eyebrows en mayúsculas, sin flechas en botones, sin fade-in al hacer scroll, sin modo oscuro por reflejo, sin emojis como iconos. Fondo blanco, texto negro, una sola fuente con carácter, un solo acento, colores de partido solo cuando codifican partido. Antes de `shared/base.css`: plan de diseño en `docs/diseno-plan.md` revisado contra la lista negra. Tras cada juego: captura en 375 px y 1280 px y revisión contra la lista antes del commit.

## Protocolo con Cowork

- Al empezar una sesión: lee `editorial/decisiones.md` (decisiones del autor que te vinculan) y las entradas nuevas de `editorial/bitacora.md`.
- El contenido de los juegos llega en `editorial/contenido/<id-juego>.md` con estructura fija; lo conviertes a `data.json` sin reescribirlo. Si falta un campo o una fuente, no lo inventas: lo anotas como duda.
- Al cerrar una sesión: añade una entrada fechada a `editorial/bitacora.md` con qué juego o motor, qué quedó hecho, qué falta y qué dudas tienes para el autor. Es el único canal por el que Cowork y el autor saben dónde estás.
- Las dudas que no sean de código (qué métrica, qué rango, qué nombre) no las decides tú: las dejas en la bitácora y sigues con lo que no dependa de ellas.

## Motores (`shared/motores/`)

| Motor | Qué hace | Juegos |
| --- | --- | --- |
| M1 quiz | N preguntas, explicación, puntuación; variantes "ordena" y "pistas progresivas" | A1, A2, A4, A12, B1 |
| M2 estimación | Deslizadores / entrada numérica; error respecto a la referencia | A3 |
| M3 gráfico | Gráfico incompleto que el usuario rellena; se superpone el real; grado de acierto | A6 |
| M4 más-o-menos | Rondas de comparar dos cifras, cadena "mayor o menor", ordenar seis ítems; racha y ranking final | Sin uso desde el 24-10 (A11 pasa a duelos del encadenador) |
| M6 agrupar | 16 ítems en 4 grupos de 4; 4 fallos; cuadrícula de colores | A10 |
| M7 atributos | Adivinar un ítem; feedback ✓/✗ y ↑↓ por atributo; autocompletado | Sin uso desde el 15-10 (A12 pasa a M1) |
| M8 afinidad | El usuario ordena ítems; Spearman con el perfil de cada partido | A14 |
| M9 rosco | Una definición por letra en círculo; respuesta escrita con variantes aceptadas; pasar y volver | A13 |
| M10 emparejar | Filas de ítems con hueco y bandeja de respuestas en la barra, con una respuesta especial sin dato («No existe») por configuración; se corrige al final, 1 punto por pareja. Es un tipo de ronda del encadenador | A8 (candidatos de B1, A9 y «Lemas de campaña» si entra) |
| Encadenador (`rondas.js`) | Rondas de mecánicas distintas (opciones, ordenar, estimación, duelo, emparejar; mapa para A7; hemiciclo para A5) con una cabecera, una pista, una puntuación y un cierre; barra de vida opcional (A11) | A3, A5, A7, A8, A9, A11 |

Cada motor expone una función `iniciar(config, contenedor)` y delega el final en `shared/cierre.js`. El contenido del juego vive en JSON, nunca en el JS del motor.

## Juegos

Orden de construcción = orden del calendario. Coste relativo entre paréntesis. Ficha completa en `docs/documento-base.md`.

**Precampaña (listos antes del 13-N)**

- **A1 Quiz del sistema electoral** (bajo). 10 preguntas: D'Hondt, barrera 3 %, circunscripciones, Senado, voto por correo, CERA. Cierre: nota sobre 10 + nivel.
- **A2 Cronología de la legislatura** (bajo). Ordenar 12-15 hitos de la XV legislatura. Cierre: posiciones correctas.
- **A3 Plenopedia** (medio en datos). Diez preguntas sobre el Pleno de la XV (203 sesiones, 2023–2026) con mecánicas mezcladas en el encadenador: opción múltiple, ordenar, estimación (M2) y duelo. Indicadores del Diario de Sesiones: palabras por diputado, rumores, aplausos y risas por cada 10.000 palabras, llamadas al orden, duración y hora de cierre de las sesiones, minutos de silencio y léxico. El Gobierno cuenta como categoría propia. Primer juego de la serie (13-N). Cierre: puntos sobre 10. Sustituye al Crispómetro (20-10).
- **A4 Promesas de 2023** (bajo-medio). Cumplida / incumplida / bloqueada, con la votación que la bloqueó documentada.
- **A5 Hemiciclos** (medio). Cuatro rondas (generales de 1982, 2000, 2015 y 2023) de ronda tipo hemiciclo en el encadenador: el usuario reparte 350 escaños entre las candidaturas con cinco o más, con el nombre de la época, y el resto en «Otros». Datos de `escanos_generales.json`. Cierre: escaños de error medio.
- **A6 Completa el gráfico parlamentario** (medio). 6-8 métricas de actividad del Congreso, generales y por grupo; el usuario dibuja barras. Cierre: grado de acierto.
- **A7 ¿Qué mapa es este?** (medio). Seis mapas provinciales sin leyenda (abstención, habitantes por escaño, voto nulo, voto a Sumar, nacidos en el extranjero y voto a Vox), con cuatro etiquetas por mapa; ronda de tipo mapa en el encadenador y geometría de `mapa_provincias.json`. Cierre: aciertos sobre 6.
- **A8 El fondo de la urna** (bajo). Candidaturas sin escaño del 23-J. Encadenador con dos rondas de M10 emparejar (cinco candidaturas, una inventada, contra cuatro cifras de votos y «No existe»; cada candidatura con sus provincias) y un duelo final (PACMA, 0 escaños, frente a UPN, 1 escaño). Datos de `resultados_2023_prov.json`. Las inventadas se comprueban antes en el Registro de Partidos y en las candidaturas proclamadas del 29-N. Cierre: puntos sobre 11. Sustituye a «Demografía del voto» (21-10).
- **A9 Fontanería electoral** (medio). Siete cambios del sistema electoral con el voto de 2023 invariable (barrera del 10 %, Sainte-Laguë, cuota Hare, circunscripción autonómica, circunscripción única, 300 diputados y mínimo de 1 por provincia), solo proporcionales y con listas cerradas. Cada pregunta es una ronda de opciones del encadenador: el cambio, un botón de ayuda que abre un panel en la página y las consecuencias como opciones; al resolver, gráfico de escaños real frente a con el cambio. El reparto se calcula en R (`fontaneria_a09.json`; M5 deja de ser motor de juego). Cierre: aciertos sobre 7.
- **A10 Agrupar 16** (muy bajo). Nombres, leyes, lemas, fechas en 4 grupos de 4 con grupos trampa. Una sola edición. Cierre: resuelto + fallos.
- **A11 Duelo de circunscripciones** (muy bajo). Diez duelos con «VS» en el encadenador: ¿qué circunscripción tiene más? Barra de vida de cinco tramos; al quinto fallo, fin de la partida. Datos de `resultados_2023_prov.json`. Cierre: aciertos sobre 10.
- **A12 Presidentle** (bajo). M1 pistas progresivas. Adivinar uno de los 7 presidentes del Gobierno (siempre visibles como opciones) con 5 pistas: edad en la primera toma de posesión, tiempo en el cargo, formación, provincia de nacimiento, partido y año. Una ronda por partida con presidente aleatorio. Suárez desde 1977 (nota sobre 1976); tiempo en años y meses, Sánchez con corte el 29-11-2026. Datos: siete fichas a mano (La Moncloa y BOE). Cierre: 5 a 1 puntos según la pista; 0 si se agotan.
- **A13 Rosco del politólogo** (bajo-medio). Motor nuevo M9. Una definición por letra (empieza por o contiene; Ñ, K, W, X, Y por "contiene") con vocabulario electoral, político y de ciencia política, cada una con fuente. Cronómetro opcional que elige el jugador al empezar. Cierre: aciertos sobre el total de letras + rosco compartible.
- **A14 Ordena las prioridades** (motor muy bajo, datos medio). Único juego de opinión. El usuario ordena 8 temas; Spearman contra el perfil de cada programa del 29-N. Perfil = proporción de medidas numeradas por tema (capítulo + reclasificación LLM, validada con muestra manual y con conteo léxico). Cierre: "tu agenda se parece a la de X" (saliencia, no posición). Plan B: programas 2023 (Manifesto Project) o iniciativas por tema de la XV.

**Campaña (motor listo antes; contenido en 24-48 h)**

- **B1 Quién dijo qué**. Una sola pieza, el día siguiente a un debate (cuál, pendiente de las fechas): atribuir frases y una ronda de bingo, «¿Lo dijeron o no?», en la que el jugador marca en un cartón lo que cree que ocurrió y se corrige con la transcripción. El bingo ya no es un juego propio (24-10). Casillas, peso del cartón y mecánica del resto, pendientes.

**Reserva:** mitos electorales V/F, titular a medio, Politle, léxico del Congreso (descalificativos de todos los grupos + cifra a estimar), artículo censurado, dibuja la curva, proximidad semántica.

**Descartados:** afinidad por votaciones reales, predicción del 29-N, coste de ir separados, última papeleta, forma gobierno, encuestas en vivo.

## Datos (`data/` ← `R/`)

| JSON | Fuente | Juegos |
| --- | --- | --- |
| `resultados_2023_prov.json` | Ministerio del Interior (infoelectoral), INE y BOE | A7, A8, A9, A11 || `escanos_generales.json` | Ministerio del Interior (infoelectoral) | A5 |
| `fontaneria_a09.json` | Derivado de `resultados_2023_prov.json` (población a 1-1-2022) | A9 |
| `mapa_provincias.json` | IGN vía es-atlas 0.6.0, proyectado en R | A7 |
| `mapas_a07.json` | Derivado de `resultados_2023_prov.json` | A7 |
| `legislaturas.json` | Congreso; Wikipedia como contraste | A5, A3 (presidencias) |
| `actividad_parlamentaria.json` | Datos abiertos del Congreso | A6, plan B A14 |
| `presidentes.json` | La Moncloa y BOE; siete fichas a mano, sin script | A12 |
| `llamadas_al_orden.json` | Diario de Sesiones (regex: "le llamo al orden", "retire esa expresión"); ParlaMint-ES para texto limpio de legislaturas anteriores | A3 (vía `plenopedia_xv.json`); VIII–XV en reserva para A11 o posts |
| `diputados_xv.json` | Datos abiertos del Congreso (diputados activos y de baja) | A3 |
| `plenopedia_xv.json` | Diario de Sesiones de la XV: palabras, acotaciones, horas y menciones por orador y grupo | A3 |
| `cis_postelectoral_2023.json` | CIS, microdato | Reserva (era el A8 anterior) |
| `programas_29n.json` | Webs de los partidos; MARPOR como plan B | A14 |
| `encuestas.json` | Agregadores públicos | contexto |

Cada script de R escribe un único JSON y anota fuente, URL y fecha en `data/SOURCES.md`. Los JSON son la única frontera entre R y los juegos.

## Calendario de entregas

| Fecha | Entrega |
| --- | --- |
| 19 oct | Repo en Pages con índice, plantilla y `cierre.js`; scraping de llamadas al orden funcionando sobre la XV |
| 26 oct | M1, M4, M6, M8; A1, A2, A10, A12 jugables; llamadas al orden de todas las legislaturas del rango |
| 2 nov | JSON base listos; M9; A3, A4, A11, A13 jugables (8 en total) |
| 6 nov | **Corte:** lo que no esté encaminado se sustituye por un suplente de la reserva |
| 9 nov | M3, mapa SVG, M2; A5, A6, A7, A8 jugables (12 en total) |
| 12 nov | A9; A14 con programas; plantilla de B1; QA en móvil de los 13; reparto de días fijado |
| 13–27 nov | Un juego al día a hora fija. Bingo la víspera de cada debate, Quién dijo qué al día siguiente |

Contexto electoral: campaña del 13 al 27 de noviembre, reflexión el 28, votación el 29. Primer cara a cara Sánchez–Feijóo propuesto para el 16 de noviembre; debates de RTVE por fijar. Candidaturas cerradas el 26 de octubre; programas previstos entre finales de octubre y el inicio de campaña.

## Cómo trabajar conmigo en este repo

- Una sesión por tarea del calendario. Empieza leyendo la ficha del juego en `docs/documento-base.md` y el motor que reutiliza.
- Antes de crear un motor nuevo, comprueba si uno existente lo cubre con configuración.
- Prueba cada juego en viewport móvil (375 px) antes de darlo por terminado.
- No publiques en Pages ni hagas push sin confirmación explícita.
- Si un dato no está disponible o la fuente falla, no lo rellenes: deja `TODO` en el JSON y dilo en el resumen.
