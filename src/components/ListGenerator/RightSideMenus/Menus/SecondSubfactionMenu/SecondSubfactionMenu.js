// React
import React, { useContext } from "react";
//Material UI
import { Button, Grid, ButtonGroup, Typography, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { SecondSubFactionContext } from "../../../../../contexts/secondSubFactionContext";
import { ItemContext } from "../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import { RightMenuContext } from "../../../../../contexts/rightMenuContext";
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
import { ArmyContext } from "../../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../../contexts/alternativeListContext";

const useStyles = makeStyles((theme) => ({
  overlay: {
    height: "100vh",
    width: "30vw",
  },
  unitName: {
    borderBottom: "solid 4px black",
    marginBottom: "1em",
  },
}));

const SecondSubFactionMenu = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);
  const SFC = useContext(SecondSubFactionContext);
  const RC = useContext(RightMenuContext);

  const validation = useArmyValidation();

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
          size="large"
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid item container direction="row" justifyContent="center">
        <Grid item xs={9}>
          <Typography variant="h5" align="center" className={classes.unitName}>
            {IC.unitSelectedForShop.unitName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" justifyContent="center">
        <ButtonGroup size="large" orientation="vertical">
          {SFC.secondSubFactionList.map((ssf) => {
            return ssf === IC.unitSelectedForShop.secondSubFaction ? (
              <Button
                disabled={true} //
                variant="text"
                key={ssf}
              >
                {ssf}
              </Button>
            ) : (
              <Button
                variant="text"
                key={ssf}
                onClick={() => {
                  setSecondSubFactionInArmyList(IC.unitSelectedForShop, ssf);
                  // immediately re-evaluate list so the unit is shown correctly
                  validation.validateList(
                    SEC.selectedUnits, //
                    SEC.maxPointsAllowance,
                    AC.subFactions,
                    ALC.armyHasAlternativeLists
                  );
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
