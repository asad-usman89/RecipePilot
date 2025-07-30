export type User = {
  email: string;
};

export type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  cookingTime: string;
  servings: string;
  difficulty?: string;
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  userInput: {
    ingredients: string;
    cuisine?: string;
    mealType?: string;
    dietaryRestrictions?: string;
    cookTime?: string;
    servings?: string;
    difficulty?: string;
    includeNutrition?: boolean;
  };
};
