import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { BellIcon } from "@radix-ui/react-icons";

export default function DashBoardCard2({
  productivityScore,
  className,
}: {
  productivityScore: number;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {productivityScore ? (
            "Your Daily Alerts"
          ) : (
            <Skeleton className=" w-[120px] h-3 mb-1" />
          )}
        </CardTitle>
        <BellIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {productivityScore ? (
            "+ " + productivityScore
          ) : (
            <Skeleton className=" w-[50px] h-5 mb-1" />
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          {productivityScore ? (
            "Check out your daily alerts here!"
          ) : (
            <div>
              <Skeleton className=" w-[290px] h-2 mb-1" />
              <Skeleton className=" w-[50px] h-2 mb-1" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
