import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

interface TraceabilityScores {
  aiActCompliance: {
    score: number;
    compliant: boolean;
    warnings: string[];
  };
  responseQuality: {
    valid: boolean;
    score: number;
    warnings: string[];
    citedInResponse: string[];
    citedNotInContext: string[];
    suggestions: string[];
  };
}

interface TraceabilityEntry {
  timestamp: string;
  userMessageHashSha256: string;
  ragContextHashSha256: string;
  responseHashSha256: string;
  aiActCompliance: TraceabilityScores['aiActCompliance'];
  responseQuality: TraceabilityScores['responseQuality'];
}

const TRACEABILITY_LOG_DIR = path.join(process.cwd(), 'logs', 'traceability');

function hashSha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function getDailyLogPath(date: Date): string {
  const year = String(date.getUTCFullYear());
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return path.join(TRACEABILITY_LOG_DIR, `${year}-${month}-${day}.jsonl`);
}

export function buildRagContextFingerprint(entries: Array<{ id: string; content?: string }>): string {
  return entries
    .map((entry) => `${entry.id}:${entry.content || ''}`)
    .join('\n');
}

export async function appendTraceabilityLog(input: {
  userMessage: string;
  ragContextFingerprint: string;
  generatedResponse: string;
  scores: TraceabilityScores;
}): Promise<void> {
  const now = new Date();

  const traceEntry: TraceabilityEntry = {
    timestamp: now.toISOString(),
    userMessageHashSha256: hashSha256(input.userMessage),
    ragContextHashSha256: hashSha256(input.ragContextFingerprint),
    responseHashSha256: hashSha256(input.generatedResponse),
    aiActCompliance: input.scores.aiActCompliance,
    responseQuality: input.scores.responseQuality,
  };

  const line = `${JSON.stringify(traceEntry)}\n`;
  const filePath = getDailyLogPath(now);

  await fs.mkdir(TRACEABILITY_LOG_DIR, { recursive: true });
  await fs.appendFile(filePath, line, 'utf8');
}
