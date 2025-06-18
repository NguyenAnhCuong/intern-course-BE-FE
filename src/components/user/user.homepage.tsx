"use client";

import { useSession } from "next-auth/react";
import { Box, Card, Typography, Chip, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      {/*Header */}
      <Box
        sx={{
          display: "flex",
          height: "40vh",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/*Left header */}
        <Box
          sx={{
            position: "relative", // cần thiết để định vị overlay
            p: 5,
            display: "flex",
            flexGrow: 3,
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "left", xs: "center" },
            backgroundImage: "url(/assets/background5.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
            justifyContent: "space-between",
            gap: 3,
            WebkitBoxSizing: "border-box",
            overflow: "hidden", // tránh tràn overlay
          }}
        >
          {/* Overlay mờ */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)", // màu nền mờ
              backdropFilter: "blur(5px)", // hiệu ứng làm mờ
              zIndex: 1,
            }}
          />
          {/* Nội dung nằm phía trên overlay */}
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 3, zIndex: 2 }}
          >
            <Typography fontSize={20} fontWeight={700} color={"white"}>
              Welcome back 👋
              <span style={{ display: "block" }}>{session?.user.name}</span>
            </Typography>
            <Typography
              fontSize={15}
              fontWeight={300}
              color={"white"}
              sx={{ opacity: 0.64, maxWidth: { xs: "none", md: "200px" } }}
            >
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything.
            </Typography>
          </Box>

          <Box sx={{ zIndex: 2, boxSizing: "inherit", maxWidth: "200px" }}>
            <img src="/assets/characterpresent.webp" height={200} />
          </Box>
        </Box>

        {/*right header */}
        <Box
          sx={{
            borderRadius: "10px",
            flexGrow: 3,
            border: "1px solid blue",
            position: "relative",
          }}
        ></Box>
      </Box>
      {/*Body */}
      <Box></Box>
    </Box>
  );
};

export default HomePage;
