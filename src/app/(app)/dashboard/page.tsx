"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecipe } from '@/context/recipe-context';
import { UtensilsCrossed, Search, Bookmark } from 'lucide-react';
import GeneratePage from '../generate/page';
import BrowsePage from '../browse/page';
import MyRecipesContent from '@/components/my-recipes-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoadingSpinner from '@/components/ui/loading-spinner';

function DashboardContent() {
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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">
            <UtensilsCrossed className="mr-2 h-4 w-4" /> Generate Recipes with Ingredients
          </TabsTrigger>
          <TabsTrigger value="browse">
            <Search className="mr-2 h-4 w-4" /> Generate Recipes with Dish Name
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

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardContent />
    </Suspense>
  );
}