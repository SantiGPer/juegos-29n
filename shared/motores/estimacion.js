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

// Ronda para el encadenador (rondas.js; A8 es un encadenado solo de estimaciones): puntos por tramos de error absoluto, de menor a mayor
export const ronda = (datos, listo) => {
  const { pregunta, min, max, paso, valor, explicacion, fuente, tramos } = datos;
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

  deslizador.oninput = () => {
    elegido = Number(deslizador.value);
    deslizador.ariaValueText = texto(elegido, datos);
    cifraVista.replaceChildren(grande(elegido, datos));
    tu.style.width = pct(elegido);
    listo(true);
  };

  const resolver = () => {
    const error = Math.abs(elegido - valor);
    deslizador.disabled = true;
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
      cifraVista,
      deslizador,
      el('div', { className: 'eje' }, el('span', { textContent: texto(min, datos) }), el('span', { textContent: texto(max, datos) })),
      regla,
      pie,
    ],
    resolver,
  };
};

