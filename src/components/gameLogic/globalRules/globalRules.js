const NO_DUPLICATE_UNIQUES = "Die Liste darf einzigartige Einheiten nur einmal enthalten";
const MAXIMUM_OF_TWO_OF_EACH_MESSAGE = "Die Liste darf eine Einheit maximal 2x enthalten.";
const MAXIMUM_OF_35_PERCENT_HEROES_MESSAGE = "Die Liste darf maximal 35% Characktere und Helden enthalten.";

const globalRules = {
  /**
   *
   * @param {*} selectedUnits  array of selected units
   * @returns all unique units that have been selected.
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
   *
   * Test whether a unit has been selected twice.
   * @ignore when flag "noUnitMorethanTwice" is false!
   * @returns object with an array containing all units that must be blocked and an error message to
   * be displayed as a tool tip.
   */
  //TODO : ignore is missing
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
   *
   * Test if no more than 35% of the army list are heroes (or magic users)!
   * @ignore when flag "tournamentHeroLimit" is false!
   * @returns object with an array containing all units that must be bloked and an error message to
   * be displayed as a tool tip.
   */
  maxOf35PercentHeroes: (selectedUnits, armyTotalPoints, availableUnits) => {
    let heroTotal = 0;
    let max = armyTotalPoints * 0.35;
    let result = [];

    selectedUnits.forEach((unit) => {
      if (unit.unitType === "H" || unit.unitType === "M") {
        heroTotal += unit.points;
      }
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
   * test if the amount of points spent on the subfaction is between max and min values.
   */
  BlockUnitsExceedingMaxPoints: (rules, selectedUnits, maxArmyPoints, availableUnits) => {
    let result = [];

    rules.forEach((factionRule) => {
      const subFactionMax = maxArmyPoints * factionRule.max;

      const spentPoints = calculateActualPoints(selectedUnits, factionRule.cardNames);

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

  //TODO is availableUnits needed?
  subFactionsBelowMinimum: (rules, selectedUnits, maxArmyPoints, availableUnits) => {
    let result = [];

    rules
      .filter((rule) => rule.min > 0)
      .forEach((factionRule) => {
        const subFactionMin = maxArmyPoints * factionRule.min;
        const spentPoints = calculateActualPoints(selectedUnits, factionRule.cardNames);

        if (spentPoints < subFactionMin && !result.includes(factionRule.subFaction)) {
          result.push({ underMinimum: factionRule.subFaction, message: factionRule.error });
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
const calculateActualPoints = (selectedUnits, subFaction) => {
  let actualValue = 0;


  selectedUnits.forEach((selectedUnit) => {
    if (subFaction.includes(selectedUnit.subFaction)) {
      actualValue += selectedUnit.points;
    }
  });

  return actualValue;
};

export default globalRules;
