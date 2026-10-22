# Bitácora de Claude Code

Una entrada por sesión, la más reciente arriba. Formato: fecha · juego/motor · hecho · falta · dudas para el autor.

## 2026-10-22 (2) — A8, texto de la inventada de la ronda 2

Decisión del autor en sesión (22-10), para que Cowork la pase a `decisiones.md` y al contenido: la explicación no cuenta cómo se creó el nombre falso; basta con decir que es inventado.
- `data.json` de A8, ronda 2, texto «La inventada»: «Horario Europeo Ya tampoco existe: es inventada.» (corregido por el autor: solo se dice que es inventada, sin la fórmula). Falta pasarlo a `editorial/contenido/a08-fondo-de-la-urna.md`, línea 70, que sigue con el texto antiguo. Sustituye a «… la hemos inventado con la fórmula de las candidaturas que llevan el programa en el nombre.».
- La ronda 1 («Por Mi Comarca y la de al Lado no existe; Por Mi Región, sí, y sacó 1.698 votos en Murcia.») no explica cómo se creó y no cambia.
- Push a Pages del 22-10 (`4b088b3..1c96d92`) con confirmación del autor: A7, A8, duelo con «VS» y el resto de cambios del 21 y el 22-10.

## 2026-10-22 — A7: leyenda, sin dato y coma según el diseño del 22-10

Encargo de decisiones.md, «2026-10-22 (diseño, A7 montado: dudas de Code)». Antes, commit aparte con los cambios de Cowork y la maqueta v14 (`754cced`).

**Hecho** (pendiente del commit con el autor)
- **`mapa.js` y `base.css`, leyenda (maqueta v14):**
  - cinco casillas de 14 px pegadas en una barra con borde de tinta;
  - los cuatro cortes centrados en las fronteras, con marca de 1 × 5 px, a 0,6875 rem, en lápiz, con cifras tabulares y sin unidad («7,5», «105.000»);
  - en los mapas con alguna provincia sin dato (solo Vox), la casilla «sin dato» a la derecha, a 10 px.
- **Franja:** sin cambios de diseño, salvo un ajuste. A 320 px «Sin candidatura» partía en dos líneas; ahora el valor no se parte y es el nombre el que pasa a la segunda.
- **`util.js`:** coma de tres píxeles (columna derecha en las filas 5 y 6, izquierda en la 7); el punto ya era de 2 × 2. «3,5» y «01,5» se leen ya como coma.
- **Pruebas** a 320 × 560, 375 × 560 y 1280, sin errores de consola ni scroll horizontal; capturas revisadas contra la lista negra:
  - **A7:** la ronda cabe sin scroll en los tres anchos; leyendas con los cortes del contenido; recibo 🟨⬜🟨🟨⬜🟨.
  - **A8:** igual que antes; 9/11 en la partida de prueba.
  - **Plenopedia:** igual que antes, con el duelo centrado y las barras 10 y 9.

**Falta**
- Commit de A7 (motor `mapa.js`, cambios de `base.css`, `rondas.js` y `util.js`, y `juegos/a07-que-mapa-es-este/`) con el autor. Día de A7 en el calendario.
- A8: búsqueda en las candidaturas proclamadas del 29-N. A5 (umbrales) y A6 (métricas 3, 4 y 5), sin cambios.

## 2026-10-21 (3) — Duelo con «VS», A8 al día y A7 montado (pendiente del visto bueno a `shared/`)

Antes, commit aparte con los cambios de Cowork (`73dfd46`): decisiones de A7, duelo con «VS» (v13) y dudas de A8.

**Hecho**
1. **Duelo con «VS» y dudas de diseño de A8** (`401a3a1`). Diff de `shared/` enseñado al autor.
   - `duelo.js`:
     - columnas `minmax(0, 1fr)` y ficha derecha en espejo, con un mínimo de 136 px;
     - «VS» de píxel en papel sobre tinta, con contorno de papel;
     - barras de diez segmentos que se llenan al resolver (ganador 10; el otro, `round(10 × valor / ganador)`), uno cada 40 ms;
     - entrada desde los lados y caída del «VS», sin animación con movimiento reducido;
     - cifras de más de cinco caracteres a escala 2;
     - muestra de color junto al nombre si la ficha es un partido (`partido: true`).
     - El «VS» va centrado sobre la rejilla de las fichas (`top: 50%`), no a una altura fija como en la maqueta, para que siga en el centro si una ficha pasa de 136 px.
   - `util.js`: V y S de la maqueta; punto y coma estrechos de 2 × 7, con la separación entre glifos de siempre.
   - `rondas.js`: una ronda puede traer su `rotulo` («Duelo» en Plenopedia, «Duelo final» en A8).
   - `emparejar.js` y `base.css`: «No existe» en la bandeja con una sola forma (icono arriba y «No / existe» a 0,75 rem); en el hueco, igual que antes.
   - `--pacma`.
   - Comprobado:
     - **Plenopedia** a 375, 320 y 1280: fichas iguales; «VS» en el centro del hueco (187 frente a 188 px a 375); barras 10 y 9 (Sánchez 266, Feijóo 228).
     - **A8**: barras 10 y 3.
     - Sin errores de consola.
2. **A8** (`00549a3`):
   - Ronda 1 reordenada: las dos frases, la lista de Caminando Juntos y «La inventada».
   - Duelo con «Duelo final» y las muestras de PACMA (`--pacma`) y UPN (`--upn`) junto al nombre.
   - Día 5 provisional en `calendario.json` (`"provisional": true`, con la regla del día 6 en la nota) y `dia: 5` en el `data.json`; el índice con `?hoy=5` lo enseña.
   - **`#00FF7F` coincide** con la entrada de PACMA de la Plantilla:Color político, revisión 173877042 (cotejado hoy), y así va en SOURCES.md. UPN, `#2A52BE`, también coincide.
3. **A7, datos** (`a7753e3`): `R/11_mapas_a07.R` → `data/mapas_a07.json`, con los valores sin redondear de los seis mapas y los siete señuelos (`null` en Vox/Santa Cruz de Tenerife y PACMA/Ceuta).
   - **Cotejo con el contenido, sin discrepancias:**
     - provincias por tramo (B) de los seis mapas, también las pintadas en el juego;
     - los tres distractores de cada ronda y su ρ, aplicando la regla en el orden de rondas;
     - Población fuera por casi idéntica (ρ = 0,974);
     - señuelos usados como mucho tres veces.
4. **A7, juego, sin commit:** `juegos/a07-que-mapa-es-este/` y el tipo de ronda `shared/motores/mapa.js`, con su CSS en `base.css` y el registro en `rondas.js`. Esperan el visto bueno del autor al diff de `shared/`, como pide el encargo.
   - El `game.js` de A7 carga la geometría y los valores y se los pasa a cada ronda; el motor no sabe de A7.
   - Probado a 375 × 560, 320 × 560 y 1280, con dos fallos a propósito, sin errores de consola ni scroll horizontal:
     - la ronda cabe sin scroll en los tres anchos, con el mapa a 216 px en móvil;
     - el mapa no reacciona antes de responder;
     - la franja da «Sin candidatura» en Santa Cruz de Tenerife, 23,26 % en Ceuta (tocando su casilla), 187.817 en Madrid y 45.117 en Soria;
     - la leyenda sigue el formato del contenido y el recibo es 🟨⬜🟨🟨⬜🟨.
   - Capturas revisadas contra la lista negra: escala neutra, sin colores de partido en los mapas, sin sombras ni radios.

**Falta**
- A7: commit del motor y del juego cuando el autor apruebe el diff. Día en el calendario.
- A8: búsqueda en las candidaturas proclamadas del 29-N.
- A5 (umbrales) y A6 (métricas 3, 4 y 5), sin cambios.

**Dudas para el chat de diseño**
- **A7, «sin dato».** La maqueta no lo define. Santa Cruz de Tenerife va en papel con borde raya de 0,6 px, y la franja dice «Sin candidatura». No lleva casilla en la leyenda.
- **A7, franja antes de tocar.** Dice «Toca una provincia para ver su dato.» en lápiz; el texto lo he puesto yo. Va bajo el mapa, como en la maqueta v10, aunque la decisión dice «bajo la leyenda».
- **A7, leyenda de habitantes por escaño.** «80.000–105.000» ocupa casi toda su quinta parte a 0,6875 rem; a 320 px cabe, pero justo.
- **Coma estrecha.** Con la definición literal (un píxel a la derecha en la fila 6 y otro a la izquierda en la 7), a escala 2 o 3 casi no se distingue del punto: «01,5» se lee como «01.5». Si se quiere más legible, una coma de tres píxeles (filas 5 y 6 a la derecha, fila 7 a la izquierda).

## 2026-10-21 (2) — M10 emparejar, A8 El fondo de la urna, inventadas y CLAUDE.md

Encargo de la tarde del 21-10, en su orden. Antes, commit aparte con los cambios de Cowork y la maqueta v12 (`67bda6f`). Se deja la descarga del listado del Registro, como dice la decisión.

**Hecho**
1. **M10 y separación entre tramos** (`b65e306`). Diff de `shared/` enseñado al autor en sesión.
   - `shared/motores/emparejar.js`, como tipo de ronda del encadenador:
     - filas con hueco de 88 × 38 px y bandeja de cinco piezas iguales dentro de la barra fija, encima del botón;
     - se toca fila y pieza en cualquier orden; tocar una pieza colocada la devuelve, y una pieza nueva en una fila ocupada sustituye a la anterior;
     - en escritorio se puede arrastrar;
     - el botón dice «Empareja las 5 (N de 5)», apagado, y pasa a «Comprobar»;
     - en la corrección: acierto en marcador; fallo tachado con «Era: …»; la inventada con borde discontinuo, la nula y la línea de `revelacion`.
     - Configuración: `nula` («No existe») para los ítems con respuesta `null`; `detalle` y `unidad` para «N provincias» desde cuatro.
   - `rondas.js`:
     - un tipo puede ocupar varias celdas (`casillas`), poner su propio rótulo y añadir nodos a la barra;
     - `listo` puede cambiar el texto del botón;
     - nuevos `etiqueta` («Ronda») y `porGrupo` (tramos de la pista y líneas del recibo).
     - Plenopedia no cambia: partida completa a 375 y 320 con «Pregunta N de 10», 10 celdas y el recibo en una línea.
   - `base.css`:
     - 8 px entre tramos. La cabecera de Cronología cabe ya en una fila a 375 px (comprobado).
     - Estilos de M10, con clases propias (`.renglon`, `.pieza`, `.bandeja`, `.debia`), porque `.pareja`, `.ficha` y `.era` ya existían en M4, el índice y el rosco.
   - `iconos.js`: icono «nula». `util.js`: glifo «.» en las cifras de casillas, para el «169.237» del duelo.
2. **A8** (`0ab7510`): `juegos/a08-fondo-de-la-urna/`, desde el contenido.
   - Cotejo de `data.json` con `resultados_2023_prov.json`: casan los votos y la lista de provincias de las ocho reales, y los datos del duelo (PACMA, 169.237 votos en 51 provincias y 0 escaños; UPN, 52.188 y 1 escaño de los 5 de Navarra).
   - Partidas completas a 375 × 560, 320 × 560 y 1280, sin errores de consola ni scroll horizontal.
   - Sustituir, deshacer, contador, corrección (3 de 5 con dos fallos a propósito) y recibo en 5 + 5 + 1, comprobados.
   - A 375 × 560 la ronda cabe sin scroll: 560 px justos, con la cabecera y el cuerpo compactos solo en las rondas de emparejar.
   - Capturas revisadas contra la lista negra.
3. **`editorial/fuentes/a08-inventadas.md`** (`611a5c1`): la comprobación del autor, las cinco búsquedas de Code con 0 resultados y su límite (sin control positivo). Queda pendiente repetirla en las candidaturas proclamadas del 29-N.
4. **CLAUDE.md** (`cd74eb3`):
   - fichas de A3 Plenopedia y A7, con el texto del encargo;
   - M3 solo en A5 y A6, M4 solo en A11, y una fila para el encadenador (A3, A7 y A8);
   - fuera `renta_prov.json`;
   - `llamadas_al_orden.json` sigue en A3, porque `R/08_plenopedia_xv.R` lo lee, y figura además en reserva.

**Falta**
- A7: montar el juego (tipo de ronda «mapa» en el encadenador) cuando el autor dé el visto bueno al contenido y al método de cortes.
- A8: día en `calendario.json` (el recibo dice «día TODO», como A4) y la búsqueda en las candidaturas proclamadas del 29-N.
- A5 (umbrales) y A6 (métricas 3, 4 y 5), sin cambios.

**Dudas para el autor y para el chat de diseño**
- **Diseño, «No existe» en la bandeja.** A 0,8125 rem no cabe en una línea en una quinta parte del ancho: la maqueta también la parte en dos («No / existe»), y así lo he dejado. Por debajo de 360 px tampoco caben icono y texto en fila: el icono va encima y el texto baja a 0,6875 rem. Si se prefiere otra solución, es solo CSS.
- **Diseño, 320 × 560.** La ronda de emparejar mide 598 px, porque los nombres largos ocupan dos líneas. La bandeja y el botón siguen visibles en la barra fija, y la última fila queda bajo la barra hasta que se hace scroll.
- **Diseño, glifo «.».** El punto de miles en cifras de casillas ocupa una celda de 5 columnas, como la coma, así que «169.237» queda algo espaciado. Lo pide el duelo de A8; la alternativa es la cifra sin punto.
- **A8, contenido.** La lista completa de provincias («Caminando Juntos: Alicante, …») va como tercer párrafo de la explicación, tras «La inventada». Al pasarla, he quitado la marca editorial «[inventado]» de la lista de Horario Europeo Ya.
- **A8, duelo.** Sin colores de partido en los lados (PACMA no tiene color en la paleta); en Plenopedia el duelo los lleva.

## 2026-10-21 — Encargos del 21-10: CLAUDE.md con A8, cotejos de A7 y A8, geometría de A7 y Registro de Partidos

**Hecho**
1. **Cambios de Cowork del 21-10 en commit** (`9981e46`): decisiones, contenidos de A7 y A8 y catálogo de A8.
2. **CLAUDE.md** (`d3b1b40` y `5ae9928`):
   - A8 «El fondo de la urna»: ficha, M10 emparejar en la tabla de motores y `resultados_2023_prov.json` también para A8.
   - `cis_postelectoral_2023.json`, en reserva.
   - M2 apunta a A3 (Plenopedia), que es quien lo usa.
   - Añadidos `R/10_mapa_provincias.R` y `mapa_provincias.json` a sus esquemas.
3. **A8, cotejo del contenido con `resultados_2023_prov.json`:** coinciden los votos totales, las provincias y su número, el desglose por provincia (Caminando Juntos, Tercera Edad en Acción y Libres) y los datos del duelo (PACMA, 169.237 votos en 51 provincias; UPN, 52.188 en Navarra con 1 escaño). También se cumple «más de la mitad de sus votos salen de Valencia, Alicante y Sevilla»: 2.995 de 5.620, el 53,3 %.
4. **A7, cotejo del borrador:** coinciden con el JSON los máximos y mínimos de las seis rondas, la matriz de Spearman y las provincias por tramo con el método B.
5. **A7, geometría** (`5ae9928`): `R/10_mapa_provincias.R` → `data/mapa_provincias.json` (139 KB), desde es-atlas 0.6.0 (IGN), sin Gibraltar.
   - Lleva el mismo formato que la maqueta v10: `W`, `H`, `borde`, y por provincia `id`, `n`, `d` y `c`.
   - Proyección cónica conforme del diseño, Canarias en su recuadro y coordenadas SVG ya calculadas, así que el navegador no necesita D3.
   - Comparado con la geometría de la maqueta: diferencia de 0,005 px como mucho en las 50 provincias de la península, Baleares, Ceuta y Melilla, y de 0,12 px en Canarias.
   - El script comprueba que la península no entra en el recuadro de Canarias.
   - Captura revisada con 52 provincias.

**Falta**
- **A8, Registro de Partidos:** la web (servicio.mir.es) responde, pero cada búsqueda tarda minutos.
  - Las cinco primeras búsquedas por denominación («Por Mi Comarca y la de al Lado», «Por Mi Comarca», «Comarca y la de al Lado», «de al Lado» y «Horario Europeo Ya») dieron 0 resultados.
  - La búsqueda de control («Por Mi Region») se cortó por tiempo, así que no puedo asegurar que el 0 sea real.
  - Estoy descargando el listado completo para buscar en local. Hasta entonces, las inventadas no están limpias.
- **A7, montar el juego:** falta el visto bueno del autor al contenido y al método de cortes. El motor necesita además un tipo de ronda «mapa» en el encadenador, que es un cambio en `shared/`, con diff para el autor.
- **A8, montar el juego:** falta el diseño de M10 del chat de diseño y que las inventadas estén limpias.
- **A5:** faltan los umbrales de puntuación.
- **A6:** métricas 3 y 4 (cruce ley a ley con el BOE) y validación manual de la métrica 5. Siguen sin hacer.

**Dudas para el autor y para Cowork**
- **A8, contenido, ronda 1:** en la tabla de candidaturas falta la fila de Caminando Juntos (CJ, diez provincias, 5.620 votos). Sale en las respuestas y en la explicación, pero no en la tabla. Para el `data.json` hace falta que esté, con su nombre en pantalla (¿con siglas «(CJ)»?).
- **A7, cortes del método A:** los quintiles del contenido no coinciden del todo con los que da R por defecto (tipo 7). Por ejemplo, el cuarto corte de habitantes por escaño es 154.632 en el contenido y 145.926 en R, y el de nacidos en el extranjero, 22,10 frente a 20,91. No afecta al método B, que es el recomendado y cuyas provincias por tramo sí coinciden.
- **CLAUDE.md, A3:** la ficha sigue describiendo el Crispómetro, y la tabla de motores pone A3 en M4. Plenopedia no tiene ficha en CLAUDE.md. Si Cowork me pasa la ficha, la actualizo.

## 2026-10-20 (7) — Encargos de las dudas del 20-10: A7, A5, A6, CLAUDE.md y 40dB para A8

**Hecho**
1. **Decisiones de Cowork en commit** (`9f4ad8d`), con las maquetas v10 y v11, que estaban sin versionar.
2. **A7, Vox en Santa Cruz de Tenerife** (`468744b`).
   - Cada provincia de `resultados_2023_prov.json` trae `sin_candidatura`: las candidaturas nacionales (con lista en 26 provincias o más) que no se presentaron allí. Su voto es NA, no 0. La regla es general y no solo para Vox: también salen PCTE, PUM+J, FO y PACMA en algunas provincias.
   - El juego todavía no está montado. Cuando se monte, el mapa tiene que leer `sin_candidatura` y pintar sin dato.
3. **A5, 2015** (`897d067`). «Podemos y confluencias», con 69 escaños y la suma de votos, y el campo `desglose` con 42 + 12 + 9 + 6. Cada año sigue sumando 350.
4. **CLAUDE.md** (`b73fc9b`).
   - Añadidos al esquema de `R/` `infoelectoral.R` y `09_escanos_generales.R`.
   - Corregido el nombre de `01_resultados_2023_prov.R`.
   - Añadido `escanos_generales.json` a la tabla de datos.
5. **A8, 40dB** (`930a35e`), en `editorial/fuentes/a08-40db.md`.
6. **A6, script y JSON** (`eb279cc`): `R/03_actividad_parlamentaria.R` → `data/actividad_parlamentaria.json`, con las métricas 1, 2, 5 y 6 en VIII, IX, X, XII, XIV y XV.
   - Métrica 2 sin reales decretos legislativos: del 23,7 % de la VIII al 64,2 % de la XV.
   - Métrica 6 con Pleno y Comisión juntos: 618, 705, 643, 559, 1.136 y 494.
   - Las cifras coinciden una a una con las de la viabilidad.
   - El buscador del Congreso volvió a perder páginas sin dar error; el script repite la descarga hasta que cuadra con el total.

**Falta**
- A6: las métricas 3 y 4 (proposiciones por grupo, solo XV) no están en el JSON hasta que se cruce ley a ley con el BOE (falta una ley).
- A6, métrica 5: validar a mano las sesiones con más de tres preguntas al presidente (`sesiones_mas_de_tres`: 34 en la VIII, 16 en la IX, 11 en la X, 3 en la XII, 8 en la XIV y ninguna en la XV).
- Montar A5, A6 y A7 (contenido de Cowork, umbrales de A5).

**Dudas para el autor**
- **A8, 40dB: el informe publicado no sirve para A8.** La oleada de septiembre de 2023 (campo del 25 al 28-08, CAWI, n = 2.000) solo publica el recuerdo de voto total (pág. 40). No hay ningún cruce por edad, sexo ni hábitat, ni perfil sociodemográfico del electorado de cada partido: los cruces van por recuerdo de voto. Para usar 40dB haría falta que se publicaran, con fecha, las tablas cruzadas o el microdato.
- **A8, desviación de 40dB sobre la misma base que el CIS:** PP −6,4, PSOE +3,4, Vox +0,4 y Sumar +2,5, frente a −4,8, +2,4, −3,5 y +5,9 del CIS.
  - En la suma de desviaciones absolutas, 40dB se desvía menos (12,7 frente a 16,6).
  - En PP y PSOE se desvía más: pone al PSOE 8,4 puntos por delante del PP, y el CIS 5,7. En el resultado real, el PP sacó 1,4 puntos más que el PSOE.
- **A8, otra oleada entre el 24-07 y el 25-08-2023:** no he encontrado ninguna, pero no lo puedo confirmar con una fuente pública. Hay que confirmarlo con el archivo de 40dB.

## 2026-10-20 (6) — Encargos del 20-10: diseño en base.css, datos de A7, A5 y A8, viabilidad de A6

Orden confirmado por el autor en sesión: commit de Cowork (`6ada063`), diseño, datos de A7 y A5, viabilidad de A6 y datos de A8. No se monta ningún juego.

**Hecho**
1. **Diseño en `shared/`** (`39b1310`):
   - **Cabecera con pistas largas.** Con más de seis rondas, `marcador()` pone la clase `larga`: celdas de 18 px con 2 px de separación, tic y aspa a escala 1,6 y puntos a escala 2. El cursor se centra en la celda, sea cual sea su tamaño.
   - **Fichas:** `--ficha: clamp(13px, 3.75vw, 0.875rem)` con `hyphens: auto` en las fichas de A10 y A12.
   - **Índice:** la rejilla de días mide como máximo 26 rem.
   - Capturas con emulación de viewport (Chrome por CDP; Playwright no está instalado) de ElectoQuiz a 320 y 375, Cronología a 375, Presidentle a 320, Agrupar 16 a 320 y el índice a 1280, sin errores ni scroll horizontal. Revisadas contra la lista negra.
2. **A7 y A5, datos** (`36ef5a3`). Lector común `R/infoelectoral.R` para los ficheros de Interior.
   - **`R/01_resultados_2023_prov.R` → `data/resultados_2023_prov.json`.** Por provincia trae:
     - censo y votantes con y sin CERA, blancos, nulos y válidos;
     - votos y escaños de cada candidatura, con su cabecera nacional, y el partido más votado;
     - escaños de 2023 (RD 400/2023) y de 2026 (RD 806/2026), del anexo del BOE. Cambian Madrid (37 → 38) y Cádiz (9 → 8);
     - población oficial del INE a 1-1-2023 y a 1-1-2025, que es la revisión más reciente;
     - nacidos en el extranjero del Padrón Continuo a 1-1-2023 (tabla 68526), con su propio total como denominador.
     
     Comprobado: las provincias suman el total nacional de Interior, y 206 cifras de votos y escaños casan con la resolución de la JEC (BOE-A-2023-18907) sin discrepancias.
   - **`R/09_escanos_generales.R` → `data/escanos_generales.json`:** escaños y votos por candidatura en 1982, 2000, 2015 y 2023, con «Otros» para las de menos de cinco escaños. Cada año suma 350.
3. **A8, datos** (`7bc835e`). `R/06_cis_postelectoral.R` → `data/cis_postelectoral_2023.json`, con el detalle en `editorial/fuentes/a08-cis.md`.
   - Estudio CIS 3420 (barómetro de septiembre de 2023, postelectoral). Ponderación `PESO`; tramos de edad del propio CIS (siete) y siete de hábitat.
   - Cada celda trae el porcentaje, la n sin ponderar y el intervalo al 95 % con n efectiva de Kish. Ninguna base baja de n = 100.
   - Comprobado: con `PESO`, el microdato reproduce décima a décima los marginales publicados.
4. **A6, viabilidad**, en `editorial/fuentes/a06-viabilidad.md` (resumen abajo).

**A6, resumen**
- **1 y 2. Leyes y decretos-ley:** viables de VIII a XV con el buscador del BOE diario. Las cifras de la XV coinciden con los datos abiertos del Congreso. La API de legislación consolidada no sirve, porque se deja fuera los decretos-ley derogados. Leyes por año, de VIII a XV: 41,8, 38,1, 41,4, 13,8, 31,9 y 10,8. Decretos-ley: del 23,7 % de la VIII al 64,2 % de la XV.
- **3 y 4. Proposiciones de ley por grupo:** viables en la XV con los datos abiertos, normalizadas por el tamaño medio del grupo. Sumar presentó 66 y no aprobó ninguna; el PSOE, 40 y 9 aprobadas. El estado «Aprobado» no está cruzado ley a ley con el BOE (falta una).
- **5. Preguntas al presidente:** viables de VIII a XV con los sumarios del Diario de Sesiones (caché de `R/05`), porque el buscador del Congreso no dice a quién va cada pregunta. De VIII a XV: 283, 207, 205, 130, 198 y 149. Falta validar a mano una muestra, sobre todo las 34 sesiones de la VIII con más de tres preguntas.
- **6. Comparecencias de ministros:** viables de VIII a XV con el buscador de iniciativas del Congreso (tipos 210, 213 y 214). Miden solicitudes atendidas, no sesiones.

**Falta**
- Montar A7 (contenido de Cowork) y A5 (umbrales de puntuación y colores históricos).
- Montar A6, cuando el autor elija rango y métricas.

**Dudas para el autor**
- **A8, recuerdo frente a resultado real.** Sobre la misma base, el CIS da a Sumar 5,9 puntos más que el resultado real y al PSOE 2,4 más; a Vox, 3,5 menos y al PP, 4,8 menos. Si el jugador estima contra el CIS, compite contra lo que declaran los encuestados. ¿Se explica en una nota o se cambia el planteamiento (por ejemplo, la estructura por segmento en lugar del nivel)?
- **A8, base.** El encargo excluye el blanco. El voto válido oficial lo incluye. En la comparación real van las dos (con blanco y sin blanco); para comparar con la encuesta, la buena es la de sin blanco.
- **A7, Vox en Santa Cruz de Tenerife.** Vox no presentó lista al Congreso en esa provincia en 2023 (renuncias de última hora; RTVC, 2023). En el mapa de voto a Vox sale con 0 %, y el contenido tendría que explicarlo.
- **A7, nacidos en el extranjero.** El Padrón Continuo agrupa «nacidos en el extranjero o en antiguos territorios españoles», y su total no coincide con la cifra oficial de población (387.529 frente a 387.174 en Albacete). Uso su propio total como denominador.
- **A7, población más reciente.** Es la de 1-1-2025: la revisión del padrón a 1-1-2026 no está publicada todavía.
- **A5, nombres de la época.** Interior los da en mayúsculas y abreviados («PSOE-PROGR.», «PODEMOS-COM», «C's»). El nombre que se enseñe tiene que llegar en el contenido.
- **A5, 2015.** En Comú Podem, Compromís-Podemos y En Marea son candidaturas distintas de Podemos. Con la regla de cinco escaños, las tres tienen fila propia (12, 9 y 6 escaños). Hace falta un color para cada una, o decidir si se agrupan con Podemos.
- **A6, métrica 2.** ¿Los reales decretos legislativos entran en el «total de normas con rango de ley»? Cambian poco la cifra (van las dos versiones).
- **A6, métrica 6.** ¿Pleno, Comisión o las dos? En la XV hay muchas más en el Pleno (81) y menos en comisión que en las anteriores.
- **CLAUDE.md.** El esquema de `R/` no recoge `R/09_escanos_generales.R` ni `R/infoelectoral.R`.
- **Diseño (para el chat de diseño), Cronología.** Con 12 celdas en tres tramos, a 375 px falta 1 px para que los puntos quepan en la fila: los puntos bajan a la segunda línea. La decisión no fija la separación entre tramos (11 px). Si fuese de 10 px, cabría.

## 2026-10-20 (5) — Crispómetro eliminado

Decisión del autor en sesión (20-10), para que Cowork la pase a `decisiones.md`: el Crispómetro sale del repo porque lo sustituye Plenopedia.

**Hecho**
- Borrada `juegos/a03-crispometro/` (`index.html` y `game.js`), en `d9518e8`. Fuera de `editorial/` no había ninguna referencia.
- Se quedan el motor M4 (`shared/motores/masomenos.js`), que usará A11, y `data/llamadas_al_orden.json` con las legislaturas VIII–XV, en reserva para A11 o para posts.

## 2026-10-20 (4) — A4, pregunta 9: ley contra el proxenetismo

Encargo del 20-10 (A4, pregunta 9). Antes, commit aparte con los cambios de Cowork (`76956ee`). Detalle y citas en `editorial/fuentes/a04-promesas.md`, apartado 5.

**Hecho**
1. **Programa del PSOE de 2023: sí recoge la promesa.** Está en la pág. 153 impresa (bloque IV, «Abolir la prostitución y erradicar la trata de seres humanos»): «Aboliremos la prostitución. Desarrollaremos una ley para prohibir el proxenetismo en todas sus formas, que incluya el castigo de la tercería locativa y la sanción a los proxenetas.»
   - psoe.es sigue bloqueado. La copia leída es la captura de Wayback del 09-07-2023 (PDF creado el 06-07-2023), con su hash anotado.
   - Las copias del PSC y de ASPACE que salen en las búsquedas no sirven: son el programa de PSOE Cantabria y un resumen de lectura fácil de 2019.
2. **Votación del 21-05-2024** (DS núm. 40 y votación nominal de los datos abiertos del Congreso): 342 votos emitidos, 122 a favor, 184 en contra y 36 abstenciones.
   - En contra: PP 135, Sumar 25, ERC 7, Junts 7, EH Bildu 6 y PNV 4.
   - Abstención: Vox 32 y Podemos 4 (en el Mixto).
   - A favor: PSOE 118, más CC, UPN, BNG y José Luis Ábalos (Mixto).
   - La lista de grupos en contra del contenido es correcta.
3. **`data.json` de A4 regenerado.** Pregunta 9 nueva y [VERIFICAR] cambiados por el dato. Pregunta 10 con el origen y la fuente del contenido. Fuente general del contenido, en lugar del `TODO`. El resto coincide literalmente con el contenido (cotejo automático campo a campo). Partida completa a 320 y 375 px sin errores ni scroll horizontal; captura de la pregunta 9 revisada.

**Para Cowork** (el contenido va por detrás del `data.json` en la pregunta 9):
- Origen: «Programa del PSOE 2023».
- Explicación: «El 21-05-2024 el Congreso rechazó tramitar la proposición de ley del PSOE, con 184 votos en contra (PP, Sumar, ERC, Junts, PNV y EH Bildu), 122 a favor y 36 abstenciones. Su propio socio de Gobierno votó en contra.» He metido el recuento con el mismo formato que la pregunta 5.
- Fuente: «Programa del PSOE 2023, pág. 153; Diario de Sesiones del Congreso, 21-05-2024; RTVC, 21-05-2024; Valencia Plaza, 21-05-2024». He añadido el Diario de Sesiones porque de ahí sale el recuento.

**Resuelto con el autor (20-10)**, para que Cowork lo pase a `decisiones.md` y al contenido:
- **Fuente general de A4:** se añade el programa. Queda: «Acuerdo PSOE-Sumar (24-10-2023), programa electoral del PSOE de 2023, acuerdos de investidura, BOE, Diario de Sesiones del Congreso y prensa citada en cada promesa.»
- Push a Pages con confirmación del autor.

**Nota**
- **Vox se abstuvo.** La explicación no lo dice, porque nombra solo a quienes votaron en contra. Lo dejo por si interesa para el texto del post.

## 2026-10-20 (3) — Ordenar: la lista se queda como la dejó el jugador

Encargo del 20-10, punto 2.

**Hecho**
- **`rondas.js` (tipo `ordenar`, pregunta 5 de Plenopedia) y `quiz.js` (variante `ordenar`, A2):** al comprobar, la lista no se recoloca. Cada ítem sale en el sitio en que lo dejó el jugador, con su casilla y «Era el N.º» (su posición real). En A2 se mantienen la fecha y la explicación y la fuente plegadas; desaparece «Tu posición».
- **`pruebas/ordenar.html` reescrita:** antes comprobaba que la lista resuelta salía ordenada por fecha, justo lo que ya no ocurre. Además se había quedado rota desde que existe la portada, porque su primer clic pulsaba «Jugar». Ahora comprueba en 100 partidas que la lista resuelta conserva el orden del jugador y que cada «Era el N.º» es la posición del hito por fecha. Pasa.
- **Pruebas:** partidas completas de A2 y Plenopedia a 320, 375 y 1280 px sin errores ni scroll horizontal. Capturas de la ronda resuelta de A2 y de la pregunta 5 de Plenopedia revisadas contra la lista negra.

**Resuelto con el autor (20-10)**, para que Cowork lo pase a `decisiones.md`:
- **«Era el N.º» solo en los ítems mal colocados**, no en los que están en su sitio.
- **Aspa de fallo** en la casilla de los ítems con 0 puntos en la lista resuelta, en A2 y en Plenopedia. La pista de partida de la cabecera de A2 no cambia: la regla del 16-10 la deja vacía.
- Push a Pages el 20-10-2026, con confirmación del autor (`3757a4b..59787dd`): rosco, índice-selector, A4, portada de A13 y los cambios de A2, A12 y Plenopedia. Comprobado que Pages sirve el índice nuevo, `calendario.json`, A4 y A13.
- Aplicado en `rondas.js` y `quiz.js`. `pruebas/ordenar.html` comprueba además que la anotación solo aparece en los mal colocados (100 partidas, pasa). Partidas completas de A2 y Plenopedia sin errores; capturas revisadas.
- **A4, pregunta 9: la moratoria de desahucios sale** y se sustituye por otra promesa con origen verificado. La elección es del autor sobre el catálogo; hasta entonces, el juego sigue con la moratoria. Para mantener el reparto 4-4-4, la sustituta tendría que ser bloqueada. En el catálogo solo queda una sin usar, la 9 («Prórroga de alquileres y paquete de vivienda»), y tiene dos pegas: «prórroga» no aparece en el acuerdo PSOE-Sumar (búsqueda del 20-10 en las 48 págs.), y la votación del 02-10-2026 ya es un hito de A2. Puede que haga falta ampliar el catálogo de bloqueadas.

## 2026-10-20 (2) — Encargos del 20-10: portada de A13, Plenopedia y A4

Antes, commit aparte con los cambios de Cowork (`0ae64b7`).

**Hecho**
- **A13:** portada, reglas y fuente general del contenido. La regla de «Pasar» usa el icono `pasar` de la maqueta v7, que ahora está en `shared/iconos.js` (`cb660f7`).
- **Plenopedia:** enunciados nuevos de las preguntas 1 y 2 y explicaciones de la 4 y la 10. La pregunta 7 y la opción «Agustín Conde (PP)» ya estaban al día desde el 18-10. Enunciados y explicaciones de las diez preguntas cotejados de forma automática con el contenido: coinciden literalmente (`cb660f7`).
- **A4, cotejo de orígenes** (detalle y citas en `editorial/fuentes/a04-promesas.md`, apartado 4):
  - **Financiación autonómica (pregunta 10): sí está** en el acuerdo PSOE-Sumar, pág. 40 («Impulsaremos un nuevo modelo de financiación autonómica…»).
  - **Moratoria de desahucios (pregunta 9): no está.** En las 48 páginas no aparecen «suspensión», «prórroga» ni «moratoria»; el único pasaje sobre desahucios (págs. 30-31) trata de las garantías de la Ley de Vivienda. Lo que se ha encontrado como origen de la prórroga que cayó en 2026 es un acuerdo del Gobierno con EH Bildu del 22-12-2025 (Ara), que no es un acuerdo de investidura ni de coalición. Sin leer: el texto íntegro del acuerdo PSOE-ERC y los programas de 2023 (`TODO`).
  - No he cambiado ninguna etiqueta: en pantalla siguen «Acuerdo PSOE-Sumar [VERIFICAR]» en las preguntas 9 y 10, copiadas literalmente del contenido.
- **A4 montado** en `juegos/a04-promesas-2023/`, con M1:
  - A4.1: tres botones iguales en una fila, en orden fijo, con «Bloqueada» en pantalla.
  - A4.2: el origen, en etiqueta sobre la promesa.
  - A4.3: desglose de aciertos por tipo en el cierre.
  - Cambios en `quiz.js`, todos opcionales para que ElectoQuiz no cambie: `columnas`, `origen` por pregunta, `desglose` y `niveles`. Hay un bloque nuevo en `base.css`.
- **Pruebas:** partida completa de A4 a 320, 375 y 1280 px sin errores ni scroll horizontal; el desglose y el recibo cuadran con las respuestas. ElectoQuiz llega al cierre con su nivel. Capturas de la pregunta, la respuesta y el cierre revisadas contra la lista negra.

**Falta**
- Fuente general de A4: el contenido no la trae; va en `TODO` visible en la portada y en el cierre.

**Dudas para el autor**
- **A4, pregunta 9.** Con lo encontrado, la prórroga de la moratoria no tiene origen dentro del ámbito de A4 (programas de 2023, acuerdo de coalición y acuerdos de investidura). Hay tres salidas: buscar en los programas de 2023, cambiar el origen al acuerdo con EH Bildu (que queda fuera del ámbito) o sustituir la promesa.
- **A4, pregunta 10.** El origen queda confirmado. Cowork puede quitar el [VERIFICAR] y añadir «pág. 40» a la fuente.

## 2026-10-20 — Índice: selector de días

Plan confirmado por el autor, con dos decisiones suyas en sesión (20-10), para que Cowork las pase a `decisiones.md`:
- **Precampaña:** hasta el 13-N, la rejilla sale entera cerrada y no se ve ningún juego. En la barra pone «Día 1 · Empieza el 13 de noviembre», con «Jugar» apagado.
- **Apertura:** cada día se abre a las 00:00, hora peninsular.

**Hecho**
- **`data/calendario.json`:** los 15 días con fecha y carpeta. Solo está fijado el día 1 (Plenopedia); el resto, en `TODO`. Un campo opcional `debate` pone el bocadillo en la casilla y el recuadro en la ficha, con su texto.
- **`shared/indice.js` e `index.html`**, según las maquetas v5 y v6 y las decisiones de diseño del 15-10:
  - Rejilla de 5 × 3 con cifras de casillas: hoy en marcador, abiertas con borde de tinta, cerradas en senado con candado en lápiz (sin nombre) y la elegida con borde de 3 px.
  - Bocadillo de 14 px (contorno en tinta, relleno en señal) en los días de debate, también si están cerrados.
  - Ficha: fecha, título, entradilla y reglas, leídos de la portada del `data.json` de cada juego para no duplicar texto. Debajo, el recuadro de debate, si lo hay.
  - Barra con el día y el juego elegidos, y «Jugar» en marcador («Jugar el del N» en los días pasados).
  - `?hoy=N` simula el día N para las pruebas.
- **Cambios en `shared/`:** `icono()` acepta un relleno para los píxeles «o» y lleva el icono nuevo `bocadillo`. `portada.js` exporta `reglas()`, que también usa la ficha. Hay un bloque nuevo del índice en `base.css`.
- **A12:** la portada pasa de `game.js` a un `data.json` propio, para que la ficha la lea como en los demás juegos. El contenido no cambia.
- **Pruebas** con un calendario de prueba (servido en local, fuera del repo) con seis juegos asignados y dos días de debate:
  - Índice en precampaña, con `?hoy=1`, `?hoy=4` (día en `TODO`) y `?hoy=6`, a 320, 375 y 1280 px, sin errores de JS ni scroll horizontal. «Jugar el del 14» lleva a Presidentle.
  - Las portadas de A1, A2, A3, A10, A12 y A13 se cargan bien con `reglas()`, y A12 se juega hasta el cierre.
  - Capturas revisadas contra la lista negra.

**Falta**
- El reparto de los días 2 a 15 y las fechas de los debates (con su texto de recuadro) en `calendario.json`.
- El subtítulo «Un juego al día del 13 al 27 de noviembre.» y «Empieza el 13 de noviembre» están tomados de las maquetas, sin pasar por contenido. Que Cowork los revise.

**Dudas para el autor**
- **Día del recibo.** Los juegos siguen leyendo `dia` de su propio `data.json` (solo Plenopedia lo tiene) y el resto pone «día TODO». Ahora que existe `calendario.json`, cada juego podría leer de ahí su día y así no habría dos sitios que mantener. ¿Lo hago al fijar el reparto?
- **Escritorio.** A 1280 px las casillas miden unos 125 px y las cifras (escala 3) quedan pequeñas dentro. ¿Se limita el ancho de la rejilla o se agrandan las cifras desde 768 px? Es decisión del chat de diseño.

## 2026-10-19 — Motor M9 y A13 Rosco del politólogo

Plan confirmado por el autor. Antes, commit aparte con los cambios de Cowork que estaban sin versionar (`0bdf99f`).

**Hecho**
- **`shared/motores/rosco.js` (M9)**, según A13.0–A13.6 y la maqueta v7:
  - Sin el campo enfocado, rosco circular de 252 px con la letra actual y los aciertos en el centro. Con el campo enfocado, tira de 14 + 13 y aciertos en la cabecera.
  - Sin barra fija: «Responder» junto al campo y «Pasar» debajo; «Terminar» aparece cuando solo quedan pasadas, que cuentan como no respondidas.
  - Los botones no le quitan el foco al campo, así que el teclado no se cierra al responder ni al pasar. Tras un fallo, «Era: …» y avance a la letra siguiente.
  - Comprobación sin mayúsculas ni tildes, con las variantes del contenido. El apóstrofo tipográfico del teclado del móvil (’) cuenta como recto, para que «D’Hondt» valga.
  - Cierre con `cierre.js` sin cambios: rosco final en `detalle` (acierto en marcador, fallo en raya, sin responder en senado). Al tocar una letra salen su pista, su respuesta y su fuente. Recibo de 27 casillas en tres filas de 9 (🟨 acierto, ⬜ el resto).
- **`base.css`:** bloque nuevo del rosco (letras, centro, tira, definición, «Era», campo y botones). No cambia nada de lo que ya había.
- **A13** en `juegos/a13-rosco-politologo/`, con un `data.json` que copia literal el contenido, incluidas B («partido bisagra») y H (pista sin «abogado inglés»). No está enlazado en el índice, como el resto.
- **Pruebas:** partida completa a 320, 375 y 1280 px sin errores de JS ni scroll horizontal. Prueba el plegado con el foco, el foco que no se pierde tras responder, las variantes, el apóstrofo tipográfico, «Terminar», el recibo y la ficha de letra del cierre. Capturas a 375 × 560 (portada, rosco, plegado, fallo, solo pasadas y cierre), 320 y 1280, revisadas contra la lista negra.

**Falta**
- Texto de portada, reglas y fuente general de A13: el contenido no tiene sección «Portada». Van en `TODO` visible.

**Resuelto con el autor (20-10)**, para que Cowork lo pase a `decisiones.md`:
- **Rosco del cierre encima de la nota**, como dice A13.6. `cierre.js` admite `resumen`, unos nodos que van entre «Fin de la partida» y la cifra; la ficha de la letra tocada sigue debajo, en `detalle`. Los demás juegos no cambian.
- **Letra actual con borde de tinta siempre**, también cuando es una pasada (antes, borde senado sobre fondo senado, como en la maqueta). Prueba y capturas repetidas a 320, 375 y 1280 px, sin errores.

**Para Cowork**
- `editorial/contenido/a12-presidentle.md` todavía dice «Zapatero» en pantalla, pero la decisión de nombre y apellido (bitácora 18-10 (11)) ya se aplicó a `presidentes.json`. Además, esa decisión no está todavía en `decisiones.md`.
- Portada de A13: texto, reglas (con icono; si «Pasar» necesita el suyo, la maqueta v7 tiene uno) y fuente general.

## 2026-10-18 (11) — Nombre y apellido en todas las referencias a personas

Decisión del autor en sesión (18-10), para que Cowork la pase a `decisiones.md`: toda referencia a una persona lleva nombre y apellido, no solo el apellido. Sustituye a la etiqueta corta «Zapatero» de A12 decidida el 18-10. Los apodos de leyes de A10 («Wert», «Zerolo») se quedan como están, porque ahí nombran una ley y no a una persona.

**Hecho**
- **A12:** las siete `opcion` de `data/presidentes.json` pasan a nombre y apellido («Adolfo Suárez»… «José Luis Rodríguez Zapatero», «Pedro Sánchez»).
- **A10:** ítems de los grupos 1, 3 y 4 con nombre y apellido; las explicaciones de los grupos 3 y 4 también.
- **A2:** «Alberto Núñez Feijóo», «Pedro Sánchez» (dos hitos y dos explicaciones), «Carles Puigdemont» y «Carlos Mazón».
- **ElectoQuiz y Plenopedia** ya los llevaban; sin cambios.
- **Pruebas:** partidas completas de A2, A10 y A12 a 320 y 375 px, sin errores ni scroll horizontal y sin fichas desbordadas. A 320 px las fichas de A10 caben en tres líneas y el grupo resuelto, en dos.
- Push a Pages con confirmación del autor.

**Para Cowork**
- Actualizar `editorial/contenido/` de A2, A10 y A12 con estos nombres, porque ahora los `data.json` y `presidentes.json` van por delante del contenido.
- Aplicar el mismo criterio a A4 y A13 antes de montarlos.

## 2026-10-18 (10) — Diseño: cabecera común, Presidentle 4 + 3, fichas de Agrupar 16, deslizador de píxel y duelo con muestras

Decisiones de diseño del 18-10 (maquetas v8 y v9).

**Hecho**
- **Cabecera compacta común** (`shared/util.js`, `base.css`). El nombre va arriba; debajo, la pista a la izquierda y «Puntos» con las cifras a la derecha. El «+N» sale encima de las cifras, alineado a la derecha, sube 6 px y no toca la etiqueta.
- **A12 Presidentle:**
  - Fichas 4 + 3 en rejilla de 12, de 56 px y texto centrado en 800.
  - Fallada tachada, en lápiz y con borde raya.
  - Pista nueva a 1,125 rem en 800; las anteriores a 1 rem en lápiz.
  - `opcion` de Zapatero → «Zapatero» en `data/presidentes.json`.
- **A10 Agrupar 16:**
  - Fichas cuadradas: 81 px a 375, 68 px a 320 y 96 px de máximo, centradas en escritorio.
  - Grupo resuelto dentro de la rejilla, con la altura exacta de una fila.
  - Aviso con una línea reservada.
  - Al terminar, los grupos con explicación y fuente se ven como antes.
- **Texto de ficha** (A10 y A12): 0,875 rem desde 375 px. Por debajo encoge con el ancho (`--ficha: min(0.875rem, 3.75vw)`), porque a 320 px «Armengol» y «González» no cabían sin partir.
- **M2, deslizador de píxel:**
  - Tirador cuadrado de 28 px sobre una línea de 2 px; el foco, solo en el tirador.
  - Campo nuevo `marca` (una marca cada N unidades) y eje con extremos y punto medio.
  - − y + de 44 px con `aria-label` («Quitar 30 minutos»).
  - Al responder, todo pasa a raya.
- **Duelo:**
  - Token `--gobierno: var(--tinta)`.
  - Muestra de 12 px junto a la afiliación, al 50 % en la ficha perdedora.
  - La cifra va al pie de cada ficha, como en la maqueta, para que las dos queden alineadas aunque un nombre ocupe dos líneas.
- **Plenopedia `data.json`:**
  - Paso de 30 min y marca por hora.
  - Tramos: 1 punto si el error es menor de 30 min y ½ hasta 1 h.
  - Colores del duelo: `--gobierno` y `--pp`.
- **Pruebas:**
  - Partidas completas de Plenopedia, A12 y A10 (ganada y perdida) a 320, 375 y 1280; A1 y A2 a 320 y 375. Ninguna da errores de JS ni scroll horizontal, y ninguna ficha desborda.
  - Capturas a 375 × 560 y 1280 revisadas contra la lista negra.

**Dudas para el chat de diseño**
- **La cabecera común solo cabe en una fila con pistas cortas.** A 375 px hay 343 px útiles. Diez celdas ocupan 247 px y los puntos unos 89 px (133 con decimal), más la separación, así que no caben. En A1, A2 y Plenopedia los puntos bajan a una segunda línea, alineados a la derecha; no desborda nada, pero se pierde la línea que buscaba la maqueta. Solo A12, con cinco celdas, queda como en la v8. Hay que decidir una salida: cifras más pequeñas, quitar la palabra «Puntos» o devolver los puntos a la línea del nombre en las pistas largas.
- **Tamaño de ficha a 320 px.** El 0,875 rem se reduce a unos 12 px para no partir palabras. Confirmar que vale.

## 2026-10-18 (9) — Plenopedia montada; fusión de llamadas repetidas; A2 con el hito del Constitucional corregido

Encargo del 19-10 para Code, puntos 1 a 5.

**Hecho**
1. **Fusión de las llamadas repetidas** (DS 43, 67, 169, 27 y 126) en `R/05`, a mano y por página, después de construir los actos. En cada una de esas páginas todos los actos van a la misma persona.
   - **XV = 90/203.** El resto de legislaturas no cambia (XIV, 49).
   - Tellado 18, Hernando Fraile 11, Sánchez García 8 y Conde Bajén 6 (7 si el «señor Conde» del DS 43 es él).
   - Por grupo: PP 68, Vox 19, PSOE 1, Sumar 1 y 1 sin identificar.
   - `llamadas_al_orden.json` y `plenopedia_xv.json` regenerados; `SOURCES.md` al día.
2. **Cifras con [VERIFICAR]:**
   - Pregunta 4: 18 de 90. Coincide.
   - Nombres de pila: José María Sánchez García y **Agustín** Conde Bajén. La opción queda en «Agustín Conde (PP)», como «Rafael Hernando».
   - Pregunta 7: **no coincide.** Las 34 personas con cero palabras incluyen a 12 miembros del Gobierno que hablaron como Gobierno, no solo a Sánchez: Albares, Alegría, Grande-Marlaska, López, Montero, Morant, Planas, Ribera, Robles, Rodríguez, Tolón y Sánchez. Sin ellos ni Armengol quedan **21** (lista en `cero_palabras`). Ninguno de los 21 es de la Mesa elegida en el DS 1. El distractor «32» pasa a «21», y la explicación también.
3. **Plenopedia en `juegos/a03-plenopedia/`**, con el encadenador. `data.json` copia literalmente el contenido.
   - Portada, nota metodológica en el cierre («Cómo se ha contado»), fuente general y día 1.
   - Pregunta 3: estimación de 6 a 16 h en pasos de 15 min, 1 punto a 30 min o menos y ½ hasta 1 h 30 min.
   - Pregunta 5: ordenar, con ½ a partir de tres palabras en su sitio.
   - Pregunta 6: duelo, sin muestras de color en ninguno de los dos lados mientras diseño decide la del Gobierno.
   - Cifras y horas en orden fijo de mayor a menor; los nombres, barajados.
   - Cambios en motores: `rondas.js` acepta `nota` y `duelo.js` omite la etiqueta de unidad si no la hay.
   - Partida completa sin errores de JS ni scroll horizontal a 320, 375 y 1280 px. Capturas a 375 × 560 y 1280 revisadas contra la lista negra.
4. **Crispómetro:** ya no estaba en el índice, que solo enlaza ElectoQuiz. Sigue en el repo y no hacía falta cambiar nada. Plenopedia tampoco está enlazada aún, porque el índice-selector no está montado.
5. **A2:** `data.json` regenerado con la explicación y las fuentes nuevas del hito del Constitucional.

- Push a Pages el 18-10-2026, con confirmación del autor (`250fbd3`).

**Falta**
- Punto 6, pendiente del chat de diseño: muestra de color del Gobierno en el duelo y tirador del deslizador.

**Dudas para el autor** (no he tocado los textos aprobados)
- **Pregunta 4.** Dice «casi el doble que el segundo», pero con la fusión son 18 frente a 11 (×1,6).
- **Pregunta 10.** Dice «casi una de cada tres», pero 66 de 203 sesiones son algo más de una de cada tres (32,5 %).
- **Pregunta 7.** Confirmar que el 21 sustituye al 32 en el distractor y en la explicación.

## 2026-10-18 (8) — Motores de Plenopedia (encadenador, M2 y duelo) y cotejo de la amnistía en A2

**Hecho**
- **`shared/motores/rondas.js`, el encadenador.** Una cabecera, una pista (una celda por ronda; medio relleno si la ronda vale ½), una puntuación, un botón de acción y un `cerrar()`. Contrato de cada tipo: `ronda(datos, listo) → { cuerpo, resolver }`, y `resolver()` devuelve 0, ½ o 1.
  - Tipos: `opciones` (con el criterio ordinal o nominal de M1, por eso `ordenOpciones` se exporta ahora desde `quiz.js`), `ordenar` (de mayor a menor `valor`), `estimacion` y `duelo`.
  - `ordenar` da 1 punto con todo en su sitio y ½ con al menos `medio` ítems en su posición exacta (por defecto, la mitad).
- **`shared/motores/estimacion.js` (M2).**
  - Deslizador; la cifra elegida se dibuja con casillas.
  - Respuesta en trama, dato en sólido y hueco en marcador.
  - «Te quedaste a 51 min.». Con `formato: 'horas'`, «12 h 21 min».
  - Puntos por `tramos` de error absoluto. A8 se montará como un encadenado solo de estimaciones.
- **`shared/motores/duelo.js`.** Dos fichas que son los propios botones de elección, cifras ocultas con «?» y muestra de partido opcional. No se barajan.
- **`base.css`:** bloques del duelo y de M2.
- **Página de prueba `pruebas/motores/`** (sin enlace en el índice), con cifras reales de `plenopedia_xv.json`. Partida completa sin errores de JS ni scroll horizontal a 375 px. Capturas a 375 × 560 y 1280 revisadas contra la lista negra.
- **A2, cotejo de la amnistía** en `editorial/fuentes/a02-cronologia.md`:
  - El aval general (STC 137/2025) es del 26-06-2025: la fecha del hito es correcta. No trató la malversación.
  - Malversación: el 22-09-2026 el Pleno rechazó la ponencia de Turull, sin sentencia. El primer fallo es del **06-10-2026** (amparo de Bassa, nota 91/2026, cotejada en el PDF del TC).
  - No «amplía» la amnistía: la ley ya incluía la malversación, y el TC corrige la interpretación del Supremo.

**Falta**
- Contenido de Plenopedia (Cowork) y montaje en `juegos/a03-plenopedia/`.

**Dudas para el autor**
- **Tramos de la estimación** (cuánto vale el «casi») y regla de ½ en ordenar: son de contenido. En la prueba: ±30 min para 1 punto y ±1 h 30 min para ½.
- **Paso del deslizador.** Con paso de 15 min no se puede clavar 12 h 21 min; con paso de 1 min sí.
- **Recibo.** Una ronda de ½ sale ⬜, como en el resto de la serie.
- **Diseño.** El tirador del deslizador es el nativo del navegador, redondo. ¿Se dibuja uno cuadrado para cumplir «sin radios»?
- **A2, explicación del hito.** Se puede añadir «No se pronunció sobre la malversación» y cambiar las fuentes por la nota 61/2025 y BOE-A-2025-15939. Si se quiere un hito de la malversación, su fecha es el 06-10-2026, no septiembre.

## 2026-10-18 (7) — A3 Plenopedia: datos para el contenido (encargo del 18-10, diseño, punto 1)

**Hecho** (detalle en `editorial/fuentes/a03-plenopedia-viabilidad.md`, sección «Datos para el contenido»)
- **29 llamadas sin destinatario, leídas a mano** y escritas en `R/08` con una nota por caso.
  - 27 identificadas; el «señor Conde» del DS 43 queda en el PP sin persona (Conde Bajén o Conde López); en el DS 138, la Presidencia no identifica al diputado.
  - Por grupo, sobre 94: PP 71, Vox 20, PSOE 1, Sumar 1 y 1 sin identificar.
  - Más llamados: Tellado 20, Hernando Fraile 11, Sánchez García 9 y Conde Bajén 6 (7 si el DS 43 es él).
  - Diputados distintos llamados: PP 23, Vox 9, PSOE 1 y Sumar 1.
- **Mudos de toda la legislatura:** 4, todos del PP (Aragonés Mendiguchía, Quintanilla Navarro, Sánchez Sierra y Varela Pazos). Salen Armengol (presidenta) y Sánchez (Gobierno).
- **Distractores:** palabras de Rego, Sagastizabal, Feijóo y Rufián; rumores y aplausos de Gobierno, PSOE, PP, Vox y Sumar; las cinco horas de cierre más tardías; los totales de los cinco términos. Todo en el informe.
- **Minutos de silencio:** los DS 91 y 147 son reales (el Diario anota «(Pausa)»). Total: **66**.
- `plenopedia_xv.json` regenerado; `SOURCES.md` al día.

**Falta**
- Motores (encadenador, M2 y duelo) y montar Plenopedia cuando llegue el contenido de Cowork.

**Dudas para el autor**
- **Dos posibles dobles conteos**, como el del DS 43: DS 27 (Sánchez García, «Le llamo al orden» y «Por primera vez le llamo al orden») y DS 126 (Alfonso Silvestre, «la llamo al orden» y «la llamo al orden por primera vez»). Si se fusionan, la XV pasa a 92/203. Los rankings no cambian.
- El DS 137 («Señor Sánchez») se asigna a Sánchez García como probable: el Diario solo anota «un señor diputado».

## 2026-10-18 (6) — A3 Plenopedia: respuestas del autor a las dudas de la viabilidad

Decisiones del autor en sesión (18-10), para que Cowork las pase a `decisiones.md`:
- Llamadas al orden: solo se fusiona a mano el DS 43 de la XV. **XV = 94/203**; el resto de legislaturas sin cambios (XIV, 49).
- Plenopedia no compara legislaturas: todo va sobre la XV.
- La Mesa queda fuera del Charlatán y de los grupos. Feijóo candidato cuenta para el PP; Sánchez candidato, como Gobierno.
- Aplausos: basta con saber que se aplaude, no quién aplaude.

**Hecho**
- `R/05`: la regla general por ordinal sale y queda una fusión a mano (`fusiones_a_mano` en el JSON). `llamadas_al_orden.json` regenerado.
- `R/08`: fuera el cálculo de quién aplaude. `plenopedia_xv.json` regenerado. Llamadas de la XV: Armengol 56 y Rodríguez Gómez de Celis 38; 65 de 94 con grupo automático y 29 por revisar a mano; Tellado, 16.
- Informe de viabilidad y `SOURCES.md` al día. La pregunta 7 queda reformulada (aplausos durante las intervenciones de cada grupo) y la 8 sale.

**Dudas para el autor**
- Siguen abiertas: acotar «Sánchez» (pregunta 23) y los cuatro oradores sin identificar.

## 2026-10-18 (5) — A3 Plenopedia: prueba de viabilidad de la XV (encargo del 19-10)

**Hecho** (plan confirmado por el autor; informe completo en `editorial/fuentes/a03-plenopedia-viabilidad.md`)
- **Correcciones de A3:**
  - `R/05` fusiona con el mismo ordinal y sin nombrar a otra persona a cualquier distancia; la llamada colectiva de la XII ya contaba.
  - Resultado: **XV = 92/203**, no 94 (ver dudas), y XIV = 48/262.
  - Periodo de la XV: 2023–2026, con el campo nuevo `disolucion` en `legislaturas.json` y en `game.js` de A3. El juego no se ha vuelto a probar en el navegador: solo cambian el dato y el texto del periodo.
- **`R/04_diputados.R` → `data/diputados_xv.json`:** 412 diputados y 420 periodos de grupo, con datos abiertos del Congreso. Cambios de grupo reconstruidos: Podemos, Ábalos, Micó y Ortega Smith al Mixto.
- **`R/08_plenopedia_xv.R` → `data/plenopedia_xv.json`:** 203 sesiones y 9,3 millones de palabras atribuidas.
  - Indicadores: palabras, rumores, protestas, risas, aplausos (y quién aplaude, si consta), apertura, cierre y pausas, minutos de silencio y 14 términos.
  - Por grupo, con el Gobierno y la Mesa aparte, y por diputado.
  - Normalizado por 10.000 palabras y por escaño medio.
  - Cruce de las llamadas al orden con el grupo del llamado.
- **Problemas del Diario resueltos por el script:**
  - Las intervenciones en lenguas cooficiales salen dos veces (original e interpretación): se cuenta solo el castellano.
  - Erratas en las etiquetas y en los apellidos.
  - El sello «cve:» parte párrafos y a veces comparte línea con el texto (la hora de cierre del DS 46, entre otras).
  - Etiquetas de ministro partidas en dos líneas.
  - Ninguna etiqueta queda sin reconocer.
- **Cifras clave** (ninguna pregunta preparada):
  - Charlatán: Rego (BNG) con 203.982 palabras; en el Gobierno, Sánchez con 387.836.
  - Palabras por escaño: Mixto y PNV, unas 104.000; PSOE, 6.621.
  - Sesión más larga: 10-09-2025, 12 h 21 min. La que acabó más tarde: 19-12-2023, a las 23.25.
  - 64 minutos de silencio.

**Falta**
- Selección de preguntas sobre el catálogo (autor y Cowork).
- Revisión a mano de 28 llamadas sin destinatario automático (preguntas 1 y 3) y de dos minutos de silencio dudosos (DS 91 y DS 147).
- Montar el juego cuando haya selección.

**Dudas para el autor** (detalle en el informe)
- **XV = 92 o 94.** La regla general del 19-10 también fusiona el DS 67 y el DS 169 (Tellado, «primera vez» repetida en la misma intervención). ¿Vale la regla (92) o solo el DS 43 (94)?
- **XIV, DS 97.** Puede haber dos destinatarios: Espinosa de los Monteros y Figaredo. ¿Uno o dos actos? Ahora cuenta uno.
- **Mesa y candidatos.** La Mesa queda fuera del Charlatán y de los grupos. Feijóo candidato cuenta para el PP; Sánchez candidato, como Gobierno. ¿De acuerdo?
- **Aplausos (preguntas 7 y 8).** Solo el 5 % de los aplausos dice quién aplaude: la pregunta mediría ovaciones anotadas. ¿Se reformula o sale?
- **«Sánchez» (pregunta 23).** El recuento mezcla a todas las personas con ese apellido. Habría que acotarlo.
- **Cuatro oradores** con etiqueta de diputado que no están entre los diputados de la XV (Armario Rodríguez, Córdoba Marí, Gil Membrado y Costa Serra). Van en «Otros».

## 2026-10-18 (4) — Encargos del 18-10: A3 (datos, M4 y juego), portadas y ElectoQuiz

**Hecho** (plan confirmado por el autor)
- **A3, datos** (`R/05`, `5e71087`):
  - Fórmula ampliada a las perífrasis con valor de llamada.
  - Rango VIII, IX, X, XII, XIV y XV.
  - Caché por diario de lo ya leído (`<pdf>.lee.rds`), para que una pasada cortada se reanude.
  - Revisión manual de las 24 coincidencias nuevas y descartes listados en el script y en el JSON (`descartes`, con su motivo), quitados antes de fusionar. Detalle en `editorial/fuentes/a03-validacion-viii-x.md`.
  - Resultado: VIII 39/288 (13,5), IX 3/262 (1,1), X 69/293 (23,5), XII 25/176 (14,2), XIV 49/262 (18,7) y XV 95/203 (46,8). La XV pasa de 90 a 95.
- **`legislaturas.json`:** Batet como PSOE, con la afiliación PSC en el campo `afiliacion`. La decisión del 16-10 no se había aplicado al JSON.
- **M4** en `shared/motores/masomenos.js`, variante `cadena` (`f6dfecd`):
  - Pareja de ítems en dos columnas, con la cifra en casillas; la del ítem por descubrir es «?».
  - «Más» y «Menos» en orden fijo. Tocar elige y «Responder» confirma; después, «Siguiente legislatura».
  - Pista de una celda por decisión.
  - Cierre con aciertos sobre decisiones y ranking de mayor a menor: barra en tinta, presidencia del Congreso, partido con muestra de color y llamadas/sesiones.
- **Cambios en `shared/`:**
  - `cierre.js` acepta `detalle`, nodos bajo la nota; sirve también para el desglose de A4.3.
  - `util.js` tiene el glifo «?».
  - `base.css` lleva la pareja y el ranking.
- **A3** en `juegos/a03-crispometro/`, que lee los dos JSON de `data/`. 5 decisiones. Partida completa sin errores a 320, 375 y 1280 px; a 375 × 560 la pregunta y las dos opciones caben sobre la barra. Capturas revisadas contra la lista negra.
- **Portadas** de A1, A2, A10 y A12 copiadas del contenido (`2f50727`); la regla de vidas de A10 lleva el corazón (`lleno`). A1 pasa a **ElectoQuiz** en el juego, el recibo y el índice. Los `data.json` de A1 y A10 están regenerados con las correcciones del 18-10 (pregunta 9 de A1, fuente de la 10, fuente del grupo 3 de A10).
- Push a Pages el 18-10-2026 con confirmación del autor (`b287e2a`).

**Falta**
- A3: texto de portada, reglas y nota metodológica (en `TODO` visible), que vienen de Cowork. La nota debería explicar la fórmula, los avisos descontados y la exclusión de la XI y la XIII.
- A3: el cierre no muestra racha. Con cinco decisiones no aporta nada; M4 la tendrá cuando la pida A11.
- A4 y A13 (paso 4 del 17-10): las fuentes ya están cerradas.

**Dudas para el autor**
- **A3, XII DS 61:** «Señorías, el orden en la Cámara lo mantiene la presidenta y les voy a llamar al orden a su señorías». Es colectiva y sin ordinal. La cuento, como el resto de «le voy a llamar al orden». ¿De acuerdo?
- **A3, XV DS 43:** «le llamo al orden por primera vez […] Así que le llamo al orden por primera vez» al mismo diputado cuenta como dos actos, porque las dos frases están a más de 150 caracteres. Es lo que da la regla, como antes, aunque parece la misma llamada repetida.
- **A3, textos de juego escritos por Code** (no hay contenido de A3): la pregunta («¿La IX legislatura tuvo más o menos llamadas al orden por cada 100 sesiones plenarias que la VIII?»), la explicación de cada decisión (cifras, presidencia y partido) y el periodo de cada legislatura, sacado de las fechas de la presidencia («Desde 2023» en la XV). Que Cowork los revise.
- **A10, fuente del grupo 3:** el contenido añade «Fechas de cada cargo en editorial/fuentes/a10-agrupar.md». En pantalla solo he quitado el `[VERIFICAR]` y no he puesto esa ruta interna. ¿Vale así?

## 2026-10-18 (3) — Ajustes del autor tras probar A1, A10 y A12

Decisiones del autor en sesión (18-10), para que Cowork las pase a `decisiones.md`:
- **Criterio universal de opciones (M1).**
  - Si las opciones son ordinales, no se barajan; van de mayor a menor.
  - Si son nominales, se barajan.
  - Las opciones de cierre («Ninguno», «No lo sé», blanco, nulo, otros…) van siempre al final, sin barajar.
- **A10, cierre.** La cuadrícula de colores no dice qué se acertó. El cierre muestra los grupos encontrados («2 de 4») y los fallos. El recibo pasa a «N/4 grupos», sin emojis. Sustituye al recibo 🟨🟫🟧⬛ de la decisión de diseño del 16-10.
- **A12.** Cada partida sale con un presidente al azar, para poder volver a jugar.

**Hecho**
- `quiz.js`: cada pregunta puede llevar `orden` (orden fijo, lista de letras) o `ultima` (letra que va al final; el resto se baraja). Sin ninguno de los dos, se baraja todo, como antes. Sirve también para el orden fijo de A4.
- **A1** (`data.json`):
  - Orden de mayor a menor en las cuatro preguntas ordinales: diputados del Congreso (450…300), mínimo por provincia (3, 2, 1, Ninguno), días de campaña (30…10) y senadores (4…1).
  - En la pregunta de Madrid y Cádiz, «Ninguna: el reparto es idéntico al de 2023» va siempre al final.
  - El contenido no cambia; solo el orden en que se muestran las opciones.
- **A10:** cifra «N /4» en casillas, «Grupos encontrados. N fallos» y recibo «N/4 grupos». `cierre.js` admite una `unidad` para el recibo.
- **A12:**
  - Ya salía un presidente al azar en cada carga.
  - Ahora el cierre tiene «Otro presidente», debajo del recibo, que empieza otra partida con uno distinto del que acaba de salir. Es secundario y no va en la barra, para no partir «Copiar resultado».
  - `cierre.js` admite `otra`, y el texto del botón viene de `game.js`.
- Pruebas: partidas completas de A1, A10 y A12, y «Otro presidente» que abre una partida nueva. Capturas a 375 y 320 px.
- El autor lo ha probado en local: al principio no veía «Otro presidente» porque Chrome guardaba los módulos en caché. Para las pruebas locales, el servidor se lanza con `Cache-Control: no-store`.
- Push a Pages el 18-10-2026 con confirmación del autor (`eeb47d0`).

**Dudas para el autor**
- En A1 he aplicado el criterio también a las preguntas 1, 4 y 7, además de la 2, porque también son ordinales. ¿De acuerdo?

## 2026-10-18 (2) — Paso 3 del orden de trabajo: A2, A10 y A12

**Hecho** (plan confirmado por el autor)
- **A2:**
  - «Más antiguo» encima de la lista y «Más reciente» debajo, en etiqueta.
  - Etiqueta de ronda con su criterio («Ronda 1 de 3. Más de un año entre hitos»), sacado del campo nuevo `titulo` del `data.json`, copiado literal de los títulos de ronda del contenido.
  - Ronda resuelta compacta: celda, fecha y hito; «Tu posición: N.º» si no está en su sitio; explicación y fuente plegadas en «Ver explicación».
- **A10:**
  - Grupos resueltos compactos (nombre e ítems) mientras se juega; explicación y fuente al terminar.
  - «Barajar» secundario en la barra.
  - «Ya lo has probado.» al repetir una combinación fallada, sin gastar vida ni sumar fila al recibo.
  - Botón apagado «Marca 4 (N de 4)» hasta tener cuatro marcados.
  - Corazones de 9×8 a escala 3 en `shared/iconos.js` (`lleno`, `mitad`, `vacio`). Al fallar, el corazón pasa por medio vacío (200 ms) y queda en contorno raya; con movimiento reducido cambia directo.
  - Papeleta y nula salen de A10; nula se borra de `iconos.js`, porque ya no la usa nadie.
- **A12:** opciones en dos columnas; la pista recién revelada en negrita y tinta, y las anteriores en lápiz. Al terminar, todas en tinta normal.
- Partidas completas sin errores a 320 y 375 px. Capturas a 375 × 560 y 1280 revisadas contra la lista negra.
- Ojo para pruebas: Chrome guardaba en caché un `iconos.js` antiguo y daba un error falso. Con perfil nuevo y `--disable-cache` desaparece. En Pages puede pasar lo mismo durante unos minutos tras el push.

- Push a Pages hecho el 18-10-2026 con confirmación del autor (`096de8f`); pasos 1 a 3 publicados.

**Falta**
- Paso 4: A4 y A13, en cuanto el autor resuelva las dudas de fuentes (bitácora del 17-10 (2)) y A4 tenga el campo `origen`.
- Textos de portada de A1, A2, A10 y A12.

## 2026-10-18 — Paso 2 del orden de trabajo: portada común

**Hecho** (plan confirmado por el autor)
- `shared/portada.js`, según la maqueta v7: «Juegos 29N, día N», título, entradilla (1.0625 rem), reglas con icono de 10×10 separadas por rayas finas bajo un borde de tinta, y fuente general. «Jugar» va en la barra, en marcador; al pulsarlo se invierte a tinta.
- `quiz.js` y `agrupar.js` pasan siempre por la portada antes de la partida.
- Campos `portada.texto` y `portada.reglas` (con `icono` y `texto`) en los `data.json` de A1, A2 y A10, y en el `game.js` de A12. Todos con `TODO` visible: el texto llega al cerrar cada juego (decisión del 16-10).
- Partidas completas sin errores a 320 y 375 px. Capturas de la portada a 375 × 560 y 1280, revisadas contra la lista negra.

**Falta**
- Texto de portada y de reglas de A1, A2, A10 y A12 en `editorial/contenido/`.
- Paso 3: cambios de A2, A10 y A12.

**Dudas para el autor**
- Iconos de las reglas: de momento solo hay papeleta (ítems) y urna (puntuación). Si una regla necesita otro icono (por ejemplo, «pasar» en A13), que el contenido lo nombre.

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
