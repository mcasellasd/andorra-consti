/**
 * Sistema de validació de compliment amb l'AI Act (Reglament UE 2024/1689)
 * Implementa 5 checks bàsics per garantir transparència i compliment legal
 */

export interface AIActCompliance {
  disclosesAI: boolean;              // Indica que és generada per IA
  mentionsModel: boolean;             // Menciona el model/proveïdor
  hasDisclaimers: boolean;            // Té advertències adequades
  recommendsProfessionals: boolean;   // Recomana consultar professionals
  notLegalAdvice: boolean;            // Deixa clar que no és assessorament legal
}

export interface AIActComplianceResult {
  compliance: AIActCompliance;
  score: number;                      // 0-100
  aiActCompliant: boolean;            // true si score >= 80
  warnings: string[];                 // Advertències generades
}

/**
 * Verifica el compliment amb l'AI Act d'una resposta generada
 * @param response Text de la resposta generada per IA
 * @returns Resultat de la validació amb score i advertències
 */
export function checkAIActCompliance(response: string): AIActComplianceResult {
  const normalizedResponse = response.toLowerCase();

  // 1. Divulgació d'IA (25 punts)
  const disclosesAI = checkDisclosesAI(normalizedResponse);

  // 2. Menció del model (20 punts)
  const mentionsModel = checkMentionsModel(normalizedResponse);

  // 3. Advertències sobre limitacions (20 punts)
  const hasDisclaimers = checkHasDisclaimers(normalizedResponse);

  // 4. Recomanació de supervisió humana (20 punts)
  const recommendsProfessionals = checkRecommendsProfessionals(normalizedResponse);

  // 5. Clarificació que no és assessorament legal (15 punts)
  const notLegalAdvice = checkNotLegalAdvice(normalizedResponse);

  const compliance: AIActCompliance = {
    disclosesAI,
    mentionsModel,
    hasDisclaimers,
    recommendsProfessionals,
    notLegalAdvice,
  };

  const score = calculateAIActComplianceScore(compliance);
  const aiActCompliant = score >= 80;
  const warnings = generateWarnings(compliance);

  return {
    compliance,
    score,
    aiActCompliant,
    warnings,
  };
}

/**
 * Verifica que la resposta indica explícitament que ha estat generada per IA
 */
function checkDisclosesAI(text: string): boolean {
  const aiPatterns = [
    'ia',
    'intel·ligència artificial',
    'artificial intelligence',
    'generat',
    'generada',
    'generat per',
    'generada per',
    'cursor',
    'openai',
    'gpt',
    'model',
    'assistent digital',
    'assistent jurídic digital',
  ];

  return aiPatterns.some(pattern => text.includes(pattern));
}

/**
 * Verifica que es menciona el model o proveïdor utilitzat
 */
function checkMentionsModel(text: string): boolean {
  const modelPatterns = [
    'groq',
    'llama-3.3',
    'llama-3',
    'llama',
    'mistral',
    'mistral-7b',
    'hugging face',
    'model d\'ia',
    'model d\'intel·ligència artificial',
    'intel·ligència artificial',
  ];

  return modelPatterns.some(pattern => text.includes(pattern));
}

/**
 * Verifica que la resposta inclou advertències adequades sobre limitacions
 */
function checkHasDisclaimers(text: string): boolean {
  const disclaimerTerms = [
    'orientatiu',
    'orientativa',
    'aproximació',
    'pot contenir errors',
    'limitacions',
    'no garanteix',
    'sense garantia',
    'avís',
    'advertència',
    'recorda',
    'important',
    'cal tenir en compte',
    'podria contenir',
    'no constitueix',
  ];

  return disclaimerTerms.some(term => text.includes(term));
}

/**
 * Verifica que es recomana consultar professionals (supervisió humana)
 */
function checkRecommendsProfessionals(text: string): boolean {
  const professionalPatterns = [
    'consulta',
    'consulteu',
    'recomana',
    'recomanem',
    'professional',
    'advocat',
    'notari',
    'assessor',
    'jurista',
    'expert',
    'consulta professional',
    'professional consulta',
    'adreça professional',
    'professionals titulats',
    'professionals col·legiats',
  ];

  return professionalPatterns.some(pattern => text.includes(pattern));
}

/**
 * Verifica que la resposta deixa clar que no constitueix assessorament legal
 */
function checkNotLegalAdvice(text: string): boolean {
  const notLegalAdvicePatterns = [
    'no assessorament',
    'no constitueix assessorament',
    'no substitueix assessorament',
    'no és assessorament',
    'orientatiu',
    'orientativa',
    'divulgatiu',
    'acadèmic',
    'recerca',
    'finalitat acadèmica',
    'no constitueix',
  ];

  return notLegalAdvicePatterns.some(pattern => text.includes(pattern));
}

/**
 * Calcula el score de compliment de l'AI Act (0-100 punts)
 */
export function calculateAIActComplianceScore(compliance: AIActCompliance): number {
  let score = 0;

  if (compliance.disclosesAI) score += 25;
  if (compliance.mentionsModel) score += 20;
  if (compliance.hasDisclaimers) score += 20;
  if (compliance.recommendsProfessionals) score += 20;
  if (compliance.notLegalAdvice) score += 15;

  return score;
}

/**
 * Genera advertències específiques quan alguna verificació falla
 */
function generateWarnings(compliance: AIActCompliance): string[] {
  const warnings: string[] = [];

  if (!compliance.disclosesAI) {
    warnings.push(
      'La resposta no indica explícitament que ha estat generada per intel·ligència artificial (requisit AI Act).'
    );
  }

  if (!compliance.mentionsModel) {
    warnings.push(
      'La resposta no menciona el model o proveïdor d\'IA utilitzat (recomanat per AI Act).'
    );
  }

  if (!compliance.hasDisclaimers) {
    warnings.push(
      'La resposta no inclou advertències adequades sobre limitacions (requisit AI Act).'
    );
  }

  if (!compliance.recommendsProfessionals) {
    warnings.push(
      'La resposta no recomana consultar professionals (requisit AI Act - supervisió humana).'
    );
  }

  if (!compliance.notLegalAdvice) {
    warnings.push(
      'La resposta no deixa clar que no constitueix assessorament legal (requisit AI Act).'
    );
  }

  return warnings;
}

/**
 * Genera instruccions de prompt per garantir el compliment amb l'AI Act
 */
export function getAIActCompliancePrompt(): string {
  // Detecta quin model s'està utilitzant basant-se en les variables d'entorn
  let modelInfo = 'una IA';
  let modelProvider = '';
  
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.startsWith('gsk_')) {
    modelInfo = 'una IA (Llama-3.3-70B-Versatile)';
    modelProvider = 'Llama-3.3-70B-Versatile de Groq, Inc.';
  } else if (process.env.HUGGINGFACE_API_KEY) {
    modelInfo = 'una IA (Mistral-7B-Instruct-v0.3)';
    modelProvider = 'Mistral-7B-Instruct-v0.3 de Mistral AI via Hugging Face';
  } else {
    modelInfo = 'una IA';
    modelProvider = 'model d\'intel·ligència artificial';
  }

  return `TRANSPARÈNCIA (AI Act - Reglament UE 2024/1689):
- Indica explícitament que ets ${modelInfo}
- Menciona el model utilitzat (${modelProvider})
- Inclou advertències sobre limitacions (informació orientativa, pot contenir errors)
- Recomana consultar professionals titulats (advocats, notaris) per casos específics
- Deixa clar que la informació és orientativa i no constitueix assessorament legal professional`;
}

/**
 * Sistema de validació de llenguatge planer (guardrail)
 * Avaluació a posteriori de la resposta generada segons els criteris de llenguatge planer
 */

export interface PlainLanguageResult {
  score: number;                      // 0-100
  compliant: boolean;                 // true si score >= 70
  issues: string[];                   // Problemes detectats
}

/**
 * Verifica si una resposta generada segueix els principis de llenguatge planer
 * Utilitza una crida a IA per avaluar la resposta segons els criteris de la Guia de Català Jurídic
 * 
 * @param response Text de la resposta generada per IA
 * @returns Resultat de la validació amb score i incidències
 */
export async function checkPlainLanguage(
  response: string
): Promise<PlainLanguageResult> {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey || !groqApiKey.startsWith('gsk_')) {
    return {
      score: 50,
      compliant: false,
      issues: ['No es pot validar: falta GROQ_API_KEY'],
    };
  }

  try {
    const evaluationPrompt = `Avalua aquest text segons els principis de llenguatge planer (català jurídic):

CRITERIS D'AVALUACIÓ:
1. Claredat: Evita arcaismes (vers, ensems, nogensmenys, àdhuc). Utilitza paraules comunes i comprensibles.
2. Concisió: Evita verbs buits (efectuar, procedir a, dur a terme) i fórmules redundants.
3. Frases: Frases breus i simples amb ordre lògic (subjecte + verb + complements).
4. Veu activa: Preferència per la veu activa sobre la passiva.
5. Paraules complexes: Evita cultismes innecessaris i terminologia excessivament tècnica quan no cal.

Text a avaluar:
"""
${response}
"""

Respon ÚNICAMENT en format JSON estrictament vàlid amb aquesta estructura:
{
  "score": 85,
  "issues": ["Problema 1", "Problema 2"]
}

Punts clau:
- Score: 0-100 (100 = perfecte llenguatge planer)
- Issues: Array de problemes específics detectats (si n'hi ha, array buit [] si no n'hi ha)`;

    const apiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'Ets un expert en llenguatge planer i català jurídic. Avalua texts segons els criteris de claredat, concisió i accessibilitat. Respon sempre en format JSON vàlid.',
          },
          {
            role: 'user',
            content: evaluationPrompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
        response_format: { type: 'json_object' },
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('Error Groq API (plain language check):', apiResponse.status, errorText);
      return {
        score: 50,
        compliant: false,
        issues: [`Error en la validació: ${apiResponse.status}`],
      };
    }

    const data = await apiResponse.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return {
        score: 50,
        compliant: false,
        issues: ['Resposta buida de la API'],
      };
    }

    let evaluation;
    try {
      evaluation = JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsejant JSON de validació:', parseError);
      return {
        score: 50,
        compliant: false,
        issues: ['Error al parsejar la resposta de validació'],
      };
    }

    const score = typeof evaluation.score === 'number' ? evaluation.score : 50;
    const issues = Array.isArray(evaluation.issues) ? evaluation.issues : [];

    return {
      score,
      compliant: score >= 70,
      issues,
    };
  } catch (error) {
    console.error('Error en checkPlainLanguage:', error);
    return {
      score: 50,
      compliant: false,
      issues: [`Error inesperat: ${error instanceof Error ? error.message : 'Unknown error'}`],
    };
  }
}

/**
 * Sistema de validació de referències d'articles a la jurisprudència (guardrail crític)
 * Això NO POT FALLAR MAI - validació estricta de que els articles mencionats existeixin
 */

export interface ArticleValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  validatedArticles: string[];
}

/**
 * Valida que tots els articles mencionats en una sentència de jurisprudència existeixin
 * Aquesta validació és CRÍTICA i no pot fallar mai
 * 
 * @param sentenciaId - ID de la sentència que es valida
 * @param articleIds - Array d'IDs d'articles mencionats a la sentència
 * @param validateArticleId - Funció que valida si un article ID existeix (importada de article-helpers)
 * @returns Resultat de la validació amb errors i warnings
 */
export function validateJurisprudenciaArticles(
  sentenciaId: string,
  articleIds: string[],
  validateArticleId: (id: string) => boolean
): ArticleValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const validatedArticles: string[] = [];

  if (!articleIds || articleIds.length === 0) {
    warnings.push(`La sentència ${sentenciaId} no té articles associats`);
    return {
      isValid: true, // No és un error si no hi ha articles
      errors: [],
      warnings,
      validatedArticles: [],
    };
  }

  for (const articleId of articleIds) {
    if (!articleId || typeof articleId !== 'string' || articleId.trim() === '') {
      errors.push(`La sentència ${sentenciaId} conté un article ID buit o invàlid`);
      continue;
    }

    const trimmedId = articleId.trim();

    if (validateArticleId(trimmedId)) {
      validatedArticles.push(trimmedId);
    } else {
      errors.push(
        `La sentència ${sentenciaId} fa referència a l'article "${trimmedId}" que NO EXISTEIX a la base de dades`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    validatedArticles,
  };
}

/**
 * Validació en batch de múltiples sentències
 * 
 * @param sentencies - Array de sentències a validar (amb id i articles_afectats)
 * @param validateArticleId - Funció que valida si un article ID existeix
 * @returns Resultat agregat de totes les validacions
 */
export function validateAllJurisprudenciaArticles(
  sentencies: Array<{ id: string; articles_afectats: string[] }>,
  validateArticleId: (id: string) => boolean
): {
  totalSentencies: number;
  validSentencies: number;
  invalidSentencies: number;
  allErrors: string[];
  allWarnings: string[];
} {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  let validSentencies = 0;
  let invalidSentencies = 0;

  for (const sentencia of sentencies) {
    const validation = validateJurisprudenciaArticles(
      sentencia.id,
      sentencia.articles_afectats,
      validateArticleId
    );

    if (validation.isValid) {
      validSentencies++;
    } else {
      invalidSentencies++;
    }

    allErrors.push(...validation.errors);
    allWarnings.push(...validation.warnings);
  }

  return {
    totalSentencies: sentencies.length,
    validSentencies,
    invalidSentencies,
    allErrors,
    allWarnings,
  };
}
