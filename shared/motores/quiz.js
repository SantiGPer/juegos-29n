import { cerrar } from '../cierre.js';
import { icono } from '../iconos.js';
import { portada } from '../portada.js';
import { accion, baraja, celda, el, marcador, monta, muestra, numero } from '../util.js';

const fechaEs = iso => iso.split('-').reverse().join('-');
const enLineas = (lista, n) => lista.map((x, i) => (i && i % n === 0 ? '\n' : '') + x).join('');

const explicacion = (...parrafos) => el('div', { className: 'explicacion' }, ...parrafos);

const opciones = ({ juego, dia, fuente, preguntas, niveles }, contenedor) => {
  const resultados = [];
  const cab = marcador(juego);
  const estados = () => preguntas.map((_, i) => i >= resultados.length ? '' : resultados[i] ? 'acierto' : 'fallo');
  const aciertos = () => resultados.filter(Boolean).length;

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: aciertos(),
    total: preguntas.length,
    nivel: niveles.find(({ desde, hasta }) => aciertos() >= desde && aciertos() <= hasta).etiqueta,
    cuadricula: resultados.map(r => r ? '🟨' : '⬜').join(''),
    fuente,
    pista: { estados: estados() },
  }, contenedor);

  const pregunta = n => {
    const p = preguntas[n];
    let elegida;
    const boton = accion('Responder');
    boton.disabled = true;
    const pie = el('div');

    const botones = baraja(Object.entries(p.opciones)).map(([letra, texto]) => {
      const opcion = el('button', { className: 'opcion', textContent: texto });
      opcion.dataset.letra = letra;
      opcion.onclick = () => {
        botones.forEach(b => b.classList.toggle('seleccionada', b === opcion));
        elegida = letra;
        boton.disabled = false;
      };
      return opcion;
    });

    boton.onclick = () => {
      const acierto = elegida === p.correcta;
      resultados.push(acierto);
      botones.forEach(b => {
        b.disabled = true;
        b.classList.remove('seleccionada');
        b.classList.toggle('correcta', b.dataset.letra === p.correcta);
        b.classList.toggle('fallada', !acierto && b.dataset.letra === elegida);
      });
      cab.pinta(estados(), [n], aciertos());

      const ultima = n === preguntas.length - 1;
      boton.textContent = ultima ? 'Ver resultado' : 'Siguiente pregunta';
      boton.onclick = () => ultima ? final() : pregunta(n + 1);
      pie.append(explicacion(
        el('p', { textContent: p.explicacion }),
        el('p', { className: 'fuente', textContent: `Fuente: ${p.fuente}` })));
      muestra(pie);
    };

    monta(contenedor, [
      cab.nodo,
      el('p', { className: 'pregunta', textContent: p.pregunta }),
      el('div', { className: 'opciones' }, ...botones),
      pie,
    ], boton);
    cab.pinta(estados(), [n], aciertos());
    scrollTo(0, 0);
  };

  pregunta(0);
};

// Rondas de hitos que se ordenan del más antiguo al más reciente.
// Por hito: 1 punto en su posición exacta, ½ a una posición, 0 en otro caso.
const ordenar = ({ juego, dia, fuente, instruccion, rondas }, contenedor) => {
  const puntos = [];
  const porRonda = rondas[0].hitos.length;
  const total = rondas.reduce((s, r) => s + r.hitos.length, 0);
  const cab = marcador(juego, porRonda);
  const estado = p => p === 1 ? 'acierto' : p === 0.5 ? 'media' : '';
  const estados = () => Array.from({ length: total }, (_, i) => estado(puntos[i]));
  const suma = () => puntos.reduce((s, p) => s + p, 0);

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: numero(suma()),
    total,
    cuadricula: enLineas(puntos.map(p => p === 1 ? '🟨' : '⬜'), porRonda),
    fuente,
    pista: { estados: estados(), porGrupo: porRonda },
  }, contenedor);

  const ronda = n => {
    const correcto = [...rondas[n].hitos].sort((a, b) => a.fecha.localeCompare(b.fecha));
    const orden = baraja(correcto);
    const enCurso = Array.from({ length: porRonda }, (_, k) => n * porRonda + k);
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

    const boton = accion('Comprobar orden', () => {
      const valor = h => [1, 0.5][Math.abs(orden.indexOf(h) - correcto.indexOf(h))] ?? 0;
      puntos.push(...correcto.map(valor));
      cab.pinta(estados(), enCurso, suma());

      const resuelta = el('ol', { className: 'orden resuelta' }, ...correcto.map(h => {
        const casilla = celda(estado(valor(h)));
        casilla.ariaLabel = `${numero(valor(h))} puntos`;
        return el('li', {},
          casilla,
          el('div', {},
            el('p', { className: 'etiqueta', textContent: fechaEs(h.fecha) }),
            el('p', { className: 'hito', textContent: h.texto }),
            el('p', { textContent: h.explicacion }),
            el('p', { className: 'fuente', textContent: `Fuente: ${h.fuente}` })));
      }));
      lista.replaceWith(resuelta);

      const ultima = n === rondas.length - 1;
      boton.textContent = ultima ? 'Ver resultado' : 'Siguiente ronda';
      boton.onclick = () => ultima ? final() : ronda(n + 1);
      boton.focus();
    });

    monta(contenedor, [
      cab.nodo,
      el('p', { className: 'etiqueta', textContent: `Ronda ${n + 1} de ${rondas.length}` }),
      el('p', { className: 'pregunta', textContent: instruccion }),
      lista,
    ], boton);
    cab.pinta(estados(), enCurso, suma());
    scrollTo(0, 0);
  };

  ronda(0);
};

// Un ítem al azar entre todos; cada fallo revela la pista siguiente.
// Puntos: tantos como pistas quedaban por ver al acertar, incluida la que lo resolvió.
const pistas = ({ juego, dia, fuente, items }, contenedor) => {
  const item = items[Math.floor(Math.random() * items.length)];
  const n = item.pistas.length;
  const fallos = [];
  let acierto = false;
  const cab = marcador(juego);
  const terminada = () => acierto || fallos.length === n;
  const estados = () => item.pistas.map((_, i) => i < fallos.length ? 'fallo' : acierto ? 'acierto' : '');
  const suma = () => acierto ? n - fallos.length : 0;

  const final = () => cerrar({
    juego,
    dia,
    puntuacion: suma(),
    total: n,
    cuadricula: estados().map(e => e === 'acierto' ? '🟨' : '⬜').join(''),
    fuente,
    pista: { estados: estados() },
  }, contenedor);

  const pinta = () => {
    const vistas = terminada() ? n : fallos.length + 1;
    let elegida;
    const boton = terminada() ? accion('Ver resultado', final) : accion('Responder');
    boton.disabled = !terminada();

    const botones = items.map(({ id, opcion }) => {
      const b = el('button', { className: 'opcion', textContent: opcion, disabled: terminada() || fallos.includes(id) });
      b.classList.toggle('fallada', fallos.includes(id));
      b.classList.toggle('correcta', terminada() && id === item.id);
      b.onclick = () => {
        botones.forEach(o => o.classList.toggle('seleccionada', o === b));
        elegida = id;
        boton.disabled = false;
      };
      return b;
    });

    if (!terminada()) boton.onclick = () => {
      if (elegida === item.id) acierto = true;
      else fallos.push(elegida);
      pinta();
      if (terminada()) muestra(contenedor.querySelector('.explicacion'));
      contenedor.querySelector(terminada() ? '.accion' : '.opcion:not(:disabled)').focus({ preventScroll: terminada() });
    };

    monta(contenedor, [
      cab.nodo,
      el('p', { className: 'etiqueta', textContent: terminada() ? 'Fin de la partida' : `Pista ${vistas} de ${n}` }),
      el('ol', { className: 'pistas' }, ...item.pistas.slice(0, vistas).map((texto, i) =>
        el('li', {}, ...(i === n - 1 && item.color ? [el('span', { className: 'muestra-partido', style: `background: var(${item.color})` })] : []), texto))),
      el('div', { className: 'opciones' }, ...botones),
      ...(terminada()
        ? [explicacion(
          el('p', { className: 'hito', textContent: item.nombre }),
          ...(item.nota ? [el('p', { textContent: item.nota })] : []),
          el('p', { className: 'fuente', textContent: `Fuente: ${item.fuente}` }))]
        : []),
    ], boton);
    cab.pinta(estados(), terminada() ? [] : [fallos.length], suma());
  };

  pinta();
};

const variantes = { opciones, ordenar, pistas };

export const iniciar = (config, contenedor) =>
  portada(config, contenedor, () => variantes[config.variante ?? 'opciones'](config, contenedor));
