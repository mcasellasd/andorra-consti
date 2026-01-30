import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const ComEstaFetPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Com està fet · dretplaner.ad</title>
        <meta
          name="description"
          content="Descripció tècnica accessible sobre com funciona dretplaner.ad: arquitectura, models d'IA i metodologia d'implementació."
        />
      </Head>
      <Layout>
        <div className="page-container">
          <article className="legal-card">
            <header className="legal-header">
              <h1>Com està fet</h1>
              <p className="legal-subtitle">
                Descripció accessible sobre el funcionament tècnic de dretplaner.ad, pensada per a tots els públics.
              </p>
            </header>

            <section className="legal-section">
              <h2>1. Visió general: com funciona el sistema</h2>
              <p>
                dretplaner.ad utilitza intel·ligència artificial per ajudar a comprendre la legislació andorrana.
                El sistema funciona de manera similar a un assistent que ha llegit tots els textos legals i pot
                explicar-los en un llenguatge més accessible.
              </p>
              <p>
                El xat del sistema, anomenat <strong>Hermes</strong>, et permet fer preguntes en llenguatge natural.
                Quan fas una pregunta o sol·licites una interpretació d&apos;un article, el sistema:
              </p>
              <ol>
                <li><strong>Cerca</strong> la informació rellevant als documents legals disponibles</li>
                <li><strong>Selecciona</strong> els articles i fragments més relacionats amb la teva consulta</li>
                <li><strong>Genera</strong> una explicació accessible basada en aquesta informació</li>
                <li><strong>Presenta</strong> el resultat amb referències clares als articles utilitzats</li>
              </ol>
            </section>

            <section className="legal-section">
              <h2>2. Arquitectura RAG: com troba la informació</h2>
              <p>
                El sistema utilitza una tècnica anomenada <strong>RAG</strong> (Retrieval-Augmented Generation),
                que combina dues capacitats principals:
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
                El model d&apos;IA s&apos;ha entrenat específicament per:
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
                El sistema utilitza models sobirans i contextualment adequats (Projecte AINA per embeddings, Llama 70B via Groq per generació),
                seleccionats per a la seva funció específica i per evitar biaixos hermenèutics externs:
              </p>

              <h3>4.1. Models d&apos;embeddings</h3>
              <p>
                <strong>Fase 1 (actual)</strong>: <strong>XLM-RoBERTa-base</strong>, model multilingüe que s&apos;executa localment
                per a la recuperació semàntica (representacions vectorials de 768 dimensions). Oferix privacitat i control total sobre les dades.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                <strong>Fase 2 (prevista)</strong>: Migració al model <strong>roberta-base-ca-v2</strong> del <strong>Projecte AINA</strong>,
                entrenat específicament per al català amb un corpus que inclou documents governamentals i jurídics, per millorar la qualitat
                de la cerca semàntica en text jurídic català.
              </p>

              <h3>4.2. Models de generació de text</h3>
              <p>
                <strong>Llama 70B</strong> (Llama-3.3-70B-Versatile via <strong>Groq</strong>): Genera les explicacions accessibles, resums i respostes del xat (Hermes).
                Es va provar inicialment Salamandra-7b-instruct (BSC), però no va resultar viable per a producció; en l&apos;estat actual s&apos;utilitza Llama 70B mitjançant l&apos;API de Groq, amb latència baixa i qualitat adequada per al català, castellà i francès.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                L&apos;ús de models com Llama 70B (Groq) i AINA (embeddings previstos) permet mantenir la qualitat de la generació en català i complir amb l&apos;AI Act i els principis d&apos;adequació tecnològica del projecte.
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
                  <strong>XLM-RoBERTa-base</strong>: Model d&apos;embeddings multilingüe executat localment (fase 1). Fase 2: <strong>Projecte AINA</strong> (roberta-base-ca-v2) per al català.
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Corpus i dades</h2>
              <p>
                La base de coneixement del sistema (corpus unificat) està formada per la Constitució d&apos;Andorra com a corpus pilot,
                complementada amb doctrina acadèmica i recomanacions d&apos;aprenentatge:
              </p>

              <ul>
                <li>
                  <strong>Constitució d&apos;Andorra (1993)</strong>: 105 articles estructurats per títols i capítols, amb navegació
                  jeràrquica completa. Aquest és el corpus pilot del projecte, escollit per la seva importància com a Regla de
                  Reconeixement del sistema jurídic andorrà.
                </li>
                <li>
                  <strong>Doctrina jurídica</strong>: Fragments seleccionats de les <em>XIX Jornades de la Societat Andorrana de Ciències</em> (2015)
                  i altres fonts acadèmiques que aporten context interpretatiu sobre el sistema jurídic andorrà, la seva complexitat
                  i la necessitat d&apos;accessibilitat.
                </li>
                <li>
                  <strong>Recomanacions d&apos;aprenentatge</strong>: Entrades generades a partir de l&apos;avaluació de les preguntes de control,
                  incorporant millores identificades pel sistema per enriquir les respostes i garantir la qualitat.
                </li>
              </ul>

              <p style={{ marginTop: '1rem' }}>
                El corpus està processat amb embeddings multilingües (XLM-RoBERTa) que permeten la cerca semàntica.
                Mitjançant vectors semàntics, el sistema relaciona la pregunta de l&apos;usuari amb fragments rellevants
                d&apos;aquests documents, encara que no comparteixin les mateixes paraules clau.
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
                  <strong>Sobirania tecnològica</strong>: Embeddings locals (XLM-RoBERTa), models oberts (Llama 70B),
                  control total sobre les dades.
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
                <li>✅ 105 articles de la Constitució processats i estructurats</li>
                <li>✅ Sistema RAG complet amb embeddings XLM-RoBERTa</li>
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
                Aquest projecte és desenvolupat per <strong>Marc Casellas</strong>, estudiant de Dret a la Universitat d&apos;Andorra,
                com a part d&apos;una recerca sobre intel·ligència artificial i accessibilitat jurídica.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Per conèixer els detalls metodològics i el marc teòric complet, podeu accedir al paper acadèmic:
                <br />
                <strong>&quot;El dret a la claredat constitucional: Intel·ligència Artificial i adequació tecnològica com a garanties de la cohesió jurídica a Andorra&quot;</strong>
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
