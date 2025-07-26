"use client";

import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import Section2 from "@/components/user/homepage/homepage.section2";
import Section1 from "@/components/user/homepage/homepage.section1";

const HomePage = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
      }}
    >
      {/* Section 1 */}
      <Box
        sx={{
          height: "100vh",
          scrollSnapAlign: "start",
          backgroundImage: "url(/assets/bg_iot2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          opacity: 0.7,
        }}
      >
        <Section1 />
      </Box>

      {/* Section 2 */}
      <Box
        sx={{
          height: "100vh",
          scrollSnapAlign: "start",
          color: "white",
        }}
      >
        <Section2 />
      </Box>
    </Box>
  );
};

export default HomePage;
