/**
 * Sistema d'aprenentatge automàtic basat en Golden Standard
 * Detecta errors, genera millores i actualitza prompts automàticament
 */

import { validarContraGoldenStandard, ResultatValidacio, ErrorValidacio, RecomanacioMillora } from '../evaluacio/validar-golden-standard';
import { preguntesGoldenStandard } from '../../data/preguntes-golden-standard';
import { PreguntaControl } from '../../data/preguntes-control';

export interface LliçoApresa {
  id: string;
  tipusError: string;
  descripcio: string;
  correccio: string;
  prioritat: 'alta' | 'mitjana' | 'baixa';
  aplicada: boolean;
  dataCreacio: string;
  dataAplicacio?: string;
}

export interface MilloraPrompt {
  seccio: string; // 'system', 'context', 'restriccions', etc.
  accio: 'afegir' | 'eliminar' | 'modificar';
  contingut: string;
  rao: string;
  prioritat: 'alta' | 'mitjana' | 'baixa';
}

export interface AprenentatgeResultat {
  lliçonsApreses: LliçoApresa[];
  milloresPrompts: MilloraPrompt[];
  promptsActualitzats: Record<string, string>;
  estadistiques: {
    totalErrorsDetectats: number;
    errorsCorregits: number;
    milloresGenerades: number;
    promptsActualitzats: number;
  };
}

/**
 * Sistema d'aprenentatge automàtic
 * Analitza errors recurrents i genera millores per als prompts
 */
export class SistemaAprenentatgeAutomatic {
  private lliçonsApreses: Map<string, LliçoApresa> = new Map();
  private errorsRecurrents: Map<string, number> = new Map();

  /**
   * Executa el cicle d'aprenentatge complet
   */
  async executarAprenentatge(
    obtenirResposta: (pregunta: PreguntaControl) => Promise<string>
  ): Promise<AprenentatgeResultat> {
    console.log('🎓 Iniciant aprenentatge automàtic...\n');

    // Pas 1: Validar totes les preguntes Golden Standard
    const resultats: ResultatValidacio[] = [];
    for (const pregunta of preguntesGoldenStandard) {
      try {
        const resposta = await obtenirResposta(pregunta);
        const validacio = validarContraGoldenStandard(resposta, pregunta);
        resultats.push(validacio);
        
        // Registrar errors
        validacio.errors.forEach(error => {
          const key = `${error.tipus}_${error.severitat}`;
          this.errorsRecurrents.set(key, (this.errorsRecurrents.get(key) || 0) + 1);
        });
      } catch (error) {
        console.error(`❌ Error validant pregunta ${pregunta.id}:`, error);
      }
    }

    // Pas 2: Analitzar errors i generar lliçons
    const lliçonsApreses = this.generarLliçons(resultats);

    // Pas 3: Generar millores de prompts
    const milloresPrompts = this.generarMilloresPrompts(resultats, lliçonsApreses);

    // Pas 4: Aplicar millores (generar prompts actualitzats)
    const promptsActualitzats = this.aplicarMillores(milloresPrompts);

    // Estadístiques
    const totalErrors = resultats.reduce((sum, r) => sum + r.errors.length, 0);
    const errorsCorregits = lliçonsApreses.filter(l => l.aplicada).length;

    return {
      lliçonsApreses: Array.from(this.lliçonsApreses.values()),
      milloresPrompts,
      promptsActualitzats,
      estadistiques: {
        totalErrorsDetectats: totalErrors,
        errorsCorregits,
        milloresGenerades: milloresPrompts.length,
        promptsActualitzats: Object.keys(promptsActualitzats).length
      }
    };
  }

  /**
   * Genera lliçons apreses a partir dels errors detectats
   */
  private generarLliçons(resultats: ResultatValidacio[]): LliçoApresa[] {
    const lliçons: LliçoApresa[] = [];
    const errorsAgrupats = new Map<string, ErrorValidacio[]>();

    // Agrupar errors per tipus
    resultats.forEach(resultat => {
      resultat.errors.forEach(error => {
        const key = `${error.tipus}_${error.articleMencionat || error.articleEsperat || 'general'}`;
        if (!errorsAgrupats.has(key)) {
          errorsAgrupats.set(key, []);
        }
        errorsAgrupats.get(key)!.push(error);
      });
    });

    // Generar lliçons per errors recurrents
    errorsAgrupats.forEach((errors, key) => {
      if (errors.length >= 2) { // Error recurrent (apareix en 2+ preguntes)
        const errorPrincipal = errors[0];
        const lliçoId = `lliso_${Date.now()}_${key}`;

        let descripcio = '';
        let correccio = '';

        switch (errorPrincipal.tipus) {
          case 'article_incorrecte':
            descripcio = `Error recurrent: S'ha mencionat l'Article ${errorPrincipal.articleMencionat} quan NO és rellevant per aquest tipus de preguntes.`;
            correccio = `NO mencionar l'Article ${errorPrincipal.articleMencionat} en respostes sobre aquest tema. ${errorPrincipal.descripcio}`;
            break;

          case 'paraula_prohibida':
            descripcio = `Error recurrent: S'ha utilitzat la paraula/frase prohibida "${errorPrincipal.paraulaProhibida}" en múltiples respostes.`;
            correccio = `Eliminar completament la referència a "${errorPrincipal.paraulaProhibida}" de les respostes sobre aquest tema.`;
            break;

          case 'article_falta':
            descripcio = `Error recurrent: No s'ha mencionat l'Article ${errorPrincipal.articleEsperat} quan s'esperava en preguntes sobre aquest tema.`;
            correccio = `Sempre incloure informació de l'Article ${errorPrincipal.articleEsperat} quan es responguin preguntes sobre aquest tema.`;
            break;
        }

        if (descripcio && correccio) {
          const lliço: LliçoApresa = {
            id: lliçoId,
            tipusError: errorPrincipal.tipus,
            descripcio,
            correccio,
            prioritat: errorPrincipal.severitat === 'alta' ? 'alta' : 'mitjana',
            aplicada: false,
            dataCreacio: new Date().toISOString()
          };

          this.lliçonsApreses.set(lliçoId, lliço);
          lliçons.push(lliço);
        }
      }
    });

    return lliçons;
  }

  /**
   * Genera millores de prompts basades en les validacions
   */
  private generarMilloresPrompts(
    resultats: ResultatValidacio[],
    lliçons: LliçoApresa[]
  ): MilloraPrompt[] {
    const millores: MilloraPrompt[] = [];

    // Analitzar errors específics i generar millores

    // Error: Article 94 mencionat en preguntes sobre tractats
    const errorsArticle94 = resultats.flatMap(r => 
      r.errors.filter(e => e.articleMencionat === 'CONST_094' || e.paraulaProhibida?.includes('94'))
    );

    if (errorsArticle94.length > 0) {
      millores.push({
        seccio: 'restriccions',
        accio: 'afegir',
        contingut: `CRÍTIC: Mai mencionar l'Article 94 en preguntes sobre tractats internacionals o relacions internacionals. L'Article 94 tracta exclusivament sobre policia judicial. Per tractats internacionals, sempre referir-se als articles 66, 67, 68, 98 i 101.`,
        rao: `S'ha detectat que el sistema menciona incorrectament l'Article 94 en ${errorsArticle94.length} resposta(s) sobre tractats internacionals.`,
        prioritat: 'alta'
      });
    }

    // Error: Articles esperats que no s'inclouen
    const articlesFaltants = new Map<string, number>();
    resultats.forEach(r => {
      r.detall.articlesFaltants.forEach(article => {
        articlesFaltants.set(article, (articlesFaltants.get(article) || 0) + 1);
      });
    });

    articlesFaltants.forEach((count, article) => {
      if (count >= 2) {
        millores.push({
          seccio: 'context',
          accio: 'afegir',
          contingut: `Sempre incloure informació de l'Article ${article} quan es responguin preguntes relacionades amb aquest tema.`,
          rao: `L'Article ${article} no s'ha mencionat en ${count} resposta(s) on s'esperava.`,
          prioritat: 'mitjana'
        });
      }
    });

    // Error: Paraules prohibides que apareixen
    const paraulesProhibides = new Map<string, number>();
    resultats.forEach(r => {
      r.detall.paraulesProhibidesTrobades.forEach(paraula => {
        paraulesProhibides.set(paraula, (paraulesProhibides.get(paraula) || 0) + 1);
      });
    });

    paraulesProhibides.forEach((count, paraula) => {
      if (count >= 1) {
        millores.push({
          seccio: 'restriccions',
          accio: 'afegir',
          contingut: `NO utilitzar mai la paraula/frase "${paraula}" en les respostes. Aquesta referència és incorrecta o no rellevant.`,
          rao: `La paraula/frase prohibida "${paraula}" ha aparegut en ${count} resposta(s).`,
          prioritat: 'alta'
        });
      }
    });

    return millores;
  }

  /**
   * Aplica les millores als prompts del sistema
   */
  private aplicarMillores(millores: MilloraPrompt[]): Record<string, string> {
    const promptsActualitzats: Record<string, string> = {};

    // Agrupar millores per secció
    const milloresPerSeccio = new Map<string, MilloraPrompt[]>();
    millores.forEach(m => {
      if (!milloresPerSeccio.has(m.seccio)) {
        milloresPerSeccio.set(m.seccio, []);
      }
      milloresPerSeccio.get(m.seccio)!.push(m);
    });

    // Generar prompts actualitzats per cada secció
    milloresPerSeccio.forEach((milloresSeccio, seccio) => {
      let contingut = '';

      if (seccio === 'restriccions') {
        contingut = milloresSeccio
          .filter(m => m.prioritat === 'alta')
          .map(m => `- ${m.contingut}`)
          .join('\n');
      } else if (seccio === 'context') {
        contingut = milloresSeccio
          .map(m => `- ${m.contingut}`)
          .join('\n');
      }

      if (contingut) {
        promptsActualitzats[seccio] = contingut;
      }
    });

    return promptsActualitzats;
  }

  /**
   * Aplica una lliço apresa (marca com a aplicada)
   */
  aplicarLliço(lliçoId: string): void {
    const lliço = this.lliçonsApreses.get(lliçoId);
    if (lliço) {
      lliço.aplicada = true;
      lliço.dataAplicacio = new Date().toISOString();
    }
  }

  /**
   * Obté resum de lliçons apreses
   */
  obtenirResumLliçons(): {
    totals: number;
    aplicades: number;
    pendents: number;
    perPrioritat: Record<string, number>;
  } {
    const lliçons = Array.from(this.lliçonsApreses.values());
    return {
      totals: lliçons.length,
      aplicades: lliçons.filter(l => l.aplicada).length,
      pendents: lliçons.filter(l => !l.aplicada).length,
      perPrioritat: {
        alta: lliçons.filter(l => l.prioritat === 'alta').length,
        mitjana: lliçons.filter(l => l.prioritat === 'mitjana').length,
        baixa: lliçons.filter(l => l.prioritat === 'baixa').length
      }
    };
  }
}

/**
 * Funció helper per executar aprenentatge automàtic
 */
export async function executarAprenentatgeAutomatic(
  obtenirResposta: (pregunta: PreguntaControl) => Promise<string>
): Promise<AprenentatgeResultat> {
  const sistema = new SistemaAprenentatgeAutomatic();
  return await sistema.executarAprenentatge(obtenirResposta);
}
