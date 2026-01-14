# Guia Ràpida de Traduccions

## Inici Ràpid

### 1. Configurar API Key d'OpenAI

```bash
export OPENAI_API_KEY="tu-api-key-aqui"
```

O crea un fitxer `.env.local`:
```
OPENAI_API_KEY=tu-api-key-aqui
```

### 2. Generar Traduccions

#### Traduir articles específics:

```bash
# Traduir articles 1-10 al castellà
npm run translate -- --lang=es --start=1 --end=10

# Traduir articles 1-50 al francès
npm run translate -- --lang=fr --start=1 --end=50

# Traduir un fitxer específic
npm run translate -- --lang=es --file=data/codis/constitucio/articles.ts
```

#### Traduir manualment:

Afegeix traduccions directament al fitxer d'articles:

```typescript
{
  id: "CCA_LI_A001",
  text_oficial: "L'accés al procés judicial...",
  idiomes: {
    es: "El acceso al proceso judicial...",
    fr: "L'accès au processus judiciaire..."
  }
}
```

### 3. Utilitzar Traduccions al Codi

```typescript
import { getArticleText, getIdiomaActual } from '../lib/i18n';

const idioma = getIdiomaActual(); // 'ca' | 'es' | 'fr'
const textTraduit = getArticleText(article, idioma);
```

## Comandos Útils

| Comando | Descripció |
|---------|------------|
| `npm run translate -- --lang=es --start=1 --end=10` | Traduir articles 1-10 al castellà |
| `npm run translate -- --lang=fr --start=1 --end=100` | Traduir articles 1-100 al francès |
| `npm run translate -- --lang=es --file=data/codis/constitucio/articles.ts` | Traduir fitxer específic |

## Notes Importants

⚠️ **Backup automàtic**: El script crea un backup abans de modificar fitxers

⚠️ **Rate limiting**: El script espera 1 segon entre traduccions per no saturar l'API

⚠️ **Costs**: Recorda que OpenAI API té costos. Revisa l'ús a [OpenAI Dashboard](https://platform.openai.com/usage)

## Veure Documentació Completa

Per més detalls, consulta: [`docs/ESTRATEGIA-TRADUCCIONS.md`](./ESTRATEGIA-TRADUCCIONS.md)
