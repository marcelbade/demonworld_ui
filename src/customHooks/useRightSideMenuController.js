// react
import { useContext } from "react";
// context
import { ItemContext } from "../contexts/itemContext";
import { SecondSubFactionContext } from "../contexts/secondSubFactionContext";
import { RightMenuContext } from "../contexts/rightMenuContext";
import { TournamentRulesContext } from "../contexts/tournamentRulesContext";
// components and functions
import { BUTTON_TEXTS } from "../constants/textsAndMessages";
import { SUMMONED } from "../constants/unitTypes";

/**Function toggles the menus on the right side. It controls what menu
 * and what content for which unit is shown. In order to do this, the menus are
 * not toggled by a simple boolean flag, instead an object stores the previously
 * clicked unit, a boolean flag and the clicked unit. This makes
 * it possible to close a menu if the same button is clicked again
 * or leave the menub open and rerender the content if needed.
 * Please note: if only the close functions are needed as a return value, the
 * three parameters can be empty ({},"",{})!
 * @param {unitCard} unit
 * @param {String} subFaction
 * @param {obj} bttnSelectorObj
 * @returns an object containing four fields:
 * - an array of button objects. The object describe the button separately
 *   from the UI implementation by storing the button action,
 *   the button text and whether to display it.
 * - three functions that close the corrsponing menu
 */
const useRightSideMenuController = (unit, subFaction, bttnSelectorObj) => {
  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);
  const SFC = useContext(SecondSubFactionContext);
  const TC = useContext(TournamentRulesContext);

  const UNIT_CARDS = "UNIT_CARDS";
  const ITEMS = "ITEMS";
  const SECOND_SUB_FACTION = "SECOND_SUB_FACTION";

  /**
   * Function closes the card preview.
   */
  const closeCardDisplay = () => {
    RC.setStatCardState({
      clickedUnit: {}, //
      lastclickedUnit: {},
      show: false,
    });
  };

  /**
   * Function closes the item shop.
   */
  const closeItemShop = () => {
    RC.setItemShopState({
      clickedUnit: {}, //
      lastclickedUnit: {},
      show: false,
    });
  };

  /**
   * Function closes the second sub faction menu.
   */
  const closeSecondSubFactionMenu = () => {
    RC.setSecondSubFactionMenuState({
      clickedUnit: {}, //
      lastclickedUnit: {},
      show: false,
    });
  };

  /**
   * Function contains the button logic. The function has two parts: First, it checks
   * which button is clicked (card, shop or second faction) and initializes two objects:
   * the state object receives the state of the menu and the setter item its setter function.
   * In the second part it checks the current state of the menu to
   * execute one of 4 possible actions.
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
        closeItemShop();
        closeSecondSubFactionMenu();
        break;
      case ITEMS:
        stateObj = RC.itemShopState;
        stateObjSetter = RC.setItemShopState;
        closeCardDisplay();
        closeSecondSubFactionMenu();
        break;
      case SECOND_SUB_FACTION: // Thain faction only
        stateObj = RC.secondSubFactionMenuState;
        stateObjSetter = RC.setSecondSubFactionMenuState;
        closeCardDisplay();
        closeItemShop();
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
    return unit !== undefined && unit.unitType !== SUMMONED;
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

  return {
    buttons: buttons.filter((b) => b.display),
    closeCardDisplay: closeCardDisplay,
    closeItemShop: closeItemShop,
    closeSecondSubFactionMenu: closeSecondSubFactionMenu,
  };
};

export default useRightSideMenuController;
