'use client';

import { useEffect, useState } from 'react';
import type { Idioma } from '../lib/i18n';
import {
  DEFAULT_INTERLOCUTOR_PROFILE,
  isInterlocutorProfile,
  getResponseStyleId,
  normalizeResponseStyleProfile,
  RESPONSE_STYLE_PROFILES,
  type InterlocutorProfile,
} from '../lib/interlocutor-profile';

const STORAGE_KEY = 'dretplaner.interlocutor.profile.v1';

const COPY = {
  ca: {
    title: "Com vols que t'ho expliqui?",
    help: 'Tria l’estil de resposta. El text constitucional i les fonts no canvien.',
    reset: 'Restablir',
  },
  es: {
    title: '¿Cómo quieres que te lo explique?',
    help: 'Elige el estilo de respuesta. El texto constitucional y las fuentes no cambian.',
    reset: 'Restablecer',
  },
  fr: {
    title: 'Comment souhaitez-vous que je vous l’explique ?',
    help: 'Choisissez le style de réponse. Le texte constitutionnel et les sources ne changent pas.',
    reset: 'Réinitialiser',
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
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dretplaner:interlocutor-profile-changed', { detail: next }));
    }
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
      id: 'clear',
      label: idioma === 'ca' ? 'Breu i planera' : idioma === 'es' ? 'Breve y sencilla' : 'Bref et simple',
      description: idioma === 'ca' ? 'La idea principal, amb paraules quotidianes.' : idioma === 'es' ? 'La idea principal, con palabras cotidianas.' : 'L’idée principale, avec des mots du quotidien.',
      profile: RESPONSE_STYLE_PROFILES.clear,
    },
    {
      id: 'step-by-step',
      label: idioma === 'ca' ? 'Pas a pas' : idioma === 'es' ? 'Paso a paso' : 'Étape par étape',
      description: idioma === 'ca' ? 'Una explicació ordenada, amb context quan ajuda.' : idioma === 'es' ? 'Una explicación ordenada, con contexto cuando ayuda.' : 'Une explication ordonnée, avec du contexte si nécessaire.',
      profile: RESPONSE_STYLE_PROFILES['step-by-step'],
    },
    {
      id: 'legal-detail',
      label: idioma === 'ca' ? 'Més detall jurídic' : idioma === 'es' ? 'Más detalle jurídico' : 'Plus de détails juridiques',
      description: idioma === 'ca' ? 'Més conceptes i referències disponibles.' : idioma === 'es' ? 'Más conceptos y referencias disponibles.' : 'Davantage de notions et de références disponibles.',
      profile: RESPONSE_STYLE_PROFILES['legal-detail'],
    },
  ];
  const activePreset = getResponseStyleId(profile);

  return (
    <div className={`interlocutor-profile-presets${compact ? ' interlocutor-profile-presets-compact' : ' interlocutor-profile-presets-chat'}`} role="group" aria-label={copy.title}>
      {!compact && <p className="interlocutor-profile-help">{copy.help}</p>}
      {presets.map((preset) => (
        <button key={preset.id} type="button" className={`interlocutor-profile-preset${activePreset === preset.id ? ' interlocutor-profile-preset--active' : ''}`} onClick={() => onChange(preset.profile)} aria-pressed={activePreset === preset.id}>
          <strong>{preset.label}</strong>
          {!compact && <small>{preset.description}</small>}
        </button>
      ))}
      {!compact && <button type="button" className="interlocutor-profile-reset" onClick={onReset}>{copy.reset}</button>}
    </div>
  );
}
