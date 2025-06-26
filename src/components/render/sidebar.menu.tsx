// components/SidebarMenu.tsx
"use client";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Home,
  BarChart,
  Apps,
  ExpandMore,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  ManageAccounts as ManageAccountsIcon,
  Devices as DevicesIcon,
  Pages,
  Person as PersonIcon,
  ShowChart,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { ROUTES } from "../route/pathname";

const SidebarMenu = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState({
    manager: false,
    pages: false,
    charts: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    if (
      pathname.startsWith(ROUTES.ACCOUNTS) ||
      pathname.startsWith(ROUTES.DEVICES)
    ) {
      setOpenSections((prev) => ({ ...prev, manager: true }));
    }

    if (pathname === ROUTES.PROFILE_ADMIN || pathname === ROUTES.PROFILE_USER) {
      setOpenSections((prev) => ({ ...prev, pages: true }));
    }

    if (pathname === ROUTES.CHARTS) {
      setOpenSections((prev) => ({ ...prev, charts: true }));
    }
  }, [pathname]);

  return (
    <List>
      <Link href={ROUTES.DASHBOARD} style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <Home
              sx={{
                color: pathname === ROUTES.DASHBOARD ? "#1100FF" : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            style={{
              color: pathname === ROUTES.DASHBOARD ? "#1100FF" : "black",
            }}
          />
        </ListItem>
      </Link>

      <ListItem button onClick={() => toggleSection("manager")}>
        <ListItemIcon>
          <Apps />
        </ListItemIcon>
        <ListItemText primary="Manager" />
        {openSections.manager ? <ExpandMore /> : <KeyboardArrowLeftIcon />}
      </ListItem>

      <Collapse in={openSections.manager} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href={ROUTES.ACCOUNTS} style={{ textDecoration: "none" }}>
            <ListItem button sx={{ pl: 3 }}>
              <ListItemIcon>
                <ManageAccountsIcon
                  sx={{
                    color: pathname.startsWith(ROUTES.ACCOUNTS)
                      ? "#1100FF"
                      : "gray",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Manage Accounts"
                primaryTypographyProps={{
                  color: pathname.startsWith(ROUTES.ACCOUNTS)
                    ? "#1100FF"
                    : "black",
                }}
              />
            </ListItem>
          </Link>

          <Link href={ROUTES.DEVICES} style={{ textDecoration: "none" }}>
            <ListItem button sx={{ pl: 3 }}>
              <ListItemIcon>
                <DevicesIcon
                  sx={{
                    color: pathname.startsWith(ROUTES.DEVICES)
                      ? "#1100FF"
                      : "gray",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Manage Devices"
                primaryTypographyProps={{
                  color: pathname.startsWith(ROUTES.DEVICES)
                    ? "#1100FF"
                    : "black",
                }}
              />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={() => toggleSection("pages")}>
        <ListItemIcon>
          <Pages />
        </ListItemIcon>
        <ListItemText primary="Pages" />
        {openSections.pages ? <ExpandMore /> : <KeyboardArrowLeftIcon />}
      </ListItem>

      <Collapse in={openSections.pages} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {session
            ? [
                <Link
                  href={
                    session.user.role === "ADMIN"
                      ? ROUTES.PROFILE_ADMIN
                      : ROUTES.PROFILE_USER
                  }
                  style={{ textDecoration: "none" }}
                  key={"profile-item"}
                >
                  <ListItem button sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <PersonIcon
                        sx={{
                          color:
                            pathname === ROUTES.PROFILE_ADMIN ||
                            pathname === ROUTES.PROFILE_USER
                              ? "#1100FF"
                              : "gray",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      primaryTypographyProps={{
                        color:
                          pathname === ROUTES.PROFILE_ADMIN ||
                          pathname === ROUTES.PROFILE_USER
                            ? "#1100FF"
                            : "black",
                      }}
                    />
                  </ListItem>
                </Link>,
              ]
            : [
                <Link
                  href={"#"}
                  style={{ textDecoration: "none" }}
                  key={"signIn-item"}
                >
                  <ListItem button sx={{ pl: 3 }} onClick={() => signIn()}>
                    <ListItemIcon>
                      <PersonIcon
                        sx={{
                          color:
                            pathname === ROUTES.PROFILE_ADMIN
                              ? "#1100FF"
                              : "gray",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      primaryTypographyProps={{
                        color:
                          pathname === ROUTES.PROFILE_ADMIN
                            ? "#1100FF"
                            : "black",
                      }}
                    />
                  </ListItem>
                </Link>,
              ]}
        </List>
      </Collapse>

      <ListItem button onClick={() => toggleSection("charts")}>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <ListItemText primary="Charts" />
        {openSections.charts ? <ExpandMore /> : <KeyboardArrowLeftIcon />}
      </ListItem>

      <Collapse in={openSections.charts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link href={ROUTES.CHARTS} style={{ textDecoration: "none" }}>
            <ListItem button sx={{ pl: 3 }}>
              <ListItemIcon>
                <ShowChart
                  sx={{
                    color: pathname === ROUTES.CHARTS ? "#1100FF" : "gray",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Recharts"
                primaryTypographyProps={{
                  color: pathname === ROUTES.CHARTS ? "#1100FF" : "black",
                }}
              />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </List>
  );
};

export default SidebarMenu;
