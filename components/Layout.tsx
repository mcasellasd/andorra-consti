import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Globe, Menu, X } from 'lucide-react';
import UnifiedChatbot from './UnifiedChatbot';
import { getIdiomaActual, setIdioma, t, idiomesDisponibles, nomsIdiomes, type Idioma } from '../lib/i18n';

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: '/', key: 'nav.inici' },
  { href: '/codis/constitucio', key: 'nav.constitucio' },
  { href: '/com-esta-fet', key: 'nav.dretPlaner' },
  { href: '/disclaimer', key: 'nav.privacitat' },
] as const;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [idioma, setIdiomaState] = useState<Idioma>('ca');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIdiomaState(getIdiomaActual());
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  useEffect(() => {
    if (!router.events) return;
    router.events.on('routeChangeComplete', closeMobileMenu);
    return () => router.events.off('routeChangeComplete', closeMobileMenu);
  }, [router.events, closeMobileMenu]);

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
          <div className="header-brand-row">
            <Link href="/" className="logo">
              dretplaner.ad
            </Link>
            <button
              type="button"
              className="header-menu-toggle"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? 'Tancar menú' : 'Obrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navegació desktop (amagada a mòbil) */}
          <nav className="nav nav-desktop" aria-label="Navegació principal">
            {navLinks.map(({ href, key }) => (
              <Link key={href} href={href}>{t(idioma, key)}</Link>
            ))}
          </nav>

          {/* Selector d'idioma destacat (amagat a mòbil quan menú obert) */}
          <div className="lang-selector-wrapper lang-selector-desktop">
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

        {/* Menú mòbil (panell desplegable) */}
        <div
          className={`header-mobile-menu ${mobileMenuOpen ? 'header-mobile-menu-open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="header-mobile-nav" aria-label="Navegació mòbil">
            {navLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="header-mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {t(idioma, key)}
              </Link>
            ))}
          </nav>
          <div className="header-mobile-lang">
            <span className="header-mobile-lang-label">{idioma === 'ca' ? 'Idioma' : idioma === 'es' ? 'Idioma' : 'Langue'}</span>
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

        {mobileMenuOpen && (
          <button
            type="button"
            className="header-mobile-overlay"
            onClick={closeMobileMenu}
            aria-label="Tancar menú"
          />
        )}
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer-mistral">
        {/* Pixel-art muntanyes (bandera d'Andorra) amb logo */}
        <div className="footer-mistral-pixel">
          <div className="footer-pixel-mountains" aria-hidden="true" />
          <Link href="/" className="footer-mistral-logo">dretplaner.ad</Link>
        </div>

        {/* Contingut del footer – fons cream */}
        <div className="footer-mistral-content">
          <nav className="footer-mistral-grid" aria-label="Enllaços del peu de pàgina">
            <div className="footer-mistral-col">
              <p className="footer-mistral-heading">{t(idioma, 'footer.navegacio')}</p>
              <Link href="/">{t(idioma, 'nav.inici')}</Link>
              <Link href="/codis/constitucio">{t(idioma, 'nav.constitucio')}</Link>
              <Link href="/com-esta-fet">{t(idioma, 'nav.dretPlaner')}</Link>
              <Link href="/paper">{t(idioma, 'nav.paper')}</Link>
              <Link href="/preguntes-control">{t(idioma, 'nav.preguntesControl')}</Link>
            </div>
            <div className="footer-mistral-col">
              <p className="footer-mistral-heading">{t(idioma, 'footer.informacio')}</p>
              <Link href="/disclaimer">{t(idioma, 'nav.privacitat')}</Link>
              <a href="mailto:contacte@dretplaner.ad">{t(idioma, 'footer.contacte')}</a>
            </div>
            <div className="footer-mistral-col">
              <p className="footer-mistral-heading">{t(idioma, 'footer.titol')}</p>
              <p className="footer-mistral-desc">{t(idioma, 'footer.descripcio')}</p>
            </div>
          </nav>

          <div className="footer-mistral-bottom">
            <span>© {new Date().getFullYear()} dretplaner.ad</span>
          </div>
        </div>
      </footer>
      <UnifiedChatbot />
    </>
  );
}

export default Layout;

