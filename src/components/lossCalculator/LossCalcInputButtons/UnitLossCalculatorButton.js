// React
import React from "react";
//Material UI
import { IconButton } from "@mui/material";

const UnitLossCalculatorButton = (props) => {
  return props.display ? (
    <IconButton
      onClick={() => {
        props.action();
      }}
      disabled={props.disableBttn}
    >
      {props.icon}
    </IconButton>
  ) : null;
};

export default UnitLossCalculatorButton;
