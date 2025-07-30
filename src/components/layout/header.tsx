"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChefHat, BookMarked, LogOut, Home, Heart, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Show My Recipes button when user is on recipe page or generate page (after generating)
  const showMyRecipesButton = pathname === '/recipe' || pathname === '/generate';

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <ChefHat className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-headline text-2xl leading-none">RecipeAI</span>
              <span className="text-xs text-muted-foreground leading-none">Powered by n8n workflows</span>
            </div>
          </Link>
          
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="p-2">
              <Home className="h-5 w-5" />
            </Button>
          </Link>

          {showMyRecipesButton && (
            <Link href="/dashboard?tab=saved">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                My Recipes
              </Button>
            </Link>
          )}
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          {user && (
            <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-md">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground truncate max-w-[150px]">
                {user.email}
              </span>
            </div>
          )}
          <Button variant="ghost" onClick={handleLogout} className="text-sm sm:text-base">
            <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}