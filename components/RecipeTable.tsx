"use client"
import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Table, TableCaption, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

// Define a type for the recipe object
interface Recipe {
  name: string;
  ingredients: string[];
  procedure: string[];
}

export function RecipeTable() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipes: Recipe[] = [
    {
      name: "Recipe 1",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
    {
      name: "Recipe 2",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
    {
      name: "Recipe 3",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
    {
      name: "Recipe 4",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
    {
      name: "Recipe 5",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
  ]

  const handleTableRowClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <>
    <Card>
        <CardHeader>
        <CardTitle>Current Recipes</CardTitle>
        <CardContent>
            <Table>
            <TableCaption>A list of your current recipes.</TableCaption>
            <TableBody>
            {recipes.map((recipe) => (
                <TableRow 
                key={recipe.name}
                onClick={() => handleTableRowClick(recipe)}
                style={{ cursor: "pointer" }}>
                <TableCell className="font-medium">{recipe.name}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
        </CardContent>
        </CardHeader>
    </Card>


    {selectedRecipe ? (
        <Card>
          <CardHeader>
            <CardTitle>{selectedRecipe.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <h3><b>Ingredients: </b></h3>
            <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            <h3 style={{ marginTop: '10px'}}><b>Procedure: </b></h3>
            <ul>
                {selectedRecipe.procedure.map((procedure, index) => (
                  <li key={index}>{procedure}</li>
                ))}
              </ul>
          </CardContent>
        </Card>
        ) : (
            <Card>
              <div style={{ marginLeft:'30px' }}>
              <Skeleton className="h-5 w-[150px]" style={{ marginTop:'20px' }}/>
              <div className="space-y-2" style={{ marginTop:'10px', marginLeft:'30px' }}>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
              </div>
            </Card>
        )}
        </>
    );
}