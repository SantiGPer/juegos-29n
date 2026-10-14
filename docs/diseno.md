# Diseño visual — reglas para Claude Code

Este fichero manda sobre cualquier impulso estético por defecto. La estética definitiva se afinará más adelante; lo que no se negocia desde el primer commit es **no parecer una página generada por IA**. Los modelos convergen hacia la media estadística de la web que han visto, y esa media tiene huella reconocible en tres segundos. Aquí está la lista de esas huellas y la dirección inicial que las sustituye.

## 1. Lista negra: lo que delata una página hecha por IA

Prohibido salvo que una ficha de juego lo pida expresamente.

**Color**

- Degradados morado→azul, índigo→cian o cualquier degradado como decoración (fondos, botones, titulares). Tampoco `#667eea`, `#764ba2`, `#6366f1`, `#a855f7`, `#38bdf8` ni sus vecinos.
- Texto con degradado (`background-clip: text`) en cifras o titulares "para dar impacto".
- Glassmorphism: paneles con `backdrop-filter: blur` sobre manchas de color difuminadas.
- "Orbes" o blobs de color flotando detrás del hero.
- Modo oscuro por reflejo, con acentos neón (cian, verde ácido, bermellón) sobre casi-negro.
- Grises de kit (`#9ca3af`, `#0f172a`, `#111`): el gris se elige, no se hereda del framework.
- El clúster "crema + serif de alto contraste + terracota" (`#f4f1ea` + `#d97757`), que es la otra plantilla reconocible.

**Tipografía**

- Inter, Roboto, Poppins, Geist, Arial, Helvetica como tipografía principal.
- Una sola palabra del titular en otro color, cursiva o negrita "para destacar".
- Etiquetas en MAYÚSCULAS con tracking abierto ("eyebrows") encima de cada título.
- Cadenas de metadatos unidas con punto medio ("A · B · C") y etiquetas tipo "PALABRA — fragmento".
- Monoespaciada para etiquetas de datos pequeñas por sistema.
- Flecha "→" pegada al texto de enlaces y botones.

**Layout y componentes**

- Hero centrado con una "badge" o píldora encima del H1.
- Tres tarjetas en fila con icono de línea fina, título y párrafo.
- Todo en tarjetas: tarjetas dentro de tarjetas, mismo `border-radius` en todo, misma sombra gris (`rgba(0,0,0,.1)`) debajo de cada bloque.
- Pestaña o borde lateral de color (3-4 px) en tarjetas, con un color distinto por tarjeta.
- Numeración "01 / 02 / 03" cuando el contenido no es una secuencia.
- Iconos emoji como iconografía; iconos de línea genéricos sin relación con el contenido.
- Separadores decorativos, líneas finas por todas partes "para ordenar".

**Movimiento**

- Fade-in + desplazamiento hacia arriba al hacer scroll en cada sección.
- Transición de hover en cada tarjeta.
- Cualquier animación que no responda a una acción del usuario, salvo una única secuencia de revelado del resultado final.

**Texto**

- Copy de landing: "Descubre", "Pon a prueba tus conocimientos", "¡Comparte con tus amigos!", exclamaciones, adjetivos vacíos.
- Botones que dicen "Enviar" o "Comenzar" en vez de lo que hacen ("Votar", "Siguiente legislatura", "Copiar resultado").

## 2. Dirección inicial (provisional, se afinará)

El sujeto es **el dato electoral y parlamentario español**, y el formato es **un juego diario de una pantalla**. La estética sale de ahí, no de una landing de SaaS.

- **Materia prima: papel y tinta.** Fondo blanco puro (`#ffffff`) y texto negro puro (`#000000`), como una papeleta o un acta. Nada de blanco roto ni casi-negro. El contraste es el recurso principal.
- **Un solo color de acento para la serie**, elegido una vez y usado para una cosa: el estado "correcto" y el resultado final. Candidatos iniciales (decidir uno): un rojo papeleta (`#c8102e`), un azul acta (`#1d3f8a`) o un amarillo marcador (`#f2c200`). No se usa para decorar.
- **Los colores de partido solo cuando codifican partido** (hemiciclo, mapas, barras por grupo), con la paleta convencional de los medios españoles, definida una vez en `shared/base.css` como variables `--pp`, `--psoe`, `--vox`, `--sumar`, etc. Fuera de ahí, no aparecen.
- **Tipografía: una familia, con carácter y peso.** Una grotesca con personalidad o una serif de texto sólida, nunca neutra. Candidatas iniciales (decidir una, cargada desde Google Fonts con fallback): Public Sans, Work Sans, Archivo, IBM Plex Serif, Source Serif 4. Escala tipográfica clara: un tamaño de titular grande, un cuerpo, una etiqueta; no más.
- **Layout: columna única, alineada a la izquierda, ancho máximo 36-40 em.** Es un juego de móvil que también se ve en escritorio, no al revés. Sin hero: la primera línea de la página es el nombre del juego y la segunda ya es la primera pregunta.
- **Estructura = información.** Un borde o una regla aparece solo si separa algo que necesita separarse. Las barras de un gráfico no llevan sombra. Las opciones de respuesta son botones de texto con borde de 1 px negro; el seleccionado invierte (fondo negro, texto blanco).
- **Un único gesto memorable por juego**, que sale del propio dato: el hemiciclo que se rellena, el ranking que se ordena al final, la cuadrícula de emojis del resultado. Todo lo demás, silencioso.
- **Cierre compartible en texto plano**, maquetado como un recibo: nombre del juego, fecha, puntuación o afinidad, cuadrícula, URL. Sin tarjeta decorada.

## 3. Proceso obligatorio antes de escribir CSS

1. Escribe un **plan de diseño de diez líneas** en `docs/diseno-plan.md`: paleta (4-6 hex con nombre), tipografía y su papel, wireframe ASCII de la pantalla de juego y de la pantalla de cierre, y el gesto memorable del juego.
2. **Pásalo por la lista negra** y compáralo con lo que harías para "una página de quiz genérica". Cualquier coincidencia se cambia y se anota qué se cambió y por qué.
3. Solo entonces se escribe `shared/base.css`. Los tokens viven en `:root` como variables; ningún juego declara colores ni fuentes propios.
4. Tras montar cada juego, **captura de pantalla en 375 px y en 1280 px** y revisión contra la lista negra antes del commit. Regla de Chanel: antes de cerrar, quitar un adorno.
5. Suelo de calidad sin anunciarlo: foco de teclado visible, `prefers-reduced-motion` respetado, contraste AA, nada roto en móvil.

## 4. Test rápido de tres segundos

Si al abrir la página alguien que no sabe de qué va podría decir "esto lo ha hecho una IA", no pasa. Pistas de que no pasa: hay un degradado, hay tres tarjetas, hay una flecha en un botón, hay un fade-in, el titular tiene una palabra de otro color. Pistas de que pasa: parece una papeleta, un acta o una tabla de resultados bien compuesta, y lo único que llama la atención es el dato.
