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

import { useEffect, useState } from "react";
import DashBoardCard1 from "@/components/DashBoardCard1";
import DashBoardCard2 from "@/components/DashBoardCard2";
import { CldUploadButton } from "next-cloudinary";

import { PlusIcon } from "@radix-ui/react-icons";
import { AnalyticsTable } from "@/components/analyticstable";
import { Button } from "@/components/ui/button";
import ExpandedDashBoardCard from "@/components/ExpandedDashBoardCard";
import { ReceipTable } from "@/components/ReceipTable";
import { Leaderboard } from "@/components/Leaderboard";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [pieChartVal, setPieChartVal] = useState([]);

  const fetchPieChartData = async (email: string) => {
    const api = `https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/user/user_sustainability_doughnut_chart/?email=${email}`;

    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const val = data["Sutainability Ratio :"];
      const temp = [
        { name: "Sustainable", value: val },
        { name: "Non Sustainable", value: 100 - val },
      ];
      //@ts-ignore
      setPieChartVal(temp);
    } catch (error) {
      console.log("fetchPieChartData_function", error);
    }
  };

  const fetchData = async () => {
    if (isLoaded && userId && isSignedIn) {
      // call API
      if (user.primaryEmailAddress?.emailAddress) {
        setUserEmail(user.primaryEmailAddress.emailAddress);
        fetchPieChartData(user.primaryEmailAddress.emailAddress);
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
        email: userEmail,
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
                  <TabsTrigger value="receipts">Receipts</TabsTrigger>
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <ExpandedDashBoardCard
                      data={pieChartVal}
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
                        See your previous recipts.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userId && <AnalyticsTable userEmail={userEmail} />}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="receipts">
                  <ReceipTable />
                </TabsContent>

                <TabsContent value="leaderboard">
                  <Leaderboard />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
