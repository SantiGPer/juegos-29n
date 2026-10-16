// Iconos de píxeles de docs/maquetas/maqueta-arcade-v2.html. Solo en tinta, lápiz o raya; nunca como adorno.
const matrices = {
  papeleta: ['XXXXXXXX..', 'X......XX.', 'X......X.X', 'X.XXXX.XXX', 'X........X', 'X.XXXXXX.X', 'X........X', 'X.XXXX...X', 'X........X', 'XXXXXXXXXX'],
  nula: ['XXXXXXXXXX', 'X........X', 'X.X....X.X', 'X..X..X..X', 'X...XX...X', 'X...XX...X', 'X..X..X..X', 'X.X....X.X', 'X........X', 'XXXXXXXXXX'],
  subir: ['..X..', '.XXX.', 'XXXXX'],
  bajar: ['XXXXX', '.XXX.', '..X..'],
};

export const icono = (nombre, escala, color = 'currentColor') => {
  const m = matrices[nombre];
  const pixeles = m.flatMap((fila, y) => [...fila].map((v, x) => v === 'X' ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : ''));
  return `<svg width="${m[0].length * escala}" height="${m.length * escala}" viewBox="0 0 ${m[0].length} ${m.length}" fill="${color}" shape-rendering="crispEdges" aria-hidden="true">${pixeles.join('')}</svg>`;
};
