"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    // Check if user data exists in localStorage on component mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }

    setIsInitialized(true);
  }, [isInitialized]);

  useEffect(() => {
    // Listen for auth state changes only if Supabase is configured
    if (isSupabaseConfigured() && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event) => {
          // Only handle sign out events here to avoid conflicts with auth callback
          if (event === 'SIGNED_OUT') {
            setUser(null);
            localStorage.removeItem('user');
          }
          // Don't handle SIGNED_IN here as it's handled by the auth callback page
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []); // Empty dependency array - this should only run once

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextValue: UserContextType = {
    user,
    setUser: (userData: User | null) => {
      setUser(userData);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('user');
      }
    },
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
