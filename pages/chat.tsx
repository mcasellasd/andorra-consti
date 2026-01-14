import { useEffect } from 'react';
import { openChat } from '@/components/chatUtils';

export default function ChatPage() {
  useEffect(() => {
    openChat({ maximized: true });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow">
        <h1 className="text-3xl font-semibold text-slate-900">
          Assistent del Codi Civil d'Andorra
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Aquesta pàgina ha quedat com a demostració del xat. A qualsevol pàgina
          trobaràs una bombolla “💬” per obrir Prudència.
        </p>
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-100/60 p-6 text-sm text-slate-600">
          El xat apareix com a finestra emergent; si no el veus, comprova que no
          estigui minimitzat a la cantonada inferior esquerra.
        </div>
      </div>
    </div>
  );
}

