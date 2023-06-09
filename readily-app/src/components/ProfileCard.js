import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";

export default function ProfileCard(props) {
  function handleEmailChange(event) {
    event.preventDefault();
    props.onSubmitChangeEmail();
  }

  function handlePasswordChange(event) {
    event.preventDefault();
    props.onSubmitChangePassword();
  }

  function renderEmailError() {
    if (props.emailError) {
      let error;
      switch (props.emailError) {
        case "Firebase: Error (auth/requires-recent-login).":
          error = "Please reautheticate yourself";
          break;
        case "invalid email":
          error = "Please enter your current email";
          break;
        case "empty email field":
          error = "Please enter your current email";
          break;
        case "no new email":
          error = "Please enter your new email";
          break;
        case "empty email fields":
          error = "Both fields cannot be empty";
          break;
        case "Firebase: Error (auth/missing-email).":
          error = "You must specify your email adress";
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          error = "Email already in use";
          break;
        case "Firebase: Error (auth/invalid-email).":
          error = "Invalid email adress";
          break;
        case "empty email":
          error = "Email field cannot be empty";
          break;
      }
      return <Alert severity="error">{error}</Alert>;
    }
  }



  function renderPasswordError() {
    if (props.passwordError) {
      let error;
      switch (props.passwordError) {
        case "Firebase: Error (auth/requires-recent-login).":
          error = "Please reautheticate yourself";
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          error = "Password must be at least 6 characters long";
          break;
        case "empty password":
          error = "Password field cannot be empty";
          break;
        case "empty confirm password":
          error = "Please confirm your password";
          break;
        case "both password fields empty":
          error = "Both fields cannot be empty";
          break;
        case "no match":
          error = "The passwords do not match";
          break;
      }
      return <Alert severity="error">{error}</Alert>;
    }
  }

  return (
    <>
      <Typography variant="h5" align="center" sx={{ marginTop: 5 }}>
        Profile Settings
      </Typography>

      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {props.emailConfirm && <Alert severity="success">Email changed successfully</Alert>}
        {renderEmailError()}

        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <Typography>Change Email</Typography>
            <Box component="form" onSubmit={handleEmailChange}>
              <TextField
                autoFocus
                margin="dense"
                id="Current Email"
                error={props.emailError ? true : false}
                value={props.currentEmail}
                onChange={props.onChangeCurrentEmail}
                label={props.currentEmail ? "" : "Current Email"}
                type="Current Email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="New Email"
                error={props.emailError ? true : false}
                label={props.newEmail ? "" : "New Email"}
                value={props.newEmail}
                onChange={props.onChangeNewEmail}
                type="New Email"
                fullWidth
                variant="standard"
              />
              <Button size="small" type="submit" variant="outlined">
                Change Email
              </Button>
            </Box>
          </CardContent>
          {props.passwordConfirm &&
            <Alert severity="success">Password changed successfully</Alert>
          }
          {renderPasswordError()}
          <CardContent>
            <Typography>Change Password</Typography>
            <Box component="form" onSubmit={handlePasswordChange}>
              <TextField
                autoFocus
                margin="dense"
                id="New Password"
                value={props.newPassword}
                onChange={props.onChangeNewPassword}
                label="New password"
                error={props.passwordError ? true : false}
                type="password"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="Confirm New Password"
                value={props.confirmNewPassword}
                onChange={props.onChangeConfirmNewPassword}
                label="Confirm New Password"
                type="password"
                error={props.passwordError ? true : false}
                fullWidth
                variant="standard"
              />

              <Button size="small" type="submit" variant="outlined">
                Change Password
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
