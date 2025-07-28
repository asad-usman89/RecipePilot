"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateRecipeWithPreference } from '@/ai/flows/generate-recipe-with-preference';
import { useRecipe } from '@/context/recipe-context';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const dietaryPreferences = ['No Preference', 'Vegan', 'Gluten-Free', 'Keto', 'High Protein'];

const formSchema = z.object({
  ingredients: z.string().min(3, { message: "Please enter at least one ingredient." }),
  dietaryPreference: z.string(),
});

export default function GeneratePage() {
  const router = useRouter();
  const { setCurrentRecipe, setIsLoading, isLoading } = useRecipe();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
      dietaryPreference: "No Preference",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const recipeData = await generateRecipeWithPreference({
        ingredients: values.ingredients,
        dietaryPreference: values.dietaryPreference === 'No Preference' ? undefined : values.dietaryPreference,
      });

      const newRecipe = {
        id: new Date().toISOString(),
        ...recipeData,
        userInput: values,
      };

      setCurrentRecipe(newRecipe);
      router.push('/recipe');

    } catch (error) {
      console.error("Failed to generate recipe:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "We couldn't generate a recipe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Generate a New Recipe</CardTitle>
          <CardDescription>Tell us what you have and any preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">🧄 Ingredients You Have:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., tomatoes, onions, chicken, garlic"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietaryPreference"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg">🥗 Dietary Preference (optional):</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2"
                      >
                        {dietaryPreferences.map((pref) => (
                          <FormItem key={pref} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={pref} id={pref}/>
                            </FormControl>
                            <FormLabel htmlFor={pref} className="font-normal cursor-pointer">{pref}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Recipe'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
