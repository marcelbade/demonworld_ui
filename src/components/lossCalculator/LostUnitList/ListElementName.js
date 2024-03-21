// React
import React from "react";
//Material UI
import { Typography, Grid } from "@mui/material";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

  return (
    <Grid item>
      <Typography
        variant="h6"
        className={
          props.unitDestroyed //
            ? classes.strikeTroughText
            : classes.text
        }
      >
        {props.unitName}
      </Typography>
    </Grid>
  );
};

export default ListElementName;
