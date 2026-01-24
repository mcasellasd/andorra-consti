# Implementació de dretplaner.ad

## Resum de l'Implementació

Aquest document descriu les adaptacions realitzades al projecte existent per convertir-lo en **dretplaner.ad**, el portal d'accessibilitat jurídica assistida per IA per al Principat d'Andorra segons el briefing tècnic proporcionat.

## ✅ Completat

### 1. Configuració del Projecte
- ✅ Actualitzat `package.json` amb nom i descripció de dretplaner.ad
- ✅ Actualitzat `README.md` amb informació específica d'Andorra
- ✅ Creat estructura de dades segons l'esquema del briefing

### 2. Sistema d'Idiomes (i18n)
- ✅ Creat `lib/i18n.ts` amb suport per a català, castellà i francès
- ✅ Traduccions de la UI implementades
- ✅ Funcions d'utilitat per gestionar idiomes (getIdiomaActual, setIdioma, t)

### 3. Estructura de Dades
- ✅ Creat `data/codis/types.ts` amb tipus TypeScript segons el briefing:
  - `ArticleAndorra`: Estructura d'articles legals
  - `InterpretacioIA`: Contingut generat per IA
  - `Sentencia`: Estructura de sentències
  - `CodiMetadata`: Metadades dels codis
- ✅ Creat `data/codis/codi-civil/metadata.json`
- ✅ Creat `data/codis/codi-civil/articles-template.ts` (plantilla per articles reals)

### 4. Components d'IA
- ✅ Creat `components/IA/InterpretacioIA.tsx`:
  - Toggle per activar/desactivar interpretació
  - Generació de resums, exemples i conceptes clau
  - Suport multilingüe
  - Estats de càrrega i error

### 5. API Endpoints
- ✅ Creat `pages/api/interpretacio-ia.ts`:
  - Genera interpretació assistida per IA
  - Suporta els 3 idiomes (ca, es, fr)
  - Utilitza OpenAI API (compatible amb codi existent)
  - Preparat per migrar a Claude API

### 6. Layout Adaptat
- ✅ Actualitzat `components/Layout.tsx`:
  - Logo canviant a "dretplaner.ad"
  - Navegació adaptada per a codis andorrans
  - Selector d'idiomes funcional (CA, ES, FR)
  - Footer actualitzat amb informació d'Andorra

### 7. Pàgines
- ✅ Creat `pages/codis/civil/article/[id].tsx`:
  - Pàgina d'exemple per articles del Codi Civil
  - Integració amb component InterpretacioIA
  - Breadcrumb navigation
  - Suport multilingüe

### 8. Estils CSS
- ✅ Afegits estils per a `interpretacio-ia` components
- ✅ Estils per a pàgines d'articles
- ✅ Estils per a breadcrumbs, tags, navegació

## 🚧 En Desenvolupament / Pendent

### 1. Contingut Legal Real
- [ ] Parsear Codi Civil d'Andorra (2022) des de PDF oficial
- [ ] Convertir articles a format JSON segons l'esquema
- [ ] Afegir articles reals a `data/codis/codi-civil/articles-template.ts`
- [ ] Validar estructura i contingut

### 2. Chatbot Adaptat
- [ ] Adaptar `UnifiedChatbot.tsx` per a consultes sobre dret andorrà
- [ ] Actualitzar prompts per mencionar Andorra en lloc de Catalunya
- [ ] Adaptar RAG per buscar en codis andorrans
- [ ] Provar amb consultes reals

### 3. Pàgines de Navegació
- [ ] Crear `pages/codis/index.tsx` (llistat de codis)
- [ ] Crear `pages/codis/civil/index.tsx` (llistat de llibres/articles)
- [ ] Crear `pages/jurisprudencia/[id].tsx`
- [ ] Crear `pages/cerca.tsx` (cerca global)
- [ ] Crear `pages/comparador.tsx` (comparador de sistemes)
- [ ] Crear `pages/guies/expatriats.tsx`
- [ ] Crear `pages/guies/emprenedors.tsx`

### 4. Funcionalitats Avançades
- [ ] Implementar comparador Andorra vs Catalunya vs Espanya
- [ ] Sistema de jurisprudència vinculada
- [ ] Guies per a expatriats i emprenedors
- [ ] Calculadores jurídiques

### 5. Integració Claude API (Opcional)
- [ ] Crear compte a Anthropic
- [ ] Configurar `ANTHROPIC_API_KEY`
- [ ] Adaptar `pages/api/interpretacio-ia.ts` per usar Claude
- [ ] Provar i comparar resultats amb OpenAI

### 6. Optimitzacions
- [ ] Implementar cache per a interpretacions IA (evitar regenerar)
- [ ] Optimitzar càrrega de pàgines (SSG/ISR)
- [ ] Afegir lazy loading per a components IA
- [ ] Millorar SEO (meta tags, schema.org)

## 📝 Notes Tècniques

### Estructura de Dades
L'esquema de dades segueix exactament el briefing tècnic:
- Articles en JSON amb estructura jeràrquica (Codi > Llibre > Títol > Capítol > Article)
- Suport multilingüe integrat als articles
- Metadades separades per codi

### Sistema d'Idiomes
- L'idioma es guarda a localStorage
- Es pot implementar routing amb prefix (`/ca/`, `/es/`, `/fr/`) en el futur
- Traduccions centralitzades a `lib/i18n.ts`

### API d'Interpretació
- Actualment utilitza OpenAI API (compatible amb codi existent)
- Preparat per migrar a Claude API canviant només l'endpoint i headers
- Respostes en format JSON estructurat

### Compatibilitat
- El projecte manté compatibilitat amb el codi existent (catalunyalegal)
- Es pot executar en paral·lel amb les funcionalitats existents
- La migració completa es pot fer gradualment

## 🚀 Pròxims Passos

1. **Obtenir corpus legal andorrà**: Descarregar PDFs oficials del BOPA
2. **Parsear articles**: Utilitzar scripts existents com a base per extreure articles
3. **Provar interpretació IA**: Generar interpretacions per als primers 10-20 articles
4. **Adaptar chatbot**: Provar consultes sobre dret andorrà
5. **Crear pàgines de navegació**: Implementar estructura completa de codis
6. **Testing**: Provar totes les funcionalitats amb usuaris reals

## 📚 Recursos

- Briefing tècnic: Document proporcionat per l'usuari
- Codi existent: Base de catalunyalegal.vercel.app
- Documentació Next.js: https://nextjs.org/docs
- Documentació OpenAI: https://platform.openai.com/docs
- Documentació Claude: https://docs.anthropic.com/

---

**Data d'actualització**: Novembre 2024  
**Versió**: 1.0.0

