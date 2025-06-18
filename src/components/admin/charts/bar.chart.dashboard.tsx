"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", User: 10, Devices: 20, ActiveDevice: 5 },
  { month: "Feb", User: 15, Devices: 25, ActiveDevice: 10 },
  { month: "Mar", User: 10, Devices: 30, ActiveDevice: 12 },
  { month: "Apr", User: 12, Devices: 20, ActiveDevice: 8 },
  { month: "May", User: 20, Devices: 25, ActiveDevice: 15 },
  { month: "Jun", User: 25, Devices: 30, ActiveDevice: 10 },
  { month: "Jul", User: 30, Devices: 20, ActiveDevice: 18 },
  { month: "Aug", User: 28, Devices: 22, ActiveDevice: 20 },
  { month: "Sep", User: 15, Devices: 20, ActiveDevice: 15 },
  { month: "Oct", User: 18, Devices: 19, ActiveDevice: 12 },
  { month: "Nov", User: 22, Devices: 18, ActiveDevice: 10 },
  { month: "Dec", User: 25, Devices: 20, ActiveDevice: 18 },
];

const StackedBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="User" stackId="a" fill="#60a5fa" />
        <Bar dataKey="Devices" stackId="a" fill="#facc15" />
        <Bar dataKey="ActiveDevice" stackId="a" fill="#34d399" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
