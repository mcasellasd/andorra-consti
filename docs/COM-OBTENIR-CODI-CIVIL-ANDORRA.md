# Com obtenir i processar el Codi Civil (Procediment Civil) d'Andorra

⚠️ **NOTA IMPORTANT**: Actualment, Andorra no disposa d'un Codi Civil unificat. Aquest procés es refereix principalment al **Codi de procediment civil** (Llei 22/2021) i altres lleis civils fonamentals que s'agrupen sota aquesta categoria en el projecte.

## 1. Obtenir el PDF oficial

### Opció A: Descarregar del BOPA (Butlletí Oficial del Principat d'Andorra)

1. Accedeix al portal del BOPA: https://www.bopa.ad
2. Cerca "Codi de procediment civil" o "Llei 22/2021".
3. Descarrega el PDF del text consolidat.
4. Guarda'l a `docs/codi-civil-andorra.pdf`.

### Opció B: Utilitzar PDFs existents

Si ja tens el PDF correcte, copia'l a:
```bash
cp /ruta/al/codi-procediment-civil.pdf docs/codi-civil-andorra.pdf
```

## 2. Extreure el text del PDF

### Opció A: Amb pdfminer (Script Python)

Si tens Python configurat:

```bash
# Activa l'entorn virtual si cal
# source .venv/bin/activate

# Extreu el text
python3 << 'PY'
from pdfminer.high_level import extract_text
text = extract_text('docs/codi-civil-andorra.pdf')
with open('docs/codi-civil-andorra.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print("Text extret correctament!")
PY
```

### Opció B: Amb pdf-parse (Node.js)

```bash
node scripts/extract-pdf-text.js docs/codi-civil-andorra.pdf docs/codi-civil-andorra.txt
```

### Opció C: Manual

1. Obre el PDF.
2. Selecciona tot el text (Cmd+A / Ctrl+A).
3. Copia i enganxa en un fitxer nou `docs/codi-civil-andorra.txt`.
4. **Important**: Assegura't que el format es manté (Llibre I, Títol I, Article 1...).

## 3. Processar el text i generar articles

Un cop tens el fitxer de text `docs/codi-civil-andorra.txt`, executa el script de processament:

```bash
node scripts/process-codi-civil-andorra.js docs/codi-civil-andorra.txt data/codis/codi-civil/articles.ts
```

Això analitzarà el text cercant l'estructura legal (Llibres, Títols, Capítols, Articles) i generarà el fitxer TypeScript final.

## 4. Revisar i ajustar

1. Obre `data/codis/codi-civil/articles.ts`.
2. Verifica:
   - Que el número d'articles sigui consistent (aprox. 400-500 articles per al Codi de Procediment Civil).
   - Que no hi hagi text "escombraria" (capçaleres de pàgina, números de pàgina) dins del cos dels articles.
   - Que l'estructura de Llibre/Títol/Capítol sigui correcta.

## 5. Integrar al sistema

El script genera directament un fitxer amb un export anomenat `articlesCodiCivil`.

Per utilitzar-lo a l'aplicació:

```typescript
import { articlesCodiCivil } from '@/data/codis/codi-civil/articles';

// Exemple d'ús
const article1 = articlesCodiCivil.find(a => a.numeracio === 'Article 1');
```

No cal actualitzar cap fitxer "template"; el fitxer `articles.ts` és complet i autònom.

## Estructura esperada del text

El script busca aquests patrons:

- **Llibres**: `Llibre I`, `Llibre primer`, etc.
- **Títols**: `Títol I`, `Títol primer`, etc.
- **Capítols**: `Capítol I`, `Capítol primer`, etc.
- **Articles**: `Article 1`, `Article 412-15`, etc.

## Troubleshooting

### El script no troba articles

- Revisa `docs/codi-civil-andorra.txt`. És buit? Té caràcters estranys?
- Assegura't que l'encoding sigui UTF-8.
- Si el format del text extret ha canviat (ex: "Art. 1" en lloc de "Article 1"), hauràs de modificar les expressions regulars a `scripts/process-codi-civil-andorra.js`.

### Problemes d'encoding

Si veus caràcters estranys:
```bash
iconv -f ISO-8859-1 -t UTF-8 docs/codi-civil-andorra.txt > docs/codi-civil-andorra-utf8.txt
mv docs/codi-civil-andorra-utf8.txt docs/codi-civil-andorra.txt
```
