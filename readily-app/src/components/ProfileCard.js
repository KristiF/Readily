import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function ProfileCard(props) {
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
            <Box component="form">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={props.email}
                type="Password"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Email"
                type="Password"
                fullWidth
                variant="standard"
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              onClick={props.onEmailChange}
            >
              Change Email
            </Button>
          </CardActions>
        </Card>

        <br />

        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <Typography>Password</Typography>
            <Box component="form">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Current password"
                type="Password"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Password"
                type="Password"
                fullWidth
                variant="standard"
              />
            </Box>
          </CardContent>

          <CardActions>
            <Button
              size="small"
              variant="outlined"
              onClick={props.onPasswordChange}
            >
              Change Password
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
