import { cerrar } from '../cierre.js';
import { portada } from '../portada.js';
import { accion, cifra, el, marcador, monta, muestra } from '../util.js';

const rellena = (plantilla, datos) => plantilla.replace(/\{(\w+)\}/g, (_, k) => datos[k]);

const muestraColor = color => el('span', { className: 'muestra-partido', style: `background: var(${color})` });

// Sin cifra, el ítem está por descubrir
const ficha = (item, visible) => el('div', {},
  el('p', { className: 'hito', textContent: item.nombre }),
  el('p', { className: 'etiqueta', textContent: item.periodo }),
  el('p', { className: 'dato' },
    cifra(visible ? item.cifra : '?', 3),
    el('span', { className: 'oculto', textContent: visible ? item.cifra : 'Por descubrir' })));

// Ranking final de mayor a menor, con barra en tinta y contexto de cada ítem
const ranking = items => {
  const maximo = Math.max(...items.map(i => i.valor));
  return el('ol', { className: 'ranking' }, ...[...items].sort((x, y) => y.valor - x.valor).map(i =>
    el('li', {},
      el('p', { className: 'ranking-fila' }, el('span', { textContent: i.nombre }), el('span', { textContent: i.cifra })),
      el('span', { className: 'trazo', style: `width: ${i.valor / maximo * 100}%` }),
      el('p', { className: 'etiqueta' }, ...(i.color ? [muestraColor(i.color)] : []), i.contexto))));
};

// Cadena «¿más o menos que el anterior?»: cada ítem se compara con el que le precede
const cadena = ({ juego, dia, fuente, pregunta, unidad, siguiente, items, nota }, contenedor) => {
  const resultados = [];
  const total = items.length - 1;
  const cab = marcador(juego);
  const estados = () => Array.from({ length: total }, (_, i) => i >= resultados.length ? '' : resultados[i] ? 'acierto' : 'fallo');
  const aciertos = () => resultados.filter(Boolean).length;

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: aciertos(),
    total,
    cuadricula: resultados.map(r => r ? '🟨' : '⬜').join(''),
    fuente,
    pista: { estados: estados() },
    detalle: [el('p', { className: 'etiqueta ranking-titulo', textContent: unidad }), ranking(items), ...(nota ? [el('p', { className: 'fuente', textContent: nota })] : [])],
  }, contenedor);

  const ronda = n => {
    const [a, b] = [items[n], items[n + 1]];
    const real = b.valor > a.valor ? 'mas' : 'menos';
    let elegida;
    const boton = accion('Responder');
    boton.disabled = true;
    const descubrir = ficha(b, false);
    const pie = el('div');

    // Opciones ordinales: de mayor a menor, sin barajar
    const botones = [['mas', 'Más'], ['menos', 'Menos']].map(([id, texto]) => {
      const opcion = el('button', { className: 'opcion', textContent: texto });
      opcion.dataset.id = id;
      opcion.onclick = () => {
        botones.forEach(o => o.classList.toggle('seleccionada', o === opcion));
        elegida = id;
        boton.disabled = false;
      };
      return opcion;
    });

    boton.onclick = () => {
      const acierto = elegida === real;
      resultados.push(acierto);
      botones.forEach(o => {
        o.disabled = true;
        o.classList.remove('seleccionada');
        o.classList.toggle('correcta', o.dataset.id === real);
        o.classList.toggle('fallada', !acierto && o.dataset.id === elegida);
      });
      descubrir.replaceWith(ficha(b, true));
      cab.pinta(estados(), [n], aciertos());

      const ultima = n === total - 1;
      boton.textContent = ultima ? 'Ver resultado' : siguiente;
      boton.onclick = () => ultima ? final() : ronda(n + 1);
      pie.append(el('div', { className: 'explicacion' }, el('p', { textContent: b.explicacion })));
      muestra(pie);
    };

    monta(contenedor, [
      cab.nodo,
      el('p', { className: 'etiqueta', textContent: `Decisión ${n + 1} de ${total}` }),
      el('p', { className: 'pregunta', textContent: rellena(pregunta, { a: a.id, b: b.nombre }) }),
      el('div', { className: 'pareja' }, ficha(a, true), descubrir),
      el('div', { className: 'opciones dos' }, ...botones),
      pie,
    ], boton);
    cab.pinta(estados(), [n], aciertos());
    scrollTo(0, 0);
  };

  ronda(0);
};

const variantes = { cadena };

export const iniciar = (config, contenedor) =>
  portada(config, contenedor, () => variantes[config.variante ?? 'cadena'](config, contenedor));
