// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// modules
import StatCardUnitBack from "./statCardUnitBack";
import StatCardUnitFront from "./statCardUnitFront";

const useStyles = makeStyles({
  CardBox: {
    marginRight: "2em",
    marginTop: "2em", 
  },
});

const StatCardUnit = (props) => {
  const classes = useStyles();

  /**
   * Wrapper Element. Allows for vertical or horizontal layout of the cards.
   * @param {String} props A value for the alignment property of the MUI grid element.
   * @returns jsx
   */
  return (
    <Grid container direction={props.alignment} className={classes.CardBox} spacing={3}>
      <Grid item>
        <StatCardUnitFront unit={props.unit} />
      </Grid>
      <Grid>
        <StatCardUnitBack unit={props.unit} />
      </Grid>
    </Grid>
  );
};

export default StatCardUnit;
