import { iniciar } from '../../shared/motores/rondas.js';

iniciar(await fetch('data.json').then(r => r.json()), document.querySelector('main'));
