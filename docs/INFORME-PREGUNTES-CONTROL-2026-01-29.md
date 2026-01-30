# Informe d'avaluació: Preguntes de control

**Data d'execució:** 29 de gener de 2026  
**Total preguntes:** 43  
**Durada:** ~4 minuts

---

## Resum global

| Mètrica | Valor |
|--------|--------|
| **Preguntes vàlides** | 2 / 43 (4,7%) |
| **Preguntes invàlides** | 41 / 43 (95,3%) |
| **Score mitjà** | **26,2 / 100** |
| **Objectiu** (vàlid si score ≥ 70 i sense errors) | No assolit |

---

## Resultats per categoria

| Categoria | Total | Vàlides | Score mitjà |
|-----------|-------|---------|-------------|
| bàsica | 6 | 2 | 60,0 |
| específica | 11 | 0 | 22,4 |
| complexa | 21 | 0 | 20,0 |
| edge-case | 5 | 0 | 20,0 |

## Resultats per dificultat

| Dificultat | Total | Vàlides | Score mitjà |
|------------|-------|---------|-------------|
| baixa | 6 | 2 | 60,0 |
| mitjana | 16 | 0 | 21,7 |
| alta | 21 | 0 | 20,0 |

---

## Preguntes que han passat (vàlides)

1. **control-001** – *Què diu l'article 1 de la Constitució d'Andorra?*  
   - Score: 100/100. Articles i paraules clau correctes. Font CONST_001 present.

2. **control-004** – *Què diu l'article 4 sobre la dignitat humana?*  
   - Score: 100/100. Articles i paraules clau correctes. Font CONST_004 present.

---

## Causes principals del fracàs

### 1. Rate limit de Groq (Too Many Requests)

**41 de 43 preguntes** han rebut error **500: "Groq API Error: Too Many Requests"**.

- L’avaluació envia 43 peticions seguides a `/api/unified-chat` (una per pregunta).
- Groq limita el nombre de peticions per minut; en fer-les totes seguides s’ha superat el límit.
- A partir de la pregunta **control-005** gairebé totes les respostes són `ERROR: Error unified-chat (500)...`.
- Conseqüència: la majoria de preguntes queden amb score 20 (només paraules prohibides correctes) i es compten com a invàlides.

**Recomanació:**  
- Afegir un **delay** entre peticions (p. ex. 3–5 segons) quan s’executen “totes” les preguntes.  
- O executar les preguntes en **lots** (p. ex. 10 preguntes, pausa 1 minut, següent lot).  
- Reexecutar l’avaluació en condicions de rate limit respectat per obtenir resultats representatius.

### 2. RAG retorna fonts inadequades (quan sí hi ha resposta)

En les 4–5 primeres preguntes on **sí** hi ha hagut resposta del chatbot:

- **control-002** (llengua oficial): La resposta és correcta (“català”, “llengua oficial”), però les **fonts** retornades són fragments de **Dret Processal Civil** (DOCTRINA_DRET_PROCESSAL_CIVIL_*), no CONST_002.  
  - L’avaluació exigeix que els “articles esperats” apareguin a les fonts; com que no hi ha CONST_002, score d’articles = 0 i es genera l’error “No s'han trobat cap article a les fonts” → pregunta invàlida.

- **control-003** (parròquies): Igual: resposta correcta (les 7 parròquies), però fonts amb doctrina, no CONST_001 → invàlida.

- **control-006** (Coprincipat): Resposta correcta en contingut, però fonts sense CONST_001 → invàlida.

El criteri actual d’avaluació dóna molt pes a **que els articles esperats apareguin a les fonts retornades pel RAG** (40% del score global). Si el RAG prioritza massa la doctrina (p. ex. Dret Processal Civil) i no inclou l’article de la Constitució rellevant, la pregunta es marca com a invàlida tot i que el text de la resposta sigui correcte.

**Recomanacions:**  
- Revisar la **recuperació RAG** (unified-chat) per prioritzar articles de la Constitució (CONST_*) quan la pregunta és clarament sobre un article o un tema constitucional.  
- O bé afeblir lleugerament el pes de “articles a les fonts” en l’avaluació (o fer que només resti puntuació si la resposta és incorrecta), per no penalitzar tant quan el LLM respon bé però les fonts són doctrina.

---

## Resum executiu

- L’avaluació **no és representativa** del rendiment real del sistema perquè:
  1. La majoria de preguntes han fallat per **rate limit de Groq**, no per qualitat de les respostes.
  2. En les poques preguntes sense error d’API, el **RAG retorna sovint doctrina en lloc d’articles** i l’avaluació les marca com a invàlides tot i respostes correctes.

- **Accions recomanades:**
  1. Introduir **delay entre peticions** (o execució en lots) i **tornar a executar** tot el conjunt de preguntes de control.
  2. **Ajustar el RAG** per prioritzar articles CONST_* en preguntes sobre la Constitució.
  3. Opcional: **revisar els criteris d’avaluació** (pes de “articles a les fonts” vs. qualitat del text de la resposta) per alinear-los amb l’objectiu desitjat.

---

*Informe generat a partir del JSON retornat per POST /api/preguntes-control amb `executarTotes: true`.*
