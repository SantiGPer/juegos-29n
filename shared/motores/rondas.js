import { cerrar } from '../cierre.js';
import { icono } from '../iconos.js';
import { portada } from '../portada.js';
import { accion, celda, desordena, el, enfoca, marcador, monta, muestra, numero, trasPausa, voz } from '../util.js';
import { ordenOpciones } from './quiz.js';
import { ronda as atribuir } from './atribuir.js';
import { ronda as carton } from './carton.js';
import { ronda as duelo } from './duelo.js';
import { ronda as emparejar } from './emparejar.js';
import { ronda as estimacion } from './estimacion.js';
import { ronda as fontaneria } from './fontaneria.js';
import { ronda as grafico } from './grafico.js';
import { ronda as hemiciclo } from './hemiciclo.js';
import { ronda as mapa } from './mapa.js';
import { ronda as pueblo } from './pueblo.js';

// Encadenador de rondas de mecánicas distintas: una cabecera, una pista, una puntuación y un cierre.
// Cada tipo de ronda es ronda(datos, listo, rotulo) → { cuerpo, barra?, resolver }: listo(bool, texto?) enciende
// el botón y puede cambiar su texto; barra va en la barra fija, sobre el botón; resolver() revela la solución y
// devuelve 0, ½ o 1. Un tipo con casillas(datos) ocupa varias celdas de la pista y su resolver devuelve un
// punto por celda; uno con rotulo pone él mismo el «Ronda N de M»; uno con fija queda pegado arriba con la
// cabecera y el primer nodo de su cuerpo. Una ronda puede traer su rotulo («Duelo»).
// Un tipo con maximo (cifra o función de los datos) vale esos puntos en el total del cierre; su resolver puede
// devolver { puntos, estado, recibo, fila, medida }: estado es la clase de su celda o, si es un número de 0 a 1, su
// llenado (pista proporcional de A6, A15 y B1), recibo su línea del texto copiable, fila su fila de la tabla del
// cierre (A15) y medida su dato para las métricas, separado por punto y coma (km y ayudas en A15, error en A5).
// Un tipo con pulsa() la llama antes de resolver y solo resuelve si devuelve true.

const explicacion = ({ explicacion, fuente }) => el('div', { className: 'explicacion' },
  el('p', { textContent: explicacion }),
  el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` }));

const opciones = (datos, listo) => {
  let elegida;
  const pie = el('div');
  const botones = ordenOpciones(datos).map(letra => {
    const b = el('button', { className: 'opcion', textContent: datos.opciones[letra] });
    b.dataset.letra = letra;
    b.onclick = () => {
      botones.forEach(o => o.classList.toggle('seleccionada', o === b));
      elegida = letra;
      listo(true);
    };
    return b;
  });

  const resolver = () => {
    const acierto = elegida === datos.correcta;
    botones.forEach(b => {
      b.disabled = true;
      b.classList.remove('seleccionada');
      b.classList.toggle('correcta', b.dataset.letra === datos.correcta);
      b.classList.toggle('fallada', !acierto && b.dataset.letra === elegida);
    });
    pie.append(explicacion(datos));
    muestra(pie);
    return acierto ? 1 : 0;
  };

  return { cuerpo: [el('p', { className: 'pregunta', textContent: datos.pregunta }), el('div', { className: 'opciones' }, ...botones), pie], resolver };
};

// Ordenar de mayor a menor valor. 1 punto con todo en su sitio; ½ con al menos `medio` ítems en su
// posición exacta (por defecto, la mitad); 0 en otro caso.
const ordenar = (datos, listo) => {
  const correcto = [...datos.items].sort((a, b) => b.valor - a.valor);
  const orden = desordena(correcto);
  const lista = el('ol', { className: 'orden' });
  const [arriba, abajo] = datos.extremos ?? ['Más', 'Menos'];
  listo(true);

  const mover = (i, paso) => {
    const b = el('button', {
      className: 'mover',
      ariaLabel: `${paso < 0 ? 'Subir' : 'Bajar'}: ${orden[i].texto}`,
      disabled: i + paso < 0 || i + paso >= orden.length,
    });
    b.innerHTML = icono(paso < 0 ? 'subir' : 'bajar', 4);
    b.onclick = () => {
      [orden[i], orden[i + paso]] = [orden[i + paso], orden[i]];
      pinta(i + paso);
      const [subir, bajar] = lista.children[i + paso].querySelectorAll('button');
      const mismo = paso < 0 ? subir : bajar;
      (mismo.disabled ? (paso < 0 ? bajar : subir) : mismo).focus();
    };
    return b;
  };

  const pinta = movida => {
    lista.replaceChildren(...orden.map((x, i) =>
      el('li', { className: i === movida ? 'movida' : '' }, el('span', { textContent: x.texto }), mover(i, -1), mover(i, 1))));
    if (movida !== undefined) setTimeout(() => lista.children[movida]?.classList.remove('movida'), 400);
  };
  pinta();

  const pie = el('div');
  // Al comprobar, la lista se queda como la dejó el jugador; los mal colocados llevan aspa y su posición real (decisión del 20-10)
  const resolver = () => {
    const enSitio = correcto.filter((x, i) => orden[i] === x).length;
    const resuelta = el('ol', { className: 'orden resuelta' }, ...orden.map((x, i) => el('li', {},
      celda(correcto[i] === x ? 'acierto' : 'fallo'),
      el('div', {},
        el('p', { className: 'hito', textContent: x.texto }),
        el('p', { className: 'etiqueta', textContent: x.cifra }),
        ...(correcto[i] === x ? [] : [el('p', { className: 'etiqueta', textContent: `Era el ${correcto.indexOf(x) + 1}.º` })])))));
    lista.replaceWith(resuelta);
    pie.append(explicacion(datos));
    muestra(pie);
    return enSitio === correcto.length ? 1 : enSitio >= (datos.medio ?? correcto.length / 2) ? 0.5 : 0;
  };

  return {
    cuerpo: [
      el('p', { className: 'pregunta', textContent: datos.pregunta }),
      el('p', { className: 'etiqueta extremo', textContent: arriba }),
      lista,
      el('p', { className: 'etiqueta extremo', textContent: abajo }),
      pie,
    ],
    resolver,
  };
};

const tipos = { opciones, ordenar, duelo, estimacion, emparejar, mapa, hemiciclo, fontaneria, pueblo, atribuir, carton, grafico };

const estado = p => p === 1 ? 'acierto' : p > 0 ? 'media' : 'fallo';
const casillas = r => tipos[r.tipo].casillas?.(r) ?? 1;
const maximo = r => {
  const m = tipos[r.tipo].maximo;
  return typeof m === 'function' ? m(r) : m ?? casillas(r);
};

// Barra de vida (A11, maqueta v16): corazón, cinco tramos en un marco y la cuenta. Cada ronda sin puntos vacía el
// tramo de más a la derecha, que parpadea dos veces.
const barraVida = ({ total, fin }) => {
  let quedan = total;
  const tramos = Array.from({ length: total }, () => el('i'));
  const corazon = el('span');
  corazon.innerHTML = icono('lleno', 2);
  const cuenta = el('span', { className: 'cuenta', textContent: `${total}/${total}` });
  const nodo = el('div', { className: 'vida' }, corazon, el('span', { className: 'tramos', ariaHidden: 'true' }, ...tramos),
    el('span', { className: 'oculto', textContent: 'Vida: ' }), cuenta);
  return {
    nodo,
    fin,
    total,
    quedan: () => quedan,
    quita: () => {
      quedan -= 1;
      tramos[quedan].classList.add('fuera');
      cuenta.textContent = `${quedan}/${total}`;
    },
  };
};

// nota: nota metodológica, bajo la puntuación del cierre. etiqueta: «Pregunta» o «Ronda». porGrupo: celdas por
// tramo de la pista y por línea del recibo. resultado(): { puntuacion, unidad } del cierre en lugar de los puntos (A5).
// vida: { total, fin }: la partida termina al perder la última vida, con el texto fin (A11). decimales: los puntos
// se muestran siempre con esos decimales (A15).
const partida = ({ juego, dia, fuente, rondas, niveles, nota, etiqueta = 'Pregunta', porGrupo, resultado, vida: conVida, decimales }, contenedor) => {
  const puntos = [];
  const hechas = [];
  const vida = conVida && barraVida(conVida);
  let cortada;
  const formato = decimales ? n => n.toLocaleString('es-ES', { minimumFractionDigits: decimales, maximumFractionDigits: decimales }) : numero;
  const cab = marcador(juego, porGrupo, ...(vida ? [vida.nodo] : []));
  const inicio = rondas.map((_, i) => rondas.slice(0, i).reduce((s, r) => s + casillas(r), 0));
  const total = rondas.reduce((s, r) => s + maximo(r), 0);
  if (rondas.some(r => tipos[r.tipo].maximo)) cab.sobre(total);
  const estados = () => rondas.flatMap((r, i) => i < puntos.length ? (hechas[i].estado !== undefined ? [hechas[i].estado] : [puntos[i]].flat().map(estado)) : Array(casillas(r)).fill(''));
  const suma = () => puntos.flat().reduce((s, p) => s + p, 0);
  const recibo = () => {
    if (hechas.every(h => h.recibo)) return hechas.map(h => h.recibo).join('\n');
    const marcas = puntos.flat().map(p => p === 1 ? '🟨' : '⬜');
    const tramo = porGrupo ?? marcas.length;
    return Array.from({ length: Math.ceil(marcas.length / tramo) }, (_, t) => marcas.slice(t * tramo, (t + 1) * tramo).join('')).join('\n');
  };

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: formato(suma()),
    total,
    ...resultado?.(),
    nivel: niveles?.find(({ desde, hasta }) => suma() >= desde && suma() <= hasta).etiqueta,
    cuadricula: [recibo(), ...(vida ? [cortada ? `${vida.fin} en el ${etiqueta.toLowerCase()} ${cortada}` : `Vida: ${vida.quedan()}/${vida.total}`] : [])].join('\n'),
    fuente,
    pista: { estados: estados(), porGrupo },
    ...(hechas.every(h => h.medida !== undefined) ? { medida: hechas.map(h => h.medida).join(';') } : {}),
    detalle: [
      ...(vida ? [Object.assign(vida.nodo.cloneNode(true), { className: 'vida quieta' })] : []),
      ...(hechas.some(h => h.fila) ? [el('table', { className: 'rondas-cierre' }, el('tbody', {}, ...hechas.map(h => h.fila)))] : []),
      ...(nota ? [el('div', { className: 'explicacion' }, el('p', { className: 'etiqueta', textContent: 'Cómo se ha contado' }), el('p', { textContent: nota }))] : []),
    ],
  }, contenedor);

  const ronda = n => {
    const boton = accion('Responder');
    boton.disabled = true;
    const tipo = tipos[rondas[n].tipo];
    const rotulo = rondas[n].rotulo ?? `${etiqueta} ${n + 1} de ${rondas.length}`;
    const anuncio = voz();
    const { cuerpo, barra = [], resolver, pulsa } = tipo(rondas[n], (ok, texto) => {
      boton.disabled = !ok;
      if (texto) boton.textContent = texto;
    }, rotulo);

    boton.onclick = () => {
      if (pulsa && !pulsa()) return;
      const r = resolver();
      const hecha = r.puntos === undefined ? { puntos: r } : r;
      const p = hecha.puntos;
      puntos.push(p);
      hechas.push(hecha);
      if (vida && p === 0) vida.quita();
      cab.pinta(estados(), [inicio[n]], suma(), formato);
      anuncio.textContent = `${etiqueta} ${n + 1}: ${formato([p].flat().reduce((s, x) => s + x, 0))} de ${maximo(rondas[n])} punto${maximo(rondas[n]) === 1 ? '' : 's'}.`;
      if (vida?.quedan() === 0) {
        cortada = n + 1;
        const aviso = el('div', { className: 'fin-vida' }, el('p', { textContent: vida.fin }),
          el('p', { className: 'etiqueta', textContent: `Te quedaste sin vida en el ${etiqueta.toLowerCase()} ${cortada} de ${rondas.length}.` }));
        contenedor.querySelector('.cuerpo').append(aviso);
        muestra(aviso);
      }
      const ultima = n === rondas.length - 1 || cortada;
      boton.textContent = ultima ? 'Ver resultado' : `Siguiente ${etiqueta.toLowerCase()}`;
      boton.onclick = trasPausa(() => ultima ? final() : ronda(n + 1));
    };

    const nodos = [
      cab.nodo,
      ...(tipo.rotulo ? [] : [el('p', { className: 'etiqueta', textContent: rotulo })]),
      ...cuerpo,
      anuncio,
    ];
    monta(contenedor, tipo.fija ? [el('div', { className: 'fija' }, ...nodos.splice(0, nodos.indexOf(cuerpo[0]) + 1)), ...nodos] : nodos, ...barra, boton);
    cab.pinta(estados(), [inicio[n]], suma(), formato);
    scrollTo(0, 0);
    enfoca(contenedor);
  };

  ronda(0);
};

export const iniciar = (config, contenedor) => portada(config, contenedor, () => partida(config, contenedor));
