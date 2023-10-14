// React
import React, { useContext } from "react";
//Material UI
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";

// clsx
import clsx from "clsx";

// icons

const useStyles = makeStyles((theme) => ({
  typographyFont: {
    textAlign: "center",
    marginTop: "0.5em",
  },
  text: {
    paddingLeft: "1em",
  },
  strikeTroughText: {
    paddingLeft: "1em",
    color: "red",
    textDecorationLine: "line-through",
    textDecorationThickness: "0.2em",
  },
}));

const ListElementName = (props) => {
  const classes = useStyles();
  const calcContext = useContext(LossCalcContext);

  return (
    <Grid item>
      <Typography
        variant="button"
        className={
          props.unitDestroyedd //
            ? clsx(classes.typographyFont, classes.strikeTroughText)
            : clsx(classes.typographyFont, classes.text)
        }
      >
        {props.unitName}
      </Typography>
    </Grid>
  );
};

export default ListElementName;
