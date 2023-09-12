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
    error: LIZARDMEN.SUB_FACTION_RULES.SPECIALISTS,
  },
  {
    subFaction: "heroes",
    min: 0.0,
    max: 0.3,
    cardNames: ["Helden/Befehlshaber"],
    error: LIZARDMEN.SUB_FACTION_RULES.HEROES,
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

const LizardMenRules = {
  testSubFactionRules: (
    availableUnits,
    selectedUnits,
    totalPointsAllowance,
    subFactions,
    selectedAlternativeList,
    tournamentOverrideRules
  ) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (tournamentOverrideRules.enableOverride) {
      maxCopies = tournamentOverrideRules.maxNumber;
      heroPointCap = tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = 2;
      // faction rule => 40% cap
      heroPointCap = 40;
    }

    let testForMax2Result = globalRules.maximumCopiesOfUnit(selectedUnits, maxCopies);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(selectedUnits, totalPointsAllowance, availableUnits, heroPointCap);

    let hasDuplicateUniques = tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(selectedUnits)
      : [];

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
