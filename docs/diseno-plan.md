# Plan de diseño — base común de la serie

Estado: **aprobado por el autor el 14-10-2026.**

Decisiones del autor (14-10-2026): acento amarillo marcador, tipografía Archivo.

## Plan en diez líneas

1. **Paleta.** Papel `#ffffff` (fondo), tinta `#000000` (texto, bordes, botón seleccionado), lápiz `#575757` (texto secundario y fuentes, contraste 7:1 sobre papel), raya `#bdbdbd` (casillas vacías de la cuadrícula y escaños sin asignar; nunca texto), marcador `#f2c200` (solo fondo detrás de tinta: respuesta correcta y cifra final).
2. **Error sin color.** La respuesta fallada se marca con texto tachado y borde de 1 px en tinta; no hay rojo, que es del PSOE.
3. **Colores de partido** como variables `--pp`, `--psoe`, `--vox`, `--sumar`, etc. en `:root`, con la paleta convencional de los medios. Solo aparecen cuando codifican partido.
4. **Tipografía.** Archivo desde Google Fonts (400 y 800), fallback `system-ui, sans-serif`. Tres tamaños: titular 2 rem/800, cuerpo 1.125 rem/400, etiqueta 0.875 rem/400 en lápiz. Cifras tabulares (`tabular-nums`) en marcadores y tablas.
5. **Layout.** Una columna alineada a la izquierda, máximo 38 em, 16 px de margen lateral en móvil. Primera línea, el nombre del juego; segunda, la primera pregunta. Sin hero.
6. **Componentes.** Las opciones son botones de texto a todo el ancho, con borde de 1 px tinta y radio 0; la seleccionada invierte (tinta sobre papel → papel sobre tinta). Sin sombras ni tarjetas. Una raya solo entre la explicación y la pregunta siguiente.
7. **Progreso.** Una fila de casillas cuadradas, una por ronda, que se rellena con el mismo código que la cuadrícula compartible: marcador si es correcta, raya si es fallada. Sustituye a la barra de progreso.
8. **Botones con verbo:** "Responder", "Siguiente pregunta", "Ver resultado", "Copiar resultado". Sin flechas.
9. **Gesto memorable (común a toda la serie): el marcador.** Lo acertado se subraya como con un fluorescente sobre un acta impresa. En el cierre, una única pasada del marcador de izquierda a derecha detrás de la cifra final; con `prefers-reduced-motion` aparece sin animación.
10. **Cierre como recibo.** Nombre del juego, fecha, puntuación, cuadrícula (🟨 acierto, ⬜ fallo) y URL, en texto plano dentro de un bloque con borde de 1 px. Debajo, el botón para copiarlo y la fuente del dato. Solo modo claro (`color-scheme: light`), sin modo oscuro.

## Wireframe — pantalla de juego (375 px)

```
Quiz del sistema electoral            ← titular 2rem/800
■ ■ □ □ □ □ □ □ □ □                   ← progreso: marcador / raya / vacío
3 de 10                               ← etiqueta, lápiz

¿Cuántos diputados elige Soria?       ← cuerpo

┌───────────────────────────────────┐
│ 1                                 │  opción: borde 1px tinta
└───────────────────────────────────┘
┌───────────────────────────────────┐
│███ 2 ██████████████████████████████│  seleccionada: invertida
└───────────────────────────────────┘
┌───────────────────────────────────┐
│ 3                                 │
└───────────────────────────────────┘

[ Responder ]

— tras responder —
  correcta: fondo marcador; fallada: tachada
  Explicación en dos frases.
  Fuente: Ley Orgánica 5/1985 (LOREG), art. 162   ← lápiz
[ Siguiente pregunta ]
```

## Wireframe — pantalla de cierre (375 px)

```
Quiz del sistema electoral

7 de 10                               ← 4rem/800, marcador detrás de "7"
[TODO nivel: lo fija el contenido]

┌───────────────────────────────────┐
│ Quiz del sistema electoral        │
│ 13-11-2026                        │  texto plano, tabular
│ 7/10                              │
│ 🟨🟨⬜🟨🟨🟨⬜🟨🟨⬜                 │
│ santigper.github.io/juegos-29n/   │
└───────────────────────────────────┘
[ Copiar resultado ]

Fuente de los datos: …                ← lápiz
Más juegos de la serie                ← enlace subrayado, sin flecha
```

## Revisión contra la lista negra

Comparado con lo que saldría por defecto en "una página de quiz genérica":

| Por defecto | Aquí | Por qué |
| --- | --- | --- |
| Barra de progreso con degradado y radios | Fila de casillas cuadradas que anticipa la cuadrícula compartible | La barra decora; las casillas informan de aciertos y fallos |
| Verde para el acierto, rojo para el fallo | Marcador amarillo para el acierto, tachado en tinta para el fallo | El rojo y el verde son colores de partido (PSOE, Vox) y no deben codificar otra cosa |
| Tarjeta centrada con sombra y radio 12 px | Columna a la izquierda, sin tarjeta, radio 0 | Lista negra: todo en tarjetas, sombra gris |
| Botón "Comenzar →" | "Responder", "Siguiente pregunta" | Lista negra: flecha y verbo genérico |
| Pantalla final con confeti y "¡Enhorabuena!" | Recibo en texto plano y una única pasada del marcador | Lista negra: animación decorativa y tono de landing |
| Gris de kit `#6b7280` para lo secundario | Lápiz `#575757`, elegido por contraste 7:1 | Lista negra: grises heredados del framework |
| Modo oscuro automático | Solo claro | Lista negra: modo oscuro por reflejo; la serie es papel y tinta |
| Emojis como iconos de estado | Cuadrados de CSS en pantalla; emojis solo en el texto copiado | Lista negra: emojis como iconografía; en el texto plano son el único medio |

Riesgo detectado y cambiado: había planteado el amarillo como color de texto para la cifra final; no pasa AA sobre blanco (≈1,6:1), así que el marcador va siempre de fondo detrás de tinta.
