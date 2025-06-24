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
import { useEffect, useState } from "react";
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
  const handleOpenLineChart = () => setOpenLineChartModal(true);
  const handleCloseLineChart = () => setOpenLineChartModal(false);

  const [openPieChartModal, setOpenPieChartModal] = useState(false);
  const handleOpenPieChart = () => setOpenPieChartModal(true);
  const handleClosePieChart = () => setOpenPieChartModal(false);

  const [dataLineChart, setDataLineChart] = useState<ChartDataItem[]>([]);
  const [dataPieChart, setDataPieChart] = useState<
    { name: string; value: number }[]
  >([]);
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const [value, setValue] = useState(0);
  const [dataTab, setDataTab] = useState<any[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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

    const completedData = Object.values(grouped).map((entry) => {
      allDeviceIds.forEach((id) => {
        if (!(id in entry)) {
          entry[id] = null;
        }
      });
      return entry;
    });

    return { data: completedData, deviceIds: allDeviceIds };
  };

  const groupByDevice = (data: any[]) => {
    const counts: Record<string, number> = {};
    data.forEach((item) => {
      const key = item.device_id;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/iot/data`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const rawData: IotData[] = await response.json();
    const formatted = groupDataByTime(rawData);
    setDataLineChart(formatted.data);
    setDeviceIds(formatted.deviceIds);

    const pieData = groupByDevice(rawData);
    setDataPieChart(pieData);
  };

  const fetchDataTab = async () => {
    try {
      const accessToken = session?.access_token;
      if (!accessToken) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
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
    } catch (err) {
      console.error("Lỗi khi fetchDataTab:", err);
    }
  };

  useEffect(() => {
    fetchDataTab();
    fetchData();
  }, []);

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
                  {dataTab.map((item, index) => (
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
                    fetchData={fetchData}
                    handleOpenLineChart={handleOpenLineChart}
                  />
                  {/* <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ my: 2 }}>Pie Chart</Typography>
                      <Button
                        variant="outlined"
                        size="medium"
                        onClick={handleOpenPieChart}
                      >
                        Detail
                      </Button>
                    </Box>
                    <Divider />
                    <Box sx={{ width: "100%", height: "500px" }}>
                      <PieChartComponent
                        data={dataPieChart}
                        fetchData={fetchData}
                      />
                    </Box>
                  </Box> */}
                </CustomTabPanel>
              ))}
            </>
          ) : (
            <Typography sx={{ p: 2 }}>
              Bạn không có quyền truy cập bất kỳ thiết bị nào.
            </Typography>
          )}
        </Box>

        <LineChartModal
          deviceId={dataTab[value]?.id}
          open={openLineChartModal}
          handleClose={handleCloseLineChart}
        />
        <PieChartModal
          deviceId={dataTab[value]?.id}
          rows={dataPieChart}
          open={openPieChartModal}
          handleClose={handleClosePieChart}
        />
      </Container>
    </Box>
  );
};

export default ChartAdmin;
