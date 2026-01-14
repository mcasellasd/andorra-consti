import React, { useState } from 'react';
import { preguntesControl, type PreguntaControl } from '@/data/preguntes-control';
import type { ResultatAvaluacio, InformeAvaluacio } from '@/lib/evaluacio/preguntes-control';

interface AnalisiAvaluacio {
  puntsFortes: string[];
  puntsFebles: string[];
  recomanacions: Array<{
    tipus: string;
    area: string;
    problema: string;
    recomanacio: string;
    prioritat: string;
  }>;
  milloresPromptChat: string[];
  milloresPromptInterpretacio: string[];
}

export default function PreguntesControlPage() {
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<ResultatAvaluacio | null>(null);
  const [informe, setInforme] = useState<InformeAvaluacio | null>(null);
  const [analisi, setAnalisi] = useState<AnalisiAvaluacio | null>(null);
  const [millores, setMillores] = useState<any>(null);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<string>('');
  const [executantTotes, setExecutantTotes] = useState(false);
  const [executantAprenentatge, setExecutantAprenentatge] = useState(false);

  const executarPregunta = async (preguntaId?: string) => {
    setLoading(true);
    setResultat(null);
    setInforme(null);
    setAnalisi(null);
    setMillores(null);

    try {
      const response = await fetch('/api/preguntes-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preguntaId: preguntaId || undefined,
          executarTotes: executantTotes && !preguntaId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error executant preguntes');
      }

      const data = await response.json();

      if (data.resultat) {
        setResultat(data.resultat);
      } else if (data.informe) {
        setInforme(data.informe);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const executarAprenentatge = async () => {
    setExecutantAprenentatge(true);
    setResultat(null);
    setInforme(null);
    setAnalisi(null);
    setMillores(null);

    try {
      const response = await fetch('/api/aprenentatge-executar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          executarTotes: true,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error executant aprenentatge');
      }

      const data = await response.json();

      if (data.informe) {
        setInforme(data.informe);
      }
      if (data.analisi) {
        setAnalisi(data.analisi);
      }
      if (data.millores) {
        setMillores(data.millores);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setExecutantAprenentatge(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1>Preguntes de Control - Avaluació del Sistema</h1>
      <p>
        Aquest sistema permet avaluar si Prudència està ben entrenat executant
        preguntes de control amb respostes esperades.
      </p>

      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h2>Executar Avaluació</h2>
        
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>🚀 Aprenentatge i Millora del Sistema</h3>
          <p style={{ marginBottom: '1rem' }}>
            Executa totes les preguntes de control, analitza els resultats i genera recomanacions 
            per millorar el xat i la interpretació. Aquest procés pot trigar uns minuts.
          </p>
          <button
            onClick={executarAprenentatge}
            disabled={executantAprenentatge || loading}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: executantAprenentatge ? 'not-allowed' : 'pointer',
              opacity: executantAprenentatge ? 0.6 : 1,
              fontWeight: 'bold',
            }}
          >
            {executantAprenentatge ? 'Executant i Analitzant...' : '🚀 Executar Aprenentatge i Millora'}
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={executantTotes}
              onChange={(e) => setExecutantTotes(e.target.checked)}
            />
            {' '}Executar totes les preguntes (pot trigar uns minuts)
          </label>
        </div>

        {!executantTotes && (
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Seleccionar pregunta:
              <select
                value={preguntaSeleccionada}
                onChange={(e) => setPreguntaSeleccionada(e.target.value)}
                style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
              >
                <option value="">-- Seleccionar --</option>
                {preguntesControl.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.pregunta} ({p.categoria}, {p.dificultat})
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        <button
          onClick={() => executarPregunta(executantTotes ? undefined : preguntaSeleccionada || undefined)}
          disabled={loading || (!executantTotes && !preguntaSeleccionada)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#0f3d3e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Executant...' : executantTotes ? 'Executar Totes les Preguntes' : 'Executar Pregunta'}
        </button>
      </div>

      {(loading || executantAprenentatge) && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>{executantAprenentatge ? 'Executant aprenentatge i millora del sistema...' : 'Executant preguntes de control...'}</p>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Això pot trigar uns minuts si s&apos;executen totes les preguntes.
          </p>
        </div>
      )}

      {resultat && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h2>Resultat de l&apos;Avaluació</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Pregunta:</strong> {resultat.pregunta}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <strong>Score Global:</strong>
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: resultat.valid ? '#28a745' : '#dc3545',
                }}
              >
                {resultat.scoreGlobal.toFixed(1)}/100
              </span>
              {resultat.valid ? '✅' : '❌'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <strong>Articles:</strong>
              <br />
              {resultat.articlesCorrectes?.length || 0}/{resultat.articlesEsperats.length} trobats
              <br />
              <small>Score: {resultat.scoreArticles.toFixed(1)}/100</small>
            </div>
            <div>
              <strong>Paraules Clau:</strong>
              <br />
              {resultat.paraulesClauTrobades.length}/{resultat.paraulesClauEsperades.length} trobades
              <br />
              <small>Score: {resultat.scoreParaulesClau.toFixed(1)}/100</small>
            </div>
            <div>
              <strong>Paraules Prohibides:</strong>
              <br />
              {resultat.paraulesProhibidesTrobades.length} trobades
              <br />
              <small>Score: {resultat.scoreParaulesProhibides.toFixed(1)}/100</small>
            </div>
          </div>

          {resultat.warnings.length > 0 && (
            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
              <strong>⚠️ Advertències:</strong>
              <ul style={{ marginTop: '0.5rem' }}>
                {resultat.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {resultat.errors.length > 0 && (
            <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '4px' }}>
              <strong>❌ Errors:</strong>
              <ul style={{ marginTop: '0.5rem' }}>
                {resultat.errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <strong>Resposta del sistema:</strong>
            <div style={{ marginTop: '0.5rem', padding: '1rem', backgroundColor: 'white', borderRadius: '4px' }}>
              {resultat.resposta}
            </div>
          </div>

          {resultat.fonts.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <strong>Fonts utilitzades:</strong>
              <ul style={{ marginTop: '0.5rem' }}>
                {resultat.fonts.map((f, i) => (
                  <li key={i}>
                    {f.id} - {f.title} {f.score !== undefined && `(score: ${f.score.toFixed(2)})`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {informe && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h2>Informe d&apos;Avaluació Completa</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
              <div>
                <strong>Total preguntes:</strong> {informe.totalPreguntes}
              </div>
              <div>
                <strong>✅ Vàlides:</strong> {informe.preguntesValides} (
                {((informe.preguntesValides / informe.totalPreguntes) * 100).toFixed(1)}%)
              </div>
              <div>
                <strong>❌ Invàlides:</strong> {informe.preguntesInvalides}
              </div>
              <div>
                <strong>📈 Score mitjà:</strong> {informe.scoreMitja.toFixed(1)}/100
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h3>Per Categoria</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#ddd' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Categoria</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Total</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Vàlides</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Score Mitjà</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(informe.perCategoria).map((cat) => {
                  const data = informe.perCategoria[cat];
                  return (
                    <tr key={cat}>
                      <td style={{ padding: '0.5rem' }}>{cat}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'center' }}>{data.total}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'center' }}>{data.valides}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'center' }}>{data.scoreMitja.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h3>Per Dificultat</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#ddd' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Dificultat</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Total</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Vàlides</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Score Mitjà</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(informe.perDificultat).map((dif) => {
                  const data = informe.perDificultat[dif];
                  return (
                    <tr key={dif}>
                      <td style={{ padding: '0.5rem' }}>{dif}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'center' }}>{data.total}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'center' }}>{data.valides}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'center' }}>{data.scoreMitja.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Detall per Pregunta</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {informe.resultats.map((r) => (
                <div
                  key={r.preguntaId}
                  style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    backgroundColor: r.valid ? '#d4edda' : '#f8d7da',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {r.pregunta} {r.valid ? '✅' : '❌'}
                  </div>
                  <div style={{ fontSize: '0.875rem' }}>
                    Score: {r.scoreGlobal.toFixed(1)}/100 | Articles: {r.articlesCorrectes?.length || 0}/
                    {r.articlesEsperats.length} | Paraules clau: {r.paraulesClauTrobades.length}/
                    {r.paraulesClauEsperades.length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {analisi && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '2px solid #22c55e' }}>
          <h2>📊 Anàlisi i Recomanacions</h2>
          
          {analisi.puntsFortes.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h3>✅ Punts Forts</h3>
              <ul>
                {analisi.puntsFortes.map((punt, i) => (
                  <li key={i}>{punt}</li>
                ))}
              </ul>
            </div>
          )}

          {analisi.puntsFebles.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h3>⚠️ Punts Febles</h3>
              <ul>
                {analisi.puntsFebles.map((punt, i) => (
                  <li key={i}>{punt}</li>
                ))}
              </ul>
            </div>
          )}

          {analisi.recomanacions.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h3>💡 Recomanacions de Millora</h3>
              {analisi.recomanacions.map((rec, i) => (
                <div key={i} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <strong>{rec.tipus.toUpperCase()} - {rec.area.toUpperCase()}</strong>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      backgroundColor: rec.prioritat === 'alta' ? '#fee2e2' : rec.prioritat === 'mitjana' ? '#fef3c7' : '#dbeafe',
                      color: rec.prioritat === 'alta' ? '#991b1b' : rec.prioritat === 'mitjana' ? '#92400e' : '#1e40af'
                    }}>
                      {rec.prioritat.toUpperCase()}
                    </span>
                  </div>
                  <p><strong>Problema:</strong> {rec.problema}</p>
                  <p><strong>Recomanació:</strong> {rec.recomanacio}</p>
                </div>
              ))}
            </div>
          )}

          {millores && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '4px' }}>
              <h3>🔧 Millores de Prompts Generades</h3>
              {millores.promptChatMillorat && (
                <div style={{ marginTop: '1rem' }}>
                  <h4>Prompt Chat Millorat:</h4>
                  <pre style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
                    {millores.promptChatMillorat}
                  </pre>
                </div>
              )}
              {millores.promptInterpretacioMillorat && (
                <div style={{ marginTop: '1rem' }}>
                  <h4>Prompt Interpretació Millorat:</h4>
                  <pre style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
                    {millores.promptInterpretacioMillorat}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h2>Informació</h2>
        <p>
          Aquest sistema avalua el rendiment de Prudència executant preguntes de control amb
          criteris objectius:
        </p>
        <ul>
          <li>
            <strong>Articles trobats:</strong> Verifica si el sistema troba els articles correctes
            de la Constitució (40% del score)
          </li>
          <li>
            <strong>Paraules clau:</strong> Verifica si la resposta conté les paraules clau esperades
            (40% del score)
          </li>
          <li>
            <strong>Paraules prohibides:</strong> Penalitza si apareixen paraules que no haurien
            d&apos;aparèixer (20% del score)
          </li>
        </ul>
        <p>
          Una pregunta es considera <strong>vàlida</strong> si el score global és ≥ 70 i no hi ha
          errors crítics.
        </p>
      </div>
    </div>
  );
}
