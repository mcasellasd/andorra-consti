# Com processar la legislació andorrana per al RAG

Aquest document explica com descarregar, processar i afegir la legislació andorrana al sistema RAG.

## Pas 1: Descarregar els PDFs

Executa el script per descarregar tots els PDFs de la llista de legislació:

```bash
node scripts/download-legislacio-pdfs.js
```

Això descarregarà tots els PDFs a `docs/legislacio-andorrana/`.

**Nota:** Si algun PDF falla, pots tornar a executar el script; saltarà els que ja existeixen.

## Pas 2: Processar els PDFs i generar entrades RAG

Un cop descarregats els PDFs, processa'ls per generar les entrades de coneixement:

```bash
# Processar totes les normes
node scripts/process-legislacio-pdfs.js

# O processar una norma específica
node scripts/process-legislacio-pdfs.js reglament-codi-duana
```

Això generarà fitxers JSON a `data/rag/legislacio-andorrana/` amb les entrades de coneixement per a cada document.

## Pas 3: Generar embeddings

Per generar els embeddings (necessaris per a la cerca semàntica):

```bash
# Assegura't de tenir la variable d'entorn OPENAI_API_KEY
export OPENAI_API_KEY="tu-api-key"

# Generar embeddings per a totes les normes
node scripts/generate-embeddings-legislacio.js

# O generar embeddings per a una norma específica
node scripts/generate-embeddings-legislacio.js reglament-codi-duana
```

**Nota:** Aquest pas pot trigar una estona i consumeix crèdits de l'API d'OpenAI.

## Pas 4: Unificar el corpus

Un cop processats tots els documents i generats els embeddings, unifica'ls en un sol fitxer:

```bash
node scripts/load-legislacio-corpus.js
```

Això crearà:
- `data/rag/legislacio-andorrana-unified.json` - Totes les entrades de coneixement
- `data/rag/legislacio-andorrana-unified-embeddings.json` - Tots els embeddings

## Pas 5: Verificar la integració

El sistema RAG ja està configurat per carregar automàticament la legislació andorrana quan estigui disponible. El corpus s'actualitzarà automàticament quan els fitxers unificats estiguin disponibles.

## Estructura de dades

### Fitxer de legislació (`data/legislacio-andorrana.ts`)

Conté la llista completa de normes amb:
- `id`: Identificador únic
- `nom`: Nom de la norma
- `url`: Enllaç al PDF
- `tipus`: Tipus de norma (llei, reglament, decret, altres)
- `any`: Any de publicació (opcional)

### Entrades RAG

Cada entrada de coneixement conté:
- `id`: Identificador únic
- `category`: Categoria (Llei, Reglament, etc.)
- `topic`: Tema de l'entrada
- `content`: Contingut del text
- `legalReference`: Referència legal (nom de la norma)
- `keyConcepts`: Conceptes clau extrets automàticament
- `source`: Font original
- `sourceUrl`: URL del PDF
- `sourceType`: Tipus de font
- `year`: Any de publicació

## Troubleshooting

### Error: "PDF no trobat"
- Assegura't d'haver executat el pas 1 (descarregar PDFs)
- Verifica que el PDF existeix a `docs/legislacio-andorrana/`

### Error: "No s'han trobat fitxers per processar"
- Assegura't d'haver executat el pas 2 (processar PDFs)
- Verifica que hi ha fitxers JSON a `data/rag/legislacio-andorrana/`

### Error: "OPENAI_API_KEY no establerta"
- Estableix la variable d'entorn abans d'executar el script
- En macOS/Linux: `export OPENAI_API_KEY="tu-api-key"`
- En Windows: `set OPENAI_API_KEY=tu-api-key`

### Error: "Legislació andorrana no disponible encara"
- Aquest és només un avís, no un error
- Executa els passos 1-4 per generar els fitxers necessaris

## Actualitzar la llista de legislació

Si vols afegir noves normes:

1. Edita `data/legislacio-andorrana.ts` i afegeix la nova norma
2. Executa els passos 1-4 de nou (o només per a la nova norma)

## Referències

- [Com afegir articles des del PDF](./COM-AFEGIR-ARTICLES-DES-DEL-PDF.md)
- [Processar documents d'Andorra](./PROCESSAR-DOCUMENTS-ANDORRA.md)
