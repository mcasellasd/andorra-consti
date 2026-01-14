'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { BookId } from '@/data/articles';
import { convertRAGIdToArticleId } from '@/data/articles';

type Role = 'user' | 'assistant';

interface ChatMessage {
  role: Role;
  content: string;
  sources?: Array<{
    id: string;
    topic: string;
    category: string;
    legalReference?: string;
    keyConcepts: string[];
    bookId: BookId;
    score: number;
  }>;
}

interface ApiResponse {
  answer?: string;
  sources?: ChatMessage['sources'];
  error?: string;
}

type OpenEventDetail = {
  bookId?: BookId;
  maximized?: boolean;
  question?: string;
  autoSubmit?: boolean;
  acceptPolicy?: boolean;
};

interface ChatWidgetProps {
  initiallyOpen?: boolean;
  className?: string;
}

const OPEN_EVENT_NAME = 'prudencia-chat-open';

declare global {
  interface Window {
    openPrudenciaChat?: (detail?: OpenEventDetail) => void;
  }
}

export default function ChatWidget({
  initiallyOpen = false,
  className
}: ChatWidgetProps) {
  const EMBED_REMINDER_ENABLED =
    process.env.NEXT_PUBLIC_SHOW_EMBED_REMINDER === 'true';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookScope, setBookScope] = useState<'ALL' | BookId>('ALL');
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showDeploymentReminder, setShowDeploymentReminder] = useState(
    EMBED_REMINDER_ENABLED
  );
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [shouldAutoSubmit, setShouldAutoSubmit] = useState(false);

  const windowClasses = useMemo(
    () =>
      `prudencia-chat-window${
        isMaximized ? ' prudencia-chat-window--maximized' : ''
      }`,
    [isMaximized]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.openPrudenciaChat = (detail?: OpenEventDetail) => {
      setIsOpen(true);
      if (detail?.bookId) {
        setBookScope(detail.bookId);
      } else {
        setBookScope('ALL');
      }
      if (detail?.maximized) {
        setIsMaximized(true);
      }
      if (detail?.acceptPolicy || detail?.autoSubmit) {
        setHasAcceptedPolicy(true);
      }
      if (detail?.question) {
        const trimmed = detail.question.trim();
        if (trimmed.length > 0) {
          setPendingQuestion(trimmed);
          setInput(trimmed);
          if (detail.autoSubmit) {
            setShouldAutoSubmit(true);
          }
        }
      }
    };

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<OpenEventDetail>).detail;
      window.openPrudenciaChat?.(detail);
    };

    window.addEventListener(OPEN_EVENT_NAME, handler);
    return () => {
      window.removeEventListener(OPEN_EVENT_NAME, handler);
      delete window.openPrudenciaChat;
    };
  }, [EMBED_REMINDER_ENABLED]);

  useEffect(() => {
    if (!EMBED_REMINDER_ENABLED || typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(
      'prudencia.chat.hideDeploymentReminder'
    );
    if (stored === 'true') {
      setShowDeploymentReminder(false);
    }
  }, []);

  const handleDismissReminder = () => {
    if (!EMBED_REMINDER_ENABLED) {
      return;
    }
    setShowDeploymentReminder(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'prudencia.chat.hideDeploymentReminder',
        'true'
      );
    }
  };

  const sendQuestion = useCallback(
    async (rawQuestion: string) => {
      const question = rawQuestion.trim();
      if (!question.length) {
        return;
      }

      if (!hasAcceptedPolicy) {
        setError(
          'Cal confirmar que has llegit la informació de privacitat abans d’enviar consultes.'
        );
        setInput(question);
        return;
      }

      setError(null);
      setInput('');
      setIsLoading(true);

      let messagesSnapshot: ChatMessage[] = [];
      setMessages((prev) => {
        messagesSnapshot = [...prev, { role: 'user', content: question }];
        return messagesSnapshot;
      });

      try {
        const response = await fetch('/api/rag/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: question,
            history: messagesSnapshot
              .slice(-6)
              .map(({ role, content }) => ({ role, content })),
            books: bookScope === 'ALL' ? undefined : [bookScope]
          })
        });

        const data = (await response.json()) as ApiResponse;

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Error desconegut del servei');
        }

        if (data.answer) {
          const answer = data.answer;
          setMessages((prev): ChatMessage[] => [
            ...prev,
            {
              role: 'assistant',
              content: answer,
              sources: data.sources
            }
          ]);
        }
      } catch (err: any) {
        const message = err?.message || 'No s’ha pogut obtenir resposta.';
        setError(message);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Ho sento, s’ha produït un error en generar la resposta. Torna-ho a intentar o revisa la configuració.',
            sources: undefined
          }
        ]);
      } finally {
        setIsLoading(false);
        setShouldAutoSubmit(false);
        setPendingQuestion(null);
      }
    },
    [bookScope, hasAcceptedPolicy]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendQuestion(input);
  };

  useEffect(() => {
    if (!isOpen || !shouldAutoSubmit || !pendingQuestion) {
      return;
    }
    void sendQuestion(pendingQuestion);
  }, [isOpen, shouldAutoSubmit, pendingQuestion, sendQuestion]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const storedConsent = window.localStorage.getItem(
      'prudencia.chat.consentAccepted'
    );
    if (storedConsent === 'true') {
      setHasAcceptedPolicy(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (hasAcceptedPolicy) {
      window.localStorage.setItem('prudencia.chat.consentAccepted', 'true');
    }
  }, [hasAcceptedPolicy]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`prudencia-chat-launcher ${className ?? ''}`}
        aria-label="Obre el xat del CCA"
      >
        <span className="prudencia-chat-launcher__icon">💬</span>
      </button>

      {isOpen && (
        <div className="prudencia-chat-overlay" role="dialog" aria-modal="true">
          <div
            className="prudencia-chat-backdrop"
            onClick={() => {
              setIsOpen(false);
              setIsMaximized(false);
              setPendingQuestion(null);
              setShouldAutoSubmit(false);
            }}
          />

          <div
            className={windowClasses}
          >
            <header className="prudencia-chat-header">
              <div className="prudencia-chat-header__title">
                <h2>
                  Assistent CCA
                </h2>
                <p>
                  Consulta els llibres I, II, III, V i VI o recupera jurisprudència vinculada.
                </p>
              </div>
              <div className="prudencia-chat-header__actions">
                <button
                  type="button"
                  onClick={() => setIsMaximized((value) => !value)}
                  className="prudencia-chat-header__button"
                  aria-label={isMaximized ? 'Restableix mida' : 'Maximitza finestra'}
                  title={isMaximized ? 'Restableix mida' : 'Maximitza finestra'}
                >
                  <span className="prudencia-chat-header__button-icon">
                    {isMaximized ? '⤓' : '⤢'}
                  </span>
                  <span className="prudencia-chat-header__button-text">
                    {isMaximized ? 'Restableix' : 'Maximitza'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMaximized(false);
                    setPendingQuestion(null);
                    setShouldAutoSubmit(false);
                  }}
                  className="prudencia-chat-header__button prudencia-chat-header__button--close"
                  aria-label="Tanca finestra"
                  title="Tanca finestra"
                >
                  <span className="prudencia-chat-header__close-icon">✕</span>
                </button>
              </div>
            </header>

            <section className="prudencia-chat-body">
              {showDeploymentReminder && (
                <div className="prudencia-chat-info">
                  <div className="prudencia-chat-info__text">
                    <p>
                      Abans de desplegar prod:
                      <code>npm run embed:llibre-primer</code>
                      <code>npm run embed:llibre-segon</code>
                      <code>npm run embed:llibre-tercer</code>
                      <code>npm run embed:llibre-sise</code>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="prudencia-chat-info__dismiss"
                    onClick={handleDismissReminder}
                  >
                    Entès, amaga-ho
                  </button>
                </div>
              )}

              <div className="prudencia-chat-warning">
                <p>
                  No introdueixis dades personals teves ni de tercers. El xat utilitza models d&apos;IA d&apos;OpenAI
                  i només té finalitat de recerca acadèmica. Consulta l&apos;{' '}
                  <a href="/disclaimer" target="_blank" rel="noreferrer">
                    avís legal i la política de privacitat
                  </a>{' '}
                  abans d&apos;enviar la teva pregunta.
                </p>
              </div>

              <div className="prudencia-chat-messages">
                {messages.length === 0 && (
                  <p className="prudencia-chat-empty">
                    Hola! Pregunta sobre el Codi Civil d'Andorra, procediment civil, jurisdicció
                    o altres aspectes del dret andorrà.
                  </p>
                )}

                {messages.map((message, index) => (
                  <article
                    key={index}
                    className={`prudencia-chat-message prudencia-chat-message--${message.role}`}
                  >
                    <header className="prudencia-chat-message__author">
                      {message.role === 'user' ? 'Usuari' : 'Assistent'}
                    </header>
                    <p className="prudencia-chat-message__content">
                      {message.content}
                    </p>
                    {message.sources && message.sources.length > 0 && (
                      <div className="prudencia-chat-sources">
                        <p>Fonts utilitzades:</p>
                        <ul>
                          {message.sources.map((source) => {
                            const articleId = convertRAGIdToArticleId(source.id, source.bookId);
                            const link = articleId ? `/article/${articleId}` : `#`;
                            return (
                              <li key={source.id}>
                                {articleId ? (
                                  <Link href={link}>
                                    <span>{source.id}</span> ·{' '}
                                    {source.topic}
                                    {source.legalReference
                                      ? ` · ${source.legalReference}`
                                      : ''}
                                  </Link>
                                ) : (
                                  <>
                                    <span>{source.id}</span> ·{' '}
                                    {source.topic}
                                    {source.legalReference
                                      ? ` · ${source.legalReference}`
                                      : ''}
                                  </>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="prudencia-chat-form">

                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Pregunta sobre el CCA o demana informació relacionada…"
                  className="prudencia-chat-textarea"
                />
                <div className="prudencia-chat-consent">
                  <label htmlFor="prudencia-chat-consent">
                    <input
                      id="prudencia-chat-consent"
                      type="checkbox"
                      checked={hasAcceptedPolicy}
                      onChange={(event) => setHasAcceptedPolicy(event.target.checked)}
                    />
                    <span>
                      Confirmo que he llegit la informació de privacitat i que no inclouré dades
                      personals ni confidencials en la meva consulta.
                    </span>
                  </label>
                </div>
                <div className="prudencia-chat-actions">
                  <button
                    type="submit"
                    className="prudencia-chat-submit"
                    disabled={isLoading || !hasAcceptedPolicy}
                  >
                    {isLoading ? 'Generant resposta…' : 'Enviar'}
                  </button>
                  {error && <p className="prudencia-chat-error">{error}</p>}
                </div>
              </form>
            </section>

            <footer className="prudencia-chat-footer">
              <p>
                La informació es genera amb IA i pot contenir errors. No constitueix assessorament legal.
              </p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

export function openChat(detail?: OpenEventDetail) {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.openPrudenciaChat === 'function') {
    window.openPrudenciaChat(detail);
    return;
  }
  window.dispatchEvent(
    new CustomEvent<OpenEventDetail>(OPEN_EVENT_NAME, { detail: detail ?? {} })
  );
}

