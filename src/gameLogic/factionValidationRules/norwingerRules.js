import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "barbarians",
    cardNames: ["Barbaren"],
    min: 0.2,
    max: 0.75,
    error: "Deine Armeeliste muss zu 20% bis 75% aus Barbaren bestehen",
  },
  {
    subFaction: "veterans",
    cardNames: ["Veteranen"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Veteranen bestehen.",
  },

  {
    subFaction: "spellcasters",
    cardNames: ["Sturmlord", "Hexe"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Sturmlord und Hexen bestehen.",
  },

  {
    subFaction: "heroes",
    cardNames: ["Helden", " Befehlshaber"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Helden und Befehlshabern bestehen.",
  },
  {
    subFaction: "mightyNorthernBeings",
    cardNames: ["Mächtige Wesen des Nordens"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus mächtigen Wesenn des Nordens bestehen.",
  },
  {
    subFaction: "northernAllies",
    cardNames: ["Verbündete des Nordens"],
    min: 0.0,
    max: 0.25,
    error: "Deine Armeeliste darf zu höchstens 25% aus Verbündeten des Nordens bestehen.",
  },
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
};

const NorwingerRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);

    // special faction rule - no more than 50% may be spent on all heroes, mages, and commanders.
    let isAboveCharLimit = globalRules.NoMoreThanHalfOnCharacters(selectedUnits, availableUnits, totalPointsAllowance);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...isAboveCharLimit,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    return validationResults;
  },
};

export { NorwingerRules, rules };
