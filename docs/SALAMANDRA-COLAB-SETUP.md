# Configuració de Salamandra a Google Colab

Aquest document explica com configurar **Salamandra-7b-instruct** a Google Colab i connectar-lo al teu projecte Next.js. El model 7B dóna millor qualitat que el 2B. S’utilitza **quantització 4-bit** (bitsandbytes) per fer-lo cabre a la GPU T4 gratuïta de Colab (~16 GB VRAM).

## Avantatges

- ✅ **Gratuït**: Google Colab ofereix GPUs gratuïtes (T4)
- ✅ **7B en 4-bit**: Millor qualitat que 2B, cap a la T4 gratuïta
- ✅ **Ràpid**: Execució a GPU
- ✅ **Sense dependències externes**: No necessites Hugging Face API
- ✅ **Control total**: Tens el model completament sota control

## Limitacions

- ⚠️ **Sessions temporals**: Colab tanca sessions després d'inactivitat (Colab Pro resol això)
- ⚠️ **URLs dinàmiques**: ngrok gratuït canvia l'URL cada cop (necessites actualitzar `.env.local`)
- ⚠️ **Requereix mantenir Colab actiu**: Si tancas Colab, l'API deixa de funcionar
- ⚠️ **Si dona OOM**: Torna a fer servir el setup amb 2B (veure secció "Fallback 2B" al final)

## Pas 1: Configurar API a Google Colab

### 1.1 Activar GPU

A Colab: **Runtime → Change runtime type → Hardware accelerator: GPU** (T4). Guarda.

### 1.2 Cel·la 1: Instal·lar dependències i carregar el model

Copia i executa aquest codi a la primera cel·la:

```python
# Instal·lar dependències (inclou bitsandbytes per 4-bit)
!pip install -q flask flask-cors transformers torch accelerate bitsandbytes pyngrok

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch
from datetime import datetime
from pyngrok import ngrok

app = Flask(__name__)
CORS(app)  # Permet crides des del teu Next.js

# Configuració 4-bit per fer cabre 7B a T4 (~16 GB VRAM)
print("🔄 Configurant quantització 4-bit...")
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
)

# Carregar Salamandra 7B en 4-bit
print("🔄 Carregant Salamandra-7b-instruct (4-bit)...")
model_id = "BSC-LT/salamandra-7b-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",
    low_cpu_mem_usage=True,
)
print("✅ Model 7B (4-bit) carregat correctament!")

def format_chatml(messages, date_string=None):
    """Formata missatges en format ChatML (com utilitza Salamandra)"""
    if not date_string:
        date_string = datetime.today().strftime('%Y-%m-%d')
    formatted = ''
    if messages and messages[0].get('role') == 'system':
        formatted += f"<|im_start|>system\n{messages[0]['content']}<|im_end|>\n"
        messages = messages[1:]
    else:
        formatted += "<|im_start|>system\nEts un assistent útil i respectuós.<|im_end|>\n"
    for msg in messages:
        if msg.get('role') in ['user', 'assistant']:
            formatted += f"<|im_start|>{msg['role']}\n{msg['content']}<|im_end|>\n"
    formatted += "<|im_start|>assistant\n"
    return formatted

@app.route('/generate', methods=['POST'])
def generate():
    """Endpoint per generar text amb Salamandra"""
    try:
        data = request.json
        messages = data.get('messages', [])
        max_tokens = data.get('maxTokens', 350)
        temperature = data.get('temperature', 0.7)
        date_string = data.get('dateString')
        prompt = format_chatml(messages, date_string)
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_tokens,
            temperature=temperature,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id,
        )
        generated = tokenizer.decode(outputs[0][inputs.input_ids.shape[1]:], skip_special_tokens=True)
        return jsonify({"generated_text": generated})
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "model": "salamandra-7b-instruct"})

# Exposar amb ngrok
print("\n🌐 Iniciant servidor...")
public_url = ngrok.connect(5000)
print(f"\n✅ API disponible a: {public_url}")
print(f"📋 Afegeix al .env.local:")
print(f"   SALAMANDRA_API_URL={public_url}/generate\n")
print("⚠️  Mantén aquesta cel·la executant-se per mantenir l'API activa!\n")

app.run(host='0.0.0.0', port=5000)
```

**Nota**: La càrrega del model pot trigar uns minuts la primera vegada. Si apareix **CUDA out of memory**, veure "Fallback 2B" al final del document.

### 1.3 Cel·la 2: Provar l’API des de Colab

Executa aquesta segona cel·la **després** que el servidor estigui en marxa (cel·la 1). Substitueix `SALAMANDRA_API_URL` per la URL que et dona ngrok (ha d’acabar en `/generate`):

```python
import requests
import json

# Substitueix per la URL que et dona ngrok a la cel·la 1 (ha d'acabar en /generate)
SALAMANDRA_API_URL = "https://xxxx-xxxx-xxxx.ngrok-free.app/generate"

messages = [
    {"role": "system", "content": "Ets un assistent expert en la Constitució d'Andorra. Respon en llenguatge planer."},
    {"role": "user", "content": "Què diu l'article 1 de la Constitució d'Andorra?"}
]

payload = {
    "messages": messages,
    "maxTokens": 200,
    "temperature": 0.4
}

headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"  # Necessari per ngrok-free.app
}

response = None
try:
    response = requests.post(SALAMANDRA_API_URL, headers=headers, json=payload, timeout=120)
    response.raise_for_status()
    data = response.json()
    print("Generated:", data.get("generated_text", "")[:500])
except requests.exceptions.RequestException as e:
    print("Error:", e)
    if response is not None:
        print("Status:", response.status_code)
        print("Body:", response.text[:500])
```

## Pas 2: Configurar el projecte Next.js

Afegeix al teu `.env.local`:

```bash
# Endpoint personalitzat de Salamandra (Google Colab) — 7B 4-bit
SALAMANDRA_API_URL=https://xxxx-xxxx-xxxx.ngrok-free.app/generate
```

**Important**:
- Substitueix `xxxx-xxxx-xxxx.ngrok-free.app` amb la URL que et dona ngrok a Colab (sovint acaba en `ngrok-free.app`).
- La URL ha d’acabar en `/generate`.
- Si reinicies Colab, l’URL canvia; actualitza `.env.local` i reinicia `npm run dev`.

## Pas 3: Verificar que funciona

1. **Verificar API a Colab**: Obre `{public_url}/health` al navegador. Hauria de retornar `{"status":"ok","model":"salamandra-7b-instruct"}`.
2. **Provar des de Colab**: Executa la cel·la 2 (requests) amb la teva URL; hauries de veure text generat.
3. **Provar des del projecte**: Executa `npm run dev` i prova el xat o la interpretació d’un article.

## Alternatives a ngrok

Si vols una URL fixa, pots usar:

- **ngrok amb compte**: URL fixa (gratuït amb limitacions)
- **Cloudflare Tunnel**: Gratuït amb URL fixa
- **Serveo**: Simple però menys fiable

### Exemple amb Cloudflare Tunnel (gratuït, URL fixa):

```python
# A Colab, instal·lar cloudflared
!pip install cloudflared

# Executar tunnel
!cloudflared tunnel --url http://localhost:5000
```

## Troubleshooting

### Error: "SALAMANDRA_API_URL no configurada"
- Assegura't que has afegit `SALAMANDRA_API_URL` al `.env.local`
- Reinicia el servidor Next.js després de canviar `.env.local`

### Error: "Connection refused" o timeout
- Verifica que la cel·la de Colab encara està executant-se
- Verifica que l'URL de ngrok és correcta (pot haver canviat)
- Prova `{public_url}/health` al navegador per verificar que l'API respon

### Error: "CUDA out of memory" (7B 4-bit)
- La T4 gratuïta de Colab té ~16 GB VRAM; 7B en 4-bit normalment hi cap. Si dóna OOM:
  - Tanca altres pestanyes de Colab que facin servir GPU.
  - Reinicia el runtime (Runtime → Restart runtime) i torna a executar la cel·la 1.
- Si segueix fallant: **Fallback 2B** (veure secció següent).

### Error: "Model carregant..."
- La primera vegada que carregues el model a Colab pot trigar uns minuts
- Espera fins que vegis "✅ Model 7B (4-bit) carregat correctament!"

### La sessió de Colab es tanca
- Colab tanca sessions després d'inactivitat
- Solució: Colab Pro (paga) o mantenir la sessió activa
- Alternativa: Usar un servidor dedicat o VPS

## Fallback 2B (si 7B dona OOM o és massa lent)

Si la 7B en 4-bit dóna **CUDA out of memory** o la inferència és massa lenta, pots tornar al model 2B:

1. A la cel·la 1 de Colab, **elimina** la part de `BitsAndBytesConfig` i `quantization_config`.
2. Canvia `model_id` a `"BSC-LT/salamandra-2b-instruct"`.
3. Carrega el model amb:
   ```python
   model = AutoModelForCausalLM.from_pretrained(
       model_id,
       device_map="auto",
       torch_dtype=torch.bfloat16,
       low_cpu_mem_usage=True,
   )
   ```
4. A `health()`, retorna `"model": "salamandra-2b-instruct"`.
5. El format ChatML i `/generate` resten iguals; Next.js no cal canviar-lo.

## Millors Pràctiques

1. **Mantén Colab actiu**: No tanquis la pestanya mentre utilitzis l'API
2. **Guarda la URL**: Copia la URL de ngrok per poder-la recuperar
3. **Monitoritza l'ús**: Colab té límits de GPU gratuïta
4. **Considera alternatives**: Per producció, considera un servidor dedicat o VPS

## Referències

- [Salamandra 7B Model Card](https://huggingface.co/BSC-LT/salamandra-7b-instruct)
- [Salamandra 2B Model Card](https://huggingface.co/BSC-LT/salamandra-2b-instruct)
- [4-bit quantization (bitsandbytes)](https://huggingface.co/docs/transformers/main/en/quantization/bitsandbytes)
- [Google Colab](https://colab.research.google.com/)
- [ngrok Documentation](https://ngrok.com/docs)
