import { iniciar } from '../../shared/motores/rondas.js';

const [config, { dias }] = await Promise.all(['data.json', '../../data/calendario.json'].map(f => fetch(f).then(r => r.json())));
iniciar({
  ...config,
  debate: dias.find(d => d.dia === config.dia).debate,
  rondas: config.rondas.map(r => ({ ...r, candidatos: config.candidatos })),
}, document.querySelector('main'));
