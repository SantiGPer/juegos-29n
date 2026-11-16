import { iniciar } from '../../shared/motores/quiz.js';

iniciar(await fetch('data.json').then(r => r.json()), document.querySelector('main'));
