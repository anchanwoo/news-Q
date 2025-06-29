'use server';
import Parser from 'rss-parser';
import type { Article } from '@/lib/types';
import { FEEDS } from '@/lib/mock-data';
import { slugify } from '@/lib/utils';

const parser = new Parser({
  customFields: {
    item: [['media:content', 'mediaContent']],
  }
});

function extractImageUrl(item: Parser.Item): string | undefined {
    // Standard media:content
    if (item.mediaContent?.$?.url) {
      return item.mediaContent.$.url;
    }
    // Check for enclosure
    if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
        return item.enclosure.url;
    }
    // Look for image in content
    if(item.content) {
        const match = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (match) {
            return match[1];
        }
    }
    return undefined;
}


export async function fetchArticles(): Promise<Article[]> {
  const urls = FEEDS.map(f => ({ url: f.url, name: f.name })) ;

  const allArticles: Article[] = [];
  
  await Promise.all(urls.map(async (feedInfo) => {
    try {
      const feed = await parser.parseURL(feedInfo.url);
      const articles = feed.items.map(item => {
        const title = (item.title || 'No title').trim();
        const description = (item.contentSnippet || item.content?.replace(/<[^>]*>?/gm, '') || 'No description available.').trim();
        const link = (item.link || '').trim();
        const imageUrl = extractImageUrl(item);
        const slug = title !== 'No title' ? slugify(title) : (Math.random().toString(36).substring(7));
        
        return {
          title,
          description,
          link,
          source: feedInfo.name,
          imageUrl: imageUrl,
          slug: slug,
          fullContent: (item['content:encoded'] || item.content || '').trim(),
        }
      }).filter(article => article.link && article.title !== 'No title');

      allArticles.push(...articles);
    } catch (error)
    {
      // Silently fail for individual feed errors
      // console.error(`Failed to fetch RSS feed from ${feedInfo.url}:`, error);
    }
  }));

  // Simple deduplication based on article link
  const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.link, item])).values());
  
  return uniqueArticles;
}
