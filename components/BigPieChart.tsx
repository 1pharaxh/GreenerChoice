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

const COLORS = ["#16a34a", "#b45309", "#FFBB28", "#FF8042"];

export function BigPieChart({
  loading,
  data,
}: {
  loading: boolean;
  data: any;
}) {
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
            >
              {data &&
                data.map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
            <Legend />
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
