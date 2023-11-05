// React
import React from "react";
//Material UI
import { Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  pointsTotal: {
    marginLeft: "2em",
  },
});

const LostPointDisplay = (props) => {
  const classes = useStyles();

  return (
    <Grid container xs={6} item direction="row" alignItems="center" justifyContent="flex-start">
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
