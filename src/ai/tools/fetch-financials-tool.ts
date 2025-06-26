'use server';
/**
 * @fileOverview A Genkit tool for fetching simulated financial data for a company.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FinancialDataSchema = z.object({
  period: z.string().describe("The financial period, e.g., 'Q1 2024'."),
  revenue: z.string().describe("Revenue for the period, formatted as a currency string (e.g., '$100.5M')."),
  profit: z.string().describe("Profit for the period, formatted as a currency string (e.g., '$20.1M')."),
  change: z.string().describe("Percentage change from the previous period, e.g., '+5.2%'.")
});

export const fetchFinancialDataTool = ai.defineTool(
  {
    name: 'fetchFinancialData',
    description: 'Fetches the latest quarterly financial data for a given public company.',
    inputSchema: z.object({
      company: z.string().describe('The name of the company to fetch financial data for.'),
    }),
    outputSchema: z.array(FinancialDataSchema),
  },
  async (input) => {
    console.log(`[Tool] Fetching simulated financial data for ${input.company}`);
    // In a real application, you would fetch this data from a financial API.
    // For this prototype, we'll return consistent mock data.
    const mockData = [
        { period: 'Q2 2024', revenue: '$145.2M', profit: '$30.1M', change: '+3.5%' },
        { period: 'Q1 2024', revenue: '$140.3M', profit: '$28.9M', change: '+2.1%' },
        { period: 'Q4 2023', revenue: '$137.4M', profit: '$25.5M', change: '-1.2%' },
        { period: 'Q3 2023', revenue: '$139.1M', profit: '$27.8M', change: '+4.0%' },
    ];
    return mockData;
  }
);
