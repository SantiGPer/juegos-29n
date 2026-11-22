import { iniciar } from '../../shared/motores/rondas.js';
import { resultado } from '../../shared/motores/hemiciclo.js';

const config = await fetch('data.json').then(r => r.json());
config.resultado = () => resultado(config.rondas);

iniciar(config, document.querySelector('main'));
