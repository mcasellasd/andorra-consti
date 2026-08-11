import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Shield, Users, Scale, FileCheck, Landmark, Check, ArrowRight, BookOpen, MessageCircle, History } from 'lucide-react';
import { MultilingualBanner } from '../components/MultilingualBanner';
import { getIdiomaActual, t, type Idioma } from '../lib/i18n';

const IndexPage: React.FC = () => {
  const [idioma, setIdioma] = useState<Idioma>('ca');
  const [selectedPath, setSelectedPath] = useState('drets');

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

  const paths = [
    {
      id: 'drets',
      icon: Shield,
      title: idioma === 'ca' ? 'Drets i llibertats' : idioma === 'es' ? 'Derechos y libertades' : 'Droits et libertés',
      copy: idioma === 'ca' ? 'Què pot exigir una persona i quines garanties té davant dels poders públics?' : idioma === 'es' ? '¿Qué puede exigir una persona y qué garantías tiene ante los poderes públicos?' : 'Que peut exiger une personne et quelles garanties a-t-elle face aux pouvoirs publics?',
      href: '/codis/constitucio?part=drets'
    },
    {
      id: 'institucions',
      icon: Landmark,
      title: idioma === 'ca' ? 'Institucions' : idioma === 'es' ? 'Instituciones' : 'Institutions',
      copy: idioma === 'ca' ? 'Com s’organitza l’Estat i qui pren les decisions que ens afecten?' : idioma === 'es' ? '¿Cómo se organiza el Estado y quién toma las decisiones que nos afectan?' : 'Comment l’État est-il organisé et qui prend les décisions qui nous concernent?',
      href: '/codis/constitucio?part=institucions'
    },
    {
      id: 'convivencia',
      icon: Users,
      title: idioma === 'ca' ? 'Vida col·lectiva' : idioma === 'es' ? 'Vida colectiva' : 'Vie collective',
      copy: idioma === 'ca' ? 'Quins principis comparteix la comunitat i com es protegeix l’interès general?' : idioma === 'es' ? '¿Qué principios comparte la comunidad y cómo se protege el interés general?' : 'Quels principes la communauté partage-t-elle et comment l’intérêt général est-il protégé?',
      href: '/codis/constitucio?part=principis'
    }
  ];
  const selectedPathData = paths.find((path) => path.id === selectedPath) || paths[0];

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
        <section className="home-banner home-banner--editorial">
          <div className="home-banner-orbit" aria-hidden="true" />
          <div className="home-banner-content">
            <span className="home-banner-eyebrow">
              {idioma === 'ca' ? 'Constitució · Andorra · Vida col·lectiva' : idioma === 'es' ? 'Constitución · Andorra · Vida colectiva' : 'Constitution · Andorre · Vie collective'}
            </span>
            <h1 className="home-banner-title">
              {idioma === 'ca' ? <>La Constitució<br /><span>també és <em>teva.</em></span></> : <>{t(idioma, 'home.titol')}<br /><span>{t(idioma, 'home.subtitol')}</span></>}
            </h1>
            <p className="home-banner-desc">{idioma === 'ca' ? 'Una Constitució coneguda és una Constitució viva.' : t(idioma, 'home.descripcio')}</p>
            <div className="home-banner-actions">
              <Link href="#explora" className="home-banner-btn home-banner-btn--primary" scroll={false}>
                {idioma === 'ca' ? 'Explora la Constitució' : t(idioma, 'home.comença')} <ArrowRight size={17} />
              </Link>
              <button type="button" onClick={() => openChat()} className="home-banner-btn home-banner-btn--ghost">
                <MessageCircle size={17} /> {t(idioma, 'home.aprenDret')}
              </button>
            </div>
          </div>
          <div className="home-banner-note"><span>1993</span><strong>Una eina per entendre<br />el país que compartim.</strong></div>
        </section>

        <div className="page-shell">
          <section className="home-section">
            <div className="home-section-card">
              <MultilingualBanner />
            </div>
          </section>

          <section id="explora" className="home-section home-explore-section">
            <div className="section-heading home-section-heading--wide">
              <div>
                <span className="home-kicker">{idioma === 'ca' ? 'Comença per una situació' : idioma === 'es' ? 'Empieza por una situación' : 'Commencez par une situation'}</span>
                <h2>{idioma === 'ca' ? 'On apareix la Constitució en la teva vida?' : idioma === 'es' ? '¿Dónde aparece la Constitución en tu vida?' : 'Où la Constitution apparaît-elle dans votre vie ?'}</h2>
              </div>
              <p>{idioma === 'ca' ? 'Tria un itinerari i descobreix quins articles t’ajuden a entendre’l.' : idioma === 'es' ? 'Elige un itinerario y descubre qué artículos te ayudan a entenderlo.' : 'Choisissez un parcours et découvrez les articles qui vous aident à le comprendre.'}</p>
            </div>
            <div className="home-path-grid" role="group" aria-label="Situacions per explorar">
              {paths.map(({ id, icon: Icon, title, copy }) => (
                <button key={id} type="button" className={`home-path-card${selectedPath === id ? ' is-selected' : ''}`} onClick={() => setSelectedPath(id)} aria-pressed={selectedPath === id}>
                  <Icon size={21} /><strong>{title}</strong><span>{copy}</span>
                </button>
              ))}
            </div>
            <div className="home-path-result">
              <div><span className="home-path-label">{idioma === 'ca' ? 'Itinerari seleccionat' : idioma === 'es' ? 'Itinerario seleccionado' : 'Parcours sélectionné'}</span><h3>{selectedPathData.title}</h3><p>{selectedPathData.copy}</p></div>
              <Link href={selectedPathData.href} className="home-path-link">{idioma === 'ca' ? 'Veure els articles' : idioma === 'es' ? 'Ver los artículos' : 'Voir les articles'} <ArrowRight size={17} /></Link>
            </div>
          </section>

          <section className="home-context-strip">
            <div className="home-context-icon"><History size={22} /></div>
            <div><span className="home-kicker">{idioma === 'ca' ? 'Per interpretar, cal entendre' : idioma === 'es' ? 'Para interpretar, hay que entender' : 'Pour interpréter, il faut comprendre'}</span><h2>{idioma === 'ca' ? 'D’on ve la Constitució?' : idioma === 'es' ? '¿De dónde viene la Constitución?' : 'D’où vient la Constitution ?'}</h2><p>{idioma === 'ca' ? 'Conèixer el seu context, els seus motius i els seus debats ajuda a llegir-la amb més criteri.' : idioma === 'es' ? 'Conocer su contexto, sus motivos y sus debates ayuda a leerla con más criterio.' : 'Connaître son contexte, ses motifs et ses débats aide à la lire avec plus de discernement.'}</p></div>
            <Link href="/codis/constitucio#preambul" className="home-context-link"><BookOpen size={17} /> {idioma === 'ca' ? 'Llegir el context' : idioma === 'es' ? 'Leer el contexto' : 'Lire le contexte'}</Link>
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
