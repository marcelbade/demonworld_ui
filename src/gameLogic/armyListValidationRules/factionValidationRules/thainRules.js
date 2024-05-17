//  functions and components
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
//  constants
import { EXCEMPT_FROM_TRIBES_RULE, THAIN_TRIBES } from "../../../constants/factions";
import { UNIT, MAGE } from "../../../constants/unitTypes";
import { THAIN_TEXTS } from "../../../constants/textsAndMessages";

const rules = [
  {
    subFaction: "tribalWarriors",
    cardNames: ["Stammeskrieger"],
    min: 0.2,
    max: 0.8,
    error: THAIN_TEXTS.SUB_FACTION_RULES.TRIBAL_WARRIORS,
  },

  {
    subFaction: "Veterans",
    cardNames: ["Veteranen der Stämme"],
    min: 0.0,
    max: 0.5,
    error: THAIN_TEXTS.SUB_FACTION_RULES.VETERANS,
  },

  {
    subFaction: "shamans",
    cardNames: ["Schamane"],
    min: 0.0,
    max: 0.5,
    error: THAIN_TEXTS.SUB_FACTION_RULES.SHAMANS,
  },
  {
    subFaction: "GreatChampionsHeroesCommanders",
    cardNames: ["Groß-Champions / Helden / Befehlshaber"],
    min: 0.0,
    max: 0.3,
    error: THAIN_TEXTS.SUB_FACTION_RULES.GREATCHAMPIONS_HEROES_COMMANDERS,
  },
  {
    subFaction: "Gar'Ydwen",
    cardNames: ["Gar'Ydwen"],
    min: 0.0,
    max: 0.4,
    error: THAIN_TEXTS.SUB_FACTION_RULES.GAR_Y_DWEN,
  },
  {
    subFaction: "dorgaChurch",
    cardNames: ["Dorga-Kirche"],
    min: 0.0,
    max: 0.4,
    error: THAIN_TEXTS.SUB_FACTION_RULES.DORGA_CHURCH,
  },
];

const ThainRules = {
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
      // faction rule => 50% cap
      heroPointCap = 50;
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
    dorgaVsShamans(validationData.selectedUnits, validationData.totalPointsAllowance);
    let testForChampionRule = greatChampionRule(validationData.selectedUnits);
    let testForDorgaRule = dorgaPriestRule(validationData.selectedUnits, validationData.availableUnits);
    let testForVeteranRule = veteranRule(validationData.selectedUnits, validationData.availableUnits);
    let testForChurchRemoval = dorgaPriestRemove(validationData.selectedUnits, validationData.availableUnits);
    let testForVeteranRemoval = tribalVeteranRemove(validationData.selectedUnits, validationData.availableUnits);
    let testForChampionRemoval = greatChampionRemove(validationData.selectedUnits, validationData.availableUnits);
    let testForassignedTribe = allUnitsNeedTribes(validationData.selectedUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...testForChampionRule,
      ...testForDorgaRule,
      ...testForVeteranRule,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    // result - is there a unit that needs a second subFaction?
    validationResults.secondSubFactionMissing = [
      ...testForassignedTribe, //
    ];

    // Are there units that need to be removed from the list?
    validationResults.removeUnitsNoLongerValid = [
      ...testForChurchRemoval, //
      ...testForVeteranRemoval,
      ...testForChampionRemoval,
    ];

    return validationResults;
  },
};

//SPECIAL FACTION RULES

/**
 * Every Thain unit - with the exception of giant animals, Dorga Church units, Summons and the Banner of the High King must be assigned a tribe, i.e., the secondSubFaction attribute must be chagned to one of the values in the tribes list.
 * @param {[unitCard]}  electedUnits
 * @returns an array with all units that still must be assigned a tribe (secondSubFaction).
 */
const allUnitsNeedTribes = (selectedUnits) => {
  let result = [];
  const MESSAGE = THAIN_TEXTS.ERRORS.TRIBE_MESSAGE;

  selectedUnits
    .filter((u) => !EXCEMPT_FROM_TRIBES_RULE.includes(u.unitName))
    .forEach((u) => {
      if (u.secondSubFaction === u.subFaction) {
        result.push({ unitWithOutSecondSubFaction: u.unitName, message: MESSAGE });
      }
    });

  return result;
};

/**
 * Function implements a special faction rule - per full 10% of the max point allowance spent on the Dorga Church, your point allowance for the shamans decreases by 10% and vice versa. Note that the algorithm is different from all the other validator logic - it does not create a list of unit Card objects that are added to a "block list", it instead directly decreases the limit.
 * @param {[unitCard]} selectedUnits
 * @param {int} totalPointsAllowance
 */
const dorgaVsShamans = (selectedUnits, totalPointsAllowance) => {
  let increment = 10;
  let netTotalChurch = 4;
  let netTotalShamans = 5;

  let church = "Dorga-Kirche";
  let churchOpposite = "shamans";
  let shamans = "Schamane";
  let shamansOpposite = "dorgaChurch";

  // start at the end - with the last unit picked
  if (selectedUnits !== undefined && selectedUnits.length > 0) {
    for (let i = selectedUnits.length - 1; i >= 0; i--) {
      if (church === selectedUnits[i].subFaction) {
        decreaseAllowance(increment, netTotalChurch, church, churchOpposite, selectedUnits, totalPointsAllowance);
      }
      if (shamans === selectedUnits[i].subFaction) {
        decreaseAllowance(increment, netTotalShamans, shamans, shamansOpposite, selectedUnits, totalPointsAllowance);
      }
    }
  }
};

/**
 * Function caclulates how much has been spent on subFaction A and decreases the point allowance for the opposing subFaction B accordingly.
 * @param {int} incrmeent
 * @param {int} netTotal
 * @param {[String]} subFaction
 * @param {String} subFactionOpposite
 * @param {[unitCard]} selectedUnits
 * @param {int} totalPointsAllowance
 */
const decreaseAllowance = (increment, netTotal, subFaction, subFactionOpposite, selectedUnits, totalPointsAllowance) => {
  let pointsSpent = 0;

  selectedUnits
    .filter((sU) => subFaction === sU.subFaction)
    .forEach((unit) => {
      pointsSpent += unit.points;
    });

  const percentage = pointsSpent * (100 / totalPointsAllowance);
  const share = Math.floor(percentage / increment);

  const remainder = netTotal - share;
  let opposingFaction = rules.filter((r) => r.subFaction === subFactionOpposite)[0];

  opposingFaction.max = remainder * 0.1;
};

const championTribeMapping = [
  { tribe: "Eberstamm", hero: "Arr'ydwen der wilde Eber" },
  { tribe: "Bärenstamm", hero: "Bold'dyrr der einäugige Bär" },
  { tribe: "Wolfsstamm", hero: "Dargorkon'yaghar d. Winterwolf" },
  { tribe: "Berglöwenstamm", hero: "Muryan der Berglöwe" },
  { tribe: "Adlerstamm", hero: "Har'anyrrd der Späher" },
];

/**
 * Function implements the rule that the great champion of a tribe can only be picked, if the player has already picked at least one unit of the tribe.
 * @param {[unitCard]} selectedUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const greatChampionRule = (selectedUnits) => {
  let result = [];

  const MESSAGE = THAIN_TEXTS.ERRORS.CHAMPION_MESSAGE;

  let presentTribes = selectedUnits.filter((u) => THAIN_TRIBES.includes(u.secondSubFaction)).map((u) => u.secondSubFaction);
  let missingTribes = THAIN_TRIBES.filter((u) => !presentTribes.includes(u));

  championTribeMapping.forEach((m) => {
    if (missingTribes.includes(m.tribe)) {
      result.push({ unitBlockedbyRules: m.hero, message: MESSAGE });
    }
  });

  return result;
};

/**
 * Function implements the second part of the champion rule:
 * if there are no longer any tribal units in the list, all champion in the list need to be removed.
 * @returns an array of units that need to be removed from the army list automatically.
 */
const greatChampionRemove = (selectedUnits) => {
  let result = [];
  let found = [];

  selectedUnits.forEach((u) => {
    championTribeMapping.forEach((ctm) => {
      if (ctm.tribe === u.unitName) {
        found.push(u.unitName);
      }
      if (ctm.hero === u.unitName) {
        found.push(u.uniqueID);
      }
    });
  });

  championTribeMapping.forEach((ctm) => {
    if (!found.includes(ctm.tribe) && found.includes(ctm.hero)) {
      result.push(selectedUnits.filter((u) => u.unitName === ctm.hero)[0]);
    }
  });

  return result;
};

/**
 * Function implements the rule that a Dorga priest can only be picked, if the player has already picked at least one Dorga church unit.
 * @param {[unitCard]} selectedUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const dorgaPriestRule = (selectedUnits, availableUnits) => {
  let result = [];

  const MESSAGE = THAIN_TEXTS.ERRORS.DORGA_MESSAGE;

  let listHasDorgaUnit = selectedUnits.filter((u) => u.subFaction === "Dorga-Kirche" && u.unitType === UNIT).length > 0;

  if (!listHasDorgaUnit) {
    availableUnits
      .filter((u) => u.subFaction === "Dorga-Kirche" && u.unitType === MAGE)
      .forEach((u) => {
        result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
      });
  }

  return result;
};

/**
 * Function implements the second part of the Dorga Church rule:
 * if there are no longer any church units in the list, all Dorga Priests in the list need to be removed.
 * @returns an array of units that need to be removed from the army list automatically.
 */
const dorgaPriestRemove = (selectedUnits) => {
  let result = [];

  let isDorgaUnitPresent = selectedUnits.filter((u) => u.subFaction === "Dorga-Kirche" && u.unitType === UNIT).length > 0;

  if (!isDorgaUnitPresent) {
    selectedUnits
      .filter((u) => u.subFaction === "Dorga-Kirche")
      .forEach((u) => {
        result.push(u.uniqueID);
      });
  }
  return result;
};

/**
 * Function implements the rule that a veteran unit (including artillery) can only be picked, if the player has already picked at least one non-veteran unit of the same tribe.
 * @param {[unitCard]} selectedUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const veteranRule = (selectedUnits, availableUnits) => {
  const MESSAGE = THAIN_TEXTS.ERRORS.VETERAN_MESSAGE;

  let result = [];

  let presentTribes = selectedUnits
    .filter((u) => u.subFaction === "Stammeskrieger" && THAIN_TRIBES.includes(u.secondSubFaction))
    .map((u) => u.secondSubFaction);

  let missingTribes = THAIN_TRIBES.filter((u) => !presentTribes.includes(u));

  availableUnits
    .filter((u) => u.subFaction === "Veteranen der Stämme" && missingTribes.includes(u.secondSubFaction))
    .forEach((u) => {
      result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
    });

  return result;
};

/**
 * Function implements the second part of the veteran rule:
 * if there are no longer any tribal units in the list, all veterans in the list need to be removed.
 * @returns an array of units that need to be removed from the army list automatically.
 */
const tribalVeteranRemove = (selectedUnits) => {
  let result = [];

  const presentTribes = selectedUnits
    .filter((u) => u.subFaction === "Stammeskrieger" && u.secondSubFaction !== "Stammeskrieger")
    .map((u) => u.secondSubFaction);

  selectedUnits.forEach((u) => {
    if (u.subFaction === "Veteranen der Stämme" && !presentTribes.includes(u.secondSubFaction)) {
      result.push(u.uniqueID);
    }
  });

  return result;
};

export { ThainRules, rules };
