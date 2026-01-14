# Com extreure el text de la Constitució manualment

Degut a problemes amb les eines d'extracció de PDF, pots extreure el text manualment:

## Mètode 1: Copiar i enganxar (més ràpid)

1. Obre el PDF `docs/Constitucio dAndorra  Catala.pdf` amb un lector de PDFs (Preview, Adobe Reader, etc.)
2. Selecciona tot el text (Cmd+A / Ctrl+A)
3. Copia el text (Cmd+C / Ctrl+C)
4. Crea el fitxer `docs/constitucio-andorra.txt`
5. Enganxa el text i guarda'l

## Mètode 2: Utilitzar una eina online

1. Puja el PDF a una eina online com:
   - https://www.ilovepdf.com/pdf-to-txt
   - https://www.adobe.com/acrobat/online/pdf-to-txt.html
2. Descarrega el text extret
3. Guarda'l a `docs/constitucio-andorra.txt`

## Mètode 3: Amb Python (si tens pdfminer instal·lat)

```bash
python3 << 'PY'
from pdfminer.high_level import extract_text
text = extract_text('docs/Constitucio dAndorra  Catala.pdf')
with open('docs/constitucio-andorra.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print("Text extret correctament!")
PY
```

## Després d'extreure el text

Un cop tens el fitxer `docs/constitucio-andorra.txt`, processa els articles:

```bash
node scripts/process-constitucio-andorra.js docs/constitucio-andorra.txt data/codis/constitucio/articles.ts
```

Això generarà els articles estructurats a `data/codis/constitucio/articles.ts`.

