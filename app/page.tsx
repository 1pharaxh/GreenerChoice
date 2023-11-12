"use client";
import NewUserQuiz from "@/components/NewUserQuiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UserButton, useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { TinyLineChart } from "@/components/TinyLineChart";
import DashBoardCard1 from "@/components/DashBoardCard1";
import DashBoardCard2 from "@/components/DashBoardCard2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { BigChart } from "@/components/BigChart";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (isLoaded && userId && isSignedIn) {
      setLoading(true);
      // call API
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoaded, userId, isSignedIn]);
  const productivityScore = 20;
  return (
    <>
      {!loading && (
        <main className="flex min-h-screen w-full flex-col items-center justify-between ">
          <NewUserQuiz />

          <>
            <div className=" flex-col flex w-full max-w-7xl">
              <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Dashboard
                    <br />
                    <span className="text-sm font-medium">
                      Hello, {user?.firstName} welcome to Greener Choice
                    </span>
                  </h2>

                  {/* <h2 className="text-sm font-medium tracking-tight">
                  Hello, {userId} your current active session is {sessionId}
                </h2> */}
                  <div className="flex items-center space-x-2">
                    <UserButton afterSignOutUrl="/delete-user-key " />
                  </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings" disabled>
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div>
                              {productivityScore ? (
                                <CardTitle>
                                  Expanded Productivity Score
                                </CardTitle>
                              ) : (
                                <Skeleton className=" w-[150px] h-5 my-1" />
                              )}
                              {productivityScore ? (
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
                                    This chart shows your productivity score
                                    every week with more data.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardHeader>
                        <CardContent className="pl-2">
                          {userId && (
                            <BigChart loading={productivityScore === 20} />
                          )}
                        </CardContent>
                      </Card>

                      <div className="grid gap-4 grid-rows-2">
                        <DashBoardCard1
                          className="row-span-3"
                          productivityScore={productivityScore}
                          userId={userId}
                        />
                        <DashBoardCard2
                          className="row-span-1"
                          productivityScore={productivityScore}
                        />
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>History</CardTitle>
                        <CardDescription>
                          See more browser history details.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* {userId && <AnalyticsTable userId={userId} />} */}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </>
        </main>
      )}
    </>
  );
}
