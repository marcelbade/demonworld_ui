// React
import { useContext } from "react";
// components and functions
import { ArmyContext } from "../contexts/armyContext";
import { TournamentRulesContext } from "../contexts/tournamentRulesContext";
import { ValidationContext } from "../contexts/validationContext";
import { SelectionContext } from "../contexts/selectionContext";
import { AllyContext } from "../contexts/allyContext";
import { AlternativeListContext } from "../contexts/alternativeListContext";
import { ruleValidation } from "../gameLogic/armyListValidationRules/ruleValidatorSelector";
// constants
import { NONE } from "../constants/factions";

const useArmyValidation = () => {
  const AC = useContext(ArmyContext);
  const TC = useContext(TournamentRulesContext);
  const VC = useContext(ValidationContext);
  const SEC = useContext(SelectionContext);
  const AYC = useContext(AllyContext);
  const ALC = useContext(AlternativeListContext);

  const validateList = (currentList, currentTotalPointAllowance) => {
    const IsFactionSelected = AC.selectedFactionName !== NONE && AC.selectedFactionName !== undefined;
    const isAlternativeListSelected = ALC.selectedAlternativeLists.length !== 0;

    if (
      (IsFactionSelected && ALC.armyHasAlternativeLists && isAlternativeListSelected) || //
      (IsFactionSelected && !ALC.armyHasAlternativeLists)
    ) {
      runValidation(currentList, currentTotalPointAllowance, AC.subFactions);
    }
  };

  /**
   * Function avalidates the current list by generating the correct validator for the faction,
   * calling the validators test function and finally collecting the results.
   * @param {[unitCard]} currentList
   * @param {number} currentTotalPointAllowance
   * @param {[String]} currentSubFactions
   */
  const runValidation = (currentList, currentTotalPointAllowance, currentSubFactions) => {
    let validator = ruleValidation(AC.selectedFactionName);

    let validationResult = validator.testSubFactionRules({
      availableUnits: AC.listOfAllFactionUnits,
      selectedUnits: currentList,
      totalPointsAllowance: currentTotalPointAllowance,
      subFactions: currentSubFactions,
      selectedAlternativeLists: ALC.selectedAlternativeLists,
      tournamentOverrideRules: TC.tournamentOverrideRules,
      listOfAlliedUnits: AYC.listOfAlliedUnits,
    });

    collectValidatioResults(currentList, validationResult);
  };

  /**
   * Function adds all invalid units and subfactions to the block list. This result is stored twice.
   * Locally, for immediate usasge and in the global state field validationResults.
   * @param {[unitCard]} currentList
   * @param {[unitCard]} result
   */
  const collectValidatioResults = (currentList, result) => {
    const tempArray = {
      ...VC.listValidationResults,
      unitsBlockedbyRules: result.unitsBlockedbyRules,
      subFactionBelowMinimum: result.subFactionBelowMinimum,
      commanderIsPresent: result.commanderIsPresent,
      removeUnitsNoLongerValid: result.removeUnitsNoLongerValid,
      secondSubFactionMissing: result.secondSubFactionMissing,
      alliedUnitsBlockedbyRules: result.alliedUnitsBlockedbyRules,
    };

    VC.setListValidationResults(tempArray);
    removeInvalidUnits(currentList, tempArray);
  };

  /**
   * Function removes units from the list that can no longer be included according to the rules.
   * @param {[unitCards]} unitList
   * @param {[obj]} validationResult
   */
  const removeInvalidUnits = (unitList, validationResult) => {
    if (validationResult.removeUnitsNoLongerValid.length > 0) {
      let tempArray = [...unitList];

      tempArray = tempArray.filter((u) => !validationResult.removeUnitsNoLongerValid.includes(u));

      SEC.setSelectedUnits([...tempArray]);
    }
  };

  /**
   * Function returns the result of the validation process for sub factions or units.
   * @param {String} type
   * @param {obj} payload can be subFaction name or unitCard object.
   * @returns a custom object with the name of the unit or subfaction,
   *          a flag to mark it as unvalid and an error message.
   */
  // TODO: turn the tree parameter into an obkect called data with  {type, payload, isFaction}
  const returnValidationResult = (type, payload, factionOrAlly) => {
    switch (type) {
      case "subFaction":
        return testSubFaction(payload);
      case "unit":
        return testUnit(payload, factionOrAlly);
      default:
        throw new Error("returnValidationResult() received an invalid type parameter");
    }
  };

  /**
   * Function tests if a subFaction is valid.
   * @param {obj} subFactionName
   * @returns validation result object.
   */
  const testSubFaction = (subFactionName) => {
    let validationResult = { subFactionName: subFactionName, valid: true, validationMessage: "" };

    VC.listValidationResults.subFactionBelowMinimum.forEach((sF) => {
      if (sF.subFactionUnderMinimum.includes(subFactionName)) {
        validationResult = { subFactionName: subFactionName, valid: false, validationMessage: sF.message };
      }
    });

    return validationResult;
  };

  /**
   * Function tests if a unit is valid.
   * @param {obj} payload
   * @returns validation result object.
   */
  const testUnit = (payload, factionOrAlly) => {
    let validationResult = { unit: payload, valid: true, validationMessage: "" };

    const factionBlockList = VC.listValidationResults.unitsBlockedbyRules;
    const alliedBlockList = VC.listValidationResults.alliedUnitsBlockedbyRules;

    const blockedUnits = factionOrAlly ? factionBlockList : alliedBlockList;

    blockedUnits.forEach((bU) => {
      if (bU.unitBlockedbyRules === payload.unitName) {
        validationResult = { unit: payload, valid: false, validationMessage: bU.message };
      }
    });

    return validationResult;
  };

  return {
    validateList: validateList, //
    returnValidationResult: returnValidationResult,
  };
};

export default useArmyValidation;
