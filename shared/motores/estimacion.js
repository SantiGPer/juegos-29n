import { cifra, el, muestra } from '../util.js';

// Cifra sin separador de miles: las cifras de casillas no tienen punto
const sinMiles = v => v.toLocaleString('es-ES', { useGrouping: false, maximumFractionDigits: 2 });

// formato 'horas': valor decimal en horas → «12 h 21 min»
const partes = (v, { formato, unidad }) => {
  if (formato !== 'horas') return [[sinMiles(v), unidad]];
  const min = Math.round(v * 60);
  const hm = [[String(Math.floor(min / 60)), 'h'], [String(min % 60), 'min']].filter(([n]) => n !== '0');
  return hm.length ? hm : [['0', 'min']];
};

const texto = (v, datos) => partes(v, datos).map(([n, u]) => `${n} ${u}`).join(' ');

const grande = (v, datos) => el('p', { className: 'estimacion-cifra' },
  ...partes(v, datos).flatMap(([n, u]) => [cifra(n, 4), el('span', { textContent: ` ${u} ` })]),
  el('span', { className: 'oculto', textContent: texto(v, datos) }));

const pendiente = () => el('p', { className: 'estimacion-cifra' }, cifra('?', 4), el('span', { className: 'oculto', textContent: 'Sin elegir' }));

const largo = (v, datos) => texto(v, datos).replace(/\bh\b/, 'horas').replace(/\bmin\b/, 'minutos');

// Ronda para el encadenador (rondas.js; A8 es un encadenado solo de estimaciones): puntos por tramos de error absoluto, de menor a mayor.
// Deslizador de píxel (maqueta v9): − y + mueven un paso; `marca`, una marca bajo la línea cada tantas unidades.
export const ronda = (datos, listo) => {
  const { pregunta, min, max, paso, marca, valor, explicacion, fuente, tramos } = datos;
  const pct = v => `${(v - min) / (max - min) * 100}%`;
  let elegido;

  const deslizador = el('input', { type: 'range', min, max, step: paso, value: (min + max) / 2, className: 'deslizador' });
  deslizador.ariaLabel = pregunta;
  const cifraVista = el('div', {}, pendiente());
  const tu = el('span', { className: 'regla-tu trama' });
  const real = el('span', { className: 'regla-real', hidden: true });
  const hueco = el('span', { className: 'regla-hueco', hidden: true });
  const regla = el('div', { className: 'regla' }, hueco, tu, real);
  const pie = el('div');

  const mueve = () => {
    elegido = Number(deslizador.value);
    deslizador.ariaValueText = texto(elegido, datos);
    cifraVista.replaceChildren(grande(elegido, datos));
    tu.style.width = pct(elegido);
    listo(true);
  };
  deslizador.oninput = mueve;

  const pasoBoton = (signo, verbo) => el('button', {
    className: 'paso',
    textContent: signo < 0 ? '−' : '+',
    ariaLabel: `${verbo} ${largo(paso, datos)}`,
    onclick: () => {
      signo < 0 ? deslizador.stepDown() : deslizador.stepUp();
      mueve();
    },
  });
  const botones = [pasoBoton(-1, 'Quitar'), pasoBoton(1, 'Añadir')];

  const marcas = el('div', { className: 'marcas', ariaHidden: 'true' },
    ...(marca ? Array.from({ length: Math.floor((max - min) / marca) + 1 }, (_, i) => el('i', { style: `left: ${pct(min + i * marca)}` })) : []));

  const resolver = () => {
    const error = Math.abs(elegido - valor);
    deslizador.disabled = true;
    botones.forEach(b => { b.disabled = true; });
    real.style.width = pct(valor);
    hueco.style.left = pct(Math.min(elegido, valor));
    hueco.style.width = `calc(${pct(Math.max(elegido, valor))} - ${pct(Math.min(elegido, valor))})`;
    real.hidden = hueco.hidden = false;
    pie.append(el('div', { className: 'explicacion' },
      el('p', { className: 'hito', textContent: error === 0 ? 'Has clavado el dato.' : `Te quedaste a ${texto(error, datos)}.` }),
      el('p', { textContent: `Dijiste ${texto(elegido, datos)}; el dato es ${texto(valor, datos)}.` }),
      el('p', { textContent: explicacion }),
      el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
    muestra(pie);
    return tramos.find(t => error <= t.hasta)?.puntos ?? 0;
  };

  return {
    cuerpo: [
      el('p', { className: 'pregunta', textContent: pregunta }),
      el('div', { className: 'estimacion-valor' }, botones[0], cifraVista, botones[1]),
      deslizador,
      marcas,
      el('div', { className: 'eje' }, ...[min, (min + max) / 2, max].map(v => el('span', { textContent: texto(v, datos) }))),
      regla,
      pie,
    ],
    resolver,
  };
};

