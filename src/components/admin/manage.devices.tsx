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
  Card,
  CardHeader,
  CardContent,
  TextField,
  MenuItem,
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
import { METHODS } from "http";
import { useSession } from "next-auth/react";

const ManageDevices = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<IDevices[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [dataDevices, setDataDevices] = useState<IDevices[]>([]);
  const [dataUsers, setDataUsers] = useState<IAccounts[]>([]);

  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [resDevices, resUsers] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/devices`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`),
      ]);

      const dataD = await resDevices.json();
      const dataU = await resUsers.json();

      setDataDevices(dataD.data ?? []);
      setRows(dataD.data ?? []);
      setDataUsers(dataU ?? []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePermit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        user_id: selectedUser,
        device_id: selectedDevice,
      }),
    });

    if (res.ok) {
      alert("Phân quyền thành công!");
      // Có thể reset form:
      setSelectedDevice("");
      setSelectedUser("");
    } else {
      alert(`Lỗi khi phân quyền: Something went wrong!.`);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
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

  const handleDeleteDevice = (id: string) => {
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
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (res.ok) {
        fetchAllData(); // reload lại danh sách
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
      <Card>
        <CardHeader
          title="Manage Devices"
          action={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              href="/admin/devices/add"
              color="primary"
            >
              New
            </Button>
          }
        />
        <Paper elevation={3}>
          <TableContainer>
            <Box sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 550 }}>
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
                  ) : rows.length > 0 ? (
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                              cursor: "pointer",
                            },
                          }}
                        >
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
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
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Card>

      {/* Dialog xác nhận xóa */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm delete of device with ID: <strong>{selectedId}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Form phân quyền */}
      <Card>
        <CardHeader title="Grant Access" />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              gap: 5,
              mt: 1,
              "& .MuiTextField-root": {
                width: { md: "28ch", xs: "none" },
                maxWidth: { md: "none", xs: "28ch" },
              },
            }}
          >
            <TextField
              variant="standard"
              select
              label="Select Device"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              {dataDevices.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  ID: {option.id} - Name: {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="standard"
              select
              label="Select User"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {dataUsers.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  Email: {option.email} - Name: {option.name}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  handlePermit();
                }}
              >
                Permit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageDevices;
