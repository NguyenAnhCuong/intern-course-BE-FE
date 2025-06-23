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

const groupByDevice = (data: any[]) => {
  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const key = item.device_id;
    counts[key] = (counts[key] || 0) + 1;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

const PieChartComponent = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/iot/data`
      );
      const res = await response.json();

      if (res) {
        const pieData = groupByDevice(res);
        setData(pieData);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData(); // gọi lần đầu

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // mỗi 5 giây gọi lại

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      style={{ marginTop: "30px" }}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
