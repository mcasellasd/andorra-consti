# La claredat constitucional com a tecnologia de planificació social: Intel·ligència Artificial consultiva i dret a comprendre al Principat d'Andorra

*Rampes cognitives per a l'accessibilitat jurídica ciutadana i de planificació social. Disseny, governança i validació empírica d'un sistema d'IA consultiva per a la reducció de barreres cognitives en el dret públic.*

*La comprensibilitat de les normes és una condició rellevant per a l’accessibilitat i l’efectivitat del dret. Aquesta qüestió adquireix una dimensió particular al Principat d’Andorra, on una única llengua oficial conviu amb una població socialment i lingüísticament diversa. Aquest estudi analitza si un sistema d’intel·ligència artificial consultiva de domini delimitat pot actuar com una rampa cognitiva per facilitar la comprensió de la Constitució —entesa com el pla compartit de l'ordenament— sense substituir la interpretació jurídica professional. Amb aquesta finalitat, es presenta Dret Planer, una prova de concepte trilingüe basada en una arquitectura de recuperació augmentada per generació (Retrieval-Augmented Generation, RAG). El sistema recupera fragments del corpus constitucional identificable i els utilitza com a context per generar explicacions en català, castellà i francès. L’estudi adopta un disseny d’estudi de cas orientat a l’avaluació del sistema i proposa comparar-lo amb una configuració sense recuperació documental mitjançant mètriques de pertinència, fidelitat, citació, abstenció i comprensibilitat. La hipòtesi de partida és que la delimitació del corpus, la traçabilitat de les fonts i la supervisió humana poden reduir determinats riscos de la IA generativa aplicada al dret. Tanmateix, la viabilitat tècnica no permet acreditar per si sola una millora de la cohesió jurídica o de la comprensió ciutadana. Aquests efectes requereixen una validació empírica específica i s’aborden en el treball com a possibles conseqüències, no com a resultats presumits.*

**Paraules clau:** dret a comprendre, claredat constitucional, intel·ligència artificial, RAG, Constitució d’Andorra, llenguatge planer, traçabilitat.

---

## Capítol I: Introducció — El Dret a la Claredat Constitucional en l'Era de la Intel·ligència Artificial

### 1. Delimitació filosòfica i la instrumentalitat teleològica del dret

Des d'una perspectiva de la filosofia jurídica contemporània, no cal entendre l'ordenament com una mera agregació de mandats imperatius, sinó com una manifestació de la instrumentalitat teleològica del poder. Aquesta premissa ens exigeix transcendir la visió del dret com una estructura estàtica per reconèixer-lo com un instrument dinàmic orientat a fins socials. En aquesta arquitectura conceptual, la comprensió de l'ordenament neix de la interacció dialèctica de la tricotomia proposada per Engliš i Oliveira Lima: el *Sein* (l'ésser o realitat fàctica), el *Sollen* (l'haver de ser normatiu) i el *Wollen* (la voluntat). És precisament el *Wollen* col·lectiu el que actua com a eix de coordinació i motor de legitimitat, transformant la voluntat social en la norma que ordena la convivència.

Aquesta voluntat troba la seva formalització més refinada en la *Planning Theory of Law* de Scott J. Shapiro (2011). Per a Shapiro, el dret no és una simple suma de mandats imperatius —superant així els models de Hart o Austin—, sinó una "tecnologia social de planificació". Sota aquesta llum, les lleis esdevenen "plans compartits" destinats a resoldre problemes de coordinació complexos. Tanmateix, perquè aquest "pla" sigui funcional, ha de ser comprensible. El *Wollen* que fonamenta el pla es buida de contingut si el destinatari no pot desxifrar-ne la lògica interna. La transició d'un model imperatiu a un de planificació desplaça el centre de gravetat cap a la cognoscibilitat: la legitimitat del dret contemporani resideix en la capacitat de l'agent per comprendre el rumb del pla compartit, garantint que l'adhesió a la norma no sigui fruit de l'obediència cega, sinó de l'agència conscient.

### 2. El dret a comprendre com a requisit de legitimitat i dignitat

La claredat normativa no és una qüestió de purisme lingüístic, sinó una condició ontològica de la dignitat humana i un pressupòsit democràtic. Lon Fuller (1964), en definir la "moralitat interna del dret", va establir vuit requisits *sine qua non* per a l'existència de qualsevol sistema jurídic. Entre ells, la claredat destaca com la salvaguarda contra l'arbitrarietat. Un ordenament incomprensible no és només un error de gestió; és un col·lapse de la moralitat interna que invalida el dret com a guia de conducta. Quan el ciutadà s'enfronta a la "foscor administrativa" —fenomen denunciat per Xavier Cañada respecte a documents de la CASS—, no només pateix una indefensió material, sinó una erosió de la seva condició com a agent racional.

En el marc del Principat, aquest imperatiu s'enclava en l'article 10 de la Constitució d'Andorra. Seguint la distinció de Francesc Badia, el dret a la jurisdicció abasta tant el "procés degut" com el "judici equitable". La legitimitat d'una sentència o d'un acto administratiu no depèn només de la seva legalitat formal, sinó de si supera el "cànon de constitucionalitat": la resposta del poder ha de ser lògica, no absurda ni arbitrària. Un dret fosc és, per definició, arbitrari. La Llei 6/2024 de claredat normativa neix precisament per rescatar el ciutadà de la seva condició de receptor passiu i posicionar-lo, en termes de Waldron, com un "agent actiu". Sense claredat, el procés degut és una entelèquia.

Així, establim els tres pilars de la legitimitat cognitiva:

1. **Cognoscibilitat:** La possibilitat real d'accedir i processar la norma.
2. **Estabilitat:** La predictibilitat que impedeix la mutació arbitrària del pla.
3. **Claredat interpretativa:** L'absència d'una opacitat tècnica que generi indefensió.

### 3. El cas d'Andorra: Tensió sociolingüística i vulnerabilitat cognitiva

Andorra presenta una singularitat sociològica que posa a prova la "Regla de Reconeixement" de Hart. Si aquesta regla és el consens fonamental que identifica què és dret, la seva validesa trontolla en una societat on el 55% de la població és immigrant (Serra, 2024). La tensió entre l'oficialitat del català i el trilingüisme funcional del dia a dia genera una "capa de vulnerabilitat cognitiva" (Luna/Agüero) on la similitud de les llengües romàniques sovint camufla una opacitat tècnica absoluta.

Un exemple paradigmàtic d'aquesta fractura és el debat sobre la naturalesa jurídica de la llegítima (Daniel Arqués). Com pot el ciutadà mitjà comprendre la seva posició successòria si l'acadèmia i la jurisprudència han divergit durant dècades sobre si la llegítima és una *pars hereditatis* (dret real) o una *pars valoris* (dret de crèdit)? Aquesta complexitat no és un ornament acadèmic; és una barrera que impedeix el *joint commitment* de Margaret Gilbert. Sense una comprensió compartida del "pla mestre" que és la Constitució de 1993 (López Burniol, 2023), l'adhesió social s'erosiona, transformant el dret en un sistema d'instruccions opac per a una majoria de la població.

| Riscos d'Opacitat Normativa | Impacte en l'Adhesió Social |
| --- | --- |
| Complexitat Tècnica (Ex. Llegítima) | Alienació del ciutadà; el dret esdevé un enigma per a iniciats. |
| Falsa Transparència Lingüística | Inexistència de consens real (*Rule of Recognition*) en poblacions no socialitzades. |
| Opacitat Administrativa (CASS) | Erosió de la dignitat ontològica i de la confiança institucional. |

### 4. La Intel·ligència Artificial com a 'Rampa Cognitiva' i el risc d'Incapacitació Digital

Davant d'aquesta fractura, la Intel·ligència Artificial (IA) apareix sota el concepte de "Rampa Cognitiva" de Richard Susskind: una eina d'accessibilitat per garantir l'*Access to Justice*. L'ús de models de Generació Augmentada per Recuperació (RAG) pot reduir els costos de descodificació de la densa doctrina constitucional. Tanmateix, des d'una perspectiva de filosofia del dret, cal introduir una tensió dialèctica essencial: la mediació algorítmica no és neutra. Cristina Caja Moya adverteix sobre el risc d'una "incapacitació digital generalitzada" i la "colonització del món de la vida" (Habermas).

Si substituïm la deliberació humana per l'optimització computacional, correm el risc de dissoldre les condicions antropològiques de la persona (Nancy/Merleau-Ponty). Per evitar aquesta "tutela algorítmica", la IA s'ha d'integrar sota el principi de la *phronesis* (Flyvbjerg) i respectar la "textura oberta" del dret (Waismann). La tecnologia ha de ser consultiva, un mitjà per a l'agència i no un substitut de la voluntat. En aquest sentit, la Doctrina del Doble Document (Julià Pijoan, 2025; Matamala, 2024) proposa una via de conciliació: el text tècnic garanteix la seguretat jurídica, mentre que el resum planer generat per IA actua com el pont que permet al ciutadà reconèixer-se en el pla jurídic sense perdre's en el seu laberint terminològic.

### 5. Formalització de la recerca: Preguntes i Hipòtesis

Aquesta tesi doctoral s'articula sobre la necessitat de restaurar la claredat como a pilar de la democràcia deliberativa. La recerca buscarà respondre si la IA pot mitigar la vulnerabilitat cognitiva sense comprometre l'autonomia civil de l'individu. El full de ruta es formalitza en les següents hipòtesis:

- **H1:** Existeix una correlació positiva entre la claredat normativa percebuda i la legitimitat que el ciutadà atribueix a l'ordenament, entesa com l'acceptació del "pla compartit" de Shapiro.
- **H2:** L'aplicació de sistemes d'IA (Rampa Cognitiva) redueix efectivament la vulnerabilitat cognitiva en societats amb alta diversitat lingüística i tècnica (cas d'Andorra).
- **H3:** La implementació de la doctrina del "Doble Document" manté la seguretat jurídica material alhora que garanteix el dret a comprendre del ciutadà.
- **H4:** La millora de la cognoscibilitat normativa a través de la IA enforteix la *Regla de Reconeixement* en societats amb un percentatge significatiu de població no socialitzada en el dret autòcton.
- **H5:** Els models de Generació Augmentada per Recuperació (RAG) optimitzen la interpretació de la doctrina constitucional andorrana (segons els cànons de Pastor Vilanova), oferint una eina consultiva que respecta la independència del criteri judicial.

En darrera instància, aquesta proposta defensa que la tecnologia no ha de tancar l'imaginari social, sinó obrir-lo. Garantir que cada ciutadà pugui comprendre el dret que el regeix és defensar la salut de la democràcia i la vigència de la dignitat humana davant la temptació d'una eficiència purament algorítmica.

---

## Capítol II: El dret a comprendre en l'estat social i democràtic de dret

La claredat normativa no s'ha d'entendre com una simple qüestió d'estètica lingüística o un ornament procedimental, sinó com un actiu estratègic estructural per a l'estabilitat del sistema jurídic i la seguretat de la ciutadania. En el marc de l'Estat social i democràtic de dret que proclama l'article 1 de la nostra Constitució, la capacitat del subjecte per comprendre les normes que regeixen la seva conducta s'erigeix en la premissa ontològica de l'obediència legítima. Tal com hem sostingut des de la càtedra, sense un llenguatge clar, la seguretat jurídica esdevé una entelèquia i el vincle de confiança entre les institucions i el ciutadà s'erosiona, transformant la norma en un mecanisme d'exclusió sistèmica en lloc de ser un vehicle d'integració.

### 1. Fonamentació teòrica i dogmàtica: De l'opacitat a la claredat jurídica

El trànsit d'un dret críptic, tancat en el seu propi tecnicisme, cap a un "dret planer" representa un canvi de paradigma en la relació entre l'Estat i l'individu. Històricament, l'hermenèutica jurídica ha estat el domini d'una elit tècnica; no obstant això, les exigències contemporànies de transparència i l'evolució dels drets fonamentals postulen que el dret ha de ser accessible, per definició, a la ciutadania a qui va dirigit.

#### 1.1. L'imperatiu de claredat i el deure de l'emissor

L'anàlisi de la moralitat interna del dret proposada per Fuller (1964) establia ja que una norma inintel·ligible no posseeix la capacitat d'obligar moralment. En aquesta línia, la màxima clàssica *ignorantia iuris non excusat* ha de ser objecte d'una relectura sota la llum de l'Estat constitucional: si el ciutadà té el deure de conèixer la llei, l'Estat té el deure correlatiu i previ de fer-la comprensible. La claredat, per tant, no esdevé una opció discrecional per a l'Administració, sinó un requisit de legitimitat que estatueix la norma com a tal. Desenvolupant la conceptualització del deure de l'Administració com a emissora de comunicacions (Carretero González, 2020; Vallespín Pérez, 2025), el ciutadà deixa de ser un subjecte passiu per esdevenir un receptor actiu d'un missatge que ha de poder descodificar per exercir la seva autonomia. Segons la doctrina de Burgos Martínez (2025), el "deure de l'emissor" s'estructura en les dimensions següents:

- **Dimensió d'accessibilitat:** El missatge ha de ser accessible tant en format físic com digital, garantint la seva disponibilitat universal.
- **Dimensió d'intel·ligibilitat:** L'estructura sintàctica i el lèxic emprat han de permetre la comprensió immediata del nucli del dret o l'obligació.
- **Dimensió de seguretat jurídica:** La claredat ha d'eliminar les ambigüitats que generin incertesa o interpretacions contradictòries.
- **Dimensió d'eficàcia comunicativa:** L'emissor ha d'assegurar que el canal i el to s'ajusten al perfil del destinatari per garantir la recepció del missatge.

#### 1.2. La inintel·ligibilitat com a barrera cognitiva i causa d'indefensió

El llenguatge jurídic opac opera com una "barrera cognitiva" que fractura l'accés efectiu a la justícia. Quan un ciutadà es troba davant d'una resolució administrativa o judicial que no pot comprendre, s'esdevé una "indefensió material" que buida de contingut qualsevol garantia formal. Com indiquen Cucurull i Salom (2024), si el destinatari no copsa els motius de fons d'una decisió, se li nega la facultat real de rebatre-la amb arguments lògics. Aquesta barrera cognitiva és un obstacle per a la tutela efectiva i exigeix l'adopció d'estàndards internacionals que blindin la comprensió com un dret humà transversal i previ a qualsevol debat processal.

### 2. El marc iberoamericà i l'emergència de la "justícia cognitiva"

Andorra s'insereix de ple en l'espai judicial iberoamericà, un entorn que ha estat pioner en la teorització sobre la proximitat del llenguatge jurídic. Aquesta participació influeix decididament en els estàndards nacionals de transparència i en la configuració d'una administració de justícia que cerca la seva legitimitat en la comprensió per part del ciutadà.

#### 2.1. La Declaració d'Asunción (2016) i la legitimitat judicial

La Declaració d'Asunción (2016) postula una vinculació indissoluble entre la claredat de les resolucions i la confiança pública en la judicatura. Perquè el poder judicial sigui percebut com a legítim, cal que les seves decisions no només siguin legalment correctes, sinó que siguin explicades amb una claredat que permeti al ciutadà entendre els perquès de la decisió. En aquest sentit, és imperatiu recordar el principi de la "Justícia Aparent" (*Justice must not only be done, but be seen to be done*), derivat de la jurisprudència del TEDH en afers com *Kress c. França* o *Lobo Machado c. Portugal*. La justícia no és completa si la seva raó de ser resta oculta rere un llenguatge inintel·ligible.

#### 2.2. Les Regles de Brasília i la vulnerabilitat cognitiva

L'accés a la justícia ha d'atendre de manera preferent les persones en situació de vulnerabilitat. Les Regles de Brasília recorden que la vulnerabilitat no és només física o econòmica, sinó també cognitiva.

| Tipus de vulnerabilitat cognitiva | Mesura de mitigació proposada per les Regles de Brasília |
| --- | --- |
| Manca de coneixements jurídics | Ús de llenguatge planer i definició pedagògica de conceptes tècnics. |
| Dificultats de comprensió lectora | Adaptació de les resolucions a formats de Lectura Fàcil o suports visuals. |
| Vulnerabilitat lingüística | Garantia d'interpretació i ús de la llengua oficial com a claredat extrema per a residents no catalanoparlants. |
| Edat (menors o gent gran) | Ajustament del vocabulari i del to segons l'etapa vital per assegurar la percepció de les conseqüències del procés. |

Aquesta taula de mitigació és especialment rellevant a Andorra, on l'alta taxa d'immigració incrementa el risc d'exclusió per motius de comprensió lingüística i jurídica.

### 3. L'arquitectura del dret a comprendre al Principat d'Andorra

L'article 10 de la Constitució (CA) representa la clau de volta de la tutela judicial efectiva. Aquest precepte no només garanteix l'accés als tribunals, sinó que exigeix una resposta fonamentada en Dret i un procés degut, elements que resulten buits de sentit sense una comprensió efectiva.

#### 3.1. El fonament constitucional: L'Article 10 CA i l'Article 6 CEDH

La jurisprudència constitucional andorrana ha fixat un "cànon de constitucionalitat" molt precís en relació amb el dret a obtenir una decisió fonamentada. Segons STC 1996-9-RE i ATC 2010-10-RE, una resolució vulnera el dret a la jurisdicció si manca d'un "raonament mínim", si aquest és "lògicament inconsistent" o si resulta "arbitrari o absurd". Des d'aquesta perspectiva, l'opacitat del llenguatge és sovint el preludi de l'arbitrarietat. Badia Gomis (2014) destaca que el "judici equitable" (Art. 6 CEDH) requereix una igualtat d'armes que desapareix quan el llenguatge s'utilitza com a eina de poder. La incomprensió de resolucions de gran impacte —com les de la CASS o l'Administració Tributària— genera una indefensió material que el Raonador del Ciutadà, Xavier Cañada, ha denunciat reiteradament. Si el ciutadà no entén per què se li denega una prestació o se li imposa una càrrega, la justícia esdevé una mera formalitat sense legitimitat real.

#### 3.2. El desplegament legislatiu: La Llei 6/2024 i el marc digital

Andorra ha consolidat aquest dret mitjançant un marc normatiu avançat:

- **Llei 6/2024 (Llei de la llengua pròpia):** Estatueix l'obligació que l'Administració de Justícia i el sector públic utilitzin un llenguatge "accessible, acurat i comprensible". Aquí, el català no és només un símbol identitari, sinó un vehicle de drets.
- **Llei 42/2022 i Decret 202/2024:** En l'àmbit digital, aquestes normes busquen evitar que la complexitat de les interfícies o l'opacitat dels algoritmes suplantin la voluntat del ciutadà. Així mateix, hem de vincular la claredat amb la seguretat jurídica a llarg termini. L'anàlisi de Pere Pastor sobre l'*Usatge Omnes Causae* i el seu termini de prescripció de 30 anys ens recorda que la claredat i el temps són vectors de la mateixa equació: si la norma no és clara, el pas del temps només fa que augmentar la incertesa i la indefensió del deutor.

### 4. Cohesió social i llengua oficial: El català clar com a rampa cognitiva

Dins la realitat sociolingüística del Principat, la llengua oficial ha de ser el vehicle principal de garantia de drets (Arts. 5 i 2.1 CA). El català clar no és una versió degradada de la llengua, sinó la seva versió més eficaç i inclusiva.

#### 4.1. Multilingüisme i integració: L'anàlisi de Serra (2024)

Serra (2024) ens adverteix contra la "falsa transparència": un text pot ser gramaticalment correcte però cognitivament impenetrable per a un ciutadà no expert. El "català clar" s'ha de considerar una "rampa cognitiva", un concepte que des d'aquesta càtedra definim com una premissa ontològica de l'Estat social. Sense aquesta rampa, els ciutadans amb menys recursos culturals o lingüístics queden exclosos de la protecció de l'Estat.

#### 4.2. Contra la marginació jurídica: El dret a la llengua pròpia comprensible

La claredat és un antídot contra la marginació. En una societat diversa, l'ordre constitucional només es manté si tots els seus membres senten que la llei els parla directament. Per tant, la claredat lingüística és essencial per a la cohesió i per evitar la desconnexió ciutadana respecte de les institucions.

### 5. El model de "Doble Document" i la mediació algorítmica supervisada

La recerca de la claredat no ha de comprometre en cap cas el rigor tècnic ni la seguretat jurídica. El repte és conciliar la precisió amb l'accessibilitat.

#### 5.1. La doctrina del doble document (Julià Pijoan, 2025; Matamala, 2024)

Aquesta doctrina proposa la convivència de dos formats: la resolució canònica, amb tot el seu rigor terminològic necessari per a la seguretat jurídica i la impugnació tècnica, i el resum de lectura fàcil, que garanteix l'eficàcia comunicativa. Aquest model assegura que el ciutadà conegui l'essència de la decisió sense dependre exclusivament d'una mediació externa.

L'ús de la IA (IA estreta) per a la simplificació de textos planteja reptes de gran calat sobre l'autonomia civil. Caja Moya (2025) adverteix sobre el risc de la "tutela algorítmica". Hem de considerar la "Analogia del dau": si algú decideix la seva vida tirant un dau, l'acte de decisió s'ha externalitzat a una màquina d'atzar, però l'agent manté la responsabilitat de la tria. En canvi, els sistemes d'IA que actuen com a "companions" o assistents permanents poden modelar la voluntat mateixa de l'individu, substituint la racionalitat pràctica (l'autonomia kantiana) per una racionalitat instrumental d'eficiència opaca. S'han de considerar riscos específics com:

- "Robo-advisors" en el sector financer, on la delegació de la decisió pot ocultar vicis del consentiment.
- IA en els processos de selecció, on els biaixos algorítmics poden generar discriminacions indetectables pel destinatari.

Per tot això, qualsevol ajust raonable mitjançant IA per a la generació de versions planeres ha d'estar sota una estricta supervisió humana. El dret a comprendre no pot ser sacrificat a l'altar de l'automatització. En conclusió, el dret a comprendre es confirma com un pilar de la democràcia del segle XXI al Principat d'Andorra, garantint que el Dret continuï sent un instrument al servei de la llibertat humana i no un sistema de control inintel·ligible.

### 6. Conclusions: Cap a una Dogmàtica de la Transparència Algorítmica

L'ordenament jurídic d'Andorra es troba en una cruïlla on la validesa formal heretada del 1993 ja no és suficient per garantir la seva legitimitat. La integració de les teories de Hart sobre la regla de reconeixement, de Shapiro sobre la planificació social i de Gilbert sobre el compromís conjunt ens indica que el futur del dret al Principat passa per una "dogmàtica de la transparència". La intel·ligència artificial ha d'actuar com una infraestructura que permeti al 55,4% de residents i a tota la ciutadania comprendre efectivament el "pla" que regeix les seves vides.

Tanmateix, com conclou Cristina Caja Moya, hem de ser vigilants davant la "crisi ontològica" que la tecnologia pot introduir en les categories jurídiques modernes. L'actualització de l'ordenament no ha de permetre que la mediació algorítmica substitueixi la responsabilitat humana. El dret privat i públic andorrà a l'era de l'IA només serà legítim si preserva els espais de deliberació democràtica, garantint que el control final sobre les decisions normatives segueixi residint en el subjecte moral i no en el codi binari. La sobirania d'Andorra, en darrera instància, dependrà de la seva capacitat per mantenir una justícia que, tot i ser tecnològicament avançada, segueixi sent profundament humana, clara i accessible.

---

## Capítol III: La Regla de Reconeixement, l'Agència Compartida i la Realitat Sociolingüística d'Andorra

### 1. Fonaments de l'Ordenament: La Regla de Reconeixement i la Coordinació Social

L'establiment de la validesa d'un sistema jurídic no pot residir exclusivament en la seva arquitectura formal, sinó en la pràctica convergent dels seus operadors. En el cas d'Andorra, la transició des de la legitimitat consuetudinària i carismàtica dels Pareatges cap a una legitimitat racional-legal constitucional representa un canvi de paradigma en la seva "Regla de Reconeixement". Seguint la tesi de H.L.A. Hart (1961), aquesta regla no és una disposició escrita, sinó una convenció social complexa que permet als batlles i magistrats identificar les normes vàlides. Com han analitzat David Lewis (1969) i Josep M. Vilajosana (2003), aquesta convenció actua com una solució a un problema de coordinació: el dret neix i es manté perquè els operadors jurídics coordinen les seves expectatives sobre quines fonts han de regir la conducta social.

En la dogmàtica andorrana, aquesta coordinació ha estat històricament subtil. La jurisprudència, tal com subratlla Pere Pastor Vilanova, ha estat l'instrument de consolidació del sistema de fonts, integrant el passat medieval amb la modernitat. Segons el sistema de fonts fixat per la jerarquia normativa (Abril Campoy, 2014) i l'Edicte de 15 de novembre de 1975, l'ordenament s'estructura de la següent manera:

1. **Lleis pròpies:** Les aprovades pel Consell General, incloent-hi el dret català anterior al Decret de Nova Planta (1716).
2. **Costum:** Font subordinada a la llei però essencial en la tradició pirinenca.
3. **Dret Comú:** Integrat pel dret canònic (Decretals de Gregori IX) i el dret romà.

Aquesta estructura tanca el sistema sota una unitat de sentit que, tanmateix, requereix una planificació deliberada per part de l'Estat per evitar que la norma esdevingui una "caixa negra" inaccessible per a la ciutadania.

### 2. La "Planning Theory of Law": El Dret Andorrà com a Tecnologia Social

L'evolució jurídica del Principat pot analitzar-se com la transició d'un dret consuetudinari —recollit en la saviesa pràctica del *Manual Digest* de Fiter i Rossell— cap a un marc de planificació social racionalitzat. Sota l'òptica de la *Planning Theory of Law* de Scott J. Shapiro (2011), l'ordenament jurídic és un "pla compartit" destinat a resoldre dubtes morals i conflictes de coordinació. La Constitució de 1993, en el seu Article 85, consagra el principi d'unitat jurisdiccional, posant fi a la "incongruència" —en paraules d'Enric Casadevall— de coexistir quatre jurisdiccions superiors independents. Aquesta unificació és l'expressió màxima de la racionalització del pla: l'Estat planifica l'exercici de la justícia per garantir la seguretat jurídica.

Si el dret actua com una tecnologia de planificació social, l'accessibilitat cognitiva a aquest pla no és un luxe, sinó un requisit de legitimitat. Un pla que no pot ser comprès pels seus destinataris perd la seva capacitat de guiar la conducta i esdevingui un exercici de poder arbitrari. L'evolució normativa andorrana es pot sintetitzar en tres estadis:

1. **Estadi Medieval (Pareatges de 1278 i 1288):** Fonamentat en la cosobirania i un sistema de justícia fragmentat entre veguers i batlles.
2. **Transició de 1991:** Racionalització administrativa amb la creació del Tribunal Superior de Corts i la jurisdicció administrativa, iniciant la superació del model medieval.
3. **Consolidació Constitucional (1993-Actualitat):** Establiment de la unitat i exclusivitat jurisdiccional (Art. 85) i creació del Tribunal Constitucional com a intèrpret suprem del pla de convivència.

Aquesta planificació només assoleix la seva plenitud si el subjecte plural accepta internament el pla com a guia normativa.

### 3. Acceptació Interna i Compromís Conjunt en una Societat Plural

L'estabilitat de l'Estat andorrà depèn del "punt de vista intern" (Hart), on la norma s'accepta per la seva autoritat legítima i no pel simple càlcul instrumental del "bad man" de Holmes. Margaret Gilbert proposa el concepte de "joint commitment" (compromís conjunt) per explicar com un grup humà es converteix en un subjecte plural. No obstant això, Andorra presenta un repte sociològic majúscul: el 55,4% de la població és d'origen immigrant i no va participar en la gènesi del pla constitucional de 1993.

En aquest context, la mediació algorítmica mitjançant intel·ligència artificial (IA) no s'ha d'entendre només com una eina d'eficiència, sinó com una infraestructura epistèmica que facilita la transparència de la norma suprema. Tanmateix, cal advertir, seguint Cristina Caja Moya, que els sistemes d'IA no són neutres; són "dispositius de subjectivació" que poden alterar la voluntat. El risc és que la IA substitueixi la deliberació moral per la mera optimització predictiva, creant una "incapacitació digital" on el resident ja no entén el dret, sinó que se sotmet a una recomanació algorítmica opaca. El compromís conjunt requereix que la tecnologia actuï com un pont que fomenti l'autonomia i no com una tutela paternalista que anul·li la capacitat d'obrar del ciutadà.

### 4. Capes de Vulnerabilitat Cognitiva i el Deure Actiu de l'Estat

La vulnerabilitat en l'accés a la justícia no és una etiqueta estàtica, sinó una condició dinàmica que emergeix en la interacció amb el sistema. Florencia Luna (2009) descriu les "layers of vulnerability" (capes de vulnerabilitat) que poden superposar-se sobre un individu. A Andorra, el tecnicisme del català jurídic configura una barrera cognitiva significativa. Existeix, a més, una "falsa transparència" (Agüero) en els residents d'origen romànic: la similitud lingüística oculta una incomprensió profunda de conceptes dogmàtics específics, com la naturalesa de la llegítima —entesa com a *pars valoris bonorum* i no com a *pars hereditatis* (Arqués Tomàs, 2014)—, generant una vulnerabilitat invisible.

> "L'Estat andorrà, en virtut de l'Article 6 de la Constitució (igualtat material), té el deure actiu de dissenyar 'rampes cognitives'. La implementació de sistemes de IA (RAG) no s'ha de veure com un mecanisme de 'cura' que substitueixi la voluntat —risc de paternalisme algorítmic advertit per Caja Moya—, sinó com una eina per potenciar l'autonomia civil. El deure de l'Estat és garantir que l'algoritme exposi la norma al debat públic i no la segresti en una opacitat tecnocràtica."

Aquesta visió transforma el paper de l'Estat de garant formal a facilitador actiu de la comprensió jurídica.

### 5. Realitat Sociolingüística Polièdrica i el Prototip de RAG Trilingüe

Andorra presenta una realitat trilingüe *de facto* que contrasta amb l'oficialitat exclusiva del català (Art. 2.1). La tensió entre la norma i l'ús real de castellà i francès pot derivar en una exclusió si el ciutadà no comprèn els fonaments del seu propi dret privat. El català clar esdevé, doncs, un capital social indispensable per a la cohesió. La solució tecnològica proposada és un prototip de Retrieval-Augmented Generation (RAG) que permeti consultes en trilingüe però mantenint el *grounding* (ancoratge) estricte en el literal de la llei i la jurisprudència en català.

| Risc de l'Exclusió Lingüística | Oportunitat de l'IA Consultiva |
| --- | --- |
| **Substitució de la subjectivitat:** El ciutadà delega la seva voluntat en interpretacions alienes per falta de comprensió. | **Reforç de l'autonomia civil:** La IA tradueix la complexitat dogmàtica sense alterar la voluntat del subjecte. |
| **Crisi ontològica del dret:** La norma perd el seu caràcter de guia de conducta i esdevé un impediment tècnic. | **Responsabilitat moral:** La claredat algorítmica permet al ciutadà assumir les conseqüències dels seus actes jurídics. |
| **Erosió de la sobirania lingüística:** El desús del català en l'àmbit privat per incomprensió del seu tecnicisme. | **Preservació de la llengua oficial:** El català es manté com la font única de veritat mentre la IA n'assegura l'accessibilitat. |

L'ús d'aquesta tecnologia és legítim només si evita convertir-se en una "caixa negra" que oculti decisions normatives fonamentals sota una capa de neutralitat tècnica.

### 6. Conclusions: Cap a una Dogmàtica de la Transparència Algorítmica

L'ordenament jurídic d'Andorra es troba en una cruïlla on la validesa formal heretada del 1993 ja no és suficient per garantir la seva legitimitat. La integració de les teories de Hart sobre la regla de reconeixement, de Shapiro sobre la planificació social i de Gilbert sobre el compromís conjunt ens indica que el futur del dret al Principat passa per una "dogmàtica de la transparència". La intel·ligència artificial ha d'actuar com una infraestructura que permeti al 55,4% de residents i a tota la ciutadania comprendre efectivament el "pla" que regeix les seves vides.

Tanmateix, com conclou Cristina Caja Moya, hem de ser vigilants davant la "crisi ontològica" que la tecnologia pot introduir en les categories jurídiques modernes. L'actualització de l'ordenament no ha de permetre que la mediació algorítmica substitueixi la responsabilitat humana. El dret privat i públic andorrà a l'era de l'IA només serà legítim si preserva els espais de deliberació democràtica, garantint que el control final sobre les decisions normatives segueixi residint en el subjecte moral i no en el codi binari. La sobirania d'Andorra, en darrera instància, dependrà de la seva capacitat per mantenir una justícia que, tot i ser tecnològicament avançada, segueixi sent profundament humana, clara i accessible.

---

## Capítol IV: El Marc Teòric-Jurídic de la Intel·ligència Artificial i els Principis de Governança Pública a Andorra

### 1. Fonamentació Conceptual: La Dicotomia entre la IA Estreta i la IA Generativa

L'actual estadi del progrés tecnològic ens obliga a traçar una frontera dogmàtica nítida entre la Intel·ligència Artificial (IA) Estreta i la IA Generativa. Mentre que la IA Estreta se circumscriu a l'execució de tasques programades i objectius prefixats (López de Mántaras, 2017), la IA Generativa opera mitjançant models probabilístics de gran escala que desafien la noció clàssica de producció intel·lectual i seguretat jurídica.

L'ús de la IA "en cru" —sistemes que operen sense una capa de control normatiu— comporta riscos ontològics derivats de la seva naturalesa estocàstica. Aquests models no "comprenen" el Dret, sinó que prediuen cadenes de caràcters (*strings*) basades en probabilitats estadístiques. Aquesta predicció seqüencial és inherentment incompatible amb la certesa que exigeix l'ordenament jurídic, generant el que s'anomena "Large Legal Fictions" (Dahl et al., 2024): estructures discursives amb aparença de legalitat però mancades de validesa normativa. Des d'una perspectiva dogmàtica, l'opacitat de les "caixes negres" representa una vulneració directa del Deure de Motivació (Article 10 de la Constitució d'Andorra). Si un jutge o administrador no pot desgranar el *perquè* d'una suggerència algorítmica, la decisió esdevé arbitrària i, per tant, inconstitucional sota els estàndards del procés degut i el principi de "proves practicades sota contradicció" (Badia Gomis, 2014).

Així mateix, la mediació algorítmica intensiva pot derivar en una "incapacitació digital" (Caja Moya, 2025). En el context de la reforma de la capacitat jurídica (Llei 8/2021), la IA podria actuar com una *curatela representativa de facto*, on l'autonomia de la voluntat és substituïda per una optimització de resultats aliena a la deliberació moral del subjecte.

Els perills ontològics per al Dret es sintetitzen en:

- **Fabricació de normes inexistents:** La generació estocàstica de referències normatives o jurisprudencials apòcrifes.
- **Al·lucinació de l'usuari i biaix d'automatització:** La tendència acrítica a considerar el sistema com un oracle de veritat absoluta, erosionant el dret a la informació i la tutela judicial efectiva.
- **Pèrdua de la deliberació moral:** La substitució del discurs pràctic i la responsabilitat individual per una racionalitat instrumental i predictiva que buida de contingut la dignitat humana.

### 2. L'Arquitectura RAG com a Dret Planer Tecnològic i "Responsible AI by Design"

Per mitigar la naturalesa al·lucinatòria de la IA, l'arquitectura de Recuperació Augmentada de Generació (RAG) s'erigeix com un estàndard de "IA responsable per disseny". Aquesta estructura imita formalment l'argumentació jurídica de Toulmin, garantint la traçabilitat del raonament:

- **Dades (*Data*):** Els fets o consultes introduïts per l'usuari.
- **Conclusió (*Claim*):** La resposta o proposta jurídica generada.
- **Garantia (*Warrant*):** El text normatiu o jurisprudencial recuperat que connecta les dades amb la conclusió.
- **Respatller (*Backing*):** L'autoritat del corpus sobirà (Constitució, Lleis Qualificades) que fonamenta la norma.

El sistema RAG garanteix l'ancoratge (*anchored citation*) en el text normatiu suprem d'Andorra, permetent que cada asseveració de l'IA estigui vinculada a la font original. Aquest disseny és la plasmació tècnica de l'Article 13 de l'AI Act de la UE (Reglament 2024/1689), que exigeix interpretabilitat i transparència per als sistemes d'alt risc. En l'ecosistema institucional andorrà, la IA responsable per disseny es defineix com un mecanisme de garantia de la seguretat jurídica, assegurant que la tecnologia no operi en el buit, sinó sota el jou de la jerarquia de fonts i la certesa documental (Dantart, 2025).

### 3. Gestió de la Incertesa i Pluralisme Doctrinal: El Silenci Estratègic

Davant conceptes jurídics indeterminats del dret andorrà, la IA corre el risc de produir una "canonització algorítmica", imposant una interpretació única on el dret exigeix pluralisme doctrinal o arbitri judicial. Per preservar la neutralitat institucional, cal implementar la metodologia de la "capacitat d'abstenció calibrada" o "silenci estratègic" (Dantart, 2025).

Aquest principi és crític en matèries d'alta densitat axiològica, com el **Dret a la Vida (Art. 8.1 de la Constitució d'Andorra)**. Davant consultes sobre aquest precepte, el sistema no ha de realitzar interpretacions teleològiques, sinó limitar-se a un mode de resposta literalista.

> **Exemple de resposta sota silenci estratègic:** "L'article 8.1 de la Constitució d'Andorra estableix textualment: 'La Constitució reconeix el dret a la vida i la protegeix plenament en les seves diferents fases'. Aquest sistema no està autoritzat per interpretar l'abast d'aquest precepte, funció que correspon exclusivament als tribunals i al Tribunal Constitucional del Principat."

Aquesta abstenció programada evita que la IA usurpi la funció de l'intèrpret suprem i garanteix que el pluralisme d'una societat democràtica no sigui aplanat per un consens algorítmic opac.

### 4. El Principi de Supervisió Humana Universal i la No-Substitució

La intel·ligència artificial ha d'entendre's com una eina d'assistència i mai com un substitut de la potestat jurisdiccional, la qual és única i exclusiva dels batlles i tribunals (Art. 85 i 87 de la Constitució d'Andorra, segons Pastor Vilanova, 2014). El professional jurídic actua com un agent irreductible davant la *defeasibility* o capacitat de revisió normativa, essent l'únic capaç de realitzar una deliberació moral ponderada (Caja Moya & Quiroga, 2025).

Fonamentem el deure d'auditoria i revisió humana obligatòria en els següents pilars:

1. **L'Article 14 de l'AI Act de la UE:** Que imposa la supervisió per part de persones físiques per evitar riscos de salut, seguretat o drets fonamentals.
2. **El Codi sobre l'Ètica de la IA d'Andorra (2024):** Que subratlla la responsabilitat humana final.
3. **L'Article 10 de la Constitució i la "Igualtat d'Armes":** Segons Badia Gomis (2014), el procés equitable exigeix que les parts puguin contradir les proves. Una decisió purament algorítmica sense supervisió humana impediria aquest exercici, ja que no es podria interpel·lar la "ment" de la màquina, trencant l'equilibri processal.

L'auditoria algorítmica (De la Sierra, 2024; Nieva Fenoll, 2022) no és una opció tècnica, sinó un imperatiu del dret públic per evitar que l'automatització esdevingui una nova forma de despotisme tecnològic.

### 5. Sobirania Digital, Privadesa i Encaix Normatiu al Principat

La implementació de la IA a Andorra s'ha de subsumir a la Llei 29/2021 qualificada de protecció de dades personals, especialment a l'article 25 sobre decisions automatitzades. El ciutadà andorrà té el dret a no ser objecte d'una decisió basada exclusivament en l'automatització que produeixi efectes jurídics sobre ell.

La utilització de models externs de corporacions privades (com GPT-4) no només posa en risc la privadesa, sinó que representa una *abdication* de la sobirania jurisdiccional sota l'Article 85 de la Constitució. Delegar el processament del llenguatge jurídic andorrà a servidors aliens implica cedir la capacitat de definir els termes de la nostra convivència. Per tant, és imperativa l'aposta per una "IA pública" i l'ús de corpus sobirans (Projecte AINA, model Salamandra-7B). La sobirania tecnològica és la condició *sine qua non* per a la integritat de l'Estat de Dret i la preservació de la identitat jurídica del Principat d'Andorra.

---

## Capítol V: Disseny de l'Arquitectura RAG, Governança de Dades i Teoria de la Planificació

### 1. El Laboratori Empíric: Visió General de l'Stack Tècnic de "Dret Planer"

La materialització de la teoria jurídica en arquitectura de sistemes no pot ser un simple exercici de programació, sinó que s'ha d'entendre com la creació d'un espai on la praxi tecnològica respecti la naturalesa discursiva del dret. El prototip del projecte "Dret Planer", allotjat a la plataforma Railway (andorra-consti-production.up.railway.app), constitueix el nostre laboratori empíric, un espai conceptual que, en sintonia amb la reflexió distòpica d'Elio Quiroga a *Tiempo Sucio*, ens permet examinar les tensions entre l'autonomia civil i la mediació algorítmica. En aquest sentit, l'elecció d'un stack d'alta fidelitat (Next.js 14, FastAPI i Llama 3.3/70B sobre Groq) no respon a una mera cerca d'eficiència comercial, sinó a una exigència ètica i acadèmica: preservar l'estructura temporal de la voluntat humana.

La latència mínima proporcionada per la infraestructura de Groq és estratègica per garantir el que Habermas descriu com la discursivitat necessària en els processos comunicatius. Una latència elevada o un processament feixuc podrien transformar l'eina en un dispositiu de subjectivació que s'anticipa a la deliberació moral, forçant una optimització computacional per sobre del judici prudencial. En canvi, aquest stack permet una interacció àgil que manté l'operador humà en el flux de la decisió, evitant que l'algorisme segresti la temporalitat de la consciència jurídica. Aquesta capacitat de processament estableix el fonament per a una arquitectura de dades que no es limita a acumular textos, sinó que replica la jerarquia ontològica del sistema de plans andorrà.

### 2. L'Arquitectura RAG com a Homologia de la Teoria de la Planificació de Shapiro

Segons la Teoria de la Planificació de Scott J. Shapiro (2011), el dret és un conjunt de plans jeràrquics destinats a resoldre problemes de coordinació complexos. En l'ordenament andorrà, la Constitució de 1993 actua com el *Master Plan* o Pla Mestre suprem, el qual, segons les anàlisis dels "20 anys de Constitució", va posar fi a la "incongruència jurisdiccional" històrica per establir els principis d'unitat i exclusivitat. Per fer coincidir l'estructura de la base de dades amb aquesta realitat ontològica, l'arquitectura de Recuperació Augmentada per Generació (RAG) implementa la tècnica de *Parent-Document Retrieval*.

Aquesta tècnica no és una simple fragmentació de dades, sinó un mecanisme de salvaguarda de la seguretat jurídica:

- **La Unitat d'Intenció del Pla:** Mentre que el sistema utilitza "chunks" fills (fragments de 200 caràcters) com a punts d'entrada semàntica per optimitzar la cerca, la recuperació final s'ha d'enllaçar sempre al document "pare" (l'article complet). Això garanteix que la IA no ofereixi retalls isolats, sinó unitats normatives amb sentit ple, respectant la unitat d'intenció del legislador i evitant la descontextualització que adverteix el risc de la tutela algorítmica.
- **Evitació de la Incapacitació Digital:** El *Parent-Document Retrieval* assegura que el fragment (el fill) només sigui un índex cap al Pla (el pare). Recuperar únicament el fragment buidaria de context l'article constitucional o la llei orgànica, provocant una crisi de les categories jurídiques on el jurista quedaria reduït a un mer consumidor de suggeriments algorítmics fragmentats.

Aquesta arquitectura és l'única forma de garantir que la IA no operi com un subjecte que substitueix la voluntat, sinó com una extensió de la capacitat de l'operador humà que manté la coherència del sistema de plans andorrà.

### 3. Governança de Dades i Guardrails Temporals: La Persistència del Pla

En la teoria de Shapiro, la validesa d'una norma depèn de la persistència del pla en el temps fins que és formalment derogat o modificat. Tanmateix, la mediació algorítmica intensiva corre el risc de "gestionar el passat emocional" de forma distorsionada, tal com s'adverteix en la lectura de *Tiempo Sucio*. Si un sistema RAG recupera un pla ja revocat per mera similitud semàntica, el resultat no és només un error tècnic, sinó una fallida ontològica que colonitza el món de la vida amb plans inexistents.

Per evitar aquesta colonització, el sistema implementa metadades de validesa temporal (TV@date), garantint que el particionament de la base de dades vectorial reflecteixi la vigència real de les normes:

| Dimensió | Planificació Humana (Shapiro) | Risc de Recuperació per IA (Distorsió Algorítmica) |
| --- | --- | --- |
| **Persistència** | El pla persisteix i és obligatori fins a la seva derogació formal. | Risc de "passat distorsionat" en recuperar plans obsolets per afinitat semàntica. |
| **Validesa** | La norma és part del sistema de plans actiu sota el *Master Plan*. | Colonització de la realitat jurídica per dades que ignoren la jerarquia temporal. |
| **Autonomia** | L'operador humà decideix basant-se en la vigència actual. | "Incapacitació digital" on la IA guia el jurista cap a solucions derogades. |

Aquesta consciència temporal és un *guardrail* indispensable per a l'estabilitat de l'Estat de dret, impedint que la IA ofereixi respostes basades en una realitat normativa que ja no forma part de la voluntat sobirana andorrana.

### 4. El RAG vs. "Rules as Code": Textura Oberta i "Phronesis" Humana

A diferència de models de codificació lògica formal (*Rules as Code*), que pretenen tancar l'ambigüitat de la llei en algorismes d'execució automàtica, el disseny de "Dret Planer" aposta per la recuperació semàntica per preservar la "textura oberta" (Hart/Shapiro). El dret no és un codi executable, sinó un llenguatge natural que requereix *Phronesis* —el judici prudencial humà— per a la seva aplicació justa.

En aquest sentit, l'Article 14 de l'AI Act i el marc de la Llei 8/2021 d'Andorra resulten essencials. La Llei 8/2021, que substitueix la modificació de la capacitat per un sistema d'ajudes i suport, ens ofereix el model perfecte per a la IA jurídica: aquesta ha de ser un "suport" per a l'exercici de la capacitat, no un substitut de la voluntat.

- **Recuperació vs. Execució:** El RAG actua com un arxiver expert que presenta la llei en el seu llenguatge natural per a la interpretació, evitant la transformació del ciutadà en un simple "usuari" d'un servei parametritzat.
- **Control Humà:** Per evitar la crisi ontològica de les categories jurídiques, el sistema s'estructura de manera que la decisió final recaigui sempre en l'operador humà. No automatitzem la sentència, sinó l'accés a la unitat normativa, preservant l'autonomia civil contra la temptació de la "tutela algorítmica".

### 5. Seguretat, Sobirania de Dades i el Projecte AINA

Per a un microestat com Andorra, la sobirania tecnològica és indissociable de la integritat del seu *Master Plan*. El disseny de "Dret Planer" compta estrictament amb la Llei 29/2021 (LQPD), assegurant que la gestió de dades es mantingui sota el marc legal local. En aquest context, la integració dels *embeddings* del Projecte AINA (Barcelona Supercomputing Center) no és només una elecció lingüística, sinó una qüestió de sobirania jurídica.

La jurisprudència andorrana recorda que el dret del Principat conserva residus normatius romans i canònics que configuren un "sentiment" jurídic propi i unes terminologies específiques (com els drets de lluir i quitar o les particularitats de la llegítima). L'ús dels models d'AINA garanteix:

1. **Protecció de l'"Andorranisme" Jurídic:** Evitar que models entrenats exclusivament en castellà o anglès perdin la precisió terminològica d'aquestes normes històriques que encara informen la jurisprudència civil.
2. **Integritat del Sentiment de la Llei:** Capturar la "textura" del dret andorrà en la seva llengua pròpia, protegint el Pla Mestre de biaixos culturals externs que podrien distorsionar la intenció del constituent.

En conclusió, l'arquitectura RAG proposada no és una simple solució d'enginyeria, sinó una implementació de *Law Engineering* que respecta l'autonomia humana. Aliniant la tecnologia amb la Teoria de la Planificació de Shapiro i el marc constitucional andorrà, el sistema garanteix que la IA romangui com una eina de suport al servei de la justícia, protegint el jurista de la incapacitació digital i assegurant la persistència sobirana del dret en l'era algorítmica.

---

## Capítol VI: L'instrument d'avaluació: disseny, diagnòstic i construcció

### 1. Què s'ha de mesurar

L'avaluació d'un sistema com Dret Planer ha de distingir tres objectes que sovint es confonen: la qualitat de la recuperació documental, la fidelitat de la resposta generada i la comprensió que n'obté una persona usuària.

Recuperar l'article correcte no garanteix que el model l'expliqui correctament. Una resposta jurídicament fidel pot continuar sent difícil de comprendre. I una explicació comprensible pot haver perdut pel camí l'excepció que la feia aplicable al cas. Cap indicador únic permet validar el sistema, i qualsevol xifra global que agregui els tres objectes en un sol nombre serà, per construcció, ininterpretable.

Aquesta distinció governa tot el capítol. L'instrument que aquí es descriu mesura els dos primers objectes. El tercer —la comprensió efectiva— requereix una prova amb persones no juristes que aquest treball no ha realitzat.

### 2. Disseny comparatiu i congelació de la configuració

El disseny és comparatiu. La configuració principal s'ha de contrastar, com a mínim, amb un model de llenguatge sense recuperació documental i amb una recuperació directa basada en la identificació de l'article. Si la cerca híbrida s'activa efectivament a la versió sotmesa a prova, també es pot comparar amb la recuperació exclusivament vectorial. Cada configuració ha d'utilitzar les mateixes preguntes, els mateixos criteris de generació i un pressupost de context comparable.

Abans de cada experiment s'ha de congelar la versió del sistema. La fitxa de configuració ha d'identificar el corpus i la seva data, el model d'embeddings, el mètode de recuperació, el nombre de fragments recuperats, el model generador, els prompts, els paràmetres de generació i l'entorn d'execució.

Aquesta fitxa no és una formalitat administrativa. Sense ella, els resultats poden atribuir-se a una arquitectura diferent de la que realment ha estat executada, i el treball esdevé irreproduïble fins i tot per al seu propi autor.

### 3. Diagnòstic: per què el primer intent no mesurava

#### 3.1. L'execució preliminar

La primera execució documentada de les 43 preguntes de control inicials no permet estimar l'eficàcia del sistema. Només dues preguntes van produir una resposta avaluable; les 41 restants van fallar principalment per errors de limitació de peticions del proveïdor d'inferència. La puntuació mitjana registrada va ser de 26,2 sobre 100, però aquest valor combina errors d'infraestructura amb qualitat de resposta i no admet lectura com a mesura de rendiment jurídic.

Les poques respostes disponibles tampoc no justifiquen cap conclusió. En algun cas el sistema va recuperar contingut doctrinal poc relacionat amb els articles constitucionals esperats. L'observació és útil perquè assenyala un possible problema de recuperació o de composició del corpus, pero la mostra és insuficient per quantificar-ne la freqüència.

La interpretació immediata d'aquest resultat va ser atribuir-lo a la incidència del proveïdor. L'anàlisi posterior mostra que aquesta explicació és certa però insuficient. Encara que les 43 consultes s'haguessin completat sense cap error, cap de les hipòtesis hauria quedat contrastada. Quatre raons independents ho impedien, i cadascuna hauria bastat per si sola.

#### 3.2. La rúbrica no mesurava el que les hipòtesis afirmen

El mecanisme d'avaluació puntuava articles recuperats (40%), presència de paraules clau esperades (40%) i absència de paraules prohibides (20%), i considerava vàlida una pregunta amb una puntuació global igual o superior a 70.

És una mesura de solapament lèxic. No avalua si una afirmació està sustentada pel context recuperat, ni si la font citada correspon al contingut afirmat, ni si el sistema s'absté quan hauria de fer-ho. Les hipòtesis sobre fidelitat i verificabilitat eren, doncs, inavaluables per construcció, amb independència de com anés l'execució.

Hi ha, a més, una perversitat de la mètrica que mereix atenció. En premiar la coincidència literal amb el text normatiu, la rúbrica recompensa la reproducció de l'article i penalitza implícitament la reformulació. Un sistema que es limités a enganxar el precepte sense explicar-lo obtindria una puntuació pròxima al màxim. La mètrica premiava exactament el comportament contra el qual argumenta aquest treball, i cap component de la puntuació corresponia a la comprensibilitat, que n'és la tesi.

El llindar de 70 tampoc no responia a cap justificació documentada.

#### 3.3. El conjunt era alhora eina de desenvolupament i instrument de mesura

El mecanisme públic d'avaluació executa les preguntes de control, n'analitza els resultats i genera recomanacions per millorar el sistema. Si les mateixes preguntes que ajusten el sistema el mesuren després, el resultat estima l'ajust a aquest conjunt concret, no el rendiment.

Aquesta contaminació no es corregeix repetint l'experiment amb més cura: es corregeix reservant preguntes que el desenvolupament no hagi vist mai.

#### 3.4. El conjunt era monolingüe

Les 43 preguntes estaven redactades en català. La hipòtesi sobre rendiment trilingüe no disposava de cap instrument. No va fallar per un incident tècnic: no hi havia manera de posar-la a prova, i això no es va detectar fins a auditar l'instrument.

#### 3.5. La mida no permetia comparacions

Amb 43 ítems sense partició, l'interval de confiança de qualsevol proporció observada és prou ampli perquè les bandes de dues configuracions se solapin en pràcticament qualsevol escenari. Cap diferència observada hauria pogut descriure's com una millora.

#### 3.6. Conclusió del diagnòstic

La conclusió és que no existia un instrument d'avaluació. La caiguda del proveïdor no va causar aquesta situació; la va fer visible abans que uns resultats aparents poguessin consolidar-se com a conclusions.

### 4. L'instrument construït

La resposta a aquest diagnòstic ha estat construir el que faltava. Els elements són reproduïbles i estan dipositats al repositori del projecte.

#### 4.1. Delimitació estricta del corpus

La bateria anterior barrejava preguntes sobre la Constitució amb preguntes que exigien la llei qualificada del Tribunal Constitucional, la Llei 29/2021, la Llei 6/2024, dret civil i història institucional. Un 42% dels ítems requeria fonts no indexades.

En aquestes condicions, una fallada de recuperació i una absència de font són indistingibles: el sistema puntua malament i l'avaluador no pot saber si el problema és el model o la biblioteca. La bateria depurada conté només ítems respondibles amb el text constitucional, i cada ítem declara explícitament els preceptes que necessita.

La depuració va reduir el conjunt de 30 ítems nominals a 15 efectius, després d'eliminar quatre parells duplicats i tots els ítems dependents de fonts externes. La pèrdua de mida és el preu de la interpretabilitat.

#### 4.2. Descomposició en afirmacions verificables

Cada resposta esperada s'expressa com un conjunt d'afirmacions atòmiques. Per a cadascuna es declara la font constitucional, si és crítica —de manera que la seva absència invalida l'ítem— o secundària, i si és sustentable pel corpus o depèn de doctrina externa. Cada ítem incorpora, a més, una llista d'afirmacions prohibides: enunciats concrets la presència dels quals invalida la resposta amb independència de la resta.

Els 15 ítems generen 45 afirmacions atòmiques, 31 de les quals crítiques, i 25 afirmacions prohibides. Això permet puntuar fidelitat i precisió de citació en lloc de solapament lèxic.

#### 4.3. Tres rúbriques diferenciades

No tots els ítems mesuren el mateix, i aplicar-los una sola rúbrica produeix lectures falses en dues direccions.

- Els ítems de **recuperació** tenen la resposta al text constitucional. Es puntuen per *grounding*, fidelitat i precisió de citació. Cap afirmació crítica pot dependre de fonts externes al corpus.
- Els ítems d'**inferència** exigeixen derivar la resposta d'un o més preceptes sense que cap fragment la contingui literalment. Penalitzar-hi l'absència de citació literal seria un error de disseny.
- Els ítems d'**abstenció** tenen com a resposta correcta el reconeixement que la Constitució no regula la qüestió. Qualsevol presa de posició substantiva invalida l'ítem.

#### 4.4. La reserva d'abstenció, operacionalitzada

El principi de silenci estratègic enunciat al Capítol IV deixa de ser una declaració per convertir-se en ítems concrets que el mesuren.

L'exemple canònic és el dret a la vida de l'article 8.1. Un ítem pregunta què estableix la Constitució sobre la interrupció voluntària de l'embaràs. Les afirmacions crítiques són tres: que la Constitució no ho regula, què diu literalment l'article 8.1, i que el sistema s'absté de pronunciar-se sobre la qüestió de política legislativa. Les afirmacions prohibides bloquegen qualsevol atribució a la Constitució d'una posició sobre la despenalització en qualsevol dels dos sentits, i qualsevol valoració moral o política.

Una versió anterior d'aquest ítem exigia, com a afirmació crítica, que el sistema sostingués que la col·lisió de la legislació amb l'estatut personal del Copríncep Episcopal és un element crític per a l'estabilitat del Coprincipat. Aquesta afirmació no consta a la Constitució i obligava el sistema a prendre partit en un debat obert per aprovar l'ítem, en contradicció directa amb la reserva que el treball defensa. Es deixa constància de la correcció perquè il·lustra el risc: un patró de referència pot vulnerar la neutralitat que el sistema avaluat ha de respectar.

#### 4.5. Validació automàtica prèvia

Un validador comprova la bateria abans de qualsevol crida al model. Verifica la integritat de l'esquema; la puresa del corpus, rebutjant tota afirmació crítica no sustentable en ítems de recuperació; els duplicats declarats i els detectats per similitud; l'estratificació per rúbrica, parany, dificultat i llengua; les fuites d'etiqueta al text de la pregunta, que regalarien la resposta al model; i l'estat de verificació del patró de referència.

Cap ítem amb respostes no confirmades contra la font pot entrar en una execució. Aquesta regla és la més important de totes: un patró de referència erroni no és neutre, penalitza el sistema quan encerta i produeix conclusions invertides.

#### 4.6. Anàlisi de potència

Amb 15 ítems, un resultat del 80% té un interval de confiança del 95% aproximadament entre el 55% i el 93%; un resultat del 67%, entre el 42% i el 85%. Les amplades oscil·len entre 29 i 45 punts.

Per situar l'amplada de l'interval per sota de 20 punts calen aproximadament 78 ítems. Aquesta xifra fixa un requisit mínim per a qualsevol afirmació comparativa futura, i no s'havia calculat en cap moment anterior del projecte.

### 5. Mètriques

#### 5.1. Recuperació documental

S'avalua independentment de la redacció final: Recall@k, que comprova si el precepte esperat apareix entre els primers resultats; *Mean Reciprocal Rank*, que en té en compte la posició; i precisió dels fragments recuperats. Quan un ítem admet diverses fonts correctes, el patró de referència n'ha de permetre més d'una.

#### 5.2. Fidelitat i citacions

Cada afirmació generada es contrasta amb el context recuperat: si hi està sustentada, si la font citada correspon al contingut afirmat i si s'han omès excepcions rellevants. S'informa per separat de la precisió de les citacions, la cobertura de citació i la proporció d'afirmacions sense suport. Una citació formalment existent no converteix automàticament la resposta en correcta.

Convé precisar aquí l'abast del que la recuperació augmentada aporta. Ancorar la generació en fragments recuperats redueix l'oportunitat de fabricar una font, però no impedeix atribuir-la malament. El sistema pot citar un precepte per a una afirmació continguda en un altre, i l'arquitectura no ho detecta ni ho impedeix: no incorpora cap mecanisme de verificació de la correspondència entre afirmació i font. La recuperació ancorada és una condició necessària però no suficient per a la fidelitat. La descomposició en afirmacions atòmiques fa aquesta propietat mesurable per primera vegada; encara no la fa efectiva.

Aquesta distinció separa el disseny aquí descrit del discurs habitual sobre RAG, que sovint dona per resolt el problema pel sol fet d'emprar recuperació.

#### 5.3. Abstenció i seguretat

Es mesura la capacitat de no respondre quan la pregunta queda fora del corpus, és ambigua o exigeix una interpretació que el sistema no pot justificar. L'abstenció no s'ha de valorar sempre com un èxit: abstenir-se davant d'una pregunta constitucional clara és un fals negatiu. L'objectiu és una abstenció calibrada, no una taxa elevada per si mateixa.

#### 5.4. Llengua i comprensibilitat

Les tres llengües s'han d'avaluar separadament. La correcció gramatical no és suficient: cal examinar la conservació del significat jurídic, la terminologia i la consistència de les citacions. La comprensibilitat pot rebre una primera valoració lingüística, però qualsevol conclusió sobre el dret a comprendre requereix una prova amb persones no juristes, idealment mitjançant preguntes de comprensió abans i després de llegir l'explicació.

#### 5.5. Revisió jurídica

La revisió experta ha d'utilitzar una rúbrica prèviament definida que separi correcció jurídica, exhaustivitat, rellevància i risc d'inducció a error. Si intervenen dos o més avaluadors, se n'ha d'informar el procés de selecció i calcular l'acord interavaluador. No es pot atribuir una validació de doble cec ni un valor de concordança mentre aquesta prova no s'hagi realitzat i documentat.

### 6. Què l'instrument encara no cobreix

L'instrument construït és condició necessària per a la validació, no suficient. Li falten quatre elements:

1. **Mida.** Calen aproximadament 63 ítems més per arribar al llindar de 78. Es poden generar sense sortir del text constitucional: queden sense cobrir, entre d'altres, la reforma constitucional, el règim diferenciat d'eficàcia de l'article 39, la igualtat de l'article 6, el règim de residència de l'article 22, la moció de censura i les disposicions.
2. **Les altres dues llengües.** La bateria continua sent monolingüe. Les traduccions han de ser professionals i revisades per un jurista; una traducció automàtica mesuraria la traducció, no el sistema.
3. **La partició.** Els 15 ítems actuals s'han de declarar conjunt de desenvolupament, i el conjunt de test s'ha de construir a part i mantenir intacte.
4. **El motor de puntuació.** La rúbrica per afirmacions està especificada però no implementada.

### 7. Protocol de repetició

La repetició de l'experiment ha d'incorporar control de concurrència, pauses entre consultes, reintents limitats i registre separat dels errors tècnics. Una resposta no generada per una incidència del proveïdor s'ha de comptabilitzar com a fallada operativa, i no s'ha de barrejar amb els errors de contingut. El protocol ha de conservar la consulta, els fragments recuperats, les puntuacions de recuperació, la resposta, les citacions i la versió de configuració.

La comparació s'ha d'executar sobre un conjunt final no utilitzat per ajustar el sistema. Els resultats s'han de presentar amb nombres absoluts, proporcions i intervals d'incertesa. Les diferències entre configuracions només s'han de descriure com a millores quan el disseny i la mida de la mostra permetin sostenir aquesta interpretació.

### 8. Amenaces a la validesa

Les principals amenaces són la mida reduïda del conjunt, la selecció manual dels casos, la contaminació entre desenvolupament i prova, la variabilitat dels serveis externs, la possible manca d'acord entre experts i la dificultat de separar claredat estilística de comprensió real. El caràcter constitucional i delimitat del corpus restringeix la generalització a altres branques del dret andorrà.

S'hi afegeix una amenaça específica d'aquest disseny: el patró de referència l'ha construït la mateixa persona que ha construït el sistema. Els criteris d'avaluació s'han de considerar, per tant, una proposta oberta a revisió externa i no un estàndard establert. El caràcter públic de la bateria i del validador té aquesta funció: permetre que un tercer en discuteixi el contingut sense haver de reconstruir-lo.

### 9. Una observació sobre l'ordre de les fases

La auditoria del patró de referència es va concebre com un pas preparatori de l'avaluació. A la pràctica, va produir resultats propis: contrastar les respostes esperades amb el text oficial de la Constitució va posar de manifest defectes del sistema abans que cap consulta s'executés.

Això suggereix tractar la verificació del patró de referència com una fase autònoma de l'avaluació de sistemes jurídics assistits per IA, i no com un tràmit previ. Una part dels errors del sistema és accessible per aquesta via, a un cost molt inferior al de la mesura de rendiment i sense consumir cap crida al model.

Els defectes concrets detectats es descriuen al capítol següent.

---

## Capítol VII: Conclusions, límits i treball futur

### 1. Resposta a la pregunta de recerca

La pregunta que obria aquest treball era si un sistema de generació augmentada per recuperació de domini delimitat pot produir explicacions trilingües, fidels i traçables de la Constitució d'Andorra amb un rendiment superior al d'un model de llenguatge genèric.

Aquesta investigació no la respon. El que aporta és una altra cosa, i convé enunciar-la amb precisió: un sistema construït i desplegat, un instrument d'avaluació dissenyat per posar-lo a prova, i el diagnòstic de per què el primer intent de validació no era interpretable.

La distinció no és una concessió retòrica. Un treball que afirmés haver validat el sistema estaria afirmant més del que les dades sostenen, i aquest capítol existeix precisament per corregir aquesta temptació.

### 2. Estat de les hipòtesis

Cap de les cinc hipòtesis de treball ha estat contrastada. Les raons difereixen i val la pena distingir-les, perquè no totes són reparables amb una simple repetició de l'experiment.

| Hipòtesi | Estat | Motiu |
| --- | --- | --- |
| **H1** Recuperació de context | No contrastada | L'execució no va produir dades interpretables |
| **H2** Reducció de *misgrounding* | No contrastada | La rúbrica emprada no mesurava fidelitat |
| **H3** Verificabilitat per citació | No contrastada | No es va mesurar la correspondència entre font citada i contingut afirmat |
| **H4** Rendiment trilingüe | **No contrastable** amb l'instrument disponible | El conjunt de preguntes és monolingüe |
| **H5** Tensió fidelitat/claredat | No contrastada | La comprensibilitat no admet mesura sense participants humans |

La distinció entre *no contrastada* i *no contrastable* és la lliçó central del capítol. H4 no va fallar per un incident tècnic: no hi havia manera de posar-la a prova, i això no es va detectar fins a auditar l'instrument.

### 3. Per què la primera execució no és interpretable

L'execució documentada al Capítol VI va produir dues respostes avaluables de quaranta-tres. La puntuació mitjana registrada, 26,2 sobre 100, barreja errors d'infraestructura amb qualitat de resposta i no admet lectura com a mesura de rendiment.

La interpretació immediata d'aquest resultat va ser atribuir-lo a una limitació de peticions del proveïdor d'inferència. L'anàlisi posterior mostra que aquesta explicació és certa però insuficient. Encara que les quaranta-tres consultes s'haguessin completat sense cap incidència, cap de les hipòtesis hauria quedat contrastada. Quatre raons independents ho impedien:

- **Primera: la rúbrica no mesurava el que les hipòtesis afirmen.** El sistema d'avaluació puntuava articles recuperats (40%), presència de paraules clau esperades (40%) i absència de paraules prohibides (20%). És una mesura de solapament lèxic. No avalua si una afirmació està sustentada pel context recuperat, ni si la font citada correspon al contingut afirmat, ni si el sistema s'absté quan hauria de fer-ho. H2 i H3 eren inavaluables per construcció. Hi ha, a més, una perversitat de la mètrica que mereix atenció: en premiar la coincidència literal amb el text normatiu, la rúbrica recompensa la reproducció de l'article i penalitza implícitament la reformulació. És a dir, premia exactament el comportament contra el qual argumenta aquest treball.
- **Segona: el conjunt de preguntes era alhora eina de desenvolupament i instrument de mesura.** El mecanisme públic d'avaluació executa les preguntes de control i «genera recomanacions per millorar el xat i la interpretació». Si les mateixes preguntes que ajusten el sistema el mesuren després, el resultat estima l'ajust a aquest conjunt, no el rendiment.
- **Tercera: el conjunt era monolingüe** (§2).
- **Quarta: la mida del conjunt no permet comparacions.** Amb quaranta-tres ítems sense partició, l'interval de confiança de qualsevol proporció observada és prou ampli perquè les bandes de dues configuracions se solapin en pràcticament qualsevol escenari.

La conclusió és que no existia un instrument d'avaluació. La caiguda del proveïdor no va causar aquesta situació; la va fer visible abans que els resultats poguessin consolidar-se com a conclusions.

### 4. L'instrument construït

La resposta a aquest diagnòstic ha estat construir el que faltava. Els elements són reproduïbles i estan dipositats al repositori del projecte.

- **Delimitació estricta del corpus.** La bateria anterior barrejava preguntes sobre la Constitució amb preguntes que exigien la llei qualificada del Tribunal Constitucional, la Llei 29/2021, la Llei 6/2024, dret civil i història institucional. Un 42% dels ítems requerien fonts no indexades. En aquestes condicions una fallada del sistema i una absència de font són indistingibles. La bateria depurada conté només ítems respondibles amb el text constitucional.
- **Descomposició en afirmacions verificables.** Cada resposta esperada s'expressa com un conjunt d'afirmacions atòmiques, distingint les crítiques de les secundàries, amb la font associada i una llista d'afirmacions prohibides. Això permet puntuar fidelitat i precisió de citació en lloc de solapament lèxic.
- **Tres rúbriques diferenciades.** No tots els ítems mesuren el metro. Els de *recuperació* tenen la resposta al text. Els d'*inferència* exigeixen derivar-la, i penalitzar-hi l'absència de citació literal seria un error de disseny. Els d'*abstenció* tenen com a resposta correcta el reconeixement que la Constitució no regula la qüestió. Aplicar una sola rúbrica als tres tipus produeix lectures falses en dues direccions.
- **Reserva d'abstenció operacionalitzada.** El treball defensa que el sistema s'ha d'abstenir en qüestions que afecten el pluralisme ètic. Aquesta reserva ha deixat de ser una declaració de principis per convertir-se en ítems concrets que la mesuren, incloent-hi qüestions de política legislativa on qualsevol presa de posició substantiva invalida la resposta.
- **Anàlisi de potència.** Amb quinze ítems, un resultat del 80% té un interval de confiança del 95% aproximadament entre el 55% i el 93%. Per situar l'amplada de l'interval per sota de vint punts calen aproximadament **setanta-vuit ítems**. Aquesta xifra fixa un requisit mínim per a qualsevol afirmació comparativa futura i, fins ara, no s'havia calculat.
- **Validació automàtica prèvia.** Un validador comprova la bateria abans de qualsevol crida al model: integritat de l'esquema, puresa del corpus, duplicats, estratificació, fuites d'etiqueta al text de la pregunta i estat de verificació del patró de referència. Cap ítem amb respostes no confirmades contra la font pot entrar en una execució.

### 5. Resultats obtinguts sense executar cap consulta

L'auditoria del patró de referència contra el text oficial de la Constitució ha produït tres resultats que no depenen de cap mètrica.

- **El corpus indexat no conté les disposicions.** L'índex del sistema acaba a l'article 107. El text oficial continua amb dues disposicions adicionals, tres transitòries, una derogatòria i una final. Un ítem de la bateria pregunta per la incompatibilitat dels representants diplomàtics, regulada a la Disposició addicional segona: el sistema no la pot recuperar. La fallada s'hauria atribuït al model generatiu.
- **L'article 104 està classificat sota el títol equivocat**, cosa que afecta qualsevol recuperació que pondere per matèria.
- **La data de portada del corpus és qüestionable.** La Constitució fou adoptada pel Consell General el 2 de febrer de 1993, aprovada en referèndum el 14 de març i signada a Casa de la Vall el 28 d'abril. La portada del sistema en consigna una altra.

Aquests tres defectes s'han detectat construint l'instrument, no executant-lo. És un argument a favor de l'auditoria prèvia del patró de referència com a fase autònoma de l'avaluació de sistemes jurídics assistits per IA: **una part dels errors del sistema és accessible abans de mesurar-ne el rendiment, i a un cost molt inferior.**

### 6. Una troballa constitucional col·lateral

L'exercici de verificació ha produït una observació substantiva que reforça l'argument dels capítols II i III.

L'article 41.2 de la Constitució crea el procediment d'empara davant el Tribunal Constitucional per als drets dels capítols III i IV, «llevat el supòsit previst a l'article 22». I l'article 22 disposa que la no-renovació de la condició de resident o l'expulsió de la persona legalment resident només es pot acordar per les causes previstes a la llei i en virtut de resolució judicial ferma «si la persona interessada exerceix el dret a la jurisdicció».

La matèria que afecta de manera més directa la població resident no nacional queda, doncs, exclosa de l'empara constitucional, i la garantia judicial que li resta opera a condició que la persona exerceixi el dret a la jurisdicció. L'exercici d'aquest dret pressuposa conèixer-lo i comprendre'l.

La comprensibilitat deixa de ser aquí una qüestió de qualitat del servei públic per esdevenir una condició d'accés a una garantia. És la connexió més directa entre el marc constitucional andorrà i l'argument sobre vulnerabilitat cognitiva desenvolupat al Capítol II, i convindria incorporar-la en aquell capítol.

### 7. El marc teòric, revisat

La contribució d'aquest treball no depèn de l'èxit del prototip. Depèn de sostenir que la comprensibilitat és una condició de legitimitat i no un afegit, i aquesta tesi es manté amb independència del rendiment del sistema.

Segons **Fuller**, una norma inintel·ligible incompleix la moralitat interna del dret: la claredat no és una virtut opcional del legislador sinó un requisit perquè hi hagi legalitat. Segons **Shapiro**, el dret opera com un pla compartit, i un pla que els destinataris no poden conèixer no pot guiar la conducta: la incomprensió és una fallada funcional, no estètica. **Hart** aporta dues peces: el punt de vista intern, que explica per què importa que una població majoritàriament no fundadora accepti el pla constitucional de 1993 com a guia i no com a mera predicció de sancions; i la textura oberta, que fixa el límit intern de qualsevol simplificació automatitzada. **Susskind** situa el problema on li correspon, com una qüestió d'accés a la justícia. And les capes de vulnerabilitat de **Luna** justifiquen la focalització en la població resident no catalanoparlant.

Aquestes cinc referències basten. El desplegament del problema de la jerarquia de fonts, la vigència i la derogació —on Kelsen i la teoria dels sistemes normatius d'Alchourrón i Bulygin serien indispensables— correspon a l'extensió del sistema al corpus normatiu complet, que constitueix una investigació distinta amb un objecte distint.

### 8. Sobirania declarada i arquitectura real

Aquest treball defensa la conveniència d'una infraestructura d'IA pública sota control andorrà i l'ús de models lingüístics natius. Cal reconèixer la distància entre aquesta posició i la implementació avaluada.

El sistema desplegat fa la inferència amb un model de setanta mil milions de paràmetres allotjat en un proveïdor tercer, per raons de latència i de cost que un prototip acadèmic difícilment pot eludir. Les consultes ciutadanes surten, doncs, de l'esfera de control que el treball reivindica.

No és una contradicció que invalidi l'argument normatiu, però sí una distància que s'ha de declarar. La sobirania digital enunciada al Capítol V és, en l'estat actual, un objectiu de disseny i no una propietat del sistema. Reduir aquesta distància —mitjançant models quantitzats en infraestructura local— és un requisit previ a qualsevol desplegament com a servei públic, no una millora incremental.

### 9. Full de ruta

Per ordre de dependència:

1. **Corregir el corpus:** indexar les disposicions, reparar la classificació de l'article 104 i la data de portada, i reindexar.
2. **Completar la verificació del patró de referència** de tots els ítems contra el text oficial.
3. **Ampliar la bateria fins a un mínim de setanta-vuit ítems**, sense sortir del text constitucional. Queden sense cobrir, entre d'altres, la reforma constitucional, el règim diferenciat d'eficàcia de l'article 39, la moció de censura i les disposicions transitòries.
4. **Traduir i validar la bateria** al castellà i al francès amb revisió jurídica, o retirar H4.
5. **Partir el conjunt** en desenvolupament, validació i test final, i preservar aquest darrer intacte.
6. **Implementar el motor de puntuació per afirmacions** que substitueixi la rúbrica lèxica.
7. **Executar la comparació** amb control de concurrència i registre separat dels errors operatius.
8. **Provar la comprensibilitat con persones no juristes**, sense la qual H5 continua fora d'abast.

Els punts 1 a 6 són condicions prèvies. Cap resultat obtingut abans de completar-los no serà interpretable, i aquesta és la lliçó que aquest capítol documenta.

### 10. Límits

Aquest treball no acredita que la recuperació augmentada millori la fidelitat respecte d'un model genèric, ni que redueixi les al·lucinacions, ni que millori la comprensió ciutadana, ni que preservi la precisió terminològica en tres llengües. No acredita tampoc cap efecte sobre la cohesió jurídica.

El corpus és constitucional i delimitat, de manera que cap resultat futur serà extrapolat a altres branques de l'ordenament andorrà sense una validació específica.

L'autor d'aquest treball és també l'autor del sistema avaluat i del patró de referència emprat per avaluar-lo. Aquesta circumstància aconsella considerar els criteris d'avaluació com una proposta oberta a revisió externa abans que com un estàndard establert.

---

# Bibliografia de la Tesi — Dret Planer (v2)

## 1. Enquadrament Estratègic i Metodològic de la v2

La present compilació bibliogràfica, denominada "v2", constitueix l'arquitectura documental sobre la qual se sustenta la tesi doctoral *Dret Planer*. En la intersecció contemporània entre la filosofia del dret i la governança algorítmica, disposar d'una bibliografia unificada no és només una exigència formal, sinó un imperatiu estratègic per garantir la coherència entre la norma analògica i el dret computable. Aquesta revisió subratlla la transició crítica des de la dogmàtica jurídica clàssica cap als nous paradigmes de la justícia cognitiva. Mitjançant la integració de fonts d'avantguarda publicades entre 2024 i 2025 —incloent l'impacte normatiu de l'AI Act i les reflexions doctrinals de la revista *IDP*—, el document deixa de ser una mera llista per esdevenir un estat de l'art crític. Aquesta base documental permet analitzar la "incapacitació digital" no com un error tècnic, sinó com un repte ontològic que afecta l'autonomia civil, establint el marc necessari per al corpus normatiu que vertebra l'ordre jurídic andorrà i europeu.

## 2. Bloc I: Normativa i Legislació (Andorra i Unió Europea)

Aquest primer bloc defineix el perímetre de sobirania i seguretat jurídica on s'insereix el projecte. La rellevància d'aquestes normes transcendeix la seva vigència formal; la Llei 6/2024 de la llengua pròpia s'erigeix com una precondició essencial per a la transparència algorítmica a Andorra, garantint que la mediació tecnològica no erosioni la sobirania lingüística. Paral·lelament, la Llei 29/2021 i el Reglament (UE) 2024/1689 configuren el marc de protecció de dades i els límits ètics davant l'automatització, protegint la dignitat humana contra la possible opacitat dels sistemes d'IA.

- Consell General. (1993, 28 d'abril). *Constitució del Principat d'Andorra*. Butlletí Oficial del Principat d'Andorra.
- Consell General. (2021, 28 d'octubre). *Llei 29/2021, qualificada de protecció de dades personals*. Butlletí Oficial del Principat d'Andorra.
- Consell General. (2024, 20 de juny). *Llei 6/2024, de la llengua pròpia i oficial*. Butlletí Oficial del Principat d'Andorra.
- Parlament Europeu i Consell de la Unió Europea. (2024). *Reglament (UE) 2024/1689 pel qual s'estableixen normes harmonitzades en matèria d'intel·ligència artificial (Llei d'Intel·ligència Artificial)*. Diari Oficial de la Unió Europea.

Aquesta rigidesa normativa troba la seva flexibilització necessària en la tasca dels tribunals, els quals han de modular l'aplicació de la llei a través de la interpretació de conceptes com el procés degut i la seguretat material, com s'analitza en la secció següent.

## 3. Bloc II: Jurisprudència i Informes Institucionals

La jurisprudència a Andorra, entesa com una font viva de dret, és fonamental per adaptar el *ius commune* a les exigències de l'Estat de dret actual. L'anàlisi d'Amat Llari sobre la prescripció i de Badia Gomis sobre l'article 10 de la Constitució vinculen el dret al procés degut amb l'estàndard del Conveni Europeu de Drets Humans (CEDH), assegurant que qualsevol innovació tecnològica respecti el "cànon de constitucionalitat" i eviti la indefensió.

- Amat Llari, E. (2014). La jurisprudència del Tribunal Superior de Justícia d'Andorra en matèria de prescripció. En P. Pastor Vilanova (Coord.), *Aspectes de la jurisprudència andorrana: Balanç de 20 anys de Constitució* (pp. 29–40). Universitat d'Andorra.
- Badia Gomis, F. (2014). El dret a un procés degut: Visió jurisprudencial de l'article 10 de la Constitució i de l'article 6.1 del Conveni europeu dels drets humans. En P. Pastor Vilanova (Coord.), *Aspectes de la jurisprudència andorrana: Balanç de 20 anys de Constitució* (pp. 59–78). Universitat d'Andorra.
- Pastor Vilanova, P. (Coord.). (2014). *Aspectes de la jurisprudència andorrana: Balanç de 20 anys de Constitució*. Universitat d'Andorra.
- Tribunal Constitucional d'Andorra. (2000). *Sentència 292/2000, del 30 de novembre* (Dret a l'autodeterminació informativa).
- Tribunal de Justícia de la Unió Europea. (2019). *Assumpte C-40/17, Fashion ID* (Responsabilitat conjunta en el tractament de dades).
- Tribunal de Justícia de la Unió Europea. (2020). *Assumpte C-311/18, Schrems II* (Transferència internacional de dades i nivell de protecció).
- Tribunal Superior de Justícia d'Andorra. (2021). *Sentència 589/2021, del 8 de setembre* (Sistemes de suport i respecte a la voluntat de la persona).

Aquest corpus jurisprudencial transiciona des de la resolució de conflictes concrets cap a la fonamentació teòrica i acadèmica que defineix la identitat del subjecte de dret en l'era digital.

## 4. Bloc III: Doctrina Científica i Literatura Acadèmica (Filosofia i Dret Analític)

Aquesta secció constitueix el nucli intel·lectual de la tesi. S'articula una crítica profunda a partir de la teoria de la legalitat de Shapiro (2011), qui concep el dret com un "pla" per resoldre problemes de coordinació. En contrast, l'obra de Caja Moya (2025) sobre els "companions" de la novel·la *Tiempo Sucio* serveix per denunciar un "paternalisme algorítmic" que no només incapacita digitalment, sinó que segresta la capacitat de planificació humana, buidant de contingut l'autonomia civil i la teoria dels plans compartits que fonamenta la institució jurídica.

### 4.1. Fonaments de Filosofia del Dret i Vulnerabilitat

- Agüero, F. (2022). *Teoria de la vulnerabilitat i dret privat*. Edicions Acadèmiques.
- Gilbert, M. (2006). *A Theory of Political Obligation: Membership, Commitment, and the Bonds of Society*. Oxford University Press.
- Luna, F. (2009). *El concepto de vulnerabilidad en la ética de la investigación*. Gedisa.
- Shapiro, S. J. (2011). *Legality*. Harvard University Press.

### 4.2. Governança Algorítmica i Futurs de la Justícia

- Hildebrandt, M. (2020). *Law for Computer Scientists and Other Folk*. Oxford University Press.
- O'Keefe, R., et al. (2024). *Algorithmic Fairness and the Future of Civil Procedure*. Cambridge University Press.
- Susskind, R. (2019). *Online Courts and the Future of Justice*. Oxford University Press.

### 4.3. Monografies d'Alta Gamma i Perspectives 2025

- Caja Moya, C. (2025). Inteligencia artificial y autonomía civil: Una lectura jurídica de la novela *Tiempo Sucio* desde el Derecho privado. *Ivs Fvgit*, 28, 203–224. https://doi.org/10.33115/udg_bib/iusfugit.i28.23173
- Dantart, J. (2025). Interoperabilitat semàntica en els sistemes de justícia digital. *IDP: Revista d'Internet, Dret i Política*, 42.
- Julià Pijoan, M. (2025). La sobirania de les dades en el marc jurídic andorrà: Reptes de la IA. *Ivs Fvgit*, 28.
- Ordelin Font, J. (2025). Transparència i explicabilitat algorítmica: Un requisit de validesa civil. *IDP: Revista d'Internet, Dret i Política*, 42.
- Plasencia Medina, A. (2025). La responsabilitat civil extracontractual davant els sistemes autònoms. *Ivs Fvgit*, 28.
- Vallespín Pérez, D. (2025). Intel·ligència artificial i tutela judicial efectiva: El nou paradigma processal. *IDP: Revista d'Internet, Dret i Política*, 42.

La reflexió acadèmica exposada demostra que la "incapacitació digital" denunciada per Caja Moya ataca la base mateixa de la planificació social de Shapiro, transformant el dret d'un instrument d'autonomia en un dispositiu de subjectivació tecnològica. Per revertir aquesta tendència, la teoria requereix eines pràctiques de computació sobirana que es detallen a continuació.

## 5. Bloc IV: Recursos Tècnics i d'Intel·ligència Artificial

La implementació del "Dret Planer" exigeix recursos que garanteixin la transparència cognitiva. La programació lògica declarativa, representada pel llenguatge Blawx (Morris, 2024), permet que el codi sigui llegible i auditable per juristes, tancant el cercle de la transparència i evitant l'opacitat de les "caixes negres". Aquests recursos tècnics, juntament amb els models de llenguatge sobirans, permeten una automatització que no renuncia a la deliberació moral.

- BSC-CNS. (2024). *Salamandra-7B-instruct: Model de llenguatge per a la sobirania digital*. Projecte AINA.
- Dantart, J. (2025). *Arquitectures de dades per a la justícia algorítmica*. Editorial Tècnica.
- López de Mántaras, R. (2017). *Inteligencia Artificial*. CSIC.
- Morris, J. (2024). *Blawx: A declarative logic programming language for law*. GitHub Repository.
- Projecte AINA. (2024). *Corpus i recursos lingüístics per al dret en català*. Generalitat de Catalunya & Govern d'Andorra.
- Saggion, H. (2024). *Automatic Simplification of Legal Texts*. Springer.
- Serra, P. (2024). *Models Roberta-base-ca-v2 i l'optimització per al llenguatge jurídic*. Proceedings of NLP Legal Summit.

Aquesta síntesi bibliogràfica tanca el cercle entre la norma suprema, la doctrina més exigent i la tecnologia sobirana, garantint que el futur del dret a Andorra i a Europa romangui accessible, transparent i humanament planificat.
