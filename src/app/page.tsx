"use client";

import { useRouter } from "next/navigation";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      // Fallback to demo mode
      toast({
        title: "Demo Mode",
        description: "Supabase not configured. Logging you in directly for demo purposes.",
      });
      setUser({ email: email.trim() });
      router.push("/dashboard");
      setIsLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase!.auth.signInWithOtp({
        email: email.trim(),
        options: {
          // This is the URL that Supabase will redirect to after email verification
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Magic Link Sent!",
          description: `Check your email at ${email} for the login link.`,
        });
        // For demo purposes, also save the email to context
        setUser({ email: email.trim() });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
             <ChefHat className="h-10 w-10 text-primary" />
             <CardTitle className="text-4xl font-headline">RecipePilot</CardTitle>
          </div>
          <CardDescription className="text-base pt-2">
            {isSupabaseConfigured() 
              ? "We'll send you a login link to get you cooking."
              : "Demo mode: Enter any email to continue (Supabase not configured)."
            }
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-md">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="py-6 text-base"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg"
              disabled={isLoading}
            >
              <span role="img" aria-label="lock emoji" className="mr-2">🔐</span>
              {isLoading 
                ? "Processing..." 
                : isSupabaseConfigured() 
                  ? "Send Magic Link" 
                  : "Continue (Demo Mode)"
              }
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
