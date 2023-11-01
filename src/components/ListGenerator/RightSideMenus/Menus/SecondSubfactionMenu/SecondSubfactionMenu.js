// React
import React, { useContext } from "react";
//Material UI
import { Button, Grid, ButtonGroup, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { SecondSubFactionContext } from "../../../../../contexts/secondSubFactionContext";
import { ItemContext } from "../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";

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
  const SFC = useContext(SecondSubFactionContext);
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);
  const RC = useContext(RightMenuContext);

  /**
   * Function takes the selected unit from the list, sets a new value for
   * the secondSubfaction property and replaces the old version of the unit in the
   * selectedUnits state variable with the new one.
   * @param {unitCard} unit
   * @param {String} newSecondSubFaction
   */
  const setSecondSubFactionInArmyList = (unit, newSecondSubFaction) => {
    let currentState = [...SEC.selectedUnits];

    const unitRemoved = currentState.filter((u) => !(u.unitName === unit.unitName && u.uniqueID === unit.uniqueID));
    unit.secondSubFaction = newSecondSubFaction;

    SEC.setSelectedUnits([...unitRemoved, unit]);
  };

  return (
    <Grid container direction="column" className={classes.overlay}>
      <Grid item>
        <IconButton
          onClick={() => {
            RC.closeSecondSubFactionMenu();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid item container direction="row" justify="center">
        {/*UNIT NAME */}
        <Grid item xs={9}>
          <Typography variant="h5" align="center" className={classes.unitName}>
            {IC.unitSelectedForShop.unitName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" justify="center">
        {/* PANEL BUTTONS */}
        <ButtonGroup size="large" orientation="vertical">
          {SFC.secondSubFactionList.map((ssf) => {
            return ssf === IC.unitSelectedForShop.secondSubFaction ? (
              <Button
                disabled={true}
                className={classes.currentlySelected}
                variant="text"
                key={ssf}
                onClick={() => {
                  setSecondSubFactionInArmyList(IC.unitSelectedForShop, ssf);
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
                  setSecondSubFactionInArmyList(IC.unitSelectedForShop, ssf);
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
