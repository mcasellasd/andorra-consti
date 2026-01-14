/**
 * Script de validació de la base de dades de jurisprudència
 * Valida que tots els articles mencionats existeixin i siguin correctes
 * Això NO POT FALLAR MAI - validació crítica
 */

import { jurisprudenciaDatabase } from '../data/jurisprudencia-andorra';
import { validateArticleId, validateArticleIds } from '../lib/article-helpers';
import { validateAllJurisprudenciaArticles } from '../lib/rag/quality-assessment';

/**
 * Executa la validació completa de la base de dades de jurisprudència
 */
export function validateJurisprudenciaDatabase(): {
  success: boolean;
  totalSentencies: number;
  validSentencies: number;
  invalidSentencies: number;
  errors: string[];
  warnings: string[];
} {
  console.log('🔍 Iniciant validació de la base de dades de jurisprudència...\n');

  if (jurisprudenciaDatabase.length === 0) {
    console.log('⚠️  La base de dades de jurisprudència està buida.');
    return {
      success: true,
      totalSentencies: 0,
      validSentencies: 0,
      invalidSentencies: 0,
      errors: [],
      warnings: ['La base de dades de jurisprudència està buida'],
    };
  }

  // Validar totes les sentències
  const validationResult = validateAllJurisprudenciaArticles(
    jurisprudenciaDatabase.map((sent) => ({
      id: sent.id,
      articles_afectats: sent.articles_afectats,
    })),
    validateArticleId
  );

  // Resultats detallats
  console.log(`📊 Resultats de la validació:\n`);
  console.log(`   Total de sentències: ${validationResult.totalSentencies}`);
  console.log(`   ✅ Vàlides: ${validationResult.validSentencies}`);
  console.log(`   ❌ Invàlides: ${validationResult.invalidSentencies}\n`);

  if (validationResult.allErrors.length > 0) {
    console.log('❌ ERRORS TROBATS:\n');
    validationResult.allErrors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
    console.log('');
  }

  if (validationResult.allWarnings.length > 0) {
    console.log('⚠️  AVISOS:\n');
    validationResult.allWarnings.forEach((warning, index) => {
      console.log(`   ${index + 1}. ${warning}`);
    });
    console.log('');
  }

  if (validationResult.invalidSentencies === 0) {
    console.log('✅ TOTES les sentències són vàlides!\n');
  } else {
    console.log(`❌ S'han trobat ${validationResult.invalidSentencies} sentències amb errors.\n`);
  }

  return {
    success: validationResult.invalidSentencies === 0,
    totalSentencies: validationResult.totalSentencies,
    validSentencies: validationResult.validSentencies,
    invalidSentencies: validationResult.invalidSentencies,
    errors: validationResult.allErrors,
    warnings: validationResult.allWarnings,
  };
}

/**
 * Executa la validació si es crida directament
 */
if (require.main === module) {
  const result = validateJurisprudenciaDatabase();
  process.exit(result.success ? 0 : 1);
}
