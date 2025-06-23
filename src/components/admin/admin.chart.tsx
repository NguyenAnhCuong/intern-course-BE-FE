"use client";

import { Box, Container, Divider, Typography } from "@mui/material";
import LineChartComponent from "@/components/admin/charts/line.chart.page";
import PieChartComponent from "./charts/pie.chart.page";

const ChartAdmin = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container>
        <Box sx={{}}>
          <Typography sx={{ my: 2 }}>Line Chart</Typography>
          <Divider />
          <Box sx={{ width: "100%", height: "500px" }}>
            <LineChartComponent />
          </Box>
        </Box>
        <Box sx={{}}>
          <Typography sx={{ my: 2 }}>Pie Chart</Typography>
          <Divider />
          <Box sx={{ width: "100%", height: "500px" }}>
            <PieChartComponent />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ChartAdmin;
