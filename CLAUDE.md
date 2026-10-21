# CLAUDE.md — Juegos de campaña 29N

Serie de juegos políticos sencillos, uno por cada día de campaña de las elecciones generales del 29 de noviembre de 2026 (campaña del 13 al 27 de noviembre), publicados en LinkedIn y alojados en GitHub Pages. Autor: analista cuantitativo; los juegos viven de que el dato sea riguroso y público.

## Principios innegociables

- **100 % estático.** Sin backend, sin cuentas, sin almacenar respuestas. Todo corre en el navegador. Si una idea necesita servidor, se descarta.
- **Un juego = una pantalla.** Interfaz mínima tipo Wordle / Connections / Higher or Lower. Funciona en móvil primero.
- **Todo juego termina en un cierre comparable:** puntuación (juegos de acierto/error) o afinidad con un partido (juegos de opinión). Nunca termina "en nada".
- **Una sola edición por juego.** La serie no repite juegos: cada uno se publica una vez. Rejugar solo dentro de la misma edición (p. ej., el presidente aleatorio de A12). B1 y B2 son una pieza por debate, con contenido propio, y no cuentan como repetición.
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
│   └── ...               # a01–a14, b01–b02; nombre = id + slug
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
│   └── cotejo_a01_boe.R  # texto literal del BOE para A1 → editorial/fuentes/
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
| M3 gráfico | Gráfico incompleto que el usuario rellena; se superpone el real; grado de acierto | A5, A6, A7 |
| M4 más-o-menos | Rondas de comparar dos cifras, cadena "mayor o menor", ordenar seis ítems; racha y ranking final | A3, A11 |
| M5 D'Hondt | Reparto provincial a partir de votos con reglas editables | A9 |
| M6 agrupar | 16 ítems en 4 grupos de 4; 4 fallos; cuadrícula de colores | A10 |
| M7 atributos | Adivinar un ítem; feedback ✓/✗ y ↑↓ por atributo; autocompletado | Sin uso desde el 15-10 (A12 pasa a M1) |
| M8 afinidad | El usuario ordena ítems; Spearman con el perfil de cada partido | A14 |
| M9 rosco | Una definición por letra en círculo; respuesta escrita con variantes aceptadas; pasar y volver | A13 |
| M10 emparejar | Columna fija de ítems y columna barajada de respuestas, con una respuesta especial sin dato («No existe») por configuración; se corrige al final, 1 punto por pareja | A8 (candidatos de B1, A9 y «Lemas de campaña» si entra) |

Cada motor expone una función `iniciar(config, contenedor)` y delega el final en `shared/cierre.js`. El contenido del juego vive en JSON, nunca en el JS del motor.

## Juegos

Orden de construcción = orden del calendario. Coste relativo entre paréntesis. Ficha completa en `docs/documento-base.md`.

**Precampaña (listos antes del 13-N)**

- **A1 Quiz del sistema electoral** (bajo). 10 preguntas: D'Hondt, barrera 3 %, circunscripciones, Senado, voto por correo, CERA. Cierre: nota sobre 10 + nivel.
- **A2 Cronología de la legislatura** (bajo). Ordenar 12-15 hitos de la XV legislatura. Cierre: posiciones correctas.
- **A3 Crispómetro** (medio en datos). Llamadas al orden por cada 100 sesiones plenarias, por legislatura. Cadena "¿más o menos que la anterior?" hasta la XV; pantalla final con ranking, presidencia del Congreso y partido de cada legislatura. Rango (todas o desde la VIII) por decidir con el dato.
- **A4 Promesas de 2023** (bajo-medio). Cumplida / incumplida / bloqueada, con la votación que la bloqueó documentada.
- **A5 Hemiciclos por legislatura** (medio). Hemiciclo SVG; el usuario asigna escaños a cada grupo con grupo propio (sin Mixto). Coaliciones con el nombre de la época. Cierre: error absoluto medio.
- **A6 Completa el gráfico parlamentario** (medio). 6-8 métricas de actividad del Congreso, generales y por grupo; el usuario dibuja barras. Cierre: grado de acierto.
- **A7 ¿Qué mapa es este?** (medio). Mapas provinciales sin leyenda (voto PP, Vox, PSOE, abstención, voto por correo, renta). Cierre: aciertos.
- **A8 El fondo de la urna** (bajo). Candidaturas sin escaño del 23-J. Encadenador con dos rondas de M10 emparejar (cinco candidaturas, una inventada, contra cuatro cifras de votos y «No existe»; cada candidatura con sus provincias) y un duelo final (PACMA, 0 escaños, frente a UPN, 1 escaño). Datos de `resultados_2023_prov.json`. Las inventadas se comprueban antes en el Registro de Partidos y en las candidaturas proclamadas del 29-N. Cierre: puntos sobre 11. Sustituye a «Demografía del voto» (21-10).
- **A9 Mismo voto, otras reglas** (medio). Resultado real 2023 con circunscripción única, autonómica, barrera 5 %. El usuario predice ganador/perdedor por regla. Cierre: aciertos.
- **A10 Agrupar 16** (muy bajo). Nombres, leyes, lemas, fechas en 4 grupos de 4 con grupos trampa. Una sola edición. Cierre: resuelto + fallos.
- **A11 Más o menos / Ordena** (muy bajo). 10 rondas sobre las tablas de A6 y A7. Cierre: puntuación.
- **A12 Presidentle** (bajo). M1 pistas progresivas. Adivinar uno de los 7 presidentes del Gobierno (siempre visibles como opciones) con 5 pistas: edad en la primera toma de posesión, tiempo en el cargo, formación, provincia de nacimiento, partido y año. Una ronda por partida con presidente aleatorio. Suárez desde 1977 (nota sobre 1976); tiempo en años y meses, Sánchez con corte el 29-11-2026. Datos: siete fichas a mano (La Moncloa y BOE). Cierre: 5 a 1 puntos según la pista; 0 si se agotan.
- **A13 Rosco del politólogo** (bajo-medio). Motor nuevo M9. Una definición por letra (empieza por o contiene; Ñ, K, W, X, Y por "contiene") con vocabulario electoral, político y de ciencia política, cada una con fuente. Cronómetro opcional que elige el jugador al empezar. Cierre: aciertos sobre el total de letras + rosco compartible.
- **A14 Ordena las prioridades** (motor muy bajo, datos medio). Único juego de opinión. El usuario ordena 8 temas; Spearman contra el perfil de cada programa del 29-N. Perfil = proporción de medidas numeradas por tema (capítulo + reclasificación LLM, validada con muestra manual y con conteo léxico). Cierre: "tu agenda se parece a la de X" (saliencia, no posición). Plan B: programas 2023 (Manifesto Project) o iniciativas por tema de la XV.

**Campaña (motor listo antes; contenido en 24-48 h)**

- **B1 Quién dijo qué** (M1). Día siguiente a cada debate: atribuir frases + tema más repetido con recuento.
- **B2 Bingo del debate** (estático). Cartón de 16-25 casillas publicado la víspera; al día siguiente, marcado con lo ocurrido.

**Reserva:** mitos electorales V/F, titular a medio, Politle, léxico del Congreso (descalificativos de todos los grupos + cifra a estimar), artículo censurado, dibuja la curva, proximidad semántica.

**Descartados:** afinidad por votaciones reales, predicción del 29-N, coste de ir separados, última papeleta, forma gobierno, encuestas en vivo.

## Datos (`data/` ← `R/`)

| JSON | Fuente | Juegos |
| --- | --- | --- |
| `resultados_2023_prov.json` | Ministerio del Interior (infoelectoral), INE y BOE | A7, A8, A9, A11 |
| `escanos_generales.json` | Ministerio del Interior (infoelectoral) | A5 |
| `legislaturas.json` | Congreso; Wikipedia como contraste | A5, A3 (presidencias) |
| `actividad_parlamentaria.json` | Datos abiertos del Congreso | A6, A11, plan B A14 |
| `presidentes.json` | La Moncloa y BOE; siete fichas a mano, sin script | A12 |
| `llamadas_al_orden.json` | Diario de Sesiones (regex: "le llamo al orden", "retire esa expresión"); ParlaMint-ES para texto limpio de legislaturas anteriores | A3 |
| `diputados_xv.json` | Datos abiertos del Congreso (diputados activos y de baja) | A3 |
| `plenopedia_xv.json` | Diario de Sesiones de la XV: palabras, acotaciones, horas y menciones por orador y grupo | A3 |
| `cis_postelectoral_2023.json` | CIS, microdato | Reserva (era el A8 anterior) |
| `renta_prov.json` | INE | A7 |
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
| 12 nov | M5 y A9; A14 con programas; plantillas B1/B2; QA en móvil de los 13; reparto de días fijado |
| 13–27 nov | Un juego al día a hora fija. Bingo la víspera de cada debate, Quién dijo qué al día siguiente |

Contexto electoral: campaña del 13 al 27 de noviembre, reflexión el 28, votación el 29. Primer cara a cara Sánchez–Feijóo propuesto para el 16 de noviembre; debates de RTVE por fijar. Candidaturas cerradas el 26 de octubre; programas previstos entre finales de octubre y el inicio de campaña.

## Cómo trabajar conmigo en este repo

- Una sesión por tarea del calendario. Empieza leyendo la ficha del juego en `docs/documento-base.md` y el motor que reutiliza.
- Antes de crear un motor nuevo, comprueba si uno existente lo cubre con configuración.
- Prueba cada juego en viewport móvil (375 px) antes de darlo por terminado.
- No publiques en Pages ni hagas push sin confirmación explícita.
- Si un dato no está disponible o la fuente falla, no lo rellenes: deja `TODO` en el JSON y dilo en el resumen.
