// React
import React from "react";
//Material UI
import { Typography, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
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
