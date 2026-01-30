# Desplegament a Vercel - dretplaner.ad Unificat

## ✅ Projecte Preparat per Vercel

El projecte està completament fusionat i preparat per desplegar a Vercel.

### Fitxers de Configuració Creats

S'han creat els següents fitxers per assegurar un desplegament correcte:

- **`.gitignore`**: Exclou `node_modules/`, fitxers de build, i altres fitxers que no s'han de versionar
- **`.vercelignore`**: Assegura que Vercel no pugui fitxers innecessaris com `node_modules/` i fitxers de desenvolupament

Aquests fitxers garanteixen que:
- ✅ `node_modules/` no es pugui a Vercel (Vercel instal·larà les seves pròpies dependències)
- ✅ Fitxers de build locals no interfereixin amb el build de Vercel
- ✅ Fitxers sensibles (com `.env.local`) no es puguin accidentalment

## 📁 Estructura Final

```
dret-planer/
├── pages/
│   ├── index.tsx                    # Pàgina principal (Codi Civil)
│   ├── codi-consum/
│   │   ├── index.tsx                # Pàgina principal Codi de Consum
│   │   ├── article/[id].tsx         # Articles del Codi de Consum
│   │   └── tesaurus.tsx             # Tesaurus del Codi de Consum
│   └── api/
│       ├── unified-chat.ts          # Chatbot unificat
│       ├── codi-consum/             # APIs del Codi de Consum
│       └── rag/                     # APIs RAG del Codi Civil
├── components/
│   ├── Layout.tsx                   # Layout unificat
│   ├── UnifiedChatbot.tsx           # Chatbot unificat
│   └── codi-consum/                 # Components del Codi de Consum
├── data/
│   ├── articles.ts                  # Codi Civil
│   ├── codi-consum/                 # Dades del Codi de Consum
│   └── rag/                         # Embeddings RAG
└── vercel.json                      # Configuració Vercel
```

## 🚀 Passos per Desplegar

### 1. Connectar el Repositori

1. Accedeix a [Vercel Dashboard](https://vercel.com/dashboard)
2. Clica "Add New Project"
3. Connecta el teu repositori Git
4. Selecciona el directori `dret-planer` (si el repositori està a l'arrel)

### 2. Configuració del Projecte

Vercel detectarà automàticament:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 3. Variables d'Entorn

A la secció "Environment Variables", afegeix:

```
GROQ_API_KEY=gsk-la-teva-clau-groq
```

**Important**: La generació de text (chatbot, interpretació IA) utilitza **Groq (Llama-3.3-70B)**. Assegura't d'afegir `GROQ_API_KEY` per a:
- ✅ Production
- ✅ Preview  
- ✅ Development (opcional)

Opcional: si utilitzes embeddings d'OpenAI, afegeix també `OPENAI_API_KEY`.

### 4. Desplegament

1. Clica "Deploy"
2. Vercel construirà i desplegarà automàticament
3. El projecte estarà disponible a `https://el-teu-projecte.vercel.app`

## 🔧 Configuració Adicional

### Domini Personalitzat

1. Vés a Project Settings > Domains
2. Afegeix el teu domini (ex: `dretplaner.ad`)
3. Configura els DNS segons les instruccions de Vercel

### Variables d'Entorn Opcionals

- **Generació de text**: `GROQ_API_KEY` (obligatòria per chatbot i interpretació IA) — Llama-3.3-70B via Groq
- **Embeddings**: `OPENAI_API_KEY` (opcional) — per text-embedding-3-large; alternativa: XLM-RoBERTa local amb `EMBEDDING_PROVIDER=xlm-roberta`

```
OPENAI_EMBEDDINGS_MODEL=text-embedding-3-large
NEXT_PUBLIC_SHOW_EMBED_REMINDER=false
```

**Variables d'entorn disponibles:**
- `GROQ_API_KEY` (obligatòria per generació) - Clau API de Groq (Llama-3.3-70B)
- `OPENAI_API_KEY` (opcional) - Per embeddings OpenAI
- `OPENAI_EMBEDDINGS_MODEL` (opcional) - Per defecte: `text-embedding-3-large`
- `NEXT_PUBLIC_SHOW_EMBED_REMINDER` (opcional) - Per defecte: `false`

## ✅ Verificació Post-Desplegament

Després del desplegament, verifica:

1. ✅ Pàgina principal carrega correctament
2. ✅ Navegació entre Codi Civil i Codi de Consum funciona
3. ✅ Chatbot unificat funciona
4. ✅ Articles del Codi Civil es mostren correctament
5. ✅ Articles del Codi de Consum es mostren correctament
6. ✅ APIs de generació de resums/exemples funcionen
7. ✅ Tesaurus del Codi de Consum funciona

## 📝 Notes Importants

- **Generació de text**: Configura `GROQ_API_KEY` (obtinguda a [console.groq.com](https://console.groq.com))
- **El chatbot unificat** pot consultar ambdós codis simultàniament
- **Totes les rutes** estan configurades correctament:
  - `/` → Codi Civil
  - `/codi-consum` → Codi de Consum
  - `/codi-consum/article/[id]` → Articles del Codi de Consum
  - `/codi-consum/tesaurus` → Tesaurus

## 🐛 Troubleshooting

### Error: "Cal configurar GROQ_API_KEY" o respostes buides del chatbot
- Afegeix `GROQ_API_KEY` a les variables d'entorn de Vercel
- Assegura't que estigui marcada per "Production"
- Redeploya després d'afegir la variable

### Error: "Module not found"
- Verifica que tots els imports estiguin correctes
- Assegura't que `npm install` s'executi correctament
- Revisa els logs de build a Vercel

### Error: "404 Not Found" a les pàgines del Codi de Consum
- Verifica que les rutes estiguin a `pages/codi-consum/`
- Assegura't que els noms de fitxers siguin correctes

## 📚 Recursos

- [Documentació Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

