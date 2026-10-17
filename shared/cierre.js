import { icono } from './iconos.js';
import { accion, celdas, cifra, el, monta } from './util.js';

// pista: { estados, porGrupo } de la partida, que queda fija bajo la cifra
export function cerrar({ juego, dia, puntuacion, total, nivel, cuadricula, fuente, pista }, contenedor) {
  const resultado = total === undefined ? puntuacion : `${puntuacion}/${total}`;
  const texto = [`Juegos 29N, día ${dia ?? 'TODO'}`, juego, resultado, cuadricula, location.host + location.pathname]
    .filter(Boolean)
    .join('\n');

  const final = total === undefined
    ? el('p', { className: 'cifra palabra' }, el('span', { className: 'marca', textContent: puntuacion }))
    : el('div', { className: 'final' },
      el('span', { className: 'banda' }, cifra(String(puntuacion), 8)),
      cifra(`/${total}`, 4),
      el('span', { className: 'oculto', textContent: `${puntuacion} de ${total}` }));

  const manana = el('p', { className: 'manana' }, el('span'), 'Mañana, otro juego.');
  manana.firstChild.innerHTML = icono('candado', 2, 'var(--lapiz)');

  const copiar = accion('Copiar resultado', () => Promise.resolve()
    .then(() => navigator.clipboard.writeText(texto))
    .then(() => {
      copiar.textContent = 'Copiado';
      setTimeout(() => { copiar.textContent = 'Copiar resultado'; }, 2000);
    })
    .catch(() => { copiar.textContent = 'Selecciona y copia el texto'; }));

  monta(contenedor, [
    el('h1', { textContent: juego }),
    el('p', { className: 'etiqueta', textContent: 'Fin de la partida' }),
    final,
    ...(pista ? [celdas(pista.estados, [], pista.porGrupo)] : []),
    ...(nivel ? [el('p', { className: 'etiqueta', textContent: nivel })] : []),
    el('p', { className: 'recibo', textContent: texto }),
    el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` }),
    manana,
    el('p', {}, el('a', { href: '../../', textContent: 'Todos los juegos' })),
  ], copiar);
  scrollTo(0, 0);
}
