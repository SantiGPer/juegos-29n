export const baraja = lista => lista.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);

export const el = (tag, props = {}, ...hijos) => {
  const nodo = Object.assign(document.createElement(tag), props);
  nodo.append(...hijos);
  return nodo;
};

export const casillas = (estados, porGrupo = 0) => el('div', { className: 'progreso', ariaHidden: 'true' },
  ...estados.map((e, i) => el('span', { className: `casilla ${e}${porGrupo && i && i % porGrupo === 0 ? ' corte' : ''}` })));
