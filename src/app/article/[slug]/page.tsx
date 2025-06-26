import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock, Calendar, User, TrendingUp, BarChart3 } from 'lucide-react';
import { getMockArticleBySlug } from '@/lib/mock-news';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  if (!slug) {
    notFound();
  }
  
  const article = await getMockArticleBySlug(slug);

  if (!article) {
    notFound();
  }
  
  const placeholderImage = `https://placehold.co/1200x630.png`;
  const briefingParagraphs = article.analysis.briefing.split('\n').filter((p: string) => p.trim() !== '');
  const editorsNoteParagraphs = article.analysis.editorsNote?.split('\n').filter((p: string) => p.trim() !== '');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Magazine Article Layout */}
      <article className="max-w-5xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-black text-black">
              {article.category}
            </Badge>
            <span className="text-sm text-gray-600 font-medium">{article.source}</span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-3 w-3" />
              <span>5 min read</span>
            </div>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-black"
            style={{ 
              fontFamily: '"Inter", "Helvetica Neue", sans-serif',
              fontWeight: '800',
              letterSpacing: '-0.02em'
            }}
          >
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl">
            {article.reason}
          </p>
          
          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-gray-600 transition-colors border-b border-black hover:border-gray-600"
          >
            Read Original Source <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>

        {/* Hero Image */}
        <div className="mb-16">
          <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
            <Image
              src={article.imageUrl || placeholderImage}
              alt={article.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Article Content */}
          <div className="lg:col-span-8">
            {/* Briefing Section */}
            <section className="mb-16">
              <h2 
                className="text-2xl font-bold mb-6 text-black"
                style={{ 
                  fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                  fontWeight: '700'
                }}
              >
                Analysis
              </h2>
              <div className="prose prose-lg max-w-none">
                {briefingParagraphs.map((p: string, i: number) => (
                  <p key={`briefing-${i}`} className="text-gray-800 leading-relaxed mb-6 text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Editor's Note */}
            {editorsNoteParagraphs && editorsNoteParagraphs.length > 0 && (
              <section className="mb-16 border-l-4 border-black pl-8">
                <h3 
                  className="text-xl font-bold mb-4 text-black"
                  style={{ 
                    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                    fontWeight: '700'
                  }}
                >
                  Editor's Perspective
                </h3>
                <div className="space-y-4">
                  {editorsNoteParagraphs.map((p: string, i: number) => (
                    <p key={`note-${i}`} className="text-gray-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Global Perspectives */}
            {article.analysis.povCrossfire && (
              <section className="mb-16">
                <h3 
                  className="text-xl font-bold mb-6 text-black"
                  style={{ 
                    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                    fontWeight: '700'
                  }}
                >
                  Global Perspectives
                </h3>
                <div className="bg-gray-50 p-8 rounded-none">
                  <div className="space-y-4 mb-6">
                    {article.analysis.povCrossfire.analysis?.split('\n').filter((p: string) => p.trim() !== '').map((p: string, i: number) => (
                      <p key={`crossfire-${i}`} className="text-gray-800 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-black uppercase tracking-wide">
                      Related Coverage
                    </h4>
                    <div className="space-y-2">
                      {article.analysis.povCrossfire.comparedArticles?.map((compArticle: any, i: number) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                          <span className="text-gray-800 font-medium">{compArticle.title}</span>
                          <span className="text-sm text-gray-500">{compArticle.source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Public Sentiment Analysis Section */}
            {article.analysis.publicSentiment && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-200">
                  PUBLIC SENTIMENT ANALYSIS
                </h2>
                
                <div className="mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {article.analysis.publicSentiment.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {article.analysis.publicSentiment.platforms.map((platform, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">{platform.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            platform.sentiment === 'Optimistic' || platform.sentiment === 'Enthusiastic' || platform.sentiment === 'Hopeful' || platform.sentiment === 'Inspiring' ? 'bg-green-400' :
                            platform.sentiment === 'Mixed' || platform.sentiment === 'Interested' || platform.sentiment === 'Analytical' || platform.sentiment === 'Professional' || platform.sentiment === 'Supportive' ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-600">
                            {platform.sentiment}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Sentiment Score</span>
                          <span className="font-bold">{platform.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              platform.percentage >= 70 ? 'bg-green-400' :
                              platform.percentage >= 50 ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                            style={{ width: `${platform.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <blockquote className="text-sm text-gray-600 italic border-l-4 border-gray-300 pl-4">
                        "{platform.sample}"
                      </blockquote>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    AI ANALYSIS METHODOLOGY
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our AI system analyzes thousands of comments, posts, and discussions from major online communities worldwide. 
                    Sentiment analysis is performed using advanced natural language processing, considering cultural context, 
                    linguistic nuances, and platform-specific communication patterns. Data is updated every 6 hours to reflect 
                    real-time public opinion trends.
                  </p>
                </div>
              </section>
            )}

            {/* Financial Data Section */}
            {article.analysis.financials && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-200">
                  FINANCIAL DATA
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-2 font-bold">PERIOD</th>
                        <th className="text-left py-4 px-2 font-bold">REVENUE</th>
                        <th className="text-left py-4 px-2 font-bold">PROFIT</th>
                        <th className="text-left py-4 px-2 font-bold">CHANGE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {article.analysis.financials.map((data, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-4 px-2 font-medium">{data.period}</td>
                          <td className="py-4 px-2">{data.revenue}</td>
                          <td className="py-4 px-2">{data.profit}</td>
                          <td className={`py-4 px-2 font-bold ${
                            data.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {data.change}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {article.analysis.marketSnapshot && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold mb-2">KEY COMPETITORS</h4>
                      <ul className="text-sm text-gray-600">
                        {article.analysis.marketSnapshot.keyCompetitors.map((competitor, index) => (
                          <li key={index} className="mb-1">• {competitor}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold mb-2">SECTOR OUTLOOK</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {article.analysis.marketSnapshot.sectorOutlook}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold mb-2">ANALYSTS' TAKE</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {article.analysis.marketSnapshot.analystsTake}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* Key People */}
            {article.analysis.keyFigures && article.analysis.keyFigures.length > 0 && (
              <section className="mb-12">
                <h3 
                  className="text-lg font-bold mb-6 text-black flex items-center gap-2"
                  style={{ 
                    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                    fontWeight: '700'
                  }}
                >
                  <User className="h-4 w-4" />
                  Key People
                </h3>
                <div className="space-y-6">
                  {article.analysis.keyFigures.map((figure: any) => (
                    <div key={figure.name} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <h4 className="font-semibold text-black mb-2">{figure.name}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{figure.profile}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Timeline */}
            {article.analysis.timeline && article.analysis.timeline.length > 0 && (
              <section className="mb-12">
                <h3 
                  className="text-lg font-bold mb-6 text-black flex items-center gap-2"
                  style={{ 
                    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                    fontWeight: '700'
                  }}
                >
                  <Calendar className="h-4 w-4" />
                  Timeline
                </h3>
                <div className="space-y-4">
                  {article.analysis.timeline.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-20 flex-shrink-0">
                        <span className="text-sm font-medium text-black">{item.date}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Market Snapshot */}
            {article.analysis.marketSnapshot && (
              <section className="mb-12">
                <h3 
                  className="text-lg font-bold mb-6 text-black flex items-center gap-2"
                  style={{ 
                    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                    fontWeight: '700'
                  }}
                >
                  <TrendingUp className="h-4 w-4" />
                  Market Insight
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-black mb-2">Sector Outlook</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{article.analysis.marketSnapshot.sectorOutlook}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-2">Key Competitors</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.analysis.marketSnapshot.keyCompetitors.map((c: string) => (
                        <Badge key={c} variant="outline" className="text-xs border-gray-300 text-gray-700">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-2">Analyst's Take</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{article.analysis.marketSnapshot.analystsTake}</p>
                  </div>
                </div>
              </section>
            )}
          </aside>
        </div>

        {/* Future Outlook */}
        {article.analysis.outlook && (
          <section className="mt-16 pt-16 border-t border-gray-200">
            <h2 
              className="text-2xl font-bold mb-6 text-black"
              style={{ 
                fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                fontWeight: '700'
              }}
            >
              Future Outlook
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
              {article.analysis.outlook}
            </p>
          </section>
        )}
      </article>
    </div>
  );
}
