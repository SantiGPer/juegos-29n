import { cerrar } from '../cierre.js';
import { icono } from '../iconos.js';
import { baraja, el, casillas } from '../util.js';

const fechaEs = iso => iso.split('-').reverse().join('-');
const enLineas = (lista, n) => lista.map((x, i) => (i && i % n === 0 ? '\n' : '') + x).join('');

const opciones = ({ juego, fuente, preguntas, niveles }, contenedor) => {
  const resultados = [];
  const progreso = () => casillas(preguntas.map((_, i) => i >= resultados.length ? '' : resultados[i] ? 'acierto' : 'fallo'));

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
    let pista = progreso();
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
      const nueva = progreso();
      pista.replaceWith(nueva);
      pista = nueva;

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
      pista,
      el('p', { className: 'etiqueta', textContent: `${n + 1} de ${preguntas.length}` }),
      el('p', { textContent: p.pregunta }),
      el('div', { className: 'opciones' }, ...botones),
      pie);
    scrollTo(0, 0);
  };

  pregunta(0);
};

// Rondas de hitos que se ordenan del más antiguo al más reciente.
// Por hito: 1 punto en su posición exacta, ½ a una posición, 0 en otro caso.
const ordenar = ({ juego, fuente, instruccion, rondas }, contenedor) => {
  const puntos = [];
  const total = rondas.reduce((s, r) => s + r.hitos.length, 0);
  const estado = p => p === 1 ? 'acierto' : p === 0.5 ? 'media' : '';
  const progreso = () => casillas(Array.from({ length: total }, (_, i) => estado(puntos[i])), rondas[0].hitos.length);

  const final = () => {
    const suma = puntos.reduce((s, p) => s + p, 0);
    cerrar({
      juego,
      puntuacion: suma.toLocaleString('es-ES'),
      total,
      cuadricula: enLineas(puntos.map(p => p === 1 ? '🟨' : '⬜'), rondas[0].hitos.length),
      fuente,
    }, contenedor);
  };

  const ronda = n => {
    const correcto = [...rondas[n].hitos].sort((a, b) => a.fecha.localeCompare(b.fecha));
    const orden = baraja(correcto);
    const lista = el('ol', { className: 'orden' });

    const mover = (i, paso) => {
      const boton = el('button', {
        className: 'mover',
        ariaLabel: `${paso < 0 ? 'Subir' : 'Bajar'}: ${orden[i].texto}`,
        disabled: i + paso < 0 || i + paso >= orden.length,
      });
      boton.innerHTML = icono(paso < 0 ? 'subir' : 'bajar', 4);
      boton.onclick = () => {
        [orden[i], orden[i + paso]] = [orden[i + paso], orden[i]];
        pinta(i + paso);
        const [subir, bajar] = lista.children[i + paso].querySelectorAll('button');
        const mismo = paso < 0 ? subir : bajar;
        (mismo.disabled ? (paso < 0 ? bajar : subir) : mismo).focus();
      };
      return boton;
    };

    const pinta = movida => {
      lista.replaceChildren(...orden.map((h, i) =>
        el('li', { className: i === movida ? 'movida' : '' }, el('span', { textContent: h.texto }), mover(i, -1), mover(i, 1))));
      if (movida !== undefined) setTimeout(() => lista.children[movida]?.classList.remove('movida'), 400);
    };
    pinta();

    const comprobar = el('button', { className: 'accion', textContent: 'Comprobar orden' });
    const pie = el('div', {}, el('p', {}, comprobar));
    let pista = progreso();

    comprobar.onclick = () => {
      const valor = h => [1, 0.5][Math.abs(orden.indexOf(h) - correcto.indexOf(h))] ?? 0;
      puntos.push(...correcto.map(valor));
      const nueva = progreso();
      pista.replaceWith(nueva);
      pista = nueva;

      lista.replaceWith(el('ol', { className: 'orden resuelta' }, ...correcto.map(h =>
        el('li', {},
          el('span', { className: `casilla ${estado(valor(h))}`, ariaLabel: `${valor(h).toLocaleString('es-ES')} puntos` }),
          el('div', {},
            el('p', { className: 'etiqueta', textContent: fechaEs(h.fecha) }),
            el('p', { className: 'hito', textContent: h.texto }),
            el('p', { textContent: h.explicacion }),
            el('p', { className: 'fuente', textContent: `Fuente: ${h.fuente}` }))))));

      const ultima = n === rondas.length - 1;
      const siguiente = el('button', { className: 'accion', textContent: ultima ? 'Ver resultado' : 'Siguiente ronda' });
      siguiente.onclick = () => ultima ? final() : ronda(n + 1);
      pie.replaceChildren(el('p', {}, siguiente));
      siguiente.focus();
    };

    contenedor.replaceChildren(
      el('h1', { textContent: juego }),
      pista,
      el('p', { className: 'etiqueta', textContent: `Ronda ${n + 1} de ${rondas.length}` }),
      el('p', { textContent: instruccion }),
      lista,
      pie);
    scrollTo(0, 0);
  };

  ronda(0);
};

// Un ítem al azar entre todos; cada fallo revela la pista siguiente.
// Puntos: tantos como pistas quedaban por ver al acertar, incluida la que lo resolvió.
const pistas = ({ juego, fuente, items }, contenedor) => {
  const item = items[Math.floor(Math.random() * items.length)];
  const n = item.pistas.length;
  const fallos = [];
  let acierto = false;
  const terminada = () => acierto || fallos.length === n;
  const estados = () => item.pistas.map((_, i) => i < fallos.length ? 'fallo' : acierto ? 'acierto' : '');

  const final = () => cerrar({
    juego,
    puntuacion: acierto ? n - fallos.length : 0,
    total: n,
    cuadricula: estados().map(e => e === 'acierto' ? '🟨' : '⬜').join(''),
    fuente,
  }, contenedor);

  const pinta = () => {
    const vistas = terminada() ? n : fallos.length + 1;
    let elegida;
    const responder = el('button', { className: 'accion', textContent: 'Responder', disabled: true });

    const botones = items.map(({ id, opcion }) => {
      const boton = el('button', { className: 'opcion', textContent: opcion, disabled: terminada() || fallos.includes(id) });
      boton.classList.toggle('fallada', fallos.includes(id));
      boton.classList.toggle('correcta', terminada() && id === item.id);
      boton.onclick = () => {
        botones.forEach(b => b.classList.toggle('seleccionada', b === boton));
        elegida = id;
        responder.disabled = false;
      };
      return boton;
    });

    responder.onclick = () => {
      if (elegida === item.id) acierto = true;
      else fallos.push(elegida);
      pinta();
      contenedor.querySelector(terminada() ? '.accion' : '.opcion:not(:disabled)').focus();
    };

    const siguiente = el('button', { className: 'accion', textContent: 'Ver resultado' });
    siguiente.onclick = final;

    contenedor.replaceChildren(
      el('h1', { textContent: juego }),
      casillas(estados()),
      el('p', { className: 'etiqueta', textContent: terminada() ? 'Fin de la partida' : `Pista ${vistas} de ${n}` }),
      el('ol', { className: 'pistas' }, ...item.pistas.slice(0, vistas).map((texto, i) =>
        el('li', {}, ...(i === n - 1 && item.color ? [el('span', { className: 'muestra-partido', style: `background: var(${item.color})` })] : []), texto))),
      el('div', { className: 'opciones' }, ...botones),
      terminada()
        ? el('div', {},
          el('div', { className: 'explicacion' },
            el('p', { className: 'hito', textContent: item.nombre }),
            ...(item.nota ? [el('p', { textContent: item.nota })] : []),
            el('p', { className: 'fuente', textContent: `Fuente: ${item.fuente}` })),
          el('p', {}, siguiente))
        : el('p', {}, responder));
  };

  pinta();
};

const variantes = { opciones, ordenar, pistas };

export const iniciar = (config, contenedor) => variantes[config.variante ?? 'opciones'](config, contenedor);
