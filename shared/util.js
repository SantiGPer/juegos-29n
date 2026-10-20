import { icono } from './iconos.js';

export const baraja = lista => lista.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);

export const el = (tag, props = {}, ...hijos) => {
  const nodo = Object.assign(document.createElement(tag), props);
  nodo.append(...hijos);
  return nodo;
};

// Tres zonas: cuerpo (cabecera y juego) y barra de acción abajo
export const monta = (contenedor, cuerpo, ...botones) =>
  contenedor.replaceChildren(el('div', { className: 'cuerpo' }, ...cuerpo), el('div', { className: 'barra' }, ...botones));

export const accion = (textContent, onclick) => el('button', { className: 'accion', textContent, onclick });

export const muestra = nodo => nodo.scrollIntoView({
  behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  block: 'nearest',
});

// Cifras de casillas en rejilla de 5×7 (maqueta arcade v2), más la coma para el medio punto
const glifos = {
  0: '01110100011001110101110011000101110', 1: '00100011000010000100001000010001110',
  2: '01110100010000100010001000100011111', 3: '11110000010000101110000010000111110',
  4: '00010001100101010010111110001000010', 5: '11111100001111000001000011000101110',
  6: '00110010001000011110100011000101110', 7: '11111000010001000100010000100001000',
  8: '01110100011000101110100011000101110', 9: '01110100011000101111000010001001100',
  '/': '00001000010001000100010001000010000', '+': '00000001000010011111001000010000000',
  ',': '00000000000000000000001100011000100', '?': '01110100010000100010001000000000100',
};

export const cifra = (texto, p) => el('span', { className: 'digitos', ariaHidden: 'true', style: `--p: ${p}px` },
  ...[...texto].map(c => el('span', { className: 'digito' }, ...[...glifos[c]].map(b => el('i', { className: b === '1' ? 'on' : '' })))));

export const numero = n => n.toLocaleString('es-ES');

export const celda = (estado, enCurso, escala = 2) => {
  const nodo = el('span', { className: `celda ${estado}${enCurso ? ' actual' : ''}` });
  nodo.innerHTML = { acierto: icono('tic', escala), fallo: icono('aspa', escala) }[estado] ?? '';
  return nodo;
};

// Pista de partida: una celda por ronda, en tramos de porGrupo
export const celdas = (estados, actual = [], porGrupo = estados.length, escala) => el('div', { className: 'pista', ariaHidden: 'true' },
  ...Array.from({ length: Math.ceil(estados.length / porGrupo) }, (_, t) => el('span', { className: 'tramo' },
    ...estados.slice(t * porGrupo, (t + 1) * porGrupo).map((e, k) => celda(e, actual.includes(t * porGrupo + k), escala)))));

// Cabecera compacta (maqueta v8): nombre arriba; debajo, pista con cursor a la izquierda y puntos a la derecha.
// Con más de seis rondas (maqueta v11), celdas de 18 px, tic y aspa a escala 1,6 y puntos a escala 2.
// Persiste entre rondas para que el cursor salte y el «+N» salga al sumar.
export const marcador = (juego, porGrupo) => {
  const valor = el('span');
  const cifras = el('span', { className: 'cifras' }, valor);
  const puntos = el('div', { className: 'puntos' }, el('span', { className: 'etiqueta', textContent: 'Puntos' }), cifras);
  const cursor = el('span', { className: 'cursor' });
  cursor.innerHTML = icono('subir', 2);
  let pista = el('div');
  const zona = el('div', { className: 'zona-pista' }, pista, cursor);
  const nodo = el('header', { className: 'cab' },
    el('h1', { className: 'nombre', textContent: juego }), el('div', { className: 'cab-fila' }, zona, puntos));
  let antes = 0;

  const pinta = (estados, actual, suma) => {
    const larga = estados.length > 6;
    nodo.classList.toggle('larga', larga);
    const nueva = celdas(estados, actual, porGrupo, larga ? 1.6 : 2);
    pista.replaceWith(nueva);
    pista = nueva;

    const enCurso = pista.querySelectorAll('.celda')[actual[0]];
    cursor.hidden = !enCurso;
    if (enCurso) {
      void cursor.offsetWidth;
      cursor.style.left = `${enCurso.offsetLeft + (enCurso.offsetWidth - 10) / 2}px`;
      cursor.style.top = `${enCurso.offsetTop + enCurso.offsetHeight + 3}px`;
    }

    const [entero, decimal] = numero(suma).split(',');
    valor.replaceChildren(cifra(entero.padStart(2, '0') + (decimal ? `,${decimal}` : ''), larga ? 2 : 3), el('span', { className: 'oculto', textContent: numero(suma) }));
    if (suma > antes) {
      cifras.querySelector('.mas')?.remove();
      cifras.append(el('span', { className: 'mas' }, cifra(`+${numero(suma - antes)}`, 2)));
    }
    antes = suma;
  };

  return { nodo, pinta };
};
