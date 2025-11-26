//  functions and components
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
//  constants
import { ORK_CLANS_TEXTS } from "../../../constants/textsAndMessages";

const rules = [
  {
    subFaction: "unit",
    cardNames: ["Einheit"],
    min: 0.1,
    max: 1.0,
    error: ORK_CLANS_TEXTS.SUB_FACTION_RULES.UNIT,
  },
  {
    subFaction: "characters",
    cardNames: ["Helden / Befehlshaber"],
    min: 0.0,
    max: 0.3,
    error: ORK_CLANS_TEXTS.SUB_FACTION_RULES.CHARACTERS,
  },
  {
    subFaction: "engines",
    cardNames: ["Gerät"],
    min: 0.0,
    max: 0.3,
    error: ORK_CLANS_TEXTS.SUB_FACTION_RULES.ENGINES,
  },
  {
    subFaction: "giants",
    cardNames: ["Giganten"],
    min: 0.0,
    max: 0.3,
    error: ORK_CLANS_TEXTS.SUB_FACTION_RULES.GIANTS,
  },
  {
    subFaction: "clantroops",
    cardNames: ["Clanntruppen"],
    min: 0.15,
    max: 0.65,
    error: ORK_CLANS_TEXTS.SUB_FACTION_RULES.CLAN_TROOPS,
  },
  {
    subFaction: "clanngett",
    cardNames: ["Clanngett"],
    min: 0.0,
    max: 0.5,
    error: ORK_CLANS_TEXTS.SUB_FACTION_RULES.CLANNGETT,
  },
  {
    subFaction: "wizards",
    cardNames: ["Zauberer"],
    min: 0.0,
    max: 0.3,
    error: ORK_CLANS_TEXTS.SUB_FACTION_RULES.WIZARDS,
  },
];

const OrkClansRules = {
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
    let hasNoCommander = globalRules.isArmyCommanderPresent(
      validationData.selectedUnits, //
      validationData.availableUnits,
      rules
    );

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

    let isAlreadyinListFromOtherClan = noIdenticalTroopFromTwoClans(validationData.availableUnits, validationData.selectedUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...isAlreadyinListFromOtherClan,
    ];

    // result for sub factions below limit.
    validationResults.invalidSubFactions = [...isBelowSubFactionMin, ...hasNoCommander];

    validationResults.removeUnitsNoLongerValid = [];

    return validationResults;
  },
};

/**
 * Function implements the rule that if the same troop is present in both selected clans, it can only be
 * selected from one clan. E.g., if both clans have archers, only archers from one clan can be added to the list.
 * @param {*} availableUnits
 * @param {*} selectedUnits
 * @returns an array containing the blocked units and the error message.
 */
const noIdenticalTroopFromTwoClans = (availableUnits, selectedUnits) => {
  let blockedUnits = [];

  for (let i = 0; i < selectedUnits.length; i++) {
    const selectedUnit = selectedUnits[i];
    for (let j = 0; j < availableUnits.length; j++) {
      const availableUnit = availableUnits[j];

      if (availableUnit.unitName === selectedUnit.unitName && availableUnit.subFaction !== selectedUnit.subFaction) {
        blockedUnits.push({
          unitBlockedbyRules: availableUnit.unitName, //
          subFaction: availableUnit.subFaction,
          message: ORK_CLANS_TEXTS.SUB_FACTION_RULES.NO_IDENTICAL_UNIT_FROM_2_CLANS,
        });
      }
    }
  }

  return blockedUnits;
};

export { OrkClansRules, rules };
