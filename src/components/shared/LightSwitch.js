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

  const style_light = { fontSize: props.iconSize, color: "black" };
  const style_dark = { fontSize: props.iconSize, color: "white" };

  const toggleDarkMode = () => {
    LC.setDarkModeOff((prevState) => !prevState);
  };

  return (
    <Tooltip title={<Typography>{OPTIONS.LIGHT_SWITCH}</Typography>}>
      <IconButton
        size={props.bttnSize}
        onClick={() => {
          toggleDarkMode();
        }}
      >
        {LC.darkModeOff ? <Brightness4Icon sx={style_light} /> : <BrightnessHighIcon sx={style_dark} />}
      </IconButton>
    </Tooltip>
  );
};

export default LightSwitch;
