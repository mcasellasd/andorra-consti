import type { LearningProgress } from '../../data/codis/types';

const STORAGE_KEY = 'dretplaner.learning-progress.v1';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readAll(): Record<string, LearningProgress> {
  if (!isBrowser()) return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeAll(progress: Record<string, LearningProgress>): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getLearningProgress(articleId: string): LearningProgress {
  return readAll()[articleId] || {
    articleId,
    completedSteps: [],
    answeredQuestions: [],
    lastVisitedAt: new Date().toISOString(),
    completed: false,
  };
}

export function saveLearningProgress(progress: LearningProgress): void {
  writeAll({ ...readAll(), [progress.articleId]: progress });
}

export function updateLearningProgress(
  articleId: string,
  update: Partial<Pick<LearningProgress, 'completedSteps' | 'answeredQuestions' | 'completed'>>
): LearningProgress {
  const current = getLearningProgress(articleId);
  const next = { ...current, ...update, lastVisitedAt: new Date().toISOString() };
  saveLearningProgress(next);
  return next;
}

export function clearLearningProgress(articleId: string): void {
  const all = readAll();
  delete all[articleId];
  writeAll(all);
}
