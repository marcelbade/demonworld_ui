// React
import { useEffect, useContext } from "react";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { ruleValidation } from "../../../../gameLogic/armyListValidationRules/ruleValidatorSelector";
// constants
import { ARMIES_WITH_ALTERNATIVE_LISTS, NONE } from "../../../../constants/factions";

const ArmyValidation = () => {
  const AC = useContext(ArmyContext);

  /**
   * Function validates the current army list everytime a unit is added, removed, subFactions, the selected alternative army list or the max point allowance changes.
   * Validation works through a validator object. The object returns an array containing all units
   * which need to be blocked, as well as a message stating the reason for blocking it.
   */
  useEffect(() => {
    const hasAlternativeLists = ARMIES_WITH_ALTERNATIVE_LISTS[AC.selectedFactionName];
    const IsFactionSelected = AC.selectedFactionName !== NONE;
    const isAlternativeListSelected = AC.selectedAlternativeList !== NONE;

    if (IsFactionSelected && hasAlternativeLists && isAlternativeListSelected) {

      console.log("A");
    

      runValidation();
    } else if (IsFactionSelected && !hasAlternativeLists) {

      console.log("B");

      runValidation();
    }
  }, [AC.selectedUnits, AC.maxPointsAllowance, AC.selectedAlternativeList, AC.subFactions]); // eslint-disable-line react-hooks/exhaustive-deps

  const runValidation = () => {
    let validator = ruleValidation(AC.selectedFactionName);
    let validationResult = validator.testSubFactionRules(
      AC.listOfAllFactionUnits,
      AC.selectedUnits,
      AC.maxPointsAllowance,
      AC.subFactions,
      AC.selectedAlternativeList,
      AC.tournamentOverrideRules
    );

    collectValidatioResults(validationResult);
  };

  /**
   * Function adds all invalid units and subfactions to the block list.
   * @param {{}} validationResults
   */
  const collectValidatioResults = (validationResults) => {
    AC.setListValidationResults({
      ...AC.listValidationResults,
      unitsBlockedbyRules: validationResults.unitsBlockedbyRules,
      subFactionBelowMinimum: validationResults.subFactionBelowMinimum,
      commanderIsPresent: validationResults.commanderIsPresent,
      removeUnitsNoLongerValid: validationResults.removeUnitsNoLongerValid,
      secondSubFactionMissing: validationResults.secondSubFactionMissing,
    });
  };

  



  // Automatically remove units from the army list if the list no longer meets the ciriteria that have to be met to permit those units to be picked.
  useEffect(() => {
    if (AC.listValidationResults.removeUnitsNoLongerValid.length > 0) {
      let currentState = [...AC.selectedUnits];

      currentState = currentState.filter((u) => !AC.listValidationResults.removeUnitsNoLongerValid.includes(u));

      AC.setSelectedUnits([...currentState]);
    }
  }, [AC.listValidationResults]); // eslint-disable-line react-hooks/exhaustive-deps

  // enable buttons if list is valid
  useEffect(() => {
    AC.selectedUnits.length === 0 || violatesRules(AC.listValidationResults)
      ? AC.setDisableOptionsButtons(true)
      : AC.setDisableOptionsButtons(false);
  }, [AC.selectedUnits, AC.listValidationResults]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function checks whether the list is valid.
   * @param {[unitCard]} blockedUnits
   * @returns boolean flag; true if list is invalid (no commander OR 1 or more subfaction below min. )
   */
  const violatesRules = (blockedUnits) => {
    return blockedUnits.subFactionBelowMinimum.length > 0 || blockedUnits.commanderIsPresent === false;
  };

  // this component returns no jsx - it is simply meant to help code readability by factoring out all logic for army validation from the ListGeneratorController component.
  return null;
};

export default ArmyValidation;
