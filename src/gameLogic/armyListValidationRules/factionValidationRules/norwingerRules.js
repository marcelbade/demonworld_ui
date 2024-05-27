// functions and components
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
// constants
import { NORWINGER_TEXTS, SUMMONS_TEXTS } from "../../../constants/textsAndMessages";

const rules = [
  {
    subFaction: "barbarians",
    cardNames: [NORWINGER_TEXTS.SF.BARBARIANS],
    min: 0.2,
    max: 0.75,
    error: NORWINGER_TEXTS.SUB_FACTION_RULES.BARBARIANS,
  },
  {
    subFaction: "veterans",
    cardNames: [NORWINGER_TEXTS.SF.VETERANS],
    min: 0.0,
    max: 0.4,
    error: NORWINGER_TEXTS.SUB_FACTION_RULES.VETERANS,
  },

  {
    subFaction: "spellcasters",
    cardNames: [NORWINGER_TEXTS.SF.STORMLORD, NORWINGER_TEXTS.SF.WITCH],
    min: 0.0,
    max: 0.3,
    error: NORWINGER_TEXTS.SUB_FACTION_RULES.SPELLCASTERS,
  },

  {
    subFaction: "heroes",
    cardNames: [NORWINGER_TEXTS.SF.HEROES],
    min: 0.0,
    max: 0.3,
    error: NORWINGER_TEXTS.SUB_FACTION_RULES.HEROES,
  },
  {
    subFaction: "mightyNorthernBeings",
    cardNames: [NORWINGER_TEXTS.SF.MIGHTY_BEINGS],
    min: 0.0,
    max: 0.4,
    error: NORWINGER_TEXTS.SUB_FACTION_RULES.MIGHTY_NORTHERN_BEINGS,
  },
  {
    subFaction: "northernAllies",
    cardNames: [NORWINGER_TEXTS.SF.NORTHERN_ALLIES],
    min: 0.0,
    max: 0.25,
    error: NORWINGER_TEXTS.SUB_FACTION_RULES.NORTHERN_ALLIES,
  },
  {
    subFaction: "summons",
    cardNames: [SUMMONS_TEXTS.TYPE],
    min: 0.0,
    max: 1.0,
    error: SUMMONS_TEXTS.ERROR,
  },
];

const NorwingerRules = {
  testSubFactionRules: (data) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(
      data.selectedUnits, //
      data.availableUnits,
      data.totalPointsAllowance
    );
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(
      rules,
      data.selectedUnits,
      data.totalPointsAllowance,
      data.subFactions
    );
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(
      rules,
      data.selectedUnits,
      data.totalPointsAllowance,
      data.availableUnits
    );
    let hasNoCommander = globalRules.isArmyCommanderPresent(data.selectedUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (data.tournamentOverrideRules.enableOverride) {
      maxCopies = data.tournamentOverrideRules.maxNumber;
      heroPointCap = data.tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = 2;
      // faction rule => 50% cap
      heroPointCap = 50;
    }

    let testForMax2Result = globalRules.maximumCopiesOfUnit(data.selectedUnits, maxCopies);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      data.selectedUnits,
      data.totalPointsAllowance,
      data.availableUnits,
      heroPointCap
    );

    let isAboveCharLimit = globalRules.belowMaxPercentageHeroes(
      data.selectedUnits,
      data.totalPointsAllowance,
      data.availableUnits,
      heroPointCap
    );

    let hasDuplicateUniques = data.tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(data.selectedUnits)
      : [];

    // special faction rule
    let testForMountainKing = mountainKingRule(data.availableUnits, data.selectedUnits);
    let testForGiantYeti = yetiRule(data.availableUnits, data.selectedUnits);
    let testForNeander = neanderRule(data.availableUnits, data.selectedUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...isAboveCharLimit,
      ...testForHeroCapResult,
      ...testForMountainKing,
      ...testForGiantYeti,
      ...testForNeander,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    // Are there units that need to be removed from the list?
    let testForKingRemoval = mountainKingRuleRemove(data.selectedUnits);
    let testForYetiRemoval = yetiRuleRemove(data.selectedUnits);
    let testForNeanderRemoval = neanderRuleRemove(data.selectedUnits);

    validationResults.removeUnitsNoLongerValid = [
      ...testForKingRemoval, //
      ...testForYetiRemoval,
      ...testForNeanderRemoval,
    ];

    return validationResults;
  },
};

/**
 * Function implements the rule that for each Neander unit the list must also contain a
 * barbarian unit, excluding Snow Orgres.
 * @param {[unitCard]} availableUnits
 * @param {[unitCard]} selectedUnits
 * @returns an array of objects containing a blocked unit and an error message.
 */
const neanderRule = (availableUnits, selectedUnits) => {
  const MESSAGE = NORWINGER_TEXTS.SUB_FACTION_RULES.NEANDERS_RULE;

  const excludedBarbarianUnits = [NORWINGER_TEXTS.NEANDERS, NORWINGER_TEXTS.SNOW_OGRES];

  const barabarianCount = selectedUnits.filter(
    (u) => u.subFaction === NORWINGER_TEXTS.SF.BARBARIANS && !excludedBarbarianUnits.includes(u.unitName)
  ).length;

  const neandersCount = selectedUnits.filter((u) => u.unitName === NORWINGER_TEXTS.NEANDERS).length;

  let result = [];

  if (neandersCount === barabarianCount) {
    availableUnits
      .filter((u) => u.unitName === NORWINGER_TEXTS.NEANDERS)
      .forEach((u) => {
        result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
      });
  }
  return result;
};

/**
 * Function implements second part of the Neander Rule: if the army list contains more Neanders
 * then other barbarian units (excluding once again Snow Ogres), then Neander Units must be removed
 * until the rule is no longer violated.
 * @param {[unitCard]} selectedUnits
 * @returns an array of units that need to be removed from the army list immediately.
 */
const neanderRuleRemove = (selectedUnits) => {
  const excludedBarbarianUnits = [NORWINGER_TEXTS.NEANDERS, NORWINGER_TEXTS.SNOW_OGRES];
  const barabarianCount = selectedUnits.filter(
    (u) =>
      u.subFaction === NORWINGER_TEXTS.SF.BARBARIANS && //
      !excludedBarbarianUnits.includes(u.unitName)
  ).length;

  const neandersCount = selectedUnits.filter((u) => u.unitName === NORWINGER_TEXTS.NEANDERS).length;

  let result = [];

  let diff = neandersCount > barabarianCount;
  let tempArray = [...selectedUnits];

  while (diff > 0) {
    const neanderUnit = tempArray.find((u) => u.unitName === NORWINGER_TEXTS.NEANDERS);
    result.push(neanderUnit.uniqueID);

    const position = tempArray.findIndex((u) => u.unitName === NORWINGER_TEXTS.NEANDERS);
    tempArray = tempArray.splice(position, 1);

    diff--;
  }

  return result;
};

/**
 * Function implements the rule that a Giant Yeti can only be selected when at least one Yetikrieger unit is present.
 * @param {[unitCard]} availableUnits
 * @param {[unitCard]} selectedUnits
 * @returns an array of objects containing a blocked unit and an error message.
 */
const yetiRule = (availableUnits, selectedUnits) => {
  const MESSAGE = NORWINGER_TEXTS.SUB_FACTION_RULES.GIANT_YETI_RULE;
  const areYetisPresent = selectedUnits.filter((u) => u.unitName === NORWINGER_TEXTS.YETIS).length > 0;

  let result = [];

  if (!areYetisPresent) {
    availableUnits
      .filter((u) => u.unitName === NORWINGER_TEXTS.GIANT_YETI)
      .forEach((u) => {
        result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
      });
  }
  return result;
};

/**
 * Function removes all Giant Yetis when the army list contains no Yetikrieger units.
 * @param {[unitCard]} selectedUnits
 * @returns an array of units that need to be removed from the army list immediately.
 */
const yetiRuleRemove = (selectedUnits) => {
  const areGiantYetisPresent = selectedUnits.filter((u) => u.unitName === NORWINGER_TEXTS.GIANT_YETI).length > 0;
  const areYetisPresent = selectedUnits.filter((u) => u.unitName === NORWINGER_TEXTS.YETIS).length > 0;

  let result = [];

  if (areGiantYetisPresent && !areYetisPresent) {
    selectedUnits
      .filter((u) => u.unitName === NORWINGER_TEXTS.GIANT_YETI)
      .forEach((u) => {
        result.push(u.uniqueID);
      });
  }
  return result;
};

/**
 * Function implements the rule that the dwarves' mountain king can only be selected when at least one dwarf unit is present.
 * @param {[unitCard]} availableUnits
 * @param {[unitCard]} selectedUnits
 * @returns an array of objects containing a blocked unit and an error message.
 */
const mountainKingRule = (availableUnits, selectedUnits) => {
  const MESSAGE = NORWINGER_TEXTS.SUB_FACTION_RULES.MOUNTAIN_KING_RULE;
  const areAlliesPresent = selectedUnits.filter((u) => u.subFaction === NORWINGER_TEXTS.SF.NORTHERN_ALLIES).length > 0;

  let result = [];

  if (!areAlliesPresent) {
    const foundUnit = availableUnits.find((u) => u.unitName === NORWINGER_TEXTS.MOUNTAIN_KING);
    result.push({ unitBlockedbyRules: foundUnit.unitName, message: MESSAGE });
  }
  return result;
};

/**
 * Function removes the mountain king unit when the army list contains no dwarf units.
 * @param {[unitCard]} selectedUnits
 * @returns an array of units that need to be removed from the army list immediately.
 */
const mountainKingRuleRemove = (selectedUnits) => {
  const isMountainKingPresent = selectedUnits.filter((u) => u.unitName === NORWINGER_TEXTS.MOUNTAIN_KING).length > 0;
  const areAlliesPresent = selectedUnits.filter((u) => u.subFaction === NORWINGER_TEXTS.SF.NORTHERN_ALLIES).length > 0;

  let result = [];

  if (isMountainKingPresent && !areAlliesPresent) {
    const foundUnit = selectedUnits.find((u) => u.unitName === NORWINGER_TEXTS.MOUNTAIN_KING);
    result.push(foundUnit.uniqueID);
  }
  return result;
};

export { NorwingerRules, rules };
