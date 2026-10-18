import { cifra, el, muestra } from '../util.js';

const dato = (lado, visible) => el('span', { className: 'dato' },
  cifra(visible ? lado.cifra : '?', 3),
  el('span', { className: 'oculto', textContent: visible ? lado.cifra : 'Por descubrir' }));

// Duelo: dos fichas enfrentadas que son a la vez los botones de elección. Gana el lado con más valor.
// Los lados no se barajan: un cara a cara se lee en el orden del contenido.
export const ronda = ({ pregunta, unidad, lados, explicacion, fuente }, listo) => {
  const ganador = lados[0].valor > lados[1].valor ? lados[0].id : lados[1].id;
  let elegida;

  const fichas = lados.map(lado => {
    const cifraLado = dato(lado, false);
    const boton = el('button', { className: 'opcion lado', ariaPressed: 'false' },
      el('span', { className: 'hito' }, ...(lado.color ? [el('span', { className: 'muestra-partido', style: `background: var(${lado.color})` })] : []), lado.nombre),
      el('span', { className: 'etiqueta', textContent: lado.contexto }),
      cifraLado);
    boton.onclick = () => {
      elegida = lado.id;
      fichas.forEach(f => {
        f.boton.classList.toggle('seleccionada', f.boton === boton);
        f.boton.ariaPressed = String(f.boton === boton);
      });
      listo(true);
    };
    return { lado, boton, cifraLado };
  });

  const pie = el('div');

  const resolver = () => {
    fichas.forEach(({ lado, boton, cifraLado }) => {
      boton.disabled = true;
      boton.removeAttribute('aria-pressed');
      boton.classList.remove('seleccionada');
      boton.classList.toggle('correcta', lado.id === ganador);
      boton.classList.toggle('fallada', lado.id === elegida && elegida !== ganador);
      cifraLado.replaceWith(dato(lado, true));
    });
    pie.append(el('div', { className: 'explicacion' },
      el('p', { textContent: explicacion }),
      el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
    muestra(pie);
    return elegida === ganador ? 1 : 0;
  };

  return {
    cuerpo: [
      el('p', { className: 'pregunta', textContent: pregunta }),
      ...(unidad ? [el('p', { className: 'etiqueta', textContent: unidad })] : []),
      el('div', { className: 'opciones dos duelo' }, ...fichas.map(f => f.boton)),
      pie,
    ],
    resolver,
  };
};
