# Desplegament a Railway

## Requisits

- Node.js 22 LTS.
- Índex híbrid Upstash Vector en regió UE, amb BGE-M3 dens, BM25 dispers i cosinus.
- Upstash Redis en regió UE.
- Corpus carregat al namespace `corpus-v1` amb exactament 1.041 registres.

## Variables obligatòries

Configura `GROQ_API_KEY`, `RAG_BACKEND=upstash`, `UPSTASH_VECTOR_REST_URL`,
`UPSTASH_VECTOR_REST_TOKEN`, `UPSTASH_VECTOR_NAMESPACE=corpus-v1`,
`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ADMIN_API_TOKEN` i
`ADMIN_SESSION_SECRET`. Railway injecta `PORT` automàticament.

## Carregar el corpus

```bash
npm ci
npm run rag:migrate
```

El migrador és idempotent, escriu en lots de 100, rebutja IDs duplicats i no finalitza
fins que valida el recompte i tres mostres de recuperació top-5. El manifest font és
`data/rag/corpus-v1.manifest.json`.

## Desplegament i verificació

Railway executa `npm run build` i `npm start`. Comprova:

1. `GET /api/health` retorna `200` i no exposa credencials.
2. Una consulta d’article explícit inclou la font constitucional correcta.
3. Una consulta doctrinal recupera fonts d’Upstash.
4. Les APIs administratives retornen `401` sense cookie.
5. El límit compartit retorna `429`, `Retry-After` i capçaleres `X-RateLimit-*`.

Si Vector falla, només les consultes amb context constitucional local poden continuar;
les consultes semàntiques retornen `503`. Si Redis falla, el trànsit públic usa un límit
local d’emergència de 5 peticions/minut i l’administració falla tancada.
