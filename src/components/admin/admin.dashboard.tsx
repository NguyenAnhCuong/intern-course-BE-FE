"use client";

import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardDashboard from "@/components/admin/card/card.dashboard";
import TinyBarChart from "./charts/tiny.chart";
import { Pie, PieChart } from "recharts";
import DonutChart from "./charts/pie.chart.dashboard";
import StackedBarChart from "./charts/bar.chart.dashboard";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const COLORS = ["#a3e635", "#60a5fa", "#f472b6", "#34d399"];

const DashboardPage = () => {
  const [dataPieChart, setDataPie] = useState<any>([{}]);

  useEffect(() => {
    const data = [
      { name: "Users", value: 300 },
      { name: "Divices", value: 500 },
      { name: "ActiveDevices", value: 100 },
    ];
    setDataPie(data);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardDashboard
            title="Total users"
            data={18765}
            percent={2.6}
            isIncrease={true}
            chart={<TinyBarChart />}
          />
        </Grid>
        <Grid item xs={4}>
          <CardDashboard
            title="Total devices"
            data={4876}
            percent={0.2}
            isIncrease={true}
            chart={<TinyBarChart />}
          />
        </Grid>
        <Grid item xs={4}>
          <CardDashboard
            title="Total active devices"
            data={678}
            percent={0.1}
            isIncrease={false}
            chart={<TinyBarChart />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography>Pie chart</Typography>
            </CardContent>
            <DonutChart data={dataPieChart} />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography>Bar chart</Typography>
            </CardContent>
            <StackedBarChart />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
