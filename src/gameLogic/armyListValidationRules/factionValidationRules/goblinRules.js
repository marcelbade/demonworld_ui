import { isObjectEmtpy } from "../../../util/utilityFunctions";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
import { mercenaryValidationRules } from "../globalValidationRules/mercenaryValidationRules";
// constants
import { ORK_CLANS_UNIT_MAPPING } from "../../../constants/factions";
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

// special faction rules

const singleClanOnly = (selectedUnits, availableAlliedUnits) => {
  let allowedClanUnits = [];
  let result = [];

  const firstFoundClanUnit = selectedUnits.find((u) => u.subFaction === "Clanntruppen");
  const clanUnitWasFound = !isObjectEmtpy(firstFoundClanUnit);

  if (clanUnitWasFound) {
    for (const key of Object.keys(ORK_CLANS_UNIT_MAPPING)) {
      if (ORK_CLANS_UNIT_MAPPING[key].includes(firstFoundClanUnit.unitName) && key !== "Clanngett") {
        allowedClanUnits = [...allowedClanUnits, ...ORK_CLANS_UNIT_MAPPING[key]];
      }
    }

    availableAlliedUnits.forEach((u) => {
      if (u.subFaction === "Clanntruppen" && !allowedClanUnits.includes(u.unitName)) {
        result.push({ unitBlockedbyRules: u.unitName, message: GOBLIN_TEXTS.SUB_FACTION_RULES.SINGLE_CLAN_ONLY });
      }
    });
  }

  return result;
};

export { GoblinRules, rules };
