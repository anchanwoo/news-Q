import { Suspense } from 'react';
import { ArticleCard } from '@/components/article-card';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { CATEGORIES } from '@/lib/mock-data';
import { getMockArticles } from '@/lib/mock-news';

export default function NewsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const currentCategory =
    CATEGORIES.find((c) => c.id === searchParams.category) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Japanese Magazine Style Header */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 
                className="text-6xl md:text-7xl font-bold text-black mb-2"
                style={{ 
                  fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  letterSpacing: '-0.03em'
                }}
              >
                CONTENTS
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>2024 DECEMBER</span>
                <span>•</span>
                <span>ISSUE 001</span>
                <span>•</span>
                <span>{currentCategory.name.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="text-right text-sm text-gray-400">
              <div>UPDATED DAILY</div>
              <div>8:00 AM KST</div>
            </div>
          </div>
          
          {/* Thin divider line */}
          <div className="w-full h-px bg-gray-200"></div>
        </div>

        <Suspense fallback={<JapaneseMagazineSkeleton />}>
          <JapaneseMagazineLayout category={currentCategory.id} />
        </Suspense>
      </div>
    </div>
  );
}

async function JapaneseMagazineLayout({ category }: { category: string }) {
  const allArticles = await getMockArticles();

  if (!allArticles || allArticles.length === 0) {
    return (
      <div className="text-center py-32">
        <h3 className="text-3xl font-bold text-gray-300 mb-4">NO CONTENT</h3>
        <p className="text-gray-400">Next editorial update: 8:00 AM KST</p>
      </div>
    );
  }

  const articlesForCategory = category === 'all'
    ? allArticles
    : allArticles.filter(a => a.category.toLowerCase() === category.toLowerCase());
  
  if (articlesForCategory.length === 0) {
    return (
      <div className="text-center py-32">
        <h3 className="text-3xl font-bold text-gray-300 mb-4">NO {category.toUpperCase()}</h3>
        <p className="text-gray-400">Our editors are curating this section</p>
      </div>
    );
  }

  return (
    <div className="space-y-24">
      {/* Feature Story - Large Format */}
      {articlesForCategory[0] && (
        <section>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-7">
              <JapaneseMagazineItem 
                article={articlesForCategory[0]} 
                size="hero"
                number="001"
              />
            </div>
            <div className="col-span-12 lg:col-span-5">
              {articlesForCategory[1] && (
                <JapaneseMagazineItem 
                  article={articlesForCategory[1]} 
                  size="large"
                  number="002"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Secondary Stories Grid */}
      <section>
        <div className="grid grid-cols-12 gap-8">
          {articlesForCategory.slice(2, 5).map((article, index) => (
            <div key={article.id} className="col-span-12 md:col-span-6 lg:col-span-4">
              <JapaneseMagazineItem 
                article={article} 
                size="medium"
                number={String(index + 3).padStart(3, '0')}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Compact Stories */}
      <section>
        <div className="border-t border-gray-200 pt-16">
          <div className="grid grid-cols-12 gap-6">
            {articlesForCategory.slice(5).map((article, index) => (
              <div key={article.id} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <JapaneseMagazineItem 
                  article={article} 
                  size="compact"
                  number={String(index + 6).padStart(3, '0')}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function JapaneseMagazineItem({ 
  article, 
  size, 
  number 
}: { 
  article: any; 
  size: 'hero' | 'large' | 'medium' | 'compact';
  number: string;
}) {
  const sizeClasses = {
    hero: {
      container: 'group cursor-pointer',
      image: 'aspect-[3/2] mb-8',
      number: 'text-lg font-bold text-gray-400 mb-4 tracking-wider',
      title: 'text-4xl md:text-5xl font-bold leading-tight mb-6',
      description: 'text-xl text-gray-600 leading-relaxed mb-4',
      category: 'px-4 py-2 text-sm',
      source: 'text-sm'
    },
    large: {
      container: 'group cursor-pointer',
      image: 'aspect-[4/3] mb-6',
      number: 'text-base font-bold text-gray-400 mb-3 tracking-wider',
      title: 'text-2xl md:text-3xl font-bold leading-tight mb-4',
      description: 'text-lg text-gray-600 leading-relaxed mb-3',
      category: 'px-3 py-1 text-sm',
      source: 'text-xs'
    },
    medium: {
      container: 'group cursor-pointer',
      image: 'aspect-square mb-4',
      number: 'text-sm font-bold text-gray-400 mb-2 tracking-wider',
      title: 'text-xl font-bold leading-tight mb-3',
      description: 'text-sm text-gray-600 leading-relaxed mb-3',
      category: 'px-2 py-1 text-xs',
      source: 'text-xs'
    },
    compact: {
      container: 'group cursor-pointer',
      image: 'aspect-[3/2] mb-3',
      number: 'text-xs font-bold text-gray-400 mb-2 tracking-wider',
      title: 'text-base font-bold leading-tight mb-2',
      description: 'text-xs text-gray-600 leading-relaxed mb-2',
      category: 'px-2 py-1 text-xs',
      source: 'text-xs'
    }
  };

  const classes = sizeClasses[size];

  return (
    <a href={`/article/${article.slug}`} className={classes.container}>
      <article>
        {/* Article Number - Japanese Magazine Style */}
        <div className={`${classes.number} font-mono`}>
          {number}
        </div>

        {/* Image */}
        <div className={`${classes.image} overflow-hidden bg-gray-100 relative`}>
          <img
            src={article.imageUrl || 'https://placehold.co/800x600.png'}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Category overlay */}
          <div className="absolute top-4 left-4">
            <span className={`${classes.category} bg-black text-white font-bold uppercase tracking-wider`}>
              {article.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 
          className={`${classes.title} text-black group-hover:text-gray-600 transition-colors`}
          style={{ 
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            fontWeight: '800',
            lineHeight: '1.1'
          }}
        >
          {article.title}
        </h2>

        {/* Description */}
        <p className={classes.description}>
          {article.reason}
        </p>

        {/* Source and Sentiment Badge */}
        <div className="flex items-center justify-between">
          <span className={`${classes.source} text-gray-400 font-medium uppercase tracking-wide`}>
            {article.source}
          </span>
          
          {article.analysis.publicSentiment && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-500">SENTIMENT TRACKED</span>
            </div>
          )}
        </div>
      </article>
    </a>
  );
}

function JapaneseMagazineSkeleton() {
  return (
    <div className="space-y-24">
      {/* Hero Section Skeleton */}
      <section>
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-7">
            <Skeleton className="h-6 w-12 mb-4" />
            <Skeleton className="aspect-[3/2] mb-8" />
            <Skeleton className="h-8 w-20 mb-6" />
            <Skeleton className="h-16 w-full mb-6" />
            <Skeleton className="h-6 w-3/4" />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Skeleton className="h-5 w-10 mb-3" />
            <Skeleton className="aspect-[4/3] mb-6" />
            <Skeleton className="h-6 w-16 mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section>
        <div className="grid grid-cols-12 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="col-span-12 md:col-span-6 lg:col-span-4">
              <Skeleton className="h-4 w-8 mb-2" />
              <Skeleton className="aspect-square mb-4" />
              <Skeleton className="h-5 w-12 mb-3" />
              <Skeleton className="h-8 w-full mb-3" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
