# A9 · Cotejo de Fontanería electoral con el cálculo en R

Generado por `R/cotejo_a09_fontaneria.R` el 25-10-2026 sobre `data/fontaneria_a09.json` (`R/12_fontaneria_a09.R`).

## Comprobaciones previas

- La regla del art. 162 de la LOREG (1 escaño a Ceuta y otro a Melilla, 2 por provincia y el resto por cuota de población de las 50 provincias, con restos mayores) reproduce los escaños de las 52 circunscripciones de 2023 con la población oficial a 1-1-2022, y los de 2026 con la de 1-1-2025.
- La simulación con las reglas vigentes (D'Hondt y barrera del 3 % de los válidos con el blanco, en cada provincia) reproduce el reparto oficial de 2023 provincia a provincia.
- Ninguna configuración tiene empates en el último escaño ni en los restos.

## 1. Tablas «Escaños» del contenido (preguntas 1 a 7)

Filas cotejadas: 81. Distintas del cálculo: 0.
No falta ninguna candidatura con escaño en las tablas.


## 2. Diferencias con el real que dicen el catálogo y las explicaciones

«Incompleto»: lo que se dice es correcto, pero hay más candidaturas que cambian. T1 a T4 se calculan con la población a 1-1-2022 y se comparan con el resultado real de 2023; el catálogo usaba la de 2025 y el reparto de 2026.

| Cambio | Fuente | Dice | Cálculo en R | Coincide |
| --- | --- | --- | --- | --- |
| B1 | Catálogo | nada cambia | nada cambia | sí |
| B2 | Catálogo | nada cambia | nada cambia | sí |
| B3 | Catálogo | PP +2, PSOE +3, ERC +1, Vox −2, Junts −3, BNG −1 | PP +2, PSOE +3, Vox −2, ERC +1, Junts −3, BNG −1 | sí |
| B4 | Catálogo | ERC −7, Junts −7, EH Bildu −6, PNV −5, BNG −1, CC −1, UPN −1, PSOE +14, Sumar +7, PP +5, Vox +2 | PP +5, PSOE +14, Vox +2, Sumar +7, ERC −7, Junts −7, EH Bildu −6, PNV −5, CC −1, BNG −1, UPN −1 | sí |
| B5 | Catálogo («igual que B4») | ERC −7, Junts −7, EH Bildu −6, PNV −5, BNG −1, CC −1, UPN −1, PSOE +14, Sumar +7, PP +5, Vox +2 | PP +5, PSOE +14, Vox +2, Sumar +7, ERC −7, Junts −7, EH Bildu −6, PNV −5, CC −1, BNG −1, UPN −1 | sí |
| B6 | Catálogo | nada cambia | nada cambia | sí |
| F1 | Catálogo | PP −10, PSOE −7, Junts −1, PNV −1, Vox +10, Sumar +6, BNG +1, Nueva Canarias +1, Teruel Existe +1 | PP −10, PSOE −7, Vox +10, Sumar +6, Junts −1, PNV −1, BNG +1, Teruel Existe +1, Nueva Canarias +1 | sí |
| F2 | Catálogo | PP −7, PSOE −2, Junts −1, PNV −1, Vox +5, Sumar +4, BNG +1, Nueva Canarias +1 | PP −7, PSOE −2, Vox +5, Sumar +4, Junts −1, PNV −1, BNG +1, Nueva Canarias +1 | sí |
| F2 | Explicación de la pregunta 2 («Vox ganaría 5») | Vox +5 | PP −7, PSOE −2, Vox +5, Sumar +4, Junts −1, PNV −1, BNG +1, Nueva Canarias +1 | sí |
| F3 | Catálogo | PP −13, PSOE −9, Junts −1, PNV −1, Vox +13, Sumar +6, BNG +3, Nueva Canarias +1, Teruel Existe +1 | PP −13, PSOE −9, Vox +13, Sumar +6, Junts −1, PNV −1, BNG +3, Teruel Existe +1, Nueva Canarias +1 | sí |
| F4 | Catálogo | PP −4, PSOE −4, Junts −1, PNV −1, Vox +4, Sumar +3, BNG +1, Nueva Canarias +1, Teruel Existe +1 | PP −4, PSOE −4, Vox +4, Sumar +3, Junts −1, PNV −1, BNG +1, Teruel Existe +1, Nueva Canarias +1 | sí |
| F4 | Explicación de la pregunta 3 («el BNG se quedaría en 2») | BNG +1 | PP −4, PSOE −4, Vox +4, Sumar +3, Junts −1, PNV −1, BNG +1, Teruel Existe +1, Nueva Canarias +1 | sí |
| C1 | Catálogo | PP −12, PSOE −2, Junts −2, EH Bildu −1, Vox +9, Sumar +6, BNG +1, CC +1 | PP −12, PSOE −2, Vox +9, Sumar +6, Junts −2, EH Bildu −1, CC +1, BNG +1 | sí |
| C2 | Catálogo | ERC −7, Junts −7, EH Bildu −6, PNV −5, BNG −1, CC −1, UPN −1, Sumar +17, Vox +15, PSOE +3, PP −7 | PP −7, PSOE +3, Vox +15, Sumar +17, ERC −7, Junts −7, EH Bildu −6, PNV −5, CC −1, BNG −1, UPN −1 | sí |
| C3 | Catálogo | PP −17, PSOE −6, Vox +12, Sumar +14, PACMA +2, CUP +1, UPN −1 | PP −17, PSOE −6, Vox +12, Sumar +14, ERC −1, Junts −2, EH Bildu −2, PNV −1, BNG +1, UPN −1, PACMA +2, CUP +1 | sí, pero incompleto |
| C3 | Explicación de la pregunta 5 («entrarían PACMA (2 escaños) y la CUP (1)») | PACMA +2, CUP +1 | PP −17, PSOE −6, Vox +12, Sumar +14, ERC −1, Junts −2, EH Bildu −2, PNV −1, BNG +1, UPN −1, PACMA +2, CUP +1 | sí |
| C4 | Catálogo | PP −20, PSOE −8, Vox +11, Sumar +13, PACMA +2, CUP +1, Frente Obrero +1, Nueva Canarias +1 | PP −20, PSOE −8, Vox +11, Sumar +13, Junts −1, EH Bildu −1, PNV −1, CC +1, BNG +1, PACMA +2, Frente Obrero +1, Nueva Canarias +1, CUP +1 | sí, pero incompleto |
| T1 | Explicación de la pregunta 6 | PP −16, PSOE −12, Sumar −8, Vox −7, BNG −1 | PP −16, PSOE −12, Vox −7, Sumar −8, ERC −1, Junts −2, EH Bildu −1, PNV −2, BNG −1 | sí |
| T2 | Explicación de la pregunta 6 («entraría Soria ¡Ya!») | Soria ¡Ya! +1 | PP +15, PSOE +17, Vox +7, Sumar +7, ERC +1, Junts +1, PNV +1, Soria ¡Ya! +1 | sí |
| T3 | Explicación de la pregunta 7 | PP −7, Sumar +4, PSOE +3 | PP −7, PSOE +3, Vox −1, Sumar +4, ERC +1, Junts +1, PNV −1 | sí |
| T4 | Explicación de la pregunta 7 («el PSOE ganaría 22») | PSOE +22 | PP +8, PSOE +22, Vox +7, Sumar +9, ERC +2, Junts +1, PNV +1 | sí |

## 3. Cifras sueltas de las explicaciones

| Pregunta | Dice el contenido | Cálculo en R |
| --- | --- | --- |
| 1 · B3 | Barcelona deja fuera a Junts (9,7 %) | 9,7 |
| 1 · B3 | y a Vox (7,6 %) | 7,6 |
| 1 · B3 | A Coruña, al BNG (9,98 %, por dos centésimas) | 9,98 |
| 1 · B3 | Murcia, a Sumar (9,6 %) | 9,6 |
| 1 · B3 | Solo muerde en tres provincias | 3: Barcelona, A Coruña, Murcia |
| 1 · B3 | Con el 5 %, o sin barrera, no cambiaría ni un escaño | B2: nada cambia; B1: nada cambia |
| 2 · F1 | Vox pasaría de 33 a 43 y Sumar, de 31 a 37 | Vox 43, Sumar 37 |
| 2 · F1 | PP y PSOE perderían 17 entre los dos | 17 |
| 3 · F3 | Vox ganaría 13, los mismos que perdería el PP | Vox +13, PP −13 |
| 5 · C2 | ERC, la siguiente, se queda en el 1,9 % | ERC 1,9 |
| 5 · C2 | Solo PP, PSOE, Vox y Sumar pasan del 3 % nacional | PP, PSOE, Vox, Sumar |
| 5 · C2 | Una barrera nacional del 3 % que mantuviera las provincias borraría a los mismos siete | B4: PP +5, PSOE +14, Vox +2, Sumar +7, ERC −7, Junts −7, EH Bildu −6, PNV −5, CC −1, BNG −1, UPN −1 |

## 4. Respuestas correctas de T1 y T3 con la población de 2022

- Pregunta 6 (T1, «¿Qué partido se queda sin escaño?», opciones BNG, CC, UPN y PNV): con 300 se quedan sin escaño BNG. CC 1, UPN 1 y PNV 3.
- Pregunta 7 (T3, «¿Qué partido pierde más escaños?», opciones PP, PSOE, Vox y PNV): PP −7, PSOE +3, Vox −1, PNV −1. La que más pierde es PP.

## 5. Escaños por provincia con cada tamaño (población de 2022)

Solo las provincias que cambian en alguna de las cuatro configuraciones, de más a menos población.

| Provincia | Población 2022 | 2023 | T1 (300) | T2 (400) | T3 (mín. 1) | T4 (400, mín. 1) |
| --- | --- | --- | --- | --- | --- | --- |
| Madrid | 6.750.336 | 37 | 30 | 45 | 44 | 51 |
| Barcelona | 5.727.615 | 32 | 26 | 38 | 37 | 43 |
| València/Valencia | 2.605.757 | 16 | 13 | 18 | 17 | 20 |
| Sevilla | 1.948.393 | 12 | 10 | 14 | 13 | 15 |
| Alacant/Alicante | 1.901.594 | 12 | 10 | 14 | 13 | 15 |
| Málaga | 1.717.504 | 11 | 9 | 13 | 12 | 14 |
| Murcia | 1.531.878 | 10 | 8 | 12 | 11 | 12 |
| Cádiz | 1.246.781 | 9 | 7 | 10 | 9 | 10 |
| Illes Balears | 1.176.659 | 8 | 7 | 9 | 8 | 10 |
| Bizkaia | 1.149.344 | 8 | 7 | 9 | 8 | 10 |
| Las Palmas | 1.129.395 | 8 | 7 | 9 | 8 | 9 |
| A Coruña | 1.119.180 | 8 | 7 | 9 | 8 | 9 |
| Santa Cruz de Tenerife | 1.048.306 | 7 | 6 | 9 | 8 | 9 |
| Asturias | 1.004.686 | 7 | 6 | 8 | 7 | 8 |
| Zaragoza | 966.438 | 7 | 6 | 8 | 7 | 8 |
| Pontevedra | 943.015 | 7 | 6 | 8 | 7 | 8 |
| Granada | 921.987 | 7 | 6 | 8 | 7 | 8 |
| Tarragona | 830.075 | 6 | 6 | 7 | 6 | 7 |
| Girona | 793.478 | 6 | 5 | 7 | 6 | 7 |
| Córdoba | 772.464 | 6 | 5 | 7 | 6 | 7 |
| Almería | 740.534 | 6 | 5 | 7 | 6 | 7 |
| Gipuzkoa | 724.418 | 6 | 5 | 7 | 6 | 6 |
| Toledo | 713.453 | 6 | 5 | 7 | 6 | 6 |
| Badajoz | 666.971 | 5 | 5 | 6 | 5 | 6 |
| Navarra | 664.117 | 5 | 5 | 6 | 5 | 6 |
| Jaén | 623.761 | 5 | 5 | 6 | 5 | 6 |
| Castelló/Castellón | 590.616 | 5 | 4 | 6 | 5 | 5 |
| Cantabria | 585.402 | 5 | 4 | 6 | 5 | 5 |
| Huelva | 528.763 | 5 | 4 | 5 | 4 | 5 |
| Valladolid | 517.975 | 5 | 4 | 5 | 4 | 5 |
| Ciudad Real | 490.806 | 5 | 4 | 5 | 4 | 5 |
| León | 448.179 | 4 | 4 | 5 | 4 | 4 |
| Lleida | 441.443 | 4 | 4 | 5 | 4 | 4 |
| Cáceres | 387.805 | 4 | 4 | 4 | 3 | 4 |
| Albacete | 385.727 | 4 | 4 | 4 | 3 | 4 |
| Burgos | 355.045 | 4 | 4 | 4 | 3 | 4 |
| Araba/Álava | 334.412 | 4 | 3 | 4 | 3 | 4 |
| Salamanca | 325.898 | 4 | 3 | 4 | 3 | 3 |
| Lugo | 323.989 | 4 | 3 | 4 | 3 | 3 |
| La Rioja | 319.892 | 4 | 3 | 4 | 3 | 3 |
| Ourense | 304.280 | 4 | 3 | 4 | 3 | 3 |
| Guadalajara | 268.127 | 3 | 3 | 4 | 3 | 3 |
| Huesca | 225.456 | 3 | 3 | 3 | 2 | 3 |
| Cuenca | 195.215 | 3 | 3 | 3 | 2 | 2 |
| Zamora | 167.215 | 3 | 3 | 3 | 2 | 2 |
| Ávila | 158.140 | 3 | 3 | 3 | 2 | 2 |
| Palencia | 158.008 | 3 | 3 | 3 | 2 | 2 |
| Segovia | 153.803 | 3 | 3 | 3 | 2 | 2 |
| Teruel | 134.421 | 3 | 3 | 3 | 2 | 2 |
| Soria | 88.377 | 2 | 2 | 3 | 2 | 2 |
