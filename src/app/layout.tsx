import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { RecipeProvider } from '@/context/recipe-context';
import { UserProvider } from '@/context/user-context';

export const metadata: Metadata = {
  title: 'RecipePilot',
  description: 'AI-Powered Recipe Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full bg-background">
        <UserProvider>
          <RecipeProvider>
            {children}
            <Toaster />
          </RecipeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
