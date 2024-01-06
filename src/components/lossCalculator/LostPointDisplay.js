// React
import React, { Fragment } from "react";
//Material UI
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { LOSS_CALCULATOR } from "../../constants/textsAndMessages";

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
        {LOSS_CALCULATOR.LOST_POINTS}
      </Typography>
      <Typography variant="h6" className={classes.pointsTotal}>
        {props.totalPointsLost.toFixed(2)}
      </Typography>
    </Fragment>
  );
};

export default LostPointDisplay;
