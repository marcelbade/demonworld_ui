// React
import React from "react";
//Material UI
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bttns: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",

      "@media (orientation:landscape)": {
        flexDirection: "row",
      },
    },
  },
}));

const LossCalculatorButton = (props) => {
  const classes = useStyles();

  return props.displayButton ? (
    <Button
      variant="contained"
      onClick={() => {
        props.function();
      }}
      disabled={props.disablerExpression}
      className={classes.bttn}
    >
      {props.icon}
    </Button>
  ) : null;
};

export default LossCalculatorButton;
