/**
 * Bateria de preguntes "Golden Standard" sobre la Constitució d'Andorra
 * Aquestes preguntes segueixen estàndards acadèmics i cobreixen aspectes fonamentals
 * 
 * Les preguntes estan organitzades temàticament i varien en dificultat:
 * - Baixa: Preguntes directes sobre articles coneguts
 * - Mitjana: Preguntes que requereixen comprensió de conceptes jurídics
 * - Alta: Preguntes complexes que requereixen síntesi de múltiples articles
 */

import { PreguntaControl } from './preguntes-control';

export const preguntesGoldenStandard: PreguntaControl[] = [
  // ============================================================================
  // GRUP 1: ESTRUCTURA I NATURALEZA DE LA CONSTITUCIÓ
  // ============================================================================
  
  {
    id: 'golden-001',
    categoria: 'complexa',
    pregunta: 'Quin és el rang normatiu de la Constitució d\'Andorra dins de l\'ordenament jurídic? Com s\'estableix aquesta supremacia i quines conseqüències té per als poders públics?',
    articlesEsperats: ['CONST_003', 'CONST_PREAMB'],
    paraulesClau: ['norma suprema', 'ordenament jurídic', 'vincula', 'poders públics', 'supremacia'],
    descripcio: 'Golden Standard - Estructura constitucional: rang normatiu i supremacia',
    dificultat: 'alta',
    respostaEsperada: `Segons l'Article 3 de la Constitució d'Andorra, la Constitució és "la norma suprema de l'ordenament jurídic", el que significa que ocupa el lloc més alt dins de la jerarquia normativa andorrana.

Aquesta supremacia constitucional s'estableix de manera explícita a l'Article 3.1, que estableix que la Constitució "vincula tots els poders públics i els ciutadans". Això implica que:

1. **Rang normatiu suprem**: La Constitució és la norma de màxima jerarquia, per sobre de qualsevol altra norma jurídica (lleis, reglaments, etc.).

2. **Vinculació dels poders públics**: Tots els poders públics (Coprínceps, Consell General, Govern, poder judicial, administració pública) estan subjectes a la Constitució i han d'actuar d'acord amb ella.

3. **Principis garantits**: L'Article 3.2 estableix que la Constitució garanteix els principis de legalitat, jerarquia, publicitat de les normes jurídiques i no retroactivitat.

4. **Conseqüències**: Aquesta supremacia significa que cap norma jurídica pot contradir la Constitució, i que tots els actes dels poders públics han de ser conformes amb ella. Qualsevol norma o acte contrari a la Constitució pot ser declarat inconstitucional pel Tribunal Constitucional.

El preàmbul de la Constitució reforça aquesta supremacia en reconèixer que la Constitució estableix el marc jurídic que vincula les institucions i garanteix els drets fonamentals.`
  },
  
  {
    id: 'golden-002',
    categoria: 'complexa',
    pregunta: 'Quins són els principis fonamentals que inspiren la Constitució d\'Andorra segons el seu Article 1? Expliqueu el significat jurídic de cada un d\'ells.',
    articlesEsperats: ['CONST_001'],
    paraulesClau: ['principis inspiradors', 'llibertat', 'igualtat', 'justícia', 'tolerància', 'drets humans', 'dignitat'],
    descripcio: 'Golden Standard - Principis fonamentals de l\'Estat',
    dificultat: 'mitjana',
    respostaEsperada: `Segons l'Article 1 de la Constitució d'Andorra, la Constitució proclama com a principis inspiradors de l'acció de l'Estat andorrà el respecte i la promoció de:

1. **Llibertat**: El principi de llibertat implica que l'Estat ha de respectar i protegir la llibertat individual i col·lectiva. Aquest principi s'expressa en els drets fonamentals reconeguts a la Constitució, com la llibertat d'expressió, de reunió, d'associació, etc.

2. **Igualtat**: El principi d'igualtat, desenvolupat a l'Article 6, estableix que totes les persones són iguals davant la llei i que ningú pot ser discriminat per raó de naixement, raça, sexe, origen, religió, opinió o qualsevol altra condició personal o social.

3. **Justícia**: El principi de justícia implica que l'Estat ha de garantir la justícia social i el funcionament adequat del sistema judicial. Aquest principi es materialitza en l'organització judicial i en la garantia d'un procés equitatiu.

4. **Tolerància**: La tolerància és un principi que promou el respecte a la diversitat i la convivència pacífica entre persones de diferents creences, opinions o orígens.

5. **Defensa dels drets humans**: Aquest principi estableix que l'Estat ha de protegir i promoure els drets humans, com es reconeix explícitament a l'Article 5, que estableix que la Declaració Universal dels Drets Humans és vigent a Andorra.

6. **Dignitat de la persona**: La dignitat humana, reconeguda a l'Article 4 com a intangible, és el fonament de tots els drets fonamentals i constituïx el fonament de l'ordre polític, la pau social i la justícia.

Aquests principis són vinculants per a tots els poders públics i orienten la interpretació i aplicació de la Constitució.`
  },
  
  {
    id: 'golden-003',
    categoria: 'específica',
    pregunta: 'Què estableix la Constitució sobre els principis de legalitat, jerarquia, publicitat i no retroactivitat? Quin és el seu abast i aplicació?',
    articlesEsperats: ['CONST_003'],
    paraulesClau: ['legalitat', 'jerarquia', 'publicitat', 'no retroactivitat', 'normes jurídiques'],
    descripcio: 'Golden Standard - Principis jurídics bàsics de l\'ordenament',
    dificultat: 'mitjana',
    respostaEsperada: `L'Article 3.2 de la Constitució d'Andorra estableix que la Constitució garanteix els principis de legalitat, jerarquia, publicitat de les normes jurídiques i no retroactivitat. Aquests principis tenen l'abast següent:

1. **Principi de legalitat**: Aquest principi estableix que els poders públics només poden actuar quan hi ha una base legal que ho autoritzi. Implica que les decisions públiques han de tenir fonament en una norma jurídica vàlida i que els ciutadans només poden ser obligats al que està previst per la llei.

2. **Principi de jerarquia**: Aquest principi estableix un ordre de preeminència entre les normes jurídiques. La Constitució és la norma suprema, seguida de les lleis (especialment les lleis qualificades), després els reglaments i altres normes d'inferior rang. Les normes d'inferior rang no poden contradir les de superior rang.

3. **Principi de publicitat de les normes jurídiques**: Aquest principi exigeix que les normes jurídiques siguin publicades i accessibles perquè els ciutadans puguin conèixer-les i complir-les. La no publicació d'una norma impedeix que pugui produir efectes jurídics.

4. **Principi de no retroactivitat**: Aquest principi estableix que les normes jurídiques generalment no poden tenir efectes sobre fets o situacions anteriors a la seva entrada en vigor. Excepcionalment, pot permetre's la retroactivitat si és favorable al ciutadà.

Aquests principis garanteixen la seguretat jurídica, la predictibilitat del dret i la protecció dels ciutadans davant de l'arbitrarietat dels poders públics. Són essencials per al funcionament d'un Estat de Dret.`
  },

  // ============================================================================
  // GRUP 2: DRETS FONAMENTALS I LLIBERTATS
  // ============================================================================
  
  {
    id: 'golden-004',
    categoria: 'complexa',
    pregunta: 'Quin és el fonament jurídic de la dignitat humana segons la Constitució d\'Andorra? Quina relació hi ha entre la dignitat humana i els drets fonamentals?',
    articlesEsperats: ['CONST_004', 'CONST_005'],
    paraulesClau: ['dignitat humana', 'intangible', 'drets inviolables', 'imprescriptibles', 'fonament'],
    descripcio: 'Golden Standard - Dignitat humana com a fonament dels drets',
    dificultat: 'alta',
    respostaEsperada: `Segons l'Article 4 de la Constitució d'Andorra, la dignitat humana és intangible i constitueix el fonament jurídic de tots els drets fonamentals.

La Constitució estableix que la dignitat humana és intangible, el que significa que és un valor que no pot ser objecte de renúncia, limitació o restricció. A més, els drets que deriven d'ella són inviolables i imprescriptibles.

La relació entre la dignitat humana i els drets fonamentals és la següent:

1. **Fonament dels drets**: L'Article 4 estableix que els drets inviolables i imprescriptibles de la persona "constitueixen el fonament de l'ordre polític, la pau social i la justícia". Això significa que la dignitat humana no només és un dret en si mateix, sinó el fonament sobre el qual es construeixen tots els altres drets.

2. **Integració amb el dret internacional**: L'Article 5 estableix que la Declaració Universal dels Drets Humans és vigent a Andorra, el que reforça el reconeixement de la dignitat humana com a principi universal.

3. **Caràcter inviolable i imprescriptible**: Els drets derivats de la dignitat humana no poden ser renunciats ni perduts per prescripció, garantint la seva protecció permanent.

La dignitat humana actua, per tant, com a principi interpretatiu i com a límit absolut a l'acció dels poders públics, garantint que cap acte o norma pugui vulnerar aquest valor fonamental.`
  },
  
  {
    id: 'golden-005',
    categoria: 'complexa',
    pregunta: 'Quina relació estableix la Constitució d\'Andorra entre la Declaració Universal dels Drets Humans i els drets fonamentals reconeguts a la pròpia Constitució? Com s\'integren aquestes dues fonts?',
    articlesEsperats: ['CONST_004', 'CONST_005', 'CONST_006'],
    paraulesClau: ['Declaració Universal dels Drets Humans', 'vigent', 'drets fonamentals', 'relació', 'integració'],
    descripcio: 'Golden Standard - Integració del dret internacional de drets humans',
    dificultat: 'alta',
    respostaEsperada: `La Constitució d'Andorra estableix una relació d'integració i complementarietat entre la Declaració Universal dels Drets Humans i els drets fonamentals reconeguts a la pròpia Constitució.

Segons l'Article 5, la Declaració Universal dels Drets Humans és vigent a Andorra, el que significa que té aplicació directa dins de l'ordenament jurídic andorrà. Aquesta vigència es combina amb els drets reconeguts específicament a la Constitució.

La integració d'aquestes dues fonts es produeix de la manera següent:

1. **Vigència directa de la DUDH**: L'Article 5 estableix explícitament que la Declaració Universal dels Drets Humans és vigent, el que implica que els drets reconeguts en aquesta declaració tenen validesa dins de l'ordenament jurídic andorrà.

2. **Complementarietat amb els drets constitucionals**: Els drets reconeguts a la Constitució (Article 4 i següents) i els drets de la DUDH es complementen mútuament. Els drets constitucionals desenvolupen i especifiquen els drets de la DUDH en el context andorrà.

3. **Interpretació conforme**: Els drets constitucionals s'han d'interpretar de manera conforme amb la DUDH, assegurant que la protecció dels drets humans sigui la més àmplia possible.

4. **Fonament comú**: Tant la DUDH com els drets constitucionals tenen com a fonament la dignitat humana (Article 4), creant una base comuna per a la seva interpretació i aplicació.

Aquesta integració garanteix que Andorra compleix amb els estàndards internacionals de protecció dels drets humans alhora que desenvolupa una protecció específica adaptada al seu context constitucional.`
  },
  
  {
    id: 'golden-006',
    categoria: 'complexa',
    pregunta: 'Quins són els diferents tipus de discriminació prohibits per la Constitució d\'Andorra? Com es garanteix l\'efectivitat del principi d\'igualtat?',
    articlesEsperats: ['CONST_006'],
    paraulesClau: ['iguals davant la llei', 'discriminat', 'naixement', 'raça', 'sexe', 'origen', 'religió', 'opinió', 'igualtat efectiva'],
    descripcio: 'Golden Standard - Principi d\'igualtat i prohibició de discriminació',
    dificultat: 'mitjana',
    respostaEsperada: `Segons l'Article 6 de la Constitució d'Andorra, el principi d'igualtat estableix que totes les persones són iguals davant la llei i que ningú no pot ser discriminat per raó de:

1. **Naixement**: La condició de naixement no pot ser causa de discriminació.
2. **Raça**: Les diferències racials o ètniques no poden justificar cap tipus de discriminació.
3. **Sexe**: La igualtat entre homes i dones està garantida constitucionalment.
4. **Origen**: El lloc d'origen o procedència no pot ser motiu de discriminació.
5. **Religió**: Les creences religioses no poden ser causa de discriminació.
6. **Opinió**: Les opinions polítiques o d'altra naturalesa estan protegides.
7. **Qualsevol altra condició personal o social**: Aquesta clàusula general permet protegir contra altres formes de discriminació no expressament enumerades.

Per garantir l'efectivitat del principi d'igualtat, l'Article 6.2 estableix que "els poders públics han de crear les condicions per tal que la igualtat i la llibertat dels individus siguin reals i efectives". Això implica:

- **Igualtat formal**: Tots són iguals davant la llei (Article 6.1).
- **Igualtat material**: Els poders públics han de prendre mesures actives per fer efectiva la igualtat, eliminant obstacles i creant condicions reals d'igualtat.
- **Accions positives**: Es permeten mesures que promoguin la igualtat efectiva, encara que comportin un tractament diferenciat temporal si és necessari per corregir desigualtats reals.

Aquest principi és essencial per garantir que la igualtat no sigui només declarativa sinó també real i efectiva.`
  },
  
  {
    id: 'golden-007',
    categoria: 'específica',
    pregunta: 'Quins drets relacionats amb la integritat física i moral reconeix la Constitució d\'Andorra? Quines prohibicions específiques estableix?',
    articlesEsperats: ['CONST_008'],
    paraulesClau: ['integritat física', 'integritat moral', 'tortures', 'penes cruels', 'inhumanes', 'degradants', 'prohibeix'],
    descripcio: 'Golden Standard - Dret a la integritat física i moral',
    dificultat: 'mitjana',
    respostaEsperada: `L'Article 8 de la Constitució d'Andorra reconeix diversos drets relacionats amb la integritat física i moral:

1. **Dret a la vida**: L'Article 8.1 estableix que "la Constitució reconeix el dret a la vida i la protegeix plenament en les seves diferents fases", el que implica una protecció àmplia i integral del dret a la vida.

2. **Dret a la integritat física i moral**: L'Article 8.2 estableix que "tota persona té dret a la integritat física i moral", garantint la protecció de la persona en ambdós aspectes.

La Constitució estableix les prohibicions específiques següents:

- **Tortures**: Es prohibeix absolutament sotmetre qualsevol persona a tortures.
- **Penes cruels**: Es prohibeixen les penes que comportin crueltat.
- **Tractes inhumans**: Qualsevol tracte que vulneri la condició humana està prohibit.
- **Tractes degradants**: Es prohibeixen els tractes que degradin la dignitat humana.

A més, l'Article 8.3 estableix explícitament que "es prohibeix la pena de mort", el que constitueix una garantia absoluta del dret a la vida i un compromís clar amb la protecció de la integritat física.

Aquestes prohibicions són absolutes i no admeten excepcions, reflectint el caràcter intangible de la dignitat humana (Article 4) i la seva aplicació sense limitacions.`
  },
  
  {
    id: 'golden-008',
    categoria: 'complexa',
    pregunta: 'Quina és la regulació constitucional sobre els estats d\'excepció a Andorra? Quins drets poden ser suspesos i sota quines condicions?',
    articlesEsperats: ['CONST_042'],
    paraulesClau: ['estats d\'excepció', 'alarma', 'emergència', 'suspensió', 'drets', 'llei qualificada'],
    descripcio: 'Golden Standard - Estats d\'excepció i suspensió de drets',
    dificultat: 'alta',
    respostaEsperada: `L'Article 42 de la Constitució d'Andorra regula els estats d'excepció de manera exhaustiva, distingint dos tipus:

**Estats d'excepció reconeguts:**

1. **Estat d'alarma**: Pot ser declarat pel Govern en casos de catàstrofes naturals, per un termini de quinze dies i amb notificació al Consell General. Durant aquest estat es pot limitar l'exercici dels drets reconeguts als articles 21 i 27.

2. **Estat d'emergència**: És declarat pel Govern per un termini de trenta dies en els supòsits d'interrupció del funcionament normal de la convivència democràtica i requereix l'autorització prèvia del Consell General. Durant aquest estat poden ser suspesos els drets recollits als articles 9.2, 12, 15, 16, 19 i 21.

**Garanties constitucionals:**

- La regulació d'aquests estats requereix una Llei Qualificada.
- Tota pròrroga d'aquests estats requereix necessàriament l'aprovació del Consell General.
- L'aplicació de la suspensió als drets continguts als articles 9.2 i 15 s'ha de dur a terme sempre sota control judicial i sense perjudici del procediment de protecció establert a l'article 9.3.

**Drets que NO poden ser suspesos:**

La Constitució no permet la suspensió de drets fonamentals com el dret a la vida, la prohibició de tortures i penes cruels (Article 8), la dignitat humana (Article 4), o la prohibició de la pena de mort. Aquests drets són absoluts i no admeten limitacions ni en estats d'excepció.`
  },

  // ============================================================================
  // GRUP 3: INSTITUCIONS I SEPARACIÓ DE PODERS
  // ============================================================================
  
  {
    id: 'golden-009',
    categoria: 'complexa',
    pregunta: 'Què significa el "Coprincipat parlamentari" segons la Constitució d\'Andorra? Quines són les funcions i atribucions dels Coprínceps?',
    articlesEsperats: ['CONST_001', 'CONST_043', 'CONST_044', 'CONST_045', 'CONST_046', 'CONST_047', 'CONST_048', 'CONST_049'],
    paraulesClau: ['Coprincipat parlamentari', 'Coprínceps', 'sobirania compartida', 'funcions', 'atribucions'],
    descripcio: 'Golden Standard - Sistema de Coprincipat i atribucions dels Coprínceps',
    dificultat: 'alta',
    respostaEsperada: `Segons l'Article 1.4 de la Constitució d'Andorra, el règim polític d'Andorra és el "Coprincipat parlamentari".

**El Coprincipat parlamentari:**

Aquest sistema es caracteritza per la combinació del tradicional Coprincipat (que troba els seus orígens històrics als Pareatges, segons l'Article 43) amb un sistema parlamentari modern. Els Coprínceps, segons l'Article 43, són "conjuntament i indivisa, el Cap de l'Estat" i assumeixen "la representació més alta".

**Els Coprínceps:**

Segons l'Article 43.2, els Coprínceps són, "a títol personal i exclusiu, el Bisbe d'Urgell i el President de la República Francesa". Els seus poders són iguals i deriven de la Constitució.

**Funcions i atribucions dels Coprínceps:**

**Segons l'Article 44:**
- Són símbol i garantia de la permanència i continuïtat d'Andorra.
- Són garantia de la independència i del manteniment de l'esperit paritari en les tradicionals relacions d'equilibri amb els Estats veïns.
- Manifesten el consentiment de l'Estat per a obligar-se internacionalment.
- Arbitren i moderen el funcionament dels poders públics i de les institucions.
- Són informats regularment dels afers de l'Estat.

**Segons l'Article 45 (amb contrasignatura del cap de Govern o síndic general):**
- Convoquen les eleccions generals.
- Convoquen referèndum.
- Nomenen el cap de Govern.
- Signen el decret de dissolució del Consell General.
- Acrediten els representants diplomàtics.
- Nomenen els titulars de les altres institucions de l'Estat.
- Sancionen i promulguen les lleis.
- Manifesten el consentiment de l'Estat per als tractats internacionals.

**Segons l'Article 46 (lliure decisió):**
- Exerceixen la prerrogativa de gràcia.
- Creuen i estructuren serveis necessaris per a les seves funcions.
- Designen membres del Consell Superior de la Justícia.
- Nomenen membres del Tribunal Constitucional.
- Requereixen dictamen previ d'inconstitucionalitat de lleis i tractats.
- Interposen conflictes davant del Tribunal Constitucional.

El Coprincipat parlamentari combina, per tant, la tradició històrica del Coprincipat amb les garanties democràtiques del parlamentarisme modern.`
  },
  
  {
    id: 'golden-010',
    categoria: 'complexa',
    pregunta: 'Quina és la composició, elecció i funcions del Consell General segons la Constitució d\'Andorra? Com es garanteix la representativitat democràtica?',
    articlesEsperats: ['CONST_050', 'CONST_051', 'CONST_052', 'CONST_053', 'CONST_054', 'CONST_055'],
    paraulesClau: ['Consell General', 'poder legislatiu', 'representació', 'elecció', 'funcions', 'majoria'],
    descripcio: 'Golden Standard - Poder legislatiu: Consell General',
    dificultat: 'alta',
    respostaEsperada: `Segons la Constitució d'Andorra, el Consell General és el poder legislatiu i la representació del poble andorrà.

**Composició:**

Segons l'Article 52, el Consell General es compon d'un mínim de vint-i-vuit i d'un màxim de quaranta-dos consellers generals. La meitat s'elegeix a raó d'un nombre igual per cadascuna de les set parròquies (representació territorial) i l'altra meitat s'elegeix per circumscripció nacional (representació nacional). Aquesta composició paritària garanteix la representació tant de les parròquies com del conjunt nacional.

**Elecció:**

Segons l'Article 51:
- Els consellers són elegits per sufragi universal, lliure, igual, directe i secret.
- El mandat és de quatre anys.
- Les eleccions s'han de celebrar entre els trenta i quaranta dies següents a la finalització del mandat.
- Són electors i elegibles tots els andorrans que estiguin en el ple ús dels seus drets polítics.
- Una llei qualificada regularà el règim electoral.

**Funcions:**

Segons l'Article 50, el Consell General:
- Expressa la representació mixta i paritària de la població nacional i de les set parròquies.
- Representa el poble andorrà.
- Exerceix la potestat legislativa.
- Aprova els pressupostos de l'Estat.
- Impulsa i controla l'acció política del Govern.

**Garanties de representativitat democràtica:**

1. **Sufragi universal**: L'elecció per sufragi universal, lliure, igual, directe i secret garanteix la participació democràtica.
2. **Composició paritària**: La representació paritària entre parròquies i circumscripció nacional assegura la representació equilibrada.
3. **Mandat imperatiu prohibit**: Segons l'Article 53.1, els consellers no estan sotmesos a mandat imperatiu i el seu vot és personal i indelegable.
4. **Irresponsabilitat parlamentària**: L'Article 53.2 estableix que els consellers són irresponsables pels vots i opinions manifestats en l'exercici de les seves funcions.

Aquestes garanties asseguren que el Consell General representa efectivament la voluntat del poble andorrà de manera democràtica i plural.`
  },
  
  {
    id: 'golden-011',
    categoria: 'específica',
    pregunta: 'Què són les "lleis qualificades" a la Constitució d\'Andorra? Quins són els àmbits que requereixen aquest tipus de normes i quin procediment s\'exigeix per a la seva aprovació?',
    articlesEsperats: ['CONST_057', 'CONST_040'],
    paraulesClau: ['lleis qualificades', 'majoria qualificada', 'procediment agreujat', 'àmbits específics'],
    descripcio: 'Golden Standard - Lleis qualificades i procediment legislatiu especial',
    dificultat: 'mitjana',
    respostaEsperada: `Les lleis qualificades són un tipus especial de normes jurídiques previstes a la Constitució d'Andorra que requereixen un procediment d'aprovació més rigorós que les lleis ordinàries.

**Definició i procediment:**

Segons l'Article 57.3, les lleis qualificades previstes per la Constitució requereixen per a la seva aprovació el vot final favorable de la majoria absoluta dels membres del Consell General. Excepcionalment, algunes lleis qualificades (electoral i de referèndum, de competències comunals, i de transferències als Comuns) requereixen el vot final favorable de la majoria absoluta dels Consellers elegits en circumscripció parroquial i de la majoria absoluta dels Consellers elegits en circumscripció nacional.

**Àmbits que requereixen lleis qualificades:**

Segons la Constitució, diverses matèries requereixen ser regulades per llei qualificada:

1. **Règim electoral** (Article 51.4).
2. **Drets fonamentals** (Article 40): La regulació de l'exercici dels drets reconeguts als capítols III i IV del Títol II ha de ser mitjançant lleis qualificades.
3. **Estats d'excepció** (Article 42.1): Una llei qualificada regularà els estats d'alarma i d'emergència.
4. **Competències comunals** (Article 80.1): Les competències dels Comuns són delimitades mitjançant llei qualificada.
5. **Tribunal Constitucional** (Article 104): Una llei qualificada regularà l'estatut jurídic dels membres del Tribunal Constitucional.

**Procediment agreujat:**

El procediment per a l'aprovació de lleis qualificades és més rigorós:
- Requereixen majoria absoluta dels membres del Consell General (no només majoria simple).
- En alguns casos, requereixen majors especials (majoria absoluta per circumscripció parroquial i nacional).
- No poden ésser objecte de delegació legislativa ni del procediment urgent (Article 60.2).

Les lleis qualificades serveixen per garantir que les matèries més sensibles o importants siguin regulades amb major consens i rigor procedimental.`
  },
  
  {
    id: 'golden-012',
    categoria: 'complexa',
    pregunta: 'Quina és la composició i funcions del Govern d\'Andorra segons la Constitució? Com s\'estableix la relació entre el Govern i el Consell General?',
    articlesEsperats: ['CONST_072', 'CONST_073', 'CONST_074', 'CONST_075', 'CONST_076', 'CONST_077', 'CONST_078'],
    paraulesClau: ['Govern', 'poder executiu', 'Cap de Govern', 'Consell de Ministres', 'relació', 'responsabilitat'],
    descripcio: 'Golden Standard - Poder executiu: Govern',
    dificultat: 'alta',
    respostaEsperada: `Segons la Constitució d'Andorra, el Govern és el poder executiu de l'Estat.

**Composició:**

Segons l'Article 72.1, el Govern es compon del cap de Govern i dels ministres, en el nombre que determini la llei.

**Funcions:**

Segons l'Article 72.2, sota l'autoritat del seu cap, el Govern:
- Dirigeix la política nacional i internacional d'Andorra.
- Dirigeix l'administració de l'Estat.
- Exerceix la potestat reglamentària.

L'Article 72.3 estableix que l'Administració pública serveix amb objectivitat l'interès general i actua d'acord amb els principis de jerarquia, eficàcia, transparència i plena submissió a la Constitució i les lleis.

**Nomenament del cap de Govern:**

Segons l'Article 73, el cap de Govern és nomenat pels coprínceps, una vegada hagi estat elegit en els termes previstos en la Constitució (Article 68).

**Relació amb el Consell General:**

1. **Responsabilitat política**: Segons l'Article 50, el Consell General "impulsa i controla l'acció política del Govern", establint una relació de control parlamentari.

2. **Contrasignatura**: Segons l'Article 75, el cap de Govern o, si és el cas, el ministre responsable, contrasigna els actes dels coprínceps previstos a l'article 45, assumint la responsabilitat política.

3. **Responsabilitat jurisdiccional**: L'Article 74 estableix que el cap de Govern i els ministres estan sotmesos al mateix règim jurisdiccional que els consellers generals.

4. **Referèndum**: L'Article 76 estableix que el cap de Govern, amb l'acord de la majoria del Consell General, pot demanar als coprínceps la convocatòria d'un referèndum sobre una qüestió d'ordre polític.

5. **Responsabilitat davant del Consell**: Segons els articles 58 i 59, existeixen mecanismes de control del Govern pel Consell General, incloent la responsabilitat política del Govern davant del Consell.

Aquesta relació estableix un sistema parlamentari en què el Govern és responsable políticament davant del Consell General i aquest exerceix funcions de control i impuls.`
  },
  
  {
    id: 'golden-013',
    categoria: 'complexa',
    pregunta: 'Com s\'organitza el poder judicial a Andorra segons la Constitució? Quins són els principis que garanteixen la independència judicial?',
    articlesEsperats: ['CONST_085', 'CONST_086', 'CONST_087', 'CONST_088', 'CONST_089', 'CONST_090', 'CONST_091', 'CONST_092', 'CONST_093', 'CONST_094'],
    paraulesClau: ['poder judicial', 'independència', 'imparcialitat', 'inamovibilitat', 'responsabilitat', 'jutges'],
    descripcio: 'Golden Standard - Poder judicial i independència',
    dificultat: 'alta',
    respostaEsperada: `Segons la Constitució d'Andorra, el poder judicial s'organitza de manera que garanteix la independència i la imparcialitat dels jutges.

**Organització:**

Segons l'Article 85:
- En nom del poble andorrà, la justícia és administrada exclusivament per jutges independents, inamovibles i, en l'àmbit de les seves funcions jurisdiccionals, sotmesos només a la Constitució i a la llei.
- L'organització judicial és única. La seva estructura, composició, funcionament i l'estatut jurídic dels seus membres hauran d'ésser regulats per Llei Qualificada.
- Es prohibeixen les jurisdiccions especials.

**Principis que garanteixen la independència judicial:**

1. **Independència**: Els jutges han d'ésser independents, no sotmesos a cap poder o influència externa.

2. **Inamovibilitat**: Els jutges són inamovibles, el que significa que no poden ser destituïts ni traslladats sense causa justificada i segons el procediment legal.

3. **Sotmesió només a la Constitució i la llei**: En l'exercici de les seves funcions jurisdiccionals, els jutges només estan sotmesos a la Constitució i a la llei, no a cap altra autoritat.

4. **Imparcialitat**: Els jutges han d'ésser imparcials en l'exercici de les seves funcions, sense favoritismes ni prejudicis.

5. **Organització única**: L'Article 85.2 estableix que l'organització judicial és única i es prohibeixen les jurisdiccions especials, garantint la igualtat davant la llei.

6. **Procés equitatiu**: Segons l'Article 86, les normes de competència i procediment aplicables a l'Administració de Justícia estan reservades a la llei, garantint procediments equitatius i transparents.

7. **Motivació de les sentències**: L'Article 86.2 estableix que les sentències han de ser motivades i fonamentades en l'ordenament jurídic.

8. **Publicitat del judici penal**: L'Article 86.3 estableix que el judici penal és públic, salvades les limitacions previstes per la llei.

9. **Consell Superior de la Justícia**: L'Article 89 estableix la creació d'un Consell Superior de la Justícia com a òrgan de representació, govern i administració de l'organització judicial, garantint la independència del poder judicial.

Aquests principis garanteixen que el poder judicial pugui exercir les seves funcions de manera independent, imparcial i efectiva, essencial per a un Estat de Dret.`
  },
  
  {
    id: 'golden-014',
    categoria: 'complexa',
    pregunta: 'Quina és la composició, competències i funcionament del Tribunal Constitucional d\'Andorra? Quin tipus de control constitucional exerceix?',
    articlesEsperats: ['CONST_095', 'CONST_096', 'CONST_097', 'CONST_098', 'CONST_099', 'CONST_100', 'CONST_101', 'CONST_102', 'CONST_103'],
    paraulesClau: ['Tribunal Constitucional', 'control jurisdiccional', 'concentrat', 'competències', 'recursos', 'qüestions'],
    descripcio: 'Golden Standard - Tribunal Constitucional i control jurisdiccional',
    dificultat: 'alta',
    respostaEsperada: `El Tribunal Constitucional d'Andorra és l'òrgan encarregat del control jurisdiccional de la constitucionalitat de les normes i actes dels poders públics.

**Composició:**

Segons l'Article 96:
- Es compon de quatre magistrats constitucionals.
- Són designats entre persones de reconeguda experiència jurídica o institucional.
- Un magistrat és designat per cadascun dels coprínceps.
- Dos magistrats són designats pel Consell General.
- El mandat té una durada de vuit anys i no és renovable per períodes consecutius.
- La renovació del Tribunal Constitucional es fa per parts.
- És presidit cada dos anys pel magistrat al qual correspongui segons torn rotatori.

**Natura i funcionament:**

Segons l'Article 95:
- El Tribunal Constitucional és l'intèrpret suprem de la Constitució.
- Actua jurisdiccionalment.
- Les seves sentències vinculen els poders públics i els particulars.
- Aprova el seu propi reglament i exerceix la seva funció sotmès únicament a la Constitució i la llei qualificada que el reguli.

Segons l'Article 97:
- Adopta les seves decisions per majoria de vots.
- Les deliberacions i els vots són secrets.
- El ponent, sempre designat per sorteig, té vot de qualitat en cas d'empat.

**Competències:**

Segons l'Article 98, el Tribunal Constitucional coneix:
- Dels processos d'inconstitucionalitat contra les lleis, els decrets legislatius i el reglament del Consell General.
- Dels requeriments de dictamen previ d'inconstitucionalitat sobre lleis i tractats internacionals.
- Dels processos d'empara constitucional.
- Dels conflictes de competències entre els òrgans constitucionals.

**Tipus de control constitucional:**

El Tribunal Constitucional exerceix un **control jurisdiccional concentrat**:

1. **Control directe (processos d'inconstitucionalitat)**: Segons l'Article 99, poden interposar recurs d'inconstitucionalitat una cinquena part dels membres del Consell General, el cap de Govern i tres Comuns.

2. **Control incidental (qüestions de constitucionalitat)**: Segons l'Article 100, els tribunals poden formular qüestions de constitucionalitat quan tinguin dubtes sobre la constitucionalitat d'una norma aplicable al procés.

3. **Control previ (dictamens)**: Segons l'Article 101, poden requerir dictamen previ d'inconstitucionalitat sobre tractats internacionals abans de la seva ratificació.

4. **Control per empara constitucional**: Segons l'Article 102, contra els actes dels poders públics que lesionin drets fonamentals, es pot demanar empara davant el Tribunal Constitucional.

5. **Control de conflictes de competències**: Segons l'Article 103, resol els conflictes de competències entre els òrgans constitucionals.

Aquest sistema de control concentrat garanteix que la Constitució sigui efectivament aplicada i que les normes i actes contraris a ella siguin declarats inconstitucionals.`
  },

  // ============================================================================
  // GRUP 4: ORGANITZACIÓ TERRITORIAL I ADMINISTRATIVA
  // ============================================================================
  
  {
    id: 'golden-015',
    categoria: 'específica',
    pregunta: 'Quina és la organització territorial d\'Andorra segons la Constitució? Quins són els comuns i quines competències tenen?',
    articlesEsperats: ['CONST_079', 'CONST_080', 'CONST_081', 'CONST_082', 'CONST_083', 'CONST_084'],
    paraulesClau: ['organització territorial', 'comuns', 'parròquies', 'autonomia', 'competències', 'representació'],
    descripcio: 'Golden Standard - Organització territorial i comuns',
    dificultat: 'mitjana',
    respostaEsperada: `Segons la Constitució d'Andorra, l'organització territorial es basa en les parròquies, administrades pels Comuns.

**Els Comuns:**

Segons l'Article 79.1, els Comuns són:
- Òrgans de representació i administració de les parròquies.
- Corporacions públiques amb personalitat jurídica.
- Tenen potestat normativa local, sotmesa a la llei, en forma d'ordinacions, reglaments i decrets.
- Funcionen sota el principi d'autogovern, reconegut i garantit per la Constitució.

**Funcions dels Comuns:**

Segons l'Article 79.2, els Comuns:
- Expressen els interessos de les parròquies.
- Aproven i executen el pressupost comunal.
- Fixen i duen a terme les seves polítiques públiques en el seu àmbit territorial.
- Gestionen i administren tots els béns de propietat parroquial, siguin de domini públic comunal o de domini privat o patrimonial.

Segons l'Article 79.3, els seus òrgans de govern són elegits democràticament.

**Competències dels Comuns:**

Segons l'Article 80.1, dins el marc de l'autonomia administrativa i financera dels Comuns, les seves competències són delimitades mitjançant llei qualificada, almenys en les matèries següents:
- Cens de població i cens electoral.
- Consultes populars.
- Comerç, indústria i activitats professionals.
- Delimitació del territori comunal.
- Béns propis i de domini públic comunal.
- Recursos naturals.
- Cadastre.
- Urbanisme.
- Vies públiques.
- Cultura, esports i activitats socials.
- Serveis públics comunals.

Segons l'Article 80.2, la llei qualificada determina les facultats econòmiques i fiscals dels Comuns.

**Parròquies:**

Segons l'Article 1.5, Andorra està integrada per les Parròquies de Canillo, Encamp, Ordino, La Massana, Andorra la Vella, Sant Julià de Lòria i Escaldes-Engordany.

Aquesta organització territorial garanteix l'autonomia local i la participació ciutadana a nivell territorial.`
  },

  // ============================================================================
  // GRUP 5: REFORMA CONSTITUCIONAL
  // ============================================================================
  
  {
    id: 'golden-016',
    categoria: 'complexa',
    pregunta: 'Quin és el procediment de reforma constitucional establert a la Constitució d\'Andorra? Quines diferències hi ha entre la reforma parcial i total? Existeixen límits materials a la reforma?',
    articlesEsperats: ['CONST_104', 'CONST_105', 'CONST_106', 'CONST_107'],
    paraulesClau: ['reforma constitucional', 'procediment', 'majoria qualificada', 'referèndum', 'parcial', 'total', 'sanció'],
    descripcio: 'Golden Standard - Procediment de reforma constitucional',
    dificultat: 'alta',
    respostaEsperada: `La Constitució d'Andorra estableix un procediment específic per a la reforma constitucional als articles 105, 106 i 107.

**Procediment de reforma:**

Segons l'Article 105, la iniciativa de reforma de la Constitució correspondrà als coprínceps conjuntament o a una tercera part dels membres del Consell General.

Segons l'Article 106, la reforma de la Constitució requerirà:
- L'aprovació del Consell General per una majoria de dues terceres parts dels membres de la Cambra.
- Immediatament després, la proposta serà sotmesa a referèndum de ratificació.

Segons l'Article 107, superats els tràmits de l'article 106, els Coprínceps sancionaran el nou text constitucional per a la seva promulgació i entrada en vigor.

**Diferències entre reforma parcial i total:**

La Constitució d'Andorra no estableix explícitament una distinció formal entre reforma parcial i total. Totes les reformes segueixen el mateix procediment: majoria qualificada al Consell General (dues terceres parts), referèndum de ratificació i sanció pels Coprínceps.

**Límits materials a la reforma:**

La Constitució d'Andorra no estableix explícitament clàusules pètrias o límits materials a la reforma constitucional. Tot i això, alguns principis fonamentals poden considerar-se implicitament protegits:

1. **Principis inspiradors de l'Estat** (Article 1.2): Llibertat, igualtat, justícia, tolerància, defensa dels drets humans i dignitat de la persona.

2. **Dignitat humana** (Article 4): Com a intangible i fonament de l'ordre polític.

3. **Coprincipat parlamentari** (Article 1.4): Com a règim polític d'Andorra.

Aquests principis poden considerar-se protegits per la seva naturalesa fonamental, encara que la Constitució no els declari explícitament com a inmodificables.

El procediment agreujat (majoria qualificada i referèndum) serveix com a garantia per assegurar que les reformes constitucionals tinguin un ampli consens democràtic.`
  },
  
  {
    id: 'golden-017',
    categoria: 'complexa',
    pregunta: 'Existeixen clàusules pètrias o límits materials a la reforma constitucional a Andorra? Si és així, identifiqueu-les i expliqueu el seu fonament.',
    articlesEsperats: ['CONST_001', 'CONST_104', 'CONST_105', 'CONST_106'],
    paraulesClau: ['clàusules pètrias', 'límits materials', 'inderogables', 'inmodificables', 'reforma'],
    descripcio: 'Golden Standard - Clàusules pètrias i límits a la reforma',
    dificultat: 'alta',
    respostaEsperada: `La Constitució d'Andorra no estableix explícitament clàusules pètrias o límits materials a la reforma constitucional. No hi ha cap article que declari expressament determinats principis o disposicions com a inmodificables o inderogables.

Tot i això, des d'una perspectiva jurídica i doctrinal, alguns principis i disposicions constitucionals poden considerar-se implicitament protegits per la seva naturalesa fonamental i el seu paper essencial en la definició de l'Estat andorrà:

**Principis potencialment protegits:**

1. **El Coprincipat parlamentari** (Article 1.4): Aquest règim polític és fonamental per a la identitat constitucional d'Andorra i troba els seus orígens en els Pareatges històrics.

2. **La dignitat humana** (Article 4): Com a intangible i fonament de l'ordre polític, la pau social i la justícia, pot considerar-se un principi no modificable.

3. **Els principis inspiradors de l'Estat** (Article 1.2): Llibertat, igualtat, justícia, tolerància, defensa dels drets humans i dignitat de la persona són fonamentals per a la definició de l'Estat andorrà.

4. **La sobirania del poble andorrà** (Article 1.3): La sobirania resideix en el poble andorrà, que és un principi essencial de l'Estat democràtic.

**Fonament teòric:**

Encara que la Constitució no estableix explícitament clàusules pètrias, el procediment agreujat de reforma (majoria qualificada de dues terceres parts al Consell General i referèndum de ratificació) i la naturalesa fonamental d'alguns principis constitucionals suggereixen que hi ha límits materials implícits que protegeixen l'essència de la Constitució i la identitat constitucional d'Andorra.

La doctrina constitucional podria interpretar que aquests principis fonamentals estan protegits per la seva naturalesa essencial, encara que no estiguin expressament declarats com a inmodificables.`
  },

  // ============================================================================
  // GRUP 6: RELACIONS INTERNACIONALS
  // ============================================================================
  
  {
    id: 'golden-018',
    categoria: 'específica',
    pregunta: 'Quina és la regulació constitucional sobre les relacions internacionals d\'Andorra? Qui té competència per celebrar tractats internacionals?',
    articlesEsperats: ['CONST_066', 'CONST_067', 'CONST_068'],
    paraulesClau: ['relacions internacionals', 'tractats', 'competència', 'Coprínceps', 'Govern', 'ratificació'],
    descripcio: 'Golden Standard - Relacions internacionals i tractats',
    dificultat: 'mitjana',
    respostaEsperada: `La Constitució d'Andorra regula les relacions internacionals i la celebració de tractats internacionals als articles 66, 67 i 68.

**Competència per celebrar tractats:**

Segons l'Article 45.1.h, els Coprínceps manifesten el consentiment de l'Estat per a obligar-se per mitjà dels tractats internacionals, en els termes previstos en el capítol III del Títol IV de la Constitució.

Segons l'Article 66, els coprínceps participen en la negociació dels tractats que afectin les relacions amb els Estats veïns quan versin sobre determinades matèries. La representació andorrana que tingui per missió negociar aquests tractats comprendrà, a més dels membres nomenats pel Govern, un membre nomenat per cada copríncep.

Segons l'Article 67, els coprínceps són informats dels altres projectes de tractats i d'acords internacionals i, a petició del Govern, poden ésser associats a la negociació si així ho exigeix l'interès nacional d'Andorra, abans de la seva aprovació en seu parlamentària.

**Funcions del Govern:**

El Govern dirigeix la política internacional d'Andorra (Article 72.2) i participa en la negociació i aprovació de tractats internacionals.

**Procediment:**

El procediment per a la celebració de tractats internacionals implica la negociació per part del Govern (i en certs casos amb participació dels Coprínceps), l'aprovació pel Consell General quan sigui necessari, i el consentiment pels Coprínceps per a la ratificació.

Aquest sistema garanteix que les relacions internacionals d'Andorra siguin gestionades de manera coordinada entre el Govern, el Consell General i els Coprínceps, respectant les competències de cadascun.`
  },
  
  {
    id: 'golden-019',
    categoria: 'complexa',
    pregunta: 'Quin és el valor jurídic i la jerarquia dels tractats internacionals, especialment els relacionats amb drets humans, dins de l\'ordenament jurídic andorrà segons la Constitució?',
    articlesEsperats: ['CONST_003', 'CONST_005', 'CONST_066', 'CONST_067', 'CONST_098', 'CONST_101'],
    paraulesClau: ['tractats internacionals', 'drets humans', 'jerarquia', 'valor jurídic', 'ordenament jurídic'],
    paraulesProhibides: ['Article 94', 'CONST_094', 'policia judicial'], // L'Article 94 parla de policia judicial, no de tractats. IMPORTANT: No remetre mai a l'article 94 en preguntes sobre tractats internacionals
    descripcio: 'Golden Standard - Integració del dret internacional. ATENCIÓ: L\'Article 94 tracta sobre policia judicial, NO sobre tractats internacionals',
    dificultat: 'alta',
    respostaEsperada: `La Constitució d'Andorra estableix una integració específica del dret internacional, especialment en matèria de drets humans.

**Valor jurídic de la Declaració Universal dels Drets Humans:**

Segons l'Article 5, la Declaració Universal dels Drets Humans és vigent a Andorra, el que significa que té validesa directa dins de l'ordenament jurídic andorrà sense necessitat de ratificació o incorporació addicional.

**Jerarquia dels tractats internacionals:**

Encara que la Constitució no estableix explícitament la jerarquia dels tractats internacionals dins de l'ordenament jurídic, la relació entre la Constitució i el dret internacional es pot determinar de la manera següent:

1. **Constitució com a norma suprema**: Segons l'Article 3, la Constitució és la norma suprema de l'ordenament jurídic i vincula tots els poders públics.

2. **Tractats de drets humans**: Segons l'Article 5, la Declaració Universal dels Drets Humans és vigent, i segons l'Article 3, la Constitució garanteix els principis de legalitat i jerarquia. Això suggereix que els tractats de drets humans ocupen una posició especial dins de l'ordenament jurídic.

3. **Control de constitucionalitat dels tractats**: Segons l'Article 98.b, el Tribunal Constitucional coneix dels requeriments de dictamen previ d'inconstitucionalitat sobre lleis i tractats internacionals. Segons l'Article 101, els coprínceps, el cap de Govern o una cinquena part dels membres del Consell General poden requerir dictamen previ d'inconstitucionalitat sobre els tractats internacionals abans de la seva ratificació. La resolució estimatòria d'inconstitucionalitat impedirà la ratificació del tractat.

4. **Integració dels tractats**: En tot cas, la celebració d'un tractat internacional que contingui estipulacions que contradiguin la Constitució exigirà la reforma prèvia d'aquesta (Article 101.2).

**Especial protecció dels drets humans:**

La vigència directa de la Declaració Universal dels Drets Humans (Article 5) i el fet que la Constitució reconegui els drets humans com a fonament de l'ordre polític (Article 4) suggereixen que els tractats internacionals de drets humans ocupen una posició privilegiada, possiblement immediatament per sota de la Constitució però per sobre de les lleis ordinàries.

Aquesta integració garanteix que Andorra compleix amb els estàndards internacionals de protecció dels drets humans mentre manté la supremacia de la Constitució.`
  },

  // ============================================================================
  // GRUP 7: NACIONALITAT I CIUTADANIA
  // ============================================================================
  
  {
    id: 'golden-020',
    categoria: 'específica',
    pregunta: 'Quins són els requisits i procediments per a l\'adquisició, conservació i pèrdua de la nacionalitat andorrana segons la Constitució?',
    articlesEsperats: ['CONST_007'],
    paraulesClau: ['nacionalitat andorrana', 'adquisició', 'conservació', 'pèrdua', 'Llei Qualificada'],
    descripcio: 'Golden Standard - Nacionalitat i ciutadania',
    dificultat: 'mitjana',
    respostaEsperada: `L'Article 7 de la Constitució d'Andorra estableix el marc constitucional per a la nacionalitat andorrana.

**Adquisició:**

Segons l'Article 7.1, la condició de nacional andorrà, així com les seves consequències jurídiques, s'adquireix d'acord amb el que es reguli en Llei Qualificada. La Constitució no especifica els requisits per a l'adquisició, sinó que remet a una Llei Qualificada que ha de desenvolupar aquesta matèria.

**Conservació:**

L'Article 7.1 també estableix que la conservació de la nacionalitat andorrana es regula per Llei Qualificada. Tot i això, l'Article 7.2 estableix una regla específica sobre la conservació: l'adquisició o el manteniment d'una nacionalitat diferent de l'andorrana implicarà la pèrdua d'aquesta en els termes i terminis fixats per la llei.

**Pèrdua:**

Segons l'Article 7.1, la pèrdua de la nacionalitat andorrana es regula per Llei Qualificada. L'Article 7.2 estableix una causa específica de pèrdua: l'adquisició o el manteniment d'una nacionalitat diferent de l'andorrana implicarà la pèrdua d'aquesta en els termes i terminis fixats per la llei.

**Característiques del règim constitucional:**

1. **Regulació per Llei Qualificada**: Tots els aspectes relacionats amb la nacionalitat (adquisició, conservació i pèrdua) han de ser regulats per Llei Qualificada, la qual requereix majoria qualificada al Consell General (Article 57), garantint un ampli consens sobre aquesta matèria sensible.

2. **Principi de no doble nacionalitat**: L'Article 7.2 suggereix un principi de no doble nacionalitat, establint que tenir una nacionalitat diferent de l'andorrana comporta la pèrdua d'aquesta.

3. **Consequències jurídiques**: L'Article 7.1 fa referència a les "consequències jurídiques" de la nacionalitat, que inclouen els drets polítics (com el dret al sufragi, segons l'Article 51.3) i altres drets i deures relacionats amb la ciutadania.

Aquest règim constitucional garanteix que la nacionalitat andorrana sigui regulada amb el màxim rigor i consens democràtic, atesa la seva importància per a la definició de la comunitat política andorrana.`
  },

  // ============================================================================
  // GRUP 8: GARANTIES I DRETS PROCESALS
  // ============================================================================
  
  {
    id: 'golden-021',
    categoria: 'complexa',
    pregunta: 'Quins mecanismes de garantia jurisdiccional estableix la Constitució d\'Andorra per a la protecció dels drets fonamentals? Com funciona el recurs d\'amparo constitucional?',
    articlesEsperats: ['CONST_095', 'CONST_096', 'CONST_041', 'CONST_098', 'CONST_102'],
    paraulesClau: ['garantia jurisdiccional', 'amparo constitucional', 'protecció drets', 'recurs', 'Tribunal Constitucional'],
    descripcio: 'Golden Standard - Garanties jurisdiccionals dels drets fonamentals',
    dificultat: 'alta',
    respostaEsperada: `La Constitució d'Andorra estableix diversos mecanismes de garantia jurisdiccional per a la protecció dels drets fonamentals.

**Garanties jurisdiccionals generals:**

Segons l'Article 41.1, els drets i llibertats reconeguts en els capítols III i IV són tutelats pels tribunals ordinaris per mitjà d'un procediment urgent i preferent regulat per la llei, que, en qualsevol cas, se substanciarà en dues instàncies.

**Recurs d'amparo constitucional:**

Segons l'Article 41.2, la llei crearà un procediment excepcional d'empara davant el Tribunal Constitucional contra els actes dels poders públics que violin el contingut essencial dels drets esmentats en l'apartat anterior, llevat el supòsit previst a l'article 22.

Segons l'Article 98.c, el Tribunal Constitucional coneix dels processos d'empara constitucional.

Segons l'Article 102:
- Contra els actes dels poders públics que lesionin els drets fonamentals relacionats amb aquest títol, es pot demanar empara davant el Tribunal Constitucional.
- La interposició de la demanda no suspèn la vigència del precepte impugnat, llevat del cas previst a l'apartat 2 de l'article 22.
- El Tribunal haurà de dictar sentència en el termini màxim de dos mesos.

**Característiques del recurs d'empara:**

1. **Naturalesa excepcional**: És un procediment excepcional, no ordinari, reservat per a vulneracions greus dels drets fonamentals.

2. **Objecte**: Protegeix contra actes dels poders públics que lesionin el contingut essencial dels drets fonamentals.

3. **Procediment urgent**: El Tribunal haurà de dictar sentència en el termini màxim de dos mesos (Article 102.3).

4. **No suspensiva generalment**: La interposició no suspèn la vigència del precepte impugnat, llevat casos específics (Article 102.2).

**Garanties addicionals:**

El Tribunal Constitucional, segons l'Article 95, és l'intèrpret suprem de la Constitució, actua jurisdiccionalment i les seves sentències vinculen els poders públics i els particulars, garantint l'efectivitat de les garanties jurisdiccionals.

Aquests mecanismes garanteixen una protecció efectiva i ràpida dels drets fonamentals davant possibles vulneracions pels poders públics.`
  },
  
  {
    id: 'golden-022',
    categoria: 'específica',
    pregunta: 'Quins són els principis constitucionals que regulen el procediment judicial a Andorra? Com es garanteix el dret a un procés equitatiu?',
    articlesEsperats: ['CONST_085', 'CONST_086', 'CONST_090'],
    paraulesClau: ['procediment judicial', 'procés equitatiu', 'principis', 'drets processals', 'garanties'],
    descripcio: 'Golden Standard - Principis del procediment judicial',
    dificultat: 'mitjana',
    respostaEsperada: `La Constitució d'Andorra estableix diversos principis que regulen el procediment judicial i garanteixen el dret a un procés equitatiu.

**Principis generals:**

Segons l'Article 85:
- En nom del poble andorrà, la justícia és administrada exclusivament per jutges independents, inamovibles i, en l'àmbit de les seves funcions jurisdiccionals, sotmesos només a la Constitució i a la llei.
- L'organització judicial és única i es prohibeixen les jurisdiccions especials.

**Principis del procediment:**

Segons l'Article 86:
1. **Reserva de llei**: Les normes de competència i procediment aplicables a l'Administració de Justícia estan reservades a la llei (Article 86.1).

2. **Motivació de les sentències**: Les sentències seran motivades, fonamentades en l'ordenament jurídic i notificades fefaentment (Article 86.2).

3. **Publicitat del judici penal**: El judici penal és públic, salvades les limitacions previstes per la llei. El seu procediment és preferentment oral (Article 86.3).

4. **Separació d'instàncies**: La sentència que posi fi a la primera instància és dictada per un òrgan judicial diferent del que va dirigir la fase d'instrucció, i sempre és susceptible de recurs (Article 86.3).

5. **Acció popular**: La defensa jurisdiccional dels interessos generals pot efectuar-se mitjançant l'acció popular en els supòsits regulats per les lleis processals (Article 86.4).

**Garanties del dret a un procés equitatiu:**

Segons l'Article 90:
- Tothom té dret a ser informat de manera fefaent i comprensible de les acusacions formulades contra ell, així com al dret de defensa i assistència d'un advocat.
- Tothom té dret a ser jutjat per un tribunal independent, creat per llei, amb les garanties de defensa i d'un procediment contradictori, públic i oral.
- El dret de defensa i assistència d'un advocat i la presumpció d'innocència són garantits en totes les fases del procés.

Aquests principis i garanties asseguren que el procediment judicial sigui equitatiu, transparent i respectuós amb els drets fonamentals de totes les parts.`
  },

  // ============================================================================
  // GRUP 9: ASPECTES PROCEDIMENTALS I ORGANITZATIUS
  // ============================================================================
  
  {
    id: 'golden-023',
    categoria: 'complexa',
    pregunta: 'Quina és la relació entre el Consell General i el Govern segons la Constitució d\'Andorra? Com funciona la responsabilitat política del Govern davant del Consell?',
    articlesEsperats: ['CONST_050', 'CONST_072', 'CONST_058', 'CONST_059'],
    paraulesClau: ['relació', 'responsabilitat política', 'moció de censura', 'qüestió de confiança', 'control'],
    descripcio: 'Golden Standard - Relació entre poders legislatiu i executiu',
    dificultat: 'alta',
    respostaEsperada: `La Constitució d'Andorra estableix una relació de responsabilitat política del Govern davant del Consell General, característica d'un sistema parlamentari.

**Funcions del Consell General respecte al Govern:**

Segons l'Article 50, el Consell General:
- Expressa la representació mixta i paritària de la població nacional i de les set parròquies.
- Representa el poble andorrà.
- Exerceix la potestat legislativa.
- Aprova els pressupostos de l'Estat.
- **Impulsa i controla l'acció política del Govern** (Article 50).

Aquesta darrera funció estableix la relació de control parlamentari sobre el Govern.

**Relació de responsabilitat política:**

Segons l'Article 58:
- El Govern és políticament responsable conjuntament davant el Consell General.
- Qualsevol cinquena part dels membres del Consell General pot proposar una moció de censura contra el Govern.
- La moció haurà de ser proposada, almenys, per una cinquena part dels consellers i inclourà el nomenament d'un candidat al càrrec de cap de Govern.
- La moció no podrà ser votada fins cinc dies després de la seva presentació.

**Qüestió de confiança:**

Segons l'Article 59:
- El cap de Govern, amb l'acord del Consell de Ministres, i sota la seva responsabilitat, pot plantejar davant el Consell General una qüestió de confiança sobre el seu programa, sobre una declaració de política general o sobre una decisió de caràcter especial.
- La confiança s'entendrà atorgada si obté el vot favorable de la majoria simple dels membres del Consell General.

**Delegació legislativa:**

Segons l'Article 59 (també sobre delegació):
- Mitjançant llei, el Consell General pot delegar l'exercici de la funció legislativa al Govern, la qual en cap cas podrà ésser subdelegada.
- La llei de delegació determina la matèria delegada, els principis i les directrius sota els quals haurà de regir-se el corresponent decret legislatiu del Govern, així com el termini dintre del qual haurà d'ésser exercida.
- L'autorització preveurà les formes parlamentàries de control de la legislació delegada.

Aquesta relació estableix un sistema parlamentari en què el Govern és responsable políticament davant del Consell General, el qual exerceix funcions de control i impuls, garantint la separació de poders i la democràcia parlamentària.`
  },
  
  {
    id: 'golden-024',
    categoria: 'específica',
    pregunta: 'Quins són els mecanismes de participació ciutadana directa establerts a la Constitució d\'Andorra? Com funciona la iniciativa legislativa popular?',
    articlesEsperats: ['CONST_056', 'CONST_064', 'CONST_076'],
    paraulesClau: ['participació ciutadana', 'iniciativa legislativa', 'referèndum', 'democràcia directa'],
    descripcio: 'Golden Standard - Participació ciutadana i democràcia directa',
    dificultat: 'mitjana',
    respostaEsperada: `La Constitució d'Andorra estableix diversos mecanismes de participació ciutadana directa.

**Iniciativa legislativa popular:**

Segons l'Article 56.2, una cinquena part dels consellers generals poden presentar proposicions de llei al Consell General.

Encara que la Constitució no estableix explícitament una iniciativa legislativa popular directa per part dels ciutadans, estableix mecanismes de participació indirecta a través dels representants.

**Referèndum:**

Segons l'Article 64:
- El Consell General pot aprovar proposicions de llei sobre determinades matèries per mitjà del procediment d'urgència, però no podrà modificar-ne el text en la sessió que segueixi a la de la seva presentació si no hi ha un acord unànime de la cambra.
- El procediment del referèndum serà regulat per Llei Qualificada.

Segons l'Article 76:
- El cap de Govern, amb l'acord de la majoria del Consell General, pot demanar als coprínceps la convocatòria d'un referèndum sobre una qüestió d'ordre polític.
- Els coprínceps, amb la contrasignatura del cap de Govern o, en el seu cas, del síndic general, convoquen referèndum d'acord amb els articles 76 i 106 de la Constitució (Article 45.1.b).

**Referèndum de reforma constitucional:**

Segons l'Article 106, la reforma de la Constitució requerirà l'aprovació del Consell General per una majoria de dues terceres parts dels membres de la Cambra, i immediatament després, la proposta serà sotmesa a referèndum de ratificació.

**Participació a través del sufragi:**

Segons l'Article 51:
- Els consellers són elegits per sufragi universal, lliure, igual, directe i secret.
- El mandat és de quatre anys.
- Són electors i elegibles tots els andorrans que estiguin en el ple ús dels seus drets polítics.

**Limitacions i garanties:**

Els mecanismes de participació ciutadana directa estan regulats per Llei Qualificada (Article 64.2), garantint que aquests mecanismes siguin regulats amb el màxim rigor i consens democràtic, atesa la seva importància per a la participació ciutadana.

Aquests mecanismes combinen participació directa (referèndum) amb participació indirecta (elecció de representants i iniciativa a través d'aquests), garantint un sistema democràtic mixt.`
  },

  // ============================================================================
  // GRUP 10: PREÀMBUL I PRINCIPIS GENERALS
  // ============================================================================
  
  {
    id: 'golden-025',
    categoria: 'específica',
    pregunta: 'Quin és el valor jurídic del preàmbul de la Constitució d\'Andorra? Com influeix en la interpretació dels preceptes constitucionals?',
    articlesEsperats: ['CONST_PREAMB', 'CONST_001'],
    paraulesClau: ['preàmbul', 'valor jurídic', 'interpretació', 'principis', 'virtus unita fortior'],
    descripcio: 'Golden Standard - Valor jurídic del preàmbul',
    dificultat: 'mitjana',
    respostaEsperada: `El preàmbul de la Constitució d'Andorra té un valor jurídic específic com a element interpretatiu de la Constitució.

**Valor jurídic:**

Encara que el preàmbul no conté normes jurídiques directament aplicables com els articles de la Constitució, té un valor jurídic com a element interpretatiu i com a fonament dels principis inspiradors de la Constitució.

**Funcions interpretatives:**

El preàmbul serveix com a guia per a la interpretació dels preceptes constitucionals per diverses raons:

1. **Context històric i cultural**: El preàmbul situa la Constitució dins del context històric i cultural d'Andorra, fent referència als Pareatges i a la tradició andorrana.

2. **Principis inspiradors**: El preàmbul estableix els principis que inspiren la Constitució: llibertat, independència, sobirania, respecte als drets humans, democràcia, progress social, etc.

3. **Valors fonamentals**: El preàmbul proclama valors com "virtus, unita, fortior" (virtut, unió, fortalesa), que serveixen com a referència per a la interpretació de la Constitució.

4. **Fonament de la democràcia**: El preàmbul afirma que "el poble andorrà, amb plena llibertat i independència, i en exercici de la seva pròpia sobirania, aprova sobiranament la present Constitució", establint el fonament democràtic del sistema.

**Influència en la interpretació:**

El preàmbul influeix en la interpretació dels preceptes constitucionals de diverses maneres:

- **Interpretació conforme**: Els articles de la Constitució s'han d'interpretar de manera conforme amb els principis i valors establerts al preàmbul.

- **Resolució d'antinomies**: En cas de conflicte entre normes constitucionals, el preàmbul pot servir com a criteri per resoldre l'antinomia, prioritzant la interpretació que sigui més conforme amb els principis del preàmbul.

- **Desenvolupament constitucional**: El preàmbul serveix com a referència per al desenvolupament i evolució de la interpretació constitucional.

**Relació amb l'Article 1:**

Els principis establerts al preàmbul es desenvolupen i concretitzen a l'Article 1, que proclama Andorra com un Estat independent, de Dret, Democràtic i Social, i estableix els principis inspiradors de l'acció de l'Estat andorrà.

El preàmbul, per tant, actua com a fonament i guia interpretativa de tota la Constitució, encara que no tingui eficàcia jurídica directa com els articles.`
  },
  
  {
    id: 'golden-026',
    categoria: 'específica',
    pregunta: 'Què estableix el preàmbul de la Constitució d\'Andorra sobre els orígens històrics de les institucions andorranes i els Pareatges?',
    articlesEsperats: ['CONST_PREAMB'],
    paraulesClau: ['preàmbul', 'Pareatges', 'orígens històrics', 'institucions', 'tradició'],
    descripcio: 'Golden Standard - Orígens històrics i Pareatges',
    dificultat: 'baixa',
    respostaEsperada: `El preàmbul de la Constitució d'Andorra estableix una connexió explícita entre les institucions andorranes actuals i els orígens històrics d'Andorra, especialment els Pareatges.

**Orígens històrics:**

El preàmbul estableix que les institucions andorranes "troben els seus orígens en els Pareatges", fent una referència directa als acords històrics entre el Bisbe d'Urgell i el Comte de Foix (més tard el President de la República Francesa) que van donar origen al Coprincipat d'Andorra.

**Evolució institucional:**

El preàmbul reconeix que és "conscient de la necessitat d'adequar l'estructura institucional d'Andorra a les noves circumstàncies que comporta l'evolució de l'entorn geogràfic, històric i sòcio-cultural en què es troba situada", però alhora afirma la continuïtat amb la tradició històrica.

**Tradició i modernitat:**

El preàmbul combina el respecte per la tradició històrica amb la necessitat d'adaptació a les circumstàncies modernes:

- **Tradició**: Reconèix els orígens històrics en els Pareatges i la tradició de més de set-cents anys d'història.

- **Modernitat**: Afirma la necessitat d'adequar l'estructura institucional a les noves circumstàncies i d'incorporar mecanismes moderns de protecció dels drets fonamentals i democràcia.

**Lema històric:**

El preàmbul fa referència al lema "virtus, unita, fortior" (virtut, unió, fortalesa), que "ha presidit el camí pacífic d'Andorra a través de més de set-cents anys d'història", i expressa el desig que aquest lema "segueixi essent una divisa plenament vigent i orienti sempre les actuacions dels andorrans".

**Reconèixement de la continuïtat:**

El preàmbul reconeix que els valors i principis que han guiat Andorra al llarg de la seva història (llibertat, independència, respecte als drets humans, democràcia, progress social) continuen sent vigents i inspiren la nova estructura constitucional.

Aquesta connexió entre tradició i modernitat és essencial per entendre la naturalesa única del sistema polític andorrà, que combina el tradicional Coprincipat amb un sistema parlamentari modern.`
  }
];

/**
 * Estadístiques de la bateria de preguntes Golden Standard
 */
export const estadistiquesGoldenStandard = {
  total: preguntesGoldenStandard.length,
  perCategoria: {
    basica: preguntesGoldenStandard.filter(p => p.categoria === 'bàsica').length,
    especifica: preguntesGoldenStandard.filter(p => p.categoria === 'específica').length,
    complexa: preguntesGoldenStandard.filter(p => p.categoria === 'complexa').length,
    'edge-case': preguntesGoldenStandard.filter(p => p.categoria === 'edge-case').length
  },
  perDificultat: {
    baixa: preguntesGoldenStandard.filter(p => p.dificultat === 'baixa').length,
    mitjana: preguntesGoldenStandard.filter(p => p.dificultat === 'mitjana').length,
    alta: preguntesGoldenStandard.filter(p => p.dificultat === 'alta').length
  },
  grupsTematics: {
    'Estructura i naturalesa': 3,
    'Drets fonamentals': 5,
    'Institucions i poders': 6,
    'Organització territorial': 1,
    'Reforma constitucional': 2,
    'Relacions internacionals': 2,
    'Nacionalitat i ciutadania': 1,
    'Garanties i drets processals': 2,
    'Aspectes procedimentals': 2,
    'Preàmbul i principis generals': 2
  }
};
