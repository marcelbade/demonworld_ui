// React
import { useContext } from "react";
// components and functions
import { ArmyContext } from "../contexts/armyContext";
import { TournamentRulesContext } from "../contexts/tournamentRulesContext";
// import { ValidationContext } from "../contexts/validationContext";
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
   * Function checks whether the user finished selecting their faction
   * before the validation logic is called.
   * @param {[unitCard]} currentList
   * @param {int} currentTotalPointAllowance
   * @returns a function call: runValidation()
   */
  const validateList = (currentList, currentTotalPointAllowance) => {
    const IsFactionSelected = AC.selectedFactionName !== NONE && AC.selectedFactionName !== undefined;
    const areNoAlternativesSelected = ALC.selectedAlternativeLists.length === 0;

    if (!IsFactionSelected || (ALC.armyHasAlternativeLists && areNoAlternativesSelected)) {
      return;
    }
    return runValidation(currentList, currentTotalPointAllowance, AC.subFactions);
  };

  /**
   * Function validates the current list by generating the correct 
   * validator for the faction and calling the validators
   * test function to validate the list. 
   * The results are passed to a function.
   * @param {[unitCard]} currentList
   * @param {number} currentTotalPointAllowance
   * @param {[String]} currentSubFactions
   * @returns a function call: collectValidatioResults()

   */
  const runValidation = (currentList, currentTotalPointAllowance, currentSubFactions) => {
    let validator = ruleValidation(AC.selectedFactionName);

    let validationResult = validator.testSubFactionRules({
      // all available units - faction and ally
      availableUnits: [...AC.listOfAllFactionUnits, ...AYC.listOfAlliedUnits],
      selectedUnits: currentList,
      totalPointsAllowance: currentTotalPointAllowance,
      subFactions: currentSubFactions,
      selectedAlternativeLists: ALC.selectedAlternativeLists,
      tournamentOverrideRules: TC.tournamentOverrideRules,
      listOfAlliedUnits: AYC.listOfAlliedUnits,
    });

    return collectValidatioResults(currentList, validationResult);
  };

  /**
   * Function collects the results of the army list validation and collects
   * it in a dto. it passes the object to the another function and returns it.
   * @param {[unitCard]} currentList
   * @param {dto} result
   * @returns a dto with the validation results.
   */
  const collectValidatioResults = (currentList, result) => {
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
   * Function takes the validation result, tests if it contains the passed unit
   * and if found, creates an object with the unit and the error message.
   * @param {unitCard} unit
   * @param {boolean} factionOrAlly
   * @param {obj} validationResult
   * @returns object containing the unit a flag and the error message if it is invalid.
   */
  const createUnitObject = (unit, validationResult) => {
    let unitObject = { unit: unit, valid: true, validationMessage: "" };

    if (validationResult === undefined) {
      return unitObject;
    }

    const factionBlockList = validationResult.unitsBlockedbyRules;
    const alliedBlockList = validationResult.alliedUnitsBlockedbyRules;

    const blockedUnits = [...factionBlockList, ...alliedBlockList];

    blockedUnits.forEach((bU) => {
      if (bU.unitBlockedbyRules === unit.unitName) {
        unitObject = { unit: unit, valid: false, validationMessage: bU.message };
      }
    });

    return unitObject;
  };

  /**
   * Function takes the validation result, tests if it contains the passed second
   * sub faction and if found, creates an object with the unit and the error message.
   * @param {unitCard} unit
   * @param {boolean} factionOrAlly
   * @param {obj} validationResult
   * @returns object containing the second sub faction a flag and the error message if it is invalid.
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
   * subFactionDTO.
   * @param {String} subFaction
   * @param {*[dto]} invalidUnits
   */
  const testForDisabledSubFaction = (invalidUnits) => {
    let tempObj = [...AC.subFactionDTOs];

    tempObj.forEach((dto) => {
      const subFactionUnitNames = dto.units.map((u) => u.unitName);
      const invalidUnitNames = invalidUnits.map((iu) => iu.unitBlockedbyRules);

      const allInvalid = subFactionUnitNames.every((unit) => invalidUnitNames.includes(unit));

      dto.hasNoValidUnits = allInvalid;
    });

    AC.setSubFactionDTOs([...tempObj]);
  };

  return {
    validateList: validateList, //
    createSubFactionResultObject: createSubFactionResultObject,
    createSecondSubFactionObject: createSecondSubFactionObject,
    createUnitObject: createUnitObject,
    testForDisabledSubFaction: testForDisabledSubFaction,
  };
};

export default useArmyValidation;
