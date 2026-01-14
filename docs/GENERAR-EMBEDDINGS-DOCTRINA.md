# Com generar embeddings de doctrina

Per generar els embeddings de la doctrina processada, cal tenir configurada la variable d'entorn `OPENAI_API_KEY`.

## Pas 1: Configurar OPENAI_API_KEY

### Opció A: Variable d'entorn temporal
```bash
export OPENAI_API_KEY="sk-tu-api-key-aqui"
```

### Opció B: Fitxer .env (recomanat)
Crea un fitxer `.env` a l'arrel del projecte:
```
OPENAI_API_KEY=sk-tu-api-key-aqui
```

**Nota**: El fitxer `.env` no s'ha de commitar al repositori (ja està a `.gitignore`).

## Pas 2: Generar embeddings

Un cop configurada la clau API, executa:

```bash
npm run embed:doctrina
```

Això generarà els embeddings per a tots els documents de doctrina processats (actualment 254 entrades de "20 anys.txt").

**Temps estimat**: Depèn del nombre d'entrades i de la velocitat de l'API. Per 254 entrades, pot trigar uns 5-10 minuts.

## Pas 3: Unificar el corpus

Després de generar els embeddings, unifica el corpus:

```bash
npm run unificar:corpus
```

Això crearà:
- `data/rag/constitucio-unified.json` - Totes les entrades (Constitució + doctrina)
- `data/rag/constitucio-unified-embeddings.json` - Tots els embeddings

## Verificació

Per verificar que els embeddings s'han generat correctament:

```bash
ls -lh data/rag/doctrina/*-embeddings.json
ls -lh data/rag/constitucio-unified-embeddings.json
```

Els fitxers d'embeddings haurien de tenir un tamany significatiu (milers de línies).

## Cost estimat

Amb el model `text-embedding-3-large`:
- Cost aproximat: ~$0.13 per 1M tokens d'entrada
- Per 254 entrades de ~2000 caràcters cadascuna: ~$0.01-0.02

## Troubleshooting

### Error: "OPENAI_API_KEY no configurada"
- Verifica que has configurat la variable d'entorn
- Si utilitzes `.env`, assegura't que el fitxer està a l'arrel del projecte
- Reinicia el terminal després de configurar la variable

### Error: "Rate limit exceeded"
- L'API d'OpenAI té límits de velocitat
- El script inclou pauses automàtiques (100ms entre requests)
- Si persisteix, espera uns minuts i torna a executar

### Error: "Invalid API key"
- Verifica que la clau API és vàlida
- Assegura't que comença amb "sk-"
- Verifica que no hi ha espais o caràcters extra

## Alternativa: Utilitzar XLM-RoBERTa

Si no tens accés a OpenAI API, pots utilitzar XLM-RoBERTa, però requereix executar des de Next.js (no des de scripts Node.js directament). Contacta amb el desenvolupador per més informació.
