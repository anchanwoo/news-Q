'use server';
/**
 * @fileOverview Creates a news briefing from an article summary.
 *
 * - createNewsBriefing - A function that handles the briefing creation process.
 * - CreateNewsBriefingInput - The input type for the function.
 * - CreateNewsBriefingOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateNewsBriefingInputSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  description: z.string().describe('The summary or description of the news article.'),
  source: z.string().describe('The original source of the article (e.g., BBC News).'),
});
export type CreateNewsBriefingInput = z.infer<typeof CreateNewsBriefingInputSchema>;

const CreateNewsBriefingOutputSchema = z.object({
  briefing: z.string().describe('The generated news briefing in Markdown format.'),
});
export type CreateNewsBriefingOutput = z.infer<typeof CreateNewsBriefingOutputSchema>;

export async function createNewsBriefing(input: CreateNewsBriefingInput): Promise<CreateNewsBriefingOutput> {
  return createNewsBriefingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createNewsBriefingPrompt',
  input: {schema: CreateNewsBriefingInputSchema},
  output: {schema: CreateNewsBriefingOutputSchema},
  prompt: `You are a senior editor at a prestigious publication like The New York Times.
Your task is to take a raw newswire summary and transform it into a polished, insightful, and eloquent news briefing suitable for your discerning audience.

Adhere to these principles:
1.  **Adopt a Journalistic Tone**: Write with clarity, authority, and objectivity.
2.  **Add Context and Depth**: Do not just rephrase the summary. Expand on the key points, explain the 'why' behind the news, and provide necessary background information that a well-informed reader would appreciate.
3.  **Structure for Readability**: Use Markdown for clear formatting. Use paragraphs to separate ideas. Do not use headings.
4.  **Attribute the Source**: Casually mention the original source of the report within the text (e.g., "According to a report from {{source}}, ...").
5.  **Focus on Significance**: Start by immediately addressing why this story matters.

You will be given the title, a description/summary, and the source. Produce a briefing of 3-4 paragraphs.

**Article Title:** {{{title}}}
**Newswire Summary:** {{{description}}}
**Original Source:** {{{source}}}
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
