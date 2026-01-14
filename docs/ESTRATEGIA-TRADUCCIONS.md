# Estratègia de Traduccions per a prudencia.ad

## Resum

Aquest document explica com gestionar les traduccions de contingut legal (articles, diccionari, tesaurus) per al portal prudencia.ad, que suporta català (ca), castellà (es) i francès (fr).

## Estructura Actual

### 1. Articles (`ArticleAndorra`)

Els articles ja tenen suport per traduccions:

```typescript
interface ArticleAndorra {
  id: string;
  text_oficial: string; // Text en català (oficial)
  idiomes?: {
    ca?: string;  // Català (opcional, per defecte usa text_oficial)
    es?: string;  // Castellà
    fr?: string;  // Francès
  };
}
```

**Ús a les pàgines:**

```typescript
import { getArticleText, getIdiomaActual } from '../../../../lib/i18n';

const idioma = getIdiomaActual();
const textArticle = getArticleText(article, idioma);
```

### 2. UI Elements

Les traduccions de la interfície estan a `lib/i18n.ts` en l'objecte `traduccions` i s'utilitzen amb la funció `t()`:

```typescript
import { t, getIdiomaActual } from '../lib/i18n';

const idioma = getIdiomaActual();
const textNavegacio = t(idioma, 'nav.inici'); // "Inici" / "Inicio" / "Accueil"
```

## Funcions Auxiliars Disponibles

### Funcions Bàsiques

1. **`getIdiomaActual(): Idioma`**
   - Obté l'idioma actual des de la URL o localStorage
   - Retorna 'ca' per defecte

2. **`setIdioma(idioma: Idioma): void`**
   - Estableix l'idioma i el guarda a localStorage

3. **`t(idioma: Idioma, clau: string): string`**
   - Obté traducció de la UI per clau
   - Exemple: `t(idioma, 'nav.codiCivil')`

### Funcions per Contingut

4. **`getArticleText(article, idioma): string`**
   - Retorna el text de l'article traduït
   - Fallback automàtic a `text_oficial` si no hi ha traducció

5. **`getTranslation(obj, defaultValue, idioma): string`**
   - Funció genèrica per obtenir traduccions de qualsevol objecte `Traduible`
   - Útil per diccionari, tesaurus, etc.

6. **`hasTranslation(obj, idioma): boolean`**
   - Verifica si existeix traducció per a un idioma

7. **`getAvailableLanguages(obj): Idioma[]`**
   - Retorna array amb tots els idiomes disponibles per a un objecte

## Com Afegir Traduccions

### Opció 1: Manual (Articles individuals)

Pots afegir traduccions directament als articles al fitxer `data/codis/codi-civil/articles.ts`:

```typescript
{
  id: "CCA_LI_A001",
  text_oficial: "L'accés al procés judicial és un dret inclòs...",
  idiomes: {
    es: "El acceso al proceso judicial es un derecho incluido...",
    fr: "L'accès au processus judiciaire est un droit inclus..."
  }
}
```

### Opció 2: Amb IA (Recomanat per masses)

Utilitza el script `scripts/generate-translations.js` per generar traduccions de forma semi-automàtica:

```bash
npm run translate:articles -- --lang=es --start=1 --end=100
```

El script:
- Llegeix articles sense traducció
- Genera traduccions amb OpenAI
- Guarda les traduccions al fitxer corresponent
- Manté la terminologia jurídica precisa

### Opció 3: Traducció Profesional

Per articles oficials crítics, considera contractar traductors jurídics professionals per garantir:
- Precisió legal exacta
- Consistència terminològica
- Compliment de normatives oficials

## Ampliar Tipus per Diccionari i Tesaurus

### Diccionari Jurídic

Per afegir traduccions al diccionari, amplia la interfície a `data/diccionari-juridic.ts`:

```typescript
export interface TermeJuridic {
  id: string;
  terme: string;
  definicio: string;
  // ... altres camps ...
  idiomes?: {
    ca?: {
      terme?: string;
      definicio?: string;
    };
    es?: {
      terme?: string;
      definicio?: string;
    };
    fr?: {
      terme?: string;
      definicio?: string;
    };
  };
}
```

**Ús:**

```typescript
import { getTranslation } from '../lib/i18n';

const idioma = getIdiomaActual();
const termeTraduit = getTranslation(
  terme,
  terme.terme, // fallback a terme original
  idioma
);
```

### Tesaurus

El tesaurus pot utilitzar la mateixa estructura que el diccionari:

```typescript
export interface ConcepteTesaurus {
  id: string;
  terme: string;
  definicio?: string;
  // ... altres camps ...
  idiomes?: {
    ca?: { terme?: string; definicio?: string };
    es?: { terme?: string; definicio?: string };
    fr?: { terme?: string; definicio?: string };
  };
}
```

## Estratègia de Priorització

### Alta Prioritat
- Articles més consultats (Articles 1-50 del Codi Civil)
- Articles de referència freqüent (principis generals, definicions)
- Constitució d'Andorra (tots els articles)

### Mitjana Prioritat
- Articles de referència mitjana (Articles 51-200)
- Termes del diccionari més utilitzats
- Conceptes clau del tesaurus

### Baixa Prioritat
- Articles menys consultats
- Termes especialitzats
- Conceptes de referència

## Sistema de Fallback

El sistema garanteix que sempre hi hagi contingut disponible:

1. **Primera opció**: Traducció de l'idioma seleccionat
2. **Fallback**: Text oficial (català)
3. **Garantia**: El català sempre està disponible com a text base

Exemple d'ús amb fallback:

```typescript
const text = article.idiomes?.[idioma] || article.text_oficial;
```

## Validació de Traduccions

Abans d'implementar traduccions, verifica:

1. **Consistència terminològica**: Utilitza els mateixos termes jurídics
2. **Precisió legal**: Les traduccions han de reflectir el significat legal exacte
3. **Format**: Mantén la numeració i estructura de l'article original
4. **Completesa**: Totes les parts de l'article estan traduïdes

## Exemples d'Ús

### Exemple 1: Pàgina d'Article

```typescript
import { getArticleText, getIdiomaActual, t } from '../../../../lib/i18n';

const ArticlePage = ({ article }) => {
  const idioma = getIdiomaActual();
  const textArticle = getArticleText(article, idioma);
  const labelResum = t(idioma, 'article.resum');
  
  return (
    <div>
      <h1>{article.numeracio}</h1>
      <p>{textArticle}</p>
      <h2>{labelResum}</h2>
    </div>
  );
};
```

### Exemple 2: Diccionari amb Traduccions

```typescript
import { getTranslation, hasTranslation } from '../lib/i18n';

const TermeComponent = ({ terme, idioma }) => {
  const termeTraduit = getTranslation(
    terme,
    terme.terme,
    idioma
  );
  const definicioTraduida = getTranslation(
    terme,
    terme.definicio,
    idioma
  );
  
  const teTraduccio = hasTranslation(terme, idioma);
  
  return (
    <div>
      <h3>{termeTraduit}</h3>
      {teTraduccio && <span className="badge">Traduït</span>}
      <p>{definicioTraduida}</p>
    </div>
  );
};
```

### Exemple 3: Selector d'Idiomes

```typescript
import { getIdiomaActual, setIdioma, getAvailableLanguages } from '../lib/i18n';

const IdiomaSelector = ({ article }) => {
  const idiomaActual = getIdiomaActual();
  const idiomesDisponibles = getAvailableLanguages(article);
  
  const canviarIdioma = (nouIdioma) => {
    setIdioma(nouIdioma);
    window.location.reload(); // O utilitza router.push
  };
  
  return (
    <select value={idiomaActual} onChange={(e) => canviarIdioma(e.target.value)}>
      {idiomesDisponibles.map(lang => (
        <option key={lang} value={lang}>{lang.toUpperCase()}</option>
      ))}
    </select>
  );
};
```

## Millores Futures

### Possibles millores al sistema:

1. **Cache de traduccions**: Guardar traduccions generades per no repetir crides a IA
2. **Traduccions contextuals**: Adaptar traduccions segons el context legal
3. **Sincronització**: Sistema per sincronitzar traduccions entre articles relacionats
4. **Validació automàtica**: Scripts per validar completesa i qualitat de traduccions
5. **Interfície d'admin**: Panel per gestionar traduccions de forma visual

## Referències

- `lib/i18n.ts`: Funcions d'internacionalització
- `data/codis/types.ts`: Tipus `ArticleAndorra`
- `pages/codis/civil/article/[id].tsx`: Exemple d'ús de traduccions
- `scripts/generate-translations.js`: Script per generar traduccions amb IA

## Contacte

Per a preguntes sobre traduccions o suggeriments, contacta amb l'equip de desenvolupament.
