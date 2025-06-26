import { Suspense } from 'react';
import { ArticleCard } from '@/components/article-card';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { CATEGORIES } from '@/lib/mock-data';
import { Separator } from '@/components/ui/separator';
import { getMockArticles } from '@/lib/mock-news';


export default function NewsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const currentCategory =
    CATEGORIES.find((c) => c.id === searchParams.category) || CATEGORIES[0];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12 border-b pb-8">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground tracking-tight">
            {currentCategory.name}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl">
            The world's most vital stories, curated and analyzed by AI, presented with clarity and depth.
          </p>
        </div>
        <Suspense fallback={<ArticleGridSkeleton />}>
          <ArticleGrid category={currentCategory.id} />
        </Suspense>
      </main>
    </div>
  );
}

async function ArticleGrid({ category }: { category: string }) {
  const allArticles = await getMockArticles();

  if (!allArticles || allArticles.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No articles found. Please try again after the next scheduled update (8 AM KST).</p>
      </div>
    );
  }

  const articlesForCategory = category === 'all'
    ? allArticles
    : allArticles.filter(a => a.category.toLowerCase() === category.toLowerCase());
  
  if (articlesForCategory.length === 0) {
     return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No relevant articles found for the '{category}' category.</p>
      </div>
    );
  }

  // Articles are pre-sorted by relevance score in the cache
  const topArticle = articlesForCategory[0];
  const nextTwoArticles = articlesForCategory.slice(1, 3);
  const remainingArticles = articlesForCategory.slice(3);

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
      <div className="md:col-span-12">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="md:w-1/2 h-96" />
          <div className="md:w-1/2 space-y-4 py-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      </div>
      {[...Array(2)].map((_, i) => (
        <div key={i} className="md:col-span-6 space-y-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-16 w-3/4" />
        </div>
      ))}
       <div className="md:col-span-12">
          <Separator className="my-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                 <Skeleton className="h-32 w-full" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-16 w-3/4" />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
