import { reformatNewsArticle } from '@/ai/flows/reformat-news-article';
import { mockArticles } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { slugify } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = mockArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <article className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {article.source}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-foreground leading-tight">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Published on {format(new Date(), 'MMMM d, yyyy')}
            </p>
          </div>
          <Suspense fallback={<ArticleContentSkeleton />}>
            <ArticleContent article={article} />
          </Suspense>
        </article>
      </main>
    </div>
  );
}

async function ArticleContent({ article }: { article: (typeof mockArticles)[0] }) {
  if (!article.fullContent) {
    return <p className="text-muted-foreground">Full article content not available.</p>;
  }

  const { reformattedArticle } = await reformatNewsArticle({
    articleUrl: article.link,
    originalArticle: article.fullContent,
  });
  
  // Simple formatter for paragraphs
  const paragraphs = reformattedArticle.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function ArticleContentSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-11/12" />
      <Skeleton className="h-6 w-full" />
      <br/>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-10/12" />
       <br/>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-8/12" />
    </div>
  )
}
