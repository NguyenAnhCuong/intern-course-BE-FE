"user client";

import { Box, IconButton } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

const AvatarHeader = (props: any) => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <Box display={{ xs: "none", md: "block" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={props.handleProfileMenuOpen}
              color="inherit"
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <img
                  src="/assets/avatar25.jpg"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Box sx={{ fontSize: "15px", textAlign: "start" }}>
                    {session.user?.name}
                  </Box>
                  <Box sx={{ fontSize: "12px", textAlign: "start" }}>
                    {" "}
                    {session?.user.role}
                  </Box>
                </Box>
              </Box>
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <Box display={{ xs: "none", md: "block" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={() => signIn()}
              color="inherit"
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <img
                  src="/assets/avatar25.jpg"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            </IconButton>
          </Box>
        </>
      )}
    </>
  );
};

export default AvatarHeader;
