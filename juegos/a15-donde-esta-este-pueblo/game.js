import { iniciar } from '../../shared/motores/rondas.js';

const carga = ruta => fetch(ruta).then(r => r.json());
const [config, geometria, { municipios }] = await Promise.all([carga('data.json'), carga('../../data/mapa_provincias.json'), carga('../../data/municipios_a15.json')]);
config.rondas.forEach(r => Object.assign(r, { geometria, municipio: municipios.find(m => m.ine === r.ine) }));

iniciar(config, document.querySelector('main'));
