"use client";

import { Box, Menu, MenuItem } from "@mui/material";
import { Person, Settings, Logout, Login } from "@mui/icons-material";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { ROUTES } from "../route/pathname";

type MenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  isMobile?: boolean;
};

const MenuHeader = ({
  anchorEl,
  open,
  onClose,
  isMobile = false,
}: MenuProps) => {
  const { data: session } = useSession();

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={isMobile ? "mobile-menu" : "desktop-menu"}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={onClose}
    >
      {session
        ? [
            <Box key={"SignIn"}>
              <Link
                href={
                  session.user.role === "ADMIN"
                    ? ROUTES.PROFILE_ADMIN
                    : ROUTES.PROFILE_USER
                }
                passHref
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>
                  <Person fontSize="small" sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
              </Link>
              <MenuItem onClick={onClose}>
                <Settings fontSize="small" sx={{ mr: 1 }} />
                Setting
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                <Logout fontSize="small" sx={{ mr: 1 }} />
                Log out
              </MenuItem>
            </Box>,
          ]
        : [
            <Box key={"NoSignIn"}>
              <MenuItem onClick={onClose}>
                <Settings fontSize="small" sx={{ mr: 1 }} />
                Setting
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signIn();
                }}
              >
                <Login fontSize="small" sx={{ mr: 1 }} />
                Login
              </MenuItem>
            </Box>,
          ]}
    </Menu>
  );
};

export default MenuHeader;
