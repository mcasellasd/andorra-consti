# Estat d’indexació i embeddings del RAG (Andorra)

Aquest document descriu quins documents es poden indexar i generar embeddings per al sistema RAG del projecte (Constitució d’Andorra + doctrina + aprenentatge) i com verificar que tot estigui coherent.

## Pipeline: què s’indexa i on es guarda

| Etapa | Font / Origen | Fitxer de coneixement (knowledge) | Fitxer d’embeddings | Com generar |
|-------|----------------|-----------------------------------|----------------------|-------------|
| **1. Constitució** | `docs/constitucio-andorra.txt` | `data/rag/constitucio.json` | `data/rag/constitucio-embeddings.json` | 1) `node scripts/process-constitucio-completa.js` → 2) `node scripts/generate-embeddings-constitucio.js` |
| **2. Doctrina** | Fitxers .txt a `docs/` / `docs/nous/` | Cada `doctrina/<nom>.json` | `doctrina/<nom>-embeddings.json` | **Recomanat:** `npx tsx scripts/processar-doctrina-xlm.ts` (XLM-RoBERTa, sense API). Alternativa OpenAI: `processar-doctrina-txt.js` + `generate-embeddings-doctrina.js` |
| **3. Aprenentatge** | Informes a `aprenentatge/informe-avaluacio-*.json` | `data/rag/aprenentatge/aprenentatge.json` | `data/rag/aprenentatge/aprenentatge-embeddings.json` | `node scripts/generate-embeddings-aprenentatge.js` (crea knowledge + embeddings) |
| **4. Unificat** | Suma de 1 + 2 + 3 | `data/rag/constitucio-unified.json` | `data/rag/constitucio-unified-embeddings.json` | `node scripts/unificar-corpus-doctrina.js` |

L’aplicació carrega **només** el corpus unificat (o, si no existeix, només Constitució):

- `lib/rag/corpus.ts` intenta primer: `constitucio-unified.json` + `constitucio-unified-embeddings.json`
- Fallback: `constitucio.json` + `constitucio-embeddings.json`

Per tant, per tenir **tots** els documents indexats i amb embeddings al RAG cal:

1. Tenir `constitucio.json` i `constitucio-embeddings.json` (Constitució completa).
2. (Opcional) Tenir doctrina i aprenentatge amb els seus embeddings.
3. Executar **unificar-corpus-doctrina.js** per generar `constitucio-unified.json` i `constitucio-unified-embeddings.json`.

## Resultat de la revisió (exemple)

En executar `node scripts/check-embeddings-status.js` es pot veure:

| Fitxer | Entrades | Notes |
|--------|----------|------|
| `constitucio-unified.json` | 1532 | Knowledge unificat |
| `constitucio-unified-embeddings.json` | 1427 | Embeddings unificats |
| `constitucio.json` | 109 | Constitució indexada |
| `constitucio-embeddings.json` | 4 | **Falten embeddings** per 105 entrades |
| `doctrina/20-anys.json` | 254 | Doctrina indexada |
| `doctrina/20-anys-embeddings.json` | 254 | Doctrina amb embeddings OK |

Si el nombre d’entrades de `constitucio.json` (109) és superior al d’`constitucio-embeddings.json` (4), **105 entrades de la Constitució no tenen embedding**. Això provoca que al corpus unificat hi hagi més entrades de coneixement (1532) que embeddings (1427). Cal tornar a generar els embeddings de la Constitució i després unificar de nou.

**Passos per deixar-ho coherent:**

1. `node scripts/generate-embeddings-constitucio.js` (genera embeddings per a les 109 entrades de `constitucio.json`).
2. `node scripts/unificar-corpus-doctrina.js` (regenera el corpus unificat amb tots els embeddings).
3. `node scripts/check-embeddings-status.js` (comprovar que les entrades de knowledge i embeddings coincideixen).

## Com revisar que tot estigui indexat i amb embeddings

Executeu el script de revisió:

```bash
node scripts/check-rag-indexacio-completa.js
```

El script comprova:

1. **Fonts originals**: existeix `docs/constitucio-andorra.txt`, directoris `data/rag/doctrina` i `data/rag/aprenentatge`.
2. **Constitució**: `constitucio.json` (nombre d’entrades) i `constitucio-embeddings.json` (nombre d’embeddings, dimensions, coherència d’IDs).
3. **Doctrina**: per cada fitxer `doctrina/<nom>.json`, que existeixi el corresponent `doctrina/<nom>-embeddings.json` i que el nombre d’entrades coincideixi.
4. **Aprenentatge**: `aprenentatge/aprenentatge.json` i `aprenentatge/aprenentatge-embeddings.json` amb mateix nombre d’entrades.
5. **Corpus unificat**: `constitucio-unified.json` i `constitucio-unified-embeddings.json` amb el mateix nombre d’entrades i que cada ID de knowledge tingui embedding.

Sortida esperada si tot és correcte:

- ✅ per a cada fitxer present i coherent.
- ❌ si falta algun fitxer obligatori o hi ha desajust entre knowledge i embeddings.
- ⚠️ per a directoris opcionals buits o sense fitxers.

## Ordre recomanat per generar tot des de zero

1. **Constitució**  
   - `node scripts/process-constitucio-completa.js`  
   - `node scripts/generate-embeddings-constitucio.js`  
   (Requisit: `docs/constitucio-andorra.txt`. Per embeddings: Xenova/XLM-RoBERTa local per defecte; opcional `OPENAI_API_KEY` si s’usa OpenAI.)

2. **Doctrina** (opcional)  
   - Afegir/processar fitxers a `data/rag/doctrina/*.json`.  
   - `node scripts/generate-embeddings-doctrina.js`

3. **Aprenentatge** (opcional)  
   - `node scripts/generate-embeddings-aprenentatge.js`  
   (Si existeix el directori d’aprenentatge i informes d’avaluació.)

4. **Unificat**  
   - `node scripts/unificar-corpus-doctrina.js`

5. **Verificació**  
   - `node scripts/check-rag-indexacio-completa.js`

## Models d’embeddings

El script de revisió indica les dimensions dels vectors i el model probable:

- **3072**: OpenAI `text-embedding-3-large`
- **1536**: OpenAI `text-embedding-3-small`
- **768**: XLM-RoBERTa / BERT base (local)

Tots els embeddings del corpus unificat han de tenir **les mateixes dimensions**; si barregeu models (per exemple OpenAI + XLM-RoBERTa), la cerca per similitud no serà correcta.

## Resum

- **Indexació**: cada document (Constitució, doctrina, aprenentatge) es converteix en entrades al fitxer de coneixement (knowledge) corresponent.
- **Embeddings**: cada fitxer de coneixement ha de tenir el seu fitxer d’embeddings amb el mateix nombre d’entrades i els mateixos `id`.
- **Corpus unificat**: és el que usa l’app; cal generar-lo amb `unificar-corpus-doctrina.js` després de tenir Constitució (i opcionalment doctrina i aprenentatge) amb els seus embeddings.
- **Revisió**: `node scripts/check-rag-indexacio-completa.js` per comprovar que hem pogut indexar i generar embeddings de tots els docs i que el corpus unificat és coherent. En corpus grans pot trigar (parseja tots els JSON). Revisió ràpida: `node scripts/check-embeddings-status.js`.

### Coherència knowledge vs embeddings al unificat

El nombre d'entrades a `constitucio-unified.json` ha de coincidir amb `constitucio-unified-embeddings.json`. Si no coincideix (per exemple 1532 entrades vs 1427 embeddings), hi ha entrades sense embedding: cal assegurar que cada font (Constitució, doctrina, aprenentatge) té el mateix nombre d'entrades al seu `.json` que al seu `-embeddings.json`, i tornar a executar `unificar-corpus-doctrina.js`.
