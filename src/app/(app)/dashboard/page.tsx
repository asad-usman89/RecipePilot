"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecipe } from '@/context/recipe-context';
import { UtensilsCrossed, Search, Bookmark, ChefHat } from 'lucide-react';
import GeneratePage from '../generate/page';
import BrowsePage from '../browse/page';
import MyRecipesContent from '@/components/my-recipes-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import LoadingSpinner from '@/components/ui/loading-spinner';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("generate");
  const [generateSubTab, setGenerateSubTab] = useState("ingredients");

  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'saved') {
      setActiveTab("saved");
    } else if (tab === 'browse') {
      setActiveTab("generate");
      setGenerateSubTab("dish");
    } else {
      setActiveTab("generate");
      setGenerateSubTab("ingredients");
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">
            <ChefHat className="mr-2 h-4 w-4" /> Generate Recipes
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="mr-2 h-4 w-4" /> My Recipes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate">
          <Card className="w-full shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">🍳 Generate Recipes</CardTitle>
              <CardDescription>Choose your preferred method to generate delicious recipes</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={generateSubTab} onValueChange={setGenerateSubTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ingredients">
                    <UtensilsCrossed className="mr-2 h-4 w-4" /> Generate with Ingredients
                  </TabsTrigger>
                  <TabsTrigger value="dish">
                    <Search className="mr-2 h-4 w-4" /> Generate with Dish Name
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ingredients" className="mt-6">
                  <GeneratePage />
                </TabsContent>
                <TabsContent value="dish" className="mt-6">
                  <BrowsePage />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved">
          <MyRecipesContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  );
}