"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRecipe } from '@/context/recipe-context';
import { useRouter } from 'next/navigation';
import { Eye } from 'lucide-react';
import type { Recipe } from '@/lib/types';

export default function Dashboard() {
  const { savedRecipes, setCurrentRecipe } = useRecipe();
  const router = useRouter();

  const viewRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    router.push('/recipe');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">👋 Welcome, Cook!</h1>
        <p className="text-lg text-muted-foreground">What would you like to cook today?</p>
        <Button asChild size="lg" className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg shadow-md hover:shadow-lg transition-shadow">
          <Link href="/generate">
            <span role="img" aria-label="pan emoji" className="mr-2">🍳</span>
            Generate New Recipe
          </Link>
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Recent Recipes</CardTitle>
          <CardDescription>
            {savedRecipes.length > 0 ? "Here are the recipes you've recently saved." : "You haven't saved any recipes yet. Generate one to get started!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {savedRecipes.length > 0 ? (
            <ul className="space-y-4">
              {savedRecipes.map((recipe) => (
                <li key={recipe.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border bg-background hover:bg-secondary/50 transition-colors">
                  <div className="mb-4 sm:mb-0">
                    <p className="font-semibold">{recipe.title}</p>
                    <p className="text-sm text-muted-foreground">From: {recipe.userInput.ingredients}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => viewRecipe(recipe)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
              <p>No recipes found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
