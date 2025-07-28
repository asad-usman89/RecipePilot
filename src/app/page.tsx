"use client";

import { useRouter } from "next/navigation";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger the Supabase magic link flow.
    // For this demo, we'll just redirect to the dashboard.
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
             <ChefHat className="h-10 w-10 text-primary" />
             <CardTitle className="text-4xl font-headline">RecipePilot</CardTitle>
          </div>
          <CardDescription className="text-base pt-2">We'll send you a login link to get you cooking.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-md">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required className="py-6 text-base"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg">
              <span role="img" aria-label="lock emoji" className="mr-2">🔐</span>
              Send Magic Link
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
