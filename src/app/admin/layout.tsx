// app/admin/layout.tsx
"use client";

import { LayoutProvider } from "@/context/layout.context";
import HeaderAdmin from "@/components/admin/header.admin";
import SiderBarAdmin from "@/components/admin/side.bar.admin";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import { Box, Divider } from "@mui/material";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutProvider layout="admin">
      <ThemeRegistry>
        <Box display="flex">
          {/*left content*/}
          <Box
            sx={{
              width: { xs: "none", sm: "none", md: "20vw" },
              height: "100vh",
              borderRight: "1px solid #ccc",
            }}
          >
            <SiderBarAdmin />
          </Box>
          {/*right content*/}
          <Box
            flex={1}
            sx={{
              display: "flex",
              height: "100vh",
              width: "80vw",
              flexDirection: "column",
              overflow: "hidden", // Ngăn scroll tràn từ container
            }}
          >
            <HeaderAdmin />
            <Divider />
            <Box
              sx={{
                overflowY: "auto",
                p: 2,
                // Optional: Tùy chỉnh scrollbar bằng CSS
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f0f0f0",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
                },
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </ThemeRegistry>
    </LayoutProvider>
  );
}
