import type { NextApiRequest, NextApiResponse } from 'next';
import { preguntesControl, type PreguntaControl } from '@/data/preguntes-control';
import { avaluarResposta, generarInformeAvaluacio, type ResultatAvaluacio } from '@/lib/evaluacio/preguntes-control';
import { requireAdmin } from '@/lib/security/admin-session';
import { acquireAdminRun, releaseAdminRun } from '@/lib/security/admin-run';
import { generateInternalChatResponse } from '@/lib/services/unified-chat-internal';

interface PreguntesControlRequest {
  preguntaId?: string; // Si es proporciona, només s'executa aquesta pregunta
  categoria?: 'bàsica' | 'específica' | 'complexa' | 'edge-case';
  dificultat?: 'baixa' | 'mitjana' | 'alta';
  executarTotes?: boolean; // Si és true, executa totes les preguntes
}

interface PreguntesControlResponse {
  resultat?: ResultatAvaluacio;
  informe?: any; // InformeAvaluacio
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PreguntesControlResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!requireAdmin(req, res)) return;
  const lock = await acquireAdminRun(req, res);
  if (!lock) return;

  const { preguntaId, categoria, dificultat, executarTotes } = req.body as PreguntesControlRequest;

  try {
    // Filtrar preguntes segons paràmetres
    let preguntesAExecutar: PreguntaControl[] = [];

    if (preguntaId) {
      const pregunta = preguntesControl.find(p => p.id === preguntaId);
      if (!pregunta) {
        return res.status(404).json({ error: `Pregunta ${preguntaId} no trobada` });
      }
      preguntesAExecutar = [pregunta];
    } else if (executarTotes) {
      preguntesAExecutar = preguntesControl;
    } else {
      // Filtrar per categoria i/o dificultat
      preguntesAExecutar = preguntesControl.filter(p => {
        if (categoria && p.categoria !== categoria) return false;
        if (dificultat && p.dificultat !== dificultat) return false;
        return true;
      });
    }

    if (preguntesAExecutar.length === 0) {
      return res.status(400).json({ error: 'No s\'han trobat preguntes que coincideixin amb els criteris' });
    }

    // Si només és una pregunta, executar-la directament
    if (preguntesAExecutar.length === 1 && !executarTotes) {
      const pregunta = preguntesAExecutar[0];

      const chatData = await generateInternalChatResponse(pregunta.pregunta);

      const resultat = avaluarResposta(
        pregunta,
        chatData.response || '',
        chatData.sources || []
      );

      return res.status(200).json({ resultat });
    }

    // Si són múltiples preguntes, executar-les totes i generar informe
    const resultats: ResultatAvaluacio[] = [];

    for (const pregunta of preguntesAExecutar) {
      try {
        const chatData = await generateInternalChatResponse(pregunta.pregunta);

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

    const informe = generarInformeAvaluacio(resultats);

    return res.status(200).json({ informe });
  } catch (error: any) {
    console.error('Error en preguntes-control:', error);
    return res.status(500).json({
      error: error.message || 'S\'ha produït un error inesperat'
    });
  } finally {
    await releaseAdminRun(lock);
  }
}
