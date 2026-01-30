# Tasques i Millores Futures - Dret Planer

Aquest document recull les línies de treball futures identificades durant el desenvolupament de la prova pilot.

## 🚀 Prioritat ALTA (Propers passos)

### 1. Integració de "Guies de Llenguatge Planer" al RAG
**Objectiu**: Ensenyar al sistema *COM* explicar les coses, no només *QUÈ* explicar.
**Tasca**:
- [ ] Recopilar guies d'estil de la Generalitat, Govern d'Andorra o manuals de redacció clara (PDF/Text).
- [ ] Fragmentar aquestes guies en un nou corpus json (`llenguatge-planer.json`).
- [ ] Modificar el `retrieve` per fer una doble cerca: 
  1. Cerca Jurídica (Article X).
  2. Cerca d'Estil ("Com explicar conceptes complexos?", "Com evitar veu passiva?").
- [ ] Injectar aquests consells d'estil al System Prompt dinàmicament.

### 2. Optimització de Costos (sortida del Colab)
**Objectiu**: Fer el projecte sostenible econòmicament.
**Tasca**:
- [ ] Avaluar migració a API d'inferència (Mistral/HuggingFace) o Model Local (Ollama/Llama3).
- [ ] Implementar sistema de cache de respostes per no pagar/generar dues vegades la mateixa explicació.

### 3. Migració a Embeddings Catalans (Projecte AINA)
**Objectiu**: Millorar la precisió semàntica en català jurídic.
**Tasca**:
- [ ] Substituir `XLM-RoBERTa` per `projecte-aina/roberta-base-ca-v2`.
- [ ] Re-generar tots els embeddings (`.json`) amb el nou model.

---
*Darrer actualització: Gener 2026*
