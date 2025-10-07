import { GLOBAL_VALIDATION } from "../../../constants/textsAndMessages";
import { do2ArraysHaveCommonElements } from "../../../util/utilityFunctions";

export const mercenaryValidationRules = {
  /**
   * Function tests whether the selected units contain either the mercenary Sukara OR units w.
   * fire attacks. A list cannot contain both at the same time.
   * @param {[unitCard]} selectedUnits
   * @param {[unitCard]} availableUnits
   * @returns the validation result object.
   */
  containsfireUnits: (selectedUnits, availableUnits) => {
    const fireUnitNames = [
      "Altar der Reinigenden Flamme", //
      "Fahrende Festung (Flammenspeier)",
      "Kaiserlicher Drachenreiter",
      "Shiron Kybhar",
      "Querin Tendris",
      "Panrus Varlak ",
      "Gundar Flammenfaust",
      "Rador, Diener des Feuers",
      "Thorbal, Diener des Feuers",
      "Fledermaus mit Flammenspeier",
    ];

    const SUKARA = "Sukara, die Wasserhexe";

    const selectedUnitNames = selectedUnits.map((unit) => unit.unitName);

    const availableUnitNames = availableUnits.map((unit) => unit.unitName);
    let result = [];

    if (do2ArraysHaveCommonElements(selectedUnitNames, fireUnitNames) && availableUnitNames.includes(SUKARA)) {
      result.push({
        unitBlockedbyRules: SUKARA,
        message: GLOBAL_VALIDATION.MERCENARY_SUKARA_NO_FIRE,
      });
    }

    if (selectedUnitNames.includes(SUKARA) && do2ArraysHaveCommonElements(availableUnitNames, fireUnitNames)) {
      fireUnitNames.forEach((name) => {
        result.push({
          unitBlockedbyRules: name,
          message: GLOBAL_VALIDATION.MERCENARY_SUKARA_NO_FIRE,
        });
      });
    }

    return result;
  },
};
