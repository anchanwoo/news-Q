'use server';
/**
 * @fileOverview Creates an in-depth news analysis from an article, providing background, context, an "Editor's Note", and for business news, financial analysis.
 *
 * - generateArticleAnalysis - A function that handles the analysis creation process.
 * - GenerateArticleAnalysisInput - The input type for the function.
 * - GenerateArticleAnalysisOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { fetchFinancialDataTool } from '@/ai/tools/fetch-financials-tool';

const PrimaryArticleSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  description: z.string().describe('The summary or description of the news article.'),
  source: z.string().describe('The original source of the article (e.g., BBC News).'),
  category: z.string().describe('The category of the news article (e.g., Politics, Business).'),
});

const GenerateArticleAnalysisInputSchema = z.object({
  primaryArticle: PrimaryArticleSchema,
  allArticleTitles: z.array(z.string()).describe('A list of all other relevant news headlines provided for contextual understanding.'),
});
export type GenerateArticleAnalysisInput = z.infer<typeof GenerateArticleAnalysisInputSchema>;

const FinancialDataSchema = z.object({
    period: z.string().describe("The financial period, e.g., 'Q1 2024'."),
    revenue: z.string().describe("Revenue for the period, formatted as a currency string (e.g., '$100.5M')."),
    profit: z.string().describe("Profit for the period, formatted as a currency string (e.g., '$20.1M')."),
    change: z.string().describe("Percentage change from the previous period, e.g., '+5.2%'.")
});

const MarketSnapshotSchema = z.object({
  keyCompetitors: z.array(z.string()).describe("A list of 2-3 key competitors for the company."),
  sectorOutlook: z.string().describe("A brief analysis of the outlook for the company's industry sector."),
  analystsTake: z.string().describe("A concise 'analyst's take' on the news, as if from a financial expert."),
});


const GenerateArticleAnalysisOutputSchema = z.object({
  briefing: z.string().describe('A standard, professional news briefing based on the primary article, formatted in Markdown.'),
  editorsNote: z.string().optional().describe('An in-depth analysis titled "Editor\'s Note". It synthesizes related news from the provided headlines, provides background context, and offers a future outlook. This should be a comprehensive, multi-paragraph analysis in Markdown format.'),
  outlook: z.string().optional().describe('For business news, a forward-looking analysis of the company or market.'),
  financials: z.array(FinancialDataSchema).optional().describe('For business news, a summary of key financial data for the discussed company.'),
  marketSnapshot: MarketSnapshotSchema.optional().describe("For business news, a snapshot of the market including competitors, sector outlook, and an analyst's take."),
});
export type GenerateArticleAnalysisOutput = z.infer<typeof GenerateArticleAnalysisOutputSchema>;

export async function generateArticleAnalysis(input: GenerateArticleAnalysisInput): Promise<GenerateArticleAnalysisOutput> {
  return generateArticleAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleAnalysisPrompt',
  input: {schema: GenerateArticleAnalysisInputSchema},
  output: {schema: GenerateArticleAnalysisOutputSchema},
  tools: [fetchFinancialDataTool],
  prompt: `You are a senior editor at a prestigious global publication like The New York Times, with a specialty in deep-dive analysis.
Your task is to take a primary newswire summary and transform it into a multi-faceted, insightful piece of journalism.

**Task 1: Write the News Briefing**
- Based *only* on the provided primary article, write a polished, insightful news briefing.
- Adopt a journalistic tone: clear, authoritative, and objective.
- Add context and depth. Do not just rephrase the summary. Explain the 'why' and the immediate significance.
- Structure with Markdown for readability. Use paragraphs, but do not use headings.
- Casually mention the original source (e.g., "According to a report from {{primaryArticle.source}}, ...").
- Produce a briefing of 2-3 paragraphs.

**Task 2: Write the Editor's Note**
- After the briefing, write a separate, more comprehensive analysis titled "Editor's Note".
- For this, you MUST consider the primary article in the broader context of all other recent headlines provided in \`allArticleTitles\`.
- Synthesize information from potentially related articles in the list to build a deeper narrative. If you identify multiple articles about the same core event, combine their insights.
- Act as if you have searched the web to provide historical context, explain the current situation's long-term significance, and offer a nuanced prediction of future developments.
- This section should be more analytical and forward-looking than the main briefing.
- Format this as 2-3 detailed paragraphs using Markdown.

**Task 3: Business Analysis (If Applicable)**
- First, check if the primary article's category is 'Business'.
- If it is, analyze the article's content to determine if it is primarily about a single, specific, publicly traded company.
- If you can confidently identify one main company, you MUST use the \`fetchFinancialData\` tool to get its financial data. The \`company\` parameter for the tool should be the company's name you identified (e.g., "Apple Inc.", "Microsoft").
- After using the tool, use the returned financial data and the article's context to populate all the fields for 'financials', 'outlook', and 'marketSnapshot'.
- If the category is NOT 'Business', OR if the article is about a general market trend, multiple companies, or a private company, DO NOT use the tool and leave the 'financials', 'outlook', and 'marketSnapshot' fields empty.

**Primary Article Details:**
- **Title:** {{{primaryArticle.title}}}
- **Newswire Summary:** {{{primaryArticle.description}}}
- **Original Source:** {{{primaryArticle.source}}}
- **Category:** {{{primaryArticle.category}}}

**Contextual Headlines:**
{{{json allArticleTitles}}}
`,
});

const generateArticleAnalysisFlow = ai.defineFlow(
  {
    name: 'generateArticleAnalysisFlow',
    inputSchema: GenerateArticleAnalysisInputSchema,
    outputSchema: GenerateArticleAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
