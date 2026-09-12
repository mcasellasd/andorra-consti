import React, { FormEvent, useMemo, useState } from 'react';
import { Loader2, Send, Sparkles } from 'lucide-react';
import type { Idioma } from '../../lib/i18n';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ArticleLearningChatProps {
  articleId: string;
  articleNumber: string;
  articleText: string;
  idioma: Idioma;
}

export function ArticleLearningChat({ articleId, articleNumber, articleText, idioma }: ArticleLearningChatProps) {
  const copy = useMemo(() => ({
    title: idioma === 'ca' ? 'Conversa per continuar comprenent' : idioma === 'es' ? 'Conversación para seguir comprendiendo' : 'Conversation pour continuer à comprendre',
    intro: idioma === 'ca' ? 'Pregunta sobre l’article i contrasta la resposta amb les fonts. La conversa ajuda a explorar, no tanca la interpretació.' : idioma === 'es' ? 'Pregunta sobre el artículo y contrasta la respuesta con las fuentes. La conversación ayuda a explorar, no cierra la interpretación.' : 'Posez une question sur l’article et confrontez la réponse aux sources. La conversation aide à explorer, elle ne clôt pas l’interprétation.',
    placeholder: idioma === 'ca' ? 'Escriu una pregunta sobre l’article…' : idioma === 'es' ? 'Escribe una pregunta sobre el artículo…' : 'Écrivez une question sur l’article…',
    send: idioma === 'ca' ? 'Enviar' : idioma === 'es' ? 'Enviar' : 'Envoyer',
    initial: idioma === 'ca' ? 'Puc ajudar-te a entendre l’article, relacionar-lo amb fonts oficials o distingir entre text, aplicació i hipòtesi social. Què vols aclarir?' : idioma === 'es' ? 'Puedo ayudarte a entender el artículo, relacionarlo con fuentes oficiales o distinguir entre texto, aplicación e hipótesis social. ¿Qué quieres aclarar?' : 'Je peux vous aider à comprendre l’article, à le relier aux sources officielles ou à distinguer le texte, l’application et l’hypothèse sociale. Que souhaitez-vous clarifier ?',
    error: idioma === 'ca' ? 'No he pogut obtenir una resposta ara. Torna-ho a provar o consulta directament la font oficial.' : idioma === 'es' ? 'No he podido obtener una respuesta ahora. Inténtalo de nuevo o consulta directamente la fuente oficial.' : 'Je n’ai pas pu obtenir de réponse. Réessayez ou consultez directement la source officielle.',
    limit: idioma === 'ca' ? 'Mediació pedagògica · fonts visibles · resposta provisional i revisable' : idioma === 'es' ? 'Mediación pedagógica · fuentes visibles · respuesta provisional y revisable' : 'Médiation pédagogique · sources visibles · réponse provisoire et révisable',
    suggestions: idioma === 'ca'
      ? ['Quines normes desenvolupen l’article 2?', 'Quina institució és competent?', 'Quina diferència hi ha entre llengua oficial i ús social?']
      : idioma === 'es'
        ? ['¿Qué normas desarrollan el artículo 2?', '¿Qué institución es competente?', '¿Qué diferencia hay entre lengua oficial y uso social?']
        : ['Quelles normes développent l’article 2 ?', 'Quelle institution est compétente ?', 'Quelle différence entre langue officielle et usage social ?'],
  }), [idioma]);

  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: copy.initial }]);
  const [question, setQuestion] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const ask = async (rawQuestion: string) => {
    const trimmed = rawQuestion.trim();
    if (!trimmed || isSending) return;
    const userMessage = `${articleNumber} de la Constitució d’Andorra: ${trimmed}`;
    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(nextMessages);
    setQuestion('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch('/api/unified-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          locale: idioma,
          conversationHistory: messages.slice(-8),
          maxTokens: 700,
          temperature: 0.25,
          article_id: articleId,
          text_oficial: articleText,
          numeracio: articleNumber,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.response) throw new Error(data.error || 'chat-error');
      setMessages((current) => [...current, { role: 'assistant', content: data.response }]);
    } catch {
      setError(copy.error);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(question);
  };

  return (
    <div className="rounded-xl border border-violet-200 bg-white/80 p-5 shadow-sm dark:border-violet-900/60 dark:bg-slate-900/70">
      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-800 dark:text-violet-300">
        <Sparkles className="h-4 w-4" />
        {copy.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.intro}</p>

      <div className="my-4 flex flex-wrap gap-2" aria-label="Preguntes suggerides">
        {copy.suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => void ask(suggestion)}
            disabled={isSending}
            className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-left text-xs font-medium text-violet-800 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-200"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto pr-1" aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[92%] whitespace-pre-line rounded-xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'ml-auto bg-slate-800 text-white' : 'border border-violet-100 bg-violet-50 text-foreground dark:border-violet-900/50 dark:bg-violet-950/20'}`}
          >
            {message.content}
          </div>
        ))}
        {isSending && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {idioma === 'ca' ? 'Consultant les fonts…' : idioma === 'es' ? 'Consultando las fuentes…' : 'Consultation des sources…'}
          </div>
        )}
      </div>

      <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          disabled={isSending}
          aria-label={copy.placeholder}
          placeholder={copy.placeholder}
          className="min-w-0 flex-1 rounded-lg border border-violet-200 bg-background px-3 py-2.5 text-sm outline-none ring-violet-300 focus:ring-2 dark:border-violet-800"
        />
        <button type="submit" disabled={isSending || !question.trim()} className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50">
          <Send className="h-4 w-4" />
          {copy.send}
        </button>
      </form>
      {error && <p className="mt-3 text-xs text-rose-600 dark:text-rose-300">{error}</p>}
      <p className="mt-3 text-xs text-muted-foreground">{copy.limit}</p>
    </div>
  );
}
