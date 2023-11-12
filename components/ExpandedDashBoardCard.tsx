import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { BigPieChart } from "./BigPieChart";

export default function ExpandedDashBoardCard({
  loading,
  userId,
  data,
}: {
  loading: boolean;
  data: any;
  userId: string | null | undefined;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            {!loading ? (
              <CardTitle>Expanded Productivity Score</CardTitle>
            ) : (
              <Skeleton className=" w-[150px] h-5 my-1" />
            )}
            {!loading ? (
              <CardDescription>
                Learn more about your productivity score.
              </CardDescription>
            ) : (
              <Skeleton className=" w-[130px] h-[0.9rem] my-1" />
            )}
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoCircledIcon className="h-5 w-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-black max-w-[150px] text-white rounded-md p-3 space-y-0"
              >
                <TooltipArrow />
                <p className="text-sm font-medium">
                  This chart shows your productivity score every week with more
                  data.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        {data && <BigPieChart data={data} loading={loading} />}
      </CardContent>
    </Card>
  );
}
