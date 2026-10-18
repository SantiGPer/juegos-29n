// Iconos de píxeles de docs/maquetas/maqueta-arcade-v2.html. Solo en tinta, lápiz o raya; nunca como adorno.
const matrices = {
  papeleta: ['XXXXXXXX..', 'X......XX.', 'X......X.X', 'X.XXXX.XXX', 'X........X', 'X.XXXXXX.X', 'X........X', 'X.XXXX...X', 'X........X', 'XXXXXXXXXX'],
  // Vidas (maqueta v7, variante A): corazón lleno, medio vacío al perderse y contorno
  lleno: ['.XX...XX.', 'XXXX.XXXX', 'XXXXXXXXX', 'XXXXXXXXX', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....'],
  mitad: ['.XX...XX.', 'X..X.XXXX', 'X...XXXXX', 'X....XXXX', '.X...XXX.', '..X..XX..', '...X.X...', '....X....'],
  vacio: ['.XX...XX.', 'X..X.X..X', 'X...X...X', 'X.......X', '.X.....X.', '..X...X..', '...X.X...', '....X....'],
  urna: ['..XXXXXX..', '..X....X..', '..X.XX.X..', 'XXXXXXXXXX', 'X........X', 'X.XXXXXX.X', 'X........X', 'X........X', 'X........X', 'XXXXXXXXXX'],
  candado: ['...XXXX...', '..X....X..', '..X....X..', '..X....X..', '.XXXXXXXX.', '.X......X.', '.X..XX..X.', '.X..XX..X.', '.X......X.', '.XXXXXXXX.'],
  tic: ['.......', '......X', '.....X.', 'X...X..', '.X.X...', '..X....', '.......'],
  aspa: ['.......', '.X...X.', '..X.X..', '...X...', '..X.X..', '.X...X.', '.......'],
  subir: ['..X..', '.XXX.', 'XXXXX'],
  bajar: ['XXXXX', '.XXX.', '..X..'],
};

export const icono = (nombre, escala, color = 'currentColor') => {
  const m = matrices[nombre];
  const pixeles = m.flatMap((fila, y) => [...fila].map((v, x) => v === 'X' ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : ''));
  return `<svg width="${m[0].length * escala}" height="${m.length * escala}" viewBox="0 0 ${m[0].length} ${m.length}" fill="${color}" shape-rendering="crispEdges" aria-hidden="true">${pixeles.join('')}</svg>`;
};
