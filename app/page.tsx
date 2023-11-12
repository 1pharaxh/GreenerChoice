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
import { CldUploadButton } from "next-cloudinary";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { BigPieChart } from "@/components/BigPieChart";
import { AnalyticsTable } from "@/components/analyticstable";
import { Button } from "@/components/ui/button";
import ExpandedDashBoardCard from "@/components/ExpandedDashBoardCard";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const fetchData = async () => {
    if (isLoaded && userId && isSignedIn) {
      // call API
      if (user.primaryEmailAddress?.emailAddress) {
        setUserEmail(user.primaryEmailAddress.emailAddress);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isLoaded, userId, isSignedIn]);
  const productivityScore = 20;

  const cloudinaryToBackend = async (res: any) => {
    const out: any = res.info;
    if (out) {
      const apiUrl =
        "https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/receipt/scan_receipt/";
      const body = {
        image_url: out.url,
        email: "test@gmail.com",
      };
      console.log(body);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("cloudinaryToBackend_function", error);
      }
    }
  };
  const handleUploadButtonClick = () => {
    const fileInput = document.querySelector(".file-input") as HTMLInputElement;
    fileInput.click();
  };
  return (
    <>
      {!loading && (
        <main className="flex min-h-screen w-full flex-col items-center justify-between ">
          <NewUserQuiz email={userEmail} />

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
                  <div className="flex items-end space-y-2 flex-col ">
                    <UserButton afterSignOutUrl="/" />

                    <CldUploadButton
                      className="file-input hidden"
                      options={{
                        clientAllowedFormats: ["png", "gif", "jpeg", "jpg"],
                      }}
                      onSuccess={cloudinaryToBackend}
                      uploadPreset="ml_default"
                    />

                    <Button
                      onClick={handleUploadButtonClick}
                      variant={"notification"}
                      className="flex items-center justify-center gap-1"
                    >
                      Upload
                      <PlusIcon className="h-5 w-5 text-green-600" />
                    </Button>
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
                      <ExpandedDashBoardCard
                        loading={loading}
                        userId={userId}
                      />

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
                        {userId && <AnalyticsTable userId={userId} />}
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
