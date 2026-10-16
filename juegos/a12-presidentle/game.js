import { iniciar } from '../../shared/motores/quiz.js';

const { fuente, presidentes } = await fetch('../../data/presidentes.json').then(r => r.json());

iniciar({
  juego: 'Presidentle',
  variante: 'pistas',
  fuente,
  items: presidentes.map(p => ({ ...p, color: `--${p.partido}` })),
}, document.querySelector('main'));
