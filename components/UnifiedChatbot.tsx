'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getIdiomaActual, type Idioma } from '../lib/i18n';

type Source = {
  type: 'constitucio' | 'doctrina';
  code: 'constitucio' | 'doctrina';
  id: string;
  title: string;
  number?: string;
  score?: number;
  content?: string;
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

interface UnifiedChatbotProps {
  initiallyOpen?: boolean;
  className?: string;
}

export default function UnifiedChatbot({
  initiallyOpen = false,
  className = ''
}: UnifiedChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isMaximized, setIsMaximized] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [idioma, setIdioma] = useState<Idioma>('ca');
  const [ragDocuments, setRagDocuments] = useState<Array<{ id: string; name: string; description: string; count: number }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincronitzar idioma amb el selector del lloc (canvi d'idioma)
  useEffect(() => {
    setIdioma(getIdiomaActual());
    const handleIdiomaChange = () => setIdioma(getIdiomaActual());
    window.addEventListener('idiomaChanged', handleIdiomaChange);
    return () => window.removeEventListener('idiomaChanged', handleIdiomaChange);
  }, []);

  // Carregar missatges des de sessionStorage al carregar el component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMessages = window.sessionStorage.getItem('dretplaner.chat.messages');
      if (storedMessages) {
        try {
          const parsedMessages = JSON.parse(storedMessages) as Message[];
          if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
            setMessages(parsedMessages);
          }
        } catch (error) {
          console.error('Error al carregar missatges del xat:', error);
        }
      }
    }
  }, []);

  // Guardar missatges a sessionStorage quan canvien
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        window.sessionStorage.setItem('dretplaner.chat.messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error al guardar missatges del xat:', error);
      }
    }
  }, [messages]);

  // Carregar consentiment de privacitat des de localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedConsent = window.localStorage.getItem('dretplaner.chat.consentAccepted');
      if (storedConsent === 'true') {
        setPrivacyAccepted(true);
      }
    }
  }, []);

  // Guardar consentiment quan canvia
  useEffect(() => {
    if (privacyAccepted && typeof window !== 'undefined') {
      window.localStorage.setItem('dretplaner.chat.consentAccepted', 'true');
    }
  }, [privacyAccepted]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Carregar llista de documents RAG quan s’obre el xat (abans de contestar)
  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/rag/documents')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => setRagDocuments(data.documents || []))
      .catch(() => setRagDocuments([]));
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(
    async (e?: React.FormEvent | string) => {
      if (typeof e === 'object' && e) {
        e.preventDefault();
      }

      const questionText = typeof e === 'string' ? e : input.trim();

      if (!privacyAccepted) {
        const privacyMsg =
          idioma === 'es'
            ? 'Debes aceptar la información de privacidad antes de enviar una consulta.'
            : idioma === 'fr'
              ? "Vous devez accepter les informations de confidentialité avant d'envoyer une question."
              : "Has d'acceptar la informació de privacitat abans d'enviar una consulta.";
        alert(privacyMsg);
        return;
      }

      if (!questionText || loading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: questionText
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setLoading(true);

      try {
        // La resposta del xat es genera en l'idioma de la interfície (locale)
        const locale = getIdiomaActual();
        const response = await fetch('/api/unified-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: questionText,
            conversationHistory: messages.map((m) => ({
              role: m.role,
              content: m.content
            })),
            locale,
            maxTokens: 800,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const data = await response.json();
          const defaultError =
            idioma === 'es'
              ? 'Error en la respuesta del chatbot'
              : idioma === 'fr'
                ? "Erreur dans la réponse du chatbot"
                : 'Error en la resposta del chatbot';
          throw new Error(data.error || defaultError);
        }

        const data = await response.json();

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          sources: data.sources || []
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error: any) {
        const errorPrefix =
          idioma === 'es'
            ? 'Lo siento, ha habido un error:'
            : idioma === 'fr'
              ? "Désolé, une erreur s'est produite :"
              : 'Ho sento, hi ha hagut un error:';
        const errorSuffix =
          idioma === 'es' ? ' Inténtalo de nuevo.' : idioma === 'fr' ? ' Réessayez.' : ' Torna-ho a intentar.';
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `${errorPrefix} ${error.message}.${errorSuffix}`
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, privacyAccepted, messages, idioma]
  );

  // Escoltar events per obrir el chatbot des de qualsevol lloc
  useEffect(() => {
    const handleOpenChat = (event: Event) => {
      const customEvent = event as CustomEvent<{
        question?: string;
        autoSubmit?: boolean;
      }>;
      setIsOpen(true);
      setPrivacyAccepted(true);

      // Enviar pregunta si hi ha
      if (customEvent.detail?.question && customEvent.detail.question.trim()) {
        const question = customEvent.detail.question;
        setTimeout(() => {
          if (customEvent.detail.autoSubmit) {
            handleSend(question);
          } else {
            setInput(question);
          }
        }, 300);
      }
    };

    window.addEventListener('openUnifiedChat', handleOpenChat);
    return () => {
      window.removeEventListener('openUnifiedChat', handleOpenChat);
    };
  }, [handleSend]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('dretplaner.chat.messages');
    }
  };

  const getSourceLink = (source: Source) => {
    // Articles de la Constitució: enllaç a la pàgina de l'article
    if (source.code === 'constitucio' && source.id.startsWith('CONST_')) {
      return `/codis/constitucio/article/${source.id}`;
    }
    // Doctrina: sense pàgina de cerca, enllaç a l'inici
    if (source.code === 'doctrina') {
      return '/';
    }
    return `/codis/constitucio/article/${source.id}`;
  };

  const getSourceLabel = (source: Source) => {
    return source.code === 'doctrina' ? 'Doctrina' : 'CONST';
  };

  const renderMessageContent = (message: Message) => {
    return message.content.split('\n').map((paragraph, pIndex) => {
      // Si la línia està buida, no la renderitzem o posem un espai
      if (!paragraph.trim()) return <div key={pIndex} style={{ height: '0.5rem' }} />;

      // Regex per trobar cites [[ID]]
      const parts = paragraph.split(/(\[\[.*?\]\])/g);

      return (
        <p key={pIndex} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
          {parts.map((part, partIndex) => {
            const match = part.match(/^\[\[(.*?)\]\]$/);
            if (match) {
              const id = match[1];
              const source = message.sources?.find(s => s.id === id);
              if (source) {
                // Trobem la font, mostrem etiqueta interactiva
                const label = source.code === 'doctrina'
                  ? 'Doctrina'
                  : source.number
                    ? `Art. ${source.number}`
                    : 'Font';

                // Retallem el contingut per al tooltip
                const contentPreview = source.content
                  ? (source.content.length > 200 ? source.content.substring(0, 200) + '...' : source.content)
                  : `${source.title}`;

                return (
                  <span
                    key={partIndex}
                    className="citation-tag"
                    data-preview={contentPreview}
                    title={contentPreview} // Fallback natiu
                    onClick={(e) => {
                      e.stopPropagation();
                      // Opcional: Fer scroll cap a la font a sota
                      const link = document.querySelector(`a[href*="${id}"]`);
                      link?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      link?.parentElement?.animate([
                        { backgroundColor: 'rgba(255, 255, 0, 0.3)' },
                        { backgroundColor: 'transparent' }
                      ], { duration: 2000 });
                    }}
                  >
                    {label}
                  </span>
                );
              }
              // Si no trobem la font però té format [[ID]], ho mostrem net o igual
              return null; // Ocultem l'ID cru si no trobem la font, per neteja
            }
            // Text normal
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Bombolla flotant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-bubble"
          aria-label={
            idioma === 'es' ? 'Abrir chat Hermes' : idioma === 'fr' ? 'Ouvrir le chat Hermes' : 'Obrir xat Hermes'
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z"
              fill="currentColor"
            />
            <path
              d="M7 9H17V11H7V9ZM7 12H15V14H7V12ZM7 6H17V8H7V6Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}

      {/* Modal del chatbot */}
      {isOpen && (
        <div className={`chatbot-modal ${isMaximized ? 'chatbot-modal--maximized' : ''} ${className}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-title">
                <span className="chatbot-icon">💬</span>
                <span>Hermes · Dret Planer</span>
              </div>
              <div className="chatbot-header-actions">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="chatbot-clear"
                    aria-label={
                      idioma === 'es' ? 'Borrar conversación' : idioma === 'fr' ? 'Effacer la conversation' : 'Esborrar conversa'
                    }
                    title={
                      idioma === 'es' ? 'Borrar conversación' : idioma === 'fr' ? 'Effacer la conversation' : 'Esborrar conversa'
                    }
                  >
                    🗑️
                  </button>
                )}
                <button
                  onClick={() => setIsMaximized((value) => !value)}
                  className="chatbot-maximize"
                  aria-label={
                    idioma === 'es'
                      ? isMaximized ? 'Restaurar tamaño' : 'Maximizar ventana'
                      : idioma === 'fr'
                        ? isMaximized ? 'Restaurer la taille' : 'Agrandir la fenêtre'
                        : isMaximized ? 'Restableix mida' : 'Maximitza finestra'
                  }
                  title={
                    idioma === 'es'
                      ? isMaximized ? 'Restaurar tamaño' : 'Maximizar ventana'
                      : idioma === 'fr'
                        ? isMaximized ? 'Restaurer la taille' : 'Agrandir la fenêtre'
                        : isMaximized ? 'Restableix mida' : 'Maximitza finestra'
                  }
                >
                  <span className="chatbot-maximize-icon">
                    {isMaximized ? '⤓' : '⤢'}
                  </span>
                  <span className="chatbot-maximize-text">
                    {idioma === 'es' ? (isMaximized ? 'Restaurar' : 'Maximizar') : idioma === 'fr' ? (isMaximized ? 'Restaurer' : 'Agrandir') : isMaximized ? 'Restableix' : 'Maximitza'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMaximized(false);
                    // No esborrem els missatges, es mantenen a sessionStorage
                  }}
                  className="chatbot-close"
                  aria-label={
                    idioma === 'es' ? 'Cerrar chat' : idioma === 'fr' ? 'Fermer le chat' : 'Tancar chatbot'
                  }
                  title={
                    idioma === 'es' ? 'Cerrar chat' : idioma === 'fr' ? 'Fermer le chat' : 'Tancar chatbot'
                  }
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="chatbot-welcome">
                {ragDocuments.length > 0 && (
                  <div className="chatbot-rag-documents">
                    <strong>
                      {idioma === 'es'
                        ? 'Documentos que el sistema puede consultar antes de responder:'
                        : idioma === 'fr'
                          ? 'Documents que le système peut consulter avant de répondre :'
                          : 'Documents que el sistema pot consultar abans de contestar:'}
                    </strong>
                    <ul>
                      {ragDocuments.map((doc) => (
                        <li key={doc.id}>
                          {doc.name}: {doc.description} ({doc.count}{' '}
                          {idioma === 'es' ? 'entradas' : idioma === 'fr' ? 'entrées' : 'entrades'})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {idioma === 'ca' && (
                  <>
                    <p>
                      <strong>Hola! Sóc Hermes.</strong>
                    </p>
                    <p>
                      El xat es diu Hermes, en honor al déu grec de la comunicació i la interpretació.
                    </p>
                    <p>
                      Sóc un assistent jurídic especialitzat en la <strong>Constitució del Principat d&apos;Andorra</strong>. Puc ajudar-te a entendre qualsevol article, explicar els drets fonamentals, les institucions andorranes i qualsevol aspecte de la llei fonamental del país.
                    </p>
                    <p>
                      Fes-me qualsevol pregunta sobre la Constitució d&apos;Andorra i et respondré amb informació precisa i clara.
                    </p>
                  </>
                )}
                {idioma === 'es' && (
                  <>
                    <p>
                      <strong>¡Hola! Soy Hermes.</strong>
                    </p>
                    <p>
                      El chat se llama Hermes, en honor al dios griego de la comunicación y la interpretación.
                    </p>
                    <p>
                      Soy un asistente jurídico especializado en la <strong>Constitución del Principado de Andorra</strong>. Puedo ayudarte a entender cualquier artículo, explicar los derechos fundamentales, las instituciones andorranas y cualquier aspecto de la ley fundamental del país.
                    </p>
                    <p>
                      Hazme cualquier pregunta sobre la Constitución de Andorra y te responderé con información precisa y clara.
                    </p>
                  </>
                )}
                {idioma === 'fr' && (
                  <>
                    <p>
                      <strong>Bonjour ! Je suis Hermes.</strong>
                    </p>
                    <p>
                      Le chat s&apos;appelle Hermes, en l&apos;honneur du dieu grec de la communication et de l&apos;interprétation.
                    </p>
                    <p>
                      Je suis un assistant juridique spécialisé dans la <strong>Constitution de la Principauté d&apos;Andorre</strong>. Je peux vous aider à comprendre n&apos;importe quel article, expliquer les droits fondamentaux, les institutions andorranes et tout aspect de la loi fondamentale du pays.
                    </p>
                    <p>
                      Posez-moi toute question sur la Constitution d&apos;Andorre et je vous répondrai avec des informations précises et claires.
                    </p>
                  </>
                )}
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message chatbot-message-${message.role}`}
              >
                <div className="chatbot-message-content">
                  {renderMessageContent(message)}

                  {message.sources && message.sources.length > 0 && (
                    <div className="chatbot-sources">
                      <strong>
                        {idioma === 'es' ? 'Fuentes:' : idioma === 'fr' ? 'Sources:' : 'Fonts:'}
                      </strong>
                      <ul>
                        {message.sources.map((source, index) => (
                          <li key={index}>
                            <Link href={getSourceLink(source)}>
                              <span className="source-code">{getSourceLabel(source)}</span>
                              {source.number ? ` · ${source.number}: ` : ': '}
                              {source.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chatbot-message chatbot-message-assistant">
                <div className="chatbot-message-content">
                  <div className="chatbot-loading">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chatbot-input-container">
            <div className="chatbot-privacy-checkbox">
                <label>
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                />
                <span>
                  {idioma === 'ca' &&
                    "Confirmo que he llegit la informació de privacitat i que no inclouré dades personals. Les converses es guarden només al meu navegador (sessionStorage) i s'esborren en tancar la pestanya."}
                  {idioma === 'es' &&
                    'Confirmo que he leído la información de privacidad y que no incluiré datos personales. Las conversaciones se guardan solo en mi navegador (sessionStorage) y se borran al cerrar la pestaña.'}
                  {idioma === 'fr' &&
                    "Je confirme avoir lu les informations de confidentialité et ne pas inclure de données personnelles. Les conversations sont stockées uniquement dans mon navigateur (sessionStorage) et supprimées à la fermeture de l'onglet."}
                </span>
              </label>
            </div>
            <div className="chatbot-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  idioma === 'es'
                    ? 'Pregunta sobre la Constitución de Andorra...'
                    : idioma === 'fr'
                      ? 'Question sur la Constitution d\'Andorre...'
                      : 'Pregunta sobre la Constitució d\'Andorra...'
                }
                className="chatbot-input"
                disabled={loading || !privacyAccepted}
              />
              <button
                type="submit"
                disabled={loading || !input.trim() || !privacyAccepted}
                className="chatbot-send"
                aria-label={
                  idioma === 'es' ? 'Enviar mensaje' : idioma === 'fr' ? 'Envoyer le message' : 'Enviar missatge'
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx>{`
        .chatbot-bubble {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #0f3d3e;
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: transform 0.2s;
        }

        .chatbot-bubble:hover {
          transform: scale(1.1);
        }

        .chatbot-modal {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 400px;
          max-width: calc(100vw - 4rem);
          height: 600px;
          max-height: calc(100vh - 4rem);
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 1001;
          transition: width 0.3s ease, height 0.3s ease, bottom 0.3s ease, right 0.3s ease, border-radius 0.3s ease;
        }

        .chatbot-modal--maximized {
          bottom: 20px !important;
          right: 20px !important;
          width: calc(100% - 40px) !important;
          max-width: 1400px !important;
          height: calc(100vh - 40px) !important;
          max-height: calc(100vh - 40px) !important;
          border-radius: 16px !important;
        }

        .chatbot-header {
          padding: 1rem;
          border-bottom: 1px solid #e5e5e5;
        }

        .chatbot-header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .chatbot-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .chatbot-code-selector {
          flex: 1;
        }

        .chatbot-code-select {
          padding: 0.25rem 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .chatbot-header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .chatbot-clear {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #dc2626;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .chatbot-clear:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
        }

        .chatbot-maximize {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .chatbot-maximize:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .chatbot-maximize-icon {
          font-size: 0.9rem;
          display: inline-block;
        }

        .chatbot-maximize-text {
          display: inline-block;
        }

        .chatbot-close {
          background: #fee2e2 !important;
          border: 1px solid #fca5a5 !important;
          color: #dc2626 !important;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.25rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .chatbot-close:hover {
          background: #fecaca !important;
          border-color: #f87171 !important;
          color: #b91c1c !important;
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }

        .chatbot-welcome {
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .chatbot-rag-documents {
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: #e8f4f4;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        .chatbot-rag-documents strong {
          display: block;
          margin-bottom: 0.5rem;
        }
        .chatbot-rag-documents ul {
          margin: 0;
          padding-left: 1.25rem;
        }
        .chatbot-rag-documents li {
          margin: 0.25rem 0;
        }

        .chatbot-message {
          margin-bottom: 1rem;
          display: flex;
          width: 100%;
        }

        .chatbot-message-user {
          justify-content: flex-end;
        }

        .chatbot-message-assistant {
          justify-content: flex-start;
        }

        .chatbot-message-user .chatbot-message-content {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          max-width: 85%;
          text-align: left;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          overflow-wrap: break-word;
        }

        .chatbot-message-user .chatbot-message-content:hover {
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
          transform: translateY(-1px);
        }

        .chatbot-message-assistant .chatbot-message-content {
          background: #f5f5f5;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          max-width: 85%;
          overflow-wrap: break-word;
        }

        .chatbot-sources {
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }

        .chatbot-sources ul {
          list-style: none;
          padding: 0;
          margin: 0.5rem 0 0 0;
        }

        .chatbot-sources li {
          margin: 0.25rem 0;
        }

        .source-code {
          font-weight: 600;
          color: #0f3d3e;
        }

        .chatbot-loading {
          display: flex;
          gap: 0.25rem;
        }

        .chatbot-loading span {
          width: 8px;
          height: 8px;
          background: #0f3d3e;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .chatbot-loading span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .chatbot-loading span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        .chatbot-input-container {
          padding: 1rem;
          border-top: 1px solid #e5e5e5;
        }

        .chatbot-privacy-checkbox {
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
        }

        .chatbot-privacy-checkbox label {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          cursor: pointer;
        }

        .chatbot-input-wrapper {
          display: flex;
          gap: 0.5rem;
        }

        .chatbot-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .chatbot-send {
          padding: 0.75rem;
          background: #0f3d3e;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .chatbot-modal--maximized {
            bottom: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
          }

          .chatbot-maximize-text {
            display: none;
          }

          .chatbot-maximize {
            padding: 8px;
            min-width: 36px;
            justify-content: center;
          }
        }

        /* Citation Styles */
        .citation-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 61, 62, 0.1);
          color: #0f3d3e;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          margin: 0 4px;
          cursor: help;
          border: 1px solid rgba(15, 61, 62, 0.2);
          transition: all 0.2s ease;
          position: relative;
        }

        .citation-tag:hover {
          background: #0f3d3e;
          color: white;
          border-color: #0f3d3e;
        }
        
        /* Custom Tooltip */
        .citation-tag:hover::after {
          content: attr(data-preview);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 250px;
          padding: 8px 12px;
          background: #333;
          color: white;
          font-size: 0.75rem;
          font-weight: 400;
          border-radius: 6px;
          pointer-events: none;
          z-index: 100;
          margin-bottom: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          white-space: normal;
          line-height: 1.4;
          text-align: left;
        }
        
        /* Triangle for tooltip */
        .citation-tag:hover::before {
          content: '';
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 6px;
          border-style: solid;
          border-color: #333 transparent transparent transparent;
          margin-bottom: -4px;
          z-index: 100;
        }
      `}</style>
    </>
  );
}

