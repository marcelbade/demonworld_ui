import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "heroesCharacters",
    names: ["Befehlshaber", "Held"],
    min: 0.1,
    max: 0.1,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },

  {
    subFaction: "humans",
    names: ["Menschen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "beastmen",
    names: ["Tiermenschen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "icewitches",
    names: ["Eishexen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "demons",
    names: ["Dämonen"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "undead",
    names: ["Untote"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "icegiants",
    names: ["Eisriesen"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  // Ishtak does not have this required - hence, this must always be true
  commanderIsPresent: true,
};

const IshtakRules = {
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

    return validationResults;
  },
};

//SEPCIAL FACTION RULES

// function takes care of the dwarf army list special rule: of the three opions (2 dwarven kingdoms and one ally), only one can make upp a max.
// of 40% of the force. Once the choice is made, the player can only take the second kingdom OR the ally and only to a max. of 20%.
const percentageKingdomsAndAlly = (selectedUnits) => {
  //const MESSAGE = "Die Armee kann nicht Einheiten beider Zwergeneinheiten und des Alliierten enthalten!";
};

export default IshtakRules;
