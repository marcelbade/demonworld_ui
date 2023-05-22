// React
import React, { useEffect, useState } from "react";
//Material UI
import { Grid, List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { unitCardMultiSort } from "../shared/sharedFunctions";
import LossListElement from "./LossListElement";
import { MOCK_LIST } from "./mockList";

// constants
// clsx
import clsx from "clsx";

const useStyles = makeStyles({
  typographyFont: {
    fontFamily: "NotMaryKate",
  },
  pointsTotal: {
    marginLeft: "2em",
  },
});

const LossCalculator = () => {
  const classes = useStyles();

  //state
  const [totalPointsLost, setTotalPointsLost] = useState(0);
  const [trackUnitLoss, setTrackUnitLoss] = useState({});

  // Calculates the total point loss of the army list.
  useEffect(() => {
    let sum = 0;

    for (const key in trackUnitLoss) {
      if (trackUnitLoss.hasOwnProperty.call(trackUnitLoss, key)) {
        sum += trackUnitLoss[key];
      }
    }

    setTotalPointsLost(sum);
  }, [trackUnitLoss]); // eslint-disable-line react-hooks/exhaustive-deps

  // On the first render, set up an object to track the point loss for every unit. The object uses indizes as property keys.
  useEffect(() => {
    let tempObj = {};

    for (let i = 0; i < MOCK_LIST.length; i++) {
      tempObj = { ...tempObj, [i]: 0 };
    }

    setTrackUnitLoss({ ...tempObj });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function updates the tracking object everytime the amountg of lost points for a unit changes.
   * @param {int} pointsLost
   * @param {int} index
   */
  const updateUnitLossTracker = (pointsLost, index) => {
    setTrackUnitLoss({ ...trackUnitLoss, [index]: pointsLost });
  };

  return (
    <Grid container direction="column">
      <List>
        {unitCardMultiSort(MOCK_LIST).map((u, i) => {
          return (
            <LossListElement
              unit={u} //
              index={i}
              updateUnitLossTracker={updateUnitLossTracker}
              key={u.uniqueID}
            />
          );
        })}
      </List>
      <Grid item container direction="row">
        <Typography variant="h6" className={clsx(classes.typographyFont, classes.pointsTotal)}>
          Verlorene Punkte:
        </Typography>
        <Typography variant="h6" className={clsx(classes.typographyFont, classes.pointsTotal)}>
          {totalPointsLost}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LossCalculator;
