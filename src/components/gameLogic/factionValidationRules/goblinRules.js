import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "infantry",
    min: 0.3,
    max: 1.0,
    cardNames: ["Infanterie"],
    error: "Deine Armeeliste muss zu mindestens 30% aus Einheiten der Kriegerkaste bestehen.",
  },
  {
    subFaction: "engines",
    min: 0.0,
    max: 0.2,
    cardNames: ["Geräte"],
    error: "Deine Armeeliste darf zu maximal zu 20% aus Geräten bestehen.",
  },
  {
    subFaction: "characters",
    min: 0.0,
    max: 0.3,
    cardNames: ["Held", "Befehlshaber"],
    error: "Deine Armeeliste darf zu maximal zu 30% aus Helden und Befehlshabern bestehen.",
  },
  {
    subFaction: "shamans",
    min: 0.0,
    max: 0.3,
    cardNames: ["Schamanen"],
    error: "Deine Armeeliste darf zu maximal zu 30% aus Schamanen bestehen.",
  },

  {
    subFaction: "giantInsects",
    min: 0.0,
    max: 0.4,
    cardNames: [" Rieseninsekten"],
    error: "Deine Armeeliste  darf zu maximal zu 40% aus Rieseninsekten bestehen.",
  },

  {
    subFaction: "insectRiders",
    min: 0.0,
    max: 0.4,
    cardNames: ["Insektenreiter"],
    error: "Deine Armeeliste  darf zu maximal zu 40% aus Insektenreiter bestehen.",
  },
  {
    subFaction: "orks",
    min: 0.0,
    max: 0.2,
    cardNames: ["Orks"],
    error: "Deine Armeeliste  darf zu maximal zu 20% aus Orks bestehen.",
  },
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const GoblinRules = {
  testSubFactionRules: (availableUnits, selectedUnits, maxArmyPoints) => {
    //tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);
    let testForHeroCapResult = globalRules.maxOf35PercentHeroes(selectedUnits, maxArmyPoints, availableUnits);

    //  general rules
    let blockUnitsExceedingMax = globalRules.BlockUnitsExceedingMaxPoints(rules, selectedUnits, maxArmyPoints, availableUnits);
    let testForUniquesResult = globalRules.noDuplicateUniques(selectedUnits);

    //  check for sub faction below minimum
    let subFactionLimitsResult = globalRules.subFactionsBelowMinimum(rules, selectedUnits, maxArmyPoints, availableUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...testForUniquesResult,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...blockUnitsExceedingMax,
    ];
    validationResults.subFactionBelowMinimum = subFactionLimitsResult;
    validationResults.commanderIsPresent = globalRules.isArmyCommanderPresent(selectedUnits);

    return validationResults;
  },
};

export default GoblinRules;
