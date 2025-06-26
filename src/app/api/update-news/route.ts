// /src/app/api/update-news/route.ts
import { NextResponse } from 'next/server';
import { mockNews } from '@/lib/mock-news';

// This tells Next.js to run this route as a dynamic function, not a static page.
export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('[News Update] Starting news update process...');

  try {
    // 실제 서비스에서는 여기서 RSS 피드를 가져오고 AI로 분석
    // 현재는 목업 데이터로 시뮬레이션

    console.log('[News Update] Simulating RSS feed fetch...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기

    console.log('[News Update] Simulating AI analysis...');
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기

    console.log('[News Update] Simulating database save...');
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 대기

    const response = {
      success: true,
      message: 'News update completed successfully (simulated)',
      timestamp: new Date().toISOString(),
      articlesProcessed: mockNews.length,
      details: {
        rssFeeds: ['BBC', 'Reuters', 'AP News', 'Korea Herald'],
        aiAnalysis: 'Completed with web search enhancement',
        categories: ['Technology', 'Business', 'Politics'],
        totalTime: '3.5 seconds (simulated)'
      },
      articles: mockNews.map(article => ({
        title: article.title,
        category: article.category,
        source: article.source,
        relevanceScore: article.relevanceScore
      }))
    };

    console.log('[News Update] Process completed successfully');
    return NextResponse.json(response);

  } catch (error) {
    console.error('[News Update] Error occurred:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'News update failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}

// POST 방법으로도 테스트할 수 있도록 추가
export async function POST() {
  return GET(); // 같은 로직 사용
}
