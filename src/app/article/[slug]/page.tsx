'use client';

import { useSearchParams, notFound } from 'next/navigation';
import { createNewsBriefing, type CreateNewsBriefingOutput } from '@/ai/flows/reformat-news-article';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ArrowUpRight, LineChart, TableIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


// Since we can't render the stream directly in a Server Component yet,
// we'll use a Client Component to handle the streaming.
function ArticlePage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const source = searchParams.get('source');
  const link = searchParams.get('link');
  const category = searchParams.get('category');
  const companyName = searchParams.get('companyName') || undefined;


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
            <ArticleContent title={title} description={description} source={source} category={category} companyName={companyName} />
          </Suspense>
        </article>
      </main>
    </div>
  );
}

function ArticleContent({ title, description, source, category, companyName }: { title: string, description: string, source: string, category: string, companyName?: string }) {
  const { toast } = useToast();
  const [data, setData] = useState<CreateNewsBriefingOutput | null>(null);

  useEffect(() => {
    async function getBriefing() {
      try {
        const result = await createNewsBriefing({ title, description, source, category, companyName });
        setData(result);
      } catch (error) {
        console.error("Error creating news briefing:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not generate the AI news briefing. Please try again later.",
        });
        setData({briefing: "The AI briefing for this article could not be generated at this time."});
      }
    }
    getBriefing();
  }, [title, description, source, category, companyName, toast]);


  if (data === null) {
    return <ArticleContentSkeleton />;
  }
  
  const briefingParagraphs = data.briefing.split('\n').filter(p => p.trim() !== '');

  const chartData = data.financials?.map(item => ({
    period: item.period,
    revenue: parseFloat(item.revenue.replace(/[^0-9.]/g, '')),
    profit: parseFloat(item.profit.replace(/[^0-9.]/g, '')),
  }));

  const chartConfig = {
    revenue: {
      label: "Revenue (M)",
      color: "hsl(var(--chart-1))",
    },
    profit: {
      label: "Profit (M)",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-8">
      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        {briefingParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {data.outlook && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <LineChart className="h-5 w-5" />
              Future Outlook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{data.outlook}</p>
          </CardContent>
        </Card>
      )}

      {data.financials && data.financials.length > 0 && (
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <TableIcon className="h-5 w-5" />
              Financial Snapshot
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

      {chartData && chartData.length > 0 && (
        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2 text-xl font-headline">
              <LineChart className="h-5 w-5" />
              Financial Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

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
