"use client";
import NewUserQuiz from "@/components/NewUserQuiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { UserButton, useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

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
  const productivityScore = false;
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
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
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
                          {/* {userId && (
                            <OverviewTinyProductivityChart
                              setExpandedLoading={setExpandedLoading}
                              productivityScoreSetter={setProductivityScore}
                              expandedProductivityScoreSetter={
                                setExpandedProductivityScore
                              }
                              userId={userId}
                            />
                          )} */}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </>

          {/* <a
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Docs{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Find in-depth information about Next.js features and API.
        </p>
      </a> */}
        </main>
      )}
    </>
  );
}
