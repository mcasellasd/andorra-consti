import { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function AdminLoginPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    setLoading(false);
    if (response.ok) await router.replace('/preguntes-control');
    else setError('Credencial no vàlida o administració no configurada.');
  }

  return (
    <>
      <Head><title>Accés administratiu · dretplaner.ad</title></Head>
      <Layout>
        <main style={{ maxWidth: 480, margin: '4rem auto', padding: '2rem' }}>
          <h1>Accés administratiu</h1>
          <form onSubmit={submit}>
            <label htmlFor="admin-token">Credencial</label>
            <input
              id="admin-token"
              type="password"
              autoComplete="current-password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              required
              style={{ display: 'block', width: '100%', padding: '0.75rem', margin: '0.5rem 0 1rem' }}
            />
            <button type="submit" disabled={loading}>{loading ? 'Comprovant…' : 'Entrar'}</button>
            {error && <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>}
          </form>
        </main>
      </Layout>
    </>
  );
}
