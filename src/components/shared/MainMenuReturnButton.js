// react
import React from "react";
import { useHistory } from "react-router-dom";
// material ui
import { IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const MainMenuReturnButton = (props) => {
  const history = useHistory();
  const theme = useTheme();

  const style = { fontSize: props.iconSize };

  /**
   * Function calls history objects to take user back to main menu.
   */
  const backToMainmenu = () => {
    history.push("/");
  };

  return (
    <IconButton
      sx={{
        [theme.breakpoints.up("md")]: {
          top: "0%",
          left: "1%",
        },
      }}
      onClick={() => {
        backToMainmenu();
      }}
      size={props.bttnSize}
    >
      <ChevronLeftIcon sx={style} />
    </IconButton>
  );
};

export default MainMenuReturnButton;
