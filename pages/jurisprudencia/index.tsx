import Head from 'next/head';
import Layout from '../../components/Layout';
import { KnowledgeCatalog } from '../../components/knowledge/KnowledgeCatalog';
import { jurisprudenciaKnowledge } from '../../data/knowledge/legal';

export default function JurisprudenciaPage() {
  return <>
    <Head><title>Jurisprudència d’Andorra | dretplaner.ad</title><meta name="description" content="Corpus estructurat de jurisprudència andorrana amb referències i articles relacionats." /></Head>
    <Layout><KnowledgeCatalog title="Jurisprudència d’Andorra" description="Consulta resolucions estructurades del corpus jurisprudencial. El resum de la font no substitueix la lectura de la resolució ni l’assessorament jurídic." documents={jurisprudenciaKnowledge} basePath="/jurisprudencia" emptyLabel="No hi ha resolucions disponibles." /></Layout>
  </>;
}
