"use client";

import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { url } from "inspector";

const ProfilePage = () => {
  const [userName, setUserName] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpenMenu = Boolean(anchorEl);

  useEffect(() => {}, []);

  const handleShowMenuOption = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>User name</Box>
            <Box sx={{ fontSize: "15px", opacity: 0.9 }}>Role</Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            size="medium"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField id="outlined-search" label="Search field" type="search" />
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
          />
        </div>
      </Box>
      {renderMenu}
    </Box>
  );
};
export default ProfilePage;
