"use client";

import { useState } from 'react';
import { useRecipe } from '@/context/recipe-context';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Trash2, Heart, Clock, History } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Recipe } from '@/lib/types';

const RecipeList = ({ 
  recipes, 
  onDelete, 
  onView,
  showDeleteButton = true, 
  emptyMessage, 
  emptyDescription 
}: {
  recipes: Recipe[];
  onDelete?: (id: string) => void;
  onView: (recipe: Recipe) => void;
  showDeleteButton?: boolean;
  emptyMessage: string;
  emptyDescription: string;
}) => (
  <>
    {recipes.length > 0 ? (
      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border bg-background hover:bg-secondary/50 transition-colors">
            <div className="mb-4 sm:mb-0 mr-4 flex-1">
              <p className="font-semibold text-lg">{recipe.title}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span>⏱️ {recipe.cookingTime}</span>
                <span>🍽️ {recipe.servings} servings</span>
                <span className="text-xs">{new Date(recipe.id).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-2 self-end sm:self-center">
              <Button variant="outline" size="sm" onClick={() => onView(recipe)}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              {showDeleteButton && onDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete &ldquo;{recipe.title}&rdquo;.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onDelete(recipe.id)} 
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">{emptyMessage}</h3>
        <p>{emptyDescription}</p>
      </div>
    )}
  </>
);

export default function SavedRecipesPage() {
  const { 
    savedRecipes, 
    favoriteRecipes, 
    searchHistory, 
    deleteRecipe, 
    removeFavorite, 
    clearHistory, 
    setCurrentRecipe 
  } = useRecipe();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("saved");

  const viewRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    router.push('/recipe');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="w-full max-w-6xl mx-auto shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">📚 My Recipes</CardTitle>
          <CardDescription>
            All your delicious saved, favorited, and searched recipes in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Saved ({savedRecipes.length})
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favorites ({favoriteRecipes.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History ({searchHistory.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="mt-6">
              <RecipeList
                recipes={savedRecipes}
                onDelete={deleteRecipe}
                onView={viewRecipe}
                emptyMessage="No Saved Recipes"
                emptyDescription="Start generating recipes and save your favorites here!"
              />
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <RecipeList
                recipes={favoriteRecipes}
                onDelete={removeFavorite}
                onView={viewRecipe}
                emptyMessage="No Favorite Recipes"
                emptyDescription="Heart your favorite recipes to see them here!"
              />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Your recent recipe searches (showing last {searchHistory.length} searches)
                </p>
                {searchHistory.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Clear History
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear Search History?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all your recipe search history. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={clearHistory}
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                          Clear History
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              <RecipeList
                recipes={searchHistory}
                onView={viewRecipe}
                showDeleteButton={false}
                emptyMessage="No Search History"
                emptyDescription="Generate some recipes to see your search history here!"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
