import { baraja, el, muestra } from '../util.js';

// Ronda de mapa (A7, maqueta v10, variante A): un mapa provincial sin título ni leyenda, con el año de los datos
// (anio), y cuatro etiquetas en 2 × 2.
// Al resolver, el mapa recupera el ancho completo con su título y su leyenda de cinco tramos, y cada provincia se
// puede tocar para ver su valor. geometria: data/mapa_provincias.json; valores: id de provincia → número o null
// (sin dato, que nunca se pinta como 0). cortes: cuatro, y un valor igual al corte va al tramo superior.

const ns = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs) => {
  const n = document.createElementNS(ns, tag);
  Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
  return n;
};

const tramo = (v, cortes) => cortes.filter(c => v >= c).length;
const relleno = (v, cortes) => v === null ? 'var(--papel)' : `var(--m${tramo(v, cortes)})`;

const formatos = {
  pct: v => `${v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`,
  entero: v => v.toLocaleString('es-ES', { maximumFractionDigits: 0 }),
};

// Leyenda de mapa (maqueta v14): cinco casillas pegadas en una barra y los cuatro cortes en sus fronteras, sin
// unidad (va en el título). Con alguna provincia sin dato, una casilla aparte «sin dato».
const leyenda = (cortes, conSinDato) => el('div', { className: 'leyenda' },
  el('div', { className: 'escala' },
    el('div', { className: 'cajas' }, ...[0, 1, 2, 3, 4].map(k => el('i', { style: `background: var(--m${k})` }))),
    ...cortes.map((c, k) => el('span', { className: 'corte', style: `left: ${(k + 1) * 20}%`, textContent: c.toLocaleString('es-ES') }))),
  ...(conSinDato ? [el('span', { className: 'sin-dato' }, el('i'), 'sin dato')] : []));

export const ronda = ({ pregunta, opciones, correcta, titulo, anio, cortes, formato, sinDato, geometria, valores, explicacion, fuente }, listo, rotulo) => {
  const { W, H, borde, p } = geometria;
  const mapa = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'mapa jugando', role: 'img', 'aria-label': 'Mapa provincial' });
  mapa.append(svg('path', { d: borde, class: 'recuadro-canarias' }));
  const formas = p.map(prov => {
    const forma = svg('path', { d: prov.d, class: `provincia${valores[prov.id] === null ? ' sin-dato' : ''}`, fill: relleno(valores[prov.id], cortes) });
    forma.dataset.id = prov.id;
    return forma;
  });
  mapa.append(...formas);
  // Ceuta y Melilla no se ven a este tamaño: casilla de 8 px con su tramo
  mapa.append(...p.filter(prov => ['51', '52'].includes(prov.id)).map(prov => {
    const casilla = svg('rect', { x: prov.c[0] - 4, y: prov.c[1] - 4, width: 8, height: 8, class: 'casilla', fill: relleno(valores[prov.id], cortes) });
    casilla.dataset.id = prov.id;
    return casilla;
  }));

  let elegida;
  const botones = baraja(opciones).map(texto => {
    const b = el('button', { className: 'opcion', textContent: texto });
    b.onclick = () => {
      botones.forEach(o => o.classList.toggle('seleccionada', o === b));
      elegida = texto;
      listo(true);
    };
    return b;
  });

  // Mientras se juega, solo el año de los datos como pista; al resolver lo sustituyen el título y la leyenda
  const cabecera = el('div', {}, el('p', { className: 'titulo-mapa', textContent: `Datos de ${anio}` }));
  const franja = el('p', { className: 'franja' }, el('span', { className: 'etiqueta', textContent: 'Toca una provincia para ver su dato.' }));
  const pie = el('div');

  const toca = id => {
    const prov = p.find(x => x.id === id);
    mapa.querySelectorAll('[data-id]').forEach(n => n.classList.toggle('marcada', n.dataset.id === id));
    // Al final de las provincias, para que su contorno quede por encima del de las vecinas
    mapa.insertBefore(formas.find(f => f.dataset.id === id), mapa.querySelector('.casilla'));
    const v = valores[id];
    franja.replaceChildren(el('b', { textContent: prov.n }), el('span', { textContent: v === null ? sinDato : formatos[formato](v) }));
  };

  const resolver = () => {
    const acierto = elegida === correcta;
    botones.forEach(b => {
      b.disabled = true;
      b.classList.remove('seleccionada');
      b.classList.toggle('correcta', b.textContent === correcta);
      b.classList.toggle('fallada', !acierto && b.textContent === elegida);
    });
    mapa.classList.remove('jugando');
    mapa.onclick = e => { if (e.target.dataset.id) toca(e.target.dataset.id); };
    cabecera.replaceChildren(el('p', { className: 'titulo-mapa', textContent: titulo }), leyenda(cortes, Object.values(valores).includes(null)));
    mapa.after(franja);
    pie.append(el('div', { className: 'explicacion' },
      el('p', { textContent: explicacion }),
      el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
    muestra(pie);
    return acierto ? 1 : 0;
  };

  return {
    cuerpo: [
      el('p', { className: 'etiqueta rotulo-mapa', textContent: `${rotulo}. ${pregunta}` }),
      cabecera,
      mapa,
      el('div', { className: 'opciones dos opciones-mapa' }, ...botones),
      pie,
    ],
    resolver,
  };
};

ronda.rotulo = true;
