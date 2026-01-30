import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Globe } from 'lucide-react';
import UnifiedChatbot from './UnifiedChatbot';
import { getIdiomaActual, setIdioma, t, idiomesDisponibles, nomsIdiomes, type Idioma } from '../lib/i18n';

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
            dretplaner.ad
          </Link>
          <nav className="nav">
            <Link href="/">{t(idioma, 'nav.inici')}</Link>
            <Link href="/codis/constitucio">{t(idioma, 'nav.constitucio')}</Link>
            <Link href="/preguntes-control">{t(idioma, 'nav.preguntesControl')}</Link>
            <Link href="/paper">{t(idioma, 'nav.paper')}</Link>
            <Link href="/com-esta-fet">{t(idioma, 'nav.comEstaFet')}</Link>
          </nav>
          
          {/* Selector d'idioma destacat */}
          <div className="lang-selector-wrapper">
            <div className="lang-selector" role="group" aria-label="Seleccionar idioma">
              <Globe className="lang-icon" size={18} aria-hidden="true" />
              {idiomesDisponibles.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleIdiomaChange(lang)}
                  className={`lang-button ${idioma === lang ? 'active' : ''}`}
                  aria-label={`Canviar a ${nomsIdiomes[lang]}`}
                  aria-pressed={idioma === lang}
                >
                  <span className="lang-code">{lang.toUpperCase()}</span>
                  <span className="lang-name">{nomsIdiomes[lang]}</span>
                </button>
              ))}
            </div>
          </div>
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
              <a href="mailto:contacte@dretplaner.ad">contacte@dretplaner.ad</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} dretplaner.ad · Tots els drets reservats.</span>
        </div>
      </footer>
      <UnifiedChatbot />
    </>
  );
}

export default Layout;

