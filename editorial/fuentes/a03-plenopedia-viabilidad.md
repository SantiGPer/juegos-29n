# A3 · Plenopedia: prueba de viabilidad (XV legislatura)

Encargo del 19-10-2026, con los ajustes, el método y la definición del Charlatán del mismo día. Hecho por Code el 18-10-2026. No incluye preguntas.

- **Script:** `R/08_plenopedia_xv.R` → `data/plenopedia_xv.json`.
- **Diputados y grupo por día:** `R/04_diputados.R` → `data/diputados_xv.json`.
- **Fuente:** los 210 PDF del Diario de Sesiones del Pleno de la XV que ya estaban en caché (descargados entre el 14 y el 16-10-2026). Son 203 sesiones plenarias, sin la Diputación Permanente.
- **Diputados:** datos abiertos del Congreso (DiputadosActivos y DiputadosDeBaja), consultados el 18-10-2026.

## Método aplicado

- **Intervención:** de una etiqueta de orador («El señor TELLADO FILGUEIRA:») a la siguiente.
- **Palabras:** las del orador, sin acotaciones ni interrupciones de otros («(El señor X: ¡Mentira!)»).
- **Lenguas cooficiales.** El Diario publica dos veces las intervenciones en catalán, gallego o euskera: primero el original y después la interpretación al castellano. Solo se cuenta la interpretación, para no duplicar palabras ni menciones. Se descartan 1,46 millones de palabras en otra lengua, un 13 % de lo transcrito. Sin ese filtro, Junts tendría un 96 % más de palabras, ERC un 84 % más, el Mixto un 29 % más (sobre todo el BNG) y Sumar un 14 % más. PNV y EH Bildu hablan casi siempre en castellano (8 %).
- **Gobierno:** el presidente, los vicepresidentes y los ministros, según la etiqueta del Diario, también en funciones (agosto-noviembre de 2023). El candidato Sánchez de la investidura de noviembre de 2023 cuenta como Gobierno. El candidato Feijóo cuenta como diputado del PP.
- **Mesa:** la Presidencia, las vicepresidencias y las secretarías cuando presiden. Va aparte y no suma ni a los grupos ni al Charlatán.
- **Otros:** representantes de parlamentos autonómicos, el Defensor del Pueblo y presidentes autonómicos. Son 53.526 palabras.
- **Grupo:** el del diputado ese día, según `diputados_xv.json`. Los datos abiertos solo dan el último grupo de cada diputado, así que los cambios se reconstruyen con la fecha de alta en el grupo:
  - Podemos (5 diputados), al Mixto el 05-12-2023.
  - Ábalos, al Mixto el 27-02-2024.
  - Micó, al Mixto el 03-07-2025.
  - Ortega Smith, al Mixto el 17-07-2026.
- **Mixto:** se cuenta como grupo y se desglosa por partido (BNG, CC, UPN, Podemos, Compromís, Ábalos y Ortega Smith). El partido dentro del Mixto está puesto a mano.
- **Escaños de cada grupo:** media diaria de diputados entre el 17-08-2023 y el 06-10-2026, para tener en cuenta los cambios.
- **Normalización:** todo desglose por grupo va por cada 10.000 palabras del grupo.
- **Erratas del Diario resueltas en el script:**
  - Etiquetas: «EL señor», «El Señor», punto en lugar de dos puntos, etiqueta sin signo y etiquetas partidas en dos líneas.
  - 30 etiquetas con apellidos mal escritos o incompletos («GAMARA», «ÁLVREZ», «RODRÍGUEZ DE MILLÁN», «MARTA MADRENAS I MIR»…). Se cruzan a una distancia de dos letras o menos, o por apellidos incompletos, y están revisadas una a una (lista en `control.cruces_aproximados` del JSON).
  - Varias grafías del mismo miembro del Gobierno («Pérez SánchezCastejón», «Grande Marlaska Gómez», «Cuerpo Cabello»), unidas a la más frecuente.
- **Control final:** ninguna etiqueta de orador queda sin reconocer. Hay cuatro oradores con apellidos en mayúsculas que no son diputados de la XV (ver dudas).

## Indicadores

| Indicador | Formato estable en la XV | Ejemplo literal | Total |
| --- | --- | --- | --- |
| Rumores | Sí | DS 150, pág. 7: «Continuamos con la comparecencia del presidente del Gobierno ante el Pleno de la Cámara. (Rumores).» | 6.493 |
| Protestas | Sí | DS 150, pág. 12: «La posición del Gobierno… (Protestas). ¿Estoy diciendo una mentira, señorías?» | 2.355 |
| Risas | Sí | DS 150, pág. 10: «…el colapso político intelectual de la derecha tradicional en nuestro país y en nuestro continente. (Risas).» | 1.764 |
| Aplausos | Sí | DS 150, pág. 18: «(Aplausos de las señoras y los señores diputados del Grupo Parlamentario Socialista y de los miembros del Gobierno, puestos en pie)» | 33.682 |
| Apertura y cierre | Sí | DS 100, pág. 5: «Se abre la sesión a las tres y un minuto de la tarde.» Pág. 74: «Eran las ocho y veintiocho minutos de la noche.» | 203 jornadas |
| Minuto de silencio | Sí | DS 100, pág. 5: «(La Cámara, puesta en pie, guarda un minuto de silencio).» | 64 |
| Palabras | Sí, con la doble transcripción de las lenguas cooficiales desde septiembre de 2023 | DS 100, pág. 49: «Moito obrigado.» seguido de la interpretación «Gracias, señor presidente. El BNG, como fuerza soberanista…» | 9.308.684 |
| Menciones | Sí | DS 150, pág. 52: «…con los votos de los herederos políticos de ETA…» | ver tabla |

- **Rumores, protestas, risas y aplausos.** Cada pieza de una acotación cuenta una vez: «(Rumores.―Aplausos)» suma un rumor y un aplauso. Se atribuye al orador que tiene la palabra. Por trimestre, las cuatro acotaciones aparecen con frecuencias parecidas de principio a fin (tabla `trimestres` del JSON), sin cambios de formato.
- **Aplausos.** Se cuenta que hay aplauso, no quién aplaude (decisión del autor, 18-10). Solo un 5 % de las acotaciones lo dice.
- **Horas.** Salen de la apertura («Se abre/reanuda la sesión a las…») y del cierre («Eran las…»; a veces «Se suspende/levanta la sesión a las…»).
  - Cada sesión plenaria de la XV ocupa un solo diario, así que jornada y sesión son lo mismo.
  - 73 jornadas tienen pausas intermedias. En siete, la suspensión no lleva hora y no se puede calcular la duración neta.
- **Minutos de silencio.** Contraste con el orden del día de la portada:
  - 62 jornadas coinciden.
  - En dos (DS 83 y DS 92), el minuto de silencio no figura en la primera página del orden del día.
  - En dos (DS 91 y DS 147), el orden del día lo anuncia, pero el script no encuentra la acotación. El DS 91 tiene la petición de la presidenta («tengo que pedirles que nos pongamos en pie para hacer un minuto de silencio…»). Hay que mirarlos a mano: la cifra está entre 64 y 66.

### Palabras por grupo (Charlatán, catálogo 26)

| Grupo | Palabras | Escaños (media) | Palabras por escaño | % palabras / % escaños |
| --- | --- | --- | --- | --- |
| Mixto | 810.054 | 7,75 | 104.550 | 5,26 |
| PNV | 514.646 | 4,99 | 103.037 | 5,19 |
| ERC | 602.518 | 6,99 | 86.214 | 4,34 |
| EH Bildu | 433.985 | 6,00 | 72.362 | 3,64 |
| Junts | 499.986 | 6,96 | 71.838 | 3,62 |
| Vox | 1.073.932 | 32,9 | 32.618 | 1,64 |
| Sumar | 814.319 | 26,9 | 30.253 | 1,52 |
| PP | 1.398.156 | 137 | 10.213 | 0,51 |
| PSOE | 795.972 | 120 | 6.621 | 0,33 |

- Gobierno: 1.893.271 palabras. Mesa: 418.319.
- **Mixto por partido** (palabras por escaño): BNG 203.982 (un diputado), Compromís 155.390, UPN 115.176, CC 102.795 y Podemos 88.911. Ábalos y Ortega Smith no tienen palabras en el Mixto.
- El PSOE sale último en parte porque las palabras de sus ministros cuentan como Gobierno.

### Charlatán (catálogo 25 y 27)

- **Diputados** (412 personas, sustitutos incluidos):
  1. Rego Candamil (BNG, Mixto): 203.982.
  2. Sagastizabal (PNV): 145.571.
  3. Matute (EH Bildu): 132.069.
  4. Núñez Feijóo (PP): 128.034.
  5. Legarda (PNV): 122.177.
  
  34 diputados no hablaron nunca en el Pleno.
- **Gobierno:**
  1. Sánchez: 387.836.
  2. Montero: 165.790.
  3. Bolaños: 153.370.
  4. Grande-Marlaska: 144.462.
  5. Puente: 140.668.

### Acotaciones por grupo del orador, por cada 10.000 palabras (catálogo 4 a 6)

| Grupo | Rumores | Protestas | Risas | Aplausos |
| --- | --- | --- | --- | --- |
| Gobierno | 13,2 | 4,80 | 3,31 | 37,8 |
| PSOE | 8,42 | 3,34 | 2,39 | 55,6 |
| PP | 7,30 | 2,57 | 4,04 | 63,7 |
| ERC | 4,45 | 0,85 | 2,07 | 14,9 |
| Vox | 3,64 | 1,16 | 1,28 | 54,1 |
| Mixto | 3,09 | 1,06 | 0,27 | 13,4 |
| Sumar | 2,59 | 0,79 | 0,44 | 39,5 |
| EH Bildu | 2,17 | 0,25 | 0,25 | 7,86 |
| PNV | 1,07 | 0,04 | 0,29 | 1,40 |
| Junts | 0,60 | 0,08 | 0,04 | 0,72 |

- La Mesa tiene 23,8 rumores por cada 10.000 palabras: es cuando pide silencio.
- **Risas por orador:** Sánchez 266, Feijóo 228, Montero 94, Bolaños 88 y Rufián 88.

### Duración (catálogo 12 y 13)

- **La más larga:** DS 135 (10-09-2025), de las 9.00 a las 21.21, 12 h 21 min sin pausas. Le siguen el DS 58 (23-07-2024, 12 h 10 min) y el DS 16 (10-01-2024, 11 h 35 min con dos pausas).
- **La que acabó más tarde:** DS 14 (19-12-2023), a las 23.25.
- **La más corta:** DS 75 (30-10-2024), 25 minutos, suspendida tras el minuto de silencio por la dana.
- **Total:** 1.187 horas en 203 jornadas, 5 h 51 min de media (bruta, con pausas).

### Menciones (catálogo 18 a 24)

Totales de la legislatura, solo en castellano, incluidos el Gobierno y la Mesa:

| Término | Total |
| --- | --- |
| España | 20.126 |
| vivienda(s) | 10.239 |
| Sánchez | 7.807 |
| Cataluña | 6.635 |
| Europa | 4.945 |
| corrupción(es) | 4.733 |
| Feijóo | 3.626 |
| amnistía | 1.522 |
| Abascal | 1.125 |
| ETA | 859 |
| Palestina | 836 |
| Venezuela | 649 |
| Puigdemont | 353 |
| Franco | 307 |

Por cada 10.000 palabras de cada grupo (selección):

- **ETA:** Mixto 1,90, Vox 1,81, PP 1,49, ERC 1,03 y PSOE 0,99. Junts, 0,06.
- **España:** Vox 40,0, Gobierno 32,8, PSOE 27,1 y PP 26,8. EH Bildu, 3,89.
- **Cataluña:** Junts 50,3 y ERC 18,9.
- **Sánchez:** PP 26,8 y Vox 13,4.
- **Feijóo:** PSOE 9,16 y Gobierno 7,12.
- **Pregunta 22 (PP):** Sánchez, 3.754 menciones; Puigdemont, 136.
- **Pregunta 24 (Gobierno):** Feijóo, 1.348; Abascal, 549.
- **Pregunta 20:** Venezuela (649) frente a Franco (307).

Criterios: «ETA» solo en mayúsculas; «Franco» con mayúscula y sin «señor/señora» delante (hay una diputada del PP, Silvia Franco); «Europa» sin «europeo»; «vivienda» y «corrupción», también en plural.

Límites:
- **«Sánchez»** incluye a otras personas con ese apellido (Sánchez Serna, Sánchez García y otras). Para la pregunta 23 haría falta acotarlo, por ejemplo a «Pedro Sánchez» y «señor Sánchez» con el presidente como destinatario.
- **«Cataluña»** no cuenta «Catalunya» porque el original en catalán se descarta.

### Llamadas al orden por grupo del llamado (catálogo 1 a 3)

- Sobre los 94 actos de la XV (ver más abajo la corrección del 19-10).
- **Presidencia:** Armengol 56 y Rodríguez Gómez de Celis 38.
- **Grupo del llamado.** Se cruza el apellido del vocativo con los diputados en el cargo ese día. Si hay varios candidatos, decide el fragmento con los dos apellidos («(El señor Conde Bajén: …)»).
  - Asignados automáticamente: 65 de 94. PP 55, Vox 8, PSOE 1 y Sumar 1.
  - Sin asignar: 29. Quince no tienen apellido («Señoría», «señor diputado» o sin vocativo). Catorce son apellidos ambiguos sin desempate en el fragmento: Hernando (cuatro), Sánchez (cuatro), Conde (dos), Mariscal, García, Alfonso y Rodríguez.
  - Hay que leer esos 29 fragmentos a mano antes de usar las preguntas 1 y 3.
- **Más llamado:** Tellado (PP), 16 veces.

## Veredicto por pregunta del catálogo

| # | Viable | Nota |
| --- | --- | --- |
| 1, 3 | Con revisión manual | 29 de 94 llamadas sin destinatario automático |
| 2 | Sí | Armengol 56, Rodríguez Gómez de Celis 38 |
| 4, 5, 6 | Sí | Atribuido al orador que tiene la palabra, no a quien hace ruido |
| 7 | Sí, reformulada | Aplausos durante las intervenciones de cada grupo, no quién aplaude |
| 8 | No | Necesita saber quién aplaude |
| 12, 13 | Sí | Duración bruta; 7 jornadas sin duración neta |
| 14 | Casi | 64 seguros; 2 dudosos que hay que revisar a mano |
| 18 a 22, 24 | Sí | Con los criterios de arriba |
| 23 | Con reservas | «Sánchez» mezcla personas |
| 25, 26, 27 | Sí | |

## Correcciones de A3 aplicadas (encargo, punto 1)

- **XII, DS 61** (llamada colectiva, «les voy a llamar al orden»): ya contaba como acto. Queda anotado en el script y en el método del JSON.
- **XV, DS 43, pág. 32:** las dos «le llamo al orden por primera vez» a Tellado se fusionan en un acto. Es una fusión a mano (`fusiones_a_mano` en el JSON), no una regla general (decisión del autor, 18-10).
- **Resultado:** XV = **94/203**. El resto de legislaturas no cambia (XIV, 49/262).
- Una regla general por ordinal habría fusionado también el DS 67 y el DS 169 de la XV (Tellado) y el DS 97 de la XIV. Quedan como estaban.
- **Periodo de la XV:** 2023–2026. `legislaturas.json` tiene un campo nuevo, `disolucion` (06-10-2026, fecha de baja de todos los diputados en los datos abiertos), y el juego muestra «2023–2026».

## Decisiones del autor sobre las dudas (18-10)

- XV = 94: solo se fusiona el DS 43.
- No se comparan legislaturas: todo Plenopedia va sobre la XV. El DS 97 de la XIV deja de importar.
- La Mesa queda fuera del Charlatán y de los grupos. Feijóo candidato cuenta para el PP; Sánchez candidato, como Gobierno.
- Aplausos: basta con saber que se aplaude, no quién. El cálculo de quién aplaude sale del script.

## Dudas pendientes

1. **«Sánchez» (pregunta 23).** El recuento mezcla a todas las personas con ese apellido. Habría que acotarlo.
2. **Cuatro oradores sin identificar,** con etiqueta de diputado pero que no figuran entre los diputados de la XV: Armario Rodríguez, Córdoba Marí, Gil Membrado y Costa Serra (unas 2.500 palabras). Probablemente sean promotores de iniciativas legislativas populares. Están en «Otros».
