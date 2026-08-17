# Acceptació de l’optimització

## Baseline conservat

- Standalone anterior: aproximadament 318 MB.
- Corpus: 1.041 registres.
- La bateria de referència és `data/preguntes-golden-standard.ts`.

## Portes automàtiques

La CI executa instal·lació reproduïble, auditoria de producció, ESLint, TypeScript,
Vitest i build amb Node 22. El migrador valida recompte, duplicats i recuperació top-5.

## Acceptació a staging

Amb les credencials de staging configurades:

1. Executa `npm run rag:migrate` i confirma 1.041 registres.
2. Executa `npm run rag:evaluate` per validar top-5 i p95 directament contra Vector.
3. Executa `STAGING_BASE_URL=https://... npm run staging:smoke` per validar els contractes desplegats.
4. Executa la bateria Golden Standard des de l’àrea administrativa per puntuar les respostes completes.
5. Confirma que l’article esperat apareix al top-5 en almenys el 95% dels casos.
6. Compara la puntuació global amb el baseline; la caiguda màxima admesa és de 2 punts.
7. Mesura p95 de RAG durant la prova de dues rèpliques; ha de ser inferior a 750 ms.
8. Mesura `.next/standalone` després del postbuild; ha de ser inferior a 120 MB.

La qualitat i la latència externa no es poden certificar sense un índex Upstash provisionat
i claus de staging. No s’han d’introduir credencials al repositori.

El workflow manual **Staging acceptance** automatitza els passos 1–3. Requereix un
environment de GitHub anomenat `staging` amb els secrets `UPSTASH_VECTOR_REST_URL` i
`UPSTASH_VECTOR_REST_TOKEN`; la URL pública de Railway es demana en iniciar el workflow.
