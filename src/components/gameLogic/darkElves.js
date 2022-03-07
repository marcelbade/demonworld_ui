import React, { useState } from "react";
import { operators } from "../../constants/operators";

/**
 *
 * @param {*} selectedUnit - the unit added or deleted from the current list
 * @param {*} ARMY_POINTS_TOTAL the maximum point allowance for the entire army
 * @param {*} operator - gives the math operator to use - add or subtract
 * @returns
 */
export const DarkElveRules = (armyList, ARMY_POINTS_TOTAL, MAX_SELECTION) => {
  /**
   * subFactionAllowance: this state is an object that does two things:
   *
   *  - [total] store the current number of units for one subFaction
   *     ° this is initallially zero and gets increased everytime a unit of this sub faction is added
   *  -  store the maximum number of units of that subFaction that is allowed. There are two maxima:
   *     ° [occurences]: the number of times any unit can occur in the army (default: 2)
   *     ° [min] and [max] percentage of the army total, that must/ can be spent on units of this type
   *  - [cardNames] store the card names associated with one subFaction. For several armies in the game,
   *    several types of units belong to the  same sbubfaction.
   *  - [isCorrect] is the current selection of units correct for this subFaction
   *  - [verfiy()] this function verifies
   */
  const [subFactionAllowance, setSubFactionAllowance] = useState({
    warriors: {
      total: 0,
      min: 0.3,
      max: 1.0,
      cardNames: ["Kriegerkaste"],
      isOvermaxSelect: false,
      isUnderMinPoints: true,
      isoverMaxPoints: false,
    },
    nobles: {
      total: 0,
      min: 0.0,
      max: 0.5,
      cardNames: ["Adelskaste"],
      isOvermaxSelect: false,
      isUnderMinPoints: false,
      isoverMaxPoints: false,
    },
    magicians: {
      total: 0,
      min: 0.0,
      max: 0.4,
      cardNames: ["Magierkaste"],
      isOvermaxSelect: false,
      isUnderMinPoints: false,
      isoverMaxPoints: false,
    },
    priests: {
      total: 0,
      min: 0.0,
      max: 0.4,
      cardNames: ["Priesterkaste"],
      isOvermaxSelect: false,
      isUnderMinPoints: false,
      isoverMaxPoints: false,
    },
    heroes: {
      total: 0,
      min: 0.0,
      max: 0.4,
      cardNames: ["Befehlshaber", "Held"],
      isOvermaxSelect: false,
      isUnderMinPoints: false,
      isoverMaxPoints: false,
    },
    spellcasters: {
      total: 0,
      min: 0.0,
      max: 0.4,
      cardNames: ["Magier", "Priesterin"],
      isOvermaxSelect: false,
      isUnderMinPoints: false,
      isoverMaxPoints: false,
    },
  });
 

  /**
   * better: read the entire armylist into this "customhook" filter and compare.
   */

  /**
   *
   * @param {[{unit object}]} army
   */
  const validateArmyList = () => {
    armyList.forEach((u) => {
      const subFaction = findMatchingSubFaction(u);
      calculateSubFactionTotal(subFaction, u.points);
      checkSubFactionPoints();
      checkOccurences();
      const SpecialsObserved = checkSpecialRules();
    });
  };

  const findMatchingSubFaction = (unit) => {
    let result;
    for (const subFaction in subFactionAllowance) {
      if (subFactionAllowance[subFaction].cardNames.includes(unit.subFaction)) {
        result = subFaction;
      }
    }
    return result;
  };

  const calculateSubFactionTotal = (subFaction, points) => {
    let temp = subFactionAllowance[subFaction].total + points;
    setSubFactionAllowance({
      ...subFactionAllowance,
      [subFaction]: {
        ...subFactionAllowance[type],
        total: temp,
      },
    });
  };

  const checkSubFactionPoints = () => {
    for (const subFaction in subFactionAllowance) {
      const factionMinimum = subFactionAllowance[subFaction].min * ARMY_POINTS_TOTAL;
      const factionMaximum = subFactionAllowance[subFaction].max * ARMY_POINTS_TOTAL;

      setSubFactionAllowance({
        ...subFactionAllowance,
        [subFaction]: {
          ...subFactionAllowance[type],
          isUnderMinPoints: subFactionAllowance[subFaction].total < factionMinimum,
        },
      });
      setSubFactionAllowance({
        ...subFactionAllowance,
        [subFaction]: {
          ...subFactionAllowance[type],
          isoverMaxPoints: subFactionAllowance[subFaction].total > factionMaximum,
        },
      });
    }
  };

  const checkOccurences = () => {
    let counts = {};

    for (const unit of armyList) {
      const name = unit.unitName;
      counts[name] = counts[name] ? counts[unit] + 1 : 1;
      if (counts[name] > MAX_SELECTION) {
          
        // TODO: finish this :D
      } 
    }
  };

  return [];
};
