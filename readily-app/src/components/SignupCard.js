import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";

export default function SignupCard(props) {
  function handleSubmitACB(event) {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
    props.onSignup(userData);
  }

  function renderErrors() {
    if (props.error) {
      let error;
      switch (props.error) {
        case "empty name":
          error = "You must specify your first and last name";
          break;
        case "Firebase: Error (auth/missing-email).":
          error = "You must specify your email adress";
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          error = "Email already exists";
          break;
        case "Firebase: Error (auth/invalid-email).":
          error = "Invalid email adress";
          break;
        case "Firebase: Error (auth/invalid-password).":
          error = "Password must be at least 6 characters long";
          break;
        case "empty password":
          error = "Password field cannot be empty";
          break;
      }
      return <Alert severity="error">{error}</Alert>;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {renderErrors()}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmitACB}
          sx={{ mt: 1 }}
        >
          <TextField
            required
            fullWidth
            onChange={props.onEmailChange}
            value={props.email}
            id="email"
            label={props.email ? "" : "Email Address"}
            name="email"
            autoComplete="email"
          />

          <TextField
            required
            fullWidth
            onChange={props.onPasswordChange}
            value={props.password}
            name="password"
            label={props.password ? "" : "Password"}
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
