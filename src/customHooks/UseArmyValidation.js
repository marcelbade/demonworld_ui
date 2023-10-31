// React
import { useContext } from "react";
// components and functions
import { ArmyContext } from "../contexts/armyContext";
import { ruleValidation } from "../gameLogic/armyListValidationRules/ruleValidatorSelector";
// constants
import { ARMIES_ADDITIONAL_SUBFACTIONS, NONE } from "../constants/factions";

const useArmyValidation = () => {
  const AC = useContext(ArmyContext);

  const validateList = (currentList, currentTotalPointAllowance, currentSubFactions, hasAlternativeLists) => {
    const IsFactionSelected = AC.selectedFactionName !== NONE && AC.selectedFactionName !== undefined;
    const isAlternativeListSelected = AC.selectedAlternativeList !== NONE;

    if (
      (IsFactionSelected && hasAlternativeLists && isAlternativeListSelected) || //
      (IsFactionSelected && !hasAlternativeLists)
    ) {
      runValidation(currentList, currentTotalPointAllowance, currentSubFactions);
    }
  };


  //TODO: memoize AC.X properties!
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

  /**
   * Function removes units from the list that can no longer be included according to the rules.
   * @param {[unitCards]} currentList
   * @param {[obj]} currentValidationResult
   */
  const removeInvalidUnits = (currentList, currentValidationResult) => {
    if (currentValidationResult.removeUnitsNoLongerValid.length > 0) {
      let currentState = [...currentList];

      currentState = currentState.filter((u) => !currentValidationResult.removeUnitsNoLongerValid.includes(u));

      AC.setSelectedUnits([...currentState]);
    }
  };

  /**
   * Function returns the result of the validation process for sub factions or units.
   * @param {String} type
   * @param {obj} payload
   * @returns a custom object with the name of the unit or subfaction,
   *          a flag to mark it as unvalid and an error message.
   */
  const returnValidationResult = (type, payload) => {
    switch (type) {
      case "subFaction":
        return scanSubFaction(payload);
      case "unit":
        break;
      default:
        // TODO: please make this better :D
        throw new Error();
    }
  };

  /**
   * Function tests if a subFaction is valid.
   * @param {obj} payload
   * @returns
   */
  const scanSubFaction = (payload) => {
    let validationResult = {};

    AC.listValidationResults.subFactionBelowMinimum.forEach((sF) => {
      if (sF.subFactionUnderMinimum.includes(payload)) {
        validationResult = { subFactionName: payload, valid: false, validationMessage: sF.message };
      } else {
        validationResult = { subFactionName: payload, valid: true, validationMessage: "" };
      }
    });

    return validationResult;
  };


  

  //------------------------------
  const testForSecondSubFaction = () => {
    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(AC.factionName)) {
      isSecondSubFactionsValid();
    }
  };


    /**
   * Function validates that the second subFaction has been selected. Is only called for those armies that require it.
   */
    const isSecondSubFactionsValid = (unit) => {
      AC.listValidationResults.secondSubFactionMissing.forEach((u) => {
        if (u.unitWithOutSecondSubFaction ===  unit.unitName) {
          // setSecondSubFactionCheck({
          //   ...secondSubFactionCheck,
          //   isValid: false,
          //   message: u.message,
          // });
        }
      });
    };


  // TODO: finish this. Make it so the list can only be safed OR printed when correct,or at least give a warning :D
  /**
   * Function checks whether the list is valid.
   * @param {[unitCard]} blockedUnits
   * @returns boolean flag; true if list is invalid (no commander OR 1 or more subfaction below min. )
   */
  const violatesRules = (blockedUnits) => {
    return blockedUnits.subFactionBelowMinimum.length > 0 || blockedUnits.commanderIsPresent === false;
  };

  return {
    validateList: validateList, //
    returnValidationResult: returnValidationResult,
  };
};

export default useArmyValidation;
