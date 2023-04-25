/*
 * additional rule
 * - EVERY UNIT, ARTILLERY PIECE, CHAMPION,... WITH THE EXCEPTION OF DORGAPRIESTS, CHURCH UNITS AND GARYDWEN MUST BE ASSIGNED TO A TRIBE
 *  - tribal champions can only be selected when at least ONE unit of the tribe has been selected
 *  - for every veteran unit of a tribe you need ONE tribal unit
 *  - Dorga priests can only be selected if at least ONE church unit has been selected
 *  - in addition to the maximum for shamans and heroes/champions the points for champions/heroes AND shamans must be <= 50
 *  - for every FULL 10% of shamans, the maximum for church/droga units is lowered by 10%
 *    * e.g. 25% shamans -> -20% for church units
 *
 * */

// TODO: correct subfations for thain, percentages

import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "unit",
    cardNames: ["Einheit"],
    min: 0.3,
    max: 1.0,
    error: "Deine Armeeliste muss zu mindestens 30% aus Einheiten bestehen.",
  },

  {
    subFaction: "characters",
    cardNames: ["Held", "Befehlshaber", "Erdpriester", "Erzpriester", "Feuerpriester"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Helden bestehen.",
  },

  {
    subFaction: "gaeta",
    cardNames: ["Gaeta"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "zahra",
    cardNames: ["Zah'ra"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Zah'ra bestehen.",
  },
  {
    subFaction: "ally",
    cardNames: ["Imperium"],
    min: 0.0,
    max: 0.2,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const ThainRules = {
  testSubFactionRules: (availableUnits, selectedUnits, maxArmyPoints) => {
    // dwarven special rule
    percentageKingdomsAndAlly(selectedUnits);

    //tournament rules
    let twoRuleResult = globalRules.maximumOfTwo(selectedUnits);
    let heroRuleResult = globalRules.maxOf35PercentHeroes(selectedUnits, maxArmyPoints, availableUnits);
    //  general rules
    let exceedingMaxResult = globalRules.BlockUnitsExceedingMaxPoints(rules, selectedUnits, maxArmyPoints, availableUnits);
    let DuplicateResult = globalRules.noDuplicateUniques(selectedUnits);
    //  check for sub faction below minimum
    let minimumResult = globalRules.subFactionsBelowMinimum(rules, selectedUnits, maxArmyPoints, availableUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [...DuplicateResult, ...heroRuleResult, ...twoRuleResult, ...exceedingMaxResult];
    validationResults.subFactionBelowMinimum = minimumResult;
    validationResults.commanderIsPresent = globalRules.isArmyCommanderPresent(selectedUnits);

    return validationResults;
  },
};

//SEPCIAL FACTION RULES

const percentageKingdomsAndAlly = (selectedUnits) => {
  //const MESSAGE = "Die Armee kann nicht Einheiten beider Zwergeneinheiten und des Alliierten enthalten!";
};

export default ThainRules;
