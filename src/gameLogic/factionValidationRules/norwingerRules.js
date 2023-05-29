import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "barbarians",
    cardNames: ["Barbaren"],
    min: 0.2,
    max: 0.75,
    error: "Deine Armeeliste darf zu höchstens 75% aus Barbaren bestehen",
  },
  {
    subFaction: "veterans",
    cardNames: ["Veteranen"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste muss zu mindestens 40% aus Veteranen bestehen.",
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
  testSubFactionRules: (availableUnits, selectedUnits, maxArmyPoints) => {
    // Norwinger special rule
    maxLimitForAllChars(availableUnits, selectedUnits, maxArmyPoints);

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

export { NorwingerRules, rules };
