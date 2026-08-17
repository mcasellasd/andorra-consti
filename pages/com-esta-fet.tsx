import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

const ComEstaFetPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Com està fet · dretplaner</title>
        <meta
          name="description"
          content="Com funciona dretplaner: capacitats, arquitectura, models d'IA i metodologia d'implementació."
        />
      </Head>
      <Layout>
        <div className="page-container">
          <article className="legal-card">
            <header className="legal-header">
              <h1>Com està fet</h1>
              <p className="legal-subtitle">
                Descripció accessible sobre com funciona dretplaner: capacitats, arquitectura, models d'IA i metodologia d'implementació.
              </p>
            </header>

            <section className="legal-section">
              <h2>1. Visió general: com funciona el sistema</h2>
              <p>
                dretplaner utilitza intel·ligència artificial per ajudar a comprendre la constitució andorrana.
                El sistema funciona de manera similar a un assistent que ha llegit tots els textos els articles, doctrina i jurisprudència i pot
                explicar-los en un llenguatge més accessible. L'eina no dona consell legal, ni respòn a qüestons personals. La seva tasca es limita a la interpretació de la llei i la generació d'explicacions en llenguatge planer.
              </p>
              <p>
                El xat del sistema, anomenat <strong>Hermes</strong>, et permet fer preguntes en llenguatge natural i rebre la resposta en l'¡idioma de l'usuari.
                Quan fas una pregunta o sol·licites una interpretació d&apos;un article, el sistema:
              </p>
              <ol>
                <li><strong>Cerca</strong> la informació rellevant als documents legals disponibles</li>
                <li><strong>Selecciona</strong> els articles i fragments més relacionats amb la teva consulta</li>
                <li><strong>Genera</strong> una explicació accessible basada en aquesta informació</li>
                <li><strong>Presenta</strong> el resultat amb referències clares als articles utilitzats</li>
              </ol>
            </section>

            <section className="legal-section" style={{ background: 'linear-gradient(to right, #1e3a8a, #0369a1)', color: '#ffffff', margin: '2rem -1rem', padding: '2rem 1rem', borderRadius: '0.5rem' }}>
              <h2 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Sobirania, Claredat i IA</h2>
              <p style={{ color: '#e0f2fe', fontStyle: 'italic', marginBottom: '1rem', fontSize: '1.05rem' }}>
                L&apos;arquitectura del coneixement jurídic andorrà
              </p>
              <p style={{ maxWidth: '48rem', margin: '0 auto', fontSize: '1.05rem', color: '#ffffff', lineHeight: 1.6 }}>
                Andorra transita cap a una <strong style={{ color: '#ffffff' }}>sobirania digital</strong> basada en la veracitat documental. El sistema <strong style={{ color: '#ffffff' }}>Dret Planer</strong> no només automatitza, sinó que protegeix la integritat de la norma mitjançant una arquitectura RAG (<em>Retrieval-Augmented Generation</em>) alimentada per un corpus d&apos;alta qualitat, des dels Pariatges fins a la jurisprudència de 2024.
              </p>
            </section>

            <section className="legal-section">
              <h2>El legat històric</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                L&apos;estabilitat andorrana es fonamenta en la resistència a la modernització política desestructurada, mantenint una línia clara des de la consuetud medieval fins a l&apos;Estat de Dret (Soler Parício).
              </p>
              <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '4px solid #cbd5e1' }}>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1e3a8a' }}>1278 – 1288 · Pariatges de Pau</div>
                  <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', borderLeft: '4px solid #0ea5e9', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    &quot;Sols resto l&apos;única filla de l&apos;imperi Carlemany&quot;. La sobirania compartida com a mecanisme de supervivència davant veïns gegantins.
                  </div>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1e3a8a' }}>1748 · Manual Digest</div>
                  <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#ecfeff', borderRadius: '0.5rem', borderLeft: '4px solid #22d3ee', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    Antoni Fiter i Rossell sistematitza el dret propi. Primer intent de fer accessible el dret que regia la vida dels ciutadans.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1e3a8a' }}>1993 · Regla de Reconeixement</div>
                  <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#fefce8', borderRadius: '0.5rem', borderLeft: '4px solid #eab308', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    La Constitució fixa l&apos;estructura institucional i els drets fonamentals. La sobirania resideix plenament en el poble.
                  </div>
                </div>
              </div>
            </section>

            <section className="legal-section">
              <h2>2. Arquitectura RAG: com troba la informació</h2>
              <p>
                El sistema utilitza una tècnica anomenada <strong>RAG</strong> (Retrieval-Augmented Generation),
                que combina dues capacitats principals:
              </p>

              <p style={{ marginTop: '1rem' }}>
                Per evitar al·lucinacions en la intel·ligència artificial jurídica, el sistema <strong>Dret Planer</strong> s&apos;alimenta d&apos;un corpus jerarquitzat que garanteix la veracitat (Dantart). Aquest procés d&apos;optimització RAG permet que cada resposta de la IA estigui ancorada en documents oficials i doctrina validada.
              </p>

              <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1e3a8a', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Capes de context per a la veracitat</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#1e3a8a' }}>Normativa Suprema</strong> · Constitució del Principat d&apos;Andorra (corpus principal).
                </li>
                <li style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#1e3a8a' }}>Jurisprudència</strong> · Memòria del Tribunal Constitucional i Balanç de 20 anys (Pastor Vilanova).
                </li>
                <li style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#1e3a8a' }}>Doctrina tècnica</strong> · IA jurídica i veracitat (Dantart); prevenció d&apos;al·lucinacions.
                </li>
                <li style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                  <strong style={{ color: '#1e3a8a' }}>Context sociolingüístic</strong> · Alta complexitat demogràfica (Serra); impacte del multilingüisme en la comprensió del dret.
                </li>
              </ul>

              <h3>Diagrama: l&apos;arquitectura RAG</h3>
              <figure style={{ margin: '1.5rem 0', textAlign: 'center' }}>
                <Image
                  src="/images/dret-planer-rag-arquitectura.png"
                  alt="Dret Planer: consulta, recuperació híbrida del corpus jurídic, model generatiu i explicació planera"
                  width={1024}
                  height={1024}
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <figcaption style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#6b7280' }}>
                  <strong>Dret Planer: L&apos;arquitectura RAG per a la claredat constitucional.</strong> El flux mostra com la consulta recupera fonts de l&apos;índex híbrid i condiciona la generació per garantir traçabilitat i reduir al·lucinacions.
                </figcaption>
              </figure>
              <p>
                El diagrama resumeix el <strong>flux de processament RAG</strong>: (1) la <strong>consulta de l&apos;usuari</strong> es transforma en vectors (<em>vectorització</em>); (2) el sistema fa <strong>recuperació semàntica</strong> sobre un <strong>corpus de dades tancat</strong> (Constitució 1993 i doctrina jurídica), sense reentrenar la IA; (3) els fragments rellevants alimenten el <strong>model generatiu</strong>, que elabora l&apos;explicació limitant-se estrictament al context recuperat; (4) cada resposta inclou <strong>referències directes</strong> als articles per permetre la verificació humana; (5) un <strong>filtre de validació de qualitat</strong> detecta si la resposta se separa del text original o conté errors factuals. Això reflecteix una <strong>IA d&apos;ús restringit</strong> (domini jurídic tancat) i <strong>governança tècnica</strong> orientada a la veracitat.
              </p>

              <h3>2.1. Recuperació intel·ligent (Retrieval)</h3>
              <p>
                En lloc de buscar simplement paraules clau, el sistema entén el <em>significat</em> de la teva pregunta.
                És com tenir un bibliotecari que no només busca per títols, sinó que també entén què estàs buscant.
              </p>
              <p>
                Aquest procés funciona gràcies als <strong>embeddings</strong>: representacions numèriques del text que
                capturen el seu significat semàntic. Això permet trobar articles relacionats fins i tot quan utilitzen
                paraules diferents però tracten el mateix tema.
              </p>

              <h3>2.2. Generació adaptada (Generation)</h3>
              <p>
                Un cop s&apos;ha trobat la informació rellevant, el sistema la transforma en una explicació clara i accessible.
                El model d&apos;IA no s&apos;entrena amb els textos legals; opera per recuperació i condicionament (RAG) i està configurat per:
              </p>
              <ul>
                <li>Mantenir la fidelitat al text original</li>
                <li>Utilitzar llenguatge planer i comprensible</li>
                <li>Incloure referències als articles utilitzats</li>
                <li>Proporcionar context i exemples pràctics</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. Interpretació assistida: què inclou</h2>
              <p>
                Quan actives la interpretació assistida d&apos;un article, el sistema genera una explicació completa que inclou:
              </p>

              <h3>3.1. Resum</h3>
              <p>
                Una explicació en 3-4 frases que explica de manera clara què diu l&apos;article i què regula,
                utilitzant llenguatge planer diferent del text jurídic formal.
              </p>

              <h3>3.2. Exemples pràctics</h3>
              <p>
                Situacions reals que il·lustren com s&apos;aplica l&apos;article en la pràctica, facilitant la comprensió
                del seu abast i conseqüències.
              </p>

              <h3>3.3. Conceptes clau</h3>
              <p>
                Els termes jurídics més importants que apareixen a l&apos;article, per poder seguir la lectura i
                entendre millor el contingut.
              </p>

              <h3>3.4. Finalitat i destinataris</h3>
              <p>
                Informació sobre per a què serveix la norma i a qui va dirigida (ciutadans, administracions,
                empreses, etc.), ajudant a contextualitzar l&apos;àmbit d&apos;aplicació.
              </p>

              <h3>3.5. Aplicació pràctica</h3>
              <p>
                Detalls sobre com s&apos;aplica l&apos;article en la pràctica: procediments, requisits i efectes pràctics,
                facilitant la comprensió del seu funcionament real.
              </p>

              <h3>3.6. Doctrina i jurisprudència</h3>
              <p>
                Quan està disponible, informació sobre com han interpretat l&apos;article els tribunals i la doctrina
                acadèmica, oferint una perspectiva més àmplia i contextualitzada.
              </p>
            </section>

            <section className="legal-section">
              <h2>4. Models d&apos;intel·ligència artificial utilitzats</h2>
              <p>
                El sistema utilitza BGE-M3 i BM25 a Upstash Vector per a recuperació, i Llama 70B via Groq per a generació,
                seleccionats per a la seva funció específica i per evitar biaixos hermenèutics externs:
              </p>

              <h3>4.1. Models d&apos;embeddings</h3>
              <p>
                <strong>Arquitectura actual</strong>: <strong>BGE-M3 + BM25</strong> en un índex híbrid gestionat per Upstash Vector
                en regió UE. El procés web no descarrega ni carrega cap model d&apos;embeddings.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                Les consultes combinen senyals densos i dispersos; les preguntes constitucionals reserven almenys un 60% dels resultats
                a fonts constitucionals quan n&apos;hi ha.
              </p>

              <h3>4.2. Models de generació de text</h3>
              <p>
                <strong>Llama 70B</strong> (Llama-3.3-70B-Versatile via <strong>Groq</strong>): Genera les explicacions accessibles, resums i respostes del xat (Hermes).
                Es va provar inicialment Salamandra-7b-instruct (BSC), però no va resultar viable per a producció; en l&apos;estat actual s&apos;utilitza Llama 70B mitjançant l&apos;API de Groq, amb latència baixa i qualitat adequada per al català, castellà i francès.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                L&apos;ús de Llama 70B (Groq) i recuperació híbrida permet mantenir la qualitat en català i la traçabilitat de les fonts.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Tecnologies i infraestructura</h2>
              <p>
                El projecte s&apos;ha desenvolupat utilitzant un stack tecnològic modern que prioritza
                el rendiment, l&apos;accessibilitat i l&apos;escalabilitat:
              </p>

              <ul>
                <li>
                  <strong>Next.js</strong>: Framework React que permet el renderitzat híbrid i una experiència d&apos;usuari fluida.
                </li>
                <li>
                  <strong>Tailwind CSS</strong>: Framework d&apos;estils que permet un disseny net, responsive i altament personalitzable.
                </li>
                <li>
                  <strong>TypeScript</strong>: Aporta tipatge estàtic al codi, reduint errors i millorant la mantenibilitat del sistema.
                </li>
                <li>
                  <strong>Vercel</strong>: Infraestructura al núvol que assegura un desplegament global d&apos;alta disponibilitat.
                </li>
                <li>
                  <strong>Llama 70B</strong> (Groq): Model de llenguatge per a la generació de text (explicacions, resums, xat). Via API Groq (Llama-3.3-70B-Versatile).
                </li>
                <li>
                  <strong>Upstash Vector</strong>: Índex híbrid BGE-M3 + BM25 allotjat en regió UE.
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Corpus i dades</h2>
              <p>
                La base de coneixement del sistema (corpus unificat) està formada per la Constitució d&apos;Andorra com a corpus pilot,
                complementada amb doctrina jurídica seleccionada:
              </p>

              <ul>
                <li>
                  <strong>Constitució d&apos;Andorra (1993)</strong>: Preàmbul i 107 articles estructurats per títols i capítols, amb navegació
                  jeràrquica completa. Aquest és el corpus pilot del projecte, escollit per la seva importància com a Regla de
                  Reconeixement del sistema jurídic andorrà.
                </li>
                <li>
                  <strong>Doctrina jurídica</strong>: Fragments seleccionats de les <em>XIX Jornades de la Societat Andorrana de Ciències</em> (2015)
                  i altres fonts acadèmiques que aporten context interpretatiu sobre el sistema jurídic andorrà, la seva complexitat
                  i la necessitat d&apos;accessibilitat.
                </li>
              </ul>

              <p style={{ marginTop: '1rem' }}>
                El corpus s&apos;indexa mitjançant <strong>inferència</strong>: no s&apos;entrena cap xarxa neuronal amb els textos jurídics;
                Upstash genera les representacions denses i disperses i les conserva en un namespace versionat. En temps d&apos;execució,
                la consulta es compara amb aquest índex híbrid i els fragments més rellevants es passen al model generatiu com a context.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                El sistema de validació amb <strong>preguntes de control</strong> permet comprovar que el prototip identifica correctament
                els articles rellevants i genera explicacions coherents, d&apos;acord amb una lògica de qualitat controlada.
              </p>
            </section>

            <section className="legal-section" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', color: '#1e3a8a', marginBottom: '0.5rem' }}>Balanç de 20 anys de Constitució</h3>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#4b5563', marginBottom: '1rem' }}>
                  Segons Pere Pastor Vilanova, la jurisprudència constitucional ha estat la clau per &quot;aterrar&quot; els principis de 1993 a la realitat quotidiana, especialment en drets fonamentals.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', color: '#1e3a8a', marginBottom: '0.75rem' }}>Jerarquia de veracitat RAG</h3>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '1rem' }}>
                  El sistema prioritza les fonts segons la seva funció dins l&apos;arquitectura de generació de respostes jurídiques.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, height: '1rem', background: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '100%', background: '#1e3a8a' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1e3a8a', whiteSpace: 'nowrap' }}>Constitució (100%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, height: '1rem', background: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '80%', height: '100%', background: '#0891b2' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0891b2', whiteSpace: 'nowrap' }}>Jurisprudència (80%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, height: '1rem', background: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '65%', height: '100%', background: '#eab308' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#b45309', whiteSpace: 'nowrap' }}>Doctrina (65%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, height: '1rem', background: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '50%', height: '100%', background: '#9ca3af' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b7280', whiteSpace: 'nowrap' }}>Context social (50%)</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center' }}>
                  Mecanismes de validació basats en els principis d&apos;integració responsable (Dantart).
                </p>
              </div>
            </section>

            <section className="legal-section" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.5rem' }}>Fonts doctrinals integrades</p>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                López Burniol (2023) · Dantart (informe tècnic RAG) · Pastor Vilanova (jurisprudència) · Soler Parício (evolució històrica) · Serra (sociologia)
              </p>
              <p style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '1rem' }}>
                Dret Planer — Garantint la veracitat del dret en l&apos;era digital
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Compliment legal i principis ètics</h2>
              <p>
                El projecte implementa les millors pràctiques en matèria de regulació d&apos;IA i accessibilitat jurídica:
              </p>

              <h3>7.1. Marc normatiu</h3>
              <ul>
                <li>
                  <strong>AI Act (Reglament UE 2024/1689)</strong>: Sistema de risc limitat amb obligacions de transparència.
                  Sempre s&apos;indica que les respostes són generades per IA.
                </li>
                <li>
                  <strong>Llei 6/2024 (Andorra)</strong>: Llenguatge institucional accessible, acurat i comprensible.
                  El projecte explora com fer operatiu aquest mandat.
                </li>
                <li>
                  <strong>Minimització</strong>: cap model ni vector local al runtime, serveis en regió UE i logs sense consultes en clar.
                </li>
              </ul>

              <h3>7.2. Principis ètics</h3>
              <ul>
                <li>
                  <strong>Transparència total</strong>: Sempre es citen les fonts originals i s&apos;indica el funcionament del sistema.
                </li>
                <li>
                  <strong>Traçabilitat</strong>: Arquitectura RAG que permet verificar cada resposta amb les fonts.
                </li>
                <li>
                  <strong>Control humà</strong>: La IA assisteix, no substitueix el criteri jurídic professional.
                </li>
                <li>
                  <strong>No és font de dret</strong>: Com adverteix Iago Andreu (2015), &quot;un manual pot acabar convertit en
                  codi per la porta del darrere&quot;. Per això, aquest projecte és una eina pedagògica, no una font legal.
                </li>
              </ul>

              <h3>7.3. Limitacions</h3>
              <ul>
                <li>
                  <strong>Eina de suport</strong>: Aquest sistema està dissenyat per facilitar la recerca i la comprensió,
                  però <strong>no substitueix</strong> el criteri d&apos;un professional del dret.
                </li>
                <li>
                  <strong>Possibles al·lucinacions</strong>: Tot i els controls, els models de llenguatge poden ocasionalment
                  generar informació inexacta. Sempre cal verificar les fonts originals (enllaçades a cada resposta).
                </li>
                <li>
                  <strong>Informació no vinculant</strong>: Les interpretacions generades no tenen validesa jurídica oficial.
                </li>
                <li>
                  <strong>Projecte acadèmic</strong>: Desenvolupat per un estudiant de Dret, no per un advocat col·legiat.
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>8. Estat del projecte i roadmap</h2>
              
              <h3>8.1. Fase 1 completada (v1.0 - Constitució PoC)</h3>
              <ul>
                <li>✅ Preàmbul i 107 articles de la Constitució processats i estructurats</li>
                <li>✅ Sistema RAG híbrid amb Upstash Vector</li>
                <li>✅ Chatbot funcional amb Llama 70B (Groq)</li>
                <li>✅ Interfície multilingüe (català, castellà, francès)</li>
                <li>✅ Paper acadèmic integrat amb bibliografia APA 7</li>
                <li>✅ Sistema de control de qualitat amb preguntes de validació</li>
              </ul>

              <h3>8.2. Fase 2 en desenvolupament</h3>
              <ul>
                <li>Expansió a altres codis (Codi Civil, Penal)</li>
                <li>Sistema de jurisprudència del Tribunal Constitucional</li>
                <li>Millores en la cerca semàntica i optimització de prompts</li>
                <li>Validació amb professionals del dret</li>
              </ul>

              <h3>8.3. Fase 3 futura</h3>
              <ul>
                <li>Comparador de sistemes legals (Andorra vs Catalunya vs Espanya)</li>
                <li>API pública per a desenvolupadors</li>
                <li>Guies especialitzades per a expatriats i emprenedors</li>
                <li>Sistema d&apos;usuaris i subscripcions professionals</li>
              </ul>
            </section>

            <section className="legal-section" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h2>Sobre el projecte i l&apos;autor</h2>
              <p>
                Aquest projecte és desenvolupat per <strong>Marc Casellas</strong>, estudiant de Dret a la UOC (Universitat Oberta de Catalunya) i pre-matrícula ala Universitat d&apos;Andorra,
                com a part d&apos;una recerca sobre intel·ligència artificial i accessibilitat jurídica.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Per conèixer els detalls metodològics i el marc teòric complet, podeu accedir al paper acadèmic:
                <br />
                <strong>&quot;Dret Planer: Intel·ligència Artificial d&apos;Ús Restringit per a la Claredat Constitucional al Principat d&apos;Andorra&quot;</strong>
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Link href="/paper" className="com-esta-fet-paper-cta">
                  📄 Llegir el paper acadèmic
                </Link>
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.9em', color: '#6b7280' }}>
                També pots consultar l&apos;{' '}
                <a
                  href="/disclaimer"
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  avís legal i política de privacitat
                </a>
                {' '}o el{' '}
                <a
                  href="https://github.com/mcasellasd/andorra-consti"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  codi font a GitHub
                </a>.
              </p>
            </section>
          </article>
        </div>

        <style jsx>{`
          .com-esta-fet-paper-cta {
            display: inline-flex;
            align-items: center;
            padding: 0.6rem 1.2rem;
            font-weight: 600;
            font-size: 0.95rem;
            color: #ffffff;
            background: #2563eb;
            border: 2px solid #2563eb;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.2s, color 0.2s, transform 0.2s;
          }
          .com-esta-fet-paper-cta:hover {
            background: #1d4ed8;
            border-color: #1d4ed8;
            transform: translateY(-1px);
          }
          .com-esta-fet-paper-cta-secondary {
            display: inline-flex;
            align-items: center;
            padding: 0.6rem 1.2rem;
            font-weight: 600;
            font-size: 0.95rem;
            color: #2563eb;
            background: #ffffff;
            border: 2px solid #2563eb;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.2s, color 0.2s, transform 0.2s;
          }
          .com-esta-fet-paper-cta-secondary:hover {
            background: #eff6ff;
            transform: translateY(-1px);
          }
        `}</style>
      </Layout>
    </>
  );
};

export default ComEstaFetPage;
