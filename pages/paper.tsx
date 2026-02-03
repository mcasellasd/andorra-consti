import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../components/Layout';
import { markdownToHtml, type TocItem } from '../lib/markdown-to-html';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

interface PaperIndexProps {
  html: string;
  toc: TocItem[];
}

const PaperIndexPage: React.FC<PaperIndexProps> = ({ html, toc }) => {
  const [documentExpanded, setDocumentExpanded] = useState(false);

  return (
    <>
      <Head>
        <title>Paper Acadèmic · dretplaner.ad</title>
        <meta
          name="description"
          content="Índex de l'estructura del paper acadèmic: El dret a la claredat constitucional. IA i adequació tecnològica com a garanties de la cohesió jurídica a Andorra."
        />
      </Head>
      <Layout>
        <div className="page-container paper-page">
          {/* Hero */}
          <div className="paper-hero">
            <h1 className="paper-hero-title">Paper Acadèmic</h1>
            <p className="paper-hero-subtitle">
              El dret a la claredat constitucional: Intel·ligència Artificial i adequació tecnològica com a garanties de la cohesió jurídica a Andorra
            </p>
            <Link
              href="/paper/document"
              className="paper-cta paper-cta-primary"
              aria-label="Obrir el document complet del paper acadèmic"
            >
              <FileText className="paper-cta-icon" size={22} aria-hidden />
              <span>Llegir el document complet</span>
            </Link>
          </div>

          {/* Document complet en mode desplegable */}
          <section className="paper-expandable-section legal-card" aria-labelledby="paper-expandable-heading">
            <h2 id="paper-expandable-heading" className="paper-expandable-heading">
              Document complet del paper
            </h2>
            <button
              type="button"
              className="paper-expandable-trigger"
              onClick={() => setDocumentExpanded(!documentExpanded)}
              aria-expanded={documentExpanded}
              aria-controls="paper-expandable-content"
            >
              {documentExpanded ? (
                <>
                  <ChevronUp size={20} aria-hidden />
                  <span>Replegar document</span>
                </>
              ) : (
                <>
                  <ChevronDown size={20} aria-hidden />
                  <span>Desplegar document complet</span>
                </>
              )}
            </button>
            <div
              id="paper-expandable-content"
              className={`paper-expandable-content ${documentExpanded ? 'paper-expandable-content-open' : ''}`}
              role="region"
              aria-hidden={!documentExpanded}
            >
              <article className="paper-doc-article paper-expandable-article" aria-label="Contingut complet del paper acadèmic">
                <div
                  className="paper-doc-body"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </article>
            </div>
          </section>

          <article className="legal-card">
            <section className="legal-section">
              <h2>Estructura del paper</h2>

              <div className="paper-structure">
                <div className="paper-section-card">
                  <h3>0. Dret Planer. Una plataforma IA per al Dret a Comprendre</h3>
                  <ul className="paper-outline">
                    <li>Introducció: El dret a comprendre a l&apos;era de la intel·ligència artificial</li>
                    <li>0.1. Funcionament (Mode Xat, Anàlisi individual)</li>
                    <li>0.2. Objecte de l&apos;estudi</li>
                    <li>III. El dret a comprendre (doctrina, àmbit internacional, català, Andorra)</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>1. El repte de la comprensió normativa a Andorra</h3>
                  <ul className="paper-outline">
                    <li>1.1. Context sociodemogràfic singular</li>
                    <li>1.1.1. La funció del dret: <em>ignorantia iuris non excusat</em></li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>2. La Constitució andorrana</h3>
                  <ul className="paper-outline">
                    <li>2.1. Andorra sota la lupa de Hart: La Constitució com a Regla de Reconeixement &quot;viva&quot;</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>IV. Marc teòric-jurídic de la Intel·ligència Artificial i principis rectors</h3>
                  <ul className="paper-outline">
                    <li>IV.1. IA estreta vs. IA generativa</li>
                    <li>IV.2. IA generativa i LLM</li>
                    <li>IV.3. Comparació i ús judicial</li>
                    <li>Estat de l&apos;art (anglès, castellà, català, Andorra)</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>V. Proof of Concept: Prudència.ad – IA per al dret clar andorrà</h3>
                  <ul className="paper-outline">
                    <li>V.1. Marc jurídic i plantejament conceptual</li>
                    <li>V.1.1. Base normativa i principis fundacionals</li>
                    <li>V.1.2. Valor afegit i focus andorrà (diferenciadors, abast, impacte social, sobirania tecnològica)</li>
                  </ul>
                </div>

                <div className="paper-section-card paper-section-card-highlight">
                  <h3>3. Arquitectura de garantia: El sistema &apos;Dret Planer&apos; ⭐</h3>
                  <ul className="paper-outline">
                    <li>3.1. Història del desenvolupament i passos seguits</li>
                    <li>3.2. Metodologia i Implementació (RAG, models, emmagatzematge, stack)</li>
                    <li>3.3. Corpus: Constitució i expansió</li>
                    <li>3.3. Sistema de validació (43 preguntes, criteris d&apos;avaluació)</li>
                    <li>3.5. Compliment normatiu (Llei 29/2021, AI Act)</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>VI. Conclusions</h3>
                  <ul className="paper-outline">
                    <li>Del text a la norma comprensible</li>
                    <li>Sobirania i seguretat jurídica</li>
                    <li>Impacte social: El dret a comprendre</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>Bibliografia (APA 7)</h3>
                  <ul className="paper-outline">
                    <li>Normativa (Constitució, Codi Civil, Llei 6/2024, Llei 29/2021, AI Act)</li>
                    <li>Doctrina citada al text (Carretero, Fuller, Hart, Serra, Vilajosana)</li>
                    <li>Doctrina i jurisprudència del corpus del projecte (REFERENCIES-APA7)</li>
                    <li>Referències tècniques (AINA, Groq/Llama 70B, RAG, LLM)</li>
                  </ul>
                  <p className="paper-biblio-note">
                    Les referències completes i el corpus del projecte es detallen al document i a{' '}
                    <code>docs/REFERENCIES-APA7.md</code>.
                  </p>
                  <Link href="/paper/document#bibliografia" className="paper-inline-link">
                    Anar a la bibliografia al document →
                  </Link>
                </div>
              </div>
            </section>

            <section className="legal-section paper-features">
              <h2>Característiques del paper</h2>
              <ul className="paper-features-list">
                <li><strong>Títol:</strong> El dret a la claredat constitucional</li>
                <li><strong>Focus:</strong> IA estreta, RAG, Dret Planer / Prudència.ad</li>
                <li><strong>Contribució:</strong> Història del desenvolupament, metodologia, validació (43 preguntes)</li>
                <li><strong>Marc:</strong> Llei 6/2024, Llei 29/2021, AI Act (risc limitat)</li>
                <li><strong>Generació:</strong> Llama 70B via Groq (Salamandra es va provar però no era viable)</li>
                <li><strong>Referències:</strong> APA 7; normativa, doctrina i corpus (REFERENCIES-APA7)</li>
                <li><strong>Punt clau:</strong> La IA ajuda a comprendre, NO substitueix l&apos;advocat</li>
              </ul>
            </section>

            <section className="legal-section paper-doc-cta">
              <Link
                href="/paper/document"
                className="paper-cta paper-cta-secondary"
                aria-label="Obrir el document complet del paper"
              >
                <FileText className="paper-cta-icon" size={20} aria-hidden />
                <span>Obrir el document complet del paper</span>
              </Link>
            </section>
          </article>
        </div>

        <style jsx>{`
          .paper-page {
            padding-top: 1.5rem;
          }
          .paper-hero {
            text-align: center;
            margin-bottom: 2.5rem;
            padding: 2rem 1.5rem;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 16px;
            border: 1px solid #e2e8f0;
          }
          .paper-hero-title {
            font-size: 2rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 0.75rem;
            letter-spacing: -0.02em;
          }
          .paper-hero-subtitle {
            font-size: 1.05rem;
            color: #475569;
            max-width: 640px;
            margin: 0 auto 1.5rem;
            line-height: 1.6;
          }
          .paper-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            padding: 0.85rem 1.75rem;
            font-weight: 600;
            font-size: 1rem;
            border-radius: 12px;
            text-decoration: none;
            transition: transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
            border: 2px solid transparent;
          }
          .paper-cta:focus-visible {
            outline: 2px solid #2563eb;
            outline-offset: 2px;
          }
          .paper-cta-primary {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: #fff;
            box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
          }
          .paper-cta-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.45);
          }
          .paper-cta-primary:active {
            transform: translateY(0);
          }
          .paper-cta-icon {
            flex-shrink: 0;
          }
          .paper-cta-secondary {
            background: #fff;
            color: #1e40af;
            border: 2px solid #2563eb;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
          }
          .paper-cta-secondary:hover {
            background: #eff6ff;
            border-color: #1d4ed8;
            color: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          }
          .paper-cta-secondary:active {
            transform: translateY(0);
          }
          .paper-structure {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          .paper-section-card {
            padding: 1.25rem 1.5rem;
            background: #fafbfc;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .paper-section-card:hover {
            border-color: #c7d2fe;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.06);
          }
          .paper-section-card-highlight {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border-color: #93c5fd;
          }
          .paper-section-card h3 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 0.75rem;
            line-height: 1.4;
          }
          .paper-outline {
            list-style: none;
            padding-left: 0;
            margin: 0;
            font-size: 0.95rem;
            color: #475569;
            line-height: 1.7;
          }
          .paper-outline li {
            padding-left: 1rem;
            position: relative;
          }
          .paper-outline li::before {
            content: '·';
            position: absolute;
            left: 0;
            color: #94a3b8;
            font-weight: bold;
          }
          .paper-biblio-note {
            margin: 0.75rem 0 0.5rem;
            font-size: 0.9rem;
            color: #64748b;
          }
          .paper-biblio-note code {
            background: #f1f5f9;
            padding: 0.15rem 0.4rem;
            border-radius: 4px;
            font-size: 0.85em;
          }
          .paper-inline-link {
            display: inline-block;
            margin-top: 0.5rem;
            font-size: 0.9rem;
            font-weight: 500;
            color: #2563eb;
            text-decoration: none;
          }
          .paper-inline-link:hover {
            text-decoration: underline;
          }
          .paper-features {
            border-top: 1px solid #e5e7eb;
            padding-top: 2rem;
          }
          .paper-features-list {
            list-style: none;
            padding-left: 0;
            margin: 0;
          }
          .paper-features-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #f1f5f9;
            font-size: 1rem;
            color: #334155;
          }
          .paper-features-list li:last-child {
            border-bottom: none;
          }
          .paper-doc-cta {
            text-align: center;
            padding-top: 2rem;
          }
          .paper-expandable-section {
            margin-bottom: 2rem;
          }
          .paper-expandable-heading {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
            margin: 0 0 1rem;
          }
          .paper-expandable-trigger {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.25rem;
            font-size: 1rem;
            font-weight: 600;
            color: #1e40af;
            background: #eff6ff;
            border: 2px solid #2563eb;
            border-radius: 10px;
            cursor: pointer;
            transition: background 0.2s, color 0.2s, border-color 0.2s;
          }
          .paper-expandable-trigger:hover {
            background: #dbeafe;
            color: #1d4ed8;
            border-color: #1d4ed8;
          }
          .paper-expandable-trigger:focus-visible {
            outline: 2px solid #2563eb;
            outline-offset: 2px;
          }
          .paper-expandable-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out;
          }
          .paper-expandable-content-open {
            max-height: 99999px;
          }
          .paper-expandable-article {
            margin-top: 1.5rem;
            background: #fff;
            border-radius: 16px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 4px 24px rgba(15, 23, 42, 0.08);
            overflow: hidden;
          }
          .paper-expandable-article .paper-doc-body {
            padding: 2.5rem 2.75rem 3rem;
            line-height: 1.8;
          }
          @media (max-width: 768px) {
            .paper-hero-title {
              font-size: 1.6rem;
            }
            .paper-hero-subtitle {
              font-size: 0.95rem;
            }
            .paper-expandable-article .paper-doc-body {
              padding: 1.5rem 1.25rem 2rem;
            }
          }
        `}</style>

        {/* Estils globals per al contingut del document (mateixos que /paper/document) */}
        <style jsx global>{`
          .paper-doc-body .paper-doc-cover {
            padding: 0 0 2rem;
            margin-bottom: 0.5rem;
            border-bottom: 2px solid #e2e8f0;
          }
          .paper-doc-body .paper-doc-cover .paper-doc-h1 {
            font-size: 2rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 1.25rem;
            line-height: 1.25;
            letter-spacing: -0.02em;
          }
          .paper-doc-body .paper-doc-lead {
            font-size: 1.1rem;
            color: #475569;
            font-style: italic;
            margin-bottom: 1rem;
          }
          .paper-doc-body .paper-doc-keywords {
            font-size: 0.95rem;
            color: #64748b;
            margin-bottom: 0;
          }
          .paper-doc-body .paper-doc-h1,
          .paper-doc-body .paper-doc-h2,
          .paper-doc-body .paper-doc-h3,
          .paper-doc-body .paper-doc-h4 {
            scroll-margin-top: 5rem;
          }
          .paper-doc-body .paper-doc-h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
            margin: 2.5rem 0 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e2e8f0;
          }
          .paper-doc-body .paper-doc-h2,
          .paper-doc-body .paper-doc-h3,
          .paper-doc-body .paper-doc-h4 {
            font-weight: 700;
          }
          .paper-doc-body .paper-doc-h3 {
            font-size: 1.2rem;
            color: #334155;
            margin: 1.75rem 0 0.65rem;
          }
          .paper-doc-body .paper-doc-h3 + .paper-doc-disclaimer {
            margin-top: 0.5rem;
          }
          .paper-doc-body .paper-doc-h4 {
            font-size: 1.05rem;
            color: #475569;
            margin: 1.35rem 0 0.5rem;
          }
          .paper-doc-body .paper-doc-p {
            font-size: 1.05rem;
            color: #334155;
            margin: 0 0 1.25rem;
          }
          .paper-doc-body .paper-doc-ul,
          .paper-doc-body .paper-doc-ol {
            margin: 0 0 1.25rem;
            padding-left: 1.5rem;
          }
          .paper-doc-body .paper-doc-li {
            margin-bottom: 0.4rem;
          }
          .paper-doc-body .paper-doc-strong {
            font-weight: 600;
            color: #1e293b;
          }
          .paper-doc-body .paper-doc-em {
            font-style: italic;
            color: #475569;
          }
          .paper-doc-body .paper-doc-blockquote {
            margin: 1.25rem 0;
            padding: 1rem 1.5rem;
            border-left: 4px solid #2563eb;
            background: #f8fafc;
            color: #475569;
            font-size: 1rem;
            border-radius: 0 8px 8px 0;
          }
          .paper-doc-body .paper-doc-disclaimer {
            border-left-color: #d97706;
            background: #fffbeb;
            color: #92400e;
          }
          .paper-doc-body .paper-doc-disclaimer .paper-doc-p {
            color: #92400e;
            margin-bottom: 0;
          }
          .paper-doc-body .paper-doc-hr {
            border: none;
            height: 2px;
            background: #cbd5e1;
            margin: 2.25rem 0;
          }
          .paper-doc-body .paper-doc-table-wrap {
            overflow-x: auto;
            margin: 1.25rem 0;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
          }
          .paper-doc-body .paper-doc-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
          }
          .paper-doc-body .paper-doc-thead {
            background: #e2e8f0;
          }
          .paper-doc-body .paper-doc-th {
            padding: 0.75rem 1rem;
            text-align: left;
            font-weight: 600;
            color: #1e293b;
            border-bottom: 2px solid #cbd5e1;
          }
          .paper-doc-body .paper-doc-tbody .paper-doc-tr:nth-child(even) {
            background: #f8fafc;
          }
          .paper-doc-body .paper-doc-td {
            padding: 0.65rem 1rem;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
          }
          .paper-doc-body a {
            color: #2563eb;
            text-decoration: underline;
          }
          .paper-doc-body a:hover {
            color: #1d4ed8;
          }
        `}</style>
      </Layout>
    </>
  );
};

export default PaperIndexPage;

export const getStaticProps: GetStaticProps<PaperIndexProps> = async () => {
  const filePath = path.join(process.cwd(), 'docs', 'PAPER-ACADEMIC-IA-ADAPTACIO-LLENGUATGE-NATURAL.md');
  let html = '<p class="paper-doc-p">El document no s\'ha pogut carregar.</p>';
  let toc: TocItem[] = [];
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const result = markdownToHtml(content);
    html = result.html;
    toc = result.toc;
  } catch {
    // keep defaults
  }
  return { props: { html, toc } };
};
