'use server';
/**
 * @fileOverview Generates a headline image using AI.
 *
 * - generateHeadlineImage - A function that generates an image for a news headline.
 * - GenerateHeadlineImageInput - The input type for the function.
 * - GenerateHeadlineImageOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateHeadlineImageInputSchema = z.object({
  headline: z.string().describe('The news headline to generate an image for.'),
});
export type GenerateHeadlineImageInput = z.infer<typeof GenerateHeadlineImageInputSchema>;

const GenerateHeadlineImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateHeadlineImageOutput = z.infer<typeof GenerateHeadlineImageOutputSchema>;

export async function generateHeadlineImage(
  input: GenerateHeadlineImageInput
): Promise<GenerateHeadlineImageOutput> {
  return generateHeadlineImageFlow(input);
}

const generateHeadlineImageFlow = ai.defineFlow(
  {
    name: 'generateHeadlineImageFlow',
    inputSchema: GenerateHeadlineImageInputSchema,
    outputSchema: GenerateHeadlineImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A photorealistic, high-resolution, cinematic news photograph that visually represents the following concept. The image should be dramatic and evocative, suitable for a front-page. Do not include any text, logos, or watermarks in the image. Concept: ${input.headline}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return an image.');
    }

    return { imageDataUri: media.url };
  }
);
