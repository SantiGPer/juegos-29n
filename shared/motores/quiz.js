import { cerrar } from '../cierre.js';

const baraja = lista => lista.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x);

const el = (tag, props = {}, ...hijos) => {
  const nodo = Object.assign(document.createElement(tag), props);
  nodo.append(...hijos);
  return nodo;
};

export function iniciar({ juego, fuente, preguntas, niveles }, contenedor) {
  const resultados = [];

  const estado = i => i >= resultados.length ? '' : resultados[i] ? ' acierto' : ' fallo';
  const progreso = () => el('div', { className: 'progreso', ariaHidden: 'true' },
    ...preguntas.map((_, i) => el('span', { className: `casilla${estado(i)}` })));

  const final = () => {
    const aciertos = resultados.filter(Boolean).length;
    cerrar({
      juego,
      puntuacion: aciertos,
      total: preguntas.length,
      nivel: niveles.find(({ desde, hasta }) => aciertos >= desde && aciertos <= hasta).etiqueta,
      cuadricula: resultados.map(r => r ? '🟨' : '⬜').join(''),
      fuente,
    }, contenedor);
  };

  const pregunta = n => {
    const p = preguntas[n];
    let elegida;
    let casillas = progreso();
    const responder = el('button', { className: 'accion', textContent: 'Responder', disabled: true });
    const pie = el('div', {}, el('p', {}, responder));

    const botones = baraja(Object.entries(p.opciones)).map(([letra, texto]) => {
      const boton = el('button', { className: 'opcion', textContent: texto });
      boton.dataset.letra = letra;
      boton.onclick = () => {
        botones.forEach(b => b.classList.toggle('seleccionada', b === boton));
        elegida = letra;
        responder.disabled = false;
      };
      return boton;
    });

    responder.onclick = () => {
      const acierto = elegida === p.correcta;
      resultados.push(acierto);
      botones.forEach(b => {
        b.disabled = true;
        b.classList.remove('seleccionada');
        b.classList.toggle('correcta', b.dataset.letra === p.correcta);
        b.classList.toggle('fallada', !acierto && b.dataset.letra === elegida);
      });
      const nuevas = progreso();
      casillas.replaceWith(nuevas);
      casillas = nuevas;

      const ultima = n === preguntas.length - 1;
      const siguiente = el('button', { className: 'accion', textContent: ultima ? 'Ver resultado' : 'Siguiente pregunta' });
      siguiente.onclick = () => ultima ? final() : pregunta(n + 1);
      pie.replaceChildren(
        el('div', { className: 'explicacion' },
          el('p', { textContent: p.explicacion }),
          el('p', { className: 'fuente', textContent: `Fuente: ${p.fuente}` })),
        el('p', {}, siguiente));
      siguiente.focus();
    };

    contenedor.replaceChildren(
      el('h1', { textContent: juego }),
      casillas,
      el('p', { className: 'etiqueta', textContent: `${n + 1} de ${preguntas.length}` }),
      el('p', { textContent: p.pregunta }),
      el('div', { className: 'opciones' }, ...botones),
      pie);
    scrollTo(0, 0);
  };

  pregunta(0);
}
