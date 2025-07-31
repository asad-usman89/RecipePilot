// src/ai/flows/generate-recipe-by-dish.ts
'use server';

/**
 * @fileOverview A recipe generation AI agent for dish names.
 *
 * - generateRecipeByDishName - A function that handles the recipe generation process by dish name.
 * - GenerateRecipeByDishNameInput - The input type for the generateRecipeByDishName function.
 * - GenerateRecipeByDishNameOutput - The return type for the generateRecipeByDishName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeByDishNameInputSchema = z.object({
  dishName: z
    .string()
    .describe('The name of the dish the user wants to cook (e.g., "Chicken Biryani", "Pasta Carbonara", "Chicken Karahi").'),
  servings: z
    .string()
    .optional()
    .describe('The number of servings the recipe should yield (e.g., "2", "4", "6").'),
  dietaryPreference: z
    .string()
    .optional()
    .describe('Optional dietary preference (e.g., vegan, gluten-free, keto).'),
});

export type GenerateRecipeByDishNameInput = z.infer<
  typeof GenerateRecipeByDishNameInputSchema
>;

const GenerateRecipeByDishNameOutputSchema = z.object({
  title: z.string().describe('The title of the generated recipe.'),
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients required for the recipe.'),
  steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
  cookingTime: z.string().describe('The total cooking time for the recipe.'),
  servings: z.string().describe('The number of servings the recipe yields.'),
});

export type GenerateRecipeByDishNameOutput = z.infer<
  typeof GenerateRecipeByDishNameOutputSchema
>;

export async function generateRecipeByDishName(
  input: GenerateRecipeByDishNameInput
): Promise<GenerateRecipeByDishNameOutput> {
  return generateRecipeByDishNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeByDishNamePrompt',
  input: {schema: GenerateRecipeByDishNameInputSchema},
  output: {schema: GenerateRecipeByDishNameOutputSchema},
  prompt: `You are a world-class chef with expertise in international cuisines, including Pakistani, Indian, Italian, Mexican, Chinese, and many more.

  Create a detailed and authentic recipe for: {{{dishName}}}.

  {{#if servings}}
  The recipe should be scaled to serve exactly {{{servings}}} people. Adjust all ingredient quantities accordingly.
  {{else}}
  The recipe should serve 4 people (standard serving size).
  {{/if}}

  {{#if dietaryPreference}}
  The recipe should adhere to the following dietary preference: {{{dietaryPreference}}}.
  {{/if}}

  Requirements:
  - If the dish is Pakistani/Indian, include authentic spices and cooking methods
  - If the dish is from another cuisine, maintain authenticity to that cuisine
  - Provide accurate ingredient measurements scaled for the specified number of servings
  - Include detailed step-by-step cooking instructions
  - Specify cooking time and number of servings
  - Use common ingredients that are easily available
  - Ensure the recipe is authentic and traditional
  - All ingredient quantities must be properly scaled for the requested serving size

  The recipe should include a title, a complete list of ingredients with measurements, detailed step-by-step instructions, the total cooking time, and the number of servings.
  Return the recipe in a JSON format.
  `,
});

const generateRecipeByDishNameFlow = ai.defineFlow(
  {
    name: 'generateRecipeByDishNameFlow',
    inputSchema: GenerateRecipeByDishNameInputSchema,
    outputSchema: GenerateRecipeByDishNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
