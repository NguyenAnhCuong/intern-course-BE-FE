"use client";

import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";

interface IDevices {
  id: string;
  name: string;
  status: string;
}

const ManageDevices = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<IDevices[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = await response.json();
      setRows(res.data);
    } catch (error) {
      console.error("Lỗi khi fetch danh sách thiết bị:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditDevice = (id: string) => {
    router.push(`/admin/devices/${id}`);
  };

  const handleDeleteDevice = async (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/${selectedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        fetchDevices(); // reload danh sách
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Lỗi khi xóa thiết bị:", err);
      alert("Đã xảy ra lỗi khi xóa thiết bị.");
    } finally {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box p={4} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Manage Devices
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          href="/admin/devices/add"
        >
          New Device
        </Button>
      </Box>

      {/* Table */}
      <Paper elevation={3}>
        <TableContainer>
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Device Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress size={24} />
                    </TableCell>
                  </TableRow>
                ) : Array.isArray(rows) ? (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={
                              row.status === "active" ? "Active" : "Deactive"
                            }
                            color={
                              row.status === "active" ? "success" : "error"
                            }
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleEditDevice(row.id)}
                            size="small"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteDevice(row.id)}
                            size="small"
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={rows.length ?? 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Device</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirm delete of device with ID: <strong>{selectedId}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancle</Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default ManageDevices;
