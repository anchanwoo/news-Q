import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, GitCompareArrows, LineChart, TableIcon, Newspaper, Scale, BarChartBig, Briefcase, Users, Star, TrendingUp, CalendarClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMockArticleBySlug } from '@/lib/mock-news';
import { FinancialChart } from './financial-chart';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  if (!slug) {
    notFound();
  }
  
  // Firebase 대신 목업 데이터 사용
  const article = await getMockArticleBySlug(slug);

  if (!article) {
    notFound();
  }
  
  const placeholderImage = `https://placehold.co/1200x630.png`;

  const briefingParagraphs = article.analysis.briefing.split('\n').filter(p => p.trim() !== '');
  const editorsNoteParagraphs = article.analysis.editorsNote?.split('\n').filter(p => p.trim() !== '');
  const povCrossfireAnalysisParagraphs = article.analysis.povCrossfire?.analysis?.split('\n').filter((p: string) => p.trim() !== '');

  const chartData = article.analysis.financials?.map(item => ({
    period: item.period,
    revenue: parseFloat(item.revenue.replace(/[^0-9.]/g, '')),
    profit: parseFloat(item.profit.replace(/[^0-9.]/g, '')),
  })).reverse();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-8 md:py-16">
        <article className="max-w-3xl mx-auto px-4">
           <div className="mb-8">
             <div className="flex items-center gap-2 mb-4">
               <Badge variant="secondary">{article.source}</Badge>
               {article.category && <Badge variant="outline">{article.category}</Badge>}
             </div>
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-foreground leading-tight">
               {article.title}
             </h1>
             <Link
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Read Original Article <ArrowUpRight className="h-4 w-4" />
            </Link>
           </div>
           
          <div className="mb-8 overflow-hidden rounded-lg relative aspect-video">
            <Image
              src={article.imageUrl || placeholderImage}
              alt={article.title}
              className="object-cover"
              data-ai-hint="news headline"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

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

            {article.analysis.povCrossfire && (
              <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-headline">
                    <GitCompareArrows className="h-5 w-5" />
                    POV Crossfire
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        {povCrossfireAnalysisParagraphs?.map((p: string, i: number) => (
                            <p key={`crossfire-${i}`}>{p}</p>
                        ))}
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm mb-2 mt-4">Compared Articles:</h4>
                        <ul className="list-none space-y-2">
                            {article.analysis.povCrossfire.comparedArticles?.map((compArticle: any, i: number) => (
                                <li key={i} className="text-sm text-muted-foreground border-l-2 pl-3 border-primary/30">
                                    <span className="font-medium text-foreground">{compArticle.title}</span>
                                    <span className="text-xs"> — {compArticle.source}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
              </Card>
            )}

            {article.analysis.keyFigures && article.analysis.keyFigures.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-headline">
                    <Users className="h-5 w-5" />
                    Key Figures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {article.analysis.keyFigures.map((figure: any) => (
                    <div key={figure.name}>
                      <h3 className="font-semibold">{figure.name}</h3>
                      <p className="text-muted-foreground mt-1 prose prose-sm">{figure.profile}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {article.analysis.timeline && article.analysis.timeline.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-headline">
                            <CalendarClock className="h-5 w-5" />
                            Event Timeline
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative pl-6">
                            <div className="absolute left-[1px] top-1 h-full w-0.5 bg-border -translate-x-1/2"></div>
                            {article.analysis.timeline.map((item: any, index: number) => (
                                <div key={index} className="relative flex items-start pb-8 last:pb-0">
                                    <div className="absolute left-[1px] top-1.5 h-3 w-3 rounded-full bg-primary -translate-x-1/2 border-4 box-content border-background"></div>
                                    <div className="pl-8">
                                        <p className="font-semibold text-sm">{item.date}</p>
                                        <p className="text-muted-foreground text-sm">{item.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {article.analysis.financials && article.analysis.financials.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Latest Revenue</CardTitle>
                          <Scale className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                          <div className="text-2xl font-bold">{article.analysis.financials[0].revenue}</div>
                          <p className="text-xs text-muted-foreground">{article.analysis.financials[0].change} from last quarter</p>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Latest Profit</CardTitle>
                          <BarChartBig className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                          <div className="text-2xl font-bold">{article.analysis.financials[0].profit}</div>
                          <p className="text-xs text-muted-foreground">Latest reported quarter</p>
                      </CardContent>
                  </Card>
              </div>
            )}

            {article.analysis.marketSnapshot && (
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl font-headline">
                          <Briefcase className="h-5 w-5" />
                          Market Snapshot
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                      <div>
                          <h3 className="flex items-center gap-2 font-semibold"><TrendingUp className="h-4 w-4" /> Sector Outlook</h3>
                          <p className="text-muted-foreground mt-1">{article.analysis.marketSnapshot.sectorOutlook}</p>
                      </div>
                      <div>
                          <h3 className="flex items-center gap-2 font-semibold"><Users className="h-4 w-4" /> Key Competitors</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                              {article.analysis.marketSnapshot.keyCompetitors.map((c: string) => <Badge key={c} variant="outline">{c}</Badge>)}
                          </div>
                      </div>
                      <div>
                          <h3 className="flex items-center gap-2 font-semibold"><Star className="h-4 w-5" /> Analyst's Take</h3>
                          <p className="text-muted-foreground mt-1 prose prose-sm">{article.analysis.marketSnapshot.analystsTake}</p>
                      </div>
                  </CardContent>
              </Card>
            )}

            {article.analysis.outlook && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-headline">
                    <LineChart className="h-5 w-5" />
                    Future Outlook
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground prose prose-sm">{article.analysis.outlook}</p>
                </CardContent>
              </Card>
            )}

            {article.analysis.financials && article.analysis.financials.length > 0 && (
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
                        {article.analysis.financials.map((item: any) => (
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
        </article>
      </main>
    </div>
  );
}
