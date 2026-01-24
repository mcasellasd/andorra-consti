import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const PaperIndexPage: React.FC = () => {

  return (
    <>
      <Head>
        <title>Índex del Paper Acadèmic · dretplaner.ad</title>
        <meta
          name="description"
          content="Índex de l'estructura del paper acadèmic sobre la capacitat de la IA per adaptar els preceptes constitucionals andorrans al llenguatge natural."
        />
      </Head>
      <Layout>
        <div className="page-container">
          <article className="legal-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <header className="legal-header">
              <h1>Índex del Paper Acadèmic</h1>
              <p className="legal-subtitle">
                Estructura del paper: "La capacitat de la intel·ligència artificial per adaptar al llenguatge natural els preceptes jurídics constitucionals d'Andorra: una prova pilot de concepte"
              </p>
            </header>

            <section className="legal-section">
              <h2>Estructura General del Paper</h2>

              <div style={{ marginTop: '2rem' }}>
                <h3>1. INTRODUCCIÓ (2-3 pàgines)</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                  <li>├─ 1.1. El problema: accessibilitat jurídica a Andorra</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Dades: 48% immigrants, multilingüisme, complexitat jurídica</li>
                  <li>├─ 1.2. Justificació: Llei 6/2024 + dret a comprendre</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Literatura bàsica: Fuller (1964), Tamanaha (2004)</li>
                  <li>├─ 1.3. Objectiu: demostrar viabilitat tècnica de dretplaner.ad</li>
                  <li>└─ 1.4. Limitació fonamental: no substituir l'advocat, sinó ajudar a comprendre</li>
                  <li style={{ marginLeft: '1rem' }}>└─ La IA com a eina d'assistència, no de substitució</li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3>2. MARCO TEÒRIC MÍNIM (3-4 pàgines)</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                  <li>├─ 2.1. El dret a comprendre (literatura bàsica)</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Fuller: claredat com a requisit del dret</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Tamanaha: accessibilitat i estat de dret</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Context andorrà: Llei 6/2024</li>
                  <li>├─ 2.2. IA i accessibilitat jurídica (literatura recent)</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Katz et al. (2023): LLMs en dret</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Sandefur (2009): accessibilitat jurídica</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Limitacions: al·lucinacions, necessitat de supervisió</li>
                  <li>├─ 2.3. Context andorrà</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Característiques específiques del dret andorrà</li>
                  <li>└─ 2.4. Marc jurídic d'IA a Andorra i AI Act</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Marc andorrà: Llei 29/2021 (protecció de dades)</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Futura Agència d'Intel·ligència de la Dada d'Andorra</li>
                  <li style={{ marginLeft: '1rem' }}>├─ AI Act (UE): aplicabilitat i referència</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Classificació de dretplaner.ad: risc limitat</li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3>3. METODOLOGIA I IMPLEMENTACIÓ (6-8 pàgines) ⭐ CONTRIBUCIÓ PRINCIPAL</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                  <li>├─ 3.1. Arquitectura del sistema</li>
                  <li style={{ marginLeft: '1rem' }}>├─ RAG (Retrieval-Augmented Generation)</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Models: embeddings + generació</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Per què aquesta tria tècnica?</li>
                  <li>├─ 3.2. Corpus: Constitució d'Andorra</li>
                  <li style={{ marginLeft: '1rem' }}>├─ 107 articles + preàmbul (108 entrades)</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Estructuració del corpus</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Metadades i organització</li>
                  <li style={{ marginLeft: '1rem' }}>└─ 3.2.1. Expansió: doctrina (254) i aprenentatge</li>
                  <li>├─ 3.3. Sistema de validació</li>
                  <li style={{ marginLeft: '1rem' }}>├─ 43 preguntes de control (4 categories)</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Criteris d'avaluació (scores)</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Per què aquesta metodologia?</li>
                  <li>└─ 3.4. Compliment normatiu</li>
                  <li style={{ marginLeft: '1rem' }}>└─ AI Act: transparència i advertències</li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3>4. RESULTATS (3-4 pàgines)</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                  <li>├─ 4.1. Processament del corpus</li>
                  <li style={{ marginLeft: '1rem' }}>└─ 360+ entrades (Constitució + Doctrina + Learning)</li>
                  <li>├─ 4.2. Resultats de validació</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Scores per categoria</li>
                  <li style={{ marginLeft: '1rem' }}>├─ Articles trobats, paraules clau, errors</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Taula resum de resultats</li>
                  <li>└─ 4.3. Limitacions identificades</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Honest sobre què funciona i què no</li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3>5. DISCUSSIÓ (2-3 pàgines)</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                  <li>├─ 5.1. Viabilitat del concepte</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Sí, funciona per a la Constitució</li>
                  <li>├─ 5.2. Què hem après sobre la implementació?</li>
                  <li style={{ marginLeft: '1rem' }}>└─ Lliçons tècniques i metodològiques</li>
                  <li>└─ 5.3. Limitacions i futures millores</li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3>6. CONCLUSIONS (1-2 pàgines)</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '1.5rem' }}>
                  <li>├─ 6.1. Viabilitat demostrada</li>
                  <li>├─ 6.2. Contribució: COM implementar-ho</li>
                  <li>└─ 6.3. Perspectives futures</li>
                </ul>
              </div>
            </section>

            <section className="legal-section" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h2>Característiques del Paper</h2>
              <ul>
                <li><strong>Total estimat:</strong> 19-26 pàgines (paper lleuger i pràctic)</li>
                <li><strong>Focus principal:</strong> COM s'implementa (secció 3)</li>
                <li><strong>Literatura mínima:</strong> només la necessària per justificar</li>
                <li><strong>No teoria profunda:</strong> evitar Hart, Dworkin, etc.</li>
                <li><strong>Contribució:</strong> metodologia d'implementació i validació</li>
                <li><strong>Punt clau:</strong> La IA ajuda a comprendre, NO substitueix l'advocat</li>
              </ul>
            </section>

            <section className="legal-section" style={{ marginTop: '2rem' }}>
              <h2>Document Comple del Paper</h2>
              <p>
                El document complet del paper està disponible a:{' '}
                <a
                  href="/docs/PAPER-ACADEMIC-IA-ADAPTACIO-LLENGUATGE-NATURAL.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  docs/PAPER-ACADEMIC-IA-ADAPTACIO-LLENGUATGE-NATURAL.md
                </a>
              </p>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default PaperIndexPage;
