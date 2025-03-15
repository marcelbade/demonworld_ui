// React
import React, { useContext } from "react";
// Material UI
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FaceIcon from "@mui/icons-material/Face";
// functions and components
import { USER_AUTH } from "../../constants/textsAndMessages";
// contexts
import { UserContext } from "../../contexts/userContext";

const LogInButton = (props) => {
  const UC = useContext(UserContext);

  const displayLogInPrompt = () => {
    UC.setDisplayLogInPrompt(true);
  };

  const Logout = () => {};

  return (
    <Tooltip
      title={
        <Typography>
          {UC.userLoggedIn //
            ? USER_AUTH.LOGOUT_BUTTON
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
            Logout();
          }}
        >
          <Avatar sx={{ backgroundColor: "green" }}>
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
            displayLogInPrompt();
          }}
        >
          <AccountCircleIcon fontSize={props.iconSize} />
        </IconButton>
      )}
    </Tooltip>
  );
};

export default LogInButton;
