"use client";

import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const features = [
  { title: "Next.js", icon: "/icons/nextjs.png" },
  { title: "Quick Support", icon: "/icons/support_icon.png" },
  { title: "Free Lifetime Updates", icon: "/icons/updates_icon.png" },
  { title: "Fully Responsive Layout", icon: "/icons/responsive_icon.png" },
  { title: "Easy to Customize", icon: "/icons/customize_icon.png" },
  { title: "Speed Performance", icon: "/icons/effect_icon.png" },
  { title: "Well Documented", icon: "/icons/doc_icon.png" },
  { title: "Developer Friendly", icon: "/icons/developer_icon.png" },
];

const Section2 = () => {
  return (
    <Box sx={{ textAlign: "center", py: 8, background: "#fff" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "orange", mb: 1 }}
      >
        Awesome Features
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        <span style={{ color: "#0d6efd" }}>Built with MUI</span> •{" "}
        <span style={{ color: "#20c997" }}>Friendly Support</span> •{" "}
        <span style={{ color: "#6f42c1" }}>Powerful Design</span>
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                py: 4,
                borderRadius: 3,
                textAlign: "center",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Avatar
                  src={feature.icon}
                  alt={feature.title}
                  sx={{ width: 56, height: 56, mx: "auto", mb: 2 }}
                />
                <Typography variant="subtitle1" fontWeight="bold">
                  {feature.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section2;
