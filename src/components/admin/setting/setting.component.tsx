import { SvgIconComponent } from "@mui/icons-material";
import { Box, Grid, Switch, Typography } from "@mui/material";

const SettingComponent = (props: {
  description: string;
  icons: React.ReactElement;
  value: boolean;
}) => {
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          border: "1px dashed #ccc",
          borderRadius: 2,
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100px",
          cursor: "pointer",
          "&:hover": {
            borderColor: "#1976d2",
            backgroundColor: "#f0f4ff",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: { md: 2, xs: 0 },
          }}
        >
          <Box>{props.icons}</Box>
          <Box>
            <Switch checked={props.value} />
          </Box>
        </Box>
        <Box sx={{ justifyContent: "start", display: "flex", width: "100%" }}>
          <Typography fontWeight={500} fontSize={15}>
            {props.description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default SettingComponent;
