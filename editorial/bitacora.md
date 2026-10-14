# Bitácora de Claude Code

Una entrada por sesión, la más reciente arriba. Formato: fecha · juego/motor · hecho · falta · dudas para el autor.

## 2026-10-14 — Estructura inicial del repositorio

**Hecho**
- Git inicializado con rama `main` y `.gitignore` para HTML/JS + R (no ignora `data/` ni `docs/`).
- Creadas `shared/motores/`, `juegos/`, `data/` y `R/`; `data/SOURCES.md` solo con el título.
- `index.html` mínimo en la raíz, sin CSS: título y fecha de inicio de la serie.
- `docs/documento-base.md.md` renombrado a `docs/documento-base.md`, como lo cita CLAUDE.md.
- Remoto `origin` → https://github.com/SantiGPer/juegos-29n.git.
- Las carpetas vacías de `editorial/` (`contenido/`, `fuentes/`, `posts/`) no se versionan hasta que tengan ficheros; no se les añade `.gitkeep` por ser territorio de Cowork.

**Falta**
- Activar GitHub Pages: lo hace el autor a mano.
- `docs/diseno-plan.md` (paleta, tipografía, wireframes, gesto) y su aprobación antes de escribir `shared/base.css`.
- `shared/cierre.js` y plantilla de juego (entrega del 19 oct).
- Scraping de llamadas al orden sobre la XV (entrega del 19 oct).

**Dudas para el autor**
- Para `docs/diseno-plan.md`: color de acento (rojo papeleta `#c8102e`, azul acta `#1d3f8a` o amarillo marcador `#f2c200`) y tipografía (Public Sans, Work Sans, Archivo, IBM Plex Serif o Source Serif 4).
