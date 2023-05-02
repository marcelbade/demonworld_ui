import globalRules from "../globalRules/globalRules";

//TODO: change the error messages!!
const rules = [
  {
    subFaction: "heroesCharacters",
    cardNames: ["Befehlshaber", "Held"],
    min: 0.1,
    max: 0.1,
    error: "Deine Armeeliste darf zu höchstens 40% aus Befehlshabern und Helden bestehen.",
  },

  {
    subFaction: "humans",
    cardNames: ["Menschen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste darf zu höchstens 40% aus Menschen bestehen.",
  },
  {
    subFaction: "beastmen",
    cardNames: ["Tiermenschen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste darf zu höchstens 40% aus Tiermenschen bestehen.",
  },
  {
    subFaction: "icewitches",
    cardNames: ["Eishexen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste darf zu höchstens 40% aus Eishexen bestehen.",
  },
  {
    subFaction: "demons",
    cardNames: ["Dämonen"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Dämonen bestehen.",
  },
  {
    subFaction: "undead",
    cardNames: ["Untote"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Untoten bestehen.",
  },
  {
    subFaction: "icegiants",
    cardNames: ["Eisriesen"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 40% aus Eisriesen bestehen.",
  },
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  // Ishtak does not have this requirement - hence, this must always be true
  commanderIsPresent: true,
};

const IshtakRules = {
  testSubFactionRules: (availableUnits, selectedUnits, maxArmyPoints) => {
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

    return validationResults;
  },
};

//SPECIAL FACTION RULES
//TODO

export default IshtakRules;
