//  functions and components
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
//  constants
import { ORKS_TEXTS } from "../../../constants/textsAndMessages";
import { do2ArraysHaveCommonElements } from "../../../util/utilityFunctions";

const rules = [
  {
    subFaction: "unit",
    cardNames: ["Einheit"], // TODO this needs to be reset to "Einheit in Clanarmee"  / "Einheit in Clanngett-Armee" !!
    min: 0.25,
    max: 1.0,
    error: ORKS_TEXTS.SUB_FACTION_RULES.UNIT,
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
    min: 0.0,
    max: 0.4,
    error: "", // see below, set by switchBetweenAlternativeRules
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

const OrkClanngettRules = {
  testSubFactionRules: (validationData) => {
    // Switch between alternative ruule objects!
    switchBetweenAlternativeRules(validationData.selectedAlternativeLists, rules);

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
    let hasNoCommander = isOrkArmyCommanderPresent(
      validationData.selectedUnits, //
      validationData.availableUnits,
      validationData.selectedAlternativeLists,
      rules
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
 * Function changes the max. limits for the validationData.distinctSubFactions depending on which alternative army list has been selected.
 */
const switchBetweenAlternativeRules = (selectedAlternativeLists, testSubFactionRules) => {
  // console.log("a>A selectedAlternativeLists", selectedAlternativeLists);
  // if
};

/**
 * Function implements the rule that every Ork army needs a 2* commander. If it is a Clanngett list, it must also include at least one Clanngett hero.
 * @param {unitCard} selectedUnits
 * @returns true, if either a 2 * commander (clans) or a 2* commander and a Clanngett hero is present.
 */
const isOrkArmyCommanderPresent = (selectedUnits, availableUnits, selectedAlternativeLists, rules) => {
  let result = [];
  const clangett_heroes = ["Trazzag", "Fherniak", "Ärrig", "Khazzar", "Nallian"]; // TODO do not hard code
  const hasClanngettHeroes = do2ArraysHaveCommonElements(selectedUnits, clangett_heroes);

  if (selectedAlternativeLists.includes("Clanngett") && !hasClanngettHeroes) {
    result.push({
      invalidSubFaction: "Clanngett", //
      message: ORKS_TEXTS.CLANNGETT_COMMANDER,
    });
  }

  const globalResult = globalRules.isArmyCommanderPresent(selectedUnits, availableUnits, rules);

  return [...result, ...globalResult];
};

/**
 * Function implements the rule that Clanngett Orks don't get allies, instead a fixed percentage of points can
 * be spent on Goblin units as part of the Clanngett troops.
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
        result.push({
          unitBlockedbyRules: u.unitName, //
          subFaction: u.subFaction,
          message: ORKS_TEXTS.SUB_FACTION_RULES.GOBLIN_TEXTS,
        });
      }
    });

  return result;
};

export { OrkClanngettRules, rules };
