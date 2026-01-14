import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UnifiedChatbot from './UnifiedChatbot';
import { getIdiomaActual, setIdioma, t, idiomesDisponibles, type Idioma } from '../lib/i18n';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [idioma, setIdiomaState] = useState<Idioma>('ca');

  useEffect(() => {
    setIdiomaState(getIdiomaActual());
  }, []);

  const handleIdiomaChange = (nouIdioma: Idioma) => {
    setIdioma(nouIdioma);
    setIdiomaState(nouIdioma);

    // Disparar event personalitzat per notificar canvis d'idioma
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('idiomaChanged', { detail: nouIdioma }));
    }

    // TODO: Actualitzar URL amb prefix d'idioma si s'implementa routing per idiomes
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            prudencia.ad
          </Link>
          <nav className="nav">
            <Link href="/">{t(idioma, 'nav.inici')}</Link>
            <Link href="/codis/constitucio">{t(idioma, 'nav.constitucio')}</Link>
            <Link href="/preguntes-control">{t(idioma, 'nav.preguntesControl')}</Link>
            <Link href="/paper">{t(idioma, 'nav.paper')}</Link>
            <Link href="/com-esta-fet">{t(idioma, 'nav.comEstaFet')}</Link>
            <Link href="/about">{t(idioma, 'nav.about')}</Link>
            <div className="lang-selector">
              {idiomesDisponibles.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleIdiomaChange(lang)}
                  className={idioma === lang ? 'active' : ''}
                  aria-label={`Canviar a ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <p className="footer-title">{t(idioma, 'footer.titol')}</p>
            <p className="footer-text">
              {t(idioma, 'footer.descripcio')}
              {' '}
              Portal d&apos;accessibilitat jurídica assistida per IA per al Principat d&apos;Andorra.
              Projecte acadèmic per a tesi doctoral a la Universitat d&apos;Andorra.
            </p>
          </div>

          <div className="footer-col">
            <p className="footer-label">{t(idioma, 'footer.avis')}</p>
            <p className="footer-text">
              {t(idioma, 'footer.avisText')}
            </p>
            <p className="footer-text">
              {t(idioma, 'footer.contacte')}:{' '}
              <a href="mailto:contacte@prudencia.ad">contacte@prudencia.ad</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} prudencia.ad · Tots els drets reservats.</span>
        </div>
      </footer>
      <UnifiedChatbot />
    </>
  );
}

export default Layout;

