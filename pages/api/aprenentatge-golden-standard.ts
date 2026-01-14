/**
 * API Endpoint per executar validació i aprenentatge amb Golden Standard
 * 
 * POST /api/aprenentatge-golden-standard
 * 
 * Executa:
 * 1. Validació de totes les preguntes Golden Standard
 * 2. Detecció d'errors recurrents
 * 3. Generació de millores automàtiques
 * 4. Generació de recomanacions per actualitzar prompts
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { validarTotesLesPreguntes, ResultatValidacio } from '../../lib/evaluacio/validar-golden-standard';
import { executarAprenentatgeAutomatic, AprenentatgeResultat } from '../../lib/aprenentatge/aprenentatge-automatic';
import { preguntesGoldenStandard } from '../../data/preguntes-golden-standard';
import { PreguntaControl } from '../../data/preguntes-control';

// Funció helper per obtenir resposta del sistema per a una pregunta
async function obtenirRespostaSistema(pregunta: PreguntaControl): Promise<string> {
  try {
    // Utilitzar el sistema de chat unificat per obtenir resposta
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/unified-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: pregunta.pregunta,
        history: []
      })
    });

    if (!response.ok) {
      throw new Error(`Error obtenint resposta: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || data.answer || '';
  } catch (error) {
    console.error(`Error obtenint resposta per pregunta ${pregunta.id}:`, error);
    return '';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Mètode no permès' });
  }

  try {
    const { mode = 'validacio' } = req.body; // 'validacio' | 'aprenentatge' | 'complet'

    if (mode === 'validacio' || mode === 'complet') {
      console.log('🔍 Iniciant validació amb Golden Standard...');

      // Pas 1: Validar totes les preguntes
      const validacio = await validarTotesLesPreguntes(obtenirRespostaSistema);

      console.log(`✅ Validació completada:`);
      console.log(`   - Total preguntes: ${validacio.resum.totals}`);
      console.log(`   - Vàlides: ${validacio.resum.valides}`);
      console.log(`   - Invàlides: ${validacio.resum.invalides}`);
      console.log(`   - Score mitjà: ${validacio.resum.scoreMitja.toFixed(1)}%`);

      if (mode === 'validacio') {
        return res.status(200).json({
          mode: 'validacio',
          validacio,
          timestamp: new Date().toISOString()
        });
      }
    }

    if (mode === 'aprenentatge' || mode === 'complet') {
      console.log('🎓 Iniciant aprenentatge automàtic...');

      // Pas 2: Executar aprenentatge automàtic
      const aprenentatge = await executarAprenentatgeAutomatic(obtenirRespostaSistema);

      console.log(`✅ Aprenentatge completat:`);
      console.log(`   - Lliçons apreses: ${aprenentatge.lliçonsApreses.length}`);
      console.log(`   - Millores de prompts: ${aprenentatge.milloresPrompts.length}`);
      console.log(`   - Prompts actualitzats: ${Object.keys(aprenentatge.promptsActualitzats).length}`);

      if (mode === 'aprenentatge') {
        return res.status(200).json({
          mode: 'aprenentatge',
          aprenentatge,
          timestamp: new Date().toISOString()
        });
      }

      // Mode complet: retornar tot
      const validacio = await validarTotesLesPreguntes(obtenirRespostaSistema);

      return res.status(200).json({
        mode: 'complet',
        validacio,
        aprenentatge,
        resum: {
          errorsDetectats: validacio.resum.errorsFreqüents.length,
          lliçonsGenerades: aprenentatge.lliçonsApreses.length,
          milloresGenerades: aprenentatge.milloresPrompts.length,
          promptsActualitzats: Object.keys(aprenentatge.promptsActualitzats).length
        },
        timestamp: new Date().toISOString()
      });
    }

    return res.status(400).json({
      error: 'Mode invàlid. Utilitza: "validacio", "aprenentatge" o "complet"'
    });

  } catch (error: any) {
    console.error('Error en aprenentatge-golden-standard:', error);
    return res.status(500).json({
      error: error.message || 'S\'ha produït un error inesperat',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
