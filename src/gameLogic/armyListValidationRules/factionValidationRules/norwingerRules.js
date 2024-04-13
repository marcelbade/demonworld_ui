import { NORWINGER } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "barbarians",
    cardNames: ["Barbaren"],
    min: 0.2,
    max: 0.75,
    error: NORWINGER.SUB_FACTION_RULES.BARBARIANS,
  },
  {
    subFaction: "veterans",
    cardNames: ["Veteranen"],
    min: 0.0,
    max: 0.4,
    error: NORWINGER.SUB_FACTION_RULES.VETERANS,
  },

  {
    subFaction: "spellcasters",
    cardNames: ["Sturmlord", "Hexe"],
    min: 0.0,
    max: 0.3,
    error: NORWINGER.SUB_FACTION_RULES.SPELLCASTERS,
  },

  {
    subFaction: "heroes",
    cardNames: ["Helden", " Befehlshaber"],
    min: 0.0,
    max: 0.3,
    error: NORWINGER.SUB_FACTION_RULES.HEROES,
  },
  {
    subFaction: "mightyNorthernBeings",
    cardNames: ["Mächtige Wesen"],
    min: 0.0,
    max: 0.4,
    error: NORWINGER.SUB_FACTION_RULES.MIGHTY_NORTHERN_BEINGS,
  },
  {
    subFaction: "northernAllies",
    cardNames: ["Verbündete des Nordens"],
    min: 0.0,
    max: 0.25,
    error: NORWINGER.SUB_FACTION_RULES.NORTHERN_ALLIES,
  },
];

const NorwingerRules = {
  testSubFactionRules: (
    validationData 
  ) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(validationData.selectedUnits, validationData.availableUnits, validationData.totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, validationData.selectedUnits, validationData.totalPointsAllowance, validationData.subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, validationData.selectedUnits, validationData.totalPointsAllowance, validationData.availableUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(validationData.selectedUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (validationData.tournamentOverrideRules.enableOverride) {
      maxCopies = validationData.tournamentOverrideRules.maxNumber;
      heroPointCap = validationData.tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = 2;
      // faction rule =>no hero cap!
      heroPointCap = 100;
    }

    let testForMax2Result = globalRules.maximumCopiesOfUnit(validationData.selectedUnits, maxCopies);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(validationData.selectedUnits, validationData.totalPointsAllowance, validationData.availableUnits, heroPointCap);

    let hasDuplicateUniques = validationData.tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(validationData.selectedUnits)
      : [];

    // special faction rule - no more than 50% may be spent on all heroes, mages, and commanders.
    let isAboveCharLimit = globalRules.belowMaxPercentageHeroes(validationData.selectedUnits, validationData.totalPointsAllowance, validationData.availableUnits, heroPointCap);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...isAboveCharLimit,
      ...testForHeroCapResult,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    return validationResults;
  },
};

export { NorwingerRules, rules };
