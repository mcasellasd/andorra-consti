import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import { articlesConstitucio } from '../../../../data/codis/constitucio/articles-template';
import { ArticleAndorra, InterpretacioIA as InterpretacioIAType } from '../../../../data/codis/types';
import { getIdiomaActual, type Idioma } from '../../../../lib/i18n';
import { getDoctrinaByArticleId, type DoctrinaCase } from '../../../../data/doctrina';

// Components
import { ArticleBreadcrumb } from '../../../../components/article/ArticleBreadcrumb';
import { ArticleHeader } from '../../../../components/article/ArticleHeader';
import { ArticleContent } from '../../../../components/article/ArticleContent';
import { ArticleSidebar } from '../../../../components/article/ArticleSidebar';
import { ArticleNavigation } from '../../../../components/article/ArticleNavigation';

const ArticleConstitucioPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<ArticleAndorra | null>(null);
  const [idioma, setIdioma] = useState<Idioma>('ca');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [interpretacio, setInterpretacio] = useState<InterpretacioIAType | null>(null);
  const [doctrina, setDoctrina] = useState<DoctrinaCase[]>([]);

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

  useEffect(() => {
    if (id && typeof id === 'string') {
      const articleTrobat = articlesConstitucio.find((art) => art.id === id);
      if (articleTrobat) {
        setArticle(articleTrobat);
        // Reset interpretacio when changing article
        setInterpretacio(null);
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

    setActiveTab('Resum');

    // Scroll to sidebar on mobile
    const sidebar = document.getElementById('article-sidebar');
    if (sidebar && window.innerWidth < 1024) {
      sidebar.scrollIntoView({ behavior: 'smooth' });
    }

    // Comprovar si ja tenim el resum per aquest idioma
    if (interpretacio?.resum?.[idioma]) {
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);

    try {
      const resposta = await fetch('/api/interpretacio-ia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article_id: article.id,
          idioma: idioma,
          text_oficial: article.text_oficial,
          numeracio: article.numeracio,
        }),
      });

      if (!resposta.ok) {
        throw new Error('Error al generar la interpretació');
      }

      const data: InterpretacioIAType = await resposta.json();

      setInterpretacio(prev => {
        if (!prev) return data;
        return {
          ...data,
          resum: {
            ca: data.resum.ca || prev.resum.ca,
            es: data.resum.es || prev.resum.es,
            fr: data.resum.fr || prev.resum.fr,
          },
          exemples: [
            ...(prev.exemples || []).filter(e => e.idioma !== idioma),
            ...(data.exemples || [])
          ],
          // Preserve context fields if they exist
          finalitat: data.finalitat || prev.finalitat,
          destinataris: data.destinataris || prev.destinataris,
          aplicacio: data.aplicacio || prev.aplicacio,
          doctrina_jurisprudencia: data.doctrina_jurisprudencia || prev.doctrina_jurisprudencia
        };
      });
    } catch (error) {
      console.error('Error generant Assistencia:', error);
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
          {article.numeracio}: {article.titol} - Constitució d&apos;Andorra | dretplaner.ad
        </title>
        <meta name="description" content={(article.idiomes?.[idioma] || article.text_oficial).substring(0, 160)} />
      </Head>
      <Layout>
        <div className="min-h-screen flex flex-col bg-background">
          {/* Breadcrumb */}
          <ArticleBreadcrumb article={article} />

          {/* Header */}
          <ArticleHeader article={article} />

          {/* Main content area */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Main article content */}
              <div className="flex-1 min-w-0">
                <ArticleContent
                  article={article}
                  idioma={idioma}
                  onGenerateAssistencia={handleGenerateAssistencia}
                  isGenerating={isGenerating}
                />
                <ArticleNavigation
                  previousArticle={previousArticle}
                  nextArticle={nextArticle}
                  idioma={idioma}
                />
              </div>

              {/* Sidebar */}
              <aside id="article-sidebar" className="w-full lg:w-80 shrink-0 scroll-mt-24">
                <ArticleSidebar
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isGenerating={isGenerating}
                  article={article}
                  idioma={idioma}
                  interpretacio={interpretacio}
                  doctrina={doctrina}
                />
              </aside>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ArticleConstitucioPage;
