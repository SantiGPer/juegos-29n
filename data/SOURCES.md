# Fuentes de datos

## Colores de partido (`shared/base.css`)

- Fuente: Wikipedia en español, [Plantilla:Color político](https://es.wikipedia.org/wiki/Plantilla:Color_pol%C3%ADtico), sección «España».
- Revisión usada: [173877042](https://es.wikipedia.org/w/index.php?title=Plantilla:Color_pol%C3%ADtico&oldid=173877042) (10-06-2026).
- Consultada: 14-10-2026.
- Valores copiados sin modificar:

| Variable | Entrada de la plantilla | Color |
| --- | --- | --- |
| `--pp` | PP / Partido Popular | `#1E4B8F` |
| `--psoe` | PSOE / Partido Socialista Obrero Español | `#FF0000` |
| `--vox` | Vox / Vox (partido político) | `#63BE21` |
| `--sumar` | Sumar / Movimiento Sumar | `#E51C55` |
| `--podemos` | Podemos | `#9370DB` |
| `--erc` | ERC / Esquerra Republicana de Catalunya | `#FFB32E` |
| `--junts` | Junts | `#20C0C2` |
| `--bildu` | EH Bildu / Euskal Herria Bildu | `#00D0B6` |
| `--pnv` | PNV / Partido Nacionalista Vasco | `#008000` |
| `--bng` | BNG / Bloque Nacionalista Galego | `#ADCFEF` |
| `--cc` | CC / Coalición Canaria | `#FFD700` |
| `--upn` | UPN / Unión del Pueblo Navarro | `#2A52BE` |
| `--ucd` | UCD / Unión de Centro Democrático | `#197E36` |

`--ucd` se añadió el 15-10-2026 para A12, de la misma revisión 173877042.

Se usa siempre el color vigente de cada partido, en todas las legislaturas (decisión del 15-10-2026), aunque la plantilla tenga entradas fechadas (PP 2008-2022 `#1D84CE`, EH Bildu 2012-2023 `#C4D600`). Para Junts la plantilla tiene «JxCat» `#EE5976` y «Junts» `#20C0C2`; se usa `#20C0C2` por decisión del autor.

## `llamadas_al_orden.json`

- Script: `R/05_llamadas_al_orden.R`. Legislaturas VIII a XV (rango decidido el 16-10-2026).
- Fuente: Diario de Sesiones del Congreso de los Diputados, Pleno y Diputación Permanente, en PDF, en `https://www.congreso.es/public_oficiales/L<n>/CONG/DS/PL/`:
  - VIII, IX y X hasta el diario 53: `PL_<nnn>.PDF`, a dos columnas, leídos por columnas con las coordenadas de cada palabra.
  - X desde el diario 54, y XI a XV: `DSCD-<n>-PL-<d>.PDF`. Algunas sesiones están partidas en `-C1`, `-C2`…, y no siempre empiezan en `-C1`: la constitutiva de la XIII solo existe como `DSCD-13-PL-1-C2.PDF`.
- PDF de la XV descargados el 14-10-2026 (diarios nuevos buscados el 15 y el 16-10). Los de VIII a XIV, el 16-10-2026.
- Denominador: sesiones plenarias distintas según la portada («Sesión plenaria núm. N», o «Sesión núm. N» en algunas de la XII), sin la Diputación Permanente. Son consecutivas desde la 1 en todas las legislaturas.
  - XV: el diario 9 (constitución de la Diputación Permanente, 21-11-2023) lleva «Sesión plenaria núm. 1» y no suma.
  - VIII: el diario 87 (28-04-2005) lleva por errata «Sesión plenaria núm. 81», como el 86; se cuenta como la 82.
- 16-10-2026: corregido un fallo que dejaba sin texto los diarios con alguna hoja sin folio. La XV pasa de 83 a 90 llamadas (diarios 182, 196, 207 y 210).
- Método: en el campo `metodo` del JSON. Validación: revisión manual de las 12 fusiones de la XV (bitácora del 15-10-2026) y precisión, atribución y exhaustividad de VIII a XV en `editorial/fuentes/a03-validacion-viii-x.md`.

## `legislaturas.json`

- Script: `R/02_legislaturas.R`.
- Fuente: Wikipedia en español, [Anexo:Presidentes del Congreso de los Diputados](https://es.wikipedia.org/wiki/Anexo:Presidentes_del_Congreso_de_los_Diputados), revisión fijada [175471021](https://es.wikipedia.org/w/index.php?title=Anexo:Presidentes_del_Congreso_de_los_Diputados&oldid=175471021), sección «Periodo democrático» y tabla de Felipe VI. Consultada el 16-10-2026.
- Cada fila guarda las actas de elección de la presidencia en congreso.es que cita Wikipedia (Constituyente a XII). XIII, XIV y XV citan prensa, no actas del Congreso, y quedan con la lista vacía.
- Partido tal como lo da la fuente: Batet figura como PSC.
- Contraste con la fuente primaria: la portada de cada Diario de Sesiones del Pleno («PRESIDENCIA DE…»), revisada en la muestra del sondeo de A3 (bitácora del 16-10-2026).

## `presidentes.json`

- Sin script: siete fichas hechas a mano, copiadas de `editorial/contenido/a12-presidentle.md` (pistas, nota y fuente) y de `editorial/fuentes/a12-presidentes.md` (fechas). Juego: A12 Presidentle.
- Fuentes, consultadas el 15-10-2026:
  - La Moncloa, Presidentes del Gobierno (reales decretos de nombramiento y biografías): https://www.lamoncloa.gob.es/presidente/presidentes/paginas/index.aspx
  - BOE núm. 49, de 26-02-1981 (RD 249/1981, cese de Suárez; RD 250/1981, nombramiento de Calvo-Sotelo): https://boe.es/boe/dias/1981/02/26/pdfs/BOE-S-1981-49.pdf
  - BOE de 05-05-1996 (nombramiento de Aznar): https://boe.es/boe/dias/1996/05/05/pdfs/A15699-15699.pdf
  - CIDOB, biografías de líderes políticos y cronología de gobiernos de España: https://www.cidob.org/lider-politico
  - Enciclopèdia Catalana (fecha de nacimiento de Calvo-Sotelo): https://www.enciclopedia.cat/EC-GEC-0013721
- Criterios: en el campo `criterios` del JSON. Sánchez sin fecha de fin; su tiempo se cuenta hasta `corte` (29-11-2026). En Suárez, `referencia` (1977) es el año que usan la edad y la pista 5; el tiempo cuenta desde `inicio` (1976).
- Comprobado al generar: edades y tiempos de las pistas 1 y 2 coinciden con los calculados a partir de las fechas.
