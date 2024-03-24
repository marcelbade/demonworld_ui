// React
import React, { useContext } from "react";
// components and functions
import { LightSwitchContext } from "../../../contexts/lightSwitchContext";

const CustomIcon = (props) => {
  const LC = useContext(LightSwitchContext);

  return (
    <img
      src={props.icon} //
      alt={props.altText}
      height={props.height}
      width={props.width}
      sx={!LC.darkModeOff ? { webkitFilter: `invert(100%)`, filter: `invert(100%)` } : null}
    />
  );
};

export default CustomIcon;
