import { config } from 'dotenv';
config();

import '@/ai/flows/reformat-news-article.ts';
import '@/ai/flows/filter-relevant-news.ts';
import '@/ai/flows/generate-headline-image.ts';
import '@/ai/tools/fetch-financials-tool.ts';
