"use client";

import {
  Settings,
  Logout,
  Dashboard,
  Person,
  Home,
  LanguageOutlined,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Breadcrumbs, rgbToHex } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageIconComponent from "../icon/languge.icon";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#e0e0e0", // 💡 Màu nền chính
  "&:hover": {
    backgroundColor: "#E0DCDC", // 💡 Màu khi hover
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const HeaderAdmin = () => {
  const [role, setRole] = useState("ADMIN");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment); // ["admin", "dashboard"]

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {role === "ADMIN"
        ? [
            <MenuItem onClick={handleMenuClose} key="dashboard">
              <Dashboard fontSize="small" sx={{ mr: 1 }} />
              Dashboard
            </MenuItem>,
            <MenuItem onClick={handleMenuClose} key="setting">
              <Settings fontSize="small" sx={{ mr: 1 }} />
              Setting
            </MenuItem>,
          ]
        : [
            <MenuItem onClick={handleMenuClose} key="profile">
              <Person fontSize="small" sx={{ mr: 1 }} />
              Profile
            </MenuItem>,
            <MenuItem onClick={handleMenuClose} key="setting">
              <Settings fontSize="small" sx={{ mr: 1 }} />
              Setting
            </MenuItem>,
          ]}
      <MenuItem onClick={handleMenuClose}>
        <Logout fontSize="small" sx={{ mr: 1 }} />
        Đăng xuất
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {role === "ADMIN"
        ? [
            <MenuItem onClick={handleMenuClose} key="dashboard">
              <Dashboard fontSize="small" sx={{ mr: 1 }} />
              Dashboard
            </MenuItem>,
            <MenuItem onClick={handleMenuClose} key="setting">
              <Settings fontSize="small" sx={{ mr: 1 }} />
              Setting
            </MenuItem>,
          ]
        : [
            <MenuItem onClick={handleMenuClose} key="profile">
              <Person fontSize="small" sx={{ mr: 1 }} />
              Profile
            </MenuItem>,
            <MenuItem onClick={handleMenuClose} key="setting">
              <Settings fontSize="small" sx={{ mr: 1 }} />
              Setting
            </MenuItem>,
          ]}
      <MenuItem onClick={handleMenuClose}>
        <Logout fontSize="small" sx={{ mr: 1 }} />
        Đăng xuất
      </MenuItem>
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        zIndex: "10",
      }}
    >
      <AppBar position="static" sx={{ bgcolor: "#F4F7F6", color: "black" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Breadcrumbs (trái) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: 0,
              overflowX: "auto",
              flex: 3, // Cho phép co giãn
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                mr: { md: "none", sm: 1, xs: 1 },
                display: { md: "none", sm: "block", xs: "block" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  md: "block",
                  sm: "none",
                  xs: "none",
                  border: "1px solid red",
                },
              }}
            >
              <Breadcrumbs sx={{ ml: 2 }} aria-label="breadcrumb" separator="/">
                {/* Breadcrumb đầu tiên: Home có link */}
                <Link href="/" passHref style={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      display: "flex",
                      color: "black",
                      "&:hover": { color: "#1976d2" },
                    }}
                  >
                    <Home fontSize="small" sx={{ mr: 0.5 }} />
                    Home
                  </Box>
                </Link>

                {/* Các breadcrumb còn lại không có link */}
                {pathSegments.map((segment, index) => (
                  <Typography key={index} color="text.primary">
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Typography>
                ))}
              </Breadcrumbs>
            </Box>
          </Box>

          {/* Search bar (giữa) */}
          <Box
            sx={{
              mx: 2,
              flexShrink: 0,
              flexGrow: 0.5,
              width: { xs: "35%", md: "20%" },
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          {/* Icon actions (phải)   -> chia Icon 1 trái(login,register language) 1 phải(account) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            {/* Box trống bên trái */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Phần icon chia 2 bên */}
            <Box sx={{ display: "flex", gap: 4 }}>
              {/* Bên trái: Mail + Language */}
              {/* Logic: Đã đăng nhập */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge>
                    <MailIcon
                      sx={{
                        "&:hover": { cursor: "pointer", color: "#1976d2" },
                      }}
                    />
                  </Badge>
                </IconButton>
                <LanguageIconComponent />

                {/* Logic: Chưa  đăng nhập */}
                {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}
              </Box>

              {/* Bên phải: Account */}
              <Box display={{ xs: "none", md: "block" }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <img
                      src="/assets/avatar25.jpg"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Box sx={{ fontSize: "15px", textAlign: "start" }}>
                        User Name
                      </Box>
                      <Box sx={{ fontSize: "12px", textAlign: "start" }}>
                        Role
                      </Box>
                    </Box>
                  </Box>
                </IconButton>
              </Box>
            </Box>

            {/* Box trống bên phải */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Menu mobile */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default HeaderAdmin;
