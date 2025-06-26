export type Region = {
  id: string;
  name: string;
  url: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Article = {
  title: string;
  description:string;
  link: string;
  source: string;
  imageUrl?: string;
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
  category: string;
  imageUrl?: string;
  slug: string;
};
