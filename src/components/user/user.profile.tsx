"use client";

import {
  Alert,
  AlertColor,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserProfilePage = () => {
  const { data: session, update } = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");
  const [colorMessage, setColorMessage] = useState<AlertColor>("success");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [currPassword, setCurrPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<"ADMIN" | "USER">("ADMIN");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isErrConfirmInput, setIsErrConfirmInput] = useState<boolean>(false);
  const [errTextConfirmInput, setErrTextConfirmInput] = useState<string | null>(
    null
  );

  const isOpenMenu = Boolean(anchorEl);

  useEffect(() => {
    if (session?.user) {
      setUserName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
      setRole(session.user.role ?? "ADMIN");
      setCurrPassword("");
    }
  }, [session]);

  const handleShowMenuOption = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateButton = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          name: userName,
          role,
        }),
      }
    );

    if (response.ok) {
      // ✅ Refresh lại session sau khi update thành công
      await update({
        user: {
          name: userName,
          role: role,
          // có thể thêm avatar, v.v.
        },
      });

      setOpen(true);
      setColorMessage("success");
      setResMessage("Profile updated successfully");
    } else {
      setOpen(true);
      setColorMessage("error");
      setResMessage(`Something went wrong!`);
    }
  };

  const handleChangePassword = async (): Promise<void> => {
    setColorMessage("success");
    setIsErrConfirmInput(false);
    if (newPassword !== confirmPassword) {
      setIsErrConfirmInput(true);
      setErrTextConfirmInput("Passwords do not match");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          oldPassword: currPassword,
          newPassword,
        }),
      }
    );

    if (response.ok) {
      setOpen(true);
      setColorMessage("success");
      setResMessage("Change Password success");
    } else {
      setOpen(true);
      setColorMessage("error");
      setResMessage("Something went wrong!");
    }

    handleResetButton();
  };

  const handleResetButton = () => {
    if (session?.user) {
      setUserName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
      setRole(session.user.role ?? "ADMIN");
      setCurrPassword("");
      setNewPassword("");
      setConfirmPassword("");
      return;
    }
    setUserName("");
    setEmail("");
    setRole("ADMIN");
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
            <Box
              sx={{
                width: "100%",
                height: "56px",
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <RadioGroup
                row
                value={role}
                onChange={(e) => setRole(e.target.value as "ADMIN" | "USER")}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <FormControlLabel
                  value="ADMIN"
                  control={<Radio />}
                  label="Admin"
                  disabled
                />
                <FormControlLabel
                  value="USER"
                  disabled
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </Box>

            <Button variant="outlined" onClick={handleUpdateButton}>
              Upadate
            </Button>
            <Button
              variant="outlined"
              onClick={handleResetButton}
              sx={{ mx: 2 }}
            >
              Reset
            </Button>
          </Grid>

          {/* Cột phải - Change Password */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 2, fontWeight: "bold" }}>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              sx={{ mb: 2 }}
              value={currPassword}
              onChange={(e) => setCurrPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? "text" : "password"}
              sx={{ mb: 2 }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword === false ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              error={isErrConfirmInput}
              helperText={errTextConfirmInput}
              sx={{ mb: 2 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                // TODO: Viết handleChangePassword
                handleChangePassword();
              }}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={colorMessage} sx={{ width: "100%" }}>
          {resMessage}
        </Alert>
      </Snackbar>
      {renderMenu}
    </Box>
  );
};
export default UserProfilePage;
