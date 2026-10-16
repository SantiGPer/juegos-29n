import { iniciar } from '../../shared/motores/agrupar.js';

iniciar(await fetch('data.json').then(r => r.json()), document.querySelector('main'));
