// react
import { useContext } from "react";
// context
import { ItemContext } from "../contexts/itemContext";
import { SecondSubFactionContext } from "../contexts/secondSubFactionContext";
import { RightMenuContext } from "../contexts/rightMenuContext";
// components and functions
import { BUTTON_TEXTS } from "../constants/textsAndMessages";
import { SUMMONED } from "../constants/unitTypes";
import PaymentIcon from "@mui/icons-material/Payment";
import ChestIcon from "../assets/icons/chest.svg";
import CustomIcon from "../components/shared/CustomIcon";

/**Custom hook controls the menus on the right side of the army list. It does two things:
 * Firstly, it controls what menu and what content for which unit is shown. In order to do this,
 * the menus are not toggled by a simple boolean flag. Instead, an object stores the previously
 * clicked unit, a boolean flag and the clicked unit. This makes it possible to close a menu if
 * the same button is clicked again or leave the menu open and re-render the content
 * if a different unit is clicked. Exception: The option buttons are always the same for every unit
 * and are therefore controlled with just a flag.
 * Secondly, the hook allows the separation of button logic from the buttons repesentation in the UI.
 * Please note: if only the close functions are needed as a return value, the
 * three parameters should be given as ({},"",{})!
 * @param {unitCard} unit
 * @param {String} subFaction - the unit's subfaction is necessary as several units have the same name.
 * @param {{displayCard: boolean, displayItemShop: boolean, secondSubFaction: boolean }} bttnSelectorObj The
 * bttnSelectorObj has three properties corresponding to three possible
 * buttons  ( display a unit card, the item shop or the menu for the second sub faction).
 * When calling the hook, set the properties to true of false to return the button objects.
 *
 * @returns an object containing five fields:
 * - an array of button objects. The objects describe the button separately
 *   from their UI implementation by storing the onClick action,
 *   the text and whether to display that button in the UI. To use the buttons, use a JSX element to
 *   iterate through the objects and assign the properites to any kind of button element.
 * - four functions that close the corresponing menus
 * PLEASE NOTE: Yes, this means the order in which the buttons are rendered is fixed!
 * This is by design to make sure that the most commonly used button is always the first rendered.
 */
const UseRightSideMenuController = (unit, subFaction, bttnSelectorObj) => {
  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);
  const SFC = useContext(SecondSubFactionContext);

  // switch cases
  const UNIT_CARDS = "UNIT_CARDS";
  const ITEMS = "ITEMS";
  const SECOND_SUB_FACTION = "SECOND_SUB_FACTION";
  const OPTION_BUTTONS = "OPTION_BUTTONS";

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
   * Function closes the second sub faction menu. This one is controlled
   * by a simple flag
   */
  const closeOptionButtonMenu = () => {
    RC.setShowOptionButtons({
      clickedUnit: {}, //
      lastclickedUnit: {},
      show: false,
    });
  };

  /**
   * Function contains the button logic. The function has two parts: First, it checks
   * which button is clicked (card, shop or second faction) and initializes two objects:
   * - the state object receives the state of the menu
   * - the state object setter receives the setter function
   *   for the object (useState setter).
   * In the second part the function checks the current state of the menu to
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
        closeOptionButtonMenu();
        break;
      case ITEMS:
        stateObj = RC.itemShopState;
        stateObjSetter = RC.setItemShopState;
        closeCardDisplay();
        closeSecondSubFactionMenu();
        closeOptionButtonMenu();
        break;
      case SECOND_SUB_FACTION: // Thain faction only
        stateObj = RC.secondSubFactionMenuState;
        stateObjSetter = RC.setSecondSubFactionMenuState;
        closeCardDisplay();
        closeItemShop();
        closeOptionButtonMenu();
        break;
      case OPTION_BUTTONS:
        stateObj = RC.showOptionButtons;
        stateObjSetter = RC.setShowOptionButtons;
        closeCardDisplay();
        closeItemShop();
        closeSecondSubFactionMenu();
        break;
      default:
        throw Error("rightMenuController function received an invalid menu parameter: unknown menu name");
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

  // table holds values for buttons
  const buttons = [
    {
      // item shop button
      // added condition never shown for summons - see game rules
      display: testForSummons() && bttnSelectorObj.displayItemShop,
      action: () => {
        IC.setUnitSelectedForShop(unit);
        rightMenuController(unit, ITEMS);
      },
      text: BUTTON_TEXTS.SHOW_ITEM_SHOP,
      icon: <CustomIcon icon={ChestIcon} />,
    },
    {
      // stat card button
      display: bttnSelectorObj.displayCard,
      action: () => {
        rightMenuController(unit, UNIT_CARDS);
      },
      text: BUTTON_TEXTS.PREVIEW_CARD,
      icon: <PaymentIcon />,
    },
    {
      // tribe selection button (only Thain faction)
      // added condition: second sub faction button is never shown for excempt units
      display: displayTribeSelectorButton() && bttnSelectorObj.secondSubFaction,
      action: () => {
        IC.setUnitSelectedForShop(unit);
        rightMenuController(unit, SECOND_SUB_FACTION);
      },
      text: SFC.secondSubfactionCaption,
      icon: null,
    },
    {
      // option buttons
      display: bttnSelectorObj.displayOptionButtons,
      action: () => {
        rightMenuController({}, OPTION_BUTTONS);
      },
      text: BUTTON_TEXTS.OPTIONS,
      icon: null,
    },
  ];

  return {
    buttons: buttons.filter((b) => b.display),
    closeCardDisplay: closeCardDisplay,
    closeItemShop: closeItemShop,
    closeSecondSubFactionMenu: closeSecondSubFactionMenu,
    closeOptionButtonMenu: closeOptionButtonMenu,
  };
};

export default UseRightSideMenuController;
