'use server';
/**
 * @fileOverview Creates an in-depth news briefing from an article summary, providing background, context, and for business news, financial analysis.
 *
 * - createNewsBriefing - A function that handles the briefing creation process.
 * - CreateNewsBriefingInput - The input type for the function.
 * - CreateNewsBriefingOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { fetchFinancialDataTool } from '@/ai/tools/fetch-financials-tool';

const CreateNewsBriefingInputSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  description: z.string().describe('The summary or description of the news article.'),
  source: z.string().describe('The original source of the article (e.g., BBC News).'),
  category: z.string().describe('The category of the news article (e.g., Politics, Business).'),
  companyName: z.string().optional().describe('The name of the company discussed in the article, if applicable.'),
});
export type CreateNewsBriefingInput = z.infer<typeof CreateNewsBriefingInputSchema>;

const FinancialDataSchema = z.object({
    period: z.string().describe("The financial period, e.g., 'Q1 2024'."),
    revenue: z.string().describe("Revenue for the period, formatted as a currency string (e.g., '$100.5M')."),
    profit: z.string().describe("Profit for the period, formatted as a currency string (e.g., '$20.1M')."),
    change: z.string().describe("Percentage change from the previous period, e.g., '+5.2%'.")
});

const CreateNewsBriefingOutputSchema = z.object({
  briefing: z.string().describe('The generated news briefing in Markdown format, covering background, context, and significance.'),
  outlook: z.string().optional().describe('For business news, a forward-looking analysis of the company or market.'),
  financials: z.array(FinancialDataSchema).optional().describe('For business news, a summary of key financial data for the discussed company.'),
});
export type CreateNewsBriefingOutput = z.infer<typeof CreateNewsBriefingOutputSchema>;

export async function createNewsBriefing(input: CreateNewsBriefingInput): Promise<CreateNewsBriefingOutput> {
  return createNewsBriefingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createNewsBriefingPrompt',
  input: {schema: CreateNewsBriefingInputSchema},
  output: {schema: CreateNewsBriefingOutputSchema},
  tools: [fetchFinancialDataTool],
  prompt: `You are a senior editor at a prestigious publication like The New York Times, with a specialty in deep-dive analysis.
Your task is to take a raw newswire summary and transform it into a polished, insightful, and eloquent news briefing suitable for your discerning audience.

Adhere to these principles:
1.  **Adopt a Journalistic Tone**: Write with clarity, authority, and objectivity.
2.  **Add Context and Depth**: Do not just rephrase the summary. Your primary goal is to explain the 'why'. Provide the essential background, history, and context that a well-informed reader needs to fully understand the story's significance.
3.  **Structure for Readability**: Use Markdown for clear formatting. Use paragraphs to separate ideas. Do not use headings.
4.  **Attribute the Source**: Casually mention the original source of the report within the text (e.g., "According to a report from {{source}}, ...").
5.  **Focus on Significance**: Start by immediately addressing why this story matters.

**Special Instructions for Business News (Category: Business):**
If the article is about a specific company ({{companyName}}), you MUST use the 'fetchFinancialData' tool to get its latest financial data.
- Based on the article and the financial data from the tool, provide a concise 'outlook' on the company's future prospects or the market trends.
- Populate the 'financials' array with the data returned by the tool.
- If no specific company is named or the tool is not applicable, leave 'outlook' and 'financials' empty.

You will be given the title, a description/summary, the source, and the category. Produce a briefing of 3-4 paragraphs.

**Article Title:** {{{title}}}
**Newswire Summary:** {{{description}}}
**Original Source:** {{{source}}}
**Category:** {{{category}}}
`,
});

const createNewsBriefingFlow = ai.defineFlow(
  {
    name: 'createNewsBriefingFlow',
    inputSchema: CreateNewsBriefingInputSchema,
    outputSchema: CreateNewsBriefingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
