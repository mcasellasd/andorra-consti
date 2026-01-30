# Marc Jurídic i Estratègies Tècniques per a l'Entrenament de Sistemes d'Intel·ligència Artificial: Una Anàlisi de Compliment de la Normativa de Propietat Intel·lectual i el Reglament d'IA

L'evolució frenètica de la intel·ligència artificial (IA) generativa ha situat el dret de propietat intel·lectual en el centre d'un debat complex sobre la sostenibilitat del sistema de creació i la innovació tecnològica. L'entrenament de models de llenguatge de gran escala (LLM) i altres sistemes d'IA depèn de la ingesta de volums massius de dades, moltes de les quals estan protegides per drets d'autor. En l'àmbit acadèmic i professional, la qüestió de com entrenar aquests sistemes sense infringir el marc legal vigent requereix una comprensió profunda de la **Directiva (UE) 2019/790** sobre drets d'autor en el mercat únic digital (Directiva DSM), la seva transposició a la legislació espanyola i les noves obligacions de transparència imposades pel **Reglament d'Intel·ligència Artificial** de la Unió Europea (AI Act). L'anàlisi indica que el compliment no només depèn de l'absència d'infracció directa, sinó de la implementació de **protocols de governança de dades** que garanteixin l'accés legítim, el respecte a la reserva de drets i la transparència en la procedència dels continguts.

---

## Fonaments Legals de la Mineria de Textos i Dades a la Unió Europea

El marc jurídic europeu ha estat pioner a l'hora d'abordar els reptes que planteja el rastreig de dades (web scraping) per a finalitats analítiques i d'entrenament. La Directiva DSM introdueix dos límits o excepcions clau als drets exclusius de reproducció i extracció dels titulars que són fonamentals per a qualsevol projecte d'IA. Aquests límits s'articulen al voltant de la **mineria de textos i dades (TDM)**, definida com qualsevol tècnica analítica automatitzada destinada a analitzar textos i dades en format digital per generar informació que inclogui patrons, tendències i correlacions.

### L'Excepció per a la Investigació Científica (Article 3)

L'article 3 de la Directiva DSM estableix una excepció **obligatòria i imperativa** per a organismes d'investigació i institucions de patrimoni cultural. Aquest precepte permet la reproducció d'obres per a finalitats de mineria de dades sempre que l'activitat es realitzi amb finalitats d'investigació científica. Un aspecte crític d'aquesta excepció és que **no pot ser limitada per acords contractuals**; qualsevol clàusula en una llicència d'una editorial que prohibeixi la TDM per a investigació científica seria, en principi, inaplicable davant d'aquest dret legal. A més, les institucions poden conservar les còpies de les obres per a la verificació posterior dels resultats de la recerca en un entorn segur.

### L'Excepció General i el Mecanisme d'Opt-out (Article 4)

Per a entitats que no siguin organismes de recerca o per a finalitats comercials, l'article 4 de la Directiva DSM permet la TDM sobre obres a les quals s'hagi tingut **accés legítim**, a condició que els titulars dels drets no hagin "reservat expressament" l'ús de les seves obres. Aquesta reserva de drets, coneguda tècnicament com a **mecanisme d'opt-out**, s'ha de fer d'una manera adequada, especialment mitjançant mitjans **legibles per màquina** quan el contingut es troba en línia. Aquest marc crea un sistema de llicència implícita per defecte: si l'autor no diu el contrari de forma automatitzada, la dada es pot minar, sempre que l'accés sigui lícit.

| Categoria | Article 3 (Investigació Científica) | Article 4 (Finalitat General/Comercial) |
|-----------|-------------------------------------|----------------------------------------|
| **Beneficiaris** | Organismes d'investigació, Biblioteques, Museus | Qualsevol persona física o jurídica |
| **Finalitat** | Investigació científica sense ànim de lucre | Qualsevol, inclosa la comercial |
| **Caràcter de la Norma** | Imperativa (no superable per contracte) | Dispositiva (superable per contracte/opt-out) |
| **Requisit d'Accés** | Accés legítim requerit | Accés legítim requerit |
| **Reserva de Drets** | No permesa als titulars | Permesa mitjançant formats llegibles per màquina |

---

## Transposició a l'Ordenament Espanyol: El Real Decreto-ley 24/2021

A l'Estat espanyol, aquestes disposicions es van integrar mitjançant el **Real Decreto-ley 24/2021**, que va modificar el Text Refós de la Llei de Propietat Intel·lectual (LPI). L'article 67 d'aquest reial decret recull els límits de TDM, tot i que la doctrina ha assenyalat certes mancances en la precisió de la transposició. Una de les crítiques principals és que la norma espanyola no explicita amb la mateixa claredat que la Directiva que l'excepció de recerca no pot ser objecte d'opt-out per part dels editors, cosa que ha generat certa inseguretat jurídica en el sector acadèmic nacional.

L'anàlisi de l'article 67 revela que el legislador espanyol va optar per una estructura on la mineria per a qualsevol finalitat és lícita si es respecta la reserva de drets, la qual s'ha de fer mitjançant **"sistemes de lectura mecànica"** en el cas de continguts en xarxa. Aquesta exigència de format automatitzat és fonamental per als desenvolupadors d'IA, ja que imposa el deure de programar rastrejadors (crawlers) que sàpiguen interpretar aquests senyals d'oposició.

---

## El Reglament d'IA (AI Act) i les Obligacions de Transparència

El **Reglament (UE) 2024/1689**, conegut com a AI Act, ha entrat en vigor per establir un marc de seguretat i ètica que impacta directament en el procés d'entrenament. L'**article 53** del reglament imposa obligacions específiques als proveïdors de models d'IA d'ús general (GPAI). Aquestes entitats han d'implementar una política interna per identificar i complir amb la reserva de drets expressada d'acord amb la Directiva DSM, fins i tot si l'entrenament es realitza fora de la Unió Europea, sempre que el model es posi al mercat comunitari.

### La Plantilla de Resum de Continguts d'Entrenament

Per facilitar el compliment de l'obligació de transparència (Article 53, apartat 1, lletra d), l'Oficina d'IA de la UE ha publicat una **plantilla obligatòria**. L'objectiu d'aquest resum no és revelar secrets comercials o algoritmes, sinó permetre als titulars de drets verificar si les seves obres han estat utilitzades i exercir el seu dret d'oposició. Els proveïdors han d'informar sobre les modalitats de dades (text, imatge, àudio, vídeo), la mida dels conjunts de dades i, especialment, **la procedència de les dades**.

| Secció de la Plantilla | Requisits d'Informació | Implicacions per al Desenvolupador |
|------------------------|------------------------|------------------------------------|
| **Informació General** | Identificació del model, versió, dates i modalitats | Establir una traçabilitat clara del cicle de vida del model |
| **Llistat de Fonts** | Identificació de grans datasets, descripció del web scraping | Documentar l'ús de dades públiques vs. privades |
| **Processament de Dades** | Mesures per complir l'opt-out, eliminació de contingut il·legal | Demostrar diligència en el respecte a la propietat intel·lectual |
| **Dades Sintètiques** | Ús de dades generades per altres IA | Evitar el col·lapse del model per retroalimentació |

---

## El Requisit d'Accés Legítim i la Procedència de les Dades

Un dels pilars per a un entrenament legal és la condició de **"accés legítim"**. Les dades utilitzades no només han d'estar disponibles a internet, sinó que han d'haver estat obtingudes per mitjans lícits. Això exclou l'ús de bases de dades pirata, continguts obtinguts mitjançant la circumvenció de mesures tecnològiques de protecció (com paywalls) o l'ús de repositoris que infringeixin manifestament el dret de reproducció. La jurisprudència recent a Alemanya, en el cas **LAION v. Kneschke**, ha reforçat que l'accés legítim inclou contingut que es troba lliurement al web sense barreres tècniques, fins i tot si hi ha termes de servei que prohibeixen el scraping en llenguatge natural, ja que l'opt-out ha de ser **mecànic** per ser vinculant sota l'article 4.

Tanmateix, la tendència reguladora i els informes de l'Oficina de Copyright dels EUA (USCO) de 2025 adverteixen que l'entrenament sobre "troves massius" de dades llicenciades sense autorització pot constituir una infracció prima facie, ja que l'analogia de l'aprenentatge de la IA amb l'aprenentatge humà és rebutjada per molts tribunals per la seva capacitat de generar còpies perfectes i memorització. Per tant, la defensabilitat jurídica d'un model depèn en gran mesura de la **"data provenance"** o traçabilitat de la font.

---

## Protocols Tècnics per a la Reserva de Drets

Perquè un desenvolupador d'IA pugui afirmar que el seu procés d'entrenament és respectuós amb la llei, el seu programari de rastreig ha d'estar configurat per reconèixer protocols d'exclusió. Tradicionalment, el fitxer **robots.txt** ha estat l'estàndard de facto, però la seva naturalesa és limitada, ja que sovint s'aplica a nivell de domini i no de contingut individual.

### TDMRep i l'Estàndard W3C

El protocol de reserva de TDM (**TDMRep**), desenvolupat pel W3C, ofereix una solució més granular i robusta. Aquest estàndard permet als editors inserir metadades directament en els fitxers PDF, articles HTML o mitjançant capçaleres HTTP que indiquin de forma inequívoca si la mineria de dades està permesa (`tdm-reservation: 0`) o prohibida (`tdm-reservation: 1`). Per a les editorials acadèmiques, aquest protocol és vital, ja que permet protegir el valor comercial de les seves bases de dades mentre mantenen la visibilitat en els cercadors tradicionals.

### El Surgiment de llms.txt

Com a resposta a la proliferació d'agents d'IA, ha sorgit el protocol **llms.txt**. A diferència del robots.txt, que està pensat per a cercadors, el llms.txt proporciona instruccions específiques sobre quines parts del lloc web són aptes per a l'entrenament de models de llenguatge i quines estan reservades. El Codi de Pràctica de l'AI Act encoratja els proveïdors de GPAI a adoptar aquests mètodes d'identificació d'última generació.

---

## Polítiques d'Editorials Acadèmiques i Gestió de Llicències

L'entrenament d'IA amb textos acadèmics topa amb les polítiques estrictes dels grans editors (Elsevier, Springer Nature, Wiley, entre d'altres), que han desenvolupat condicions de TDM molt específiques. L'accés lícit a aquests textos sol passar per les llicències subscrites per les biblioteques universitàries.

- **Elsevier** i el Límit de 200 Caràcters: ofereix una API de TDM per a institucions subscriptores, però la seva llicència és restrictiva. Permet la mineria per a recerca no comercial, però prohibeix la redistribució de qualsevol part del corpus que no siguin "snippets" de text de menys de 200 caràcters. Exigeix que les dades minades es destrueixin un cop finalitzat el projecte.
- **Springer Nature** i **Wiley**: reserva explícitament drets de TDM i IA segons l'article 4(3) de la Directiva DSM per a continguts que no estiguin sota llicències Open Access (CC BY). Cal negociar llicències de dades específices per a ús comercial.

| Editorial | Política de TDM No Comercial | Accés a API | Restriccions Principals |
|-----------|------------------------------|-------------|--------------------------|
| Elsevier | Permès per a subscriptors | ScienceDirect API | Snippets < 200 caràcters; prohibit ús comercial |
| Springer Nature | Permès via institucions | Springer Nature Metadata API | Reserva expressa de drets per a IA; limitació de càrrega |
| Wiley | Requerit ús responsable | Frameworks de llicència flexibles | Prohibició d'imatges factuals generades per IA |
| IOP Publishing | Permès per a finalitats no comercials | SFTP / XML | Prohibit ús per a IA comercial sense llicència expressa |

---

## El Paper de les Universitats Catalanes i el Consorci CSUC

A Catalunya, el **Consorci de Serveis Universitaris de Catalunya (CSUC)** actua com l'òrgan de coordinació per a la contractació de recursos digitals per a deu universitats, incloses la UB, la UAB i la UPF. Les biblioteques universitàries catalanes treballen per garantir que les llicències signades amb els editors preservin el dret de mineria de dades per al seu personal investigador, alineant-se amb la missió de fomentar la ciència oberta.

- **Universitat de Barcelona (UB)**: el CRAI ofereix assessorament sobre propietat intel·lectual i IA, recordant la citació adequada i la no introducció de dades confidencials en eines d'IA de consum general.
- **Universitat Autònoma de Barcelona (UAB)**: grups de treball sobre l'impacte de l'IA en la docència i la recerca, subratllant la necessitat d'una regulació flexible que protegeixi l'autoria humana.

---

## Llicències Creative Commons i el seu Impacte en l'Entrenament

L'ús d'obres sota llicències **Creative Commons (CC)** és una estratègia freqüent per recollir dades d'entrenament "netes". Segons les directrius de Creative Commons, si una activitat de TDM està protegida per una excepció legal (articles 3 o 4 de la Directiva DSM), les condicions de la llicència CC (NC, SA, etc.) no s'apliquen, ja que les excepcions prevalen. Si el desenvolupament no s'empara en una excepció, les clàusules **BY**, **NC** i **SA** esdevenen vinculants. El projecte **Common Corpus** és un exemple de conjunt de dades construït exclusivament amb continguts de domini públic i llicències permissives.

---

## El Repte del Codi Font: The Stack v2 i Software Heritage

En l'entrenament de models per a generació de codi, la propietat intel·lectual és igualment crítica. El projecte **BigCode** ha llançat **The Stack v2**, derivat de l'arxiu de **Software Heritage**, utilitzant **SWHID** per garantir la traçabilitat del codi i permetre l'opt-out. Malgrat això, hi ha queixes de desenvolupadors sobre la inclusió de codi sense permís o l'aplicació no retroactiva de l'opt-out en models ja entrenats.

---

## Jurisprudència i Doctrina: Cap a un Sistema de Remuneració?

El marc de la Directiva DSM (2019) es va dissenyar abans de l'explosió de l'IA generativa. Molts experts i estudis del Parlament Europeu suggereixen que l'excepció de TDM podria no ser la resposta definitiva per a l'IA generativa, i s'està obrint un debat sobre un **sistema de remuneració equitativa** per als creadors. El dret espanyol ja inclou mecanismes de remuneració per l'ús de fragment de premsa per part d'agregadors; alguns sectors demanen estendre aquesta lògica a l'entrenament d'IA. Fins que aquesta reforma no es produeixi, l'estratègia de compliment més segura és la **llicència directa** o l'ús de **datasets de procedència garantida**.

---

## Conclusions i Full de Ruta per a un Entrenament Lícit

L'entrenament de sistemes d'IA amb textos acadèmics i altres fonts sense infringir la llei requereix un **disseny de governança** proactiu basat en els següents pilars:

1. **Priorització de l'Accés Legítim**: No utilitzar mai dades d'origen dubtós o obtingudes mitjançant el trencament de mesures de protecció.
2. **Identificació d'Opt-outs Mecànics**: Configurar els rastrejadors per reconèixer protocols **TDMRep**, **robots.txt** i **llms.txt**. El respecte a la reserva de drets és el requisit *sine qua non* de l'article 4 de la Directiva DSM.
3. **Transparència Documentada**: Implementar el resum de dades d'entrenament seguint la plantilla de l'Oficina d'IA. Aquesta documentació serveix com a defensa de diligència deguda.
4. **Aprofitament de les Excepcions de Recerca**: En l'àmbit universitari, defensar l'ús de l'article 3 de la Directiva DSM, que impedeix que els editors bloquegin contractualment la mineria de dades per a finalitats científiques.
5. **Ús de Datasets Ètics**: Sempre que sigui possible, utilitzar corpus com **Common Corpus** o **The Stack v2**, on la propietat intel·lectual s'ha gestionat des del disseny inicial.

L'evolució futura del marc regulador europeu, especialment amb la plena aplicació de l'AI Act el 2026, probablement es desplaçarà cap a una supervisió més estricta de la qualitat de les dades i l'equitat en la compensació. Les institucions que avui implementin sistemes de **traçabilitat** i respecte a la propietat intel·lectual no només estaran complint la llei, sinó que estaran construint models d'IA més robustos, defensables i ètics.

---

*Document de referència per al projecte andorra-consti. Tingut en compte per a decisions sobre corpus, embeddings, RAG i ús de continguts legals.*
