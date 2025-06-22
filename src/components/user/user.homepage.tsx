"use client";

import { useSession } from "next-auth/react";
import { Box, Card, Typography, Chip, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Section2 from "@/components/user/homepage/homepage.section2";
import Section1 from "@/components/user/homepage/homepage.section1";

const HomePage = () => {
  const { data: session } = useSession();

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
          backgroundColor: "#111",
          color: "#fff",
        }}
      >
        <Section1 />
      </Box>

      {/* Section 2 */}
      <Box
        sx={{
          height: "100vh",
          scrollSnapAlign: "start",
          backgroundColor: "#222",
          color: "#fff",
        }}
      >
        <Section2 />
      </Box>
    </Box>
  );
};

export default HomePage;
