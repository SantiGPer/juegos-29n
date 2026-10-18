import { iniciar } from '../../shared/motores/masomenos.js';

const [llamadas, presidencias] = await Promise.all(
  ['llamadas_al_orden', 'legislaturas'].map(f => fetch(`../../data/${f}.json`).then(r => r.json())));

const decimal = n => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const anio = iso => iso?.slice(0, 4);

const items = llamadas.legislaturas.map(({ legislatura, sesiones_plenarias, llamadas }) => {
  const p = presidencias.legislaturas.find(l => l.legislatura === legislatura);
  return {
    id: legislatura,
    nombre: `${legislatura} legislatura`,
    periodo: p.fin ? `${anio(p.inicio)}–${anio(p.fin)}` : `Desde ${anio(p.inicio)}`,
    valor: llamadas / sesiones_plenarias * 100,
    cifra: decimal(llamadas / sesiones_plenarias * 100),
    explicacion: `${legislatura} legislatura: ${llamadas} llamadas al orden en ${sesiones_plenarias} sesiones plenarias. Presidía el Congreso ${p.presidencia} (${p.partido}).`,
    contexto: `${p.presidencia} (${p.partido}). ${llamadas} llamadas en ${sesiones_plenarias} sesiones.`,
    color: `--${p.partido.toLowerCase()}`,
  };
});

iniciar({
  juego: 'Crispómetro',
  variante: 'cadena',
  fuente: `${llamadas.fuente}; presidencias: ${presidencias.fuente}`,
  pregunta: '¿La {b} tuvo más o menos llamadas al orden por cada 100 sesiones plenarias que la {a}?',
  unidad: 'Llamadas al orden por cada 100 sesiones plenarias',
  siguiente: 'Siguiente legislatura',
  nota: 'TODO nota metodológica (fórmula, avisos descontados, XI y XIII fuera por no tener investidura)',
  portada: {
    texto: 'TODO texto de portada',
    reglas: [{ icono: 'papeleta', texto: 'TODO regla' }, { icono: 'urna', texto: 'TODO regla' }],
  },
  items,
}, document.querySelector('main'));
