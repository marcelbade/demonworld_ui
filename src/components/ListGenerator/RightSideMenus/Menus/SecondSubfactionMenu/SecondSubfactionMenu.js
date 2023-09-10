// React
import React, { useContext, useEffect } from "react";
//Material UI
import { Button, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { uuidGenerator } from "../../../../shared/sharedFunctions";
// constants
import { ARMIES_ADDITIONAL_SUBFACTIONS, ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION } from "../../../../../constants/factions";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "20vw",
  },
  buttons: {
    fontWeight: "bold",
    border: "none",
  },
  currentlySelected: {
    fontWeight: "bold",
    border: "none",
    backgroundColor: "lightgrey",
    color: "red",
  },
  unitName: {
    fontWeight: "bold",
    borderBottom: "solid 4px black",
  },
});

const SecondSubFactionMenu = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  // set boolean flag if the selected faction has an addditonal sub faction for every unit.
  useEffect(() => {
    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(AC.selectedFactionName)) {
      const result = ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION.filter((e) => e.army === AC.selectedFactionName);

      AC.setHasAdditionalSubFaction(true);
      AC.setSecondSubfactionCaption(result[0].caption);
      AC.setExcemptSubFactions(result[0].excemptSubFactions);
      AC.setSecondSubFactionList(result[0].secondSubFactionList);
    } else {
      AC.setHasAdditionalSubFaction(false);
    }
  }, [AC.selectedFactionName, AC.secondSubFactionMenuState]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function takes the selected unit from the list, sets a new value for
   * the secondSubfaction property and replaces the old version of the unit in the
   * selectedUnits state variable with the new one.
   * @param {unitCard} unit
   * @param {String} newSecondSubFaction
   */
  const setSecondSubFactionInArmyList = (unit, newSecondSubFaction) => {
    let currentState = [...AC.selectedUnits];

    const unitRemoved = currentState.filter((u) => !(u.unitName === unit.unitName && u.uniqueID === unit.uniqueID));
    unit.secondSubFaction = newSecondSubFaction;

    AC.setSelectedUnits([...unitRemoved, unit]);
  };

  return (
    <Grid container direction="column" className={classes.overlay}>
      <Grid item container direction="row">
        {/*UNIT NAME */}
        <Grid item xs={9}>
          <Typography variant="h5" align="center" className={classes.unitName}>
            {AC.unitSelectedForShop.unitName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row">
        <Grid item xs={3} className={classes.panelButtonsBackground}>
          {/* PANEL BUTTONS */}
          <ButtonGroup size="large" orientation="vertical">
            {AC.secondSubFactionList.map((ssf) => {
              return ssf === AC.unitSelectedForShop.secondSubFaction ? (
                <Button
                  disabled={true}
                  className={classes.currentlySelected}
                  variant="text"
                  key={uuidGenerator()}
                  onClick={() => {
                    setSecondSubFactionInArmyList(AC.unitSelectedForShop, ssf);
                  }}
                >
                  {ssf}
                </Button>
              ) : (
                <Button
                  className={classes.buttons}
                  variant="text"
                  key={uuidGenerator()}
                  onClick={() => {
                    setSecondSubFactionInArmyList(AC.unitSelectedForShop, ssf);
                  }}
                >
                  {ssf}
                </Button>
              );
            })}
          </ButtonGroup>
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Grid>
  );
};

export default SecondSubFactionMenu;
