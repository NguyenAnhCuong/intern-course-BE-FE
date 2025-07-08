"use client";

import { Drawer, Divider, Tab, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { signIn, useSession } from "next-auth/react";
import SidebarMenu from "@/components/render/sidebar.menu";
import { useSidebarContext } from "@/lib/context/sidebar.admin.context";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SettingPage from "@/components/admin/setting.page";

const SiderBarAdmin = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [tabValue, setTabValue] = useState<string>("1");
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md = 960px

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const { openSidebar, setOpenSidebar } = useSidebarContext();

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const renderContent = () => (
    <>
      <Box
        sx={{
          maxHeight: "64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "64px", height: "100%", ml: 2 }}>
          <img src="/assets/MUI_removebg.png" width={"100%"} />
        </Box>
        <Box sx={{ mr: 2, "&:hover": { color: "#1976d2", cursor: "pointer" } }}>
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
      {tabValue === "1" ? <SidebarMenu /> : <SettingPage />}
    </>
  );

  return (
    <>
      {isMobile ? (
        // 👉 Drawer cho Mobile: temporary, toggle bằng icon
        <Drawer
          open={openSidebar}
          onClose={handleSidebarClose}
          variant="temporary"
          anchor="left"
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              bgcolor: "#F4F7F6",
              width: "80vw", // mobile nên dùng lớn hơn
              boxSizing: "border-box",
            },
          }}
        >
          {renderContent()}
        </Drawer>
      ) : (
        // 👉 Drawer cho Desktop: luôn hiện
        <Drawer
          open
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
          {renderContent()}
        </Drawer>
      )}
    </>
  );
};

export default SiderBarAdmin;
