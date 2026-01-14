import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const ComEstaFetPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Com està fet · prudencia.ad</title>
        <meta
          name="description"
          content="Descripció tècnica accessible sobre com funciona prudencia.ad: arquitectura, models d'IA i metodologia d'implementació."
        />
      </Head>
      <Layout>
        <div className="page-container">
          <article className="legal-card">
            <header className="legal-header">
              <h1>Com està fet</h1>
              <p className="legal-subtitle">
                Descripció accessible sobre el funcionament tècnic de prudencia.ad, pensada per a tots els públics.
              </p>
            </header>

            <section className="legal-section">
              <h2>1. Visió general: com funciona el sistema</h2>
              <p>
                prudencia.ad utilitza intel·ligència artificial per ajudar a comprendre la legislació andorrana. 
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
                El sistema utilitza diferents models d&apos;IA, cadascun optimitzat per a la seva funció específica:
              </p>
              
              <h3>4.1. Models d&apos;embeddings</h3>
              <p>
                <strong>text-embedding-3-large</strong> (OpenAI): Transforma el text en representacions vectorials 
                que permeten la cerca semàntica. Aquest model és especialitzat en entendre el significat del text, 
                no només les paraules.
              </p>

              <h3>4.2. Models de generació de text</h3>
              <p>
                <strong>GPT-4o-mini</strong> (OpenAI): Genera les explicacions accessibles a partir de la informació 
                recuperada. Aquest model s&apos;ha entrenat específicament per generar text comprensible i fidel a les fonts.
              </p>

              <p style={{ marginTop: '1.5rem' }}>
                Tots els models utilitzats compleixen amb les normatives de privacitat i transparència de la 
                Unió Europea (AI Act), i el sistema indica clarament quan les respostes són generades per IA.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Tecnologies i infraestructura</h2>
              <p>
                El sistema està construït utilitzant tecnologies modernes i estàndards de la indústria:
              </p>
              
              <ul>
                <li>
                  <strong>Next.js</strong>: Framework web que permet crear pàgines ràpides i interactives
                </li>
                <li>
                  <strong>TypeScript</strong>: Llenguatge de programació que garanteix més fiabilitat i qualitat del codi
                </li>
                <li>
                  <strong>OpenAI API</strong>: Servei que proporciona accés als models d&apos;IA utilitzats
                </li>
                <li>
                  <strong>Vercel</strong>: Plataforma de desplegament que garanteix disponibilitat i rendiment
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Corpus i dades</h2>
              <p>
                El sistema treballa amb un corpus estructurat de documents legals que inclou:
              </p>
              
              <ul>
                <li>
                  <strong>Constitució d&apos;Andorra</strong>: 107 articles i el preàmbul, estructurats per títols i capítols
                </li>
                <li>
                  <strong>Codi Civil d&apos;Andorra</strong>: Articles organitzats per llibres, títols i capítols
                </li>
                <li>
                  <strong>Doctrina jurídica</strong>: Fragments de publicacions acadèmiques relacionades amb els articles
                </li>
                <li>
                  <strong>Jurisprudència</strong>: Sentències dels tribunals que interpreten els articles legals
                </li>
              </ul>
              
              <p style={{ marginTop: '1.5rem' }}>
                Tots aquests documents s&apos;han processat i estructurat per permetre una cerca precisa i la generació 
                d&apos;explicacions contextualitzades.
              </p>
            </section>

            <section className="legal-section">
              <h2>7. Transparència i limitacions</h2>
              <p>
                És important entendre que aquest sistema:
              </p>
              
              <ul>
                <li>
                  <strong>No substitueix</strong> l&apos;assessorament professional d&apos;un advocat o notari
                </li>
                <li>
                  <strong>No pren decisions</strong> per l&apos;usuari, només proporciona informació i explicacions
                </li>
                <li>
                  <strong>Indica clarament</strong> quan les respostes són generades per IA
                </li>
                <li>
                  <strong>Recomana sempre</strong> consultar professionals per a casos específics o decisions importants
                </li>
                <li>
                  <strong>Poden existir errors</strong> o simplificacions, per la qual cosa la informació és orientativa
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>8. Millora contínua</h2>
              <p>
                El sistema incorpora mecanismes de millora contínua:
              </p>
              
              <ul>
                <li>
                  <strong>Sistema de validació</strong>: Preguntes de control que avaluen la qualitat de les respostes
                </li>
                <li>
                  <strong>Aprendre dels errors</strong>: El sistema identifica problemes i genera recomanacions de millora
                </li>
                <li>
                  <strong>Expansió del corpus</strong>: S&apos;afegeixen nous documents i fonts de manera sistemàtica
                </li>
                <li>
                  <strong>Actualització de models</strong>: Es manté la tecnologia actualitzada amb les últimes millores
                </li>
              </ul>
            </section>

            <section className="legal-section" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h2>Més informació</h2>
              <p>
                Per a més detalls tècnics, pots consultar el{' '}
                <a 
                  href="/paper" 
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  document acadèmic del projecte
                </a>
                {' '}o el{' '}
                <a 
                  href="/disclaimer" 
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  avís legal i política de privacitat
                </a>
                .
              </p>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default ComEstaFetPage;
