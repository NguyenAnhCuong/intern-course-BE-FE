"use client";
import {
  AppRegistrationRounded,
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

const AuthSignUp = (props: any) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");
  const [errMessage, setErrMessage] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async () => {
    setIsErrorUsername(false);
    setIsErrorEmail(false);
    setIsErrorPassword(false);
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");

    if (!username) {
      setIsErrorUsername(true);
      setErrorUsername("Username is not empty");
      return;
    }
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
    if (username.length < 3) {
      setIsErrorUsername(true);
      setErrorUsername("Username must be at least 3 characters");
      return;
    }

    if (!validateEmail(email)) {
      setIsErrorEmail(true);
      setErrorEmail("Email is not valid");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setResMessage("Registration successful!");
      router.push("/auth/signin");
    } else {
      setErrMessage(data.message || "Something went wrong!");
    }
    setOpen(true);
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
                <AppRegistrationRounded />
              </Avatar>
              <Typography component={"h1"}>Sign Up</Typography>
            </Box>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoFocus
              error={isErrorUsername}
              helperText={errorUsername}
            />
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
              type={showPassword ? "text" : "password"}
              fullWidth
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
              Sign Up
            </Button>
          </div>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={resMessage ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {resMessage || errMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthSignUp;
