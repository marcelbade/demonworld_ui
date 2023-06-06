import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "warriorCaste",
    cardNames: ["Kriegerkaste"],
    min: 0.3,
    max: 1.0,
    error: "Deine Armeeliste muss zu mindestens 30% aus Einheiten der Kriegerkaste bestehen.",
  },
  {
    subFaction: "nobleCaste",
    cardNames: ["Adelskaste"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armee darf höchstens zu 50% aus Einheiten der Adelskaste bestehen.",
  },
  {
    subFaction: "magicianCaste",
    cardNames: ["Magierkaste"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Einheiten der Magierkaste bestehen.",
  },
  {
    subFaction: "priestCaste",
    cardNames: ["Priesterkaste"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Einheiten der Priesterkaste bestehen.",
  },
  {
    subFaction: "heroes",
    cardNames: ["Befehlshaber", "Held", "Helden / Befehlshaber"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Helden oder Befehlshabern bestehen.",
  },
  {
    subFaction: "heroesMagiciansPriestsTotal",
    cardNames: ["Magier", "Priesterin", "Befehlshaber", "Held"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armee darf höchstens zur Hälfte aus Magiern, Priestern, Helden, o. Befehlshabern bestehen",
  },
  {
    subFaction: "summons",
    cardNames: ["Beschwörung"],
    min: 0.0,
    max: 0.0,
    error: "",
  },
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const DarkElveRules = {
  testSubFactionRules: (availableUnits, selectedUnits, maxArmyPoints) => {
    // dwarven special rule
    maxLimitForAllChars(availableUnits, selectedUnits, maxArmyPoints);

    //tournament rules
    let twoRuleResult = globalRules.maximumOfTwo(selectedUnits);
    let heroRuleResult = globalRules.belowMaxPercentageHeroes(selectedUnits, maxArmyPoints, availableUnits);
    //  general rules
    let exceedingMaxResult = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, maxArmyPoints, availableUnits);
    let DuplicateResult = globalRules.noDuplicateUniques(selectedUnits);
    //  check for sub faction below minimum
    let minimumResult = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, maxArmyPoints, availableUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [...DuplicateResult, ...heroRuleResult, ...twoRuleResult, ...exceedingMaxResult];
    validationResults.subFactionBelowMinimum = minimumResult;
    validationResults.commanderIsPresent = globalRules.isArmyCommanderPresent(selectedUnits);

    return validationResults;
  },
};

//SEPCIAL FACTION RULES

//SEPCIAL FACTION RULES

/**
 * The army list can have a maximum of 50% characters.
 */
const maxLimitForAllChars = (availableUnits, selectedUnits, maxArmyPoints) => {
  let characterSubFactions = ["Sturmlord", "Hexe", "Helden", " Befehlshaber"];
  let sum = 0;
  let result = [];
  const MESSAGE = "Die Armeekann zu max. 50% aus Hexen, Sturmlords, Befehlshabern und Helden bestehen!";

  selectedUnits
    .filter((unit) => characterSubFactions.includes(unit.subFaction))
    .forEach((characterUnit) => {
      sum += characterUnit.points;
    });

  availableUnits.forEach((availableUnit) => {
    if (availableUnit.points + sum > 0.5 * maxArmyPoints) {
      result.push({ unitBlockedbyRules: availableUnit.unitName, message: MESSAGE });
    }
  });

  // TODO: mach das fertig :D
};

export { DarkElveRules, rules };
