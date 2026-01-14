# Configuració de la Clau API d'OpenAI

## On posar la clau API

Crea un fitxer anomenat `.env` **a l'arrel del projecte** (al mateix nivell que `package.json`).

## Passos

### 1. Crea el fitxer `.env`

A l'arrel del projecte (on està `package.json`), crea un fitxer anomenat exactament `.env`:

```bash
# Des de l'arrel del projecte
touch .env
```

O crea'l manualment amb un editor de text.

### 2. Afegeix la teva clau API

Obre el fitxer `.env` i afegeix:

```
OPENAI_API_KEY=sk-la-teva-clau-api-aqui
```

**Important:** 
- Substituïx `sk-la-teva-clau-api-aqui` per la teva clau API real
- No posis espais abans o després del `=`
- No posis cometes al voltant de la clau

### 3. Exemple de fitxer `.env` complet

```
OPENAI_API_KEY=sk-proj-abc123xyz789...
```

### 4. Obtenir una clau API

1. Vés a [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Inicia sessió o crea un compte
3. Clica a "Create new secret key"
4. Copia la clau (només es mostra una vegada!)
5. Pega-la al fitxer `.env`

### 5. Verificar que funciona

Després de crear el fitxer `.env`, reinicia el servidor de desenvolupament:

```bash
# Atura el servidor (Ctrl+C) i torna a iniciar-lo
npm run dev
```

O prova el script de generació de resums:

```bash
node scripts/generate-summaries-improved.js --limit=1
```

## Estructura del projecte

```
prudencia.cat/
├── .env              ← CREA AQUEST FITXER AQUÍ
├── .env.example      ← Fitxer d'exemple (no conté la clau real)
├── package.json
├── next.config.js
├── pages/
├── components/
└── ...
```

## Seguretat

- ✅ El fitxer `.env` ja està al `.gitignore` (no es pujarà al repositori)
- ✅ Mai commitis el fitxer `.env` amb la teva clau real
- ✅ Per a producció, configura la variable d'entorn al servidor

## Per a producció

Quan despleguis a producció, configura la variable d'entorn al servidor:

### Vercel (PASOS DETALLATS)

1. **Accedeix al Dashboard de Vercel:**
   - Vés a [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Inicia sessió amb el teu compte

2. **Selecciona el teu projecte:**
   - Clica sobre el projecte `prudencia-cat` (o el nom que hagis donat)

3. **Configura les variables d'entorn:**
   - Clica a la pestanya **Settings** (Configuració)
   - Al menú lateral, selecciona **Environment Variables** (Variables d'entorn)

4. **Afegeix la variable:**
   - Al camp **Key** (Clau), escriu: `OPENAI_API_KEY`
   - Al camp **Value** (Valor), enganxa la teva clau API d'OpenAI (comença per `sk-`)
   - Selecciona els entorns on aplicar-la:
     - ✅ **Production** (Producció)
     - ✅ **Preview** (Previsualització) - opcional
     - ✅ **Development** (Desenvolupament) - opcional
   - Clica **Save** (Desar)

5. **Redeploya l'aplicació:**
   - Vés a la pestanya **Deployments** (Desplegaments)
   - Clica als tres punts (⋯) del desplegament més recent
   - Selecciona **Redeploy** (Redesplegar)
   - O simplement fes un push nou al repositori per activar un desplegament automàtic

6. **Verifica que funciona:**
   - Després del redesplegament, prova a generar un exemple a qualsevol article
   - Si encara no funciona, espera uns minuts i torna a provar (pot trigar una mica a propagar-se)

**⚠️ Important:** Després d'afegir la variable d'entorn, **cal redesplegar** l'aplicació perquè els canvis tinguin efecte.

### Netlify

- Vés a Site settings > Environment variables
- Afegeix `OPENAI_API_KEY` amb la teva clau
- Redeploya l'aplicació

### SiteGround

- Afegeix la variable d'entorn `OPENAI_API_KEY` al panell de control del teu hosting
- O crea un fitxer `.env` al servidor (si suporta Node.js)
- Reinicia el servidor o l'aplicació

