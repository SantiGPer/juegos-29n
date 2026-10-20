import { icono } from './iconos.js';
import { accion, el, monta } from './util.js';

// Reglas con icono de 10×10; las comparten la portada y la ficha del índice
export const reglas = lista => el('ul', { className: 'reglas' }, ...lista.map(r => {
  const li = el('li', {}, el('span'), el('span', { textContent: r.texto }));
  li.firstChild.innerHTML = icono(r.icono, 2);
  return li;
}));

// Portada común (G1, maqueta v7): mismo texto que la ficha del índice, en portada.texto y portada.reglas
export function portada({ juego, dia, fuente, portada: { texto, reglas: lista } }, contenedor, empezar) {
  const jugar = accion('Jugar', empezar);
  jugar.classList.add('jugar');

  monta(contenedor, [
    el('p', { className: 'etiqueta', textContent: `Juegos 29N, día ${dia ?? 'TODO'}` }),
    el('h1', { textContent: juego }),
    el('p', { className: 'entradilla', textContent: texto }),
    reglas(lista),
    el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` }),
  ], jugar);
}
