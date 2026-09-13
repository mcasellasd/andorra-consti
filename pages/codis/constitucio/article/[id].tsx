import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import { articlesConstitucio } from '../../../../data/codis/constitucio/articles-template';
import { ArticleAndorra, InterpretacioIA as InterpretacioIAType } from '../../../../data/codis/types';
import { getIdiomaActual, type Idioma } from '../../../../lib/i18n';
import { getDoctrinaByArticleId, type DoctrinaCase } from '../../../../data/doctrina';

// Components
import { ArticleHeader } from '../../../../components/article/ArticleHeader';
import { ArticleContent } from '../../../../components/article/ArticleContent';
import { ArticleForcaNormativa } from '../../../../components/article/ArticleForcaNormativa';
import { useInterlocutorProfile } from '../../../../components/InterlocutorProfileSelector';
import { DEFAULT_INTERLOCUTOR_PROFILE, getInterlocutorProfileKey } from '../../../../lib/interlocutor-profile';

const DEFAULT_PROFILE_KEY = getInterlocutorProfileKey(DEFAULT_INTERLOCUTOR_PROFILE);

function hasCompleteInterpretacioForIdioma(interpretacio: InterpretacioIAType | null, idioma: Idioma): boolean {
  if (!interpretacio?.resum?.[idioma]?.trim()) return false;

  const hasExamplesInIdioma = (interpretacio.exemples || []).some(
    (exemple) => exemple.idioma === idioma && Boolean(exemple.cas?.trim()),
  );
  if (!hasExamplesInIdioma) return false;

  return Boolean(
    interpretacio.interpretacio_principal?.trim()
    || interpretacio.finalitat?.trim()
    || interpretacio.aplicacio?.trim()
    || interpretacio.doctrina_jurisprudencia?.trim(),
  );
}

function mergeInterpretacioByIdioma(
  existing: InterpretacioIAType | null,
  incoming: InterpretacioIAType,
  idioma: Idioma,
): InterpretacioIAType {
  if (!existing) return incoming;

  return {
    ...incoming,
    resum: {
      ca: incoming.resum?.ca ?? existing.resum?.ca ?? '',
      es: incoming.resum?.es ?? existing.resum?.es ?? '',
      fr: incoming.resum?.fr ?? existing.resum?.fr ?? '',
    },
    exemples: [
      ...(existing.exemples || []).filter((e) => e.idioma !== idioma),
      ...(incoming.exemples || []),
    ],
    finalitat: incoming.finalitat ?? existing.finalitat,
    destinataris: incoming.destinataris ?? existing.destinataris,
    aplicacio: incoming.aplicacio ?? existing.aplicacio,
    doctrina_jurisprudencia: incoming.doctrina_jurisprudencia ?? existing.doctrina_jurisprudencia,
    interpretacio_principal: incoming.interpretacio_principal ?? existing.interpretacio_principal,
    lectures_alternatives: incoming.lectures_alternatives ?? existing.lectures_alternatives,
    fonts: incoming.fonts ?? existing.fonts,
    limits: incoming.limits ?? existing.limits,
    context_historic: incoming.context_historic ?? existing.context_historic,
  };
}

const ArticleConstitucioPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<ArticleAndorra | null>(null);
  const [idioma, setIdioma] = useState<Idioma>('ca');
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [interpretacionsByProfile, setInterpretacionsByProfile] = useState<Record<string, InterpretacioIAType>>({});
  const [doctrina, setDoctrina] = useState<DoctrinaCase[]>([]);
  const { profile, updateProfile, resetProfile } = useInterlocutorProfile();
  const profileKey = getInterlocutorProfileKey(profile);
  const activeInterpretacio = interpretacionsByProfile[profileKey]
    ?? (profileKey === DEFAULT_PROFILE_KEY ? interpretacionsByProfile.__legacy__ ?? null : null);

  useEffect(() => {
    setIdioma(getIdiomaActual());
  }, []);

  // Escoltar canvis d'idioma
  useEffect(() => {
    const handleIdiomaChange = () => {
      const nouIdioma = getIdiomaActual();
      setIdioma(nouIdioma);
    };

    window.addEventListener('idiomaChanged', handleIdiomaChange);
    window.addEventListener('storage', handleIdiomaChange);

    return () => {
      window.removeEventListener('idiomaChanged', handleIdiomaChange);
      window.removeEventListener('storage', handleIdiomaChange);
    };
  }, [article?.id]);

  // Clau de sessionStorage per guardar interpretacions per article (sessió)
  const SESSION_STORAGE_KEY = 'dretplaner_interpretacio';

  useEffect(() => {
    if (id && typeof id === 'string') {
      const articleTrobat = articlesConstitucio.find((art) => art.id === id);
      if (articleTrobat) {
        setArticle(articleTrobat);
        // Carregar interpretació des de la memòria de sessió si n'hi ha
        try {
          const raw = typeof window !== 'undefined' && sessionStorage.getItem(`${SESSION_STORAGE_KEY}_${articleTrobat.id}`);
          const cached = raw ? (JSON.parse(raw) as unknown) : null;
          const byProfile: Record<string, InterpretacioIAType> = {};

          if (cached && typeof cached === 'object' && !Array.isArray(cached)) {
            const maybeSingle = cached as Partial<InterpretacioIAType>;
            if (typeof maybeSingle.article_id === 'string') {
              if (maybeSingle.article_id === articleTrobat.id) {
                const key = maybeSingle.profile_key || '__legacy__';
                byProfile[key] = maybeSingle as InterpretacioIAType;
              }
            } else {
              for (const [key, value] of Object.entries(cached as Record<string, unknown>)) {
                if (
                  value
                  && typeof value === 'object'
                  && (value as InterpretacioIAType).article_id === articleTrobat.id
                ) {
                  byProfile[key] = value as InterpretacioIAType;
                }
              }
            }
          }

          setInterpretacionsByProfile(byProfile);
        } catch {
          setInterpretacionsByProfile({});
        }
      }
      setLoading(false);
    }
  }, [id]);

  // Carregar doctrina relacionada
  useEffect(() => {
    if (article?.id) {
      const relatedDoctrina = getDoctrinaByArticleId(article.id);
      setDoctrina(relatedDoctrina);
    }
  }, [article?.id]);

  // Trobar articles anterior i següent
  const getPreviousArticle = (currentId: string): ArticleAndorra | null => {
    const currentIndex = articlesConstitucio.findIndex((art) => art.id === currentId);
    if (currentIndex <= 0) return null;
    return articlesConstitucio[currentIndex - 1];
  };

  const getNextArticle = (currentId: string): ArticleAndorra | null => {
    const currentIndex = articlesConstitucio.findIndex((art) => art.id === currentId);
    if (currentIndex === -1 || currentIndex === articlesConstitucio.length - 1) return null;
    return articlesConstitucio[currentIndex + 1];
  };

  const handleGenerateAssistencia = async () => {
    if (!article) return;
    const requestProfile = profile;
    const requestProfileKey = profileKey;
    const requestInterpretacio = interpretacionsByProfile[requestProfileKey] ?? null;

    // Comprovar si ja tenim la fitxa completa per aquest idioma i perfil
    if (hasCompleteInterpretacioForIdioma(requestInterpretacio, idioma)) {
      setGenerationError(null);
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const resposta = await fetch('/api/unified-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article_id: article.id,
          idioma: idioma,
          text_oficial: article.text_oficial,
          numeracio: article.numeracio,
          profile: requestProfile,
        }),
      });

      const quotaLimitHeader = resposta.headers.get('x-session-quota-limit');
      const quotaRemainingHeader = resposta.headers.get('x-session-quota-remaining');
      const quotaResetHeader = resposta.headers.get('x-session-quota-reset');
      const quotaLimit = Number(quotaLimitHeader);
      const quotaRemaining = Number(quotaRemainingHeader);
      const quotaReset = Number(quotaResetHeader);
      if (
        quotaLimitHeader &&
        quotaRemainingHeader &&
        quotaResetHeader &&
        Number.isFinite(quotaLimit) &&
        Number.isFinite(quotaRemaining) &&
        Number.isFinite(quotaReset) &&
        typeof window !== 'undefined'
      ) {
        sessionStorage.setItem('dretplaner.chat.sessionQuota', JSON.stringify({
          limit: quotaLimit,
          remaining: Math.max(0, quotaRemaining),
          reset: quotaReset,
        }));
      }

      if (!resposta.ok) {
        let apiMessage = '';
        try {
          const errorBody = await resposta.json() as { error?: unknown };
          if (typeof errorBody.error === 'string') apiMessage = errorBody.error;
        } catch {
          // La resposta pot no ser JSON (per exemple, un error del proxy).
        }

        const fallback =
          resposta.status === 429
            ? idioma === 'es'
              ? 'Has alcanzado el límite de consultas. Inténtalo más tarde.'
              : idioma === 'fr'
                ? 'Vous avez atteint la limite de requêtes. Réessayez plus tard.'
                : 'Has arribat al límit de consultes. Torna-ho a provar més tard.'
            : resposta.status >= 500
              ? idioma === 'es'
                ? 'El servicio de interpretación no está disponible. Comprueba la configuración del proveedor de IA.'
                : idioma === 'fr'
                  ? "Le service d'interprétation n'est pas disponible. Vérifiez la configuration du fournisseur d'IA."
                  : 'El servei d’interpretació no està disponible. Comprova la configuració del proveïdor d’IA.'
              : idioma === 'es'
                ? `La petición no es válida (HTTP ${resposta.status}).`
                : idioma === 'fr'
                  ? `La requête n'est pas valide (HTTP ${resposta.status}).`
                  : `La petició no és vàlida (HTTP ${resposta.status}).`;

        throw new Error(apiMessage || fallback);
      }

      const data: InterpretacioIAType = await resposta.json();

      const merged = mergeInterpretacioByIdioma(requestInterpretacio, data, idioma);

      const mergedWithProfile: InterpretacioIAType = {
        ...merged,
        profile_key: requestProfileKey,
      };
      setInterpretacionsByProfile((previousInterpretacions) => {
        const updatedInterpretacions = {
          ...previousInterpretacions,
          [requestProfileKey]: mergedWithProfile,
        };
        try {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(`${SESSION_STORAGE_KEY}_${article.id}`, JSON.stringify(updatedInterpretacions));
          }
        } catch {
          // sessionStorage pot fallar (p. ex. mode privat)
        }
        return updatedInterpretacions;
      });
    } catch (error) {
      console.error('Error generant Assistencia:', error);
      setGenerationError(
        error instanceof Error
          ? error.message
          : idioma === 'es'
            ? 'No se ha podido generar la interpretación.'
            : idioma === 'fr'
              ? "L'interprétation n'a pas pu être générée."
              : 'No s’ha pogut generar la interpretació.',
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (!router.isReady || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col bg-background">
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Carregant...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col bg-background">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <p className="text-foreground">Article no trobat</p>
              <a href="/codis/constitucio" className="text-primary hover:underline">
                Torna a la Constitució
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const previousArticle = getPreviousArticle(article.id);
  const nextArticle = getNextArticle(article.id);

  return (
    <>
      <Head>
        <title>
          {article.numeracio}: {idioma === 'ca' ? article.titol : article.idiomes?.titol?.[idioma] || article.titol} - {idioma === 'ca' ? 'Constitució' : idioma === 'es' ? 'Constitución' : 'Constitution'} d&apos;Andorra | dretplaner.ad
        </title>
        <meta name="description" content={(article.idiomes?.[idioma] || article.text_oficial).substring(0, 160)} />
      </Head>
      <Layout>
        <div className="min-h-screen flex flex-col bg-background">
          {/* Header */}
          <ArticleHeader
            article={article}
            idioma={idioma}
            previousArticle={previousArticle}
            nextArticle={nextArticle}
            onGenerateAssistencia={handleGenerateAssistencia}
            isGenerating={isGenerating}
          />

          {generationError && (
            <div
              role="alert"
              className="mx-auto mt-4 w-full max-w-7xl px-4 text-sm text-destructive sm:px-6 lg:px-8"
            >
              {generationError}
            </div>
          )}

          {/* Main content area */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Força normativa: va primer perquè és la informació més accionable
                (és un dret reclamable o un mandat a l'Estat?). Vegeu
                docs/REDISSENY-INTERPRETACIO-ARTICLE.md */}
            <ArticleForcaNormativa articleNumber={article.numeracio} codi={article.codi} />

            <ArticleContent
              article={article}
              idioma={idioma}
              interpretacio={activeInterpretacio}
              doctrina={doctrina}
              previousArticle={previousArticle}
              nextArticle={nextArticle}
              onGenerateAssistencia={handleGenerateAssistencia}
              isGenerating={isGenerating}
              profile={profile}
              onProfileChange={updateProfile}
              onProfileReset={resetProfile}
            />
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ArticleConstitucioPage;
