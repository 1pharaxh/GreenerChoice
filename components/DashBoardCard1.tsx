import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { TinyLineChart } from "./TinyLineChart";
import { MixIcon } from "@radix-ui/react-icons";

export default function DashBoardCard1({
  productivityScore,
  userId,
  className,
  chartData,
}: {
  productivityScore: number;
  userId: any;
  className?: string;
  chartData: any;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {productivityScore ? (
            "Weekly Sustainability Score"
          ) : (
            <Skeleton className=" w-[120px] h-3 mb-1" />
          )}
        </CardTitle>
        <MixIcon className="h-4 w-4 text-muted-foreground" />
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
            "Here we can track our last 7 day progress to see how we are doing!"
          ) : (
            <div>
              <Skeleton className=" w-[290px] h-2 mb-1" />
              <Skeleton className=" w-[50px] h-2 mb-1" />
            </div>
          )}
        </div>
        <TinyLineChart
          className="mt-4"
          chartData={chartData}
          loading={productivityScore}
          userId={userId}
        />
      </CardContent>
    </Card>
  );
}
