# Pràctiques legals AI Act implementades a prudencia.cat

## Resum executiu

Aquest document resumeix les pràctiques legals implementades a `prudencia.cat` per complir amb el **Reglament (UE) 2024/1689 de l'Intel·ligència Artificial (AI Act)**. El sistema està classificat com a **risc limitat** i implementa validació automàtica per garantir la transparència i el compliment legal en totes les respostes generades.

## 1. Transparència i divulgació d'IA (Article 50 AI Act)

El sistema implementa **5 checks bàsics** que es validen automàticament en cada resposta generada per IA:

### 1.1. Divulgació d'IA (`disclosesAI`)

**Objectiu**: Verifica que la resposta indica explícitament que ha estat generada per intel·ligència artificial.

**Patrons detectats**:
- "IA", "intel·ligència artificial", "artificial intelligence"
- "generat", "generada", "generat per", "generada per"
- "Cursor", "OpenAI", "GPT", "model", "assistent digital", "assistent jurídic digital"

**Puntuació**: 25 punts (del total de 100 en AI Act compliance)

### 1.2. Menció del model (`mentionsModel`)

**Objectiu**: Requisit per a models d'ús general. Comprova que es menciona el model o proveïdor utilitzat.

**Patrons detectats**:
- "OpenAI", "Cursor", "GPT-4o-mini", "GPT-4"
- "model d'IA", "model d'intel·ligència artificial"

**Models utilitzats al projecte**:
- **Generació de text**: GPT-4o-mini (OpenAI OpCo, LLC)
- **Embeddings**: text-embedding-3-large (OpenAI OpCo, LLC)

**Puntuació**: 20 punts

### 1.3. Advertències sobre limitacions (`hasDisclaimers`)

**Objectiu**: Verifica que la resposta inclou advertències adequades sobre les seves limitacions.

**Patrons detectats**:
- **Termes de limitació**: "orientatiu", "orientativa", "aproximació", "pot contenir errors", "limitacions", "no garanteix", "sense garantia"
- **Termes d'advertència**: "avís", "advertència", "recorda", "important", "cal tenir en compte"

**Exemples d'advertències implementades**:
- La informació és **orientativa** i no constitueix assessorament legal professional
- Les respostes poden contenir errors o simplificacions
- No garanteixen exactitud absoluta

**Puntuació**: 20 punts

### 1.4. Recomanació de supervisió humana (`recommendsProfessionals`)

**Objectiu**: Garanteix que es recomana consultar professionals titulats (supervisió humana).

**Patrons detectats**:
- "consulta", "consulteu", "recomana", "recomanem"
- "professional", "advocat", "notari", "assessor", "jurista", "expert"
- "consulta professional", "professional consulta", "adreça professional"

**Missatges típics**:
- "Es recomana consultar professionals titulats (advocats, notaris) per a decisions jurídiques, econòmiques o patrimonials"
- "Per a consultes específiques, adreça't a professionals col·legiats"

**Puntuació**: 20 punts

### 1.5. Clarificació que no és assessorament legal (`notLegalAdvice`)

**Objectiu**: Deixa clar que la resposta no constitueix assessorament legal.

**Patrons detectats**:
- "no assessorament", "no constitueix assessorament", "no substitueix assessorament", "no és assessorament"
- "orientatiu", "orientativa", "divulgatiu", "acadèmic", "recerca", "finalitat acadèmica"

**Puntuació**: 15 punts

## 2. Sistema de validació automàtica

### 2.1. Càlcul del score de compliment

El sistema calcula un **score de compliment de l'AI Act** (0-100 punts) basat en els 5 checks:

```typescript
// Distribució de punts
disclosesAI:           25 punts
mentionsModel:         20 punts
hasDisclaimers:        20 punts
recommendsProfessionals: 20 punts
notLegalAdvice:        15 punts
───────────────────────────────
Total:                100 punts
```

**Umbral de compliment**: ≥80 punts es considera `aiActCompliant: true`

### 2.2. Integració amb el sistema de qualitat global

El score d'AI Act compliance es pondera dins del **score global de qualitat** (0-100):

| Factor | Pes |
|--------|-----|
| Coherència amb fonts | 35% |
| Rellevància respecte a la pregunta | 23% |
| Completitud | 15% |
| Claredat | 10% |
| Precisió legal | 8% |
| **AI Act compliance** | **9%** |

### 2.3. Validació en temps real

Cada resposta generada passa automàticament pels checks de validació abans de ser presentada a l'usuari. Si alguna verificació falla, es generen advertències específiques.

## 3. Generació d'advertències automàtiques

Quan alguna verificació d'AI Act falla, el sistema genera advertències específiques:

### 3.1. Advertències per divulgació d'IA

```
"La resposta no indica explícitament que ha estat generada per intel·ligència artificial (requisit AI Act)."
```

### 3.2. Advertències per menció del model

```
"La resposta no menciona el model o proveïdor d'IA utilitzat (recomanat per AI Act)."
```

### 3.3. Advertències per advertències sobre limitacions

```
"La resposta no inclou advertències adequades sobre limitacions (requisit AI Act)."
```

### 3.4. Advertències per supervisió humana

```
"La resposta no recomana consultar professionals (requisit AI Act - supervisió humana)."
```

### 3.5. Advertències per clarificació legal

```
"La resposta no deixa clar que no constitueix assessorament legal (requisit AI Act)."
```

## 4. Prompt engineering per garantir compliment

Els prompts del sistema inclouen instruccions explícites per garantir el compliment:

```typescript
TRANSPARÈNCIA:
- Indica que ets una IA (OpenAI GPT-4o-mini)
- Recomana consultar professionals per casos específics
- Recorda que és informació orientativa, no assessorament legal
```

Aquestes instruccions s'apliquen a:
- Respostes del xat (`pages/api/rag/chat.ts`)
- Generació de resums (`pages/api/generate-summary.ts`)
- Generació d'exemples (`pages/api/generate-example.ts`)

## 5. Classificació de risc segons l'AI Act

El sistema **prudencia.cat** està classificat com a **risc limitat** perquè:

### 5.1. Característiques que justifiquen la classificació

- ✅ Sistema educatiu/acadèmic sense finalitat comercial
- ✅ No pren decisions autònomes que afectin drets fonamentals
- ✅ Requereix supervisió humana (recomana consultar professionals)
- ✅ No s'utilitza en sectors crítics (sanitat, seguretat, etc.)
- ✅ Implementa tots els requisits de transparència de l'Article 50

### 5.2. Obligacions aplicables

Com a sistema de risc limitat, està subjecte als requisits de **transparència** de l'Article 50 de l'AI Act, que s'apliquen des de l'entrada en vigor del reglament (1 d'agost de 2024).

## 6. Implementació tècnica

### 6.1. Fitxers rellevants

- **Validació**: `lib/rag/quality-assessment.ts`
  - Funció: `checkAIActCompliance(response: string)`
  - Funció: `calculateAIActComplianceScore(...)`
  
- **Validació (deprecated)**: `lib/rag/validation.ts`
  - Funció: `checkAIActCompliance(response: string)`
  - ⚠️ **Nota**: Aquest fitxer està marcat com a deprecated. Utilitza `quality-assessment.ts`.

- **APIs**:
  - `pages/api/rag/chat.ts` - Xat amb validació AI Act
  - `pages/api/generate-summary.ts` - Resums amb validació AI Act
  - `pages/api/generate-example.ts` - Exemples amb validació AI Act

### 6.2. Estructura de dades

```typescript
interface AIActCompliance {
  disclosesAI: boolean;              // Indica que és generada per IA
  mentionsModel: boolean;             // Menciona el model/proveïdor
  hasDisclaimers: boolean;            // Té advertències adequades
  recommendsProfessionals: boolean;   // Recomana consultar professionals
  notLegalAdvice: boolean;            // Deixa clar que no és assessorament legal
}
```

### 6.3. Flux de validació

```
1. Generació de resposta per IA (GPT-4o-mini)
   ↓
2. Anàlisi de la resposta amb checkAIActCompliance()
   ↓
3. Càlcul del score amb calculateAIActComplianceScore()
   ↓
4. Generació d'advertències si cal amb generateWarnings()
   ↓
5. Inclusió del score i advertències a la resposta final
```

## 7. Documentació i transparència

### 7.1. Documentació pública

Tots els requisits estan documentats públicament a:
- **Avís legal**: `pages/disclaimer.tsx` (Secció 8: "Compliment amb la Llei d'Intel·ligència Artificial de la UE (AI Act)")
- Aquest document: `docs/PRACTIQUES-LEGALS-AI-ACT.md`

### 7.2. Informació divulgada als usuaris

El disclaimer inclou:
- Models utilitzats (GPT-4o-mini, text-embedding-3-large)
- Classificació de risc (risc limitat)
- Descripció de cada check implementat
- Justificació de la classificació
- Explicació del sistema de scoring

## 8. Models d'ús general

Segons l'AI Act, les obligacions específiques per a models d'ús general s'aplicaran a partir d'agost de 2025. El sistema ja implementa mesures de transparència i informació que compleixen amb aquests requisits futurs:

- ✅ Divulgació del model utilitzat
- ✅ Transparència sobre les limitacions
- ✅ Advertències adequades
- ✅ Recomanació de supervisió humana

## 9. Mètriques i monitoring

### 9.1. Scoring de qualitat

El sistema proporciona una **puntuació global** (0-100) i un **desglossament detallat** per ajudar a entendre la qualitat i fiabilitat de cada resposta:

- **70-100 punts**: Qualitat alta (indicador verd)
- **50-69 punts**: Qualitat mitjana (indicador groc)
- **0-49 punts**: Qualitat baixa (indicador vermell, amb advertències específiques)

### 9.2. Factors addicionals

A més del score d'AI Act compliance, el sistema mostra:
- Nombre de referències a articles
- Cobertura de la pregunta
- Coincidència amb fonts
- Longitud adequada
- Absència d'al·lucinacions
- To professional
- Flesch-Kincaid Grade Level (complexitat lingüística)

## 10. Millores futures

### 10.1. Implementacions pendents

Les següents millores es podrien implementar (veure `lib/rag/guardrails-improvements.md`):

1. **Detecció de contradiccions amb fonts**: Detectar si la resposta contradiu directament les fonts proporcionades
2. **Validació d'entrada més robusta**: Rate limiting, detecció de caràcters especials
3. **Detecció de contingut sensible**: Detectar possibles dades personals (DNI, emails, etc.)
4. **Sistema de fallback**: Regenerar respostes amb qualitat baixa amb paràmetres ajustats

### 10.2. Compliance amb futurs requisits

El sistema està preparat per adaptar-se a:
- Requisits addicionals per a models d'ús general (a partir d'agost 2025)
- Actualitzacions de l'AI Act
- Millores en detecció de biaixos
- Sistema de monitoring avançat

## 11. Conclusió

El sistema **prudencia.cat** implementa un **sistema exhaustiu de validació** que garanteix que totes les respostes generades compleixen amb l'AI Act de la UE. Això s'aconsegueix mitjançant:

1. ✅ **5 checks automàtics** de compliment
2. ✅ **Sistema de scoring** ponderat (9% del score global)
3. ✅ **Generació d'advertències** automàtiques quan cal
4. ✅ **Prompt engineering** que garanteix el compliment
5. ✅ **Documentació pública** completa
6. ✅ **Transparència** sobre models i limitacions

Aquest enfocament assegura **transparència i compliment legal** de manera consistent en totes les respostes generades, proporcionant als usuaris informació clara sobre el caràcter orientatiu de la informació i la necessitat de consultar professionals per a decisions jurídiques importants.

---

**Última actualització**: Gener 2025  
**Versió del document**: 1.0  
**Mantingut per**: Equip de desenvolupament de prudencia.cat
