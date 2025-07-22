// react
import { useContext, useEffect } from "react";
// components and functions
import SelectionInput from "../../shared/selectionInput";
import { ArmyContext } from "../../../contexts/armyContext";
import { ItemContext } from "../../../contexts/itemContext";
//  custom hooks
import useArmyValidation from "../../../customHooks/UseArmyValidation";
import useRightSideMenuController from "../../../customHooks/useRightSideMenuController";
import UseArmyStateLoader from "../../../customHooks/UseArmyStateLoader";
// context
import { RightMenuContext } from "../../../contexts/rightMenuContext";
import { SelectionContext } from "../../../contexts/selectionContext";
import { AlternativeListContext } from "../../../contexts/alternativeListContext";
import { AllyContext } from "../../../contexts/allyContext";
import { SecondSubFactionContext } from "../../../contexts/secondSubFactionContext";
// constants
import {
  ALL_FACTIONS_ARRAY,
  NONE, //
  NO_ALLY,
} from "../../../constants/factions";
import { INPUT_TEXTS } from "../../../constants/textsAndMessages";

const ArmySelectorDropdown = () => {
  const AC = useContext(ArmyContext);
  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);
  const SEC = useContext(SelectionContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SFC = useContext(SecondSubFactionContext);

  const validation = useArmyValidation();
  const stateLoader = UseArmyStateLoader();

  // Initialize the menu on the right side w/o any unit selected
  const sideMenuController = useRightSideMenuController({}, "", {});
  // const enrichUnit = useUnitEnricher();

  useEffect(() => {
    const altListFinished = ALC.armyHasAlternativeLists //
      ? ALC.altArmyListSelectionComplete
      : true;

    if (AC.selectedFactionName !== NONE && altListFinished) {
      // pass emtpy array since all units are removed from the list
      const validationResult = validation.testArmySelectionAndRunValidation([], SEC.maxPointsAllowance);

      validation.testForDisabledSubFaction([
        ...validationResult.unitsBlockedbyRules, //
        ...validationResult.alliedUnitsBlockedbyRules,
      ]);
    }
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function triggers when user enters a value from the dropdown list.
   * The Function simply wraps three function. The last one sets the flag for
   * the right side menu to true so it opens slowly.
   * @param {String} value
   */
  const handleInput = (value) => {
    resetTheState();
    stateLoader.setFactionProperties(value);
    RC.setShowOptionButtons(true);

    // army is not fetched from DB
    AC.setIsFetchedArmyList(false);
  };

  /**
   * Function resets the entire state back to default and closes all menus.
   */
  const resetTheState = () => {
    SEC.setSelectedUnits([]);
    IC.setAllEquippedItems([]);
    ALC.setSelectedAlternativeLists([]);
    ALC.setAlternateListNames([]);
    ALC.setArmyHasAlternativeLists(false);
    ALC.setAltArmyListSelectionComplete(false);
    SFC.setHasAdditionalSubFaction(false);
    AYC.setAllyName(NO_ALLY);

    sideMenuController.closeCardDisplay();
    sideMenuController.closeItemShop();
    sideMenuController.closeSecondSubFactionMenu();
  };

  /**
   * Function creates the list of options displayed im the drop down list whenever the
   * selected value is cleared.
   * @returns  a filtered array of faction names.
   */
  const clearFactionName = () => {
    return currentFactionList();
  };

  /**
   * Function creates the list of factions that is displayed in the drop down list.
   * @returns an array of factionnames
   */
  const setFactionList = () => {
    const resultingList =
      AC.selectedFactionName !== NONE //
        ? currentFactionList()
        : ALL_FACTIONS_ARRAY;

    return resultingList;
  };

  /**
   * Function returns all factions in the game minus the currently selected one.
   * @returns a filtered array of faction names.
   */
  const currentFactionList = () => {
    return ALL_FACTIONS_ARRAY.filter((f) => f !== AC.selectedFactionName);
  };

  return (
    <SelectionInput //
      isArmySelector={true}
      filterFunction={handleInput}
      clearFunction={clearFactionName}
      alternatives={setFactionList()}
      label={INPUT_TEXTS.SELECT_FACTION}
    />
  );
};

export default ArmySelectorDropdown;
