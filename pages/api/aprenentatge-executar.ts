/**
 * API endpoint per executar totes les preguntes de control
 * i generar recomanacions de millora
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { preguntesControl } from '@/data/preguntes-control';
import { avaluarResposta, generarInformeAvaluacio } from '@/lib/evaluacio/preguntes-control';
import { analitzarResultats, generarMilloresPrompt } from '@/lib/aprenentatge/millora-prompts';

interface AprenentatgeResponse {
  informe?: any;
  analisi?: any;
  millores?: any;
  error?: string;
  progress?: {
    current: number;
    total: number;
    pregunta: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AprenentatgeResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { executarTotes } = req.body;

  if (!executarTotes) {
    return res.status(400).json({ error: 'Cal especificar executarTotes=true' });
  }

  try {
    const resultats: any[] = [];
    const totalPreguntes = preguntesControl.length;

    // Executar totes les preguntes
    for (let i = 0; i < preguntesControl.length; i++) {
      const pregunta = preguntesControl[i];

      try {
        // Cridar l'API del chatbot
        const chatResponse = await fetch(`${req.headers.origin || 'http://localhost:3000'}/api/unified-chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: pregunta.pregunta,
            conversationHistory: [],
            maxTokens: 1000,
            temperature: 0.7
          })
        });

        if (!chatResponse.ok) {
          const errorData = await chatResponse.json();
          throw new Error(errorData.error || `HTTP ${chatResponse.status}`);
        }

        const chatData = await chatResponse.json();

        const resultat = avaluarResposta(
          pregunta,
          chatData.response || '',
          chatData.sources || []
        );

        resultats.push(resultat);

        // Petita pausa per no sobrecarregar
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        // Si falla una pregunta, continuem amb les altres
        console.error(`Error executant pregunta ${pregunta.id}:`, error);
        const resultat = avaluarResposta(
          pregunta,
          `ERROR: ${error instanceof Error ? error.message : 'Error desconegut'}`,
          []
        );
        resultats.push(resultat);
      }
    }

    // Generar informe
    const informe = generarInformeAvaluacio(resultats);

    // Analitzar resultats
    const analisi = analitzarResultats(informe);

    // Generar millores
    const millores = generarMilloresPrompt(analisi);

    return res.status(200).json({
      informe,
      analisi,
      millores
    });
  } catch (error: any) {
    console.error('Error en aprenentatge-executar:', error);
    return res.status(500).json({
      error: error.message || 'S\'ha produït un error inesperat'
    });
  }
}
