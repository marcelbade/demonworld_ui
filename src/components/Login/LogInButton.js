// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FaceIcon from "@mui/icons-material/Face";
// functions and components
import { OPTIONS } from "../../constants/textsAndMessages";
// contexts
import { UserContext } from "../../contexts/userContext";

const LogInButton = (props) => {
  const UC = useContext(UserContext);

  const displayLogInPrompt = () => {
    UC.setDisplayLogInPrompt(true);
  };

  return (
    <Tooltip title={<Typography>{OPTIONS.LOGIN}</Typography>}>
      <IconButton
        sx={{ paddingTop: "2em" }}
        size={props.bttnSize}
        onClick={() => {
          displayLogInPrompt();
        }}
      >
        {UC.userLoggedIn ? <FaceIcon /> : <AccountCircleIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default LogInButton;
