"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

const COLORS = [
  "#3366FF",
  "#6F42C1",
  "#D63384",
  "#FD7E14",
  "#28A745",
  "#17A2B8",
];

const PieChartComponent = (props: any) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      style={{ marginTop: "30px" }}
    >
      <PieChart>
        <Pie
          data={props.data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {props.data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index + 1}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
