import { config } from 'dotenv';
config();

import '@/ai/flows/reformat-news-article.ts';
import '@/ai/flows/filter-relevant-news.ts';