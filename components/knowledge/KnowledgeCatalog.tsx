import Link from 'next/link';
import type { LegalKnowledgeDocument } from '../../data/codis/types';

interface KnowledgeCatalogProps {
  title: string;
  description: string;
  documents: LegalKnowledgeDocument[];
  basePath: string;
  emptyLabel: string;
}

export function KnowledgeCatalog({ title, description, documents, basePath, emptyLabel }: KnowledgeCatalogProps) {
  return (
    <div className="knowledge-catalog-shell">
      <header className="knowledge-catalog-hero">
        <p className="constitution-index-kicker">Dret Planer · Corpus verificable</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="knowledge-catalog-stats">
          <span>{documents.length} registres</span>
          <span>Fonts identificades</span>
          <span>Editorial pendent de revisió</span>
        </div>
      </header>

      {documents.length === 0 ? <div className="constitution-empty"><p>{emptyLabel}</p></div> : (
        <div className="knowledge-catalog-grid">
          {documents.map((document) => (
            <article key={document.id} className="knowledge-catalog-card">
              <div className="knowledge-catalog-card__meta">
                <span>{document.subtype || document.tribunal || 'Font jurídica'}</span>
                {document.publicationYear && <span>{document.publicationYear}</span>}
                {document.date && <span>{document.date}</span>}
              </div>
              <h2><Link href={`${basePath}/${encodeURIComponent(document.id)}`}>{document.title}</Link></h2>
              <p className="knowledge-catalog-reference">{document.sourceReference}</p>
              {document.summary && <p className="knowledge-catalog-summary">{document.summary.replace(/\s+/g, ' ').slice(0, 220)}{document.summary.length > 220 ? '…' : ''}</p>}
              <div className="knowledge-catalog-card__footer">
                <span className={`knowledge-status knowledge-status--${document.editorialStatus}`}>Pendent de revisió editorial</span>
                <Link href={`${basePath}/${encodeURIComponent(document.id)}`}>Veure fitxa →</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
