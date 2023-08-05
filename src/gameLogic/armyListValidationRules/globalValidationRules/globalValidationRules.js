import { HERO, MAGE } from "../../../constants/unitTypes";

const NO_DUPLICATE_UNIQUES_MESSAGE = "Die Liste darf einzigartige Einheiten nur einmal enthalten";
const MAXIMUM_OF_TWO_OF_EACH_MESSAGE = "Die Liste darf eine Einheit maximal 2x enthalten.";
const MAXIMUM_OF_35_PERCENT_HEROES_MESSAGE = "Die Liste darf maximal 35% Characktere und Helden enthalten.";
const DONT_EXCEED_THE_POINT_ALLOWANCE_MESSAGE = "Die Liste darf die maximale Punktzahl nicht überschreiten.";

const globalRules = {
  /**
   * Function tests if a unit's point cost exceeds the max point allowance of the list if added.
   * @param {[unitCard]} selectedUnits array of already selected units.
   * @param {[unitCard]} availableUnits array of all units available for the list.
   * @param {int} armyPointsAllowance Maximum number of points that can be spent.
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  armyMustNotExceedMaxAllowance: (selectedUnits, availableUnits, armyPointsAllowance) => {
    let result = [];
    let spentPoints = 0;
    selectedUnits.forEach((u) => (spentPoints += u.points));

    availableUnits.forEach((aU) => {
      if (aU.points + spentPoints > armyPointsAllowance) {
        result.push({ unitBlockedbyRules: aU.unitName, message: DONT_EXCEED_THE_POINT_ALLOWANCE_MESSAGE });
      }
    });

    return result;
  },

  /**
   * Function checks whether a unit has already been selected. if so, it is blocked.
   * @param {*} selectedUnits  array of selected units
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  noDuplicateUniques: (selectedUnits) => {
    const result = [];

    selectedUnits
      .filter((unit) => unit.uniqueUnit === true)
      .forEach((uniqueUnit) => {
        result.push({ unitBlockedbyRules: uniqueUnit.unitName, message: NO_DUPLICATE_UNIQUES_MESSAGE });
      });

    return result;
  },

  /**
   * Function tests whether a non-unique unit has been selected twice.
   * @param {[unitCard]} selectedUnits
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  maximumOfTwo: (selectedUnits) => {
    const result = [];

    for (let i = 0; i < selectedUnits.length - 1; i++) {
      const testedUnit = selectedUnits[i];

      for (let j = i + 1; j < selectedUnits.length; j++) {
        if (testedUnit.unitName === selectedUnits[j].unitName) {
          result.push({ unitBlockedbyRules: testedUnit.unitName, message: MAXIMUM_OF_TWO_OF_EACH_MESSAGE });
        }
      }
    }
    return result;
  },

  /**
   * Function tests if a heroe's / magic User's point cost exceeds the max. if added.
   * @param {[unitCard]} selectedUnits array of already selected units.
   * @param {int} armyPointsAllowance Maximum number of points that can be spent.
   * @param {[unitCard]} availableUnits array of all units available for the list.
   * @param {int} allowedPercentage max percenttage that can be spent on heroes / magic users.
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  belowMaxPercentageHeroes: (selectedUnits, armyPointsAllowance, availableUnits, allowedPercentage) => {
    let heroTotal = 0;
    let max = armyPointsAllowance * (allowedPercentage / 100);
    let result = [];

    selectedUnits
      .filter((unit) => unit.unitType === HERO || unit.unitType === MAGE)
      .forEach((unit) => {
        heroTotal += unit.points;
      });

    availableUnits
      .filter((unit) => unit.unitType === HERO || unit.unitType === MAGE)
      .forEach((hero) => {
        if (hero.points + heroTotal > max) {
          result.push({ unitBlockedbyRules: hero.unitName, message: MAXIMUM_OF_35_PERCENT_HEROES_MESSAGE });
        }
      });

    return result;
  },

  /**
   * Function tests for all sub factions in the list whether they are below the max. point allowance for that sub faction.
   * @param {rule obj} rules rule object for army.
   * @param {[unitCard]} selectedUnits an array of unit card objects.
   * @param {int} maxArmyPoints max. army points allowance.
   * @param {*} availableUnits all units available for the army list.
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  unitsAboveSubFactionMax: (rules, selectedUnits, maxArmyPoints, availableUnits) => {
    let result = [];

    rules.forEach((factionRule) => {
      const subFactionMax = maxArmyPoints * factionRule.max;

      const spentPoints = calculateCurrentlySpentPoints(selectedUnits, factionRule.cardNames);

      availableUnits
        .filter((availableUnit) => factionRule.cardNames.includes(availableUnit.subFaction))
        .forEach((subFactionUnit) => {
          if (subFactionUnit.points + spentPoints > subFactionMax) {
            result.push({ unitBlockedbyRules: subFactionUnit.unitName, message: factionRule.error });
          }
        });
    });

    return result;
  },

  /**
   *Function tests for all sub factions in the list whether they are above the minimum point allowance for that sub faction.
   * @param {rule obj} rules rule object for army.
   * @param {[unitCard]} selectedUnits an array of unit card objects.
   * @param {int} maxArmyPoints max. army points allowance.
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  unitsBelowSubfactionMinimum: (rules, selectedUnits, maxArmyPoints, subFactions) => {
    let result = [];

    rules
      .filter((rule) => rule.min > 0)
      .forEach((factionRule) => {
        const subFactionMin = maxArmyPoints * factionRule.min;
        const spentPoints = calculateCurrentlySpentPoints(selectedUnits, factionRule.cardNames);

        if (spentPoints < subFactionMin && !result.includes(factionRule.subFaction) && subFactions.includes(factionRule.cardNames[0])) {
          result.push({ underMinimum: factionRule.cardNames, message: factionRule.error });
        }
      });

    return result;
  },

  /**
   * Test whether the army has a valid army commander in accordance w. the tournament rules.
   * @param {*} selectedUnits array of all selected unit objects
   * @returns boolean flag
   */
  isArmyCommanderPresent: (selectedUnits) => {
    const potentialCommanders = selectedUnits.filter((selectedUnit) => selectedUnit.commandStars >= 2);
    return potentialCommanders.length > 0;
  },
  /**
   * Function tests whether no more than 50% of the point allowance have been spent on heroes and mages.
   * @param {[unitCard]} selectedUnitsarray of all units already selected by user
   * @param {unitCard obj} availableUnits list of all unselected units still available
   * @param {int} totalPointsAllowance max. points the user can spent on the list
   * @returns an array. Each entry contains the name of the unit that is blocked by this rule and a message for the user with the block reason.
   */
  NoMoreThanHalfOnCharacters: (selectedUnits, availableUnits, totalPointsAllowance) => {
    const HERO_CAP = 0.5;
    const NO_MORE_THAN_HALF_ON_CHARS_MESSAGE = "Du darfst höchstens 50% der Punkte für Helden, Befehlshaber und Magier ausgeben.";

    let result = [];
    let pointsSpentOnChars = 0;

    selectedUnits.filter((su) => su.unitType === HERO || su.unitType === MAGE).forEach((char) => (pointsSpentOnChars += char.points));

    availableUnits
      .filter((aU) => aU.unitType === HERO || aU.unitType === MAGE)
      .forEach((char) => {
        if (char.points + pointsSpentOnChars > totalPointsAllowance * HERO_CAP) {
          result.push({ unitBlockedbyRules: char.unitName, message: NO_MORE_THAN_HALF_ON_CHARS_MESSAGE });
        }
      });

    return result;
  },
};

// private, non-exported functions

/**
 * Function returns how many points have already been spent for a subfaction.
 */
const calculateCurrentlySpentPoints = (selectedUnits, subFaction) => {
  let actualValue = 0;

  selectedUnits.forEach((selectedUnit) => {
    if (subFaction.includes(selectedUnit.subFaction)) {
      actualValue += selectedUnit.points;
    }
    if (subFaction.includes(selectedUnit.subFaction) && selectedUnit.equipment.length > 0) {
      const equipmentTotal = calculateEquipmentCost(selectedUnit);
      actualValue += equipmentTotal;
    }
  });

  return actualValue;
};

/**
 * Function calculates the net cost for a unit's equipment.
 * @param {unitCard Obj} selectedUnit
 * @returns  total point cost for a unit's equipment.
 */
const calculateEquipmentCost = (selectedUnit) => {
  let sum = 0;

  selectedUnit.equipment.forEach((item) => {
    sum += item.points;
  });

  return sum;
};

export default globalRules;
