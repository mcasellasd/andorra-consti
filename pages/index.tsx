import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { articlesConstitucio } from '../data/codis/constitucio/articles-template';

const IndexPage: React.FC = () => {
  const [homeQuery, setHomeQuery] = useState('');
  const [homeConsent, setHomeConsent] = useState(false);
  const [homeError, setHomeError] = useState<string | null>(null);

  const totalConstitucioArticles = articlesConstitucio.length;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedConsent = window.localStorage.getItem('dretplaner.chat.consentAccepted');
      if (storedConsent === 'true') {
        setHomeConsent(true);
      }
    }
  }, []);

  const submitHomeQuestion = useCallback(
    (rawQuestion: string) => {
      const trimmed = rawQuestion.trim();
      if (!trimmed.length) {
        setHomeError('Introdueix una consulta per Dret Planer.');
        return;
      }

      if (!homeConsent) {
        setHomeError('Cal confirmar que has llegit la informació de privacitat abans d\'enviar consultes.');
        return;
      }

      setHomeError(null);
      setHomeQuery('');
      // Obrir el chatbot unificat amb la pregunta
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('openUnifiedChat', {
          detail: { question: trimmed, autoSubmit: true }
        });
        window.dispatchEvent(event);
      }
    },
    [homeConsent]
  );

  const handleHomeSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitHomeQuestion(homeQuery);
    },
    [homeQuery, submitHomeQuestion]
  );

  const handleQuickQuestion = useCallback(
    (question: string) => {
      submitHomeQuestion(question);
    },
    [submitHomeQuestion]
  );

  const handleConsentChange = useCallback(
    (checked: boolean) => {
      setHomeConsent(checked);
      if (checked && typeof window !== 'undefined') {
        window.localStorage.setItem('dretplaner.chat.consentAccepted', 'true');
      }
    },
    []
  );

  return (
    <>
      <Head>
        <title>Dret Planer · Constitució d&apos;Andorra</title>
        <meta
          name="description"
          content="Plataforma interactiva per explorar la Constitució del Principat d'Andorra amb navegació assistida per IA, resums contextuals i exemples pràctics."
        />
      </Head>
      <Layout>
        <div className="homepage">
          {/* Hero Section */}
          <section className="hero-section hero-section--minimal">
            <div className="hero-header">
              <span className="hero-kicker">Dret Planer · Constitució d&apos;Andorra</span>
              <h1>La Constitució d&apos;Andorra explicada amb claredat</h1>
              <p>
                Text oficial consolidat, interpretació assistida amb IA i un chatbot especialitzat perquè
                qualsevol persona pugui entendre i explorar la Constitució del Principat d&apos;Andorra amb confiança.
              </p>
              <div className="hero-actions">
                <Link href="#constitucio" className="hero-primary">Explora la Constitució</Link>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const event = new CustomEvent('openUnifiedChat', { detail: { question: '' } });
                      window.dispatchEvent(event);
                    }
                  }}
                  className="hero-secondary"
                  style={{ cursor: 'pointer', border: 'none', background: 'transparent', color: 'inherit', font: 'inherit', textDecoration: 'underline' }}
                >
                  Parla amb Dret Planer
                </button>
              </div>
            </div>
            <div className="hero-motto">
              <strong>Recta Ratio Agibilium</strong>
              <p>
                La recta raó orienta l&apos;acció: aquesta és la brúixola del projecte. Fem entenedor el dret perquè
                es pugui aplicar amb criteri i responsabilitat.
              </p>
            </div>
          </section>

          {/* Cerca */}
          <section className="search-section search-section--assistant">
            <div className="search-bar">
              <h2>Per on comencem?</h2>
              <form className="search-bar__form" role="search" onSubmit={handleHomeSearch}>
                <label htmlFor="home-search" className="visually-hidden">Escriu la teva consulta per Dret Planer</label>
                <div className="search-bar__input">
                  <input
                    id="home-search"
                    type="text"
                    placeholder="Pregunta sobre la Constitució d'Andorra..."
                    autoComplete="off"
                    value={homeQuery}
                    onChange={(event) => setHomeQuery(event.target.value)}
                  />
                  <button type="submit" className="search-bar__icon search-bar__icon--submit" aria-label="Enviar consulta">
                    <span aria-hidden="true">➤</span>
                  </button>
                </div>
                <div className="search-bar__quick-questions" aria-label="Consultes suggerides">
                  <button type="button" onClick={() => handleQuickQuestion('Quins són els principis fonamentals de la Constitució?')}>
                    Principis fonamentals
                  </button>
                  <button type="button" onClick={() => handleQuickQuestion('Quins són els drets fonamentals garantits per la Constitució?')}>
                    Drets fonamentals
                  </button>
                  <button type="button" onClick={() => handleQuickQuestion('Com està organitzat el sistema institucional andorrà?')}>
                    Organització institucional
                  </button>
                </div>
                <label className="search-bar__consent">
                  <input
                    type="checkbox"
                    checked={homeConsent}
                    onChange={(event) => handleConsentChange(event.target.checked)}
                  />
                  <span>
                    Confirmo que he llegit la informació de privacitat i que no inclouré dades personals ni confidencials en la meva consulta.
                  </span>
                </label>
                {homeError && <p className="search-bar__error">{homeError}</p>}
              </form>
            </div>
          </section>

          {/* Mètriques */}
          <section className="status-section">
            <div className="hero-metrics" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div className="metric-card">
                <strong>{totalConstitucioArticles}</strong>
                <span>articles de la Constitució d&apos;Andorra</span>
              </div>
            </div>
          </section>

          {/* Constitució d'Andorra */}
          <section id="constitucio" className="articles-section">
            <header>
              <h2>Constitució del Principat d&apos;Andorra</h2>
              <p>
                La Constitució d&apos;Andorra, aprovada el 1993, estableix les bases del sistema polític i jurídic del Principat. És la norma suprema de l&apos;ordenament jurídic andorrà i garanteix els principis de llibertat, igualtat, justícia i democràcia.
              </p>
            </header>
            <div className="titles-grid">
              <article className="title-card">
                <span className="title-icon" aria-hidden="true">📜</span>
                <div className="title-head">
                  <h3>Constitució d&apos;Andorra</h3>
                </div>
                <p>Constitució del Principat d&apos;Andorra (1993)</p>
                <div className="title-footer">
                  <span className="title-count">{totalConstitucioArticles} articles</span>
                  <Link href="/codis/constitucio">
                    Explorar contingut →
                  </Link>
                </div>
              </article>
            </div>
          </section>

          {/* Funcionalitats */}
          <section className="overview-section">
            <header>
              <h2>Com aprofitar l&apos;eina</h2>
              <p>Recorregut ràpid per conèixer les funcionalitats i treure&apos;n el màxim profit.</p>
            </header>
            <div className="overview-grid">
              <article className="info-card">
                <h3>📖 Lectura estructurada</h3>
                <p>
                  Navega per títols i articles amb la numeració oficial i accés directe a cada disposició de la Constitució d&apos;Andorra.
                </p>
              </article>
              <article className="info-card">
                <h3>🤖 Interpretació assistida</h3>
                <p>
                  Activa resums i exemples generats amb IA per entendre la norma en context. Pensat per a fer accessible la Constitució a la ciutadania.
                </p>
              </article>
              <article className="info-card">
                <h3>💬 Chatbot Prudència</h3>
                <p>
                  Consulta la Constitució d&apos;Andorra. El chatbot busca automàticament en els documents per respondre les teves preguntes.
                </p>
              </article>
              <article className="info-card">
                <h3>⚖️ Jurisprudència i doctrina</h3>
                <p>
                  Accedeix a sentències i publicacions acadèmiques relacionades amb els articles de la Constitució d&apos;Andorra.
                </p>
              </article>
            </div>
          </section>

          <section className="project-note">
            <p>
              Projecte acadèmic desenvolupat per estudiants de dret amb la voluntat d&apos;empoderar la ciutadania i facilitar l&apos;accés integral a la Constitució del Principat d&apos;Andorra.
              Aquesta eina no substitueix l&apos;assessorament professional.
            </p>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
