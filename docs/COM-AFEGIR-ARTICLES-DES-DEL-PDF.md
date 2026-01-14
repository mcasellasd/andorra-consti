# Com afegir articles des del PDF

## Flux recomanat (2025)

1. **Descarrega el PDF oficial** (exemple per al llibre sisè):
   ```bash
   curl -L 'https://portaldogc.gencat.cat/utilsEADOP/AppJava/PdfProviderServlet?documentId=777422&type=01' -o docs/llibre-sise.pdf
   ```
2. **Extreu el text amb pdfminer** (cal tenir `.venv` activat):
   ```bash
   ./.venv/bin/python - <<'PY'
   from pdfminer.high_level import extract_text
   text = extract_text('docs/llibre-sise.pdf')
   with open('docs/llibre-sise.txt', 'w', encoding='utf-8') as f:
       f.write(text)
   PY
   ```
3. **Genera els articles estructurats**:
   ```bash
   node scripts/process-text-to-articles.js docs/llibre-sise.txt data/chapters/extracted-articles-llibre-sise.ts
   ```
4. **Construeix les entrades de coneixement per al RAG**:
   ```bash
   node scripts/build-llibre-sise-knowledge.js
   ```
5. **Genera (o regenera) les embeddings**:
   ```bash
   npm run embed:llibre-sise
   ```
   > Cal definir `OPENAI_API_KEY` i, opcionalment, `OPENAI_EMBEDDINGS_MODEL`.
6. **Revisa les integracions a `data/articles.ts`, `lib/rag/corpus.ts` i `components/ChatWidget.tsx` per assegurar que el llibre apareix al catàleg i al selector del xat.**

Els scripts accepten rutes personalitzades, de manera que es poden repetir els passos per a altres llibres canviant els fitxers d'origen/destinació.

## Opció 1: Processament automàtic clàssic

1. **Extreu el text del PDF:**
   - Obre el PDF `docs/llibre cinquè.pdf`
   - Selecciona tot el text (Cmd+A / Ctrl+A)
   - Copia el text (Cmd+C / Ctrl+C)

2. **Guarda el text:**
   - Crea o edita el fitxer `docs/extracted-text.txt`
   - Enganxa el text copiat
   - Guarda el fitxer

3. **Executa el script:**
   ```bash
   node scripts/process-text-to-articles.js
   ```

4. **Revisa els articles generats:**
   - Obre `data/chapters/extracted-articles.ts`
   - Revisa i ajusta els articles segons sigui necessari
   - Assegura't que els títols i el contingut siguin correctes

5. **Importa els articles:**
   - Obre `data/articles.ts`
   - Afegeix: `import { extractedArticles } from './chapters/extracted-articles';`
   - Afegeix `...extractedArticles,` a l'array d'articles

## Opció 2: Addició manual

Si el processament automàtic no funciona bé, pots afegir els articles manualment:

1. Obre el PDF i llegeix cada article
2. Per a cada article, afegeix-lo al fitxer del capítol corresponent:

```typescript
{
  id: '5',
  number: 'Article 5',
  title: 'Títol de l\'article',
  section: 'Capítol I: Disposicions Generals',
  content: `
1. Primer paràgraf.

2. Segon paràgraf.
  `,
  summary: 'Resum opcional',
}
```

## Consells

- **Format del contingut**: Utilitza template strings (backticks) per al contingut multilínia
- **Numeració**: Assegura't que els números d'articles siguin correctes
- **Capítols**: Verifica que cada article estigui al capítol correcte
- **Resums**: Afegeix resums per facilitar la navegació

## Estructura esperada del text

El script busca patrons com:
- `Article 1: Títol`
- `Article 1. Títol`
- `Art. 1: Títol`

I capítols com:
- `Capítol I: Nom del Capítol`
- `Capítol II: Nom del Capítol`

Si el teu PDF té un format diferent, ajusta els patrons al fitxer `scripts/process-text-to-articles.js`.

