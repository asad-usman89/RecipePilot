// src/ai/flows/generate-recipe.ts
'use server';

/**
 * @fileOverview A recipe generation AI agent.
 *
 * - generateRecipeFromIngredients - A function that handles the recipe generation process.
 * - GenerateRecipeFromIngredientsInput - The input type for the generateRecipeFromIngredients function.
 * - GenerateRecipeFromIngredientsOutput - The return type for the generateRecipeFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeFromIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has on hand.'),
  dietaryPreference: z
    .string()
    .optional()
    .describe('Optional dietary preference (e.g., vegan, gluten-free, keto).'),
});

export type GenerateRecipeFromIngredientsInput = z.infer<
  typeof GenerateRecipeFromIngredientsInputSchema
>;

const GenerateRecipeFromIngredientsOutputSchema = z.object({
  title: z.string().describe('The title of the generated recipe.'),
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients required for the recipe.'),
  steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
  cookingTime: z.string().describe('The total cooking time for the recipe.'),
  servings: z.string().describe('The number of servings the recipe yields.'),
});

export type GenerateRecipeFromIngredientsOutput = z.infer<
  typeof GenerateRecipeFromIngredientsOutputSchema
>;

export async function generateRecipeFromIngredients(
  input: GenerateRecipeFromIngredientsInput
): Promise<GenerateRecipeFromIngredientsOutput> {
  return generateRecipeFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeFromIngredientsPrompt',
  input: {schema: GenerateRecipeFromIngredientsInputSchema},
  output: {schema: GenerateRecipeFromIngredientsOutputSchema},
  prompt: `You are a world-class chef specializing in creating delicious recipes based on user-provided ingredients.

  Create a recipe based on the following ingredients: {{{ingredients}}}.

  {{#if dietaryPreference}}
  The recipe should adhere to the following dietary preference: {{{dietaryPreference}}}.
  {{/if}}

  The recipe should include a title, a list of ingredients, step-by-step instructions, the total cooking time, and the number of servings.
  Ensure the ingredients are common and the cooking steps are easy to follow.
  Return the recipe in a JSON format.
  `,
});

const generateRecipeFromIngredientsFlow = ai.defineFlow(
  {
    name: 'generateRecipeFromIngredientsFlow',
    inputSchema: GenerateRecipeFromIngredientsInputSchema,
    outputSchema: GenerateRecipeFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
