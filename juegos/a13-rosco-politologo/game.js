import { iniciar } from '../../shared/motores/rosco.js';

iniciar(await fetch('data.json').then(r => r.json()), document.querySelector('main'));
