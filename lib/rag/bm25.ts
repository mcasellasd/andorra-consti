
/**
 * Simple BM25 implementation for hybrid search.
 * Optimized for small in-memory corpus (<10,000 documents).
 * 
 * BM25 Score = IDF * ((k1 + 1) * tf) / (k1 * (1 - b + b * (docLen / avgDocLen)) + tf)
 */

interface BM25Params {
    k1: number; // Term saturation parameter (default 1.2)
    b: number;  // Length normalization parameter (default 0.75)
}

interface DocIndex {
    id: string;
    length: number; // Number of tokens in doc
    termFreqs: Map<string, number>; // Term frequencies in doc
}

export class BM25 {
    private documents: DocIndex[] = [];
    private avgDocLen: number = 0;
    private corpusSize: number = 0;
    private idfMap: Map<string, number> = new Map();
    private params: BM25Params;

    constructor(params: BM25Params = { k1: 1.2, b: 0.75 }) {
        this.params = params;
    }

    /**
     * Tokenize text into terms.
     * Simple tokenizer: lowercase, strip punctuation, split by whitespace.
     * Could be improved with stemming/lemmatization if needed.
     */
    private tokenize(text: string): string[] {
        return text.toLowerCase()
            .replace(/[^\w\sàèìòùáéíóúïüçñ]/g, ' ') // Maintain Catalan/Spanish chars
            .split(/\s+/)
            .filter(t => t.length > 2); // Filter very short words
    }

    /**
     * Build the index from a list of documents.
     * Check corpus.ts for document structure.
     */
    public buildIndex(docs: Array<{ id: string; content: string; topic?: string }>) {
        this.documents = [];
        let totalLength = 0;
        const docFreqs: Map<string, number> = new Map(); // Document frequency for each term

        // Process each document
        docs.forEach(doc => {
            const text = `${doc.topic || ''} ${doc.content}`;
            const tokens = this.tokenize(text);
            const termFreqs = new Map<string, number>();

            tokens.forEach(token => {
                termFreqs.set(token, (termFreqs.get(token) || 0) + 1);
            });

            // Update global document frequency stats (count doc once per term)
            termFreqs.forEach((_, term) => {
                docFreqs.set(term, (docFreqs.get(term) || 0) + 1);
            });

            this.documents.push({
                id: doc.id,
                length: tokens.length,
                termFreqs
            });

            totalLength += tokens.length;
        });

        this.corpusSize = this.documents.length;
        this.avgDocLen = this.corpusSize > 0 ? totalLength / this.corpusSize : 0;

        // Calculate IDF for all terms
        this.idfMap.clear();
        docFreqs.forEach((df, term) => {
            // IDF formula: log( (N - n + 0.5) / (n + 0.5) + 1 )
            const idf = Math.log((this.corpusSize - df + 0.5) / (df + 0.5) + 1);
            this.idfMap.set(term, Math.max(idf, 0)); // Ensure non-negative
        });
    }

    /**
     * Search matching documents
     */
    public search(query: string, topK: number = 10): Array<{ id: string; score: number }> {
        const tokens = this.tokenize(query);
        if (tokens.length === 0) return [];

        const scores = new Map<string, number>();

        // For each query term
        tokens.forEach(term => {
            const idf = this.idfMap.get(term);
            if (!idf) return; // Term not in corpus

            // Score each document containing the term
            this.documents.forEach(doc => {
                const tf = doc.termFreqs.get(term) || 0;
                if (tf === 0) return;

                // BM25 formula component
                const num = tf * (this.params.k1 + 1);
                const den = tf + this.params.k1 * (1 - this.params.b + this.params.b * (doc.length / this.avgDocLen));
                const score = idf * (num / den);

                scores.set(doc.id, (scores.get(doc.id) || 0) + score);
            });
        });

        // Convert to array and sort
        return Array.from(scores.entries())
            .map(([id, score]) => ({ id, score }))
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);
    }
}
