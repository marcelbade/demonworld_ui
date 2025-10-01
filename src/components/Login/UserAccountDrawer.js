// react
import { useContext } from "react";
// mui
import {
  Drawer,
  Grid2 as Grid, //
  IconButton,
  Button,
} from "@mui/material";
// contexts
import { UserContext } from "../../contexts/userContext";
//  icons
import CancelIcon from "@mui/icons-material/Cancel";
//  constants
import { USER_AUTH } from "../../constants/textsAndMessages";

const UserAccountDrawer = (props) => {
  const UC = useContext(UserContext);

  const logOut = () => {
    UC.setUser({
      userName: "",
      isAdmin: false,
      isOwner: "",
      token: "",
    });
    UC.setUserLoggedIn(false);
    UC.setShowUserAvatarDrawer(false);
  };

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

  return (
    <Drawer
      anchor={"right"} //
      variant="persistent"
      open={UC.showUserAvatarDrawer}
    >
      <Grid
        container //
        alignItems="self-start"
        flexDirection="column"
        sx={{
          width: "25em",
        }}
      >
        <IconButton
          onClick={() => {
            UC.setShowUserAvatarDrawer(false);
          }} //
          sx={{
            paddingTop: "1em",
            paddingLeft: "1em",
            marginBottom: "5em",
          }}
        >
          <CancelIcon />
        </IconButton>
        <Grid
          spacing={3}
          container
          flexDirection="column"
          alignItems="center"
          justifyItems="center"
          sx={{
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
      </Grid>
    </Drawer>
  );
};

export default UserAccountDrawer;
