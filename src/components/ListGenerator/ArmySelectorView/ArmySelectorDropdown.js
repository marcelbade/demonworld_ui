import React, { useContext, useEffect } from "react";
// components and functions
import SelectionInput from "../../shared/selectionInput";
import useUnitEnricher from "../../../customHooks/UseUnitEnricher";
import { ArmyContext } from "../../../contexts/armyContext";
import { ItemContext } from "../../../contexts/itemContext";
import useArmyValidation from "../../../customHooks/UseArmyValidation";
// context
import { RightMenuContext } from "../../../contexts/rightMenuContext";
import { SelectionContext } from "../../../contexts/selectionContext";
import { AlternativeListContext } from "../../../contexts/alternativeListContext";
import { AllyContext } from "../../../contexts/allyContext";
import { SecondSubFactionContext } from "../../../contexts/secondSubFactionContext";
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

const ArmySelectorDropdown = () => {
  const AC = useContext(ArmyContext);
  const IC = useContext(ItemContext);
  const RC = useContext(RightMenuContext);
  const SEC = useContext(SelectionContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SFC = useContext(SecondSubFactionContext);

  const validation = useArmyValidation();
  const enrichUnit = useUnitEnricher();

  useEffect(() => {
    validation.validateList([], SEC.maxPointsAllowance);
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = (value) => {
    resetTheState();
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

    AC.setSubFactionDTOs(factionObj.subFactions);
    AC.setSelectedFactionName(factionObj.factionName);
    AC.setDistinctSubFactions(allSubFactions);
    AC.setListOfAllFactionUnits(allFactionUnits);

    if (factionObj.ally !== NO_ALLY) {
      const allAllySubFactions = [...factionObj.allySubFactions.map((sF) => sF.name)];
      const allAllyUnits = captureAllFactionUnits(factionObj.allySubFactions, []);

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
   * Function creates an array containing all units for either the faction or the ally.
   * For the faction, special units are added that are needed for the special item logic.
   * No boolean is necessary. For the ally, the specials array is simply empty.
   * @param {*} subFactionObjects
   * @returns an array containing every unitCard object for the faction or its ally.
   */
  const captureAllFactionUnits = (subFactionObjects, specials) => {
    let result = [];

    const tempArray = [...subFactionObjects, ...specials];

    tempArray.forEach((sF) => {
      sF.units.forEach((u) => {
        result.push(enrichUnit(u));
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
    AYC.setAllyName(NO_ALLY);

    RC.closeCardDisplay();
    RC.closeItemShop();
    RC.closeSecondSubFactionMenu();
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
      filterFunction={handleInput}
      clearFunction={clearFactionName}
      alternatives={setFactionList()}
      label={INPUT_TEXTS.SELECT_FACTION}
    />
  );
};

export default ArmySelectorDropdown;
