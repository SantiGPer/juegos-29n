# A6 · Viabilidad de las seis métricas (encargo del 20-10-2026)

Consulta: 20-10-2026. Solo comprobación; no se monta el juego ni se genera JSON. Rango propuesto por Cowork (pendiente del autor): VIII, IX, X, XII, XIV y XV. Fechas de cada legislatura, de `data/legislaturas.json`; la XV, hasta la disolución (06-10-2026).

## Resumen

| Métrica | ¿Viable? | Fuente | Rango |
| --- | --- | --- | --- |
| 1. Leyes aprobadas por año | Sí | BOE, buscador del diario | VIII–XV |
| 2. Peso de los decretos-ley | Sí | BOE, buscador del diario | VIII–XV |
| 3. Proposiciones de ley presentadas por grupo | Sí, solo XV | Congreso, datos abiertos | XV |
| 4. Proposiciones que llegaron a ser ley, por grupo | Sí, solo XV, con un límite | Congreso, datos abiertos | XV |
| 5. Preguntas orales al presidente en el Pleno | Sí, con validación manual pendiente | Diario de Sesiones, sumarios | VIII–XV |
| 6. Comparecencias de ministros | Sí, con límites de definición | Congreso, buscador de iniciativas | VIII–XV |

## 1 y 2. Leyes y decretos-ley

**Fuente.** BOE, buscador del diario (https://www.boe.es/buscar/boe.php): sección I, departamento «Jefatura del Estado» y fecha de publicación dentro de la legislatura. El rango se clasifica por el título: «Ley Orgánica N/AAAA, de», «Ley N/AAAA, de» y «Real Decreto-ley N/AAAA, de». Quedan fuera las correcciones de errores y los instrumentos de ratificación. Los reales decretos legislativos, que también tienen rango de ley pero no los firma la Jefatura del Estado, salen de una búsqueda aparte por título.

**Descartado: la API de legislación consolidada del BOE.** Solo incluye las normas consolidadas y se deja fuera la mayoría de los decretos-ley ya agotados o derogados: en la VIII da 6 decretos-ley, cuando hubo 52.

**Control.** En la XV, los números de ley, ley orgánica y decreto-ley del fichero de los datos abiertos del Congreso (`IniciativasLegislativasAprobadas`) coinciden uno a uno con los del BOE. El fichero del Congreso tiene más filas (126 en «Reales decretos») porque repite cada norma con sus correcciones de errores y la resolución de convalidación.

**Formato estable** en todo el rango: el título del BOE sigue la misma fórmula desde 2004.

| Legislatura | Años | Leyes orgánicas | Leyes | Leyes por año | Decretos-ley | RD legislativos | % decretos-ley¹ | % con RD legislativos² |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| VIII | 3,99 | 33 | 134 | 41,8 | 52 | 6 | 23,7 | 23,1 |
| IX | 3,70 | 26 | 115 | 38,1 | 56 | 5 | 28,4 | 27,7 |
| X | 4,08 | 41 | 128 | 41,4 | 76 | 9 | 31,0 | 29,9 |
| XII | 2,83 | 11 | 28 | 13,8 | 65 | 1 | 62,5 | 61,9 |
| XIV | 3,70 | 33 | 85 | 31,9 | 97 | 1 | 45,1 | 44,9 |
| XV | 3,14 | 13 | 21 | 10,8 | 61 | 0 | 64,2 | 64,2 |

¹ Decretos-ley sobre leyes, leyes orgánicas y decretos-ley. ² Añadiendo los reales decretos legislativos al denominador.

**Límites.**
- «Leyes por año» divide entre los años de la legislatura, de la constitución a la disolución. La XII tuvo un cambio de Gobierno a mitad (moción de censura de 2018), así que mezcla dos Gobiernos.
- Los decretos-ley se cuentan por publicación, hasta el 20-10-2026 en la XV: un Gobierno en funciones puede seguir aprobándolos tras la disolución. No se distingue si el Congreso convalidó o derogó cada uno (eso está en el Congreso, no en el BOE).
- Las leyes se cuentan por publicación en el BOE dentro de las fechas de la legislatura. Una ley aprobada al final de una legislatura y publicada en la siguiente se asigna a esta última. No se ha medido cuántas hay.

## 3 y 4. Proposiciones de ley por grupo (solo XV)

**Fuente.** Congreso, datos abiertos (https://www.congreso.es/es/opendata/iniciativas), fichero `ProposicionesDeLey` del 20-10-2026. Solo cubre la XV. Para legislaturas anteriores habría que usar el buscador de iniciativas (ver la métrica 6), que sí las tiene.

**Método.**
- Solo «Proposición de ley de Grupos Parlamentarios del Congreso»: son 306. Quedan fuera las del Senado (47), las de comunidades autónomas (16) y las de diputados (2).
- Las conjuntas (14) traen un autor por línea en el campo `AUTOR` y cuentan para cada grupo firmante.
- «Llegó a ser ley»: la tramitación termina en «Concluido - (Aprobado con o sin modificaciones)».
- Normalización por diputado: tamaño medio del grupo durante la legislatura (diputados-día entre días), con los periodos de `data/diputados_xv.json`. Un diputado cuenta para el grupo en el que estaba cada día.

| Grupo | Presentadas | Conjuntas | Aprobadas | Diputados (media) | Presentadas por diputado | Aprobadas por diputado | % aprobadas |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Sumar | 66 | 10 | 0 | 27,1 | 2,44 | 0 | 0 |
| PP | 63 | 1 | 1 | 138,0 | 0,46 | 0,007 | 1,6 |
| Mixto | 61 | 8 | 1 | 7,8 | 7,85 | 0,129 | 1,6 |
| Vox | 48 | 0 | 0 | 33,1 | 1,45 | 0 | 0 |
| PSOE | 40 | 7 | 9 | 121,2 | 0,33 | 0,074 | 22,5 |
| ERC | 14 | 1 | 0 | 7,0 | 1,99 | 0 | 0 |
| Junts | 14 | 1 | 1 | 7,0 | 2,00 | 0,143 | 7,1 |
| PNV | 12 | 1 | 0 | 5,0 | 2,40 | 0 | 0 |
| EH Bildu | 4 | 2 | 0 | 6,0 | 0,67 | 0 | 0 |

**Límites.**
- **Mixto.** Por diputado sale disparado (7,85) porque es un grupo de unos ocho diputados con varios partidos. Si se muestra, mejor con el desglose por partido; el fichero no lo trae y habría que sacarlo del firmante de cada iniciativa en el BOCG.
- **«Llegó a ser ley».** El estado final de la tramitación en el Congreso no se ha cruzado con la ley publicada en el BOE. Control indirecto: 21 proyectos aprobados más 12 proposiciones aprobadas (11 de grupos, una de comisión y una de una comunidad) suman 33, frente a 34 leyes y leyes orgánicas en el BOE. Queda una ley sin localizar en los ficheros del Congreso; antes de usar la métrica, el cruce tiene que hacerse ley a ley.
- **Conjuntas.** Una proposición firmada por PSOE y Sumar cuenta una vez para cada uno. Si se prefiere repartirla (½ y ½), las cifras cambian poco: solo hay 14.

## 5. Preguntas orales al presidente en el Pleno

**Por qué no el Congreso.** El buscador de iniciativas tiene las preguntas orales en Pleno (tipo 180: 2.227 en la VIII y 1.205 en la XV), pero ningún campo dice a quién van. Filtrar por texto tampoco sirve.

**Fuente.** Diario de Sesiones del Pleno, los mismos PDF de la caché de `R/05` (VIII a XV). Se lee el sumario, las 12 primeras páginas cortadas en «Se abre la sesión» si aparece. En los PDF `PL_` a dos columnas (VIII, IX y X hasta el diario 53) se usa el lector por columnas de `R/05`.

**Método.** Fórmula «Del diputado don X, del Grupo…, que formula al señor presidente del Gobierno» (también «Sr. Presidente»). Cada pregunta sale dos veces en el sumario (en el orden del día y en las intervenciones), así que se cuentan **diputados distintos por sesión**: un diputado no pregunta dos veces al presidente en la misma sesión. Formato estable en todo el rango, con la salvedad de las columnas de los PDF antiguos.

| Legislatura | Diarios | Sesiones con preguntas al presidente | Preguntas | Preguntas por sesión (moda) |
| --- | ---: | ---: | ---: | ---: |
| VIII | 315 | 81 | 283 | 3 |
| IX | 279 | 72 | 207 | 3 |
| X | 315 | 68 | 205 | 3 |
| XII | 186 | 43 | 130 | 3 |
| XIV | 275 | 66 | 198 | 3 |
| XV | 210 | 51 | 149 | 3 |

**Límites.**
- **Falta validar a mano.** Hay sesiones con 4, 5 o 6 preguntas: 34 en la VIII, 16 en la IX, 11 en la X, 3 en la XII, 8 en la XIV y ninguna en la XV. Pueden ser reales (en la VIII se hacían más preguntas por sesión) o nombres que el lector de columnas parte en dos. Antes de usar la cifra hay que leer una muestra contra el Diario, como se hizo con las llamadas al orden.
- Cuenta preguntas formuladas en el orden del día. Una pregunta retirada o aplazada que figure en el sumario cuenta igual.
- La caché de PDF es la de `R/05` (VIII a XV). Para usar la métrica en un juego habría que pasar esto a un script en `R/`.

## 6. Comparecencias de ministros

**Fuente.** Congreso, buscador de iniciativas (https://www.congreso.es/es/busqueda-de-iniciativas), recurso `filtrarListado` en JSON, con el filtro por legislatura y tipo. Descargadas todas las páginas el 20-10-2026. Tipos:
- **210:** comparecencia del Gobierno ante el Pleno;
- **213:** comparecencia del Gobierno en Comisión a petición de los grupos (art. 44);
- **214:** comparecencia del Gobierno en Comisión a petición propia (arts. 202 y 203).

**Método.**
- Solo las solicitudes cuyo título nombra a un ministro, una vicepresidencia o la Presidencia del Gobierno (`minist`, `vicepresident`, `presidente del Gobierno`). Así quedan fuera los secretarios de Estado y otros altos cargos de los tipos 212 y 219.
- «Celebrada» = resultado «Tramitado por completo sin req. acuerdo o decisión».

| Legislatura | Solicitudes Pleno (210) | Celebradas Pleno | Solicitudes Comisión (213) | Celebradas Comisión (213) | A petición propia en Comisión (214), celebradas | Total celebradas |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| VIII | 97 | 26 | 1.115 | 423 | 169 | 618 |
| IX | 91 | 43 | 1.149 | 450 | 212 | 705 |
| X | 158 | 23 | 2.187 | 494 | 126 | 643 |
| XII | 70 | 19 | 1.447 | 429 | 111 | 559 |
| XIV | 145 | 28 | 2.762 | 921 | 187 | 1.136 |
| XV | 164 | 81 | 1.340 | 309 | 104 | 494 |

Comprobado que de cada legislatura y tipo se bajan tantos registros como anuncia el buscador. En una primera descarga se perdieron páginas de la IX y la XIV sin dar error; se repitieron.

**Límites.**
- **Solicitudes y sesiones no son lo mismo.** Varias solicitudes de distintos grupos se acumulan en una sola comparecencia, y todas quedan «tramitadas por completo». La cifra mide solicitudes atendidas, no sesiones. Contar sesiones exigiría los Diarios de Sesiones de las comisiones, que no están descargados (solo los del Pleno).
- **Pleno frente a Comisión.** En el Pleno las comparecencias son pocas (entre 19 y 81 por legislatura). En comisión son cientos. Si la métrica es «comparecencias de ministros», conviene decidir si se suman las dos o se usa solo una.
- La XV tiene muchas más comparecencias en el Pleno (81) y menos en comisión (309). Habría que ver en el Diario si es un cambio de práctica (debates monográficos en el Pleno) antes de convertirlo en pregunta.
