'use client';

import { useSearchParams, notFound } from 'next/navigation';
import { createNewsBriefing } from '@/ai/flows/reformat-news-article';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

// Since we can't render the stream directly in a Server Component yet,
// we'll use a Client Component to handle the streaming.
function ArticlePage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const source = searchParams.get('source');
  const link = searchParams.get('link');
  const category = searchParams.get('category');

  if (!title || !description || !source || !link) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-8 md:py-16">
        <article className="max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
               <Badge variant="secondary">
                {source}
              </Badge>
              {category && (
                <Badge variant="outline">
                  {category}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-foreground leading-tight">
              {title}
            </h1>
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Read Original Article <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
           <Suspense fallback={<ArticleContentSkeleton />}>
            <ArticleContent title={title} description={description} source={source} />
          </Suspense>
        </article>
      </main>
    </div>
  );
}

function ArticleContent({ title, description, source }: { title: string, description: string, source: string }) {
  const { toast } = useToast();
  const [briefing, setBriefing] = useState<string | null>(null);

  useEffect(() => {
    async function getBriefing() {
      try {
        const result = await createNewsBriefing({ title, description, source });
        setBriefing(result.briefing);
      } catch (error) {
        console.error("Error creating news briefing:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not generate the AI news briefing. Please try again later.",
        });
        setBriefing("The AI briefing for this article could not be generated at this time.");
      }
    }
    getBriefing();
  }, [title, description, source, toast]);


  if (briefing === null) {
    return <ArticleContentSkeleton />;
  }

  // Simple markdown-to-paragraph formatter
  const paragraphs = briefing.split('\n').filter(p => p.trim() !== '');

  return (
     <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
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

// Next.js requires a default export for pages.
export default function ArticlePageContainer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticlePage />
    </Suspense>
  );
}
