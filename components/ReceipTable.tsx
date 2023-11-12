"use client";
import { useEffect, useState } from "react";
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

export function ReceipTable({
  receiptTabId,
  userEmail,
}: {
  receiptTabId: string;
  userEmail: string;
}) {
  const [selectedReceipt, setSelectedReceipt] = useState([]);

  const [dataTableIds, setdataTableIds] = useState<any>([]);
  const [receiptName, setreceiptName] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

  const fetchRowData = async (id: string) => {
    const api = `https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/receipt-records/?receipt_id=${id}`;
    try {
      const res = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data) {
        let items: any = [];
        data.map((elem: any) => {
          items.push(elem.item_name);
        });
        setSelectedReceipt(items);
        console.log("GOT ROW DATA", items);

        let suggestions: any = [];
        data.map((elem: any) => {
          if (elem.suggestion !== "None") {
            suggestions.push(elem.suggestion);
          }
        });
        console.log("SUGGESTIONS", suggestions);
        setSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchTableData = async () => {
    const api =
      "https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/receipt/receipts_table_view";
    try {
      // ${api}/?email=${userEmail}
      const res = await fetch(`${api}/?email=${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data) {
        const tableData = Object.keys(data).map((id) => {
          return id;
        });
        console.log("GOT TABLE IDS", tableData);

        setdataTableIds(tableData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchTableData();
  }, [userEmail]);
  return (
    <div>
      <div
        className="
      
      grid
      grid-cols-4
      w-full space-x-4"
      >
        <Card
          className="
        col-span-1
        "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Receipts</CardTitle>
            <CrumpledPaperIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="w-full">
            <ScrollArea className="h-80">
              <Table>
                <TableCaption className="">
                  A list of your receipts.
                </TableCaption>
                <TableBody className="">
                  {dataTableIds.map((elem: any) => (
                    <TableRow
                      className=" cursor-pointer"
                      key={elem}
                      onClick={() => {
                        fetchRowData(elem);
                        setreceiptName(elem);
                      }}
                    >
                      <TableCell className="font-medium">
                        Receipt - {elem}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedReceipt.length > 0 && (
          <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Receipt - {receiptName}
              </CardTitle>
              <PaperPlaneIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <h6 className="text-md font-bold mt-[10px]">
                  <b>From your personal 🤖 trainer: </b>
                </h6>
                <ul>
                  {suggestions.map((elem: any, index: any) => (
                    <li
                      className="
                    my-[5px]
                    "
                      key={index}
                    >
                      -{elem}
                    </li>
                  ))}
                </ul>

                <h6 className="text-md font-bold">
                  <b>All Purchases: </b>
                </h6>
                <ul>
                  {selectedReceipt.map((elem: any, index: any) => (
                    <li
                      className="
                    my-[5px]
                    "
                      key={index}
                    >
                      -{elem}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {selectedReceipt.length === 0 && (
          <Card className="col-span-3">
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
