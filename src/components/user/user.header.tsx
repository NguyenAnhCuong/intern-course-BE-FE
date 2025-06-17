"use client";

import {
  Settings,
  Logout,
  Dashboard,
  Person,
  Home,
  LanguageOutlined,
  Login,
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
import { Breadcrumbs, rgbToHex, Tooltip, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageIconComponent from "../icon/languge.icon";
import { signIn, signOut, useSession } from "next-auth/react";
import AvatarHeader from "../icon/avatar.header";
import MenuHeader from "../render/menu.list";

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

const HeaderUser = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment); // ["admin", "dashboard"]

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
                mr: { md: "none", xs: 1 },
                display: { md: "none", sm: "block", xs: "block" },
              }}
            >
              {session?.user.role === "ADMIN"
                ? [<MenuIcon key={"Toggle-sidebar"} />]
                : [
                    <Link
                      href="/"
                      passHref
                      style={{ textDecoration: "none" }}
                      key={"homepage"}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          color: "black",
                          fontSize: 15,
                          "&:hover": { color: "#1976d2" },
                        }}
                      >
                        <Home fontSize="small" sx={{ mr: 0.5 }} />
                      </Box>
                    </Link>,
                  ]}
            </IconButton>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  md: "block",
                  sm: "none",
                  xs: "none",
                  // border: "1px solid red",
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
              <SearchIconWrapper onClick={() => {}}>
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
            }}
          >
            {/* Box trống bên trái */}
            <Box sx={{ flexGrow: { xs: 1, md: "none" } }} />

            {/* Phần icon chia 2 bên */}
            <Box
              sx={{ display: "flex", gap: 4, justifyContent: "space-between" }}
            >
              {/* Bên trái: Mail + Language */}
              {session ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Email">
                      <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                      >
                        <Badge>
                          <MailIcon
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                                color: "#1976d2",
                              },
                            }}
                          />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                    <LanguageIconComponent />
                  </Box>
                </>
              ) : (
                <>
                  {/* Logic: Chưa  đăng nhập */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Login">
                      <IconButton
                        onClick={() => {
                          signIn();
                        }}
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                      >
                        <Badge>
                          <Login
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                                color: "#1976d2",
                              },
                            }}
                          />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                    <LanguageIconComponent />
                  </Box>
                </>
              )}

              {/* Logic: Đã đăng nhập */}

              {/* Bên phải: Account */}
              <AvatarHeader handleProfileMenuOpen={handleProfileMenuOpen} />
            </Box>

            {/* Box trống bên phải */}
            <Box sx={{ flexGrow: { xs: 1, md: "none" } }} />

            {/* Menu mobile */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
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
      <MenuHeader
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      />

      <MenuHeader
        anchorEl={mobileMoreAnchorEl}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={handleMobileMenuClose}
        isMobile
      />
    </Box>
  );
};

export default HeaderUser;
