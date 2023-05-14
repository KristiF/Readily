import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function ProfileCard(props) {
  function handleEmailChange(event) {
    event.preventDefault();
    props.onSubmitChangeEmail();
  }

  function handlePasswordChange(event) {
    event.preventDefault();
    props.onSubmitChangePassword();
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
        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <Typography>Email</Typography>
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
        </Card>

        <br />

        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <Typography>Password</Typography>
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
