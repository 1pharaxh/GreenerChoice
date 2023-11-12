import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { TinyLineChart } from "./TinyLineChart";

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
            "Productivity Score"
          ) : (
            <Skeleton className=" w-[120px] h-3 mb-1" />
          )}
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
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
            "This score is the average of your last 7 days distraction score"
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
