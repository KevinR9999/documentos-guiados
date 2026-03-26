import type { FlowDefinition } from '../types/documents';

export const inventoryOfSelfFlow: FlowDefinition = {
  id: 'inventory_of_self',
  title: 'Inventario del Ser',
  description:
    'Construye un mapa profundo de tu historia, tu identidad, tus heridas, tus valores y la version de ti que estas construyendo.',
  estimatedMinutes: 35,
  steps: [
    {
      id: 'identity-without-mask',
      title: 'Tu nombre real',
      description:
        'Responde con honestidad. Aqui no se gana por valentia; se gana por verdad.',
      fields: [
        {
          id: 'self_description_without_evaluation',
          label: '1. Como te describes cuando nadie te esta evaluando?',
          type: 'textarea',
          placeholder: 'Describe como eres cuando no estas tratando de impresionar a nadie.',
        },
        {
          id: 'what_you_hide_to_be_loved',
          label: '2. Que parte de ti ocultas para que te quieran?',
          type: 'textarea',
        },
        {
          id: 'what_you_exaggerate_to_be_respected',
          label: '3. Que parte de ti exageras para que te respeten?',
          type: 'textarea',
        },
        {
          id: 'what_makes_you_feel_like_yourself',
          label: '4. Que te hace sentir “yo soy yo”?',
          type: 'textarea',
        },
        {
          id: 'what_makes_you_feel_not_yourself',
          label: '5. Que te hace sentir “yo no soy yo”?',
          type: 'textarea',
        },
        {
          id: 'what_embarrasses_you_but_is_true',
          label: '6. Que te da verguenza admitir, pero es verdad?',
          type: 'textarea',
        },
        {
          id: 'what_makes_you_proud_even_if_unusual',
          label: '7. Que te enorgullece admitir, aunque suene raro?',
          type: 'textarea',
        },
        {
          id: 'what_is_hard_to_ask_for',
          label: '8. Que te cuesta pedir?',
          type: 'textarea',
        },
        {
          id: 'what_is_hard_to_receive',
          label: '9. Que te cuesta recibir?',
          type: 'textarea',
        },
        {
          id: 'what_is_hard_to_let_go',
          label: '10. Que te cuesta soltar?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'origin',
      title: 'Origen',
      description: 'Volvamos a de donde vienes y a lo que te marco sin darte cuenta.',
      fields: [
        {
          id: 'where_you_grew_up',
          label: '11. Donde creciste y como se sentia vivir ahi?',
          type: 'textarea',
        },
        {
          id: 'childhood_sounds_smells_rituals',
          label: '12. Que sonidos, olores o rituales recuerdas de tu infancia?',
          type: 'textarea',
        },
        {
          id: 'what_you_lacked',
          label: '13. Que te falto que hoy entiendes mejor?',
          type: 'textarea',
        },
        {
          id: 'what_you_had_too_much_of',
          label:
            '14. Que te sobro (responsabilidad, presion, silencio, caos)?',
          type: 'textarea',
        },
        {
          id: 'what_you_learned_early',
          label:
            '15. Que aprendiste temprano que otros aprendieron tarde?',
          type: 'textarea',
        },
        {
          id: 'what_you_swore_not_to_repeat',
          label: '16. Que juraste no repetir cuando crecieras?',
          type: 'textarea',
        },
        {
          id: 'what_you_repeated_anyway',
          label: '17. Que terminaste repitiendo igualito?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'family',
      title: 'Familia',
      description: 'Tu primer mundo emocional tambien construyo quien eres.',
      fields: [
        {
          id: 'mother_in_five_words',
          label:
            '18. Describe a tu mama o figura materna en 5 palabras.',
          type: 'textarea',
        },
        {
          id: 'father_in_five_words',
          label:
            '19. Describe a tu papa o figura paterna en 5 palabras.',
          type: 'textarea',
        },
        {
          id: 'what_they_gave_that_saved_you',
          label: '20. Que te dieron que te salvo?',
          type: 'textarea',
        },
        {
          id: 'what_they_gave_that_hurt_you',
          label: '21. Que te dieron que te hirio?',
          type: 'textarea',
        },
        {
          id: 'forbidden_topic_at_home',
          label: '22. Que tema era “prohibido” en tu casa?',
          type: 'textarea',
        },
        {
          id: 'what_was_celebrated_at_home',
          label: '23. Que se celebraba en tu casa?',
          type: 'textarea',
        },
        {
          id: 'what_was_punished_at_home',
          label: '24. Que se castigaba en tu casa?',
          type: 'textarea',
        },
        {
          id: 'family_typical_phrase',
          label: '25. Cual fue una frase tipica de tu familia?',
          type: 'textarea',
        },
        {
          id: 'who_you_miss_even_if_close',
          label: '26. A quien extrañas aunque este cerca?',
          type: 'textarea',
        },
        {
          id: 'children_info',
          label: '27. Tienes hijos? Cuantos? nombres y edad?',
          type: 'textarea',
        },
        {
          id: 'who_you_love_even_if_it_hurts',
          label: '28. A quien amas aunque te duela?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'beliefs',
      title: 'Creencias',
      description: 'Aqui entramos en lo que te guia por dentro.',
      fields: [
        {
          id: 'belief_in_god',
          label: '29. Crees en Dios? Por que si o por que no?',
          type: 'textarea',
        },
        {
          id: 'belief_you_left_behind',
          label: '30. Que creencia tenias antes y hoy ya no?',
          type: 'textarea',
        },
        {
          id: 'belief_you_earned',
          label: '31. Que creencia tienes hoy y te costo ganartela?',
          type: 'textarea',
        },
        {
          id: 'what_is_sacred_to_you',
          label:
            '32. Que consideras sagrado (aunque no seas religioso/a)?',
          type: 'textarea',
        },
        {
          id: 'what_gives_you_faith',
          label: '33. Que te da fe cuando todo se pone oscuro?',
          type: 'textarea',
        },
        {
          id: 'what_breaks_your_faith',
          label: '34. Que te rompe la fe?',
          type: 'textarea',
        },
        {
          id: 'what_is_unforgivable',
          label: '35. Que te parece imperdonable?',
          type: 'textarea',
        },
        {
          id: 'what_is_admirable',
          label: '36. Que te parece admirable?',
          type: 'textarea',
        },
        {
          id: 'thoughts_on_revenge',
          label: '37. Que piensas de la venganza y por que?',
          type: 'textarea',
        },
        {
          id: 'thoughts_on_forgiveness',
          label: '38. Que piensas del perdon y por que?',
          type: 'textarea',
        },
        {
          id: 'thoughts_on_love_private',
          label:
            '39. Que piensas del amor cuando nadie te esta oyendo?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'humanity-and-habits',
      title: 'Gustos, manias y humanidad',
      description:
        'Lo cotidiano tambien te define. Aqui aparecen tus simbolos y tus refugios.',
      fields: [
        {
          id: 'favorite_food_and_memory',
          label: '40. Comida favorita y que recuerdo te trae?',
          type: 'textarea',
        },
        {
          id: 'favorite_drink_and_moment',
          label: '41. Bebida favorita y cuando la tomas?',
          type: 'textarea',
        },
        {
          id: 'smell_that_calms_you',
          label: '42. Olor que te calma?',
          type: 'textarea',
        },
        {
          id: 'place_that_heals_you',
          label: '43. Lugar que te cura?',
          type: 'textarea',
        },
        {
          id: 'place_that_unsettles_you',
          label: '44. Lugar que te inquieta?',
          type: 'textarea',
        },
        {
          id: 'relationship_with_music_and_dancing',
          label:
            '45. Bailas o no bailas? Que pasa contigo con musica?',
          type: 'textarea',
        },
        {
          id: 'songs_with_you_today',
          label: '46. 3 a 5 canciones que te acompañan hoy.',
          type: 'textarea',
          placeholder: 'Puedes ponerlas en lista.',
        },
        {
          id: 'song_that_breaks_you_inside',
          label: '47. Una cancion que te rompe por dentro.',
          type: 'textarea',
        },
        {
          id: 'movie_or_series_that_marked_you',
          label: '48. Pelicula o serie que te marco y por que.',
          type: 'textarea',
        },
        {
          id: 'phrase_that_haunts_you',
          label: '49. Una frase que te persigue (para bien o para mal).',
          type: 'textarea',
        },
        {
          id: 'small_thing_that_makes_you_happy',
          label:
            '50. Que cosa pequeña te hace feliz sin explicacion?',
          type: 'textarea',
        },
        {
          id: 'small_thing_that_ruins_your_day',
          label: '51. Que cosa pequeña te arruina el dia?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'epic-moments',
      title: 'Momentos epicos',
      description: 'Vamos a mirar las escenas que te forjaron.',
      fields: [
        {
          id: 'moment_you_changed',
          label:
            '52. Un momento donde dijiste: “ya no soy el/la mismo/a”.',
          type: 'textarea',
        },
        {
          id: 'small_victory_that_was_huge',
          label:
            '53. Una victoria pequeña que para ti fue gigante.',
          type: 'textarea',
        },
        {
          id: 'decision_that_changed_your_life',
          label: '54. Una decision que te cambio la vida.',
          type: 'textarea',
        },
        {
          id: 'time_you_were_brave',
          label:
            '55. Una vez que fuiste valiente sin sentirte valiente.',
          type: 'textarea',
        },
        {
          id: 'day_impossible_went_well',
          label:
            '56. Un dia que te salio bien algo que parecia imposible.',
          type: 'textarea',
        },
        {
          id: 'time_you_chose_yourself',
          label:
            '57. Un momento donde te elegiste a ti, aunque doliera.',
          type: 'textarea',
        },
        {
          id: 'before_and_after_of_your_life',
          label:
            '58. Un “antes y despues” de tu vida (que paso, que cambio?).',
          type: 'textarea',
        },
        {
          id: 'greatest_pride_so_far',
          label: '59. Cual ha sido tu mayor orgullo hasta hoy?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'failures-and-learnings',
      title: 'Fracasos, caidas y aprendizajes',
      description:
        'Sin morbo y sin maquillaje: aqui buscamos significado.',
      fields: [
        {
          id: 'mistake_you_learned_from',
          label: '60. Un error del que aprendiste a la mala.',
          type: 'textarea',
        },
        {
          id: 'time_you_betrayed_yourself',
          label: '61. Una vez que te traicionaste a ti mismo/a.',
          type: 'textarea',
        },
        {
          id: 'someone_betrayed_you',
          label:
            '62. Una vez que alguien te traiciono (y que cambio en ti).',
          type: 'textarea',
        },
        {
          id: 'stage_you_felt_lost',
          label: '63. Una etapa donde te sentiste perdido/a.',
          type: 'textarea',
        },
        {
          id: 'what_held_you_up',
          label:
            '64. Que te sostuvo en esa etapa (persona, habito, fe, disciplina)?',
          type: 'textarea',
        },
        {
          id: 'what_you_learned_in_worst_version',
          label: '65. Que aprendiste de ti en tu peor version?',
          type: 'textarea',
        },
        {
          id: 'what_you_learned_in_best_version',
          label: '66. Que aprendiste de ti en tu mejor version?',
          type: 'textarea',
        },
        {
          id: 'part_of_story_that_still_hurts',
          label:
            '67. Que parte de tu historia aun duele cuando la cuentas?',
          type: 'textarea',
        },
        {
          id: 'part_of_story_you_can_tell_calmly',
          label:
            '68. Que parte de tu historia ya puedes contar con calma?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'love-and-bonds',
      title: 'Amor, vinculos y corazon',
      description: 'Aqui aparece como amas, que esperas y que te duele.',
      fields: [
        {
          id: 'what_makes_you_fall_in_love',
          label: '69. Que te enamora de una persona?',
          type: 'textarea',
        },
        {
          id: 'what_disappoints_you_about_people',
          label:
            '70. Que te decepciona de la gente casi siempre?',
          type: 'textarea',
        },
        {
          id: 'how_you_love',
          label:
            '71. Como amas tu: con palabras, actos, detalles, silencio?',
          type: 'textarea',
        },
        {
          id: 'how_you_fight',
          label:
            '72. Como peleas tu: te vas, gritas, te callas, negocias?',
          type: 'textarea',
        },
        {
          id: 'what_you_need_to_feel_safe',
          label:
            '73. Que necesitas para sentirte seguro/a con alguien?',
          type: 'textarea',
        },
        {
          id: 'what_is_hard_to_believe_about_love',
          label: '74. Que te cuesta creer del amor?',
          type: 'textarea',
        },
        {
          id: 'love_you_still_want_to_live',
          label:
            '75. Que te gustaria vivir en el amor que aun no has vivido?',
          type: 'textarea',
        },
        {
          id: 'what_history_taught_you_about_love',
          label:
            '76. Que te enseño tu historia sobre el amor?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'emotional-identity',
      title: 'Identidad emocional',
      description: 'Vamos a mirar como funcionas por dentro.',
      fields: [
        {
          id: 'what_you_do_when_sad',
          label: '77. Que haces cuando estas triste?',
          type: 'textarea',
        },
        {
          id: 'what_you_do_when_happy',
          label: '78. Que haces cuando estas feliz?',
          type: 'textarea',
        },
        {
          id: 'what_you_do_when_afraid',
          label: '79. Que haces cuando tienes miedo?',
          type: 'textarea',
        },
        {
          id: 'what_you_do_when_angry',
          label: '80. Que haces cuando tienes rabia?',
          type: 'textarea',
        },
        {
          id: 'what_gives_you_anxiety',
          label:
            '81. Que te da ansiedad sin que te des cuenta?',
          type: 'textarea',
        },
        {
          id: 'what_calms_you_fast',
          label: '82. Que te calma rapido?',
          type: 'textarea',
        },
        {
          id: 'what_calms_you_slow_but_real',
          label:
            '83. Que te calma lento (pero de verdad)?',
          type: 'textarea',
        },
        {
          id: 'what_triggers_insecurity',
          label: '84. Que te activa la inseguridad?',
          type: 'textarea',
        },
        {
          id: 'what_triggers_confidence',
          label: '85. Que te activa la confianza?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'values-and-character',
      title: 'Valores y caracter',
      description: 'Tu columna vertebral vive aqui.',
      fields: [
        {
          id: 'what_you_do_not_negotiate',
          label: '86. Que no negocias por nada?',
          type: 'textarea',
        },
        {
          id: 'what_you_no_longer_tolerate',
          label: '87. Que has tolerado y ya no toleras?',
          type: 'textarea',
        },
        {
          id: 'three_values_that_define_you',
          label:
            '88. Que te define: lealtad, libertad, disciplina, fe, creatividad...? Elige 3 y explica por que.',
          type: 'textarea',
        },
        {
          id: 'what_outrages_you',
          label: '89. Que te indigna?',
          type: 'textarea',
        },
        {
          id: 'what_gives_you_tenderness',
          label: '90. Que te da ternura?',
          type: 'textarea',
        },
        {
          id: 'what_you_admire_and_want_to_develop',
          label:
            '91. Que admiras de otros que te gustaria desarrollar?',
          type: 'textarea',
        },
        {
          id: 'what_flaw_in_others_is_hard_to_forgive',
          label:
            '92. Que defecto ajeno te cuesta perdonar?',
          type: 'textarea',
        },
        {
          id: 'what_flaw_in_you_are_learning_to_manage',
          label:
            '93. Que defecto tuyo estas aprendiendo a manejar?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'present',
      title: 'Tu presente',
      description: 'Aqui aterrizamos lo que estas viviendo ahora.',
      fields: [
        {
          id: 'what_moved_you_this_week',
          label: '94. Que te paso esta semana que te movio?',
          type: 'textarea',
        },
        {
          id: 'recent_conversation_left_you_thinking',
          label:
            '95. Que conversacion reciente te dejo pensando?',
          type: 'textarea',
        },
        {
          id: 'what_you_are_avoiding_facing',
          label:
            '96. Que estas evitando mirar de frente?',
          type: 'textarea',
        },
        {
          id: 'what_you_are_learning_now',
          label: '97. Que estas aprendiendo ahora mismo?',
          type: 'textarea',
        },
        {
          id: 'what_excites_you_this_month',
          label: '98. Que te ilusiona este mes?',
          type: 'textarea',
        },
        {
          id: 'what_worries_you_in_silence',
          label: '99. Que te preocupa en silencio?',
          type: 'textarea',
        },
        {
          id: 'what_you_are_leting_go',
          label: '100. Que estas soltando?',
          type: 'textarea',
        },
        {
          id: 'what_you_are_building',
          label: '101. Que estas construyendo?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'future',
      title: 'Tu futuro',
      description: 'Vamos a mirar la version de ti que quieres llegar a ser.',
      fields: [
        {
          id: 'how_you_want_to_be_remembered',
          label: '102. Como quieres que te recuerden?',
          type: 'textarea',
        },
        {
          id: 'what_you_want_someone_to_say_about_you',
          label:
            '103. Que te gustaria que alguien diga de ti con honestidad?',
          type: 'textarea',
        },
        {
          id: 'what_you_want_to_leave_in_the_world',
          label:
            '104. Que te gustaria dejar en el mundo (aunque sea pequeño)?',
          type: 'textarea',
        },
        {
          id: 'what_you_want_to_feel_more_often',
          label: '105. Que quieres sentir mas seguido?',
          type: 'textarea',
        },
        {
          id: 'what_you_want_to_feel_less_often',
          label: '106. Que quieres sentir menos seguido?',
          type: 'textarea',
        },
        {
          id: 'habit_that_brings_you_closer_to_best_version',
          label:
            '107. Que habito te acercaria a tu mejor version?',
          type: 'textarea',
        },
        {
          id: 'decision_you_keep_postponing',
          label: '108. Que decision vienes aplazando?',
          type: 'textarea',
        },
        {
          id: 'book_title_of_this_chapter',
          label:
            '109. Si tu vida fuera un libro, que titulo tendria este capitulo?',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'symbol-and-signature',
      title: 'Tu frase, tu simbolo, tu sello',
      description: 'Ahora vamos a condensarte en simbolos y señales.',
      fields: [
        {
          id: 'phrase_that_represents_you_today',
          label:
            '110. Una frase que te represente hoy (tuya o de alguien mas).',
          type: 'textarea',
        },
        {
          id: 'object_that_represents_you',
          label: '111. Un objeto que te representa y por que.',
          type: 'textarea',
        },
        {
          id: 'place_that_represents_you',
          label: '112. Un lugar que te representa y por que.',
          type: 'textarea',
        },
        {
          id: 'gesture_that_gives_you_away',
          label:
            '113. Un gesto tuyo que te delata (lo que haces siempre).',
          type: 'textarea',
        },
        {
          id: 'song_that_is_you',
          label: '114. Una cancion que dirias: “esta soy yo”.',
          type: 'textarea',
        },
        {
          id: 'truth_you_will_not_negotiate',
          label:
            '115. Una verdad que hoy ya no vas a negociar contigo.',
          type: 'textarea',
        },
      ],
    },
    {
      id: 'integration-close',
      title: 'Cierre de integracion',
      description:
        'Este cierre busca ayudarte a verte completo/a y a integrar tu historia.',
      fields: [
        {
          id: 'part_of_you_to_embrace_more',
          label: '116. Que parte de ti te gustaria abrazar mas?',
          type: 'textarea',
        },
        {
          id: 'part_of_story_to_resignify',
          label:
            '117. Que parte de tu historia te gustaria resignificar?',
          type: 'textarea',
        },
        {
          id: 'what_you_are_grateful_for',
          label:
            '118. Que agradeces hoy, aunque te haya costado?',
          type: 'textarea',
        },
        {
          id: 'what_you_forgive_even_a_little',
          label: '119. Que perdonas (aunque sea un poquito)?',
          type: 'textarea',
        },
        {
          id: 'promise_to_yourself_from_now',
          label:
            '120. Que te prometes a ti mismo/a desde hoy?',
          type: 'textarea',
        },
        {
          id: 'ten_scenes_one_day',
          label:
            '121. Escribe 10 escenas de tu vida empezando con: “Un dia…” (1 a 2 lineas cada una).',
          type: 'textarea',
          placeholder:
            'Ej:\nUn dia entendi que...\nUn dia me fui de...\nUn dia deje de...',
        },
      ],
    },
  ],
};