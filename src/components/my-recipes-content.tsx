"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRecipe } from '@/context/recipe-context';
import { useRouter } from 'next/navigation';
import { Eye, Heart, Trash2, Clock, Users, Bookmark } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function MyRecipesPage() {
  const { savedRecipes, favoriteRecipes, deleteRecipe, removeFavorite, setCurrentRecipe } = useRecipe();
  const router = useRouter();

  const viewRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    router.push('/recipe');
  };

  const handleRemoveFavorite = (recipeId: string) => {
    removeFavorite(recipeId);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    deleteRecipe(recipeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">📚 My Recipes</h2>
          <p className="text-muted-foreground">
            All your delicious saved and favorited recipes in one place.
          </p>
        </div>
      </div>

      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Saved Recipes
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Favorites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="mt-6">
          {savedRecipes.length === 0 ? (
            <div className="text-center py-16">
              <Bookmark className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No saved recipes found.</h3>
              <p className="text-muted-foreground mb-6">
                Start saving recipes to see them here!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {savedRecipes.length} saved recipe{savedRecipes.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              <ul className="space-y-4">
                {savedRecipes.map((recipe) => (
                  <li key={recipe.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border bg-background hover:bg-secondary/50 transition-colors">
                    <div className="mb-4 sm:mb-0 mr-4">
                      <p className="font-semibold text-lg">{recipe.title}</p>
                      <p className="text-sm text-muted-foreground">Saved on {new Date(recipe.id).toLocaleDateString()}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {recipe.cookingTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {recipe.servings}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-center">
                      <Button variant="outline" size="sm" onClick={() => viewRecipe(recipe)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
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
                              This action cannot be undone. This will permanently delete the recipe for "{recipe.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteRecipe(recipe.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {favoriteRecipes.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No favorites found.</h3>
              <p className="text-muted-foreground mb-6">
                Start favoriting recipes to see them here!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {favoriteRecipes.length} favorite{favoriteRecipes.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteRecipes.map((recipe) => (
                  <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="line-clamp-2">{recipe.title}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFavorite(recipe.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2 flex-shrink-0"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {recipe.cookingTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {recipe.servings}
                          </div>
                        </div>
                        
                        {recipe.difficulty && (
                          <Badge variant="outline">{recipe.difficulty}</Badge>
                        )}
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Ingredients:</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {recipe.ingredients.slice(0, 3).join(', ')}
                            {recipe.ingredients.length > 3 && '...'}
                          </p>
                        </div>
                        
                        <Button 
                          onClick={() => viewRecipe(recipe)} 
                          className="w-full"
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Recipe
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
