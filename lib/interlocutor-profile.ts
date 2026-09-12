export const LEGAL_LEVELS = ['planer', 'general', 'professional'] as const;
export const INTERLOCUTOR_CONTEXTS = ['ciutadania', 'estudi', 'consulta', 'professional'] as const;
export const INTERLOCUTOR_OBJECTIVES = ['entendre', 'preparar-consulta', 'aprofundir'] as const;

export type LegalLevel = (typeof LEGAL_LEVELS)[number];
export type InterlocutorContext = (typeof INTERLOCUTOR_CONTEXTS)[number];
export type InterlocutorObjective = (typeof INTERLOCUTOR_OBJECTIVES)[number];

export interface InterlocutorProfile {
  legalLevel: LegalLevel;
  context: InterlocutorContext;
  objective: InterlocutorObjective;
}

export const DEFAULT_INTERLOCUTOR_PROFILE: InterlocutorProfile = {
  legalLevel: 'planer',
  context: 'ciutadania',
  objective: 'entendre',
};

const isOneOf = <T extends readonly string[]>(value: unknown, values: T): value is T[number] =>
  typeof value === 'string' && values.includes(value);

export function isInterlocutorProfile(value: unknown): value is InterlocutorProfile {
  if (!value || typeof value !== 'object') return false;
  const profile = value as Record<string, unknown>;
  return (
    isOneOf(profile.legalLevel, LEGAL_LEVELS) &&
    isOneOf(profile.context, INTERLOCUTOR_CONTEXTS) &&
    isOneOf(profile.objective, INTERLOCUTOR_OBJECTIVES)
  );
}

export function parseInterlocutorProfile(value: unknown): InterlocutorProfile {
  return isInterlocutorProfile(value) ? value : DEFAULT_INTERLOCUTOR_PROFILE;
}

export function getInterlocutorProfileKey(value: unknown): string {
  const profile = parseInterlocutorProfile(value);
  return `${profile.legalLevel}:${profile.context}:${profile.objective}`;
}

type ProfileLocale = 'ca' | 'es' | 'fr';

type ProfileGuidance = Record<keyof InterlocutorProfile, Record<string, string>>;

const PROFILE_LABELS: Record<ProfileLocale, Record<keyof InterlocutorProfile, Record<string, string>>> = {
  ca: {
    legalLevel: { planer: 'llenguatge planer', general: 'nivell general', professional: 'nivell professional' },
    context: { ciutadania: 'ciutadania o residència', estudi: 'estudi', consulta: 'consulta personal', professional: 'ús professional' },
    objective: { entendre: 'entendre el dret', 'preparar-consulta': 'preparar una consulta', aprofundir: 'aprofundir i argumentar' },
  },
  es: {
    legalLevel: { planer: 'lenguaje sencillo', general: 'nivel general', professional: 'nivel profesional' },
    context: { ciutadania: 'ciudadanía o residencia', estudi: 'estudio', consulta: 'consulta personal', professional: 'uso profesional' },
    objective: { entendre: 'entender el derecho', 'preparar-consulta': 'preparar una consulta', aprofundir: 'profundizar y argumentar' },
  },
  fr: {
    legalLevel: { planer: 'langage simple', general: 'niveau général', professional: 'niveau professionnel' },
    context: { ciutadania: 'citoyenneté ou résidence', estudi: 'études', consulta: 'consultation personnelle', professional: 'usage professionnel' },
    objective: { entendre: 'comprendre le droit', 'preparar-consulta': 'préparer une consultation', aprofundir: 'approfondir et argumenter' },
  },
};

const PROFILE_GUIDANCE: Record<ProfileLocale, ProfileGuidance> = {
  ca: {
    legalLevel: {
      planer: 'Utilitza frases curtes i vocabulari quotidià. Defineix cada terme jurídic abans d’utilitzar-lo, explica la regla en passos i inclou un exemple proper sense donar res per sabut.',
      general: 'Utilitza vocabulari jurídic explicat amb claredat. Distingeix regla, excepcions i efectes pràctics, amb una profunditat intermèdia i exemples suficients per entendre el raonament.',
      professional: 'Utilitza terminologia jurídica precisa i una estructura analítica. Identifica elements, límits, excepcions, fonts i qüestions interpretatives, sense eliminar matisos per fer el text més senzill.',
    },
    context: {
      ciutadania: 'Prioritza què significa el dret per a una persona i quina institució o actuació pública hi està relacionada. No pressuposis coneixements ni atribueixis cap condició personal.',
      estudi: 'Organitza la resposta per facilitar l’aprenentatge: concepte, fonament constitucional, relació amb altres preceptes i idea clau final. Pots afegir una pregunta breu d’autocomprovació.',
      consulta: 'Orienta la resposta a preparar una consulta: separa els fets que caldria aclarir, la qüestió jurídica, les fonts aplicables i els passos o preguntes següents. No presentis una conclusió individualitzada sense fets suficients.',
      professional: 'Prioritza una resposta formal i accionable: qüestió, fonts, regla, límits, riscos interpretatius i punts que cal verificar. Evita explicacions introductòries innecessàries.',
    },
    objective: {
      entendre: 'Comença amb una resposta directa i una idea clau. Després explica el perquè i tanca amb un exemple o conseqüència pràctica.',
      'preparar-consulta': 'Estructura la resposta perquè permeti preparar una consulta: què sabem, què falta saber, quina font cal revisar i quina pregunta convé formular.',
      aprofundir: 'Afegeix el raonament jurídic, les excepcions, les tensions interpretatives i les fonts rellevants. Si hi ha posicions diferents, exposa-les sense convertir-ne cap en una veritat absoluta.',
    },
  },
  es: {
    legalLevel: {
      planer: 'Utiliza frases cortas y vocabulario cotidiano. Define cada término jurídico antes de usarlo, explica la regla por pasos e incluye un ejemplo cercano sin dar nada por sabido.',
      general: 'Utiliza vocabulario jurídico explicado con claridad. Distingue regla, excepciones y efectos prácticos, con una profundidad intermedia y ejemplos suficientes para entender el razonamiento.',
      professional: 'Utiliza terminología jurídica precisa y una estructura analítica. Identifica elementos, límites, excepciones, fuentes y cuestiones interpretativas, sin eliminar matices para simplificar el texto.',
    },
    context: {
      ciutadania: 'Prioriza qué significa el derecho para una persona y qué institución o actuación pública está relacionada. No presupongas conocimientos ni atribuyas condiciones personales.',
      estudi: 'Organiza la respuesta para facilitar el aprendizaje: concepto, fundamento constitucional, relación con otros preceptos e idea clave final. Puedes añadir una pregunta breve de autocomprobación.',
      consulta: 'Orienta la respuesta a preparar una consulta: separa los hechos que habría que aclarar, la cuestión jurídica, las fuentes aplicables y los siguientes pasos o preguntas. No presentes una conclusión individualizada sin hechos suficientes.',
      professional: 'Prioriza una respuesta formal y accionable: cuestión, fuentes, regla, límites, riesgos interpretativos y puntos que deben verificarse. Evita introducciones innecesarias.',
    },
    objective: {
      entendre: 'Empieza con una respuesta directa y una idea clave. Después explica el porqué y termina con un ejemplo o consecuencia práctica.',
      'preparar-consulta': 'Estructura la respuesta para preparar una consulta: qué sabemos, qué falta saber, qué fuente revisar y qué pregunta conviene formular.',
      aprofundir: 'Añade el razonamiento jurídico, excepciones, tensiones interpretativas y fuentes relevantes. Si hay posiciones distintas, exponlas sin convertir ninguna en verdad absoluta.',
    },
  },
  fr: {
    legalLevel: {
      planer: 'Utilise des phrases courtes et un vocabulaire courant. Définis chaque terme juridique avant de l’employer, explique la règle par étapes et donne un exemple proche sans rien présupposer.',
      general: 'Utilise un vocabulaire juridique expliqué clairement. Distingue la règle, les exceptions et les effets pratiques, avec une profondeur intermédiaire et des exemples suffisants pour comprendre le raisonnement.',
      professional: 'Utilise une terminologie juridique précise et une structure analytique. Identifie les éléments, limites, exceptions, sources et questions d’interprétation, sans supprimer les nuances pour simplifier le texte.',
    },
    context: {
      ciutadania: 'Privilégie la signification concrète du droit pour une personne et l’institution ou l’action publique concernée. Ne présuppose aucune connaissance et n’attribue aucune condition personnelle.',
      estudi: 'Organise la réponse pour faciliter l’apprentissage : concept, fondement constitutionnel, relation avec les autres dispositions et idée clé finale. Tu peux ajouter une brève question d’auto-évaluation.',
      consulta: 'Oriente la réponse vers la préparation d’une consultation : distingue les faits à clarifier, la question juridique, les sources applicables et les prochaines étapes ou questions. Ne donne pas de conclusion individualisée sans faits suffisants.',
      professional: 'Privilégie une réponse formelle et opérationnelle : question, sources, règle, limites, risques d’interprétation et points à vérifier. Évite les introductions inutiles.',
    },
    objective: {
      entendre: 'Commence par une réponse directe et une idée clé. Explique ensuite le pourquoi et termine par un exemple ou une conséquence pratique.',
      'preparar-consulta': 'Structure la réponse pour préparer une consultation : ce que nous savons, ce qui manque, la source à vérifier et la question à formuler.',
      aprofundir: 'Ajoute le raisonnement juridique, les exceptions, les tensions interprétatives et les sources pertinentes. S’il existe plusieurs positions, expose-les sans ériger l’une d’elles en vérité absolue.',
    },
  },
};

export function buildInterlocutorInstructions(
  value: unknown,
  locale: ProfileLocale,
): string {
  const profile = parseInterlocutorProfile(value);
  const labels = PROFILE_LABELS[locale];
  const guidance = PROFILE_GUIDANCE[locale];
  const heading = locale === 'es' ? 'PERFIL COMUNICATIVO' : locale === 'fr' ? 'PROFIL COMMUNICATIF' : 'PERFIL COMUNICATIU';
  const rules = locale === 'es'
    ? [
        'Adapta únicamente el lenguaje, la profundidad, los ejemplos y la estructura.',
        'No cambies el sentido jurídico, no inventes normas y no sustituyas las fuentes.',
        'No deduzcas ni menciones edad, formación, identidad o vulnerabilidades de la persona.',
      ]
    : locale === 'fr'
      ? [
          'Adapte uniquement le langage, la profondeur, les exemples et la structure.',
          'Ne change pas le sens juridique, n’invente pas de normes et ne remplace pas les sources.',
          'Ne déduis ni ne mentionne l’âge, la formation, l’identité ou les vulnérabilités de la personne.',
        ]
      : [
          'Adapta únicament el llenguatge, la profunditat, els exemples i l’estructura.',
          'No canviïs el sentit jurídic, no inventis normes i no substitueixis les fonts.',
          'No dedueixis ni esmentis l’edat, la formació, la identitat o vulnerabilitats de la persona.',
        ];

  const articleFormat = locale === 'es'
    ? 'Si generas una ficha estructurada de artículo, ajusta también la extensión y los ejemplos: lenguaje sencillo = resumen breve y ejemplo cotidiano; nivel general = explicación equilibrada; nivel profesional = campos más analíticos y referencias a las fuentes ya proporcionadas. Mantén siempre los mismos hechos y conclusiones jurídicas.'
    : locale === 'fr'
      ? 'Si tu génères une fiche structurée d’article, adapte aussi la longueur et les exemples : langage simple = résumé bref et exemple quotidien ; niveau général = explication équilibrée ; niveau professionnel = champs plus analytiques et références aux sources déjà fournies. Conserve toujours les mêmes faits et conclusions juridiques.'
      : 'Si generes una fitxa estructurada d’article, ajusta també l’extensió i els exemples: llenguatge planer = resum breu i exemple quotidià; nivell general = explicació equilibrada; nivell professional = camps més analítics i referències a les fonts ja proporcionades. Mantén sempre els mateixos fets i conclusions jurídiques.';

  return `\n\n${heading}:\n- Nivell jurídic: ${labels.legalLevel[profile.legalLevel]}\n- Context comunicatiu: ${labels.context[profile.context]}\n- Objectiu: ${labels.objective[profile.objective]}\n- Pauta del nivell: ${guidance.legalLevel[profile.legalLevel]}\n- Pauta del context: ${guidance.context[profile.context]}\n- Pauta de l’objectiu: ${guidance.objective[profile.objective]}\n- ${articleFormat}\n${rules.map((rule) => `- ${rule}`).join('\n')}\n`;
}
