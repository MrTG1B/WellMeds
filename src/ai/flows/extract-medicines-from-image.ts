
'use server';
/**
 * @fileOverview Extracts medicine names from an image of a prescription.
 *
 * - extractMedicinesFromImage - A function that takes an image and returns a list of medicine names.
 * - ExtractMedicinesInput - The input type for the extractMedicinesFromImage function.
 * - ExtractMedicinesOutput - The return type for the extractMedicinesFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractMedicinesInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a handwritten or printed prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractMedicinesInput = z.infer<typeof ExtractMedicinesInputSchema>;

const ExtractMedicinesOutputSchema = z.object({
  medicineNames: z.array(z.string()).describe('A list of medicine names extracted from the prescription image. Include dosages if visible.'),
});
export type ExtractMedicinesOutput = z.infer<typeof ExtractMedicinesOutputSchema>;

export async function extractMedicinesFromImage(input: ExtractMedicinesInput): Promise<ExtractMedicinesOutput> {
  if (!input || typeof input.imageDataUri !== 'string' || !input.imageDataUri.startsWith('data:image')) {
    console.warn(`extractMedicinesFromImage: Invalid or empty image data URI. Input: ${JSON.stringify(input)}`);
    return {
      medicineNames: [], 
    };
  }
  return extractMedicinesFromImageFlow(input);
}

const extractMedicinePrompt = ai.definePrompt({
  name: 'extractMedicinePrompt',
  model: 'googleai/gemini-2.5-flash-latest',
  input: {schema: ExtractMedicinesInputSchema},
  output: {schema: ExtractMedicinesOutputSchema},
  prompt: `You are an expert at reading doctor's prescriptions, including difficult handwriting.
Analyze the provided image of a prescription.
Identify every medicine listed and extract the full name, including any strength or dosage information (e.g., "Paracetamol 500mg", "Dolo 650").
Return the names as a list of strings in the 'medicineNames' field.
If no medicines can be identified, return an empty list.

Image to analyze: {{media url=imageDataUri}}`,
});

const extractMedicinesFromImageFlow = ai.defineFlow(
  {
    name: 'extractMedicinesFromImageFlow',
    inputSchema: ExtractMedicinesInputSchema,
    outputSchema: ExtractMedicinesOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await extractMedicinePrompt(input);
      if (!output) {
        return { medicineNames: [] };
      }
      return output;
    } catch (error) {
      console.error("Error in extractMedicinesFromImageFlow:", error);
      return { medicineNames: [] };
    }
  }
);
