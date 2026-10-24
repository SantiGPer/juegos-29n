import { cifra, el } from '../util.js';

// Ronda de hemiciclo (A5, maqueta v11): el jugador reparte 350 escaños entre las candidaturas con − / campo / +,
// y su reparto se pinta en trama en un hemiciclo fijo arriba. Al comprobar, el real lo sustituye en sólido de
// izquierda a derecha y cada fila muestra las dos barras y la diferencia. candidaturas: en el orden en que se
// sientan (alfabético, «Otros» al final), con su token de color. umbrales: error medio para 1 y para ½ punto.

const ns = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs) => {
  const n = document.createElementNS(ns, tag);
  Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
  return n;
};

// 350 casillas en 10 filas de semicírculo, repartidas en proporción al radio y ordenadas por ángulo
const W = 343, H = 172, L = 7, TOTAL = 350;
const radios = Array.from({ length: 10 }, (_, i) => 62 + i * (166 - 62) / 9);
const porFila = radios.map(r => Math.round(TOTAL * r / radios.reduce((s, x) => s + x, 0)));
porFila[9] += TOTAL - porFila.reduce((s, n) => s + n, 0);
const asientos = radios.flatMap((r, i) => Array.from({ length: porFila[i] }, (_, k) => {
  const a = Math.PI * (1 - k / (porFila[i] - 1));
  return { x: W / 2 + r * Math.cos(a), y: H - 4 - r * Math.sin(a), a };
})).sort((p, q) => q.a - p.a || p.x - q.x);

const decimal = v => v.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const diferencia = d => d === 0 ? '=' : `${d > 0 ? '+' : '−'}${Math.abs(d)}`;
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ronda = (datos, listo, rotulo) => {
  const { pregunta, candidaturas, umbrales, explicacion, otros, fuente } = datos;
  const reparto = candidaturas.map(() => 0);
  const real = candidaturas.map(c => c.escanos);

  const dibujo = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'hemiciclo', 'shape-rendering': 'crispEdges', role: 'img', 'aria-label': 'Hemiciclo' });
  const defs = svg('defs', {});
  candidaturas.forEach((c, i) => {
    const trama = svg('pattern', { id: `trama-${datos.anio}-${i}`, width: 2, height: 2, patternUnits: 'userSpaceOnUse' });
    trama.append(svg('rect', { width: 2, height: 2, fill: 'var(--papel)' }), svg('rect', { width: 1, height: 1, fill: `var(${c.color})` }),
      svg('rect', { x: 1, y: 1, width: 1, height: 1, fill: `var(${c.color})` }));
    defs.append(trama);
  });
  const casillas = asientos.map(s => svg('rect', { x: (s.x - L / 2).toFixed(1), y: (s.y - L / 2).toFixed(1), width: L, height: L }));
  dibujo.append(defs, ...casillas);

  // Asiento k → candidatura que lo ocupa según un reparto; solido hasta el asiento `hasta`
  const ocupante = r => r.flatMap((n, i) => Array(n).fill(i));
  const pinta = (r, solido = 0) => {
    const jugador = ocupante(reparto), dato = ocupante(r);
    casillas.forEach((c, k) => {
      const i = k < solido ? dato[k] : jugador[k];
      c.setAttribute('class', i === undefined ? 'libre' : '');
      c.setAttribute('fill', i === undefined ? 'var(--papel)' : k < solido ? `var(${candidaturas[i].color})` : `url(#trama-${datos.anio}-${i})`);
    });
  };

  const titular = el('p', { className: 'etiqueta rotulo-hemiciclo', textContent: `${rotulo}. ${pregunta}` });
  const fija = el('div', {}, titular, dibujo);

  const quedan = el('div', { className: 'quedan', ariaLive: 'polite' });
  const cuenta = () => {
    const resto = TOTAL - reparto.reduce((s, n) => s + n, 0);
    quedan.replaceChildren(el('span', { className: 'etiqueta', textContent: 'Quedan' }), cifra(String(resto), 3),
      el('span', { className: 'oculto', textContent: `Quedan ${resto}` }));
    listo(resto === 0, 'Comprobar');
  };

  const campos = candidaturas.map((c, i) => {
    const campo = el('input', { inputMode: 'numeric', value: '0', ariaLabel: `Escaños de ${c.siglas}` });
    // Tope: los escaños que no tienen las demás candidaturas, para que nunca se pase de 350
    const pon = v => {
      reparto[i] = Math.max(0, Math.min(TOTAL - reparto.reduce((s, n, k) => k === i ? s : s + n, 0), v));
      campo.value = reparto[i];
      pinta(real);
      cuenta();
    };
    campo.oninput = () => pon(Number(campo.value.replace(/\D/g, '')));
    campo.onfocus = () => campo.select();

    // Un paso al pulsar y, si se mantiene, repetición cada 80 ms tras 400 ms
    const paso = (signo, verbo) => {
      let espera, repite;
      const para = () => { clearTimeout(espera); clearInterval(repite); };
      const b = el('button', { className: 'paso', textContent: signo < 0 ? '−' : '+', ariaLabel: `${verbo} un escaño a ${c.siglas}` });
      b.onpointerdown = e => {
        e.preventDefault();
        pon(reparto[i] + signo);
        espera = setTimeout(() => { repite = setInterval(() => pon(reparto[i] + signo), 80); }, 400);
      };
      b.onpointerup = b.onpointerleave = b.onpointercancel = para;
      b.onclick = e => { if (e.detail === 0) pon(reparto[i] + signo); };
      return b;
    };
    return { campo, botones: [paso(-1, 'Quitar'), paso(1, 'Añadir')] };
  });

  const nombre = c => el('span', { className: 'nom' }, c.siglas, el('small', { textContent: c.nombre }));
  const lista = el('ul', { className: 'reparto' }, ...candidaturas.map((c, i) => el('li', {},
    el('i', { className: 'muestra-partido', style: `background: var(${c.color})` }), nombre(c),
    campos[i].botones[0], campos[i].campo, campos[i].botones[1])));
  const pie = el('div');

  pinta(real);
  cuenta();

  const resolver = () => {
    datos.error = candidaturas.reduce((s, _, i) => s + Math.abs(reparto[i] - real[i]), 0) / candidaturas.length;
    quedan.remove();
    // Deja de ser fijo para no tapar la explicación al bajar (diseño del 24-10)
    dibujo.closest('.fija').classList.add('suelta');

    // De trama a sólido en una pasada de 600 ms por pasos
    const pasos = reducido() ? [TOTAL] : [1, 2, 3, 4, 5, 6].map(k => Math.round(TOTAL * k / 6));
    pasos.forEach((hasta, k) => setTimeout(() => pinta(real, hasta), k * 100));

    titular.replaceWith(el('p', { className: 'error-medio' }, cifra(decimal(datos.error), 4),
      el('span', { textContent: 'escaños de error medio' })));

    const tope = Math.max(...reparto, ...real);
    lista.replaceWith(el('ul', { className: 'reparto resuelto' }, ...candidaturas.map((c, i) => el('li', {},
      el('i', { className: 'muestra-partido', style: `background: var(${c.color})` }),
      el('div', {}, el('span', { className: 'nom' }, c.siglas),
        el('div', { className: 'barras', ariaHidden: 'true' },
          el('span', { className: 'trama-partido', style: `width: ${reparto[i] / tope * 100}%; --color: var(${c.color})` }),
          el('span', { style: `width: ${real[i] / tope * 100}%; background: var(${c.color})` }))),
      el('span', { className: 'dif' }, el('b', { textContent: real[i] }), diferencia(reparto[i] - real[i]),
        el('span', { className: 'oculto', textContent: ` (tú, ${reparto[i]})` }))))));

    pie.append(el('div', { className: 'explicacion' },
      el('p', { textContent: explicacion }),
      ...(otros ? [el('p', { textContent: `Otros: ${otros}.` })] : []),
      el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
    // Arriba y no hasta la explicación: lo que se revela es el hemiciclo y las barras de cada fila
    scrollTo({ top: 0, behavior: reducido() ? 'instant' : 'smooth' });
    return datos.error <= umbrales[0] ? 1 : datos.error <= umbrales[1] ? 0.5 : 0;
  };

  return { cuerpo: [fija, lista, pie], barra: [quedan], resolver };
};

ronda.rotulo = true;
ronda.fija = true;

// Cierre de A5: error medio de las rondas, con un decimal, sin puntos sobre el total
export const resultado = rondas => ({
  total: undefined,
  puntuacion: decimal(rondas.reduce((s, r) => s + r.error, 0) / rondas.length),
  unidad: 'escaños de error medio',
});
