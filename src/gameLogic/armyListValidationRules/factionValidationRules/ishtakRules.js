import globalRules from "../globalValidationRules/globalValidationRules";
import { mercenaryValidationRules } from "../globalValidationRules/mercenaryValidationRules";
import validationResults from "./validationResultsObjectProvider";
// constants
import { ISHTAK_TEXTS } from "../../../constants/textsAndMessages";

const rules = [
  {
    subFaction: "humans",
    cardNames: ["Menschen"],
    min: 0.1,
    max: 0.6,
    error: ISHTAK_TEXTS.SUB_FACTION_RULES.HUMANS,
  },
  {
    subFaction: "beastmen",
    cardNames: ["Tiermenschen"],
    min: 0.1,
    max: 0.6,
    error: ISHTAK_TEXTS.SUB_FACTION_RULES.BEASTMEN,
  },
  {
    subFaction: "icewitches",
    cardNames: ["Eishexen"],
    min: 0.1,
    max: 0.6,
    error: ISHTAK_TEXTS.SUB_FACTION_RULES.ICEWITCHES,
  },
  {
    subFaction: "demons",
    cardNames: ["Dämonen"],
    min: 0.0,
    max: 0.5,
    error: ISHTAK_TEXTS.SUB_FACTION_RULES.DEMONS,
  },
  {
    subFaction: "undead",
    cardNames: ["Untote"],
    min: 0.0,
    max: 0.5,
    error: ISHTAK_TEXTS.SUB_FACTION_RULES.UNDEAD_TEXTS,
  },
  {
    subFaction: "icegiants",
    cardNames: ["Eisriesen"],
    min: 0.0,
    max: 0.3,
    error: ISHTAK_TEXTS.SUB_FACTION_RULES.ICEGIANTS,
  },
];

const IshtakRules = {
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
      validationData.distinctSubFactions
    );
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(
      rules,
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits
    );

    let hasFireUnits = mercenaryValidationRules.containsfireUnits(validationData.selectedUnits, validationData.availableUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (validationData.tournamentOverrideRules.enableOverride) {
      maxCopies = validationData.tournamentOverrideRules.maxNumber;
      heroPointCap = validationData.tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = 2;
      // faction rule => 50% cap
      heroPointCap = 50;
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

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...testForHeroCapResult,
      ...hasFireUnits,
    ];
    // result for sub factions below limit.
    validationResults.invalidSubFactions = [...isBelowSubFactionMin];

    return validationResults;
  },
};

export { IshtakRules, rules };
