# Com obtenir i processar el Codi Civil d'Andorra

## 1. Obtenir el PDF oficial

### Opció A: Descarregar del BOPA (Butlletí Oficial del Principat d'Andorra)

1. Accedeix al portal del BOPA: https://www.bopa.ad
2. Cerca "Codi Civil" o "Llei qualificada del Codi Civil"
3. Descarrega el PDF del Codi Civil d'Andorra (versió 2022 o més recent)
4. Guarda'l a `docs/codi-civil-andorra.pdf`

### Opció B: Utilitzar PDFs existents

Si ja tens el PDF del Codi Civil d'Andorra, copia'l a:
```bash
cp /ruta/al/codi-civil-andorra.pdf docs/codi-civil-andorra.pdf
```

## 2. Extreure el text del PDF

### Opció A: Amb pdfminer (recomanat)

Si tens Python i un entorn virtual:

```bash
# Activa l'entorn virtual (si existeix)
source .venv/bin/activate  # Linux/Mac
# o
.venv\Scripts\activate  # Windows

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

1. Obre el PDF amb un lector (Adobe Reader, Preview, etc.)
2. Selecciona tot el text (Cmd+A / Ctrl+A)
3. Copia el text (Cmd+C / Ctrl+C)
4. Crea el fitxer `docs/codi-civil-andorra.txt`
5. Enganxa el text i guarda'l

## 3. Processar el text i generar articles

Un cop tens el fitxer de text, executa el script de processament:

```bash
node scripts/process-codi-civil-andorra.js docs/codi-civil-andorra.txt data/codis/codi-civil/articles.ts
```

Això generarà el fitxer `data/codis/codi-civil/articles.ts` amb tots els articles estructurats.

## 4. Revisar i ajustar

1. Obre `data/codis/codi-civil/articles.ts`
2. Revisa els articles generats:
   - Verifica que els números d'articles siguin correctes
   - Comprova que els títols i capítols estiguin ben assignats
   - Assegura't que el contingut estigui complet
3. Ajusta manualment si cal:
   - Corregir títols mal extrets
   - Afegir tags rellevants
   - Corregir dates de vigència
   - Afegir enllaços entre articles relacionats

## 5. Integrar al sistema

Un cop els articles estiguin revisats, actualitza `data/codis/codi-civil/articles-template.ts`:

```typescript
// Reemplaça el contingut amb:
import { articlesCodiCivil } from './articles';

export { articlesCodiCivil };
```

I actualitza les pàgines que necessitin accedir als articles.

## Estructura esperada del text

El script busca aquests patrons:

- **Llibres**: `Llibre I`, `Llibre II`, etc.
- **Títols**: `Títol I`, `Títol II`, etc.
- **Capítols**: `Capítol I`, `Capítol II`, etc.
- **Articles**: `Article 1`, `Article 412-15`, etc.

Si el teu PDF té un format diferent, ajusta els patrons al fitxer `scripts/process-codi-civil-andorra.js`.

## Exemple de format esperat

```
Llibre I
Disposicions generals

Títol I
Àmbit d'aplicació

Capítol I
Disposicions generals

Article 1
Aquest Codi regula les relacions jurídiques...

Article 2
Les persones físiques tenen dret...
```

## Troubleshooting

### El script no troba articles

- Verifica que el text tingui el format correcte
- Comprova que els articles comencin amb "Article" seguit del número
- Revisa que no hi hagi errors d'encoding (ha de ser UTF-8)

### Articles mal extrets

- Revisa manualment el text original
- Ajusta els patrons regex al script si cal
- Pot ser necessari netejar el text abans de processar-lo

### Problemes amb encoding

Si hi ha caràcters estranys:

```bash
# Converteix a UTF-8
iconv -f ISO-8859-1 -t UTF-8 docs/codi-civil-andorra.txt > docs/codi-civil-andorra-utf8.txt
```

## Recursos

- BOPA: https://www.bopa.ad
- Documentació del Codi Civil d'Andorra: Consultar al BOPA
- Scripts de processament: `scripts/process-codi-civil-andorra.js`

