const fecha = () =>
  new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '-');

export function cerrar({ juego, puntuacion, total, nivel, cuadricula, fuente }, contenedor) {
  const texto = [juego, fecha(), `${puntuacion}/${total}`, cuadricula, location.origin + location.pathname]
    .filter(Boolean)
    .join('\n');

  contenedor.innerHTML = `
    <h1>${juego}</h1>
    <p class="cifra"><span class="marca">${puntuacion}</span> de ${total}</p>
    ${nivel ? `<p>${nivel}</p>` : ''}
    <p class="recibo"></p>
    <p><button class="accion">Copiar resultado</button></p>
    <p class="fuente">Fuente: ${fuente}</p>
    <p><a href="../../">Más juegos de la serie</a></p>`;

  contenedor.querySelector('.recibo').textContent = texto;

  const boton = contenedor.querySelector('button');
  boton.onclick = () => navigator.clipboard.writeText(texto).then(() => { boton.textContent = 'Resultado copiado'; });
}
