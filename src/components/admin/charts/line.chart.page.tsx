"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Kiểu dữ liệu ban đầu từ API
type RawData = {
  device_id: string;
  temperature: number | null;
  gas: number | null;
  timestamp: string;
};

// Dữ liệu đã gom nhóm
type ChartDataItem = {
  time: string;
  [deviceId: string]: string | number | null;
};

const LineChartComponent = () => {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [deviceIds, setDeviceIds] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/iot/data`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const rawData: RawData[] = await response.json();

      if (!rawData || rawData.length === 0) {
        console.warn("Không có dữ liệu.");
        return;
      }

      const formatted = groupDataByTime(rawData);
      setData(formatted.data);
      setDeviceIds(formatted.deviceIds);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        {deviceIds.map((id, index) => (
          <Line
            key={id}
            type="monotone"
            dataKey={id}
            stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
            connectNulls
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// ✅ Gom nhóm dữ liệu theo time
function groupDataByTime(rawData: RawData[]): {
  data: ChartDataItem[];
  deviceIds: string[];
} {
  const grouped: Record<string, ChartDataItem> = {};
  const deviceSet = new Set<string>();

  rawData.forEach((item) => {
    const time = new Date(item.timestamp).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const temperature = item.temperature ?? null;
    const deviceId = item.device_id;

    deviceSet.add(deviceId);

    if (!grouped[time]) grouped[time] = { time };
    grouped[time][deviceId] = temperature;
  });

  const allDeviceIds = Array.from(deviceSet);

  const completedData = Object.values(grouped).map((entry) => {
    allDeviceIds.forEach((id) => {
      if (!(id in entry)) {
        entry[id] = null;
      }
    });
    return entry;
  });

  return { data: completedData, deviceIds: allDeviceIds };
}

export default LineChartComponent;
