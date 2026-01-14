# Sistema de Preguntes de Control

Aquest document explica com utilitzar el sistema de preguntes de control per avaluar si Prudència està ben entrenat.

## Què són les preguntes de control?

Les preguntes de control són un conjunt de preguntes amb respostes esperades que permeten avaluar objectivament el rendiment del sistema. Cada pregunta té:

- **Articles esperats**: Articles de la Constitució que s'espera que el sistema trobi
- **Paraules clau**: Paraules que haurien d'aparèixer a la resposta
- **Paraules prohibides**: Paraules que NO haurien d'aparèixer
- **Categoria**: bàsica, específica, complexa, o edge-case
- **Dificultat**: baixa, mitjana, o alta

## Com funciona l'avaluació?

El sistema avalua cada resposta segons tres criteris:

1. **Articles trobats (40% del score)**: Verifica si el sistema ha trobat els articles correctes de la Constitució
2. **Paraules clau (40% del score)**: Verifica si la resposta conté les paraules clau esperades
3. **Paraules prohibides (20% del score)**: Penalitza si apareixen paraules que no haurien d'aparèixer

Una pregunta es considera **vàlida** si:
- El score global és ≥ 70 punts
- No hi ha errors crítics (com paraules prohibides o absència total d'articles)

## Utilització

### Opció 1: Des del navegador (recomanat)

1. Obre la pàgina `/preguntes-control` al navegador
2. Selecciona una pregunta específica o marca "Executar totes les preguntes"
3. Clica "Executar Pregunta" o "Executar Totes les Preguntes"
4. Visualitza els resultats a la mateixa pàgina

### Opció 2: Des de la línia de comandes

```bash
# Assegura't que el servidor està en marxa
npm run dev

# En una altra terminal, executa el script
npx ts-node scripts/executar-preguntes-control.ts
```

El script:
- Executa totes les preguntes de control
- Mostra els resultats a la consola
- Genera un fitxer `informe-avaluacio.json` amb els resultats detallats

### Opció 3: Via API

Pots cridar l'API `/api/preguntes-control` amb diferents paràmetres:

```javascript
// Executar una pregunta específica
fetch('/api/preguntes-control', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    preguntaId: 'control-001'
  })
});

// Executar totes les preguntes
fetch('/api/preguntes-control', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    executarTotes: true
  })
});

// Filtrar per categoria
fetch('/api/preguntes-control', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    categoria: 'bàsica'
  })
});
```

## Estructura de les preguntes

Les preguntes estan definides a `data/preguntes-control.ts`. Cada pregunta té:

```typescript
{
  id: 'control-001',
  categoria: 'bàsica',
  pregunta: 'Què diu l\'article 1 de la Constitució d\'Andorra?',
  articlesEsperats: ['CONST_001'],
  paraulesClau: ['Estat independent', 'Principat', 'Coprincipat parlamentari'],
  paraulesProhibides: [], // Opcional
  descripcio: 'Avalua si el sistema pot trobar i explicar l\'article 1',
  dificultat: 'baixa'
}
```

## Afegir noves preguntes

Per afegir noves preguntes de control:

1. Obre `data/preguntes-control.ts`
2. Afegeix una nova pregunta al array `preguntesControl`:

```typescript
{
  id: 'control-021', // Següent número disponible
  categoria: 'bàsica' | 'específica' | 'complexa' | 'edge-case',
  pregunta: 'La teva pregunta aquí',
  articlesEsperats: ['CONST_XXX'], // IDs dels articles esperats
  paraulesClau: ['paraula1', 'paraula2'], // Paraules que haurien d'aparèixer
  paraulesProhibides: ['paraula3'], // Opcional: paraules que NO haurien d'aparèixer
  descripcio: 'Descripció de què s\'està avaluant',
  dificultat: 'baixa' | 'mitjana' | 'alta'
}
```

## Interpretació dels resultats

### Score Global
- **≥ 90**: Excel·lent - El sistema respon perfectament
- **70-89**: Bo - El sistema respon correctament amb algunes millores possibles
- **50-69**: Acceptable - El sistema respon però amb errors o omissions
- **< 50**: Deficient - El sistema no respon correctament

### Informe agregat

Quan s'executen totes les preguntes, es genera un informe amb:
- Total de preguntes vàlides/invàlides
- Score mitjà global
- Desglossament per categoria
- Desglossament per dificultat
- Detall de cada pregunta

## Millores contínues

El sistema de preguntes de control permet:
1. **Detectar problemes**: Identificar àrees on el sistema falla
2. **Mesurar millores**: Comparar resultats abans i després de canvis
3. **Validar canvis**: Assegurar-se que les modificacions no trenquen funcionalitat existent

Recomanem executar les preguntes de control:
- Abans de desplegar canvis importants
- Després d'afegir noves dades o funcionalitats
- Períodicament per assegurar que el sistema manté la qualitat

## Troubleshooting

### Error: "OPENAI_API_KEY no està configurada"
Assegura't que tens la variable d'entorn `OPENAI_API_KEY` configurada.

### Error: "No s'han trobat cap article a les fonts"
Això pot indicar:
- Problemes amb els embeddings
- Articles que no existeixen al corpus
- Problemes amb la cerca semàntica

### Respostes amb score baix
Revisa:
- Si els articles esperats són correctes
- Si les paraules clau són realistes
- Si el sistema està trobant articles relacionats però no exactament els esperats
