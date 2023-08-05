import globalRules from "../globalValidationRules/globalValidationRules";

const rules = [
  {
    subFaction: "basicTroops",
    min: 0.2,
    max: 0.5,
    cardNames: ["Grundtruppen"],
    error: "Deine Armeeliste muss zu mindestens 20% aus Grundtruppen bestehen.",
  },
  {
    subFaction: "specialists",
    min: 0.0,
    max: 0.4,
    cardNames: ["Spezialisierte Truppen"],
    error: "Deine Armeeliste darf maximal zu 40% aus spezialisierten Truppen bestehen.",
  },
  {
    subFaction: "heroes",
    min: 0.0,
    max: 0.3,
    cardNames: ["Helden/Befehlshaber"],
    error: "Deine Armeeliste darf maximal zu 30% aus Helden und Befehlshabern bestehen.",
  },
  {
    subFaction: "mages",
    min: 0.0,
    max: 0.3,
    cardNames: ["Magier"],
    error: "Deine Armeeliste darf maximal zu 30% aus Magiern bestehen.",
  },

  {
    subFaction: "Giants",
    min: 0.0,
    max: 0.35,
    cardNames: ["Großelemente"],
    error: "Deine Armeeliste darf maximal zu 35% aus Großelementen bestehen.",
  },
];

const MAX_HERO_PERCENTAGE = 40;

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const LizardMenRules = {
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

    // special faction rules - must habe one hero 

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

    return validationResults;
  },
};

export { LizardMenRules, rules };
