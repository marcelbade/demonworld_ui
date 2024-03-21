// React
import React, { useContext } from "react";
// Material UI
import {makeStyles} from "@material-ui/core";
// components and functions
import { LightSwitchContext } from "../../../contexts/lightSwitchContext";

const useStyles = makeStyles((theme) => ({
  invertIcon: {
    webkitFilter: `invert(100%)`,
    filter: `invert(100%)`,
  },
}));

const CustomIcon = (props) => {
  const classes = useStyles();
  const LC = useContext(LightSwitchContext);

  return (
    <img
      src={props.icon} //
      alt={props.altText}
      height={props.height}
      width={props.width}
      className={!LC.darkModeOff ? classes.invertIcon : null}
    />
  );
};

export default CustomIcon;
