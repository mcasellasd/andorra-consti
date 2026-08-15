import { performance } from 'node:perf_hooks';
import { preguntesGoldenStandard } from '../data/preguntes-golden-standard';
import { retrieveHybridMatches } from '../lib/rag/corpus';

const requiredHitRate = Number(process.env.RAG_MIN_TOP5_HIT_RATE || '0.95');
const maximumP95Ms = Number(process.env.RAG_MAX_P95_MS || '750');

async function main() {
  const results: Array<{
  id: string;
  expected: string[];
  retrieved: string[];
  hit: boolean;
  fullCoverage: boolean;
  durationMs: number;
  }> = [];

for (const question of preguntesGoldenStandard) {
  const startedAt = performance.now();
  try {
    const matches = await retrieveHybridMatches(question.pregunta, 5, true);
    const retrieved = matches.map((match) => match.entry.id);
    const expected = question.articlesEsperats;
    results.push({
      id: question.id,
      expected,
      retrieved,
      hit: expected.some((id) => retrieved.includes(id)),
      fullCoverage: expected.every((id) => retrieved.includes(id)),
      durationMs: Math.round(performance.now() - startedAt),
    });
  } catch (error) {
    console.error(JSON.stringify({
      event: 'rag_evaluation_error',
      id: question.id,
      error: error instanceof Error ? error.message : String(error),
    }));
    process.exitCode = 1;
    break;
  }
}

if (results.length !== preguntesGoldenStandard.length) process.exit(1);

const hitRate = results.filter((result) => result.hit).length / results.length;
const fullCoverageRate = results.filter((result) => result.fullCoverage).length / results.length;
const durations = results.map((result) => result.durationMs).sort((a, b) => a - b);
const p95Ms = durations[Math.max(0, Math.ceil(durations.length * 0.95) - 1)];
const failedIds = results.filter((result) => !result.hit).map((result) => result.id);
const passed = hitRate >= requiredHitRate && p95Ms < maximumP95Ms;

console.log(JSON.stringify({
  corpusNamespace: process.env.UPSTASH_VECTOR_NAMESPACE || 'corpus-v1',
  questions: results.length,
  top5HitRate: Number(hitRate.toFixed(4)),
  top5FullCoverageRate: Number(fullCoverageRate.toFixed(4)),
  p95Ms,
  thresholds: { requiredHitRate, maximumP95Ms },
  failedIds,
  passed,
}, null, 2));

  if (!passed) process.exit(1);
}

void main();
