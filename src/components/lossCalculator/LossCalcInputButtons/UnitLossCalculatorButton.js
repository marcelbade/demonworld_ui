// React
import React from "react";
//Material UI
import { Button, Tooltip, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  bttns: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: "row",

      "@media (orientation:landscape)": {
        flexDirection: "row",
      },
    },
  },
}));

const UnitLossCalculatorButton = (props) => {
  const classes = useStyles();

  return props.displayButton ? (
    <Tooltip title={<Typography className={classes.tooltipText}>{props.tooltipText}</Typography>}>
      <Button
        variant="contained"
        onClick={() => {
          props.action();
        }}
        disabled={props.disablerExpression}
        className={classes.bttn}
      >
        {props.icon}
      </Button>
    </Tooltip>
  ) : null;
};

export default UnitLossCalculatorButton;
