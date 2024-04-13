import { CITY_STATES, SUMMONS } from "../../../constants/textsAndMessages";
import { MAGE, HERO, UNIT, GIANT } from "../../../constants/unitTypes";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "provincialTroops",
    min: 0.3,
    max: 1.0,
    cardNames: [CITY_STATES.SF.PROVINCIAL],
    error: CITY_STATES.SF_RULES.PROVINCIAL,
  },
  {
    subFaction: "northernTroops",
    min: 0.0,
    max: 0.5,
    cardNames: [CITY_STATES.SF.NORTH],
    error: CITY_STATES.SF_RULES.NORTH,
  },
  {
    subFaction: "southernTroops",
    min: 0.0,
    max: 0.5,
    cardNames: [CITY_STATES.SF.SOUTH],
    error: CITY_STATES.SF_RULES.SOUTH,
  },
  {
    subFaction: "orderOfTrueFaith",
    min: 0.0,
    max: 0.4,
    cardNames: [CITY_STATES.SF.ORDER],
    error: CITY_STATES.SF_RULES.ORDER,
  },

  {
    subFaction: "brotherhoodOfSand",
    min: 0.0,
    max: 0.4,
    cardNames: [CITY_STATES.SF.BROTHERHOOD],
    error: CITY_STATES.SF_RULES.BROTHERHOOD_OF_SAND,
  },
  {
    subFaction: "Summons",
    min: 0.0,
    max: 0.0,
    cardNames: ["Beschwörung"],
    error: SUMMONS.ERROR,
  },
];

const SouthernCityStatesRules = {
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

    // special faction rules

    let testForBrotherhoodOrOrder = brotherhoodOrOrder(validationData.selectedUnits, validationData.availableUnits);
    let testForHeroMagicianTotal = totalPointsForMagiciansAndHeroes(
      validationData.selectedUnits,
      validationData.availableUnits,
      validationData.totalPointsAllowance
    );
    let testNorthernRegion = regionRule(validationData.selectedUnit, validationData.availableUnits, NORTHERN_REGION_TROOPS, MESSAGE_NORTH);
    let testSouthernthernRegion = regionRule(
      validationData.selectedUnit,
      validationData.availableUnits,
      SOUTHERN_REGION_TROOPS,
      MESSAGE_SOUTH
    );

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...testForBrotherhoodOrOrder,
      ...testForHeroMagicianTotal,
      ...testNorthernRegion,
      ...testSouthernthernRegion,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    // Are there units that need to be removed from the list?
    let testNorthernRegionRemove = regionalArmyRemove(validationData.selectedUnit, NORTHERN_REGION_TROOPS);
    let testSouthernRegionRemove = regionalArmyRemove(validationData.selectedUnit, SOUTHERN_REGION_TROOPS);

    validationResults.removeUnitsNoLongerValid = [
      ...testNorthernRegionRemove, //
      ...testSouthernRegionRemove,
    ];

    return validationResults;
  },
};

//SPECIAL FACTION RULES

/**
 * Function implements the "Brotherhood vs. Order" Rule. An Army of the Southern City States can contain either Brotherhood OR Order troops up to the given percentage.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const brotherhoodOrOrder = (selectedUnits, availableUnits) => {
  const MESSAGE = CITY_STATES.ERRORS.BROTHERHOOD_ORDER;
  let FACTIONS = [
    CITY_STATES.SF.ORDER_OF_TRUE_FAITH, //
    CITY_STATES.SF.BROTHERHOOD_OF_SAND,
  ];

  let result = [];

  let presentFaction = selectedUnits.filter((u) => FACTIONS.includes(u.subFaction)).map((u) => u.subFaction)[0];

  if (presentFaction !== undefined) {
    const blockedFaction = FACTIONS.filter((f) => !presentFaction.includes(f))[0];

    availableUnits
      .filter((u) => u.subFaction === blockedFaction)
      .forEach((u) => {
        result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
      });
  }

  return result;
};

// special rules implementations

const NORTHERN_REGION_TROOPS = {
  name: CITY_STATES.SF.NORTHERN_TROOPS,
  units: (availableUnits) => {
    return availableUnits.filter((u) => u.subFaction === CITY_STATES.SF.NORTH);
  },
};
const SOUTHERN_REGION_TROOPS = {
  name: CITY_STATES.SF.NORTHERN_TROOPS,
  units: (availableUnits) => {
    return availableUnits.filter((u) => u.subFaction === CITY_STATES.SF.SOUTH);
  },
};

const MESSAGE_SOUTH = CITY_STATES.ERRORS.REGION_HEROES_SOUTH;
const MESSAGE_NORTH = CITY_STATES.ERRORS.REGION_HEROES_NORTH;


/**
 * The army can only consist of 40% shamans and heroes.
 * @param {[unitcard]} selectedUnits
 * @param {int} totalPointsAllowance
 * @returns an array where each element is an object with blocked unit and an error message giving the reaosn
 * for the block.
 */
// TODO: remove function missing, make function global since there are several armies with this logic. This army needs the function twice: heroes/wizards and giants.
const totalPointsForMagiciansAndHeroes = (selectedUnits, availableUnits, totalPointsAllowance) => {
  const MAGICIAN_AND_HEROES_LIMIT = 40;
  const max_percentage = (totalPointsAllowance * MAGICIAN_AND_HEROES_LIMIT) / 100;

  let shamansAndHeroesTotal = 0;
  let result = [];

  selectedUnits
    .filter((u) => u.unitType === HERO || u.unitType === MAGE)
    .forEach((u) => {
      shamansAndHeroesTotal = shamansAndHeroesTotal + u.points;
    });

  availableUnits
    .filter((u) => u.unitType === HERO || u.unitType === MAGE)
    .forEach((u) => {
      if (shamansAndHeroesTotal + u.points > max_percentage) {
        result.push({ unitBlockedbyRules: u.unitName, message: CITY_STATES.ERRORS.MAX_LIMIT_CHARACTERS });
      }
    });

  return result;
};

/**
 * Function implements the rule for the regional troops. Heroes of the south (north) can only be selected if at least one unit of the south (north) has been selected first.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const regionRule = (selectedUnits, availableUnits, region, message) => {
  let result = [];
  let areRegionalUnitsPresent =
    selectedUnits.filter((selectedUnits) => region.units(availableUnits).includes(selectedUnits.unitName)).length > 0;

  if (!areRegionalUnitsPresent) {
    availableUnits
      .filter((u) => u.subFaction === region.name && (u.unitType === UNIT || u.unitType === GIANT))
      .forEach((u) => {
        result.push({ unitBlockedbyRules: u.unitName, message: message });
      });
  }
  return result;
};

/**
 * Function implements the rule for the heroes / magicians of the provincial troops:
 * if the army list contains no provincial units but
 * still contains provincial heroes / magicians, they are removed.
 * @param {[unitCard]} selectedUnits
 * @returns array of units that need to be removed from the army list automatically.
 */
const regionalArmyRemove = (selectedUnits, region) => {
  let result = [];

  let areProvincialUnitsPresent = selectedUnits.filter((selectedUnit) => region.units.includes(selectedUnit.unitName)).length > 0;

  if (!areProvincialUnitsPresent) {
    selectedUnits
      .filter((u) => u.subFaction === region.name)
      .forEach((u) => {
        result.push(u);
      });
  }
  return result;
};

export { SouthernCityStatesRules, rules };
