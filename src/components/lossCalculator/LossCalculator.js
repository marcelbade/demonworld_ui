// React
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
//Material UI
import { Button, Grid, IconButton, List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// components and functions
import LossCalcProvider from "../../contexts/LossCalculatorContext";
import { unitCardMultiSort, uuidGenerator } from "../shared/sharedFunctions";
import LossListElement from "./LossListElement";
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
  const [list, setList] = useState([]);
  const [totalPointsLost, setTotalPointsLost] = useState(0);

  // Initializes the state by pulling the list from the history object. If none is present, an alternative UI is displayed
  useEffect(() => {
    if (location.state !== undefined && location.state.selectedArmy !== undefined && location.state.selectedArmy.length !== 0) {
      setList(location.state.selectedArmy);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Calculate current total point loss.
  useEffect(() => {
    let sum = 0;

    list.forEach((u) => {
      let pointCostLostElements = u.lossCounter * (u.points / u.numberOfElements);
      sum += pointCostLostElements;

      u.equipment.forEach((e) => {
        if (e.itemLost) {
          sum += e.points;
        }
      });
    });

    setTotalPointsLost(sum);
  }, [list]); // eslint-disable-line react-hooks/exhaustive-deps

  // Set flag "unitDestroyed" to change CSS.
  useEffect(() => {
    let tempArray = [...list];

    tempArray.forEach((u) => setUnitDestroyedFlag(u));
  }, [list]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function sets the unitDestroyed flag for a unit card object.
   * @param {unitCard obj} u
   * @returns unitCard obj
   */
  const setUnitDestroyedFlag = (u) => {
    if (u.lossCounter === u.numberOfElements) {
      u.unitDestroyed = true;
    } else {
      u.unitDestroyed = false;
    }
    return u;
  };

  /**
   * Function sets the value of the itemLost flag for one element (item) in the equipment array.
   * @param {String} itemName Name of the item the unit was equipped with.
   * @param {boolean} isLost  flag shows whether the element is lost or not.
   */
  const setItemIsLostFlag = (selectedUnit, itemName, isLost) => {
    let tempArray = [...list];

    let unitIndex = tempArray.findIndex((u) => u.uniqueID === selectedUnit.uniqueID);
    tempArray[unitIndex].equipment.forEach((e) => {
      if (e.name === itemName) {
        e.itemLost = isLost;
      }
    });

    setList([...tempArray]);
  };

  /**
   * Function calls history objects to take user back to main menu.
   */
  const navigateToPage = (destination) => {
    history.push(`/${destination}`);
  };

  return (
    <LossCalcProvider
      value={{
        list: list,
        setList: setList,
        setItemIsLostFlag: setItemIsLostFlag,
      }}
    >
      {list.length !== 0 ? (
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
      )}
    </LossCalcProvider>
  );
};

export default LossCalculator;
