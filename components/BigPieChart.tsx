"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function BigPieChart({ loading }: { loading: boolean }) {
  // check if user is on phone or computer if he is then set a state variable to true
  const [onMobile, setOnMobile] = useState(false);
  useEffect(() => {
    // Check if window is defined (i.e., we're on the client-side)
    if (typeof window !== "undefined" && window.innerWidth < 512) {
      setOnMobile(true);
    }
  }, [typeof window !== "undefined" ? window.innerWidth : undefined]);
  return (
    <>
      {!loading && (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={
                onMobile
                  ? false
                  : ({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {onMobile && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      )}

      {loading && (
        <div className="h-[350px] w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-5 border-b-2 border-green-600"></div>
        </div>
      )}
    </>
  );
}
