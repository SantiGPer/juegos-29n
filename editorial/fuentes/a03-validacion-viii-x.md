# A3 Crispómetro: validación del conteo de VIII a XV

Validación del encargo del 16-10-2026 (tarde): precisión de la fórmula y de la atribución a la Presidencia en VIII–X, con el mismo método aplicado de paso a XI–XV. Script: `R/05_llamadas_al_orden.R`. Diarios del Pleno descargados de `https://www.congreso.es/public_oficiales/L<n>/CONG/DS/PL/` el 16-10-2026.

La regla de conteo no se ha tocado: es la del 15-10-2026. Lo que sigue mide cuánto se aparta de una lectura manual.

## Método

- **Precisión:** lectura manual de los 108 actos contados en VIII, IX y X (todos, no una muestra). Para cada uno, el fragmento y el texto previo de la intervención. Pregunta: ¿es una llamada al orden hecha en ese momento?
- **Atribución:** en los mismos 108 actos, comprobar que la intervención es de la Presidencia o de una Vicepresidencia. Este es el riesgo del formato `PL_` a dos columnas (hasta el diario 53 de la X), que se lee por columnas a partir de las coordenadas de cada palabra.
- **Exhaustividad:** búsqueda amplia de cualquier mención de llamar al orden («llam… al orden», «llamada al orden», «al orden, señor»), sea quien sea el orador, que no forme parte de un acto contado. Las menciones de la Presidencia se han leído a mano y clasificado (aviso, mención de una llamada anterior, cita del Reglamento o llamada no contada). Las de otros oradores, en una muestra de 25 por tanda: ninguna es una llamada.
- **Lector por columnas frente a texto crudo:** en los 332 diarios `PL_` de IX y X, el lector por columnas encuentra en cada diario al menos tantas fórmulas como `pdf_text` sin ordenar, y más cuando la fórmula está partida entre dos líneas.

## Resultado

| Leg. | Actos contados | Falsos positivos | Llamadas no contadas (lectura manual) | Atribución |
| --- | --- | --- | --- | --- |
| VIII | 40 | 1 | 0 seguras; 1 dudosa | correcta en los 40 |
| IX | 4 | 1 | 0 | correcta en los 4 |
| X | 64 | 1 | 6; 1 posible | correcta en los 64 |
| XI | 2 | — | 0 | correcta |
| XII | 23 | — | 1 | correcta |
| XIII | 0 | — | 0 | — |
| XIV | 48 | — | 1 | correcta |
| XV | 90 | — | 4 | correcta |

En XI–XV no se ha hecho la lectura de precisión acto por acto: no estaba en el encargo y su formato es el de la XV, ya validado el 15-10. Sí se ha hecho la de exhaustividad.

- **Precisión VIII–X:** 105 de 108 (97 %).
- **Exhaustividad VIII–X:** 105 de 111 seguras (95 %). En la X sola, 63 de 69 (91 %).

### Falsos positivos: avisos condicionales con la fórmula

- VIII, DS 84, pág. 4150: «Si no lo retira le llamo al orden por primera vez.»
- IX, DS 256, pág. 18: «A la próxima le llamo al orden.»
- X, DS 140, pág. 35: «Tiene usted que hablar de lo que está en el orden del día; de eso es de lo que debe usted hablar, si no lo hace, la llamo al orden.» Lo que sigue en el diario confirma que fue un aviso: «Señora García Álvarez, la llamo al orden por primera vez.»

### Llamadas que la fórmula no recoge

La fórmula es «le/la/les llamo (… ) al orden» o «queda llamado al orden». Se escapan los giros con perífrasis, frecuentes en el presidente Posada (X):

- X, DS 140: «Pues le tengo que llamar al orden por primera vez.»; «Le tengo que llamar al orden por segunda vez…»; «La tengo que llamar al orden por primera vez porque llamarla a la cuestión no creo que condujera a nada.»; «Entonces, señor Sixto, le tengo que llamar al orden por segunda vez.»; «Señora Vázquez, me obliga a llamarle al orden por segunda vez, por favor.»
- X, DS 232: «Señora López i Chamosa, le voy a llamar al orden por primera vez.»
- X, DS 309 (posible): se cuenta «le llamo al orden por tercera vez», pero la primera solo aparece como mención («le he llamado al orden por primera vez»).
- XII, DS 43: «Señor Merino, le vuelvo a llamar ahora al orden.»
- XIV, DS 205: «Señora Calvo, tengo que llamarla al orden por primera vez…»
- XV, DS 85: «…el señor Fernández Hernández, al que llamo al orden en este Pleno.»
- XV, DS 123: «Pero le tengo que llamar al orden por primera vez, señor Tellado.»
- XV, DS 169: «Está llamado al orden por primera vez.»
- XV, DS 206: «…pero llamo al orden por primera vez al señor Robles López…»
- VIII, DS 53 (dudosa): «Señor Hernando; por favor, señor Hernando, le he llamado al orden.» Puede ser la mención de la llamada anterior.

No cuentan, y con razón: avisos («no me obligue a llamarle al orden», «si continúa, le llamaré al orden»), menciones de llamadas anteriores («la he llamado al orden por primera vez», «tiene usted ya una llamada al orden»), citas del art. 104 del Reglamento y peticiones de los diputados («¡Llámele al orden!»).

## Denominador

Sesiones plenarias distintas por legislatura, con el criterio de la XV: número de «Sesión plenaria núm.» en la portada, sin la Diputación Permanente. Comprobaciones:

- Numeración sin huecos de la sesión 1 a la última en todas las legislaturas.
- Algunas portadas dicen «Sesión núm. N» (XII, diarios 71, 72 y 77) o «Sesión Plenaria núm.» (X, diario 1). Se leen igual.
- La sesión constitutiva de la XIII solo está publicada como `DSCD-13-PL-1-C2.PDF` (no hay `-C1`). Las partes `-C1` a `-C4` se buscan todas.
- Errata de portada en la VIII: el diario 87 (28-04-2005) dice «Sesión plenaria núm. 81», igual que el 86 (27-04-2005). Se cuenta como la 82, que es la que falta en la secuencia.
- En la XV, el diario 9 (constitución de la Diputación Permanente) repite «Sesión plenaria núm. 1» y no suma, como ya estaba anotado.

## Corrección que afecta a la XV

Un diario con una hoja sin folio legible (en blanco, láminas) se quedaba entero sin texto, aunque contaba como sesión. Pasaba ya en el script de la XV. Corregido: la hoja toma el folio de la anterior. La XV gana siete llamadas reales, en los diarios 182, 196, 207 y 210, y pasa de **83 a 90** en 203 sesiones. Ninguna de las 83 anteriores cambia. En la IX el fallo dejaba vacíos 14 diarios.

## Fórmula ampliada y avisos descontados (18-10-2026)

Decisión del 18-10-2026: la fórmula se amplía a las perífrasis con valor de llamada y los avisos condicionales se descuentan a mano. Rango: VIII, IX, X, XII, XIV y XV.

- **Coincidencias nuevas:** 24, revisadas todas a mano.
  - Llamadas reales: 14. Son las 6 perífrasis de la X, la XII DS 43 («le vuelvo a llamar ahora al orden»), la XIV DS 205 y 5 de la XV: DS 85, DS 123, DS 169, DS 206 y una que no recogía la validación anterior, DS 207, pág. 22 («tengo que llamar al orden a la señora Vázquez Blanco por haber enseñado un arma»). La decimocuarta es dudosa: XII DS 61, pág. 51 («les voy a llamar al orden a su señorías»). Es colectiva y sin ordinal, y cuenta.
  - Descartadas: 10. Son seis avisos condicionales («si le tengo que llamar al orden por tercera vez», «como siga así le voy a llamar al orden»), tres negaciones («no llamo a su señoría al orden», «no le voy a llamar al orden hoy») y una mención genérica («a pesar de que llamo al orden y al silencio»).
- **Avisos con la fórmula de antes:** se descuentan los tres de la validación (VIII DS 84, IX DS 256 y X DS 140, pág. 35).
- **Descartes antes de fusionar:** se quitan a nivel de coincidencia. Si se quitaran después, un aviso condicional uniría dos actos (XV DS 43, pág. 32) o abriría uno con otro ordinal (XII DS 156, pág. 41).
- La lista completa, con su motivo, está en `descartes`, en el script y en el JSON.
- **Barrido de control:** se han leído todas las coincidencias que quedan con un indicio de aviso justo antes de la fórmula («si», «próxima», «como siga», «cuando», «no»). Ninguna es un aviso: los «no» son citas de diputados o de la acotación «palabras que no se perciben».

| Leg. | Antes | Ahora | Sesiones plenarias | Por 100 sesiones |
| --- | --- | --- | --- | --- |
| VIII | 40 | 39 | 288 | 13,5 |
| IX | 4 | 3 | 262 | 1,1 |
| X | 64 | 69 | 293 | 23,5 |
| XII | 23 | 25 | 176 | 14,2 |
| XIV | 48 | 49 | 262 | 18,7 |
| XV | 90 | 95 | 203 | 46,8 |
