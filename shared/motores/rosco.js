import { cerrar } from '../cierre.js';
import { portada } from '../portada.js';
import { cifra, el } from '../util.js';

export const iniciar = (config, contenedor) => portada(config, contenedor, () => partida(config, contenedor));

// Sin mayúsculas ni tildes; el apóstrofo tipográfico del teclado del móvil cuenta como recto
const normaliza = texto => texto.normalize('NFD').replace(/\p{M}/gu, '').replace(/[‘’]/g, "'").toLowerCase().trim().replace(/\s+/g, ' ');

// «Empieza por la F, …» con la letra destacada
const pista = texto => {
  const [, antes, letra, despues] = texto.match(/^(.*? la )(\S)(.*)$/s);
  return el('p', { className: 'definicion' }, antes, el('b', { textContent: letra }), despues);
};

// Rosco circular de 252 px (maqueta v7): letras de 24 px en un radio de 111 px, desde arriba
const circulo = (nodos, centro) => el('div', { className: 'rosco' },
  ...nodos.map((nodo, i) => {
    const angulo = -Math.PI / 2 + i * 2 * Math.PI / nodos.length;
    nodo.style.left = `${126 + 111 * Math.cos(angulo)}px`;
    nodo.style.top = `${126 + 111 * Math.sin(angulo)}px`;
    return nodo;
  }),
  el('div', { className: 'centro' }, ...centro));

const abierta = estado => estado === 'pendiente' || estado === 'pasada';

// Cierre: el rosco con el estado final; tocar una letra muestra su pista, su respuesta y su fuente
const resumen = (letras, estados) => {
  const grande = el('span', { className: 'grande' });
  const ficha = el('div', { ariaLive: 'polite' }, el('p', { className: 'etiqueta', textContent: 'Toca una letra para ver su pista.' }));
  const botones = letras.map((l, i) => el('button', {
    className: `letra ${estados[i]}`,
    textContent: l.letra,
    ariaLabel: `${l.letra}, ${{ acierto: 'acierto', fallo: 'fallo', pasada: 'sin responder' }[estados[i]]}`,
    onclick: () => {
      botones.forEach((b, k) => b.classList.toggle('actual', k === i));
      grande.textContent = l.letra;
      ficha.replaceChildren(pista(l.pista),
        el('p', {}, 'Respuesta: ', el('b', { textContent: l.respuesta })),
        el('p', { className: 'fuente', textContent: `Fuente: ${l.fuente}` }));
    },
  }));
  return [circulo(botones, [grande]), ficha];
};

function partida({ juego, dia, fuente, letras }, contenedor) {
  const estados = letras.map(() => 'pendiente');
  const aceptadas = letras.map(l => [l.respuesta, ...l.variantes].map(normaliza));
  let actual = 0;

  const aciertos = () => estados.filter(e => e === 'acierto').length;
  // Siguiente letra abierta en vuelta circular; la actual es la última candidata
  const siguiente = () => letras.map((_, k) => (actual + 1 + k) % letras.length).find(i => abierta(estados[i]));

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: aciertos(),
    total: letras.length,
    cuadricula: [0, 9, 18].map(k => estados.slice(k, k + 9).map(e => e === 'acierto' ? '🟨' : '⬜').join('')).join('\n'),
    fuente,
    detalle: resumen(letras, estados),
  }, contenedor);

  const campo = el('input', { placeholder: 'Respuesta', ariaLabel: 'Respuesta', autocomplete: 'off', spellcheck: false, enterKeyHint: 'send' });
  campo.setAttribute('autocapitalize', 'off');
  campo.setAttribute('autocorrect', 'off');
  const responder = el('button', { type: 'submit', className: 'accion', textContent: 'Responder', disabled: true });
  const pasar = el('button', { type: 'button', className: 'secundario', textContent: 'Pasar' });
  const terminar = el('button', { type: 'button', className: 'secundario', textContent: 'Terminar', onclick: final });
  // Los botones no le quitan el foco al campo, para que el teclado no se cierre
  [responder, pasar, terminar].forEach(b => { b.onpointerdown = e => e.preventDefault(); });

  const cuenta = el('span', { className: 'cifras' });
  const zona = el('div', { ariaHidden: 'true' });
  const era = el('p', { className: 'era', ariaLive: 'polite' });
  const definicion = el('div');
  const cuerpo = el('div', { className: 'cuerpo' },
    el('header', { className: 'cab' }, el('div', { className: 'cab-fila' }, el('h1', { className: 'nombre', textContent: juego }), cuenta)),
    zona, era, definicion,
    el('form', {
      className: 'campo',
      onsubmit: e => {
        e.preventDefault();
        const bien = aceptadas[actual].includes(normaliza(campo.value));
        estados[actual] = bien ? 'acierto' : 'fallo';
        era.replaceChildren(...(bien ? [] : ['Era: ', el('b', { textContent: letras[actual].respuesta })]));
        avanza();
      },
    }, campo, responder),
    el('div', { className: 'botones' }, pasar, terminar));

  // Con el campo enfocado (teclado abierto), el rosco se pliega en una tira y los aciertos suben a la cabecera
  const pinta = () => {
    const plegado = document.activeElement === campo;
    const casillas = letras.map((l, i) => el('span', { className: `letra ${estados[i]}${i === actual ? ' actual' : ''}`, textContent: l.letra }));
    const marca = String(aciertos()).padStart(2, '0');
    cuerpo.classList.toggle('plegado', plegado);
    zona.replaceChildren(plegado
      ? el('div', { className: 'tira' }, ...casillas)
      : circulo(casillas, [el('span', { className: 'grande', textContent: letras[actual].letra }), el('span', { className: 'etiqueta', textContent: 'Aciertos' }), cifra(marca, 3)]));
    cuenta.replaceChildren(...(plegado ? [cifra(marca, 2)] : []), el('span', { className: 'oculto', textContent: `${aciertos()} aciertos` }));
    definicion.replaceChildren(pista(letras[actual].pista));
    terminar.hidden = estados.includes('pendiente');
  };

  const avanza = () => {
    campo.value = '';
    responder.disabled = true;
    const i = siguiente();
    if (i === undefined) return final();
    actual = i;
    pinta();
  };

  campo.oninput = () => { responder.disabled = !campo.value.trim(); };
  campo.onfocus = pinta;
  campo.onblur = pinta;
  pasar.onclick = () => {
    estados[actual] = 'pasada';
    era.replaceChildren();
    avanza();
  };

  contenedor.replaceChildren(cuerpo);
  pinta();
}
