// React
import React from "react";
//Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  bttns: {
    // [theme.breakpoints.up("md")]: {
    //   flexDirection: "row",
    // },
    // [theme.breakpoints.down('lg')]: {
    //   flexDirection: "row",
    //   "@media (orientation:landscape)": {
    //     flexDirection: "row",
    //   },
    // },
  },
}));

const UnitLossCalculatorButton = (props) => {
  const classes = useStyles();

  return props.display ? (
    <Tooltip title={<Typography variant="h6">{props.tooltipText}</Typography>}>
      <IconButton
        onClick={() => {
          props.action();
        }}
        disabled={props.disableBttn}
        className={classes.bttn}
      >
        {props.icon}
      </IconButton>
    </Tooltip>
  ) : null;
};

export default UnitLossCalculatorButton;
