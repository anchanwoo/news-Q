import { NextRequest, NextResponse } from 'next/server';
import { webSearchTool, createNewsSearchQuery } from '@/ai/tools/web-search-tool';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'AI news technology';
    const maxResults = parseInt(searchParams.get('max') || '5');
    const timeframe = searchParams.get('timeframe') || 'week';

    console.log(`[Test Search] Testing web search with query: "${query}"`);

    // 웹 검색 도구 테스트
    const searchResult = await webSearchTool({
      query,
      maxResults,
      timeframe: timeframe as 'day' | 'week' | 'month' | 'year' | 'all',
    });

    // 결과 포맷팅
    const formattedResults = {
      success: true,
      searchTerm: searchResult.searchTerm,
      totalResults: searchResult.totalResults,
      results: searchResult.results.map(result => ({
        title: result.title,
        source: result.source,
        snippet: result.snippet.substring(0, 200) + '...',
        link: result.link,
        date: result.date,
      })),
      apiStatus: {
        serpApiAvailable: !!process.env.SERPAPI_API_KEY,
        usingBackup: !process.env.SERPAPI_API_KEY,
      },
    };

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error('[Test Search] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Search test failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // 뉴스 검색 쿼리 생성 테스트
    const searchQuery = createNewsSearchQuery(title, category || 'General');
    
    console.log(`[Test Search] Generated search query for "${title}": "${searchQuery}"`);

    // 생성된 쿼리로 검색 실행
    const searchResult = await webSearchTool({
      query: searchQuery,
      maxResults: 5,
      timeframe: 'week',
    });

    return NextResponse.json({
      success: true,
      originalTitle: title,
      category: category || 'General',
      generatedQuery: searchQuery,
      searchResults: searchResult,
    });
  } catch (error) {
    console.error('[Test Search] POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Search query generation test failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 