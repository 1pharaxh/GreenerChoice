import { LockClosedIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

interface Data {
  productivityScore: number;
}
const demoData: Data[] = [
  {
    productivityScore: 12,
  },
  {
    productivityScore: 2,
  },
  {
    productivityScore: 13,
  },
  {
    productivityScore: 2,
  },
  {
    productivityScore: 5,
  },
  {
    productivityScore: 7,
  },
];

export function TinyLineChart({
  userId,
  loading,
}: {
  userId?: any;
  loading: number;
}) {
  const data = demoData;

  return (
    <div className="h-[80px]">
      {data.length > 1 && loading !== 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="productivityScore"
              activeDot={{
                r: 6,
                style: {
                  fill: "var(--theme-primary)",
                  opacity: 0.25,
                },
              }}
              style={
                {
                  stroke: "var(--theme-primary)",
                  "--theme-primary": "#adfa1d",
                } as React.CSSProperties
              }
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#FEFEFE",
                border: "none",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                zIndex: 9999,
              }}
              itemStyle={{
                color: "#659D0A",
              }}
              formatter={(value) => [`${value}`, "Points"]}
              labelFormatter={(label) => ``}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      {data.length < 1 && loading !== 0 && (
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="absolute flex flex-col items-center justify-center z-50">
            <LockClosedIcon className="w-8 h-8 text-slate-300" />
            <p className="text-center text-muted-foreground text-sm mt-2">
              Sorry we are still collecting data
            </p>
          </div>

          <div className=" h-full blur-[3px] bg-slate-50 rounded-xl">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={demoData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="productivityScore"
                  activeDot={{
                    r: 6,
                    style: {
                      fill: "var(--theme-primary)",
                      opacity: 0.25,
                    },
                  }}
                  style={
                    {
                      stroke: "var(--theme-primary)",
                      "--theme-primary": "#adfa1d",
                    } as React.CSSProperties
                  }
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#FEFEFE",
                    border: "none",
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    zIndex: 9999,
                  }}
                  itemStyle={{
                    color: "#659D0A",
                  }}
                  formatter={(value) => [`${value}`, "Points"]}
                  labelFormatter={(label) => ``}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {loading === 0 && (
        <div className="h-[80px] w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-5 border-b-2 border-[#adfa1d]"></div>
        </div>
      )}
    </div>
  );
}
