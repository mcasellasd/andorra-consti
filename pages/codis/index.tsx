/**
 * Pàgina d'índex dels codis legals d'Andorra
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getIdiomaActual, t } from '../../lib/i18n';
import { articlesConstitucio } from '../../data/codis/constitucio/articles-template';

const CodisPage: React.FC = () => {
  const idioma = getIdiomaActual();

  return (
    <>
      <Head>
        <title>Constitució d&apos;Andorra | dretplaner.ad</title>
        <meta
          name="description"
          content="Navega per la Constitució del Principat d'Andorra amb interpretació assistida per IA."
        />
      </Head>
      <Layout>
        <div className="codis-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <header style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Constitució d&apos;Andorra
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#64748b' }}>
              {idioma === 'ca' && 'Navega per la Constitució del Principat d\'Andorra'}
              {idioma === 'es' && 'Navega por la Constitución del Principado de Andorra'}
              {idioma === 'fr' && 'Naviguez dans la Constitution de la Principauté d\'Andorre'}
            </p>
          </header>

          {/* Constitució */}
          <section style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Constitució d&apos;Andorra
                  </h2>
                  <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                    {idioma === 'ca' && 'Constitució del Principat d\'Andorra (1993)'}
                    {idioma === 'es' && 'Constitución del Principado de Andorra (1993)'}
                    {idioma === 'fr' && 'Constitution de la Principauté d\'Andorre (1993)'}
                  </p>
                  <p style={{ color: '#475569', fontSize: '0.875rem' }}>
                    {articlesConstitucio.length} {idioma === 'ca' ? 'articles' : idioma === 'es' ? 'artículos' : 'articles'}
                  </p>
                </div>
                <Link
                  href="/codis/constitucio"
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#3b82f6',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  {idioma === 'ca' ? 'Explorar →' : idioma === 'es' ? 'Explorar →' : 'Explorer →'}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default CodisPage;

