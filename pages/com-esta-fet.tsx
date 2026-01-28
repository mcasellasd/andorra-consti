import React from 'react';
import Head from 'next/head';
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
                El sistema utilitza una combinació avançada de models d&apos;IA de l&apos;ecosistema OpenAI,
                cadascun seleccionat per a la seva funció específica:
              </p>

              <h3>4.1. Models d&apos;embeddings</h3>
              <p>
                <strong>text-embedding-3-large</strong> (OpenAI): Transforma el text en representacions vectorials
                de 3072 dimensions per a la cerca semàntica d&apos;alta precisió.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                <strong>XLM-RoBERTa</strong>: Model multilingüe que s&apos;executa localment per a tasques específiques
                de recuperació de context i anàlisi de similitud, actuant com a complement per garantir robustesa.
              </p>

              <h3>4.2. Models de generació de text</h3>
              <p>
                <strong>GPT-4o-mini</strong> (OpenAI): Genera les explicacions accessibles, resums i respostes del xat.
                És un model optimitzat per a la rapidesa i la capacitat de raonament jurídic.
              </p>

              <p style={{ marginTop: '1.5rem' }}>
                Aquesta arquitectura híbrida permet combinar la potència dels grans models al núvol amb
                l&apos;agilitat i privacitat dels models locals, complint sempre amb l&apos;AI Act.
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
                  <strong>OpenAI API</strong>: Motor d&apos;intel·ligència artificial per al processament del llenguatge natural.
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Corpus i dades</h2>
              <p>
                La base de coneixement del sistema (Corpus) està formada per documents oficials i acadèmics
                processats i vectoritzats:
              </p>

              <ul>
                <li>
                  <strong>Constitució d&apos;Andorra</strong>: El text fonamental sencer, estructurat per títols, capítols i articles.
                </li>
                <li>
                  <strong>Doctrina de Dret Processal Civil</strong>: Manuals i textos de referència sobre el procediment civil andorrà,
                  incloent l&apos;obra coordinada per la Universitat d&apos;Andorra.
                </li>
                <li>
                  <strong>Articles Doctrinals</strong>: Selecció d&apos;articles acadèmics (p.ex. sobre sobirania, drets fonamentals)
                  que enriqueixen la interpretació de la norma.
                </li>
                <li>
                  <strong>Jurisprudència (Experimental)</strong>: Integració progressiva de sentències rellevants del Tribunal Constitucional
                  i del Tribunal Superior de Justícia.
                </li>
              </ul>

              <p style={{ marginTop: '1.5rem' }}>
                Mitjançant vectors semàntics, el sistema pot relacionar una pregunta de l&apos;usuari amb
                fragments específics d&apos;aquests documents, encara que no comparteixin les mateixes paraules clau.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Transparència i limitacions</h2>
              <p>
                És fonamental utilitzar aquesta eina amb responsabilitat:
              </p>

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
              </ul>
            </section>

            <section className="legal-section">
              <h2>8. Millora contínua</h2>
              <p>
                Aquest projecte està viu i en constant evolució. Incorporem periòdicament:
              </p>

              <ul>
                <li>Nous documents i sentències al corpus.</li>
                <li>Millores en els algoritmes de cerca (RAG) per augmentar la precisió.</li>
                <li>Optimitzacions de la interfície basades en el feedback dels usuaris.</li>
              </ul>
            </section>

            <section className="legal-section" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h2>Referència acadèmica</h2>
              <p>
                Aquest projecte forma part d&apos;una investigació doctoral a la Universitat d&apos;Andorra.
                Per conèixer els detalls metodològics i científics, podeu consultar la secció{' '}
                <a
                  href="/com-esta-fet" // Self-link or keep text without link if specific paper page is hidden/removed
                  style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'default' }}
                >
                  metodològica
                </a>{' '}
                o contactar amb l&apos;equip de recerca.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.9em', color: '#6b7280' }}>
                També pots consultar l&apos;{' '}
                <a
                  href="/disclaimer"
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  avís legal i política de privacitat
                </a>.
              </p>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default ComEstaFetPage;
