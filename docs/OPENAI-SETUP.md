# Configuració d'OpenAI per Resums i Exemples

Aquesta web utilitza l'API d'OpenAI per generar:
- **Resums** dels articles (opcional, es pot fer amb un script)
- **Exemples aplicats** de cada article (en temps real quan l'usuari ho demana)

## Configuració

### 1. Obtenir una clau API d'OpenAI

1. Vés a [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Crea un compte o inicia sessió
3. Crea una nova clau API
4. Copia la clau (només es mostra una vegada)

### 2. Configurar la clau API

Crea un fitxer `.env` a l'arrel del projecte:

```bash
OPENAI_API_KEY=sk-tu-clau-api-aqui
```

**Important:** No commitis el fitxer `.env` al repositori. Ja està afegit al `.gitignore`.

### 3. Per a producció (SiteGround, Vercel, etc.)

#### SiteGround
- Afegeix la variable d'entorn `OPENAI_API_KEY` al panell de control del teu hosting
- O crea un fitxer `.env` al servidor (si suporta Node.js)

#### Vercel
- Vés a la configuració del projecte
- Afegeix la variable d'entorn `OPENAI_API_KEY` a les variables d'entorn

#### Netlify
- Vés a Site settings > Environment variables
- Afegeix `OPENAI_API_KEY`

## Generar Resums

Per generar resums per a tots els articles:

```bash
# Genera resums per a articles sense resum
node scripts/generate-summaries.js

# Genera resums per a tots els articles (actualitza els existents)
node scripts/generate-summaries.js --update

# Genera resum per a un article específic
node scripts/generate-summaries.js --article-id=1
```

**Nota:** Això pot trigar una estona i consumir tokens de l'API. Revisa els costos a [OpenAI Pricing](https://openai.com/pricing).

## Funcionalitat d'Exemples

Els exemples aplicats es generen en temps real quan l'usuari fa clic al botó "Generar exemple" a cada article. No cal generar-los prèviament.

## Costos

- **Resums:** ~200 tokens per article (405 articles ≈ 81,000 tokens)
- **Exemples:** ~500 tokens per exemple (només quan l'usuari ho demana)

Amb GPT-4o-mini:
- Resums: ~$0.08 per 1000 articles
- Exemples: ~$0.20 per 1000 exemples

## Troubleshooting

### Error: "OpenAI API key not configured"
- Assegura't que el fitxer `.env` existeix i conté `OPENAI_API_KEY=...`
- Reinicia el servidor de desenvolupament després de crear/modificar `.env`

### Error: "Rate limit exceeded"
- L'API d'OpenAI té límits de velocitat
- Espera uns segons i torna a intentar
- Considera afegir un delay al script de generació de resums

### Els exemples no es generen
- Verifica que la clau API sigui vàlida
- Comprova que tens crèdit disponible al compte d'OpenAI
- Revisa la consola del navegador per veure errors detallats

