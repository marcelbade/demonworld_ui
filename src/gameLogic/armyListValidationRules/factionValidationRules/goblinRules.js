import { ORK_CLANS_UNIT_MAPPING } from "../../../constants/factions";
import { GOBLINS } from "../../../constants/textsAndMessages";
import { isObjectEmtpy } from "../../../util/utilityFunctions";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

/**
 * A goblin army has only one special rule - the amounts spent on shamans and heroes cannot exceed 40%.
 */
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
    error: GOBLINS.SUB_FACTION_RULES.ENGINES,
  },
  {
    subFaction: "characters",
    min: 0.0,
    max: 0.3,
    cardNames: ["Helden / Befehlshaber"],
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

    let isAboveCharLimit = globalRules.belowMaxPercentageHeroes(
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits,
      heroPointCap
    );

    let hasDuplicateUniques = validationData.tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(validationData.selectedUnits)
      : [];

    let ClanngettTroops = blockClanngett(validationData.listOfAlliedUnits);
    let singleClanTroops = singleClanOnly(validationData.selectedUnits, validationData.listOfAlliedUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...isAboveCharLimit,
    ];

    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    //  result - ally rules applied.
    validationResults.alliedUnitsBlockedbyRules = [
      ...ClanngettTroops, //
      ...singleClanTroops,
    ];

    return validationResults;
  },

  // special faction rules
};

/**
 * Function implements the rule that no Clanngett troops can be allies in a Goblin list.
 * @param {untiCards} availableAlliedUnits
 * @returns an array consisting of objects. Every object contains a unit that must
 * be blocked and an error message to be displayed as a tool tip.
 */
const blockClanngett = (availableAlliedUnits) => {
  let result = [];

  const clanngettUnits = availableAlliedUnits.filter((u) => u.subFaction === "Clanngett");

  clanngettUnits.forEach((u) => {
    result.push({ unitBlockedbyRules: u.unitName, message: GOBLINS.SUB_FACTION_RULES.NO_CLANNGETT });
  });

  return result;
};

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
        result.push({ unitBlockedbyRules: u.unitName, message: GOBLINS.SUB_FACTION_RULES.SINGLE_CLAN_ONLY });
      }
    });
  }

  return result;
};

export { GoblinRules, rules };
