import React, { useContext, useEffect } from "react";
// components and functions
import SelectionInput from "../../shared/selectionInput";
import { ArmyContext } from "../../../contexts/armyContext";
// constants
import {
  ALL_FACTIONS_ARRAY, //
  ALTERNATIVE_ARMY_SELECTION_TEXT,
  ARMY_ALTERNATIVES_LIST_MAPPER,
  NONE,
  NO_ALLY,
} from "../../../constants/factions";
import { INPUT_TEXTS } from "../../../constants/textsAndMessages";
import useArmyValidation from "../../../customHooks/UseArmyValidation";

const ArmySelector = () => {
  const AC = useContext(ArmyContext);
  const validation = useArmyValidation();

  const handleInput = (value) => {
    setFactionProperties(value);
  };

  /**
   * Function sets all properties of a faction when it is selected.
   * @param {String} factionName
   */
  const setFactionProperties = (factionName) => {
    const factionObj = AC.fetchedFactions.filter((f) => f.factionName === factionName)[0];

    resetTheState();

    AC.setSelectedFactionName(factionObj.factionName);
    AC.setListOfAllFactionUnits(factionObj.units);
    AC.setDistinctSubFactions(factionObj.subFactions);

    if (factionObj.ally) {
      AC.setAllyName(factionObj.ally);
      AC.setListOfAlliedUnits(factionObj.allyUnits);
      AC.setDistinctAllySubFactions(factionObj.allySubFactions);
    }

    if (factionObj.hasAlternativeLists) {
      AC.setArmyHasAlternativeLists(factionObj.hasAlternativeLists);
      AC.setNumberOfAlternativeChoices(factionObj.numberOfAlternativeArmySelections);
      AC.setAlternateArmyListOptions(ARMY_ALTERNATIVES_LIST_MAPPER[factionName]);
      AC.setAlternateArmyListLabelText(ALTERNATIVE_ARMY_SELECTION_TEXT[factionName]);
    }
  };

  /**
   * Function resets the entire state back to default.
   */
  const resetTheState = () => {
    AC.setSelectedUnits([]);
    AC.setAllEquippedItems([]);
    AC.setAllyName(NO_ALLY);
    AC.setListOfAlliedUnits([]);
    AC.setDistinctAllySubFactions([]);

    AC.setSelectedAlternativeList(NONE);
    AC.setSecondSelectedAlternativeList(NONE);
    AC.setAlternateListSubFactions([]);
    AC.setArmyHasAlternativeLists(false);
    AC.setAltArmyListSelectionComplete(false);

    AC.setListValidationResults({
      ...AC.listValidationResults,
      unitsBlockedbyRules: [],
      subFactionBelowMinimum: [],
      commanderIsPresent: false,
      removeUnitsNoLongerValid: [],
      secondSubFactionMissing: [],
      alliedUnitsBlockedbyRules: [],
    });
    AC.closeCardDisplay();
    AC.closeItemShop();
    AC.closeSecondSubFactionMenu();
  };

  useEffect(() => {
    validation.validateList([], AC.maxPointsAllowance, AC.subFactions, AC.armyHasAlternativeLists);
  }, [AC.selectedFactionName]);

  return (
    <SelectionInput //
      filterFunction={handleInput}
      isArmySelector={true}
      options={ALL_FACTIONS_ARRAY}
      label={INPUT_TEXTS.SELECT_FACTION}
    />
  );
};

export default ArmySelector;
