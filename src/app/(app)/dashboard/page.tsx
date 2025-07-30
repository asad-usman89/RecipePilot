"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRecipe } from '@/context/recipe-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, Search, UtensilsCrossed, Bookmark } from 'lucide-react';
import type { Recipe } from '@/lib/types';
import GeneratePage from '../generate/page';
import BrowsePage from '../browse/page';
import MyRecipesContent from '@/components/my-recipes-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function Dashboard() {
  const { savedRecipes, setCurrentRecipe } = useRecipe();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("generate");

  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['generate', 'browse', 'saved'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const viewRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    router.push('/recipe');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">
            <UtensilsCrossed className="mr-2 h-4 w-4" /> Generate Recipe
          </TabsTrigger>
          <TabsTrigger value="browse">
            <Search className="mr-2 h-4 w-4" /> Browse Recipes
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="mr-2 h-4 w-4" /> My Recipes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <GeneratePage />
        </TabsContent>
        <TabsContent value="browse">
            <BrowsePage />
        </TabsContent>
        <TabsContent value="saved">
          <MyRecipesContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
