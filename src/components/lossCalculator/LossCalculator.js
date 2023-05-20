// React
import React, { useEffect, useState } from "react";
//Material UI
import { Grid, List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { unitCardMultiSort, uuidGenerator } from "../shared/sharedFunctions";
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
  const [trackUnitLoss, setTrackUnitLoss] = useState([]);

  useEffect(() => {
    let tempArray = MOCK_LIST.map((u) => {
      return {
        identifier: u.unitName + u.uniqueID,
        lostPoints: 0,
      };
    });

    setTrackUnitLoss(tempArray);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let sum = 0;

    trackUnitLoss.forEach((u) => {
      sum += u.lostPoints;
    });

    setTotalPointsLost(sum);
  }, [trackUnitLoss]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculates the total points lost.
   * @param {String} name
   * @param {String} uniqueId
   * @param {int } lostPoints
   */
  const addToTotalLostPoints = (name, uniqueId, lostPoints) => {
    let tempArray = [...trackUnitLoss];
    let identifier = name + uniqueId;

    tempArray.forEach((u) => {
      if (u.identifier === identifier) {
        u.lostPoints = lostPoints;
      }
    });

    setTrackUnitLoss(tempArray);
  };

  return (
    <Grid container direction="column">
      <List>
        {unitCardMultiSort(MOCK_LIST).map((u) => {
          return <LossListElement unit={u} addToTotalLostPoints={addToTotalLostPoints} key={ u.uniqueID} />;
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
