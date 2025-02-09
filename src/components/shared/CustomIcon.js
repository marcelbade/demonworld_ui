// React
import React, { useContext } from "react";
// components and functions
import { LightSwitchContext } from "../../contexts/lightSwitchContext";
import { Icon } from "@mui/material";

const CustomIcon = (props) => {
  const LC = useContext(LightSwitchContext);

  const STYLES = {
    height: props.boxHeight, //
    width: props.boxWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  /**
   * All icons in the app are black. When using dark mode, the color must be inverted. 
   * The Same is true for icons on a dark background. 
   * @returns a plain js objkect containing css attributes.
   */
  const toggleIconColor = () => {
    return !LC.darkModeOff || props.darkBackGround
      ? {
          ...STYLES,
          webkitFilter: `invert(100%)`,
          filter: `invert(100%)`,
        }
      : STYLES;
  };

  const toggleCheckBoxIcon = () => {
    return props.checkedBoxIcon
      ? {
          ...STYLES,
          webkitFilter: `opacity(50%) grayscale(50%)`,
          filter: `opacity(50%) grayscale(50%)`,
        }
      : STYLES;
  };

  return (
    <Icon sx={{ ...toggleIconColor(), ...toggleCheckBoxIcon() }}>
      <img
        src={props.icon} //
        width={props.width}
        height={props.height}
        alt={props.altText}
      />
    </Icon>
  );
};

export default CustomIcon;
