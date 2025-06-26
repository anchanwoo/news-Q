import { Suspense } from 'react';
import { filterRelevantNews } from '@/ai/flows/filter-relevant-news';
import { mockArticles } from '@/lib/mock-data';
import { ArticleCard } from '@/components/article-card';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { REGIONS } from '@/lib/types';

export default function Home({
  searchParams,
}: {
  searchParams: { region?: string };
}) {
  const currentRegion =
    REGIONS.find((r) => r.id === searchParams.region) || REGIONS[0];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
            {currentRegion.name} News
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            AI-curated top stories from around the world.
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
  let articlesToFilter = mockArticles;
  if (region && region !== 'all') {
    articlesToFilter = mockArticles.filter(
      (a) => a.source.toLowerCase() === region.toLowerCase()
    );
  }

  // Add a guard against empty articles to prevent AI flow errors
  if (articlesToFilter.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No articles found for this region.</p>
      </div>
    );
  }
  
  const filteredArticles = await filterRelevantNews({
    articles: articlesToFilter.map(({ title, description, link, source }) => ({ title, description, link, source })),
  });

  if (!filteredArticles || filteredArticles.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>AI could not identify relevant articles at this time.</p>
      </div>
    );
  }

  // Sort by relevance score descending
  const sortedArticles = filteredArticles.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedArticles.map((article, index) => (
        <ArticleCard key={article.link || index} article={article} />
      ))}
    </div>
  );
}

function ArticleGridSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
