import { Suspense } from 'react';
import { filterRelevantNews } from '@/ai/flows/filter-relevant-news';
import { fetchArticles } from '@/services/rss-service';
import { ArticleCard } from '@/components/article-card';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { FEEDS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function Home({
  searchParams,
}: {
  searchParams: { region?: string };
}) {
  const currentRegion =
    FEEDS.find((r) => r.id === searchParams.region) || FEEDS[0];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12 border-b pb-8">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground tracking-tight">
            {currentRegion.name}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl">
            The world's most vital stories, curated and analyzed by AI, presented with clarity and depth.
          </p>
        </div>
        <Suspense fallback={<ArticleGridSkeleton />}>
          <ArticleGrid region={currentRegion.id} />
        </Suspense>
      </main>
    </div>
  );
}

async function ArticleGrid({ region }: { region: string }) {
  const articlesToFilter = await fetchArticles(region);

  if (articlesToFilter.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No articles could be fetched for this region. Please try again later.</p>
      </div>
    );
  }
  
  const filteredArticles = await filterRelevantNews({
    articles: articlesToFilter.map(({ title, description, link, source }) => ({ title: title || '', description: description || '', link: link || '', source: source || '' })),
  });

  if (!filteredArticles || filteredArticles.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>AI could not identify relevant articles at this time.</p>
      </div>
    );
  }

  const sortedArticles = filteredArticles.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topArticle = sortedArticles[0];
  const nextTwoArticles = sortedArticles.slice(1, 3);
  const remainingArticles = sortedArticles.slice(3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
      {topArticle && (
        <div className="md:col-span-12">
          <ArticleCard article={topArticle} isFeatured={true} />
        </div>
      )}
      
      {nextTwoArticles.length > 0 && (
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {nextTwoArticles.map((article) => (
            <ArticleCard key={article.link} article={article} />
          ))}
        </div>
      )}

      {remainingArticles.length > 0 && (
         <div className="md:col-span-12">
          <Separator className="my-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {remainingArticles.map((article) => (
              <ArticleCard key={article.link} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
      <div className="md:col-span-12 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-4 py-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-1/3" />
        </div>
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="md:col-span-6 space-y-3">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-16 w-3/4" />
        </div>
      ))}
    </div>
  );
}
