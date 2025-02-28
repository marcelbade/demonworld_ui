// React
import React, { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// components and functions
import { LightSwitchContext } from "../../contexts/lightSwitchContext";
// icons
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness4Icon from "@mui/icons-material/Brightness4";
// constants
import { OPTIONS } from "../../constants/textsAndMessages";

const LightSwitch = (props) => {
  const LC = useContext(LightSwitchContext);

  const style_light = { color: "black" };
  const style_dark = { color: "white" };

  const toggleDarkMode = () => {
    LC.setDarkModeOff((prevState) => !prevState);
  };

  return (
    <Tooltip title={<Typography>{OPTIONS.LIGHT_SWITCH}</Typography>}>
      <IconButton
        width={ props.width}
        height={props.height}
        onClick={() => {
          toggleDarkMode();
        }}
      >
        {LC.darkModeOff ? (
          <Brightness4Icon
            fontSize={props.iconSize} //
            sx={style_light}
          />
        ) : (
          <BrightnessHighIcon
            fontSize={props.iconSize} //
            sx={style_dark}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LightSwitch;
