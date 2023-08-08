import globalRules from "../globalValidationRules/globalValidationRules";

const rules = [
  {
    subFaction: "unit",
    cardNames: ["Einheit"],
    min: 0.25,
    max: 1.0,
    error: "Deine Armeeliste muss zu mindestens 30% aus Einheiten bestehen.",
  },

  {
    subFaction: "characters",
    cardNames: ["Helden/Befehlshaber"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 50% aus Helden bestehen.",
  },

  {
    subFaction: "Clanngett",
    cardNames: ["Clanngett"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "machines",
    cardNames: ["Geräte"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Zah'ra bestehen.",
  },
  {
    subFaction: "giants",
    cardNames: ["Giganten"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
  {
    subFaction: "clantroops",
    cardNames: ["Sondertruppen des Clans"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
  {
    subFaction: "wizards",
    cardNames: ["Zauberer"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
];

const MAX_HERO_PERCENTAGE = 40;

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const OrkRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      selectedUnits,
      totalPointsAllowance,
      availableUnits,
      MAX_HERO_PERCENTAGE
    );

    // special faction rules - no special rules for Goblins exist.

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    validationResults.removeUnitsNoLongerValid = [];

    return validationResults;
  },
};

//SPECIAL FACTION RULES

export { OrkRules, rules };
