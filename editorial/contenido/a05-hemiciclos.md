# A5 · Hemiciclos

Estado: **aprobado por el autor** (2026-10-22), salvo los dos [VERIFICAR] de las explicaciones (cotejo de Code con la serie de Interior).

- Rondas (decisión del 20-10): generales de 1982, 2000, 2015 y 2023. Candidaturas con cinco escaños o más; el resto, en «Otros». 2015 con «Podemos y confluencias» (decisión del 20-10).
- Diseño del 20-10 (maqueta v11): lista y hemiciclo en orden alfabético de siglas, con «Otros» al final; siglas en 800 y nombre de la época debajo.
- Datos: `data/escanos_generales.json` (Ministerio del Interior, infoelectoral).
- Fuente general: Ministerio del Interior (infoelectoral), resultados del Congreso de las elecciones generales de 1982, 2000, 2015 y 2023.

## Portada

**Texto:** Cuatro elecciones, 350 escaños en cada una y ningún ujier que te diga dónde se sienta cada diputado. Reparte el hemiciclo como lo dejaron las urnas.

**Reglas:**
- (escaño) 4 elecciones: reparte los 350 escaños entre las candidaturas.
- (urna) Por ronda, celda llena si fallas 4 escaños o menos de media por candidatura, y media celda hasta 8.

## Puntuación (decisión del autor, 22-10)

- Error de la ronda: media del error absoluto por candidatura, «Otros» incluida (6 filas en 1982 y 2000, 8 en 2015 y 9 en 2023).
- **Celda llena: 4 escaños o menos. Media: más de 4 y hasta 8. Vacía: más de 8.** Mismos umbrales en las cuatro rondas. Criterio benévolo, por decisión del autor.
- Referencias de Cowork para fijarlos (no van en el juego):
  - repartir a partes iguales da entre 37,5 y 63,7 escaños de error medio;
  - quien acierta cada partido con un desvío típico del 10 % saca una mediana de 2 a 3 escaños de error (llena);
  - con un desvío del 20 %, de 5 a 6 (media);
  - con un 35 %, de 8 a 11 (vacía).
  (Simulación con 4.000 repartos por ronda; ruido normal relativo sobre el resultado real y reajuste a 350.)
- Cierre: error medio de las cuatro rondas, en cifras de casillas, con «escaños de error medio».

## Nombres de época

En pantalla: siglas (800) y nombre de la época debajo (lápiz). Decisión del autor (22-10): «Cs», «PSOE» (también en 2000, con «PSOE-Progresistas» como nombre de la época) y «PNV».

### Ronda 1 · 1982

| Siglas en pantalla | Nombre de la época | Interior (siglas · denominación) | Escaños |
| --- | --- | --- | ---: |
| AP-PDP | Alianza Popular-Partido Demócrata Popular | AP-PDP · ALIANZA POPULAR - PARTIDO DEMOCRATA POPULAR | 107 |
| CiU | Convergència i Unió | CIU · CONVERGENCIA I UNIO | 12 |
| PNV | Partido Nacionalista Vasco | EAJ-PNV · PARTIDO NACIONALISTA VASCO-EUZKO ALDERDI JELTZALEA | 8 |
| PSOE | Partido Socialista Obrero Español | PSOE · PARTIDO SOCIALISTA OBRERO ESPAÑOL | 202 |
| UCD | Unión de Centro Democrático | UCD · UNION DE CENTRO DEMOCRATICO | 11 |
| Otros | PCE, CDS, HB, ERC y EE | — | 10 |

**Explicación:** El PSOE sacó 202 escaños, la mayoría más amplia de la democracia [VERIFICAR con la serie de Interior], y AP-PDP pasó a ser la segunda fuerza con 107. UCD, el partido que gobernaba, se quedó en 11 escaños.

**Otros:** PCE 4, CDS 2, HB 2, ERC 1 y EE 1.

### Ronda 2 · 2000

| Siglas en pantalla | Nombre de la época | Interior | Escaños |
| --- | --- | --- | ---: |
| CiU | Convergència i Unió | CIU · CONVERGENCIA I UNIO | 15 |
| IU | Izquierda Unida | IU · IZQUIERDA UNIDA | 8 |
| PNV | Partido Nacionalista Vasco | EAJ-PNV · EUZKO ALDERDI JELTZALEA-PARTIDO NACIONALISTA VASCO | 7 |
| PP | Partido Popular | PP · PARTIDO POPULAR | 183 |
| PSOE | PSOE-Progresistas | PSOE-PROGR. · PARTIDO SOCIALISTA OBRERO ESPAÑOL - PROGRESISTAS | 125 |
| Otros | CC, BNG, PA, ERC, IC-V, EA y CHA | — | 12 |

**Explicación:** El PP ganó con 183 escaños, su primera mayoría absoluta, y el PSOE se presentó como PSOE-Progresistas. CiU, con 15 escaños, fue la tercera fuerza, por delante de IU (8).

**Otros:** CC 4, BNG 3, PA 1, ERC 1, IC-V 1, EA 1 y CHA 1.

### Ronda 3 · 2015

| Siglas en pantalla | Nombre de la época | Interior | Escaños |
| --- | --- | --- | ---: |
| Cs | Ciudadanos-Partido de la Ciudadanía | C's · CIUDADANOS-PARTIDO DE LA CIUDADANÍA | 40 |
| DL | Democràcia i Llibertat | DL · DEMOCRÀCIA I LLIBERTAT. CONVERGÈNCIA. DEMÒCRATES. | 8 |
| ERC-CatSí | Esquerra Republicana de Catalunya-Catalunya Sí | ERC-CATSI · ESQUERRA REPUBLICANA DE CATALUNYA-CATALUNYA SÍ | 9 |
| PNV | Partido Nacionalista Vasco | EAJ-PNV · EUZKO ALDERDI JELTZALEA-PARTIDO NACIONALISTA VASCO | 6 |
| Podemos | Podemos y confluencias | PODEMOS, EN COMÚ, PODEMOS-COM y PODEMOS-En (agrupadas el 20-10) | 69 |
| PP | Partido Popular | PP · PARTIDO POPULAR | 123 |
| PSOE | Partido Socialista Obrero Español | PSOE · PARTIDO SOCIALISTA OBRERO ESPAÑOL | 90 |
| Otros | IU-UPeC, EH Bildu y CC-PNC | — | 5 |

**Explicación:** Por primera vez, cuatro candidaturas pasaron de 40 escaños [VERIFICAR con la serie de Interior]: PP, PSOE, Podemos y sus confluencias, y Ciudadanos. Los 69 de Podemos suman Podemos (42), En Comú Podem (12), Compromís-Podemos-És el Moment (9) y En Marea (6).

**Otros:** IU-UPeC 2, EH Bildu 2 y CC-PNC 1.

### Ronda 4 · 2023

| Siglas en pantalla | Nombre de la época | Interior | Escaños |
| --- | --- | --- | ---: |
| EH Bildu | Euskal Herria Bildu | EH Bildu · EUSKAL HERRIA BILDU | 6 |
| ERC | Esquerra Republicana de Catalunya | ERC · ESQUERRA REPUBLICANA DE CATALUNYA | 7 |
| Junts | Junts per Catalunya-Junts | JxCAT - JUNTS · JUNTS PER CATALUNYA - JUNTS | 7 |
| PNV | Partido Nacionalista Vasco | EAJ-PNV · EUZKO ALDERDI JELTZALEA-PARTIDO NACIONALISTA VASCO | 5 |
| PP | Partido Popular | PP · PARTIDO POPULAR | 137 |
| PSOE | Partido Socialista Obrero Español | PSOE · PARTIDO SOCIALISTA OBRERO ESPAÑOL | 121 |
| Sumar | Sumar | SUMAR · SUMAR | 31 |
| Vox | Vox | VOX · VOX | 33 |
| Otros | BNG, CC y UPN | — | 3 |

**Explicación:** El PP fue la candidatura con más escaños (137), 16 más que el PSOE. Vox y Sumar quedaron a dos escaños (33 y 31), y ERC y Junts empataron a siete.

**Otros:** BNG 1, CC 1 y UPN 1.

**Fuente de las cuatro rondas:** Ministerio del Interior (infoelectoral), resultados del Congreso.
