'use server';
/**
 * @fileOverview Reformat news article flow. Takes a news article URL and reformats it into a consistent style.
 *
 * - reformatNewsArticle - A function that handles the news article reformatting process.
 * - ReformatNewsArticleInput - The input type for the reformatNewsArticle function.
 * - ReformatNewsArticleOutput - The return type for the reformatNewsArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReformatNewsArticleInputSchema = z.object({
  articleUrl: z.string().describe('The URL of the news article to reformat.'),
  originalArticle: z.string().describe('The content of the original news article.'),
});
export type ReformatNewsArticleInput = z.infer<typeof ReformatNewsArticleInputSchema>;

const ReformatNewsArticleOutputSchema = z.object({
  reformattedArticle: z.string().describe('The reformatted news article content.'),
});
export type ReformatNewsArticleOutput = z.infer<typeof ReformatNewsArticleOutputSchema>;

export async function reformatNewsArticle(input: ReformatNewsArticleInput): Promise<ReformatNewsArticleOutput> {
  return reformatNewsArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reformatNewsArticlePrompt',
  input: {schema: ReformatNewsArticleInputSchema},
  output: {schema: ReformatNewsArticleOutputSchema},
  prompt: `You are a professional news editor. Your task is to reformat news articles into a consistent and easy-to-read style.

  Here is the original news article:
  {{{originalArticle}}}
  
  Reformat the article to be clear, concise, and engaging for a general audience. Focus on readability and maintain the original article\'s factual accuracy.
  Return the reformatted article.
  `,
});

const reformatNewsArticleFlow = ai.defineFlow(
  {
    name: 'reformatNewsArticleFlow',
    inputSchema: ReformatNewsArticleInputSchema,
    outputSchema: ReformatNewsArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
