import { icono } from './iconos.js';

export const baraja = lista => lista.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);

// Para las rondas de ordenar: nunca sale ya resuelta
export const desordena = lista => {
  const orden = baraja(lista);
  return orden.every((x, i) => x === lista[i]) ? desordena(lista) : orden;
};

export const el = (tag, props = {}, ...hijos) => {
  const nodo = Object.assign(document.createElement(tag), props);
  nodo.append(...hijos);
  return nodo;
};

// Tres zonas: cuerpo (cabecera y juego) y barra de acción abajo
export const monta = (contenedor, cuerpo, ...botones) =>
  contenedor.replaceChildren(el('div', { className: 'cuerpo' }, ...cuerpo), el('div', { className: 'barra' }, ...botones));

export const accion = (textContent, onclick) => el('button', { className: 'accion', textContent, onclick });

// Lector de pantalla: al montar una ronda el foco va a su cuerpo, y `voz` anuncia el resultado al resolver
export const enfoca = contenedor => {
  const cuerpo = contenedor.querySelector('.cuerpo');
  cuerpo.tabIndex = -1;
  cuerpo.focus({ preventScroll: true });
};
export const voz = () => el('p', { className: 'oculto', role: 'status' });

// El botón que resuelve pasa a «Siguiente»: un doble toque no debe saltarse la corrección
export const trasPausa = fn => {
  const desde = performance.now();
  return () => performance.now() - desde > 400 && fn();
};

// Métricas anónimas con Umami (decisión del 01-11), encendidas por el autor el 12-11: un evento al empezar
// y otro al terminar, con los puntos y el detalle de la partida en una sola propiedad. Si el script de Umami no
// carga, el juego sigue igual. El aviso va al pie de portada y cierre (diseño del 02-11). Este mismo interruptor
// carga la copia fija del script (shared/umami.js, decisión del 02-11), así que apagado no se cuenta ni la página.
const conMetricas = true;
if (conMetricas) {
  const script = Object.assign(document.createElement('script'), { src: new URL('umami.js', import.meta.url), defer: true });
  Object.assign(script.dataset, {
    websiteId: 'd990effc-7628-4bd3-8e9a-b5d35e03b973',
    hostUrl: 'https://gateway.umami.is',
    domains: 'santigper.github.io',
    doNotTrack: 'true',
  });
  document.head.append(script);
}
export const mide = (evento, datos) => { if (conMetricas) window.umami?.track(evento, datos); };
// Pie común de índice, portada y cierre (diseño del 12-11): la firma y, debajo, el aviso de métricas si está activo
export const pie = () => el('footer', { className: 'pie' },
  el('p', { className: 'firma' },
    el('span', { textContent: 'Un proyecto de Santiago García Pérez' }),
    el('span', { className: 'enlaces' }, el('a', { href: 'https://www.linkedin.com/in/santigper', target: '_blank', rel: 'noopener', textContent: 'LinkedIn' }))),
  ...(conMetricas ? [el('p', { className: 'metricas', textContent: 'Medimos partidas y puntuaciones de forma anónima, sin cookies, con Umami.' })] : []));

// Una letra por pregunta para el detalle: 1 acierto, m medio, 0 fallo, p pasada, - sin jugar
export const letraMetrica = estado => ({ acierto: '1', media: 'm', fallo: '0', pasada: 'p' })[estado] ?? '-';

export const muestra = nodo => nodo.scrollIntoView({
  behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  block: 'nearest',
});

// Cifras de casillas en rejilla de 5×7 (maqueta arcade v2) y la V y la S del duelo (maqueta v13). La coma del
// medio punto (tres píxeles) y el punto de miles (2 × 2) son glifos estrechos de 2×7 (diseño del 22-10).
const glifos = {
  0: '01110100011001110101110011000101110', 1: '00100011000010000100001000010001110',
  2: '01110100010000100010001000100011111', 3: '11110000010000101110000010000111110',
  4: '00010001100101010010111110001000010', 5: '11111100001111000001000011000101110',
  6: '00110010001000011110100011000101110', 7: '11111000010001000100010000100001000',
  8: '01110100011000101110100011000101110', 9: '01110100011000101111000010001001100',
  '/': '00001000010001000100010001000010000', '+': '00000001000010011111001000010000000',
  '−': '00000000000000011111000000000000000',
  '?': '01110100010000100010001000000000100',
  V: '10001100011000110001100010101000100', S: '01111100001000001110000010000111110',
  ',': '00000000010110', '.': '00000000001111',
};

export const cifra = (texto, p) => el('span', { className: 'digitos', ariaHidden: 'true', style: `--p: ${p}px` },
  ...[...texto].map(c => el('span', { className: 'digito', style: `--columnas: ${glifos[c].length / 7}` },
    ...[...glifos[c]].map(b => el('i', { className: b === '1' ? 'on' : '' })))));

export const numero = n => n.toLocaleString('es-ES');

// Un estado numérico (de 0 a 1) llena la celda de abajo arriba en esa proporción, a pasos del 5 % (A6, A15, B1)
export const celda = (estado, enCurso, escala = 2) => {
  const lleno = typeof estado === 'number';
  const nodo = el('span', { className: `celda ${lleno ? 'llena' : estado}${enCurso ? ' actual' : ''}` });
  if (lleno) nodo.style.setProperty('--lleno', `${Math.round(estado * 20) * 5}%`);
  nodo.innerHTML = { acierto: icono('tic', escala), fallo: icono('aspa', escala) }[estado] ?? '';
  return nodo;
};

// Pista de partida: una celda por ronda, en tramos de porGrupo
export const celdas = (estados, actual = [], porGrupo = estados.length, escala) => el('div', { className: 'pista', ariaHidden: 'true' },
  ...Array.from({ length: Math.ceil(estados.length / porGrupo) }, (_, t) => el('span', { className: 'tramo' },
    ...estados.slice(t * porGrupo, (t + 1) * porGrupo).map((e, k) => celda(e, actual.includes(t * porGrupo + k), escala)))));

// Cabecera compacta (maqueta v8): nombre arriba; debajo, pista con cursor a la izquierda y puntos a la derecha.
// Con más de seis rondas (maqueta v11), celdas de 18 px, tic y aspa a escala 1,6 y puntos a escala 2.
// Persiste entre rondas para que el cursor salte y el «+N» salga al sumar. extra: nodos entre el nombre y la
// fila de pista y puntos (barra de vida de A11).
export const marcador = (juego, porGrupo, ...extra) => {
  const valor = el('span');
  const cifras = el('span', { className: 'cifras' }, valor);
  const puntos = el('div', { className: 'puntos' }, el('span', { className: 'etiqueta', textContent: 'Puntos' }), cifras);
  const cursor = el('span', { className: 'cursor' });
  cursor.innerHTML = icono('subir', 2);
  let pista = el('div');
  const zona = el('div', { className: 'zona-pista' }, pista, cursor);
  const nodo = el('header', { className: 'cab' },
    el('h1', { className: 'nombre', textContent: juego }), ...extra, el('div', { className: 'cab-fila' }, zona, puntos));
  let antes = 0;

  const pinta = (estados, actual, suma, formato = numero) => {
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

    const [entero, decimal] = formato(suma).split(',');
    valor.replaceChildren(cifra(entero.padStart(2, '0') + (decimal ? `,${decimal}` : ''), larga ? 2 : 3), el('span', { className: 'oculto', textContent: formato(suma) }));
    if (suma > antes) {
      cifras.querySelector('.mas')?.remove();
      cifras.append(el('span', { className: 'mas' }, cifra(`+${formato(suma - antes)}`, 2)));
    }
    antes = suma;
  };

  // «/n» tras la cifra, cuando los puntos no son uno por celda (A15, diseño del 09-11)
  const sobre = n => puntos.append(el('span', { className: 'sobre', textContent: `/${n}` }));

  return { nodo, pinta, sobre };
};
