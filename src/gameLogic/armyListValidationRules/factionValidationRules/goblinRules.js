import { GOBLINS } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "infantry",
    min: 0.3,
    max: 1.0,
    cardNames: ["Infanterie"],
    error: GOBLINS.SUB_FACTION_RULES.INFANTRY,
  },
  {
    subFaction: "engines",
    min: 0.0,
    max: 0.2,
    cardNames: ["Geräte"],
    error: GOBLINS.SUB_FACTION_RULES.ENGINES ,
  },
  {
    subFaction: "characters",
    min: 0.0,
    max: 0.3,
    cardNames: ["Helden/Befehlshaber"],
    error: GOBLINS.SUB_FACTION_RULES.CHARACTERS,
  },
  {
    subFaction: "shamans",
    min: 0.0,
    max: 0.3,
    cardNames: ["Schamanen"],
    error: GOBLINS.SUB_FACTION_RULES.SHAMANS,
  },

  {
    subFaction: "giantInsects",
    min: 0.0,
    max: 0.4,
    cardNames: ["Rieseninsekten"],
    error: GOBLINS.SUB_FACTION_RULES.GIANTINSECTS,
  },

  {
    subFaction: "insectRiders",
    min: 0.0,
    max: 0.4,
    cardNames: ["Insektenreiter"],
    error: GOBLINS.SUB_FACTION_RULES.INSECTRIDERS,
  },
  {
    subFaction: "orks",
    min: 0.0,
    max: 0.2,
    cardNames: ["Orks"],
    error: GOBLINS.SUB_FACTION_RULES.ORKS,
  },
];

const MAX_HERO_PERCENTAGE = 40;

const GoblinRules = {
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

    // special faction rules - there are no special rules for the Goblins.

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

export { GoblinRules, rules };
