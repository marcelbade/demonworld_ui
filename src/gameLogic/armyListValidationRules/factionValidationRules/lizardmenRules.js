import { LIZARDMEN } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "basicTroops",
    min: 0.2,
    max: 0.5,
    cardNames: ["Grundtruppen"],
    error: LIZARDMEN.SUB_FACTION_RULES.BASICTROOPS,
  },
  {
    subFaction: "specialists",
    min: 0.0,
    max: 0.4,
    cardNames: ["Spezialisierte Truppen"],
    error: LIZARDMEN.SUB_FACTION_RULES.SPECIALISTS
  },
  {
    subFaction: "heroes",
    min: 0.0,
    max: 0.3,
    cardNames: ["Helden/Befehlshaber"],
    error:  LIZARDMEN.SUB_FACTION_RULES.HEROES,
  },
  {
    subFaction: "mages",
    min: 0.0,
    max: 0.3,
    cardNames: ["Magier"],
    error: LIZARDMEN.SUB_FACTION_RULES.MAGES,
  },

  {
    subFaction: "giantElements",
    min: 0.0,
    max: 0.35,
    cardNames: ["Großelemente"],
    error: LIZARDMEN.SUB_FACTION_RULES.GIANTELEMENTS,
  },
];

const MAX_HERO_PERCENTAGE = 40;

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
