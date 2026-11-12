import { icono } from '../iconos.js';
import { el, muestra } from '../util.js';

// Ronda de gráfico de barras (A6, maqueta v25): la primera columna es la referencia fija con su dato; el jugador
// sube o baja las demás tocando o arrastrando en la columna, o con el teclado. Al comprobar, el dato real en sólido
// sobre su trama, la diferencia en marcador y un corchete con el margen. 1 punto por barra a ±margen relativo.
// columnas: [{ nombre, presidentes }]; valores: un dato por columna; maximo y paso: eje y ajuste de la métrica.

const margen = 0.15;
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ronda = ({ pregunta, subtitulo, unidad, columnas, valores, maximo, paso, decimales = 0, sufijo = '', explicacion, fuente }, listo, rotulo) => {
  const formato = new Intl.NumberFormat('es-ES', { useGrouping: 'always', maximumFractionDigits: decimales });
  const cifra = v => `${formato.format(v)}${sufijo}`;
  const alto = v => `${Math.min(v, maximo) / maximo * 100}%`;
  const tu = valores.map(() => null);
  const nombre = c => `${c.nombre}, ${c.presidentes.join(' y ')}`;

  const pon = (i, v) => {
    tu[i] = Math.max(0, Math.min(maximo, Math.round(v / paso) * paso));
    pintaCol(i);
    const faltan = tu.slice(1).filter(t => t === null).length;
    listo(!faltan, faltan ? `Falta${faltan > 1 ? 'n' : ''} ${faltan} barra${faltan > 1 ? 's' : ''}` : 'Comprobar');
  };

  const cols = columnas.map((c, i) => {
    if (i === 0) return el('div', { className: 'g-col referencia' },
      el('span', { className: 'g-barra real', style: `height: ${alto(valores[0])}` }),
      el('span', { className: 'g-val', style: `bottom: calc(${alto(valores[0])} + 4px)`, textContent: cifra(valores[0]) }));
    const col = el('div', { className: 'g-col', role: 'slider', tabIndex: 0, ariaLabel: nombre(c), ariaOrientation: 'vertical', ariaValueMin: '0', ariaValueMax: String(maximo) });
    const desde = e => {
      const r = col.getBoundingClientRect();
      pon(i, (r.bottom - e.clientY) / r.height * maximo);
    };
    col.onpointerdown = e => {
      col.setPointerCapture(e.pointerId);
      desde(e);
    };
    col.onpointermove = e => { if (col.hasPointerCapture(e.pointerId)) desde(e); };
    col.onkeydown = e => {
      const k = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10 }[e.key];
      const extremo = { Home: 0, End: maximo }[e.key];
      if (!k && extremo === undefined) return;
      e.preventDefault();
      pon(i, extremo ?? (tu[i] ?? 0) + k * paso);
    };
    return col;
  });

  const pintaCol = i => {
    const t = tu[i];
    cols[i].ariaValueNow = String(t ?? 0);
    cols[i].ariaValueText = t === null ? 'Sin valor' : cifra(t);
    cols[i].replaceChildren(...(t === null
      ? [el('span', { className: 'g-barra tu vacia' })]
      : [el('span', { className: 'g-barra tu trama', style: `height: ${alto(t)}` }),
        el('span', { className: 'g-asa', style: `bottom: calc(${alto(t)} - 5px)` }),
        el('span', { className: 'g-val', style: `bottom: calc(${alto(t)} + 8px)`, textContent: cifra(t) })]));
  };
  cols.slice(1).forEach((_, k) => pintaCol(k + 1));

  const lineas = [1, 2, 3, 4].map(q => el('div', { className: 'g-linea', style: `bottom: ${q * 25}%` },
    el('span', { textContent: formato.format(maximo * q / 4) })));
  const fila = (clase, nodos) => el('div', { className: `g-fila ${clase}` }, ...nodos);
  const grafico = el('div', { className: 'grafico' }, ...lineas, fila('g-cols', cols));
  const rotulos = fila('g-rotulos', columnas.map(c => el('span', {}, el('b', { textContent: c.nombre }), ...c.presidentes.map(p => el('span', { textContent: p })))));
  const pie = el('div');

  const resolver = () => {
    const desvio = valores.map((r, i) => (tu[i] - r) / r);
    const aciertos = desvio.slice(1).map(d => Math.abs(d) <= margen + 1e-9 ? 1 : 0);
    grafico.classList.add('comprobado');

    cols.slice(1).forEach((col, k) => {
      const i = k + 1, r = valores[i], t = tu[i];
      const real = el('span', { className: 'g-barra real', style: 'height: 0' });
      col.removeAttribute('role');
      col.removeAttribute('tabindex');
      col.onpointerdown = col.onpointermove = col.onkeydown = null;
      col.replaceChildren(el('span', { className: 'g-barra tu trama', style: `height: ${alto(t)}` }), real,
        el('span', { className: 'g-dif', style: `bottom: ${alto(Math.min(t, r))}; height: calc(${alto(Math.max(t, r))} - ${alto(Math.min(t, r))})` }),
        el('span', { className: 'g-margen', style: `bottom: ${alto(r * (1 - margen))}; height: calc(${alto(r * (1 + margen))} - ${alto(r * (1 - margen))})` }),
        el('span', { className: 'g-val real', style: `bottom: calc(${alto(Math.max(r * (1 + margen), t))} + 4px)`, textContent: cifra(r) }));
      const sube = s => { real.style.height = alto(r * s / 4); };
      if (reducido()) sube(4);
      else [1, 2, 3, 4].forEach(s => setTimeout(() => sube(s), (k * 4 + s) * 60));
    });
    const resultado = fila('g-resultado', [el('span'), ...aciertos.map((a, k) => {
      const d = desvio[k + 1];
      // Si el entero coincide con el margen y la barra queda fuera (15,4 %), se ve el decimal
      const pct = Math.abs(d) * 100;
      const vista = !a && Math.round(pct) === margen * 100 ? pct.toFixed(1).replace('.', ',') : Math.round(pct);
      const nodo = el('span', {}, el('span'), `${d < 0 ? '−' : '+'}${vista}\u00a0%`,
        el('span', { className: 'oculto', textContent: `, ${a ? 'dentro' : 'fuera'} del margen` }));
      nodo.firstChild.innerHTML = icono(a ? 'tic' : 'aspa', 2);
      return nodo;
    })]);
    const leyenda = el('p', { className: 'g-leyenda' }, ...[['real', 'Dato real'], ['tu trama', 'Tu respuesta'], ['dif', 'Diferencia'], ['margen', `Margen de ±${margen * 100}\u00a0%`]]
      .map(([clase, texto]) => el('span', {}, el('i', { className: clase }), texto)));
    rotulos.after(resultado);
    setTimeout(() => [grafico, resultado].forEach(n => n.classList.add('final')), reducido() ? 0 : (cols.length - 1) * 240 + 60);
    pie.append(leyenda, el('div', { className: 'explicacion' }, el('p', { textContent: explicacion }), el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
    muestra(pie);

    const puntos = aciertos.reduce((s, a) => s + a, 0);
    return { puntos, estado: puntos / aciertos.length, recibo: aciertos.map(a => a ? '🟨' : '⬜').join(''), medida: aciertos.join('') };
  };

  listo(false, `Faltan ${valores.length - 1} barras`);

  return {
    cuerpo: [el('p', { className: 'enunciado', textContent: pregunta }), el('p', { className: 'etiqueta subtitulo', textContent: `${rotulo} · ${subtitulo}` }),
      el('p', { className: 'g-unidad', textContent: unidad }), grafico, rotulos, pie],
    resolver,
  };
};

ronda.maximo = d => d.valores.length - 1;
ronda.rotulo = true;
