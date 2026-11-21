import { iniciar } from '../../shared/motores/rondas.js';

// Los datos de cada ronda salen de actividad_parlamentaria.json por su métrica; columnas y eje, del data.json
const [config, { legislaturas }] = await Promise.all(['data.json', '../../data/actividad_parlamentaria.json'].map(f => fetch(f).then(r => r.json())));
const rondas = config.rondas.map(r => ({ ...r, columnas: config.columnas, valores: config.columnas.map(c => legislaturas.find(l => l.legislatura === c.nombre)[r.metrica]) }));
iniciar({ ...config, rondas }, document.querySelector('main'));
