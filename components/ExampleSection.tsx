import React, { useState, useEffect, useRef } from 'react';

interface ExampleSectionProps {
  articleNumber: string;
  articleTitle: string;
  articleContent: string;
}

// Memòria global per guardar els exemples generats per article
const examplesCache = new Map<string, string>();

const ExampleSection: React.FC<ExampleSectionProps> = ({
  articleNumber,
  articleTitle,
  articleContent,
}) => {
  const [example, setExample] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const previousArticleNumber = useRef<string | null>(null);

  // Netejar l'exemple quan canvia l'article i carregar el guardat si existeix
  useEffect(() => {
    // Si canvia l'article, netejar l'estat local
    if (previousArticleNumber.current !== null && previousArticleNumber.current !== articleNumber) {
      setExample(null);
      setError(null);
      setLoading(false);
      setIsOpen(false);
    }

    // Carregar l'exemple guardat si existeix per aquest article
    const cachedExample = examplesCache.get(articleNumber);
    if (cachedExample) {
      setExample(cachedExample);
    }

    previousArticleNumber.current = articleNumber;
  }, [articleNumber]);

  const generateExample = async () => {
    setLoading(true);
    setError(null);
    setIsOpen(true);

    try {
      const response = await fetch('/api/generate-example', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleNumber,
          articleTitle,
          articleContent,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error generant l\'exemple');
      }

      const data = await response.json();
      // Guardar l'exemple a la memòria
      examplesCache.set(articleNumber, data.example);
      setExample(data.example);
    } catch (err: any) {
      setError(err.message || 'Error generant l\'exemple');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sempre mostrar un botó: "Generar exemple" o "Regenerar exemple"
  const buttonText = example ? 'Regenerar exemple' : 'Generar exemple';

  return (
    <details className="article-example" open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
      <summary className="example-toggle">
        <div className="article-panel-header">
          <strong>EXEMPLE APLICAT</strong>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Si ja hi ha un exemple, netejar-lo abans de regenerar
              if (example) {
                setExample(null);
                examplesCache.delete(articleNumber);
              }
              generateExample();
            }}
            className="article-panel-cta article-panel-cta--example"
            disabled={loading}
          >
            {loading ? 'Generant...' : buttonText}
          </button>
          <span className="article-panel-icon example-icon">{isOpen ? '−' : '+'}</span>
        </div>
      </summary>
      <div className="example-content">
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ display: 'inline-block' }}>⏳ Generant exemple...</div>
          </div>
        )}
        {error && (
          <div className="example-error">
            <strong>Error:</strong> {error}
            {error.includes('no configurada') && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px', fontSize: '0.9rem' }}>
                <strong>⚠️ Configuració necessària:</strong>
                <p style={{ margin: '0.5rem 0 0 0' }}>
                  Per utilitzar aquesta funcionalitat, cal configurar la clau API d'OpenAI a Vercel:
                </p>
                <ol style={{ margin: '0.5rem 0 0 1.5rem', padding: 0 }}>
                  <li>Vés a <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">Vercel Dashboard</a></li>
                  <li>Selecciona el projecte</li>
                  <li>Vés a <strong>Settings</strong> → <strong>Environment Variables</strong></li>
                  <li>Afegeix <code>OPENAI_API_KEY</code> amb la teva clau API</li>
                  <li>Redeploya l'aplicació</li>
                </ol>
              </div>
            )}
            <button 
              onClick={generateExample}
              className="retry-button"
              style={{ marginTop: '1rem' }}
            >
              Tornar a intentar
            </button>
          </div>
        )}
        {example && (
          <div className="example-text">
            {example.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
        {!example && !loading && !error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            Fes clic a "Generar exemple" per veure un exemple pràctic d'aplicació d'aquest article.
          </div>
        )}
      </div>
    </details>
  );
};

export default ExampleSection;

