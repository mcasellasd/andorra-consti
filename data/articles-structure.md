# Estructura dels Articles del Codi Civil de Catalunya

Aquest document explica com afegir articles al fitxer `articles.ts`.

## Estructura d'un Article

```typescript
{
  id: 'V-1',                  // ID únic (prefixat amb el llibre)
  number: 'Article 1',        // Número de l'article
  title: 'Títol de l\'article', // Títol de l'article
  section: 'Títol I: Nom del Títol', // Secció/Títol
  content: `                  // Contingut de l'article (multilínia)
1. Primer paràgraf.

2. Segon paràgraf amb subapartats:
   (a) primer subapartat;
   (b) segon subapartat.
  `,
  summary: 'Resum breu de l\'article.', // Opcional
  dateOfEntry: '2025-01-01',  // Opcional: data d'entrada en vigor
}
```

## Organització per llibres i seccions

Els articles s’organitzen per llibres (`bookId`) i per seccions/títols. A `data/articles.ts` trobaràs:
- la definició dels llibres (`books`)
- el mapa d’articles per llibre (`bookArticles`)
- l’array pla `articles` per a consultes globals

## Com afegir articles

1. Obre el fitxer `data/chapters/...` i afegeix o modifica l’article d’origen corresponent.
2. A `data/articles.ts`, assegura’t que el llibre incorpori els nous articles (vegeu la constant `bookArticles`).
3. L’`id` ha d’incloure el prefix del llibre (`III-`, `V-`, etc.) i ser únic.
4. Mantén la numeració oficial dels articles (`number`).

## Exemple d'addició massiva

Si tens molts articles, pots crear-los en un array i després fer spread:

```typescript
const nousArticles: Article[] = [
  { id: '5', number: 'Article 5', ... },
  { id: '6', number: 'Article 6', ... },
  // ...
];

export const articles: Article[] = [
  // articles existents...
  ...nousArticles,
];
```

