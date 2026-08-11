import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout';
import { articlesConstitucio } from '../../../../data/codis/constitucio/articles-template';
import { ArticleAndorra } from '../../../../data/codis/types';
import { getIdiomaActual, type Idioma } from '../../../../lib/i18n';
import { getDoctrinaByArticleId, type DoctrinaCase } from '../../../../data/doctrina';
import { getEditorialConstitucional } from '../../../../data/codis/constitucio/editorial';

// Components
import { ArticleHeader } from '../../../../components/article/ArticleHeader';
import { ArticleContent } from '../../../../components/article/ArticleContent';
import { ArticleForcaNormativa } from '../../../../components/article/ArticleForcaNormativa';

const ArticleConstitucioPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<ArticleAndorra | null>(null);
  const [idioma, setIdioma] = useState<Idioma>('ca');
  const [loading, setLoading] = useState(true);
  const [editorial, setEditorial] = useState<ReturnType<typeof getEditorialConstitucional>>(null);
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
        setEditorial(getEditorialConstitucional(articleTrobat.id));
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
          />

          {/* Main content area */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Força normativa: va primer perquè és la informació més accionable
                (és un dret reclamable o un mandat a l'Estat?). Vegeu
                docs/REDISSENY-INTERPRETACIO-ARTICLE.md */}
            <ArticleForcaNormativa articleNumber={article.numeracio} codi={article.codi} />

            <ArticleContent
              article={article}
              idioma={idioma}
              editorial={editorial}
              doctrina={doctrina}
              previousArticle={previousArticle}
              nextArticle={nextArticle}
            />
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ArticleConstitucioPage;
