// React
import React from "react";
//Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";

const UnitLossCalculatorButton = (props) => {
  return props.display ? (
    <Tooltip title={<Typography variant="h6">{props.tooltipText}</Typography>}>
      <IconButton
        onClick={() => {
          props.action();
        }}
        disabled={props.disableBttn}
      >
        {props.icon}
      </IconButton>
    </Tooltip>
  ) : null;
};

export default UnitLossCalculatorButton;
