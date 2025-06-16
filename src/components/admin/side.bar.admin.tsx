"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Typography,
  Divider,
  Tab,
  Tooltip,
} from "@mui/material";
import {
  Home,
  Settings,
  ExpandLess,
  ExpandMore,
  Person,
  BarChart,
  Apps,
  Pages,
  SettingsInputComponent,
  SettingsInputComponentOutlined,
  ShowChart,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DevicesIcon from "@mui/icons-material/Devices";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SiderBarAdmin = () => {
  const pathname = usePathname();
  const [tabValue, setTabValue] = useState<string>("1");
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(true);
  const [openManager, setOpenManager] = useState<boolean>(false);
  const [openPages, setOpenPages] = useState<boolean>(false);
  const [openCharts, setOpenCharts] = useState<boolean>(false);

  useEffect(() => {
    if (pathname === "/admin/accounts" || pathname === "/admin/devices") {
      setOpenManager(true);
    }
    if (pathname === "/admin/profile") {
      setOpenPages(true);
    }
    if (pathname === "/admin/charts") {
      setOpenCharts(true);
    }
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        display: { xs: "none", sm: "none", md: "block" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          bgcolor: "#F4F7F6",
          width: "20vw",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          maxHeight: "64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // borderBottom: "1px solid black",
        }}
      >
        <Box
          sx={{
            width: "64px",
            height: "100%",
            ml: 2,
          }}
        >
          <img src="/assets/bird2.png" width={"100%"} />
        </Box>
        <Box
          sx={{
            mr: 2,
            "&:hover": { color: "#1976d2", cursor: "pointer" },
          }}
        >
          <Tooltip title="Toggle">
            <ArrowBackIcon
              sx={{
                transform: toggleSideBar ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s",
              }}
            />
          </Tooltip>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        aria-label="lab API tabs example"
        sx={{
          paddingLeft: "15px",
          marginTop: "15px",
          paddingRight: "20px",
          height: "38px",
          alignItems: "center",
        }}
      >
        <Tab
          sx={{
            color: "black",
            borderLeft: tabValue === "1" ? "1px solid  #DCDEDD" : "none",
            borderRight: tabValue === "1" ? "1px solid  #DCDEDD" : "none",
            borderTop: tabValue === "1" ? "1px solid  #DCDEDD" : "none",
            borderBottom: tabValue === "1" ? "none" : "1px solid  #DCDEDD",
            borderRadius: "5px",
          }}
          label="Menu"
          value="1"
        />
        <Tab
          sx={{
            color: "black",
            borderLeft: tabValue === "2" ? "1px solid  #DCDEDD" : "none",
            borderRight: tabValue === "2" ? "1px solid  #DCDEDD" : "none",
            borderTop: tabValue === "2" ? "1px solid  #DCDEDD" : "none",
            borderBottom: tabValue === "2" ? "none" : "1px solid  #DCDEDD",
            borderRadius: "5px",
          }}
          label={<SettingsIcon />}
          value="2"
        />
      </Tabs>
      <Divider />
      {tabValue === "1" ? (
        <>
          <List>
            <Link href={"/admin/dashboard"} style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <Home
                    sx={{
                      color:
                        pathname === "/admin/dashboard" ? "#1100FF" : "inherit",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  style={{
                    color:
                      pathname === "/admin/dashboard" ? "#1100FF" : "black",
                  }}
                />
              </ListItem>
            </Link>

            <ListItem button onClick={() => setOpenManager(!openManager)}>
              <ListItemIcon>
                <Apps />
              </ListItemIcon>
              <ListItemText primary="Manager" style={{ color: "black" }} />
              {openManager ? <ExpandMore /> : <KeyboardArrowLeftIcon />}
            </ListItem>

            <Collapse in={openManager} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  href={"/admin/accounts"}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <ManageAccountsIcon
                        sx={{
                          color:
                            pathname === "/admin/accounts" ? "#1100FF" : "gray",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Manage Accounts"
                      primaryTypographyProps={{
                        color:
                          pathname === "/admin/accounts" ? "#1100FF" : "black",
                      }}
                    />
                  </ListItem>
                </Link>
                <Link
                  href={"/admin/devices"}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <DevicesIcon
                        sx={{
                          color:
                            pathname === "/admin/devices" ? "#1100FF" : "gray",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Manage Devices"
                      primaryTypographyProps={{
                        color:
                          pathname === "/admin/devices" ? "#1100FF" : "black",
                      }}
                    />
                  </ListItem>
                </Link>
              </List>
            </Collapse>

            <ListItem button onClick={() => setOpenPages(!openPages)}>
              <ListItemIcon>
                <Pages />
              </ListItemIcon>
              <ListItemText primary="Pages" />
              {openPages ? <ExpandMore /> : <KeyboardArrowLeftIcon />}
            </ListItem>

            <Collapse in={openPages} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  href={"/admin/profile"}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <PersonIcon
                        sx={{
                          color:
                            pathname === "/admin/profile" ? "#1100FF" : "gray",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      primaryTypographyProps={{
                        color:
                          pathname === "/admin/profile" ? "#1100FF" : "black",
                      }}
                    />
                  </ListItem>
                </Link>
              </List>
            </Collapse>

            <ListItem button onClick={() => setOpenCharts(!openCharts)}>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary="Charts" />
              {openCharts ? <ExpandMore /> : <KeyboardArrowLeftIcon />}
            </ListItem>

            <Collapse in={openCharts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href={"/admin/charts"} style={{ textDecoration: "none" }}>
                  <ListItem button sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <ShowChart
                        sx={{
                          color:
                            pathname === "/admin/charts" ? "#1100FF" : "gray",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Recharts"
                      primaryTypographyProps={{
                        color:
                          pathname === "/admin/charts" ? "#1100FF" : "black",
                      }}
                    />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </List>
        </>
      ) : (
        <>settings</>
      )}
    </Drawer>
  );
};

export default SiderBarAdmin;
