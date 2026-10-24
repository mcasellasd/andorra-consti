import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getIdiomaActual, type Idioma } from '../lib/i18n';
import { useInterlocutorProfile } from '../components/InterlocutorProfileSelector';
import { getResponseStyleId, RESPONSE_STYLE_PROFILES, type InterlocutorProfile } from '../lib/interlocutor-profile';
import { articlesConstitucio } from '../data/codis/constitucio/articles-template';

const articleTwo = articlesConstitucio.find(({ id }) => id === 'CONST_002');
const articleTwoLines = articleTwo?.text_oficial.split('\n') ?? [];

const copy = {
  ca: {
    title: 'La Constitució d’Andorra, en llenguatge clar',
    description: 'El text constitucional, explicat de manera accessible i planera. Llegeix l’article, entén-ne el sentit i torna a la font.',
    kicker: 'Constitució d’Andorra · dret a comprendre', heroLead: 'El text constitucional, explicat de manera accessible i planera. Llegeix l’article, entén-ne el sentit i torna a la font.',
    explore: 'Explora la Constitució', explain: 'Com s’explica un article', article: 'Article 02', state: 'L’Estat andorrà', constitution: 'Constitució d’Andorra', text: 'Text constitucional',
    routeKicker: 'La lectura en tres passos', routeTitle: 'Del text a una comprensió pròpia.', routeLead: 'Comença per la Constitució i llegeix-la amb context i fonts a l’abast.',
    step1: 'Troba l’article', step1desc: 'Explora els títols de la Constitució o cerca una paraula, un dret o una institució.',
    step2: 'Llegeix l’explicació', step2desc: 'Consulta el text original i les explicacions disponibles, presentades per separat.',
    step3: 'Contrasta les fonts', step3desc: 'Segueix les referències i torna a la publicació oficial per comprovar el redactat.',
    indexLink: 'Obrir l’índex de la Constitució', searchLink: 'Cercar al text',
    readingKicker: 'La norma i la lectura', readingTitle: 'Una explicació clara no esborra la font.', readingLead: 'El text oficial i la lectura planera es presenten per separat perquè puguis consultar-los i relacionar-los.',
    official: 'Text constitucional', plain: 'Lectura planera', inBrief: 'En poques paraules', article2: 'Article 2', plainText: 'L’article identifica la llengua oficial, els símbols de l’Estat i la seva capital.',
    profileKicker: 'Preferència del xat', profileTitle: 'La mateixa pregunta. Una resposta al teu ritme.', profileLead: 'Tria com vols que s’expliqui. Aquesta preferència també s’aplica quan preguntes al xat.',
    profileClear: 'Breu i planera', profileClearDesc: 'La idea principal, amb paraules quotidianes.', profileStep: 'Pas a pas', profileStepDesc: 'Una explicació ordenada, amb context quan ajuda.', profileLegal: 'Més detall jurídic', profileLegalDesc: 'Més conceptes i referències jurídiques disponibles.',
    selected: 'Estil actiu per al xat:',
    projectKicker: 'Transparència', projectTitle: 'Sobre el projecte', projectLead: 'Com es prepara el contingut, quines fonts es fan servir i quins són els límits de les explicacions.', projectLink: 'Metodologia, fonts i límits',
    officialNote: 'El text constitucional es mostra en català, llengua oficial de l’Estat.',
  },
  es: {
    title: 'La Constitución de Andorra, en lenguaje claro',
    description: 'El texto constitucional, explicado de forma accesible y sencilla. Lee el artículo, comprende su sentido y vuelve a la fuente.',
    kicker: 'Constitución de Andorra · derecho a comprender', heroLead: 'El texto constitucional, explicado de forma accesible y sencilla. Lee el artículo, comprende su sentido y vuelve a la fuente.',
    explore: 'Explora la Constitución', explain: 'Cómo se explica un artículo', article: 'Artículo 02', state: 'El Estado andorrano', constitution: 'Constitución de Andorra', text: 'Texto constitucional',
    routeKicker: 'La lectura en tres pasos', routeTitle: 'Del texto a una comprensión propia.', routeLead: 'Empieza por la Constitución y léela con contexto y fuentes a tu alcance.',
    step1: 'Encuentra el artículo', step1desc: 'Explora los títulos de la Constitución o busca una palabra, un derecho o una institución.',
    step2: 'Lee la explicación', step2desc: 'Consulta el texto original y las explicaciones disponibles, presentadas por separado.',
    step3: 'Contrasta las fuentes', step3desc: 'Sigue las referencias y vuelve a la publicación oficial para comprobar el redactado.',
    indexLink: 'Abrir el índice de la Constitución', searchLink: 'Buscar en el texto',
    readingKicker: 'La norma y la lectura', readingTitle: 'Una explicación clara no borra la fuente.', readingLead: 'El texto oficial y la lectura sencilla se presentan por separado para que puedas consultarlos y relacionarlos.',
    official: 'Texto constitucional', plain: 'Lectura sencilla', inBrief: 'En pocas palabras', article2: 'Artículo 2', plainText: 'El artículo identifica la lengua oficial, los símbolos del Estado y su capital.',
    profileKicker: 'Preferencia del chat', profileTitle: 'La misma pregunta. Una respuesta a tu ritmo.', profileLead: 'Elige cómo quieres que se explique. Esta preferencia también se aplica cuando preguntas al chat.',
    profileClear: 'Breve y sencilla', profileClearDesc: 'La idea principal, con palabras cotidianas.', profileStep: 'Paso a paso', profileStepDesc: 'Una explicación ordenada, con contexto cuando ayuda.', profileLegal: 'Más detalle jurídico', profileLegalDesc: 'Más conceptos y referencias jurídicas disponibles.',
    selected: 'Estilo activo en el chat:',
    projectKicker: 'Transparencia', projectTitle: 'Sobre el proyecto', projectLead: 'Cómo se prepara el contenido, qué fuentes se utilizan y cuáles son los límites de las explicaciones.', projectLink: 'Metodología, fuentes y límites',
    officialNote: 'El texto constitucional se muestra en catalán, lengua oficial del Estado.',
  },
  fr: {
    title: 'La Constitution d’Andorre, en langage clair',
    description: 'Le texte constitutionnel, expliqué de manière accessible et simple. Lisez l’article, comprenez son sens et revenez à la source.',
    kicker: 'Constitution d’Andorre · droit de comprendre', heroLead: 'Le texte constitutionnel, expliqué de manière accessible et simple. Lisez l’article, comprenez son sens et revenez à la source.',
    explore: 'Explorer la Constitution', explain: 'Comment un article est expliqué', article: 'Article 02', state: 'L’État andorran', constitution: 'Constitution d’Andorre', text: 'Texte constitutionnel',
    routeKicker: 'La lecture en trois étapes', routeTitle: 'Du texte à une compréhension personnelle.', routeLead: 'Commencez par la Constitution et lisez-la avec du contexte et des sources à portée de main.',
    step1: 'Trouvez l’article', step1desc: 'Explorez les titres de la Constitution ou cherchez un mot, un droit ou une institution.',
    step2: 'Lisez l’explication', step2desc: 'Consultez le texte original et les explications disponibles, présentés séparément.',
    step3: 'Vérifiez les sources', step3desc: 'Suivez les références et revenez à la publication officielle pour vérifier le texte.',
    indexLink: 'Ouvrir l’index de la Constitution', searchLink: 'Rechercher dans le texte',
    readingKicker: 'La règle et sa lecture', readingTitle: 'Une explication claire n’efface pas la source.', readingLead: 'Le texte officiel et la lecture simplifiée sont présentés séparément pour que vous puissiez les consulter et les rapprocher.',
    official: 'Texte constitutionnel', plain: 'Lecture simplifiée', inBrief: 'En quelques mots', article2: 'Article 2', plainText: 'L’article précise la langue officielle, les symboles de l’État et sa capitale.',
    profileKicker: 'Préférence du chat', profileTitle: 'La même question. Une réponse à votre rythme.', profileLead: 'Choisissez la manière dont vous souhaitez que le texte soit expliqué. Cette préférence s’applique aussi lorsque vous posez une question au chat.',
    profileClear: 'Bref et simple', profileClearDesc: 'L’idée principale, avec des mots du quotidien.', profileStep: 'Étape par étape', profileStepDesc: 'Une explication ordonnée, avec du contexte si nécessaire.', profileLegal: 'Plus de détails juridiques', profileLegalDesc: 'Davantage de notions et de références juridiques disponibles.',
    selected: 'Style actif dans le chat :',
    projectKicker: 'Transparence', projectTitle: 'À propos du projet', projectLead: 'Comment le contenu est préparé, quelles sources sont utilisées et quelles sont les limites des explications.', projectLink: 'Méthode, sources et limites',
    officialNote: 'Le texte constitutionnel est affiché en catalan, langue officielle de l’État.',
  },
} satisfies Record<Idioma, Record<string, string>>;

type ResponseStyle = 'clear' | 'step-by-step' | 'legal-detail';

const responseStyles: Array<{ id: ResponseStyle; profile: InterlocutorProfile; key: 'profileClear' | 'profileStep' | 'profileLegal'; description: 'profileClearDesc' | 'profileStepDesc' | 'profileLegalDesc'; letter: string }> = [
  { id: 'clear', profile: RESPONSE_STYLE_PROFILES.clear, key: 'profileClear', description: 'profileClearDesc', letter: 'A' },
  { id: 'step-by-step', profile: RESPONSE_STYLE_PROFILES['step-by-step'], key: 'profileStep', description: 'profileStepDesc', letter: 'B' },
  { id: 'legal-detail', profile: RESPONSE_STYLE_PROFILES['legal-detail'], key: 'profileLegal', description: 'profileLegalDesc', letter: 'C' },
];

const IndexPage: React.FC = () => {
  const [idioma, setIdioma] = useState<Idioma>('ca');
  const { profile, updateProfile } = useInterlocutorProfile();

  useEffect(() => {
    setIdioma(getIdiomaActual());
    const handleIdiomaChange = () => setIdioma(getIdiomaActual());
    window.addEventListener('idiomaChanged', handleIdiomaChange);
    return () => window.removeEventListener('idiomaChanged', handleIdiomaChange);
  }, []);

  const text = copy[idioma];
  const activeStyle = responseStyles.find(({ id }) => id === getResponseStyleId(profile)) ?? responseStyles[0];

  return (
    <>
      <Head>
        <title>{text.title} · dretplaner.ad</title>
        <meta name="description" content={text.description} />
      </Head>
      <Layout>
        <a className="prototype-home-skip" href="#home-primary">{idioma === 'ca' ? 'Ves al contingut principal' : idioma === 'es' ? 'Ir al contenido principal' : 'Aller au contenu principal'}</a>
        <section className="prototype-home-hero" id="home-primary" tabIndex={-1}>
          <div className="prototype-home-wrap prototype-home-hero-grid">
            <div className="prototype-home-hero-copy">
              <p className="prototype-home-kicker">{text.kicker}</p>
              <h1>{idioma === 'ca' ? <>La Constitució,<br /><em>en llenguatge clar.</em></> : idioma === 'es' ? <>La Constitución,<br /><em>en lenguaje claro.</em></> : <>La Constitution,<br /><em>en langage clair.</em></>}</h1>
              <p className="prototype-home-lede">{text.heroLead}</p>
              <div className="prototype-home-actions">
                <Link className="prototype-home-button" href="/codis/constitucio">{text.explore}<span aria-hidden="true">↗</span></Link>
                <a className="prototype-home-text-link" href="#home-reading">{text.explain}</a>
              </div>
            </div>
            <figure className="prototype-home-hero-card" aria-label={`${text.article} · ${text.state}`}>
              <div className="prototype-home-card-meta"><span>{text.constitution}</span><span>1993</span></div>
              <h2><span>{text.article}</span>{text.state}</h2>
              <ol>
                {articleTwoLines.map((line) => {
                  const match = line.match(/^(\d+)\.\s*(.*)$/);
                  return <li key={line}><b>{match?.[1].padStart(2, '0')}</b><span>{match?.[2] ?? line}</span></li>;
                })}
              </ol>
              <figcaption><span>{text.text}</span><span aria-hidden="true">§</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="prototype-home-wrap prototype-home-route" id="home-route" aria-labelledby="home-route-title">
          <div className="prototype-home-section-head">
            <span className="prototype-home-section-index">{text.routeKicker}</span>
            <div><h2 id="home-route-title">{text.routeTitle}</h2><p>{text.routeLead}</p></div>
          </div>
          <ol className="prototype-home-steps">
            {[['01', text.step1, text.step1desc], ['02', text.step2, text.step2desc], ['03', text.step3, text.step3desc]].map(([number, title, description]) => (
              <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>
            ))}
          </ol>
          <nav className="prototype-home-route-links" aria-label={idioma === 'ca' ? 'Eines per llegir la Constitució' : idioma === 'es' ? 'Herramientas para leer la Constitución' : 'Outils de lecture de la Constitution'}>
            <Link href="/codis/constitucio">{text.indexLink}<span aria-hidden="true">→</span></Link>
            <Link href="/cerca">{text.searchLink}<span aria-hidden="true">→</span></Link>
          </nav>
        </section>

        <section className="prototype-home-reading" id="home-reading" aria-labelledby="home-reading-title">
          <div className="prototype-home-wrap">
            <div className="prototype-home-reading-head">
              <div><span className="prototype-home-section-index">{text.readingKicker}</span><h2 id="home-reading-title">{text.readingTitle}</h2></div>
              <p>{text.readingLead}</p>
            </div>
            <div className="prototype-home-spread">
              <article className="prototype-home-source-card">
                <div className="prototype-home-card-label"><span>01 · {text.official}</span><span>{text.article2}</span></div>
                <blockquote>{articleTwoLines.map((line) => <p key={line}>{line}</p>)}</blockquote>
                {idioma !== 'ca' && <p className="prototype-home-note">{text.officialNote}</p>}
              </article>
              <article className="prototype-home-plain-card">
                <div className="prototype-home-card-label"><span>02 · {text.plain}</span><span>{text.inBrief}</span></div>
                <p>{text.plainText}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="prototype-home-wrap prototype-home-preference" aria-labelledby="home-preference-title">
          <div className="prototype-home-preference-layout">
            <div>
              <span className="prototype-home-pref-label">{text.profileKicker}</span>
              <h2 id="home-preference-title">{text.profileTitle}</h2>
              <p className="prototype-home-pref-lead">{text.profileLead}</p>
            </div>
            <div>
              <div className="prototype-home-modes" role="group" aria-label={idioma === 'ca' ? 'Estil de resposta del xat' : idioma === 'es' ? 'Estilo de respuesta del chat' : 'Style de réponse du chat'}>
                {responseStyles.map((style) => (
                  <button key={style.id} type="button" aria-pressed={activeStyle.id === style.id} onClick={() => updateProfile(style.profile)}>
                    <span className="prototype-home-mode-letter">{style.letter}</span>
                    <span className="prototype-home-mode-copy"><strong>{text[style.key]}</strong><span>{text[style.description]}</span></span>
                    <span className="prototype-home-mode-mark" aria-hidden="true">{activeStyle.id === style.id ? '✓' : '＋'}</span>
                  </button>
                ))}
              </div>
              <p className="prototype-home-profile-status" role="status" aria-live="polite">{text.selected} <strong>{text[activeStyle.key]}</strong></p>
            </div>
          </div>
        </section>

        <section className="prototype-home-wrap prototype-home-project" id="home-project" aria-labelledby="home-project-title">
          <div><span className="prototype-home-section-index">{text.projectKicker}</span><h2 id="home-project-title">{text.projectTitle}</h2><p>{text.projectLead}</p></div>
          <Link href="/com-esta-fet">{text.projectLink}<span aria-hidden="true">↗</span></Link>
        </section>
      </Layout>
    </>
  );
};

export default IndexPage;
