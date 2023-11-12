"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";

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
          <CardTitle
            style={{
              textAlign: "center",
              fontSize: "20px",
              marginBottom: "20px",
              marginTop: '20px',
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
                marginLeft: '10px',
                marginRight: '10px',
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
            <TabsContent value="all time">
                <Card>
                    <Table>
                        <TableHeader>
                            <TableHead>
                                Rank
                            </TableHead>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead>
                                Score
                            </TableHead>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Test
                                </TableCell>
                                <TableCell>
                                    Test
                                </TableCell>
                                <TableCell>
                                    Test
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </TabsContent>
            <TabsContent value="7 days">

            </TabsContent>
            <TabsContent value="30 days">

            </TabsContent>
          </Tabs>
      </Card>
    </>
  );
}
