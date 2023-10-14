// React
import React from "react";
//Material UI
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  pointsTotal: {
    marginLeft: "2em",
  },
});

const LostPointDisplay = (props) => {
  const classes = useStyles();

  return (
    <Grid container xs={6} item direction="row" alignItems="center" justify="flex-start">
      <Typography variant="h6" className={classes.pointsTotal}>
        Verlorene Punkte:
      </Typography>
      <Typography variant="h6" className={classes.pointsTotal}>
        {props.totalPointsLost.toFixed(2)}
      </Typography>
    </Grid>
  );
};

export default LostPointDisplay;
