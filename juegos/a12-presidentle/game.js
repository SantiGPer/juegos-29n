import { iniciar } from '../../shared/motores/quiz.js';

const { fuente, presidentes } = await fetch('../../data/presidentes.json').then(r => r.json());

iniciar({
  juego: 'Presidentle',
  variante: 'pistas',
  fuente,
  otra: 'Otro presidente',
  portada: {
    texto: 'TODO texto de portada',
    reglas: [{ icono: 'papeleta', texto: 'TODO regla' }, { icono: 'urna', texto: 'TODO regla' }],
  },
  items: presidentes.map(p => ({ ...p, color: `--${p.partido}` })),
}, document.querySelector('main'));
