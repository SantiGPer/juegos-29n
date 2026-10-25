# A9 · Fontanería electoral — catálogo de configuraciones (2026-10-25)

Planteamiento del autor (25-10): cada pregunta propone un cambio en el sistema electoral del Congreso y el jugador elige, entre varias opciones, cómo afecta al resultado. El voto no cambia: es el de las generales del 23-07-2023.

Cálculos exploratorios de Cowork con `data/resultados_2023_prov.json`. La simulación reproduce exactamente el reparto real (D'Hondt, barrera del 3 % sobre votos válidos con blanco, en cada provincia). **Code tiene que repetirlos en R antes de que entren en el juego.**

## Reglas metodológicas (propuesta)

1. **Mismo voto.** Solo cambia la regla; los votos de cada candidatura en cada provincia son los oficiales (con el CERA). Nota metodológica obligatoria en el juego: con otras reglas, votantes y partidos se comportarían de otra forma (voto útil, coaliciones), así que el ejercicio enseña la mecánica, no predice lo que habría pasado.
2. **Listas cerradas y bloqueadas.** Nada que necesite votos a personas (voto preferente, listas abiertas, panachage).
3. **Solo sistemas proporcionales** (CE, art. 68.3). Fuera los mayoritarios, los distritos uninominales y las primas a la lista más votada: además de ser inconstitucionales para el Congreso, no hay datos por distrito.
4. **No se cambia el electorado** (edad de voto, voto obligatorio, quitar el CERA): eso cambia los votos, no la fontanería.
5. **Se dice qué norma habría que cambiar.** LOREG si basta con ley orgánica; Constitución si toca la provincia como circunscripción (art. 68.2) o el tamaño fuera de 300-400 (art. 68.1).
6. **Candidaturas por su cabecera nacional** (Sumar con sus listas territoriales, PSOE con el PSC). Al sumar votos de varias provincias se suman los de la misma candidatura de acumulación.

## Configuraciones calculables

Resultado real de 2023: PP 137, PSOE 121, Vox 33, Sumar 31, ERC 7, Junts 7, EH Bildu 6, PNV 5, BNG 1, CC 1 y UPN 1 (11 candidaturas). PP + Vox, 170; mayoría absoluta, 176.

### Barrera legal (LOREG, art. 163.1.a)

| # | Cambio | Resultado (diferencia con el real) | Gancho | Norma |
| --- | --- | --- | --- | --- |
| B1 | Quitar la barrera del 3 % | **Nada cambia.** | La barrera provincial no decide ningún escaño: la verdadera barrera es el tamaño de la provincia | LOREG |
| B2 | Subirla al 5 % | **Nada cambia.** | Igual que B1 | LOREG |
| B3 | Subirla al 10 % | PP +2, PSOE +3, ERC +1; Vox −2, Junts −3, BNG −1 | Hay que llegar al 10 % para que se note | LOREG |
| B4 | Barrera del 3 % en toda España (al estilo de la barrera federal alemana, sin sus excepciones), además de la provincial | Desaparecen ERC, Junts, EH Bildu, PNV, BNG, CC y UPN; PSOE +14, Sumar +7, PP +5, Vox +2. PP + Vox, 177: mayoría absoluta | Una barrera nacional borra a todos los partidos de ámbito territorial | LOREG |
| B5 | Barrera del 5 % en toda España | Igual que B4 | Del 3 al 5 % no cambia nada: Sumar (12,3 %) y Vox (12,4 %) quedan muy por encima | LOREG |
| B6 | Excluir el voto en blanco del cálculo de la barrera | Nada cambia | Se puede descartar o usar como pregunta trampa | LOREG |

### Fórmula de reparto (LOREG, art. 163)

| # | Cambio | Resultado | Gancho | Norma |
| --- | --- | --- | --- | --- |
| F1 | Sainte-Laguë (divisores 1, 3, 5…) | PP −10, PSOE −7, Junts −1, PNV −1; Vox +10, Sumar +6, BNG +1, Nueva Canarias +1, Teruel Existe +1 (13 candidaturas) | D'Hondt premia a los grandes: con otra fórmula, Vox gana diez escaños | LOREG |
| F2 | Sainte-Laguë modificada (primer divisor 1,4, como en Suecia y Noruega) | PP −7, PSOE −2, Junts −1, PNV −1; Vox +5, Sumar +4, BNG +1, Nueva Canarias +1 | Un solo decimal en el primer divisor mueve siete escaños del PP | LOREG |
| F3 | Cuota Hare y restos mayores | PP −13, PSOE −9, Junts −1, PNV −1; Vox +13, Sumar +6, BNG +3, Nueva Canarias +1, Teruel Existe +1 | La más proporcional: el BNG pasa de 1 a 4 | LOREG |
| F4 | Cuota Droop y restos mayores | PP −4, PSOE −4, Junts −1, PNV −1; Vox +4, Sumar +3, BNG +1, Nueva Canarias +1, Teruel Existe +1 | Punto medio | LOREG |

### Circunscripción (CE, art. 68.2: hoy es la provincia)

| # | Cambio | Resultado | Gancho | Norma |
| --- | --- | --- | --- | --- |
| C1 | Una circunscripción por comunidad autónoma (Ceuta y Melilla aparte), con los mismos escaños sumados y D'Hondt al 3 % | PP −12, PSOE −2, Junts −2, EH Bildu −1; Vox +9, Sumar +6, BNG +1, CC +1 | Juntar provincias ya basta para que Vox gane nueve | Constitución |
| C2 | Circunscripción única de 350, D'Hondt y barrera del 3 % nacional | Desaparecen los siete partidos territoriales; Sumar +17, Vox +15, PSOE +3; PP −7. PP + Vox, 178: mayoría absoluta | El cambio más grande del catálogo | Constitución |
| C3 | Circunscripción única de 350, D'Hondt sin barrera | PP −17, PSOE −6; Vox +12, Sumar +14; entran PACMA (2) y la CUP (1); sale UPN | Sin barrera, PACMA sí tendría escaño (enlaza con A8) | Constitución |
| C4 | Circunscripción única de 350, Sainte-Laguë sin barrera | PP −20, PSOE −8; Vox +11, Sumar +13; entran PACMA (2), CUP, Frente Obrero y Nueva Canarias (1 cada uno); 15 candidaturas | El reparto más proporcional posible con estos votos | Constitución |

### Tamaño y reparto por provincias (CE, art. 68.1; LOREG, art. 162)

Cálculo provisional con la población a 1-1-2025 y comparado con el reparto de 2026 (PP 136, PSOE 122; el resto, igual que en 2023), porque el JSON no tiene la población a 1-1-2022, que es la que fijó los escaños de 2023. **Pendiente:** que Code añada la cifra oficial a 1-1-2022 para comparar con el resultado real.

| # | Cambio | Resultado (frente al reparto de 2026) | Gancho | Norma |
| --- | --- | --- | --- | --- |
| T1 | 300 diputados (mínimo constitucional) | PP −15, PSOE −14, Vox −7, Sumar −7; BNG desaparece | Encoger la cámara castiga a los pequeños | LOREG |
| T2 | 400 diputados (máximo constitucional) | PP +17, PSOE +16, Vox +7, Sumar +6; entra Soria ¡Ya! (1) | Con 50 escaños más, Soria ¡Ya! entra | LOREG |
| T3 | Mínimo de 1 diputado por provincia en lugar de 2 (350) | PP −6, PNV −2; Sumar +4, PSOE +2, ERC +1, Junts +1 | El mínimo de dos es lo que más sobrerrepresenta a las provincias pequeñas | LOREG |
| T4 | 400 diputados y mínimo de 1 | PSOE +21, Sumar +10, PP +9, Vox +7, ERC +2, Junts +1 | La combinación más proporcional sin tocar la Constitución | LOREG |

## Descartadas, con el motivo

- Voto preferente o listas abiertas: el Congreso se elige con listas cerradas y bloqueadas y no hay votos por candidato.
- Sistema mayoritario, distritos uninominales o mixto (tipo alemán): incompatibles con el art. 68.3 de la Constitución y sin datos por distrito.
- Prima de escaños a la lista más votada: no es proporcional (art. 68.3).
- Voto a los 16, voto obligatorio o sin voto exterior: cambian el electorado, no la regla.
- Repartir escaños por electores en lugar de por población: calculable, pero lo dejo fuera salvo que interese (exige decidir qué censo).

## Pendiente del autor

1. Qué configuraciones entran (unas 6-8 preguntas).
2. Tipo de pregunta en cada una: quién gana o pierde más escaños, cuántos partidos entran, si cambia algo, si se llega a mayoría absoluta, o estimar una cifra con el deslizador.
3. Para T1-T4: comparar con 2026 o pedir la población de 2022.
