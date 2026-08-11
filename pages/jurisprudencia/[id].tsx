import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getJurisprudenciaKnowledge } from '../../data/knowledge/legal';

export async function getServerSideProps({ params }: { params: { id: string } }) {
  return { props: { document: getJurisprudenciaKnowledge(params.id) || null } };
}

export default function ResolucioPage({ document }: { document: ReturnType<typeof getJurisprudenciaKnowledge> }) {
  if (!document) return <Layout><div className="knowledge-detail-shell"><h1>Resolució no trobada</h1><Link href="/jurisprudencia">Torna al corpus</Link></div></Layout>;
  return <>
    <Head><title>{document.title} | dretplaner.ad</title></Head>
    <Layout><main className="knowledge-detail-shell">
      <Link href="/jurisprudencia" className="knowledge-detail-back">← Jurisprudència</Link>
      <p className="constitution-index-kicker">Font jurisprudencial</p>
      <h1>{document.title}</h1>
      <div className="knowledge-detail-status">Pendent de revisió editorial · {document.sourceReference}</div>
      <section className="knowledge-detail-card"><h2>Resum de la font</h2><p className="knowledge-detail-longtext">{document.summary || 'No hi ha resum disponible.'}</p>{document.officialUrl && <a href={document.officialUrl} target="_blank" rel="noopener noreferrer">Obrir la resolució →</a>}</section>
      <section className="knowledge-detail-card"><h2>Articles relacionats</h2>{document.relatedIds.length ? <ul>{document.relatedIds.map((id) => <li key={id}><Link href={`/codis/constitucio/article/${id}`}>{id}</Link></li>)}</ul> : <p>No hi ha articles constitucionals vàlids relacionats en el registre.</p>}</section>
      <section className="knowledge-detail-card"><h2>Nota editorial</h2><p>Aquest registre identifica una resolució del corpus. La seva explicació editorial específica queda pendent de revisió humana i no és una resposta generada per IA.</p></section>
    </main></Layout>
  </>;
}
