import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="index-container">
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#666' }}>
            Pàgina no trobada
          </h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            La pàgina que busqueu no existeix o ha estat moguda.
          </p>
          <Link 
            href="/" 
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: '#0066cc',
              color: '#fff',
              borderRadius: '6px',
              fontWeight: '500',
              transition: 'background 0.2s'
            }}
          >
            Tornar a l'inici
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

