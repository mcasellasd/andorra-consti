# Guia per generar embeddings RAG

Aquest document explica com generar els embeddings necessaris per al sistema RAG (Retrieval-Augmented Generation) del projecte.

## Requisits

- Node.js instal·lat
- Variable d'entorn `OPENAI_API_KEY` configurada amb una clau vàlida d'OpenAI
- Opcional: `OPENAI_EMBEDDINGS_MODEL` (per defecte: `text-embedding-3-large`)

## Codi Civil de Catalunya

### Llibre IV (Successions)

El Llibre IV encara no té embeddings generats. Per generar-los:

1. **Crear el fitxer de coneixement** (si encara no existeix):
   ```bash
   # Cal crear data/rag/llibre-quart.json amb les entrades de coneixement
   # Pots usar com a referència els altres llibres (llibre-primer.json, etc.)
   ```

2. **Generar els embeddings**:
   ```bash
   cd codicatala/catalunyalegal
   node scripts/generate-embeddings-llibre-quart.js
   ```

3. **Verificar**:
   - S'hauria de crear `data/rag/llibre-quart-embeddings.json`
   - El sistema RAG carregarà automàticament aquests embeddings

### Altres llibres

Els embeddings ja estan generats per als llibres I, II, III, V i VI. Si necessites regenerar-los:

```bash
node scripts/generate-embeddings-llibre-primer.js
node scripts/generate-embeddings-llibre-segon.js
node scripts/generate-embeddings-llibre-tercer.js
node scripts/generate-embeddings-llibre-cinque.js
node scripts/generate-embeddings-llibre-sise.js
```

## Codi de Consum de Catalunya

### Generar embeddings per articles, doctrina i jurisprudència

El sistema del Codi de Consum genera embeddings on-the-fly per defecte, però pots generar-los prèviament per millorar el rendiment:

```bash
cd codicatala/catalunyalegal
node scripts/generate-embeddings-codi-consum.js
```

Això generarà tres fitxers:
- `data/codi-consum/embeddings-articles.json` - Embeddings de tots els articles
- `data/codi-consum/embeddings-doctrina.json` - Embeddings de la doctrina
- `data/codi-consum/embeddings-jurisprudencia.json` - Embeddings de la jurisprudència

**Nota**: El script intenta llegir els fitxers TypeScript directament. Si hi ha problemes, pots crear fitxers JSON intermedis manualment.

### Beneficis dels embeddings pre-generats

- **Rendiment**: Les cerques són molt més ràpides (no cal generar embeddings a cada consulta)
- **Cost**: Redueix significativament les crides a l'API d'OpenAI
- **Fiabilitat**: Menys dependència de la connectivitat i els rate limits de l'API

## Estat actual del sistema RAG

### Codi Civil
- ✅ Llibre I - Embeddings disponibles
- ✅ Llibre II - Embeddings disponibles
- ✅ Llibre III - Embeddings disponibles
- ⚠️  Llibre IV - **Falten embeddings** (script creat, cal generar-los)
- ✅ Llibre V - Embeddings disponibles
- ✅ Llibre VI - Embeddings disponibles

### Codi de Consum
- ⚠️  Articles - Embeddings on-the-fly (script creat per generar-los)
- ⚠️  Doctrina - Embeddings on-the-fly (script creat per generar-los)
- ⚠️  Jurisprudència - Embeddings on-the-fly (script creat per generar-los)

## Com funciona el sistema

1. **Amb embeddings pre-generats**: El sistema carrega els embeddings des dels fitxers JSON i fa cerques per similitud cosinus (molt ràpid).

2. **Sense embeddings pre-generats**: El sistema genera embeddings on-the-fly per cada consulta (més lent i costós).

El sistema detecta automàticament si hi ha embeddings pre-generats i els usa. Si no n'hi ha, fa fallback al mètode on-the-fly.

## Troubleshooting

### Error: "No s'ha trobat l'arxiu de coneixement"
- Assegura't que el fitxer JSON de coneixement existeix abans d'executar el script d'embeddings.

### Error: "OPENAI_API_KEY no configurada"
- Configura la variable d'entorn: `export OPENAI_API_KEY=tu_clau_aqui`

### Error: Rate limit exceeded
- Els scripts inclouen pauses automàtiques cada 10 entrades.
- Si encara tens problemes, augmenta el temps de pausa al script.

### Els embeddings no es carreguen
- Verifica que els fitxers JSON s'han generat correctament.
- Comprova que els fitxers estan a la ruta correcta.
- Revisa la consola per veure si hi ha warnings sobre embeddings no trobats.

