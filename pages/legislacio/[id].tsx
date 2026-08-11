import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getLegislacioKnowledge } from '../../data/knowledge/legal';

export async function getServerSideProps({ params }: { params: { id: string } }) {
  return { props: { document: getLegislacioKnowledge(params.id) || null } };
}

export default function NormaPage({ document }: { document: ReturnType<typeof getLegislacioKnowledge> }) {
  if (!document) return <Layout><div className="knowledge-detail-shell"><h1>Norma no trobada</h1><Link href="/legislacio">Torna al catàleg</Link></div></Layout>;
  return <>
    <Head><title>{document.title} | dretplaner.ad</title></Head>
    <Layout><main className="knowledge-detail-shell">
      <Link href="/legislacio" className="knowledge-detail-back">← Legislació</Link>
      <p className="constitution-index-kicker">Font legislativa</p>
      <h1>{document.title}</h1>
      <div className="knowledge-detail-status">Pendent de revisió editorial · Versió {document.version}</div>
      <section className="knowledge-detail-card"><h2>Font identificada</h2><p>{document.sourceReference}{document.publicationYear ? ` · ${document.publicationYear}` : ''}</p><a href={document.officialUrl} target="_blank" rel="noopener noreferrer">Obrir la font documental →</a></section>
      <section className="knowledge-detail-card"><h2>Explicació editorial</h2><p>Aquesta norma està incorporada al catàleg de fonts, però encara no té una fitxa editorial supervisada. No s’hi mostra cap interpretació generada automàticament.</p></section>
    </main></Layout>
  </>;
}
