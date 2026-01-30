# Guia de Desplegament

Aquesta web es pot desplegar a qualsevol servidor web, inclòs SiteGround, Vercel, Netlify, o qualsevol hosting estàtic.

## Opció 1: SiteGround amb Node.js (RECOMANAT si utilitzes OpenAI)

**⚠️ Important:** Si utilitzes la funcionalitat d'exemples aplicats amb OpenAI, necessites un servidor amb Node.js perquè l'API route funcioni.

### Passos:

1. **Puja el codi al servidor:**
   ```bash
   # Puja tots els fitxers excepte node_modules i .next
   ```

2. **Instal·la les dependències:**
   ```bash
   npm install --production
   ```

3. **Configura les variables d'entorn:**
   - Crea un fitxer `.env` al servidor amb:
     ```
     GROQ_API_KEY=gsk_la_teva_clau_groq
     ```
     (Opcional: `OPENAI_API_KEY` per embeddings.)

4. **Construeix l'aplicació:**
   ```bash
   npm run build
   ```

5. **Inicia el servidor:**
   ```bash
   npm start
   ```

6. **Configura un process manager** (PM2 recomanat):
   ```bash
   npm install -g pm2
   pm2 start npm --name "cccat" -- start
   pm2 save
   pm2 startup
   ```

### Avantatges:
- ✅ Funciona amb l'API d'OpenAI per exemples
- ✅ Funcionalitat completa
- ✅ Generació d'exemples en temps real

---

## Opció 1b: SiteGround (Hosting Compartit) - Sense OpenAI

Si NO utilitzes la funcionalitat d'OpenAI, pots generar HTML estàtic:

1. **Activa l'exportació estàtica:**
   - Edita `next.config.js` i descomenta `output: 'export'`
   - Elimina o comenta la secció d'exemples a `pages/article/[id].tsx`

2. **Genera els fitxers estàtics:**
   ```bash
   npm run build
   ```

3. **Puja els fitxers de `out/` al servidor**

### Avantatges:
- ✅ Funciona amb hosting compartit
- ✅ No necessita Node.js
- ⚠️ No inclou la funcionalitat d'exemples aplicats

---

## Opció 2: SiteGround amb Node.js (si el teu pla ho suporta)

Si el teu pla de SiteGround inclou suport per Node.js:

1. **Puja el codi al servidor:**
   ```bash
   # Puja tots els fitxers excepte node_modules
   ```

2. **Instal·la les dependències:**
   ```bash
   npm install --production
   ```

3. **Construeix l'aplicació:**
   ```bash
   npm run build
   ```

4. **Inicia el servidor:**
   ```bash
   npm start
   ```

5. **Configura un process manager** (PM2 recomanat):
   ```bash
   npm install -g pm2
   pm2 start npm --name "cccat" -- start
   pm2 save
   pm2 startup
   ```

---

## Opció 3: Vercel (Més fàcil)

Vercel està optimitzat per Next.js i és molt fàcil d'usar:

1. **Instal·la Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Desplega:**
   ```bash
   vercel
   ```

   O connecta el teu repositori GitHub a [vercel.com](https://vercel.com) per desplegament automàtic.

3. **⚠️ IMPORTANT: Configura la clau API d'OpenAI (si utilitzes exemples aplicats):**
   
   Perquè el chatbot i la interpretació IA funcionin, cal configurar la variable d'entorn:
   
   - Vés a [Vercel Dashboard](https://vercel.com/dashboard)
   - Selecciona el teu projecte
   - Vés a **Settings** → **Environment Variables**
   - Afegeix:
     - **Key:** `GROQ_API_KEY`
     - **Value:** La teva clau API de Groq (comença per `gsk_`)
     - Selecciona **Production** (i opcionalment Preview/Development)
   - Clica **Save**
   - **Redeploya** l'aplicació (Deployments → ⋯ → Redeploy)
   
   Opcional: `OPENAI_API_KEY` per embeddings. 📖 Vegeu [VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md) per més detalls.

### Avantatges:
- ✅ Desplegament automàtic des de GitHub
- ✅ HTTPS gratuït
- ✅ CDN global
- ✅ Més fàcil de configurar
- ✅ Suport complet per API routes de Next.js

### Desavantatges:
- ⚠️ Requereix compte a Vercel
- ⚠️ Límits al pla gratuït

---

## Opció 4: Netlify

Similar a Vercel:

1. **Instal·la Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Desplega:**
   ```bash
   npm run build
   netlify deploy --prod --dir=out
   ```

   O connecta el teu repositori a [netlify.com](https://netlify.com)

---

## Configuració per subdirectori

Si la web està en un subdirectori (ex: `dretplaner.ad/llibre-cinquè`):

1. Edita `next.config.js`:
   ```javascript
   const nextConfig = {
     basePath: '/llibre-cinquè',
     trailingSlash: true,
     // ...
   }
   ```

2. Reconstruïx:
   ```bash
   npm run build
   ```

---

## Troubleshooting

### El chatbot / la interpretació IA no funciona a Vercel
- **Problema:** Respostes buides o error "Cal configurar GROQ_API_KEY"
- **Solució:**
  1. Vés a Vercel Dashboard → Project → Settings → Environment Variables
  2. Afegeix `GROQ_API_KEY` amb la teva clau API de Groq (obtinguda a [console.groq.com](https://console.groq.com))
  3. Assegura't que estigui marcada per **Production**
  4. **Redeploya** l'aplicació (això és crític!)
  5. Espera uns minuts i torna a provar
- Vegeu [VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md) per més detalls

### Els enllaços no funcionen
- Assegura't que `trailingSlash: true` estigui configurat
- Verifica que el servidor suporti reescritura d'URLs

### 404 errors
- Verifica que tots els fitxers de `out/` estiguin pujats
- Comprova la configuració del servidor web

### Imatges no es carreguen
- Assegura't que `images.unoptimized: true` estigui configurat per exportació estàtica

---

## Recomanació

Per a SiteGround, **recomano l'Opció 1 (exportació estàtica)** perquè:
- Funciona amb qualsevol pla de hosting
- No necessita configuració especial
- És ràpid i fàcil de mantenir

