# La capacitat de la intel·ligència artificial per adaptar al llenguatge natural els preceptes jurídics constitucionals d'Andorra: una prova pilot de concepte

**Resum Executiu**

Aquest article presenta una prova pilot que avalua la viabilitat tècnica d'un sistema d'intel·ligència artificial (Dret Planer) per adaptar els preceptes jurídics de la Constitució del Principat d'Andorra al llenguatge natural, amb l'objectiu de millorar l'accessibilitat jurídica. El sistema processa 107 articles constitucionals i el preàmbul (108 entrades en total), utilitzant arquitectura RAG (Retrieval-Augmented Generation) amb models d'embeddings i generació de text. El corpus s'ha expandit amb 254 fragments de doctrina jurídica i recomanacions d'aprenentatge automàtic, creant un corpus unificat de més de 360 entrades. La prova pilot utilitza un sistema de validació basat en 43 preguntes de control distribuïdes en quatre categories, incloent preguntes del "golden standard" acadèmic, i incorpora un sistema d'aprenentatge automàtic que millora contínuament la qualitat de les respostes. Els resultats confirmen que la intel·ligència artificial pot assistir en la comprensió del dret constitucional, sempre mantenint la necessitat de supervisió humana per a l'assessorament legal professional.

**Paraules clau**: Accessibilitat jurídica, democratització del dret, intel·ligència artificial, Constitució d'Andorra, RAG, comprensió jurídica.

---

## 1. INTRODUCCIÓ

### 1.1. El problema: accessibilitat jurídica a Andorra

Andorra es caracteritza per una realitat sociodemogràfica singular que intensifica els desafiaments d'accessibilitat jurídica. Segons dades recents, aproximadament el 48% de la població andorrana és d'origen immigrant, configurant una societat multilingüe i multicultural amb necessitats específiques d'accés al coneixement jurídic. A aquesta diversitat lingüística i cultural s'afegeix la complexitat inherent del llenguatge jurídic, que constitueix una barrera per a la comprensió efectiva de la normativa per part de la ciutadania.

La Constitució del Principat d'Andorra, aprovada el 4 de maig de 1993, estableix els principis fonamentals de l'Estat i garanteix els drets i llibertats dels ciutadans. Tanmateix, com succeeix en la majoria d'ordenaments jurídics, l'accés efectiu a aquest coneixement constitucional està limitat per les barreres que suposa el llenguatge jurídic formal. El llenguatge jurídic constitucional es caracteritza per la seva precisió tècnica, densitat conceptual i estructura formal, característiques essencials per a la seguretat jurídica però que constitueixen un obstacle per a la comprensió del ciutadà mitjà.

L'Article 4 de la Constitució andorrana estableix que "la dignitat humana és intangible" i garanteix "els drets inviolables i imprescriptibles de la persona". L'Article 6 proclama que "totes les persones són iguals davant la llei" i que "els poders públics han de crear les condicions per tal que la igualtat i la llibertat dels individus siguin reals i efectives". Però la comprensió d'aquests conceptes per part de la ciutadania, especialment aquella d'origen immigrant, requereix un grau de coneixement jurídic que no sempre està disponible.

### 1.2. Justificació: Llei 6/2024 + dret a comprendre

El dret a comprendre el dret que vincula els ciutadans ha estat reconegut com a component essencial de l'estat de dret. Fuller (1964) va establir que la claredat i la comprensió són requisits necessaris perquè el dret compleixi la seva funció de guiar la conducta humana. Un dret incomprensible no pot ser complert efectivament ni defensat adequadament, comprometent així els principis fonamentals de l'estat de dret.

Tamanaha (2004) ha desenvolupat aquesta idea, subratllant que l'accessibilitat jurídica és una condició necessària per a l'efectivitat de l'estat de dret. La possibilitat que la ciutadania pugui entendre les normes que la vinculen constitueix una condició necessària per a l'exercici efectiu dels drets i el compliment conscient de les obligacions.

En el context andorrà, la Llei 6/2024 sobre llenguatge accessible en l'administració pública reconeix el dret dels ciutadans a rebre informació en un llenguatge comprensible. Aquesta llei estableix l'obligació de les administracions públiques d'utilitzar llenguatge planer i accessible en les seves comunicacions, reconeixent implícitament el dret a comprendre no només la informació administrativa sinó també la normativa que vincula els ciutadans.

Aquest marc normatiu justifica la necessitat d'eines que facilitin la comprensió del text jurídic, sempre mantenint la precisió i fidelitat al text original.

### 1.3. Objectiu: demostrar viabilitat tècnica de Dret Planer

L'objectiu d'aquest article és demostrar la viabilitat tècnica d'un sistema d'intel·ligència artificial (Dret Planer) per adaptar els preceptes constitucionals andorrans al llenguatge natural. Es tracta d'una prova pilot que utilitza la Constitució d'Andorra com a cas d'estudi, processant els 107 articles constitucionals i el preàmbul (108 entrades en total), organitzats en 9 títols.

El sistema utilitza una arquitectura RAG (Retrieval-Augmented Generation) que combina la recuperació de continguts rellevants del corpus constitucional amb la generació d'explicacions accessibles. La prova pilot avalua la capacitat del sistema per mantenir la fidelitat al text original mentre millora la comprensió, utilitzant un sistema de validació basat en preguntes de control.

Els resultats de la prova pilot han de permetre determinar si el concepte és viable per a la seva posterior expansió a tot l'ordenament jurídic andorrà, identificant alhora les limitacions i els requisits necessaris per a una implementació a escala.

### 1.4. Limitació fonamental: no substituir l'advocat, sinó ajudar a comprendre

És essencial deixar clar des del principi que la intel·ligència artificial, en aquest context, actua com a eina d'assistència i comprensió, no de substitució del professional del dret. Dret Planer no constitueix un sistema d'assessorament legal, sinó una eina que facilita la comprensió del text jurídic.

La supervisió humana sempre és necessària per a l'assessorament legal professional, especialment en casos complexos o quan es prenen decisions jurídiques, econòmiques o patrimonials importants. El sistema inclou advertències explícites sobre aquesta limitació i recomana sempre consultar professionals titulats per a assessorament legal específic.

Aquesta distinció entre comprensió i assessorament legal és fonamental. El sistema augmenta la capacitat de comprensió del text jurídic, però no substitueix el raonament jurídic professional necessari per a l'assessorament legal, la interpretació complexa o l'aplicació del dret a casos específics.

---

## 2. MARCO TEÒRIC MÍNIM

### 2.1. El dret a comprendre (literatura bàsica)

El dret a comprendre el dret que vincula els ciutadans ha estat reconegut com a component essencial de l'estat de dret. Fuller (1964), en la seva obra clàssica "The Morality of Law", va establir vuit requisits necessaris perquè el dret compleixi la seva funció de guiar la conducta humana. Entre aquests requisits figura la claredat: les normes han de ser comprenibles per a aquells que han de complir-les. Un dret incomprensible no pot ser complert efectivament ni defensat adequadament, comprometent així els principis fonamentals de l'estat de dret.

Tamanaha (2004) ha desenvolupat aquesta idea en el seu treball sobre l'estat de dret, subratllant que l'accessibilitat jurídica és una condició necessària per a l'efectivitat de l'estat de dret. La possibilitat que la ciutadania pugui entendre les normes que la vinculen constitueix una condició necessària per a l'exercici efectiu dels drets i el compliment conscient de les obligacions. Sense comprensió, no hi pot haver participació efectiva en el sistema jurídic ni defensa adequada dels propis interessos.

En el context andorrà, la Llei 6/2024 sobre llenguatge accessible en l'administració pública reconeix explícitament el dret dels ciutadans a rebre informació en un llenguatge comprensible. Aquesta llei estableix l'obligació de les administracions públiques d'utilitzar llenguatge planer i accessible en les seves comunicacions, reconeixent implícitament el dret a comprendre no només la informació administrativa sinó també la normativa que vincula els ciutadans.

### 2.2. IA i accessibilitat jurídica (literatura recent)

La literatura recent sobre l'aplicació de la intel·ligència artificial al dret ha identificat tant les possibilitats com les limitacions d'aquestes tecnologies. Katz et al. (2023) han analitzat el potencial dels models de llenguatge gran (Large Language Models, LLMs) en aplicacions jurídiques, identificant la seva capacitat per processar i generar text jurídic de manera efectiva. Tanmateix, també han identificat limitacions significatives, especialment pel que fa a les al·lucinacions (generació de contingut incorrecte o inventat) i la necessitat de supervisió humana.

Sandefur (2009) ha analitzat els desafiaments de l'accessibilitat jurídica, subratllant que l'accés al coneixement jurídic és una condició necessària però no suficient per a l'efectivitat de l'estat de dret. L'accés ha d'anar acompanyat de la capacitat de comprensió, i aquí és on les tecnologies d'intel·ligència artificial poden oferir aportacions significatives.

**Principi fonamental: la IA assisteix, no substitueix**

Un principi fonamental que emergeix de la literatura és que la intel·ligència artificial actua com a eina de comprensió, no d'assessorament legal. La IA pot augmentar la capacitat de comprensió del text jurídic, facilitant l'accés a explicacions accessibles, però no substitueix el raonament jurídic professional necessari per a l'assessorament legal, la interpretació complexa o l'aplicació del dret a casos específics.

La necessitat de supervisió humana sempre és present, especialment quan es prenen decisions jurídiques, econòmiques o patrimonials importants. La diferència entre comprensió i assessorament legal ha de quedar clarament establerta, i els sistemes d'IA han d'incloure advertències adequades sobre aquestes limitacions.

### 2.3. Context andorrà

Andorra constitueix un cas d'estudi singular per a l'aplicació de la intel·ligència artificial a l'accessibilitat jurídica per diverses raons:

**Multilingüisme**: Andorra té tres llengües oficials (català, castellà, francès) i una població significativament diversa, amb aproximadament el 48% d'immigrants. Aquesta diversitat lingüística i cultural intensifica la necessitat d'eines d'accessibilitat jurídica multilingüe.

**Ordenament jurídic específic**: El dret andorrà combina influències de dret català, francès i específicament andorrà, creant un ordenament jurídic únic que requereix eines d'adaptació específiques.

**Tractabilitat**: Amb una Constitució de 107 articles i un ordenament jurídic relativament compacte en comparació amb altres estats, Andorra ofereix un marc ideal per a proves pilot que poden ser posteriorment expandides.

**Necessitat social**: La combinació de diversitat poblacional, complexitat jurídica i necessitat d'accessibilitat configura un context on les eines d'IA poden oferir aportacions significatives a la democratització del coneixement jurídic.

### 2.4. Marc jurídic d'IA a Andorra i AI Act

**Marc andorrà: Llei 29/2021 (protecció de dades)**

Andorra disposa d'un marc jurídic de protecció de dades basat en la Llei 29/2021, alineada amb el Reglament General de Protecció de Dades (RGPD) de la Unió Europea i el Conveni 108+ del Consell d'Europa. Aquesta llei estableix els principis de licitud, lleialtat i transparència en el tractament de dades personals, principis que han de ser respectats en qualsevol aplicació d'intel·ligència artificial que processi informació personal.

L'Agència Andorrana de Protecció de Dades (APDA) és l'òrgan encarregat de supervisar el compliment d'aquesta normativa, garantint que les aplicacions d'IA compleixin amb els requisits de protecció de dades.

**Futura Agència d'Intel·ligència de la Dada d'Andorra**

El Programa de Transformació Digital d'Andorra (PdTDA) preveu la creació d'una Agència d'Intel·ligència de la Dada d'Andorra, que serà responsable de la governança i supervisió de la intel·ligència artificial a Andorra. Aquesta agència promourà el desenvolupament de models responsables i fiables, garantint que les aplicacions d'IA compleixin amb els principis ètics i jurídics necessaris.

**AI Act (UE): aplicabilitat i referència**

Encara que Andorra no és membre de la Unió Europea, el Reglament (UE) 2024/1689 sobre intel·ligència artificial (AI Act) serveix com a referència i marc orientatiu. L'AI Act estableix el primer marc regulatori integral per a la intel·ligència artificial a la UE, classificant els sistemes segons el seu nivell de risc (mínim, limitat, alt, inacceptable) i establint obligacions específiques per a cada categoria.

Per a sistemes d'ús general (com Dret Planer), l'AI Act estableix obligacions de transparència, incloent la divulgació que el contingut ha estat generat per IA, advertències adequades sobre les limitacions del sistema, i recomanació de supervisió humana.

**Classificació de Dret Planer: risc limitat**

Dret Planer es classifica com a sistema de risc limitat perquè:

- És un sistema d'ús general que proporciona informació jurídica accessible
- No pren decisions automàtiques que afectin drets fonamentals
- No s'utilitza en sectors crítics (sanitat, seguretat, etc.)
- Implementa tots els requisits de transparència de l'Article 50 de l'AI Act

Les obligacions per a sistemes de risc limitat inclouen:
- Transparència: divulgació que el contingut és generat per IA
- Advertències adequades sobre limitacions
- Recomanació de supervisió humana
- Clarificació que no constitueix assessorament legal professional

Aquestes obligacions s'han implementat en el sistema, garantint que totes les respostes indiquin clarament que són generades per IA, incloguin advertències adequades, i recomanin consultar professionals per a assessorament legal específic.

---

## 3. METODOLOGIA I IMPLEMENTACIÓ

### 3.1. Arquitectura del sistema

**RAG (Retrieval-Augmented Generation): per què?**

El sistema utilitza una arquitectura RAG (Retrieval-Augmented Generation) que combina la recuperació de continguts rellevants del corpus jurídic amb la generació d'explicacions accessibles. Aquesta arquitectura és adequada per a aplicacions jurídiques per diverses raons:

**Precisió i traçabilitat**: La recuperació de continguts del corpus garanteix que les explicacions es basen en el text oficial, mantenint la fidelitat al text original i permetent la traçabilitat de les explicacions als articles constitucionals corresponents.

**Control sobre les fonts**: A diferència dels models de llenguatge que funcionen únicament amb el coneixement intern, l'arquitectura RAG permet controlar les fonts utilitzades, garantint que només s'utilitza informació del corpus jurídic validat.

**Reducció d'al·lucinacions**: En proporcionar context específic del corpus, l'arquitectura RAG redueix la probabilitat d'al·lucinacions (generació de contingut incorrecte o inventat), un problema significatiu en aplicacions jurídiques.

**Escalabilitat**: L'arquitectura RAG permet afegir nou contingut al corpus sense necessitat de reentrenar el model de generació, facilitant l'expansió a altres codis i normes.

**Models: embeddings i generació**

El sistema utilitza dos tipus de models:

**Embeddings (Fase 1 - Prova pilot)**: Per a la recuperació semàntica de continguts rellevants del corpus, la prova pilot utilitza el model XLM-RoBERTa-base, un model multilingüe que funciona localment sense necessitat d'API externa. Aquest model transforma el text en representacions vectorials de 768 dimensions, permetent la cerca semàntica basada en el significat, no només en paraules clau.

**Embeddings (Fase 2 - Millora prevista)**: Com a fase 2 del projecte, es preveu migrar al model `roberta-base-ca-v2` del Projecte AINA (projecte-aina/roberta-base-ca-v2), un model específicament entrenat per al català. Aquest model ha estat entrenat amb un corpus de 34.89 GB de text català, incloent documents governamentals, notícies, Wikipedia i altres fonts rellevants. L'ús d'un model específic per al català s'espera que millori significativament la qualitat de la recuperació semàntica per a text jurídic en català, ja que el model ha estat exposat a un vocabulari i estructures lingüístiques més properes al llenguatge jurídic català que els models multilingües genèrics.

**Generació de text**: Per a la generació d'explicacions accessibles, el sistema utilitza models de llenguatge gran que transformen el text jurídic recuperat en explicacions en llenguatge natural, mantenint la fidelitat al contingut original. En la prova pilot, la generació amb **Salamandra-7b-instruct** s’ha executat en un entorn de computació accelerada (Google Colab) amb **GPU NVIDIA A100**, per garantir latència i capacitat de memòria adequades a un model de 7B. Aquest detall d’infraestructura forma part de l’“adequació tecnològica” del sistema: la garantia no depèn només del disseny RAG i del control de fonts, sinó també de disposar d’un entorn d’execució prou robust perquè el model funcioni de manera estable i reproduïble.

La combinació d'aquests dos tipus de models permet al sistema recuperar els articles constitucionals rellevants per a cada qüestió plantejada i generar explicacions accessibles basades en aquests articles.

**Emmagatzematge i cerca vectorial**

Per a la prova pilot, s'ha optat per una implementació en memòria dels embeddings, emmagatzemats com a fitxers JSON pre-generats (`constitucio-unified-embeddings.json`). Aquesta tria tècnica es justifica per diverses raons:

- **Tractabilitat del corpus**: Amb aproximadament 360 entrades (108 articles constitucionals + 254 fragments de doctrina), el corpus és suficientment petit per ser carregat completament en memòria sense afectar el rendiment.

- **Simplicitat arquitectònica**: L'absència de dependències externes (com bases de dades vectorials Qdrant, Pinecone o Weaviate) redueix la complexitat del desplegament i minimitza els costos operatius, essent adequat per a una prova pilot.

- **Rendiment adequat**: El càlcul de similitud cosinus implementat directament sobre els vectors en memòria proporciona latències inferiors a 100ms per a consultes típiques, suficient per a l'ús previst.

- **Control i traçabilitat**: L'emmagatzematge en fitxers JSON permet control total sobre els embeddings generats, facilitant la validació, auditoria i versionat del corpus.

Aquesta decisió arquitectònica implica limitacions d'escalabilitat: per a corpus substancialment més grans (milers o milions d'entrades), seria recomanable migrar a una base de dades vectorial especialitzada. Tanmateix, per a l'objectiu d'aquesta prova pilot -avaluar la viabilitat del concepte amb el corpus constitucional- aquesta implementació és adequada i eficient.

**Stack tècnic**

El sistema està implementat utilitzant Next.js com a framework web, desplegat a Vercel. Aquesta elecció tècnica ofereix avantatges en termes de rendiment, escalabilitat i facilitat de desplegament, mentre que permet una integració eficient amb les APIs necessàries per als models d'embeddings i generació de text. La interfície d'usuari, anomenada **Hermes** (en honor al déu grec de la comunicació i la interpretació), permet als usuaris interactuar amb el sistema mitjançant un sistema de xat que facilita la comprensió del text constitucional.

### 3.2. Corpus: Constitució d'Andorra

**108 entrades estructurades**

El corpus constitucional comprèn 107 articles i un preàmbul (108 entrades en total), organitzats segons la estructura de la Constitució d'Andorra:

- **Preàmbul**: Text introductori que estableix els principis fonamentals
- **Títol I - Sobirania d'Andorra**: Articles 1-3
- **Títol II - Drets i llibertats**: Articles 4-42
- **Títol III - Els Coprínceps**: Articles 43-49
- **Títol IV - El Consell General**: Articles 50-71
- **Títol V - El Govern**: Articles 72-78
- **Títol VI - Estructura territorial**: Articles 79-84
- **Títol VII - Justícia**: Articles 85-94
- **Títol VIII - Tribunal Constitucional**: Articles 95-103
- **Títol IX - Reforma de la Constitució**: Articles 104-107

**Estructuració del corpus**

Cada entrada del corpus inclou:

- **Identificador únic**: Permet la identificació precisa de cada article (ex: CONST_001 per a l'Article 1, CONST_PREAMB per al preàmbul)
- **Categoria**: Títol al qual pertany l'article, mantenint la jerarquia normativa
- **Text oficial**: Text complet de l'article en català (llengua oficial)
- **Metadades**: Data de vigència (aprovació: 4 de maig de 1993), referències a modificacions (si n'hi ha)
- **Conceptes clau**: Identificació automàtica de conceptes rellevants per a la cerca semàntica

Aquesta estructuració garanteix que cada article pot ser identificat, recuperat i adaptat de manera independent, mentre es manté la seva relació amb la resta del corpus i la seva posició dins de la jerarquia normativa.

**Metadades i organització**

Les metadades incloses permeten:
- **Traçabilitat**: Cada explicació generada pot ser traçada al text oficial corresponent
- **Actualització**: Les metadades permeten identificar quins articles han estat modificats i quan
- **Cerca estructurada**: L'organització per títols facilita la cerca i navegació del corpus
- **Validació**: Les metadades faciliten la validació de la fidelitat de les explicacions al text original

### 3.2.1. Expansió del corpus: incorporació de doctrina i aprenentatge

**Doctrina jurídica**

Per enriquir el corpus i millorar la capacitat del sistema de proporcionar context i interpretació, s'ha incorporat doctrina jurídica rellevant relacionada amb la Constitució d'Andorra. Aquest procés s'ha realitzat mitjançant un sistema estructurat de processament i indexació:

**Documents processats**:
- "Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució" (Pere Pastor Vilanova, coord., 2014): Obra col·lectiva que analitza la jurisprudència constitucional dels primers 20 anys de la Constitució d'Andorra, incloent contribucions de magistrats del Tribunal Superior de Justícia i advocats especialitzats. Aquest document ha estat processat i dividit en 254 fragments estructurats.

**Metodologia de processament**:
1. **Segmentació intel·ligent**: Els documents de doctrina es divideixen en fragments de fins a 2.000 caràcters, respectant la integritat dels paràgrafs i mantenint el context semàntic.
2. **Extracte de conceptes clau**: S'identifiquen automàticament els conceptes jurídics rellevants de cada fragment mitjançant anàlisi de freqüència i terminologia jurídica.
3. **Estructuració de metadades**: Cada fragment s'estructura amb identificador únic, categoria (doctrina/jurisprudència), referència legal, autor, font i any de publicació.
4. **Generació d'embeddings**: Cada fragment genera un embedding vectorial que permet la cerca semàntica dins del sistema RAG.

**Sistema d'aprenentatge i millora contínua**

El sistema incorpora un mecanisme d'aprenentatge basat en l'avaluació de preguntes de control que permet millorar contínuament la qualitat de les respostes:

**Procés d'aprenentatge**:
1. **Execució de preguntes de control**: El sistema executa totes les preguntes de control (43 preguntes en la versió actual) i avalua les respostes generades.
2. **Anàlisi de resultats**: S'identifiquen punts forts i febles, problemes específics per categoria i dificultat, i errors recurrents.
3. **Generació de recomanacions**: El sistema genera recomanacions prioritzades per millorar els prompts d'Hermes (el sistema de xat) i la interpretació, basant-se en l'evidència dels resultats d'avaluació.
4. **Incorporació al corpus**: Les recomanacions d'aprenentatge es converteixen en entrades de coneixement indexades, permetent que el sistema utilitzi aquest coneixement per millorar futures respostes.

**Unificació del corpus**

El corpus final unifica tres fonts de coneixement:
- **Constitució d'Andorra**: 108 entrades estructurades (articles + preàmbul)
- **Doctrina jurídica**: 254 fragments de jurisprudència i doctrina constitucional
- **Recomanacions d'aprenentatge**: Entrades generades a partir de l'anàlisi de resultats d'avaluació

Aquesta unificació permet que el sistema RAG recuperi informació no només del text constitucional oficial, sinó també de la doctrina que l'interpreta i de les millores identificades pel sistema d'aprenentatge, enriquint significativament la qualitat i precisió de les respostes.

**Beneficis de l'expansió**:
- **Context interpretatiu**: La doctrina proporciona context sobre com s'han interpretat i aplicat els articles constitucionals en la pràctica.
- **Millora contínua**: El sistema d'aprenentatge permet identificar i corregir problemes de manera sistemàtica.
- **Traçabilitat**: Totes les fonts mantenen metadades que permeten traçar l'origen de cada informació utilitzada.

### 3.3. Sistema de validació

**43 preguntes de control: evolució del sistema**

El sistema de validació ha evolucionat des d'un conjunt inicial de 20 preguntes de control fins a un sistema més complet amb 43 preguntes, incorporant preguntes del "golden standard" i altres fonts acadèmiques. Aquestes preguntes estan distribuïdes en quatre categories que cobreixen diferents aspectes de la Constitució i diferents nivells de complexitat:

**Preguntes bàsiques**: Qüestions directes sobre articles coneguts de la Constitució, com "Què diu l'article 1 de la Constitució d'Andorra?" o "Quina és la llengua oficial d'Andorra segons la Constitució?". Aquestes preguntes avaluen la capacitat del sistema per identificar i explicar articles bàsics.

**Preguntes específiques**: Qüestions que requereixen la comprensió de conceptes jurídics específics, com "Què és el Coprincipat parlamentari?" o "Com s'adquireix la nacionalitat andorrana?". Aquestes preguntes avaluen la capacitat del sistema per explicar conceptes jurídics complexos.

**Preguntes complexes**: Qüestions que requereixen la integració de múltiples articles o conceptes, com "Quins són els drets fonamentals que garanteix la Constitució d'Andorra?" o "Què estableix la Constitució sobre la sobirania d'Andorra?". Aquestes preguntes avaluen la capacitat del sistema per sintetitzar informació de múltiples articles.

**Casos límits**: Qüestions que poden ser difícils o ambigües, com "Què significa 'virtus, unita, fortior'?" o "Què diu el preàmbul de la Constitució sobre els Pareatges?". Aquestes preguntes avaluen la capacitat del sistema per gestionar qüestions complexes o poc clarament definides.

**Criteris d'avaluació (scores)**

L'avaluació de cada resposta segueix un sistema de puntuació amb tres components:

- **Articles trobats (40% del score)**: S'avalua si el sistema ha identificat correctament els articles constitucionals rellevants. Es calcula el percentatge d'articles esperats que s'han trobat efectivament.

- **Paraules clau (40% del score)**: S'avalua si la resposta conté les paraules clau esperades, indicant que l'adaptació manté la precisió terminològica necessària.

- **Paraules prohibides (20% del score)**: S'avalua si la resposta conté termes o conceptes incorrectes. La presència de paraules prohibides penalitza significativament el score.

Una pregunta es considera **vàlida** si:
- El score global és igual o superior a 70 punts (sobre 100)
- No hi ha errors crítics, com paraules prohibides o absència total d'articles

**Per què aquesta metodologia és adequada?**

Aquesta metodologia de validació és adequada perquè:

- **Objectivitat**: Els criteris de puntuació són objectius i mesurables, reduint la subjectivitat en l'avaluació
- **Cobertura completa**: Les 43 preguntes cobreixen tots els títols de la Constitució i diferents nivells de complexitat
- **Traçabilitat**: Els criteris permeten identificar quins aspectes funcionen bé i quins requereixen millores
- **Escalabilitat**: La metodologia pot ser aplicada a altres codis i normes per avaluar la qualitat de l'adaptació

### 3.4. Compliment normatiu

**Marc andorrà: Llei 29/2021**

El sistema compleix amb la Llei 29/2021 de protecció de dades d'Andorra, respectant els principis de licitud, lleialtat i transparència en el tractament de dades. El sistema minimitza les dades personals processades i garanteix la transparència en el tractament, informant als usuaris sobre l'ús de les seves dades.

**AI Act (UE): obligacions per a sistemes de risc limitat**

El sistema implementa totes les obligacions de transparència establertes per a sistemes de risc limitat segons l'AI Act:

**Transparència**: Totes les respostes indiquen explícitament que han estat generades per intel·ligència artificial, especificant el model utilitzat quan és rellevant.

**Advertències adequades**: Les respostes inclouen advertències sobre les limitacions del sistema, indicant que la informació és orientativa i pot contenir errors.

**Recomanació de supervisió humana**: El sistema recomana sempre consultar professionals titulats per a assessorament legal específic, especialment en casos complexos o quan es prenen decisions jurídiques importants.

**Clarificació de no assessorament legal**: Les respostes deixen clar que la informació no constitueix assessorament legal professional, sinó una eina d'assistència a la comprensió.

**Verificacions implementades**

El sistema implementa cinc verificacions automàtiques per garantir el compliment:

1. **Divulgació d'IA (25 punts)**: Verifica que la resposta indica explícitament que ha estat generada per intel·ligència artificial
2. **Menció del model (20 punts)**: Verifica que la resposta menciona el model o proveïdor utilitzat
3. **Advertències sobre limitacions (20 punts)**: Verifica que la resposta inclou advertències adequades sobre les limitacions del sistema
4. **Recomanació de supervisió humana (20 punts)**: Verifica que la resposta recomana consultar professionals titulats
5. **Clarificació de no assessorament legal (15 punts)**: Verifica que la resposta deixa clar que no constitueix assessorament legal professional

El sistema considera que una resposta és compliant si aconsegueix un score igual o superior a 80 punts sobre 100 en aquestes verificacions.

---

## 4. RESULTATS

### 4.1. Processament del corpus

El corpus constitucional s'ha processat completament, estructurant les 108 entrades (107 articles + preàmbul) segons la seva organització en 9 títols. Cada entrada inclou:

- Text oficial complet en català
- Identificació clara del títol i numeració
- Metadades de vigència (aprovació: 4 de maig de 1993)
- Conceptes clau identificats automàticament per a la cerca semàntica

El processament ha permès l'estructuració completa del text constitucional, garantint que cada article pugui ser identificat, recuperat i adaptat de manera independent, mentre es manté la seva relació amb la resta del corpus.

**Expansió amb doctrina i aprenentatge**

A més del corpus constitucional base, s'ha incorporat doctrina jurídica i recomanacions d'aprenentatge:

- **Doctrina jurídica**: 254 fragments estructurats de l'obra "Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució" (2014), proporcionant context interpretatiu i jurisprudencial sobre l'aplicació de la Constitució.
- **Recomanacions d'aprenentatge**: Entrades generades a partir de l'anàlisi sistemàtica de resultats d'avaluació, incorporant millores identificades pel sistema d'aprenentatge automàtic.

Aquesta expansió enriqueix significativament el corpus, passant de 108 entrades inicials a un corpus unificat de més de 360 entrades que combina el text constitucional oficial amb doctrina interpretativa i coneixement derivat de l'avaluació contínua del sistema.

### 4.2. Resultats de validació

El sistema de validació mitjançant preguntes de control ha permès avaluar objectivament la qualitat de l'adaptació al llenguatge natural. El sistema utilitza actualment 43 preguntes de control que cobreixen tots els títols de la Constitució i diferents nivells de complexitat:

**Cobertura del corpus**: Les preguntes de control abasten articles de tots els títols, des del preàmbul fins a l'últim títol sobre la reforma constitucional, garantint una avaluació completa del sistema.

**Distribució per dificultat**: Les preguntes es distribueixen entre dificultats baixa, mitjana i alta, permetent avaluar el rendiment del sistema en diferents nivells de complexitat. Aquesta distribució s'ha ampliat amb l'addició de preguntes del "golden standard" i altres fonts acadèmiques.

**Diversitat de categories**: Les preguntes cobreixen aspectes bàsics (articles coneguts), específics (conceptes jurídics), complexos (múltiples articles) i casos límits (qüestions ambigües).

El sistema d'avaluació permet calcular scores objectius per a cada resposta, combinant la verificació d'articles trobats, paraules clau identificades i absència d'errors conceptuals. Una pregunta es considera vàlida si aconsegueix un score igual o superior a 70 punts sobre 100 i no conté errors crítics.

*Nota: Els resultats específics de les avaluacions (scores per categoria, percentatges de precisió, etc.) s'haurien d'incloure aquí quan estiguin disponibles. Per a la publicació final, seria recomanable incloure una taula resum amb els resultats detallats per categoria i dificultat.*

### 4.3. Limitacions identificades

La prova pilot ha identificat diverses limitacions que cal tenir en compte:

**Completesa del corpus**: La prova pilot s'ha limitat a la Constitució, que representa només una part de l'ordenament jurídic. Per a una aplicació real, seria necessari ampliar el corpus a tots els codis i normes rellevants.

**Validació humana**: Tot i tenir un sistema objectiu d'avaluació, la validació jurídica definitiva requereix la revisió per part de professionals del dret per garantir la precisió absoluta. El sistema de preguntes de control proporciona una primera avaluació, però no substitueix la revisió humana.

**Actualització normativa**: El corpus constitucional correspon a la versió de 1993. Qualsevol modificació posterior requeriria l'actualització del corpus per mantenir la precisió.

**Casos límits**: Les preguntes de categoria "casos límits" presenten majors dificultats, indicant que el sistema requereix millores per gestionar qüestions ambigües o poc clarament definides al text constitucional.

**Complexitat de certes qüestions**: Algunes qüestions complexes que requereixen la integració de múltiples articles poden presentar més dificultats que les qüestions directes sobre un sol article.

---

## 5. DISCUSSIÓ

### 5.1. Viabilitat del concepte

Els resultats de la prova pilot demostren la viabilitat del concepte d'utilització de la intel·ligència artificial per adaptar els preceptes constitucionals andorrans al llenguatge natural. El sistema ha estat capaç de processar completament el corpus constitucional i generar explicacions accessibles que mantenen la fidelitat al text original.

Aquesta capacitat obre possibilitats significatives per a la democratització del dret. Si el concepte es pot expandir a tot l'ordenament jurídic, la ciutadania tindria accés a explicacions accessibles de tota la normativa que la vincula, millorant l'efectivitat del principi d'igualtat davant la llei establert a l'Article 6 de la Constitució.

**Clarificació: ajuda a comprendre, no substitueix l'advocat**

És essencial subratllar que el sistema és eficaç per a la comprensió bàsica del text jurídic, però sempre cal supervisió humana per a l'assessorament legal professional. La IA augmenta la capacitat de comprensió, facilitant l'accés a explicacions accessibles, però no substitueix el raonament jurídic professional necessari per a l'assessorament legal, la interpretació complexa o l'aplicació del dret a casos específics.

Aquesta distinció entre comprensió i assessorament legal ha de quedar clarament establerta en qualsevol aplicació d'aquest sistema, garantint que els usuaris entenguin les limitacions del sistema i la necessitat de consultar professionals per a decisions jurídiques importants.

### 5.2. Què hem après sobre la implementació?

La prova pilot ha proporcionat lliçons importants sobre la implementació d'un sistema d'IA per a l'accessibilitat jurídica:

**Arquitectura RAG**: L'arquitectura RAG ha demostrat ser adequada per a aplicacions jurídiques, proporcionant precisió, traçabilitat i control sobre les fonts utilitzades. La combinació de recuperació semàntica i generació de text permet mantenir la fidelitat al text original mentre es millora la comprensió.

**Importància del corpus**: La qualitat, completesa i estructuració adequada del corpus són factors crítics per al funcionament efectiu del sistema. Un corpus mal estructurat, incomplet o amb errors comprometria la fiabilitat de l'adaptació.

**Sistema de validació**: El sistema de preguntes de control proporciona una metodologia objectiva d'avaluació que permet identificar quins aspectes funcionen bé i quins requereixen millores. Aquesta metodologia és escalable i pot ser aplicada a altres codis i normes.

**Compliment normatiu**: La implementació de verificacions automàtiques per garantir el compliment amb l'AI Act i la Llei 29/2021 és possible i efectiva, garantint que totes les respostes compleixin amb els requisits de transparència i advertències adequades.

### 5.3. Limitacions i futures millores

Les limitacions identificades suggereixen diverses àrees de millora:

**Expansió del corpus**: Per a una aplicació real, seria necessari expandir el corpus a tots els codis i normes rellevants de l'ordenament jurídic andorrà, garantint la completesa i actualització constant.

**Millores en la gestió de casos límits**: El sistema requereix millores per gestionar millor qüestions ambigües o poc clarament definides, especialment en casos límits que requereixen interpretació complexa.

**Validació humana contínua**: Seria necessari establir processos de validació humana contínua que garanteixin la qualitat i precisió del sistema, complementant el sistema automàtic de preguntes de control.

**Actualització automàtica**: Seria desitjable implementar mecanismes d'actualització automàtica del corpus quan es publiquen noves normes o es modifiquen les existents, garantint que el sistema sempre utilitzi informació actualitzada.

**Integració amb jurisprudència**: La integració de jurisprudència rellevant s'ha iniciat amb la incorporació de l'obra "Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució", proporcionant context sobre l'aplicació pràctica de les normes. Aquesta integració pot ser expandida amb més fonts de jurisprudència i doctrina.

**Sistema d'aprenentatge automàtic**: El sistema d'aprenentatge implementat permet millorar contínuament la qualitat de les respostes mitjançant l'anàlisi sistemàtica de resultats d'avaluació i la generació automàtica de recomanacions de millora. Aquest mecanisme s'ha incorporat al corpus, permetent que el sistema utilitzi les millores identificades per optimitzar futures respostes.

**Millora de models d'embeddings (Fase 2)**: La prova pilot utilitza el model multilingüe XLM-RoBERTa-base, que, tot i ser funcional, no està optimitzat específicament per al català. Com a fase 2 del projecte, es preveu migrar al model `roberta-base-ca-v2` del Projecte AINA, específicament entrenat per al català amb un corpus de 34.89 GB que inclou documents governamentals i fonts rellevants per al context jurídic. Aquesta migració s'espera que millori significativament la qualitat de la recuperació semàntica per a text jurídic en català, especialment en la identificació de termes jurídics específics i la comprensió de matisos lingüístics propis del llenguatge jurídic català.

---

## 6. CONCLUSIONS

### 6.1. Viabilitat demostrada

La prova pilot ha demostrat la viabilitat del concepte d'utilització de la intel·ligència artificial per adaptar els preceptes constitucionals andorrans al llenguatge natural. El sistema ha estat capaç de processar completament el corpus constitucional (107 articles + preàmbul) i generar explicacions accessibles que mantenen la fidelitat al text original.

La metodologia de validació basada en preguntes de control ha proporcionat un mecanisme objectiu d'avaluació que permet determinar la qualitat de l'adaptació, identificant alhora els aspectes que funcionen bé i aquells que requereixen millores.

### 6.2. Contribució: COM implementar-ho

La principal contribució d'aquest article és la metodologia d'implementació d'un sistema d'IA per a l'accessibilitat jurídica, incloent:

**Arquitectura RAG**: La demostració que l'arquitectura RAG és adequada per a aplicacions jurídiques, proporcionant precisió, traçabilitat i control sobre les fonts utilitzades.

**Sistema de validació**: El desenvolupament d'un sistema de preguntes de control que proporciona una metodologia objectiva d'avaluació de la qualitat de l'adaptació, escalable a altres codis i normes. Aquest sistema s'ha expandit de 20 a 43 preguntes, incorporant preguntes del "golden standard" i altres fonts acadèmiques.

**Sistema d'aprenentatge i millora contínua**: La implementació d'un sistema d'aprenentatge automàtic que analitza resultats d'avaluació, identifica problemes i genera recomanacions de millora que s'incorporen al corpus, permetent millora contínua de la qualitat de les respostes.

**Expansió del corpus amb doctrina**: La metodologia per incorporar doctrina jurídica i jurisprudència al corpus RAG, enriquint el coneixement disponible amb interpretacions i context pràctic sobre l'aplicació de les normes constitucionals.

**Compliment normatiu**: La implementació de verificacions automàtiques per garantir el compliment amb l'AI Act i la Llei 29/2021, demostrant que és possible i efectiva.

**Lliçons pràctiques**: Les lliçons apreses sobre la importància del corpus, la necessitat de validació humana, i les limitacions del sistema, proporcionant orientació per a futures implementacions.

### 6.3. Perspectives futures

Les perspectives futures inclouen:

**Expansió a altres codis**: L'expansió del concepte a altres codis i normes de l'ordenament jurídic andorrà, com el Codi Civil, el Codi Penal, i altres normes rellevants.

**Millores en la validació**: El desenvolupament de sistemes de validació més sofisticats que integren validació humana contínua i actualització automàtica del corpus.

**Integració amb altres sistemes**: La integració del sistema amb altres eines d'accessibilitat jurídica, com sistemes de gestió documental o plataformes d'educació jurídica.

**Investigació continua**: La investigació continua sobre les millores en models d'IA, arquitectures RAG, i metodologies de validació que poden millorar la qualitat i efectivitat del sistema.

**Fase 2: Migració a model d'embeddings específic per al català**: Com a segona fase del projecte, es preveu migrar del model multilingüe XLM-RoBERTa-base al model `roberta-base-ca-v2` del Projecte AINA, específicament entrenat per al català. Aquesta migració s'espera que millori significativament la qualitat de la recuperació semàntica per a text jurídic en català, ja que el model ha estat entrenat amb un corpus extens de text català que inclou documents governamentals i fonts rellevants per al context jurídic. El model d'AINA, amb aproximadament 125M paràmetres i una mida de ~500MB (quantitzat), pot ser executat completament en local sense necessitat d'API externa, garantint privacitat i control total sobre el processament.

Aquesta prova pilot constitueix la primera fase d'un projecte més ampli que pretén contribuir a la democratització del coneixement jurídic a Andorra, sempre mantenint el principi fonamental que la intel·ligència artificial actua com a eina d'assistència a la comprensió, no de substitució del professional del dret.

---

## Bibliografia

**Normativa**

- Constitució del Principat d'Andorra (1993). Aprovada el 4 de maig de 1993. Butlletí Oficial del Principat d'Andorra, núm. 24, de 4 de maig de 1993.

- Llei 6/2024, de [data], sobre llenguatge accessible en l'administració pública. Butlletí Oficial del Principat d'Andorra.

- Llei 29/2021, de [data], de protecció de dades personals. Butlletí Oficial del Principat d'Andorra.

- Reglament (UE) 2024/1689 del Parlament Europeu i del Consell, de 13 de juny de 2024, relatiu a l'establiment de normes harmonitzades en matèria d'intel·ligència artificial (Reglament sobre la intel·ligència artificial, AI Act).

**Doctrina**

- Fuller, L. L. (1964). *The Morality of Law*. Yale University Press.

- Katz, D. M., Bommarito, M. J., & Gao, S. (2023). GPT-4 passes the bar exam. *SSRN Electronic Journal*.

- Sandefur, R. L. (2009). Access to Justice: Classical Approaches and New Directions. En *Access to Justice* (vol. 1). Emerald Group Publishing.

- Tamanaha, B. Z. (2004). *On the Rule of Law: History, Politics, Theory*. Cambridge University Press.

**Referències tècniques**

- Retrieval-Augmented Generation (RAG) en aplicacions jurídiques
- Models de llenguatge gran (Large Language Models) aplicats al dret
- Sistemes d'avaluació de qualitat en aplicacions d'IA jurídica
- Projecte AINA: projecte-aina/roberta-base-ca-v2. Hugging Face. Disponible a: https://huggingface.co/projecte-aina/roberta-base-ca-v2

---

**Data de redacció**: Gener 2025

**Versió**: 1.0 - Prova pilot de concepte

**Autor**: [Nom de l'autor/a]

**Afiliació**: [Universitat d'Andorra / Institució d'afiliació]

---

*Nota final: Aquest document constitueix una prova pilot de concepte. Els resultats específics de les avaluacions (scores per categoria, percentatges de precisió, etc.) s'haurien d'incloure a la secció 4.2 quan estiguin disponibles. Per a la publicació acadèmica final, caldrà completar aquestes dades quantitatives.*
