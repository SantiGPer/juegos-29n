import { el, muestra } from '../util.js';

// M10 como papeleta (B1, maqueta v26): cada frase es una fila con una casilla vacía. Al tocar una frase aparecen
// en la barra los candidatos; al tocar uno, su apellido entra en la casilla y la selección pasa a la siguiente
// frase vacía. Las fichas no se gastan: un candidato puede tener varias frases. Sin «No existe». 1 punto por frase.
// candidatos: [{ apellido, color? }], con color la variable CSS de su partido; items: [{ texto, quien, minuto }].

export const ronda = ({ pregunta, subtitulo, candidatos, items, explicacion, fuente }, listo, rotulo) => {
  const asig = items.map(() => null);
  let sel = -1;

  const ficha = (c, clase = '') => el('span', { className: `candidato${clase}` },
    ...(c.color ? [el('i', { className: 'muestra', style: `background: var(${c.color})` })] : []), c.apellido);

  const filas = el('ul', { className: 'frases' });
  const aviso = el('p', { className: 'etiqueta' });
  const fichas = el('div', { className: 'candidatos' });
  const bandeja = el('div', { className: 'bandeja-voto' }, aviso, fichas);

  const pinta = () => {
    filas.replaceChildren(...items.map((item, i) => el('li', {}, el('button', {
      type: 'button',
      className: `frase${sel === i ? ' elegida' : ''}`,
      ariaPressed: String(sel === i),
      onclick: () => {
        sel = i;
        pinta();
        fichas.querySelector('button').focus({ preventScroll: true });
      },
    }, el('q', { textContent: item.texto }),
    asig[i] === null ? el('span', { className: 'casilla-voto', ariaLabel: 'Casilla vacía' }) : ficha(candidatos[asig[i]])))));

    aviso.textContent = sel < 0 ? 'Toca una frase' : '¿Quién la dijo?';
    fichas.style.gridTemplateColumns = `repeat(${candidatos.length}, minmax(0, 1fr))`;
    fichas.replaceChildren(...(sel < 0 ? [] : candidatos.map((c, j) => Object.assign(el('button', { type: 'button' }, ficha(c)), {
      onclick: () => {
        asig[sel] = j;
        sel = [...asig.keys()].map(k => (sel + 1 + k) % asig.length).find(k => asig[k] === null) ?? -1;
        pinta();
        const siguiente = filas.querySelector('.elegida');
        siguiente?.scrollIntoView({ block: 'nearest' });
        siguiente?.focus({ preventScroll: true });
      },
    }))));
    listo(asig.every(a => a !== null), 'Comprobar');
  };

  const pie = el('div');

  const resolver = () => {
    const puntos = items.map((item, i) => candidatos[asig[i]].apellido === item.quien ? 1 : 0);
    filas.replaceChildren(...items.map((item, i) => el('li', { className: 'frase' },
      el('span', {}, el('q', { textContent: item.texto }),
        ...(puntos[i] ? [] : [el('span', { className: 'debia', textContent: `Era: ${item.quien}` })]),
        el('span', { className: 'minuto', textContent: `Minuto ${item.minuto}` })),
      ficha(candidatos[asig[i]], puntos[i] ? ' acierto' : ' fallo'))));
    bandeja.remove();
    if (explicacion) {
      pie.append(el('div', { className: 'explicacion' }, el('p', { textContent: explicacion }), el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
      muestra(pie);
    }
    const suma = puntos.reduce((s, p) => s + p, 0);
    return { puntos: suma, estado: suma / items.length, recibo: puntos.map(p => p ? '🟨' : '⬜').join(''), medida: puntos.join('') };
  };

  pinta();

  return {
    cuerpo: [el('p', { className: 'enunciado', textContent: pregunta }), el('p', { className: 'etiqueta subtitulo', textContent: `${rotulo} · ${subtitulo}` }), filas, pie],
    barra: [bandeja],
    resolver,
  };
};

ronda.maximo = d => d.items.length;
ronda.rotulo = true;
