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
import {
  CrumpledPaperIcon,
  ExclamationTriangleIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "./ui/scroll-area";

// Define a type for the recipe object
interface Receipts {
  name: string;
  ingredients: string[];
  procedure: string[];
}

export function ReceipTable({ receiptTabId }: { receiptTabId: string }) {
  const [selectedReceipt, setSelectedReceipt] = useState<Receipts | null>(null);

  const recipes: Receipts[] = [
    {
      name: "Receipt 1",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
    },
    {
      name: "Receipt 2",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
    {
      name: "Receipt 3",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
    {
      name: "Receipt 4",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
    {
      name: "Receipt 5",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      procedure: ["Step 1", "Step 2", "Step 3"],
    },
  ];

  const handleTableRowClick = (receipt: Receipts) => {
    setSelectedReceipt(receipt);
  };

  return (
    <div>
      <div className="flex w-full space-x-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Receipts</CardTitle>
            <CrumpledPaperIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="w-full">
            <Table>
              <TableCaption className="">A list of your receipts.</TableCaption>
              <ScrollArea className="h-48">
                <TableBody className="">
                  {recipes.map((recipe) => (
                    <TableRow
                      className=" cursor-pointer"
                      key={recipe.name}
                      onClick={() => handleTableRowClick(recipe)}
                    >
                      <TableCell className="font-medium">
                        {recipe.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollArea>
            </Table>
          </CardContent>
        </Card>

        {selectedReceipt ? (
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {selectedReceipt.name}
              </CardTitle>
              <PaperPlaneIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <h6 className="text-md font-bold">
                  <b>All Purchases: </b>
                </h6>
                <ul>
                  {selectedReceipt.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h6 className="text-md font-bold mt-[10px]">
                  <b>From your personal 🤖 trainer: </b>
                </h6>
                <ul>
                  {selectedReceipt.procedure.map((procedure, index) => (
                    <li key={index}>{procedure}</li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full">
            <div style={{ marginLeft: "30px" }}>
              <Skeleton
                className="h-5 w-[150px]"
                style={{ marginTop: "20px" }}
              />
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
      </div>
    </div>
  );
}
