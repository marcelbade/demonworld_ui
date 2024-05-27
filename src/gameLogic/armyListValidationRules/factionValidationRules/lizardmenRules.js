import { LIZARDMEN_TEXTS } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "basicTroops",
    min: 0.2,
    max: 0.5,
    cardNames: ["Grundtruppen"],
    error: LIZARDMEN_TEXTS.SUB_FACTION_RULES.BASICTROOPS,
  },
  {
    subFaction: "specialists",
    min: 0.0,
    max: 0.4,
    cardNames: ["Spezialisierte Truppen"],
    error: LIZARDMEN_TEXTS.SUB_FACTION_RULES.SPECIALISTS,
  },
  {
    subFaction: "heroes",
    min: 0.0,
    max: 0.3,
    cardNames: ["Helden/Befehlshaber"],
    error: LIZARDMEN_TEXTS.SUB_FACTION_RULES.HEROES,
  },
  {
    subFaction: "mages",
    min: 0.0,
    max: 0.3,
    cardNames: ["Magier"],
    error: LIZARDMEN_TEXTS.SUB_FACTION_RULES.MAGES,
  },

  {
    subFaction: "giantElements",
    min: 0.0,
    max: 0.35,
    cardNames: ["Großelemente"],
    error: LIZARDMEN_TEXTS.SUB_FACTION_RULES.GIANTELEMENTS,
  },
];

const LizardMenRules = {
  testSubFactionRules: (validationData) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(
      validationData.selectedUnits,
      validationData.availableUnits,
      validationData.totalPointsAllowance
    );
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(
      rules,
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.subFactions
    );
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(
      rules,
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits
    );
    let hasNoCommander = globalRules.isArmyCommanderPresent(validationData.selectedUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (validationData.tournamentOverrideRules.enableOverride) {
      maxCopies = validationData.tournamentOverrideRules.maxNumber;
      heroPointCap = validationData.tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = 2;
      // faction rule => 40% cap
      heroPointCap = 40;
    }

    let testForMax2Result = globalRules.maximumCopiesOfUnit(validationData.selectedUnits, maxCopies);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits,
      heroPointCap
    );

    let hasDuplicateUniques = validationData.tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(validationData.selectedUnits)
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
