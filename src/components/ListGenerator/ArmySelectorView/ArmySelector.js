import React, { useContext, useEffect } from "react";
// components and functions
import SelectionInput from "../../shared/selectionInput";
import { ArmyContext } from "../../../contexts/armyContext";
import { ItemContext } from "../../../contexts/itemContext";
// constants
import {
  ALL_FACTIONS_ARRAY,
  ARMIES_ADDITIONAL_SUBFACTIONS,
  ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION, //
  NONE,
  NO_ALLY,
} from "../../../constants/factions";
import { INPUT_TEXTS } from "../../../constants/textsAndMessages";
import useArmyValidation from "../../../customHooks/UseArmyValidation";
import { ValidationContext } from "../../../contexts/validationContext";
import { RightMenuContext } from "../../../contexts/rightMenuContext";
import { SelectionContext } from "../../../contexts/selectionContext";
import { AlternativeListContext } from "../../../contexts/alternativeListContext";
import { AllyContext } from "../../../contexts/allyContext";
import { SecondSubFactionContext } from "../../../contexts/secondSubFactionContext";

const ArmySelector = () => {
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
      AYC.setAllyName(factionObj.ally);
      AYC.setListOfAlliedUnits(factionObj.allyUnits);
      AYC.setDistinctAllySubFactions(factionObj.allySubFactions);
    }

    if (factionObj.hasAlternativeLists) {
      ALC.setArmyHasAlternativeLists(factionObj.hasAlternativeLists);
      ALC.setNumberOfAlternativeChoices(factionObj.numberOfAlternativeArmySelections);
    }

    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(factionObj.factionName)) {
      const result = ARMIES_ADDITIONAL_SUBFACTIONS_BUTTON_CAPTION.filter((e) => e.army === factionObj.factionName);

      SFC.setHasAdditionalSubFaction(true);
      SFC.setSecondSubfactionCaption(result[0].caption);
      SFC.setExcemptSubFactions(result[0].excemptSubFactions);
      SFC.setSecondSubFactionList(result[0].secondSubFactionList);
    } else {
      SFC.setHasAdditionalSubFaction(false);
    }
  };

  /**
   * Function resets the entire state back to default.
   */
  const resetTheState = () => {
    SEC.setSelectedUnits([]);
    IC.setAllEquippedItems([]);
    AYC.setAllyName(NO_ALLY);
    AYC.setListOfAlliedUnits([]);
    AYC.setDistinctAllySubFactions([]);
    ALC.setSelectedAlternativeList(NONE);
    ALC.setAlternateListSubFactions([]);
    ALC.setArmyHasAlternativeLists(false);
    ALC.setAltArmyListSelectionComplete(false);

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

  useEffect(() => {
    validation.validateList(
      [], //
      SEC.maxPointsAllowance,
      AC.subFactions,
      ALC.armyHasAlternativeLists
    );
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

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
