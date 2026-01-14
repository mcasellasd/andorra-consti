# Guia per incorporar doctrina i aprenentatge al sistema d'indexació

Aquest document explica com incorporar els documents de doctrina i les recomanacions d'aprenentatge al sistema RAG (Retrieval-Augmented Generation).

## Resum del procés

El procés consta de 4 passos:

1. **Processar documents de doctrina** - Converteix els documents .txt en entrades de coneixement RAG
2. **Generar embeddings de doctrina** - Crea embeddings per a les entrades de doctrina
3. **Generar embeddings d'aprenentatge** - Crea embeddings per a les recomanacions d'aprenentatge
4. **Unificar el corpus** - Combina tot amb el corpus de la Constitució

## Pas 1: Processar documents de doctrina

Aquest pas processa els documents .txt de doctrina i els converteix en entrades de coneixement estructurades.

### Documents disponibles

- `20 anys.txt` - Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució
- `La constitución andorrana y la ordenación territorial del poder público.txt` - Doctrina sobre ordenació territorial

### Executar el processament

```bash
# Processar tots els documents
npm run process:doctrina

# O processar un document específic
node scripts/processar-doctrina-txt.js 20-anys
node scripts/processar-doctrina-txt.js constitucio-territorial
```

Això generarà fitxers JSON a `data/rag/doctrina/` amb les entrades de coneixement.

## Pas 2: Generar embeddings de doctrina

Aquest pas genera embeddings per a les entrades de doctrina processades.

### Requisits

- Variable d'entorn `OPENAI_API_KEY` configurada (o `EMBEDDING_PROVIDER=xlm-roberta` per utilitzar el model local)

### Executar la generació

```bash
# Generar embeddings per a tots els documents de doctrina
npm run embed:doctrina

# O generar embeddings per a un document específic
node scripts/generate-embeddings-doctrina.js 20-anys
```

Això generarà fitxers `-embeddings.json` a `data/rag/doctrina/`.

## Pas 3: Generar embeddings d'aprenentatge

Aquest pas genera embeddings per a les recomanacions d'aprenentatge generades pel sistema d'avaluació.

### Requisits

- Haver executat el sistema d'aprenentatge (veure `/preguntes-control` i clicar "Executar Aprenentatge i Millora")
- Els informes d'avaluació han d'estar a `aprenentatge/informe-avaluacio-*.json`

### Executar la generació

```bash
npm run embed:aprenentatge
```

Això generarà:
- `data/rag/aprenentatge/aprenentatge.json` - Entrades de coneixement
- `data/rag/aprenentatge/aprenentatge-embeddings.json` - Embeddings

## Pas 4: Unificar el corpus

Aquest pas combina tot el coneixement (Constitució + doctrina + aprenentatge) en un sol corpus unificat.

### Executar la unificació

```bash
npm run unificar:corpus
```

Això generarà:
- `data/rag/constitucio-unified.json` - Totes les entrades de coneixement unificades
- `data/rag/constitucio-unified-embeddings.json` - Tots els embeddings unificats

### Integració automàtica

El sistema RAG (`lib/rag/corpus.ts`) carregarà automàticament el corpus unificat si existeix, o només la Constitució si no existeix.

## Procés complet (exemple)

```bash
# 1. Processar documents de doctrina
npm run process:doctrina

# 2. Generar embeddings de doctrina
npm run embed:doctrina

# 3. Executar el sistema d'aprenentatge (des de la UI o API)
# Visita /preguntes-control i clica "Executar Aprenentatge i Millora"

# 4. Generar embeddings d'aprenentatge
npm run embed:aprenentatge

# 5. Unificar tot el corpus
npm run unificar:corpus
```

## Estructura de dades

### Entrades de coneixement

Cada entrada conté:
- `id`: Identificador únic (ex: `DOCTRINA_20_ANYS_001`)
- `category`: Categoria (`doctrina`, `jurisprudència`, `aprenentatge`)
- `topic`: Tema de l'entrada
- `content`: Contingut del text
- `keyConcepts`: Conceptes clau extrets automàticament
- `legalReference`: Referència legal
- `source`: Font de la informació
- `sourceType`: Tipus de font
- `year`: Any de publicació
- `author`: Autor (si aplica)
- `codi`: Codi relacionat (`constitucio`, etc.)

### Embeddings

Cada embedding conté:
- `id`: ID de l'entrada corresponent
- `topic`: Tema de l'entrada
- `category`: Categoria
- `embedding`: Vector d'embeddings (array de números)
- `text`: Resum del text (primer 200 caràcters)

## Verificació

Per verificar que tot funciona correctament:

1. **Verificar fitxers generats**:
   ```bash
   ls -la data/rag/doctrina/
   ls -la data/rag/aprenentatge/
   ls -la data/rag/constitucio-unified.*
   ```

2. **Provar el sistema RAG**:
   - Fes una pregunta al chatbot
   - Verifica que les fonts inclouen entrades de doctrina o aprenentatge
   - Revisa els logs del servidor per veure quines entrades s'han recuperat

## Troubleshooting

### Error: "No s'ha trobat el fitxer"

- Assegura't que els documents .txt estan a `docs/`
- Verifica que els noms dels fitxers coincideixen amb els definits a `scripts/processar-doctrina-txt.js`

### Error: "OPENAI_API_KEY no configurada"

- Estableix la variable d'entorn: `export OPENAI_API_KEY="tu-api-key"`
- O configura `EMBEDDING_PROVIDER=xlm-roberta` per utilitzar el model local

### Error: "No s'han trobat informes d'avaluació"

- Executa primer el sistema d'aprenentatge des de `/preguntes-control`
- Assegura't que els informes estan a `aprenentatge/informe-avaluacio-*.json`

### El sistema no troba entrades de doctrina

- Verifica que has executat `npm run unificar:corpus`
- Comprova que els fitxers unificats existeixen
- Revisa que `lib/rag/corpus.ts` està carregant correctament els fitxers unificats

## Actualitzar el corpus

Quan afegeixis nous documents de doctrina o generis nous informes d'aprenentatge:

1. Processa els nous documents
2. Genera els embeddings
3. Executa la unificació de nou

El sistema carregarà automàticament el corpus actualitzat.

## Referències

- [Com processar legislació andorrana](./PROCESSAR-LEGISLACIO-ANDORRANA.md)
- [Com generar embeddings](./GENERAR-EMBEDDINGS.md)
- [Sistema d'aprenentatge](../lib/aprenentatge/millora-prompts.ts)
