"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRecipe } from '@/context/recipe-context';
import { useRouter } from 'next/navigation';
import { Eye, Search, UtensilsCross, Bookmark } from 'lucide-react';
import type { Recipe } from '@/lib/types';
import GeneratePage from '../generate/page';
import SavedRecipesPage from '../saved/page';
import BrowsePage from '../browse/page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function Dashboard() {
  const { savedRecipes, setCurrentRecipe } = useRecipe();
  const router = useRouter();

  const viewRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    router.push('/recipe');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">
            <UtensilsCross className="mr-2 h-4 w-4" /> Generate Recipe
          </TabsTrigger>
          <TabsTrigger value="browse">
            <Search className="mr-2 h-4 w-4" /> Browse Recipes
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="mr-2 h-4 w-4" /> Saved Recipes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <GeneratePage />
        </TabsContent>
        <TabsContent value="browse">
            <BrowsePage />
        </TabsContent>
        <TabsContent value="saved">
          <SavedRecipesPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}