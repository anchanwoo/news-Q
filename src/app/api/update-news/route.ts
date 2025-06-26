// /src/app/api/update-news/route.ts
import { NextResponse } from 'next/server';
import { fetchArticles } from '@/services/rss-service';
import { filterRelevantNews } from '@/ai/flows/filter-relevant-news';
import { generateArticleAnalysis } from '@/ai/flows/reformat-news-article';
import { cacheArticles, type AnalyzedArticle } from '@/services/firebase-service';
import { type FilteredArticle } from '@/lib/types';

// This tells Next.js to run this route as a dynamic function, not a static page.
export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('[Cron Job] Starting daily news update...');

  try {
    // 1. Fetch raw articles from all RSS feeds
    const rawArticles = await fetchArticles();
    console.log(`[Cron Job] Fetched ${rawArticles.length} raw articles.`);

    // 2. Filter for the most relevant articles using AI
    const filteredArticles = await filterRelevantNews({
      articles: rawArticles.map(({ title, description, link, source, imageUrl, slug }) => ({ 
        title: title || '', 
        description: description || '', 
        link: link || '', 
        source: source || '',
        imageUrl: imageUrl,
        slug: slug,
      })),
    });

    if (!filteredArticles || filteredArticles.length === 0) {
      console.log('[Cron Job] AI did not identify any relevant articles. Ending job.');
      return NextResponse.json({ success: true, message: 'No relevant articles found.' });
    }

    console.log(`[Cron Job] AI filtered down to ${filteredArticles.length} relevant articles.`);

    // 3. For each relevant article, generate an in-depth analysis
    // We do this in parallel to speed up the process.
    const analysisPromises = filteredArticles.map(async (article: FilteredArticle): Promise<AnalyzedArticle | null> => {
      try {
        console.log(`[Cron Job] Analyzing: "${article.title}"`);
        const analysis = await generateArticleAnalysis({
          primaryArticle: {
            title: article.title,
            description: article.description,
            source: article.source,
            category: article.category,
          },
          // Provide all other headlines for context
          allArticleTitles: filteredArticles.map(a => a.title),
        });

        return {
          ...article,
          analysis,
        };
      } catch (analysisError) {
        console.error(`[Cron Job] Failed to analyze article "${article.title}":`, analysisError);
        return null; // Skip articles that fail analysis
      }
    });

    const analyzedArticles = (await Promise.all(analysisPromises)).filter(Boolean) as AnalyzedArticle[];
    console.log(`[Cron Job] Successfully analyzed ${analyzedArticles.length} articles.`);
    
    // 4. Sort the final list by relevance score (descending)
    const sortedArticles = analyzedArticles.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // 5. Cache the final, analyzed articles in Firestore
    await cacheArticles(sortedArticles);
    console.log('[Cron Job] Successfully cached all articles to Firestore.');

    return NextResponse.json({ success: true, count: sortedArticles.length });
  } catch (error) {
    console.error('[Cron Job] An unexpected error occurred:', error);
    // Return a 500 error response to indicate failure
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
