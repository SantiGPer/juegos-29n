import { baraja, cifra, el, muestra } from '../util.js';

const escala = texto => texto.length > 5 ? 2 : 3;

const dato = (lado, visible) => {
  const texto = visible ? lado.cifra : '?';
  return el('span', { className: 'dato' },
    cifra(texto, escala(texto)),
    el('span', { className: 'oculto', textContent: visible ? lado.cifra : 'Por descubrir' }));
};

const tono = color => el('i', { className: 'muestra', style: `background: var(${color})` });

// Diez segmentos por lado, en espejo desde el centro (maqueta v13)
const energia = lado => el('div', { className: `energia-lado ${lado}` }, ...Array.from({ length: 10 }, (_, i) => {
  const s = el('i');
  s.style.animationDuration = `${(i + 1) * 40}ms`;
  return s;
}));

// Duelo con «VS» (maqueta v13): dos fichas enfrentadas que son a la vez los botones de elección, con barras de
// energía que se llenan en proporción al dato al resolver. Gana el lado con más valor. Los lados no se barajan:
// un cara a cara se lee en el orden del contenido, salvo con barajar (lados nominales, A11). La muestra de color va
// junto a la afiliación (contexto) o, si la ficha es un partido (partido: true), junto al nombre.
export const ronda = ({ pregunta, unidad, lados: enOrden, barajar, explicacion, fuente }, listo) => {
  const lados = barajar ? baraja(enOrden) : enOrden;
  const ganador = lados[0].valor > lados[1].valor ? lados[0] : lados[1];
  let elegida;

  const barras = [energia('izq'), energia('der')];
  const fichas = lados.map((lado, k) => {
    const cifraLado = dato(lado, false);
    const conMuestra = lado.color ? [tono(lado.color)] : [];
    const boton = el('button', { className: `opcion lado${k ? ' der' : ''}`, ariaPressed: 'false' },
      el('span', { className: 'hito' }, ...(lado.partido ? conMuestra : []), lado.nombre),
      el('span', { className: 'etiqueta' }, ...(lado.partido ? [] : conMuestra), lado.contexto),
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

  const vs = el('span', { className: 'vs', ariaHidden: 'true' }, cifra('VS', 2));
  const ring = el('div', { className: 'ring entra' },
    el('div', { className: 'energia' }, ...barras),
    el('div', { className: 'opciones dos duelo' }, ...fichas.map(f => f.boton), vs));

  const pie = el('div');

  const resolver = () => {
    fichas.forEach(({ lado, boton, cifraLado }, k) => {
      boton.disabled = true;
      boton.removeAttribute('aria-pressed');
      boton.classList.remove('seleccionada');
      boton.classList.toggle('correcta', lado === ganador);
      boton.classList.toggle('fallada', lado.id === elegida && lado !== ganador);
      cifraLado.replaceWith(dato(lado, true));
      const llenos = Math.round(10 * lado.valor / ganador.valor);
      [...barras[k].children].forEach((s, i) => s.classList.toggle('on', i < llenos));
      barras[k].classList.add('llena');
    });
    pie.append(el('div', { className: 'explicacion' },
      el('p', { textContent: explicacion }),
      el('p', { className: 'fuente', textContent: `Fuente: ${fuente}` })));
    muestra(pie);
    return elegida === ganador.id ? 1 : 0;
  };

  return {
    cuerpo: [
      el('p', { className: 'pregunta', textContent: pregunta }),
      ...(unidad ? [el('p', { className: 'etiqueta', textContent: unidad })] : []),
      ring,
      pie,
    ],
    resolver,
  };
};
