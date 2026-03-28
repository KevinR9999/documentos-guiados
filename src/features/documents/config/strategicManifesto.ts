import type { FlowDefinition } from '../types/documents';

const awarenessOptions = [
  { label: 'Muy baja', value: 'very_low' },
  { label: 'Baja', value: 'low' },
  { label: 'Media', value: 'medium' },
  { label: 'Alta', value: 'high' },
  { label: 'Muy alta', value: 'very_high' },
];

const salesModelOptions = [
  { label: 'Servicio 1 a 1', value: 'one_to_one_service' },
  { label: 'Asesoria / consultoria', value: 'consulting' },
  { label: 'Programa grupal', value: 'group_program' },
  { label: 'Mentoria', value: 'mentorship' },
  { label: 'Implementacion / done-for-you', value: 'done_for_you' },
  { label: 'Mixto', value: 'hybrid' },
];

const deliveryOptions = [
  { label: 'Llamadas 1 a 1', value: 'one_to_one_calls' },
  { label: 'Programa grabado', value: 'recorded_program' },
  { label: 'Sesion grupal', value: 'group_calls' },
  { label: 'Comunidad', value: 'community' },
  { label: 'Feedback directo', value: 'direct_feedback' },
  { label: 'Plantillas / recursos', value: 'templates_resources' },
  { label: 'IA / automatizacion', value: 'ai_automation' },
  { label: 'Implementacion guiada', value: 'guided_implementation' },
];

export const strategicManifestoFlow: FlowDefinition = {
  id: 'strategic_manifesto',
  title: 'Manifiesto Estratégico',
  description:
    'Construye el documento estratégico central de tu oferta: avatar, dolor, promesa, diferenciadores, metodología, mecanismo, entregables, precio y mensaje.',
  estimatedMinutes: 20,
  steps: [
    {
      id: 'target-persona',
      title: 'Persona objetivo',
      description:
        'Definimos con precisión quién entra, quién compra y qué señales muestran que están listos.',
      fields: [
        {
          id: 'who_is_target_person',
          label: '1. ¿Quién es tu persona objetivo?',
          type: 'textarea',
          required: true,
          placeholder:
            'Ej: profesionales hispanos en USA que venden servicios premium...',
        },
        {
          id: 'profession_or_role',
          label: '2. ¿Cuál es su profesión, rol o tipo de negocio?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'market_context',
          label: '3. ¿En qué mercado o contexto operan?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'current_stage',
          label: '4. ¿En qué etapa están actualmente?',
          type: 'textarea',
          required: true,
          placeholder:
            'Ej: ya venden, ya intentaron contenido o ads, pero están estancados...',
        },
        {
          id: 'what_they_have_tried',
          label: '5. ¿Qué ya han intentado antes de llegar a ti?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'buying_signals',
          label: '6. ¿Cuáles son las señales de compra o señales de que sí califican?',
          type: 'textarea',
          required: true,
          placeholder:
            'Ej: ya invirtieron, están frustrados, buscan control, entienden el valor...',
        },
        {
          id: 'who_enters_examples',
          label: '7. Dame ejemplos concretos de quién sí entra en esta oferta.',
          type: 'textarea',
          required: true,
        },
        {
          id: 'who_does_not_enter',
          label: '8. ¿Quién no entra o no es buen prospecto?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'awareness_level',
          label: '9. ¿Qué nivel de conciencia tiene este avatar?',
          type: 'select',
          required: true,
          options: awarenessOptions,
        },
      ],
    },
    {
      id: 'pain-desire-promise',
      title: 'Dolor, deseo y promesa',
      description:
        'Aterrizamos el dolor que arde, el deseo urgente y la promesa central de la oferta.',
      fields: [
        {
          id: 'burning_pains',
          label: '10. ¿Cuáles son los dolores que más le arden hoy?',
          type: 'textarea',
          required: true,
          placeholder:
            'Puedes escribir frases literales del cliente si las tienes.',
        },
        {
          id: 'emotional_cost',
          label: '11. ¿Qué costo emocional está pagando hoy por seguir igual?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'practical_cost',
          label: '12. ¿Qué costo práctico o económico está pagando?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'urgent_desires',
          label: '13. ¿Qué deseos urgentes tiene esta persona?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'desired_identity',
          label: '14. ¿En qué versión de sí mismo quiere convertirse?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'unique_promise',
          label: '15. ¿Cuál es tu promesa única?',
          type: 'textarea',
          required: true,
          placeholder:
            'Ej: Ayudo a X a lograr Y sin Z, mediante...',
        },
        {
          id: 'promise_without_usual_way',
          label: '16. ¿Qué logra sin tener que depender del camino típico que falla?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'why_this_promise_matters',
          label: '17. ¿Por qué esta promesa importa tanto para tu cliente ideal?',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      id: 'differentiators',
      title: 'Diferenciadores',
      description:
        'Aquí vamos a construir por qué tu enfoque se ve distinto y por qué eso importa.',
      fields: [
        {
          id: 'main_alternative_that_fails',
          label: '18. ¿Qué hace la mayoría en tu mercado y por qué falla?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'differentiator_1',
          label: '19. Diferenciador 1: ¿qué haces distinto y por qué eso funciona mejor?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'differentiator_2',
          label: '20. Diferenciador 2: ¿qué haces distinto y por qué eso funciona mejor?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'differentiator_3',
          label: '21. Diferenciador 3: ¿qué haces distinto y por qué eso funciona mejor?',
          type: 'textarea',
        },
        {
          id: 'differentiator_4',
          label: '22. Diferenciador 4: ¿qué haces distinto y por qué eso funciona mejor?',
          type: 'textarea',
        },
        {
          id: 'why_people_perceive_you_different',
          label: '23. ¿Por qué la gente te percibe diferente frente a otras opciones?',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      id: 'methodology-and-mechanism',
      title: 'Metodología y mecanismo',
      description:
        'Definimos el camino de transformación, el mecanismo único y el contraste con la forma común.',
      fields: [
        {
          id: 'method_name',
          label: '24. ¿Cómo se llama tu metodología o sistema?',
          type: 'text',
          required: true,
        },
        {
          id: 'method_phases',
          label: '25. ¿Cuáles son las fases o etapas de tu metodología?',
          type: 'textarea',
          required: true,
          placeholder:
            'Escríbelas en orden y explica brevemente qué pasa en cada una.',
        },
        {
          id: 'what_changes_in_each_phase',
          label: '26. ¿Qué cambio o resultado produce cada fase?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'unique_mechanism',
          label: '27. ¿Cuál es el mecanismo único de tu oferta?',
          type: 'textarea',
          required: true,
          placeholder:
            'Ej: arquitectura, sistema, framework, estructura, proceso...',
        },
        {
          id: 'mechanism_explanation',
          label: '28. Explica por qué ese mecanismo funciona mejor que el enfoque común.',
          type: 'textarea',
          required: true,
        },
        {
          id: 'contrast_common_vs_yours',
          label: '29. Haz el contraste entre “lo que hacen todos” vs “lo que hace tu sistema”.',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      id: 'offer-and-message',
      title: 'Oferta y mensaje',
      description:
        'Cerramos con entregables, precio, garantía, pitch y ángulos de mensaje.',
      fields: [
        {
          id: 'sales_model',
          label: '30. ¿Qué tipo de oferta estás vendiendo?',
          type: 'select',
          required: true,
          options: salesModelOptions,
        },
        {
          id: 'core_deliverables',
          label: '31. ¿Cuáles son los entregables principales del núcleo de la oferta?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'bonus_deliverables',
          label: '32. ¿Qué bonos, extras o recursos adicionales incluye?',
          type: 'textarea',
        },
        {
          id: 'delivery_format',
          label: '33. ¿Cómo se entrega la experiencia?',
          type: 'select',
          required: true,
          options: deliveryOptions,
        },
        {
          id: 'price',
          label: '34. ¿Cuál es el precio?',
          type: 'text',
          required: true,
        },
        {
          id: 'duration',
          label: '35. ¿Cuál es la duración del proceso?',
          type: 'text',
          required: true,
        },
        {
          id: 'guarantee',
          label: '36. ¿Cuál es la garantía o condición de respaldo?',
          type: 'textarea',
        },
        {
          id: 'short_pitch',
          label: '37. ¿Cuál sería tu pitch corto de 2 líneas?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'pitch_with_mechanism',
          label: '38. ¿Cuál sería tu pitch de 2 líneas incluyendo el mecanismo?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'logical_angle',
          label: '39. Ángulo lógico: ¿cómo le hablarías al perfil analítico?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'emotional_angle',
          label: '40. Ángulo emocional: ¿cómo le hablarías al perfil frustrado o dolido?',
          type: 'textarea',
          required: true,
        },
        {
          id: 'identity_angle',
          label: '41. Ángulo de identidad: ¿cómo le hablarías al perfil ambicioso?',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
};