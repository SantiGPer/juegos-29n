import { icono } from './iconos.js';
import { accion, el, mide, monta, pie } from './util.js';

// Reglas con icono de 10×10; las comparten la portada y la ficha del índice. «pila» pinta la pila de energía de
// A15 con un rayo (diseño del 09-11), la misma pieza que la cabecera y el coste de las ayudas.
export const reglas = lista => el('ul', { className: 'reglas' }, ...lista.map(r => {
  const li = el('li', {}, el('span'), el('span', { textContent: r.texto }));
  li.firstChild.innerHTML = r.icono === 'pila' ? `<span class="pila regla"><i>${icono('energia', 1.6)}</i></span>` : icono(r.icono, 2);
  return li;
}));

// Aviso de contenido de debate en un recuadro de 1 px de tinta: ficha del índice y portada de B1
export const recuadro = texto => {
  const nodo = el('p', { className: 'recuadro' }, el('span'), el('span', { textContent: texto }));
  nodo.firstChild.innerHTML = icono('bocadillo', 2, 'var(--tinta)', 'var(--senal)');
  return nodo;
};

// Portada común (G1, maqueta v7): mismo texto que la ficha del índice, en portada.texto y portada.reglas.
// debate: texto del recuadro bajo el título (B1, maqueta v26), que el juego toma de calendario.json.
export function portada({ juego, dia, fuente, debate, portada: { texto, reglas: lista } }, contenedor, empezar) {
  const jugar = accion('Jugar', () => {
    mide('partida-empezada');
    empezar();
  });
  jugar.classList.add('jugar');

  monta(contenedor, [
    el('p', { className: 'etiqueta', textContent: `Recreativos electorales, día ${dia ?? 'TODO'}` }),
    el('h1', { textContent: juego }),
    ...(debate ? [recuadro(debate)] : []),
    ...(texto ? [el('p', { className: 'entradilla', textContent: texto })] : []),
    reglas(lista),
    el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` }),
    pie(),
  ], jugar);
}
