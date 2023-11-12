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
    if (window.innerWidth < 512) {
      setOnMobile(true);
    }
  }, [window.innerWidth]);
  return (
    <>
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
    </>
  );
}
