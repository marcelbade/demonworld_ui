import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "imperialarmy",
    cardNames: ["Kaiserheer"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Einheiten des Kaiserheeres bestehen.",
  },

  {
    subFaction: "provincialArmy",
    cardNames: ["Provinzheer"],
    min: 0.2,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Einheiten des Provinzheeres bestehen.",
  },

  {
    subFaction: "orderTroopsAndMagicians",
    cardNames: ["Orden"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten des Ordens bestehen.",
  },
  {
    subFaction: "heroesAndCommanders",
    cardNames: ["Helden / Befehlshaber", "Held"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Helden und Befehlshabern bestehen.",
  },
  {
    subFaction: "spellcasters",
    cardNames: ["Zauberer", "Priester"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Magiern und Priestern bestehen.",
  },

  {
    subFaction: "centralMarkSpecials",
    cardNames: ["Zentralmark"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Einheiten der Zentralmark bestehen.",
  },

  {
    subFaction: "easternMarkSpecials",
    cardNames: ["Ostmark"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Einheiten der Ostmark bestehen.",
  },

  {
    subFaction: "westernMarkSpecials",
    cardNames: ["Westmark"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Einheiten der Westmark bestehen.",
  },

  {
    subFaction: "southernMarkSpecials",
    cardNames: ["Südmark"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Einheiten der Südmark bestehen.",
  },

  {
    subFaction: "northernMarkSpecials",
    cardNames: ["Nordmark"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Einheiten der Nordmark bestehen.",
  },

  {
    subFaction: "ally",
    cardNames: ["Zwerge"],
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

const EmpireRules = {
  testSubFactionRules: (availableUnits, selectedUnits, maxArmyPoints) => {
    // empire special rule
    let marchResult = marchesRule(selectedUnits, availableUnits);

    //tournament rules
    let twoRuleResult = globalRules.maximumOfTwo(selectedUnits);
    let heroRuleResult = globalRules.maxOf35PercentHeroes(selectedUnits, maxArmyPoints, availableUnits);
    //  general rules
    let exceedingMaxResult = globalRules.BlockUnitsExceedingMaxPoints(rules, selectedUnits, maxArmyPoints, availableUnits);
    let DuplicateResult = globalRules.noDuplicateUniques(selectedUnits);
    //  check for sub faction below minimum
    let minimumResult = globalRules.subFactionsBelowMinimum(rules, selectedUnits, maxArmyPoints, availableUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...marchResult,
      ...DuplicateResult,
      ...heroRuleResult,
      ...twoRuleResult,
      ...exceedingMaxResult,
    ];
    validationResults.subFactionBelowMinimum = minimumResult;
    validationResults.commanderIsPresent = globalRules.isArmyCommanderPresent(selectedUnits);

    return validationResults;
  },
};

//SEPCIAL FACTION RULES

/**
 * An Army can only have troops from one of the border marches.
 */
const marchesRule = (selectedUnits, availableUnits) => {
  const MESSAGE = "Die Armee kann nur Einheiten aus einer der vier Marken enthalten.";

  let marches = ["Nordmark", "Südmark", "Westmark", "Ostmark"];
  let result = [];

  for (let i = 0; i < selectedUnits.length; i++) {
    const selectedUnit = selectedUnits[i];
    if (marches.includes(selectedUnit.subFaction)) {
      marches = marches.filter((march) => march !== selectedUnit.subFaction);
      break;
    }
  }

  availableUnits.forEach((availableUnit) => {
    if (marches.includes(availableUnit.subFaction)) {
      result.push({ unitBlockedbyRules: availableUnit.unitName, message: MESSAGE });
    }
  });

  return result;
};

export { EmpireRules, rules };
