import { cerrar } from '../cierre.js';
import { icono } from '../iconos.js';
import { portada } from '../portada.js';
import { accion, baraja, el, monta } from '../util.js';


export const iniciar = (config, contenedor) => portada(config, contenedor, () => partida(config, contenedor));

function partida({ juego, dia, fuente, vidas, grupos }, contenedor) {
  const grupoDe = new Map(grupos.flatMap((g, i) => g.items.map(item => [item, i])));
  let restantes = baraja([...grupoDe.keys()]);
  const resueltos = [];

  let marcados = [];
  const fallidas = new Set();
  let fallos = 0;
  let aviso = '';
  let recienPerdida = false;

  const completo = () => resueltos.length === grupos.length;
  const terminada = () => completo() || fallos === vidas;

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: resueltos.length,
    total: grupos.length,
    unidad: 'grupos',
    nivel: `Grupos encontrados. ${fallos === 0 ? 'Sin fallos' : `${fallos} ${fallos === 1 ? 'fallo' : 'fallos'}`}`,
    fuente,
  }, contenedor);

  const comprobar = () => {
    const clave = [...marcados].sort().join('|');
    if (fallidas.has(clave)) {
      aviso = 'Ya lo has probado.';
      return pinta();
    }

    const grupo = grupoDe.get(marcados[0]);
    if (marcados.every(item => grupoDe.get(item) === grupo)) {
      resueltos.push(grupo);
      restantes = restantes.filter(item => !marcados.includes(item));
      aviso = '';
    } else {
      fallidas.add(clave);
      fallos += 1;
      recienPerdida = true;
      aviso = 'No es un grupo.';
    }
    marcados = [];
    pinta();
  };

  // Resuelto: fondo del color del grupo. Perdido: papel, con una muestra del color para leer el recibo.
  // Mientras se juega, compacto; explicación y fuente al terminar.
  const bloque = (i, perdido) => el('div', {
    className: `grupo g${i + 1}${perdido ? ' perdido' : ''}`,
    style: perdido ? '' : `background: var(--grupo-${i + 1})`,
  },
    el('p', { className: 'hito' },
      ...(perdido ? [el('span', { className: 'muestra-partido', style: `background: var(--grupo-${i + 1})` })] : []),
      grupos[i].nombre),
    el('p', { textContent: grupos[i].items.join(', ') }),
    ...(terminada()
      ? [el('p', { className: 'etiqueta', textContent: grupos[i].explicacion }),
        el('p', { className: 'fuente', textContent: `Fuente: ${grupos[i].fuente}` })]
      : []));

  const pinta = () => {
    const quedan = vidas - fallos;
    // Al perder una vida, el corazón pasa por medio vacío antes de quedarse en contorno
    const animar = recienPerdida && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    recienPerdida = false;
    const corazones = Array.from({ length: vidas }, (_, i) => {
      const c = el('span');
      c.innerHTML = i < quedan ? icono('lleno', 3) : animar && i === quedan ? icono('mitad', 3) : icono('vacio', 3, 'var(--raya)');
      return c;
    });
    if (animar) setTimeout(() => { corazones[quedan].innerHTML = icono('vacio', 3, 'var(--raya)'); }, 200);

    const boton = terminada()
      ? accion('Ver resultado', final)
      : accion(marcados.length < 4 ? `Marca 4 (${marcados.length} de 4)` : 'Comprobar', comprobar);
    boton.disabled = !terminada() && marcados.length < 4;
    const barajar = el('button', { className: 'secundario', textContent: 'Barajar' });
    barajar.onclick = () => {
      restantes = baraja(restantes);
      pinta();
    };

    const sinResolver = grupos.map((_, i) => i).filter(i => !resueltos.includes(i));

    monta(contenedor, [
      el('header', { className: 'cab' }, el('div', { className: 'cab-fila' },
        el('h1', { className: 'nombre', textContent: juego }),
        el('p', { className: 'vidas' }, ...corazones, el('span', { className: 'etiqueta', textContent: `${quedan} ${quedan === 1 ? 'vida' : 'vidas'}` })))),
      // En juego, cada grupo resuelto ocupa una fila de la rejilla para que el tablero no salte
      ...(terminada()
        ? [...resueltos.map(i => bloque(i, false)), ...sinResolver.map(i => bloque(i, true))]
        : [el('div', { className: 'rejilla' }, ...resueltos.map(i => bloque(i, false)), ...restantes.map(item => {
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
      el('p', { className: 'etiqueta aviso', ariaLive: 'polite', textContent: aviso }),
    ], ...(terminada() ? [] : [barajar]), boton);
  };

  pinta();
}
