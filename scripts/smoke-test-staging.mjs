const baseUrl = process.env.STAGING_BASE_URL?.replace(/\/$/, '');
if (!baseUrl) throw new Error('Cal configurar STAGING_BASE_URL.');

const checks = [];

await check('health', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  const body = await response.json();
  return response.status === 200 && body.status === 'ok';
});

await check('oversized-input', async () => {
  const response = await post('/api/unified-chat', { message: 'x'.repeat(2_001) });
  return response.status === 400;
});

await check('admin-closed', async () => {
  const response = await post('/api/preguntes-control', { executarTotes: true });
  return response.status === 401;
});

await check('hybrid-search', async () => {
  const response = await post('/api/rag/search', { query: 'sobirania popular', topK: 5 });
  const body = await response.json();
  return response.status === 200 && Array.isArray(body.results) && body.results.length > 0;
});

await check('public-chat-contract', async () => {
  const response = await post('/api/unified-chat', {
    message: 'Què estableix l’article 1 de la Constitució?',
    conversationHistory: [],
    locale: 'ca',
  });
  const body = await response.json();
  const hasRateHeaders = response.headers.has('x-ratelimit-limit') && response.headers.has('x-ratelimit-remaining');
  return response.status === 200
    && typeof body.response === 'string'
    && Array.isArray(body.sources)
    && body.sources.some((source) => source.id === 'CONST_001')
    && hasRateHeaders;
});

console.log(JSON.stringify({ baseUrl, checks, passed: checks.every((check) => check.passed) }, null, 2));
if (checks.some((check) => !check.passed)) process.exit(1);

async function check(name, operation) {
  const startedAt = performance.now();
  let passed = false;
  let error;
  try {
    passed = await operation();
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  }
  checks.push({ name, passed, durationMs: Math.round(performance.now() - startedAt), ...(error ? { error } : {}) });
}

function post(path, body) {
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Smoke-Test': 'true' },
    body: JSON.stringify(body),
  });
}
