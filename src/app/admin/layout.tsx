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
    <ThemeRegistry>
      <Box display="flex">
        <Box
          sx={{
            width: { xs: "none", sm: "none", md: "20vw" },
            height: "100vh",
            borderRight: "1px solid #ccc",
          }}
        >
          <SiderBarAdmin />
        </Box>
        <Box flex={2} sx={{ height: "100vh", width: "80vw" }}>
          {/* Header for the admin layout */}
          <HeaderAdmin />
          <Divider />
          <Box>{children}</Box>
        </Box>
      </Box>
    </ThemeRegistry>
  );
}
