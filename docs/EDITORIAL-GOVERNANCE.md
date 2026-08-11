# Governança editorial constitucional

## Principi general

El text oficial i l’explicació editorial són capes separades. La IA només respon al xat i no pot publicar, completar ni modificar el registre editorial.

## Flux de revisió

1. Obrir una proposta amb l’article i el camp afectat.
2. Comprovar el text oficial i la numeració constitucional.
3. Identificar cada font amb categoria i referència verificable.
4. Revisar llenguatge planer, terminologia i força normativa.
5. Revisar les connexions amb altres articles i la jurisprudència.
6. Canviar l’estat a `revisat` només després de la comprovació humana.
7. Canviar a `publicat` quan el contingut sigui apte per a la interfície pública.
8. Fer commit i desplegar; no editar directament el contingut en producció.

## Estats

- `pendent`: encara no hi ha contingut editorial suficient.
- `en-revisio`: hi ha un esborrany que encara no és definitiu.
- `revisat`: ha superat la revisió humana però encara no s’ha publicat.
- `publicat`: contingut editorial vigent a la interfície pública.

## Fonts

Les fonts només poden ser de tipus `constitucio`, `legislacio`, `jurisprudencia` o `doctrina` i han de tenir una referència identificable. Una afirmació jurisprudencial o doctrinal sense font no es publica.

## Feedback

El feedback d’usuari és anònim, queda pendent de revisió i no modifica el corpus. Els possibles errors jurídics tenen prioritat alta; les confusions tenen prioritat mitjana; els suggeriments de millora tenen prioritat baixa.

## Versions

Cada registre editorial incorpora versió, data d’actualització i equip revisor. Git conserva l’historial de canvis i les versions antigues no s’eliminen.

## Ampliació legal

La legislació i la jurisprudència disposen d’un catàleg de fonts separat del registre editorial constitucional. Les normes conserven l’enllaç documental i les resolucions conserven tribunal, número, data, resum i articles relacionats quan aquests IDs són vàlids. Tots els registres nous comencen com a `pendent`; incorporar una font al catàleg no equival a publicar-ne una interpretació.
