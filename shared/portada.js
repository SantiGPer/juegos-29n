import { icono } from './iconos.js';
import { accion, el, monta } from './util.js';

// Portada común (G1, maqueta v7): mismo texto que la ficha del índice, en portada.texto y portada.reglas
export function portada({ juego, dia, fuente, portada: { texto, reglas } }, contenedor, empezar) {
  const jugar = accion('Jugar', empezar);
  jugar.classList.add('jugar');

  monta(contenedor, [
    el('p', { className: 'etiqueta', textContent: `Juegos 29N, día ${dia ?? 'TODO'}` }),
    el('h1', { textContent: juego }),
    el('p', { className: 'entradilla', textContent: texto }),
    el('ul', { className: 'reglas' }, ...reglas.map(r => {
      const li = el('li', {}, el('span'), el('span', { textContent: r.texto }));
      li.firstChild.innerHTML = icono(r.icono, 2);
      return li;
    })),
    el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` }),
  ], jugar);
}
