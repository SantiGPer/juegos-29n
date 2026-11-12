import { icono } from './iconos.js';
import { accion, celdas, cifra, el, letraMetrica, mide, monta, pie } from './util.js';

// pista: { estados, porGrupo } de la partida, que queda fija bajo la cifra.
// otra: { texto, accion } para volver a jugar dentro de la misma edición (A12).
// resumen: nodos que van encima de la nota (rosco de A13).
// detalle: nodos que van bajo la nota (ranking de A3, desglose de A4).
// sinCifra: sin nota en pantalla; la puntuación solo va en el recibo (M8, que pinta su resultado en resumen).
// medida: detalle de la partida para las métricas; si falta, una letra por celda de la pista.
export function cerrar({ juego, dia, puntuacion, total, unidad, nivel, cuadricula, fuente, pista, otra, sinCifra, resumen = [], detalle = [], medida }, contenedor) {
  const puntos = parseFloat(String(puntuacion).replace(',', '.'));
  mide('partida-terminada', {
    ...(Number.isNaN(puntos) ? {} : { puntos }),
    detalle: medida ?? pista?.estados.map(letraMetrica).join('') ?? '',
  });

  const resultado = total === undefined ? [puntuacion, unidad].filter(Boolean).join(' ') : `${puntuacion}/${total}${unidad ? ` ${unidad}` : ''}`;
  const texto = [`Recreativos electorales, día ${dia ?? 'TODO'}`, juego, resultado, cuadricula, location.host + location.pathname]
    .filter(Boolean)
    .join('\n');

  // Sin total: una palabra (A14) o una cifra con su unidad al lado (A5, error medio)
  const final = total === undefined && unidad
    ? el('div', { className: 'final' },
      el('span', { className: 'banda' }, cifra(puntuacion, 8)),
      el('span', { className: 'unidad', textContent: unidad }),
      el('span', { className: 'oculto', textContent: resultado }))
    : total === undefined
    ? el('p', { className: 'cifra palabra' }, el('span', { className: 'marca', textContent: puntuacion }))
    : el('div', { className: 'final' },
      el('span', { className: 'banda' }, cifra(String(puntuacion), 8)),
      cifra(`/${total}`, 4),
      el('span', { className: 'oculto', textContent: `${puntuacion} de ${total}` }));

  const manana = el('p', { className: 'manana' }, el('span'), 'Mañana, otro juego.');
  manana.firstChild.innerHTML = icono('candado', 2, 'var(--lapiz)');

  const recibo = el('p', { className: 'recibo', textContent: texto });

  // Sin portapapeles (navegador interno de LinkedIn), el recibo queda seleccionado y a la vista
  const copiar = accion('Copiar resultado', () => Promise.resolve()
    .then(() => navigator.clipboard.writeText(texto))
    .then(() => {
      copiar.textContent = 'Copiado';
      setTimeout(() => { copiar.textContent = 'Copiar resultado'; }, 2000);
    })
    .catch(() => {
      copiar.textContent = 'Copia el texto seleccionado';
      getSelection().selectAllChildren(recibo);
      recibo.scrollIntoView({ block: 'nearest' });
    }));

  monta(contenedor, [
    el('h1', { textContent: juego }),
    el('p', { className: 'etiqueta', textContent: 'Fin de la partida' }),
    ...resumen,
    ...(sinCifra ? [] : [final]),
    ...(pista ? [celdas(pista.estados, [], pista.porGrupo)] : []),
    ...(nivel ? [el('p', { className: 'etiqueta', textContent: nivel })] : []),
    ...detalle,
    recibo,
    ...(otra ? [el('p', {}, el('button', { className: 'secundario', textContent: otra.texto, onclick: otra.accion }))] : []),
    el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` }),
    manana,
    el('p', {}, el('a', { className: 'todos', href: '../../', textContent: 'Todos los juegos' })),
    pie(),
  ], copiar);
  scrollTo(0, 0);
}
