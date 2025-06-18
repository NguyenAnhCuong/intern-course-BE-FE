"use client";

import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { value: 10 },
  { value: 15 },
  { value: 12 },
  { value: 18 },
  { value: 20 },
  { value: 17 },
  { value: 22 },
];

const TinyBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <BarChart data={data}>
        <Tooltip cursor={false} />
        <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TinyBarChart;
