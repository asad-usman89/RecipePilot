"use client";

import { useRecipe } from '@/context/recipe-context';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Trash2 } from 'lucide-react';
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

export default function SavedRecipesPage() {
  const { savedRecipes, deleteRecipe, setCurrentRecipe } = useRecipe();
  const router = useRouter();

  const viewRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    router.push('/recipe');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
       <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">📚 My Recipes</CardTitle>
          <CardDescription>
             {savedRecipes.length > 0 ? "All your delicious saved and favorited recipes in one place." : "You haven't saved any recipes yet."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {savedRecipes.length > 0 ? (
            <ul className="space-y-4">
              {savedRecipes.map((recipe) => (
                <li key={recipe.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border bg-background hover:bg-secondary/50 transition-colors">
                  <div className="mb-4 sm:mb-0 mr-4">
                    <p className="font-semibold text-lg">{recipe.title}</p>
                    <p className="text-sm text-muted-foreground">Saved on {new Date(recipe.id).toLocaleDateString()}</p>
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
                          <AlertDialogAction onClick={() => deleteRecipe(recipe.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg">
              <p className="text-lg">No recipes found.</p>
              <p>Go generate some culinary magic!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
