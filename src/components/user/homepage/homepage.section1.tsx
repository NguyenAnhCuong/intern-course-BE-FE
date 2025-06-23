"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

const Section1 = () => {
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (floatingRef.current) {
      gsap.to(floatingRef.current.children, {
        y: -30,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 3,
        stagger: 0.2,
      });
    }
  }, []);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "center" }}>
          {/* Menu */}
          <Box sx={{ display: "flex", gap: 4 }}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              href={"/user/charts"}
              passHref
            >
              <Typography
                variant="body1"
                sx={{ "&:hover": { cursor: "pointer", color: "red" } }}
              >
                Demo
              </Typography>
            </Link>
            <Typography
              variant="body1"
              sx={{ "&:hover": { cursor: "pointer", color: "red" } }}
            >
              Features
            </Typography>
            <Typography
              variant="body1"
              sx={{ "&:hover": { cursor: "pointer", color: "red" } }}
            >
              Support
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        {/* Background floating images */}
        <Box
          ref={floatingRef}
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.3,
            gap: 4,
            padding: 5,
          }}
        >
          {/* Add demo images (replace with real images in public/images/) */}
          {Array.from({ length: 4 }).map((_, i) => (
            <img
              key={i}
              src={`/assets/demo${i + 1}.png`}
              width={250}
              height={150}
              alt={`demo-${i + 1}`}
              style={{ borderRadius: 8 }}
            />
          ))}
        </Box>

        {/* Main content */}
        <Container
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#1976d2", mb: 1 }}>
            Built on Next.js
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            MUI IOT - Next.js Software & <br />
            Technology Template
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Section1;
