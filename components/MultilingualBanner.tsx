import React from 'react';
import { Globe, CheckCircle } from 'lucide-react';
import { type Idioma, getIdiomaActual, setIdioma, t, idiomesDisponibles, nomsIdiomes } from '../lib/i18n';

export function MultilingualBanner() {
  const [idioma, setIdiomaState] = React.useState<Idioma>('ca');

  React.useEffect(() => {
    setIdiomaState(getIdiomaActual());
    
    const handleIdiomaChange = () => {
      setIdiomaState(getIdiomaActual());
    };
    
    window.addEventListener('idiomaChanged', handleIdiomaChange);
    return () => window.removeEventListener('idiomaChanged', handleIdiomaChange);
  }, []);

  const handleIdiomaChange = (nouIdioma: Idioma) => {
    setIdioma(nouIdioma);
    setIdiomaState(nouIdioma);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('idiomaChanged', { detail: nouIdioma }));
    }
  };

  const textos = {
    ca: {
      titol: 'Entén la Constitució en tres idiomes',
      subtitol: 'Tots els articles disponibles en català, castellà i francès',
      descripcio: 'Canvia d\'idioma en qualsevol moment per entendre la Constitució d\'Andorra en la teva llengua preferida.',
    },
    es: {
      titol: 'Entiende la Constitución en tres idiomas',
      subtitol: 'Todos los artículos disponibles en catalán, castellano y francés',
      descripcio: 'Cambia de idioma en cualquier momento para entender la Constitución de Andorra en tu idioma preferido.',
    },
    fr: {
      titol: 'Comprendre la Constitution en trois langues',
      subtitol: 'Tous les articles disponibles en catalan, espagnol et français',
      descripcio: 'Changez de langue à tout moment pour comprendre la Constitution d\'Andorre dans votre langue préférée.',
    },
  };

  const textosActuals = textos[idioma];

  return (
    <section className="multilingual-banner" aria-labelledby="multilingual-banner-title">
      <span className="multilingual-banner-sparkle" aria-hidden="true">✦</span>
      <div className="multilingual-banner-content">
        <div className="multilingual-banner-icon">
          <Globe size={32} strokeWidth={1.5} />
        </div>
        <div className="multilingual-banner-text">
          <h2 id="multilingual-banner-title" className="multilingual-banner-title">{textosActuals.titol}</h2>
          <p className="multilingual-banner-subtitle">{textosActuals.subtitol}</p>
          <p className="multilingual-banner-description">{textosActuals.descripcio}</p>
        </div>
        <div className="multilingual-banner-selector">
          {idiomesDisponibles.map((lang) => (
            <button
              key={lang}
              onClick={() => handleIdiomaChange(lang)}
              className={`multilingual-banner-button ${idioma === lang ? 'active' : ''}`}
              aria-label={`Canviar a ${nomsIdiomes[lang]}`}
              aria-pressed={idioma === lang}
            >
              <span className="multilingual-banner-code">{lang.toUpperCase()}</span>
              <span className="multilingual-banner-name">{nomsIdiomes[lang]}</span>
              {idioma === lang && <CheckCircle size={16} className="multilingual-banner-check" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
