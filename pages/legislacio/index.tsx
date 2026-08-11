import Head from 'next/head';
import Layout from '../../components/Layout';
import { KnowledgeCatalog } from '../../components/knowledge/KnowledgeCatalog';
import { legislacioKnowledge } from '../../data/knowledge/legal';

export default function LegislacioPage() {
  return <>
    <Head><title>Legislació d’Andorra | dretplaner.ad</title><meta name="description" content="Catàleg de legislació andorrana amb fonts identificades." /></Head>
    <Layout><KnowledgeCatalog title="Legislació d’Andorra" description="Consulta normes i reglaments amb l’enllaç de la font documental. Les explicacions editorials es completaran amb revisió humana." documents={legislacioKnowledge} basePath="/legislacio" emptyLabel="No hi ha normes disponibles." /></Layout>
  </>;
}
