"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChefHat, BookMarked, LogOut, Home } from "lucide-react";
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
          <ChefHat className="h-7 w-7 text-primary" />
          <span className="font-headline hidden sm:inline-block">RecipePilot</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild className="text-sm sm:text-base">
            <Link href="/dashboard">
              <Home className="h-4 w-4 mr-1 sm:mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-sm sm:text-base">
            <Link href="/saved">
              <BookMarked className="h-4 w-4 mr-1 sm:mr-2" />
              Saved
            </Link>
          </Button>
        </nav>
        <div className="ml-auto">
          <Button variant="ghost" onClick={handleLogout} className="text-sm sm:text-base">
            <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
