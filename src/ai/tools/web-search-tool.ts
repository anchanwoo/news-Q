/**
 * @fileOverview Web search tool for gathering additional context and information
 * for news analysis using SerpAPI or similar web search service.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Web search result schema
const WebSearchResultSchema = z.object({
  title: z.string().describe('The title of the search result'),
  link: z.string().describe('The URL of the search result'),
  snippet: z.string().describe('A brief snippet/description of the content'),
  source: z.string().describe('The domain/source of the result'),
  date: z.string().optional().describe('Publication date if available'),
});

const WebSearchResponseSchema = z.object({
  results: z.array(WebSearchResultSchema).describe('Array of search results'),
  totalResults: z.number().describe('Total number of results found'),
  searchTerm: z.string().describe('The search term that was used'),
});

// Web search tool definition
export const webSearchTool = ai.defineTool(
  {
    name: 'webSearch',
    description: 'Search the web for additional context, background information, or related news about a topic. Useful for gathering more comprehensive information for news analysis.',
    inputSchema: z.object({
      query: z.string().describe('The search query to find relevant information'),
      maxResults: z.number().default(10).describe('Maximum number of results to return (default: 10)'),
      timeframe: z.enum(['day', 'week', 'month', 'year', 'all']).default('month').describe('Time range for search results'),
    }),
    outputSchema: WebSearchResponseSchema,
  },
  async ({ query, maxResults = 10, timeframe = 'month' }) => {
    try {
      console.log(`[WebSearch] Searching for: "${query}" (max: ${maxResults}, timeframe: ${timeframe})`);

      // SerpAPI를 사용한 웹 검색 (API 키가 있는 경우)
      if (process.env.SERPAPI_API_KEY) {
        return await searchWithSerpAPI(query, maxResults, timeframe);
      }
      
      // DuckDuckGo API를 사용한 무료 검색 (백업)
      return await searchWithDuckDuckGo(query, maxResults);
      
    } catch (error) {
      console.error('[WebSearch] Search failed:', error);
      
      // 검색 실패 시 빈 결과 반환
      return {
        results: [],
        totalResults: 0,
        searchTerm: query,
      };
    }
  }
);

// SerpAPI를 사용한 검색 (유료, 더 정확함)
async function searchWithSerpAPI(query: string, maxResults: number, timeframe: string) {
  const apiKey = process.env.SERPAPI_API_KEY;
  const timeMap: Record<string, string> = {
    day: 'd1',
    week: 'w1', 
    month: 'm1',
    year: 'y1',
    all: ''
  };

  const params = new URLSearchParams({
    engine: 'google',
    q: query,
    api_key: apiKey!,
    num: maxResults.toString(),
    hl: 'en',
    gl: 'us',
    ...(timeframe !== 'all' && { tbs: `qdr:${timeMap[timeframe]}` }),
  });

  const response = await fetch(`https://serpapi.com/search?${params}`);
  
  if (!response.ok) {
    throw new Error(`SerpAPI request failed: ${response.status}`);
  }

  const data = await response.json();
  
  const results = (data.organic_results || []).map((result: any) => ({
    title: result.title || '',
    link: result.link || '',
    snippet: result.snippet || '',
    source: extractDomain(result.link || ''),
    date: result.date || undefined,
  }));

  return {
    results,
    totalResults: data.search_information?.total_results || results.length,
    searchTerm: query,
  };
}

// DuckDuckGo를 사용한 무료 검색 (백업 옵션)
async function searchWithDuckDuckGo(query: string, maxResults: number) {
  try {
    // DuckDuckGo Instant Answer API 사용
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
    );
    
    if (!response.ok) {
      throw new Error(`DuckDuckGo request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // DuckDuckGo API는 제한적이므로 기본 결과만 반환
    const results = [];
    
    if (data.AbstractText) {
      results.push({
        title: data.Heading || query,
        link: data.AbstractURL || '',
        snippet: data.AbstractText,
        source: data.AbstractSource || 'DuckDuckGo',
        date: undefined,
      });
    }

    // Related topics 추가
    if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
      data.RelatedTopics.slice(0, maxResults - 1).forEach((topic: any) => {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text.split(' - ')[0] || topic.Text,
            link: topic.FirstURL,
            snippet: topic.Text,
            source: extractDomain(topic.FirstURL),
            date: undefined,
          });
        }
      });
    }

    return {
      results: results.slice(0, maxResults),
      totalResults: results.length,
      searchTerm: query,
    };
    
  } catch (error) {
    console.error('[WebSearch] DuckDuckGo search failed:', error);
    
    // 모든 검색이 실패한 경우 빈 결과 반환
    return {
      results: [],
      totalResults: 0,
      searchTerm: query,
    };
  }
}

// URL에서 도메인 추출
function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return 'Unknown';
  }
}

// 뉴스 관련 검색을 위한 헬퍼 함수
export function createNewsSearchQuery(articleTitle: string, category: string): string {
  // 기사 제목에서 핵심 키워드 추출
  const keywords = articleTitle
    .replace(/[^\w\s]/g, '') // 특수문자 제거
    .split(' ')
    .filter(word => word.length > 3) // 3글자 이상 단어만
    .slice(0, 5) // 최대 5개 키워드
    .join(' ');
  
  // 카테고리에 따른 검색 쿼리 최적화
  const categoryModifiers: Record<string, string> = {
    'Business': 'company financial news',
    'Politics': 'political news analysis',
    'Technology': 'tech industry news',
    'Sports': 'sports news',
    'Entertainment': 'entertainment news',
  };
  
  const modifier = categoryModifiers[category] || 'news';
  return `${keywords} ${modifier}`;
}

export type WebSearchResult = z.infer<typeof WebSearchResultSchema>;
export type WebSearchResponse = z.infer<typeof WebSearchResponseSchema>; 