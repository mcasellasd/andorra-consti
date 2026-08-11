import type { EditorialFeedback } from '../../data/codis/types';

const STORAGE_KEY = 'dretplaner.editorial-feedback.v1';

export function getEditorialFeedback(): EditorialFeedback[] {
  if (typeof window === 'undefined') return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

/** El feedback és anònim i queda pendent de revisió; mai modifica el corpus. */
export function saveEditorialFeedback(feedback: EditorialFeedback): void {
  if (typeof window === 'undefined') return;
  const current = getEditorialFeedback();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, feedback]));
}
