import { icono } from '../iconos.js';
import { el, muestra } from '../util.js';

// M10 emparejar (maqueta v12): cada ítem es una fila con un hueco y las respuestas son piezas de una bandeja fija
// en la barra. Se toca fila y pieza, en cualquier orden; tocar una pieza colocada la devuelve. En escritorio,
// arrastrar es un extra. Se corrige al final, con 1 punto por pareja.
// nula: respuesta especial sin dato («No existe») para los ítems con respuesta null; revelacion: línea que llevan
// esos ítems al corregir. detalle: lista bajo el nombre; desde cuatro, «N <unidad>».

const lista = (d, unidad) => d.length > 3 ? `${d.length} ${unidad}` : d.length > 1 ? `${d.slice(0, -1).join(', ')} y ${d.at(-1)}` : d[0];

export const ronda = ({ pregunta, items, nula, revelacion, unidad, explicacion, fuente }, listo, rotulo) => {
  const respuestas = [...items.filter(i => i.respuesta !== null).sort((a, b) => b.valor - a.valor).map(i => i.respuesta), ...(nula ? [nula] : [])];
  const debida = item => item.respuesta ?? nula;
  const par = new Map();
  let fila = null;
  let pieza = null;

  const ficha = (j, escala, clase = '') => {
    const b = el('button', { type: 'button', className: `pieza${respuestas[j] === nula ? ' nula' : ''}${clase}` });
    if (respuestas[j] === nula) b.innerHTML = icono('nula', escala);
    b.append(respuestas[j]);
    return b;
  };

  const coloca = (i, j) => {
    [...par].filter(([, v]) => v === j).forEach(([k]) => par.delete(k));
    par.set(i, j);
    fila = pieza = null;
  };

  const filas = el('ul', { className: 'renglones' });
  const bandeja = el('div', { className: 'bandeja' });

  const tocaFila = i => {
    if (pieza !== null) coloca(i, pieza);
    else fila = fila === i ? null : i;
    pinta();
  };

  const tocaPieza = j => {
    if (fila !== null) coloca(fila, j);
    else pieza = pieza === j ? null : j;
    pinta();
  };

  const pinta = () => {
    const foco = document.activeElement?.dataset.k;
    filas.replaceChildren(...items.map((item, i) => {
      const nombre = el('button', { type: 'button', className: 'nombre', ariaPressed: String(fila === i), onclick: () => tocaFila(i) },
        item.texto, el('span', { className: 'detalle', textContent: lista(item.detalle, unidad) }));
      const j = par.get(i);
      const hueco = j === undefined
        ? el('button', { type: 'button', className: 'hueco', textContent: '?', ariaLabel: `Hueco de ${item.texto}`, onclick: () => tocaFila(i) })
        : Object.assign(ficha(j, 1.2), { onclick: () => { par.delete(i); fila = null; pinta(); } });
      nombre.dataset.k = `f${i}`;
      hueco.dataset.k = `h${i}`;
      return el('li', {
        className: `renglon${fila === i ? ' elegida' : ''}`,
        ondragover: e => e.preventDefault(),
        ondrop: e => { e.preventDefault(); coloca(i, +e.dataTransfer.getData('text/plain')); pinta(); },
      }, nombre, hueco);
    }));

    const usadas = new Set(par.values());
    bandeja.replaceChildren(...respuestas.map((_, j) => {
      if (usadas.has(j)) return el('span', { className: 'vacia' });
      const b = Object.assign(ficha(j, 1.4, pieza === j ? ' elegida' : ''), {
        ariaPressed: String(pieza === j),
        draggable: true,
        ondragstart: e => e.dataTransfer.setData('text/plain', j),
        onclick: () => tocaPieza(j),
      });
      b.dataset.k = `p${j}`;
      return b;
    }));

    const n = par.size;
    listo(n === items.length, n === items.length ? 'Comprobar' : `Empareja las ${items.length} (${n} de ${items.length})`);
    document.querySelector(`[data-k="${foco}"]`)?.focus();
  };

  const pie = el('div');

  const resolver = () => {
    const puntos = items.map((item, i) => respuestas[par.get(i)] === debida(item) ? 1 : 0);
    filas.replaceChildren(...items.map((item, i) => {
      const inventada = item.respuesta === null;
      const nombre = el('div', { className: 'nombre' });
      if (inventada) {
        const conIcono = el('span', { className: 'con-icono' }, el('span'), item.texto);
        conIcono.firstChild.innerHTML = icono('nula', 1.6);
        nombre.append(conIcono);
      } else nombre.append(item.texto);
      nombre.append(el('span', { className: 'detalle', textContent: lista(item.detalle, unidad) }),
        ...(inventada ? [el('span', { className: 'revelacion', textContent: revelacion })] : []));
      const colocada = Object.assign(ficha(par.get(i), 1.2, puntos[i] ? ' acierto' : ' fallo'), { disabled: true });
      return el('li', { className: `renglon${inventada ? ' inventada' : ''}` }, nombre,
        el('div', {}, colocada, ...(puntos[i] ? [] : [el('span', { className: 'debia', textContent: `Era: ${inventada ? nula.toLowerCase() : item.respuesta}` })])));
    }));
    bandeja.remove();
    pie.append(el('div', { className: 'explicacion' },
      ...explicacion.map(textContent => el('p', { textContent })),
      el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
    muestra(pie);
    return puntos;
  };

  pinta();

  return {
    cuerpo: [el('p', { className: 'enunciado' }, el('span', { className: 'etiqueta', textContent: `${rotulo}. ` }), pregunta), filas, pie],
    barra: [bandeja],
    resolver,
  };
};

// Ocupa una celda de la pista por ítem y pone su propio rótulo de ronda, en la línea del enunciado
ronda.casillas = d => d.items.length;
ronda.rotulo = true;
