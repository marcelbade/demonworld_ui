const NO_DUPLICATE_UNIQUES = "Die Liste darf einzigartige Einheiten nur einmal enthalten";
const MAXIMUM_OF_TWO_OF_EACH_MESSAGE = "Die Liste darf eine Einheit maximal 2x enthalten.";
const MAXIMUM_OF_35_PERCENT_HEROES_MESSAGE = "Die Liste darf maximal 35% Characktere und Helden enthalten.";
const DONT_EXCEED_THE_POINT_ALLOWANCE = "Die Liste darf die maximale Punktzahl nicht überschreiten.";

const globalRules = {
  /**
   * Function tests if a unit's point cost exceeds the max point allowance of the list if added.
   * @param {[unitCard obj]} selectedUnits array of already selected units.
   * @param {[unitCard obj]} availableUnits array of all units available for the list.
   * @param {int} armyPointsAllowance Maximum number of points that can be spent.
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  armyMustNotExceedMaxAllowance: (selectedUnits, availableUnits, armyPointsAllowance) => {
    let result = [];
    let spentPoints = 0;
    selectedUnits.forEach((u) => (spentPoints += u.points));

    selectedUnits.forEach((u) => u.points);

    availableUnits.forEach((aU) => {
      if (aU.points + spentPoints > armyPointsAllowance) {
        result.push({ unitBlockedbyRules: aU.unitName, message: DONT_EXCEED_THE_POINT_ALLOWANCE });
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
        result.push({ unitBlockedbyRules: uniqueUnit.unitName, message: NO_DUPLICATE_UNIQUES });
      });

    return result;
  },

  /**
   * Function tests whether a non-unique unit has been selected twice.
   * @param {[unitCard obj]} selectedUnits
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
   * @param {[unitCard obj]} selectedUnits array of already selected units.
   * @param {int} armyPointsAllowance Maximum number of points that can be spent.
   * @param {[unitCard obj]} availableUnits array of all units available for the list.
   * @param {int} allowedPercentage max percenttage that can be spent on heroes / magic users.
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  belowMaxPercentageHeroes: (selectedUnits, armyPointsAllowance, availableUnits, allowedPercentage) => {
    let heroTotal = 0;
    let max = armyPointsAllowance * (allowedPercentage / 100);
    let result = [];

    selectedUnits
      .filter((unit) => unit.unitType === "H" || unit.unitType === "M")
      .forEach((unit) => {
        heroTotal += unit.points;
      });

    availableUnits
      .filter((unit) => unit.unitType === "H" || unit.unitType === "M")
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
   * @param {[unitCard obj]} selectedUnits an array of unit card objects.
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
   *Function tests for all sub factions in the list whether they are above the min. point allowance for that sub faction.
   * @param {rule obj} rules rule object for army.
   * @param {[unitCard obj]} selectedUnits an array of unit card objects.
   * @param {int} maxArmyPoints max. army points allowance.
   * @returns array consisting of objects. Every object contains a unit that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  unitsBelowSubfactionMinimum: (rules, selectedUnits, maxArmyPoints) => {
    let result = [];

    rules
      .filter((rule) => rule.min > 0)
      .forEach((factionRule) => {
        const subFactionMin = maxArmyPoints * factionRule.min;
        const spentPoints = calculateCurrentlySpentPoints(selectedUnits, factionRule.cardNames);

        if (spentPoints < subFactionMin && !result.includes(factionRule.subFaction)) {
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
    return selectedUnits.filter((selectedUnit) => selectedUnit.commandStars >= 2) > 0;
  },
};

// private, non-exported functions

/**
 * Returns how many points have already been spent for a subfaction.
 */
const calculateCurrentlySpentPoints = (selectedUnits, subFaction) => {
  let actualValue = 0;

  selectedUnits.forEach((selectedUnit) => {
    if (subFaction.includes(selectedUnit.subFaction)) {
      actualValue += selectedUnit.points;
    }
  });

  return actualValue;
};

export default globalRules;
