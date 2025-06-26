export type Region = {
  id: string;
  name: string;
  url: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
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

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  link: string;
  imageUrl?: string;
  publishedAt?: string;
  slug: string;
  relevanceScore: number;
  reason: string;
  analysis: {
    briefing: string;
    editorsNote: string;
    timeline?: TimelineEvent[];
    keyFigures?: KeyFigure[];
    povCrossfire?: {
      analysis: string;
      comparedArticles: ComparedArticle[];
    };
    financials?: FinancialData[];
    marketSnapshot?: MarketSnapshot;
    outlook?: string;
    publicSentiment?: PublicSentiment;
  };
}

export interface TimelineEvent {
  date: string;
  event: string;
}

export interface KeyFigure {
  name: string;
  profile: string;
}

export interface ComparedArticle {
  title: string;
  source: string;
}

export interface FinancialData {
  period: string;
  revenue: string;
  profit: string;
  change: string;
}

export interface MarketSnapshot {
  keyCompetitors: string[];
  sectorOutlook: string;
  analystsTake: string;
}

export interface PublicSentiment {
  platforms: PlatformSentiment[];
  summary: string;
}

export interface PlatformSentiment {
  name: string;
  sentiment: 'Optimistic' | 'Mixed' | 'Pessimistic' | 'Concerned' | 'Cautious' | 'Skeptical' | 'Interested' | 'Analytical' | 'Professional' | 'Enthusiastic' | 'Hopeful' | 'Inspiring' | 'Supportive';
  percentage: number;
  sample: string;
}
