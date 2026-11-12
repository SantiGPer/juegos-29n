import { icono } from '../iconos.js';
import { celda, cifra, el, numero } from '../util.js';
import { svg } from './mapa.js';

// Ronda de clic en el mapa (A15, maquetas pueblo v18 y energía v23, diseño del 02-11). Ficha del municipio gratis y
// tres ayudas que gastan energía; el jugador toca una provincia, la vista se amplía y clava el alfiler, que puede
// mover hasta confirmar. Puntúa por tramos de la distancia real sobre la esfera (el clic se pasa a longitud y latitud
// invirtiendo la cónica de su panel), rebajada al 80, 60 o 40 % según las ayudas usadas. A 375 px, ficha y mapa en
// dos pestañas; desde 720 px, en dos columnas. municipio: ficha de data/municipios_a15.json; geometria:
// data/mapa_provincias.json, con sus proyecciones.

const TRAMOS = [[10, 5], [50, 4], [150, 3], [400, 2], [Infinity, 1]];
const FACTOR = [1, 0.8, 0.6, 0.4];
const AYUDAS = ['Resto de partidos', 'Tamaño, blanco y nulo', 'Ganador en 2008'];
const CANARIAS = ['35', '38'];
const panel = id => CANARIAS.includes(id) ? 'canarias' : 'peninsula';
const lento = () => !matchMedia('(prefers-reduced-motion: reduce)').matches;
const escritorio = matchMedia('(min-width: 720px)');

const decimal = n => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pct = n => `${decimal(n)}\u00a0%`;

// Cónica conforme sobre la esfera con lat0 = 0, como en R/10, y su encaje en el SVG
const R = 6371008.8;
const rad = Math.PI / 180;
const conica = ({ lon0, lat1, lat2, k, xmin, ymax, dx, dy }) => {
  const t = lat => Math.tan(Math.PI / 4 + lat * rad / 2);
  const n = Math.log(Math.cos(lat1 * rad) / Math.cos(lat2 * rad)) / Math.log(t(lat2) / t(lat1));
  const rf = R * Math.cos(lat1 * rad) * t(lat1) ** n / n;
  return {
    ida: ([lon, lat]) => {
      const rho = rf / t(lat) ** n;
      const th = n * (lon - lon0) * rad;
      return [k * (rho * Math.sin(th) - xmin) + dx, -k * (rf - rho * Math.cos(th) - ymax) + dy];
    },
    vuelta: ([x, y]) => {
      const X = (x - dx) / k + xmin;
      const Y = ymax - (y - dy) / k;
      return [lon0 + Math.atan2(X, rf - Y) / n / rad, (2 * Math.atan((rf / Math.hypot(X, rf - Y)) ** (1 / n)) - Math.PI / 2) / rad];
    },
  };
};

const distancia = ([l1, f1], [l2, f2]) => 2 * 6371.0088 * Math.asin(Math.sqrt(
  Math.sin((f2 - f1) * rad / 2) ** 2 + Math.cos(f1 * rad) * Math.cos(f2 * rad) * Math.sin((l2 - l1) * rad / 2) ** 2));

const caja = d => d.match(/-?\d+(\.\d+)?/g).map(Number).reduce(([x0, y0, x1, y1], v, i) => i % 2
  ? [x0, Math.min(y0, v), x1, Math.max(y1, v)]
  : [Math.min(x0, v), y0, Math.max(x1, v), y1], [Infinity, Infinity, -Infinity, -Infinity]);

// Texto en tinta o en papel sobre el color del partido, el de más contraste
const luminancia = color => {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(color).trim().slice(1);
  const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const sobre = color => {
  const l = luminancia(color);
  return (l + 0.05) / 0.05 >= 1.05 / (l + 0.05) ? 'var(--tinta)' : 'var(--papel)';
};

const ganador = ({ etiqueta, color }, pequeno) => el('span', {
  className: `ganador${pequeno ? ' pequeno' : ''}`,
  textContent: etiqueta,
  style: `background: var(${color}); color: ${sobre(color)}`,
});

const dato = (texto, valor) => el('div', { className: 'dato-mun' }, el('span', { textContent: texto }),
  typeof valor === 'string' ? el('b', { textContent: valor }) : valor);

const capa = (titulo, ...hijos) => el('div', { className: 'capa' }, el('h3', { textContent: titulo }), ...hijos);

// Barras sobre la escala común de la partida (diseño del 09-11); con 0,0 % la fila queda sin barra
const barras = (filas, escala) => el('div', { className: 'reparto-mun' }, ...filas.flatMap(({ etiqueta, color, pct: v }) => [
  el('span', { className: `sig${etiqueta === 'Otros' ? ' otros' : ''}`, title: etiqueta, textContent: etiqueta }),
  el('span', { className: 'bw' }, ...(v > 0 ? [el('span', { className: 'b', style: `width: ${Math.min(v / escala, 1) * 100}%; background: var(${color})` })] : [])),
  el('span', { className: 'n', textContent: pct(v) }),
]));

// Ficha inicial (09-11): PP, PSOE, Vox y Sumar en orden fijo y la participación debajo; sin ganador
const ficha = (m, rotulo, escala) => capa(`Ficha del municipio · ${rotulo}`, barras(m.nacionales, escala),
  el('div', { className: 'part-mun' }, el('span', { textContent: 'Participación' }), el('b', { textContent: pct(m.participacion) })));

const ayudas = (m, escala) => [
  () => [
    barras([...m.resto, { etiqueta: 'Otros', color: '--otros', pct: m.otros }], escala),
    el('p', { className: 'fuente', textContent: 'Sobre voto válido.' }),
  ],
  () => [dato('Población', `${numero(m.poblacion)} hab.`), dato('Voto en blanco', pct(m.blanco)), dato('Votos nulos', pct(m.nulo))],
  () => [dato('Ganador en 2008', ganador(m.ganador_2008, true))],
].map((contenido, i) => () => capa(`Ayuda ${i + 1} · ${AYUDAS[i]}`, ...contenido()));

// Pila de energía (v23): tres rayos que se gastan desde el borne; al empezar la ronda se encienden de uno en uno
const rayo = escala => el('i', { innerHTML: icono('energia', escala) });
const pilaMini = () => el('span', { className: 'pila mini' }, rayo(1));

const energia = () => {
  const rayos = [0, 1, 2].map(() => rayo(1.6));
  const pila = el('span', { className: `pila${lento() ? ' recarga' : ''}` }, ...rayos);
  const nodo = el('div', { className: 'energia-pila' }, el('span', { className: 'rotulo', textContent: 'Energía' }), pila);
  nodo.setAttribute('role', 'img');
  nodo.setAttribute('aria-label', 'Energía: 3 de 3');
  return {
    nodo,
    gasta: quedan => {
      pila.classList.remove('recarga');
      rayos[quedan].classList.add('gastado', ...(lento() ? ['golpe'] : []));
      pila.classList.toggle('vacia', quedan === 0);
      nodo.setAttribute('aria-label', `Energía: ${quedan} de 3`);
    },
  };
};

export const ronda = ({ municipio: m, explicacion, fuente, geometria, escala }, listo, rotulo) => {
  const { W, H, borde, proyecciones, p } = geometria;
  const conicas = { peninsula: conica(proyecciones.peninsula), canarias: conica(proyecciones.canarias) };
  const suPanel = panel(m.ine.slice(0, 2));
  const real = conicas[suPanel].ida([m.lon, m.lat]);
  const provincias = p.filter(x => !['51', '52'].includes(x.id));
  const cajas = Object.fromEntries(provincias.map(x => [x.id, caja(x.d)]));
  const entero = [0, 0, W, H];

  let pestana = 'ficha';
  let usadas = 0;
  let sel = null;
  let pin = null;
  let vista = entero;
  let revelada = false;
  let clavado = false;

  // Ficha y ayudas
  const pila = energia();
  const colFicha = el('div', { className: 'col-ficha' });
  const contenidos = ayudas(m, escala);
  const botonAyuda = i => {
    const b = el('button', { className: 'ayuda-pueblo', disabled: i !== usadas },
      el('span', { textContent: `Ayuda ${i + 1} · ${AYUDAS[i]}` }),
      el('span', { className: 'coste' }, '−1', pilaMini()));
    b.setAttribute('aria-label', `Ayuda ${i + 1}, ${AYUDAS[i]}: gasta una de energía`);
    b.onclick = () => {
      usadas += 1;
      pila.gasta(3 - usadas);
      pintaFicha();
      colFicha.querySelector('.ayuda-pueblo:not(:disabled)')?.focus();
    };
    return b;
  };
  const pintaFicha = () => colFicha.replaceChildren(ficha(m, rotulo, escala),
    ...contenidos.map((abre, i) => i < usadas ? abre() : botonAyuda(i)));
  pintaFicha();

  // Mapa
  const mapa = svg('svg', { viewBox: entero.join(' '), role: 'img', 'aria-label': 'Mapa de España por provincias' });
  const formas = provincias.map(x => {
    const f = svg('path', { d: x.d, class: 'pr' });
    f.dataset.id = x.id;
    return f;
  });
  const recuadro = svg('path', { d: borde, class: 'borde' });
  const marcas = svg('g', {});
  mapa.append(...formas, recuadro, marcas);

  const regla = el('i');
  const reglaTexto = el('span');
  const escalaKm = el('span', { className: 'escala-km', hidden: true }, regla, reglaTexto);
  // El toque que elige provincia hace aparecer «Mapa entero» bajo el dedo: el clic que lo sigue no cuenta
  let elegidaEn = 0;
  const volver = () => {
    const b = el('button', { className: 'volver', ariaLabel: 'Volver al mapa entero' }, el('span', { innerHTML: icono('volver', 1.6) }), 'Mapa entero');
    b.onclick = () => {
      if (performance.now() - elegidaEn < 500) return;
      pin = null;
      sel = null;
      actualiza();
      anima(entero);
    };
    return b;
  };
  const provEt = el('span', { className: 'prov-et' });
  const encima = el('div', { className: 'encima' }, volver(), provEt);
  const lienzo = el('div', { className: 'lienzo' }, mapa, escalaKm, encima);
  const provFila = el('span', { className: 'prov' });
  const instruccion = el('span', { className: 'etiqueta' });
  const volverFila = volver();
  const filaMapa = el('div', { className: 'fila-mapa' }, volverFila, provFila, instruccion);
  // Resumen de la pestaña «Mapa» (09-11): las cuatro cifras con su color y la participación, sin ganador
  const resumen = el('div', { className: 'resumen' },
    ...m.nacionales.map(({ etiqueta, color, pct: v }) => el('span', {}, el('i', { style: `background: var(${color})` }), `${etiqueta} ${decimal(v)}`)),
    el('span', { className: 'part' }, 'Part. ', el('b', { textContent: pct(m.participacion) })));
  const colMapa = el('div', { className: 'col-mapa' }, resumen, filaMapa, lienzo);

  const ancho = () => mapa.getBoundingClientRect().width || 343;
  const alfiler = ([x, y], u) => {
    const fuera = svg('g', { transform: `translate(${x - 4.5 * u} ${y - 12 * u}) scale(${u})` });
    const dentro = svg('g', { class: `alfiler${clavado && lento() ? ' anim' : ''}` });
    dentro.innerHTML = icono('alfiler', 1);
    fuera.append(dentro);
    return fuera;
  };

  const dibuja = () => {
    mapa.setAttribute('viewBox', vista.join(' '));
    const zoom = Boolean(sel) && vista[2] < W;
    formas.forEach(f => {
      f.classList.toggle('sel', f.dataset.id === sel && !revelada);
      f.classList.toggle('fuera', zoom && panel(f.dataset.id) !== panel(sel));
    });
    if (sel) mapa.insertBefore(formas.find(f => f.dataset.id === sel), recuadro);
    recuadro.classList.toggle('fuera', zoom && panel(sel) === 'peninsula');

    const k = vista[2] / ancho();
    marcas.replaceChildren(
      ...(revelada ? [
        svg('line', { class: `linea${lento() ? ' anim' : ''}`, pathLength: 1, x1: pin[0], y1: pin[1], x2: real[0], y2: real[1], 'stroke-width': 2 * k }),
        svg('rect', { class: `real${lento() ? ' anim' : ''}`, x: real[0] - 6 * k, y: real[1] - 6 * k, width: 12 * k, height: 12 * k }),
      ] : []),
      ...(pin ? [alfiler(pin, 2 * k)] : []));
    clavado = false;

    // Escala de 10, 20, 50 o 100 km, la que mida de 40 a 110 px
    escalaKm.hidden = !zoom;
    if (zoom) {
      const c = conicas[panel(sel)];
      const [cx, cy] = [vista[0] + vista[2] / 2, vista[1] + vista[3] / 2];
      const pxKm = 1 / k / distancia(c.vuelta([cx, cy]), c.vuelta([cx + 1, cy]));
      const km = [10, 20, 50, 100].find(n => n * pxKm >= 40) ?? 100;
      regla.style.width = `${km * pxKm}px`;
      reglaTexto.textContent = `${km} km`;
    }
  };

  // Ampliación en cuatro pasos de 70 ms
  const anima = destino => {
    const origen = vista;
    const pasos = lento() ? 4 : 1;
    const avanza = paso => {
      vista = origen.map((v, j) => v + (destino[j] - v) * paso / pasos);
      dibuja();
      if (paso < pasos) setTimeout(() => avanza(paso + 1), 70);
    };
    avanza(1);
  };

  const encuadre = id => {
    const [x0, y0, x1, y1] = cajas[id];
    const w = Math.max((x1 - x0) * 1.3, (y1 - y0) * 1.3 * W / H, 72);
    const h = w * H / W;
    return [(x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - h / 2, w, h];
  };

  // El mapa ocupa el alto que queda hasta la barra, centrado; en la revelación del móvil, todo el ancho
  const ajusta = () => {
    if (!lienzo.isConnected || !lienzo.offsetParent) return;
    if (revelada && !escritorio.matches) {
      lienzo.style.width = filaMapa.style.width = '';
    } else {
      const barra = document.querySelector('.barra')?.offsetHeight ?? 0;
      const arriba = lienzo.getBoundingClientRect().top + scrollY;
      const alto = Math.max(200, innerHeight - arriba - barra - 12);
      lienzo.style.width = filaMapa.style.width = `${Math.min(colMapa.clientWidth, alto * W / H)}px`;
    }
    dibuja();
  };

  const actualiza = () => {
    const nombre = sel ? provincias.find(x => x.id === sel).n : '';
    encima.hidden = !sel;
    provEt.textContent = provFila.textContent = nombre;
    volverFila.hidden = !sel;
    instruccion.textContent = sel ? 'Toca o arrastra para mover el alfiler.' : 'Toca la provincia donde crees que está.';
    if (!escritorio.matches && pestana === 'ficha') listo(true, 'Marcar en el mapa');
    else if (!sel) listo(false, 'Toca una provincia');
    else if (!pin) listo(false, 'Clava el alfiler');
    else listo(true, 'Confirmar');
  };

  // Paso 1: la provincia bajo el dedo o, en el mar o en un borde, la que más asome en un círculo de 44 px
  const punto = e => {
    const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(mapa.getScreenCTM().inverse());
    return [q.x, q.y];
  };
  const bajo = ([x, y]) => formas.find(f => !f.classList.contains('fuera') && f.isPointInFill(new DOMPoint(x, y)));
  const provinciaEn = e => {
    const [x, y] = punto(e);
    const k = vista[2] / ancho();
    const votos = [0, 6, 12, 18, 22].flatMap(r => Array.from({ length: r ? 16 : 1 }, (_, a) =>
      bajo([x + Math.cos(a * Math.PI / 8) * r * k, y + Math.sin(a * Math.PI / 8) * r * k])?.dataset.id))
      .filter(Boolean);
    return bajo([x, y])?.dataset.id ?? Object.entries(votos.reduce((s, id) => ({ ...s, [id]: (s[id] ?? 0) + 1 }), {}))
      .sort((a, b) => b[1] - a[1])[0]?.[0];
  };

  let arrastra = false;
  mapa.onpointerdown = e => {
    if (revelada) return;
    if (!sel) {
      const id = provinciaEn(e);
      if (!id) return;
      sel = id;
      elegidaEn = performance.now();
      actualiza();
      anima(encuadre(id));
      return;
    }
    mapa.setPointerCapture(e.pointerId);
    arrastra = true;
    pin = punto(e);
    clavado = true;
    dibuja();
    actualiza();
  };
  mapa.onpointermove = e => {
    if (!arrastra) return;
    pin = punto(e);
    dibuja();
  };
  mapa.onpointerup = mapa.onpointercancel = () => { arrastra = false; };

  // Pestañas (solo a 375 px)
  const raiz = el('div', { className: 'pueblo' });
  raiz.dataset.pestana = pestana;
  const tabs = ['Ficha', 'Mapa'].map(texto => {
    const b = el('button', { textContent: texto });
    b.setAttribute('role', 'tab');
    b.onclick = () => cambia(texto.toLowerCase());
    return b;
  });
  const pestanas = el('div', { className: 'pestanas' }, ...tabs);
  pestanas.setAttribute('role', 'tablist');
  const cambia = destino => {
    pestana = destino;
    raiz.dataset.pestana = destino;
    tabs.forEach(b => b.setAttribute('aria-selected', b.textContent.toLowerCase() === destino));
    actualiza();
    ajusta();
  };
  raiz.append(pila.nodo, pestanas, colFicha, colMapa);
  cambia('ficha');

  // En escritorio la pila va en la fila de la cabecera, entre la pista y los puntos (diseño del 09-11)
  const colocaPila = () => {
    const fila = document.querySelector('.cab-fila');
    if (!escritorio.matches) return raiz.prepend(pila.nodo);
    fila.querySelector('.energia-pila')?.remove();
    fila.querySelector('.puntos').before(pila.nodo);
  };

  const alCambiar = () => {
    if (!raiz.isConnected) return;
    if (!revelada) {
      colocaPila();
      actualiza();
    }
    ajusta();
  };
  addEventListener('resize', alCambiar);
  escritorio.addEventListener('change', alCambiar);
  requestAnimationFrame(alCambiar);

  const pulsa = () => {
    if (escritorio.matches || pestana === 'mapa') return true;
    cambia('mapa');
    return false;
  };

  const resolver = () => {
    revelada = true;
    const km = Math.round(distancia(conicas[panel(sel)].vuelta(pin), [m.lon, m.lat]));
    const [limite, t] = TRAMOS.find(([l]) => km <= l);
    const f = FACTOR[usadas];
    const puntos = Math.round(t * f * 10) / 10;

    // Si el municipio cae en la vista ampliada, la vista no cambia; si no, vuelve al mapa entero
    const [vx, vy, vw, vh] = vista;
    if (panel(sel) !== suPanel || real[0] < vx || real[0] > vx + vw || real[1] < vy || real[1] > vy + vh) vista = entero;

    const tramo = limite === Infinity ? 'Más de 400 km' : `Hasta ${limite} km`;
    const base = `${t} ${t === 1 ? 'punto' : 'puntos'}`;
    const cuenta = el('p', { className: 'cuenta-km' }, `${tramo}: `, ...(usadas
      ? [`${base} × ${decimal(f)} por ${['una ayuda', 'dos ayudas', 'tres ayudas'][usadas - 1]} = `, el('b', { textContent: decimal(puntos) })]
      : [el('b', { textContent: base })]));

    const cabeza = el('div', { className: 'rev' },
      el('p', { className: 'etiqueta', textContent: rotulo }),
      el('h2', { textContent: m.nombre }),
      el('p', { className: 'donde', textContent: `${m.provincia} · ${m.ccaa}` }),
      el('div', { className: 'resultado' },
        el('div', {}, el('span', { className: 'etiqueta', textContent: 'Te has quedado a' }),
          el('span', { className: 'valor' }, cifra(String(km), 4), el('span', { className: 'etiqueta', textContent: 'km' }))),
        el('div', {}, el('span', { className: 'etiqueta', textContent: 'Puntos de la ronda' }), cifra(decimal(puntos), 4)),
        el('span', { className: 'oculto', textContent: `Te has quedado a ${km} km. Puntos de la ronda: ${decimal(puntos)}.` })),
      cuenta);

    const muestraReal = el('i', { className: 'muestra-real' });
    filaMapa.replaceChildren(el('span', { className: 'leyenda-pueblo' },
      el('span', {}, el('span', { innerHTML: icono('alfiler', 1.4) }), 'Tu alfiler'),
      el('span', {}, muestraReal, m.nombre)));
    const resto = el('div', { className: 'resto' },
      el('div', { className: 'explicacion' }, el('p', { textContent: explicacion }), el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })),
      capa('Ficha completa', dato('Ganador', ganador(m.ganador))), ficha(m, rotulo, escala), ...contenidos.map(abre => abre()));

    raiz.classList.add('revelada');
    pila.nodo.remove();
    raiz.replaceChildren(cabeza, colMapa, resto);
    scrollTo(0, 0);
    ajusta();

    return {
      puntos,
      estado: t / 5,
      recibo: `${'🟨'.repeat(t)}${'⬜'.repeat(5 - t)} ${km} km`,
      medida: `${km}k${usadas}`,
      fila: el('tr', {},
        el('td', { className: 'c' }, celda(t / 5)),
        el('td', {}, el('b', { textContent: m.nombre }), el('small', { textContent: m.provincia })),
        el('td', { className: 'n', textContent: `${km} km` }),
        el('td', { className: 'n' }, usadas ? `${t} × ${decimal(f)} = ` : '', el('b', { textContent: decimal(puntos) }))),
    };
  };

  return { cuerpo: [raiz], resolver, pulsa };
};

ronda.rotulo = true;
ronda.maximo = 5;
