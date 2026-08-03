import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Shield, Users, Scale, FileCheck, Landmark, Check } from 'lucide-react';
import { MultilingualBanner } from '../components/MultilingualBanner';
import { getIdiomaActual, t, type Idioma } from '../lib/i18n';

const IndexPage: React.FC = () => {
  const [idioma, setIdioma] = useState<Idioma>('ca');

  useEffect(() => {
    setIdioma(getIdiomaActual());
    const handleIdiomaChange = () => setIdioma(getIdiomaActual());
    window.addEventListener('idiomaChanged', handleIdiomaChange);
    return () => window.removeEventListener('idiomaChanged', handleIdiomaChange);
  }, []);

  const openChat = useCallback((question: string = '') => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('openUnifiedChat', {
        detail: { question, autoSubmit: !!question }
      });
      window.dispatchEvent(event);
    }
  }, []);

  const cards = [
    { href: '/codis/constitucio?part=drets', icon: Shield, title: t(idioma, 'home.dretsFonamentals'), desc: t(idioma, 'home.dretsFonamentalsDesc') },
    { href: '/codis/constitucio?part=nacionalitat', icon: Users, title: t(idioma, 'home.nacionalitat'), desc: t(idioma, 'home.nacionalitatDesc') },
    { href: '/codis/constitucio?part=justicia', icon: Scale, title: t(idioma, 'home.poderJudicial'), desc: t(idioma, 'home.poderJudicialDesc') },
    { href: '/codis/constitucio?part=parlament', icon: FileCheck, title: t(idioma, 'home.consellGeneral'), desc: t(idioma, 'home.consellGeneralDesc') },
    { href: '/codis/constitucio?part=govern', icon: Landmark, title: t(idioma, 'home.govern'), desc: t(idioma, 'home.governDesc') },
  ];

  const questions = [
    t(idioma, 'home.pregunta1'),
    t(idioma, 'home.pregunta2'),
    t(idioma, 'home.pregunta3'),
    t(idioma, 'home.pregunta4'),
    t(idioma, 'home.pregunta5'),
    t(idioma, 'home.pregunta6'),
  ];

  return (
    <>
      <Head>
        <title>
          {idioma === 'ca' ? 'Dret Planer · Constitució d\'Andorra' :
           idioma === 'es' ? 'Derecho Plano · Constitución de Andorra' :
           'Droit Plan · Constitution d\'Andorre'}
        </title>
        <meta name="description" content={t(idioma, 'home.descripcio')} />
      </Head>
      <Layout>
        <section className="home-banner">
          <div className="home-banner-mountains" aria-hidden="true">
            <div className="home-banner-peak home-banner-peak-1" />
            <div className="home-banner-peak home-banner-peak-2" />
            <div className="home-banner-peak home-banner-peak-3" />
          </div>
          <div className="home-banner-content">
            <span className="home-banner-eyebrow">
              {idioma === 'ca' ? 'Constitució d\'Andorra · 1993' : idioma === 'es' ? 'Constitución de Andorra · 1993' : 'Constitution d\'Andorre · 1993'}
            </span>
            <h1 className="home-banner-title">
              {t(idioma, 'home.titol')}<br />
              <span>{t(idioma, 'home.subtitol')}</span>
            </h1>
            <p className="home-banner-desc">{t(idioma, 'home.descripcio')}</p>
            <div className="home-banner-actions">
              <Link href="#estructura" className="home-banner-btn home-banner-btn--primary" scroll={false}>
                {t(idioma, 'home.comença')} →
              </Link>
              <button type="button" onClick={() => openChat()} className="home-banner-btn home-banner-btn--ghost">
                {t(idioma, 'home.aprenDret')} →
              </button>
            </div>
          </div>
        </section>

        <div className="page-shell">
          <section className="home-section">
            <div className="home-section-card">
              <MultilingualBanner />
            </div>
          </section>

          <section id="estructura" className="home-section">
            <div className="section-heading">
              <h2>{t(idioma, 'home.estructuraTitol')}</h2>
              <p>{idioma === 'ca' ? 'Cinc portes d\'entrada al text. Comença per la que et toqui més de prop.' : idioma === 'es' ? 'Cinco puertas de entrada al texto. Empieza por la que más te toque.' : 'Cinq portes d\'entrée au texte. Commencez par celle qui vous concerne.'}</p>
            </div>
            <div className="home-grid">
              {cards.map(({ href, icon: Icon, title, desc }) => (
                <Link key={href} href={href} className="home-card">
                  <span className="home-card-icon"><Icon size={22} /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="home-section">
            <div className="section-heading">
              <h2>{t(idioma, 'home.preguntesRapides')}</h2>
              <p>{idioma === 'ca' ? 'Clica una pregunta i el xat t\'ajudarà a trobar la resposta amb els articles a la mà.' : idioma === 'es' ? 'Haz clic en una pregunta y el chat te ayudará a encontrar la respuesta con los artículos a la mano.' : 'Cliquez sur une question et le chat vous aidera à trouver la réponse avec les articles à la main.'}</p>
            </div>
            <div className="home-questions">
              {questions.map((guide, idx) => (
                <button key={idx} onClick={() => openChat(guide)} className="home-question">
                  <span className="home-question-mark"><Check size={14} /></span>
                  <span>{guide}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="home-section">
            <div className="section-heading">
              <h2>{idioma === 'ca' ? 'La defensa del patrimoni' : idioma === 'es' ? 'La defensa del patrimonio' : 'La défense du patrimoine'}</h2>
              <p>{idioma === 'ca' ? 'Una explicació visual sobre com la Constitució protegeix el patrimoni cultural i natural d\'Andorra (article 34).' : idioma === 'es' ? 'Una explicación visual sobre cómo la Constitución protege el patrimonio cultural y natural de Andorra (artículo 34).' : 'Une explication visuelle sur la façon dont la Constitution protège le patrimoine culturel et naturel d\'Andorre (article 34).'}</p>
            </div>
            <div className="home-video-card">
              <video controls className="home-video" poster="/images/poster-defensa.jpg">
                <source src="/defensa-patrimoni.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>

          <section className="home-section">
            <div className="section-heading">
              <h2>{t(idioma, 'home.estudiaConstitucio')}</h2>
            </div>
            <div className="home-study-grid">
              <Link href="/codis/constitucio#preambul" className="home-study-card">
                <span>{t(idioma, 'home.preambul')}</span>
              </Link>
              <Link href="/codis/constitucio" className="home-study-card">
                <span>{t(idioma, 'home.titolsI_IV')}</span>
              </Link>
              <Link href="/codis/constitucio" className="home-study-card">
                <span>{t(idioma, 'home.titolsV_X')}</span>
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
