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
  cuisine: z.string().optional().describe('The desired cuisine type (e.g., Italian, Mexican).'),
  mealType: z.string().optional().describe('The desired meal type (e.g., Breakfast, Dinner).'),
  dietaryRestrictions: z.string().optional().describe('Dietary restrictions (e.g., vegan, gluten-free).'),
  cookTime: z.string().optional().describe('Maximum cooking time in minutes.'),
  servings: z.string().optional().describe('The desired number of servings.'),
  difficulty: z.string().optional().describe('The desired difficulty level (e.g., Easy, Medium, Hard).'),
  includeNutrition: z.boolean().optional().describe('Whether to include nutrition information.'),
});
export type GenerateRecipeWithPreferenceInput = z.infer<
  typeof GenerateRecipeWithPreferenceInputSchema
>;

const NutritionSchema = z.object({
    calories: z.string(),
    protein: z.string(),
    carbs: z.string(),
    fat: z.string(),
});

const GenerateRecipeWithPreferenceOutputSchema = z.object({
  title: z.string().describe('The title of the generated recipe.'),
  ingredients: z.array(z.string()).describe('A list of ingredients for the recipe.'),
  steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
  cookingTime: z.string().describe('The estimated cooking time for the recipe.'),
  servings: z.string().describe('The number of servings the recipe makes.'),
  difficulty: z.string().optional().describe('The difficulty level of the recipe.'),
  nutrition: NutritionSchema.optional().describe('Nutritional information for the recipe.'),
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
  prompt: `You are a world-class chef. Generate a recipe based on the following criteria.

Ingredients: {{{ingredients}}}
{{#if cuisine}}Cuisine: {{{cuisine}}}{{/if}}
{{#if mealType}}Meal Type: {{{mealType}}}{{/if}}
{{#if dietaryRestrictions}}Dietary Restrictions: {{{dietaryRestrictions}}}{{/if}}
{{#if cookTime}}Maximum Cook Time: {{{cookTime}}} minutes{{/if}}
{{#if servings}}Servings: {{{servings}}}{{/if}}
{{#if difficulty}}Difficulty: {{{difficulty}}}{{/if}}

{{#if includeNutrition}}
Please include estimated nutritional information (calories, protein, carbs, fat).
{{/if}}

Format the output as a JSON object. Ensure the cookingTime is a string (e.g., "30 minutes").
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
