# dretplaner.ad · Portal d'Accessibilitat Jurídica Assistida per IA

Portal web d'accés gratuït que democratitza el coneixement jurídic andorrà mitjançant intel·ligència artificial. El portal interpreta i explica la legislació andorrana de manera accessible per a ciutadans, expatriats i professionals.

## 🎯 Objectius del Projecte

- **Democratització del dret**: Fer accessible la legislació andorrana a tothom
- **Base empírica**: Per a tesi doctoral a la Universitat d'Andorra
- **Eina professional**: Via de residència per compte propi i eina per a professionals del dret

## ✨ Característiques Principals

### 📖 Navegació per Codis Legals
- **Codi Civil d'Andorra** (2022)
- **Codi Penal** (en desenvolupament)
- **Codi de Procediment Civil** (en desenvolupament)

Estructura jeràrquica: Codi > Llibre > Títol > Capítol > Article

### 🤖 Interpretació Assistida per IA
- **Resums en llenguatge plà** (3-4 frases)
- **Exemples pràctics** contextualitzats
- **Conceptes clau** explicats
- **Diferències amb dret català/espanyol** (quan sigui rellevant)
- **Toggle activable** per mostrar/amagar interpretació

### 💬 Chatbot Dret Planer
- Consultes en llenguatge natural sobre dret andorrà
- Cerca automàtica en tots els codis simultàniament
- Referències a articles específics amb enllaços directes
- Disponible des de qualsevol pàgina (floating button)

### ⚖️ Jurisprudència Vinculada
- Sentències del TSJ/Tribunal de Corts que interpreten cada article
- Resums automàtics de sentències (generats per IA)
- Filtratge per any, tribunal, temàtica

### 🔄 Comparador de Sistemes Legals
- Comparació article per article: Andorra vs Catalunya vs Espanya
- Rellevant per expatriats i empresaris
- Taula comparativa automàtica amb IA

### 🌍 Multilingüisme
- **Català** (per defecte)
- **Castellà**
- **Francès**

## 🚀 Desenvolupament

### Instal·lació

```bash
npm install
```

### Configuració

Crea un fitxer `.env` a l'arrel del projecte:

```bash
# OpenAI API (per chatbot i embeddings)
OPENAI_API_KEY=sk-la-teva-clau-api-aqui

# Opcional: Utilitzar XLM-RoBERTa per embeddings (local, gratuït)
EMBEDDING_PROVIDER=xlm-roberta

# O Claude API (segons el briefing)
ANTHROPIC_API_KEY=sk-ant-la-teva-clau-api-aqui
```

**Nota**: Pots utilitzar XLM-RoBERTa-base per embeddings (local, gratuït) i OpenAI només per al chatbot. Veure [XLM-ROBERTA-SETUP.md](./docs/XLM-ROBERTA-SETUP.md) per més detalls.

### Executar en desenvolupament

```bash
npm run dev
```

Obre [http://localhost:3000](http://localhost:3000) al navegador.

### Construir per a producció

```bash
npm run build
npm start
```

## 📁 Estructura del Projecte

```
dret-planer/
├── components/
│   ├── Layout.tsx              # Layout principal amb navegació i selector d'idiomes
│   ├── IA/
│   │   └── InterpretacioIA.tsx # Component d'interpretació assistida per IA
│   ├── UnifiedChatbot.tsx      # Chatbot integrat
│   └── ...
├── data/
│   ├── codis/                  # Estructura segons briefing
│   │   ├── codi-civil/
│   │   │   ├── metadata.json
│   │   │   └── articles-template.ts
│   │   ├── codi-penal/
│   │   └── types.ts            # Tipus TypeScript per articles
│   └── ...
├── lib/
│   └── i18n.ts                 # Sistema d'internacionalització
├── pages/
│   ├── codis/
│   │   └── civil/
│   │       └── article/[id].tsx
│   ├── api/
│   │   └── interpretacio-ia.ts # Endpoint per generar interpretació
│   └── ...
└── ...
```

## 🔧 Stack Tecnològic

- **Next.js 14** - Framework React (Pages Router)
- **TypeScript** - Tipat estàtic
- **Tailwind CSS** - Estilització (via globals.css)
- **OpenAI API** - Generació de text i embeddings (per defecte)
- **XLM-RoBERTa-base** - Embeddings locals multilingües (opció gratuïta)
- **Claude API** - Opció alternativa segons briefing (per implementar)

## 📝 Estat del Projecte

### ✅ Completat (MVP Base)
- [x] Estructura de dades segons briefing
- [x] Sistema d'idiomes (i18n) - CA, ES, FR
- [x] Component d'interpretació IA
- [x] API endpoint per interpretació
- [x] Layout adaptat per a dretplaner.ad
- [x] Pàgina d'exemple per articles

### 🚧 En Desenvolupament
- [ ] Parsear Codi Civil d'Andorra (2022) a JSON
- [ ] Integrar articles reals al sistema
- [ ] Adaptar chatbot per a dret andorrà
- [ ] Implementar comparador de sistemes legals
- [ ] Crear guies per a expatriats i emprenedors
- [ ] Sistema de jurisprudència vinculada

### 📋 Pendent
- [ ] Migració a Claude API (opcional)
- [ ] Sistema d'usuaris i subscripcions
- [ ] API pública
- [ ] Calculadores jurídiques
- [ ] Sistema d'alerts

## 🗺️ Roadmap

### FASE 1: MVP (6-8 setmanes)
- Infraestructura base (✅)
- Contingut legal (Codi Civil amb 100+ articles)
- Integració IA bàsica (✅)
- Chatbot funcional

### FASE 2: Expansió (8-12 setmanes)
- Més codis (Penal, Consum, Procediment Civil)
- Jurisprudència vinculada
- Comparador de sistemes
- Guies per a expatriats

### FASE 3: Professionalització (12+ setmanes)
- Sistema d'usuaris
- Subscripcions professionals
- API pública
- Analytics avançats

## 🚢 Desplegament

### Vercel (recomanat)

1. Connecta el repositori a Vercel
2. Configura les variables d'entorn (`OPENAI_API_KEY` o `ANTHROPIC_API_KEY`)
3. Desplega automàticament

Veure `DEPLOY.md` per més detalls.

## 📄 Llicència

Projecte acadèmic per a tesi doctoral. Tots els drets reservats.

## 👥 Contacte

- Email: contacte@dretplaner.ad
- Web: https://dretplaner.ad (en desenvolupament)

---

**Versió**: 1.0.0  
**Data**: Novembre 2024  
**Autor**: Projecte dretplaner.ad  
**Estat**: MVP en desenvolupament
# andorra-consti
