/**
 * Millores de prompts generades per l'aprenentatge del sistema
 * Aquestes millores s'apliquen dinàmicament basant-se en els resultats d'avaluació
 */

export interface MilloresPrompt {
  chat: string[];
  interpretacio: string[];
  dataGeneracio: string;
  scoreMitja: number;
}

// Millores base que sempre s'apliquen
export const MILLORES_BASE_CHAT = [
  'SEMPRE cita els articles de la Constitució quan facis referència a ells. Format: "Article X de la Constitució d\'Andorra".',
  'Utilitza sempre la terminologia jurídica precisa i específica de la Constitució d\'Andorra.',
  'Quan expliquis conceptes, utilitza els termes exactes que apareixen a la Constitució.',
  'Si el context proporcionat conté informació sobre un article específic, explica\'l detalladament i cita\'l correctament.',
  'Verifica que la teva resposta no conté informació incorrecta o contradictòria.',
  'Si no estàs segur d\'alguna informació, indica-ho clarament en lloc de suposar.'
];

export const MILLORES_BASE_INTERPRETACIO = [
  'REGLA FONAMENTAL: Quan generis resums o interpretacions, NO repeteixis el text literal de la llei.',
  'Has d\'adaptar el contingut utilitzant llenguatge natural i planer, explicant amb les teves pròpies paraules què significa i què regula cada article.',
  'El text ha de ser fidel al significat però utilitzant un vocabulari i estructures diferents al text jurídic formal.'
];

/**
 * Aplicar millores dinàmiques basades en resultats d'avaluació
 */
export function aplicarMilloresPrompt(
  promptBase: string,
  millores: string[],
  area: 'chat' | 'interpretacio'
): string {
  if (millores.length === 0) {
    return promptBase;
  }

  const milloresText = millores.join('\n');
  
  if (area === 'chat') {
    return `${promptBase}\n\nMILLORES D'APRENENTATGE:\n${milloresText}`;
  } else {
    return `${promptBase}\n\nMILLORES D'APRENENTATGE:\n${milloresText}`;
  }
}

/**
 * Obtenir millores específiques segons problemes detectats
 */
export function obtenirMilloresPerProblema(problema: string): string[] {
  const millores: string[] = [];

  if (problema.includes('articles') || problema.includes('article')) {
    millores.push(
      'SEMPRE cita els articles de la Constitució quan facis referència a ells.',
      'Format: "Article X de la Constitució d\'Andorra".',
      'Si el context proporcionat conté informació sobre un article específic, explica\'l detalladament.'
    );
  }

  if (problema.includes('paraules clau') || problema.includes('terminologia')) {
    millores.push(
      'Utilitza sempre la terminologia jurídica precisa i específica de la Constitució d\'Andorra.',
      'Quan expliquis conceptes, utilitza els termes exactes que apareixen a la Constitució.'
    );
  }

  if (problema.includes('paraules prohibides') || problema.includes('incorrecta')) {
    millores.push(
      'Verifica que la teva resposta no conté informació incorrecta o contradictòria.',
      'Si no estàs segur d\'alguna informació, indica-ho clarament en lloc de suposar.'
    );
  }

  if (problema.includes('context') || problema.includes('recuperació')) {
    millores.push(
      'Utilitza tot el context proporcionat per donar respostes completes i precises.',
      'Si el context no conté informació suficient, indica-ho clarament.'
    );
  }

  return millores;
}
