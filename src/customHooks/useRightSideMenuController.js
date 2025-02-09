// react
import { useContext } from "react";
// context
import { RightMenuContext } from "../contexts/rightMenuContext";
import { ItemContext } from "../contexts/itemContext";
import { TournamentRulesContext } from "../contexts/tournamentRulesContext";
import { SecondSubFactionContext } from "../contexts/secondSubFactionContext";
// components and functions
import { BUTTON_TEXTS } from "../constants/textsAndMessages";
import { SUMMONED } from "../constants/unitTypes";

/**
 *  - use bttnSelectorObj to select which buttons to display
 *  - paste all the logic for the rightSideMenucrontroller here
 *  - dont forget the context !
 *  - RETURN VALUE: object with:
 *      - rightMenuController function
 *      -
 *
 * @param {*} bttnSelectorObj
 */
const useRightSideMenuController = (unit, subFaction, bttnSelectorObj) => {
  const SFC = useContext(SecondSubFactionContext);
  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);
  const TC = useContext(TournamentRulesContext);

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

  /**
   * These if-statements control, whether the options menu should be displayed
   * instead of the stat card preview, the item shop or the menu for the second sub faction.
   */
  if (
    !TC.showTournamentRulesMenu && //
    !RC.statCardState.show &&
    !RC.itemShopState.show &&
    !RC.secondSubFactionMenuState.show
  ) {
    //TODO Warning: Cannot update a component
    // (`ListGenerator`) while rendering a different component (`UnitElementButtons`).
    // To locate the bad setState() call inside `UnitElementButtons`,
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

  /**
   * Function implements an additional rule for the the thain faction:
   * for certain units the player must select a tribe.
   * For these units, an extra button is dislayed.
   * @returns
   */
  const displayTribeSelectorButton = () => {
    return (
      SFC.hasAdditionalSubFaction && //
      !SFC.excemptSubFactions.includes(subFaction) &&
      unit.unitType !== SUMMONED
    );
  };

  /**
   * Function tests whether a unit has the type "SUMMONED".
   * if true, the item button is not displayed.
   * @returns
   */
  const testForSummons = () => {
    return unit.unitType !== SUMMONED;
  };

  // values for buttons
  const buttons = [
    {
      display: testForSummons() && bttnSelectorObj.displayItemShop,
      action: () => {
        IC.setUnitSelectedForShop(unit);
        rightMenuController(unit, ITEMS);
      },
      text: BUTTON_TEXTS.SHOW_ITEM_SHOP,
      icon: null,
    },
    {
      display: bttnSelectorObj.displayCard,
      action: () => {
        rightMenuController(unit, UNIT_CARDS);
      },
      text: BUTTON_TEXTS.PREVIEW_CARD,
      //   icon: cardIcon,
      icon: null,
    },
    {
      display: displayTribeSelectorButton() && bttnSelectorObj.secondSubFaction,
      action: () => {
        IC.setUnitSelectedForShop(unit);
        rightMenuController(unit, SECOND_SUB_FACTION);
      },
      text: SFC.secondSubfactionCaption,
      icon: null,
    },
  ];

  return buttons.filter((b) => b.display);
};

export default useRightSideMenuController;
