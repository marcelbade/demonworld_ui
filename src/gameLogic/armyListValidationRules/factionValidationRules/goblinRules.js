import { GOBLINS } from "../../../constants/textsAndMessages";
import { HERO, MAGE } from "../../../constants/unitTypes";
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
  testSubFactionRules: (
    availableUnits,
    selectedUnits,
    totalPointsAllowance,
    subFactions,
    selectedAlternativeList,
    tournamentOverrideRules,
    listOfAlliedUnits
  ) => {
    const MAX_COPIES = 2;
    // faction rule => 30% cap
    const HERO_LIMIT = 30;

    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (tournamentOverrideRules.enableOverride) {
      maxCopies = tournamentOverrideRules.maxNumber;
      heroPointCap = tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = MAX_COPIES;

      heroPointCap = HERO_LIMIT;
    }

    let testForMax2Result = globalRules.maximumCopiesOfUnit(selectedUnits, maxCopies);
    // let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(selectedUnits, totalPointsAllowance, availableUnits, heroPointCap);

    let hasDuplicateUniques = tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(selectedUnits)
      : [];

    // special faction rules
    let testForTotalShamanAndHeroesLimit = totalPointsForShamansAndHeroes(selectedUnits, availableUnits, totalPointsAllowance);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      // ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...testForTotalShamanAndHeroesLimit,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    return validationResults;
  },
};

//FACTION SPECIAL RULES

/**
 * The army can only consist of 30% shamans and heroes.
 * @param {[unitcard]} selectedUnits
 * @param {int} totalPointsAllowance
 * @returns an array where each element is an object with blocked unit and an error message giving the reaosn
 * for the block.
 */
const totalPointsForShamansAndHeroes = (selectedUnits, availableUnits, totalPointsAllowance) => {
  const SHAMAN_AND_HEROES_LIMIT = 40;
  const limit = (totalPointsAllowance * SHAMAN_AND_HEROES_LIMIT) / 100;

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
      if (shamansAndHeroesTotal + u.points > limit) {
        result.push({ unitBlockedbyRules: u.unitName, message: GOBLINS.ERRORS.SHAMAN_AND_HEROES });
      }
    });

  return result;
};

export { GoblinRules, rules };
