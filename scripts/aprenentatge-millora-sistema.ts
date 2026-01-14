/**
 * Script per executar totes les preguntes de control, analitzar resultats
 * i generar millores per al sistema de xat i interpretació
 * 
 * Ús: npx ts-node scripts/aprenentatge-millora-sistema.ts
 */

import { preguntesControl } from '../data/preguntes-control';
import { avaluarResposta, generarInformeAvaluacio, type ResultatAvaluacio } from '../lib/evaluacio/preguntes-control';
import { analitzarResultats, generarMilloresPrompt, type AnalisiAvaluacio } from '../lib/aprenentatge/millora-prompts';
import * as fs from 'fs';
import * as path from 'path';

const API_URL = process.env.API_URL || 'http://localhost:3000';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY no està configurada');
  process.exit(1);
}

interface ApiResponse {
  response: string;
  sources?: Array<{
    id: string;
    title: string;
    score?: number;
  }>;
  error?: string;
}

async function executarPregunta(pregunta: any, index: number, total: number): Promise<ResultatAvaluacio> {
  console.log(`\n[${index + 1}/${total}] 📋 ${pregunta.pregunta.substring(0, 80)}...`);
  
  try {
    const response = await fetch(`${API_URL}/api/unified-chat`, {
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const resultat = avaluarResposta(
      pregunta,
      data.response || '',
      data.sources || []
    );

    const icon = resultat.valid ? '✅' : '❌';
    console.log(`   ${icon} Score: ${resultat.scoreGlobal.toFixed(1)}/100 | Articles: ${resultat.articlesCorrectes?.length || 0}/${resultat.articlesEsperats.length} | Paraules: ${resultat.paraulesClauTrobades.length}/${resultat.paraulesClauEsperades.length}`);

    return resultat;
  } catch (error) {
    console.error(`   ❌ Error: ${error instanceof Error ? error.message : 'Error desconegut'}`);
    
    return avaluarResposta(
      pregunta,
      `ERROR: ${error instanceof Error ? error.message : 'Error desconegut'}`,
      []
    );
  }
}

async function main() {
  console.log('🚀 Sistema d\'Aprenentatge i Millora');
  console.log('=====================================\n');
  console.log(`📊 Total preguntes: ${preguntesControl.length}`);
  console.log(`🌐 API URL: ${API_URL}\n`);

  const resultats: ResultatAvaluacio[] = [];
  
  // Executar totes les preguntes
  console.log('📝 Executant preguntes de control...\n');
  
  for (let i = 0; i < preguntesControl.length; i++) {
    const pregunta = preguntesControl[i];
    const resultat = await executarPregunta(pregunta, i, preguntesControl.length);
    resultats.push(resultat);
    
    // Pausa per no sobrecarregar
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Generar informe
  console.log('\n📊 Generant informe d\'avaluació...');
  const informe = generarInformeAvaluacio(resultats);

  // Analitzar resultats
  console.log('🔍 Analitzant resultats i generant recomanacions...\n');
  const analisi = analitzarResultats(informe);

  // Mostrar resum
  console.log('='.repeat(70));
  console.log('📊 RESUM DE L\'AVALUACIÓ');
  console.log('='.repeat(70));
  console.log(`\n✅ Preguntes vàlides: ${informe.preguntesValides}/${informe.totalPreguntes} (${(informe.preguntesValides / informe.totalPreguntes * 100).toFixed(1)}%)`);
  console.log(`❌ Preguntes invàlides: ${informe.preguntesInvalides}/${informe.totalPreguntes}`);
  console.log(`📈 Score mitjà: ${informe.scoreMitja.toFixed(1)}/100\n`);

  // Mostrar punts forts
  if (analisi.puntsFortes.length > 0) {
    console.log('✅ Punts forts:');
    analisi.puntsFortes.forEach(punt => console.log(`   • ${punt}`));
    console.log();
  }

  // Mostrar punts febles
  if (analisi.puntsFebles.length > 0) {
    console.log('⚠️  Punts febles:');
    analisi.puntsFebles.forEach(punt => console.log(`   • ${punt}`));
    console.log();
  }

  // Mostrar recomanacions
  if (analisi.recomanacions.length > 0) {
    console.log('💡 Recomanacions de millora:');
    analisi.recomanacions.forEach((rec, i) => {
      console.log(`\n   ${i + 1}. [${rec.prioritat.toUpperCase()}] ${rec.tipus} - ${rec.area}`);
      console.log(`      Problema: ${rec.problema}`);
      console.log(`      Recomanació: ${rec.recomanacio}`);
      if (rec.evidencia.length > 0) {
        console.log(`      Evidència: ${rec.evidencia.slice(0, 2).join('; ')}`);
      }
    });
    console.log();
  }

  // Generar millores de prompts
  const millores = generarMilloresPrompt(analisi);

  // Guardar resultats
  const outputDir = path.join(process.cwd(), 'aprenentatge');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // Guardar informe complet
  const informePath = path.join(outputDir, `informe-avaluacio-${timestamp}.json`);
  fs.writeFileSync(informePath, JSON.stringify({
    informe,
    analisi,
    millores
  }, null, 2), 'utf-8');
  console.log(`💾 Informe complet guardat a: ${informePath}`);

  // Guardar recomanacions de millora
  const recomanacionsPath = path.join(outputDir, `recomanacions-millora-${timestamp}.md`);
  const recomanacionsMarkdown = `# Recomanacions de Millora del Sistema
Generat: ${new Date().toISOString()}

## Resum Executiu
- **Score mitjà**: ${informe.scoreMitja.toFixed(1)}/100
- **Preguntes vàlides**: ${informe.preguntesValides}/${informe.totalPreguntes} (${(informe.preguntesValides / informe.totalPreguntes * 100).toFixed(1)}%)
- **Total recomanacions**: ${analisi.recomanacions.length}

## Punts Forts
${analisi.puntsFortes.map(p => `- ${p}`).join('\n')}

## Punts Febles
${analisi.puntsFebles.map(p => `- ${p}`).join('\n')}

## Recomanacions Detallades

${analisi.recomanacions.map((rec, i) => `
### ${i + 1}. ${rec.tipus.toUpperCase()} - ${rec.area.toUpperCase()} [${rec.prioritat}]

**Problema**: ${rec.problema}

**Recomanació**: ${rec.recomanacio}

**Evidència**:
${rec.evidencia.map(e => `- ${e}`).join('\n')}
`).join('\n')}

## Millores de Prompts

### Prompt Chat Millorat
\`\`\`
${millores.promptChatMillorat || 'No hi ha millores específiques suggerides'}
\`\`\`

### Prompt Interpretació Millorat
\`\`\`
${millores.promptInterpretacioMillorat || 'No hi ha millores específiques suggerides'}
\`\`\`
`;

  fs.writeFileSync(recomanacionsPath, recomanacionsMarkdown, 'utf-8');
  console.log(`💾 Recomanacions guardades a: ${recomanacionsPath}`);

  // Generar resum per consola
  console.log('\n' + '='.repeat(70));
  console.log('📋 RESUM DE RECOMANACIONS');
  console.log('='.repeat(70));
  
  const recomanacionsAlta = analisi.recomanacions.filter(r => r.prioritat === 'alta');
  if (recomanacionsAlta.length > 0) {
    console.log(`\n🔴 Recomanacions d'alta prioritat (${recomanacionsAlta.length}):`);
    recomanacionsAlta.forEach(rec => {
      console.log(`   • ${rec.tipus} - ${rec.area}: ${rec.problema}`);
    });
  }

  const recomanacionsMitjana = analisi.recomanacions.filter(r => r.prioritat === 'mitjana');
  if (recomanacionsMitjana.length > 0) {
    console.log(`\n🟡 Recomanacions de mitjana prioritat (${recomanacionsMitjana.length}):`);
    recomanacionsMitjana.forEach(rec => {
      console.log(`   • ${rec.tipus} - ${rec.area}: ${rec.problema}`);
    });
  }

  console.log('\n✅ Anàlisi completada. Revisa els fitxers generats per implementar les millores.');
  
  // Exit code
  const exitCode = informe.scoreMitja >= 70 ? 0 : 1;
  process.exit(exitCode);
}

main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
