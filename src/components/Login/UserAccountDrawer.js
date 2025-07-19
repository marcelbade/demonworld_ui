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
      isAdmin: "",
      isOwner: "",
      token: "",
    });

    // TODO: reload page, close drawer!
  };


  const changeAccount = () => {};
  const changePassword = () => {};

  const buttons = [
    { onClickAction: logOut, buttonText: USER_AUTH.LOGOUT_ACCOUNT },
    { onClickAction: changeAccount, buttonText: USER_AUTH.SWITCH_USER },
    { onClickAction: changePassword, buttonText: USER_AUTH.CHANGE_PASSWORD },
  ];

  return (
    <Drawer
      anchor={"right"} //
      variant="persistent"
      open={props.showUserAvatarMenu}
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
            props.setShowUserAvatarMenu(false);
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
          {buttons.map((b) => (
            <Button
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
