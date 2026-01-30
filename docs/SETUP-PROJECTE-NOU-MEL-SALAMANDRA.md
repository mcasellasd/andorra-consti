# Guia Completa: Projecte Nou amb MEL i Salamandra

> **Nota (2025)**: Per a generació de text el projecte utilitza **Groq (Llama-3.3-70B)** amb `GROQ_API_KEY`; la opció Salamandra/Colab ja no és suportada. Aquesta guia segueix sent útil per a MEL (embeddings) i estructura general.

Aquesta guia et permet crear un projecte complet des de zero utilitzant models open source (MEL per embeddings i Salamandra per generació de text) en lloc d'OpenAI.

## 📋 Índex

1. [Requisits Previs](#requisits-previs)
2. [Creació del Projecte](#creació-del-projecte)
3. [Instal·lació de Dependències](#instal·lació-de-dependències)
4. [Configuració de MEL (Embeddings)](#configuració-de-mel-embeddings)
5. [Configuració de Salamandra (Generació)](#configuració-de-salamandra-generació)
6. [Estructura del Projecte](#estructura-del-projecte)
7. [Implementació dels Components](#implementació-dels-components)
8. [Variables d'Entorn](#variables-dentorn)
9. [Testing i Verificació](#testing-i-verificació)
10. [Desplegament](#desplegament)

---

## Requisits Previs

- Node.js 18+ instal·lat
- npm o yarn
- Compte a Hugging Face (gratuït) per obtenir API key
- Editor de codi (VS Code recomanat)

---

## Creació del Projecte

### 1. Crear el projecte Next.js

```bash
# Crear nova carpeta
mkdir prudencia-opensource
cd prudencia-opensource

# Inicialitzar projecte Next.js amb TypeScript
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Respondre les preguntes:
# - Would you like to use ESLint? Yes
# - Would you like to use Tailwind CSS? Yes (o No, segons preferència)
# - Would you like to use `src/` directory? No
# - Would you like to use App Router? Yes
# - Would you like to customize the default import alias? No
```

### 2. Estructura inicial de carpetes

```bash
mkdir -p lib/embeddings lib/llm lib/prompts data/rag pages/api/generate
```

---

## Instal·lació de Dependències

### Instal·lar dependències necessàries

```bash
npm install @xenova/transformers node-cache
npm install --save-dev @types/node-cache
```

### package.json complet

```json
{
  "name": "prudencia-opensource",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@xenova/transformers": "^2.17.2",
    "node-cache": "^5.1.2"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node-cache": "^5.1.2",
    "typescript": "^5.0.0"
  }
}
```

---

## Configuració de MEL (Embeddings)

### 1. Crear `lib/embeddings/mel.ts`

```typescript
/**
 * Utilitat per generar embeddings amb MEL (Modelo de Español Legal)
 * Model especialitzat en textos legals
 */

import { pipeline, Pipeline } from '@xenova/transformers';

const MODEL_NAME = 'IIC/MEL';

// Cache del model carregat
let melPipeline: Pipeline | null = null;

/**
 * Carrega el model MEL (lazy loading)
 */
async function loadMEL(): Promise<Pipeline> {
  if (!melPipeline) {
    console.log(`📦 Carregant model MEL (Legal Spanish)...`);
    melPipeline = await pipeline('feature-extraction', MODEL_NAME, {
      quantized: true, // Versió quantitzada per estalviar memòria
    });
    console.log(`✅ Model MEL carregat`);
  }
  return melPipeline;
}

/**
 * Genera un embedding per a un text utilitzant MEL
 * @param text Text per generar l'embedding
 * @returns Array de números (1024 dimensions)
 */
export async function generateMELEmbedding(text: string): Promise<number[]> {
  const model = await loadMEL();
  
  // Generar l'embedding
  const output = await model(text, {
    pooling: 'mean', // Mitjana de tots els tokens
    normalize: true,  // Normalitzar el vector
  });

  // Convertir Tensor a array de números
  const embedding = Array.from(output.data);
  
  return embedding;
}

/**
 * Genera embeddings per múltiples textos (batch processing)
 * @param texts Array de textos
 * @param batchSize Mida del lot (per defecte: 5)
 * @returns Array d'embeddings
 */
export async function generateMELEmbeddingsBatch(
  texts: string[],
  batchSize: number = 5
): Promise<number[][]> {
  const model = await loadMEL();
  const embeddings: number[][] = [];

  // Processar en lots per evitar sobrecarregar la memòria
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    console.log(`📊 MEL: Processant lot ${Math.floor(i / batchSize) + 1}/${Math.ceil(texts.length / batchSize)}`);

    const batchPromises = batch.map(async (text) => {
      const output = await model(text, {
        pooling: 'mean',
        normalize: true,
      });
      return Array.from(output.data);
    });

    const batchEmbeddings = await Promise.all(batchPromises);
    embeddings.push(...batchEmbeddings);
  }

  return embeddings;
}

/**
 * Calcula la similitud cosinus entre dos embeddings
 */
export function cosineSimilarity(
  embeddingA: number[],
  embeddingB: number[]
): number {
  if (embeddingA.length !== embeddingB.length) {
    throw new Error('Els embeddings han de tenir la mateixa dimensió');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < embeddingA.length; i++) {
    dotProduct += embeddingA[i] * embeddingB[i];
    normA += embeddingA[i] * embeddingA[i];
    normB += embeddingB[i] * embeddingB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}
```

### 2. Crear `lib/embeddings/index.ts`

```typescript
/**
 * Utilitat unificada per generar embeddings
 * Suporta MEL (recomanat) i altres proveïdors
 */

import { generateMELEmbedding } from './mel';

export type EmbeddingProvider = 'mel' | 'huggingface';

/**
 * Genera un embedding utilitzant el proveïdor especificat
 */
export async function generateEmbedding(
  text: string,
  provider: EmbeddingProvider = 'mel'
): Promise<number[]> {
  switch (provider) {
    case 'mel':
      return generateMELEmbedding(text);
    
    case 'huggingface':
      // Opció: Hugging Face Inference API
      return generateHuggingFaceEmbedding(text);
    
    default:
      throw new Error(`Proveïdor d'embeddings desconegut: ${provider}`);
  }
}

/**
 * Determina el proveïdor d'embeddings basant-se en les variables d'entorn
 */
export function getEmbeddingProvider(): EmbeddingProvider {
  const provider = process.env.EMBEDDING_PROVIDER?.toLowerCase();
  
  if (provider === 'mel') {
    return 'mel';
  }
  
  // Per defecte, utilitza MEL
  return 'mel';
}

/**
 * Genera embedding via Hugging Face Inference API (opcional)
 */
async function generateHuggingFaceEmbedding(text: string): Promise<number[]> {
  const hfApiKey = process.env.HUGGINGFACE_API_KEY;
  
  if (!hfApiKey) {
    throw new Error('HUGGINGFACE_API_KEY és necessària per utilitzar Hugging Face API');
  }

  const response = await fetch(
    'https://api-inference.huggingface.co/models/IIC/MEL',
    {
      headers: {
        'Authorization': `Bearer ${hfApiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inputs: text,
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Hugging Face API error: ${error}`);
  }

  const data = await response.json();
  return data[0] || data;
}
```

---

## Configuració de Salamandra (Generació)

### 1. Crear `lib/llm/salamandra.ts`

```typescript
/**
 * Utilitat per generar text amb Salamandra-7b-instruct
 * Model especialitzat en català i altres llengües ibèriques
 */

/**
 * Formata missatges en format ChatML (com utilitza Salamandra)
 */
function formatChatML(
  messages: Array<{ role: string; content: string }>,
  dateString?: string
): string {
  const date = dateString || new Date().toISOString().split('T')[0];
  
  let formatted = '';
  
  // System message
  if (messages[0]?.role === 'system') {
    formatted += `<|im_start|>system\n${messages[0].content}<|im_end|>\n`;
    messages = messages.slice(1);
  } else {
    formatted += `<|im_start|>system\nSYSTEM MESSAGE<|im_end|>\n`;
  }
  
  // User/Assistant alternats
  messages.forEach(msg => {
    if (msg.role === 'user' || msg.role === 'assistant') {
      formatted += `<|im_start|>${msg.role}\n${msg.content}<|im_end|>\n`;
    }
  });
  
  // Generation prompt
  formatted += `<|im_start|>assistant\n`;
  
  return formatted;
}

/**
 * Genera text utilitzant Salamandra via Hugging Face Inference API
 */
export async function generateWithSalamandra(
  messages: Array<{ role: string; content: string }>,
  options: { 
    maxTokens?: number; 
    temperature?: number;
    dateString?: string;
  } = {}
): Promise<string> {
  const hfApiKey = process.env.HUGGINGFACE_API_KEY;
  
  if (!hfApiKey) {
    throw new Error('HUGGINGFACE_API_KEY és necessària. Obtén-la a https://huggingface.co/settings/tokens');
  }

  const formattedPrompt = formatChatML(messages, options.dateString);
  
  const response = await fetch(
    'https://api-inference.huggingface.co/models/BSC-LT/salamandra-7b-instruct',
    {
      headers: {
        'Authorization': `Bearer ${hfApiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: options.maxTokens || 350,
          temperature: options.temperature || 0.7,
          return_full_text: false,
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Hugging Face API error (${response.status})`;
    
    try {
      const errorData = JSON.parse(errorText);
      if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch {
      errorMessage = errorText || errorMessage;
    }
    
    // Si el model està carregant, esperar i tornar a intentar
    if (response.status === 503) {
      console.log('⏳ Model carregant, esperant 30 segons...');
      await new Promise(resolve => setTimeout(resolve, 30000));
      return generateWithSalamandra(messages, options);
    }
    
    throw new Error(errorMessage);
  }

  const data = await response.json();
  
  // Salamandra retorna un array amb generated_text
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim();
  }
  
  // O pot retornar directament generated_text
  if (data.generated_text) {
    return data.generated_text.trim();
  }
  
  // Fallback
  return data[0]?.generated_text?.trim() || '';
}

/**
 * Genera text utilitzant Salamandra localment (opcional, més lent)
 * Requereix més recursos però és completament privat
 */
export async function generateWithSalamandraLocal(
  messages: Array<{ role: string; content: string }>,
  options: { 
    maxTokens?: number; 
    temperature?: number;
  } = {}
): Promise<string> {
  const { pipeline } = await import('@xenova/transformers');
  
  const generator = await pipeline('text-generation', 'BSC-LT/salamandra-7b-instruct', {
    quantized: true, // Necessari per estalviar memòria
  });
  
  const prompt = formatChatML(messages);
  const output = await generator(prompt, {
    max_new_tokens: options.maxTokens || 350,
    temperature: options.temperature || 0.7,
  });
  
  return output[0]?.generated_text?.trim() || '';
}
```

### 2. Crear `lib/llm/index.ts`

```typescript
/**
 * Utilitat unificada per generar text
 * Suporta Salamandra (recomanat) i altres proveïdors
 */

import { generateWithSalamandra, generateWithSalamandraLocal } from './salamandra';

export type LLMProvider = 'salamandra' | 'salamandra-local';

/**
 * Genera text utilitzant el proveïdor especificat
 */
export async function generateText(
  messages: Array<{ role: string; content: string }>,
  options: { 
    maxTokens?: number; 
    temperature?: number;
    provider?: LLMProvider;
  } = {}
): Promise<string> {
  const provider = options.provider || getLLMProvider();
  
  switch (provider) {
    case 'salamandra':
      return generateWithSalamandra(messages, options);
    
    case 'salamandra-local':
      return generateWithSalamandraLocal(messages, options);
    
    default:
      throw new Error(`Proveïdor de LLM desconegut: ${provider}`);
  }
}

/**
 * Determina el proveïdor de LLM basant-se en les variables d'entorn
 */
export function getLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER?.toLowerCase();
  
  if (provider === 'salamandra-local') {
    return 'salamandra-local';
  }
  
  // Per defecte, utilitza Salamandra via API
  return 'salamandra';
}
```

---

## Estructura del Projecte

### Estructura completa de carpetes

```
prudencia-opensource/
├── pages/
│   ├── api/
│   │   └── generate/
│   │       └── summary.ts          # API endpoint per generar resums
│   ├── _app.tsx
│   └── index.tsx
├── lib/
│   ├── embeddings/
│   │   ├── mel.ts                  # MEL embeddings
│   │   └── index.ts                # Utilitat unificada embeddings
│   ├── llm/
│   │   ├── salamandra.ts           # Salamandra generació
│   │   └── index.ts                # Utilitat unificada LLM
│   └── prompts/
│       └── guia-catala-juridic.ts  # Guia de llenguatge planer
├── data/
│   └── rag/                        # Dades per RAG (opcional)
├── public/
├── .env.local                      # Variables d'entorn (no versionar)
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Implementació dels Components

### 1. Crear `lib/prompts/guia-catala-juridic.ts`

```typescript
/**
 * Instruccions de la Guia Essencial de Normes Lingüístiques del Català Jurídic
 */

export const GUIA_CATALA_JURIDIC = `
NORMES LINGÜÍSTIQUES DEL CATALÀ JURÍDIC:

1. PRINCIPIS FONAMENTALS:
   - Claredat: Utilitza llenguatge planer i comprensible. Evita arcaismes.
   - Precisió: Utilitza terminologia específica i unívoca.
   - Concisió: Expressa les idees de manera simple i breu.

2. NORMES D'ESTIL:
   - Frases breus i simples amb ordre lògic.
   - Preferència per la veu activa sobre la passiva.
   - Connectors adequats per cohesió textual.

3. LLENGUATGE RESPECTUÓS:
   - Utilitza substantius col·lectius sense marca de gènere quan sigui possible.
   - Utilitza el tractament de vós com a forma preferent.
   - Evita fórmules arcaiques o de submissió.

IMPORTANT: Aplica aquestes normes de manera natural i consistent.
`;
```

### 2. Crear `pages/api/generate/summary.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from '../../../lib/llm';
import { generateEmbedding } from '../../../lib/embeddings';
import { GUIA_CATALA_JURIDIC } from '../../../lib/prompts/guia-catala-juridic';

interface GenerateSummaryRequest {
  articleNumber: string;
  articleTitle: string;
  articleContent: string;
}

interface GenerateSummaryResponse {
  summary?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSummaryResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { articleNumber, articleTitle, articleContent } = req.body as GenerateSummaryRequest;

  if (!articleNumber || !articleTitle || !articleContent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const dateString = new Date().toISOString().split('T')[0];

    const systemPrompt = `Ets un assistent jurídic digital que ajuda a interpretar els codis andorrans de forma comprensible. 
Treballes per un equip d'estudiants de dret; la finalitat és acadèmica i divulgativa. Mantén un to respectuós, clar i didàctic.

Data actual: ${dateString}

Objectiu principal:
Generar resums entenedors dels articles (explica el contingut essencial amb llenguatge clar, estructurat i fidel al text legal).

Abans de respondre:
- Revisa els fragments normatius proporcionats. Prioritza sempre la literalitat de la llei andorrana vigent.
- No inventis jurisprudència, dates ni reformes inexistents.

Quan responguis:
- Cita el número exacte de l'article.
- Proporciona un resum breu (3-5 frases) en català planer.
- Recorda sempre que això és orientatiu i no constitueix assessorament legal.
- Recomana consultar professionals quan calgui.
- Indica que ets una IA (Salamandra) i que la informació és orientativa.

${GUIA_CATALA_JURIDIC}`;

    const userPrompt = `Context normatiu:
Article: ${articleNumber}
Títol: ${articleTitle}
Contingut (fragment fins a 2.000 caràcters):
${articleContent.substring(0, 2000)}

Necessito una interpretació orientativa que segueixi estrictament aquestes indicacions:
1. Escriu un apartat titulat "Resum (${articleNumber})" amb 3 a 5 frases en català planer que expliquin els punts essencials i la finalitat de l'article.
2. Tanca la resposta amb un paràgraf breu sota l'etiqueta "Avís" que indiqui que la informació és orientativa, no constitueix assessorament legal i que ha estat generada amb suport d'IA (Salamandra), animant a consultar professionals en cas de dubte.
3. Evita cites literals llargues i no inventis dades, jurisprudència ni reformes inexistents.
4. Mantén un to respectuós, clar i didàctic.`;

    // Generar resum amb Salamandra
    const summary = await generateText(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      {
        maxTokens: 350,
        temperature: 0.7,
      }
    );

    return res.status(200).json({ summary });
  } catch (error: any) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ 
      error: error.message || 'Error generating summary' 
    });
  }
}
```

### 3. Crear `pages/index.tsx` (exemple bàsic)

```typescript
import { useState } from 'react';

export default function Home() {
  const [articleNumber, setArticleNumber] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('/api/generate/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleNumber,
          articleTitle,
          articleContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error generant el resum');
      }

      setSummary(data.summary || '');
    } catch (err: any) {
      setError(err.message || 'Error desconegut');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Interpretació de Preceptes Normatius</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Número d'article:
          <input
            type="text"
            value={articleNumber}
            onChange={(e) => setArticleNumber(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Títol:
          <input
            type="text"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Contingut:
          <textarea
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
            rows={10}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !articleNumber || !articleTitle || !articleContent}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Generant...' : 'Generar Resum'}
      </button>

      {error && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fee', color: '#c00' }}>
          Error: {error}
        </div>
      )}

      {summary && (
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <h2>Resum Generat:</h2>
          <div style={{ whiteSpace: 'pre-wrap' }}>{summary}</div>
        </div>
      )}
    </div>
  );
}
```

---

## Variables d'Entorn

### Crear `.env.local`

```bash
# Hugging Face API Key (necessària per Salamandra)
# Obtén-la a: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=hf_...

# Proveïdor d'embeddings (mel per defecte)
EMBEDDING_PROVIDER=mel

# Proveïdor de LLM (salamandra per defecte)
LLM_PROVIDER=salamandra

# Opcional: Per usar Salamandra localment (més lent però privat)
# LLM_PROVIDER=salamandra-local
```

### Crear `.env.example`

```bash
# Hugging Face API Key
HUGGINGFACE_API_KEY=hf_...

# Proveïdor d'embeddings
EMBEDDING_PROVIDER=mel

# Proveïdor de LLM
LLM_PROVIDER=salamandra
```

### Actualitzar `.gitignore`

```gitignore
# Variables d'entorn
.env.local
.env*.local

# Next.js
.next/
out/
build/

# Dependencies
node_modules/

# Logs
*.log

# OS
.DS_Store
```

---

## Testing i Verificació

### 1. Provar MEL embeddings

Crear `scripts/test-mel.ts`:

```typescript
import { generateMELEmbedding } from '../lib/embeddings/mel';

async function testMEL() {
  console.log('🧪 Provant MEL embeddings...');
  
  const text = "L'article 1 del Codi Civil estableix les disposicions generals.";
  const embedding = await generateMELEmbedding(text);
  
  console.log(`✅ Embedding generat: ${embedding.length} dimensions`);
  console.log(`📊 Primeres 5 dimensions: ${embedding.slice(0, 5).join(', ')}`);
}

testMEL().catch(console.error);
```

Executar:
```bash
npx ts-node scripts/test-mel.ts
```

### 2. Provar Salamandra generació

Crear `scripts/test-salamandra.ts`:

```typescript
import { generateText } from '../lib/llm';

async function testSalamandra() {
  console.log('🧪 Provant Salamandra generació...');
  
  const response = await generateText(
    [
      {
        role: 'system',
        content: 'Ets un assistent jurídic que respon en català planer.'
      },
      {
        role: 'user',
        content: 'Explica què és un contracte en una frase.'
      }
    ],
    {
      maxTokens: 100,
      temperature: 0.7,
    }
  );
  
  console.log('✅ Resposta generada:');
  console.log(response);
}

testSalamandra().catch(console.error);
```

Executar:
```bash
npx ts-node scripts/test-salamandra.ts
```

### 3. Provar API endpoint

```bash
# Iniciar servidor de desenvolupament
npm run dev

# En una altra terminal, provar l'API
curl -X POST http://localhost:3000/api/generate/summary \
  -H "Content-Type: application/json" \
  -d '{
    "articleNumber": "Article 1",
    "articleTitle": "Disposicions Generals",
    "articleContent": "Aquest article estableix les bases del codi civil..."
  }'
```

---

## Desplegament

### Desplegament a Vercel

1. **Connectar repositori a Vercel**
   - Vés a [vercel.com](https://vercel.com)
   - Connecta el teu repositori GitHub

2. **Configurar variables d'entorn a Vercel**
   - Vés a Project Settings > Environment Variables
   - Afegeix:
     - `HUGGINGFACE_API_KEY`: La teva clau API de Hugging Face
     - `EMBEDDING_PROVIDER`: `mel`
     - `LLM_PROVIDER`: `salamandra`

3. **Desplegar**
   - Vercel desplegarà automàticament

### Notes importants per Vercel

- **Edge Runtime**: Els models locals (MEL, Salamandra local) NO funcionen a Edge Runtime
- **Serverless Functions**: Utilitza Hugging Face API per a producció
- **Timeout**: Les funcions serverless tenen un timeout màxim (10s a pla gratuït)

### Configuració per producció

Si voleu usar models locals, necessitareu:
- Un servidor dedicat (no Vercel)
- O usar serveis com RunPod, Modal, etc.

---

## Troubleshooting

### Error: "HUGGINGFACE_API_KEY no configurada"

**Solució**: 
1. Crea un compte a [huggingface.co](https://huggingface.co)
2. Genera un token a [Settings > Tokens](https://huggingface.co/settings/tokens)
3. Afegeix-lo a `.env.local`

### Error: "Model is currently loading"

**Solució**: 
- El model està carregant-se a Hugging Face
- Espera 30-60 segons i torna a intentar
- Els models es mantenen actius durant 5 minuts d'inactivitat

### Error: "Out of memory" amb models locals

**Solució**:
- Usa versions quantitzades (`quantized: true`)
- Redueix el batch size
- Considera usar Hugging Face API en lloc de local

### Error: "Module not found: @xenova/transformers"

**Solució**:
```bash
npm install @xenova/transformers
```

---

## Pròxims Passos

1. **Millorar la validació**: Afegir validació de llenguatge planer
2. **Cache**: Implementar cache de respostes
3. **RAG**: Integrar sistema RAG amb MEL embeddings
4. **UI millorada**: Crear una interfície més completa
5. **Testing**: Afegir tests unitaris i d'integració

---

## Recursos

- [MEL Model Card](https://huggingface.co/IIC/MEL)
- [Salamandra Model Card](https://huggingface.co/BSC-LT/salamandra-7b-instruct)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference)
- [@xenova/transformers](https://github.com/xenova/transformers.js)
- [Next.js Documentation](https://nextjs.org/docs)

---

## Suport

Si tens problemes:
1. Revisa els logs de la consola
2. Verifica les variables d'entorn
3. Comprova que les dependències estan instal·lades
4. Consulta la documentació dels models a Hugging Face

---

**Data de creació**: 2025-01-30
**Versió**: 1.0.0
