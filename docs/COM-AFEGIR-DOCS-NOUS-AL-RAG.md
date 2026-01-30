# Com afegir documents de `docs/nous/` al RAG (embed)

Aquest document explica com fer que els fitxers de **docs/nous/** es vegin al RAG: indexar-los com a entrades de coneixement i generar-ne els embeddings perquè el xat pugui consultar-los.

**Aquest projecte utilitza Xenova/XLM-RoBERTa** per als embeddings (no OpenAI). El flux recomanat és **processar-doctrina-xlm.ts**, que fa indexació i embeddings en un sol pas, sense cap API key.

## Resum del flux (amb Xenova/XLM-RoBERTa)

1. **Afegir el document al catàleg** (si és nou): editar `scripts/processar-doctrina-txt.js` i `scripts/processar-doctrina-xlm.ts` i afegir una entrada a `DOCUMENTS`.
2. **Indexar + embeddings en un sol pas**: executar `npx tsx scripts/processar-doctrina-xlm.ts` (parteix cada .txt, genera `<id>.json` i `<id>-embeddings.json` amb XLM-RoBERTa).
3. **Unificar el corpus**: executar `node scripts/unificar-corpus-doctrina.js` per fusionar Constitució + doctrina en `constitucio-unified.json` i `constitucio-unified-embeddings.json`.

L’app RAG carrega **només** el corpus unificat; per tant, fins que no executeu la unificació, els nous fitxers no apareixeran al xat.

---

## 1. Documents de `docs/nous/` que ja estan al catàleg

Els següents fitxers .txt de **docs/nous/** tenen ja una entrada al catàleg `DOCUMENTS` dels scripts. Només cal **executar** els passos 2–4 perquè surtin al RAG.

| Fitxer a docs/nous/ | ID al catàleg | Títol (resum) |
|--------------------|----------------|----------------|
| 00000042.txt | constitucionalisme-codificacio | Constitucionalisme i codificació |
| 00000043.txt | usos-costums | Sobre usos, costums i el codi |
| 00000045.txt | ponencia-45 | Ponència sobre codificació i veritat |
| 00000050.txt | manual-digest-tedh | El Manual Digest i el TEDH |
| 23-Jane-ca.txt | 23-jane-ca | Document 23 de gener (català) |
| aplicació directa de les normes constitucionals.txt | aplicacio-directa-normes | L'aplicació directa de les normes constitucionals |
| burniol.txt | burniol | Article Burniol sobre sobirania |
| COMUNICACIÓLopez-B.-VD.txt | comunicacio-lopez | Comunicació Lopez B. |
| joan-marti-alanis.txt | joan-marti-alanis | Joan Martí Alanis, bisbe |
| Les relacions internacionals d'Andorra des de la Constituci.txt | relacions-internacionals | Les relacions internacionals d'Andorra des de la Constitució |
| LlibreCompletDretProcessalCivil.txt | dret-processal-civil | Llibre Complet Dret Processal Civil |
| MEMÒRIA 2023 DEFINITIVA.txt | memoria-2023 | Memòria 2023 del Tribunal Constitucional |
| MEMÒRIA 2024-3.txt | memoria-2024 | Memòria 2024 |
| rec5-2019.txt | rec5-2019 | REC5 2019 |
| sollicitud-bisbes-urgell.txt | sollicitud-bisbes-urgell | La sol·licitud dels bisbes d'Urgell |

Si un fitxer .txt nou **no** està en aquesta taula, cal afegir-lo al catàleg (passos a sota).

---

## 2. Afegir un document nou al catàleg

Quan afegiu un fitxer .txt nou a **docs/nous/** (per exemple `nou-document.txt`):

1. Obriu **scripts/processar-doctrina-txt.js** i **scripts/processar-doctrina-xlm.ts**.
2. Dins de l’objecte `DOCUMENTS` (o `DOCUMENTS`), afegiu una entrada amb un **id únic** en minúscules i amb guions (ex: `nou-document`):

```js
  'nou-document': {
    file: 'nous/nou-document.txt',
    title: 'Títol del document',
    author: 'Autor o Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
```

3. Guardeu els dos fitxers.

Després executeu els passos de la secció 3 (Xenova) o 4 (OpenAI).

---

## 3. Comandaments amb Xenova/XLM-RoBERTa (recomanat, sense API)

Executeu **des de l’arrel del projecte**. No cal cap clau API; el model XLM-RoBERTa es descarrega i s’executa en local (la primera vegada pot trigar).

### 3.1. Indexar + generar embeddings (un sol pas)

Un sol script fa: llegir cada .txt del catàleg → partir en fragments → generar `data/rag/doctrina/<id>.json` i `data/rag/doctrina/<id>-embeddings.json` amb XLM-RoBERTa (768 dimensions).

```bash
npx tsx scripts/processar-doctrina-xlm.ts
```

Sense arguments processa **tots** els documents del catàleg. Per processar només un document:

```bash
npx tsx scripts/processar-doctrina-xlm.ts 23-jane-ca
```

Requisits: `@xenova/transformers` i `tsx` (o `npx tsx`). La primera execució descarrega el model (~500MB) i el guarda a la cache.

### 3.2. Unificar el corpus

Fusiona Constitució + doctrina (i aprenentatge, si n’hi ha) en el corpus que carrega l’app:

```bash
node scripts/unificar-corpus-doctrina.js
```

Es generen/actualitzen:

- `data/rag/constitucio-unified.json`
- `data/rag/constitucio-unified-embeddings.json`

### 3.3. Comprovar l’estat

```bash
node scripts/check-embeddings-status.js
```

---

## 4. Alternativa: OpenAI (opcional)

Si voleu usar **OpenAI** per als embeddings en lloc de XLM-RoBERTa:

1. **Generar només knowledge** (sense embeddings):  
   `node scripts/processar-doctrina-txt.js`  
   Això crea `data/rag/doctrina/<id>.json`.

2. **Generar embeddings amb OpenAI**:  
   Cal tenir `OPENAI_API_KEY` a .env o .env.local.  
   `node scripts/generate-embeddings-doctrina.js`  
   Això crea `data/rag/doctrina/<id>-embeddings.json`.

3. **Unificar**:  
   `node scripts/unificar-corpus-doctrina.js`

**Nota:** Els embeddings d’OpenAI tenen 3072 dimensions (text-embedding-3-large). El corpus unificat ha de tenir tots els embeddings amb la mateixa dimensió; no barregeu embeddings OpenAI i XLM-RoBERTa al mateix corpus.

---

## 5. Resum: per què no els veig al RAG?

Els documents de **docs/nous/** només es veuen al RAG si:

1. Tenen una entrada al catàleg `DOCUMENTS` dels scripts.
2. S’ha executat **processar-doctrina-xlm.ts** (recomanat: indexació + embeddings amb XLM-RoBERTa) o bé processar-doctrina-txt.js + generate-embeddings-doctrina.js (OpenAI).
3. S’ha executat **unificar-corpus-doctrina.js** per incloure’ls a `constitucio-unified.json` i `constitucio-unified-embeddings.json`.

Si us falten documents de docs/nous/, seguiu la secció 2 per afegir-los al catàleg i després la secció 3 (Xenova) o 4 (OpenAI).
