import { iniciar } from '../../shared/motores/afinidad.js';

iniciar(await fetch('data.json').then(r => r.json()), document.querySelector('main'));
