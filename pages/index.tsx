import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Shield, Users, Scale, FileCheck, Landmark, Check, PlayCircle } from 'lucide-react';
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

  return (
    <>
      <Head>
        <title>
          {idioma === 'ca' ? 'Dret Planer · Constitució d\'Andorra' :
           idioma === 'es' ? 'Derecho Plano · Constitución de Andorra' :
           'Droit Plan · Constitution d\'Andorre'}
        </title>
        <meta
          name="description"
          content={t(idioma, 'home.descripcio')}
        />
      </Head>
      <Layout>
        {/* HERO BANNER – gradient muntanyenc (estil Mistral) */}
        <section className="home-banner">
          <div className="home-banner-mountains" aria-hidden="true">
            <div className="home-banner-peak home-banner-peak-1" />
            <div className="home-banner-peak home-banner-peak-2" />
            <div className="home-banner-peak home-banner-peak-3" />
          </div>
          <div className="home-banner-content">
            <h1 className="home-banner-title">
              {t(idioma, 'home.titol')}<br />
              <span>{t(idioma, 'home.subtitol')}</span>
            </h1>
            <p className="home-banner-desc">
              {t(idioma, 'home.descripcio')}
            </p>
            <div className="home-banner-actions">
              <Link
                href="#estructura"
                className="home-banner-btn"
                scroll={false}
              >
                {t(idioma, 'home.comença')} →
              </Link>
              <button
                type="button"
                onClick={() => openChat()}
                className="home-banner-btn"
              >
                {t(idioma, 'home.aprenDret')} →
              </button>
            </div>
          </div>
        </section>

        {/* Main Home Container */}
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24">

          {/* BANNER MULTILINGÜE */}
          <MultilingualBanner />

          {/* ESTRUCTURA DE LA CONSTITUCIÓ */}
          <section id="estructura" className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">{t(idioma, 'home.estructuraTitol')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Card 1 */}
              <Link href="/codis/constitucio?part=drets" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <Shield className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">{t(idioma, 'home.dretsFonamentals')}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t(idioma, 'home.dretsFonamentalsDesc')}</p>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/codis/constitucio?part=nacionalitat" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <Users className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">{t(idioma, 'home.nacionalitat')}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t(idioma, 'home.nacionalitatDesc')}</p>
                </div>
              </Link>

              {/* Card 3 */}
              <Link href="/codis/constitucio?part=justicia" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <Scale className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">{t(idioma, 'home.poderJudicial')}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t(idioma, 'home.poderJudicialDesc')}</p>
                </div>
              </Link>

              {/* Card 4 */}
              <Link href="/codis/constitucio?part=parlament" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <FileCheck className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">{t(idioma, 'home.consellGeneral')}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t(idioma, 'home.consellGeneralDesc')}</p>
                </div>
              </Link>

              {/* Card 5 */}
              <Link href="/codis/constitucio?part=govern" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <Landmark className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">{t(idioma, 'home.govern')}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t(idioma, 'home.governDesc')}</p>
                </div>
              </Link>
            </div>
          </section>

          {/* GUIES SOBRE LA CONSTITUCIÓ */}
          <section className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">{t(idioma, 'home.preguntesRapides')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                t(idioma, 'home.pregunta1'),
                t(idioma, 'home.pregunta2'),
                t(idioma, 'home.pregunta3'),
                t(idioma, 'home.pregunta4'),
                t(idioma, 'home.pregunta5'),
                t(idioma, 'home.pregunta6')
              ].map((guide, idx) => (
                <button
                  key={idx}
                  onClick={() => openChat(guide)}
                  className="flex items-start gap-3 p-5 text-left border border-gray-200 rounded-xl hover:border-gray-900 hover:shadow-sm transition-all bg-white group"
                >
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Check className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-900 font-medium leading-tight group-hover:text-black">{guide}</span>
                </button>
              ))}
            </div>
          </section>

          {/* VÍDEO DESTACAT */}
          <section className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {idioma === 'ca' ? 'La defensa del patrimoni' : idioma === 'es' ? 'La defensa del patrimonio' : 'La défense du patrimoine'}
            </h2>
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-black">
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="/images/poster-defensa.jpg" // Opcional: si tens una imatge de portada
              >
                <source src="/defensa-patrimoni.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-gray-600 text-lg">
              {idioma === 'ca' 
                ? "Una explicació visual sobre com la Constitució protegeix el patrimoni cultural i natural d'Andorra (Article 34)."
                : idioma === 'es'
                  ? "Una explicación visual sobre cómo la Constitución protege el patrimonio cultural y natural de Andorra (Artículo 34)."
                  : "Une explication visuelle sur la façon dont la Constitution protège le patrimoine culturel et naturel d'Andorre (Article 34)."
              }
            </p>
          </section>

          {/* ESTUDIA LA CONSTITUCIÓ */}
          <section className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">{t(idioma, 'home.estudiaConstitucio')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 rounded-xl divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-white shadow-sm">
              <Link href="/codis/constitucio#preambul" className="p-8 text-center hover:bg-gray-50 transition-colors bg-white first:rounded-t-xl first:md:rounded-l-xl first:md:rounded-tr-none">
                <span className="font-bold text-gray-900">{t(idioma, 'home.preambul')}</span>
              </Link>
              <Link href="/codis/constitucio" className="p-8 text-center hover:bg-gray-50 transition-colors bg-white">
                <span className="font-bold text-gray-900">{t(idioma, 'home.titolsI_IV')}</span>
              </Link>
              <Link href="/codis/constitucio" className="p-8 text-center hover:bg-gray-50 transition-colors bg-white last:rounded-b-xl last:md:rounded-r-xl last:md:rounded-bl-none">
                <span className="font-bold text-gray-900">{t(idioma, 'home.titolsV_X')}</span>
              </Link>
            </div>
          </section>

        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
