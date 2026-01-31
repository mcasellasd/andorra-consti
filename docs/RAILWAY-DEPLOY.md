# Desplegament a Railway – dretplaner.ad

## Preparació del projecte

El projecte està configurat per Railway amb:

- **Output standalone** de Next.js (imatge més petita, arrencada més ràpida)
- **Scripts** `postbuild` i `start` adaptats per al servidor standalone
- **@xenova/transformers** a dependencies (per RAG amb XLM-RoBERTa)

---

## Passos per desplegar

### 1. Connectar el repositori

1. Accedeix a [railway.app](https://railway.app) i inicia sessió
2. Clica **New Project**
3. **Deploy from GitHub repo** → connecta el teu repositori
4. Selecciona el directori arrel del projecte (si el projecte és l’arrel del repo, no cal canviar)

### 2. Variables d’entorn

A **Variables** del servei, afegeix:

| Variable | Valor | Obligat |
|----------|-------|---------|
| `GROQ_API_KEY` | `gsk_...` (clau de [console.groq.com](https://console.groq.com)) | Sí – per chatbot i interpretació IA |
| `RAG_ENABLED` | `true` | No – per activar cerca semàntica (XLM-RoBERTa). Deixar buit o `false` si no ho vols |
| `EMBEDDING_PROVIDER` | `xlm-roberta` | No – per defecte quan RAG està actiu |

### 3. Domini i port

- Railway assigna un domini automàticament (ex. `xxx.up.railway.app`)
- **PORT** – Railway ho configura automàticament; el servidor Next.js standalone llegeix `process.env.PORT`

### 4. Desplegament

- Railway detecta el canvi i desplega automàticament
- El build fa: `npm install` → `npm run build` → `postbuild` (copia `public` i `static` a standalone) → `npm start`
- El servidor s’executa amb `node .next/standalone/server.js`

---

## Pla de 5€

Amb el pla de 5€/mes tens:

- Memòria adequada per executar Next.js i (opcional) XLM-RoBERTa (~500 MB)
- Servei sempre actiu (sense sleep per inactivitat)
- Domini personalitzat possible

### Corpus RAG al repositori

**Important:** Els fitxers `data/rag/constitucio-unified.json` i `data/rag/constitucio-unified-embeddings.json` són necessaris perquè RAG funcioni. Actualment `data/rag/**` està a `.gitignore`. Per desplegar amb RAG actiu:

1. Executa localment: `node scripts/unificar-corpus-doctrina.js`
2. Edita `.gitignore` i permet `!data/rag/constitucio-unified*.json`
3. Fes commit i push dels fitxers unificats

Si el corpus no està al repo, RAG fallarà amb «No hi ha embeddings disponibles». El chatbot funcionarà igual (sense context del corpus) si tens `GROQ_API_KEY`.

### Memòria per RAG

Si actives `RAG_ENABLED=true`, el primer cop que s’usin embeddings es carregarà el model Xenova/xlm-roberta-base (~500 MB). Pot trigar uns 30–60 segons la primera vegada; després resta en memòria i va més ràpid.

Si el servei falla per manca de memòria, considera:

- Desactivar RAG (`RAG_ENABLED=false`) o
- Pujar de pla o augmentar recursos a Railway

---

## Verificació després del desplegament

1. Pàgina principal carrega
2. Navegació (Inici, Constitució, Preguntes de Control, Paper, Com està fet)
3. Chatbot funciona (comprova que tens `GROQ_API_KEY` configurada)
4. Interpretació IA en un article de la Constitució
5. Si RAG està actiu: el xat ha de retornar context de Constitució i doctrina

---

## Troubleshooting

### Error "Cal configurar GROQ_API_KEY"
- Afegeix `GROQ_API_KEY` a les variables d’entorn
- Fes **Redeploy** després de guardar

### Build falla amb "ENOENT" o "standalone"
- Verifica que `next.config.js` tingui `output: 'standalone'`
- Revisa que `postbuild` existeixi a `package.json` i s’executi sense errors

### Error "not a directory" / tsconfig.tsbuildinfo
- El fitxer `nixpacks.toml` evita que Nixpacks munti cache a un fitxer. Si continua fallant, afegeix `NIXPACKS_NO_CACHE=1` a les variables d'entorn.

### RAG no funciona / timeout
- Assegura’t que `RAG_ENABLED=true`
- El primer cop pot trigar (càrrega del model); torna-ho a provar passats uns minuts
- Si continua fallant, desactiva RAG temporalment

### Servei es reinicia sovint
- Pot ser per manca de memòria amb RAG actiu
- Considera desactivar RAG o augmentar recursos

---

## Fitxers de configuració

- `railway.json` – configuració de build i deploy
- `nixpacks.toml` – evita error de cache amb tsconfig.tsbuildinfo
- `next.config.js` – `output: 'standalone'` per Railway
- `package.json` – scripts `postbuild` i `start` per standalone
