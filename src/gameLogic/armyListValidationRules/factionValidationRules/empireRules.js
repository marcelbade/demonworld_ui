import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "imperialarmy",
    cardNames: ["Kaiserheer"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten des Kaiserheeres bestehen.",
  },

  {
    subFaction: "provincialArmy",
    cardNames: ["Provinzheer"],
    min: 0.2,
    max: 0.5,
    error: "Deine Armeeliste muss zu 20% bis 50% aus Einheiten des Provinzheeres bestehen.",
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
    cardNames: ["Helden/Befehlshaber", "Held"],
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
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten der Zentralmark bestehen.",
  },

  {
    subFaction: "easternMarkSpecials",
    cardNames: ["Ostmark"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten der Ostmark bestehen.",
  },

  {
    subFaction: "westernMarkSpecials",
    cardNames: ["Westmark"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten der Westmark bestehen.",
  },

  {
    subFaction: "southernMarkSpecials",
    cardNames: ["Südmark"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten der Südmark bestehen.",
  },

  {
    subFaction: "northernMarkSpecials",
    cardNames: ["Nordmark"],
    min: 0.1,
    max: 0.5,
    error: "Deine Armeeliste muss zu 10% bis 50% aus Einheiten aus Einheiten der Nordmark bestehen.",
  },

  {
    subFaction: "ally",
    cardNames: ["Zwerge"],
    min: 0.0,
    max: 0.2,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
];

const MAX_HERO_PERCENTAGE = 40;

 
const EmpireRules = {
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

    return validationResults;
  },
};

export { EmpireRules, rules };