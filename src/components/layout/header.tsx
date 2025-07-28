"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChefHat, BookMarked, LogOut, Home, Share, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, this would clear the session.
    router.push("/");
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg mr-6">
          <ChefHat className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-headline text-2xl leading-none">RecipeAI</span>
            <span className="text-xs text-muted-foreground leading-none">Powered by n8n workflows</span>
          </div>
        </Link>
        
        <div className="ml-auto flex items-center gap-2">
           <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
           <Button variant="outline">
            <Heart className="h-4 w-4 mr-2" />
            Favorites
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="text-sm sm:text-base">
            <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}