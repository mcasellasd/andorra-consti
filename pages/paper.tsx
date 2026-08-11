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
        <title>Paper Acadèmic · La claredat constitucional com a tecnologia de planificació social · dretplaner.ad</title>
        <meta
          name="description"
          content="Índex de l'estructura del paper acadèmic: La claredat constitucional com a tecnologia de planificació social. IA consultiva i dret a comprendre a Andorra."
        />
      </Head>
      <Layout>
        <div className="page-container paper-page">
          {/* Hero */}
          <div className="paper-hero">
            <h1 className="paper-hero-title">Paper Acadèmic</h1>
            <p className="paper-hero-subtitle">
              La claredat constitucional com a tecnologia de planificació social: Intel·ligència Artificial consultiva i dret a comprendre al Principat d'Andorra
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
                  <h3>Capítol I: Introducció — El Dret a la Claredat Constitucional en l&apos;Era de la IA</h3>
                  <ul className="paper-outline">
                    <li>1. Delimitació filosòfica i la instrumentalitat teleològica del dret</li>
                    <li>2. El dret a comprendre com a requisit de legitimitat i dignitat</li>
                    <li>3. El cas d&apos;Andorra: Tensió sociolingüística i vulnerabilitat cognitiva</li>
                    <li>4. La Intel·ligència Artificial com a &apos;Rampa Cognitiva&apos; i el risc d&apos;Incapacitació Digital</li>
                    <li>5. Formalització de la recerca: Preguntes i Hipòtesis</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>Capítol II: El dret a comprendre en l&apos;estat social i democràtic de dret</h3>
                  <ul className="paper-outline">
                    <li>1. Fonamentació teòrica i dogmàtica: De l&apos;opacitat a la claredat jurídica</li>
                    <li>2. El marc iberoamericà i l&apos;emergència de la &quot;justícia cognitiva&quot;</li>
                    <li>3. L&apos;arquitectura del dret a comprendre al Principat d&apos;Andorra</li>
                    <li>4. Cohesió social i llengua oficial: El català clar com a rampa cognitiva</li>
                    <li>5. El model de &quot;Doble Document&quot; i la mediació algorítmica supervisada</li>
                    <li>6. Conclusions: Cap a una Dogmàtica de la Transparència Algorítmica</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>Capítol III: La Regla de Reconeixement, l&apos;Agència Compartida i la Realitat Sociolingüística d&apos;Andorra</h3>
                  <ul className="paper-outline">
                    <li>1. Fonaments de l&apos;Ordenament: La Regla de Reconeixement i la Coordinació Social</li>
                    <li>2. La &quot;Planning Theory of Law&quot;: El Dret Andorrà com a Tecnologia Social</li>
                    <li>3. Acceptació Interna i Compromís Conjunt en una Societat Plural</li>
                    <li>4. Capes de Vulnerabilitat Cognitiva i el Deure Actiu de l&apos;Estat</li>
                    <li>5. Realitat Sociolingüística Polièdrica i el Prototip de RAG Trilingüe</li>
                    <li>6. Conclusions: Cap a una Dogmàtica de la Transparència Algorítmica</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>Capítol IV: El Marc Teòric-Jurídic de la Intel·ligència Artificial i els Principis de Governança Pública a Andorra</h3>
                  <ul className="paper-outline">
                    <li>1. Fonamentació Conceptual: La Dicotomia entre la IA Estreta i la IA Generativa</li>
                    <li>2. L&apos;Arquitectura RAG com a Dret Planer Tecnològic i &quot;Responsible AI by Design&quot;</li>
                    <li>3. Gestió de la Incertesa i Pluralisme Doctrinal: El Silenci Estratègic</li>
                    <li>4. El Principi de Supervisió Humana Universal i la No-Substitució</li>
                    <li>5. Sobirania Digital, Privadesa i Encaix Normatiu al Principat</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>Capítol V: Disseny de l&apos;Arquitectura RAG, Governança de Dades i Teoria de la Planificació</h3>
                  <ul className="paper-outline">
                    <li>1. El Laboratori Empíric: Visió General de l&apos;Stack Tècnic de &quot;Dret Planer&quot;</li>
                    <li>2. L&apos;Arquitectura RAG com a Homologia de la Teoria de la Planificació de Shapiro</li>
                    <li>3. Governança de Dades i Guardrails Temporals: La Persistència del Pla</li>
                    <li>4. El RAG vs. &quot;Rules as Code&quot;: Textura Oberta i &quot;Phronesis&quot; Humana</li>
                    <li>5. Seguretat, Sobirania de Dades i el Projecte AINA</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>Capítol VI: L&apos;instrument d&apos;avaluació: disseny, diagnòstic i construcció</h3>
                  <ul className="paper-outline">
                    <li>1. Què s&apos;ha de mesurar</li>
                    <li>2. Disseny comparatiu i congelació de la configuració</li>
                    <li>3. Diagnòstic: per què el primer intent no mesurava</li>
                    <li>4. L&apos;instrument construït (Delimitació, afirmacions verificables, rúbriques, reserva d&apos;abstenció)</li>
                    <li>5. Mètriques (Recuperació, fidelitat i citacions, abstenció i seguretat, llengua i comprensibilitat)</li>
                    <li>6-9. Mancances, protocol de repetició, amenaces a la validesa i ordre de les fases</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>Capítol VII: Conclusions, límits i treball futur</h3>
                  <ul className="paper-outline">
                    <li>1-3. Resposta a la pregunta de recerca, estat de les hipòtesis, diagnòstic d&apos;interpretabilitat</li>
                    <li>4-6. L&apos;instrument construït, resultats sense consulta, troballa constitucional col·lateral</li>
                    <li>7-8. Marc teòric revisat, sobirania declarada i arquitectura real</li>
                    <li>9-10. Full de ruta i límits de l&apos;estudi</li>
                  </ul>
                </div>

                <div className="paper-section-card">
                  <h3>Bibliografia de la Tesi — Dret Planer (v2)</h3>
                  <ul className="paper-outline">
                    <li>1. Enquadrament Estratègic i Metodològic de la v2</li>
                    <li>2. Bloc I: Normativa i Legislació (Andorra i Unió Europea)</li>
                    <li>3. Bloc II: Jurisprudència i Informes Institucionals</li>
                    <li>4. Bloc III: Doctrina Científica i Literatura Acadèmica</li>
                    <li>5. Bloc IV: Recursos Tècnics i d&apos;Intel·ligència Artificial</li>
                  </ul>
                  <p className="paper-biblio-note">
                    Les referències completes de la compilació v2 es detallen al document complet.
                  </p>
                  <Link href="/paper/document#bibliografia-de-la-tesi-dret-planer-v2" className="paper-inline-link">
                    Anar a la bibliografia al document →
                  </Link>
                </div>
              </div>
            </section>

            <section className="legal-section paper-features">
              <h2>Característiques del paper</h2>
              <ul className="paper-features-list">
                <li><strong>Títol:</strong> La claredat constitucional com a tecnologia de planificació social: Intel·ligència Artificial consultiva i dret a comprendre al Principat d&apos;Andorra</li>
                <li><strong>Focus:</strong> IA estreta/consultiva, RAG (Parent-Document Retrieval), Dret Planer</li>
                <li><strong>Contribució:</strong> Marc teòric, disseny, governança i validació empírica de l&apos;IA com a rampa cognitiva</li>
                <li><strong>Marc:</strong> Llei 6/2024 (llengua pròpia), Llei 29/2021 (LQPD), AI Act de la UE, Codi d&apos;Ètica de l&apos;IA</li>
                <li><strong>Stack tècnic:</strong> Next.js, FastAPI, Llama 3.3/70B sobre Groq, embeddings d&apos;AINA</li>
                <li><strong>Punt clau:</strong> El dret a comprendre com a requisit de legitimitat i dignitat, sota supervisió humana</li>
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
