import { AppBar, Box, Grid, IconButton, Typography } from "@mui/material";
import SettingComponent from "./setting/setting.component";
import { Close, Menu } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const SettingPage = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#F4F7F6",
          color: "black",
          boxShadow: 0,
          px: 2,
          py: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={600} fontSize="20px">
            Setting
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <IconButton>
              <RestartAltIcon />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Grid container spacing={2} p={1}>
        <SettingComponent description={"Mode"} icons={<Menu />} value={false} />
        <SettingComponent
          description={"Contrast"}
          icons={<Menu />}
          value={false}
        />
        <SettingComponent
          description={"Left to Right"}
          icons={<Menu />}
          value={false}
        />
        <SettingComponent
          description={"Compact"}
          icons={<Menu />}
          value={false}
        />
      </Grid>
    </>
  );
};

export default SettingPage;
