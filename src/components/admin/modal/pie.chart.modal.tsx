"use client";

import Box from "@mui/material/Box";
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

const PieChartModal = (props: any) => {
  // Lọc dữ liệu chỉ hiển thị theo deviceId được chọn
  const filteredRows = props.rows.filter(
    (row: any) => row.name === props.deviceId
  );

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
                <TableCell align="left">Number of Records</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row: any, index: number) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              ))}
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Không có dữ liệu cho thiết bị này.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default PieChartModal;
