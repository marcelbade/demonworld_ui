// react
import { useContext } from "react";
// mui
import {
  Grid2 as Grid, //
  IconButton,
  Button,
  Dialog,
  useTheme,
} from "@mui/material";
// contexts
import { UserContext } from "../../contexts/userContext";
//  icons
import CancelIcon from "@mui/icons-material/Cancel";
//  constants
import { USER_AUTH } from "../../constants/textsAndMessages";

const UserAccountDialog = () => {
  const UC = useContext(UserContext);
  const theme = useTheme();

  const logOut = () => {
    UC.setUser({
      userName: "",
      isAdmin: false,
      isOwner: "",
      token: "",
    });
    UC.setUserLoggedIn(false);
    UC.setShowUserAvatarDialog(false);
  };

  //TODO finish logout
  const changeAccount = () => {
    logOut();
    UC.setDisplayLogInDialog(true);
  };

  const changePassword = () => {
    UC.setShowPasswordReset(true);
  };

  // buttons generated via table-driven function
  const buttons = [
    { onClickAction: logOut, buttonText: USER_AUTH.LOGOUT_ACCOUNT },
    { onClickAction: changeAccount, buttonText: USER_AUTH.SWITCH_USER },
    { onClickAction: changePassword, buttonText: USER_AUTH.CHANGE_PASSWORD },
  ];

  const handleClose = () => {
    UC.setShowUserAvatarDialog(false);
  };

  return (
    <Dialog
      open={UC.showUserAvatarDialog} //
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "50em",
            height: "25em",
          },
        },
      }}
    >
      <Grid
        container //
        direction={"row"}
        justifyContent={"space-between"}
        sx={theme.palette.dialogs.title}
      >
        <IconButton
          sx={{ marginRight: "1em" }} //
          onClick={() => {
            UC.setShowUserAvatarDialog(false);
          }} //
        >
          <CancelIcon color="error" />
        </IconButton>
      </Grid>
      <Grid
        spacing={3}
        container
        flexDirection="column"
        alignItems="center"
        justifyItems="center"
        sx={{
          paddingTop:"2em",
          width: "100%",
        }}
      >
        {buttons.map((b, i) => (
          <Button
            key={i}
            onClick={() => {
              b.onClickAction();
            }}
            variant="outlined"
          >
            {b.buttonText}
          </Button>
        ))}
      </Grid>
    </Dialog>
  );
};

export default UserAccountDialog;
