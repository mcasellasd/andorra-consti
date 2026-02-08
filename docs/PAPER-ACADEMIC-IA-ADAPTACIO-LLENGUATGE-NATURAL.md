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

Un exemple paradigmàtic d’aplicació institucional és CLaiRK, una suite d’intel·ligència artificial impulsada per la Comissió Europea (dins la iniciativa Digital Policy Alert) per facilitar la comprensió de normatives complexes de l'AI Act. Aquesta eina transcendeix el concepte de base de dades tradicional en actuar com un assistent de lectura intel·ligent que permet als ciutadans interactuar amb els textos legals mitjançant un xat interactiu. El sistema destaca per la seva capacitat multilingüe, que democratitza l'accés a la informació en totes les llengües oficials de la UE, i per un disseny tècnic orientat a la seguretat jurídica: a diferència de la IA generativa convencional, CLaiRK vincula cada resposta a capítols i articles concrets, eliminant el risc d'al·lucinacions i garantint que pimes i ciutadans obtinguin una interpretació veraç de les seves obligacions legals.

#### III.3.2. Àmbit espanyol i iberoamericà

A l'Estat espanyol, el desenvolupament institucional del dret a comprendre té un punt d'inflexió amb la creació de la Comissió de Modernització del Llenguatge Jurídic l'any 2009, que va identificar la comprensibilitat com un dret de la ciutadania fonamentat en la dignitat de la persona (art. 10.1 CE), la seguretat jurídica (art. 9.3 CE) i la tutela judicial efectiva (art. 24 CE).

En aquest sentit, és fonamental destacar la Declaració d'Asunción, adoptada durant la XVIII Cimera Judicial Iberoamericana (2016), fòrum del qual Andorra és membre actiu. Aquest instrument reconeix explícitament el llenguatge clar no com una mera cortesia administrativa, sinó com una garantia essencial del dret d'accés a la justícia. La Declaració insta els Estats membres a eliminar les barreres semàntiques que generen distància entre els operadors jurídics i la ciutadania, establint que la legitimitat de les decisions judicials depèn, en gran mesura, que els seus destinataris puguin comprendre-les sense indefensió.

Burgos Martínez (2025) ha posat de manifest una paradoxa estructural: les mateixes normes que proclamen el dret a comprendre sovint estan redactades en un llenguatge jurídic inaccessible, vulnerant en la pràctica el dret que pretenen garantir. L'autora defensa l'ús d'eines tecnològiques —incloent-hi la intel·ligència artificial d'ús restringit— com a instruments complementaris per fer operatiu aquest dret a escala.

Dins d'aquest vessant tecnològic, destaquen iniciatives pioneres basades en arquitectures de tipus BERT (Bidirectional Encoder Representations from Transformers), dissenyades específicament per al domini jurídic. Exemples rellevants són el model MEL (Legal Spanish Language Model), un sistema entrenat amb el corpus del Butlletí Oficial de l'Estat (BOE) i diaris de sessions del Congrés, o el projecte LegalBERT. Aquestes eines permeten una comprensió contextual del text legal molt superior als models genèrics, facilitant tasques crítiques com la simplificació de resolucions, l'anonimització automàtica i la categorització semàntica.

### III.4. El dret a comprendre en català

En els territoris de parla catalana, el dret a comprendre s'ha articulat sota la noció de llenguatge planer o comunicació clara, entesa com una disciplina interdisciplinària que combina criteris lingüístics, jurídics i de disseny de la informació. Matamala (2024) distingeix entre **Llenguatge Fàcil** (Easy Language), adreçat a persones amb dificultats lectores o discapacitat cognitiva, i **Llenguatge Planer** (Plain Language), adreçat a la ciutadania general per fer la informació clara i concisa. Dret Planer opera en aquest segon nivell, orientat a la claredat sense reduir el text a lectura fàcil. A Catalunya, aquesta aposta s'ha institucionalitzat mitjançant l'Acord GOV/29/2024, que eleva la comunicació clara a política de Govern.

Les Illes Balears i el País Valencià han desenvolupat igualment iniciatives orientades a la claredat lingüística, incloent-hi eines d'assistència a la redacció i adaptacions a lectura fàcil. Aquestes experiències mostren que la simplificació del llenguatge jurídic pot ser compatible amb el manteniment del rigor normatiu.

En l’àmbit de la llengua catalana, la confluència entre el dret a comprendre i la intel·ligència artificial ha pres un impuls singular a través de projectes d’infraestructura digital sobirana. Destaca el paper del Projecte AINA, que ha permès el desenvolupament de models basats en arquitectura Transformer, com les variants de RoBERTa i el model instructiu Salamandra, entrenats amb corpus massius de la variant catalana. Aquestes eines són la base tecnològica de solucions com la implementada pel Govern de Catalunya al Portal Jurídic, on s'utilitza IA generativa per oferir resums en llenguatge planer de milers de disposicions normatives.

### III.5. El dret a comprendre al Principat d'Andorra

En el context andorrà, el dret a comprendre adquireix una rellevància singular, no només per la demografia, sinó per la seva connexió amb l'arquitectura de seguretat de l'Estat de Dret. Més enllà de l'article 2.1 (oficialitat del català), la incomprensibilitat del dret suposa una tensió directa amb l'**article 1.2** de la Constitució (principi de legalitat i seguretat jurídica) i l'**article 3.2**, que obliga els poders públics a promoure les condicions perquè la llibertat i la igualtat siguin "reals i efectives". Una norma inintel·ligible esdevé una barrera insalvable per a aquesta igualtat efectiva.

Aquest ancoratge constitucional s'alinea amb els estàndards internacionals vinculants per a Andorra. El Tribunal Europeu de Drets Humans (TEDH) ha reiterat, en la seva interpretació de l'**article 6 del Conveni Europeu de Drets Humans** (dret a un procés equitatiu), que la llei ha de ser "accessible" i "previsible". Sense comprensibilitat, la previsibilitat s'esvaeix, deixant el ciutadà a mercè d'una interpretació experta que no pot fiscalitzar.

Així, el dret a comprendre a Andorra es pot estructurar com una **trilogia de deures** interconnectats:
1.  **El Legislador:** Té el deure de claredat en la producció normativa, evitant la inflació legislativa i l'obscuritat tècnica innecessària.
2.  **El Jutge:** Té el deure de motivació comprensible (derivat de l'article 10 de la Constitució), garantint que la tutela judicial sigui efectiva no només en el fons, sinó en la forma comunicativa.
3.  **El Ciutadà:** Ostenta el dret subjectiu a l'accessibilitat cognitiva, especialment rellevant per a col·lectius vulnerables, tal com recullen les **Regles de Brasília** sobre accés a la justícia de les persones en condició de vulnerabilitat (2008), ratificades pel Principat.

Tot i que la jurisprudència andorrana no ha reconegut explícitament un dret autònom a comprendre, aquest marc dogmàtic permet derivar-lo dels principis fonamentals de l'ordenament.

---

## IV. La Constitució del Principat d'Andorra com a Regla de Reconeixement

### IV.1. La Regla de Reconeixement en la teoria de H. L. A. Hart

En la teoria positivista de H. L. A. Hart (1961), la Regla de Reconeixement (RR) constitueix la peça clau per explicar l'existència d'un sistema jurídic: és aquella que estableix els criteris últims de validesa de totes les altres normes. A diferència de les normes subordinades, la Regla de Reconeixement no es pot qualificar de vàlida o invàlida, sinó que existeix com una qüestió de fet. No es tracta necessàriament d'un text escrit, sinó d'una convenció social complexa practicada pels operadors jurídics que permet identificar què és dret dins d'un ordenament determinat.

Hart subratlla que l'existència d'aquesta regla depèn de la seva acceptació des del «punt de vista intern». Això implica que els subjectes rellevants del sistema —especialment els jutges i altres aplicadors del dret— no només la segueixen per hàbit, sinó que l'assumeixen com a pauta legítima de conducta i com a raó per justificar les seves decisions i criticar les desviacions. Sense aquesta actitud criticoreflexiva, la Regla de Reconeixement perdria la seva capacitat normativa.

Aquesta naturalesa convencional ha estat desenvolupada per Josep M. Vilajosana (2003) aplicant els esquemes de David Lewis (1969). Segons aquesta visió, la Regla de Reconeixement sorgeix per resoldre un problema de coordinació recurrent: els jutges necessiten convergir en uns mateixos criteris d'identificació del dret per evitar el caos jurídic. Així, la regla té una dimensió constitutiva: crea la realitat social del "dret andorrà" en establir que certs fets (com l'aprovació d'un text segons la Constitució) compten com a normes vàlides. 

En aquest sentit, l'eficàcia de la Constitució andorrana com a norma suprema depèn, en última instància, d'aquest fet social convencional: la pràctica concordant dels tribunals d'identificar el dret a través d'ella.

### IV.2. La Constitució andorrana com a norma fonamental escrita

En el cas del Principat d'Andorra, la Constitució de 1993 s'identifica clarament com el criteri suprem de la Regla de Reconeixement en sentit hartià. A diferència de sistemes de common law on la regla és principalment consuetudinària, l'ordenament andorrà disposa d'una norma fonamental escrita que, tal com descriu Vilajosana (2003) per als sistemes moderns, encapçala la cadena de validesa: fixa explícitament l'estructura institucional de l'Estat, la jerarquia normativa i els drets fonamentals, actuant com a condició de validesa per a tota la resta de la producció jurídica.

El procés constituent de 1993 va respondre a la necessitat de dotar Andorra d'una personalitat jurídica internacional clara i d'un marc constitucional homologable als estats democràtics europeus. Teòricament, aquest moment representa un canvi de la regla de reconeixement o, en termes de Kelsen, de la norma bàsica pressuposada (Vilajosana, 2003): els operadors jurídics van canviar els seus pressupòsits de validesa, abandonant l'arquitectura institucional d'arrel medieval —basada en els Pareatges i la tradició consuetudinària recollida al Manual Digest de Fiter i Rossell (1748)— per adoptar el nou marc constitucional. Com destaquen Marqués i Osté (2016) i López Burniol (2023), aquest canvi es va fer sense trencar amb la continuïtat històrica del país, mitjançant la transformació del Coprincipat en un coprincipat parlamentari.

Aquesta operació va tenir una doble funció: d'una banda, transferir la sobirania al poble andorrà; de l'altra, preservar els elements simbòlics i institucionals que havien garantit la pervivència del Principat. En aquest sentit, la Constitució andorrana no només funda jurídicament l'Estat en proporcionar els nous criteris d'identificació del dret, sinó que actua com a instrument de cohesió identitària i política.

### IV.3. Acceptació interna i distància cognitiva

Una singularitat jurídica del cas andorrà rau en el fet que el gruix de la població subjecta a l'ordenament no va formar part del moment constituent. Tal com mostren les dades demogràfiques (Taula 4), una part majoritària de la població resident actual no va participar en el referèndum de 1993 i tampoc ha estat socialitzada primàriament en els valors jurídics del Principat.

Aquesta circumstància genera una tensió específica en termes del que Hart (1961) denomina el «punt de vista intern» respecte a la Regla de Reconeixement. Si bé és condició necessària que els operadors jurídics assumeixin críticament la Constitució com a pauta de validesa, l'estabilitat i la salut d'un sistema jurídic es ressenten si l'acceptació no transcendeix l'àmbit oficial.

En el cas d'Andorra, l'anàlisi comparada amb altres microestats (vegeu Taula 1) revela una especificitat crítica. A diferència de Mònaco, on la llengua oficial (francès) coincideix amb la d'una gran part dels residents, Andorra presenta un sistema de "llengua oficial única" (català) en una societat on el 55% dels residents tenen altres llengües maternes, principalment romàniques (castellà, portuguès, francès). Això genera un fenomen de **"falsa transparència"**: la proximitat lingüística entre les llengües romàniques pot portar els ciutadans a creure que "entenen" el text jurídic català per similitud lèxica, mentre que en realitat es perden els matisos tècnics i les conseqüències jurídiques precises. Aquesta "il·lusió de competència" és, paradoxalment, més perillosa que la incomprensió total, ja que desactiva la recerca d'assessorament.

Davant d'aquest diagnòstic, la intel·ligència artificial no s'ha de veure com un requisit de validesa (la norma és vàlida encara que sigui complexa), sinó com una **"eina d'ajust raonable"**. Igual que un edifici públic és legalment "obert" sense rampa però materialment inaccessible per a certs usuaris, l'ordenament jurídic necessita "rampes cognitives" per garantir l'accés real. La IA actua aquí reduint el "cost d'accés" al dret, trencant la barrera de la falsa transparència.

### IV.4. Comprensibilitat i eficàcia de la Regla de Reconeixement

Des d'aquesta perspectiva, la comprensibilitat de la Constitució no és un objectiu pedagògic accessori, sinó un requisit funcional de la seva eficàcia com a Regla de Reconeixement. Com recull Vilajosana (2003) aplicant la lògica de Lewis (1969), la regla de reconeixement sorgeix fonamentalment per resoldre un problema de coordinació social; un text constitucional que no és comprensible per als seus destinataris difícilment pot actuar com a pauta d'orientació de la conducta ni com a element integrador del sistema jurídic, ja que fallaria en la seva funció de coordinar les expectatives socials.

Aquesta idea connecta directament amb la tesi de Fuller (1964) sobre la moralitat interna del dret: perquè les normes puguin complir la seva funció de guiar el comportament humà, han de ser clares, intel·ligibles i accessibles. Aquesta exigència de claredat esdevé crítica si considerem, com assenyala Waismann (1951), que els conceptes generals del llenguatge natural pateixen inevitablement de «textura oberta», cosa que genera una vaguetat potencial que una redacció fosca només faria que agreujar. En un Estat petit i socialment heterogeni com Andorra, aquesta exigència esdevé especialment rellevant, ja que la cohesió jurídica no pot recolzar-se únicament en la tradició o en la socialització primària.

En aquest sentit, facilitar la comprensió de la Constitució contribueix a reforçar la seva acceptació, generant el que Hart (1961) denomina el «punt de vista intern» més enllà del cercle dels juristes. Això permetria, seguint la visió del dret com a integritat de Dworkin (1986), que la ciutadania identifiqui els principis morals que justifiquen la pràctica jurídica, ampliant el seu efecte integrador sobre el conjunt de la població resident. La Constitució deixa així de ser percebuda com un text simbòlic o distant per esdevenir un instrument viu de regulació social.

### IV.5. La Constitució com a corpus pilot per a la simplificació assistida

La tria de la Constitució andorrana com a corpus inicial del projecte Dret Planer respon a raons tant jurídiques com metodològiques. Des d'un punt de vista jurídic, es tracta de la norma suprema de l'ordenament que, com a criteri últim de la Regla de Reconeixement, dota de validesa tota la resta de la producció normativa. Des d'un punt de vista tècnic, la seva extensió limitada i la seva estructura sistemàtica permeten una implementació controlada i verificable d'un sistema d'assistència a la comprensió.

Tal com assenyala Vilajosana (2010), la funció primària de la Regla de Reconeixement és resoldre problemes de coordinació identificant què compta com a dret vigent. No obstant això, aquesta coordinació pot fallar si els destinataris no comprenen el text que la fonamenta. En aquest sentit, facilitar-ne la comprensió mitjançant eines d'intel·ligència artificial d'ús restringit no implica substituir la interpretació jurídica —l'atribució d'autoritat de significat, que correspon als operadors jurídics (Guastini, 2010)—, sinó reduir la distància cognitiva entre la disposició normativa i els seus destinataris.

Així, la Constitució es presenta com un camp d'experimentació idoni per analitzar fins a quin punt la intel·ligència artificial pot contribuir a reforçar la certesa jurídica i, amb ella, la cohesió social al Principat d'Andorra, transformant un text formalment vàlid en una guia de conducta realment eficaç. La secció següent desenvolupa el marc teòric i tècnic de la intel·ligència artificial aplicada a aquesta funció, delimitant-ne les possibilitats i els límits.

---

## V. Marc teòric-jurídic de la intel·ligència artificial aplicada al dret

### V.1. Intel·ligència artificial i dret: plantejament general

La incorporació de sistemes d’intel·ligència artificial (IA) en l’àmbit jurídic ha generat un intens debat doctrinal sobre els seus límits, possibilitats i riscos. Tot i l’expansió recent dels models de llenguatge extens (Large Language Models, LLM), la literatura jurídica coincideix a assenyalar que la IA no pot assumir funcions decisòries amb transcendència normativa ni substituir el criteri dels operadors jurídics humans (López de Mántaras, 2017; Escudero, 2024).

Aquesta limitació no respon únicament a consideracions tècniques, sinó a principis estructurals del dret. Tal com recorda Hart (1961), el dret és un sistema de normes socials que pressuposa responsabilitat, imputació i justificació, elements que no poden ser atribuïts a sistemes artificials. En aquest sentit, Colina Ramírez (2023) adverteix que atribuir responsabilitat a ens que manquen de consciència i voluntat suposaria una ruptura del sistema jurídic, basat en la motivació humana de la norma. De manera similar, Susana de la Sierra (2024) recorda que el contracte social exigeix que les decisions públiques mantinguin un element volitiu humà, ja que els algorismes no són «agents morals» i, per tant, l’ús de la IA ha de ser instrumental per no deshumanitzar l’Administració. En conseqüència, la IA només pot operar legítimament en el dret com a instrument d’assistència, mai com a subjecte d’autoritat normativa.

En aquest context, la qüestió central no és si la IA pot "interpretar" el dret en sentit fort, sinó en quines funcions auxiliars pot contribuir a millorar el funcionament del sistema jurídic sense erosionar-ne les garanties. Tal com assenyala Nieva Fenoll (2022), la IA ha d’entendre's com una eina auxiliar subjecta als principis de contradicció i tutela judicial efectiva, i no com un substitut de la interpretació humana. Aquesta visió s'alinea amb el «principi de no substitució» tècnica defensat per Dantart (2025), qui argumenta que la tecnologia no ha de reemplaçar el judici humà, sinó amplificar-lo, especialment davant la naturalesa probabilística dels models generatius. Així mateix, Caja Moya i Quiroga Rodríguez (2025) introdueixen el concepte de defeasibility per il·lustrar que la IA, en la seva forma actual, no pot captar la dimensió d'equitat i adaptabilitat necessària per a la justícia, quedant limitada a tasques de suport per garantir la consistència

### V.2. La distinció funcional: IA generativa vs. IA consultiva
Per a la viabilitat jurídica d'un projecte com **Dret Planer** (part de la iniciativa *Prudència.ad*), és imprescindible establir una distinció clara entre la IA Generativa d'ús general i la IA Estreta o Consultiva.

La IA Generativa, basada en grans models de llenguatge (LLM), presenta riscos sistèmics per a la seguretat jurídica a causa de la seva naturalesa estocàstica i la tendència a la "confabulació" o invenció de precedents (*Legal Fictions*, Dahl et al., 2024). Aquesta manca de fiabilitat fa que l'ús "en cru" d'aquests models sigui incompatible amb el rigor exigible en l'àmbit jurídic.

En canvi, la proposta de **Dret Planer** s'emmarca en el que Dantart defineix com a IA Consultiva o IA Estreta, caracteritzada per:
1.  **Delimitació del domini:** El sistema opera exclusivament sobre un corpus tancat i validat.
2.  **Arquitectura RAG:** La generació de text està tècnicament condicionada a la recuperació prèvia de fragments normatius reals.
3.  **Traçabilitat:** El sistema vincula cada afirmació a la seva font original, complint amb les exigències d'explicabilitat (XAI).

Aquesta distinció permet afirmar que, mentre la IA Generativa generalista suposa un risc, la IA Estreta, dissenyada sota principis de responsabilitat, constitueix una eina vàlida per a l'accessibilitat jurídica.

### V.3. Pluralisme vs. "Canonització": El risc de la veritat única i la gestió del dissens

Un dels reptes dogmàtics més delicats de la introducció de la IA en la interpretació jurídica és el risc de "canonització": la possibilitat que la resposta de la màquina sigui percebuda com "la" veritat jurídica, aplanant la riquesa del debat doctrinal i la jurisprudència. El dret no és una ciència exacta; està poblat de **conceptes jurídics indeterminats** (ex: "interès general", "ordre públic", "bon pare de família") la concreció dels quals depèn de la ponderació judicial en cada cas.

Per evitar que *Dret Planer* esdevingui un oracle dogmàtic, el sistema implementa mecanismes específics il·lustrats amb casos constitucionals andorrans:

1.  **Detecció de Dissens Doctrinal:** Quan una pregunta interpel·la conceptes oberts, el sistema no ofereix una resposta unívoca. Per exemple, davant la pregunta *"Quins són els límits de la llibertat d'expressió?"*, la resposta no es tanca en una definició estàtica, sinó que exposa la tensió entre l'article 12 (llibertat d'expressió) i el dret a l'honor, citant sentències del Tribunal Constitucional que han ponderat aquest conflicte en sentits diversos segons el cas.

2.  **Silenci Estratègic i "Guardrails" en Matèries Sensibles:** S'ha definit una "Llista de Temes Exclosos" per a qüestions on no existeix un consens interpretatiu consolidat o que tenen una forta càrrega ètico-política. 
    *   **Cas il·lustratiu: L'avortament (Art. 8.1 Const.):** Si un usuari pregunta *"És constitucional l'avortament a Andorra?"*, el sistema detecta la sensibilitat del tema (protecció de la vida en les seves diferents fases) i la manca d'una sentència unificadora definitiva sobre tots els supòsits. En lloc de generar una paràfrasi simplificadora que podria ser incorrecta o esbiaixada, el sistema activa el mode de **resposta literalista**: reprodueix íntegrament l'article 8.1 ("La Constitució reconeix el dret a la vida i la protegeix plenament en les seves diferents fases") i remet directament a la jurisprudència del Tribunal Constitucional existent, abstenint-se de fer interpretacions pròpies.

Aquesta estratègia de **"abstenció calibrada"** garanteix que la tecnologia no usurpi el debat social ni prejutgi qüestions obertes.

### V.4. IA generativa i riscos jurídics: De la versemblança a la veracitat

Els models de llenguatge extens (LLM) funcionen mitjançant mecanismes probabilístics de predicció, sense comprensió semàntica real (López de Mántaras, 2018). Aquesta naturalesa estocàstica provoca que els models prioritzin la versemblança (que el text sembli coherent) per sobre de la veracitat (que el text sigui cert).

En l'àmbit jurídic, aquesta tensió és crítica. Un sistema pot generar una argumentació perfectament estructurada però jurídicament fal·laç, citant articles inexistents o interpretant-los contra la doctrina consolidada. Per mitigar aquest risc estructural, **Dret Planer** adopta una estratègia de contenció:

*   **Ancoratge documental:** La IA no pot "parlar" si no troba suport en els documents recuperats.
*   **Citació granular:** Cada fragment de text generat ha de tenir una referència directa a la font.
*   **Temperatura baixa:** Es configuren els paràmetres del model per minimitzar la creativitat i maximitzar el determinisme.

Així, es transforma un generador de text creatiu en un sintetitzador d'informació verificada.

### V.4. La IA com a eina d'assistència a la comprensió del dret

Malgrat aquestes limitacions, la doctrina reconeix un espai d'aplicació legítima i valuosa de la IA en el dret: la simplificació, explicació i adaptació lingüística del discurs jurídic. Aquesta funció no implica crear dret ni decidir conflictes, sinó facilitar la comprensió del dret existent. Da Cunha (2024) i Saggion (2024) han mostrat que els sistemes de processament del llenguatge natural poden generar resums, reformulacions i versions de lectura fàcil amb un alt grau d'eficiència, sempre que operin sota condicions de control i supervisió humana. En aquest sentit, la IA pot actuar com un mediador lingüístic entre el text normatiu i el ciutadà.

Aquesta funció és coherent amb el dret a comprendre, ja que no substitueix el criteri jurídic, sinó que redueix la distància cognitiva que impedeix l'exercici efectiu dels drets. En aquesta línia, Julià Pijoan (La implementación del derecho a comprender las resoluciones judiciales mediante la inteligencia artificial: límites y oportunidades, 2025) defensa l'ús de la IA per generar un "doble document": la resolució judicial tècnica original i un resum complementari adaptat al perfil sociocultural del destinatari, sense que això suposi una càrrega addicional per als òrgans judicials. 

Així mateix, Miquel Julià Pijoan destaca que la IA pot automatitzar la correcció d'estil i la detecció de "patologies lingüístiques" (com frases excessivament llargues o arcaismes), actuant com un assistent de redacció que millora la claredat sense alterar el contingut jurídic.

D'altra banda, Saggion (Artificial intelligence and natural language processing for easy-to-read texts, 2024) subratlla que la disponibilitat d'informació no és suficient si no és accessible cognitivament, i argumenta que les tecnologies de simplificació de text són essencials per garantir el dret humà a la informació, especialment per a col·lectius amb dificultats de comprensió.

Finalment, Dantart (Inteligencia artificial jurídica y el desafío de la veracidad, 2025) introdueix el concepte de la "funció jerga" o "traductor contextual". Proposa que la IA actuï com un pont de comunicació que adapti l'explicació de documents i estratègies legals al nivell de comprensió del client, humanitzant l'accés a la justícia i permetent una presa de decisions més informada. Aquest enfocament reforça la idea que la tecnologia no ha de substituir el professional, sinó amplificar la seva capacitat per fer-se entendre

### V.5. La "estretesa" com a resultat de disseny i governança: cap a una IA responsable per disseny

En el context d'aquest treball, la qualificació del sistema *Dret Planer* com a "intel·ligència artificial estreta" no deriva de les limitacions intrínseques del model de llenguatge base (que és, per naturalesa, generalista), sinó d'una arquitectura de **IA responsable per disseny** (*Responsible AI by Design*) que imposa restriccions funcionals i jurídiques severes.

Aquesta "estretesa", entesa com a **IA Consultiva** en contraposició a la Generativa pura, es construeix mitjançant l'articulació de cinc mecanismes de control que transformen la probabilitat en seguretat jurídica:

1.  **Delimitació i Jerarquització del Domini:** El sistema no opera només sobre un corpus tancat, sinó sobre una base de coneixement **curada estratègicament**. Seguint la proposta de **Dantart (2025)**, aquesta base ha d'incorporar una **consciència de la jerarquia normativa** (inspirada en la piràmide de Kelsen), prioritzant la norma constitucional sobre la legal o reglamentària, i garantint la **temporalitat normativa** (*time-travel*) per evitar citar preceptes derogats.
2.  **Arquitectura RAG Forense:** La generació de text està tècnicament condicionada a la recuperació prèvia d'evidència. S'adopta un model de **RAG (Retrieval-Augmented Generation)** que actua com un mecanisme de "llibre obert", on la fase de recuperació equival a la recerca de "Dades" i "Suport" (*Backing*) en el model d'argumentació de **Toulmin**, mentre que la generació es limita a construir la "Garantia" (*Warrant*) sense inventar fets.
3.  **Traçabilitat i Citació Ancorada (*Anchored Citation*):** Per mitigar el risc de *misgrounding* (fonamentació errònia), el sistema exigeix una **citació a nivell de fragment** (*chunk-level citation*). Totes les respostes han d'estar vinculades mitjançant enllaços directes a la font oficial (Constitució o jurisprudència), permetent a l'usuari verificar la fidelitat de l'explicació respecte al text original.
4.  **Abstenció Calibrada (*Strategic Silence*):** Un element clau de la "estretesa" és la capacitat del sistema per **no respondre**. Seguint el principi de "silenci estratègic" de **Dantart (2025)**, la IA s'ha de dissenyar per abstenir-se de generar text quan la recuperació d'informació no assoleix un llindar de confiança suficient, evitant així la confabulació o l'invent de dret.
5.  **Supervisió Humana i *Defeasibility*:** D'acord amb l'article 14 del **Reglament (UE) 2024/1689 (AI Act)**, el sistema incorpora mecanismes de vigilància efectiva. Aquesta supervisió és necessària perquè, tal com assenyalen **Caja Moya i Quiroga Rodríguez (2025)**, la IA actual manca de la capacitat de gestionar la *defeasibility* (les excepcions i matisos oberts) inherent al raonament jurídic, requerint sempre el judici humà per validar la interpretació contextual.

Així, la naturalesa d'IA estreta de *Dret Planer* és una propietat emergent de la seva governança tècnica. Aquesta aproximació permet aprofitar la fluïdesa sintàctica dels models generatius sense renunciar als requisits d'explicabilitat, veracitat i control exigibles en un Estat de Dret.

### V.6. Control humà, responsabilitat i marc normatiu

El principi de control humà (*human oversight*) constitueix un element central i irrenunciable en qualsevol aplicació legítima de la IA al dret. Tant la doctrina com el **Reglament (UE) 2024/1689 (Llei d'IA)**, en el seu article 14, insisteixen que els sistemes, especialment els d'alt risc, han de ser dissenyats perquè puguin ser vigilats eficaçment per persones físiques. Aquesta supervisió no és una mera formalitat, sinó que exigeix que l'operador humà tingui la competència per interpretar els resultats, decidir no utilitzar el sistema o, fins i tot, interrompre'n el funcionament (botó de parada).

Aquest requisit s'alinea amb el **Codi sobre l’Ètica de la IA d’Andorra (2024)**, que estableix el principi de «supervisió i decisió humanes», determinant que la IA mai no podrà reemplaçar la responsabilitat final dels éssers humans ni la seva obligació de retre comptes. En l'àmbit jurídic, això es tradueix en el «principi de no substitució» descrit per **Dantart (2025)**: la tecnologia no ha de reemplaçar el judici humà en qüestions crucials, sinó amplificar-lo, evitant l'anomenat «biaix d'automatització» —la tendència a confiar acríticament en la màquina—. A més, com assenyalen **Caja Moya i Quiroga Rodríguez (2025)**, la IA manca de la capacitat de gestionar la *defeasibility* (les excepcions i matisos d'equitat) inherents al raonament jurídic, fet que fa indispensable la validació humana.

En la configuració actual de **Dret Planer**, el sistema no produeix efectes jurídics directes ni intervé en processos decisoris vinculants, situant-se fora de la prohibició de decisions exclusivament automatitzades prevista a l'article 25 de la **Llei 29/2021, de protecció de dades personals d'Andorra**. La seva funció es limita a la informació i explicació del dret, sotmetent-se a les obligacions de transparència de l'article 50 del Reglament europeu: els usuaris han de ser informats que interactuen amb una IA i que el contingut és generat artificialment.

Aquest encaix normatiu reforça la idea que la intel·ligència artificial, utilitzada amb rigor i sota el principi de subjecció a la llei, pot contribuir a millorar l'accessibilitat del dret sense comprometre'n les garanties estructurals. Com defensa **Julià Pijoan (2025)**, eines com aquesta permeten generar un "doble document" (tècnic i planer) que garanteix el dret a comprendre sense degradar la precisió jurídica, sempre que es mantingui la supervisió humana com a tallafoc de responsabilitat última.

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

### VI.2. Dret Planer com a facilitador tecnològic de la claredat

Seguint l'anàlisi de solucions punteres en *Legal Tech* com la **Clairk Suite** (Digital Policy Alert), el sistema Dret Planer no es limita a ser un cercador jurídic, sinó que s'erigeix com un **facilitador tecnològic de la claredat i la transparència**. El prototip implementa els quatre pilars fonamentals del moviment del dret planer (*Plain Language*) aplicats a la tecnologia:

1. **Simplificació de la complexitat (Accessibilitat):** De la mateixa manera que eines com *Clairk Chat* tradueixen textos densos, Dret Planer utilitza l'arquitectura RAG per generar una "traducció intralingüística" del text constitucional. Això permet que el ciutadà passi de la literalitat de la norma a una explicació digerible sense perdre el rigor, reduint dràsticament la càrrega cognitiva necessària per accedir a la justícia.

2. **Estructura i navegabilitat:** Més enllà del text pla, el sistema organitza el coneixement jurídic (Constitució i doctrina) permetent una navegació semàntica. L'usuari no necessita conèixer l'estructura formal de Títols i Capítols; el sistema guia la consulta cap al precepte rellevant mitjançant la similitud vectorial, actuant com una brúixola en l'oceà normatiu.

3. **Democratització del coneixement jurídic:** En línia amb la missió democràtica del dret planer, la plataforma respon a la realitat demogràfica d'Andorra (on el 55% de la població és d'origen estranger). En oferir explicacions adaptades i multilingües, el sistema trenca la barrera d'entrada que suposa el llenguatge jurídic especialitzat, fent el dret accessible a no-experts.

4. **Relació amb el context (Interpretació enriquida):** El dret sovint és abstracte. Dret Planer no només mostra l'article, sinó que l'enriqueix amb doctrina i jurisprudència seleccionada (Pastor Vilanova, 2013). Això connecta la norma abstracta amb la seva interpretació real, facilitant el pas del "text de la llei" a la "realitat de la llei".

En definitiva, mentre que el dret planer tradicional actua sobre la *redacció* (com fa la Llei 6/2024), **Dret Planer actua sobre la *mediació* tècnica del dret**, utilitzant la IA per fer la norma transparent i processable per a la societat.

### VI.3. Elecció del corpus: la Constitució del Principat d'Andorra

La Constitució del Principat d'Andorra ha estat escollida com a corpus inicial del prototip per raons jurídiques i metodològiques. Des d'un punt de vista jurídic, constitueix la norma suprema de l'ordenament i la Regla de Reconeixement en sentit hartià (Hart, 1961). Des d'un punt de vista tècnic, la seva extensió limitada i estructura sistemàtica permeten una implementació controlada i verificable.

El corpus constitucional està format pel preàmbul i els 107 articles de la Constitució, estructurats segons els seus títols i capítols. Cada article ha estat processat com una unitat de coneixement independent, amb identificador únic, metadades bàsiques i text oficial íntegre.

A aquest corpus s'hi ha afegit, en una fase posterior, doctrina jurídica andorrana seleccionada, incloent-hi l'obra coordinada per Pastor Vilanova (2013) sobre la jurisprudència constitucional andorrana, amb la finalitat de proporcionar context interpretatiu sense substituir el text normatiu. Aquesta incorporació respon a la idea que la comprensió del dret no es limita a la literalitat de la norma, sinó que requereix una mínima contextualització doctrinal (Fuller, 1964; Vilajosana, 2010).

### VI.4. Arquitectura del sistema: Retrieval-Augmented Generation (RAG)

Per a l'assoliment dels objectius del projecte, s'ha optat per una arquitectura de Retrieval-Augmented Generation (RAG). Aquest enfocament combina dos processos diferenciats però complementaris: la recuperació semàntica d'informació rellevant del corpus i la generació d'explicacions en llenguatge natural a partir d'aquest contingut.

L'elecció de l'arquitectura RAG respon a diverses raons:

- **Reducció del risc d'al·lucinacions:** la generació està condicionada al contingut recuperat, evitant la creació de respostes desvinculades del text oficial.

- **Traçabilitat normativa:** el sistema pot indicar explícitament quins fragments del corpus sustenten cada resposta.

- **Separació funcional:** la recuperació i la generació són processos diferenciats, cosa que facilita el control i l'auditoria del sistema.

Tal com assenyalen Betancur Sánchez et al. (2025), les arquitectures híbrides que combinen recuperació i generació resulten especialment adequades per a aplicacions jurídiques, ja que permeten mantenir la fidelitat al dret vigent tot millorant l'accessibilitat del discurs. La implementació d'aquest model no està exempta de riscos sistèmics. En un sentit similar, Dantart (2025) adverteix en el seu informe tècnic sobre la veracitat en la IA jurídica, els models de llenguatge presenten una "generació endèmica d'al·lucinacions" que pot produir resultats factualment incorrectes. Per mitigar aquest risc, Dret Planer adopta la metodologia d'optimització de RAG (Retrieval-Augmented Generation) proposada per l'autor, assegurant que el sistema no generi contingut autònom, sinó que es limiti a processar i simplificar exclusivament les fonts legals autoritzades.

### VI.5. Models utilitzats: embeddings i generació de text

#### VI.5.1. Models d'embeddings

Per a la recuperació semàntica del contingut, el sistema utilitza models d'embeddings que transformen els textos del corpus en representacions vectorials. En la fase pilot, s'ha emprat un model multilingüe basat en XLM-RoBERTa, capaç de representar adequadament textos jurídics en català.

Aquesta elecció permet una cerca semàntica basada en el significat, i no únicament en la coincidència lèxica, millorant la identificació d'articles rellevants fins i tot quan la consulta de l'usuari no reprodueix literalment el vocabulari constitucional.

Es preveu, en fases posteriors, la migració cap a models entrenats específicament en català jurídic, com els desenvolupats en el marc del Projecte AINA, amb l'objectiu de millorar encara més la precisió semàntica.

#### VI.5.2. Model de generació

La generació d'explicacions en llenguatge planer es realitza mitjançant un model de llenguatge extens d'alta capacitat. Aquest model no opera de manera autònoma, sinó estrictament condicionat pel contingut recuperat a la fase prèvia.

Tal com s'ha exposat en el marc teòric, l'ús d'un model generatiu no implica atribuir-li capacitat interpretativa. La seva funció es limita a reformular i explicar el contingut jurídic existent, d'acord amb les fonts proporcionades, actuant com un mediador lingüístic (Saggion, 2024).

### VI.6. Funcionament operatiu del sistema

El funcionament de Dret Planer es pot descriure en cinc etapes successives:

1. **Entrada de la consulta:** l'usuari formula una pregunta en llenguatge natural.

2. **Anàlisi semàntica:** la consulta es transforma en un vector d'embedding.

3. **Recuperació del contingut:** el sistema identifica els fragments del corpus més rellevants.

4. **Generació de l'explicació:** el model generatiu elabora una resposta en llenguatge planer a partir del contingut recuperat.

5. **Presentació amb garanties:** la resposta inclou advertiments, fonts i indicacions sobre el seu caràcter orientatiu.

Aquest flux garanteix que la resposta final estigui sempre ancorada en el dret vigent i que l'usuari pugui identificar clarament la naturalesa del contingut rebut.

### VI.7. Procés d'indexació de dades i construcció del corpus

El corpus de Dret Planer es construeix mitjançant un procés d'indexació que no implica entrenament de xarxes neuronals sobre els textos jurídics. En primer lloc, s'extreu i s'estructura el text normatiu (Constitució) i la doctrina seleccionada en unitats discretes (articles, fragments). A continuació, cada unitat es segmenta en fragments (chunks) adequats per a la recuperació semàntica. Els embeddings es generen mitjançant **inferència** amb un model preentrenat (per exemple XLM-RoBERTa o equivalents): el model no s'entrena ni s'actualitza amb el corpus; només es fan passar els textos per obtenir representacions vectorials. Aquestes representacions es desen juntament amb les metadades i el text original en un índex unificat (corpus unificat i fitxer d'embeddings). En temps d'execució, la consulta de l'usuari es transforma en vector, es compara amb l'índex (similitud cosinus o equivalent) i els fragments més rellevants es passen al model generatiu com a context. En cap moment el corpus andorrà es fa servir per modificar els pesos del model de llenguatge ni del model d'embeddings; tota la integració es fa per recuperació i condicionament del context (RAG). Així doncs, no hi ha "aprenentatge" en sentit d'entrenament sobre dades protegides, sinó ús de models preentrenats en tasques d'inferència i generació condicionada a les fonts recuperades.

### VI.8. Respecte de la propietat intel·lectual i del dret d'autor

El disseny del sistema té en compte la propietat intel·lectual i el dret d'autor des de diverses dimensions. **(1) Textos normatius:** la Constitució i les lleis andorranes són de domini públic o d'accés oficial; la seva reutilització per a finalitats informatives i d'explicació en llenguatge planer s'inscriu en l'ús legítim i en les polítiques de dades obertes. **(2) Doctrina:** la doctrina incorporada al corpus es limita a fragments citables, amb atribució i finalitat d'il·lustració interpretativa, sense reproducció íntegra d'obres; es respecten les excepcions per a citació i mineria de textos i de dades (Directiva (UE) 2019/790, arts. 3 i 4). **(3) Transparència i traçabilitat:** el sistema remet explícitament a les fonts utilitzades, en línia amb les exigències de transparència del Reglament (UE) 2024/1689 (AI Act, art. 53). **(4) Accés legítim:** només s'incorpora contingut al qual el projecte té accés legítim i la procedència de les dades queda documentada. **(5) Llicències:** el material divulgatiu generat pel projecte es pot publicar sota llicències obertes (per exemple Creative Commons) per a ús educatiu i informatiu, sense reutilitzar obres protegides de tercers sense el marc legal adequat. Així, el procés d'indexació i l'ús del corpus es dissenyen per ser compatibles amb el respecte de la propietat intel·lectual i del dret d'autor.

### VI.9. Validació i control de qualitat

Per avaluar la fiabilitat del sistema, s'ha implementat un sistema de validació basat en preguntes de control, dissenyat per comprovar la capacitat del prototip per identificar correctament els articles constitucionals rellevants i generar explicacions coherents.

Aquest sistema inclou criteris com:

- la correspondència entre la resposta i el text recuperat,
- la presència de conceptes clau esperats,
- l'absència de contingut jurídicament incorrecte o no suportat pel corpus.

Tot i que aquesta validació no pretén substituir una avaluació jurídica exhaustiva, permet detectar errors recurrents i millorar progressivament el comportament del sistema, d'acord amb una lògica d'aprenentatge controlat.

### VI.10. Encaix normatiu, classificació de risc i règim de responsabilitat

En la seva configuració actual, *Dret Planer* es defineix jurídicament com un **sistema de suport a la informació**, i no com un sistema de suport a la decisió ni d'assessorament legal.

**Classificació de Risc (AI Act):** Segons el Reglament (UE) 2024/1689 (AI Act), la classificació del sistema depèn del seu ús previst. Si bé els sistemes d'IA destinats a assistir a les autoritats judicials en la interpretació dels fets o de la llei es consideren d'"alt risc" (Annex III, punt 8), *Dret Planer* està dissenyat com una eina de divulgació i assistència ciutadana, classificant-se com a sistema de risc limitat o de transparència (Títol IV AI Act). No obstant això, el seu disseny anticipa voluntàriament els requisits d'alt risc per garantir la màxima robustesa.

**Esquema de Responsabilitat i Governança:**
Per mitigar la incertesa sobre "qui respon" en cas d'error (p. ex., una al·lucinació que indueix el ciutadà a error), es defineix el següent marc de responsabilitat inspirat en la responsabilitat administrativa i de producte:

1.  **Promotor de la Plataforma (Proveïdor):** Responsable de la **diligència tècnica**. La seva responsabilitat no és de resultat (garantir la veritat absoluta), sinó de mitjans: garantir que el corpus estigui actualitzat, que els algoritmes de recuperació (RAG) funcionin correctament i que els filtres de seguretat estiguin actius. Respon per errors de disseny o manteniment negligent.
2.  **Administració Pública (si n'és titular):** Si l'eina s'integra en un portal públic, l'Administració respondrà patrimonialment pels danys causats per "funcionament anormal" del servei públic, sempre que l'error transcendeixi el marge d'error tolerable i comunicat.
3.  **L'Usuari (Ciutadà vs. Professional):**
    *   **Ciutadà:** Se li reconeix un estatus de consumidor protegit. El sistema ha d'oferir advertiments clars (*disclaimers*) sobre la naturalesa no vinculant de la informació. La responsabilitat per decisions preses basant-se *únicament* en la IA recau en l'usuari si ha ignorat els avisos clars de contrastar amb un professional.
    *   **Professional:** S'aplica l'estàndard de *lex artis*. Un advocat o gestor no pot excusar-se en un error de la IA per justificar una mala praxi, ja que té el deure professional de verificar la informació (principi de supervisió humana).

Aquest model es reforça amb una auditoria periòdica del corpus per una comissió mixta jurista-lingüista, assegurant que la "veritat algorítmica" es mantingui alineada amb la veritat jurídica oficial.

### VI.11. Limitacions tècniques i full de ruta

L'avaluació del prototip (*Round 3 Testing*) ha revelat reptes d'implementació que modulen la viabilitat immediata del sistema:

1.  **Latència i Estabilitat:** L'ús de models locals de gran dimensió (*Llama-3-70B* via API i embeddings locals) introdueix latències significatives en entorns no optimitzats, generant episodis d'inestabilitat (*timeouts*) que comprometen l'experiència d'usuari en temps real.
2.  **Traçabilitat Tècnica:** Tot i que el RAG recupera correctament les fonts, la vinculació automatitzada (URL) a fragments doctrinals específics presenta dificultats d'integració web que requereixen un desenvolupament *ad hoc*.
3.  **Gestió del Dissens:** El sistema tendeix a prioritzar la resposta majoritària, fent necessari un ajustament específic per garantir que les opinions doctrinals minoritàries siguin exposades explícitament.

Aquestes limitacions no invaliden el model teòric, però apunten que el pas del "concepte acadèmic" al "producte ciutadà" requereix una enginyeria de sistemes robusta (gestió de cues, *retry interactions*, cache semàntic).

### VI.12. Síntesi

La prova de concepte Dret Planer demostra que és tècnicament viable articular una plataforma d'intel·ligència artificial orientada a la comprensió del dret constitucional, sempre que es dissenyi amb abast limitat, traçabilitat i garanties jurídiques. Aquest resultat obre la porta a futures investigacions sobre l'ús d'eines similars en altres àmbits normatius.

---

## VII. Conclusions

### VII.1. La tecnologia com a constitucionalisme aplicat

L'adaptació del llenguatge jurídic mitjançant IA no és una simple millora cosmètica, sinó una exigència de l'Estat de Dret en l'era digital. **Dret Planer** demostra que és possible utilitzar la tecnologia per reduir la "distància cognitiva" entre la norma i el ciutadà, transformant l'obscuritat tècnica en claredat democràtica.

### VII.2. El futur: cap a una sobirania digital jurídica

El projecte obre la porta a un futur on l'Administració andorrana no només publiqui lleis, sinó que proveeixi les "ulleres" per llegir-les. Això implica una aposta estratègica per infraestructures digitals pròpies (corpus sobirans, models ajustats al català jurídic) que evitin la dependència de "caixes negres" foranes.

### VII.3. Tancament

En definitiva, Dret Planer no es postula com un substitut de l'advocat, sinó com una **infraestructura de justícia cognitiva**. En un microestat on la sobirania resideix en el poble, però on la meitat d'aquest poble troba barreres en la llengua del dret, la IA d'ús restringit actua com el garant tecnològic de la claredat constitucional.

El projecte demostra que és possible utilitzar models d'avantguarda sota una governança hartiàna, tot i que la seva implementació efectiva exigeix superar reptes tècnics de latència i estabilitat. L'objectiu final roman inalterable: assegurar que la Constitució sigui, per fi, un text que interpel·la i inclou tots els residents del Principat.

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
