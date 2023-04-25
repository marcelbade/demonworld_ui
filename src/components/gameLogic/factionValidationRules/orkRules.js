
/**
 * TODO: WYVERN -> count as item
 * TODO: LIMIT TO ONE CLAN
 * <p>
 * ok, orks is mildly annoying
 * you choose -> clan OR clangett
 * Clan: special troops of that one clan 50 percent
 * Clangett: lead by one of Clanngetts Lieutenants and troops of all clans can be picked, but at a lower max (20%)
 * ALSO:
 * The lieutenants are Trazzag,  Fherniak,  Ärrig,  Khazzar  and  Nallian
 * <p>
 *  
 * ======================
 * - check for clangett lt. method
 * - check if clangett or clan, make max numbers dependent on that choice
 * - limit to one clan , else FALSE
 **/

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

const OrkRules = {
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
 };

export default OrkRules;
