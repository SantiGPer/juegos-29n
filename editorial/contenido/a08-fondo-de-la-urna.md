# A8 · El fondo de la urna

Estado: **textos aprobados por el autor** (2026-10-21), salvo la comprobación de las inventadas en el Registro. Selección del autor del 21-10 sobre editorial/catalogos/a08-nunca-votas-catalogo.md.

- Ámbito: candidaturas al Congreso en las elecciones generales del 23-07-2023.
- Motor: encadenador de rondas (`shared/motores/rondas.js`) con dos rondas de M10 emparejar y un duelo final; una puntuación sobre 11.
- Puntuación: 1 punto por pareja acertada (5 por ronda, incluida la candidatura inventada con «No existe») y 1 en el duelo.
- Inventadas (21-10): I4 en la ronda 1, entre otros nombres llamativos y junto a Por Mi Región, de la que es eco; I8 en la ronda 2, entre nombres genéricos. Propuesta de Cowork.
- Orden en pantalla (criterio del 19-10): candidaturas en orden alfabético; cifras de mayor a menor; «No existe» al final.
- Cada candidatura muestra las provincias en las que se presentó (decisión del autor, 21-10). Las de la candidatura inventada son parte de la ficción y se desvelan al resolver.
- Candidaturas inventadas: pendientes de comprobar en el Registro de Partidos Políticos y en las candidaturas proclamadas para el 29-N. Hasta entonces, [VERIFICAR].
- Fuente general: Ministerio del Interior (infoelectoral), resultados del Congreso de las elecciones generales del 23-07-2023. Elaboración propia (`data/resultados_2023_prov.json`).

## Portada

**Texto:** En cada papeleta hay alguien que se presentó con toda la ilusión del mundo y volvió a casa con 115 votos. Empareja a cada candidatura con lo que sacó y desenmascara a la que nunca existió.

**Reglas:**
- (papeleta) Dos rondas: une cada candidatura con sus votos. Una de las cinco no existe.
- (urna) 1 punto por pareja y 1 en el duelo final: 11 en total.

---

## Ronda 1 · Emparejar

**Enunciado:** Cinco candidaturas, cuatro cifras de votos y un impostor.

| Candidatura (en pantalla) | Provincias | Respuesta correcta |
| --- | --- | --- |
| Por Mi Comarca y la de al Lado (PMC+) | Albacete y Cuenca [inventado; propuesta] | No existe |
| Por Mi Región | Murcia | 1.698 |
| Referéndum Sistema Dinero (+RDS+) | Murcia | 165 |
| Tercera Edad en Acción (3e) | Segovia y La Rioja | 484 |

**Respuestas (en pantalla):** 5.620 · 1.698 · 484 · 165 · No existe

**Explicación:** Caminando Juntos fue la más votada de la ronda porque se presentó en diez provincias, y más de la mitad de sus votos salen de Valencia, Alicante y Sevilla. En Murcia compitieron dos de estas candidaturas: Por Mi Región sacó 1.698 votos y Referéndum Sistema Dinero, 165.

**La inventada:** Por Mi Comarca y la de al Lado no existe; Por Mi Región, sí, y sacó 1.698 votos en Murcia.

**Datos por provincia:** Caminando Juntos: Valencia 1.056, Alicante 1.027, Sevilla 912, Cádiz 745, Málaga 691, Granada 461, Murcia 453, Salamanca 140, Segovia 102, Palencia 33. Tercera Edad en Acción: La Rioja 286, Segovia 198.

**Fuente:** Ministerio del Interior, resultados del Congreso del 23-07-2023.

---

## Ronda 2 · Emparejar

**Enunciado:** Otras cinco. Una sigue sin existir.

| Candidatura (en pantalla) | Provincias | Respuesta correcta |
| --- | --- | --- |
| Fuerza Cívica | Valladolid | 115 |
| Horario Europeo Ya (HEY) | 6: Barcelona, Madrid, Málaga, Sevilla, Valencia y Zaragoza [inventado; propuesta] | No existe |
| Libres | Almería y Ceuta | 263 |
| Partido Autónomos | Alicante | 1.446 |
| Partido Humanista (PH) | Madrid | 2.902 |

**Respuestas (en pantalla):** 2.902 · 1.446 · 263 · 115 · No existe

**Explicación:** Fuerza Cívica, con 115 votos en Valladolid, fue la candidatura menos votada de todas las que se presentaron al Congreso en 2023. El Partido Humanista sacó 2.902 votos con una sola lista, la de Madrid, la provincia que más diputados elige.

**La inventada:** Horario Europeo Ya tampoco existe: la hemos inventado con la fórmula de las candidaturas que llevan el programa en el nombre.

**Datos por provincia:** Libres: Almería 210, Ceuta 53.

**Fuente:** Ministerio del Interior, resultados del Congreso del 23-07-2023.

---

## Duelo final

**Pregunta:** Uno se sentó en el Congreso y el otro no. ¿Quién sacó más votos?

**Opciones:** PACMA (0 escaños) · UPN (1 escaño)

**Correcta:** PACMA

**Explicación:** PACMA sacó 169.237 votos, más del triple que UPN, pero repartidos en 51 provincias no le alcanzaron para un escaño en ninguna. UPN solo se presentó en Navarra y con sus 52.188 votos sacó uno de los cinco diputados de la provincia.

**Datos:** PACMA 169.237 votos (51 provincias, 0 escaños; en las cuatro catalanas, como Partit Animalista amb el Medi Ambient) · UPN 52.188 votos (Navarra, 1 escaño).

**Fuente:** Ministerio del Interior, resultados del Congreso del 23-07-2023.
