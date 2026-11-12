import { icono } from '../iconos.js';
import { el, muestra } from '../util.js';

// Cartón de 4 × 4 (B1, maqueta v26): el jugador marca lo que cree que pasó en el debate. Al comprobar, el fondo de
// cada casilla dice el acierto y el borde y la etiqueta, si pasó. Tocar una casilla abre su cita bajo el cartón; de
// entrada, la primera que pasó. 1 punto por casilla bien clasificada, marcada o no.
// items: [{ texto, paso, minuto?, cita? }], con minuto y cita en las que pasaron.

const lado = 4;

export const ronda = ({ pregunta, subtitulo, items }, listo, rotulo) => {
  const marcas = items.map(() => false);
  const carton = el('div', { className: 'carton' }, ...items.map((item, i) => el('button', {
    type: 'button',
    className: 'casilla-carton',
    ariaPressed: 'false',
    textContent: item.texto,
    onclick: e => {
      marcas[i] = !marcas[i];
      e.currentTarget.ariaPressed = String(marcas[i]);
    },
  })));
  const pie = el('div');

  const cita = item => item.paso ? `Minuto ${item.minuto}: «${item.cita}»` : 'No pasó en el debate.';

  const resolver = () => {
    const puntos = items.map((item, i) => marcas[i] === item.paso ? 1 : 0);
    const panel = el('div', { className: 'panel-cita', ariaLive: 'polite' });
    const abre = i => {
      carton.querySelectorAll('.casilla-carton').forEach((c, k) => c.classList.toggle('abierta', k === i));
      panel.replaceChildren(el('p', { className: 'etiqueta', textContent: items[i].texto }), el('p', { textContent: cita(items[i]) }));
    };

    carton.replaceChildren(...items.map((item, i) => {
      const b = el('button', {
        type: 'button',
        className: `casilla-carton resuelta ${puntos[i] ? 'acierto' : 'fallo'} ${item.paso ? 'paso-si' : 'no-paso'}`,
        onclick: () => abre(i),
      }, el('span', { className: 'marca-carton' }), item.texto, el('span', { className: 'que-paso', textContent: item.paso ? 'Pasó' : 'No pasó' }));
      b.firstChild.innerHTML = icono(puntos[i] ? 'tic' : 'aspa', 1.6);
      return b;
    }));

    pie.append(panel,
      el('p', { className: 'etiqueta', textContent: 'Lo que pasó, por minutos' }),
      el('ul', { className: 'por-minutos' }, ...items.filter(i => i.paso).sort((a, b) => a.minuto - b.minuto).map(item =>
        el('li', {}, el('b', { textContent: `Min. ${item.minuto}` }), el('span', { textContent: `${item.texto}: «${item.cita}»` })))));
    abre(Math.max(0, items.findIndex(i => i.paso)));
    muestra(panel);

    const suma = puntos.reduce((s, p) => s + p, 0);
    const recibo = Array.from({ length: items.length / lado }, (_, f) => puntos.slice(f * lado, (f + 1) * lado).map(p => p ? '🟨' : '⬜').join('')).join('\n');
    return { puntos: suma, estado: suma / items.length, recibo, medida: puntos.join('') };
  };

  listo(true, 'Comprobar');

  return {
    cuerpo: [el('p', { className: 'enunciado', textContent: pregunta }), el('p', { className: 'etiqueta subtitulo', textContent: `${rotulo} · ${subtitulo}` }), carton, pie],
    resolver,
  };
};

ronda.maximo = d => d.items.length;
ronda.rotulo = true;
