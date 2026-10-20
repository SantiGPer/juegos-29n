import { icono } from './iconos.js';
import { reglas } from './portada.js';
import { accion, cifra, el, monta } from './util.js';

// Selector de días (decisiones de diseño del 15-10; maquetas v5 y v6). Cada día se abre a las 00:00, hora peninsular.
// ?hoy=N simula el día N para probarlo.
const hoyEn = dias => {
  const simulado = new URLSearchParams(location.search).get('hoy');
  return simulado ? dias[simulado - 1].fecha : new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
};

const fecha = iso => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', timeZone: 'UTC' });

// La ficha es la portada del propio juego; un día sin juego asignado se ve en TODO
const ficha = d => d.carpeta === 'TODO'
  ? Promise.resolve({ juego: 'TODO', portada: { texto: 'TODO', reglas: [] } })
  : fetch(`juegos/${d.carpeta}/data.json`).then(r => r.json());

const esquina = nodo => {
  const esq = el('span', { className: 'esq' });
  esq.innerHTML = icono('bocadillo', 1.4, 'var(--tinta)', 'var(--senal)');
  nodo.append(esq);
};

// Aviso de contenido de debate en la ficha, en un recuadro de 1 px de tinta
const recuadro = texto => {
  const nodo = el('p', { className: 'recuadro' }, el('span'), el('span', { textContent: texto }));
  nodo.firstChild.innerHTML = icono('bocadillo', 2, 'var(--tinta)', 'var(--senal)');
  return nodo;
};

export async function indice(contenedor) {
  const { dias } = await fetch('data/calendario.json').then(r => r.json());
  const hoy = hoyEn(dias);
  const abiertos = dias.filter(d => d.fecha <= hoy);
  const fichas = await Promise.all(abiertos.map(ficha));
  let elegido = abiertos.length;

  const zona = el('div', { className: 'ficha' });
  const que = el('p', { className: 'que' });
  const jugar = accion('Jugar');
  jugar.classList.add('jugar');

  const casillas = dias.map(d => {
    if (d.fecha > hoy) {
      const nodo = el('span', { className: 'nivel cerrado', role: 'img', ariaLabel: `Día ${d.dia}, ${fecha(d.fecha)}, cerrado` });
      nodo.innerHTML = icono('candado', 2, 'var(--lapiz)');
      if (d.debate) esquina(nodo);
      return nodo;
    }
    const nodo = el('button', {
      className: `nivel${d.fecha === hoy ? ' hoy' : ''}`,
      ariaLabel: `Día ${d.dia}, ${fecha(d.fecha)}`,
      onclick: () => elige(d.dia),
    }, cifra(String(d.dia), 3));
    if (d.debate) esquina(nodo);
    return nodo;
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
      el('p', { className: 'entradilla', textContent: f.portada.texto }),
      reglas(f.portada.reglas),
      ...(d.debate ? [recuadro(d.debate)] : []));
    que.replaceChildren(el('span', { className: 'etiqueta', textContent: esHoy ? 'Hoy' : `Día ${d.dia}` }), el('b', { textContent: f.juego }));
    jugar.textContent = esHoy ? 'Jugar' : `Jugar el del ${new Date(d.fecha).getUTCDate()}`;
    jugar.onclick = () => { location.href = `juegos/${d.carpeta}/`; };
  };

  monta(contenedor, [
    el('h1', { textContent: 'Juegos de campaña 29N' }),
    el('p', { className: 'etiqueta', textContent: 'Un juego al día del 13 al 27 de noviembre.' }),
    el('div', { className: 'niveles' }, ...casillas),
    zona,
  ], que, jugar);

  // Antes del 13-N no hay ningún día abierto
  if (elegido) return elige(elegido);
  que.replaceChildren(el('span', { className: 'etiqueta', textContent: 'Día 1' }), el('b', { textContent: `Empieza el ${fecha(dias[0].fecha)}` }));
  jugar.disabled = true;
}
