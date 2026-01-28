# Migració a Models Locals/Open Source

Aquest document explica com el projecte Dret Planer ha migrat completament a models locals/open source, eliminant la dependència d'OpenAI.

## Models Utilitzats

### Embeddings (Recuperació Semàntica)

**Fase 1 (Actual):**
- **XLM-RoBERTa-base**: Model multilingüe que funciona localment sense necessitat d'API externa
- Mida: ~500MB (quantitzat)
- Dimensions: 768

**Fase 2 (Prevista):**
- **AINA roberta-base-ca-v2**: Model específic per al català del Projecte AINA
- Entrenat amb 34.89 GB de text català
- Millor qualitat per a text jurídic en català

### Generació de Text

**Salamandra-7b-instruct (BSC):**
- Model de 7 milions de paràmetres desenvolupat pel Barcelona Supercomputing Center
- Entrenat específicament per al català i altres llengües ibèriques
- Disponible sota llicència Apache 2.0
- Pot ser executat localment o via Hugging Face Inference API (gratuïta)

## Configuració

### Variables d'Entorn

Crea un fitxer `.env` a l'arrel del projecte:

```bash
# Embeddings: XLM-RoBERTa-base (local) o AINA roberta-base-ca-v2 (fase 2)
EMBEDDING_PROVIDER=xlm-roberta

# Generació de text: Salamandra-7b-instruct (BSC) via Hugging Face API (gratuïta) o local
LLM_PROVIDER=salamandra

# Opcional: Hugging Face API Key (gratuïta) per usar Salamandra via API
# Obtén-la a https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=your_hf_token_here

# Opcional: Si vols usar OpenAI (no recomanat - models locals són millors per català)
# OPENAI_API_KEY=your_openai_key_here
```

### Obtenir Hugging Face API Key (Gratuïta)

1. Crea un compte a https://huggingface.co (gratuït)
2. Ves a https://huggingface.co/settings/tokens
3. Crea un token nou (Read access és suficient)
4. Afegeix-lo al `.env` com a `HUGGINGFACE_API_KEY`

## Avantatges dels Models Locals

1. **Privacitat Total**: Tot el processament es fa localment o via APIs obertes
2. **Sense Dependències de Serveis Propietaris**: No depens d'OpenAI o altres serveis tancats
3. **Models Específics per al Català**: Millor qualitat per a text jurídic en català
4. **Cost Zero**: Hugging Face API és gratuïta per a ús moderat
5. **Control Total**: Pots auditar i verificar tot el processament
6. **Seguretat Jurídica**: No hi ha risc de dependències externes que comprometin la privacitat

## Execució Local (Opcional)

Si vols executar Salamandra completament local (sense API):

```bash
# Al .env
LLM_PROVIDER=salamandra-local
```

**Nota**: Això requereix més memòria (~8-16GB RAM) i pot ser més lent, però és completament privat.

## Endpoints Migrats

Els següents endpoints han estat migrats a Salamandra:

- ✅ `pages/api/unified-chat.ts` - Chat principal (Hermes)
- ✅ `pages/api/interpretacio-ia.ts` - Interpretació d'articles

## Troubleshooting

### Error: "HUGGINGFACE_API_KEY és necessària"

Assegura't que has creat un token a Hugging Face i l'has afegit al `.env`.

### Error: "Model carregant, esperant 30 segons..."

Això és normal la primera vegada que s'utilitza el model via API. Hugging Face ha de carregar el model al servidor. Espera i torna a intentar.

### Model local massa lent

Si executar Salamandra local és massa lent, utilitza la versió via API (`LLM_PROVIDER=salamandra`). És gratuïta i molt més ràpida.

## Referències

- [Salamandra Model Card](https://huggingface.co/BSC-LT/salamandra-7b-instruct)
- [AINA roberta-base-ca-v2](https://huggingface.co/projecte-aina/roberta-base-ca-v2)
- [Projecte AINA](https://huggingface.co/projecte-aina)
- [BSC Language Technologies](https://huggingface.co/BSC-LT)
