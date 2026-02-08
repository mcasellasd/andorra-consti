import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { markdownToHtml, type TocItem } from '@/lib/markdown-to-html';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

interface PaperDocumentProps {
  html: string;
  toc: TocItem[];
}

const PaperPage: React.FC<PaperDocumentProps> = ({ html, toc }) => {
  return (
    <>
      <Head>
        <title>Paper Acadèmic · El dret a la claredat constitucional · dretplaner.ad</title>
        <meta
          name="description"
          content="Paper acadèmic: El dret a la claredat constitucional. IA i adequació tecnològica com a garanties de la cohesió jurídica a Andorra."
        />
      </Head>
      <Layout>
        <div className="page-container paper-doc-page">
          <aside className="paper-doc-sidebar" aria-label="Taula de continguts">
            <nav className="paper-doc-nav">
              <h2 className="paper-doc-nav-title">Contingut</h2>
              <ul className="paper-doc-nav-list">
                {toc.map((item) => (
                  <li key={item.id} className={`paper-doc-nav-item paper-doc-nav-item-h${item.level}`}>
                    <a href={`#${item.id}`} className="paper-doc-nav-link">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <article className="paper-doc-main legal-card">
            <div className="paper-doc-body" dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </div>

        <style jsx>{`
          .paper-doc-page {
            display: flex;
            gap: 2rem;
            padding-top: 0;
            max-width: 1200px;
            margin: 0 auto;
          }
          .paper-doc-sidebar {
            flex-shrink: 0;
            width: 220px;
            position: fixed;
            left: max(1.5rem, calc(50vw - 600px));
            top: 8rem;
            max-height: calc(100vh - 8.5rem);
            overflow-y: auto;
            z-index: 100;
          }
          .paper-doc-nav-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin: 0 0 0.75rem;
          }
          .paper-doc-nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .paper-doc-nav-item {
            margin-bottom: 0.35rem;
          }
          .paper-doc-nav-item-h2 {
            padding-left: 0;
          }
          .paper-doc-nav-item-h3 {
            padding-left: 0.75rem;
          }
          .paper-doc-nav-item-h4 {
            padding-left: 1.25rem;
          }
          .paper-doc-nav-link {
            font-size: 0.9rem;
            color: #475569;
            text-decoration: none;
            display: block;
            padding: 0.25rem 0;
            border-left: 2px solid transparent;
            padding-left: 0.5rem;
            margin-left: -0.5rem;
          }
          .paper-doc-nav-link:hover {
            color: #2563eb;
            border-left-color: #93c5fd;
          }
          .paper-doc-main {
            flex: 1;
            min-width: 0;
            margin-left: 242px;
            padding: 2rem 2.5rem 3rem;
          }
          .paper-doc-body {
            line-height: 1.8;
          }
          @media (max-width: 900px) {
            .paper-doc-page {
              flex-direction: column;
            }
            .paper-doc-sidebar {
              width: 100%;
              position: static;
              left: auto;
              max-height: none;
            }
            .paper-doc-main {
              margin-left: 0;
              padding: 1.5rem 1.25rem 2rem;
            }
          }
        `}</style>

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

export default PaperPage;

export const getStaticProps: GetStaticProps<PaperDocumentProps> = async () => {
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
