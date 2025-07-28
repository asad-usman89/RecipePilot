export type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  cookingTime: string;
  servings: string;
  userInput: {
    ingredients: string;
    dietaryPreference?: string;
  };
};
