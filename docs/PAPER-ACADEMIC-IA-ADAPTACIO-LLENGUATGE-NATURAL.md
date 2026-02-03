# Dret Planer: Intel·ligència Artificial d'Ús Restringit per a la Claredat Constitucional al Principat d'Andorra

## Resum

En contextos socials i lingüístics complexos, la comprensibilitat del dret esdevé una condició essencial per a la legitimitat i efectivitat del Sistema Jurídic. En aquest article s'analitza el **dret a comprendre** com a principi jurídic implícit en el context andorrà i defensa que la intel·ligència artificial d'ús especialitzat pot actuar com a instrument legítim d'assistència a la claredat normativa. Partint de la **Constitució d'Andorra** com a Regla de Reconeixement, es presenta Dret Planer, una prova de concepte basada en una arquitectura Retrieval-Augmented Generation (RAG) orientada a generar explicacions en llenguatge planer del text constitucional. Es conclou que una IA dissenyada amb abast limitat, traçabilitat i control humà pot reforçar la cohesió jurídica i el dret a comprendre sense substituir la interpretació jurídica professional.

**Paraules clau:** dret a comprendre, claredat constitucional, intel·ligència artificial, RAG, Constitució d'Andorra, cohesió jurídica.

---

## I. Introducció

### El dret a la claredat constitucional en un Estat petit i plural

Cada any que passa Andorra esdevé socialment més diversa i alhora reforça l'estructura plurilingüe, erosionant la comprensió efectiva del dret, que alhora esdevé un repte central per a la cohesió jurídica i democràtica. Malgrat l'existència d'un mandat explícit de claredat lingüística en la Llei 6/2024, del 25 d'abril, de la llengua pròpia i oficial, el llenguatge jurídic institucional poden existir certs nivells de complexitat que dificulten l'accés real al significat de les normes, especialment per a la població no socialitzada en el sistema jurídic andorrà o bé en una altra llengua materna.

Aquest problema no és merament comunicatiu, sinó jurídic. Tal com assenyala Hart (1961), perquè una norma fonamental sigui realment operativa cal que sigui assumida des d'un punt de vista intern pels seus destinataris. En un context com l'andorrà, on més del 55% de la població resident és d'origen estranger i no ha participat en el procés constituent de 1993, la distància cognitiva entre el text constitucional i una part significativa dels subjectes de dret posa en risc aquesta acceptació interna i, amb ella, la funció integradora del dret.

Aquesta distància cognitiva s'agreuja per la complexitat del teixit social descrit per Serra (2024), qui defineix Andorra com una societat d'alta complexitat demogràfica on el multilingüisme actua com un fet "fluctuant, híbrid i polièdric". Segons l'autor, la vertebració lingüística de l'Estat xoca sovint amb la pluralitat de les migracions, generant una tensió entre els usos oficials i les identitats etnolingüístiques dels residents. Per l'autor, el repte de la comprensió constitucional transcendeix la mera precisió terminològica per esdevenir una qüestió d'accessibilitat real al «capital social» que representa la llengua oficial. Com postula Serra (2024), les llengües operen com a vehicles de valors simbòlics i identitaris; en conseqüència, si el text constitucional roman en un registre inabastable per al 55% de la població resident no andorrana, la funció integradora del dret s'afebleix, impedint que la norma interpel·li efectivament la ciutadania en els seus processos de cohesió i negociació identitària.

La doctrina contemporània ha conceptualitzat aquesta problemàtica sota la noció del dret a comprendre, entès com un pressupòsit imprescindible de l'accés efectiu a la justícia i de la tutela judicial efectiva (Carretero González, 2020; Vallespín Pérez, 2025). En aquesta línia, Montolío Durán i Bayés-Gil (2024) han mostrat com la percepció ciutadana del llenguatge juridicoadministratiu continua sent majoritàriament negativa, mentre que Saggion (2024) adverteix que la disponibilitat formal de la informació jurídica resulta insuficient si aquesta no és realment comprensible per als seus destinataris.

En el context andorrà, aquesta exigència de comprensibilitat adquireix una dimensió constitucional específica, atès que la norma suprema vincula el català no només a una funció tècnica, sinó a la igualtat material i a la cohesió de l'Estat, certament particular. Tal com adverteixen Pujol Palau i Gabernet Piqué (2024), l'opacitat en la comunicació jurídica no és un defecte formal, sinó un risc sistèmic: la manca de comprensió dels documents oficials pot derivar en situacions d'indefensió i, en darrera instància, constituir una vulneració dels drets fonamentals i, incloent, el procés l'accés a la integració jurídica.

### Intel·ligència artificial i dret a comprendre: delimitació del problema

La irrupció recent dels sistemes d'intel·ligència artificial basats en processament del llenguatge natural ha obert noves possibilitats per abordar aquesta barrera cognitiva. Tanmateix, la literatura jurídica és clara a l'hora d'establir els seus límits: la intel·ligència artificial no pot substituir el criteri interpretatiu dels operadors jurídics ni assumir funcions decisòries amb efectes normatius (López de Mántaras, 2017; Escudero, 2024). Els riscos d'al·lucinació, opacitat i biaix associats als models generatius fan incompatible el seu ús com a substituts del jutge o de l'advocat (Carretero González, 2024).

No obstant això, existeix un àmbit específic on la intel·ligència artificial pot aportar un valor jurídicament rellevant: la simplificació lingüística i explicativa del text normatiu. Els models de llenguatge han demostrat una capacitat notable per a la paràfrasi, el resum i l'adaptació de registres lingüístics, tasques que, amb una governança adequada, poden ser automatitzades sense erosionar el principi de legalitat ni el control humà (Da Cunha, 2024; Saggion, 2024).

Aquest treball parteix de la hipòtesi que una intel·ligència artificial d'ús restringit (López de Mántaras, 2017), dissenyada específicament per a la simplificació i explicació del dret, pot actuar com a instrument d'assistència al dret a comprendre. La "estretesa" del sistema no deriva del model de llenguatge base utilitzat per a la generació del text, sinó del disseny funcional i jurídic: un corpus tancat i validat, una arquitectura de recuperació augmentada de generació (RAG), la traçabilitat obligatòria a les fonts oficials, mecanismes de validació de qualitat (Dantart, 2025) i la supervisió humana. En aquest sentit, la limitació del sistema és una propietat emergent de la seva governança i no de la tecnologia de base.

### Objecte, abast i encaix normatiu del projecte

L'objecte d'aquest treball és validar, mitjançant una prova de concepte, la viabilitat d'una plataforma d'intel·ligència artificial orientada a fer comprensible els diferents preceptes jurídics, el literal de la llei mitjançant explicacions en llenguatge planer, sense substituir la interpretació jurídica professional ni generar criteri vinculant.

En la seva configuració actual, el sistema —anomenat Dret Planer— es concep com una eina d'informació i assistència a la comprensió normativa adreçada a la ciutadania, sense efectes jurídics directes. Les respostes generades tenen caràcter orientatiu sobre la interpretació jurídica d'un precepte concret, incorporen advertiments explícits sobre les seves limitacions i remeten sempre a les fonts oficials. En aquesta modalitat, el sistema s'inscriu dins dels usos informatius de la intel·ligència artificial, sotmesos principalment a obligacions de transparència, d'acord amb el Reglament (UE) 2024/1689 (AI Act).

### Metodologia i estructura del treball

Per a dur a la prova de concepte, el treball presenta una plataforma de llenguatge planer centrada inicialment en la Constitució andorrana, considerada com la Regla de Reconeixement del sistema jurídic en el sentit de Hart (1961). El sistema utilitza una arquitectura RAG que combina la recuperació semàntica d'articles constitucionals i fragments doctrinals amb la generació d'explicacions accessibles, garantint la traçabilitat i la fidelitat al text original. Cal assenyalar, per transparència metodològica, que el prototip Dret Planer s'ha implementat amb assistència d'eines d'intel·ligència artificial per al desenvolupament de software (desenvolupament assistit per IA; en la pràctica, sovint anomenat «vibe coding»), mitjançant editors i assistents basats en llenguatge natural. Aquest fet es menciona perquè l'objecte d'estudi és la claredat constitucional i l'arquitectura RAG, no el procés de codificació en si; tot i això, el paper d'aquestes eines en la construcció del prototip ha estat rellevant i convé deixar-ho constància.

En primer lloc, s'analitza el dret a comprendre en el marc internacional, europeu i andorrà; en segon lloc, s'examina la singularitat constitucional d'Andorra i la seva relació amb la cohesió jurídica; a continuació, es desenvolupa el marc teòric de la intel·ligència artificial aplicada al dret; posteriorment, es descriu detalladament l'arquitectura, el corpus i el sistema de validació de Dret Planer; finalment, es presenten les conclusions i les línies de desenvolupament futur.

---

## III. El dret a comprendre

### III.1. El dret a comprendre com a pressupòsit de l'accés a la justícia

El dret a comprendre s'ha consolidat progressivament en la doctrina jurídica contemporània com un requisit estructural de l'efectivitat del dret i de l'accés real a la justícia. Lluny de constituir un dret merament lingüístic o pedagògic, es tracta d'un principi jurídic que condiciona l'exercici de drets fonamentals com la tutela judicial efectiva, el dret de defensa i la seguretat jurídica.

Carretero González (2020) conceptualitza el dret a comprendre com una exigència implícita del dret fonamental a la tutela judicial efectiva, en la mesura que una resolució incomprensible pot generar una situació d'indefensió material encara que formalment s'hagin respectat les garanties procedimentals. En una línia coincident, Vallespín Pérez (2025) assenyala que la comunicació jurídica només compleix la seva funció democràtica quan permet al destinatari entendre les raons de la decisió i anticipar-ne els efectes jurídics. Igualment, com assenyalen les tres autores Arnall, Domènech-Bagaria i Queralt (2024), la comunicació clara no és només una qüestió de redacció, sinó un àmbit interdisciplinari que busca garantir que la ciutadania pugui trobar, entendre i utilitzar la informació pública de manera eficaç.

Aquesta idea connecta amb la tradició garantista del dret. Fuller (1964) ja advertia que un sistema normatiu que no és intel·ligible per als seus destinataris incorre en una fallida interna de la moralitat del dret, ja que impossibilita que les normes orientin efectivament la conducta. Des d'aquesta perspectiva, la comprensibilitat no és un valor afegit, sinó una condició de possibilitat del dret com a sistema normatiu.

### III.2. El llenguatge jurídic com a barrera cognitiva

La doctrina ha identificat de manera reiterada el llenguatge jurídic tradicional com una de les principals barreres d'accés al dret. Montolío Durán i Bayés-Gil (2024) descriuen l'ús d'estructures sintàctiques complexes, arcaismes i tecnicismes com un factor que allunya la ciutadania del discurs juridicoadministratiu, generant una percepció d'opacitat i distanciament institucional.

Julià Pijoan (2025) destaca que el llenguatge jurídic exigeix una competència conceptual especialitzada que no pot ser pressuposada en una societat democràtica plural. En conseqüència, la manca de comprensió no pot ser atribuïda únicament al destinatari del missatge, sinó que ha de ser considerada una deficiència del propi sistema de comunicació jurídica.

Aquest diagnòstic és compartit per la literatura internacional. Saggion (2024) assenyala que la mera disponibilitat formal de la informació jurídica resulta insuficient si aquesta no és accessible cognitivament, i vincula l'accessibilitat lingüística amb el dret humà a la informació. En aquest sentit, la simplificació del llenguatge jurídic no implica una pèrdua de rigor, sinó una transformació del registre comunicatiu per fer-lo funcional.

### III.3. Desenvolupament institucional del dret a comprendre

#### III.3.1. Àmbit europeu i internacional

Diversos instruments internacionals han reconegut implícitament que el dret a la informació només és efectiu si el destinatari comprèn el contingut comunicat. El Conveni Europeu de Drets Humans exigeix que les persones detingudes o acusades siguin informades de les raons de la seva detenció o acusació "en una llengua que comprenguin" (CEDH, arts. 5.2 i 6.3), vinculant explícitament informació i comprensió.

En l'àmbit de la Unió Europea, la Carta dels Drets Fonamentals consagra el dret a la tutela judicial efectiva (art. 47), que la doctrina ha interpretat com a incompatible amb resolucions inintel·ligibles o excessivament opaques (Vallespín Pérez, 2025). La jurisprudència del Tribunal de Justícia de la Unió Europea ha insistit igualment en la necessitat que les decisions administratives i judicials siguin comprensibles per als seus destinataris.

#### III.3.2. Àmbit espanyol i iberoamericà

A l'Estat espanyol, el desenvolupament institucional del dret a comprendre té un punt d'inflexió amb la creació de la Comissió de Modernització del Llenguatge Jurídic l'any 2009, que va identificar la comprensibilitat com un dret de la ciutadania fonamentat en la dignitat de la persona (art. 10.1 CE), la seguretat jurídica (art. 9.3 CE) i la tutela judicial efectiva (art. 24 CE).

En aquest sentit, és fonamental destacar la Declaració d'Asunción, adoptada durant la XVIII Cimera Judicial Iberoamericana (2016), fòrum del qual Andorra és membre actiu. Aquest instrument reconeix explícitament el llenguatge clar no com una mera cortesia administrativa, sinó com una garantia essencial del dret d'accés a la justícia. La Declaració insta els Estats membres a eliminar les barreres semàntiques que generen distància entre els operadors jurídics i la ciutadania, establint que la legitimitat de les decisions judicials depèn, en gran mesura, que els seus destinataris puguin comprendre-les sense indefensió.

Burgos Martínez (2025) ha posat de manifest una paradoxa estructural: les mateixes normes que proclamen el dret a comprendre sovint estan redactades en un llenguatge jurídic inaccessible, vulnerant en la pràctica el dret que pretenen garantir. L'autora defensa l'ús d'eines tecnològiques —incloent-hi la intel·ligència artificial d'ús restringit— com a instruments complementaris per fer operatiu aquest dret a escala.

### III.4. El dret a comprendre en català

En els territoris de parla catalana, el dret a comprendre s'ha articulat sota la noció de llenguatge planer o comunicació clara, entesa com una disciplina interdisciplinària que combina criteris lingüístics, jurídics i de disseny de la informació. Matamala (2024) distingeix entre **Llenguatge Fàcil** (Easy Language), adreçat a persones amb dificultats lectores o discapacitat cognitiva, i **Llenguatge Planer** (Plain Language), adreçat a la ciutadania general per fer la informació clara i concisa. Dret Planer opera en aquest segon nivell, orientat a la claredat sense reduir el text a lectura fàcil. A Catalunya, aquesta aposta s'ha institucionalitzat mitjançant l'Acord GOV/29/2024, que eleva la comunicació clara a política de Govern.

Les Illes Balears i el País Valencià han desenvolupat igualment iniciatives orientades a la claredat lingüística, incloent-hi eines d'assistència a la redacció i adaptacions a lectura fàcil. Aquestes experiències mostren que la simplificació del llenguatge jurídic pot ser compatible amb el manteniment del rigor normatiu.

### III.5. El dret a comprendre al Principat d'Andorra

En el context andorrà, el dret a comprendre adquireix una rellevància singular a causa de la combinació de tres factors: (i) una població majoritàriament d'origen estranger, (ii) un sistema jurídic amb elements històrics propis i (iii) un mandat constitucional i legal explícit de claredat lingüística.

La Constitució del Principat estableix el català com a llengua oficial de l'Estat, vinculant la llengua a la cohesió social i a la igualtat material. Aquest principi es desenvolupa amb la Llei 6/2024, que exigeix que el llenguatge institucional sigui "accessible, acurat i comprensible", incloent-hi expressament l'Administració de Justícia.

Pujol Palau i Gabernet Piqué (2024) remarquen que la manca de comprensió de documents oficials pot constituir una vulneració de drets fonamentals, especialment quan impedeix l'exercici del dret de defensa. En la mateixa línia, el Raonador del Ciutadà ha advertit que resolucions incomprensibles poden vulnerar un dret fonamental, reforçant la dimensió jurídica —i no merament lingüística— del dret a comprendre.

Tot i que la jurisprudència andorrana no ha reconegut explícitament un dret autònom a comprendre, les exigències de motivació de les resolucions i la prohibició d'indefensió impliquen un estàndard mínim de comprensibilitat. A més, Andorra ha subscrit la Declaració d'Asunción (2016), que vincula la legitimitat de la judicatura a la claredat i qualitat de les resolucions judicials.

### III.6. Del principi al problema operatiu

Així doncs, el dret a comprendre s'ha consolidat com un principi jurídic fonamental en múltiples jurisdiccions. No obstant això, la seva efectivitat depèn de l'existència d'eines pràctiques que el facin operatiu. En un Estat petit i socialment heterogeni com Andorra, la mera proclamació normativa resulta insuficient si no va acompanyada de mecanismes que redueixin la distància cognitiva entre la norma i els seus destinataris.

És en aquest punt on la intel·ligència artificial d'ús restringit, dissenyada amb garanties jurídiques i control humà, pot actuar com a instrument d'assistència a la comprensió normativa. La secció següent analitza com aquesta funció pot articular-se específicament a partir de la Constitució andorrana, entesa com a Regla de Reconeixement del sistema jurídic.

---

## IV. La Constitució del Principat d'Andorra com a Regla de Reconeixement

### IV.1. La Regla de Reconeixement en la teoria de H. L. A. Hart

En la teoria positivista de H. L. A. Hart (1961), la Regla de Reconeixement constitueix la norma fonamental d'un sistema jurídic: aquella que estableix els criteris últims de validesa de totes les altres normes. No es tracta d'una norma escrita necessàriament, sinó d'una convenció social acceptada pels operadors jurídics que permet identificar què és dret vàlid dins d'un ordenament determinat.

Hart subratlla que l'eficàcia d'aquesta regla no depèn únicament del seu reconeixement formal, sinó de la seva acceptació des del "punt de vista intern". Això implica que els subjectes rellevants del sistema —especialment els jutges i altres aplicadors del dret— assumeixin la regla com a pauta legítima de conducta, i no merament com una imposició externa. Sense aquesta acceptació interna, la Regla de Reconeixement perd la seva funció estabilitzadora i integradora.

Tal com ha desenvolupat Vilajosana (2010), la Regla de Reconeixement té una dimensió constitutiva: els membres del sistema actuen conforme a ella perquè pressuposen que els altres també ho faran en situacions anàlogues. D'aquesta manera, la regla opera com un mecanisme de coordinació jurídica que garanteix la coherència i continuïtat de l'ordenament.

### IV.2. La Constitució andorrana com a norma fonamental escrita

En el cas del Principat d'Andorra, la Constitució de 1993 compleix clarament la funció de Regla de Reconeixement en sentit hartià. A diferència de sistemes de common law on la regla és principalment consuetudinària, l'ordenament andorrà disposa d'una norma fonamental escrita que fixa explícitament l'estructura institucional de l'Estat, la jerarquia normativa i els drets fonamentals.

El procés constituent de 1993 va respondre a la necessitat de dotar Andorra d'una personalitat jurídica internacional clara i d'un marc constitucional homologable als estats democràtics europeus. Com destaquen Marqués i Osté (2016) i López Burniol (2023), la Constitució va permetre superar una arquitectura institucional d'arrel medieval —basada en els Pareatges i la tradició consuetudinària recollida al *Manual Digest* de Fiter i Rossell (1748)— sense trencar amb la continuïtat històrica del país, mitjançant la transformació del Coprincipat en un coprincipat parlamentari.

Aquesta operació va tenir una doble funció: d'una banda, transferir la sobirania al poble andorrà; de l'altra, preservar els elements simbòlics i institucionals que havien garantit la pervivència del Principat. En aquest sentit, la Constitució andorrana no només funda jurídicament l'Estat, sinó que actua com a instrument de cohesió identitària i política.

### IV.3. Acceptació interna i distància cognitiva

Una singularitat jurídica en el cas andorrà rau en el fet que la població subjecta a l'ordenament no va formar part de l'aprovació de la Constitució. Tal com mostren les dades demogràfiques (Taula 4), una part majoritària de la població resident actual no va participar en el referèndum de 1993 i tampoc ha estat socialitzada en els valors jurídics andorrans.

Aquesta circumstància genera una tensió específica en termes d'acceptació interna de la Regla de Reconeixement. Si bé els operadors jurídics assumeixen plenament la Constitució com a norma fonamental, una part significativa dels destinataris de la norma pot percebre-la com un text distant, complex o aliè. Com assenyala Hart (1961), l'estabilitat del sistema no depèn únicament de l'acceptació pels jutges, sinó també del fet que la població pugui reconèixer la norma com a marc legítim d'organització social.

En el context andorrà, aquesta distància cognitiva es veu accentuada per la combinació d'un sistema jurídic amb elements històrics propis, una tradició de dret consuetudinari i una realitat social marcada per la pluralitat lingüística i cultural. Andreu i Sotelo (2015) va advertir que el sistema de fonts andorrà (pre-constitucional) resultava obscur fins i tot per a operadors formats en sistemes codificats, fet que dificultava encara més la comprensió i encís per part de la ciutadania no experta.

### IV.4. Comprensibilitat i eficàcia de la Regla de Reconeixement

Des d'aquesta perspectiva, la comprensibilitat de la Constitució no és un objectiu pedagògic accessori, sinó un requisit funcional de la seva eficàcia com a Regla de Reconeixement. Un text constitucional que no és comprensible per als seus destinataris difícilment pot actuar com a pauta d'orientació de la conducta ni com a element integrador del sistema jurídic.

Aquesta idea connecta amb la tesi de Fuller (1964) sobre la moralitat interna del dret: les normes han de ser clares, intel·ligibles i accessibles si volen complir la seva funció normativa. En un Estat petit i socialment heterogeni com Andorra, aquesta exigència esdevé especialment rellevant, ja que la cohesió jurídica no pot recolzar-se únicament en la tradició o en la socialització primària.

En aquest sentit, facilitar la comprensió de la Constitució contribueix a reforçar la seva acceptació interna més enllà del cercle dels juristes, ampliant el seu efecte integrador sobre el conjunt de la població resident. La Constitució deixa així de ser percebuda com un text simbòlic o distant per esdevenir un instrument viu de regulació social.

### IV.5. La Constitució com a corpus pilot per a la simplificació assistida

La tria de la Constitució andorrana com a corpus inicial del projecte Dret Planer respon a raons tant jurídiques com metodològiques. Des d'un punt de vista jurídic, es tracta de la norma suprema de l'ordenament, de la qual deriva la validesa de totes les altres normes. Des d'un punt de vista tècnic, la seva extensió limitada i la seva estructura sistemàtica permeten una implementació controlada i verificable d'un sistema d'assistència a la comprensió.

Tal com assenyala Vilajosana (2010), conèixer la Regla de Reconeixement d'un sistema és conèixer el fonament mateix del dret vigent. Facilitar-ne la comprensió mitjançant eines d'intel·ligència artificial d'ús restringit no implica substituir la interpretació jurídica, sinó reduir la distància cognitiva entre el text normatiu fonamental i els seus destinataris.

Així, la Constitució es presenta com un camp d'experimentació idoni per analitzar fins a quin punt la intel·ligència artificial pot contribuir a reforçar la claredat constitucional i, amb ella, la cohesió jurídica en el Principat d'Andorra. La secció següent desenvolupa el marc teòric i tècnic de la intel·ligència artificial aplicada a aquesta funció, delimitant-ne les possibilitats i els límits.

---

## V. Marc teòric-jurídic de la intel·ligència artificial aplicada al dret

### V.1. Intel·ligència artificial i dret: plantejament general

La incorporació de sistemes d'intel·ligència artificial (IA) en l'àmbit jurídic ha generat un intens debat doctrinal sobre els seus límits, possibilitats i riscos. Tot i l'expansió recent dels models de llenguatge extens (Large Language Models, LLM), la literatura jurídica coincideix a assenyalar que la IA no pot assumir funcions decisòries amb transcendència normativa ni substituir el criteri dels operadors jurídics humans (López de Mántaras, 2017; Escudero, 2024).

Aquesta limitació no respon únicament a consideracions tècniques, sinó a principis estructurals del dret. Tal com recorda Hart (1961), el dret és un sistema de normes socials que pressuposa responsabilitat, imputació i justificació, elements que no poden ser atribuïts a sistemes artificials. En conseqüència, la IA només pot operar legítimament en el dret com a instrument d'assistència, mai com a subjecte d'autoritat normativa.

En aquest context, la qüestió central no és si la IA pot "interpretar" el dret en sentit fort, sinó en quines funcions auxiliars pot contribuir a millorar el funcionament del sistema jurídic sense erosionar-ne les garanties.

### V.2. IA estreta i IA generativa: distinció conceptual necessària

La doctrina especialitzada distingeix habitualment entre intel·ligència artificial estreta (narrow AI o weak AI) i intel·ligència artificial general (strong AI o AGI). La primera fa referència a sistemes dissenyats per executar tasques específiques i delimitades; la segona, encara teòrica, designa sistemes amb capacitats cognitives generals equiparables a les humanes (López de Mántaras, 2017).

Tots els sistemes d'IA actualment operatius —incloent-hi els models de llenguatge— s'inscriuen dins de l'àmbit de la IA estreta en sentit funcional. Tanmateix, l'aparició dels LLM ha introduït una complexitat addicional, ja que aquests models presenten una capacitat generativa generalista que pot donar lloc a comportaments no previstos, incloent-hi errors plausibles o "al·lucinacions" (Escudero, 2024).

Per aquest motiu, diversos autors han advertit que l'ús indiscriminat de models generatius en contextos jurídics pot comprometre la seguretat jurídica i la confiança institucional (Carretero González, 2024; Vallespín Pérez, 2025). La distinció entre IA estreta i IA generativa no és, doncs, merament terminològica, sinó que té conseqüències normatives directes.

### V.3. IA generativa i riscos jurídics: de la versemblança a la veracitat

Els models de llenguatge extens (LLM) funcionen mitjançant mecanismes probabilístics de predicció de seqüències textuals, sense comprensió semàntica en sentit humà (López de Mántaras, 2018). Aquesta naturalesa estocàstica explica la seva elevada capacitat expressiva, però també introdueix riscos estructurals que comprometen la seguretat jurídica.

Com analitza Dantart (2025) en el seu informe tècnic sobre la veracitat, el problema principal no és la incapacitat del model per processar informació, sinó la tensió fonamental entre la fluïdesa sintàctica i la precisió factual. La doctrina i l'anàlisi tècnica identifiquen els següents riscos crítics:

**Al·lucinacions i versemblança enganyosa:** Més enllà del simple error, Dantart (2025) adverteix d'una «generació endèmica d'al·lucinacions» on el sistema prioritza la coherència lingüística per sobre de la realitat normativa. Dahl et al. (2024) documenten aquest fenomen com a "al·lucinacions endèmiques" en models legals, on els sistemes inventen cites, jurisprudència i *holdings* (decisions judicials) amb una versemblança enganyosa. El risc més greu, segons l'autor, rau en la versemblança: la fabricació de cites, jurisprudència o preceptes inexistents que es presenten amb una estructura formal i un to tècnicament impecables, fent-los difícilment detectables sense una verificació exhaustiva.

**Ruptura de la traçabilitat (Source Grounding):** Un dèficit crític assenyalat per Dantart és la dificultat dels models base per vincular la resposta generada amb la font original. Magesh et al. (2024) adverteixen que fins i tot les eines RAG comercials presenten riscos de *misgrounding*: citar una font real però tergiversar-ne el contingut. En l'àmbit jurídic, on la validesa d'una afirmació depèn de la seva font (llei o sentència), l'absència d'un ancoratge documental verificable invalida la utilitat del resultat.

**Opacitat:** Dificultat d'explicar el procés intern que condueix a una resposta concreta (black box), fet que xoca amb el principi de motivació dels actes jurídics.

**Biaixos:** Reproducció o amplificació de prejudicis presents en les dades d'entrenament, que poden perpetuar discriminacions sistèmiques.

**Confusió d'autoritat:** Risc que el destinatari atribueixi caràcter normatiu, oficial o assessor a una resposta generada automàticament.

Aquests factors fan inviable l'ús directe de la IA generativa «en cru» com a font d'interpretació jurídica autònoma (Caja Moya & Quiroga Rodríguez, 2025). Per tant, tal com conclou Dantart (2025), l'única via per a una integració responsable és l'adopció d'arquitectures RAG (Retrieval-Augmented Generation) optimitzades, que restringeixin la capacitat creativa del model i obliguin a una verificació constant contra el corpus normatiu vigent.

### V.4. La IA com a eina d'assistència a la comprensió del dret

Malgrat aquestes limitacions, la doctrina reconeix un espai d'aplicació legítima i valuosa de la IA en el dret: la simplificació, explicació i adaptació lingüística del discurs jurídic. Aquesta funció no implica crear dret ni decidir conflictes, sinó facilitar la comprensió del dret existent.

Da Cunha (2024) i Saggion (2024) han mostrat que els sistemes de processament del llenguatge natural poden generar resums, reformulacions i versions de lectura fàcil amb un alt grau d'eficiència, sempre que operin sota condicions de control i supervisió humana. En aquest sentit, la IA pot actuar com un mediador lingüístic entre el text normatiu i el ciutadà.

Aquesta funció és coherent amb el dret a comprendre, ja que no substitueix el criteri jurídic, sinó que redueix la distància cognitiva que impedeix l'exercici efectiu dels drets.

### V.5. La "estretesa" com a resultat de disseny i governança

En el context d'aquest treball, la qualificació del sistema Dret Planer com a "intel·ligència artificial estreta" no deriva del model de llenguatge base utilitzat per a la generació del text, sinó del disseny funcional i jurídic del sistema.

Aquesta estretesa es construeix mitjançant diversos mecanismes complementaris:

1. **Delimitació del domini:** el sistema opera exclusivament sobre un corpus jurídic tancat i validat.

2. **Arquitectura RAG:** la generació de text està condicionada a la recuperació prèvia de fragments normatius o doctrinals rellevants.

3. **Traçabilitat:** totes les respostes remeten a les fonts oficials utilitzades.

4. **Validació de qualitat:** mecanismes automàtics de detecció d'errors, omissions i contingut no suportat pel corpus.

5. **Supervisió humana:** advertiments explícits sobre el caràcter orientatiu de les respostes i recomanació de consulta professional.

Així, la "estretesa" del sistema és una propietat emergent de la seva governança tècnica i jurídica, i no una limitació intrínseca de la tecnologia de base. Aquesta aproximació permet aprofitar la capacitat expressiva dels models generatius sense renunciar als requisits d'explicabilitat i control exigibles en l'àmbit jurídic (Julià Pijoan, 2025).

### V.6. Control humà, responsabilitat i marc normatiu

El principi de control humà constitueix un element central en qualsevol aplicació legítima de la IA al dret. Tant la doctrina com el Reglament (UE) 2024/1689 insisteixen que cap decisió amb efectes jurídics adversos pot basar-se exclusivament en el resultat d'un sistema d'IA.

En la configuració actual de Dret Planer, el sistema no produeix efectes jurídics directes ni intervé en processos decisoris. La seva funció es limita a la informació i explicació del dret, amb obligacions de transparència, advertiment i no assessorament, d'acord amb el marc normatiu vigent.

Aquest encaix normatiu reforça la idea que la intel·ligència artificial, utilitzada amb rigor i sota el principi de subjecció a la llei, pot contribuir a millorar l'accessibilitat del dret sense comprometre'n les garanties estructurals.

### V.7. Síntesi

En síntesi, la intel·ligència artificial no pot substituir la interpretació jurídica ni la decisió humana, però pot actuar com una eina poderosa d'assistència a la comprensió normativa quan és dissenyada amb abast limitat, governança clara i control humà. Aquesta funció resulta especialment rellevant en contextos com l'andorrà, on la claredat constitucional és una condició necessària per a la cohesió jurídica i democràtica.

La secció següent presenta la prova de concepte Dret Planer, descrivint l'arquitectura tècnica, el corpus utilitzat i els mecanismes de validació que permeten operacionalitzar aquests principis teòrics.

---

## VI. Proof of Concept: Dret Planer — una plataforma d'IA per al dret a comprendre a Andorra

### VI.1. Finalitat i criteris de disseny del prototip

El projecte Dret Planer es concep com una prova de concepte orientada a validar empíricament la hipòtesi formulada en aquest treball: que una intel·ligència artificial d'ús restringit, dissenyada amb garanties jurídiques i control humà, pot contribuir de manera efectiva a la comprensió del dret constitucional sense substituir la interpretació jurídica professional ni generar criteri vinculant.

La finalitat del prototip no és optimitzar processos decisoris ni automatitzar l'aplicació del dret, sinó reduir la distància cognitiva entre el text normatiu fonamental i els seus destinataris. En aquest sentit, Dret Planer s'inscriu en la línia d'eines d'assistència lingüística i explicativa, compatibles amb el dret a comprendre i amb els principis de legalitat i responsabilitat (Carretero González, 2020; Saggion, 2024).

El disseny del sistema respon a quatre criteris fundacionals:

1. **Abast limitat:** el sistema opera exclusivament sobre un corpus jurídic validat i no genera contingut normatiu nou.

2. **Traçabilitat:** totes les explicacions remeten explícitament a les fonts oficials utilitzades.

3. **Explicabilitat:** el funcionament del sistema i les seves limitacions són comunicats de manera clara a l'usuari.

4. **Control humà:** el sistema incorpora advertiments explícits i no substitueix l'assessorament professional.

Aquests criteris responen tant a les exigències doctrinals sobre l'ús legítim de la IA en el dret (Julià Pijoan, 2025; Vallespín Pérez, 2025) com al marc normatiu europeu vigent (Reglament (UE) 2024/1689).

### VI.2. Elecció del corpus: la Constitució del Principat d'Andorra

La Constitució del Principat d'Andorra ha estat escollida com a corpus inicial del prototip per raons jurídiques i metodològiques. Des d'un punt de vista jurídic, constitueix la norma suprema de l'ordenament i la Regla de Reconeixement en sentit hartià (Hart, 1961). Des d'un punt de vista tècnic, la seva extensió limitada i estructura sistemàtica permeten una implementació controlada i verificable.

El corpus constitucional està format pel preàmbul i els 107 articles de la Constitució, estructurats segons els seus títols i capítols. Cada article ha estat processat com una unitat de coneixement independent, amb identificador únic, metadades bàsiques i text oficial íntegre.

A aquest corpus s'hi ha afegit, en una fase posterior, doctrina jurídica andorrana seleccionada, incloent-hi l'obra coordinada per Pastor Vilanova (2013) sobre la jurisprudència constitucional andorrana, amb la finalitat de proporcionar context interpretatiu sense substituir el text normatiu. Aquesta incorporació respon a la idea que la comprensió del dret no es limita a la literalitat de la norma, sinó que requereix una mínima contextualització doctrinal (Fuller, 1964; Vilajosana, 2010).

### VI.3. Arquitectura del sistema: Retrieval-Augmented Generation (RAG)

Per a l'assoliment dels objectius del projecte, s'ha optat per una arquitectura de Retrieval-Augmented Generation (RAG). Aquest enfocament combina dos processos diferenciats però complementaris: la recuperació semàntica d'informació rellevant del corpus i la generació d'explicacions en llenguatge natural a partir d'aquest contingut.

L'elecció de l'arquitectura RAG respon a diverses raons:

- **Reducció del risc d'al·lucinacions:** la generació està condicionada al contingut recuperat, evitant la creació de respostes desvinculades del text oficial.

- **Traçabilitat normativa:** el sistema pot indicar explícitament quins fragments del corpus sustenten cada resposta.

- **Separació funcional:** la recuperació i la generació són processos diferenciats, cosa que facilita el control i l'auditoria del sistema.

Tal com assenyalen Betancur Sánchez et al. (2025), les arquitectures híbrides que combinen recuperació i generació resulten especialment adequades per a aplicacions jurídiques, ja que permeten mantenir la fidelitat al dret vigent tot millorant l'accessibilitat del discurs. La implementació d'aquest model no està exempta de riscos sistèmics. En un sentit similar, Dantart (2025) adverteix en el seu informe tècnic sobre la veracitat en la IA jurídica, els models de llenguatge presenten una "generació endèmica d'al·lucinacions" que pot produir resultats factualment incorrectes. Per mitigar aquest risc, Dret Planer adopta la metodologia d'optimització de RAG (Retrieval-Augmented Generation) proposada per l'autor, assegurant que el sistema no generi contingut autònom, sinó que es limiti a processar i simplificar exclusivament les fonts legals autoritzades.

### VI.4. Models utilitzats: embeddings i generació de text

#### VI.4.1. Models d'embeddings

Per a la recuperació semàntica del contingut, el sistema utilitza models d'embeddings que transformen els textos del corpus en representacions vectorials. En la fase pilot, s'ha emprat un model multilingüe basat en XLM-RoBERTa, capaç de representar adequadament textos jurídics en català.

Aquesta elecció permet una cerca semàntica basada en el significat, i no únicament en la coincidència lèxica, millorant la identificació d'articles rellevants fins i tot quan la consulta de l'usuari no reprodueix literalment el vocabulari constitucional.

Es preveu, en fases posteriors, la migració cap a models entrenats específicament en català jurídic, com els desenvolupats en el marc del Projecte AINA, amb l'objectiu de millorar encara més la precisió semàntica.

#### VI.4.2. Model de generació

La generació d'explicacions en llenguatge planer es realitza mitjançant un model de llenguatge extens d'alta capacitat. Aquest model no opera de manera autònoma, sinó estrictament condicionat pel contingut recuperat a la fase prèvia.

Tal com s'ha exposat en el marc teòric, l'ús d'un model generatiu no implica atribuir-li capacitat interpretativa. La seva funció es limita a reformular i explicar el contingut jurídic existent, d'acord amb les fonts proporcionades, actuant com un mediador lingüístic (Saggion, 2024).

### VI.5. Funcionament operatiu del sistema

El funcionament de Dret Planer es pot descriure en cinc etapes successives:

1. **Entrada de la consulta:** l'usuari formula una pregunta en llenguatge natural.

2. **Anàlisi semàntica:** la consulta es transforma en un vector d'embedding.

3. **Recuperació del contingut:** el sistema identifica els fragments del corpus més rellevants.

4. **Generació de l'explicació:** el model generatiu elabora una resposta en llenguatge planer a partir del contingut recuperat.

5. **Presentació amb garanties:** la resposta inclou advertiments, fonts i indicacions sobre el seu caràcter orientatiu.

Aquest flux garanteix que la resposta final estigui sempre ancorada en el dret vigent i que l'usuari pugui identificar clarament la naturalesa del contingut rebut.

### VI.6. Procés d'indexació de dades i construcció del corpus

El corpus de Dret Planer es construeix mitjançant un procés d'indexació que no implica entrenament de xarxes neuronals sobre els textos jurídics. En primer lloc, s'extreu i s'estructura el text normatiu (Constitució) i la doctrina seleccionada en unitats discretes (articles, fragments). A continuació, cada unitat es segmenta en fragments (chunks) adequats per a la recuperació semàntica. Els embeddings es generen mitjançant **inferència** amb un model preentrenat (per exemple XLM-RoBERTa o equivalents): el model no s'entrena ni s'actualitza amb el corpus; només es fan passar els textos per obtenir representacions vectorials. Aquestes representacions es desen juntament amb les metadades i el text original en un índex unificat (corpus unificat i fitxer d'embeddings). En temps d'execució, la consulta de l'usuari es transforma en vector, es compara amb l'índex (similitud cosinus o equivalent) i els fragments més rellevants es passen al model generatiu com a context. En cap moment el corpus andorrà es fa servir per modificar els pesos del model de llenguatge ni del model d'embeddings; tota la integració es fa per recuperació i condicionament del context (RAG). Així doncs, no hi ha "aprenentatge" en sentit d'entrenament sobre dades protegides, sinó ús de models preentrenats en tasques d'inferència i generació condicionada a les fonts recuperades.

### VI.7. Respecte de la propietat intel·lectual i del dret d'autor

El disseny del sistema té en compte la propietat intel·lectual i el dret d'autor des de diverses dimensions. **(1) Textos normatius:** la Constitució i les lleis andorranes són de domini públic o d'accés oficial; la seva reutilització per a finalitats informatives i d'explicació en llenguatge planer s'inscriu en l'ús legítim i en les polítiques de dades obertes. **(2) Doctrina:** la doctrina incorporada al corpus es limita a fragments citables, amb atribució i finalitat d'il·lustració interpretativa, sense reproducció íntegra d'obres; es respecten les excepcions per a citació i mineria de textos i de dades (Directiva (UE) 2019/790, arts. 3 i 4). **(3) Transparència i traçabilitat:** el sistema remet explícitament a les fonts utilitzades, en línia amb les exigències de transparència del Reglament (UE) 2024/1689 (AI Act, art. 53). **(4) Accés legítim:** només s'incorpora contingut al qual el projecte té accés legítim i la procedència de les dades queda documentada. **(5) Llicències:** el material divulgatiu generat pel projecte es pot publicar sota llicències obertes (per exemple Creative Commons) per a ús educatiu i informatiu, sense reutilitzar obres protegides de tercers sense el marc legal adequat. Així, el procés d'indexació i l'ús del corpus es dissenyen per ser compatibles amb el respecte de la propietat intel·lectual i del dret d'autor.

### VI.8. Validació i control de qualitat

Per avaluar la fiabilitat del sistema, s'ha implementat un sistema de validació basat en preguntes de control, dissenyat per comprovar la capacitat del prototip per identificar correctament els articles constitucionals rellevants i generar explicacions coherents.

Aquest sistema inclou criteris com:

- la correspondència entre la resposta i el text recuperat,
- la presència de conceptes clau esperats,
- l'absència de contingut jurídicament incorrecte o no suportat pel corpus.

Tot i que aquesta validació no pretén substituir una avaluació jurídica exhaustiva, permet detectar errors recurrents i millorar progressivament el comportament del sistema, d'acord amb una lògica d'aprenentatge controlat.

### VI.9. Encaix normatiu i límits del prototip

En la seva configuració actual, Dret Planer no produeix efectes jurídics directes ni intervé en processos decisoris. El sistema es limita a oferir informació i explicacions orientatives, amb transparència sobre l'ús d'intel·ligència artificial i recomanació explícita de supervisió humana.

Aquest encaix funcional permet situar el prototip dins dels usos legítims de la IA en l'àmbit jurídic, sense comprometre els principis de legalitat, responsabilitat ni control humà, d'acord amb el Reglament (UE) 2024/1689.

### VI.10. Síntesi

La prova de concepte Dret Planer demostra que és tècnicament viable articular una plataforma d'intel·ligència artificial orientada a la comprensió del dret constitucional, sempre que es dissenyi amb abast limitat, traçabilitat i garanties jurídiques. Aquest resultat obre la porta a futures investigacions sobre l'ús d'eines similars en altres àmbits normatius, així com a una avaluació empírica més extensa del seu impacte en la comprensió ciutadana del dret.

---

## VII. Conclusions i línies futures de recerca

### VII.1. Conclusions generals

Aquest treball ha partit de la constatació que la comprensió efectiva del dret constitueix un requisit estructural per a la legitimitat democràtica i la cohesió jurídica, especialment en un Estat petit i socialment plural com el Principat d'Andorra. Malgrat l'existència d'un mandat normatiu explícit de claredat lingüística, la distància cognitiva entre el text jurídic i una part significativa dels seus destinataris continua sent un obstacle rellevant per a l'exercici efectiu dels drets.

Des d'un punt de vista teòric, s'ha mostrat que el dret a comprendre no pot ser reduït a una exigència merament estilística o comunicativa, sinó que es vincula directament amb drets fonamentals com la tutela judicial efectiva, el dret de defensa i la seguretat jurídica (Carretero González, 2020; Vallespín Pérez, 2025). En aquesta línia, la comprensibilitat esdevé una condició de possibilitat del dret com a sistema normatiu, tal com ja anticipava la teoria de la moralitat interna del dret de Fuller (1964).

L'anàlisi del cas andorrà ha posat de manifest una singularitat estructural: la Constitució de 1993, entesa com a Regla de Reconeixement en sentit hartià (Hart, 1961), opera en un context en què una part majoritària de la població resident no ha participat en el procés constituent ni ha estat socialitzada en el sistema jurídic propi. Aquesta circumstància reforça la necessitat que el text constitucional sigui no només formalment vigent, sinó realment comprensible per als seus destinataris, si ha de complir una funció integradora i estabilitzadora de l'ordenament.

En aquest marc, el treball ha defensat que la intel·ligència artificial d'ús restringit, dissenyada amb garanties jurídiques, pot actuar com un instrument legítim d'assistència a la comprensió del dret. S'ha argumentat que la "estretesa" d'aquests sistemes no deriva del model de llenguatge base utilitzat, sinó del disseny funcional i de la governança tècnica i jurídica: corpus tancat, arquitectura RAG, traçabilitat a les fonts, validació de qualitat i control humà.

La prova de concepte Dret Planer ha permès validar empíricament aquesta hipòtesi. El prototip demostra que és tècnicament viable generar explicacions en llenguatge planer del text constitucional andorrà, mantenint la fidelitat al contingut normatiu i evitant la substitució de la interpretació jurídica professional. En aquest sentit, la IA actua com un mediador lingüístic, no com un intèrpret normatiu, i contribueix a reduir la distància cognitiva entre el dret i la ciutadania (Saggion, 2024).

Des del punt de vista normatiu, s'ha posat de manifest que un sistema com Dret Planer, en la seva configuració actual, pot encaixar dins dels usos legítims de la intel·ligència artificial orientats a la informació i explicació jurídica, sempre que compleixi les obligacions de transparència, advertiment i supervisió humana previstes pel Reglament (UE) 2024/1689. La distinció entre aquesta modalitat informativa i un eventual ús institucional amb incidència procedimental ha resultat clau per delimitar l'abast del projecte i evitar confusions sobre la seva naturalesa jurídica.

En conjunt, el treball mostra que la intel·ligència artificial, lluny de representar necessàriament una amenaça per al dret, pot esdevenir un aliat del principi de claredat constitucional quan és utilitzada amb rigor, subjecció a la llei i respecte pels límits estructurals del sistema jurídic.

### VII.2. Limitacions del treball

Aquest estudi presenta, tanmateix, diverses limitacions que cal reconèixer explícitament. En primer lloc, la prova de concepte s'ha centrat exclusivament en la Constitució del Principat d'Andorra, deixant fora altres àmbits normatius que podrien plantejar reptes específics, com ara el dret penal, el dret administratiu sancionador o el dret laboral.

En segon lloc, la validació del sistema s'ha basat principalment en criteris tècnics i de coherència interna, sense incorporar encara una avaluació empírica sistemàtica amb usuaris finals que permeti mesurar l'impacte real del sistema en la comprensió ciutadana del dret.

Finalment, l'anàlisi normativa s'ha limitat a l'encaix general amb el marc europeu i andorrà vigent, sense entrar en profunditat en qüestions específiques de responsabilitat patrimonial o de governança institucional en escenaris d'ús avançat.

En quart lloc, el codi del prototip s'ha desenvolupat amb assistència d'eines d'IA generativa per al desenvolupament de software (per exemple Cursor, GitHub Copilot o equivalents), cosa que pot afectar la reproducibilitat estricta del procés de desenvolupament i la traçabilitat de decisions de disseny. Es considera una limitació metodològica digna de menció en un context acadèmic que valora la transparència i la replicabilitat.

### VII.3. Línies futures de recerca i desenvolupament

En línia amb els principis per a una integració responsable formulats per Dantart (2025), el desenvolupament futur del projecte ha d'incloure auditories de veracitat periòdiques. L'autor postula que la traçabilitat absoluta cap a la font original és l'única garantia per mantenir la seguretat jurídica; per tant, qualsevol integració administrativa de Dret Planer haurà de certificar que cada simplificació textual manté una coherència total amb el text constitucional original.

En qualsevol cas, a partir dels resultats obtinguts, es poden identificar diverses línies de recerca futures:

1. **Avaluació empírica del dret a comprendre:** estudis experimentals amb usuaris reals per mesurar millores objectives en la comprensió del dret abans i després de l'ús del sistema.

2. **Extensió del corpus:** aplicació del model a altres textos fonamentals de l'ordenament andorrà, com ara codis o normativa administrativa de gran impacte social.

3. **Governança institucional:** anàlisi jurídica detallada dels requisits necessaris per a una eventual integració del sistema en entorns administratius o judicials.

4. **Accessibilitat cognitiva avançada:** adaptació del sistema a formats de lectura fàcil i a col·lectius amb necessitats específiques, en línia amb els estàndards internacionals d'accessibilitat.

5. **Sobirania digital i lingüística:** aprofundiment en models d'IA pública orientats a la protecció i promoció del català jurídic en entorns digitals.

### VII.4. Tancament

En definitiva, aquest treball sosté que el dret a comprendre no pot quedar reduït a una declaració programàtica, sinó que exigeix instruments concrets que el facin operatiu. En un context com l'andorrà, la claredat constitucional no és només una qüestió de qualitat normativa, sinó una condició per a la cohesió social i la legitimitat democràtica.

La prova de concepte Dret Planer mostra que la intel·ligència artificial, quan és dissenyada amb abast limitat, governança clara i control humà, pot contribuir de manera efectiva a aquest objectiu. La Constitució deixa així de ser únicament un text solemne per esdevenir un marc comprensible, capaç d'orientar la conducta i reforçar l'acceptació interna del dret en una societat plural.

---

## Referències

### Legislació i Normativa

- Consell General. (1993). *Constitució del Principat d'Andorra*. Butlletí Oficial del Principat d'Andorra, núm. 24, de 4 de maig de 1993.

- Consell General. (2021). *Llei 29/2021, del 28 d'octubre, qualificada de protecció de dades personals*. Butlletí Oficial del Principat d'Andorra, núm. 119, de 17 de novembre de 2021.

- Consell General. (2024). *Llei 6/2024, del 25 d'abril, de la llengua pròpia i oficial*. Butlletí Oficial del Principat d'Andorra, núm. 59, de 29 de maig de 2024.

- Govern d'Andorra. (2024). *Codi sobre l'Ètica de la Intel·ligència Artificial d'Andorra*. Ministeri de Presidència, Economia i Empresa.

- Parlament Europeu i Consell. (2024). Reglament (UE) 2024/1689 del Parlament Europeu i del Consell, de 13 de juny de 2024, pel qual s'estableixen normes harmonitzades sobre la intel·ligència artificial (Llei d'Intel·ligència Artificial). *Diari Oficial de la Unió Europea*, L, 2024/1689.

- Parlament Europeu i Consell. (2019). Directiva (UE) 2019/790 del Parlament Europeu i del Consell, de 17 d'abril de 2019, relativa als drets d'autor i drets afins al mercat únic digital (Directiva sobre drets d'autor en el mercat únic digital). *Diari Oficial de la Unió Europea*, L 130, 17.5.2019, p. 92-125.

### Jurisprudència i Informes Institucionals

- JUSTICE. (2025). *AI in our Justice System: Final Report*. (Presidit per S. Adams-Bhatti).

- XVIII Cimera Judicial Iberoamericana. (2016). *Declaració d'Asunción sobre llenguatge clar i accés a la justícia*.

### Doctrina i Articles Acadèmics (Fonts verificades)

- Andreu i Sotelo, J. (2015). El sistema de fonts del dret andorrà. *Revista Jurídica d'Andorra*, 12, 45-78.

- Arnall Duch, A., Domènech-Bagaria, O., & Queralt Estevez, S. (2024). Del llenguatge planer a la comunicació clara. Introducció a la secció monogràfica. *Revista de Llengua i Dret, Journal of Language and Law*, (82), 1-11. https://doi.org/10.58992/rld.i82.2024.4390

- Caja Moya, C., & Quiroga Rodríguez, E. (2025). Más allá de la caja negra: la IA en los juzgados del orden civil (una propuesta heurística). *IDP. Revista de Internet, Derecho y Política*, (43). http://dx.doi.org/10.7238/idp.v0i43.432360

- Carretero González, C. (2024). Perspectiva jurídica del derecho a comprender como derecho a recibir comunicaciones comprensibles. *Revista de Llengua i Dret, Journal of Language and Law*, (82), 30-57.

- Dahl, M., Magesh, V., Suzgun, M., & Ho, D. E. (2024). Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models. *Journal of Legal Analysis*, 16, 64-93. https://doi.org/10.1093/jla/laae003

- Dantart, A. (2025). *Inteligencia artificial jurídica y el desafío de la veracidad: análisis de alucinaciones, optimización de RAG y principios para una integración responsable* [Informe tècnic]. arXiv. https://arxiv.org/abs/2509.09467

- Fuller, L. L. (1964). *The Morality of Law*. Yale University Press.

- Hart, H. L. A. (1961). *The Concept of Law*. Oxford University Press.

- Julià Pijoan, M. (2025). La implementación del derecho a comprender las resoluciones judiciales mediante la inteligencia artificial: límites y oportunidades. *IDP. Revista de Internet, Derecho y Política*, (43). http://dx.doi.org/10.7238/idp.v0i43.433076

- López Burniol, J. J. (2023). La Constitució d'Andorra: gènesi i funció. *Revista Jurídica d'Andorra*, 25, 15-42.

- López de Mántaras, R. (2017). Inteligencia artificial: presente y futuro. *Arbor*, 193(785), a409. https://doi.org/10.3989/arbor.2017.785n3008

- López de Mántaras, R. (2018). El futuro de la IA: hacia inteligencias artificiales realmente inteligentes. En *¿Hacia una nueva Ilustración? Una década trascendente* (pp. 1-21). BBVA OpenMind.

- Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., & Ho, D. E. (2024). *Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools*. arXiv. https://arxiv.org/abs/2405.20362

- Marqués i Osté, N. (2016). *La Constitució del Principat d'Andorra: la resposta als reptes de les institucions en el segle XX (1930-1993)*. (Obra citada en estudis historiogràfics andorrans).

- Matamala, A. (2024). Llenguatges entenedors: distincions i aplicacions. *Revista de Llengua i Dret, Journal of Language and Law*, (82), 58-83. https://doi.org/10.58992/rld.i82.2024.4345

- Pastor Vilanova, P. (Coord.). (2013). *Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució*. Universitat d'Andorra.

- Fiter i Rossell, A. (1748). *Manual Digest de las Valls neutras de Andorra*. (Edició moderna: Institut d'Estudis Andorrans, 1987).

- Montolío Durán, E., & Bayés-Gil, M. (2024). L'estat de la qüestió de la comunicació clara en castellà a Espanya en l'àmbit jurídic i administratiu. *Revista de Llengua i Dret, Journal of Language and Law*, (82), 104-119. https://doi.org/10.58992/rld.i82.2024.4330

- Pujol Palau, M., & Gabernet Piqué, A. (2024). La claredat com a criteri del llenguatge administratiu i jurídic a Andorra. *Revista de Llengua i Dret, Journal of Language and Law*, (82), 305-316.

- Saggion, H. (2024). Artificial intelligence and natural language processing for easy-to-read texts. *Revista de Llengua i Dret, Journal of Language and Law*, (82), 84-103. https://doi.org/10.58992/rld.i82.2024.4362

- Siino, M., Falco, M., Croce, D., & Rosso, P. (2025). Exploring LLMs Applications in Law: A Literature Review on Current Legal NLP Approaches. *IEEE Access*. https://doi.org/10.1109/ACCESS.2025.3533217

- Torres Pla, J. (2024). El català a Andorra: evolució durant les últimes dècades i situació el 2022. *Revista de Llengua i Dret, Journal of Language and Law*, (82), 339-363.

- Vallespín Pérez, D. (2025). Responsabilidad civil extracontractual en materia de IA: especial referencia a la carga de la prueba y la aplicación de presunciones. *IDP. Revista de Internet, Derecho y Política*, (42). http://dx.doi.org/10.7238/idp.v0i42.432054

- Vilajosana, J. M. (2010). *El derecho en acción: la dimensión social de las normas jurídicas*. Marcial Pons.

### Referències addicionals citades al text

- Betancur Sánchez, A., García Pérez, M., & López Fernández, R. (2025). Arquitectures híbrides per a la IA jurídica: recuperació i generació augmentada. *Inteligencia Artificial y Derecho*, 3(1), 45-67.

- Burgos Martínez, L. (2025). El dret a comprendre i les eines tecnològiques: una aproximació crítica. *Revista de Derecho y Tecnología*, 8(2), 89-112.

- Carretero González, C. (2020). El derecho a comprender: una exigencia de la tutela judicial efectiva. *Revista de Derecho Procesal*, 35(2), 145-178.

- Da Cunha, I. (2024). Simplificació automàtica del llenguatge jurídic: estat de l'art i perspectives. *Procesamiento del Lenguaje Natural*, 72, 45-58.

- Escudero, R. (2024). Inteligencia artificial y decisión judicial: límites y posibilidades. *Anuario de Filosofía del Derecho*, 40, 123-156.

- Serra, J. (2024). Andorra: una societat d'alta complexitat demogràfica. *Revista d'Estudis Andorrans*, 18, 45-78.

### Referències tècniques

- Projecte AINA: projecte-aina/roberta-base-ca-v2. Hugging Face. https://huggingface.co/projecte-aina/roberta-base-ca-v2

- Salamandra-7b-instruct (BSC). Barcelona Supercomputing Center. https://huggingface.co/BSC-LT/salamandra-7b-instruct

---

## Annexos

### Taula 1. Comparativa de percentatge de població estrangera en microestats i contextos similars

| Estat | % Nacionals | % Estrangers | Context Jurídic i Lingüístic |
|-------|-------------|--------------|------------------------------|
| Emirats Àrabs Units | ~11% | ~89% | Sistema jurídic basat en la Xaria/Civil. Gran barrera lingüística (Àrab vs. Anglès com a lingua franca). |
| Qatar | ~12% | ~88% | Situació similar als EAU. Legislació complexa per a la mà d'obra expatriada. |
| Mònaco | ~24% | ~76% | Cas més similar a Andorra a Europa. Francès oficial, però forta presència internacional. |
| **ANDORRA** | **44,6%** | **55,4%** | **Únic país amb el català oficial. Forta presència de castellà, portuguès i francès.** |
| Luxemburg | ~53% | ~47% | Tres llengües oficials (Francès, Alemany, Luxemburguès) per gestionar la diversitat. |

### Taula 2. Distribució demogràfica d'Andorra per nacionalitat (2024-2025)

| Nacionalitat | Població (aprox.) | % del total | Tendència (vs 2024) |
|--------------|-------------------|-------------|---------------------|
| Andorrana | 39.730 | 44,6% | Lleuger augment (+0,9%) |
| Espanyola | 21.420 | 24,0% | Augment moderat (+2,0%) |
| Altres nacionalitats | 15.430 | 17,3% | Fort creixement (+8,0%)* |
| Portuguesa | 8.428 | 9,5% | Disminució (-1,2%) |
| Francesa | 4.050 | 4,6% | Lleuger augment |
| **TOTAL** | **89.058** | **100%** | **+2,3%** |

*Elaboració pròpia; Font: Govern d'Andorra.*

### Taula 3. Visitants anuals a Andorra i impacte jurídic

| Tipologia de visitant | Nombre (milions) | % del total | Impacte jurídic principal |
|-----------------------|------------------|-------------|---------------------------|
| Excursionistes (1 dia) | 5,8 M | 62% | Duanes, trànsit, consum |
| Turistes (pernoctació) | 3,5 M | 38% | Allotjament, taxa turística, esquí/muntanya |
| **TOTAL VISITANTS** | **9,3 M** | **100%** | Interacció massiva amb la norma |

**Principals procedències:** Espanya (48%), França (34%), Altres (18%)

*Necessitat d'assistència multilingüe*

### Taula 4. Dades del Referèndum Constitucional (14 març 1993)

| Dades del Referèndum | Xifres |
|----------------------|--------|
| Cens electoral (andorrans amb dret a vot) | 9.123 |
| Vots emesos (participació del 75,7%) | 6.910 |
| Vots a favor (Sí) | 4.903 (74,2%) |
| Vots en contra (No) | 1.706 (25,8%) |

### Taula 5. Corpus i fonts utilitzades per al RAG (entrenament / indexació)

**Font normativa (corpus principal)**

| Font | Descripció | Origen |
|------|------------|--------|
| Constitució del Principat d'Andorra (1993) | Preàmbul i 107 articles, estructurats per títols i capítols | Text oficial (*constitucio-andorra.txt*) |

**Doctrina i fonts secundàries** (incorporades al corpus unificat per a context interpretatiu; Fuller, 1964; Vilajosana, 2010)

| Títol | Autor / Publicació | Categoria |
|-------|-------------------|-----------|
| Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució | Pere Pastor Vilanova (coordinador); Universitat d'Andorra | Jurisprudència |
| La constitución andorrana y la ordenación territorial del poder público | Doctrina | Doctrina |
| Constitucionalisme i codificació | Doctrina | Doctrina |
| Sobre usos, costums i el codi | Doctrina | Doctrina |
| Ponència sobre codificació i veritat | Antoni Pol / Doctrina | Doctrina |
| El Manual Digest i el Tribunal Europeu dels Drets Humans | Doctrina | Doctrina |
| Comunicació Lopez B. | Lopez B. | Doctrina |
| Les relacions internacionals d'Andorra des de la Constitució | Doctrina | Doctrina |
| Llibre Complet Dret Processal Civil | Doctrina | Doctrina (civil) |
| Memòria 2023 del Tribunal Constitucional | Tribunal Constitucional | Jurisprudència |
| Memòria 2024 | Tribunal Constitucional | Jurisprudència |
| L'aplicació directa de les normes constitucionals | Doctrina | Doctrina |
| Article Burniol sobre sobirania | Burniol | Doctrina |
| Joan Martí Alanis, bisbe | Doctrina | Doctrina |
| La sol·licitud dels bisbes d'Urgell | Doctrina | Doctrina |
| REC5 2019 | Doctrina | Doctrina |
| Document 23 de gener (català) | Doctrina | Doctrina |
| De la consuetud a l'Estat de dret. La llarga resistència del Principat d'Andorra a la modernització política | Pere Soler Parício | Doctrina |
| Joan Martí Alanis, bisbe d'Urgell, príncep d'Andorra | Joan Bassegoda Nonell | Doctrina |
| Emergencia i reconeixement d'Andorra com a Estat | Joan BECAT | Doctrina |

*Font: definició del corpus a `scripts/processar-doctrina-xlm.ts`; corpus unificat a `data/rag/constitucio-unified.json`.*
