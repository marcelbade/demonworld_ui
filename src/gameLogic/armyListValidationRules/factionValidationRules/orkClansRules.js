//  functions and components
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
//  constants
import { ORK_CLANS_TEXTS, ORKS_TEXTS } from "../../../constants/textsAndMessages";

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
    error: ORKS_TEXTS.SUB_FACTION_RULES.CHARACTERS,
  },
  {
    subFaction: "engines",
    cardNames: ["Gerät"],
    min: 0.0,
    max: 0.3,
    error: ORKS_TEXTS.SUB_FACTION_RULES.ENGINES,
  },
  {
    subFaction: "giants",
    cardNames: ["Giganten"],
    min: 0.0,
    max: 0.3,
    error: ORKS_TEXTS.SUB_FACTION_RULES.GIANTS,
  },
  {
    subFaction: "clantroops",
    cardNames: ["Clanntruppen"],
    min: 0.15,
    max: 0.65,
    error: "", // TODO change
  },
  {
    subFaction: "clanngett",
    cardNames: ["Clanngett"],
    min: 0.0,
    max: 0.5,
    error: ORKS_TEXTS.SUB_FACTION_RULES.CLANNGETT_MAX,
  },
  {
    subFaction: "wizards",
    cardNames: ["Zauberer"],
    min: 0.0,
    max: 0.3,
    error: ORKS_TEXTS.SUB_FACTION_RULES.WIZARDS,
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

    // special faction rules
    let goblinsAboveMax = checkForGoblinMax(
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits
    );

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...goblinsAboveMax,
    ];

    // result for sub factions below limit.
    validationResults.invalidSubFactions = [...isBelowSubFactionMin, ...hasNoCommander];

    validationResults.removeUnitsNoLongerValid = [];

    return validationResults;
  },
};

/**
 * Function implements the rule that Orks don't get allies, instead a fixed percentage of points casn be spent on Goblin units as part of the Clanngett troops.
 * @param {[unitCard]} selectedUnits
 * @param {Int} totalPointsAllowance
 * @param {[unitCard]} availableUnits
 * @returns
 */
const checkForGoblinMax = (selectedUnits, totalPointsAllowance, availableUnits) => {
  const goblinUnits = [ORKS_TEXTS.GOBLIN_MERCENARIES.SPIDER_RIDERS, ORKS_TEXTS.GOBLIN_MERCENARIES.SPIDER_ARCHERS];

  const GOBLIN_MAX_PERCENTAGE = 0.2;
  const goblinPointAllowance = totalPointsAllowance * GOBLIN_MAX_PERCENTAGE;

  let currentGoblinTotal = 0;
  let result = [];

  selectedUnits
    .filter((u) => goblinUnits.includes(u.unitName))
    .forEach((u) => {
      currentGoblinTotal += u.points;
      if (u.equipment.length > 0) {
        const itemCost = u.equipment.reduce((sum, { points }) => sum + points, 0);
        currentGoblinTotal += itemCost;
      }
    });

  availableUnits
    .filter((u) => goblinUnits.includes(u.unitName))
    .forEach((u) => {
      if (currentGoblinTotal + u.points > goblinPointAllowance) {
        result.push({ unitBlockedbyRules: u.unitName, message: ORKS_TEXTS.SUB_FACTION_RULES.GOBLIN_TEXTS });
      }
    });

  return result;
};

export { OrkClansRules, rules };
