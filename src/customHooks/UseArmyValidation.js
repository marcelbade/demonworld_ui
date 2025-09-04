// React
import { useContext } from "react";
// components and functions
import { ArmyContext } from "../contexts/armyContext";
import { TournamentRulesContext } from "../contexts/tournamentRulesContext";
import { SelectionContext } from "../contexts/selectionContext";
import { AllyContext } from "../contexts/allyContext";
import { AlternativeListContext } from "../contexts/alternativeListContext";
import { ruleValidation } from "../gameLogic/armyListValidationRules/ruleValidatorSelector";
// constants
import { NONE } from "../constants/factions";

const useArmyValidation = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SEC = useContext(SelectionContext);
  const TC = useContext(TournamentRulesContext);

  /**
   * Function checks whether the user finished selecting their faction. It tets
   * - if the faction was selected
   * - if the faction has alternative army list options and if one has been selected
   * If this is not the case, runValidation is not called and the function ends.
   * @param {[unitCard]} currentList
   * @param {int} currentTotalPointAllowance
   * @returns a function call: runValidation()
   */
  const testArmySelectionAndRunValidation = (currentList, currentTotalPointAllowance) => {
    const IsFactionSelected =
      AC.selectedFactionName !== NONE && //
      AC.selectedFactionName !== undefined;

    const areNoAlternativesSelected = ALC.selectedAlternativeLists.length === 0;

    if (!IsFactionSelected || (ALC.armyHasAlternativeLists && areNoAlternativesSelected)) {
      return;
    }

    return runValidation(currentList, currentTotalPointAllowance, AC.subFactions);
  };

  /**
   * Function validates the current list by generating the correct 
   * validator for the selected faction and calling the validator's
   * test functions to validate the list. 
   * The results are passed to a function.
   * @param {[unitCard]} currentList
   * @param {number} currentTotalPointAllowance
   * @param {[String]} currentSubFactions
   * @returns a function call: collectValidatioResults()

   */
  //TODO currentSubFactions === distinct subFactions
  const runValidation = (currentList, currentTotalPointAllowance, currentSubFactions) => {
    let validator = ruleValidation(AC.selectedFactionName);

    let validationResult = validator.testSubFactionRules({
      // all available units  === faction + ally 
      availableUnits: [...AC.listOfAllFactionUnits, ...AYC.listOfAlliedUnits],
      selectedUnits: currentList,
      totalPointsAllowance: currentTotalPointAllowance,
      subFactions: currentSubFactions,
      selectedAlternativeLists: ALC.selectedAlternativeLists,
      tournamentOverrideRules: TC.tournamentOverrideRules,
      listOfAlliedUnits: AYC.listOfAlliedUnits,
    });

    return collectValidationResults(currentList, validationResult);
  };

  /**
   * Function collects the results of the army list validation and collects
   * it in a dto. it passes the object to the another function and returns it.
   * @param {[unitCard]} currentList
   * @param {dto} result
   * @returns a dto with the validation results.
   */
  const collectValidationResults = (currentList, result) => {
    const validationObj = {
      unitsBlockedbyRules: result.unitsBlockedbyRules,
      subFactionBelowMinimum: result.subFactionBelowMinimum,
      removeUnitsNoLongerValid: result.removeUnitsNoLongerValid,
      secondSubFactionMissing: result.secondSubFactionMissing,
      alliedUnitsBlockedbyRules: result.alliedUnitsBlockedbyRules,
      commanderIsPresent: result.commanderIsPresent,
    };

    removeInvalidUnits(currentList, validationObj);

    return validationObj;
  };

  /**
   * Function removes units from the list that can no longer be included according to the rules.
   * @param {[unitCards]} unitList
   * @param {[obj]} validationResult
   */
  const removeInvalidUnits = (unitList, validationResult) => {
    if (validationResult.removeUnitsNoLongerValid.length === 0) {
      return;
    }

    let tempArray = [...unitList];
    tempArray = tempArray.filter((u) => !validationResult.removeUnitsNoLongerValid.includes(u.uniqueID));
    SEC.setSelectedUnits([...tempArray]);
  };

  /**
   * Function takes the validation result, tests if it contains the passed sub faction
   * and if found, creates an object with the sub faction and the error message.
   * @param {unitCard} unit
   * @param {boolean} factionOrAlly
   * @param {obj} validationResult
   * @returns object containing the unit a flag and the error message if it is invalid.
   */
  const createSubFactionResultObject = (subFactionName, results) => {
    let subFactionObjet = { subFactionName: subFactionName, valid: true, validationMessage: "" };

    results.subFactionBelowMinimum.forEach((sF) => {
      if (sF.subFactionUnderMinimum.includes(subFactionName)) {
        subFactionObjet = { subFactionName: subFactionName, valid: false, validationMessage: sF.message };
      }
    });

    return subFactionObjet;
  };

  /**
   * Function creates an object that contains the unit, a flag that shows
   * whether the unit is valid and can therefore be selected and an error message.
   * The validation result is passed as a parameter, and if it contains the unit,
   * the flag is set to false and an error message added. Otherwise, the flag reimains
   * false and the message is set to an empty string.
   * @param {unitCard} unit
   * @param {boolean} factionOrAlly
   * @param {obj} validationResult
   * @returns object containing the unit, a flag, and the error message.
   */
  const createValidationUnitObject = (unit, validationResult) => {
    // create object, default: valid unit
    let unitObject = { unit: unit, valid: true, validationMessage: "" };

    if (validationResult === undefined) {
      return unitObject;
    }

    // gather validation results.
    const factionBlockList = validationResult.unitsBlockedbyRules;
    const alliedBlockList = validationResult.alliedUnitsBlockedbyRules;
    const blockedUnits = [...factionBlockList, ...alliedBlockList];

    // test if unit is valid
    blockedUnits.forEach((bU) => {
      if (bU.unitBlockedbyRules === unit.unitName) {
        unitObject = {
          unit: unit, //
          valid: false,
          validationMessage: bU.message,
        };
      }
    });

    return unitObject;
  };

  /**
   * Function takes the validation result, tests if it contains the passed second
   * sub faction and if it is not found, creates an object with the unit and the error message.
   * @param {unitCard} unit
   * @param {boolean} factionOrAlly
   * @param {obj} validationResult
   * @returns object containing:
   * - unit: the unit
   * - valid: true, if the unit passed validation
   * - validationMessage: the error message if the validation failed
   */
  const createSecondSubFactionObject = (unit, validationResult) => {
    let secondSubFactionObj = { unit: unit, valid: true, validationMessage: "" };

    const missingSecondSubFaction = validationResult.secondSubFactionMissing;

    missingSecondSubFaction.forEach((mS) => {
      if (mS.unitWithOutSecondSubFaction === unit.unitName) {
        secondSubFactionObj = { unit: unit, valid: false, validationMessage: mS.message };
      }
    });

    return secondSubFactionObj;
  };

  /**
   * Function tests whether all units in a branch are invalid.
   * If true, the flag "hasNoValidUnits" is set to true for the
   * subFactionDTO. The test is fdone twice: for the faction and the ally.
   * @param {[dto]} invalidUnits
   */
  const testForDisabledSubFaction = (invalidUnits) => {
    let tempObj = [];

    // test faction
    tempObj = structuredClone(AC.subFactionDTOs);
    checkIfAllUnitsAreInvalid(tempObj, invalidUnits);
    AC.setSubFactionDTOs([...tempObj]);

    //  test ally
    tempObj = [...AYC.allySubFactionDTOs];
    checkIfAllUnitsAreInvalid(tempObj, invalidUnits);
    AYC.setAllySubFactionDTOs([...tempObj]);
  };

  /**
   * Function iterates through an array of subFaction dtos and tests
   * whether all units in an object are invalid. If so, the
   * hasNoValidUnits is set to true.
   * @param {[dto]} subFactionDTOList
   * @param {[dto]} invalidUnits
   * @returns the list of (allied) subfactions with the hasNoValidUnits flag reset.
   */
  const checkIfAllUnitsAreInvalid = (subFactionDTOList, invalidUnits) => {
    subFactionDTOList.forEach((subFaction) => {
      const subFactionUnitNames = subFaction.units.map((u) => u.unitName);
      const invalidUnitNames = invalidUnits.map((iu) => iu.unitBlockedbyRules);

      const allInvalid = subFactionUnitNames.every((unit) => invalidUnitNames.includes(unit));

      subFaction.hasNoValidUnits = allInvalid;
    });

    return subFactionDTOList;
  };

  return {
    testArmySelectionAndRunValidation: testArmySelectionAndRunValidation, //
    createSubFactionResultObject: createSubFactionResultObject,
    createSecondSubFactionObject: createSecondSubFactionObject,
    createValidationUnitObject: createValidationUnitObject,
    testForDisabledSubFaction: testForDisabledSubFaction,
  };
};

export default useArmyValidation;
