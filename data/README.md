# Guia per afegir articles al Codi Civil de Catalunya

## Estructura organitzada per llibres i seccions

Els articles s’organitzen en fitxers separats dins la carpeta `chapters/`, habitualment resultat d’un procés d’extracció des del PDF oficial. Cada llibre pot tenir un o més fitxers d’origen.

- `capitol1.ts` - Capítol I: Disposicions Generals
- `capitol2.ts` - Capítol II: Determinació de la Filiació
- `capitol3.ts` - Capítol III: Potestat Parental
- etc.

## Com afegir nous articles

### Opció 1: Afegir articles a un llibre existent

1. Obre el fitxer del llibre corresponent (ex: `chapters/extracted-articles-llibre-tercer.ts`)
2. Afegeix el nou article o edita el contingut generat:

```typescript
{
  id: '5',                    // ID únic (segueix la seqüència)
  number: 'Article 5',        // Número de l'article
  title: 'Títol de l\'article',
  section: 'Capítol I: Disposicions Generals', // Ha de coincidir amb el capítol
  content: `
1. Primer paràgraf de l'article.

2. Segon paràgraf amb subapartats:
   (a) primer subapartat;
   (b) segon subapartat.
  `,
  summary: 'Resum breu de l\'article (opcional)',
  dateOfEntry: '2025-01-01',  // Opcional
}
```

### Opció 2: Crear un nou llibre o secció

1. Crea un nou fitxer a `chapters/` amb els articles del llibre que vulguis importar.
2. A `data/articles.ts`, mapeja els articles nous dins el llibre corresponent (vegeu la constant `bookArticles`).
3. Revisa que l’identificador de cada article inclogui el prefix del llibre (`III-`, `V-`, etc.).

```typescript
import { capitol4Articles } from './chapters/capitol4';

export const articles: Article[] = [
  ...capitol1Articles,
  ...capitol2Articles,
  ...capitol3Articles,
  ...capitol4Articles, // Nou capítol
];
```

## Format del contingut

El contingut pot incloure:
- Paràgrafs numerats: `1.`, `2.`, etc.
- Subapartats: `(a)`, `(b)`, etc.
- Línies en blanc per separar paràgrafs

Exemple:
```
1. Primer paràgraf.

2. Segon paràgraf amb subapartats:
   (a) primer subapartat;
   (b) segon subapartat.

3. Tercer paràgraf.
```

## Importar des de JSON

Si tens els articles en format JSON, pots crear un script d'importació o afegir-los manualment seguint l'estructura TypeScript.

## Verificació

Després d'afegir articles:
1. Assegura't que els IDs siguin únics i seqüencials
2. Verifica que la numeració dels articles sigui correcta
3. Comprova que la secció coincideixi amb el capítol
4. Executa `npm run dev` per veure els canvis

