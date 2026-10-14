const fecha = () =>
  new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '-');

export function cerrar({ juego, puntuacion, total, nivel, cuadricula, fuente }, contenedor) {
  const texto = [juego, fecha(), `${puntuacion}/${total}`, cuadricula, location.origin + location.pathname]
    .filter(Boolean)
    .join('\n');

  contenedor.innerHTML = `
    <h1></h1>
    <p class="cifra"><span class="marca">${puntuacion}</span> de ${total}</p>
    <p class="nivel"></p>
    <p class="recibo"></p>
    <p><button class="accion">Copiar resultado</button></p>
    <p class="fuente"></p>
    <p><a href="../../">Más juegos de la serie</a></p>`;

  const pinta = (selector, valor) => { contenedor.querySelector(selector).textContent = valor; };
  pinta('h1', juego);
  pinta('.nivel', nivel ?? '');
  pinta('.recibo', texto);
  pinta('.fuente', `Fuente: ${fuente}`);

  const boton = contenedor.querySelector('button');
  boton.onclick = () => Promise.resolve()
    .then(() => navigator.clipboard.writeText(texto))
    .then(() => { boton.textContent = 'Resultado copiado'; })
    .catch(() => { boton.textContent = 'Selecciona y copia el texto'; });
}
