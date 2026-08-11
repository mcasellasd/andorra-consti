import { legislacioAndorrana } from '../legislacio-andorrana';
import { jurisprudenciaDatabase } from '../jurisprudencia-andorra';
import { articlesConstitucio } from '../codis/constitucio/articles-template';
import type { LegalKnowledgeDocument } from '../codis/types';

const articleIds = new Set(articlesConstitucio.map((article) => article.id));

export const legislacioKnowledge: LegalKnowledgeDocument[] = legislacioAndorrana.map((norma) => ({
  id: norma.id,
  type: 'legislation',
  title: norma.nom,
  officialUrl: norma.url,
  sourceReference: norma.url.includes('bopa.ad') ? 'BOPA' : 'Font documental del catàleg legislatiu del projecte',
  publicationYear: norma.any,
  subtype: norma.tipus,
  relatedIds: [],
  editorialStatus: 'pendent',
  version: '1.0.0',
  updatedAt: norma.any ? `${norma.any}-01-01` : '2026-08-11',
}));

export const jurisprudenciaKnowledge: LegalKnowledgeDocument[] = jurisprudenciaDatabase.map((sentencia) => ({
  id: sentencia.id,
  type: 'jurisprudence',
  title: sentencia.titol || `Sentència ${sentencia.numero}`,
  officialUrl: sentencia.text_complet_url,
  sourceReference: `${sentencia.tribunal}, ${sentencia.numero}`,
  tribunal: sentencia.tribunal,
  caseNumber: sentencia.numero,
  date: sentencia.data,
  summary: sentencia.resum,
  relatedIds: sentencia.articles_afectats.filter((id) => articleIds.has(id)),
  editorialStatus: 'pendent',
  version: '1.0.0',
  updatedAt: '2026-08-11',
}));

export function getLegislacioKnowledge(id: string): LegalKnowledgeDocument | undefined {
  return legislacioKnowledge.find((document) => document.id === id);
}

export function getJurisprudenciaKnowledge(id: string): LegalKnowledgeDocument | undefined {
  return jurisprudenciaKnowledge.find((document) => document.id === id);
}

export function auditarLegalKnowledge() {
  return {
    legislacio: {
      total: legislacioKnowledge.length,
      ambFont: legislacioKnowledge.filter((document) => Boolean(document.officialUrl && document.sourceReference)).length,
      pendentsEditorials: legislacioKnowledge.filter((document) => document.editorialStatus === 'pendent').length,
    },
    jurisprudencia: {
      total: jurisprudenciaKnowledge.length,
      ambFont: jurisprudenciaKnowledge.filter((document) => Boolean(document.sourceReference && document.caseNumber)).length,
      ambArticlesValids: jurisprudenciaKnowledge.filter((document) => document.relatedIds.length > 0).length,
      senseArticlesValids: jurisprudenciaKnowledge.filter((document) => document.relatedIds.length === 0).map((document) => document.id),
      pendentsEditorials: jurisprudenciaKnowledge.filter((document) => document.editorialStatus === 'pendent').length,
    },
  };
}
