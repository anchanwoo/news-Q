export type Region = {
  id: string;
  name: string;
};

export const REGIONS: Region[] = [
  { id: 'all', name: 'Top Stories' },
  { id: 'USA', name: 'USA' },
  { id: 'Korea', name: 'Korea' },
  { id: 'China', name: 'China' },
  { id: 'Japan', name: 'Japan' },
  { id: 'Saudi Arabia', name: 'Saudi Arabia' },
];

export type Article = {
  title: string;
  description: string;
  link: string;
  source: string;
  slug: string;
  fullContent?: string;
};

export type FilteredArticle = {
  title: string;
  description: string;
  link: string;
  source: string;
  relevanceScore: number;
  reason: string;
};
