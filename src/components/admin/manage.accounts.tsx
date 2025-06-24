"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Edit } from "@mui/icons-material";

const ManageAccounts = () => {
  const [rows, setRows] = useState<IAccounts[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {}, []);

  const fetchAccounts = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    console.log(data);

    setRows(data);
  };

  useEffect(() => {
    fetchAccounts(); // Fetch accounts when component mounts
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

  const handleEditUser = (id: IAccounts["id"]) => {};

  const handleDeleteUser = (id: IAccounts["id"]) => {};

  return (
    <Box p={4} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ fontSize: { md: 25, xs: 18 }, fontWeight: 600 }}>
          Manage Accounts
        </Box>
        <Button color="info" variant="contained" href="">
          <AddIcon sx={{ mr: 1 }} />
          New User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEditUser(row.id)}>
                      <Edit
                        sx={{
                          "&:hover": {
                            color: "blue",
                          },
                        }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(row.id)}>
                      <Delete
                        sx={{
                          "&:hover": {
                            color: "red",
                          },
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default ManageAccounts;
