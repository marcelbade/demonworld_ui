import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "infantry",
    min: 0.3,
    max: 1.0,
    cardNames: ["Infanterie"],
    error: "Deine Armeeliste muss zu mindestens 30% aus Infanterie bestehen.",
  },
  {
    subFaction: "engines",
    min: 0.0,
    max: 0.2,
    cardNames: ["Geräte"],
    error: "Deine Armeeliste darf maximal zu 20% aus Geräten bestehen.",
  },
  {
    subFaction: "characters",
    min: 0.0,
    max: 0.3,
    cardNames: ["Helden / Befehlshaber"],
    error: "Deine Armeeliste darf maximal zu 30% aus Helden und Befehlshabern bestehen.",
  },
  {
    subFaction: "shamans",
    min: 0.0,
    max: 0.3,
    cardNames: ["Schamanen"],
    error: "Deine Armeeliste darf maximal zu 30% aus Schamanen bestehen.",
  },

  {
    subFaction: "giantInsects",
    min: 0.0,
    max: 0.4,
    cardNames: ["Rieseninsekten"],
    error: "Deine Armeeliste darf maximal zu 40% aus Rieseninsekten bestehen.",
  },

  {
    subFaction: "insectRiders",
    min: 0.0,
    max: 0.4,
    cardNames: ["Insektenreiter"],
    error: "Deine Armeeliste darf maximal zu 40% aus Insektenreiter bestehen.",
  },
  {
    subFaction: "orks",
    min: 0.0,
    max: 0.2,
    cardNames: ["Orks"],
    error: "Deine Armeeliste darf zu maximal zu 20% aus Orks bestehen.",
  },
];

const MAX_HERO_PERCENTAGE = 35;

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const GoblinRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance) => {
    //tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(selectedUnits, totalPointsAllowance, availableUnits, MAX_HERO_PERCENTAGE);

    //  general rules
    let blockUnitsExceedingMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let testForUniquesResult = globalRules.noDuplicateUniques(selectedUnits);

    //  check for sub faction below minimum
    let testForBelowSFMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, availableUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...testForUniquesResult,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...blockUnitsExceedingMax,
    ];
    validationResults.subFactionBelowMinimum = testForBelowSFMin;
    validationResults.commanderIsPresent = globalRules.isArmyCommanderPresent(selectedUnits);

    return validationResults;
  },
};

export { GoblinRules, rules };
