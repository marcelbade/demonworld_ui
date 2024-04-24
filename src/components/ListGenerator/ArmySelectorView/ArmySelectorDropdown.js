import React, { useContext, useEffect } from "react";
// components and functions
import SelectionInput from "../../shared/selectionInput";
import { ArmyContext } from "../../../contexts/armyContext";
import { ItemContext } from "../../../contexts/itemContext";
// constants
import {
  ALL_FACTIONS_ARRAY,
  ARMIES_ADDITIONAL_SUBFACTIONS,
  ARMIES_ADDITIONAL_SUBFACTIONS_MAPPING,
  NONE, //
  NO_ALLY,
  SPECIAL,
} from "../../../constants/factions";
import { INPUT_TEXTS } from "../../../constants/textsAndMessages";
import useArmyValidation from "../../../customHooks/UseArmyValidation";
import { ValidationContext } from "../../../contexts/validationContext";
import { RightMenuContext } from "../../../contexts/rightMenuContext";
import { SelectionContext } from "../../../contexts/selectionContext";
import { AlternativeListContext } from "../../../contexts/alternativeListContext";
import { AllyContext } from "../../../contexts/allyContext";
import { SecondSubFactionContext } from "../../../contexts/secondSubFactionContext";

const ArmySelectorDropdown = () => {
  const AC = useContext(ArmyContext);
  const IC = useContext(ItemContext);
  const VC = useContext(ValidationContext);
  const RC = useContext(RightMenuContext);
  const SEC = useContext(SelectionContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SFC = useContext(SecondSubFactionContext);

  const validation = useArmyValidation();

  const handleInput = (value) => {
    setFactionProperties(value);
  };

  /**
   * Function sets the entire state for a faction when it is selected.
   * @param {String} factionName
   */
  const setFactionProperties = (factionName) => {
    const factionObj = AC.fetchedFactions.find((f) => f.factionName === factionName);
    const specials = AC.fetchedFactions.find((f) => f.factionName === SPECIAL);
    const allSubFactions = [...factionObj.subFactions.map((sF) => sF.name)];
    const allFactionUnits = captureAllFactionUnits(factionObj.subFactions, specials.subFactions);

    resetTheState();

    AC.setSubFactionDTOs(factionObj.subFactions);
    AC.setSelectedFactionName(factionObj.factionName);
    AC.setDistinctSubFactions(allSubFactions);
    AC.setListOfAllFactionUnits(allFactionUnits);

    if (factionObj.ally !== NO_ALLY) {
      const allAllySubFactions = [...factionObj.allySubFactions.map((sF) => sF.name)];
      const allAllyUnits = [...factionObj.allySubFactions.map((sF) => sF.name)];

      AYC.setAllyName(factionObj.ally);
      AYC.setAllySubFactionDTOs(factionObj.allySubFactions);
      AYC.setDistinctAllySubFactions(allAllySubFactions);
      AYC.setListOfAlliedUnits(allAllyUnits);
    }

    if (factionObj.hasAlternativeLists) {
      ALC.setArmyHasAlternativeLists(factionObj.hasAlternativeLists);
      ALC.setNumberOfAlternativeChoices(factionObj.numberOfAlternativeArmySelections);
      ALC.setAlternateListNames(factionObj.alternativeOptions.subFactions);
      ALC.setAllyIsAlternativeOption(factionObj.allyIsAlternativeOption);
    }

    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(factionObj.factionName)) {
      const result = ARMIES_ADDITIONAL_SUBFACTIONS_MAPPING.filter((e) => e.army === factionObj.factionName);

      SFC.setHasAdditionalSubFaction(true);

      SFC.setSecondSubfactionCaption(result[0].caption);
      SFC.setExcemptSubFactions(result[0].excemptSubFactions);
      SFC.setSecondSubFactionList(result[0].secondSubFactionList);
    }
  };

  /**
   * Function creates array containing every unit of a faction, plus special units (summons,...)
   * @param {[subFactionDTO]} subFactionObjects
   * @returns array of unitCard objects.
   */
  const captureAllFactionUnits = (subFactionObjects, specials) => {
    let result = [];

    const tempArray = [...subFactionObjects, ...specials];

    tempArray.forEach((sF) => {
      sF.units.forEach((u) => {
        result.push(u);
      });
    });

    return result;
  };

  /**
   * Function resets the entire state back to default.
   */
  const resetTheState = () => {
    SEC.setSelectedUnits([]);
    IC.setAllEquippedItems([]);
    ALC.setSelectedAlternativeLists([]);
    ALC.setAlternateListNames([]);
    ALC.setArmyHasAlternativeLists(false);
    ALC.setAltArmyListSelectionComplete(false);
    SFC.setHasAdditionalSubFaction(false);

    VC.setListValidationResults({
      ...VC.listValidationResults,
      unitsBlockedbyRules: [],
      subFactionBelowMinimum: [],
      commanderIsPresent: false,
      removeUnitsNoLongerValid: [],
      secondSubFactionMissing: [],
      alliedUnitsBlockedbyRules: [],
    });

    RC.closeCardDisplay();
    RC.closeItemShop();
    RC.closeSecondSubFactionMenu();
  };

  const clearFactionName = () => {
    return currentFactionList();
  };

  const setFactionList = () => {
    const resultingList =
      AC.selectedFactionName !== NONE //
        ? currentFactionList()
        : ALL_FACTIONS_ARRAY;

    return resultingList;
  };

  const currentFactionList = () => {
    return ALL_FACTIONS_ARRAY.filter((f) => f !== AC.selectedFactionName);
  };

  useEffect(() => {
    validation.validateList([], SEC.maxPointsAllowance);
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SelectionInput //
      filterFunction={handleInput}
      clearFunction={clearFactionName}
      alternatives={setFactionList()}
      label={INPUT_TEXTS.SELECT_FACTION}
    />
  );
};

export default ArmySelectorDropdown;
