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

Se usa siempre el color vigente de cada partido, en todas las legislaturas (decisión del 15-10-2026), aunque la plantilla tenga entradas fechadas (PP 2008-2022 `#1D84CE`, EH Bildu 2012-2023 `#C4D600`). Para Junts la plantilla tiene «JxCat» `#EE5976` y «Junts» `#20C0C2`; se usa `#20C0C2` por decisión del autor.

## `llamadas_al_orden.json`

- Script: `R/05_llamadas_al_orden.R`.
- Fuente: Diario de Sesiones del Congreso de los Diputados, Pleno y Diputación Permanente, XV legislatura, en PDF: `https://www.congreso.es/public_oficiales/L15/CONG/DS/PL/DSCD-15-PL-<n>.PDF`.
- PDF descargados el 14-10-2026; búsqueda de diarios nuevos repetida el 15-10-2026. Diarios del 1 al 210, sin los números 23, 41, 137 y 163, que no existen en el servidor.
- Se usan los 200 diarios de sesión plenaria (199 sesiones plenarias distintas); los 6 de la Diputación Permanente quedan fuera.
- Método: en el campo `metodo` del JSON. Validación: revisión manual de las 12 fusiones de repeticiones (bitácora del 15-10-2026).
