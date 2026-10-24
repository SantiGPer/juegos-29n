import { cerrar } from '../cierre.js';
import { icono } from '../iconos.js';
import { portada } from '../portada.js';
import { accion, baraja, el, monta } from '../util.js';

// M8 afinidad (maqueta v15): el jugador ordena temas y se compara su orden con el perfil de cada partido
// (proporción de medidas por tema) mediante la correlación de Spearman. Juego de opinión: sin pista ni puntos.
// partidos: { siglas, de («del PP»), color (token), perfil: { tema: proporción } }.

// Rangos de 1 a n de mayor a menor, con el rango medio en los empates
const rangos = valores => valores.map(v => {
  const mayores = valores.filter(x => x > v).length;
  const iguales = valores.filter(x => x === v).length;
  return mayores + (iguales + 1) / 2;
});

const pearson = (a, b) => {
  const media = x => x.reduce((s, v) => s + v, 0) / x.length;
  const [ma, mb] = [media(a), media(b)];
  const cov = a.reduce((s, v, i) => s + (v - ma) * (b[i] - mb), 0);
  return cov / Math.sqrt(a.reduce((s, v) => s + (v - ma) ** 2, 0) * b.reduce((s, v) => s + (v - mb) ** 2, 0));
};

const spearman = (orden, perfil) => pearson(orden.map((_, i) => i + 1), rangos(orden.map(t => perfil[t])));

const dos = r => r.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('-', '−');

// Tinta o papel sobre el color del partido, el que más contraste dé (decisión del 15-10)
const luminancia = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
  .map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
const textoSobre = token => {
  const l = luminancia(getComputedStyle(document.documentElement).getPropertyValue(token).trim());
  return (l + 0.05) / 0.05 >= 1.05 / (l + 0.05) ? 'var(--tinta)' : 'var(--papel)';
};

// «del PP» → «del»; «de Vox» → «de»
const articulo = p => p.de.replace(p.siglas, '').trim();
const lista = textos => textos.length > 1 ? `${textos.slice(0, -1).join(', ')} y ${textos.at(-1)}` : textos[0];

const partida = ({ juego, dia, fuente, pregunta, extremos, temas, partidos }, contenedor) => {
  const orden = baraja(temas);
  const ol = el('ol', { className: 'orden numerada' });

  const mover = (i, paso) => {
    const b = el('button', {
      className: 'mover',
      ariaLabel: `${paso < 0 ? 'Subir' : 'Bajar'}: ${orden[i]}`,
      disabled: i + paso < 0 || i + paso >= orden.length,
    });
    b.innerHTML = icono(paso < 0 ? 'subir' : 'bajar', 4);
    b.onclick = () => {
      [orden[i], orden[i + paso]] = [orden[i + paso], orden[i]];
      pinta(i + paso);
      const [subir, bajar] = ol.children[i + paso].querySelectorAll('button');
      const mismo = paso < 0 ? subir : bajar;
      (mismo.disabled ? (paso < 0 ? bajar : subir) : mismo).focus();
    };
    return b;
  };

  const pinta = movida => {
    ol.replaceChildren(...orden.map((t, i) => el('li', { className: i === movida ? 'movida' : '' },
      el('span', { className: 'n', textContent: i + 1 }), el('span', { textContent: t }), mover(i, -1), mover(i, 1))));
    if (movida !== undefined) setTimeout(() => ol.children[movida]?.classList.remove('movida'), 400);
  };
  pinta();

  const final = () => {
    // De mayor a menor ρ con dos decimales; los empatados, en orden alfabético
    const ordenadas = partidos.map(p => ({ ...p, rho: spearman(orden, p.perfil) }))
      .sort((a, b) => Math.round(b.rho * 100) - Math.round(a.rho * 100) || a.siglas.localeCompare(b.siglas, 'es'));
    const ganadores = ordenadas.filter(p => dos(p.rho) === dos(ordenadas[0].rho));
    const parecido = ganadores.length > 1
      ? `se parece por igual ${lista(ganadores.map(p => `a la ${p.de}`))}`
      : `se parece a la ${ganadores[0].de}`;
    const suyo = [...temas].sort((a, b) => ganadores[0].perfil[b] - ganadores[0].perfil[a]);

    const columna = (titulo, propio, otro) => el('div', {}, el('p', { className: 'etiqueta', textContent: titulo }),
      el('ol', {}, ...propio.map((t, i) => el('li', { className: otro[i] === t ? 'igual' : '', textContent: t }))));

    cerrar({
      juego,
      dia,
      sinCifra: true,
      puntuacion: `Mi agenda ${parecido} (${dos(ganadores[0].rho)})`,
      cuadricula: `Mis tres primeros: ${orden.slice(0, 3).join(', ')}`,
      fuente,
      resumen: [
        el('p', { className: 'titular-afinidad', textContent: ganadores.length > 1 ? `Tu agenda ${parecido}` : `Tu agenda se parece a la ${articulo(ganadores[0])}…` }),
        ...ganadores.map(p => el('p', {}, el('span', { className: 'banda-partido', textContent: p.siglas, style: `background: var(${p.color}); color: ${textoSobre(p.color)}` }))),
        el('p', { className: 'etiqueta', textContent: 'Mide qué temas pesan más en cada programa, no qué propone cada partido sobre ellos.' }),
      ],
      detalle: [
        el('ul', { className: 'afinidad' }, ...ordenadas.map(p => el('li', {},
          el('b', {}, el('i', { className: 'muestra-partido', style: `background: var(${p.color})` }), p.siglas),
          el('span', { className: 'eje-afinidad', ariaHidden: 'true' }, el('span', {
            style: `background: var(${p.color}); ${p.rho >= 0 ? 'left' : 'right'}: 50%; width: ${Math.abs(p.rho) * 50}%`,
          })),
          el('span', { className: 'rho', textContent: dos(p.rho) })))),
        el('div', { className: 'escala-afinidad', ariaHidden: 'true' }, el('span'), el('div', {}, ...['−1', '0', '1'].map(t => el('span', { textContent: t }))), el('span')),
        el('p', { className: 'leer-afinidad', textContent: '1: el mismo orden que el tuyo. 0: ninguna relación. −1: el orden contrario.' }),
        el('div', { className: 'comparacion' }, columna('Tu orden', orden, suyo), columna(ganadores[0].siglas, suyo, orden)),
      ],
    }, contenedor);
  };

  const [arriba, abajo] = extremos;
  monta(contenedor, [
    el('header', { className: 'cab' }, el('h1', { className: 'nombre', textContent: juego })),
    el('p', { className: 'pregunta-afinidad', textContent: pregunta }),
    el('p', { className: 'etiqueta extremo', textContent: arriba }),
    ol,
    el('p', { className: 'etiqueta extremo', textContent: abajo }),
  ], accion('Ver mi afinidad', final));
  scrollTo(0, 0);
};

export const iniciar = (config, contenedor) => portada(config, contenedor, () => partida(config, contenedor));
