"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import LineChartComponent from "@/components/admin/charts/line.chart.page";
import PieChartComponent from "./charts/pie.chart.page";
import { useEffect, useRef, useState } from "react";
import LineChartModal from "./modal/line.chart.modal";
import PieChartModal from "./modal/pie.chart.modal";
import { useSession } from "next-auth/react";

type ChartDataItem = {
  time: string;
  [deviceId: string]: string | number | null;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ChartAdmin = () => {
  const { data: session } = useSession();

  const [openLineChartModal, setOpenLineChartModal] = useState(false);
  const [openPieChartModal, setOpenPieChartModal] = useState(false);

  const [dataLineChart, setDataLineChart] = useState<ChartDataItem[]>([]);
  const [dataPieChart, setDataPieChart] = useState<
    { name: string; value: number }[]
  >([]);
  const [value, setValue] = useState(0);
  const [dataTab, setDataTab] = useState<any[]>([]);

  const prevRecordsRef = useRef<IotData[]>([]);
  const hasAlertedRef = useRef(false); // Cờ để không alert lặp

  const handleOpenLineChart = () => setOpenLineChartModal(true);
  const handleCloseLineChart = () => setOpenLineChartModal(false);
  const handleOpenPieChart = () => setOpenPieChartModal(true);
  const handleClosePieChart = () => setOpenPieChartModal(false);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const groupDataByTime = (rawData: IotData[]) => {
    const grouped: Record<string, ChartDataItem> = {};
    const deviceSet = new Set<string>();

    rawData.forEach((item) => {
      const time = new Date(item.timestamp).toLocaleString("vi-VN", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const temperature = item.temperature ?? null;
      const deviceId = item.device_id;
      deviceSet.add(deviceId);

      if (!grouped[time]) grouped[time] = { time };
      grouped[time][deviceId] = temperature;
    });

    const allDeviceIds = Array.from(deviceSet);

    return Object.values(grouped).map((entry) => {
      allDeviceIds.forEach((id) => {
        if (!(id in entry)) {
          entry[id] = null;
        }
      });
      return entry;
    });
  };

  const groupByDevice = (data: any[]) => {
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      const key = item.device_id;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const fetchData = async (deviceId: string) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/iot/data`);
    url.searchParams.append("deviceId", deviceId);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const rawData: IotData[] = await response.json();

    // ✅ Lấy 3 bản ghi cuối cùng
    const lastThree = rawData.slice(-3);

    // 🔄 So sánh với bản ghi trước
    const isSame =
      JSON.stringify(lastThree) === JSON.stringify(prevRecordsRef.current);

    if (!isSame) {
      prevRecordsRef.current = lastThree;
      hasAlertedRef.current = false; // reset alert flag nếu có thay đổi
    }

    // 🚨 Gửi alert nếu có nhiệt độ vượt ngưỡng
    if (!hasAlertedRef.current) {
      const exceeded = lastThree.some((item) => item.temperature! > 34);
      if (exceeded) {
        hasAlertedRef.current = true;

        const message = `Cảnh báo: thiết bị ${deviceId} ghi nhận nhiệt độ vượt ngưỡng 34 độ.`;

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId,
            message,
            userEmail: session?.user?.email,
          }),
        });
      }
    }

    // 📊 Cập nhật biểu đồ
    const reversedData = [...rawData].reverse();
    const formatted = groupDataByTime(reversedData);
    setDataLineChart(formatted);
    setDataPieChart(groupByDevice(rawData));
  };

  const fetchDataTab = async () => {
    const accessToken = session?.access_token;
    if (!accessToken) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/devices`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const allDevices = data.data || [];

    const allowedDevices = [];
    for (const device of allDevices) {
      const checkRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/${device.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (checkRes.ok) {
        allowedDevices.push(device);
      }
    }
    setDataTab(allowedDevices);
  };

  // Lấy danh sách thiết bị 1 lần khi có session
  useEffect(() => {
    if (session) {
      fetchDataTab();
    }
  }, [session]);

  // Khi có dataTab và tabIndex thay đổi => fetch lại dữ liệu của thiết bị
  useEffect(() => {
    if (!session || dataTab.length === 0) return;
    const selectedDevice = dataTab[value];
    if (selectedDevice) {
      fetchData(selectedDevice.id);

      const interval = setInterval(() => {
        fetchData(selectedDevice.id);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [session, value, dataTab]);

  const selectedDeviceId = dataTab[value]?.id;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container>
        <Box sx={{ width: "100%", border: "1px solid #ccc", mt: 5 }}>
          {dataTab.length > 0 ? (
            <>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="device tabs"
                >
                  {dataTab.map((item) => (
                    <Tab label={item.name} key={item.id} />
                  ))}
                </Tabs>
              </Box>

              {dataTab.map((item, index) => (
                <CustomTabPanel value={value} index={index} key={item.id}>
                  <LineChartComponent
                    tabIndex={index}
                    deviceId={item.id}
                    data={dataLineChart.filter((d) => d[item.id] !== null)}
                    fetchData={() => fetchData(item.id)}
                    handleOpenLineChart={handleOpenLineChart}
                  />
                </CustomTabPanel>
              ))}
            </>
          ) : (
            <Typography sx={{ p: 2 }}>
              You do not have access to any devices.
            </Typography>
          )}
        </Box>

        <LineChartModal
          deviceId={selectedDeviceId}
          open={openLineChartModal}
          handleClose={handleCloseLineChart}
        />
        <PieChartModal
          deviceId={selectedDeviceId}
          rows={dataPieChart}
          open={openPieChartModal}
          handleClose={handleClosePieChart}
        />
      </Container>
    </Box>
  );
};

export default ChartAdmin;
