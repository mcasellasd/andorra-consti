# Redisseny de la interpretació d'article

## El problema, i per què era sistemàtic

La fitxa de l'article 31 (medi ambient) afirmava que la protecció del medi ambient «és un dret
fonamental». **És fals sota la Constitució andorrana**, i l'error no era puntual.

Tres causes acumulades:

### 1. El prompt deia que la norma era el Codi Civil

`generate-summary.ts` i `generate-example.ts` obrien amb:

```
Ets un assistent jurídic digital que ajuda a interpretar
els llibres del Codi Civil d'Andorra…
```

i demanaven un apartat titulat `"Resum (${articleNumber} CCA)"` — CCA és el Codi Civil. Per a
**cada article de la Constitució**, el model rebia instruccions d'interpretar una norma diferent.
És herència de la mateixa plantilla que va deixar `jurisprudence-example.ts` ple de dret català.

### 2. El model no rebia ni el títol ni el capítol

El corpus té l'estructura (`category: "Títol II - …"`), però el prompt no la passava. Sense saber
que l'article 31 és al capítol V, el model raona amb el seu coneixement general — i en moltes
constitucions el medi ambient **sí** que és un dret fonamental.

### 3. Ningú li deia la regla de força normativa

La Constitució és explícita:

| Article | Regla |
|---|---|
| 39.1 | Els drets dels **capítols III i IV** vinculen immediatament els poders públics com a dret directament aplicable |
| 39.3 | Els drets del **capítol V** «conformen la legislació i l'acció dels poders públics, però **només poden ésser invocats en els termes fixats per l'ordenament jurídic**» |
| 41 | Tutela preferent i recurs d'empara: reservats als capítols III i IV |

L'article 31 comença dient «És **funció de l'Estat** vetllar per…». És un mandat, no un dret
subjectiu.

**Abast de l'error:** els 10 articles del capítol V (27-36), els deures del capítol VI i tota la
part orgànica (títols III-IX). Més de la meitat de la Constitució era susceptible de rebre una
qualificació incorrecta.

---

## Implementat

### `lib/prompts/context-constitucional.ts`

Mòdul nou. Donat un número d'article retorna títol, capítol i **força normativa**, amb sis
categories: `dret-fonamental`, `principi-rector`, `deure`, `principi-general`, `garantia`,
`organica`.

Exposa `blocContextPrompt()`, que genera un bloc que s'injecta **abans** de la instrucció de
tasca, perquè el model sàpiga *què* interpreta abans de decidir *com*. Per als principis rectors
inclou una prohibició explícita d'anomenar-los drets fonamentals.

També exposa `quePucFer`, una frase en planer per mostrar a la interfície — no només al prompt.

Els límits de títols i capítols estan verificats contra `docs/constitucio-andorra.txt`:

| Títol | Articles | | Capítol (títol II) | Articles | Força |
|---|---|---|---|---|---|
| I | 1-3 | | I | 4-6 | principi general |
| II | 4-42 | | II | 7 | principi general |
| III | 43-49 | | III | 8-23 | **dret fonamental** |
| IV | 50-71 | | IV | 24-26 | **dret fonamental** |
| V | 72-78 | | V | 27-36 | **principi rector** |
| VI | 79-84 | | VI | 37-38 | deure |
| VII | 85-94 | | VII | 39-42 | garantia |
| VIII | 95-104 | | | | |
| IX | 105-107 | | | | |

⚠️ El menú del web diu «Títol II — Arts. 4-43». És **4-42**: l'article 43 obre el títol III
(Coprínceps). Cal corregir-ho a la navegació i al mapa de calor.

### `pages/api/generate-summary.ts` i `generate-example.ts`

- El nom de la norma s'escull segons `codi`; s'ha eliminat «CCA» per als articles constitucionals
- S'injecta el bloc de context
- Regla innegociable al *system message*: no qualificar de dret fonamental el que no ho és
- A `generate-example.ts`, quan l'article **no** té via d'empara s'exigeix un segon apartat,
  «Què NO permet aquest article», amb la via correcta
- Es prohibeixen els exemples genèrics tipus «el Govern aprova polítiques»

---

## Proposta de format (pendent d'implementar al component)

L'ordre actual és Resum → Exemple → Comentari doctrinal. Proposta:

**1. Franja de força normativa, a dalt de tot.** Abans que res, la persona ha de saber si això és
un dret que pot reclamar o un mandat a l'Estat. És la informació més accionable i ara no hi és.

**2. «Què diu»** en lloc de «Resum». El resum actual parafraseja l'article amb sinònims; qui no
l'entenia segueix igual. Ha d'explicar, no reformular.

**3. Dues columnes: el que sí i el que no permet.** Un sol exemple genèric no ensenya. El contrast
és el que fixa el concepte, i evita el malentès més freqüent.

**4. Doctrina amb autor i capítol.** Els 903 fragments del manual de 2020 porten
`author`, `capitol` i `seccio`. Es pot citar «Núria Reynal Querol, cap. 5» en lloc de «la doctrina
jurídica entén que…», que és el que deia el comentari erroni.

**5. Jurisprudència: explicar el buit.** Quan no hi ha causes, dir-ho i dir per què. Amb els 701
casos del dataset nou, 31 articles quedaran buits — i és informació, no una mancança.

---

## Verificació recomanada

1. Regenerar la interpretació de l'**article 31**: no ha de contenir «dret fonamental».
2. Comprovar un article del **capítol III** (p. ex. el 10): sí ha de dir que és emparable.
3. Passar les **43 preguntes de control** per detectar regressions.
4. Revisar articles frontissa: **26/27** (canvi de capítol IV a V) i **42/43** (canvi de títol).
