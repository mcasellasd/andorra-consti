export interface KnowledgeEntry {
  id: string;
  category: string;
  topic: string;
  content: string;
  keyConcepts: string[];
  legalReference?: string;
  implications?: string;
  section?: string;
  methodology?: string;
  hierarchicalOrder?: string;
  distinction?: string;
  corollaries?: string;
  enforcement?: string;
  applicationFields?: string[];
  practicalUse?: string;
  rationale?: string;
  proceduralConsequence?: string;
  evidenceRequirement?: string;
  commonErrors?: string;
  practicalImplication?: string;
  judicialDuty?: string;
  historicalContext?: string;
  bookId?: string;
  numeracio?: string;
}

export interface EmbeddingEntry {
  id: string;
  topic: string;
  category: string;
  embedding: number[];
  text?: string;
  bookId?: string;
}

export interface RetrievedContext {
  entry: KnowledgeEntry;
  score: number;
  bookId: string;
}

