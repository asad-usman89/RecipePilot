"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecipe } from '@/context/recipe-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw, Save, Download, ChefHat } from 'lucide-react';
import Link from 'next/link';

export default function RecipePage() {
  const router = useRouter();
  const { currentRecipe, saveRecipe, savedRecipes } = useRecipe();
  const { toast } = useToast();

  useEffect(() => {
    if (!currentRecipe) {
      router.replace('/generate');
    }
  }, [currentRecipe, router]);

  if (!currentRecipe) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            <ChefHat className="w-24 h-24 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground mt-4">Loading recipe...</p>
        </div>
    );
  }

  const handleSave = () => {
    if (currentRecipe) {
        saveRecipe(currentRecipe);
        toast({
          title: "Recipe Saved!",
          description: `"${currentRecipe.title}" has been added to your saved recipes.`,
        });
    }
  };

  const handleDownload = () => {
    if (!currentRecipe) return;
    const recipeText = `
Title: ${currentRecipe.title}
Cooking Time: ${currentRecipe.cookingTime}
Servings: ${currentRecipe.servings}

Ingredients:
${currentRecipe.ingredients.map(ing => `- ${ing}`).join('\n')}

Steps:
${currentRecipe.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}
    `;
    const blob = new Blob([recipeText.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentRecipe.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isSaved = currentRecipe ? savedRecipes.some(r => r.id === currentRecipe.id) : false;

  return (
    <div className="container mx-auto p-4 md:p-8 flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline">🍛 {currentRecipe.title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-base">
            <span>🕒 Cook Time: {currentRecipe.cookingTime}</span>
            <span>👥 Servings: {currentRecipe.servings}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-4 md:px-6">
          <div>
            <h3 className="text-xl font-bold mb-2 font-headline">🧾 Ingredients</h3>
            <ul className="list-disc list-inside space-y-1 pl-2 text-base">
              {currentRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-bold mb-2 font-headline">🔪 Steps</h3>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-base">
              {currentRecipe.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button variant="outline" asChild>
                <Link href="/generate">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Regenerate
                </Link>
            </Button>
            <Button onClick={handleSave} disabled={isSaved} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Save className="mr-2 h-4 w-4" />
                {isSaved ? 'Saved' : 'Save Recipe'}
            </Button>
            <Button onClick={handleDownload} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
