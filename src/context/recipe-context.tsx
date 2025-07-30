"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Recipe } from '@/lib/types';

interface RecipeContextType {
  currentRecipe: Recipe | null;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  savedRecipes: Recipe[];
  favoriteRecipes: Recipe[];
  searchHistory: Recipe[];
  saveRecipe: (recipe: Recipe) => void;
  favoriteRecipe: (recipe: Recipe) => void;
  addToHistory: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: string) => void;
  removeFavorite: (recipeId: string) => void;
  clearHistory: () => void;
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
  const [searchHistory, setSearchHistory] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const saved = localStorage.getItem('savedRecipes');
        const favorites = localStorage.getItem('favoriteRecipes');
        const history = localStorage.getItem('searchHistory');
        
        if (saved) setSavedRecipes(JSON.parse(saved));
        if (favorites) setFavoriteRecipes(JSON.parse(favorites));
        if (history) setSearchHistory(JSON.parse(history));
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadFromStorage();
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

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

  const addToHistory = (recipe: Recipe) => {
    // Add to beginning of history and remove if already exists to avoid duplicates
    setSearchHistory(prev => {
      const filtered = prev.filter(r => r.id !== recipe.id);
      return [recipe, ...filtered].slice(0, 50); // Keep only last 50 searches
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
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
      searchHistory,
      saveRecipe,
      favoriteRecipe,
      addToHistory,
      deleteRecipe,
      removeFavorite,
      clearHistory,
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
