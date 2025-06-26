import { notFound } from 'next/navigation';
import { generateArticleAnalysis, type GenerateArticleAnalysisOutput } from '@/ai/flows/reformat-news-article';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ArrowUpRight, LineChart, TableIcon, Newspaper, Scale, BarChartBig, Briefcase, Users, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchArticles } from '@/services/rss-service';
import { filterRelevantNews } from '@/ai/flows/filter-relevant-news';
import { FinancialChart } from './financial-chart';

// The page is now a Server Component by default.
// It receives searchParams as props, so we don't need 'use client' or the hook.
export default function ArticlePage({ searchParams }: {
  searchParams: { [key: string]: string | undefined }
}) {
  const title = searchParams.title;
  const description = searchParams.description;
  const source = searchParams.source;
  const link = searchParams.link;
  const category = searchParams.category;

  if (!title || !description || !source || !link || !category) {
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
            <ArticleContent title={title} description={description} source={source} category={category} />
          </Suspense>
        </article>
      </main>
    </div>
  );
}


// This component is async to fetch data on the server.
// It is correctly rendered within a Server Component tree, inside Suspense.
async function ArticleContent({ title, description, source, category }: { title: string, description: string, source: string, category: string }) {
  
  let data: GenerateArticleAnalysisOutput | null = null;
  
  try {
     // Fetch all articles to provide context to the AI
    // NOTE: In a production app, this would be inefficient. Caching or a more targeted approach would be better.
    const articlesToFilter = await fetchArticles();
    const filteredArticles = await filterRelevantNews({ articles: articlesToFilter.map(({ title, description, link, source }) => ({ title, description, link, source: source || '' })) });
    const allArticleTitles = filteredArticles.map(a => a.title);

    const primaryArticle = { title, description, source, category };
    
    data = await generateArticleAnalysis({ primaryArticle, allArticleTitles });
  } catch (error) {
    console.error("Error creating news analysis:", error);
    // We can't use the toast hook here since it's a server component.
    // We'll render an error message directly.
    return (
       <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Analysis Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The AI-powered analysis for this article could not be generated at this time. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return <ArticleContentSkeleton />;
  }
  
  const briefingParagraphs = data.briefing.split('\n').filter(p => p.trim() !== '');
  const editorsNoteParagraphs = data.editorsNote?.split('\n').filter(p => p.trim() !== '');

  const chartData = data.financials?.map(item => ({
    period: item.period,
    revenue: parseFloat(item.revenue.replace(/[^0-9.]/g, '')),
    profit: parseFloat(item.profit.replace(/[^0-9.]/g, '')),
  })).reverse();

  return (
    <div className="space-y-8">
      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        {briefingParagraphs.map((p, i) => (
          <p key={`briefing-${i}`}>{p}</p>
        ))}
      </div>

      {editorsNoteParagraphs && editorsNoteParagraphs.length > 0 && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <Newspaper className="h-5 w-5" />
              Editor's Note
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
             {editorsNoteParagraphs.map((p, i) => (
              <p key={`note-${i}`}>{p}</p>
            ))}
          </CardContent>
        </Card>
      )}
      
      {data.financials && data.financials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Latest Revenue</CardTitle>
                    <Scale className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.financials[0].revenue}</div>
                    <p className="text-xs text-muted-foreground">{data.financials[0].change} from last quarter</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Latest Profit</CardTitle>
                    <BarChartBig className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.financials[0].profit}</div>
                    <p className="text-xs text-muted-foreground">Latest reported quarter</p>
                </CardContent>
            </Card>
        </div>
      )}

      {data.marketSnapshot && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-headline">
                    <Briefcase className="h-5 w-5" />
                    Market Snapshot
                </CardTitle>
            </Header>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="flex items-center gap-2 font-semibold"><TrendingUp className="h-4 w-4" /> Sector Outlook</h3>
                    <p className="text-muted-foreground mt-1">{data.marketSnapshot.sectorOutlook}</p>
                </div>
                <div>
                    <h3 className="flex items-center gap-2 font-semibold"><Users className="h-4 w-4" /> Key Competitors</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {data.marketSnapshot.keyCompetitors.map(c => <Badge key={c} variant="outline">{c}</Badge>)}
                    </div>
                </div>
                <div>
                    <h3 className="flex items-center gap-2 font-semibold"><Star className="h-4 w-4" /> Analyst's Take</h3>
                    <p className="text-muted-foreground mt-1 prose prose-sm">{data.marketSnapshot.analystsTake}</p>
                </div>
            </CardContent>
        </Card>
      )}

      {data.outlook && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <LineChart className="h-5 w-5" />
              Future Outlook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground prose prose-sm">{data.outlook}</p>
          </CardContent>
        </Card>
      )}

      {data.financials && data.financials.length > 0 && (
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <TableIcon className="h-5 w-5" />
              Financial History
            </CardTitle>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.financials.map((item) => (
                    <TableRow key={item.period}>
                      <TableCell className="font-medium">{item.period}</TableCell>
                      <TableCell>{item.revenue}</TableCell>
                      <TableCell>{item.profit}</TableCell>
                      <TableCell>{item.change}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      )}

      <FinancialChart data={chartData} />

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
      <Card className="bg-secondary/50">
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-10/12" />
        </CardContent>
      </Card>
       <br/>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-8/12" />
    </div>
  )
}
