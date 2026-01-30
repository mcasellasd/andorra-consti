import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sobre l'autor · dretplaner.ad</title>
        <meta
          name="description"
          content="Marc Casellas, estudiant de Dret a la Universitat d'Andorra. Creador de Dret Planer, un projecte d'IA per democratitzar l'accés al dret andorrà."
        />
      </Head>
      <Layout>
        <div className="page-container">
          <article className="legal-card">
            <header className="legal-header">
              <h1>Sobre l'autor</h1>
              <p className="legal-subtitle">
                <strong>Marc Casellas</strong><br />
                Estudiant de Dret<br />
                Universitat d'Andorra
              </p>
            </header>

            <section className="legal-section">
              <h2>Qui sóc</h2>
              <p>
                Sóc estudiant de Dret a la Universitat d'Andorra amb un interès especial en la intersecció entre 
                el dret, la tecnologia i l'accessibilitat jurídica. Durant els meus estudis, he observat com la 
                complexitat del llenguatge legal pot convertir-se en una barrera real per a l'accés a la justícia, 
                especialment en una societat tan diversa com l'andorrana.
              </p>
              <p>
                <strong>Dret Planer</strong> neix com a projecte de recerca per explorar com la intel·ligència 
                artificial pot democratitzar l'accés al coneixement jurídic sense erosionar les garanties 
                fonamentals del sistema legal.
              </p>
            </section>

            <section className="legal-section">
              <h2>Per què aquest projecte</h2>
              <p>
                Andorra presenta un repte jurídic únic: el 55% de la població és d'origen immigrant, milions de 
                visitants transiten anualment pel país, i el sistema jurídic —basat en el <em>ius commune</em> i 
                el costum— pot resultar obscur per a qui no hi ha estat socialitzat.
              </p>
              <p>
                La Llei 6/2024 estableix que el llenguatge institucional ha de ser «accessible, acurat i 
                comprensible». Però, <strong>com fem operatiu aquest mandat en una societat tan heterogènia?</strong>
              </p>
              <p>
                Com a estudiant de dret i amb coneixements en tecnologia, vaig veure l'oportunitat de crear una 
                eina que utilitza intel·ligència artificial <strong>estreta</strong> per fer comprensible la 
                Constitució i altres textos jurídics fonamentals, mantenint sempre la traçabilitat, el control 
                humà i la sobirania tecnològica.
              </p>
            </section>

            <section className="legal-section">
              <h2>Filosofia del projecte</h2>
              <p>
                Crec fermament que el principi <em>ignorantia iuris non excusat</em> (la ignorància de la llei no 
                excusa) només és just si el dret és <strong>realment accessible i comprensible</strong> per a tothom.
              </p>
              <blockquote className="about-quote">
                <p>
                  «En absència de codi i de sistematització, un manual —més o menys acadèmic— pot acabar convertit 
                  en codi per la porta del darrere.»
                </p>
                <footer>— Iago Andreu (2015)</footer>
              </blockquote>
              <p>
                Per això, Dret Planer <strong>sempre cita la font original</strong>. La IA assisteix, no substitueix. 
                Traça, no inventa. Aquest projecte no pretén ser una font de dret, sinó una eina pedagògica i 
                d'accessibilitat.
              </p>
            </section>

            <section className="legal-section">
              <h2>El projecte</h2>
              <p>
                Dret Planer combina els meus estudis de dret amb competències en desenvolupament web i intel·ligència 
                artificial. El projecte:
              </p>
              <ul>
                <li>Utilitza arquitectura RAG (Retrieval-Augmented Generation) per garantir la traçabilitat</li>
                <li>Es basa en models de llenguatge oberts (Llama 70B via Groq)</li>
                <li>Implementa embeddings multilingües (XLM-RoBERTa) per a cerca semàntica</li>
                <li>Respecta els principis de sobirania tecnològica i protecció de dades</li>
              </ul>
              <p>
                Tot el desenvolupament està documentat acadèmicament al paper: 
                <Link href="/paper" className="paper-inline-link">
                  «El dret a la claredat constitucional: Intel·ligència Artificial i adequació tecnològica com a 
                  garanties de la cohesió jurídica a Andorra»
                </Link>.
              </p>
            </section>

            <section className="legal-section disclaimer-section">
              <h2>⚠️ Disclaimer important</h2>
              <div className="about-disclaimer">
                <p>
                  <strong>Sóc estudiant de dret, no advocat col·legiat.</strong> Dret Planer és un projecte acadèmic 
                  i <strong>no constitueix assessorament legal</strong>. Les respostes de la plataforma tenen caràcter 
                  orientatiu i educatiu, i han de ser contrastades amb professionals del dret i les fonts oficials.
                </p>
              </div>
            </section>

            <section className="legal-section">
              <h2>Contacte i col·laboració</h2>
              <p>
                Aquest és un projecte en desenvolupament i estic obert a:
              </p>
              <ul>
                <li>Feedback de professionals del dret</li>
                <li>Suggeriments de millora</li>
                <li>Col·laboracions acadèmiques</li>
                <li>Detecció d'errors o imprecisions</li>
              </ul>
              <p>
                <strong>Correu:</strong>{' '}
                <a href="mailto:contacte@dretplaner.ad">contacte@dretplaner.ad</a>
              </p>
            </section>

            <section className="legal-section">
              <h2>Agraïments</h2>
              <p>
                Aquest projecte no seria possible sense:
              </p>
              <ul>
                <li>Els professors de la Universitat d'Andorra</li>
                <li>La comunitat de desenvolupadors de programari obert</li>
                <li>Tots els que han aportat feedback durant el desenvolupament</li>
              </ul>
            </section>

            <footer className="about-footer">
              <p>
                <em>
                  Dret Planer és un projecte d'aprenentatge i recerca. Si detectes errors, tens suggeriments o 
                  vols saber més sobre com funciona, no dubtis en contactar-me. L'objectiu és aprendre i contribuir 
                  a fer el dret més accessible per a tothom.
                </em>
              </p>
            </footer>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;
