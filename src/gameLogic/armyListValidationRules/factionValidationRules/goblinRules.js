import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
import { mercenaryValidationRules } from "../globalValidationRules/mercenaryValidationRules";
// constants
import { GOBLIN_TEXTS } from "../../../constants/textsAndMessages";

/**
 * A goblin army has only one special rule - the amounts spent on shamans and heroes cannot exceed 40%.
 */
const rules = [
  {
    subFaction: "infantry",
    min: 0.3,
    max: 1.0,
    cardNames: ["Infanterie"],
    error: GOBLIN_TEXTS.SUB_FACTION_RULES.INFANTRY,
  },
  {
    subFaction: "engines",
    min: 0.0,
    max: 0.2,
    cardNames: ["Geräte"],
    error: GOBLIN_TEXTS.SUB_FACTION_RULES.ENGINES,
  },
  {
    subFaction: "characters",
    min: 0.0,
    max: 0.3,
    cardNames: ["Helden / Befehlshaber"],
    error: GOBLIN_TEXTS.SUB_FACTION_RULES.CHARACTERS,
  },
  {
    subFaction: "shamans",
    min: 0.0,
    max: 0.3,
    cardNames: ["Schamanen"],
    error: GOBLIN_TEXTS.SUB_FACTION_RULES.SHAMANS,
  },

  {
    subFaction: "giantInsects",
    min: 0.0,
    max: 0.4,
    cardNames: ["Rieseninsekten"],
    error: GOBLIN_TEXTS.SUB_FACTION_RULES.GIANTINSECTS,
  },

  {
    subFaction: "insectRiders",
    min: 0.0,
    max: 0.4,
    cardNames: ["Insektenreiter"],
    error: GOBLIN_TEXTS.SUB_FACTION_RULES.INSECTRIDERS,
  },
  {
    subFaction: "orks",
    min: 0.0,
    max: 0.2,
    cardNames: ["Orks"],
    error: GOBLIN_TEXTS.SUB_FACTION_RULES.ORKS_TEXTS,
  },
];

const GoblinRules = {
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

    let hasNoCommander = globalRules.isArmyCommanderPresent(validationData.selectedUnits, validationData.availableUnits, rules);

    let hasFireUnits = mercenaryValidationRules.containsfireUnits(validationData.selectedUnits, validationData.availableUnits);

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

    let testForMaxCopiesResult = globalRules.maximumCopiesOfUnit(validationData.selectedUnits, maxCopies);

    let isAboveCharLimit = globalRules.belowMaxPercentageHeroes(
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits,
      heroPointCap
    );

    let hasDuplicateUniques = validationData.tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(validationData.selectedUnits)
      : [];

    let singleClanTroops = singleClanOnly(validationData.selectedUnits, validationData.listOfAlliedUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForMaxCopiesResult,
      ...isAboveSubFactionMax,
      ...isAboveCharLimit,
      ...hasFireUnits,
    ];

    // result for sub factions below limit, sub factions w. potential commander if none has been picked.
    validationResults.invalidSubFactions = [...isBelowSubFactionMin, ...hasNoCommander];

    //  result - ally rules applied.
    validationResults.alliedUnitsBlockedbyRules = [...singleClanTroops];

    return validationResults;
  },
};

const singleClanOnly = (selectedUnits, availableAlliedUnits) => {
  let result = [];

  if (selectedUnits.length === 0) {
    return result;
  }

  //  TODO hard coded string
  const selectedClanTroops = selectedUnits.filter((u) => u.secondSubFaction === "Clanntruppen");

  if (selectedClanTroops.length === 0 || undefined) {
    return result;
  }

  const selectedClan = selectedClanTroops[0].subFaction;

  result = availableAlliedUnits
    .filter((u) => u.secondSubFaction === "Clanntruppen" && u.subFaction !== selectedClan)
    .map((u) => {
      return {
        unitBlockedbyRules: u.unitName, //
        subFaction: u.subFaction,
        message: GOBLIN_TEXTS.SUB_FACTION_RULES.SINGLE_CLAN_ONLY,
      };
    });

  return result;
};

export { GoblinRules, rules };
