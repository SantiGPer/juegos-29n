import { cerrar } from '../cierre.js';
import { icono } from '../iconos.js';
import { portada } from '../portada.js';
import { accion, baraja, el, monta } from '../util.js';

// Recibo: una fila por intento, con el grupo de cada ítem marcado (grupos en orden de dificultad;
// marcador, senado, señal y tinta, como --grupo-1…4 en base.css)
const emoji = ['🟨', '🟫', '🟧', '⬛'];

export const iniciar = (config, contenedor) => portada(config, contenedor, () => partida(config, contenedor));

function partida({ juego, dia, fuente, vidas, grupos }, contenedor) {
  const grupoDe = new Map(grupos.flatMap((g, i) => g.items.map(item => [item, i])));
  let restantes = baraja([...grupoDe.keys()]);
  const resueltos = [];
  const intentos = [];
  let marcados = [];
  let fallos = 0;
  let aviso = '';

  const completo = () => resueltos.length === grupos.length;
  const terminada = () => completo() || fallos === vidas;

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: completo() ? 'Resuelto' : 'No resuelto',
    nivel: fallos === 0 ? 'Sin fallos' : `${fallos} ${fallos === 1 ? 'fallo' : 'fallos'}`,
    cuadricula: intentos.map(fila => fila.map(item => emoji[grupoDe.get(item)]).join('')).join('\n'),
    fuente,
  }, contenedor);

  const comprobar = () => {
    intentos.push(marcados);
    const grupo = grupoDe.get(marcados[0]);
    if (marcados.every(item => grupoDe.get(item) === grupo)) {
      resueltos.push(grupo);
      restantes = restantes.filter(item => !marcados.includes(item));
      aviso = '';
    } else {
      fallos += 1;
      aviso = 'No es un grupo.';
    }
    marcados = [];
    pinta();
  };

  // Resuelto: fondo del color del grupo. Perdido: papel, con una muestra del color para leer el recibo.
  const bloque = (i, perdido) => el('div', {
    className: `grupo g${i + 1}${perdido ? ' perdido' : ''}`,
    style: perdido ? '' : `background: var(--grupo-${i + 1})`,
  },
    el('p', { className: 'hito' },
      ...(perdido ? [el('span', { className: 'muestra-partido', style: `background: var(--grupo-${i + 1})` })] : []),
      grupos[i].nombre),
    el('p', { textContent: grupos[i].items.join(', ') }),
    el('p', { className: 'etiqueta', textContent: grupos[i].explicacion }),
    ...(terminada() ? [el('p', { className: 'fuente', textContent: `Fuente: ${grupos[i].fuente}` })] : []));

  const pinta = () => {
    const quedan = vidas - fallos;
    const iconos = el('span');
    iconos.innerHTML = Array.from({ length: vidas }, (_, i) => i < quedan ? icono('papeleta', 2) : icono('nula', 2, 'var(--raya)')).join('');

    const boton = terminada() ? accion('Ver resultado', final) : accion('Comprobar', comprobar);
    boton.disabled = !terminada() && marcados.length < 4;

    const sinResolver = grupos.map((_, i) => i).filter(i => !resueltos.includes(i));

    monta(contenedor, [
      el('header', { className: 'cab' }, el('div', { className: 'cab-fila' },
        el('h1', { className: 'nombre', textContent: juego }),
        el('p', { className: 'vidas' }, iconos, el('span', { className: 'etiqueta', textContent: `${quedan} ${quedan === 1 ? 'vida' : 'vidas'}` })))),
      ...resueltos.map(i => bloque(i, false)),
      ...(terminada()
        ? sinResolver.map(i => bloque(i, true))
        : [el('div', { className: 'rejilla' }, ...restantes.map(item => {
          const b = el('button', { className: `opcion${marcados.includes(item) ? ' seleccionada' : ''}`, textContent: item });
          b.onclick = () => {
            if (marcados.includes(item)) marcados = marcados.filter(m => m !== item);
            else if (marcados.length < 4) marcados = [...marcados, item];
            aviso = '';
            pinta();
            contenedor.querySelectorAll('.rejilla button')[restantes.indexOf(item)].focus();
          };
          return b;
        }))]),
      el('p', { className: 'etiqueta', ariaLive: 'polite', textContent: aviso }),
    ], boton);
  };

  pinta();
}
