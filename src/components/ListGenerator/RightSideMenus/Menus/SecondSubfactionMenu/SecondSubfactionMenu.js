// React
import React, { useContext } from "react";
//Material UI
import { Button, Grid, ButtonGroup, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
  },
  panelButtonBox: {},
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
    marginBottom: "1em",
  },
});

const SecondSubFactionMenu = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

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
      <Grid item>
        <IconButton
          onClick={() => {
            AC.closeSecondSubFactionMenu();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid item container direction="row" justify="center">
        {/*UNIT NAME */}
        <Grid item xs={9}>
          <Typography variant="h5" align="center" className={classes.unitName}>
            {AC.unitSelectedForShop.unitName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" justify="center">
        {/* PANEL BUTTONS */}
        <ButtonGroup size="large" orientation="vertical">
          {AC.secondSubFactionList.map((ssf) => {
            return ssf === AC.unitSelectedForShop.secondSubFaction ? (
              <Button
                disabled={true}
                className={classes.currentlySelected}
                variant="text"
                key={ssf}
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
                key={ssf}
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
    </Grid>
  );
};

export default SecondSubFactionMenu;
