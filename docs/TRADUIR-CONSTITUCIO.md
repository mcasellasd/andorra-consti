# Com Traduir la Constitució d'Andorra

## Resum

La Constitució d'Andorra té **109 articles** (incloent el Preàmbul) que cal traduir al castellà i francès.

## Estat Actual

- ✅ Tots els articles tenen el text oficial en català (`idiomes.ca`)
- ❌ Cap article té traducció al castellà (`idiomes.es`)
- ❌ Cap article té traducció al francès (`idiomes.fr`)

## Opcions per Traduir

### Opció 1: Amb el Script Automàtic (Recomanat)

El script `generate-translations.js` pot generar traduccions automàticament amb IA:

```bash
# Configurar API key d'OpenAI
export OPENAI_API_KEY="tu-api-key"

# Traduir tots els articles al castellà
npm run translate -- --file=data/codis/constitucio/articles.ts --lang=es --start=1 --end=109

# Traduir tots els articles al francès
npm run translate -- --file=data/codis/constitucio/articles.ts --lang=fr --start=1 --end=109

# O traduir en lots més petits per controlar millor el procés
npm run translate -- --file=data/codis/constitucio/articles.ts --lang=es --start=1 --end=20
npm run translate -- --file=data/codis/constitucio/articles.ts --lang=es --start=21 --end=40
# etc...
```

**Nota**: El script crea backups automàtics abans de modificar els fitxers.

### Opció 2: Manual

Pots editar directament el fitxer `data/codis/constitucio/articles.ts` i afegir les traduccions:

```typescript
{
  "id": "CONST_001",
  "text_oficial": "1. Andorra és un Estat independent...",
  "idiomes": {
    "ca": "1. Andorra és un Estat independent...",
    "es": "1. Andorra es un Estado independiente...",  // ← Afegir traducció
    "fr": "1. Andorre est un État indépendant..."      // ← Afegir traducció
  }
}
```

### Opció 3: Traducció Professional

Per garantir la màxima precisió jurídica, considera contractar traductors jurídics professionals especialitzats en dret constitucional.

## Estructura dels Articles

Els articles de la constitució estan en format JSON dins un fitxer TypeScript:

```typescript
export const articlesConstitucio: ArticleAndorra[] = [
  {
    "id": "CONST_PREAMB",
    "numeracio": "Preàmbul",
    "text_oficial": "...",
    "idiomes": {
      "ca": "...",
      "es": "...",  // ← Cal afegir
      "fr": "..."   // ← Cal afegir
    }
  },
  {
    "id": "CONST_001",
    "numeracio": "Article 1",
    // ...
  }
  // ... 107 articles més
];
```

## Priorització

Recomanació per prioritzar les traduccions:

1. **Alta prioritat**: Preàmbul + Articles 1-10 (principis fonamentals)
2. **Mitjana prioritat**: Articles 11-50 (drets i llibertats)
3. **Baixa prioritat**: Articles 51-107 (estructures i procediments)

## Verificació

Després d'afegir traduccions, verifica:

1. **Format JSON vàlid**: El fitxer ha de compilar sense errors
2. **Consistència terminològica**: Utilitza la mateixa terminologia legal
3. **Completesa**: Tots els paràgrafs estan traduïts
4. **Precisió**: Les traduccions reflecteixen el significat legal exacte

## Exemple d'Ús al Codi

Un cop afegides les traduccions, es poden utilitzar així:

```typescript
import { getArticleText, getIdiomaActual } from '../../../../lib/i18n';

const idioma = getIdiomaActual(); // 'ca' | 'es' | 'fr'
const textTraduit = getArticleText(article, idioma);
```

## Referències

- `data/codis/constitucio/articles.ts`: Fitxer amb tots els articles
- `lib/i18n.ts`: Funcions auxiliars per traduccions
- `scripts/generate-translations.js`: Script per generar traduccions amb IA
- `docs/ESTRATEGIA-TRADUCCIONS.md`: Guia completa de traduccions

## Contacte

Per a preguntes sobre la traducció de la constitució, contacta amb l'equip de desenvolupament.
