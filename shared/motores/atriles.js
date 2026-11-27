import { el, muestra } from '../util.js';

// Atril en rejilla 22 × 36 (maqueta v28): tablero, cuerpo y pie en lápiz, banda y placa en el color del partido y
// micrófono en tinta inclinado hacia el centro del plató (inclina 1, a la derecha; -1, a la izquierda).
const dibujo = (color, inclina) => {
  const d = inclina > 0;
  const piezas = [[1, 13, 20, 2, '--lapiz', 'tablero'], [2, 15, 18, 1, '--raya'], [3, 16, 16, 2, '--lapiz'], [4, 18, 14, 16, '--lapiz'],
    [4, 18, 14, 2, color], [4, 22, 14, 8, color], [3, 34, 16, 2, '--lapiz'], [1, 36, 20, 2, '--lapiz'],
    [d ? 11 : 10, 10, 1, 3, '--tinta'], [d ? 11 : 8, 9, 3, 1, '--tinta'], [d ? 13 : 7, 6, 2, 3, '--tinta']];
  return `<svg viewBox="0 5 22 34" shape-rendering="crispEdges" aria-hidden="true">${piezas.map(([x, y, w, h, c, cls]) =>
    `<rect${cls ? ` class="${cls}"` : ''} x="${x}" y="${y}" width="${w}" height="${h}" fill="var(${c})"/>`).join('')}</svg>`;
};

// Ronda de atriles (B1, decisión del 27-11): cuatro candidatos fijos en el orden del plató, nunca barajados. La
// respuesta es un apellido; al resolver, el marcador rodea el atril correcto, el elegido y fallado queda tachado y
// una línea da la cifra de cada uno, la correcta en negrita. El candidato con cifra «—» no cuenta: atenuado y
// sin pulsar, y fuera de la línea.
export const ronda = ({ pregunta, nota, candidatos, correcta, cifras, explicacion }, listo) => {
  let elegido;
  const atriles = candidatos.map(({ apellido, color }, i) => {
    const b = el('button', { className: 'atril', ariaPressed: 'false', disabled: cifras[i] === '—' });
    b.innerHTML = dibujo(color, i < candidatos.length / 2 ? 1 : -1);
    b.append(el('span', { className: 'apellido', textContent: apellido }));
    b.classList.toggle('fuera', b.disabled);
    b.onclick = () => {
      elegido = apellido;
      atriles.forEach(a => {
        a.classList.toggle('sel', a === b);
        a.ariaPressed = String(a === b);
      });
      listo(true);
    };
    return b;
  });

  const pie = el('div');
  const resolver = () => {
    const acierto = elegido === correcta;
    atriles.forEach((a, i) => {
      const apellido = candidatos[i].apellido;
      a.disabled = true;
      a.removeAttribute('aria-pressed');
      a.classList.remove('sel');
      a.classList.toggle('correcta', apellido === correcta);
      a.classList.toggle('fallada', !acierto && apellido === elegido);
    });
    const linea = candidatos.flatMap(({ apellido }, i) => cifras[i] === '—' ? [] : [`${apellido} ${cifras[i]}`]);
    const cifrasNodo = el('p', { className: 'cifras-atril' });
    linea.forEach((t, i) => cifrasNodo.append(...(i ? [', '] : []), t.startsWith(`${correcta} `) ? el('b', { textContent: t }) : t));
    cifrasNodo.append('.');
    pie.append(el('div', { className: 'explicacion' },
      cifrasNodo,
      el('p', {}, el('b', { textContent: acierto ? 'Correcto.' : `Era ${correcta}.` }), ` ${explicacion}`)));
    muestra(pie);
    return acierto ? 1 : 0;
  };

  return {
    cuerpo: [
      el('p', { className: 'pregunta', textContent: pregunta }),
      el('p', { className: 'etiqueta subtitulo', textContent: nota }),
      el('div', { className: 'plato' }, ...atriles),
      pie,
    ],
    resolver,
  };
};
