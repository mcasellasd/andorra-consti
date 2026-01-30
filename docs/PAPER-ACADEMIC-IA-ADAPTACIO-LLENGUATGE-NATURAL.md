# El dret a la claredat constitucional: Intel·ligència Artificial i adequació tecnològica com a garanties de la cohesió jurídica a Andorra

**Resum**

Aquest treball parteix de la idea que, en un país socialment diversa i plurilingüe com Andorra, la complexitat del llenguatge jurídic continua dificultant el dret a comprendre i la cohesió jurídica, malgrat el mandat de llenguatge clar de la Llei 6/2024, del 25 d'abril. La intel·ligència artificial **estreta** pot actuar com a instrument d’assistència interpretativa i lingüística orientat a fer més comprensibles les normes, sense substituir el criteri dels operadors jurídics ni la sobirania tecnològica. 

Com a prova de concepte, es presenta una plataforma de dret planer multillenguatge (català, castellà i francès) centrada en la Constitució andorrana, que ofereix explicacions accessibles i respostes a preguntes de les persones usuàries mitjançant tècniques de recuperació augmentada. El treball descriu l’arquitectura bàsica del sistema, els criteris de qualitat de les sortides i diversos escenaris d’ús institucional i ciutadà. 

Finalment, es conclou que una IA estreta dissenyada amb garanties pot contribuir a reforçar el dret a comprendre, la claredat constitucional i la cohesió jurídica en un estat petit i multilingüe com Andorra, tot obrint línies per a futurs desenvolupaments.

**Paraules clau:** Constitució d'Andorra, Regla de Reconeixement, Dret a Comprendre, Intel·ligència Artificial, Sobirania Tecnològica, Accessibilitat Jurídica.

---

## 1. Introducció: Dret Planer i dret a comprendre

### 1.1. Plantejament del problema: barrera cognitiva

La intel·ligència artificial ha evolucionat significativament en la capacitat de processar, sintetitzar i comunicar informació complexa. Tot i això, la literatura acadèmica sobre la integració de la IA en l'àmbit legal adverteix sobre la necessitat de delimitar-ne les capacitats i prendre consciència de les limitacions. Autors com **Choi et al. (2023)** i **Nay (2023)** assenyalen que, si bé els sistemes d’IA són altament eficaços en la gestió de grans volums documentals i en el reconeixement de patrons, resulten problemàtics en la generació de noves interpretacions jurídiques o en l'assumpció de decisions de fons que requereixen criteri professional. En aquesta línia, s'emfatitza que la IA no ha de substituir la tasca de localització i raonament de les fonts originals de dret, sinó actuar com un complement d'eficiència (**Choi, Hickman, Monahan i Schwarcz, 2023**).

D'altra banda, els riscos inherents a la IA generativa, com les al·lucinacions i els biaixos, fan que la literatura especialitzada suggereixi tractar aquestes eines sota un paradigma de **"treball d'assistent júnior"** o **"notebook de suport"**, requerint sempre una supervisió humana estricta per evitar errors en la cadena de comprensió jurídica (**Pujol i Gabernet, 2024**).

No obstant això, existeix una tasca específica on la IA resulta especialment valuosa: la simplificació lingüística del text normatiu. Els models de llenguatge de gran escala (LLM) han demostrat una capacitat notable per a la generació de resums i l'adaptació de registres. Mentre que l'emissió d'opinions vinculants ha de seguir en mans de professionals, la "traducció" del text oficial cap a un llenguatge planer és una tasca automatitzable. Aquest enfocament d’IA com a **assistència a la recerca i simplificació** (estil *Notebook*) permet mitigar la barrera cognitiva sense vulnerar l'expertesa professional (**Hannes Westerman, 2023**).

### 1.2. Aportació del projecte: IA estreta RAG

Aquest projecte parteix de la hipòtesi que una intel·ligència artificial estreta —dissenyada específicament per a la interpretació i simplificació del text jurídic— pot actuar com un instrument d'assistència a la comprensió normativa. Mitjançant una arquitectura de **Generació Augmentada per Recuperació (RAG)**, el sistema restringeix l'output del model a dades humanes prèviament verificades, funcionant com un bloc de notes intel·ligent que garanteix la traçabilitat i el control humà (**Magesh et al., 2024**). Aquesta implementació assegura que la tecnologia es mantingui com una eina de cohesió jurídica i sobirania tecnològica al servei del ciutadà.


Com es desenvoluparà en les seccions següents, la Constitució d'Andorra —la Regla de Reconeixement que sustenta la legitimitat de tot el sistema jurídic— es presenta com el corpus inicial per a aquesta prova de concepte. Fer comprensible la Constitució en una societat heterogènia com Andorra, on el 55% de la població és immigrant i menys del 10% va participar en el procés constituent de 1993, és un repte jurídic de primer ordre.

La resposta: Dret Planer, una plataforma pública de simplificació jurídica
Per abordar aquest repte, aquest projecte presenta Dret Planer —una plataforma pública basada en IA estreta que ofereix explicacions en llenguatge planer dels articles de la Constitució andorrana. La plataforma funciona en dues modalitats:

Xat semàntic (Hermes): Mitjançant preguntes en llenguatge natural, els usuaris reben respostes que contextualitzen l'article relevant dentro de la Constitució, oferint exemples d'aplicació pràctica i desenvolupament doctrinal.

Anàlisi d'articles individuals: Cada article constitucional és explicat de forma autònoma en format simplificat, amb comentari jurisprudencial complementari.

Aquesta estratègia s'alinea amb mandats normatius recents, especialment la Llei 6/2024 del 25 d'abril en el seu  article 8.4, estableix que el llenguatge institucional ha de ser "accessible, acurat i comprensible",. Alhora, el projecte respon a un objectiu més profund: reforçar la cohesió jurídica en un Estat petit i multilingüe, garantint que la Constitució —el fonament del sistema— sigui realment comprensible per a tota la ciutadania.

### *Disclaimer*

> Aquest document no pretén constituir assessorament legal ni substituir la consulta a professionals del dret; les respostes de la plataforma tenen caràcter orientatiu i han de ser contrastades amb les fonts oficials.

## 2. El dret a comprendre (marc general)

El dret a comprendre, reconegut per la doctrina com a principi fonamental d'accés a la justícia, ha evolucionat des d'un dret implícit a un requisit explícit d'efectivitat jurídica. Autors com Carretero González (2024) el conceptualitzen com un dret constitucional que exigeix comunicacions comprensibles i claredat en la comunicació judicial. Julià Pijoan (2025) identifica el llenguatge tècnic-jurídic com una barrera d'accés que requereix competència conceptual especialitzada.

En una línia coincident, *Vallespín Pérez (2025)* vincula el dret a la informació amb el dret a entendre, i els reconeix com a pressupostos imprescindibles per a l’exercici efectiu del dret de defensa. D’altra banda, Montolío Durán i Bayés-Gil (2024) descriuen l’estat actual de la comunicació clara en l’àmbit juridicoadministratiu espanyol, que la ciutadania encara percep com a “difícil d’entendre”. Montolío, com a coautora de la Guía de redacción judicial clara del Ministeri de Justícia, impulsa la normalització d’eines que permetin garantir el dret a entendre, i defensa la claredat lingüística com un instrument per a democratitzar la conversa pública.

El desenvolupament doctrinal i institucional del 'dret a comprendre' a Espanya té un punt d'inflexió amb la creació, per acord del Consell de Ministres de 30 de desembre de 2009, de la *Comissió de Modernització del Llenguatge Jurídic (CMLJ)*, integrada per representants del Ministeri de Justícia, del Consell General del Poder Judicial (CGPJ), de la Fiscalia General de l'Estat i de la Real Academia Española (RAE). Aquesta iniciativa multidisciplinària va produir un Informe i unes Recomanacions que configuren el 'dret a comprendre' com el dret de la ciutadania a entendre tant la norma com el discurs jurídic que produeixen els professionals del dret, fonamentat constitucionalment en la dignitat de la persona (art. 10.1 Constitució Espanyola), la seguretat jurídica i la interdicció de l'arbitrarietat (art. 9.3 CE), la tutela judicial efectiva (art. 24 CE) i el dret a rebre informació veraç (art. 20 CE).

Pel que fa al context andorrà, Pujol Palau i Gabernet Piqué (2024) destaquen l’evolució de la política lingüística del Principat, especialment arran de l’aprovació de la Llei 6/2024 del 25 d'abril, de la llengua pròpia i oficial, la qual estableix que el llenguatge institucional ha de ser “accessible, acurat i comprensible” (art. 8.4). Les autores remarquen que la manca de comprensió de documents oficials pot constituir una vulneració de drets fonamentals, i situen el Manual de llenguatge jurídic (2017) del Consell Superior de la Justícia com una eina clau en aquesta matèria.

En la mateixa línia, Cucurull i Salom (2024b) ofereixen un recull de criteris i estratègies per afavorir la redacció clara en català jurídic, assenyalant que el llenguatge jurídic tradicionalment s’ha caracteritzat per la seva complexitat i opacitat. També a Andorra, el Raonador del Ciutadà, encapçalat per Xavier Cañada, ha advertit que la manca de comprensió de les resolucions emeses per la CASS vulnera el dret fonamental a comprendre, afirmant que “si no s'entén un document, s’està vulnerant un dret que, a més, és fonamental”. Aquesta afirmació reforça la dimensió jurídica del dret a la comprensibilitat, més enllà del seu vessant lingüístic.

Finalment, Saggion (2024) aborda la contribució de la intel·ligència artificial i del processament del llenguatge natural en la generació automàtica de textos de lectura fàcil. Segons ell, la mera disponibilitat d’informació resulta insuficient si aquesta no és realment accessible, atès que l’accés a la informació constitueix, en si mateix, un dret humà fonamental.

### 2.1. Marc internacional i europeu

Diversos instruments internacionals i europeus han emfasitzat que el dret a la informació i a la defensa efectiva no es compleix si el destinatari no entén els actes judicials:  
Conveni Europeu de Drets Humans (TEDH) exigeix explícitament que les persones acusades d'un delicte (article 6.3) o detingudes (article 5.2) siguin informades de les causes de l'acusació formulada "en un idioma comprensible" (Conveni Europeu de Drets Humans, 1950). 

La Carta dels Drets Fonamentals de la Unió Europea (article 47\) consagra el dret a la tutela judicial efectiva, la qual cosa implica que la manca de comprensió de les resolucions judicials pot impedir l'exercici adequat de la defensa dels drets i interessos (Carta dels Drets Fonamentals de la Unió Europea, 2000).

### 2.2. Àmbit iberoamericà

Burgos Martínez (2025) assenyala una paradoxa estructural; mentre que les normes espanyoles sobre accessibilitat cognitiva (Llei 6/2022, Llei 5/2024) proclamen el dret a comprendre, elles mateixes estan redactades en llenguatge jurídic clàssic, sense adaptacions a lectura fàcil, vulnerant en la pràctica el dret que pretenen garantir. L'autora proposa adaptacions a lectura fàcil (ex. Ordre JUS/912/2022) i assenyala que la IA estreta és una eina complementària indispensable per automatitzar, amb supervisió humana, la generació de versions en llenguatge clar a escala. La Comissió de Modernització del Llenguatge Jurídic (CMLJ) i el Llibre d'Estil de la Justícia (2017, CGPJ-RAE) han identificat els obstacles lingüístics del discurs jurídic espanyol i concreten criteris per fer la normativa accessible sense perdre rigor.

### 2.3. En català

El Dret a comprendre en català s'ha consolidat com un pilar fonamental en els processos de modernització i democratització de les administracions públiques i judicials en els territoris de parla catalana, incloent-hi Andorra, Catalunya, les Illes Balears i el País Valencià. Aquest dret transcendeix la simple recepció de la informació i exigeix que els missatges siguin "clars, senzills i eficaços" per als ciutadans.  
La promoció del llenguatge clar té el seu origen en el *Plain English Movement* del segle XX, però es va integrar activament en els territoris de parla catalana amb la recuperació de l'oficialitat del català a la dècada de 1980\.  
Catalunya: El moviment inicial del **llenguatge planer** ha evolucionat cap a la **comunicació clara**, entesa com una disciplina interdisciplinària. La Generalitat de Catalunya ha elevat la comunicació clara a la categoria de política de Govern mitjançant l'*Acord GOV/29/2024*. Aquest acord requereix que les comunicacions incorporin elements d'estructura i disseny per fer-les més comprensibles, i que s'utilitzi un llenguatge clar. Aquesta claredat millora la comprensió de les normes, redueix la frustració en els tràmits electrònics i contribueix a una gestió democràtica. Aquest propòsit també es manifesta en projectes d'innovació, com la generació de resums de normes en **llenguatge entenedor** amb l'ajuda de la intel·ligència artificial (IA).  

***Illes Balears i País Valencià:***

 Ambdues comunitats també promouen activament el llenguatge clar. A les Balears, per exemple, s'ha participat en l'adaptació de l'eina *arText* al català, un assistent de redacció dissenyat per millorar la qualitat textual. Al País Valencià, la nova regulació de criteris lingüístics per a l'Administració de la Generalitat (2024) té com a objectiu l'ús d'un llenguatge clar i directe, diferenciant contextos formals i informals per a una comunicació més eficaç amb els administrats.

### 2.4. En català a Andorra

Mentre que Catalunya, les Illes Balears i el País Valencià han progressat en la implementació d'eines de llenguatge clar (incloent IA per a resums en llenguatge entenedor), **Andorra se situa en una posició singular**: amb una població majoritàriament estrangera (vegeu Taula 1), una Constitució recent (1993) i un mandat explícit de claredat en la Llei 6/2024, el Principat enfronta reptes únics que requereixen solucions tecnològiques adaptades.

**Taula 1.** Percentatge de població nacional vs. estrangera (context comparat)

| Estat | % Nacionals | % Estrangers | Context Jurídic i Lingüístic |
| :---- | :---- | :---- | :---- |
| **Emirats Àrabs Units** | ~11% | ~89% | Sistema jurídic basat en la Xaria/Civil. Gran barrera lingüística (Àrab vs. Anglès com a *lingua franca*). |
| **Qatar** | ~12% | ~88% | Situació similar als EAU. Legislació complexa per a la mà d'obra expatriada. |
| **Mònaco** | ~24% | ~76% | Cas més similar a Andorra a Europa. Francès oficial, però forta presència internacional. |
| **ANDORRA** | **44,6%** | **55,4%** | **Únic país amb el català oficial. Forta presència de castellà, portuguès i francès.** |
| **Luxemburg** | ~53% | ~47% | Tres llengües oficials (Francès, Alemany, Luxemburguès) per gestionar la diversitat. |

Font: elaboració pròpia; dades Andorra, Govern d'Andorra.

##Dret a comprendre com a dret fonamental: 

La jurisprudència andorrana no reconeix un dret autònom a comprendre, però les exigències de motivació de les resolucions i la prohibició d’indefensió impliquen, de manera implícita, un estàndard mínim de comprensibilitat. Així, la inintel·ligibilitat de les comunicacions (com ara les resolucions de la Caixa Andorrana de Seguretat Social, CASS) pot vulnerar un dret fonamental com el dret de defensa.  

La Constitució d'Andorra estableix el català com a llengua oficial de l'Estat (art. 2.4), una disposició que va més enllà del pla cultural i vincula directament la comprensió del dret amb la cohesió social i la igualtat material.  

La Llei 6/2024, del 25 d'abril, de la llengua pròpia i oficial, actualitza la normativa anterior de 1999 i estableix de manera expressa que el llenguatge de les institucions públiques ha de ser "accessible, acurat i comprensible" per garantir la transparència de les comunicacions públiques i facilitar les relacions amb la ciutadania. Aquest mandat s'aplica també als òrgans rectors de l'Administració de Justícia.

- Mandat constitucional del català: La Constitució d’Andorra estableix el català com a llengua oficial de l'Estat. Aquesta disposició té una dimensió que va més enllà del pla cultural i vincula directament la comprensió del dret amb la cohesió social i la igualtat material

Aquesta nova legislació actualitza la normativa anterior de 1999 per adaptar-se al context social i cultural actual d'Andorra. Un dels seus objectius és enfortir la presència del català en tots els àmbits de la vida pública i garantir els drets lingüístics de la ciutadania.  

Específicament, la Llei 6/2024 inclou les següents disposicions sobre el llenguatge:

- Responsabilitat institucional: La Llei exigeix a les institucions i els organismes públics i parapúblics que el llenguatge que utilitzin sigui "accessible, acurat i comprensible".  
- Finalitat de la transparència: Aquesta exigència té com a objectiu fer efectiva la transparència de les comunicacions públiques i facilitar les relacions dels ciutadans amb l’Administració.  
- Administració de Justícia: Correspon als òrgans rectors de l’Administració de Justícia promoure l’ús de la llengua oficial i fer servir un "llenguatge jurídic i tècnic de qualitat i accessible als usuaris".

Això s'emmarca en la tendència internacional que reconeix el dret a comprendre, que a Andorra s'ha considerat un indicador de bon govern i transparència. Prèviament a aquesta llei, el Principat ja havia subscrit la Declaració d’Asunción-Paraguai (2016), que afirma que la claredat i la qualitat de les resolucions judicials constitueixen un "verdader dret fonamental".

##Altres normatives andorranes també han insistit en aquesta claredat:

- El Reglament d’impuls dels serveis digitals de l’Administració (aprovat pel Decret 202/2024, de 15-5-2024) estableix com a principi rector que l’Administració ha de garantir una informació digital "clara i comprensible".  
- La Llei 42/2022, de l’1 de desembre, de l’economia digital, l’emprenedoria i innovació posa un èmfasi especial en l'ús del llenguatge planer mitjançant expressions com "redactat de forma clara, transparent i comprensible".  

### 2.4.1 Català clar, integració i cohesió social

L'aposta per la claredat té una funció crucial en la integració en una societat amb una alta població immigrant. La capacitat d'integració d'un immigrant es veu dificultada pel desconeixement de la llengua i per la percepció que el català no és prou important per al desenvolupament professional i social (Andorra Recerca i Innovació, 2023; Serra i Massansalvador, 2024).  
*Reforç de la llengua oficial:* 
La visió que preval és que el català hauria de ser la llengua societària d'intercomunicació, tot i que la majoria d'immigrants utilitza més el castellà. Fer les comunicacions més clares en català (eliminant la complexitat innecessària) contribueix a fer el català més útil i accessible (Torres Pla, 2024; Andorra Recerca i Innovació. Grup de Sociologia, 2022).  

El marc de protecció lingüística i la promoció de la claredat a Andorra es fonamenten en el dret constitucional i tenen com a objectiu la cohesió social i la legitimitat democràtica.  
Relació amb l'accés a drets: S'ha comprovat que un coneixement més gran del català es correlaciona amb nivells de renda més alts i augmenta la satisfacció personal. Això indica que promoure l'ús de la llengua oficial és una eina per a la mobilitat social i per al desenvolupament individual (Govern d’Andorra. Departament d’Estadística, 2023).  

Tot i l'oficialitat del català, la realitat sociolingüística mostra la pressió del castellà i francès. Un sistema d'IA institucionalitzat que produeixi resums d'alta qualitat en català enforteix l'ús de la llengua en l'àmbit formal i evita el recurs a traductors automàtics externs de baixa qualitat (ex: Google Translate). Certament, malgrat l'estatus oficial del català a Andorra, la situació sociolingüística reflecteix reptes pel que fa al seu ús en l'àmbit formal, i la implementació de la intel·ligència artificial (IA) podria oferir una via per enfortir el català i garantir el dret a comprendre per part de la ciutadania (Torres Pla, 2024; Serra i Massansalvador, 2024).

    En resum, el dret a comprendre s'ha consolidat com a principi fonamental en múltiples jurisdiccions (internacional, europea, iberoamericana i als territoris de parla catalana). A Andorra, aquest dret es fonamenta constitucionalment en l'article 2.4 (català com a llengua oficial) i es reforça amb la Llei 6/2024. 

## 3. El repte de la comprensió normativa a Andorra

### 3.1. Context sociodemogràfic singular

El Principat d'Andorra presenta una realitat sociodemogràfica diferenciadora en el context europeu. Amb un percentatge de població resident d'origen immigrant que s'apropa al 55%, la xifra més actual rebassa per poc els 89.000 habitants en una fita històrica. L'excepcionalitat andorrana es fa evident en comparar-la globalment (Taula 1, secció 2.4). Andorra se situa, juntament amb Mònaco i els estats del Golf, en l'exclusiu grup de països on la població nacional és minoria. Aquesta estructura demogràfica implica que la majoria dels subjectes obligats per la norma (el 55,4% dels residents i el 100% dels milions de visitants) no han estat socialitzats en el sistema jurídic ni educatiu del país. I amb una economia oberta amb un alt flux de visitants i inversors, el país s'enfronta a un repte jurídic de primer ordre.

Aquesta realitat genera un "dèficit democràtic" estructural: no hi ha coincidència entre la població que deté la sobirania política (els nacionals) i la totalitat de la població a la qual s'aplica la legislació. Això crea una tensió entre la "identitat oficial" de l'Estat (monolingüe i basada en la tradició) i la realitat social multilingüe i multicultural del carrer. Com assenyala Joan Josep López Burniol (2023), la transformació d'Andorra va fer imprescindible un *aggiornamento* de les institucions: passar d'una societat patriarcal i homogènia a una de complexa i diversificada requeria una Constitució que permetés la integració dels residents tot salvaguardant la identitat del país. En aquest sentit, l'eina Dret Planer actua com a facilitadora d'aquest mandat d'integració en un entorn demogràficament desequilibrat. Joan Argemí Ferrer (2015) recorda que els usos i costums són «la memòria identitària dels andorrans», però cal entendre la llei com un «element dinàmic de vida» que, perfeccionat i posat al dia, pot «servar les essències pures del país». Com assenyala Jordi Serra, la integració és dificultada per factors com un sistema educatiu segregador (amb tres models diferents que generen ciutadans amb referents diversos) i una percepció d'estratificació social basada en l'origen.

En aquest context, el dret andorrà, històricament basat en el *ius commune* i el costum, pot resultar obscur per a una població acostumada a la codificació. Com assenyala Iago Andreu (2015), el sistema de fonts andorrà «es presenta com a obscur per a uns operadors jurídics formats en la codificació i no pas en la tradició del dret comú medieval», cosa que impedeix «tenir una noció clara i precisa de les fonts del dret privat i l'ordre de prelació entre aquestes mateixes fonts». La necessitat de cohesió normativa esdevé, doncs, un repte de primer ordre: cal garantir que una població majoritàriament forana comprengui i accepti les normes d'un sistema en el qual no participa políticament.

A la complexitat demogràfica s'hi suma una complexitat jurídica intrínseca. López Burniol (2023) destaca que la supervivència d'Andorra s'ha basat històricament en la «irracionalitat» jurídica de la sobirania compartida (els Pariatges), un concepte contrari a la lògica del Dret Romà clàssic que rebutja la comunitat de domini. Aquesta arquitectura institucional única, que ha garantit la independència, genera però un entramat competencial i normatiu complex que l'eina Dret Planer ha de descodificar per fer-lo accessible al ciutadà no expert.

#### 3.1.1. La funció del dret: *ignorantia iuris societatem non facit*

En una jurisdicció heterogènia com Andorra, on la majoria de residents i visitants provenen d'altres sistemes jurídics, el dret no pot reposar en l'assumpció que els ciutadans el coneixen per tradició o socialització. Per tant, el principi llatí *ignorantia iuris societatem non facit* (la ignorància de la llei no crea societat) només és viable si el dret és **realment accessible i comprensible** per a tots els obligats per la norma.

El dret té per objectiu guiar les conductes i proporcionar un marc de previsibilitat; l'Estat ha de posar a disposició les eines perquè els ciutadans puguin conèixer les normes que els vinculen. Francesc Badia (2015) ho formula amb claredat: «Sovint resulta difícil —fins i tot per als professionals del dret— determinar amb certesa quina norma serà aplicable a un cas concret»; la seguretat jurídica «exigeix no tan sols conèixer el sistema de fonts del dret sinó també el dret mateix. I avui resulta difícil, en alguns casos i sobre tot per persones no expertes, conèixer aquest dret». El proverbi *Si fueris Rōmae, Rōmānō vīvitō mōre* (Si estàs a Roma, fes com els romans) resumeix aquesta exigència: qui viu o transita per Andorra ha de poder comprendre i respectar les seves normes. En un país amb població majoritàriament forana, això només és possible si el marc jurídic fonamental es fa explícit i comprensible.

En aquest escenari d'alta mobilitat, la transmissió de les "regles del joc" constitucionals no es pot donar per suposada. El coneixement de les institucions singulars del Principat (el Coprincipat parlamentari, l'estructura dels Comuns, la figura del Raonador del Ciutadà) no es transmet únicament per tradició oral o socialització primària, atès que una gran part dels subjectes de dret provenen de tradicions jurídiques alienes. Aquesta distància cognitiva entre la norma i el destinatari pot generar inseguretat jurídica i debilitar el teixit social.

Per tant, en el context andorrà, la garantia del dret a comprendre no és només un imperatiu moral sinó una necessitat sistèmica. Cal que els ciutadans —especialment els més de 55.000 residents estrangers i els milions de visitants— puguin accedir a una interpretació clara del **marc jurídic fonamental** del país: la seva Constitució.

---

## 4. La Constitució andorrana

### 4.1. Andorra sota la lupa de Hart: regla de reconeixement «viva»

A Andorra, la Constitució escrita de 1993 s'erigeix com a **Regla de Reconeixement** en el sentit teòric de H.L.A. Hart, és a dir la norma última que estableix els criteris de validesa de totes les altres normes jurídiques del sistema. Tanmateix, Hart adverteix que perquè una Regla de Reconeixement sigui operativa (no només teòrica), cal que la majoria de la població l'adopti amb un «punt de vista intern» —és a dir, que l'accepti com a pauta pròpia, no sols com a ordre imposada.

En el context andorrà, aquesta exigència d'acceptació interna és especialment crítica. Mentre que els nacionals que van participar en el referèndum de 1993 van adoptar la Constitució com a pauta pròpia, una part significativa dels residents i la totalitat de visitants provenen d'altres sistemes jurídics. Per tant, la Regla de Reconeixement només serà realment «viva» (operativa, estable) si la Constitució és comprensible i accessible a tota la població, independentment del seu origen. Com recorda López Burniol (2023), en un Estat on la ciutadania (el cos electoral) és una minoria respecte a la població total, l'existència d'un marc constitucional i d'un Tribunal Constitucional independent és vital: actua com a garantia suprema dels drets de tota la població enfront dels poders públics. La IA proposada, en facilitar la comprensió d'aquest marc garantista, reforça la seguretat jurídica de tots els residents, nacionals o no.

### 4.2. La Constitució com a corpus pilot

Les raons per les quals he escollit la Constitució com a text legislatiu base com a prova pilot per entrenar son dues. Des d’un punt de vista pragmàtic, i més enllà de ser un text poc extens, força clar i en un àmbit molt acotat, és la norma suprema de la qual se subjecten la resta de poder i institucions. Per tant, és necessàriament dels primers textos amb els que cal alimentar les bases de dades. D’aquesta manera se simplifica l’entrenament a la jurisdicció constitucional, 

Segons Vilajosana (2010), la Regla de Reconeixement de Hart és una convenció amb una dimensió constitutiva: fem les coses perquè pensem que els altres faran el mateix donada la mateixa situació. Conèixer la Constitució particular d'un país és conèixer la pedra angular en la qual versa tota la resta de l'ordenament jurídic.

El procés constituent va significar una **modernització i l’assentament de la Sobirania** El procés va néixer de la necessitat de dotar Andorra d'una personalitat jurídica internacional clara i definida, dissipant els dubtes sobre la seva naturalesa estatal. L'objectiu era modernitzar un país que fins aleshores havia mantingut una estructura quasi feudal (basada en els Pareatges) i convertir-lo en un Estat democràtic i social de dret.

Un dels èxits més singulars del procés va ser la fórmula triada per a la prefectura de l'Estat. La Constitució va aconseguir dos fets aparentment contradictoris:

- **Transferir la sobirania** (que fins llavors requeia en els Coprínceps) al poble andorrà.
- **Perpetuar la figura dels Coprínceps**, però transformant el seu rol en el d'un coprincipat parlamentari, on regnen però no governen, garantint així la continuïtat històrica i l'equilibri amb els països veïns.

El procés va culminar el **14 de març de 1993**, una data clau en què el poble andorrà va aprovar el text en referèndum. Aquest vot va permetre l'entrada d'Andorra als organismes internacionals (com l'ONU) com un estat sobirà de ple dret, amb una separació de poders clara (executiu, legislatiu i judicial) que abans no existia formalment. Segons les dades del Departament d'Estadística i els resultats oficials del referèndum de 1993, dels **habitants totals,** Andorra tenia aproximadament **63.400 habitants** l'any 1993, van **votar** exactament **6.910 persones**, ja que, la majoria eren residents estrangers sense dret a vot. Llavors, el cens electoral (andorrans amb dret a vot) era només de **9.123 electors**. 

Per tant, existeix un gruix de població que, per raons administratives o extemporànies no han format part d’aquest procés i poden no tenir-ne un coneixement tan profund del que seria desitjable des d’un punt de vista de la cohesió interpretativa del dret. El desconeixement del text marc, doncs, no és dona única i necessàriament a nouvinguts, sinó també a residents consolidats al país. De fet, Serra, adverteix del poc o escàs interés que tenen les segones generacions d’andorrans per la cultura o les institucions andorranes. Aquesta distància cognitiva entre la norma i el destinatari pot generar inseguretat jurídica i debilitar el teixit social.

Així doncs, per garantir que la Constitució sigui realment comprensible a tots els subjectes de dret a Andorra, és necessari explorar com la **intel·ligència artificial estreta** pot actuar com a instrument d'assistència a la simplificació i interpretació del text constitucional. La secció següent examina el marc teòric que sustenta aquesta aproximació.

## 5. Marc teòric-jurídic de la IA

### 5.1. IA estreta vs. IA generativa  
Aquest apartat defineix i diferencia les dues tipologies d'IA rellevants per a aquesta recerca, establint les bases conceptuals per justificar l'opció de la IA estreta.  
La IA estreta (també anomenada Narrow AI o IA feble), dissenyada per executar una tasca específica —com ara resumir i simplificar textos legals—, es diferencia de la IA generativa generalista pel seu abast limitat i traçabilitat superior. La IA estreta minimitza les "al·lucinacions" i permet una explicabilitat superior, requisit fonamental per a l'ús judicial.  
El concepte d'intel·ligència artificial (IA) es pot classificar en diferents tipologies segons el seu abast i capacitat, sent crucial la distinció entre la IA feble/estreta i la IA forta/general, especialment per entendre la seva aplicació en l'àmbit jurídic i de la comunicació clara.  
IA feble/estreta (Narrow AI) La IA feble o estreta (Narrow AI o Artificial Narrow Intelligence) es defineix com aquella que únicament exhibeix un comportament intel·ligent en un àmbit molt específic i limitat. Tots els avenços aconseguits fins ara en el camp de la IA són manifestacions d'IA feble i específica (López de Mántaras, 2017). Aquesta IA té èxits impressionants en la realització de tasques concretes, fins i tot superant l'expertesa humana en certs dominis. Per exemple, els programes que juguen a escacs o diagnostiquen malalties són IA feble, ja que són incapaços de traslladar els seus coneixements a altres àrees (com jugar a les dames) (Campbell et al., 2002). En l'àmbit del processament del llenguatge natural (PLN), la IA estreta s'utilitza en tasques no generatives (Saggion, 2024).  

1. Intel·ligència Artificial Feble o Específica (IA actual):

- Aquesta és la IA que existeix actualment.
- Està dissenyada per realitzar tasques concretes i limitades, com l'anàlisi de dades, la recerca legal, la traducció automàtica o el diagnòstic.
- Tots els avenços aconseguits fins ara, com els sistemes d'anàlisi de grans dades o els programes de suport a la decisió, són manifestacions d'aquesta IA especialitzada.

2. Intel·ligència Artificial General (AGI) o Forta (IA teòrica):

- L'AGI és un sistema actualment teòric que tindria la capacitat d'entendre, aprendre i aplicar intel·ligència a través de qualsevol àmbit, amb un nivell igual o superior a la intel·ligència humana.
- La IA Forta és necessàriament general.  
Els models d'IA feble, com ara BERT i les seves variants adaptades al dret (com Legal-BERT o LamBERTa), són les tecnologies predominants en tasques específiques (Betancur Sánchez et al., 2025; Siino et al., 2025). No obstant, aquests sistemes han d'incorporar mòduls que permetin explicar com s'ha arribat als resultats i conclusions proposades. La capacitat d'explicació és una característica irrenunciable que permet comprendre el funcionament del sistema i avaluar la seva fiabilitat (Julià Pijoan, 2025).  
Les xarxes neuronals supervisades, que s'entrenen amb dades prèviament etiquetades (on cada entrada té una sortida correcta associada), són un model que es pot implementar en l'àmbit judicial amb l'objectiu de generar resultats fiables i justificables. Aquestes xarxes, com els models Transformer preentrenats en dominis legals (com LegalBERT), poden analitzar documents, identificar conceptes clau i establir relacions entre ells, sent ideals per oferir una explicació del procés decisori (Siino et al., 2025).  
### 5.2. IA generativa i LLM

La IA generativa (Generative AI o GenAI) es refereix a aquells models d'IA que creen contingut nou (imatges, vídeo, text, etc.) a partir d'un ampli conjunt de dades o paràmetres. Els models de llenguatge extens (Large Language Models o LLM), com ChatGPT o Gemini, són un tipus d'IA generativa (Colombo, 2024).  
Característiques principals:  
- Naturalesa i funcionament: Els LLM utilitzen xarxes neuronals massives entrenades amb grans quantitats de text. Aquests models no maneguen paraules ni comprenen el llenguatge en termes humans; en canvi, utilitzen anàlisis probabilístiques per predir la seqüència lingüística més plausible per generar text nou, com si fos un procés d'autocompletat avançat (López de Mántaras, 2018b).  
- Risc d'al·lucinacions: La IA generativa té un risc conegut de produir  
"al·lucinacions" (informació inventada o inexacta però plausible). Això és degut a la seva naturalesa estocàstica (aleatòria). Aquest fenomen genera inseguretat jurídica i fa que la IA generativa, en el seu estat actual, no estigui en condicions de substituir el jutge (Escudero, 2024; Carretero González, 2024b).  
- Limitació de l'explicabilitat: En general, la majoria de sistemes d'IA generativa són vists com a "caixes negres" (black box) perquè la seva complexitat emergent fa que els resultats no siguin completament previsibles o explicables (Caja Moya & Quiroga Rodríguez, 2025).  
- Aplicació a la simplificació: Malgrat les limitacions, els LLM són especialment prometedors com a eina auxiliar en la simplificació de textos jurídics. Poden generar automàticament resums clars de sentències judicials (doble document) i adaptar el registre a les circumstàncies socioculturals del destinatari, tasca que seria costosa en temps i esforç per als òrgans jurisdiccionals humans (DaCunha, 2024; Baez, 2024).  
### 5.3. Comparació i ús judicial

La distinció entre ambdós tipus d'IA és crucial per a l'ús en la justícia.  
La distinció entre els tipus d'Intel·ligència Artificial (IA) és crucial per determinar el seu ús i el marc de responsabilitat dins el sistema de justícia.  
Ús judicial i la importància de la distinció:  
La distinció és fonamental perquè, fins ara, la IA només pot ser utilitzada com una eina d'assistència i simplificació i no com una entitat autònoma de presa de decisions en el sector judicial.  
1\. Imputació i Responsabilitat: La base del dret, especialment el dret penal, rau en l'acció i la culpabilitat humana (voluntat i consciència). L'AGI, en mancar d'aquests atributs humans (fins i tot si actués de manera autònoma), no pot ser subjecte d'imputació penal. Això obliga a la justícia a tractar la IA, fins i tot la més avançada, com un instrument.  
2\. Activitats d'Alt Risc: Els sistemes d'IA utilitzats per a la recerca o la interpretació de fets en l'administració de justícia són classificats com a alt risc segons el Reglament d'IA de la UE. En aquests casos, es requereix la supervisió humana.  
3\. Decisions Finals: En cap cas es pot prendre una decisió que produeixi efectes jurídics adversos a una persona basada únicament en el resultat d'un sistema d'IA. Això subratlla que el criteri final de decisió ha de ser sempre reservat als humans, independentment de la sofisticació de la tecnologia.  
En el context legal, l'ús de la IA, especialment la generativa, no substitueix la funció del jutge, sinó que es planteja com a eina de suport. L'objectiu és que, mitjançant la IA, es puguin  
automatitzar tasques de simplificació sense que això suposi una càrrega addicional per al sistema judicial, millorant així l'accés a la justícia mitjançant una comunicació més clara i comprensible.  
El control i la supervisió humana són indispensables per garantir que la IA respongui a valors jurídics i democràtics (Julià Pijoan, 2025; Vallespín Pérez, 2025).  

### 5.4. Estat de l'art en projectes jurídics IA (anglès, castellà, català, Andorra)

L'estat de l'art en projectes d'Intel·ligència Artificial (IA) aplicats a l'àmbit jurídic varia significativament segons la llengua i la jurisdicció, amb models cada vegada més especialitzats que busquen millorar l'eficiència i l'accessibilitat del dret.  

1\. Anglès

La recerca en llenguatge legal en anglès (principalment en el context nord-americà i comú) presenta un gran volum de dades i un alt nivell de sofisticació en el desenvolupament de models d'IA i les seves aplicacions.  
Models i Arquitectura:  
Els models de transformadors com BERT i RoBERTa dominen el camp, amb una notable tendència a crear adaptacions específiques per al domini legal, com LEGAL-BERT, per gestionar les complexitats del llenguatge jurídic. Es tendeix a utilitzar models híbrids, combinant transformadors amb mètodes tradicionals com SVM (Support Vector Machines), BM25, GloVe i Doc2Vec.  

Tasques i Aplicacions Clau:  

1\. Recuperació de Documents i Recerca Legal (Legal Search): Inclou la recuperació de documents (T1), la implicació de casos (T2) i la resposta a preguntes (T3).  
2\. Revisió i Classificació de Documents (Legal Document Review): Tasques com la Classificació (T6), el Reconeixement d'Entitats Anomenades (NER, T4) i la detecció de similituds (T5) són centrals, amb l'ús de models com ara Hierarchical Bi-LSTM.  
3\. Automatització de Documents (Document Automation): S'utilitzen models generatius com ChatGPT i Vicuna per ajudar en la redacció i revisió de contractes.  

Conjunts de Dades i Avaluació (Benchmarks):  
La recerca es basa en conjunts de dades a gran escala, com LexGLUE (un conjunt de set dades per a tasques de NLU legal), CUAD (Contract Understanding Atticus Dataset, per a la revisió de contractes) i MAUD (Merger Agreement Understanding Dataset, amb anotacions d'experts). També s'utilitzen el corpus Pile of Law de 256 GB i el conjunt de dades CaseHOLD.  

Implementacions en la Vida Real:  
Nombroses empreses de legal tech als EUA han implementat IA per a tasques legals: ROSS Intelligence, Kira Systems, LexisNexis, Westlaw Edge (per a anàlisi de documents i predicció de casos) i Luminance/CaseCrunch (per a predicció de resultats judicials). Si bé, no son poques les crítiques que han rebut per biaix, especialment el Correctional Offender Management Profiling for Alternative Sanctions (COMPAS), un algoritme de valoració de risc de reincidència utilitzada als EUA per ajudar a decidir llibertat condicional i altres mesures d’execució penal, on el Tribunal Suprem de Wisconsin en va limitar l’ús (State vs Loomis) per la manca de transparència de la ‘black box’ (Adams, 2025).  

2\. Llengua castellana  

El castellà també ha vist un augment en el desenvolupament de models especialitzats, ja que els models multilingües existents no capturen amb detall el llenguatge altament especialitzat i arcaic del domini legal espanyol.  
Models i Eines Específiques:

- MEL (Modelo de Español Legal): Un model de llenguatge legal basat en XLM-RoBERTa-large, entrenat específicament amb corpus legals espanyols, incloent-hi el Boletín Oficial del Estado (BOE) i textos parlamentaris. L'objectiu de MEL és superar els models multilingües generals per a tasques d'NLP en castellà legal. Els resultats han confirmat l'eficàcia del seu pre-entrenament en tasques de classificació.  
- arText i arText claro: Eina d'assistència a la redacció administrativa, basada en regles de PLN. El seu objectiu és ajudar a redactar textos administratius en llenguatge clar, utilitzant eines de PLN per a l'estructuració, la revisió ortogràfica i la classificació. Aquesta eina ja ha estat utilitzada en el context de l'Administració de Madrid.  
- Clara: Sistema que utilitza l'aprenentatge automàtic (machine learning) per mesurar el grau de claredat d'un text en castellà a partir de nou mètriques.  
- CLAPPI: Un sistema basat en la tecnologia ChatGPT, entrenat amb documents legals del Govern de la Ciutat de Buenos Aires, amb l'objectiu de crear automàticament textos més clars.  

Iniciatives Jurídiques i Ús d'IA:  
- Clarificació de textos judicials: La Comissió per a la Claritat i Modernització del Llenguatge Jurídic va ser creada el 2023 pel Ministeri de Justícia d'Espanya per impulsar un llenguatge més accessible en la justícia. En aquest sentit, hi ha hagut experiments en l'àmbit judicial, com l'ús de ChatGPT per part d'un jutge argentí per generar un paràgraf en "format de lectura fàcil" en una sentència, amb la condició ineludible de la supervisió humana.  

3\. Llengua catalana  

El català s'ha beneficiat d'un interès creixent en la IA aplicada a la clarificació legal, impulsada per mandats institucionals de transparència i l'existència d'organismes de normalització:  
- Models d'IA i Dades: Els models Salamandra del Barcelona Supercomputing Center (BSC) han dedicat esforços per incloure dades curades en català, amb l'objectiu d'obtenir un alt rendiment en aquesta llengua. Les avaluacions d'aquests models han mostrat una forta competència en català.  
- Simplificació Administrativa i Legal: La Generalitat de Catalunya utilitza IA generativa per crear resums de les normes publicades al Diari Oficial de la Generalitat de Catalunya (DOGC) i al Portal Jurídic de Catalunya (PJC) en un llenguatge més entenedor, com a part de la política de claredat. A més, el Govern ofereix un servei per adaptar les resolucions judicials (actes, provisions i sentències) a un format de lectura fàcil per a persones amb discapacitat.  
- Desenvolupament d'Eines: S'està treballant en l'adaptació del sistema de redacció assistida arText claro al català, un projecte finançat pel Govern de les Illes Balears i la Generalitat de Catalunya. El projecte iDEM també treballa per desenvolupar eines d'NLP i IA en català per a la simplificació i accessibilitat en espais democràtics.  

4\. Andorra  

El marc legal andorrà recent ha establert una clara direcció cap a la comunicació clara i l'ús de la IA com a eina de suport a la comprensió:  
- Mandat Legal de Claredat: La Llei 6/2024, de 25 d’abril, de la llengua pròpia i oficial estableix l'obligació específica que el llenguatge institucional i dels organismes públics i parapúblics sigui "accessible, acurat i comprensible". Aquest mandat afecta també a l'Administració de justícia.  
- Digitalització i Simplificació: El Reglament d’impuls dels serveis digitals de l’Administració (Decret 202/2024), aprovat el 2024, explicita que la transformació digital ha d'incloure la simplificació administrativa i la "normalització de documents amb un llenguatge clar i de lectura fàcil".  
- Iniciatives en Marxa:  
- La Unitat de Simplificació Administrativa i Gestió Digital de la Secretaria d’Estat d’Afers Socials té l'objectiu de clarificar el llenguatge dels tràmits i convertir la normativa a format de lectura fàcil (per exemple, el Conveni sobre els Drets de les Persones amb Discapacitat).  
- El Consell Superior de la Justícia (CSJ) va elaborar el Manual de llenguatge jurídic (2017) seguint els principis del llenguatge planer.  
- Hi ha debats sobre la viabilitat de plantejar un projecte d'IA similar al Portal Jurídic de Catalunya per generar resums clars de documents legals al Portal Jurídic d’Andorra.  
Aquestes regulacions i iniciatives a Andorra es fonamenten en la necessitat de complir amb el dret fonamental a entendre, ja que la complexitat de documents (com les resolucions de la Caixa Andorrana de Seguretat Social, CASS) pot generar indefensió.  
## 6. Arquitectura de garantia: el sistema «Dret Planer»

Aquesta secció descriu el paradigma d'assistència, l'arquitectura tècnica i les mètriques de validació del sistema, en continuïtat amb l'estat de l'art (secció 5).

Dret Planer no es concep com un sistema de decisió automatitzat, sinó com un entorn de **computació assistencial**. Aquest enfocament s'alinea amb la proposta de **Westerman (2023)**, que defineix la IA en l'àmbit de l'accés a la justícia no com un substitut del jurista, sinó com una eina de "suport cognitiu" que permet a l'usuari final navegar per la complexitat normativa. En aquest sentit, el sistema opera sota el criteri d'**assistència júnior supervisada**, on el model de llenguatge actua com un bloc de notes que sintetitza la informació però manté sempre el vincle amb la font primària de dret (**Choi et al., 2023**).

Per minimitzar el risc d'al·lucinació i garantir la seguretat jurídica, el projecte implementa una arquitectura de **Generació Augmentada per Recuperació (RAG)**. Aquest disseny tècnic permet separar funcionalment el procés en dues capes diferenciades:

1. **Capa de Recuperació (IA estreta):** S'utilitza el model **XLM-RoBERTa-base** (amb una transició prevista cap al model **AINA roberta-base-ca-v2**) per a la creació de representacions vectorials dels articles constitucionals. Aquesta és una fase d'IA estreta pura: el sistema no genera text, sinó que calcula la similitud semàntica entre la consulta del ciutadà i el corpus legal oficial. Com assenyalen **Magesh et al. (2024)**, aquesta restricció al context és l'única via efectiva per garantir un sistema "lliure d'al·lucinacions" en l'entorn legal.
2. **Capa de Síntesi (IA de propòsit general):** Un cop recuperat el fragment rellevant, el model **Llama 3 70B** s'encarrega de la "traducció" a llenguatge planer. La generalitat d'aquest model és el que permet aplicar principis de **Legal Design**, adaptant la sintaxi i el lèxic per reduir la càrrega cognitiva de l'usuari sense perdre el rigor del concepte jurídic original.

D'acord amb el **Codi sobre l'Ètica de la IA d'Andorra (2024)**, el sistema incorpora un mòdul d'avaluació basat en 43 preguntes de control que mesuren tres dimensions crítiques:

- **Fidelitat (Faithfulness):** Grau de correspondència entre la resposta simplificada i el text original de la Constitució.
- **Precisió del context:** Capacitat de l'arxiver (IA estreta) per identificar l'article correcte segons la intenció de l'usuari.
- **Llegibilitat:** Mesura de l'eficàcia de la simplificació mitjançant índexs de claredat lingüística, garantint el compliment del mandat de la **Llei 6/2024**.

Aquesta metodologia assegura que el resultat final sigui un producte de **sobirania tecnològica**, on la intel·ligència artificial roman subordinada a la legalitat vigent i al control dels operadors jurídics, actuant com el pont necessari per fer realitat el **dret a comprendre** a la societat andorrana.

### 6.1. Història i passos

Aquesta secció documenta el camí recorregut des de la idea inicial fins al sistema actual, amb l'objectiu de transparència metodològica i reproductibilitat.

**Origen: del text constitucional al corpus estructurat.** El punt de partida va ser el text oficial de la Constitució d'Andorra de 1993 (PDF). Mitjançant extracció de text (scripts o pdfminer) es va obtenir el fitxer pla; el script *process-constitucio-andorra.js* va identificar articles, títols i capítols i va generar l'estructura de dades tipada. Un script dedicat (*build-constitucio-knowledge.js* o variants *build-constitucio-knowledge-full.js*, *build-constitucio-completa.js*) va transformar els articles en entrades de coneixement amb identificador únic (CONST_PREAMB, CONST_001, …), categoria, text oficial i metadades. El resultat va ser *constitucio.json* amb 108 entrades (preàmbul \+ 107 articles). Es van generar vectors d'embeddings (*generate-embeddings-constitucio.js*) i emmagatzemar a *constitucio-embeddings.json*, primer amb l'API d'OpenAI i posteriorment amb l'opció local XLM-RoBERTa-base.

**Incorporació de doctrina.** Es va prioritzar l'obra *Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució* (Pastor Vilanova, coord., 2014\) i altres documents de *docs/* i *docs/nous/*. Scripts de segmentació (*processar-doctrina-txt.js*, *processar-doctrina-xlm.ts*) van generar entrades amb id (ex. DOCTRINA_20_ANYS_001), category, topic, content, metadades i embeddings. L'obra "20 anys" va aportar 254 fragments; el corpus unificat va superar les 360 entrades.

**Unificació del corpus.** El script *unificar-corpus-doctrina.js* llegeix Constitució, doctrina i aprenentatge i escriu *constitucio-unified.json* i *constitucio-unified-embeddings.json*. El mòdul *lib/rag/corpus.ts* carrega primer el corpus unificat i fa fallback a només Constitució si no existeix. Es va afegir un índex BM25 (*lib/rag/bm25.ts*) per cerques lexicogràfiques complementàries.

**Pipeline RAG i API de xat.** A *pages/api/unified-chat.ts*: es detecta referència a article, paraules clau i complexitat; es genera l'embedding de la pregunta i es fa cerca per similitud cosinus (i opcionalment BM25); els fragments recuperats es passen com a context al model de generació (Llama 70B via Groq); es valida compliment AI Act i qualitat de resposta; la resposta final inclou les fonts (sources).

**43 preguntes de control.** Es va definir un conjunt de 43 preguntes (*data/preguntes-control.ts*) amb articles esperats, paraules clau i prohibides i metadades (categoria, dificultat). Es poden executar des de /preguntes-control, via API o des de línia de comandes. El mòdul *lib/evaluacio/preguntes-control.ts* avalua cada resposta (articles trobats 40%, paraules clau 40%, paraules prohibides 20%); es considera vàlida si score ≥ 70\. Els informes (ex. *docs/INFORME-PREGUNTES-CONTROL-2026-01-29.md*) han servit per prioritzar millores (delays entre peticions, priorització d'articles CONST_* en el RAG).

**Aprenentatge continu.** El sistema d'aprenentatge (*lib/aprenentatge/*, *aprenentatge-millora-sistema.ts*) analitza resultats de les preguntes de control i genera recomanacions; aquestes es converteixen en entrades (*aprenentatge.json*) que s'incorporen al corpus durant la unificació, de manera que el RAG pot recuperar "com s'ha de respondre" en casos on abans fallava.

**Mesures de seguretat i compliment.** Es van implementar verificacions (*lib/rag/quality-assessment.ts*) per divulgació d'IA, menció del model, advertències, supervisió humana i no assessorament legal; validació de qualitat (*lib/rag/response-quality.ts*) per detectar citacions inexistents; disclaimer a la interfície; i compliment de la Llei 29/2021 (documentació a *docs/MESURES-SEGURETAT-RESPOSTES.md*).

**Embeddings i generació.** Es va passar d'OpenAI a XLM-RoBERTa-base (*lib/embeddings/xlm-roberta.ts*, *docs/XLM-ROBERTA-SETUP.md*) per costos i privacitat; es documenta la futura migració a *roberta-base-ca-v2* (Projecte AINA). La generació es va provar inicialment amb Salamandra-7b-instruct (Colab), però no va resultar viable per a producció; per tant es va adoptar l'API de Groq amb **Llama 70B** (Llama-3.3-70B-Versatile), amb *lib/llm/index.ts* i *lib/llm/groq.ts*.

**Desplegament.** L'aplicació es construeix amb Next.js i es desplega a Vercel. Els fluxos queden documentats a *docs/* (COM-AFEGIR-ARTICLES-DES-DEL-PDF.md, PROCESSAR-DOCUMENTS-ANDORRA.md, INCORPORAR-DOCTRINA-APRENENTATGE.md, GENERAR-EMBEDDINGS.md, PREGUNTES-CONTROL.md, etc.) per reproductibilitat.

### 6.2. Metodologia i implementació (RAG, models, vectorial, stack)

#### 6.2.1. RAG (Retrieval-Augmented Generation): Fonaments i Seguretat Jurídica

L'arquitectura RAG no es considera aquí una simple elecció tècnica, sinó una **salvaguarda deontològica**. A diferència dels models de llenguatge "purs" que actuen com a sistemes tancats, el RAG desacobla el *coneixement* del *raonament*. Aquesta separació és crítica per transformar una IA generalista en una **IA estreta aplicada** que compleixi amb el **Reglament (UE) 2024/1689 (AI Act)** i el **Codi sobre l'Ètica de la IA d'Andorra (2024)**.

L'ampliació d'aquesta metodologia es fonamenta en els següents eixos:

**A. Mitigació de l'al·lucinació mitjançant el "grounding"**

La literatura acadèmica identifica l'al·lucinació com el risc principal en l'ús de LLMs en el dret (**Magesh et al., 2024**). Mitjançant el RAG, el sistema implementa el que es coneix com a *grounding* o ancoratge: la generació de text queda restringida estrictament als vectors recuperats per l'Arxiver (XLM-RoBERTa). Com assenyala **Dantart (2025a)** en el seu marc de governança "a prova de AI Act", el RAG permet una **abstenció calibrada**: si la cerca semàntica no troba una base normativa amb prou confiança estadística, el sistema ha de reconèixer la seva incapacitat per respondre en lloc d'especular, evitant així la creació de "pseudodret".

**B. Traçabilitat i cadena de custòdia normativa**

L'advertència de **Iago Andreu (2015)** sobre el risc que manuals acadèmics acabin substituint el codi s'aborda tècnicament mitjançant la **citació de font primària**. En cada interacció d'Hermes, el RAG injecta metadades que permeten a l'usuari visualitzar l'enllaç directe al text oficial. Això estableix una **arquitectura forense** on cada explicació en llenguatge planer és auditable. Seguint les mètriques proposades per **Guha et al. (2024)** en el *LegalBench*, el sistema garanteix que la "traducció" manté la relació de causalitat amb l'article vigent, protegint la sobirania del legislador davant la interpretació autònoma de la màquina.

**C. L'arquitectura de "Notebook" i el control humà**

Seguint el paradigma del "bloc de notes d'assistència" (**Westerman, 2023**), el RAG permet que el sistema operi com una interfície de consulta on l'usuari manté el control. El model no actua com una "caixa negra" (black box) —motiu pel qual es va limitar l'ús de sistemes com COMPAS (**Adams, 2025**) a Wisconsin—, sinó que ofereix una **explicabilitat per disseny (XAI)**. L'usuari no rep una "veritat absoluta", sinó una síntesi assistida d'una font que pot verificar en temps real.

**D. Actualització dinàmica i vigència temporal**

En una jurisdicció en evolució com l'andorrana, la capacitat del RAG per gestionar el **"time-travel normatiu"** és essencial. Permet actualitzar el corpus (per exemple, integrant noves modificacions de la Llei d'Inversió Estrangera) simplement indexant els nous documents, sense la necessitat de reentrenar els paràmetres del model de llenguatge (**Dantart, 2025a**). Això garanteix que la plataforma no ofereixi respostes basades en lleis derogades, un risc crític en els models que depenen exclusivament del seu entrenament estàtic.

**E. Optimització del RAG i veracitat supervisada**

Com s'exposa a l'anàlisi de **Dantart (2025b)**, el potencial dels LLM es veu amenaçat per una "generació endèmica d'alucinacions" que, tot i ser plausibles, són inconsistent amb les fonts legals autoritzades. Per contrarestar-ho, el sistema Dret Planer implementa tres nivells d'optimització RAG derivats de la recerca més recent:

1. **Filtrat de preprocessament (legal-specific chunking):** No s'utilitzen divisions de text genèriques, sinó unitats lògiques basades en l'estructura de la norma (articles, apartats i lletres). Això evita la pèrdua de context que, segons Dantart, és la causa principal de les al·lucinacions per "omissió de condicionalitat".
2. **Cerca semàntica de pas doble:** S'utilitza l'Arxiver (IA estreta) per identificar no només l'article sol·licitat, sinó també les "veus de context" i referències creuades. Això soluciona el problema de la "tensió fonamental" entre la probabilitat del model i la certesa de la norma.
3. **Abstenció i verificació post-generació:** El sistema incorpora el principi de **veracitat responsable**. Seguint l'evidència empírica de jurisdiccions comparades, si el model detecta una discrepància entre el text generat en llenguatge planer i el vector de la font oficial, el sistema està programat per a l'abstenció (**Dantart, 2025b**).

**F. El paradigma de l'"Augmented Lawyering"**

La implementació d'aquesta arquitectura respon a la transició cap a l'anomenada **advocacia augmentada** (**Armour et al., 2022; Dantart, 2025b**). En lloc d'una "IA salvadora" basada en un "pensament màgic" (**Strom, 2024**), el projecte aposta per una integració on la IA actua com una capa de mediació lingüística. Aquesta capa no genera dret, sinó que "re-codifica" la complexitat del *legalese* en un format digerible per a la ciutadania, mantenint la integritat del sistema judicial andorrà i protegint-lo contra la "caixa negra" algorítmica.

#### 6.2.2. Models: Embeddings i Generació

El sistema utilitza dos tipus de models:

**Embeddings (Fase 1 - Prova pilot)**: Per a la recuperació semàntica, la prova pilot utilitza el model XLM-RoBERTa-base, un model multilingüe que funciona localment. Aquest model transforma el text en representacions vectorials de 768 dimensions per a una cerca semàntica basada en el significat.

**Embeddings (Fase 2 - Millora prevista)**: Es preveu migrar al model roberta-base-ca-v2 del Projecte AINA (projecte-aina/roberta-base-ca-v2), un model entrenat específicament per al català amb un corpus de 34.89 GB, incloent documents governamentals i jurídics. S'espera que aquest model específic millori significativament la qualitat de la recuperació semàntica per a text jurídic en català.

**Generació de text**: Per a la generació d'explicacions accessibles, el sistema utilitza models de llenguatge gran que transformen el text jurídic recuperat en explicacions en llenguatge natural. Es va provar inicialment **Salamandra-7b-instruct** (BSC) en entorn Colab, però no va resultar viable per a producció; en l'estat actual el sistema utilitza **Llama 70B** (Llama-3.3-70B-Versatile) mitjançant l'API de **Groq**, garantint latència baixa i qualitat adequada per a respostes en llenguatge natural. Aquesta tria forma part de l'"adequació tecnològica" del sistema.

**Consideració Multilingüe (Català, Castellà i Francès)**

Tot i que el corpus és monolingüe (Constitució d'Andorra en català), l'ús de Llama 70B via Groq es justifica per la necessitat de generar respostes fluides i competents no només en català, sinó també en castellà i francès, donada la realitat lingüística i legal d'Andorra. Un model de gran capacitat permet la traducció i adaptació d'explicacions a les tres llengües amb alta qualitat, garantint que el sistema Hermes pugui servir a tots els ciutadans que interactuïn amb el text constitucional en les seves llengües de preferència.

#### 6.2.3. Emmagatzematge i Cerca Vectorial

Per a la prova pilot, s'ha optat per una implementació en memòria dels embeddings, emmagatzemats com a fitxers JSON pre-generats (constitucio-unified-embeddings.json). Aquesta tria es justifica per:

- **Tractabilitat del corpus**: Amb aproximadament 360 entrades (108 articles \+ 254 fragments de doctrina), el corpus és prou petit per ser carregat en memòria.

- **Simplicitat arquitectural**: L'absència de dependències externes (com bases de dades vectorials) redueix la complexitat i minimitza els costos operatius.

- **Rendiment adequat**: El càlcul de similitud cosinus sobre els vectors en memòria proporciona latències inferiors a 100ms.

Aquesta decisió implica limitacions d'escalabilitat; per a corpus substancialment més grans, es recomanaria migrar a una base de dades vectorial especialitzada.

#### 6.2.4. Stack Tècnic

El sistema està implementat utilitzant Next.js com a framework web, desplegat a Vercel. La interfície d'usuari, anomenada Hermes (en honor al déu grec de la comunicació i la interpretació), permet als usuaris interactuar amb el sistema mitjançant un xat per facilitar la comprensió del text constitucional.

### 6.3. Corpus i expansió

#### 6.3.1. Corpus Constitucional (108 entrades estructurades)

El corpus constitucional comprèn 107 articles i un preàmbul (108 entrades en total), organitzats segons l'estructura de la Constitució d'Andorra:

- Preàmbul

- Títol I - Sobirania d'Andorra (Articles 1-3)

- Títol II - Drets i llibertats (Articles 4-42)

- Títol III - Els Coprínceps (Articles 43-49)

- Títol IV - El Consell General (Articles 50-71)

- Títol V - El Govern (Articles 72-78)

- Títol VI - Estructura territorial (Articles 79-84)

- Títol VII - Justícia (Articles 85-94)

- Títol VIII - Tribunal Constitucional (Articles 95-103)

- Títol IX - Reforma de la Constitució (Articles 104-107)

Cada entrada inclou un Identificador únic, la Categoria (títol), el Text oficial en català i Metadades (data de vigència, referències a modificacions i conceptes clau).

#### 6.3.2. Expansió del Corpus: Incorporació de Doctrina i Aprenentatge

Per enriquir el corpus i millorar la capacitat interpretativa del sistema, s'ha incorporat doctrina jurídica rellevant.

- **Documents processats**: S'ha utilitzat l'obra col·lectiva "Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució" (Pere Pastor Vilanova, coord., 2014), que s'ha processat i dividit en 254 fragments estructurats.

- **Metodologia de processament**: Inclou segmentació intel·ligent, extracte automàtic de conceptes clau, estructuració de metadades (autor, font, any) i generació d'embeddings vectorials.

**Sistema d'Aprenentatge i Millora Contínua:**

El sistema incorpora un mecanisme d'aprenentatge basat en l'avaluació de preguntes de control per millorar contínuament:

- Execució de preguntes de control (43 preguntes en la versió actual).

- Anàlisi de resultats per identificar punts febles i errors recurrents.

- Generació de recomanacions prioritzades per millorar els prompts d'Hermes i la interpretació.

- Incorporació al corpus de les recomanacions com a entrades de coneixement indexades.

**Unificació del Corpus**: El corpus final unifica la Constitució d'Andorra, la Doctrina jurídica i les Recomanacions d'aprenentatge, enriquint la qualitat i precisió de les respostes.

### 6.4. Sistema de validació (preguntes de control, scores)

#### 6.4.1. 43 Preguntes de Control

El sistema de validació ha evolucionat fins a un conjunt de 43 preguntes de control, distribuïdes en quatre categories que cobreixen diferents aspectes de la Constitució i diferents nivells de complexitat:

- **Preguntes bàsiques**: Avaluació de la capacitat per identificar i explicar articles coneguts (5 preguntes).

- **Preguntes específiques**: Avaluació de la comprensió de conceptes jurídics concrets (5 preguntes).

- **Preguntes complexes**: Avaluació de la capacitat per integrar informació de múltiples articles o conceptes (5 preguntes).

- **Casos límits**: Avaluació de la capacitat per gestionar qüestions complexes o ambigües (5 preguntes).

#### 6.4.2. Criteris d'avaluació (Scores)

L'avaluació de cada resposta segueix un sistema de puntuació objectiu amb tres components:

- **Articles trobats (40% del score)**: Avaluació de la correcta identificació dels articles constitucionals rellevants.

- **Paraules clau (40% del score)**: Avaluació de la presència de la terminologia esperada per mantenir la precisió.

- **Paraules prohibides (20% del score)**: Penalització per la presència de termes o conceptes incorrectes.

Una pregunta es considera vàlida si l'score global és igual o superior a 70 punts i no hi ha errors crítics.

Aquesta metodologia és adequada per la seva objectivitat, la cobertura completa de la Constitució, la traçabilitat dels resultats i l'escalabilitat a altres normes.

### 6.5. Compliment normatiu

#### 6.5.1. Marc Andorrà: Llei 29/2021

El sistema compleix amb la Llei 29/2021 de protecció de dades d'Andorra, respectant els principis de licitud, lleialtat i transparència, minimitzant les dades personals processades i garantint la transparència en el tractament.

#### 6.5.2. AI Act (UE): Obligacions per a Sistemes de Risc Limitat

El sistema implementa totes les obligacions de transparència establertes per a sistemes de risc limitat segons l'AI Act:

- **Transparència**: Totes les respostes indiquen explícitament que han estat generades per intel·ligència artificial, especificant el model utilitzat.

- **Advertències adequades**: Les respostes inclouen advertències sobre les limitacions del sistema i el seu caràcter orientatiu.

- **Recomanació de Supervisió Humana**: Es recomana sempre consultar professionals titulats per a assessorament legal específic, especialment en casos complexos.

- **Clarificació de no Assessorament Legal**: Es deixa clar que la informació proporcionada no constitueix assessorament legal professional, sinó una eina d'assistència a la comprensió.

## 7. Conclusions

Cap a una sobirania jurídica i digital a Andorra  
El projecte Dret Planer neix de la intersecció entre la filosofia del dret i l'avantguarda de la intel·ligència artificial. Al llarg d'aquest treball, s'ha demostrat que la barrera cognitiva en l'accés a la justícia no és un mal endèmic del dret, sinó un repte tecnològic i lingüístic que avui podem superar.  
1\. Del text a la norma comprensible  
Seguint la doctrina d'Eros Grau, hem validat que la interpretació del dret no és un acte passiu. Mitjançant l'arquitectura RAG (Retrieval-Augmented Generation), hem creat un intèrpret artificial que no substitueix el jurista, sinó que actua com un mediador. La combinació de Llama 70B (via Groq) per a la generació i els models d'embeddings del Projecte Aina (o XLM-RoBERTa en fase pilot) garanteix que la "traducció" a llenguatge planer respecti la genuïnitat del dret andorrà.  
2. Sobirania i Seguretat Jurídica  
La tria de models open-source no és casual. En un context marcat per la Llei 29/2021 de protecció de dades personals i la necessitat de protegir la llengua oficial, Dret Planer es postula com un model de IA Sobirana. En lloc de dependre d'infraestructures externes i opaques, el projecte aposta per una tecnologia que pot residir a Andorra, per a Andorra i en la llengua d'Andorra.  
3. Impacte Social: El Dret a Comprendre  
L'aplicació de la Llei 6/2024 de llenguatge accessible troba en aquesta PoC la seva eina més eficaç. La interfície de cerca semàntica amb l'opció de simplificació sota demanda permet que el ciutadà passi de la perplexitat davant el text constitucional a la consciència del seu dret. Dret Planer tanca el cercle de la funció integradora del dret, assegurant que la Constitució no sigui només un text sagrat, sinó un document viu i comprensible per a tothom.  
En definitiva, Dret Planer demostra que la intel·ligència artificial, utilitzada amb rigor i sota el principi de subjecció a la llei, és l'aliat definitiu per assolir una justícia realment democràtica, transparent i, per damunt de tot, humana.  
---  
[1] En aquest article, XAI fa referència a “explainable artificial intelligence”, és a dir, tècniques que permeten entendre i fer transparent el funcionament dels models, sobretot dels black-box:  
Loyola-Gonzalez, O. (2019). Black-Box vs. White-Box: Understanding Their Advantages and Weaknesses From a Practical Point of View. IEEE Access, 7, 154096-154113. https://doi.org/10.1109/access.2019.2949286

---

## Bibliografia

Les referències segueixen el format APA 7a edició. Les fonts del corpus del projecte Dret Planer es detallen a *docs/REFERENCIES-APA7.md*.

**Normativa**

- Govern d'Andorra. (1993). *Constitució del Principat d'Andorra* (aprovada el 4 de maig de 1993). Butlletí Oficial del Principat d'Andorra, núm. 24, de 4 de maig de 1993.

- Govern d'Andorra. (s.d.). *Codi Civil d'Andorra*. [Text extret; document intern: docs/codi-civil-andorra.txt]

- Llei 6/2024, del 25 d'abril, de la llengua pròpia i oficial. Butlletí Oficial del Principat d'Andorra.

- Llei 29/2021, de protecció de dades personals. Butlletí Oficial del Principat d'Andorra.

- Reglament (UE) 2024/1689 del Parlament Europeu i del Consell, de 13 de juny de 2024, relatiu a l'establiment de normes harmonitzades en matèria d'intel·ligència artificial (AI Act).

- Govern d'Andorra. (2024). *Codi sobre l'Ètica de la Intel·ligència Artificial*. [Document de referència ètica per a l'ús de la IA a Andorra.]

**Doctrina (citada al text)**

- Adams, R. (2025). Algorithmic risk assessment and judicial limits: the case of COMPAS in Wisconsin. *Legal / judicial AI*. [Referència a la limitació d’ús de sistemes tipus caixa negra.]

- Andreu i Sotelo, I. (2015). Ponència sobre el sistema de fonts del dret privat andorrà. A Societat Andorrana de Ciències (Ed.), *Actes de les XIX Jornades de la Societat Andorrana de Ciències*. Societat Andorrana de Ciències.

- Armour, J., Parnham, R., & Sako, M. (2022). Augmented lawyering. *University of Illinois Law Review*.

- Argemí Ferrer, J. (2015). Ponència sobre usos i costums i identitat. A Societat Andorrana de Ciències (Ed.), *Actes de les XIX Jornades de la Societat Andorrana de Ciències*. Societat Andorrana de Ciències.

- Badia Gomis, F. (2015). Ponència sobre seguretat jurídica i coneixement del dret. A Societat Andorrana de Ciències (Ed.), *Actes de les XIX Jornades de la Societat Andorrana de Ciències*. Societat Andorrana de Ciències.

- Carretero González, C. (2020). El dret a comprendre: una exigència de la tutela judicial efectiva. *Revista de Dret Públic*.

- Choi, J. H., Hickman, K. E., Monahan, A. B., & Schwarcz, D. (2023). ChatGPT goes to law school. *Journal of Legal Education*, 71(3), 387–401.

- Dantart, A. (2025a). Gobernanza y trazabilidad "a prueba de AI Act" para casos de uso legales. *arXiv:2510.12830*.

- Dantart, A. (2025b). *Inteligencia Artificial Jurídica y el desafío de la veracidad: Análisis de alucinaciones y optimización de RAG*. Informe Técnico, Madrid.

- Forné Molné, M. (2015). Ponència sobre simplificació administrativa i justícia. A Societat Andorrana de Ciències (Ed.), *Actes de les XIX Jornades de la Societat Andorrana de Ciències*. Societat Andorrana de Ciències.

- Fuller, L. L. (1964). *The Morality of Law*. Yale University Press.

- Guha, N., et al. (2024). LEGALBENCH: A collaboratively built benchmark for measuring legal reasoning. *arXiv:2308.11462*.

- Hart, H. L. A. (1961). *The Concept of Law*. Oxford University Press.

- López Burniol, J. J. (2023). *La Constitució d'Andorra: Gènesi i Funció*; *Tradició i Constitució a Andorra*. Doctrina. [Document intern: docs/nous/burniol.txt]

- Magesh, V., et al. (2024). Hallucination-free? Assessing reliability of legal AI. *Legal AI / RAG*. [Referència a l’ús de RAG per restringir el context i minimitzar al·lucinacions en entorns jurídics.]

- Serra, J. (2015). *Identitat i integració a Andorra*. Institut d'Estudis Andorrans.

- Strom, R. (2024). Big Law is questioning the "magical thinking" of AI as savior. *Bloomberg Law*.

- Vilajosana, J. M. (2010). *La regla de reconeixement*. Marcial Pons.

- Westerman, H. (2023). La intel·ligència artificial en l’accés a la justícia: suport cognitiu i no substitut del jurista. *Doctrina / accés a la justícia*. [Referència al paradigma de la IA com a eina de suport cognitiu.]

**Doctrina i jurisprudència (corpus del projecte Dret Planer)**

Font principal i documents processats per al RAG (índex complet: *docs/REFERENCIES-APA7.md*):

- Becat, J. (1993). Emergencia i reconeixement d'Andorra com a Estat. *Doctrina*. [Document intern: docs/Emergencia i reconeixement d'Andorra.txt]

- Bassegoda Nonell, J. (2009). Joan Martí Alanis, bisbe d'Urgell, príncep d'Andorra. *Doctrina*. [Document intern: docs/Joan Martí Alanis, bisbe d'Urgell, prínc.txt]

- Soler Parício, P. (2010). De la consuetud a l'Estat de dret: La llarga resistència del Principat d'Andorra a la modernització política. *Doctrina*. [Document intern: docs/LA LLARGA RESISTÈNCIA DEL PRINCIPAT D'AN.txt]

- Pastor Vilanova, P. (Coord.). (2014). *Aspectes de la jurisprudència andorrana: Balanç de 20 anys de Constitució*. Universitat d'Andorra. [Document intern: docs/20 anys.txt]

- Lopez B. (2024). Comunicació Lopez B. *Doctrina*. [Document intern: docs/nous/COMUNICACIÓLopez-B.-VD.txt]

- Burniol. (2024). Article Burniol sobre sobirania. *Doctrina*. [Document intern: docs/nous/burniol.txt]

- Tribunal Constitucional d'Andorra. (2023). *Memòria 2023*. [Document intern: docs/nous/MEMÒRIA 2023 DEFINITIVA.txt]

- Tribunal Constitucional d'Andorra. (2024). *Memòria 2024*. [Document intern: docs/nous/MEMÒRIA 2024-3.txt]

- Autor desconegut. (2019). REC5 2019. *Doctrina*. [Document intern: docs/nous/rec5-2019.txt]

- Autor desconegut. (2020). La constitución andorrana y la ordenación territorial del poder público. *Doctrina*. [Document intern: docs/La constitución andorrana y la ordenación territorial del poder público.txt]

- Autor desconegut. (2024). Constitucionalisme i codificació. *Doctrina*. [Document intern: docs/nous/00000042.txt]

- Autor desconegut. (2024). Sobre usos, costums i el codi. *Doctrina*. [Document intern: docs/nous/00000043.txt]

- Pol, A. (2024). Ponència sobre codificació i veritat. *Doctrina*. [Document intern: docs/nous/00000045.txt]

- Autor desconegut. (2024). El Manual Digest i el Tribunal Europeu dels Drets Humans. *Doctrina*. [Document intern: docs/nous/00000050.txt]

- Autor desconegut. (2024). Les relacions internacionals d'Andorra des de la Constitució. *Doctrina*. [Document intern: docs/nous/Les relacions internacionals d'Andorra des de la Constituci.txt]

- Autor desconegut. (2024). Llibre complet dret processal civil. *Doctrina*. [Document intern: docs/nous/LlibreCompletDretProcessalCivil.txt]

- Autor desconegut. (2024). L'aplicació directa de les normes constitucionals. *Doctrina*. [Document intern: docs/nous/aplicació directa de les normes constitucionals.txt]

- Autor desconegut. (2024). Joan Martí Alanis, bisbe. *Doctrina*. [Document intern: docs/nous/joan-marti-alanis.txt]

- Autor desconegut. (2024). La sol·licitud dels bisbes d'Urgell. *Doctrina*. [Document intern: docs/nous/sollicitud-bisbes-urgell.txt]

**Referències tècniques**

- Projecte AINA: projecte-aina/roberta-base-ca-v2. Hugging Face. https://huggingface.co/projecte-aina/roberta-base-ca-v2

- Groq. Llama-3.3-70B-Versatile (Llama 70B) via API. https://groq.com

- Salamandra-7b-instruct (BSC) va ser provat per a generació però no es va adoptar en producció. Barcelona Supercomputing Center. https://huggingface.co/BSC-LT/salamandra-7b-instruct

- Retrieval-Augmented Generation (RAG) en aplicacions jurídiques.

- Models de llenguatge gran (Large Language Models) aplicats al dret.


Taula 2

| Nacionalitat | Població (aprox.) | % del total | Tendència (vs 2024\) |
| :---- | :---- | :---- | :---- |
| **Andorrana** | 39.730 | 44,6% | Lleuger augment (+0,9%) |
| **Espanyola** | 21.420 | 24,0% | Augment moderat (+2,0%) |
| **Altres nacionalitats** | 15.430 | 17,3% | Fort creixement (+8,0%)* |
| **Portuguesa** | 8.428 | 9,5% | Disminució (-1,2%) |
| **Francesa** | 4.050 | 4,6% | Lleuger augment |
| **TOTAL** | **89.058** | **100%** | **\+2,3%** |

Elaboració pròpia; Font Govern d’Andorra.

Taula 3

| Tipologia de visitant | Nombre (milions) | % del total | Impacte jurídic principal |
| :---- | :---- | :---- | :---- |
| **Excursionistes** (1 dia) | 5,8 M | 62% | Duanes, trànsit, consum |
| **Turistes** (pernoctació) | 3,5 M | 38% | Allotjament, taxa turística, esquí/muntanya |
| **TOTAL VISITANTS** | **9,3 M** | **100%** | **Interacció massiva amb la norma** |
| *Principals procedències* | *Espanya (48%), França (34%), Altres (18%)* |  | *Necessitat d'assistència multilingüe* |

Taula 4

| Dades del Referèndum (14 març 1993\) | Xifres |
| :---- | :---- |
| **Cens electoral (andorrans amb dret a vot)** | **9.123** |
| **Vots emesos (participació del 75,7%)** | **6.910** |
| **Vots a favor (Sí)** | **4.903 (74,2%)** |
| **Vots en contra (No)** | **1.706 (25,8%)** |
