# dretplaner.ad · Portal d'Accessibilitat Jurídica Assistida per IA

Portal web d'accés gratuït que democratitza el coneixement jurídic andorrà mitjançant intel·ligència artificial. El projecte se centra en la **Constitució d'Andorra** com a corpus pilot, interpretant i explicant la legislació de manera accessible per a ciutadans, residents i professionals.

> **Projecte acadèmic** desenvolupat per Marc Casellas, estudiant de Dret a la Universitat d'Andorra.

## 🎯 Objectius del Projecte

- **Democratització del dret constitucional**: Fer accessible la Constitució d'Andorra a una societat heterogènia (55% de residents immigrants)
- **Recerca acadèmica**: Base empírica per a investigació sobre IA i accessibilitat jurídica
- **Proof of Concept**: Explorar com la IA pot garantir el dret a comprendre el dret sense erosionar les garanties legals

## ✨ Característiques Principals

### 📖 Constitució d'Andorra (Corpus Pilot)
- **Preàmbul i 107 articles** de la Constitució d'Andorra (1993)
- Estructura jeràrquica: Títol > Capítol > Article
- Navegació intuïtiva amb breadcrumbs
- Sidebar amb índex de navegació ràpida

### 🤖 Interpretació Assistida per IA (RAG)
- **Arquitectura RAG** (Retrieval-Augmented Generation) per garantir traçabilitat
- **Resums en llenguatge plà** contextualitzats
- **Exemples pràctics** adaptats a la realitat andorrana
- **Conceptes clau** explicats amb rigor jurídic
- **Referències explícites** a les fonts originals (sempre cita l'article)
- **Control de qualitat**: Sistema de valoració de respostes

### 💬 Chatbot Dret Planer
- Consultes en llenguatge natural sobre la Constitució
- **Cerca híbrida** gestionada amb Upstash Vector (BGE-M3 + BM25)
- **Generació de text** amb GPT-OSS 120B (via Groq)
- Referències a articles específics amb enllaços directes
- Disponible des de qualsevol pàgina (floating button)
- **Transparència**: Sempre mostra les fonts utilitzades

### 📄 Paper Acadèmic Integrat
- **"El dret a la claredat constitucional: Intel·ligència Artificial i adequació tecnològica com a garanties de la cohesió jurídica a Andorra"**
- Marc teòric: Regla de Reconeixement de H.L.A. Hart aplicada a Andorra
- Anàlisi de la Llei 6/2024 (llenguatge institucional accessible)
- Documentació completa del sistema RAG i decisions tecnològiques
- Bibliografia acadèmica en format APA 7

### 🌍 Multilingüisme
- **Català** (per defecte, llengua oficial)
- **Castellà**
- **Francès**
- Interfície adaptable segons preferències de l'usuari

## 🚀 Desenvolupament

### Instal·lació

```bash
npm install
```

### Configuració

Crea un fitxer `.env` a l'arrel del projecte:

```bash
# Generació de text (recomanat): Groq - GPT-OSS 120B
GROQ_API_KEY=gsk-la-teva-clau-groq

# Recuperació híbrida i límits compartits
UPSTASH_VECTOR_REST_URL=https://...
UPSTASH_VECTOR_REST_TOKEN=...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

**Nota**: Groq genera les respostes i Upstash Vector genera els embeddings densos i dispersos sense carregar cap model al procés Next.js.

### Executar en desenvolupament

```bash
npm run dev
```

Per a proves ràpides sense càrrega pesada (sense Xenova/embeddings), pots usar:

```bash
npm run dev:light
```

Obre [http://localhost:3000](http://localhost:3000) al navegador.

### Construir per a producció

```bash
npm run build
npm start
```

### Regenerar artefactes RAG locals

Els fitxers grans de `data/rag/` es consideren artefactes generats i no es versionen.
Per reconstruir-los localment, executa la cadena de processat + embeddings segons el teu corpus:

```bash
npm run process:doctrina
npm run process:doctrina:xlm
npm run unificar:corpus
npm run embed:doctrina
npm run embed:aprenentatge
```

Per corpus específics de llibre, també tens scripts dedicats (`embed:llibre-primer`, `embed:llibre-segon`, `embed:llibre-tercer`, `embed:llibre-sise`).

## 📁 Estructura del Projecte

*(Estructura simplificada; el repositori inclou més carpetes i scripts.)*

```
andorra-consti/
├── components/
│   ├── Layout.tsx                    # Layout principal, navegació, footer
│   ├── UnifiedChatbot.tsx            # Chatbot integrat amb RAG
│   ├── MultilingualBanner.tsx        # Banner selector d'idioma a la home
│   ├── article/                      # Components per a visualització d'articles
│   │   ├── ArticleHeader.tsx         # Títol, metadades, navegació anterior/següent
│   │   ├── ArticleContent.tsx
│   │   ├── ArticleSidebar.tsx
│   │   └── ArticleBreadcrumb.tsx
│   └── ui/                           # Components d'interfície (Button, Card, etc.)
├── contexts/
│   └── ChatbotContext.tsx            # Context del chatbot
├── data/
│   ├── codis/
│   │   ├── constitucio/
│   │   │   ├── metadata.json         # Metadades de la Constitució
│   │   │   ├── articles.ts           # Preàmbul + 107 articles estructurats
│   │   │   └── articles-template.ts
│   │   ├── codi-civil/               # (en expansió)
│   │   └── tribunal-constitucional/  # (en expansió)
│   ├── jurisprudence-example.ts
│   └── preguntes-control.ts          # Preguntes de validació del sistema
├── lib/
│   ├── i18n.ts                       # Sistema d'internacionalització
│   ├── llm/
│   │   ├── groq.ts                   # Client Groq (model configurable)
│   │   └── index.ts
│   ├── embeddings/
│   │   ├── xlm-roberta.ts            # Embeddings locals
│   │   └── openai.ts                 # Embeddings OpenAI (opcional)
│   ├── rag/
│   │   ├── corpus.ts
│   │   ├── quality-assessment.ts
│   │   └── response-quality.ts
│   └── prompts/
│       └── guia-catala-juridic.ts
├── pages/
│   ├── index.tsx                     # Pàgina principal
│   ├── about.tsx                     # Sobre l'autor
│   ├── paper.tsx, paper/             # Paper acadèmic
│   ├── com-esta-fet.tsx              # Com està fet (documentació tècnica)
│   ├── disclaimer.tsx                # Avís legal / privacitat
│   ├── preguntes-control.tsx         # Preguntes de control del sistema
│   ├── cerca.tsx, chat.tsx           # Cerca i xat
│   ├── codis/constitucio/
│   │   ├── index.tsx                 # Índex de la Constitució
│   │   └── article/[id].tsx          # Pàgina d'article individual
│   └── api/
│       ├── unified-chat.ts           # API del chatbot
│       ├── rag/chat.ts, rag/search.ts
│       ├── generate-summary.ts, generate-example.ts, interpretacio-ia.ts
│       └── preguntes-control.ts
├── docs/
│   ├── PAPER-ACADEMIC-IA-ADAPTACIO-LLENGUATGE-NATURAL.md
│   ├── XLM-ROBERTA-SETUP.md          # Configuració embeddings locals
│   ├── REFERENCIES-APA7.md, CONFIGURACIO-GROQ.md
│   └── ...
├── scripts/                          # Scripts de construcció i embeddings
│   ├── build-constitucio-knowledge.js, build-constitucio-completa.js
│   ├── generate-embeddings-constitucio.js
│   └── (altres: llibres, doctrina, aprenentatge, etc.)
├── DEPLOY.md, VERCEL-DEPLOY.md, QUICK-START.md
└── railway.json                      # Config desplegament Railway (opcional)
```

## 🔧 Stack Tecnològic

### Frontend
- **Next.js 16** i **React 19** - Framework web (Pages Router)
- **TypeScript** - Tipat estàtic
- **Tailwind CSS** - Estilització responsive

### Intel·ligència Artificial
- **Groq API** - Generació de text amb GPT-OSS 120B (Inference-as-a-Service)
- **Upstash Vector** - Índex híbrid BGE-M3 + BM25 en regió UE
- **Upstash Redis** - Límits de consum i bloquejos administratius compartits

### Arquitectura RAG
- **Cerca híbrida** densa i dispersa amb similitud cosinus
- **Chunking intel·ligent** per articles i seccions
- **Prompts rics** amb context jurídic andorrà
- **Control de qualitat** amb sistema de valoració de respostes

### Compliment Legal
- **AI Act** (Reglament UE 2024/1689) - Sistema de risc limitat amb transparència
- **Llei 6/2024** - Llenguatge institucional accessible i comprensible
- **Sobirania tecnològica** - Embeddings locals, models oberts

## ⚖️ Marc Jurídic i Compliment

El projecte implementa les millors pràctiques en matèria de propietat intel·lectual i regulació d'IA:

### Compliment Normatiu
- **AI Act (Reglament UE 2024/1689)**: Sistema de risc limitat amb obligacions de transparència
- **Llei 6/2024 (Andorra)**: Llenguatge institucional accessible, acurat i comprensible
- **Directiva DSM**: Accés legítim a fonts públiques (Constitució, legislació oficial)

### Principis Ètics i Tècnics
- **Transparència total**: Sempre cita les fonts originals
- **Traçabilitat**: Arquitectura RAG que permet verificar cada resposta
- **Minimització del runtime**: cap model d’embeddings ni vectors locals al desplegament
- **Control humà**: La IA assisteix, no substitueix el criteri jurídic
- **Privacitat**: No es recullen dades personals dels usuaris

### Advertència Legal
> **"En absència de codi i de sistematització, un manual —més o menys acadèmic— pot acabar convertit en codi per la porta del darrere."**  
> — Iago Andreu (2015)

Per això, **Dret Planer no pretén ser una font de dret**, sinó una eina pedagògica i d'accessibilitat que sempre remet a les fonts oficials.

## 📝 Estat del Projecte

### ✅ Completat (v1.0 - Constitució)
- [x] **Preàmbul i 107 articles de la Constitució** processats i estructurats
- [x] **Sistema RAG híbrid** amb Upstash Vector
- [x] **Chatbot funcional** amb GPT-OSS 120B (Groq)
- [x] **Sistema d'idiomes** (i18n) - CA, ES, FR
- [x] **Paper acadèmic integrat** amb bibliografia APA 7
- [x] **Pàgina About** amb informació de l'autor
- [x] **Control de qualitat** amb sistema de valoració
- [x] **Interfície responsive** amb navegació intuïtiva
- [x] **Preguntes de control** per validació del sistema

### 🚧 En Desenvolupament
- [ ] Expansió a altres codis (Codi Civil, Penal)
- [ ] Sistema de jurisprudència vinculada
- [ ] Millores en el sistema de cerca semàntica
- [ ] Optimització de prompts per a casos complexos

### 📋 Futur (Post-PoC)
- [ ] Comparador de sistemes legals (Andorra vs Catalunya vs Espanya)
- [ ] Guies per a expatriats i emprenedors
- [ ] API pública per a desenvolupadors
- [ ] Sistema d'usuaris i subscripcions professionals
- [ ] Calculadores jurídiques específiques

## 🗺️ Roadmap

### ✅ FASE 1: Proof of Concept - Constitució (Completat)
- Infraestructura base amb Next.js + TypeScript
- Preàmbul i 107 articles de la Constitució processats
- Sistema RAG amb Upstash Vector + GPT-OSS 120B
- Chatbot funcional amb traçabilitat
- Paper acadèmic documentant el sistema
- Interfície multilingüe (CA, ES, FR)

### 🚧 FASE 2: Expansió del Corpus Legal
- Integració del Codi Civil d'Andorra
- Sistema de jurisprudència del Tribunal Constitucional
- Millores en la cerca semàntica
- Optimització de prompts per a casos complexos
- Validació amb professionals del dret

### 📋 FASE 3: Professionalització (Futur)
- Comparador de sistemes legals internacionals
- API pública per a desenvolupadors
- Sistema d'usuaris i subscripcions
- Guies especialitzades per a expatriats i emprenedors
- Analytics i mètriques d'ús

## 🚢 Desplegament

### Vercel (recomanat)

1. Connecta el repositori a Vercel
2. Configura les variables d'entorn: `GROQ_API_KEY` (obligat per al chatbot i la interpretació IA); opcionalment `OPENAI_API_KEY` per a embeddings.
3. Desplega automàticament

Veure `DEPLOY.md` per més detalls.

## 📚 Documentació Acadèmica

Aquest projecte està completament documentat acadèmicament:

- **Paper principal**: `docs/PAPER-ACADEMIC-IA-ADAPTACIO-LLENGUATGE-NATURAL.md`
  - "El dret a la claredat constitucional: Intel·ligència Artificial i adequació tecnològica com a garanties de la cohesió jurídica a Andorra"
- **Referències**: `docs/REFERENCIES-APA7.md` (bibliografia completa en APA 7)
- **Configuració tècnica**: `docs/CONFIGURACIO-OPENAI.md`, `docs/CONFIGURACIO-GROQ.md`
- **Desplegament**: `DEPLOY.md`, `VERCEL-DEPLOY.md`

## 🤝 Com Contribuir

Aquest és un projecte acadèmic obert a feedback i col·laboració:

### Formes de Contribuir
- **Feedback jurídic**: Si ets professional del dret, el teu feedback és molt valuós
- **Detecció d'errors**: Reporta imprecisions o errors en les respostes de la IA
- **Suggeriments tècnics**: Millores en l'arquitectura RAG o els prompts
- **Noves fonts**: Suggeriments de doctrina o jurisprudència a integrar
- **Traduccions**: Millores en les traduccions al castellà i francès

### Contacte per a Col·laboració
Envia un correu a `contacte@dretplaner.ad` amb:
- Descripció de la proposta o error detectat
- Context (si és aplicable)
- Suggeriments de millora

## ⚠️ Disclaimer

Aquest és un **projecte acadèmic** desenvolupat per un estudiant de Dret. **No constitueix assessorament legal**. Les respostes generades per la IA tenen caràcter orientatiu i educatiu, i han de ser contrastades amb professionals del dret i les fonts oficials.

## 📄 Llicència

Projecte acadèmic de recerca. Tots els drets reservats.

## 👥 Contacte i Autor

**Marc Casellas**  
Estudiant de Dret, Universitat d'Andorra

- **Email**: contacte@dretplaner.ad
- **Web**: https://dretplaner.ad (en desenvolupament)
- **GitHub**: https://github.com/mcasellasd/andorra-consti

Per a més informació sobre l'autor i el projecte, visita la pàgina `/about` del portal.

---

**Versió**: 1.0.0 (Constitució PoC)  
**Data**: Gener 2026  
**Autor**: Marc Casellas  
**Estat**: Proof of Concept completat · En expansió
