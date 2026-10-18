import { iniciar } from '../../shared/motores/quiz.js';

const { fuente, presidentes } = await fetch('../../data/presidentes.json').then(r => r.json());

iniciar({
  juego: 'Presidentle',
  variante: 'pistas',
  fuente,
  otra: 'Otro presidente',
  portada: {
    texto: 'Uno de los siete presidentes del Gobierno de la democracia y cinco pistas para dar con él. Cuanto antes aciertes, más puntos.',
    reglas: [
      { icono: 'papeleta', texto: '5 pistas, de la más vaga a la más clara, con los siete nombres siempre a la vista.' },
      { icono: 'urna', texto: '5 puntos con la primera pista, 1 con la última y 0 si se acaban.' },
    ],
  },
  items: presidentes.map(p => ({ ...p, color: `--${p.partido}` })),
}, document.querySelector('main'));
