"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableCaption,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "./ui/scroll-area";

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
      procedure: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
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
  ];

  const handleTableRowClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Recipes</CardTitle>
          <ExclamationTriangleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="w-full">
          <Table>
            <TableCaption className="">
              A list of your current recipes.
            </TableCaption>
            <ScrollArea className="h-48">
              <TableBody className="">
                {recipes.map((recipe) => (
                  <TableRow
                    className=" cursor-pointer"
                    key={recipe.name}
                    onClick={() => handleTableRowClick(recipe)}
                  >
                    <TableCell className="font-medium">{recipe.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
        </CardContent>
      </Card>

      {selectedRecipe ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {selectedRecipe.name}
            </CardTitle>
            <ExclamationTriangleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <h6 className="text-md font-bold">
                <b>Ingredients: </b>
              </h6>
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h6 className="text-md font-bold mt-[10px]">
                <b>Procedure: </b>
              </h6>
              <ul>
                {selectedRecipe.procedure.map((procedure, index) => (
                  <li key={index}>{procedure}</li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div style={{ marginLeft: "30px" }}>
            <Skeleton className="h-5 w-[150px]" style={{ marginTop: "20px" }} />
            <div
              className="space-y-2"
              style={{ marginTop: "10px", marginLeft: "30px" }}
            >
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
