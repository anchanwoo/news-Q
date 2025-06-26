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

export async function fetchArticles(regionId: string = 'all'): Promise<Article[]> {
  const allFeeds = FEEDS.find(f => f.id === 'all')!;
  let feedConfig = FEEDS.find(f => f.id === regionId);

  if (!feedConfig?.url) {
    feedConfig = allFeeds;
  }
  
  const urls = regionId === 'all' 
    ? FEEDS.filter(f => f.id !== 'all').map(f => ({ url: f.url, name: f.name })) 
    : [{ url: feedConfig.url, name: feedConfig.name }];

  const allArticles: Article[] = [];
  
  await Promise.all(urls.map(async (feedInfo) => {
    try {
      const feed = await parser.parseURL(feedInfo.url);
      const articles = feed.items.map(item => {
        const title = (item.title || 'No title').trim();
        const description = (item.contentSnippet || item.content?.replace(/<[^>]*>?/gm, '') || 'No description available.').trim();
        const link = (item.link || '').trim();

        return {
          title,
          description,
          link,
          source: feedInfo.name,
          slug: title !== 'No title' ? slugify(title) : (Math.random().toString(36).substring(7)),
          fullContent: (item['content:encoded'] || item.content || '').trim(),
        }
      }).filter(article => article.link && article.title !== 'No title');

      allArticles.push(...articles);
    } catch (error) {
      console.error(`Failed to fetch RSS feed from ${feedInfo.url}:`, error);
    }
  }));

  // Simple deduplication based on article link
  const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.link, item])).values());
  
  return uniqueArticles;
}
