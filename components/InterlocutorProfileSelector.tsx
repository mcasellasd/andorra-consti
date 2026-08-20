'use client';

import { useEffect, useState } from 'react';
import type { Idioma } from '../lib/i18n';
import {
  DEFAULT_INTERLOCUTOR_PROFILE,
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
      const parsed = JSON.parse(stored) as Partial<InterlocutorProfile>;
      if (
        (parsed.legalLevel === 'planer' || parsed.legalLevel === 'general' || parsed.legalLevel === 'professional') &&
        (parsed.context === 'ciutadania' || parsed.context === 'estudi' || parsed.context === 'consulta' || parsed.context === 'professional') &&
        (parsed.objective === 'entendre' || parsed.objective === 'preparar-consulta' || parsed.objective === 'aprofundir')
      ) {
        setProfile(parsed as InterlocutorProfile);
      }
    } catch {
      // El perfil per defecte és suficient si el navegador bloqueja l'emmagatzematge.
    }
  }, []);

  const updateProfile = (next: InterlocutorProfile) => {
    setProfile(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // La selecció continua activa durant la sessió.
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

  if (compact) {
    const presets = [
      { id: 'planer', label: idioma === 'ca' ? 'Llenguatge planer' : idioma === 'es' ? 'Lenguaje sencillo' : 'Langage simple', profile: { legalLevel: 'planer', context: 'ciutadania', objective: 'entendre' } as InterlocutorProfile },
      { id: 'resident', label: idioma === 'ca' ? 'Resident / ciutadà' : idioma === 'es' ? 'Residente / ciudadano' : 'Résident / citoyen', profile: { legalLevel: 'general', context: 'ciutadania', objective: 'preparar-consulta' } as InterlocutorProfile },
      { id: 'no-resident', label: idioma === 'ca' ? 'No-resident' : idioma === 'es' ? 'No residente' : 'Non-résident', profile: { legalLevel: 'planer', context: 'consulta', objective: 'entendre' } as InterlocutorProfile },
    ];
    const activePreset = presets.find((preset) => preset.profile.legalLevel === profile.legalLevel && preset.profile.context === profile.context && preset.profile.objective === profile.objective)?.id;

    return (
      <div className="interlocutor-profile-presets" aria-label={copy.title}>
        {presets.map((preset) => (
          <button key={preset.id} type="button" className={`interlocutor-profile-preset${activePreset === preset.id ? ' interlocutor-profile-preset--active' : ''}`} onClick={() => onChange(preset.profile)} aria-pressed={activePreset === preset.id}>
            {preset.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <details className={`interlocutor-profile${compact ? ' interlocutor-profile-compact' : ''}`}>
      <summary>{copy.title}</summary>
      <div className="interlocutor-profile-body">
        <p className="interlocutor-profile-help">{copy.help}</p>
        <div className="interlocutor-profile-grid">
          <label>
            <span>{copy.level}</span>
            <select
              value={profile.legalLevel}
              onChange={(event) => onChange({ ...profile, legalLevel: event.target.value as InterlocutorProfile['legalLevel'] })}
            >
              <option value="planer">{copy.levels.planer}</option>
              <option value="general">{copy.levels.general}</option>
              <option value="professional">{copy.levels.professional}</option>
            </select>
          </label>
          <label>
            <span>{copy.context}</span>
            <select
              value={profile.context}
              onChange={(event) => onChange({ ...profile, context: event.target.value as InterlocutorProfile['context'] })}
            >
              <option value="ciutadania">{copy.contexts.ciutadania}</option>
              <option value="estudi">{copy.contexts.estudi}</option>
              <option value="consulta">{copy.contexts.consulta}</option>
              <option value="professional">{copy.contexts.professional}</option>
            </select>
          </label>
          <label>
            <span>{copy.objective}</span>
            <select
              value={profile.objective}
              onChange={(event) => onChange({ ...profile, objective: event.target.value as InterlocutorProfile['objective'] })}
            >
              <option value="entendre">{copy.objectives.entendre}</option>
              <option value="preparar-consulta">{copy.objectives['preparar-consulta']}</option>
              <option value="aprofundir">{copy.objectives.aprofundir}</option>
            </select>
          </label>
        </div>
        <button type="button" className="interlocutor-profile-reset" onClick={onReset}>
          {copy.reset}
        </button>
      </div>
    </details>
  );
}
