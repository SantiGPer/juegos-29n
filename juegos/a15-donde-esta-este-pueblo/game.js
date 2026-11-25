import { iniciar } from '../../shared/motores/rondas.js';

const carga = ruta => fetch(ruta).then(r => r.json());
const [config, geometria, { municipios }] = await Promise.all([carga('data.json'), carga('../../data/mapa_provincias.json'), carga('../../data/municipios_a15.json')]);

// Escala común de las barras (diseño del 09-11): el mayor porcentaje de las seis fichas, a la decena superior
const escala = Math.ceil(Math.max(...municipios.flatMap(m => [...m.nacionales, ...m.resto].map(c => c.pct))) / 10) * 10;
config.rondas.forEach(r => Object.assign(r, { geometria, escala, municipio: municipios.find(m => m.ine === r.ine) }));

iniciar(config, document.querySelector('main'));
