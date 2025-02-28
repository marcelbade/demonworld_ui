// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FaceIcon from "@mui/icons-material/Face";
// functions and components
import { LOGIN } from "../../constants/textsAndMessages";
// contexts
import { UserContext } from "../../contexts/userContext";

const LogInButton = (props) => {
  const UC = useContext(UserContext);

  const displayLogInPrompt = () => {
    UC.setDisplayLogInPrompt(true);
  };

  return (
    <Tooltip title={<Typography>{LOGIN.LOGIN_BUTTON}</Typography>}>
      <IconButton
        sx={{
          width: props.buttonWidth,
          height: props.buttonHeight,
        }}
        onClick={() => {
          displayLogInPrompt();
        }}
      >
        {UC.userLoggedIn ? ( //
          <FaceIcon fontSize={props.iconSize} />
        ) : (
          <AccountCircleIcon fontSize={props.iconSize} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LogInButton;
