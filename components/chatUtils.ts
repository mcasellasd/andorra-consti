/**
 * Utilitat per obrir el chatbot unificat des de qualsevol lloc de l'aplicació
 */

// import type { BookId } from '@/data/articles'; // REMOVED

export interface OpenChatOptions {
  question?: string;
  codeScope?: 'constitucio';
  autoSubmit?: boolean;
  // Paràmetres de compatibilitat amb l'API antiga
  // bookId?: BookId; // REMOVED
  maximized?: boolean; // Ignorat, el chatbot sempre s'obre en modal
}

/**
 * Obre el chatbot unificat amb una pregunta opcional
 */
export function openChat(options: OpenChatOptions = {}) {
  if (typeof window === 'undefined') return;

  const event = new CustomEvent('openUnifiedChat', {
    detail: {
      question: options.question || '',
      codeScope: options.codeScope ?? 'constitucio',
      autoSubmit: options.autoSubmit || false
    }
  });

  window.dispatchEvent(event);
}
