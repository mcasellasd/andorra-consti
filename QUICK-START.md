# Quick Start - prudencia.ad

## Pas 1: Obtenir el Codi Civil d'Andorra

### Opció A: Descarregar del BOPA
1. Accedeix a https://www.bopa.ad
2. Cerca "Codi Civil" o "Llei qualificada del Codi Civil"
3. Descarrega el PDF i guarda'l a `docs/codi-civil-andorra.pdf`

### Opció B: Utilitzar PDF existent
Si ja tens el PDF, copia'l a:
```bash
cp /ruta/al/codi-civil-andorra.pdf docs/codi-civil-andorra.pdf
```

## Pas 2: Extreure el text del PDF

```bash
# Amb pdf-parse (Node.js)
node scripts/extract-pdf-text.js docs/codi-civil-andorra.pdf docs/codi-civil-andorra.txt

# O amb pdfminer (Python)
python3 << 'PY'
from pdfminer.high_level import extract_text
text = extract_text('docs/codi-civil-andorra.pdf')
with open('docs/codi-civil-andorra.txt', 'w', encoding='utf-8') as f:
    f.write(text)
PY
```

## Pas 3: Processar i generar articles

```bash
node scripts/process-codi-civil-andorra.js docs/codi-civil-andorra.txt data/codis/codi-civil/articles.ts
```

Això generarà el fitxer amb tots els articles estructurats.

## Pas 4: Revisar i ajustar

1. Obre `data/codis/codi-civil/articles.ts`
2. Revisa els articles generats
3. Ajusta manualment si cal (títols, tags, dates, etc.)

## Pas 5: Provar el sistema

```bash
# Instal·la dependències (si cal)
npm install

# Executa el servidor de desenvolupament
npm run dev
```

Obre http://localhost:3000 i navega a `/codis/civil/article/cc-art-1` per veure un article d'exemple.

## Estat actual

El sistema està configurat amb **articles d'exemple** per provar les funcionalitats:

- ✅ Estructura de dades implementada
- ✅ Sistema d'idiomes (CA, ES, FR)
- ✅ Component d'interpretació IA
- ✅ API endpoint per generar interpretacions
- ✅ Pàgines d'articles funcionals

**Pròxim pas**: Obtenir el PDF real i processar-lo amb els scripts creats.

## Articles d'exemple disponibles

- `cc-art-1`: Article 1 - Disposicions generals
- `cc-art-2`: Article 2 - Aplicació del Codi
- `cc-art-412-15`: Article 412-15 - Matrimoni

Pots accedir-hi a:
- http://localhost:3000/codis/civil/article/cc-art-1
- http://localhost:3000/codis/civil/article/cc-art-2
- http://localhost:3000/codis/civil/article/cc-art-412-15

## Troubleshooting

### Error: "No s'ha trobat el fitxer de text"
- Assegura't que has extret el text del PDF abans
- Verifica que el fitxer existeix a `docs/codi-civil-andorra.txt`

### Error: "pdf-parse no trobat"
```bash
npm install pdf-parse
```

### Articles mal extrets
- Revisa el format del text original
- Ajusta els patrons regex al script si cal
- Pot ser necessari netejar el text manualment

## Recursos

- **Documentació completa**: `docs/COM-OBTENIR-CODI-CIVIL-ANDORRA.md`
- **Scripts**: `scripts/process-codi-civil-andorra.js`
- **BOPA**: https://www.bopa.ad

