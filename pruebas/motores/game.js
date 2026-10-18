// Página de prueba del encadenador, M2 y el duelo, sin enlace en el índice. Cifras reales de
// data/plenopedia_xv.json; las preguntas y explicaciones son de prueba, no contenido de Plenopedia.
import { iniciar } from '../../shared/motores/rondas.js';

const fuente = 'Diario de Sesiones del Congreso, Pleno, XV legislatura';

iniciar({
  juego: 'Prueba de motores',
  fuente,
  portada: {
    texto: 'Página de prueba del encadenador de rondas: opción múltiple, ordenar, estimación y duelo.',
    reglas: [{ icono: 'papeleta', texto: 'Cuatro preguntas de mecánicas distintas.' }, { icono: 'urna', texto: 'Un punto por pregunta; medio punto si te quedas cerca.' }],
  },
  rondas: [
    {
      tipo: 'opciones',
      pregunta: '¿Qué diputado pronunció más palabras en el Pleno?',
      opciones: { a: 'Néstor Rego (BNG)', b: 'Idoia Sagastizabal (PNV)', c: 'Alberto Núñez Feijóo (PP)', d: 'Gabriel Rufián (ERC)' },
      correcta: 'a',
      explicacion: 'Prueba. Rego 203.982 palabras; Sagastizabal 145.571; Feijóo 128.034; Rufián 91.871.',
      fuente,
    },
    {
      tipo: 'ordenar',
      pregunta: 'Ordena las palabras de más a menos repetidas en el Pleno.',
      extremos: ['Más veces', 'Menos veces'],
      items: [
        { texto: 'España', valor: 20126, cifra: '20.126' },
        { texto: 'vivienda', valor: 10239, cifra: '10.239' },
        { texto: 'Cataluña', valor: 6635, cifra: '6.635' },
        { texto: 'corrupción', valor: 4733, cifra: '4.733' },
        { texto: 'ETA', valor: 859, cifra: '859' },
      ],
      explicacion: 'Prueba. Menciones en castellano en toda la XV.',
      fuente,
    },
    {
      tipo: 'estimacion',
      pregunta: '¿Cuánto duró la sesión más larga de la legislatura?',
      min: 4, max: 16, paso: 0.25, unidad: 'horas', formato: 'horas',
      valor: 12.35,
      tramos: [{ hasta: 0.5, puntos: 1 }, { hasta: 1.5, puntos: 0.5 }],
      explicacion: 'Prueba. DS 135, 10-09-2025: de las 9.00 a las 21.21.',
      fuente,
    },
    {
      tipo: 'duelo',
      pregunta: '¿Quién hizo reír más veces al Pleno?',
      unidad: 'Risas anotadas en el Diario durante sus intervenciones',
      lados: [
        { id: 'sanchez', nombre: 'Sánchez', contexto: 'Gobierno', valor: 266, cifra: '266' },
        { id: 'feijoo', nombre: 'Feijóo', contexto: 'PP', valor: 228, cifra: '228', color: '--pp' },
      ],
      explicacion: 'Prueba. Sánchez 266 risas; Feijóo 228.',
      fuente,
    },
  ],
}, document.querySelector('main'));
