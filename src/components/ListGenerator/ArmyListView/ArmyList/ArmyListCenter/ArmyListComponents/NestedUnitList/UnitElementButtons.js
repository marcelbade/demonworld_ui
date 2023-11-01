// React
import React, { useContext } from "react";
// Material UI
import { makeStyles, List } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
// components and functions
import { SecondSubFactionContext } from "../../../../../../../contexts/secondSubFactionContext";
import { RightMenuContext } from "../../../../../../../contexts/rightMenuContext";
import { ItemContext } from "../../../../../../../contexts/itemContext";
import { BUTTON_TEXTS } from "../../../../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  buttons: {
    marginRight: "1em",
  },
});

const UnitEntryButtons = (props) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const SFC = useContext(SecondSubFactionContext);
  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);

  /**
   * Function toggles the unit card view and Item shop view on and off, as well as switches between views for different units. In order to do this, both views are not toggled by a simple booelan flag, but an object that stores the previously clicked unit.
   * @param {unitCard} unit
   */
  const toggleMenuState = (unit, menu) => {
    let stateObjSetter;
    let stateObj;

    switch (menu) {
      case "UNIT_CARDS":
        stateObj = RC.statCardState;
        stateObjSetter = RC.setStatCardState;
        RC.closeItemShop();
        RC.closeSecondSubFactionMenu();
        break;
      case "ITEMS":
        stateObj = RC.itemShopState;
        stateObjSetter = RC.setItemShopState;
        RC.closeCardDisplay();
        RC.closeSecondSubFactionMenu();
        break;
      case "SECOND_SUB_FACTION":
        stateObj = RC.secondSubFactionMenuState;
        stateObjSetter = RC.setSecondSubFactionMenuState;
        RC.closeCardDisplay();
        RC.closeItemShop();
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

  const buttons = [
    {
      show: true,
      action: () => {
        IC.setUnitSelectedForShop(props.unit);
        toggleMenuState(props.unit, "ITEMS");
      },
      text: BUTTON_TEXTS.PREVIEW_CARD,
    },
    {
      show: true,
      action: () => {
        toggleMenuState(props.unit, "UNIT_CARDS");
      },
      text: BUTTON_TEXTS.SHOW_ITEM_SHOP,
    },
    {
      show: SFC.hasAdditionalSubFaction && !SFC.excemptSubFactions.includes(props.subFaction),
      action: () => {
        IC.setUnitSelectedForShop(props.unit);
        toggleMenuState(props.unit, "SECOND_SUB_FACTION");
      },
      text: SFC.secondSubfactionCaption,
    },
  ];

  return (
    <List key={props.unit.uniqueID}>
      {buttons.map((b, i) => {
        return b.show ? (
          <ListItemButton
            key={i} // static list
            className={classes.cardButtons}
            variant="outlined"
            onClick={b.action}
          >
            {b.text}
          </ListItemButton>
        ) : null;
      })}
    </List>
  );
};

export default UnitEntryButtons;
