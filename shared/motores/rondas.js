import { cerrar } from '../cierre.js';
import { icono } from '../iconos.js';
import { portada } from '../portada.js';
import { accion, baraja, celda, el, marcador, monta, muestra, numero } from '../util.js';
import { ordenOpciones } from './quiz.js';
import { ronda as duelo } from './duelo.js';
import { ronda as emparejar } from './emparejar.js';
import { ronda as estimacion } from './estimacion.js';

// Encadenador de rondas de mecánicas distintas: una cabecera, una pista, una puntuación y un cierre.
// Cada tipo de ronda es ronda(datos, listo, rotulo) → { cuerpo, barra?, resolver }: listo(bool, texto?) enciende
// el botón y puede cambiar su texto; barra va en la barra fija, sobre el botón; resolver() revela la solución y
// devuelve 0, ½ o 1. Un tipo con casillas(datos) ocupa varias celdas de la pista y su resolver devuelve un
// punto por celda; uno con rotulo pone él mismo el «Ronda N de M». Una ronda puede traer su rotulo («Duelo»).

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
  const orden = baraja(correcto);
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

const tipos = { opciones, ordenar, duelo, estimacion, emparejar };

const estado = p => p === 1 ? 'acierto' : p > 0 ? 'media' : 'fallo';
const casillas = r => tipos[r.tipo].casillas?.(r) ?? 1;

// nota: nota metodológica, bajo la puntuación del cierre. etiqueta: «Pregunta» o «Ronda». porGrupo: celdas por
// tramo de la pista y por línea del recibo.
const partida = ({ juego, dia, fuente, rondas, niveles, nota, etiqueta = 'Pregunta', porGrupo }, contenedor) => {
  const puntos = [];
  const cab = marcador(juego, porGrupo);
  const inicio = rondas.map((_, i) => rondas.slice(0, i).reduce((s, r) => s + casillas(r), 0));
  const total = rondas.reduce((s, r) => s + casillas(r), 0);
  const estados = () => rondas.flatMap((r, i) => i < puntos.length ? [puntos[i]].flat().map(estado) : Array(casillas(r)).fill(''));
  const suma = () => puntos.flat().reduce((s, p) => s + p, 0);
  const recibo = () => {
    const marcas = puntos.flat().map(p => p === 1 ? '🟨' : '⬜');
    const tramo = porGrupo ?? marcas.length;
    return Array.from({ length: Math.ceil(marcas.length / tramo) }, (_, t) => marcas.slice(t * tramo, (t + 1) * tramo).join('')).join('\n');
  };

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: numero(suma()),
    total,
    nivel: niveles?.find(({ desde, hasta }) => suma() >= desde && suma() <= hasta).etiqueta,
    cuadricula: recibo(),
    fuente,
    pista: { estados: estados(), porGrupo },
    detalle: nota ? [el('div', { className: 'explicacion' }, el('p', { className: 'etiqueta', textContent: 'Cómo se ha contado' }), el('p', { textContent: nota }))] : [],
  }, contenedor);

  const ronda = n => {
    const boton = accion('Responder');
    boton.disabled = true;
    const tipo = tipos[rondas[n].tipo];
    const rotulo = rondas[n].rotulo ?? `${etiqueta} ${n + 1} de ${rondas.length}`;
    const { cuerpo, barra = [], resolver } = tipo(rondas[n], (ok, texto) => {
      boton.disabled = !ok;
      if (texto) boton.textContent = texto;
    }, rotulo);

    boton.onclick = () => {
      puntos.push(resolver());
      cab.pinta(estados(), [inicio[n]], suma());
      const ultima = n === rondas.length - 1;
      boton.textContent = ultima ? 'Ver resultado' : `Siguiente ${etiqueta.toLowerCase()}`;
      boton.onclick = () => ultima ? final() : ronda(n + 1);
    };

    monta(contenedor, [
      cab.nodo,
      ...(tipo.rotulo ? [] : [el('p', { className: 'etiqueta', textContent: rotulo })]),
      ...cuerpo,
    ], ...barra, boton);
    cab.pinta(estados(), [inicio[n]], suma());
    scrollTo(0, 0);
  };

  ronda(0);
};

export const iniciar = (config, contenedor) => portada(config, contenedor, () => partida(config, contenedor));
