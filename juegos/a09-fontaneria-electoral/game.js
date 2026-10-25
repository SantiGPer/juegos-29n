import { iniciar } from '../../shared/motores/rondas.js';

const carga = ruta => fetch(ruta).then(r => r.json());
const [config, { real, configuraciones }] = await Promise.all([carga('data.json'), carga('../../data/fontaneria_a09.json')]);
config.rondas.forEach(r => Object.assign(r, { real, escanos: configuraciones.find(c => c.id === r.id).escanos, candidaturas: config.candidaturas }));

iniciar(config, document.querySelector('main'));
