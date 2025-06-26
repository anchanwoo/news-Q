import type { Category, Region } from './types';

export const FEEDS: Region[] = [
  { id: 'all', name: 'World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
  { id: 'USA', name: 'USA', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
  { id: 'Korea', name: 'Korea', url: 'http://www.koreaherald.com/rss/02/020100000000.xml' },
  { id: 'China', name: 'China', url: 'http://www.chinadaily.com.cn/rss/world_rss.xml' },
  { id: 'Japan', name: 'Japan', url: 'https://www.japantimes.co.jp/feed/top-stories/' },
  { id: 'MidEast', name: 'Middle East', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Top Stories' },
  { id: 'Politics', name: 'Politics' },
  { id: 'Business', name: 'Business' },
];
