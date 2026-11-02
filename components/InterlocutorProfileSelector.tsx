'use client';

import { useEffect, useState } from 'react';
import type { Idioma } from '../lib/i18n';
import {
  DEFAULT_INTERLOCUTOR_PROFILE,
  getResponseStyleId,
  isInterlocutorProfile,
  normalizeResponseStyleProfile,
  RESPONSE_STYLE_PROFILES,
  type InterlocutorProfile,
} from '../lib/interlocutor-profile';

const STORAGE_KEY = 'dretplaner.interlocutor.profile.v1';

const COPY = {
  ca: {
    title: "Com vols que t'ho expliqui?",
    help: 'Pots canviar-ho sempre. Només s’aplica al llenguatge i a la profunditat de l’explicació.',
    level: 'Nivell jurídic',
    context: 'Context',
    objective: 'Objectiu',
    reset: 'Restablir',
    levels: { planer: 'Llenguatge planer', general: 'Nivell general', professional: 'Nivell professional' },
    contexts: { ciutadania: 'Ciutadania o residència', estudi: 'Estudi', consulta: 'Consulta personal', professional: 'Ús professional' },
    objectives: { entendre: 'Entendre el dret', 'preparar-consulta': 'Preparar una consulta', aprofundir: 'Aprofundir i argumentar' },
  },
  es: {
    title: '¿Cómo quieres que te lo explique?',
    help: 'Puedes cambiarlo en cualquier momento. Solo afecta al lenguaje y a la profundidad de la explicación.',
    level: 'Nivel jurídico',
    context: 'Contexto',
    objective: 'Objetivo',
    reset: 'Restablecer',
    levels: { planer: 'Lenguaje sencillo', general: 'Nivel general', professional: 'Nivel profesional' },
    contexts: { ciutadania: 'Ciudadanía o residencia', estudi: 'Estudio', consulta: 'Consulta personal', professional: 'Uso profesional' },
    objectives: { entendre: 'Entender el derecho', 'preparar-consulta': 'Preparar una consulta', aprofundir: 'Profundizar y argumentar' },
  },
  fr: {
    title: 'Comment souhaitez-vous que je vous l’explique ?',
    help: 'Vous pouvez le modifier à tout moment. Cela concerne uniquement le langage et la profondeur de l’explication.',
    level: 'Niveau juridique',
    context: 'Contexte',
    objective: 'Objectif',
    reset: 'Réinitialiser',
    levels: { planer: 'Langage simple', general: 'Niveau général', professional: 'Niveau professionnel' },
    contexts: { ciutadania: 'Citoyenneté ou résidence', estudi: 'Études', consulta: 'Consultation personnelle', professional: 'Usage professionnel' },
    objectives: { entendre: 'Comprendre le droit', 'preparar-consulta': 'Préparer une consultation', aprofundir: 'Approfondir et argumenter' },
  },
} as const;

export function useInterlocutorProfile() {
  const [profile, setProfile] = useState<InterlocutorProfile>(DEFAULT_INTERLOCUTOR_PROFILE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as unknown;
      if (isInterlocutorProfile(parsed)) {
        const normalized = normalizeResponseStyleProfile(parsed);
        setProfile(normalized);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      }
    } catch {
      // El perfil per defecte és suficient si el navegador bloqueja l'emmagatzematge.
    }
  }, []);

  useEffect(() => {
    const handleProfileChange = (event: Event) => {
      const nextProfile = (event as CustomEvent<unknown>).detail;
      if (isInterlocutorProfile(nextProfile)) setProfile(nextProfile);
    };
    window.addEventListener('dretplaner:interlocutor-profile-changed', handleProfileChange);
    return () => window.removeEventListener('dretplaner:interlocutor-profile-changed', handleProfileChange);
  }, []);

  const updateProfile = (next: InterlocutorProfile) => {
    setProfile(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // La selecció continua activa durant la sessió.
    }
    window.dispatchEvent(new CustomEvent('dretplaner:interlocutor-profile-changed', { detail: next }));
  };

  const resetProfile = () => {
    updateProfile(DEFAULT_INTERLOCUTOR_PROFILE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // No-op.
    }
  };

  return { profile, updateProfile, resetProfile };
}

interface InterlocutorProfileSelectorProps {
  idioma: Idioma;
  profile: InterlocutorProfile;
  onChange: (profile: InterlocutorProfile) => void;
  onReset: () => void;
  compact?: boolean;
}

export function InterlocutorProfileSelector({
  idioma,
  profile,
  onChange,
  onReset,
  compact = false,
}: InterlocutorProfileSelectorProps) {
  const copy = COPY[idioma];
  const presets = [
    {
      id: 'clear' as const,
      label: idioma === 'ca' ? 'Breu i planera' : idioma === 'es' ? 'Breve y sencilla' : 'Bref et simple',
      description: idioma === 'ca' ? 'La idea principal, amb paraules quotidianes.' : idioma === 'es' ? 'La idea principal, con palabras cotidianas.' : 'L’idée principale, avec des mots du quotidien.',
      profile: RESPONSE_STYLE_PROFILES.clear,
    },
    {
      id: 'step-by-step' as const,
      label: idioma === 'ca' ? 'Pas a pas' : idioma === 'es' ? 'Paso a paso' : 'Étape par étape',
      description: idioma === 'ca' ? 'Una explicació ordenada, amb context quan ajuda.' : idioma === 'es' ? 'Una explicación ordenada, con contexto cuando ayuda.' : 'Une explication ordonnée, avec du contexte si nécessaire.',
      profile: RESPONSE_STYLE_PROFILES['step-by-step'],
    },
    {
      id: 'legal-detail' as const,
      label: idioma === 'ca' ? 'Més detall jurídic' : idioma === 'es' ? 'Más detalle jurídico' : 'Plus de détails juridiques',
      description: idioma === 'ca' ? 'Més conceptes i referències disponibles.' : idioma === 'es' ? 'Más conceptos y referencias disponibles.' : 'Davantage de notions et de références disponibles.',
      profile: RESPONSE_STYLE_PROFILES['legal-detail'],
    },
  ];
  const activePreset = getResponseStyleId(profile);

  return (
    <div className={`interlocutor-profile-presets${compact ? ' interlocutor-profile-presets-compact' : ' interlocutor-profile-presets-chat'}`} role="group" aria-label={copy.title}>
      {!compact && (
        <>
          <p className="interlocutor-profile-title">{copy.title}</p>
          <p className="interlocutor-profile-help">{copy.help}</p>
        </>
      )}
      {presets.map((preset) => (
        <button
          key={preset.id}
          type="button"
          className={`interlocutor-profile-preset${activePreset === preset.id ? ' interlocutor-profile-preset--active' : ''}`}
          onClick={() => onChange(preset.profile)}
          aria-pressed={activePreset === preset.id}
        >
          <strong>{preset.label}</strong>
          {!compact && <small>{preset.description}</small>}
        </button>
      ))}
      {!compact && <button type="button" className="interlocutor-profile-reset" onClick={onReset}>{copy.reset}</button>}
    </div>
  );
}
}