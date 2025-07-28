'use server';
/**
 * @fileOverview An AI agent for generating recipes with dietary preferences.
 *
 * - generateRecipeWithPreference - A function that generates a recipe based on ingredients and dietary preferences.
 * - GenerateRecipeWithPreferenceInput - The input type for the generateRecipeWithPreference function.
 * - GenerateRecipeWithPreferenceOutput - The return type for the generateRecipeWithPreference function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeWithPreferenceInputSchema = z.object({
  ingredients: z.string().describe('A comma-separated list of ingredients.'),
  dietaryPreference: z
    .string()
    .optional()
    .describe('Optional dietary preference (e.g., vegan, gluten-free, keto).'),
});
export type GenerateRecipeWithPreferenceInput = z.infer<
  typeof GenerateRecipeWithPreferenceInputSchema
>;

const GenerateRecipeWithPreferenceOutputSchema = z.object({
  title: z.string().describe('The title of the generated recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients for the recipe.'),
  steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
  cookingTime: z.string().describe('The estimated cooking time for the recipe.'),
  servings: z.string().describe('The number of servings the recipe makes.'),
});
export type GenerateRecipeWithPreferenceOutput = z.infer<
  typeof GenerateRecipeWithPreferenceOutputSchema
>;

export async function generateRecipeWithPreference(
  input: GenerateRecipeWithPreferenceInput
): Promise<GenerateRecipeWithPreferenceOutput> {
  return generateRecipeWithPreferenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeWithPreferencePrompt',
  input: {schema: GenerateRecipeWithPreferenceInputSchema},
  output: {schema: GenerateRecipeWithPreferenceOutputSchema},
  prompt: `You are a world-class chef. Generate a recipe based on the following ingredients and dietary preference.

Ingredients: {{{ingredients}}}

Dietary Preference: {{#if dietaryPreference}}{{{dietaryPreference}}}{{else}}No specific dietary preference{{/if}}

Format the output as a JSON object with the following keys:
- title: The title of the recipe.
- ingredients: An array of ingredients for the recipe.
- steps: An array of steps to prepare the recipe.
- cookingTime: The estimated cooking time for the recipe.
- servings: The number of servings the recipe makes.
`,
});

const generateRecipeWithPreferenceFlow = ai.defineFlow(
  {
    name: 'generateRecipeWithPreferenceFlow',
    inputSchema: GenerateRecipeWithPreferenceInputSchema,
    outputSchema: GenerateRecipeWithPreferenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
