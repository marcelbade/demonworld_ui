// React
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
//Material UI
import { Button, Grid, IconButton, List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// components and functions
import { isObjectEmtpy, unitCardMultiSort, uuidGenerator } from "../shared/sharedFunctions";
import LossListElement from "./LossListElement";
// import { MOCK_LIST } from "./mockList";

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
  BackBttn: {
    width: "2em",
    height: "2em",
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
  noListButtons: {
    margin: "2em",
    width: "30em",

    height: "3em",

    fontFamily: "NotMaryKate",
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
});

const LossCalculator = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  //state
  const [totalPointsLost, setTotalPointsLost] = useState(0);
  const [trackUnitLoss, setTrackUnitLoss] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    if (location.state !== undefined && location.state.selectedArmy !== undefined && location.state.selectedArmy.length !== 0) {
      setList(location.state.selectedArmy);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    if (isObjectEmtpy(list)) {
      for (let i = 0; i < list.length; i++) {
        tempObj = { ...tempObj, [i]: 0 };
      }

      setTrackUnitLoss({ ...tempObj });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function updates the tracking object everytime the amount of lost points for a unit changes.
   * @param {int} pointsLost
   * @param {int} index
   */
  const updateUnitLossTracker = (pointsLost, index) => {
    //TODO CAUSES INFINTE RERENDERS - FIX ME! :D
    // setTrackUnitLoss({ ...trackUnitLoss, [index]: pointsLost });
  };

  /**
   * Function calls history objects to take user back to main menu.
   */
  const navigateToPage = (destination) => {
    history.push(`/${destination}`);
  };

  return list.length !== 0 ? (
    <Grid container direction="column">
      <Grid>
        <IconButton
          onClick={() => {
            navigateToPage(location.state.lastPage);
          }}
        >
          <ChevronLeftIcon className={classes.BackBttn} />
        </IconButton>
      </Grid>
      <List>
        {unitCardMultiSort(list).map((u, i) => {
          return (
            <LossListElement
              unit={u} //
              index={i}
              updateUnitLossTracker={updateUnitLossTracker}
              key={uuidGenerator()}
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
  ) : (
    <Grid container direction="column">
      <Grid>
        <IconButton
          onClick={() => {
            // navigate to landing page
            navigateToPage("");
          }}
        >
          <ChevronLeftIcon className={classes.BackBttn} />
        </IconButton>
      </Grid>
      <Grid container direction="column" alignContent="center" justify="center">
        <Button
          variant="outlined"
          className={classes.noListButtons}
          onClick={() => {
            navigateToPage("ListGenerator");
          }}
        >
          Liste Erstellen
        </Button>
        <Button
          variant="outlined"
          className={classes.noListButtons}
          onClick={() => {
            //TODO open login prompt
          }}
        >
          Ins Konto einloggen und Liste Laden
        </Button>
      </Grid>
    </Grid>
  );
};

export default LossCalculator;
