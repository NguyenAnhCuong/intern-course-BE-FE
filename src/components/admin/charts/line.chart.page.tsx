"use client";

import { Box, Button, Divider, Typography } from "@mui/material";
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

const generateColorFromIndex = (index: number) => {
  // Tạo màu theo dải màu hue HSL
  return `hsl(${(index * 72) % 360}, 70%, 50%)`;
};

const LineChartComponent = (props: any) => {
  const { deviceId, data, tabIndex } = props;
  const strokeColor = generateColorFromIndex(tabIndex);

  const hasValidData = data.some((item: any) => {
    const value = item[deviceId];
    return typeof value === "number" && !isNaN(value);
  });

  if (!hasValidData) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">
          Không có dữ liệu để hiển thị biểu đồ.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ my: 2 }}>Line Chart</Typography>
        <Button
          variant="outlined"
          size="medium"
          onClick={() => {
            props.handleOpenLineChart();
          }}
        >
          Detail
        </Button>
      </Box>
      <Divider />
      <Box sx={{ width: "100%", height: "500px" }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={deviceId}
              stroke={strokeColor}
              connectNulls
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default LineChartComponent;
