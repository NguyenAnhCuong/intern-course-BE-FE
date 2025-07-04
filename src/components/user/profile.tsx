"use client";

import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";

const ProfilePage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpenMenu = Boolean(anchorEl);

  useEffect(() => {}, []);

  const handleShowMenuOption = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateButton = () => {};

  const handleResetButton = () => {};

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      open={isOpenMenu}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Upload Image</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2, gap: 4 }}>
      <Box sx={{ fontSize: "25px", fontWeight: "600" }}>Profile</Box>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          position: "relative",
          height: "250px",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Cover image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url(/assets/bg4.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />

        {/* Avatar + Tên */}

        <Box
          component={"div"}
          onClick={handleShowMenuOption}
          sx={{
            position: "absolute",
            left: 24,
            bottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 2,
            zIndex: 2,
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box
            component="img"
            src="/assets/avatar25.jpg"
            alt="Avatar"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
          <Box>
            <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>User name</Box>
            <Box sx={{ fontSize: "15px", opacity: 0.9 }}>Role</Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Cột trái - Account Information */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 2, fontWeight: "bold" }}>
              Account Infomation
            </Typography>
            <TextField
              fullWidth
              label="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              disabled
              label="Current Password"
              type="password"
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  handleUpdateButton();
                }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  handleResetButton();
                }}
              >
                Reset
              </Button>
            </Box>
          </Grid>

          {/* Cột phải - Change Password */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 2, fontWeight: "bold" }}>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              sx={{ mb: 2 }}
            />
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="ADMIN"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel value="USER" control={<Radio />} label="User" />
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>
      {renderMenu}
    </Box>
  );
};
export default ProfilePage;
