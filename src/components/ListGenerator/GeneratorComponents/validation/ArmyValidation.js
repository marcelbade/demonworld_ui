// React
import { useContext } from "react";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { ruleValidation } from "../../../../gameLogic/armyListValidationRules/ruleValidatorSelector";
// constants
import { ARMIES_WITH_ALTERNATIVE_LISTS, NONE } from "../../../../constants/factions";

const useArmyValidation = () => {
  const AC = useContext(ArmyContext);

  const validateList = (currentList, currentTotalPointAllowance, currentSubFactions) => {
    const hasAlternativeLists = ARMIES_WITH_ALTERNATIVE_LISTS[AC.selectedFactionName];
    const IsFactionSelected = AC.selectedFactionName !== NONE && AC.selectedFactionName !== undefined;
    const isAlternativeListSelected = AC.selectedAlternativeList !== NONE;

    if (IsFactionSelected && hasAlternativeLists && isAlternativeListSelected) {
      runValidation(currentList, currentTotalPointAllowance, currentSubFactions);
    } else if (IsFactionSelected && !hasAlternativeLists) {
      runValidation(currentList, currentTotalPointAllowance, currentSubFactions);
    }
  };

  const runValidation = (currentList, currentTotalPointAllowance, currentSubFactions) => {
    let validator = ruleValidation(AC.selectedFactionName);
    let validationResult = validator.testSubFactionRules(
      AC.listOfAllFactionUnits,
      currentList,
      currentTotalPointAllowance,
      currentSubFactions,
      AC.selectedAlternativeList,
      AC.tournamentOverrideRules,
      AC.listOfAlliedUnits
    );

    collectValidatioResults(currentList, validationResult);
  };

  /**
   * Function adds all invalid units and subfactions to the block list.
   * @param {{}} validationResult
   */
  const collectValidatioResults = (currentList, validationResult) => {
    const currentValidationResult = {
      ...AC.listValidationResults,
      unitsBlockedbyRules: validationResult.unitsBlockedbyRules,
      subFactionBelowMinimum: validationResult.subFactionBelowMinimum,
      commanderIsPresent: validationResult.commanderIsPresent,
      removeUnitsNoLongerValid: validationResult.removeUnitsNoLongerValid,
      secondSubFactionMissing: validationResult.secondSubFactionMissing,
      alliedUnitsBlockedbyRules: validationResult.alliedUnitsBlockedbyRules,
    };

    AC.setListValidationResults(currentValidationResult);
    removeInvalidUnits(currentList, currentValidationResult);
  };

  const removeInvalidUnits = (currentList, currentValidationResult) => {
    if (currentValidationResult.removeUnitsNoLongerValid.length > 0) {
      let currentState = [...currentList];

      currentState = currentState.filter((u) => !currentValidationResult.removeUnitsNoLongerValid.includes(u));

      AC.setSelectedUnits([...currentState]);
    }
  };

  const returnValidationResult = (type, payload) => {
    switch (type) {
      case "subFaction":
        let tempObj = { subFactionName: payload, valid: true, validationMessage: "" };

        AC.listValidationResults.subFactionBelowMinimum.forEach((sF) => {
          if (sF.subFactionUnderMinimum.includes(payload)) {
            tempObj = { subFactionName: payload, valid: false, validationMessage: sF.message };
          }
        });
        return tempObj;
      case "unit":
        break;
      default:
        throw new Error();
    }
  };

  // // TODO: unnecessary?!
  // // enable buttons if list is valid
  // useEffect(() => {
  //   AC.selectedUnits.length === 0 || violatesRules(AC.listValidationResults)
  //     ? AC.setDisableOptionsButtons(true)
  //     : AC.setDisableOptionsButtons(false);
  // }, [AC.selectedUnits, AC.listValidationResults]); // eslint-disable-line react-hooks/exhaustive-deps

  // // TODO: unnecessary?!
  // /**
  //  * Function checks whether the list is valid.
  //  * @param {[unitCard]} blockedUnits
  //  * @returns boolean flag; true if list is invalid (no commander OR 1 or more subfaction below min. )
  //  */
  // const violatesRules = (blockedUnits) => {
  //   return blockedUnits.subFactionBelowMinimum.length > 0 || blockedUnits.commanderIsPresent === false;
  // };

  return {
    validateList: validateList, //
    returnValidationResult: returnValidationResult,
  };
};

export default useArmyValidation;
