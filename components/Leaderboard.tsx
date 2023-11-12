"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableHeader, TableHead, TableRow } from "@/components/ui/table";

export function Leaderboard() {

  return (
    <>
      <Card
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          marginTop: "50px",
          borderRadius: "10px",
        }}
      >
        <CardHeader>
          <CardTitle
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            Leaderboard
          </CardTitle>
          <Tabs defaultValue="all time">
            <TabsList
              style={{
                display: "flex",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              <TabsTrigger
                value="all time"
                style={{ flex: 1, borderRadius: "10px" }}
              >
                All time
              </TabsTrigger>
              <TabsTrigger
                value="7 days"
                style={{ flex: 1, borderRadius: "10px" }}
              >
                Last 7 days
              </TabsTrigger>
              <TabsTrigger
                value="30 days"
                style={{ flex: 1, borderRadius: "10px" }}
              >
                Last 30 days
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader style={{ display: 'flex'}}>
                    <TableHead style= {{ flex: 1 }}>Rank</TableHead>
                    <TableHead style= {{ flex: 1 }}>Name</TableHead>
                    <TableHead style= {{ flex: 1 }}>Score</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow>

                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </>
  );
}
