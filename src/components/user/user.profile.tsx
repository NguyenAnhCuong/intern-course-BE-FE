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
import { useSession } from "next-auth/react";

const UserProfilePage = () => {
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpenMenu = Boolean(anchorEl);

  useEffect(() => {
    if (session?.user) {
      setUserName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
      setRole(session.user.role ?? "ADMIN");
      setCurrPassword(session.user.password ?? "");
    }
  }, [session]);

  const handleShowMenuOption = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateButton = () => {
    //validate
    //call api
  };

  const handleResetButton = () => {
    if (session?.user) {
      setUserName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
      setRole(session.user.role ?? "ADMIN");
      setCurrPassword(session.user.password ?? "");
      return;
    }
    setUserName("");
    setEmail("");
    setRole("");
    setCurrPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

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
            <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>
              {session?.user?.name}
            </Box>
            <Box sx={{ fontSize: "15px", opacity: 0.9 }}>
              {session?.user.role}
            </Box>
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
              value={currPassword}
              onChange={(e) => setCurrPassword(e.target.value)}
            />
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              sx={{ mb: 2 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                disabled
                value="ADMIN"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                disabled
                value="USER"
                control={<Radio />}
                label="User"
              />
            </RadioGroup>
          </Grid>
        </Grid>
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
      </Box>
      {renderMenu}
    </Box>
  );
};
export default UserProfilePage;
