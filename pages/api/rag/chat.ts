import type { NextApiRequest, NextApiResponse } from 'next';
import { articlesConstitucio } from '@/data/codis/constitucio/articles-template';
import { retrieveTopMatches } from '@/lib/rag/corpus';
import { RetrievedContext } from '@/lib/rag/types';
import { GUIA_CATALA_JURIDIC } from '@/lib/prompts/guia-catala-juridic';
import { generateEmbedding, getEmbeddingProvider } from '@/lib/embeddings';

interface ChatRequestBody {
  message?: string;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  maxTokens?: number;
  temperature?: number;
}

interface ChatResponseBody {
  answer?: string;
  sources?: Array<{
    id: string;
    topic: string;
    category: string;
    legalReference?: string;
    keyConcepts: string[];
    score: number;
  }>;
  warnings?: string[];
  error?: string;
}

const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponseBody>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    message,
    history = [],
    maxTokens = 650,
    temperature = 0.3
  } = req.body as ChatRequestBody;

  if (!message || typeof message !== 'string' || !message.trim().length) {
    return res
      .status(400)
      .json({ error: "Cal proporcionar un missatge d'usuari vàlid." });
  }

  const invalidRequestArticles = findUnknownArticles(message);
  if (invalidRequestArticles.length) {
    return res.status(400).json({
      error: `Els articles següents no existeixen a la Constitució: ${invalidRequestArticles.join(
        ', '
      )}. Revisa la numeració i torna-ho a intentar.`
    });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;
  const provider = getEmbeddingProvider();
  
  // Si utilitzem OpenAI però no hi ha clau API, donar error
  if (provider === 'openai' && !openaiApiKey) {
    console.error('OPENAI_API_KEY no està configurada');
    return res.status(500).json({
      error:
        "OpenAI API key no configurada. Defineix OPENAI_API_KEY a les variables d'entorn, o configura EMBEDDING_PROVIDER=xlm-roberta per utilitzar el model local."
    });
  }

  // Per al chat, encara necessitem OpenAI per generar respostes
  if (!openaiApiKey) {
    return res.status(500).json({
      error:
        "OPENAI_API_KEY és necessària per generar respostes del chatbot. XLM-RoBERTa només s'utilitza per a embeddings."
    });
  }

  try {
    const queryEmbedding = await generateEmbedding(message, provider, openaiApiKey);
    const matches = retrieveTopMatches(queryEmbedding, 3);

    const contextBlock = buildContextBlock(matches);
    const chatMessages = buildChatMessages(message, history, contextBlock);

    const answer = await generateChatCompletion(openaiApiKey, chatMessages, {
      model: CHAT_MODEL,
      maxTokens,
      temperature
    });

    const invalidAnswerArticles = findUnknownArticles(answer);
    if (invalidAnswerArticles.length) {
      return res.status(502).json({
        error: `La resposta generada mencionava articles inexistents (${invalidAnswerArticles.join(
          ', '
        )}). Torna a formular la consulta amb més context o especifica un article vàlid.`
      });
    }

    const sources = matches.map(({ entry, score }) => ({
      id: entry.id,
      topic: entry.topic,
      category: entry.category,
      legalReference: entry.legalReference,
      keyConcepts: entry.keyConcepts,
      score
    }));

    return res.status(200).json({ answer, sources });
  } catch (error: any) {
    console.error('Error al xat RAG:', error);
    const messageError =
      error?.message || "S'ha produït un error inesperat generant la resposta.";
    if (messageError.includes('No hi ha embeddings disponibles')) {
      return res.status(503).json({ error: messageError });
    }
    return res.status(500).json({ error: messageError });
  }
}

function buildContextBlock(matches: RetrievedContext[]): string {
  if (!matches.length) {
    return "No s'han trobat entrades de coneixement relacionades amb la Constitució.";
  }

  const sections = matches.map(({ entry }, index) => {
    const header = `Font ${index + 1}: ${entry.topic} (${entry.id})`;
    const details = [
      `Categoria: ${entry.category}`,
      entry.legalReference ? `Referència legal: ${entry.legalReference}` : null,
      entry.keyConcepts.length
        ? `Conceptes clau: ${entry.keyConcepts.join(', ')}`
        : null,
      `Contingut: ${entry.content}`,
      entry.implications ? `Implicacions: ${entry.implications}` : null,
      entry.methodology ? `Metodologia: ${entry.methodology}` : null,
      entry.hierarchicalOrder
        ? `Ordre jeràrquic: ${entry.hierarchicalOrder}`
        : null,
      entry.distinction ? `Distinció: ${entry.distinction}` : null,
      entry.corollaries ? `Corol·laris: ${entry.corollaries}` : null,
      entry.enforcement ? `Aplicació i sancions: ${entry.enforcement}` : null,
      entry.applicationFields?.length
        ? `Àmbits d'aplicació: ${entry.applicationFields.join(', ')}`
        : null,
      entry.practicalUse ? `Ús pràctic: ${entry.practicalUse}` : null,
      entry.rationale ? `Racionalitat: ${entry.rationale}` : null,
      entry.proceduralConsequence
        ? `Conseqüència processal: ${entry.proceduralConsequence}`
        : null,
      entry.evidenceRequirement
        ? `Requisits de prova: ${entry.evidenceRequirement}`
        : null,
      entry.commonErrors ? `Errors habituals: ${entry.commonErrors}` : null,
      entry.practicalImplication
        ? `Implicació pràctica: ${entry.practicalImplication}`
        : null,
      entry.judicialDuty ? `Deure judicial: ${entry.judicialDuty}` : null,
      entry.historicalContext
        ? `Context històric: ${entry.historicalContext}`
        : null
    ]
      .filter(Boolean)
      .join('\n');

    return `${header}\n${details}`;
  });

  return sections.join('\n\n');
}

function buildChatMessages(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  contextBlock: string
) {
  type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

  const systemPrompt = `Ets un assistent jurídic especialitzat en la Constitució del Principat d'Andorra. Respon en català, amb rigor normatiu i doctrinal, incorporant els conceptes clau del corpus proporcionat. Explica les respostes amb claredat, cita sempre les fonts indicant l'ID i, si escau, la referència legal de la Constitució. Recorda explícitament que ets una IA i recomana contrastar amb professionals quan sigui necessari.

${GUIA_CATALA_JURIDIC}`;

  const contextPrompt = `Context de coneixement de la Constitució d'Andorra:\n${contextBlock}`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'system', content: contextPrompt }
  ];

  history.forEach((item) => {
    if (item.role === 'user' || item.role === 'assistant') {
      messages.push({
        role: item.role,
        content: item.content
      });
    }
  });

  messages.push({ role: 'user', content: message });

  return messages;
}

async function generateChatCompletion(
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  options: { model: string; maxTokens: number; temperature: number }
): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: options.model,
      messages,
      max_tokens: options.maxTokens,
      temperature: options.temperature
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error generant la resposta (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content;
  if (!answer) {
    throw new Error("Resposta de l'API sense contingut.");
  }
  return answer.trim();
}

const articleIndex = buildArticleIndex();

function buildArticleIndex(): Set<string> {
  const set = new Set<string>();
  articlesConstitucio.forEach((article) => {
    // Els articles de la Constitució utilitzen 'numeracio' en lloc de 'number'
    const articleNumber = article.numeracio;
    const normalized = normalizeArticleNumber(articleNumber);
    if (normalized) {
      set.add(normalized);
    }
  });
  return set;
}

function findUnknownArticles(text: string): string[] {
  const references = extractArticleNumbers(text);
  if (!references.length) {
    return [];
  }
  return references.filter((ref) => !articleIndex.has(ref));
}

function extractArticleNumbers(text: string): string[] {
  // Patró per articles de la Constitució (Article 1, Article 2, etc.)
  const pattern = /(?:article|art\.?)\s+(\d+)/gi;
  const results = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const normalized = normalizeArticleNumber(match[1]);
    if (normalized) {
      results.add(normalized);
    }
  }
  return Array.from(results);
}

function normalizeArticleNumber(raw?: string | null): string | null {
  if (!raw) {
    return null;
  }

  // Normalitzar: "Article 1" -> "1", "1" -> "1"
  const cleaned = raw.replace(/^article\s+/i, '').trim();
  // Per a la Constitució, només necessitem el número
  return cleaned;
}
