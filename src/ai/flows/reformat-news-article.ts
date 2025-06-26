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

const TimelineEventSchema = z.object({
  date: z.string().describe("The date of the event (e.g., '2023-10-26' or 'Early 2024')."),
  event: z.string().describe("A concise description of the key event."),
});

const KeyFigureSchema = z.object({
  name: z.string().describe("The name of the key person."),
  profile: z.string().describe("A brief, neutral, one-paragraph profile of the person, explaining their role and significance in this context."),
});

const GenerateArticleAnalysisOutputSchema = z.object({
  briefing: z.string().describe('A standard, professional news briefing based on the primary article, formatted in Markdown.'),
  editorsNote: z.string().optional().describe('An in-depth analysis titled "Editor\'s Note". It synthesizes related news from the provided headlines, provides background context, and offers a future outlook. This should be a comprehensive, multi-paragraph analysis in Markdown format.'),
  outlook: z.string().optional().describe('For business news, a forward-looking analysis of the company or market.'),
  financials: z.array(FinancialDataSchema).optional().describe('For business news, a summary of key financial data for the discussed company.'),
  marketSnapshot: MarketSnapshotSchema.optional().describe("For business news, a snapshot of the market including competitors, sector outlook, and an analyst's take."),
  timeline: z.array(TimelineEventSchema).optional().describe("A chronological timeline of 3-5 key events providing historical context for the article's main topic."),
  keyFigures: z.array(KeyFigureSchema).optional().describe("A profile of 1-2 key individuals mentioned in or relevant to the article."),
});
export type GenerateArticleAnalysisOutput = z.infer<typeof GenerateArticleAnalysisOutputSchema>;

// A simpler output schema for non-business articles.
const BasicArticleAnalysisOutputSchema = GenerateArticleAnalysisOutputSchema.omit({ 
    outlook: true, 
    financials: true, 
    marketSnapshot: true 
});


export async function generateArticleAnalysis(input: GenerateArticleAnalysisInput): Promise<GenerateArticleAnalysisOutput> {
  return generateArticleAnalysisFlow(input);
}

// Prompt for Business news, with financial tools.
const fullArticleAnalysisPrompt = ai.definePrompt({
  name: 'fullArticleAnalysisPrompt',
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
- Format this as 2-3 detailed paragraphs using Markdown.

**Task 3: Business Analysis**
- Since this is a business article, your task is to determine if financial analysis is appropriate.
- Read the article carefully. If it is about a specific, publicly traded company, you should use the \`fetchFinancialData\` tool to retrieve its financial data. Use the company's name as the \`company\` parameter for the tool (e.g., "Apple Inc.", "Microsoft").
- If you use the tool and receive data, use that information and the article's context to populate all the fields for 'financials', 'outlook', and 'marketSnapshot'.
- If the article is about a general market trend, multiple companies, a private company, or for any other reason the tool is not applicable, DO NOT use the tool. In this case, you must leave the 'financials', 'outlook', and 'marketSnapshot' fields empty.

**Task 4: Create Event Timeline**
- Drawing from the historical context you have gathered (as if from a web search), create a chronological 'timeline' of 3-5 key past events that led to the current situation described in the article.
- Each event should have a date and a concise description.

**Task 5: Profile Key Figures**
- Identify 1-2 key individuals who are central to the story.
- For each person, provide a brief, neutral 'profile' explaining who they are and why they are significant in this context. Do not include your own opinions.

**Primary Article Details:**
- **Title:** {{{primaryArticle.title}}}
- **Newswire Summary:** {{{primaryArticle.description}}}
- **Original Source:** {{{primaryArticle.source}}}
- **Category:** {{{primaryArticle.category}}}

**Contextual Headlines:**
{{{json allArticleTitles}}}
`,
});

// Prompt for non-business news. No financial tools.
const basicArticleAnalysisPrompt = ai.definePrompt({
  name: 'basicArticleAnalysisPrompt',
  input: {schema: GenerateArticleAnalysisInputSchema},
  output: {schema: BasicArticleAnalysisOutputSchema},
  prompt: `You are a senior editor at a prestigious global publication like The New York Times, with a specialty in deep-dive analysis.
Your task is to take a primary newswire summary and transform it into a multi-faceted, insightful piece of journalism. You will not be performing financial analysis.

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
- Format this as 2-3 detailed paragraphs using Markdown.

**Task 3: Create Event Timeline**
- Drawing from the historical context you have gathered (as if from a web search), create a chronological 'timeline' of 3-5 key past events that led to the current situation described in the article.
- Each event should have a date and a concise description.

**Task 4: Profile Key Figures**
- Identify 1-2 key individuals who are central to the story.
- For each person, provide a brief, neutral 'profile' explaining who they are and why they are significant in this context. Do not include your own opinions.

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
  async (input): Promise<GenerateArticleAnalysisOutput> => {
    // Use TypeScript for the conditional logic, not the prompt
    if (input.primaryArticle.category === 'Business') {
      console.log(`[Flow] Handling 'Business' article with full analysis: "${input.primaryArticle.title}"`);
      const { output } = await fullArticleAnalysisPrompt(input);
      if (!output) {
        console.error("[Flow] Full analysis prompt failed to return output for business article.");
        throw new Error("AI analysis failed for business article.");
      }
      return output;
    } else {
      console.log(`[Flow] Handling non-business article with basic analysis: "${input.primaryArticle.title}"`);
      const { output } = await basicArticleAnalysisPrompt(input);
       if (!output) {
        console.error("[Flow] Basic analysis prompt failed to return output for non-business article.");
        throw new Error("AI analysis failed for non-business article.");
      }
      // Combine the basic output with empty fields to match the full schema
      return {
        ...output,
        financials: undefined,
        marketSnapshot: undefined,
        outlook: undefined,
      };
    }
  }
);
