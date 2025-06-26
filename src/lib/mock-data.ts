import type { Category, Region } from './types';

export const FEEDS: Region[] = [
  { id: 'USA', name: 'NYT', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
  { id: 'World', name: 'BBC', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
  { id: 'Korea', name: 'Korea Herald', url: 'http://www.koreaherald.com/rss/02/020100000000.xml' },
  { id: 'China', name: 'China Daily', url: 'http://www.chinadaily.com.cn/rss/world_rss.xml' },
  { id: 'Japan', name: 'Japan Times', url: 'https://www.japantimes.co.jp/feed/top-stories/' },
  { id: 'France', name: 'France 24', url: 'https://www.france24.com/en/rss' },
  { id: 'Saudi_Arabia', name: 'Arab News', url: 'https://www.arabnews.com/rss.xml' },
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Top Stories' },
  { id: 'Politics', name: 'Politics' },
  { id: 'Business', name: 'Business' },
];
