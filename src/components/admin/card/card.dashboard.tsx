"use client";

import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { green, red } from "@mui/material/colors";

interface ICard {
  title: string;
  data: number;
  percent?: number;
  isIncrease?: boolean;
  chart?: React.ReactNode;
}

const CardDashboard = ({ title, data, percent, isIncrease, chart }: ICard) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5">{data.toLocaleString()}</Typography>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            {isIncrease ? (
              <ArrowDropUpIcon sx={{ color: green[500] }} />
            ) : (
              <ArrowDropDownIcon sx={{ color: red[500] }} />
            )}
            <Typography
              variant="body2"
              color={isIncrease ? green[600] : red[600]}
            >
              {percent}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              last 7 days
            </Typography>
          </Stack>
        </Box>

        <Box mt={1}>{chart}</Box>
      </CardContent>
    </Card>
  );
};

export default CardDashboard;
