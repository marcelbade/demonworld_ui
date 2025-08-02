// React
import { useContext } from "react";
// Material UI
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// functions and components
import { USER_AUTH } from "../../constants/textsAndMessages";
// contexts
import { UserContext } from "../../contexts/userContext";

const UserLogButton = (props) => {
  const UC = useContext(UserContext);

  const displayLogInDialog = () => {
    UC.setDisplayLogInDialog(true);
  };

  return (
    <Tooltip
      title={
        <Typography>
          {UC.userLoggedIn //
            ? USER_AUTH.LOGOUT_ACCOUNT
            : USER_AUTH.LOGIN_BUTTON}
        </Typography>
      }
    >
      {UC.userLoggedIn ? (
        <IconButton
          sx={{
            width: props.buttonWidth,
            height: props.buttonHeight,
          }}
          onClick={() => {
            UC.setShowUserAvatarDrawer(true);
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "green", //
            }}
          >
            {UC.user.userName //
              .charAt(0)
              .toUpperCase()}
          </Avatar>
        </IconButton>
      ) : (
        <IconButton
          sx={{
            width: props.buttonWidth,
            height: props.buttonHeight,
          }}
          onClick={() => {
            displayLogInDialog();
          }}
        >
          <AccountCircleIcon fontSize={props.iconSize} />
        </IconButton>
      )}
    </Tooltip>
  );
};

export default UserLogButton;
