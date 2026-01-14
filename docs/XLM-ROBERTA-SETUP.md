# Configuració de XLM-RoBERTa-base per Embeddings

Aquest document explica com utilitzar XLM-RoBERTa-base per generar embeddings localment, sense necessitat de l'API d'OpenAI.

## Què és XLM-RoBERTa-base?

XLM-RoBERTa-base és un model de llenguatge multilingüe que:
- ✅ Funciona **localment** (sense API externa)
- ✅ És **gratuït** (sense costos per token)
- ✅ Suporta **100+ llengües** (incloent català, castellà, francès)
- ✅ Genera embeddings de **768 dimensions**

## Avantatges vs OpenAI Embeddings

| Característica | OpenAI | XLM-RoBERTa |
|----------------|--------|-------------|
| Cost | ~$0.13 per 1M tokens | Gratuït |
| API | Requereix clau API | Local |
| Privacitat | Dades enviades a OpenAI | Tot local |
| Velocitat | Depèn de la xarxa | Ràpid (local) |
| Dimensions | 3072 (large) | 768 (base) |

## Instal·lació

### 1. Instal·lar dependències

```bash
npm install
```

Això instal·larà automàticament `@xenova/transformers` que és la biblioteca que utilitzem per carregar XLM-RoBERTa.

### 2. Configurar variables d'entorn

Crea o actualitza el fitxer `.env`:

```bash
# Utilitzar XLM-RoBERTa per embeddings (local, gratuït)
EMBEDDING_PROVIDER=xlm-roberta

# Encara necessites OpenAI per al chatbot (generació de respostes)
OPENAI_API_KEY=sk-la-teva-clau-api-aqui
OPENAI_CHAT_MODEL=gpt-4o-mini
```

**Nota**: Encara necessites `OPENAI_API_KEY` per al chatbot (generació de respostes). XLM-RoBERTa només s'utilitza per a embeddings (cerca semàntica).

## Ús

### Generar embeddings amb XLM-RoBERTa

#### Opció 1: Utilitzar scripts actualitzats

Els scripts de generació d'embeddings ara suporten automàticament XLM-RoBERTa:

```bash
# Configurar proveïdor
export EMBEDDING_PROVIDER=xlm-roberta

# Generar embeddings
node scripts/generate-embeddings-llibre-primer.js
node scripts/generate-embeddings-llibre-segon.js
# etc.
```

#### Opció 2: Script dedicat (només XLM-RoBERTa)

També hi ha scripts dedicats que només utilitzen XLM-RoBERTa:

```bash
node scripts/generate-embeddings-llibre-primer-xlm.js
```

### Utilitzar a l'API

L'API `unified-chat.ts` detecta automàticament el proveïdor configurat:

```bash
# .env
EMBEDDING_PROVIDER=xlm-roberta
OPENAI_API_KEY=sk-...  # Encara necessari per al chatbot
```

El sistema utilitzarà XLM-RoBERTa per a embeddings i OpenAI per a la generació de respostes.

## Com funciona

1. **Primera execució**: El model es descarrega automàticament (~500MB) i es guarda a la cache
2. **Execucions posteriors**: El model es carrega des de la cache (més ràpid)
3. **Generació**: Cada text es converteix en un vector de 768 dimensions
4. **Cerca**: Els embeddings es comparen utilitzant similitud cosinus

## Rendiment

### Primera càrrega
- Descarrega del model: ~2-5 minuts (depèn de la connexió)
- Càrrega a memòria: ~10-30 segons

### Generació d'embeddings
- Velocitat: ~50-100 textos/segon (depèn del hardware)
- Memòria: ~1-2GB RAM

### Comparació amb OpenAI

| Mètrica | OpenAI | XLM-RoBERTa |
|---------|--------|-------------|
| Temps per embedding | ~200-500ms | ~10-20ms |
| Cost per 1000 embeddings | ~$0.13 | $0 |
| Requereix internet | Sí | No (després de la primera descàrrega) |

## Troubleshooting

### Error: "Cannot find module '@xenova/transformers'"

```bash
npm install @xenova/transformers
```

### Error: "Model download failed"

Assegura't que tens connexió a internet per la primera descàrrega. El model es descarrega automàticament de Hugging Face.

### Error: "Out of memory"

XLM-RoBERTa requereix ~1-2GB de RAM. Si tens problemes:
- Tanca altres aplicacions
- Redueix el batch size als scripts
- Considera utilitzar la versió quantitzada (ja està activada per defecte)

### El model triga molt a carregar

La primera vegada que s'executa, el model es descarrega (~500MB). Les execucions posteriors són molt més ràpides.

### Embeddings de dimensions diferents

- **OpenAI**: 3072 dimensions (text-embedding-3-large)
- **XLM-RoBERTa**: 768 dimensions

Això no és un problema: els embeddings es poden comparar independentment de les dimensions. Però **no barregis embeddings de diferents models** en el mateix corpus.

## Recomanacions

### Quan utilitzar XLM-RoBERTa

✅ **Utilitza XLM-RoBERTa si:**
- Vols evitar costos d'API
- Necessites màxima privacitat
- Tens un volum alt de consultes
- Treballes en un entorn sense internet (després de la primera descàrrega)

### Quan utilitzar OpenAI

✅ **Utilitza OpenAI si:**
- Necessites la màxima qualitat d'embeddings
- Tens un volum baix de consultes
- No et preocupa el cost
- Necessites embeddings de 3072 dimensions

## Exemple complet

```bash
# 1. Configurar
echo "EMBEDDING_PROVIDER=xlm-roberta" >> .env
echo "OPENAI_API_KEY=sk-..." >> .env

# 2. Generar embeddings
node scripts/generate-embeddings-llibre-primer.js

# 3. El model es descarrega automàticament la primera vegada
# 4. Els embeddings es generen localment
# 5. Els fitxers JSON es creen igual que amb OpenAI
```

## Referències

- [XLM-RoBERTa a Hugging Face](https://huggingface.co/xlm-roberta-base)
- [@xenova/transformers](https://github.com/xenova/transformers.js)
- [Paper original XLM-RoBERTa](https://arxiv.org/abs/1911.02116)
