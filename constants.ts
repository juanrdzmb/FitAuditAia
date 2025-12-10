import { Question } from './types.ts';

export const QUESTIONS: Question[] = [
  {
    id: 'objective',
    text: '¿Cuál es el principal objetivo de tu entrenamiento?',
    options: [
      { label: 'Hipertrofia (Ganar Músculo)', value: 'Hipertrofia' },
      { label: 'Fuerza Máxima', value: 'Fuerza' },
      { label: 'Resistencia', value: 'Resistencia' },
      { label: 'Funcional / Atlético', value: 'Funcional' },
      { label: 'HIIT / Pérdida de Grasa', value: 'HIIT' },
    ],
  },
  {
    id: 'splitType',
    text: '¿Cómo está distribuido tu entrenamiento?',
    options: [
      { label: 'Cuerpo Completo (Full Body)', value: 'Cuerpo completo' },
      { label: 'Torso / Pierna', value: 'Torso/Pierna' },
      { label: 'Empuje / Tracción / Pierna (PPL)', value: 'Empuje/Tracción/Pierna' },
      { label: 'Aislado / Bro Split', value: 'Aislado' },
    ],
  },
  {
    id: 'experience',
    text: '¿Cuál es tu nivel de experiencia?',
    options: [
      { label: 'Principiante (0-12 meses)', value: 'Principiante' },
      { label: 'Intermedio (1-3 años)', value: 'Intermedio' },
      { label: 'Avanzado (>3 años)', value: 'Avanzado' },
    ],
  },
  {
    id: 'weeklySets',
    text: '¿Cuántas series por grupo muscular realizas semanalmente?',
    options: [
      { label: 'Bajo Volumen (3-9 series)', value: '3-9 series' },
      { label: 'Volumen Medio (10-20 series)', value: '10-20 series' },
      { label: 'Alto Volumen (>20 series)', value: 'más de 20 series' },
    ],
  },
  {
    id: 'restTime',
    text: '¿Cuánto descansas entre series?',
    options: [
      { label: 'Cortos (<1 min)', value: 'Cortos (<1 min)' },
      { label: 'Moderados (1-3 min)', value: 'Moderados (1-3 min)' },
      { label: 'Largos (3-5 min)', value: 'Largos (3-5 min)' },
    ],
  },
  {
    id: 'exerciseType',
    text: '¿Qué tipo de ejercicios predominan?',
    options: [
      { label: 'Multiarticulares (Compuestos)', value: 'Multiarticulares' },
      { label: 'Monoarticulares (Aislamiento)', value: 'Monoarticulares' },
      { label: 'Equilibrado / Ambos', value: 'Ambos' },
    ],
  },
  {
    id: 'progression',
    text: '¿Cómo aplicas la sobrecarga progresiva?',
    options: [
      { label: 'Subiendo Peso', value: 'Aumento de peso' },
      { label: 'Más Repeticiones', value: 'Mayor número de repeticiones' },
      { label: 'Variando Ángulos/Técnica', value: 'Variación de ángulos y rangos de movimiento' },
      { label: 'No aplico progresión consciente', value: 'Ninguna' },
    ],
  },
  {
    id: 'balance',
    text: '¿Sientes que trabajas músculos opuestos por igual (Ej: Pecho vs Espalda)?',
    options: [
      { label: 'Sí, está equilibrado', value: 'Sí' },
      { label: 'No, priorizo lo que veo en el espejo', value: 'No' },
    ],
  },
  {
    id: 'junkVolumeFeeling',
    text: '¿Sientes que pierdes el "pump" o rendimiento al final de la sesión?',
    options: [
      { label: 'Sí, termino agotado sin congestión', value: 'Sí' },
      { label: 'No, mantengo la intensidad', value: 'No' },
    ],
  },
  {
    id: 'functionalHiit',
    text: '¿Incluyes ejercicios funcionales o HIIT?',
    options: [
      { label: 'Sí', value: 'Sí' },
      { label: 'No', value: 'No' },
    ],
  },
];