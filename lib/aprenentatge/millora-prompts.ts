/**
 * Sistema d'aprenentatge per millorar els prompts basat en resultats d'avaluació
 */

import type { ResultatAvaluacio, InformeAvaluacio } from '../evaluacio/preguntes-control';

export interface RecomanacioMillora {
  tipus: 'prompt' | 'context' | 'temperatura' | 'tokens' | 'estructura';
  area: 'chat' | 'interpretacio';
  problema: string;
  recomanacio: string;
  prioritat: 'alta' | 'mitjana' | 'baixa';
  evidencia: string[];
}

export interface AnalisiAvaluacio {
  puntsFortes: string[];
  puntsFebles: string[];
  recomanacions: RecomanacioMillora[];
  milloresPromptChat: string[];
  milloresPromptInterpretacio: string[];
}

/**
 * Analitzar resultats d'avaluació i generar recomanacions
 */
export function analitzarResultats(informe: InformeAvaluacio): AnalisiAvaluacio {
  const puntsFortes: string[] = [];
  const puntsFebles: string[] = [];
  const recomanacions: RecomanacioMillora[] = [];
  const milloresPromptChat: string[] = [];
  const milloresPromptInterpretacio: string[] = [];

  // Analitzar score global
  if (informe.scoreMitja >= 80) {
    puntsFortes.push(`Score mitjà excel·lent: ${informe.scoreMitja.toFixed(1)}/100`);
  } else if (informe.scoreMitja >= 70) {
    puntsFortes.push(`Score mitjà acceptable: ${informe.scoreMitja.toFixed(1)}/100`);
  } else {
    puntsFebles.push(`Score mitjà baix: ${informe.scoreMitja.toFixed(1)}/100 (objectiu: ≥70)`);
  }

  // Analitzar per categoria
  Object.keys(informe.perCategoria).forEach(categoria => {
    const data = informe.perCategoria[categoria];
    const percentatge = (data.valides / data.total) * 100;
    
    if (percentatge < 70) {
      puntsFebles.push(`${categoria}: només ${data.valides}/${data.total} vàlides (${percentatge.toFixed(1)}%)`);
      
      recomanacions.push({
        tipus: 'prompt',
        area: 'chat',
        problema: `Baix rendiment en preguntes de categoria "${categoria}"`,
        recomanacio: `Millorar el prompt per donar més èmfasi a aspectes relacionats amb ${categoria}. Afegir exemples específics d'aquesta categoria.`,
        prioritat: percentatge < 50 ? 'alta' : 'mitjana',
        evidencia: informe.resultats
          .filter(r => r.categoria === categoria && !r.valid)
          .slice(0, 3)
          .map(r => `Pregunta ${r.preguntaId}: score ${r.scoreGlobal.toFixed(1)}`)
      });
    } else {
      puntsFortes.push(`${categoria}: ${data.valides}/${data.total} vàlides (${percentatge.toFixed(1)}%)`);
    }
  });

  // Analitzar per dificultat
  Object.keys(informe.perDificultat).forEach(dificultat => {
    const data = informe.perDificultat[dificultat];
    const percentatge = (data.valides / data.total) * 100;
    
    if (percentatge < 70 && dificultat === 'alta') {
      puntsFebles.push(`Dificultat ${dificultat}: només ${data.valides}/${data.total} vàlides`);
      
      recomanacions.push({
        tipus: 'context',
        area: 'chat',
        problema: `Dificultat per respondre preguntes complexes`,
        recomanacio: 'Augmentar el nombre de context chunks recuperats per preguntes complexes. Millorar la recuperació semàntica per trobar més informació relacionada.',
        prioritat: 'alta',
        evidencia: informe.resultats
          .filter(r => r.dificultat === dificultat && !r.valid)
          .slice(0, 3)
          .map(r => `Pregunta ${r.preguntaId}: score ${r.scoreGlobal.toFixed(1)}`)
      });
    }
  });

  // Analitzar problemes específics
  const resultatsAmbErrors = informe.resultats.filter(r => r.errors.length > 0);
  if (resultatsAmbErrors.length > 0) {
    puntsFebles.push(`${resultatsAmbErrors.length} preguntes amb errors crítics`);
    
    // Analitzar tipus d'errors
    const errorsArticles = resultatsAmbErrors.filter(r => 
      r.errors.some(e => e.includes('article'))
    );
    
    if (errorsArticles.length > 0) {
      recomanacions.push({
        tipus: 'context',
        area: 'chat',
        problema: `${errorsArticles.length} preguntes no troben els articles esperats`,
        recomanacio: 'Millorar la recuperació de context per assegurar que es troben els articles correctes. Revisar els embeddings i la cerca semàntica.',
        prioritat: 'alta',
        evidencia: errorsArticles.slice(0, 5).map(r => 
          `Pregunta ${r.preguntaId}: esperats ${r.articlesEsperats.join(', ')}, trobats ${r.articlesTrobats.join(', ') || 'cap'}`
        )
      });
    }
  }

  // Analitzar problemes amb paraules clau
  const resultatsBaixaParaulesClau = informe.resultats.filter(r => r.scoreParaulesClau < 50);
  if (resultatsBaixaParaulesClau.length > informe.totalPreguntes * 0.2) {
    puntsFebles.push(`${resultatsBaixaParaulesClau.length} preguntes no utilitzen les paraules clau esperades`);
    
    recomanacions.push({
      tipus: 'prompt',
      area: 'chat',
      problema: 'Les respostes no utilitzen el vocabulari jurídic esperat',
      recomanacio: 'Afegir al prompt instruccions explícites per utilitzar terminologia jurídica específica. Incloure exemples de paraules clau que s\'han d\'utilitzar.',
      prioritat: 'mitjana',
      evidencia: resultatsBaixaParaulesClau.slice(0, 5).map(r => 
        `Pregunta ${r.preguntaId}: esperades ${r.paraulesClauEsperades.slice(0, 3).join(', ')}, trobades ${r.paraulesClauTrobades.slice(0, 3).join(', ') || 'cap'}`
      )
    });
  }

  // Analitzar problemes amb paraules prohibides
  const resultatsParaulesProhibides = informe.resultats.filter(r => r.paraulesProhibidesTrobades.length > 0);
  if (resultatsParaulesProhibides.length > 0) {
    puntsFebles.push(`${resultatsParaulesProhibides.length} preguntes contenen paraules prohibides`);
    
    recomanacions.push({
      tipus: 'prompt',
      area: 'chat',
      problema: 'Les respostes contenen informació incorrecta o no desitjada',
      recomanacio: 'Afegir al prompt una llista explícita de termes o conceptes que NO s\'han d\'utilitzar. Reforçar la verificació de la informació.',
      prioritat: 'alta',
      evidencia: resultatsParaulesProhibides.slice(0, 5).map(r => 
        `Pregunta ${r.preguntaId}: paraules prohibides trobades: ${r.paraulesProhibidesTrobades.join(', ')}`
      )
    });
  }

  // Generar millores específiques per als prompts
  if (informe.scoreMitja < 70) {
    milloresPromptChat.push(
      'Afegir instruccions més explícites per citar sempre els articles de la Constitució quan es faci referència a ells',
      'Millorar les instruccions per utilitzar terminologia jurídica precisa',
      'Afegir exemples de respostes bones i dolentes per guiar el model'
    );
  }

  // Analitzar problemes específics de recuperació
  const resultatsSenseArticles = informe.resultats.filter(r => r.articlesTrobats.length === 0);
  if (resultatsSenseArticles.length > informe.totalPreguntes * 0.1) {
    milloresPromptChat.push(
      'Millorar la recuperació de context: augmentar el nombre de chunks recuperats per pregunta',
      'Afegir cerca per número d\'article directa quan es detecti una pregunta sobre un article específic'
    );
  }

  return {
    puntsFortes,
    puntsFebles,
    recomanacions,
    milloresPromptChat,
    milloresPromptInterpretacio
  };
}

/**
 * Generar millores de prompt basades en l'anàlisi
 */
export function generarMilloresPrompt(analisi: AnalisiAvaluacio): {
  promptChatMillorat: string;
  promptInterpretacioMillorat: string;
} {
  let promptChatMillorat = '';
  let promptInterpretacioMillorat = '';

  // Millores per al prompt del chat
  const milloresChat: string[] = [];
  
  if (analisi.recomanacions.some(r => r.problema.includes('paraules clau'))) {
    milloresChat.push(
      'IMPORTANT: Utilitza sempre la terminologia jurídica precisa i específica de la Constitució d\'Andorra.',
      'Quan expliquis conceptes, utilitza els termes exactes que apareixen a la Constitució.'
    );
  }

  if (analisi.recomanacions.some(r => r.problema.includes('articles'))) {
    milloresChat.push(
      'SEMPRE cita els articles de la Constitució quan facis referència a ells. Format: "Article X de la Constitució d\'Andorra".',
      'Si el context proporcionat conté informació sobre un article específic, explica\'l detalladament i cita\'l correctament.'
    );
  }

  if (analisi.recomanacions.some(r => r.problema.includes('paraules prohibides'))) {
    milloresChat.push(
      'Verifica que la teva resposta no conté informació incorrecta o contradictòria.',
      'Si no estàs segur d\'alguna informació, indica-ho clarament en lloc de suposar.'
    );
  }

  promptChatMillorat = milloresChat.join('\n');

  // Millores per al prompt d'interpretació
  const milloresInterpretacio: string[] = [];
  
  milloresInterpretacio.push(
    'REGLA FONAMENTAL: Quan generis resums o interpretacions, NO repeteixis el text literal de la llei.',
    'Has d\'adaptar el contingut utilitzant llenguatge natural i planer, explicant amb les teves pròpies paraules què significa i què regula cada article.',
    'El text ha de ser fidel al significat però utilitzant un vocabulari i estructures diferents al text jurídic formal.'
  );

  promptInterpretacioMillorat = milloresInterpretacio.join('\n');

  return {
    promptChatMillorat,
    promptInterpretacioMillorat
  };
}
