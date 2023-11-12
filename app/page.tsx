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
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [pieChartVal, setPieChartVal] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [linechartData, setlineChartData] = useState([]);
  const [SustainablityScore, setSustainablityScore] = useState(0);
  const [receiptTabId, setReceiptTabId] = useState("");

  const [tabsValue, setTabsValue] = useState("overview");

  const fetchNotifications = async (email: string) => {
    const api = `https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/user/user_notifications/?email=${email}`;
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("fetchNotifications_function", data);
    } catch (error) {
      console.log("fetchNotifications_function", error);
    }
  };

  const fetchLineChartData = async (email: string) => {
    const api = `https://greenerchoicebackend-0edf19fb0f9e.herokuapp.com/api/user/user_sustainability_ratio_by_day/?email=${email}`;
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("fetchLineChartData_function", data);
      setlineChartData(data);
      // Convert the keys to dates and find the maximum date
      //@ts-ignore
      const maxDate = new Date(
        Math.max.apply(
          null,
          Object.keys(data).map((dateStr) => new Date(dateStr).getTime())
        )
      );

      // Format the date back to a string in the format "yyyy-mm-dd"
      const maxDateStr = maxDate.toISOString().split("T")[0];

      // Access the value of the maximum date
      const maxValue = data[maxDateStr];
      console.log("sus_score", maxValue);
      setSustainablityScore(maxValue);
    } catch (error) {
      console.log("fetchLineChartData_function", error);
    }
  };

  const fetchPieChartData = async (email: string) => {
    setPieChartVal([]);
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
      setUserEmail("");
      setLoading(true);
      if (user.primaryEmailAddress?.emailAddress) {
        setUserEmail(user.primaryEmailAddress.emailAddress);
        fetchPieChartData(user.primaryEmailAddress.emailAddress);
        fetchLineChartData(user.primaryEmailAddress.emailAddress);
        fetchNotifications(user.primaryEmailAddress.emailAddress);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [isLoaded, userId, isSignedIn, triggerUpdate]);
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
      } finally {
        setTriggerUpdate(!triggerUpdate);
      }
    }
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.querySelector(".file-input") as HTMLInputElement;
    fileInput.click();
  };
  return (
    <>
      {userEmail && (
        <main className="flex min-h-screen w-full flex-col items-center justify-between ">
          <NewUserQuiz email={userEmail} />

          <>
            <div className=" flex-col flex w-full max-w-7xl">
              <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                      Dashboard
                    </h2>
                    <p className="text-muted-foreground">
                      Hello, {user?.firstName} welcome to Greener Choice
                    </p>
                  </div>
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
                <Separator className="my-6" />

                <Tabs
                  defaultValue="overview"
                  className="space-y-4"
                  value={tabsValue}
                  onValueChange={(value) => {
                    setTabsValue(value);
                    console.log(value);
                  }}
                >
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="receipts">Receipts</TabsTrigger>
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
                          chartData={linechartData}
                          className="row-span-3"
                          //@ts-ignore
                          productivityScore={SustainablityScore.toFixed(2)}
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
                        {userId && (
                          <AnalyticsTable
                            setTabsValue={setTabsValue}
                            loading={loading}
                            userEmail={userEmail}
                            setReceiptTabId={setReceiptTabId}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="receipts">
                    <ReceipTable
                      userEmail={userEmail}
                      receiptTabId={receiptTabId}
                    />
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
