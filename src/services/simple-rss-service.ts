// Firebase 없이 작동하는 간단한 RSS 뉴스 서비스
import Parser from 'rss-parser';

const parser = new Parser();

// RSS 피드 목록
const RSS_FEEDS = [
  {
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    source: 'BBC News',
    category: 'Politics'
  },
  {
    url: 'https://www.reuters.com/rssFeed/businessNews',
    source: 'Reuters',
    category: 'Business'
  },
  {
    url: 'https://rss.cnn.com/rss/edition.rss',
    source: 'CNN',
    category: 'Politics'
  }
];

export interface SimpleArticle {
  title: string;
  description: string;
  link: string;
  source: string;
  category: string;
  imageUrl?: string;
  slug: string;
  pubDate?: string;
}

// RSS 피드에서 뉴스 가져오기
export async function fetchSimpleNews(): Promise<SimpleArticle[]> {
  const allArticles: SimpleArticle[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`[RSS] Fetching from ${feed.source}...`);
      const feedData = await parser.parseURL(feed.url);
      
      const articles = feedData.items.slice(0, 5).map(item => ({
        title: item.title || 'No title',
        description: item.contentSnippet || item.content || 'No description',
        link: item.link || '#',
        source: feed.source,
        category: feed.category,
        imageUrl: extractImageFromContent(item.content || ''),
        slug: generateSlug(item.title || ''),
        pubDate: item.pubDate
      }));

      allArticles.push(...articles);
      console.log(`[RSS] Got ${articles.length} articles from ${feed.source}`);
      
    } catch (error) {
      console.error(`[RSS] Error fetching from ${feed.source}:`, error);
      // 에러가 발생해도 다른 피드는 계속 처리
    }
  }

  return allArticles;
}

// 간단한 AI 필터링 시뮬레이션
export function filterRelevantArticles(articles: SimpleArticle[]): SimpleArticle[] {
  // 실제로는 여기서 AI API 호출
  // 현재는 간단한 키워드 기반 필터링
  
  const relevantKeywords = [
    'AI', 'artificial intelligence', 'technology', 'innovation',
    'economy', 'business', 'market', 'trade',
    'climate', 'environment', 'politics', 'government'
  ];

  return articles.filter(article => {
    const text = `${article.title} ${article.description}`.toLowerCase();
    return relevantKeywords.some(keyword => text.includes(keyword.toLowerCase()));
  }).slice(0, 10); // 최대 10개만
}

// 이미지 URL 추출
function extractImageFromContent(content: string): string | undefined {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : undefined;
}

// 슬러그 생성
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
}

// 메모리 기반 간단한 캐시 (실제로는 Redis나 파일 시스템 사용)
let newsCache: SimpleArticle[] = [];
let lastUpdate: Date | null = null;

export function getCachedNews(): SimpleArticle[] {
  return newsCache;
}

export function setCachedNews(articles: SimpleArticle[]): void {
  newsCache = articles;
  lastUpdate = new Date();
  console.log(`[Cache] Cached ${articles.length} articles at ${lastUpdate.toISOString()}`);
}

export function getLastUpdateTime(): Date | null {
  return lastUpdate;
} 