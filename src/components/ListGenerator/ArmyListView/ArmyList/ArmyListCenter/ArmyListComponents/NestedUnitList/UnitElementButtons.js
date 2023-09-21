// React
import React, { useContext } from "react";
// Material UI
import { makeStyles, List } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
// components and functions
import { ArmyContext } from "../../../../../../../contexts/armyContext";
import { uuidGenerator } from "../../../../../../shared/sharedFunctions";

const useStyles = makeStyles({
  buttons: {
    marginRight: "1em",
  },
});

const UnitEntryButtons = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  /**
   * Function toggles the unit card view and Item shop view on and off, as well as switches between views for different units. In order to do this, both views are not toggled by a simple booelan flag, but an object that stores the previously clicked unit.
   * @param {unitCard} unit
   */
  const toggleMenuState = (unit, menu) => {
    let stateObjSetter;
    let stateObj;

    switch (menu) {
      case "UNIT_CARDS":
        stateObj = AC.statCardState;
        stateObjSetter = AC.setStatCardState;
        AC.closeItemShop();
        AC.closeSecondSubFactionMenu();
        break;
      case "ITEMS":
        stateObj = AC.itemShopState;
        stateObjSetter = AC.setItemShopState;
        AC.closeCardDisplay();
        AC.closeSecondSubFactionMenu();
        break;
      case "SECOND_SUB_FACTION":
        stateObj = AC.secondSubFactionMenuState;
        stateObjSetter = AC.setSecondSubFactionMenuState;
        AC.closeCardDisplay();
        AC.closeItemShop();
        break;

      default:
        break;
    }

    // first click on page (no card displayed)
    if (stateObj.clickedUnit === undefined) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
    // click on same unit again to toggle the card view on
    else if (stateObj.lastclickedUnit.unitName === unit.unitName && stateObj.show === true) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: false });
    }
    // click on same unit again to toggle the card view off
    else if (stateObj.lastclickedUnit.unitName === unit.unitName && stateObj.show === false) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
    // click on a different unit to show a different card
    else if (stateObj.lastclickedUnit.unitName !== unit.unitName) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
  };

  return (
    <List key={uuidGenerator()}>
      <ListItemButton
        key={uuidGenerator()}
        className={classes.buttons}
        variant="outlined"
        onClick={() => {
          AC.setUnitSelectedForShop(props.unit);
          toggleMenuState(props.unit, "ITEMS");
        }}
      >
        Gegenstände
      </ListItemButton>
      <ListItemButton
        key={uuidGenerator()}
        className={classes.cardButtons}
        variant="outlined"
        onClick={() => {
          toggleMenuState(props.unit, "UNIT_CARDS");
        }}
      >
        Kartenvorschau
      </ListItemButton>

      {AC.hasAdditionalSubFaction && !AC.excemptSubFactions.includes(props.subFaction) ? (
        <ListItemButton
          key={uuidGenerator()}
          className={classes.cardButtons}
          variant="outlined"
          onClick={() => {
            AC.setUnitSelectedForShop(props.unit);
            toggleMenuState(props.unit, "SECOND_SUB_FACTION");
          }}
        >
          {AC.secondSubfactionCaption}
        </ListItemButton>
      ) : null}
    </List>
  );
};

export default UnitEntryButtons;
