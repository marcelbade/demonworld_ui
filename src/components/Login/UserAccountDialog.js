// react
import { useContext } from "react";
// mui
import {
  Grid, //
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
import useAxios from "../../customHooks/UseAxios";
import { LOGOUT_USER_URL } from "../../constants/URLs";

/**
 * JSX component creates a dialog containing user account actions:
 * logout, change account, change pw
 * @returns a JSX component.
 */
const UserAccountDialog = () => {
  const UC = useContext(UserContext);

  const callAxios = useAxios();

  const theme = useTheme();

  /**
   * Function logs out the user and resets the user state.
   */
  const logOut = () => {
    callAxios.sendData(
      "", //
      LOGOUT_USER_URL,
      UC.setUser,
      logOutSideEffects,
      USER_AUTH.LOGOUT_SUCCESFUL,
    );
  };

  const logOutSideEffects = () => {
    UC.setUserLoggedIn(false);
    UC.setShowUserAvatarDialog(false);
  };

  //TODO finish logout
  const changeAccount = () => {
    logOut();
    UC.setDisplayLogInDialog(true);
  };

  const changePassword = () => {
    UC.setShowPasswordChangeDialog(true);
    UC.setShowUserAvatarDialog(false);
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
        sx={{
          justifyContent: "space-between",
          ...theme.palette.dialogs.title,
        }}
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
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          paddingTop: "2em",
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
