// React
import React, { Fragment } from "react";
//Material UI
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
  pointsTotal: {
    marginLeft: "2em",
  },
});

const LostPointDisplay = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="h6" className={classes.pointsTotal}>
        Verlorene Punkte:
      </Typography>
      <Typography variant="h6" className={classes.pointsTotal}>
        {props.totalPointsLost.toFixed(2)}
      </Typography>
    </Fragment>
  );
};

export default LostPointDisplay;
