import type { StepDefinition } from '../types/documents';

export type ReelsMode = 'short' | 'advanced';

export interface ReelsModeDefinition {
  mode: ReelsMode;
  title: string;
  description: string;
  estimatedMinutes: number;
  steps: StepDefinition[];
}

const objectiveOptions = [
  { label: 'Atraccion', value: 'attraction' },
  { label: 'Autoridad', value: 'authority' },
  { label: 'Conversion', value: 'conversion' },
];

const angleOptions = [
  { label: 'Dolor emocional', value: 'pain_emotional' },
  { label: 'Problema externo', value: 'external_problem' },
  { label: 'Sintoma cotidiano', value: 'daily_symptom' },
  { label: 'Creencia erronea / mito', value: 'false_belief' },
  { label: 'Costo de no actuar', value: 'cost_of_inaction' },
  { label: 'Deseo / transformacion', value: 'desire_transformation' },
  { label: 'Identidad / estatus', value: 'identity_status' },
  { label: 'Framework / metodo', value: 'framework_method' },
  { label: 'Autoridad por criterio', value: 'authority_criteria' },
  { label: 'Checklist / diagnostico', value: 'checklist' },
  { label: 'Principio / ley simple', value: 'principle' },
  { label: 'Error comun', value: 'common_error' },
  { label: 'Intento fallido', value: 'failed_attempt' },
  { label: 'Enemigo / villano', value: 'enemy' },
  { label: 'Objecion', value: 'objection' },
  { label: 'Comparacion', value: 'comparison' },
  { label: 'Controversia', value: 'controversy' },
  { label: 'Pregunta incomoda', value: 'uncomfortable_question' },
  { label: 'Storytelling', value: 'storytelling' },
  { label: 'Prueba social', value: 'social_proof' },
  { label: 'Transformacion', value: 'transformation' },
  { label: 'Detras de camaras', value: 'behind_the_scenes' },
  { label: 'Tendencia / reaccion', value: 'trend' },
  { label: 'Top / ranking', value: 'ranking' },
  { label: 'Hack / atajo real', value: 'hack' },
];

const formatOptions = [
  { label: 'Carrusel', value: 'carousel' },
  { label: 'Talk & walk', value: 'talk_and_walk' },
  { label: 'POV', value: 'pov' },
  { label: 'Selfie', value: 'selfie' },
  { label: 'Vlog', value: 'vlog' },
  { label: 'Entrevista', value: 'interview' },
  { label: 'Mockup podcast', value: 'mockup_podcast' },
  { label: 'Responder sticker', value: 'sticker_reply' },
  { label: 'Pantalla verde', value: 'green_screen' },
  { label: 'Microfono en mano', value: 'mic_in_hand' },
  { label: 'Mixed media', value: 'mixed_media' },
  { label: 'Talking head', value: 'talking_head' },
  { label: 'Entrevista en la calle', value: 'street_interview' },
  { label: 'Pizarra', value: 'whiteboard' },
  { label: 'Personajes actuados / skit', value: 'skit' },
];

const toneOptions = [
  { label: 'Directo', value: 'direct' },
  { label: 'Elegante', value: 'elegant' },
  { label: 'Confrontativo', value: 'confrontational' },
  { label: 'Cercano', value: 'close' },
  { label: 'Emocional', value: 'emotional' },
  { label: 'Experto', value: 'expert' },
  { label: 'Aspiracional', value: 'aspirational' },
];

const shortSteps: StepDefinition[] = [
  {
    id: 'reels-short-core',
    title: 'Version corta',
    description:
      'Responde lo minimo necesario para construir un guion util sin adivinar.',
    fields: [
      {
        id: 'objective',
        label: '1. Cual es el objetivo principal de este reel?',
        type: 'select',
        required: true,
        options: objectiveOptions,
      },
      {
        id: 'avatar_exact',
        label: '2. Quien es el avatar exacto?',
        type: 'textarea',
        required: true,
        placeholder: 'Profesion + contexto + frustracion',
      },
      {
        id: 'desired_result',
        label: '3. Que resultado quiere esa persona?',
        type: 'text',
        required: true,
      },
      {
        id: 'specific_topic',
        label: '4. Que tema especifico tratara este reel?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'angle',
        label: '5. Que angulo quieres usar?',
        type: 'select',
        required: true,
        options: angleOptions,
      },
      {
        id: 'real_pain',
        label: '6. Cual es el dolor real hoy?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'proof',
        label: '7. Que prueba tienes?',
        type: 'textarea',
        required: true,
        placeholder: 'Caso, experiencia, dato, contraste...',
      },
      {
        id: 'vehicle_name',
        label: '8. Como se llama tu vehiculo o mecanismo?',
        type: 'text',
        required: true,
        placeholder: 'Ej: Metodo X, Sistema Y, Estructura Z',
      },
      {
        id: 'follow_reward',
        label: '9. Que recompensa das por seguir?',
        type: 'text',
        required: true,
        placeholder: 'Ej: guiones, plantillas, ideas, checklists...',
      },
    ],
  },
];

const advancedSteps: StepDefinition[] = [
  {
    id: 'reels-advanced-strategy',
    title: 'Estrategia base',
    description:
      'Definimos objetivo, idea, avatar y resultado principal del reel.',
    fields: [
      {
        id: 'objective',
        label: '1. Cual es el objetivo principal de este reel?',
        type: 'select',
        required: true,
        options: objectiveOptions,
      },
      {
        id: 'reel_topic',
        label: '2. De que trata este reel?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'specific_topic',
        label: '3. Que tema especifico quieres tocar?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'associated_result',
        label: '4. Que resultado quieres que la persona relacione contigo despues de ver este reel?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'target_audience',
        label: '5. A quien va dirigido este reel?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'desired_audience',
        label: '6. Que tipo de persona quieres atraer con este contenido?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'current_problem',
        label: '7. Que problema vive esa persona hoy?',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    id: 'reels-advanced-angle',
    title: 'Angulo y palanca mental',
    description:
      'Elegimos desde que palanca mental se va a contar la idea.',
    fields: [
      {
        id: 'angle',
        label: '8. Desde que angulo quieres abordar esta idea?',
        type: 'select',
        required: true,
        options: angleOptions,
      },
      {
        id: 'angle_relevance',
        label: '9. Por que ese angulo es relevante para tu audiencia?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'emotion_to_activate',
        label: '10. Que emocion quieres activar con este reel?',
        type: 'text',
        required: true,
      },
      {
        id: 'desired_hook',
        label: '11. Como quieres abrir el reel?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'hook_trigger',
        label: '12. Que verdad incomoda, error, pregunta o promesa quieres usar en el hook?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'scroll_stop_phrase',
        label: '13. Que frase tendria suficiente fuerza para detener el scroll?',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    id: 'reels-advanced-format',
    title: 'Formato y construccion',
    description:
      'Definimos como se va a ver y sentir el reel.',
    fields: [
      {
        id: 'format',
        label: '14. En que formato quieres grabarlo?',
        type: 'select',
        required: true,
        options: formatOptions,
      },
      {
        id: 'format_reason',
        label: '15. Por que ese formato es el mejor para esta idea?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'visual_feel',
        label: '16. Quieres que se vea mas intimo, educativo, dinamico o disruptivo?',
        type: 'text',
        required: true,
      },
      {
        id: 'specific_pain',
        label: '17. Que dolor concreto quieres tocar?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'specific_desire',
        label: '18. Que deseo concreto quieres mostrar?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'objection_to_break',
        label: '19. Que objecion quieres derribar?',
        type: 'textarea',
      },
      {
        id: 'common_error_to_expose',
        label: '20. Que error comun quieres exponer?',
        type: 'textarea',
      },
      {
        id: 'wrong_belief_to_correct',
        label: '21. Que creencia equivocada quieres corregir?',
        type: 'textarea',
      },
    ],
  },
  {
    id: 'reels-advanced-proof-cta',
    title: 'Prueba, CTA y tono',
    description:
      'Cerramos con evidencia, accion deseada y tono final del guion.',
    fields: [
      {
        id: 'proof',
        label: '22. Que prueba puedes usar en este reel?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'supporting_example',
        label: '23. Tienes un caso real, resultado, experiencia, historia o ejemplo para respaldarlo?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'authority_reason',
        label: '24. Que te da autoridad para hablar de esto?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'desired_cta',
        label: '25. Que quieres que haga la persona despues de ver el reel?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'cta_action',
        label: '26. Quieres que te siga, comente, guarde, comparta o vaya al DM?',
        type: 'text',
        required: true,
      },
      {
        id: 'follow_reward',
        label: '27. Que recompensa concreta le vas a prometer si te sigue o consume mas contenido?',
        type: 'text',
        required: true,
      },
      {
        id: 'main_message',
        label: '28. Que mensaje principal no puede faltar en este reel?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'final_phrase',
        label: '29. Que frase final quieres que la persona recuerde?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'tone',
        label: '30. Que tono quieres usar?',
        type: 'select',
        required: true,
        options: toneOptions,
      },
    ],
  },
];

export const reelsScriptsModes: ReelsModeDefinition[] = [
  {
    mode: 'short',
    title: 'Version corta',
    description:
      'Ideal para generar un reel rapido con las preguntas minimas necesarias.',
    estimatedMinutes: 4,
    steps: shortSteps,
  },
  {
    mode: 'advanced',
    title: 'Version avanzada',
    description:
      'Ideal si quieres controlar mejor el angulo, el formato, el hook, la prueba y el CTA.',
    estimatedMinutes: 10,
    steps: advancedSteps,
  },
];