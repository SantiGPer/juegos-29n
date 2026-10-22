import { iniciar } from '../../shared/motores/rondas.js';

const carga = ruta => fetch(ruta).then(r => r.json());
const [config, geometria, { mapas }] = await Promise.all([carga('data.json'), carga('../../data/mapa_provincias.json'), carga('../../data/mapas_a07.json')]);
config.rondas.forEach(r => Object.assign(r, { geometria, valores: mapas[r.mapa] }));

iniciar(config, document.querySelector('main'));
