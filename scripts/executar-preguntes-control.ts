/**
 * Script per executar les preguntes de control i generar un informe
 * 
 * Ús: npx ts-node scripts/executar-preguntes-control.ts
 */

import { preguntesControl, type PreguntaControl } from '../data/preguntes-control';
import { avaluarResposta, generarInformeAvaluacio, type ResultatAvaluacio } from '../lib/evaluacio/preguntes-control';

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

async function executarPregunta(pregunta: PreguntaControl): Promise<ResultatAvaluacio> {
  console.log(`\n📋 Executant: ${pregunta.pregunta}`);
  console.log(`   Categoria: ${pregunta.categoria}, Dificultat: ${pregunta.dificultat}`);
  
  try {
    const response = await fetch(`${API_URL}/api/unified-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: pregunta.pregunta,
        conversationHistory: [],
        maxTokens: 800,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
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

    // Mostrar resultat
    const icon = resultat.valid ? '✅' : '❌';
    console.log(`   ${icon} Score: ${resultat.scoreGlobal.toFixed(1)}/100`);
    console.log(`   Articles: ${resultat.articlesCorrectes?.length || 0}/${resultat.articlesEsperats.length}`);
    console.log(`   Paraules clau: ${resultat.paraulesClauTrobades.length}/${resultat.paraulesClauEsperades.length}`);
    
    if (resultat.warnings.length > 0) {
      console.log(`   ⚠️  Warnings: ${resultat.warnings.join('; ')}`);
    }
    
    if (resultat.errors.length > 0) {
      console.log(`   ❌ Errors: ${resultat.errors.join('; ')}`);
    }

    return resultat;
  } catch (error) {
    console.error(`   ❌ Error executant pregunta: ${error instanceof Error ? error.message : 'Error desconegut'}`);
    
    return avaluarResposta(
      pregunta,
      `ERROR: ${error instanceof Error ? error.message : 'Error desconegut'}`,
      []
    );
  }
}

async function main() {
  console.log('🚀 Iniciant avaluació amb preguntes de control\n');
  console.log(`📊 Total preguntes: ${preguntesControl.length}`);
  console.log(`🌐 API URL: ${API_URL}\n`);

  const resultats: ResultatAvaluacio[] = [];
  
  // Executar totes les preguntes
  for (let i = 0; i < preguntesControl.length; i++) {
    const pregunta = preguntesControl[i];
    console.log(`\n[${i + 1}/${preguntesControl.length}]`);
    
    const resultat = await executarPregunta(pregunta);
    resultats.push(resultat);
    
    // Petita pausa per no sobrecarregar l'API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Generar informe
  const informe = generarInformeAvaluacio(resultats);

  // Mostrar resum
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUM DE L\'AVALUACIÓ');
  console.log('='.repeat(60));
  console.log(`\n✅ Preguntes vàlides: ${informe.preguntesValides}/${informe.totalPreguntes} (${(informe.preguntesValides / informe.totalPreguntes * 100).toFixed(1)}%)`);
  console.log(`❌ Preguntes invàlides: ${informe.preguntesInvalides}/${informe.totalPreguntes}`);
  console.log(`📈 Score mitjà: ${informe.scoreMitja.toFixed(1)}/100`);

  // Mostrar per categoria
  console.log('\n📂 Per categoria:');
  Object.keys(informe.perCategoria).forEach(cat => {
    const data = informe.perCategoria[cat];
    console.log(`   ${cat}: ${data.valides}/${data.total} vàlides (score mitjà: ${data.scoreMitja.toFixed(1)})`);
  });

  // Mostrar per dificultat
  console.log('\n📊 Per dificultat:');
  Object.keys(informe.perDificultat).forEach(dif => {
    const data = informe.perDificultat[dif];
    console.log(`   ${dif}: ${data.valides}/${data.total} vàlides (score mitjà: ${data.scoreMitja.toFixed(1)})`);
  });

  // Mostrar preguntes que han fallat
  const preguntesFallides = resultats.filter(r => !r.valid);
  if (preguntesFallides.length > 0) {
    console.log('\n❌ Preguntes que han fallat:');
    preguntesFallides.forEach(r => {
      console.log(`   - ${r.preguntaId}: ${r.pregunta}`);
      console.log(`     Score: ${r.scoreGlobal.toFixed(1)}/100`);
      if (r.errors.length > 0) {
        console.log(`     Errors: ${r.errors.join(', ')}`);
      }
    });
  }

  // Guardar informe a fitxer JSON
  const fs = await import('fs');
  const path = await import('path');
  const outputPath = path.join(process.cwd(), 'informe-avaluacio.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(informe, null, 2), 'utf-8');
  console.log(`\n💾 Informe guardat a: ${outputPath}`);

  // Exit code basat en el resultat
  const exitCode = informe.scoreMitja >= 70 ? 0 : 1;
  process.exit(exitCode);
}

main().catch(error => {
  console.error('Error fatal:', error);
  process.exit(1);
});
