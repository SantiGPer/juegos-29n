import { iniciar } from '../../shared/motores/quiz.js';

const [juego, { fuente, presidentes }] = await Promise.all(
  ['data.json', '../../data/presidentes.json'].map(url => fetch(url).then(r => r.json())));

iniciar({
  ...juego,
  variante: 'pistas',
  fuente,
  otra: 'Otro presidente',
  items: presidentes.map(p => ({ ...p, color: `--${p.partido}` })),
}, document.querySelector('main'));
