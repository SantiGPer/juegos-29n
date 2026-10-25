import { icono } from '../iconos.js';
import { cifra, el, muestra } from '../util.js';
import { ordenOpciones } from './quiz.js';

// Ronda de fontanería (A9, maqueta v17): un cambio en el sistema electoral con su botón de ayuda, que abre un
// panel en la página, y las consecuencias como opciones. Al resolver, escaños por candidatura, real frente a con
// el cambio: dos tiras de 350 y una tabla con la diferencia en barra divergente. real y escanos: {etiqueta: escaños}
// (data/fontaneria_a09.json); candidaturas: {etiqueta: {color, siglas?}}; destacar: las filas que responden.

const ESCALA = 20;
const signo = d => `${d > 0 ? '+' : '−'}${Math.abs(d)}`;

const ayuda = (texto, id) => {
  const boton = el('button', { className: 'ayuda', ariaLabel: 'Ayuda: cómo funciona este cambio', ariaExpanded: 'false' },
    cifra('?', 3));
  boton.setAttribute('aria-controls', id);
  const titulo = el('p', { className: 'titulo-ayuda', tabIndex: -1 }, 'Cómo funciona');
  titulo.insertAdjacentHTML('afterbegin', icono('ayuda', 1.6));
  const cola = el('span', { className: 'cola' });
  cola.innerHTML = icono('cola', 3);
  const cerrar = el('button', { className: 'cerrar-ayuda', textContent: 'Cerrar' });
  const panel = el('div', { className: 'panel-ayuda', id, role: 'region', ariaLabel: 'Ayuda', hidden: true },
    cola, titulo, el('p', { textContent: texto }), cerrar);

  const escape = e => {
    if (!boton.isConnected) return document.removeEventListener('keydown', escape);
    if (e.key === 'Escape') pon(false);
  };
  const pon = abierta => {
    panel.hidden = !abierta;
    boton.ariaExpanded = String(abierta);
    if (abierta) {
      document.addEventListener('keydown', escape);
      titulo.focus();
    } else {
      document.removeEventListener('keydown', escape);
      boton.focus();
    }
  };
  boton.onclick = () => pon(panel.hidden);
  cerrar.onclick = () => pon(false);
  return { boton, panel };
};

// Filas de más a menos escaños reales; las que entran, al final
const grafico = (real, escanos, candidaturas, destacar) => {
  const filas = [...new Set([...Object.keys(real), ...Object.keys(escanos)])]
    .map(c => ({ c, r: real[c] ?? 0, n: escanos[c] ?? 0 }))
    .sort((a, b) => b.r - a.r || b.n - a.n || a.c.localeCompare(b.c, 'es'));
  const tope = Math.max(ESCALA, Math.ceil(Math.max(...filas.map(f => Math.abs(f.n - f.r))) / 5) * 5);
  const color = c => `var(${candidaturas[c].color})`;
  const tira = k => el('div', { className: 'tira-escanos' }, ...filas.filter(f => f[k] > 0)
    .map(f => el('span', { style: `flex-grow: ${f[k]}; background: ${color(f.c)}` })));

  const diferencia = ({ c, r, n }) => {
    const d = n - r, ancho = Math.abs(d) / tope * 50;
    if (d === 0) return el('div', { className: 'diferencia' }, el('em', { className: 'igual', textContent: '=' }));
    const lado = d > 0 ? 'left' : 'right';
    return el('div', { className: 'diferencia' },
      el('span', { style: `${lado}: 50%; width: ${ancho}%; background: ${color(c)}` }),
      el('em', { style: `${lado}: calc(50% + ${ancho}% + 4px)`, textContent: signo(d) }));
  };

  const fila = f => el('tr', { className: destacar.includes(f.c) ? 'destacada' : '' },
    el('td', {}, el('span', { className: 'sig' },
      el('i', { className: 'muestra-partido', style: `background: ${color(f.c)}` }),
      el('span', { className: 'nombre-sig', textContent: candidaturas[f.c].siglas ?? f.c }),
      ...(f.r === 0 ? [el('small', { textContent: 'entra' })] : f.n === 0 ? [el('small', { textContent: 'sale' })] : []))),
    el('td', { className: 'n', textContent: f.r }),
    el('td', { className: 'n cambio-n', textContent: f.n }),
    el('td', {}, diferencia(f)));

  return el('div', { className: 'grafico-escanos' },
    el('h3', { textContent: 'Escaños, real y con el cambio' }),
    el('div', { className: 'tiras', ariaHidden: 'true' }, el('span', { textContent: 'Real 2023' }), tira('r'),
      el('span', { textContent: 'Con el cambio' }), tira('n')),
    el('table', { className: 'tabla-escanos' },
      el('thead', {}, el('tr', {}, el('th', {}, el('span', { className: 'oculto', textContent: 'Candidatura' })),
        el('th', { textContent: 'Real' }), el('th', { textContent: 'Cambio' }), el('th', { textContent: 'Diferencia' }))),
      el('tbody', {}, ...filas.map(fila))),
    el('div', { className: 'escala-escanos', ariaHidden: 'true' },
      el('span', { textContent: `−${tope}` }), el('span', { textContent: '0' }), el('span', { textContent: `+${tope}` })));
};

let paneles = 0;

export const ronda = (datos, listo) => {
  const { titulo, cambio, pregunta = '¿Qué pasaría?', opciones, correcta, real, escanos, candidaturas, destacar = [], explicacion, fuente } = datos;
  const { boton, panel } = ayuda(datos.ayuda, `ayuda-${paneles += 1}`);

  let elegida;
  const pie = el('div');
  const botones = ordenOpciones(datos).map(letra => {
    const b = el('button', { className: 'opcion', textContent: opciones[letra] });
    b.dataset.letra = letra;
    b.onclick = () => {
      botones.forEach(o => o.classList.toggle('seleccionada', o === b));
      elegida = letra;
      listo(true);
    };
    return b;
  });

  // Responder no cierra la ayuda (diseño del 25-10)
  const resolver = () => {
    const acierto = elegida === correcta;
    botones.forEach(b => {
      b.disabled = true;
      b.classList.remove('seleccionada');
      b.classList.toggle('correcta', b.dataset.letra === correcta);
      b.classList.toggle('fallada', !acierto && b.dataset.letra === elegida);
    });
    pie.append(grafico(real, escanos, candidaturas, destacar),
      el('div', { className: 'explicacion' },
        el('p', { textContent: explicacion }),
        el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
    muestra(pie.firstChild);
    return acierto ? 1 : 0;
  };

  return {
    cuerpo: [
      el('div', { className: 'cambio' }, el('div', {}, el('h2', { textContent: titulo }), el('p', { textContent: cambio })), boton),
      panel,
      el('p', { className: 'pregunta-fontaneria', textContent: pregunta }),
      el('div', { className: 'opciones' }, ...botones),
      pie,
    ],
    resolver,
  };
};
