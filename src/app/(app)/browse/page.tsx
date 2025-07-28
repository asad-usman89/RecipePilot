"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const sampleRecipes = [
  {
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
    image: "https://placehold.co/600x400.png",
    hint: "pasta italian",
  },
  {
    title: "Chicken Tacos",
    description: "Spicy and savory chicken tacos.",
    image: "https://placehold.co/600x400.png",
    hint: "tacos mexican",
  },
  {
    title: "Beef Stir-fry",
    description: "Quick and easy beef stir-fry.",
    image: "https://placehold.co/600x400.png",
    hint: "beef stir-fry",
  },
    {
    title: "Vegan Buddha Bowl",
    description: "A healthy and colorful vegan bowl.",
    image: "https://placehold.co/600x400.png",
    hint: "vegan bowl",
  },
  {
    title: "Chocolate Lava Cakes",
    description: "Decadent and rich chocolate dessert.",
    image: "https://placehold.co/600x400.png",
    hint: "chocolate cake",
  },
  {
    title: "Classic American Burger",
    description: "A juicy beef burger with all the fixings.",
    image: "https://placehold.co/600x400.png",
    hint: "burger american",
  }
];

export default function BrowsePage() {
  return (
    <Card className="w-full shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Browse Recipes</CardTitle>
          <CardDescription>Get inspired by our collection of recipes.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleRecipes.map((recipe, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="aspect-video relative mb-4">
                            <Image src={recipe.image} alt={recipe.title} fill className="rounded-md object-cover" data-ai-hint={recipe.hint} />
                        </div>
                        <CardTitle>{recipe.title}</CardTitle>
                        <CardDescription>{recipe.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full">View Recipe</Button>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
    </Card>
  );
}