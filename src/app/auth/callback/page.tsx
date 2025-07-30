"use client";

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useUser } from '@/context/user-context';
import { useToast } from '@/hooks/use-toast';

export default function AuthCallback() {
  const { setUser } = useUser();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Prevent multiple executions
      if (isProcessing) return;
      setIsProcessing(true);

      // If Supabase is not configured, redirect to login
      if (!isSupabaseConfigured() || !supabase) {
        toast({
          title: "Configuration Required",
          description: "Supabase authentication is not configured.",
        });
        window.location.href = '/';
        return;
      }

      try {
        // Handle the auth callback from the URL
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          toast({
            title: "Authentication Error",
            description: "There was an error verifying your email. Please try again.",
            variant: "destructive",
          });
          window.location.href = '/';
          return;
        }

        if (data.session && data.session.user.email) {
          // User is authenticated - set user data
          const userData = { email: data.session.user.email };
          setUser(userData);
          
          // Store in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(userData));
          
          // Show success message
          toast({
            title: "Welcome!",
            description: "You've been successfully logged in.",
          });
          
          // Small delay before redirect to ensure state is updated
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
        } else {
          // No session found
          toast({
            title: "Authentication Required",
            description: "Please check your email and click the magic link.",
          });
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        window.location.href = '/';
      }
    };

    handleAuthCallback();
  }, [setUser, toast, isProcessing]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg font-medium">Verifying your email...</p>
        <p className="text-muted-foreground">Please wait while we log you in.</p>
      </div>
    </div>
  );
}
