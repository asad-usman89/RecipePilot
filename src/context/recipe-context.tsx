"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Recipe } from '@/lib/types';

interface RecipeContextType {
  currentRecipe: Recipe | null;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  savedRecipes: Recipe[];
  favoriteRecipes: Recipe[];
  saveRecipe: (recipe: Recipe) => void;
  favoriteRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: string) => void;
  removeFavorite: (recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;
  isRecipeFavorited: (recipeId: string) => boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveRecipe = (recipe: Recipe) => {
    if (!savedRecipes.some(r => r.id === recipe.id)) {
      setSavedRecipes(prev => [...prev, recipe]);
    }
  };

  const favoriteRecipe = (recipe: Recipe) => {
    if (!favoriteRecipes.some(r => r.id === recipe.id)) {
      setFavoriteRecipes(prev => [...prev, recipe]);
    }
  };

  const deleteRecipe = (recipeId: string) => {
    setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  const removeFavorite = (recipeId: string) => {
    setFavoriteRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.some(r => r.id === recipeId);
  };

  const isRecipeFavorited = (recipeId: string) => {
    return favoriteRecipes.some(r => r.id === recipeId);
  };

  return (
    <RecipeContext.Provider value={{
      currentRecipe,
      setCurrentRecipe,
      savedRecipes,
      favoriteRecipes,
      saveRecipe,
      favoriteRecipe,
      deleteRecipe,
      removeFavorite,
      isRecipeSaved,
      isRecipeFavorited,
      isLoading,
      setIsLoading,
      error,
      setError
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};
