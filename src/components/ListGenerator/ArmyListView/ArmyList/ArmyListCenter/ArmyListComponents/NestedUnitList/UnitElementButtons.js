// React
import React, { useContext } from "react";
// Material UI
import { List } from "@mui/material";
import { ListItemButton } from "@mui/material";
// components and functions
import { BUTTON_TEXTS } from "../../../../../../../constants/textsAndMessages";
// context
import { SecondSubFactionContext } from "../../../../../../../contexts/secondSubFactionContext";
import { RightMenuContext } from "../../../../../../../contexts/rightMenuContext";
import { ItemContext } from "../../../../../../../contexts/itemContext";
import { TournamentRulesContext } from "../../../../../../../contexts/tournamentRulesContext";
import { SUMMONED } from "../../../../../../../constants/unitTypes";

const UnitElementButtons = (props) => {
  const SFC = useContext(SecondSubFactionContext);
  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);
  const TC = useContext(TournamentRulesContext);

  // menu names
  const UNIT_CARDS = "UNIT_CARDS";
  const ITEMS = "ITEMS";
  const SECOND_SUB_FACTION = "SECOND_SUB_FACTION";

  /**
   * Function toggles the menus on the right side.
   * It controls what menu and what content for which unit is shown.
   * In order to do this, the menus are not toggled by a simple boolean flag,
   * instead an object stores the previously clicked unit, a boolean flag and the clicked unit.
   * @param {unitCard} unit
   * @param {String} menu
   */
  const rightMenuController = (unit, menu) => {
    let stateObjSetter;
    let stateObj;

    switch (menu) {
      case UNIT_CARDS:
        setCard(unit);

        stateObj = RC.statCardState;
        stateObjSetter = RC.setStatCardState;
        RC.closeItemShop();
        RC.closeSecondSubFactionMenu();
        break;
      case ITEMS:
        stateObj = RC.itemShopState;
        stateObjSetter = RC.setItemShopState;
        RC.closeCardDisplay();
        RC.closeSecondSubFactionMenu();
        break;
      case SECOND_SUB_FACTION: // Thain faction only
        stateObj = RC.secondSubFactionMenuState;
        stateObjSetter = RC.setSecondSubFactionMenuState;
        RC.closeCardDisplay();
        RC.closeItemShop();
        break;
      default:
        throw Error("rightMenuController function received invalid menu parameter: unknown menu name");
    }

    // first click on a menu button (after loading the page)
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

  /**
   * Function sets the state for the stat card that is displayed when the "PREVIEW_CARD" button is clicked.
   * @param {unitCard} clickedUnit
   */
  const setCard = (clickedUnit) => {
    if (clickedUnit !== undefined) {
      RC.setDisplayedCard({ ...clickedUnit });
    }
  };

  if (
    !TC.showTournamentRulesMenu && //
    !RC.statCardState.show &&
    !RC.itemShopState.show &&
    !RC.secondSubFactionMenuState.show
  ) {
    //TODO Warning: Cannot update a component (`ListGenerator`) while rendering a different component (`UnitElementButtons`). To locate the bad setState() call inside `UnitElementButtons`,
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

  // values for buttons
  const buttons = [
    {
      show: props.unit.unitType !== SUMMONED,
      action: () => {
        IC.setUnitSelectedForShop(props.unit);
        rightMenuController(props.unit, ITEMS);
      },
      text: BUTTON_TEXTS.SHOW_ITEM_SHOP,
    },
    {
      show: true,
      action: () => {
        rightMenuController(props.unit, UNIT_CARDS);
      },
      text: BUTTON_TEXTS.PREVIEW_CARD,
    },
    {
      show:
        SFC.hasAdditionalSubFaction && //
        !SFC.excemptSubFactions.includes(props.subFaction) &&
        props.unit.unitType !== SUMMONED,
      action: () => {
        IC.setUnitSelectedForShop(props.unit);
        rightMenuController(props.unit, SECOND_SUB_FACTION);
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

export default UnitElementButtons;
