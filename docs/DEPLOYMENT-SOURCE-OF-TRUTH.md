# Font de veritat del desplegament

## Regla canònica

La versió desplegable del projecte és sempre la branca `main` del repositori:

`https://github.com/mcasellasd/andorra-consti`

Les branques `agent/*`, `codex/*` i `new-design` són branques de treball o
històriques. No s’han de connectar directament a Railway.

## Flux únic

1. Treballar en una branca de canvi.
2. Fer commit dels fitxers de codi i dades necessaris.
3. Verificar `npm test`, `npm run typecheck` quan estigui disponible i `npm run build`.
4. Integrar el canvi a `main`.
5. Fer que staging i production de Railway segueixin `main`.
6. Verificar el commit desplegat i els logs del build abans de donar el deploy per bo.

## Estat d’aquesta consolidació

- `main` conté el snapshot de la versió que s’executava al localhost.
- Els components locals necessaris per al build estan rastrejats al repositori.
- Les branques temporals de reparació del deploy s’han eliminat.
- Els secrets només han d’existir a Railway o als fitxers locals ignorats; mai al repositori.

## Railway

El servei ha d’utilitzar:

- Source repo: `mcasellasd/andorra-consti`.
- Branch: `main`.
- Build: `npm ci` i `npm run build`.
- Start: `npm start`.

Un deploy d’una branca `agent/*` no es considera production ni staging canònic.
