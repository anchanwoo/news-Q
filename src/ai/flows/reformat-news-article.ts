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

const ContextualArticleSchema = z.object({
  title: z.string().describe('The title of a contextual news article.'),
  source: z.string().describe('The source of the contextual article.'),
});

const GenerateArticleAnalysisInputSchema = z.object({
  primaryArticle: PrimaryArticleSchema,
  contextualArticles: z.array(ContextualArticleSchema).describe('A list of all other relevant news headlines and their sources for contextual understanding.'),
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

const PovCrossfireArticleSchema = z.object({
    title: z.string().describe("The title of the compared article."),
    source: z.string().describe("The source of the compared article."),
});

const PovCrossfireSchema = z.object({
    analysis: z.string().describe("A comparative analysis of how different news sources are reporting on the same event, highlighting differences in angle, tone, and focus. Formatted in Markdown."),
    comparedArticles: z.array(PovCrossfireArticleSchema).describe("The articles that were compared to generate the analysis."),
});

const GenerateArticleAnalysisOutputSchema = z.object({
  briefing: z.string().describe('A standard, professional news briefing based on the primary article, formatted in Markdown.'),
  editorsNote: z.string().optional().describe('An in-depth analysis titled "Editor\'s Note". It synthesizes related news from the provided headlines, provides background context, and offers a future outlook. This should be a comprehensive, multi-paragraph analysis in Markdown format.'),
  outlook: z.string().optional().describe('For business news, a forward-looking analysis of the company or market.'),
  financials: z.array(FinancialDataSchema).optional().describe('For business news, a summary of key financial data for the discussed company.'),
  marketSnapshot: MarketSnapshotSchema.optional().describe("For business news, a snapshot of the market including competitors, sector outlook, and an analyst's take."),
  timeline: z.array(TimelineEventSchema).optional().describe("A chronological timeline of 3-5 key events providing historical context for the article's main topic."),
  keyFigures: z.array(KeyFigureSchema).optional().describe("A profile of 1-2 key individuals mentioned in or relevant to the article."),
  povCrossfire: PovCrossfireSchema.optional().describe("A comparative analysis of different viewpoints on the article's topic from other news sources."),
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

const BasePrompt = `You are a senior editor and expert geopolitical analyst at a prestigious global publication. Your task is to transform a primary newswire summary into a multi-faceted, insightful piece of journalism.

**Task 1: Write the News Briefing**
- Based *only* on the provided primary article, write a polished, insightful news briefing.
- Adopt a journalistic tone: clear, authoritative, and objective. Add context and depth.
- Structure with Markdown for readability. Do not use headings. Produce 2-3 paragraphs.

**Task 2: Write the Editor's Note**
- Write a separate, comprehensive analysis titled "Editor's Note".
- Synthesize information from the \`contextualArticles\` to build a deeper narrative, providing historical context and a nuanced future outlook.
- Format as 2-3 detailed paragraphs using Markdown.

**Task 3: Create Event Timeline**
- Drawing from the context provided, create a chronological 'timeline' of 3-5 key past events that led to the current situation.

**Task 4: Profile Key Figures**
- Identify 1-2 key individuals central to the story. For each, provide a brief, neutral 'profile' explaining their significance.
`;

const BusinessPromptExtension = `
**Task 5: Business Analysis**
- Since this is a business article, determine if financial analysis is appropriate for the company discussed.
- If it is a specific, publicly traded company, use the \`fetchFinancialData\` tool to retrieve its financial data.
- Use the retrieved data to populate all fields for 'financials', 'outlook', and 'marketSnapshot'.
- If the tool is not applicable, leave these fields empty.

**Task 6: Generate POV Crossfire Analysis**
- Create a "Point of View (POV) Crossfire" analysis.
- Identify the central theme and scan \`contextualArticles\` to find 1-3 other articles covering the same event from a different geopolitical standpoint (e.g., US vs. China vs. Europe).
- If found, write a concise analysis contrasting their perspectives (angle, tone, omissions) and populate the \`povCrossfire\` field.
- If no suitable articles for comparison are found, leave the 'povCrossfire' field empty.
`;

const NonBusinessPromptExtension = `
**Task 5: Generate POV Crossfire Analysis**
- Create a "Point of View (POV) Crossfire" analysis.
- Identify the central theme and scan \`contextualArticles\` to find 1-3 other articles covering the same event from a different geopolitical standpoint (e.g., US vs. China vs. Europe).
- If found, write a concise analysis contrasting their perspectives (angle, tone, omissions) and populate the \`povCrossfire\` field.
- If no suitable articles for comparison are found, leave the 'povCrossfire' field empty.
`;

const PromptFooter = `
**Primary Article Details:**
- **Title:** {{{primaryArticle.title}}}
- **Newswire Summary:** {{{primaryArticle.description}}}
- **Original Source:** {{{primaryArticle.source}}}
- **Category:** {{{primaryArticle.category}}}

**Contextual Articles:**
{{{json contextualArticles}}}`;

// Prompt for Business news, with financial tools.
const fullArticleAnalysisPrompt = ai.definePrompt({
  name: 'fullArticleAnalysisPrompt',
  input: {schema: GenerateArticleAnalysisInputSchema},
  output: {schema: GenerateArticleAnalysisOutputSchema},
  tools: [fetchFinancialDataTool],
  prompt: `${BasePrompt}${BusinessPromptExtension}${PromptFooter}`,
});

// Prompt for non-business news. No financial tools.
const basicArticleAnalysisPrompt = ai.definePrompt({
  name: 'basicArticleAnalysisPrompt',
  input: {schema: GenerateArticleAnalysisInputSchema},
  output: {schema: BasicArticleAnalysisOutputSchema},
  prompt: `${BasePrompt}${NonBusinessPromptExtension}${PromptFooter}`,
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
