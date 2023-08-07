/*
 * additional rule
 * - EVERY UNIT, ARTILLERY PIECE, CHAMPION,... WITH THE EXCEPTION OF DORGAPRIESTS, CHURCH UNITS AND GARYDWEN MUST BE ASSIGNED TO A TRIBE
 *  - tribal champions can only be selected when at least ONE unit of the tribe has been selected
 *  - for every veteran unit of a tribe you need ONE tribal unit
 *  - Dorga priests can only be selected if at least ONE church unit has been selected
 *  - in addition to the maximum for shamans and heroes/champions the points for champions/heroes AND shamans must be <= 50
 *  - for every FULL 10% of shamans, the maximum for church/droga units is lowered by 10%
 *    * e.g. 25% shamans -> -20% for church units
 *
 * */

// TODO: correct subfations for thain, percentages

import { THAIN_TRIBES } from "../../../constants/factions";
import { UNIT } from "../../../constants/itemShopConstants";
import { MAGE } from "../../../constants/unitTypes";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "tribalWarriors",
    cardNames: ["Stammeskrieger"],
    min: 0.2,
    max: 0.8,
    error: "Deine Armeeliste muss zu 10% bis 60% aus Stammeskriegern bestehen.",
  },

  {
    subFaction: "Veterans",
    cardNames: ["Veteranen der Stämme"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Veteranen bestehen.",
  },

  {
    subFaction: "shamans",
    cardNames: ["Schamane"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Schamamen bestehen.",
  },
  {
    subFaction: "GreatChampionsHeroesCommanders",
    cardNames: ["Groß-Champions / Helden / Befehlshaber"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Groß-Champions, Helden und Befehlshabern bestehen.",
  },
  {
    subFaction: "Gar'Ydwen",
    cardNames: ["Gar'Ydwen"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Gar'ydwen bestehen.",
  },
  {
    subFaction: "dorgaChurch",
    cardNames: ["Dorga-Kirche"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten der Dorga-Kirche bestehen.",
  },
];

const MAX_HERO_PERCENTAGE = 50;

const ThainRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      selectedUnits,
      totalPointsAllowance,
      availableUnits,
      MAX_HERO_PERCENTAGE
    );

    // special faction rules
    dorgaVsShamans(selectedUnits, totalPointsAllowance);
    let testForChampionRule = greatChampionRule(selectedUnits);
    let testForDorgaRule = dorgaPriestRule(selectedUnits, availableUnits);
    let testForVeteranRule = veteranRule(selectedUnits, availableUnits);
    let testForChurchRemovel = dorgaPriestRemove(selectedUnits, availableUnits);

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

    // Are there units that need to be removed from the list?
    validationResults.removeUnitsNoLongerValid = [
      ...testForChurchRemovel, //
    ];

    return validationResults;
  },
};

//SPECIAL FACTION RULES

// TODO: missing rules
/**
 *   - every unit in the army except for Gar'ydwen and Dorga-Church MUST(!) be allocated to one of the tribes.
 
 */

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

/**
 * Function implements the rule that the great champion of a tribe can only be picked, if the player has already picked at least one unit of the tribe.
 * @param {[unitCard]} selectedUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const greatChampionRule = (selectedUnits) => {
  let result = [];

  const MESSAGE =
    "Der Groß-Champion eines Stammes kann nur aufgestellt werden, wenn vorher mindestens 1 Einheit des Stammes ausgewählt wurde.";

  const championTribeMapping = [
    { tribe: "Eberstamm", hero: "Arr'ydwen der wilde Eber" },
    { tribe: "Bärenstamm", hero: "Bold'dyrr der einäugige Bär" },
    { tribe: "Wolfsstamm", hero: "Dargorkon'yaghar d. Winterwolf" },
    { tribe: "Berglöwenstamm", hero: "Muryan der Berglöwe" },
    { tribe: "Adlerstamm", hero: "Har'anyrrd der Späher" },
  ];

  let presentTribes = selectedUnits.filter((u) => THAIN_TRIBES.includes(u.secondSubFaction)).map((u) => u.secondSubFaction);
  let missingTribes = THAIN_TRIBES.filter((u) => !presentTribes.includes(u));

  championTribeMapping.forEach((m) => {
    if (missingTribes.includes(m.tribe)) {
      result.push({ unitBlockedbyRules: m.hero, message: MESSAGE });
    }
  });

  return result;
};

//TODO not finished!
/**
 * Function implements the second part of the champion rule:
 * if there are no longer any tribal units in the list, all champion in the list need to be removed.
 * @returns an array of units that need to be removed from the army list automatically.
 */
const greatChampionRemove = (selectedUnits) => {
  let result = [];

  let isTribalUnitpresent = selectedUnits.filter((u) => u.subFaction === "Dorga-Kirche" && u.unitType === UNIT).length > 0;

  if (!isTribalUnitpresent) {
    selectedUnits
      .filter((u) => u.subFaction === "Veteranen der Stämme")
      .forEach((u) => {
        result.push(u);
      });
  }
  return result;
};

/**
 * Function implements the rule that a Dorga priest can only be picked, if the player has already picked at least one Dorga church unit.
 * @param {[unitCard]} selectedUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const dorgaPriestRule = (selectedUnits, availableUnits) => {
  let result = [];

  const MESSAGE = "Dorga-Priester können nur aufgestellt werden, wenn vorher mindestens 1 Einheit der Dorga-Kirche ausgewählt wurde.";

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

  let isDorgaUnitpresent = selectedUnits.filter((u) => u.subFaction === "Dorga-Kirche" && u.unitType === UNIT).length > 0;

  if (!isDorgaUnitpresent) {
    selectedUnits
      .filter((u) => u.subFaction === "Dorga-Kirche")
      .forEach((u) => {
        result.push(u);
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
  let result = [];

  const MESSAGE =
    "Einheiten und jedes Geräte der Veteranen der Stämme  können nur aufgestellt werden, wenn vorher mindestens 1 Einheit von Stammeskriegern desselben Stammes aufgestellt ausgewählt wurde.";

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

//TODO not finished!
/**
 * Function implements the second part of the veteran rule:
 * if there are no longer any tribal units in the list, all veterans in the list need to be removed.
 * @returns an array of units that need to be removed from the army list automatically.
 */
const tribalVeteranRemove = (selectedUnits) => {
  let result = [];

  let isTribalUnitpresent = selectedUnits.filter((u) => u.subFaction === "Stammeskrieger" && u.unitType === UNIT).length > 0;

  if (!isTribalUnitpresent) {
    selectedUnits
      .filter((u) => u.subFaction === "Veteranen der Stämme")
      .forEach((u) => {
        result.push(u);
      });
  }
  return result;
};

export { ThainRules, rules };
