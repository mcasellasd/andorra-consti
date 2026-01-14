# Com processar documents legals d'Andorra

## Documents disponibles

1. **Codi Civil d'Andorra** - PDF disponible al BOPA
2. **Constitució d'Andorra** - PDF: `docs/Constitucio dAndorra  Catala.pdf`

## Processament del Codi Civil

### Pas 1: Extreure text del PDF

```bash
# Si tens el PDF del Codi Civil
node scripts/extract-pdf-text.js docs/codi-civil-andorra.pdf docs/codi-civil-andorra.txt

# O amb pdfminer (Python)
python3 << 'PY'
from pdfminer.high_level import extract_text
text = extract_text('docs/codi-civil-andorra.pdf')
with open('docs/codi-civil-andorra.txt', 'w', encoding='utf-8') as f:
    f.write(text)
PY
```

### Pas 2: Processar articles

```bash
node scripts/process-codi-civil-andorra.js docs/codi-civil-andorra.txt data/codis/codi-civil/articles.ts
```

### Pas 3: Revisar i ajustar

Obre `data/codis/codi-civil/articles.ts` i revisa els articles generats.

## Processament de la Constitució

### Pas 1: Extreure text del PDF

```bash
# El PDF ja està a docs/
node scripts/extract-pdf-text.js "docs/Constitucio dAndorra  Catala.pdf" docs/constitucio-andorra.txt

# O amb pdfminer (Python)
python3 << 'PY'
from pdfminer.high_level import extract_text
text = extract_text('docs/Constitucio dAndorra  Catala.pdf')
with open('docs/constitucio-andorra.txt', 'w', encoding='utf-8') as f:
    f.write(text)
PY
```

### Pas 2: Processar articles

```bash
node scripts/process-constitucio-andorra.js docs/constitucio-andorra.txt data/codis/constitucio/articles.ts
```

### Pas 3: Revisar i ajustar

Obre `data/codis/constitucio/articles.ts` i revisa els articles generats.

## Estructura esperada

### Codi Civil
- **Llibres**: `Llibre I`, `Llibre II`, etc.
- **Títols**: `Títol I`, `Títol II`, etc.
- **Capítols**: `Capítol I`, `Capítol II`, etc.
- **Articles**: `Article 1`, `Article 412-15`, etc.

### Constitució
- **Preàmbul**: Text introductori
- **Títols**: `Títol I`, `Títol II`, etc.
- **Capítols**: `Capítol I`, `Capítol II`, etc.
- **Seccions**: `Secció primera`, `Secció segona`, etc.
- **Articles**: `Article 1`, `Article 2`, etc.

## Troubleshooting

### Error amb pdf-parse

Si tens problemes amb `pdf-parse` degut a la versió de Node:

1. **Opció A**: Actualitza Node.js a la versió 20.16.0 o superior
2. **Opció B**: Utilitza pdfminer (Python) per extreure el text
3. **Opció C**: Copia manualment el text del PDF

### Articles mal extrets

- Revisa el format del text original
- Ajusta els patrons regex als scripts si cal
- Pot ser necessari netejar el text manualment abans de processar

### Problemes amb encoding

Si hi ha caràcters estranys:

```bash
# Converteix a UTF-8
iconv -f ISO-8859-1 -t UTF-8 docs/constitucio-andorra.txt > docs/constitucio-andorra-utf8.txt
```

## Scripts disponibles

- `scripts/extract-pdf-text.js` - Extreu text de PDFs
- `scripts/process-codi-civil-andorra.js` - Processa Codi Civil
- `scripts/process-constitucio-andorra.js` - Processa Constitució

## Estat actual

- ✅ Estructura de dades creada
- ✅ Scripts de processament creats
- ✅ Pàgines de navegació implementades
- ⏳ Esperant text extret dels PDFs per processar

## Pròxims passos

1. Extreure text de la Constitució (PDF ja disponible)
2. Processar articles de la Constitució
3. Obtenir PDF del Codi Civil del BOPA
4. Processar articles del Codi Civil
5. Revisar i ajustar articles generats

