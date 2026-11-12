import { icono } from './iconos.js';
import { recuadro, reglas } from './portada.js';
import { accion, cifra, el, monta, pie } from './util.js';

// Selector de días (decisiones de diseño del 15-10; maquetas v5 y v6). Cada día se abre a las 00:00, hora peninsular.
// ?hoy=N simula el día N para probarlo.
const hoyEn = dias => {
  const simulado = new URLSearchParams(location.search).get('hoy');
  return dias[simulado - 1]?.fecha ?? new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
};

const fecha = iso => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', timeZone: 'UTC' });

// La ficha es la portada del propio juego; un día sin juego asignado se ve en TODO
const ficha = d => d.carpeta === 'TODO'
  ? Promise.resolve({ juego: 'TODO', portada: { texto: 'TODO', reglas: [] } })
  : fetch(`juegos/${d.carpeta}/data.json`).then(r => r.json());

export async function indice(contenedor) {
  const { dias } = await fetch('data/calendario.json').then(r => r.json());
  const hoy = hoyEn(dias);
  // En la web pública, los días que aún no se han publicado llegan sin carpeta (publicar/publicar.mjs)
  const abierto = d => d.fecha <= hoy && d.carpeta;
  const fichas = await Promise.all(dias.map(d => abierto(d) ? ficha(d) : null));
  let elegido = dias.findLast(abierto)?.dia;

  const zona = el('div', { className: 'ficha' });
  const que = el('p', { className: 'que' });
  const jugar = accion('Jugar');
  jugar.classList.add('jugar');

  const casillas = dias.map(d => {
    if (!abierto(d)) {
      const nodo = el('span', { className: 'nivel cerrado', role: 'img', ariaLabel: `Día ${d.dia}, ${fecha(d.fecha)}, cerrado${d.hora ? `, se abre a las ${d.hora}` : ''}` });
      nodo.innerHTML = icono('candado', 2, 'var(--lapiz)');
      return nodo;
    }
    return el('button', {
      className: `nivel${d.fecha === hoy ? ' hoy' : ''}`,
      ariaLabel: `Día ${d.dia}, ${fecha(d.fecha)}`,
      onclick: () => elige(d.dia),
    }, cifra(String(d.dia), 3));
  });

  const elige = n => {
    elegido = n;
    const d = dias[n - 1], f = fichas[n - 1], esHoy = d.fecha === hoy;
    casillas.forEach((c, i) => {
      c.classList.toggle('elegido', i === n - 1);
      if (c.tagName === 'BUTTON') c.ariaPressed = String(i === n - 1);
    });
    zona.replaceChildren(
      el('p', { className: 'etiqueta', textContent: esHoy ? `Hoy, ${fecha(d.fecha)}` : fecha(d.fecha) }),
      el('h2', { textContent: f.juego }),
      ...(f.portada.texto ? [el('p', { className: 'entradilla', textContent: f.portada.texto })] : []),
      reglas(f.portada.reglas),
      ...(d.debate ? [recuadro(d.debate)] : []));
    que.replaceChildren(el('span', { className: 'etiqueta', textContent: esHoy ? 'Hoy' : `Día ${d.dia}` }), el('b', { textContent: f.juego }));
    jugar.textContent = esHoy ? 'Jugar' : `Jugar el del ${new Date(d.fecha).getUTCDate()}`;
    jugar.onclick = () => { location.href = `juegos/${d.carpeta}/`; };
  };

  // Un día con hora de apertura (B1, a las 13:00) sigue cerrado hasta que la Action lo publica
  const espera = dias.find(d => d.fecha === hoy && d.hora && !abierto(d));

  monta(contenedor, [
    el('h1', { textContent: 'Recreativos electorales' }),
    el('p', { className: 'etiqueta', textContent: 'Un juego al día del 13 al 27 de noviembre.' }),
    el('div', { className: 'niveles' }, ...casillas),
    ...(espera ? [el('p', { className: 'etiqueta', textContent: `Hoy, ${fecha(espera.fecha)}: se abre a las ${espera.hora}.` })] : []),
    zona,
    pie(),
  ], que, jugar);

  // Antes del 13-N no hay ningún día abierto
  if (elegido) return elige(elegido);
  que.replaceChildren(el('span', { className: 'etiqueta', textContent: 'Día 1' }), el('b', { textContent: `Empieza el ${fecha(dias[0].fecha)}` }));
  jugar.disabled = true;
}
