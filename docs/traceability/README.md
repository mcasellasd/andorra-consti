# Traceability minima (RAG-Forense P1-P6)

Aquest document descriu que cobreix la implementacio minima de traçabilitat del endpoint `pages/api/unified-chat.ts` i que queda pendent.

## Abast implementat

- Logger append-only en JSONL a `logs/traceability/YYYY-MM-DD.jsonl`.
- Per cada resposta de xat es registra:
  - `timestamp`
  - `userMessageHashSha256`
  - `ragContextHashSha256` (derivat de `entry.id + content` concatenat)
  - `responseHashSha256`
  - resultat de `aiActCompliance`
  - resultat de `responseQuality`
- No es guarda el missatge d'usuari en clar.
- `logs/` esta ignorat a Git (`.gitignore`) per evitar publicacio accidental.

## Lectura P1-P6 (cobertura real)

Com que el repositori no defineix formalment una taula P1-P6 unica en un sol fitxer, aquesta cobertura es presenta com a lectura operativa i conservadora:

1. P1 - Proveniencia minima de la resposta: COBERT PARCIAL
- Hash del missatge, hash del context RAG i hash de resposta permeten provar que hi havia una entrada concreta, un context concret i una sortida concreta.
- Limitacio: no es guarda signatura criptografica ni segell de temps extern.

2. P2 - Integritat de registre: COBERT PARCIAL
- Format JSONL append-only a nivell d'aplicacio.
- Limitacio: sense WORM storage, sense cadena de hash entre linies, sense notaritzacio.

3. P3 - Minimitzacio de dades personals: COBERT
- Es persisteix hash del missatge, no text en clar.
- Coherent amb principi de minimitzacio declarat a `pages/disclaimer.tsx`.

4. P4 - Explicabilitat i qualitat: COBERT PARCIAL
- Es registren `aiActCompliance` i `responseQuality` calculats pel sistema.
- Limitacio: no es registra detall de pipeline complet (prompt final, model exacte, latencia, topK final, etc.).

5. P5 - Reproduibilitat operativa: COBERT PARCIAL
- Els hashos permeten comparar execucions i detectar canvis.
- Limitacio: sense versionat formal de prompts/config al registre i sense ID de build/commit per entrada.

6. P6 - Auditoria externa i governanca: PENDENT
- No hi ha export segur, control d'acces ni retencio governada en backend persistent.
- Cal integrar emmagatzematge persistent i politica de retencio/accés per a auditoria formal.

## Treball futur recomanat

1. Afegir hash encadenat per linia (`prevHash`) per detectar manipulacio.
2. Afegir camp `appVersion` o `gitCommit` per entrada.
3. Moure logs a storage persistent (DB o object storage) amb control d'acces.
4. Definir politica de retencio i purga.
5. Afegir endpoint intern d'exportacio auditable (lectura restringida).
