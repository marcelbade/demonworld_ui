// React
import React, { useContext } from "react";
// Material UI
import { makeStyles, List } from "@material-ui/core";
import { ListItemButton } from "@mui/material";
// components and functions
import { SecondSubFactionContext } from "../../../../../../../contexts/secondSubFactionContext";
import { RightMenuContext } from "../../../../../../../contexts/rightMenuContext";
import { ItemContext } from "../../../../../../../contexts/itemContext";
import { TournamentRulesContext } from "../../../../../../../contexts/tournamentRulesContext";
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
  const TC = useContext(TournamentRulesContext);

  /**
   * Function controls the menus on the right.
   * It controls what menu and what content for which unit is shown.
   * In order to do this, the menus are not toggled by a simple booelan flag,
   * instead an object that stores the previously clicked unit is used.
   * @param {unitCard} unit
   */
  const rightMenuController = (unit, menu) => {
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
        throw Error("rightMenuController function received invalid menu parameter");
    }

    // first click on page (no menu is displayed)
    if (stateObj.clickedUnit === undefined) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
    // click on a unit to toggle the menu for this unit on
    else if (stateObj.lastclickedUnit.unitName === unit.unitName && stateObj.show === true) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: false });
    }
    // click on same unit again to toggle the menu off
    else if (stateObj.lastclickedUnit.unitName === unit.unitName && stateObj.show === false) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
    // click on a different unit to show the menu for that unit
    else if (stateObj.lastclickedUnit.unitName !== unit.unitName) {
      stateObjSetter({ clickedUnit: unit, lastclickedUnit: unit, show: true });
    }
  };

  if (
    !TC.showTournamentRulesMenu && //
    !RC.statCardState.show &&
    !RC.itemShopState.show &&
    !RC.secondSubFactionMenuState.show
  ) {
    RC.setShowOptionButtons(true);
  }
  if (
    TC.showTournamentRulesMenu || //
    RC.statCardState.show ||
    RC.itemShopState.show ||
    RC.secondSubFactionMenuState.show
  ) {
    RC.setShowOptionButtons(false);
  }

  const buttons = [
    {
      show: true,
      action: () => {
        IC.setUnitSelectedForShop(props.unit);
        rightMenuController(props.unit, "ITEMS");
      },
      text: BUTTON_TEXTS.PREVIEW_CARD,
    },
    {
      show: true,
      action: () => {
        rightMenuController(props.unit, "UNIT_CARDS");
      },
      text: BUTTON_TEXTS.SHOW_ITEM_SHOP,
    },
    {
      show: SFC.hasAdditionalSubFaction && !SFC.excemptSubFactions.includes(props.subFaction),
      action: () => {
        IC.setUnitSelectedForShop(props.unit);
        rightMenuController(props.unit, "SECOND_SUB_FACTION");
      },
      text: SFC.secondSubfactionCaption,
    },
  ];

  return (
    <List key={props.unit.uniqueID}>
      {buttons.map((b, i) => {
        return b.show ? (
          <ListItemButton
            key={i} //
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
