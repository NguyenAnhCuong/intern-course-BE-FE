"use client";
import {
  ArrowBack,
  GitHub,
  Google,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthSignIn = (props: any) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const handleSubmit = async () => {
    setIsErrorEmail(false);
    setIsErrorPassword(false);
    setErrorEmail("");
    setErrorPassword("");

    if (!email) {
      setIsErrorEmail(true);
      setErrorEmail("Email is not empty");
      return;
    }
    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword("Password is not empty");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      router.push("/");
    } else {
      setOpen(true);
      setResMessage("Invalid Email/password!");
    }
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          sx={{ boxShadow: "rgb(100,100,111,0.2)0px 7px 29px 0px" }}
        >
          <div style={{ margin: "20px" }}>
            <Link href={"/"}>
              <ArrowBack />
            </Link>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Avatar>
                <LockOutlined />
              </Avatar>
              <Typography component={"h1"}>Sign in</Typography>
            </Box>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoFocus
              error={isErrorEmail}
              helperText={errorEmail}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              autoFocus
              error={isErrorPassword}
              helperText={errorPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword === false ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              sx={{ my: 3 }}
              onClick={handleSubmit}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Divider>Or using</Divider>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "25px",
                mt: 3,
              }}
            >
              <Avatar
                onClick={() => {
                  signIn("github");
                }}
                sx={{ cursor: "pointer", bgcolor: "orange" }}
              >
                <GitHub titleAccess="Login with Github" />
              </Avatar>
              <Avatar sx={{ cursor: "pointer", bgcolor: "orange" }}>
                <Google titleAccess="Login with Github" />
              </Avatar>
            </Box>
            <Divider sx={{ my: 3 }}>
              Don't have account? <Link href="/auth/signup">Sign Up</Link>
            </Divider>
          </div>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {resMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthSignIn;
