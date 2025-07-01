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
import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  rgbToHex,
  Tooltip,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageIconComponent from "../icon/languge.icon";
import { signIn, signOut, useSession } from "next-auth/react";
import AvatarHeader from "../icon/avatar.header";
import MenuHeader from "../render/menu.list";
import SendMailModal from "@/components/admin/modal/send.mail.modal";

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
  const { data: session } = useSession();
  const [emailEl, setEmailEl] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [openSendMailModal, setOpenSendMailModal] = useState(false);

  const [listEmail, setListEmail] = useState<IMail[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [counts, setCounts] = useState({ total: 0, unread: 0, archived: 0 });

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

  const handleEmailOpen = (event: React.MouseEvent<HTMLElement>) => {
    setEmailEl(event.currentTarget);
  };

  const handleEmailClose = () => {
    setEmailEl(null);
  };

  useEffect(() => {
    if (session) {
      fetchListMail();
    }
  }, [emailEl]);

  const fetchListMail = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setListEmail(data);
      // Đếm số lượng
      const total = data.length;
      const unread = data.filter((item: any) => !item.is_read).length;
      const archived = data.filter((item: any) => item.archived).length;
      setCounts({ total, unread, archived });
    } else {
      alert(`Something went wrong!.`);
    }
  };

  const getChipStyle = (active: boolean) => ({
    px: 2,
    py: 0.5,
    fontWeight: 500,
    color: active ? "#fff" : "#333",
    backgroundColor: active ? "#1976d2" : "#f0f2f5",
    border: active ? "none" : "1px solid #ccc",
    borderRadius: "20px",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: active ? "#1565c0" : "#e0e0e0",
    },
  });

  const renderMenuEmail = (
    <Drawer
      anchor="right"
      open={Boolean(emailEl)}
      onClose={handleEmailClose}
      PaperProps={{
        sx: { width: 400 },
      }}
    >
      <Box display="flex" flexDirection="column" height="100%">
        {/* Header */}
        <AppBar
          position="static"
          sx={{
            bgcolor: "white",
            color: "black",
            boxShadow: 0,
            px: 2,
            py: 1.5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="h6"
              fontWeight={600}
              fontSize={"20px"}
              sx={{ flex: 1 }}
            >
              Notifications
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="space-between" gap={2} mt={1}>
              <Chip
                sx={getChipStyle(filter === "all")}
                label={`All ${counts.total}`}
                clickable
                color={filter === "all" ? "primary" : "default"}
                onClick={() => setFilter("all")}
              />
              <Chip
                sx={getChipStyle(filter === "unread")}
                label={`Unread ${counts.unread}`}
                clickable
                color={filter === "unread" ? "primary" : "default"}
                onClick={() => setFilter("unread")}
              />
              <Chip
                sx={getChipStyle(filter === "archived")}
                label={`Archived ${counts.unread}`}
                clickable
                color={filter === "archived" ? "primary" : "default"}
                onClick={() => setFilter("archived")}
              />
            </Box>
          </Box>
        </AppBar>

        {/* Danh sách email */}
        <Box flex={1} overflow="auto">
          <List sx={{ px: 2 }}>
            {listEmail.length > 0 ? (
              listEmail.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    alignItems: "flex-start",
                    borderBottom: "1px solid #eee",
                    py: 2,
                    px: 0,
                  }}
                >
                  <Box display="flex" gap={2}>
                    <Box>
                      <Typography fontWeight={600}>
                        {item.device_id}:
                        <Typography component="span" fontWeight={400}>
                          {item.message}
                        </Typography>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.created_at}
                      </Typography>

                      {/* Action buttons nếu có */}
                      {item.type === "friend_request" && (
                        <Box display="flex" gap={1} mt={1}>
                          <button className="btn btn-primary">Accept</button>
                          <button className="btn btn-outline">Decline</button>
                        </Box>
                      )}

                      {item.type === "mention" && (
                        <Box mt={1} p={1} bgcolor="#F0F2F5" borderRadius={2}>
                          <Typography variant="body2">content</Typography>
                          <button className="btn btn-secondary mt-1">
                            Reply
                          </button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>Không có thông báo</ListItem>
            )}
          </List>
        </Box>

        {/* Footer */}
        <Box textAlign="center" py={2} borderTop="1px solid #eee">
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              color: "#1976d2",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => {
              setOpenSendMailModal(true); // 👉 Mở modal
            }}
          >
            Send Email
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <Box
      sx={{
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
                        onClick={handleEmailOpen}
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                      >
                        <Badge badgeContent={counts.total} color="error">
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
      <SendMailModal
        open={openSendMailModal}
        onClose={() => setOpenSendMailModal(false)}
      />

      {renderMenuEmail}
    </Box>
  );
};

export default HeaderAdmin;
