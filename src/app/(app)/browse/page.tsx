"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { generateRecipeByDishName } from '@/ai/flows/generate-recipe-by-dish';
import { useRecipe } from '@/context/recipe-context';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Loader2, ChefHat } from 'lucide-react';

export default function BrowsePage() {
  const router = useRouter();
  const { setCurrentRecipe, addToHistory } = useRecipe();
  const { toast } = useToast();
  const [dishName, setDishName] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [servings, setServings] = useState("4");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) {
      toast({
        variant: "destructive",
        title: "Please enter a dish name",
        description: "Tell us what dish you'd like to cook!",
      });
      return;
    }

    // Validate servings
    const servingNumber = parseInt(servings);
    if (!servings || isNaN(servingNumber) || servingNumber < 1 || servingNumber > 20) {
      toast({
        variant: "destructive",
        title: "Invalid serving size",
        description: "Please enter a number between 1 and 20 for servings.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const recipeData = await generateRecipeByDishName({
        dishName: dishName.trim(),
        servings: servings,
        dietaryPreference: dietaryPreference && dietaryPreference !== "none" ? dietaryPreference : undefined,
      });

      const newRecipe = {
        id: new Date().toISOString(),
        ...recipeData,
        userInput: { 
          ingredients: `Recipe for: ${dishName.trim()}`, // Using dish name as ingredients for compatibility
          cuisine: undefined,
          mealType: undefined,
          dietaryRestrictions: dietaryPreference && dietaryPreference !== "none" ? dietaryPreference : undefined,
          cookTime: undefined,
          servings: servings,
          difficulty: undefined,
          includeNutrition: false,
        },
      };

      setCurrentRecipe(newRecipe);
      addToHistory(newRecipe); // Add to search history
      
      toast({
        title: "Recipe Generated!",
        description: `Your ${dishName} recipe for ${servings} serving${servings === "1" ? "" : "s"} is ready!`,
      });
      
      router.push('/recipe');

    } catch (error) {
      console.error("Failed to generate recipe:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "We couldn't generate a recipe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg rounded-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-headline">Recipe Generator</CardTitle>
              <CardDescription>Tell us what dish you want to cook and we&apos;ll generate a complete recipe for you!</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dishName" className="text-lg font-medium">
                🍽️ What dish would you like to cook?
              </Label>
              <Input
                id="dishName"
                type="text"
                placeholder="e.g., Chicken Biryani, Pasta Carbonara, Chicken Karahi, Beef Tacos..."
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="text-lg p-6"
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                You can ask for any dish from any cuisine - Pakistani, Italian, Mexican, Chinese, Indian, and more!
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietaryPreference" className="text-lg font-medium">
                🥗 Dietary Preferences (Optional)
              </Label>
              <Select value={dietaryPreference} onValueChange={setDietaryPreference} disabled={isLoading}>
                <SelectTrigger className="text-lg p-6">
                  <SelectValue placeholder="Select dietary preference (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No preference</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gluten-free">Gluten-free</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="low-carb">Low-carb</SelectItem>
                  <SelectItem value="dairy-free">Dairy-free</SelectItem>
                  <SelectItem value="halal">Halal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="servings" className="text-lg font-medium">
                👥 Number of Servings
              </Label>
              <Input
                id="servings"
                type="number"
                placeholder="e.g., 4"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="text-lg p-6"
                disabled={isLoading}
                min="1"
                max="20"
              />
              <p className="text-sm text-muted-foreground">
                The recipe ingredients and instructions will be adjusted for this many servings.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg py-6" 
              disabled={isLoading || !dishName.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Recipe...
                </>
              ) : (
                <>
                  <ChefHat className="mr-2 h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">✨ Popular Dishes You Can Try:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <Button 
                variant="ghost" 
                className="justify-start h-auto p-2" 
                onClick={() => setDishName("Chicken Biryani")}
                disabled={isLoading}
              >
                🍛 Chicken Biryani
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start h-auto p-2" 
                onClick={() => setDishName("Chicken Karahi")}
                disabled={isLoading}
              >
                🍗 Chicken Karahi
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start h-auto p-2" 
                onClick={() => setDishName("Beef Nihari")}
                disabled={isLoading}
              >
                🥩 Beef Nihari
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start h-auto p-2" 
                onClick={() => setDishName("Pasta Carbonara")}
                disabled={isLoading}
              >
                🍝 Pasta Carbonara
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start h-auto p-2" 
                onClick={() => setDishName("Chicken Tikka Masala")}
                disabled={isLoading}
              >
                🍛 Chicken Tikka
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start h-auto p-2" 
                onClick={() => setDishName("Fish and Chips")}
                disabled={isLoading}
              >
                🐟 Fish & Chips
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}