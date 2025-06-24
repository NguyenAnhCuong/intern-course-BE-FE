"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Height } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const LineChartModal = (props: any) => {
  const [rows, setRows] = useState<IotData[]>([]);
  const { data: session } = useSession();

  const fetchData = async () => {
    try {
      // 1. Kiểm tra quyền truy cập thiết bị
      const checkRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/${props.deviceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`, // hoặc lấy token từ cookie tùy bạn dùng gì
          },
        }
      );

      if (!checkRes.ok) {
        const errorData = await checkRes.json();
        alert(errorData.message || "Không có quyền truy cập thiết bị");
        return;
      }

      // 2. Nếu có quyền, gọi API dữ liệu IoT
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/iot/data?deviceId=${props.deviceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const rawData: IotData[] = await response.json();

      if (!rawData || rawData.length === 0) {
        console.log("Không có dữ liệu.");
        return;
      }

      setRows(rawData);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
      alert("Đã xảy ra lỗi khi tải dữ liệu");
    }
  };

  useEffect(() => {
    if (props.deviceId) {
      fetchData();
    }
  }, [props.deviceId]);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          maxHeight: "80vh",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
          [theme.breakpoints.down("sm")]: {
            width: "90%",
            p: 2,
          },
        })}
      >
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Device ID</TableCell>
                <TableCell align="left">Temperature</TableCell>
                <TableCell align="center">Gas</TableCell>
                <TableCell align="center">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.device_id}</TableCell>
                  <TableCell align="left">{row.temperature}</TableCell>
                  <TableCell align="center">{row.gas}</TableCell>
                  <TableCell align="center">
                    {new Date(row.timestamp).toLocaleString("vi-VN", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default LineChartModal;
