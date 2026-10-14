# Juegos de campaña 29N — Documento base

Oct 13, 2026 · @Santi

## Objetivo y principios de diseño

Publicar un juego político sencillo cada día de campaña, del 13 al 27 de noviembre de 2026, en LinkedIn, alojado en GitHub Pages, como serie de contenido de un analista cuantitativo.

**Principios de diseño**

- Interfaz mínima, lógica simple: un juego = una pantalla, al estilo de los juegos diarios tipo Wordle, Connections o Higher or Lower.
- 100 % estático: sin backend, sin cuentas, sin almacenamiento de respuestas. Todo corre en el navegador.
- Todo juego termina en un **cierre comparable**: una puntuación (juegos de acierto/error) o una afinidad con un partido (juegos de opinión). Nunca termina "en nada".
- Resultado compartible: texto copiable para LinkedIn (cuadrícula de emojis donde aplique) y, si hay tiempo, imagen generada en el navegador.
- El dato manda: cada cifra que aparece en un juego sale de una fuente pública citada en el repositorio. El método se mide sobre todos los grupos aunque el foco editorial sea uno.
- Sin backend y sin fotos de agencia: se evitan derechos de imagen y mantenimiento.
- Marca propia: "Wordle" es marca del New York Times; los juegos llevan nombre propio.
- Prioridad de producción: primero los motores y los juegos que no dependen de la actualidad; los que dependen de hechos de campaña (debates, programas) solo necesitan tener el motor listo.

## Contexto político y calendario

Sánchez convocó el 5 de octubre elecciones generales para el 29 de noviembre tras perder en el Congreso los dos decretos de vivienda (2 de octubre), con los votos de PP, Vox, Junts y UPN (y PNV y CC en el segundo). Es el cierre de una legislatura dependiente de los siete votos de Junts, sin presupuestos desde 2023, con la amnistía como eje, los casos Koldo–Ábalos–Cerdán, la dana, el apagón, los incendios y la crisis migratoria de Ceuta (julio de 2026).

**Mapa de partidos (media de encuestas, 11 de octubre):** PP 32,3 %, PSOE 26,4 %, Vox 18,7 %, Sumar/Frente Amplio 6,0 %, Podemos 3,1 %. Proyección: PP 139, PSOE 107, Vox 65 escaños; PP+Vox en mayoría absoluta en casi todos los sondeos. Candidatos confirmados: Sánchez, Feijóo, Abascal. Frente Amplio (Movimiento Sumar, IU, Más Madrid, Comuns) presenta candidatura el 17 de octubre; Podemos celebra primarias el 14-15 de octubre y prioriza un acuerdo con ERC.

**Ejes previsibles de campaña:** vivienda, inmigración y Ceuta, corrupción, amnistía y modelo territorial, gestión de emergencias, y el marco "ola ultraderechista" frente a "castigo a Sánchez". La tensión narrativa no está en quién gana sino en cuánto, en el coste de la fragmentación a la izquierda y en el gobierno que viene.

**Calendario que condiciona la serie**

| Fecha | Hito | Implicación para la serie |
| --- | --- | --- |
| 16 oct | Fin de plazo para comunicar coaliciones | Se cierra el mapa de candidaturas |
| 21–26 oct | Presentación de candidaturas | Listas definitivas; datos para Diputadle de la nueva legislatura no aplican (se usa la XV) |
| finales oct – inicios nov | Publicación de programas electorales | Datos para "Ordena las prioridades" |
| 13 nov, 00:00 | Inicio de campaña | Juego 1 |
| 16 nov (propuesta) | Primer cara a cara Sánchez–Feijóo (Mediaset) | Bingo del debate la víspera; "Quién dijo qué" el 17 |
| (por fijar) | Debates de RTVE | Repetir los dos juegos de debate |
| 27 nov, 24:00 | Fin de campaña | Juego 15 |
| 28 nov | Jornada de reflexión | Sin publicación |
| 29 nov | Jornada electoral | Cierre opcional |
| ≤ 24 dic | Constitución de las Cortes | Contenido postelectoral opcional |

Son 15 días de campaña: 13 juegos preparados antes y 2 producidos durante, exactamente uno por día y sin margen. La reserva cubre bajas.

## Infraestructura común y motores

El coste se concentra en el primer juego de cada tipo; a partir de ahí, cada juego nuevo es trabajo de datos y contenido sobre un motor existente.

**Infraestructura (una sola vez)**

- Repositorio en GitHub con GitHub Pages: una página por juego, estilo compartido, índice de la serie.
- Pantalla de cierre común: puntuación o afinidad, texto copiable para LinkedIn, cuadrícula de emojis donde aplique.
- Datos base en JSON, generados desde R: resultados 2023 por provincia, composición del Congreso por legislatura, actividad parlamentaria, fichero de diputados, llamadas al orden, pesos temáticos de programas.
- Mapa provincial en SVG, compartido por varios juegos.

**Motores**

| Motor | Qué hace | Coste técnico | Juegos que lo usan |
| --- | --- | --- | --- |
| M1 Quiz | N preguntas, puntuación, explicación por pregunta, nivel final; variantes "ordena" y "pistas progresivas" | Bajo | A1, A2, A4, A13, B1 |
| M2 Estimación | Deslizadores o entrada numérica, error respecto a la referencia | Bajo-medio | A8 |
| M3 Gráfico | Gráfico incompleto que el usuario rellena; se superpone el real; grado de acierto | Medio | A5, A6, A7 |
| M4 Más o menos / ordena | Rondas de comparar dos cifras, cadena "mayor o menor", ordenar seis ítems; racha y ranking final | Muy bajo | A3, A11 |
| M5 D'Hondt | Reparto provincial a partir de votos, con parámetros editables | Medio | A9 |
| M6 Agrupar | 16 ítems en 4 grupos de 4, intentos limitados, cuadrícula de colores | Muy bajo | A10 |
| M7 Atributos | Adivinar un ítem; cada intento devuelve atributos ✓/✗ y ↑↓ | Medio | A12 |
| M8 Afinidad por rangos | El usuario ordena ítems; correlación de Spearman con el perfil de cada partido | Muy bajo | A14 |

M1, M4, M6 y M8 son triviales; M3 y M7 son los que más interfaz piden; M5 solo se justifica porque A9 reutiliza el mapa y los datos provinciales de A7.

## Juegos a construir antes del 13-N

Catorce juegos aprobados. Cada ficha recoge idea, mecánica, cierre, datos, coste y dependencias. El coste es relativo (bajo / medio / alto) y suma datos + contenido + técnica.

### A1 · Quiz del sistema electoral

- **Idea:** diez preguntas sobre cómo se vota en España: D'Hondt, barrera del 3 %, por qué Soria vale más que Madrid, Senado, voto por correo y CERA, qué pasa si nadie es investido.
- **Mecánica:** M1. Opción múltiple con explicación tras cada respuesta.
- **Cierre:** puntuación sobre 10 y etiqueta de nivel.
- **Datos:** ninguno externo; LOREG y Constitución.
- **Coste:** bajo. Una tarde de redacción.

### A2 · Cronología de la legislatura

- **Idea:** ordenar 12-15 hitos de la XV legislatura: investidura, ley de amnistía, dana, cinco días de reflexión, apagón, dimisión de Cerdán, ruptura de Junts (27-oct-2025), incendios, Ceuta, decretos de vivienda, convocatoria.
- **Mecánica:** M1 variante ordenar (arrastrar o elegir fecha).
- **Cierre:** puntuación por posiciones correctas.
- **Datos:** lista de hitos con fecha, documentada a mano.
- **Coste:** bajo.

### A3 · Crispómetro: llamadas al orden por legislatura

- **Idea:** las llamadas al orden de la Presidencia como proxy de crispación parlamentaria, comparadas entre legislaturas.
- **Mecánica:** M4 en cadena. Se parte de una legislatura y el usuario decide, una a una, si la siguiente tuvo más o menos llamadas al orden por sesión plenaria, hasta llegar a la XV. Al final, ranking completo con el acierto del usuario.
- **Métrica:** llamadas al orden por cada 100 sesiones plenarias (normaliza las legislaturas cortas XI y XIII). Posible segunda ronda con retiradas de palabras y expulsiones.
- **Pantalla final:** ranking de legislaturas con la persona que presidía el Congreso y su partido junto a cada una, como contexto del confusor.
- **Cierre:** aciertos sobre decisiones.
- **Datos:** Diario de Sesiones (fórmulas fijas: "le llamo al orden", "retire esa expresión") vía regex; ParlaMint-ES para texto limpio de legislaturas anteriores. Rango por decidir con el dato: todas las legislaturas o desde la VIII.
- **Coste:** medio (datos) / muy bajo (motor). Sustituye al Politle.
- **Nota editorial:** el foco puede ser la XV y Vox, pero se mide a todos los grupos con el mismo método; el titular lo pone el dato.

### A4 · Promesas de 2023

- **Idea:** promesas de los programas del 23-J: ¿cumplida, incumplida o bloqueada en el Congreso?
- **Mecánica:** M1, tres opciones por promesa.
- **Cierre:** puntuación.
- **Datos:** programas 2023 y seguimiento legislativo. Cuidado con la etiqueta "bloqueada": documentar la votación que la bloqueó.
- **Coste:** bajo-medio (documentación).

### A5 · Hemiciclos por legislatura

- **Idea:** se muestra el hemiciclo de una legislatura y el usuario asigna escaños a cada grupo con grupo parlamentario propio (se omite el Mixto).
- **Mecánica:** M3 con hemiciclo en SVG; entrada numérica por grupo; se revela el real y el error por grupo.
- **Cierre:** grado de acierto (error absoluto medio).
- **Datos:** composición de las 15 legislaturas (Congreso, Wikipedia). Las coaliciones (AP/PP, IU/UP/Sumar, CiU/Junts) se tratan una a una, con el nombre de la época.
- **Coste:** medio.

### A6 · Completa el gráfico parlamentario

- **Idea:** métricas de actividad del Congreso, generales y por partido: plenos convocados, iniciativas presentadas por grupo, decretos-ley convalidados y derogados, leyes aprobadas, preguntas escritas, mociones.
- **Mecánica:** M3. El usuario rellena barras o puntos; se superpone el dato real.
- **Cierre:** grado de acierto.
- **Datos:** estadísticas del Congreso (datos abiertos). Elegir 6-8 métricas que cuenten una historia.
- **Coste:** medio. Sus tablas alimentan también A11.

### A7 · ¿Qué mapa es este?

- **Idea:** mapas provinciales sin leyenda (voto PP, Vox, PSOE, abstención, voto por correo, renta media); el usuario identifica cuál es cuál.
- **Mecánica:** M3 + mapa SVG provincial.
- **Cierre:** aciertos.
- **Datos:** resultados 2023 por provincia (Ministerio del Interior), renta (INE).
- **Coste:** medio; el mapa SVG se reutiliza en A9.

### A8 · Demografía del voto

- **Idea:** estimar el voto a cada partido por edad, sexo y hábitat y compararlo con el postelectoral.
- **Mecánica:** M2 con deslizadores por segmento.
- **Cierre:** error medio respecto al dato.
- **Datos:** microdato del postelectoral del CIS de 2023, procesado en R.
- **Coste:** medio.

### A9 · Mismo voto, otras reglas

- **Idea:** el resultado real de 2023 repartido con circunscripción única, autonómica, o barrera del 5 %: quién gana y quién pierde escaños con el mismo voto.
- **Mecánica:** M5. El usuario elige la regla y, antes de ver el reparto, estima qué partido gana más.
- **Cierre:** aciertos sobre las predicciones de ganador/perdedor por regla.
- **Datos:** votos provinciales 2023. Sin proyección de encuestas (descartada).
- **Coste:** medio.

### A10 · Agrupar 16

- **Idea:** 16 nombres, leyes, lemas o fechas que agrupar en 4 grupos de 4 por partido, legislatura, ministerio o tipo de norma, con grupos trampa (un ministro que lo fue con dos partidos).
- **Mecánica:** M6, 4 fallos permitidos, cuadrícula de colores compartible.
- **Cierre:** resuelto o no, y número de fallos.
- **Datos:** 16 ítems por edición; varias ediciones listas permiten repetir en campaña.
- **Coste:** muy bajo.

### A11 · Más o menos / Ordena

- **Idea:** rondas de "¿qué provincia tuvo más abstención?", "¿qué grupo registró más iniciativas?", y rondas de ordenar seis ítems (CCAA por participación, leyes por fecha, partidos por votos por escaño).
- **Mecánica:** M4, diez rondas, racha.
- **Cierre:** puntuación sobre rondas.
- **Datos:** reutiliza las tablas de A6 y A7.
- **Coste:** muy bajo.

### A12 · Diputadle

- **Idea:** adivinar un diputado de la XV legislatura; cada intento devuelve partido ✓/✗, provincia, edad ↑↓, legislaturas ↑↓, sexo.
- **Mecánica:** M7 con autocompletado sobre la lista de 350.
- **Cierre:** número de intentos, cuadrícula compartible.
- **Datos:** fichero de diputados (datos abiertos del Congreso).
- **Coste:** medio.

### A13 · Pistas progresivas

- **Idea:** adivinar una ley, un político o un acontecimiento con cinco pistas que se revelan una a una (año, ministerio, votación, frase, dato).
- **Mecánica:** M1 variante; menos pistas usadas, más puntos.
- **Cierre:** puntuación.
- **Datos:** cinco pistas por ítem, sin imágenes.
- **Coste:** bajo. Comodín para días de poco tiempo.

### A14 · Ordena las prioridades

- **Idea:** el único juego de opinión. El usuario ordena ocho temas (vivienda, inmigración, economía, Cataluña, corrupción, sanidad, clima, defensa) y se compara con la agenda de cada programa electoral.
- **Mecánica:** M8. Correlación de Spearman entre el orden del usuario y el orden de temas de cada partido.
- **Cierre:** afinidad con el partido de mayor ρ, mostrando las barras de todos los partidos. Se formula como "tu agenda se parece a la de X", no "votas como X": mide saliencia, no posición.
- **Datos y método:** unidad = medidas numeradas de cada programa (B); etiqueta de tema heredada del capítulo y reclasificada con LLM en capítulos ambiguos; validación con muestra de 150-200 medidas codificadas a mano (kappa). Validación cruzada con la proporción de palabras por léxico temático (A). Perfil de partido = proporción de medidas por tema; posible ponderación por posición del capítulo.
- **Dependencia:** programas del 29-N, previstos entre finales de octubre y el inicio de campaña. Motor listo antes; datos en 48 h al publicarse. Plan B: programas de 2023 (Manifesto Project) o iniciativas por tema de la XV legislatura (datos de A6).
- **Coste:** muy bajo (motor) / medio (datos cuando lleguen).

## Juegos a producir durante la campaña

Dependen de hechos que aún no han ocurrido; el motor y la plantilla quedan listos antes del 13-N y solo se rellena contenido en 24-48 h.

### B1 · Quién dijo qué (post-debate)

- **Idea:** el día siguiente a cada debate, atribuir frases a su autor y adivinar cuál fue el tema más repetido, con recuento de palabras del debate.
- **Mecánica:** M1; 10 frases más una pregunta de tema.
- **Cierre:** puntuación.
- **Datos:** transcripción o resumen del debate; recuento de términos por candidato.
- **Cuándo:** 17 de noviembre si el cara a cara es el 16; se repite tras cada debate de RTVE.
- **Coste:** 2-3 horas de contenido por debate.

### B2 · Bingo del debate

- **Idea:** cartón de 16-25 casillas con frases y gestos previsibles ("ultraderecha", "sanchismo", "Waterloo", mirar al reloj, citar a Trump). Se publica la víspera para jugar en directo; al día siguiente, el cartón marcado con lo que de verdad ocurrió.
- **Mecánica:** página estática; marcar casillas en el navegador.
- **Cierre:** casillas acertadas; de paso muestra lo guionizados que están los debates.
- **Cuándo:** 15 y 17 de noviembre; se repite en los demás debates.
- **Coste:** muy bajo.

## Reserva y descartados

**Reserva** (suplentes si cae un juego o sobra tiempo), de menor a mayor coste:

| Juego | Idea | Motor | Coste |
| --- | --- | --- | --- |
| Mitos electorales V/F | El voto en blanco, la abstención, el CIS: verdadero o falso con explicación cuantitativa | M1 | Bajo |
| Titular a medio | El mismo hecho en cuatro cabeceras; atribuir titular a medio. Sensible: titulares literales y verificables | M1 | Muy bajo |
| Politle | Wordle con léxico electoral | Wordle | Bajo |
| Léxico del Congreso | Wordle con descalificativos del Diario de Sesiones, de todos los grupos, con cifra a estimar al acertar (veces pronunciada, reparto por grupo); extensión natural de los datos de A3 | Wordle + M2 | Medio (datos) |
| Artículo censurado | Artículo de Wikipedia (ley de amnistía, un candidato) con palabras tapadas; adivinar palabras hasta descubrirlo | Propio | Bajo-medio |
| Dibuja la curva | Trazar la evolución de un partido en encuestas desde julio de 2023; se superpone la real | M3 | Medio |
| Proximidad semántica | Adivinar la palabra secreta por cercanía semántica, con ranking precalculado | Propio | Medio |
| Rejilla 3×3, fecha-y-lugar, Nerdle, crucigrama | Descartados salvo necesidad por coste de datos, derechos de imagen o encaje forzado | — | — |

**Descartados definitivamente**

- Afinidad por votaciones reales ("votas lo que votan"): ya realizado por un compañero.
- Predicción del 29-N y mayoría absoluta sí/no: no se quiere entrar en predicción.
- Coste de ir separados (Frente Amplio vs. Podemos), última papeleta, forma gobierno: coste alto y dependencia de proyecciones.
- Cualquier encuesta en vivo: requiere backend.

## Fuentes de datos

Todas públicas. Cada JSON del repositorio cita su fuente y su fecha de descarga.

| Dato | Fuente | Juegos | Trabajo |
| --- | --- | --- | --- |
| Resultados 2023 por provincia (votos, escaños, abstención, voto por correo, CERA) | Ministerio del Interior (infoelectoral) | A7, A9, A11 | Descarga y limpieza en R |
| Composición del Congreso por legislatura (I–XV) | Congreso de los Diputados; Wikipedia como contraste | A5 | Tratamiento manual de coaliciones |
| Actividad parlamentaria (plenos, iniciativas por grupo, decretos, leyes, preguntas) | Datos abiertos del Congreso | A6, A11, plan B de A14 | Selección de métricas |
| Fichero de diputados de la XV legislatura (grupo, circunscripción, edad, sexo, legislaturas) | Datos abiertos del Congreso | A12 | Limpieza; autocompletado |
| Llamadas al orden, retiradas de palabras, expulsiones | Diario de Sesiones (PDF/HTML) vía regex; ParlaMint-ES (CLARIN) para legislaturas anteriores con texto limpio | A3, reserva Léxico | Scraping y parseo; el mayor riesgo de retraso |
| Postelectoral 2023 (voto por edad, sexo, hábitat) | CIS, microdato | A8 | Procesamiento en R |
| Renta media por provincia | INE | A7 | Descarga directa |
| Programas electorales del 29-N | Webs de los partidos | A14 | Troceado en medidas, clasificación, validación |
| Programas 2023 codificados | Manifesto Project (MARPOR) | Plan B de A14 | Descarga directa |
| Media de encuestas y proyección | Agregadores públicos | Contexto, reserva Dibuja la curva | Actualización periódica |
| Transcripciones de debates | Cadena organizadora / prensa | B1 | Recuento de términos |
| LOREG, Constitución, Reglamento del Congreso | BOE | A1, A3 | Redacción |

## Plan de producción y próximos pasos

Orden de producción, de lo que más riesgo tiene a lo que menos. Las fases son secuenciales por dependencia; el ritmo lo fija el tiempo disponible, que solo conoce el autor.

1. **Datos de mayor riesgo primero.** Scraping y parseo del Diario de Sesiones para las llamadas al orden (A3). Es el único dato que puede no estar a tiempo y no depende de la actualidad.
2. **Infraestructura.** Repositorio, GitHub Pages, estilo común, pantalla de cierre con texto compartible, formato de los JSON.
3. **Motores triviales y sus juegos.** M1 (A1, A2, A4, A13), M4 (A3, A11), M6 (A10), M8 (A14, con datos de 2023 o de A6 como relleno provisional). Con esto hay ya siete u ocho juegos publicables.
4. **Datos base en R.** Resultados 2023 por provincia, composición por legislatura, actividad parlamentaria, fichero de diputados, postelectoral CIS.
5. **Motores de interfaz.** M3 con hemiciclo (A5) y gráfico (A6); mapa SVG (A7); M7 (A12); M2 (A8).
6. **M5 D'Hondt** (A9), reutilizando mapa y datos provinciales.
7. **Plantillas de campaña.** B1 y B2 listas con contenido de prueba.
8. **Datos tardíos.** Pesos temáticos de los programas del 29-N en cuanto se publiquen (A14).

## Calendario de trabajo

&#91;embedded content: calendario de producción · 5 fases, 4 hitos\]

Cada fase termina con juegos jugables, no con motores a medias: una semana perdida resta juegos concretos y se ve a tiempo. El ritmo medio es de tres juegos por semana desde la segunda.

### Semana 1 · 13–19 octubre · Infraestructura y dato de riesgo

Entrega Oct 19, 2026: repositorio publicado en GitHub Pages con índice, plantilla de juego y pantalla de cierre; scraping de llamadas al orden funcionando sobre la XV legislatura.

- [ ] Repositorio, GitHub Pages, estilo común, plantilla de página
- [ ] Pantalla de cierre con puntuación/afinidad y texto copiable para LinkedIn
- [ ] Parseo del Diario de Sesiones: oradores y fórmulas de llamada al orden (A3)
- [ ] Formato de los JSON de datos y script de exportación desde R

### Semana 2 · 20–26 octubre · Motores simples y primeros juegos

Entrega Oct 26, 2026: cuatro juegos jugables (A1, A2, A10, A13) y datos del Crispómetro completos para todas las legislaturas del rango elegido.

- [ ] M1 quiz con variantes ordenar y pistas progresivas
- [ ] M4 más o menos / cadena / ordena
- [ ] M6 agrupar 16
- [ ] M8 afinidad por rangos (con datos provisionales de 2023)
- [ ] Contenido de A1, A2, A10 (dos o tres ediciones) y A13
- [ ] Llamadas al orden de todas las legislaturas y decisión del rango (A3)

### Semana 3 · 27 octubre – 2 noviembre · Datos base y tres juegos más

Entrega Nov 2, 2026: JSON base listos y siete juegos jugables en total (A3, A4, A11 nuevos); textos de LinkedIn de los siete redactados.

- [ ] Resultados 2023 por provincia (Interior) y renta (INE)
- [ ] Composición del Congreso por legislatura con coaliciones resueltas
- [ ] Actividad parlamentaria: métricas elegidas (A6) y tablas para A11
- [ ] Fichero de diputados de la XV (A12)
- [ ] Postelectoral CIS 2023 por edad, sexo y hábitat (A8)
- [ ] A3 Crispómetro jugable con presidencias y partidos en la pantalla final
- [ ] A4 Promesas y A11 Más o menos jugables

### Semana 4 · 3–9 noviembre · Motores de interfaz

La semana más cargada. Corte el Nov 6, 2026: lo que no esté encaminado ese día se sustituye por un suplente de la reserva. Entrega Nov 9, 2026: doce juegos jugables (A5, A6, A7, A8, A12 nuevos).

- [ ] M3 con hemiciclo SVG (A5) y gráfico de barras rellenable (A6)
- [ ] Mapa provincial SVG y A7
- [ ] M2 deslizadores y A8
- [ ] M7 atributos con autocompletado y A12
- [ ] Textos de LinkedIn de los cinco

### Semana 5 · 10–12 noviembre · Cierre y QA

Entrega Nov 12, 2026: los trece juegos de precampaña probados en móvil, plantillas de campaña listas, calendario de publicación fijado y los 15 posts en borrador.

- [ ] M5 D'Hondt y A9
- [ ] A14 con los programas publicados; si falta alguno, plan B y nota en el juego
- [ ] Plantillas de B1 y B2 con contenido de prueba
- [ ] QA en móvil de todos los juegos y del texto compartible
- [ ] Reparto definitivo de los 15 días y hora fija de publicación

### Campaña · 13–27 noviembre

Un juego al día a hora fija. Bingo la víspera de cada debate y Quién dijo qué al día siguiente (16 y 17 de noviembre si el cara a cara se confirma; igual con los debates de RTVE). El tiempo de campaña se reserva a contenido de debates y a responder comentarios, no a construir motores.

**Decisiones pendientes**

- [ ] Reparto de los 15 días de campaña entre los juegos (criterios sugeridos: alternar coste alto y bajo, anclar al calendario de debates, abrir y cerrar con piezas fuertes).
- [ ] Rango de legislaturas del Crispómetro (todas o desde la VIII), a decidir con el dato.
- [ ] Lista definitiva de métricas de A6 y de mapas de A7.
- [ ] Nombre de la serie y nombre propio de cada juego.
- [ ] Si hay imagen de resultado generada en el navegador o solo texto copiable.

**Criterio de corte:** si a una semana del 13-N un juego de precampaña no está listo, entra el suplente de la reserva de coste más bajo en su lugar, no se acelera el pendiente.
