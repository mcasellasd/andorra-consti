# El dret a la claredat constitucional: Intel·ligència Artificial i adequació tecnològica com a garanties de la cohesió jurídica a Andorra

**Versió per incorporar al paper.** Aquest document recull el text actualitzat amb resum, paraules clau, seccions 0–3 (Dret Planer, repte de la comprensió, Constitució i dret a comprendre, arquitectura de garantia) i notes de correcció.

---

## Resum

La intel·ligència artificial feble (*Narrow AI*), emprada com a sistema integrador de suport lingüístic i interpretatiu, pot optimitzar la comprensió de la producció legislativa i normativa redactada en llenguatge jurídic natural. Aquesta funció s'exerceix sense substituir la tasca interpretativa pròpia dels operadors jurídics ni comprometre els principis de legalitat i control humà.

Aquest article analitza l'eficàcia de la Intel·ligència Artificial com a instrument de garantia democràtica per a l'accés al dret constitucional a Andorra. Partint de la premissa que la Constitució de 1993 actua com a Regla de Reconeixement (H.L.A. Hart) de l'ordenament, s'argumenta que la seva validesa sociològica depèn de l'acceptació interna d'una ciutadania demogràficament i culturalment diversa. Davant la barrera cognitiva del llenguatge tècnic, s'invoca la doctrina del Dret a Comprendre (Carretero) com a exigència de la tutela judicial efectiva. L'estudi presenta el sistema 'Dret Planer', una arquitectura RAG (Retrieval-Augmented Generation) que utilitza models de llenguatge sobirans i contextualment adequats (Projecte AINA/Salamandra) per evitar biaixos hermenèutics externs. Els resultats demostren que l'automatització, sota supervisió pública, pot actuar com un mediador lingüístic eficaç, transformant l'obediència passiva en una adhesió constitucional informada.

**Paraules clau**: Constitució d'Andorra, Regla de Reconeixement, Dret a Comprendre, Intel·ligència Artificial, Sobirania Tecnològica, Accessibilitat Jurídica, Cohesió Social, Llengües i Identitats.

---

## 0. Dret Planer: Una plataforma IA per al Dret a Comprendre

### 0.1. Introducció

Aquest projecte es desenvolupa amb l'objectiu d'entendre i aprofundir en les capacitats de la IA en l'àmbit jurídic. La literatura existent generalment atribueix certs avantatges i, alhora, mancances als sistemes d'IA aplicats a la tasca jurídica. En termes generals, la IA ha demostrat una gran eficàcia en la gestió de grans volums de documentació, però pot resultar arriscada a causa de la seva capacitat d'invenció o de generar biaixos. Sembla evident que, de moment, la IA no pot oferir solucions als grans problemes de la justícia, tot i que pot ser eficaç en tasques jurídiques determinades. Una d'aquestes és l'assistència als professionals mitjançant el resum i la connexió de moltes dades en poc temps. No obstant això, aquesta pràctica resta subjecta als riscos de la *lex artis* professional. També existeixen aplicacions orientades a l'assessorament o l'emissió d'opinió jurídica automatitzada sobre fets concrets, les quals tampoc no poden substituir el consell professional col·legiat.

Ara bé, els models de llenguatge (LLM) han acreditat la seva capacitat per generar textos, resums i gestionar informació eficientment. Assolit aquest punt, es pot desenvolupar una IA que es limiti a fer allò que sap fer bé, com ara la interpretació del llenguatge. Aquesta pràctica ja l'estan duent a terme els defensors del Dret a Comprendre.

Per tant, una de les aplicacions, a priori validades, és la interpretació al llenguatge natural dels preceptes jurídics presents als diferents codis i reglaments. Es tracta d'una eina capaç de refrasejar el text literal de la llei a un llenguatge planer, molt més comprensible i intuïtiu. Sobre aquesta base, el sistema maximitza les capacitats de la IA mitjançant exemples aplicats, la personalització de preguntes i altres formes d'estructurar i connectar la informació.

### 0.2. Funcionament del Sistema

Dret Planer és una IA entrenada per interpretar els preceptes normatius de la Constitució d'Andorra en llenguatge natural. Mitjançant un algorisme i una arquitectura RAG (entrenada amb la doctrina, jurisprudència i altres textos constitucionals) ofereix un interlocutor expert per resoldre consultes sobre els articles que formen el corpus constitucional.

El sistema permet interactuar en dues modalitats:

- **Mode Xat**: Amb llenguatge natural, és capaç de respondre a qualsevol pregunta dins de la jurisdicció constitucional.
- **Anàlisi Individual**: Cada article pot ser analitzat per separat a través d'una explicació automatitzada en llenguatge planer, complementada amb exemples d'aplicació pràctica del precepte i un comentari doctrinal o jurisprudencial que en destaca la rellevància o la història.

### 0.3. Objecte de l'Estudi

Aquest article té per objectiu documentar una prova de concepte (PoC) per demostrar que la interpretació del precepte normatiu, mitjançant la generació amb IA de llenguatge planer, pot actuar com un mecanisme de cohesió jurídica constitucional en un context jurídic nacional per evitar distorsions interpretatives.

### 0.4. Descàrrec de responsabilitat (Disclaimer)

Aquest sistema d'Intel·ligència Artificial, Dret Planer, és una eina de suport a la interpretació lingüística i a la comprensió del dret constitucional andorrà. La informació i les explicacions generades es basen en el corpus jurídic proporcionat (Constitució, doctrina i jurisprudència) i no constitueixen, en cap cas, assessorament legal professional ni opinió jurídica vinculant, ni substitueixen la consulta amb advocats, notaris o altres professionals del dret titulats. Qualsevol ús de la informació es fa sota la responsabilitat de l'usuari, i es recomana sempre la supervisió i la validació humana en la presa de decisions amb implicacions legals.

---

## 1. El repte de la comprensió normativa i la cohesió a Andorra

### 1.1. Context Sociodemogràfic i Jurídic Singular

[Secció pendent de desenvolupar en el text original, però contextualitzada per l'abstracte inicial]

### 1.2. La Cohesió a la Llum de la Realitat Sociolingüística (Jordi Serra)

L'anàlisi purament jurídica del repte de la cohesió normativa es complementa amb la dimensió sociològica i antropològica aportada per estudis com *Andorra: llengües i identitats* (2024) de Jordi Serra i Massansalvador. Aquesta perspectiva posa de manifest que la "cohesió normativa" xoca amb una realitat multicultural on la identitat oficial de l'Estat no sempre coincideix amb la identitat viscuda al carrer.

El primer repte per a la cohesió normativa a Andorra és la tensió entre la "identitat oficial" i la "realitat social" respecte a l'idioma. Tot i que el català és l'única llengua oficial, la realitat demogràfica i social és multilingüe. Serra destaca la dissociació lingüística: el català es percep com la "llengua de l'Estat" (requerida per a l'Administració), mentre que el castellà actua *de facto* com la *lingua franca* en l'àmbit social i comercial. Aquesta situació provoca una minoritització del català a l'esfera pública no institucional i crea una doble realitat normativa, on l'ús social sovint contradiu l'estatut legal.

Un altre factor crític és el sistema educatiu i la barrera de la nacionalitat. L'existència de tres sistemes educatius públics (andorrà, espanyol i francès) independents és qualificada per l'autor com a "segregadora", ja que separa els alumnes amb referents culturals i llengües vehiculars diferents, dificultant la creació d'una identitat cívica comuna. A més, l'accés molt restrictiu a la nacionalitat (20 anys de residència i renúncia a la d'origen) exclou una gran part de la població de la ciutadania política. Això genera un "dèficit democràtic" i una fractura entre els qui voten (*demos*) i la majoria de la població subjecta a les normes, amb el risc de problemes de legitimitat.

Finalment, la cohesió també es veu amenaçada per una percepció d'estratificació social i una "piràmide ètnica". Serra descriu una jerarquia percebuda on els andorrans ocupen el cim (control de l'Administració i patrimoni), mentre que altres col·lectius ocupen llocs inferiors, sovint lligats a una segmentació laboral per origen. Com a conclusió, Serra proposa que per aconseguir una veritable cohesió social i normativa, Andorra ha de superar el model clàssic d'estat-nació i gestionar activament la seva multiculturalitat, articulant el català com a element de prestigi i cohesió, i plantejant reformes a la llei de nacionalitat i al sistema educatiu per garantir referents de pertinença a tots els residents.

---

## 2. La Constitució andorrana i el dret a comprendre

### 2.1. Andorra sota la lupa de Hart: La Constitució com a Regla de Reconeixement "Viva"

Segons la cèlebre teoria de H.L.A. Hart, l'existència d'un sistema jurídic depèn d'una Regla de Reconeixement (RR): una norma última que estableix els criteris de validesa de la resta de normes. A Andorra, des de 1993, aquesta regla és la Constitució escrita, que va substituir l'antic sistema basat en els Pariatges i el costum.

Tanmateix, Hart adverteix que perquè un sistema jurídic sigui estable i legítim, no n'hi ha prou que els funcionaris i jutges apliquin aquesta regla; cal també que la majoria de la població adopti un "punt de vista intern". Això implica acceptar les normes com a pautes de conducta pròpies i no només com a ordres imposades per por a la sanció.

### 2.2. El "Dret a Comprendre" com a exigència de Justícia

La doctrina, encapçalada per la professora Cristina Carretero González, ha elevat la claredat comunicativa a la categoria de dret instrumental, connectant-la directament amb el dret a la tutela judicial efectiva (reconegut a l'article 10 de la Constitució Andorrana).

L'argument és jurídicament contundent: existeix una situació d'indefensió material quan el ciutadà, tot i tenir accés al text de la llei, no té accés al seu significat a causa d'una obscuritat tècnica innecessària o excessiva. La manca de claredat en la comunicació pública no és un defecte d'estil, sinó un vici que pot comprometre la validesa de la relació administrativa. Per tant, les eines que faciliten la comprensió del dret (com 'Dret Planer') actuen com a garants de l'article 10, restaurant l'equilibri entre l'Administració (que redacta) i el ciutadà (que ha de complir).

### 2.3. El mandat d'Accessibilitat: El Llenguatge Planer

L'ordenament jurídic andorrà ha evolucionat des de la seguretat jurídica abstracta (garantida a l'article 3 de la Constitució) cap a un mandat concret de claredat comunicativa. La recent Llei 6/2024, sobre la llengua pròpia i oficial, i les directrius d'accessibilitat en l'administració, apunten cap a una obligació dels poders públics de fer comprensible la informació administrativa i legal.

No obstant això, la complexitat tècnica inherent al text constitucional i legislatiu actua sovint com una barrera infranquejable per al ciutadà mitjà. L'accés formal a la llei (la seva publicació al BOPA) no garanteix l'accés material al seu significat.

### 2.4. Interpretació en Llenguatge Natural de Textos Prescriptius

És imperatiu distingir ontològicament entre la tasca del jurista i la de la màquina. El sistema proposat en aquest estudi no realitza una tasca hermenèutica (assignar sentit a la norma per resoldre un conflicte amb efectes vinculants), funció reservada exclusivament als operadors jurídics humans i, en última instància, als Tribunals. La seva funció és la de traducció a llenguatge natural.

La IA realitza una tasca de mediació lingüística o traducció intralingüística: reformula el significant per fer-lo accessible sense alterar el significat essencial. Actua com un pont cognitiu, no com un jutge digital. El seu àmbit es limita a la interpretació lingüística dels preceptes normatius prèviament redactats.

---

## 3. Arquitectura de garantia: el sistema 'Dret Planer'

### 3.1. Història del desenvolupament i passos seguits

Aquesta secció documenta el camí recorregut des de la idea inicial fins al sistema actual, amb l'objectiu de transparència metodològica i reproductibilitat.

#### 3.1.1. Origen: del text constitucional al corpus estructurat

El punt de partida va ser el text oficial de la Constitució d'Andorra de 1993, disponible en PDF (*Constitució d'Andorra – Catala*). El flux de treball va ser:

1. **Extracció del text**: Mitjançant eines de extracció de text (scripts `extract-pdf-text.js` o pdfminer des de Python), es va obtenir el fitxer pla `constitucio-andorra.txt` des del PDF, preservant l'estructura de títols, capítols i articles.
2. **Processament semàutic**: El script `process-constitucio-andorra.js` va analitzar el text per identificar articles, títols i capítols i va generar una estructura de dades tipada (`articles-template.ts` o equivalent) amb numeració, títol i cos de cada article.
3. **Construcció de les entrades RAG**: Un script dedicat (`build-constitucio-knowledge.js` o variants com `build-constitucio-knowledge-full.js`, `build-constitucio-completa.js`) va transformar aquests articles en entrades de coneixement amb identificador únic (CONST_PREAMB, CONST_001, CONST_002, …), categoria (Preàmbul, Títol I, …), text oficial i metadades (referència legal, conceptes clau). El resultat va ser el fitxer `constitucio.json` amb 108 entrades (preàmbul + 107 articles).
4. **Generació d'embeddings del corpus constitucional**: Es van generar vectors d'embeddings per a cada entrada mitjançant scripts (`generate-embeddings-constitucio.js`) i es van emmagatzemar a `constitucio-embeddings.json`. Inicialment es va provar amb l'API d'OpenAI (text-embedding-3-large); posteriorment es va afegir la opció de fer-ho localment amb XLM-RoBERTa-base per reduir costos i dependències externes.

D'aquesta manera es va disposar d'un corpus constitucional íntegre, indexable per cerca semàntica.

#### 3.1.2. Incorporació de doctrina jurídica

Per enriquir el sistema i no limitar-lo al text literal de la Constitució, es va incorporar doctrina i jurisprudència:

1. **Selecció de fonts**: Es va prioritzar l'obra col·lectiva *Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució* (Pere Pastor Vilanova, coord., 2014), disponible en format text (`20 anys.txt`). Es van afegir altres documents de la carpeta `docs/` i `docs/nous/` (obres sobre ordenació territorial, constitucionalisme i codificació, dret processal civil, comunicacions, etc.).
2. **Processament de documents**: Es van crear scripts per segmentar els textos llargs en fragments coherents (per paràgrafs o blocs temàtics), extreure metadades (autor, font, any) i assignar categoria (doctrina, jurisprudència) i codi (constitucio). Es van utilitzar tant una variant en Node.js (`processar-doctrina-txt.js`) com una en TypeScript amb embeddings integrats (`processar-doctrina-xlm.ts`) que, a més de generar les entrades de coneixement, calcula els embeddings amb XLM-RoBERTa en el mateix pas.
3. **Estructura de les entrades de doctrina**: Cada fragment es va convertir en una entrada amb id (ex.: DOCTRINA_20_ANYS_001, DOCTRINA_DRET_PROCESSAL_CIVIL_042), category, topic, content, legalReference, keyConcepts, source, sourceType, year, author i codi. Les entrades es van guardar a `data/rag/doctrina/` en fitxers JSON (un per document o conjunt) amb els corresponents `*-embeddings.json`.
4. **Volum**: L'obra "20 anys" va aportar 254 fragments estructurats; la incorporació d'altres documents va augmentar el nombre total d'entrades de doctrina, de manera que el corpus unificat va superar les 360 entrades (Constitució + doctrina).

Això va permetre que el RAG pogués recuperar no només articles constitucionals sinó també comentaris doctrinals i jurisprudencials rellevants per a cada consulta.

#### 3.1.3. Unificació del corpus i càrrega al sistema

Perquè el sistema RAG utilitzés alhora la Constitució i la doctrina sense duplicar lògica ni fitxers dispersos, es va implementar un pas d'unificació:

1. **Script d'unificació**: El script `unificar-corpus-doctrina.js` llegeix `constitucio.json`, `constitucio-embeddings.json`, tots els fitxers de coneixement i embeddings de `data/rag/doctrina/` i, opcionalment, les entrades d'aprenentatge de `data/rag/aprenentatge/`. Concatena totes les entrades i tots els embeddings i escriu `constitucio-unified.json` i `constitucio-unified-embeddings.json`.
2. **Càrrega al runtime**: El mòdul `lib/rag/corpus.ts` intenta primer carregar el corpus unificat; si no existeix, fa fallback a només Constitució (i, en versions anteriors, a fitxers de doctrina per separat). D'aquesta manera el desplegament i els entorns de desenvolupament treballen amb un únic conjunt de dades coherent.
3. **Cerca híbrida**: Es va afegir un índex BM25 (lib/rag/bm25.ts) sobre el corpus per permetre cerques lexicogràfiques complementàries a la cerca vectorial, millorant la recuperació en consultes amb termes molt específics.

El resultat és un únic corpus en memòria (knowledge + embeddings) i un índex BM25, utilitzats per l'API de xat i per les pàgines d'articles.

#### 3.1.4. Pipeline RAG i API de xat

El nucli del sistema és el pipeline RAG integrat en la API de xat:

1. **Entrada**: L'usuari envia un missatge des de la interfície Hermes (component UnifiedChatbot). La petició arriba a `pages/api/unified-chat.ts`.
2. **Preparació de la consulta**: Es detecta si el missatge es refereix a un article concret (detectArticleReference), es busquen paraules clau (detectArticleByKeywords) i es calcula la complexitat de la pregunta (detectComplexity) per ajustar el nombre de fragments a recuperar (topK).
3. **Recuperació**: Si RAG està activat (RAG_ENABLED=true), es genera l'embedding de la pregunta (mitjançant el proveïdor configurat: OpenAI o XLM-RoBERTa) i es fa una cerca per similitud cosinus sobre els embeddings del corpus. Es recuperen les entrades més rellevants; en alguns fluxos es prioritzen explícitament els articles CONST_* quan la pregunta és clarament constitucional. Opcionalment es combina o es complementa amb BM25.
4. **Context i prompt**: Els fragments recuperats es passen com a context al model de generació (Groq/Llama o, en entorns de prova, Salamandra). El prompt del sistema inclou instruccions per respondre només sobre la base del context, citar fonts i evitar inventar informació. Es pot injectar la guia de català jurídic (lib/prompts/guia-catala-juridic.ts) i altres instruccions d'estil.
5. **Generació i postprocessat**: El model genera la resposta; abans de retornar-la, es valida el compliment amb l'AI Act (checkAIActCompliance, getAIActCompliancePrompt) i, si s'activa, la qualitat de la resposta (validateResponseQuality) per detectar citacions inexistents o al·lucinacions. La resposta final inclou les fonts utilitzades (sources) per garantir traçabilitat.

Aquest flux garanteix que les respostes es basen en el corpus validat i que es poden auditar les fonts.

#### 3.1.5. Sistema de validació: 43 preguntes de control

Per mesurar objectivament el rendiment del sistema i guiar les millores, es va dissenyar un conjunt de preguntes de control:

1. **Definició de les preguntes**: Es va crear un conjunt de 43 preguntes (data/preguntes-control.ts o equivalent), cadascuna amb enunciat, articles esperats (ids CONST_*), paraules clau que haurien d'aparèixer a la resposta, paraules prohibides i metadades (categoria: bàsica, específica, complexa, edge-case; dificultat: baixa, mitjana, alta).
2. **Execució**: Les preguntes es poden executar des de la interfície (/preguntes-control), via API (POST /api/preguntes-control, amb opció executarTotes: true) o des de línia de comandes (executar-preguntes-control.ts). Per a cada pregunta es crida el xat unificat i es recull la resposta i les fonts.
3. **Avaluació**: El mòdul lib/evaluacio/preguntes-control.ts avalua cada resposta amb tres components: (1) articles trobats a les fonts (40% del score), (2) presència de paraules clau (40%) i (3) absència de paraules prohibides (20%). Es calcula un score global i es considera vàlida la pregunta si el score és ≥ 70 i no hi ha errors crítics.
4. **Informes**: Es generen informes (ex.: docs/INFORME-PREGUNTES-CONTROL-2026-01-29.md) amb el resum global, resultats per categoria i dificultat, llistat de preguntes vàlides i anàlisi de causes de fracàs (per exemple rate limit de l'API de generació o predomini de fonts de doctrina respecte als articles esperats). Aquests informes han servit per prioritzar millores (delays entre peticions, priorització d'articles CONST_* en el RAG, revisió dels criteris d'avaluació).

El sistema de preguntes de control constitueix doncs un bucle de feedback objectiu per a la qualitat del sistema.

#### 3.1.6. Aprenentatge continu i incorporació al corpus

Per no quedar-nos en una avaluació puntual, es va implementar un mecanisme d'aprenentatge continu:

1. **Anàlisi dels resultats**: A partir dels resultats de les preguntes de control, el sistema d'aprenentatge (lib/aprenentatge/, scripts aprenentatge-millora-sistema.ts) analitza els errors recurrents i genera recomanacions prioritzades per millorar prompts o afegir context.
2. **Entrades d'aprenentatge**: Aquestes recomanacions es converteixen en entrades de coneixement (aprenentatge.json) amb els seus embeddings (aprenentatge-embeddings.json), que s'incorporen al corpus durant la unificació. D'aquesta manera, en execucions posteriors el RAG pot recuperar també "com s'ha de respondre" en casos on abans fallava.
3. **Iteració**: El cicle "executar preguntes de control → generar informe → executar aprenentatge → regenerar embeddings d'aprenentatge → unificar corpus" permet anar millorant el sistema sense canvis manuals exhaustius als prompts.

Això reflecteix la voluntat de que el sistema evolucioni amb la pràctica i amb criteris objectius.

#### 3.1.7. Mesures de seguretat i compliment normatiu

En paral·lel al desenvolupament funcional, es van integrar les obligacions de transparència i seguretat:

1. **AI Act i checks automàtics**: Es va implementar un conjunt de verificacions (lib/rag/quality-assessment.ts) per assegurar que cada resposta inclou divulgació d'IA, menció del model, advertències sobre limitacions, recomanació de supervisió humana i clarificació de no assessorament legal. Es calcula un score de compliment i es poden afegir advertències si alguna part falla.
2. **Guia de qualitat de respostes**: Es va afegir validació de la qualitat de la resposta (lib/rag/response-quality.ts) per detectar citacions a fonts que no s'han proporcionat al context, reduint el risc d'al·lucinacions en les referències.
3. **Disclaimer i avisos a la interfície**: Es va redactar un text de descàrrec de responsabilitat (secció 0.4 d'aquest article) i s'ha integrat a la interfície i, si s'aplica, als missatges del bot, per deixar clar que el sistema és orientatiu i no substitueix el consell professional.
4. **Marc andorrà**: Es té en compte la Llei 29/2021 de protecció de dades d'Andorra (licitud, lleialtat, transparència, minimització de dades).

La documentació d'aquestes mesures es recull a docs/MESURES-SEGURETAT-RESPOSTES.md i a la secció 3.5 (Compliment Normatiu) d'aquest article.

#### 3.1.8. Embeddings: opcions i evolució

La tria del model d'embeddings ha tingut un impacte directe en costos, privacitat i qualitat:

1. **Fase inicial (OpenAI)**: Es van generar els primers embeddings amb l'API d'OpenAI (text-embedding-3-large), amb cost per token i dependència de xarxa. Això va permetre validar ràpidament el pipeline RAG.
2. **Migració a XLM-RoBERTa**: Per reduir costos i mantenir tot el processament local quan fos possible, es va integrar el model XLM-RoBERTa-base (lib/embeddings/xlm-roberta.ts) mitjançant la biblioteca @xenova/transformers. Els scripts de generació d'embeddings (incloent processar-doctrina-xlm.ts) van passar a poder utilitzar el proveïdor configurat via EMBEDDING_PROVIDER (openai | xlm-roberta). La documentació es va recollir a docs/XLM-ROBERTA-SETUP.md i docs/GENERAR-EMBEDDINGS-DOCTRINA.md.
3. **Coherència**: Es va deixar clar que no es poden barrejar embeddings de models diferents en el mateix corpus (dimensions i espai vectorial diferents); qualsevol canvi de model implica regenerar tots els fitxers d'embeddings i, si cal, tornar a unificar.
4. **Fase futura (AINA)**: Es documenta la intenció de migrar a roberta-base-ca-v2 del Projecte AINA per millorar la qualitat semàntica en català jurídic (docs/TASQUES_FUTURES.md, secció 3.2 d'aquest article).

Aquesta evolució reflecteix el compromís entre viabilitat econòmica, sobirania tecnològica i qualitat del llenguatge.

#### 3.1.9. Generació de text: de Colab/Salamandra a Groq

En la prova pilot, la generació d'explicacions en llenguatge natural es va provar amb Salamandra-7b-instruct en un entorn amb GPU (Google Colab, NVIDIA A100) per assegurar rendiment adequat. Per al desplegament en producció i per evitar dependència de notebooks i cua d'inferència pròpia, es va adoptar un servei d'inferència extern: l'API de Groq amb un model Llama (ex. Llama-3.3-70B), configurat via GROQ_API_KEY. El mòdul lib/llm/index.ts i lib/llm/groq.ts encapsulen les crides; el sistema continua sent adaptable a altres proveïdors (OpenAI, etc.) segons configuració. Això ha permès mantenir la generació multilingüe (català, castellà, francès) i la baixa latència sense gestionar infraestructura de GPU pròpia.

#### 3.1.10. Desplegament i documentació del flux

L'aplicació web es construeix amb Next.js (Pages Router) i es desplega a Vercel. La documentació del projecte (README, DEPLOY.md, VERCEL-DEPLOY.md) descriu la configuració de variables d'entorn, el build i el desplegament. Els fluxos de dades (com afegir articles des del PDF, processar doctrina, generar embeddings, unificar corpus, executar preguntes de control) queden recollits a docs/ (COM-AFEGIR-ARTICLES-DES-DEL-PDF.md, PROCESSAR-DOCUMENTS-ANDORRA.md, INCORPORAR-DOCTRINA-APRENENTATGE.md, GENERAR-EMBEDDINGS.md, PREGUNTES-CONTROL.md, etc.), de manera que qualsevol investigador o equip tècnic pot reproduir o estendre el sistema.

Aquesta secció ha resumit la història dels passos seguits: des del text constitucional fins al corpus unificat, la incorporació de doctrina, el pipeline RAG, la validació amb 43 preguntes de control, l'aprenentatge continu, les mesures de seguretat i compliment, l'evolució dels embeddings i de la generació, i el desplegament. La secció següent detalla la metodologia i la implementació tècnica de l'arquitectura.

### 3.2. Metodologia i Implementació

#### 3.2.1. RAG (Retrieval-Augmented Generation): Per què?

El sistema utilitza una arquitectura RAG que combina la recuperació de continguts rellevants del corpus jurídic amb la generació d'explicacions accessibles. Aquesta arquitectura és adequada per a aplicacions jurídiques per les següents raons:

- **Precisió i traçabilitat**: La recuperació de continguts del corpus garanteix que les explicacions es basen en el text oficial, mantenint la fidelitat al text original i permetent la traçabilitat a l'article constitucional corresponent.
- **Control sobre les fonts**: A diferència dels models que operen únicament amb el coneixement intern, el RAG permet controlar les fonts utilitzades, garantint que només s'utilitza informació del corpus jurídic validat.
- **Reducció d'al·lucinacions**: En proporcionar context específic del corpus, el RAG redueix la probabilitat d'al·lucinacions (generació de contingut incorrecte o inventat), un problema significatiu en aplicacions jurídiques.
- **Escalabilitat**: L'arquitectura RAG permet afegir nou contingut al corpus sense necessitat de reentrenar el model de generació, facilitant l'expansió a altres codis i normes.

#### 3.2.2. Models: Embeddings i Generació

El sistema utilitza dos tipus de models:

- **Embeddings (Fase 1 - Prova pilot)**: Per a la recuperació semàntica, la prova pilot utilitza el model XLM-RoBERTa-base, un model multilingüe que funciona localment.
- **Embeddings (Fase 2 - Millora prevista)**: Es preveu migrar al model *roberta-base-ca-v2* del Projecte AINA, entrenat específicament per al català amb un corpus de 34.89 GB.
- **Generació de text**: Per a la generació d'explicacions accessibles, s'utilitza Salamandra-7b-instruct executat amb GPU NVIDIA A100 per garantir l'eficiència.

**Consideració Multilingüe (Català, Castellà i Francès)**: L'elecció de Salamandra-7b-instruct es justifica per la necessitat de generar respostes fluides i competents no només en català, sinó també en castellà i francès, donada la realitat lingüística i legal d'Andorra.

#### 3.2.3. Emmagatzematge i Cerca Vectorial

Per a la prova pilot, s'ha optat per una implementació en memòria dels embeddings (fitxers JSON pre-generats), justificada per la petita grandària del corpus (aproximadament 360 entrades), la simplicitat arquitectural i un rendiment adequat (latències inferiors a 100ms).

#### 3.2.4. Stack Tècnic

El sistema està implementat utilitzant Next.js com a framework web, desplegat a Vercel. La interfície d'usuari, anomenada Hermes, permet la interacció mitjançant un xat.

### 3.3. Corpus: Constitució d'Andorra i Expansió

#### 3.3.1. Corpus Constitucional (108 entrades estructurades)

El corpus comprèn 107 articles i un preàmbul (108 entrades en total), organitzats segons l'estructura de la Constitució d'Andorra (Títol I al IX). Cada entrada inclou Identificador únic, Categoria, Text oficial i Metadades.

#### 3.3.2. Expansió del Corpus: Incorporació de Doctrina i Aprenentatge

S'ha incorporat doctrina jurídica rellevant mitjançant l'obra *Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució* (Pere Pastor Vilanova, coord., 2014), processada en 254 fragments estructurats. El sistema incorpora un mecanisme d'aprenentatge continu basat en l'avaluació de 43 preguntes de control, les recomanacions de les quals s'incorporen al corpus.

### 3.4. Sistema de Validació

#### 3.4.1. 43 Preguntes de Control

El sistema de validació consta de 43 preguntes distribuïdes en quatre categories (bàsiques, específiques, complexes i casos límit).

#### 3.4.2. Criteris d'Avaluació (Scores)

L'avaluació objectiva es basa en tres components: Articles trobats (40%), Paraules clau (40%) i Paraules prohibides (20%). Una pregunta es considera vàlida amb un score global igual o superior a 70 punts sense errors crítics.

### 3.5. Compliment Normatiu

#### 3.5.1. Marc Andorrà: Llei 29/2021

El sistema compleix amb la Llei 29/2021 de protecció de dades d'Andorra, respectant els principis de licitud, lleialtat i transparència.

#### 3.5.2. AI Act (UE): Obligacions per a Sistemes de Risc Limitat

S'implementen les obligacions de transparència establertes per a sistemes de risc limitat:

- **Transparència**: Totes les respostes indiquen explícitament que han estat generades per intel·ligència artificial.
- **Advertències adequades**: S'inclouen advertències sobre les limitacions del sistema i el seu caràcter orientatiu.
- **Recomanació de Supervisió Humana**: Es recomana sempre consultar professionals titulats per a assessorament legal.
- **Clarificació de no Assessorament Legal**: Es deixa clar que la informació no constitueix assessorament legal professional.

---

## Notes sobre la correcció

- **Format**: S'han eliminat els guions i asteriscs innecessaris i s'han substituït per una estructura de títols i subtítols jerarquitzada (1., 1.1., etc.) per millorar la llegibilitat.
- **Terminologia**: S'ha utilitzat "intel·ligència artificial feble" (o *Narrow AI* en cursiva) per traduir "estreta", que és el terme més estàndard en català tècnic per oposició a la IA forta o general.
- **Llengua**: S'han revisat lleugerament els connectors textuals per donar més fluïdesa (ex.: "substituir" en el resum, amb connotació més neutral en aquest context).
- **Citacions**: S'han afegit les referències corresponents a les fonts proporcionades (com la referència a Jordi Serra o a la Constitució) allà on el text fa afirmacions factuals basades en aquestes fonts.

---

*Document vinculat al paper acadèmic principal: [PAPER-ACADEMIC-IA-ADAPTACIO-LLENGUATGE-NATURAL.md](./PAPER-ACADEMIC-IA-ADAPTACIO-LLENGUATGE-NATURAL.md).*
