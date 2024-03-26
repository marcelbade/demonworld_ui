// React
import React, { useContext } from "react";
// components and functions
import { LightSwitchContext } from "../../../contexts/lightSwitchContext";
import { Icon } from "@mui/material";

const CustomIcon = (props) => {
  const LC = useContext(LightSwitchContext);

  const STYLES = {
    width: props.width, //
    height: props.height,
  };

  /**
   * Function checks whether the app is using the dark theme and flipps the icon color if necessary.
   * @returns a plain js objkect containing css attributes.
   */
  const toggleIconColor = () => {
    return !LC.darkModeOff
      ? {
          ...STYLES, //
          webkitFilter: `invert(100%)`,
          filter: `invert(100%)`,
        }
      : STYLES;
  };

  return (
    <Icon sx={toggleIconColor()}>
      <img
        src={props.icon} //
        height={props.height}
        alt={props.altText}
      />
    </Icon>
  );
};

export default CustomIcon;
