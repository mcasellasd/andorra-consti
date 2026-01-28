import React, { useCallback } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Shield, Users, Scale, FileCheck, Landmark, Check, PlayCircle } from 'lucide-react';

const IndexPage: React.FC = () => {
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
        <title>Dret Planer · Constitució d&apos;Andorra</title>
        <meta
          name="description"
          content="La Constitució d'Andorra explicada per a tothom. Guies, estructura i drets."
        />
      </Head>
      <Layout>
        {/* Main Home Container */}
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24">

          {/* HERO SECTION */}
          <section className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              La Constitució d&apos;Andorra<br />
              <span className="text-gray-900">explicada per a tothom.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Entén els teus drets constitucionals amb guies clares i pràctiques.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link
                href="#estructura"
                className="px-8 py-3 bg-transparent border border-gray-200 text-gray-900 rounded-md font-medium hover:bg-gray-50 transition-colors"
                scroll={false}
              >
                Comença
              </Link>
              <button
                onClick={() => openChat()}
                className="px-8 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors border border-black"
              >
                Aprèn dret
              </button>
            </div>
          </section>

          {/* ESTRUCTURA DE LA CONSTITUCIÓ */}
          <section id="estructura" className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">Estructura de la Constitució</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Card 1 */}
              <Link href="/codis/constitucio?part=drets" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <Shield className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">Drets fonamentals</h3>
                  <p className="text-xs text-gray-500 mt-1">Títol II - Drets i llibertats (Arts. 4-43)</p>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/codis/constitucio?part=nacionalitat" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <Users className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">Nacionalitat</h3>
                  <p className="text-xs text-gray-500 mt-1">Títol I - Sobirania i ciutadania (Arts. 1-3)</p>
                </div>
              </Link>

              {/* Card 3 */}
              <Link href="/codis/constitucio?part=justicia" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <Scale className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">Poder judicial</h3>
                  <p className="text-xs text-gray-500 mt-1">Títol VII - Justícia (Arts. 85-94)</p>
                </div>
              </Link>

              {/* Card 4 */}
              <Link href="/codis/constitucio?part=parlament" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <FileCheck className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">Consell General</h3>
                  <p className="text-xs text-gray-500 mt-1">Títol IV - Parlament (Arts. 50-71)</p>
                </div>
              </Link>

              {/* Card 5 */}
              <Link href="/codis/constitucio?part=govern" className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white text-center flex flex-col items-center gap-4">
                <Landmark className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900">Govern</h3>
                  <p className="text-xs text-gray-500 mt-1">Títol V - Poder executiu (Arts. 72-78)</p>
                </div>
              </Link>
            </div>
          </section>

          {/* GUIES SOBRE LA CONSTITUCIÓ */}
          <section className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">Preguntes ràpides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Què són els drets fonamentals?",
                "Com funciona el Consell General?",
                "Els Coprínceps: funció i poders",
                "El Tribunal Constitucional explicat",
                "Drets i deures dels ciutadans",
                "Com es reforma la Constitució?"
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

          {/* DRETS EN ACCIÓ */}
          <section className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">Drets en acció</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Drets a la intimitat",
                "Llibertat d'expressió",
                "Dret de reunió"
              ].map((title, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors relative overflow-hidden">
                    {/* Placeholder for video content */}
                    <PlayCircle className="w-12 h-12 text-gray-900 opacity-80 group-hover:scale-110 transition-transform duration-300" strokeWidth={1} />
                  </div>
                  <h3 className="font-bold text-gray-900">{title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* ESTUDIA LA CONSTITUCIÓ */}
          <section className="space-y-10">
            <h2 className="text-3xl font-bold text-gray-900">Estudia la Constitució</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 rounded-xl divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-white shadow-sm">
              <Link href="/codis/constitucio#preambul" className="p-8 text-center hover:bg-gray-50 transition-colors bg-white first:rounded-t-xl first:md:rounded-l-xl first:md:rounded-tr-none">
                <span className="font-bold text-gray-900">Preàmbul</span>
              </Link>
              <Link href="/codis/constitucio" className="p-8 text-center hover:bg-gray-50 transition-colors bg-white">
                <span className="font-bold text-gray-900">Títols I-IV</span>
              </Link>
              <Link href="/codis/constitucio" className="p-8 text-center hover:bg-gray-50 transition-colors bg-white last:rounded-b-xl last:md:rounded-r-xl last:md:rounded-bl-none">
                <span className="font-bold text-gray-900">Títols V-X</span>
              </Link>
            </div>
          </section>

        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
