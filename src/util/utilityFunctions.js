//constants
import { HERO, MAGE, AUTOMATON, GIANT } from "../constants/unitTypes";

/**
 * Function checks if a subFaction is an alternative sub faction.
 * If true, it is only displayed if the flag selectedAlternativeOptionis set to true too.
 * @param {subFaction dto} subfactionDataObject
 * @returns
 */
export const isSubFactionAlternativeAndSelective = (subfactionDataObject) => {
  if (subfactionDataObject.alternativeListOption) {
    return subfactionDataObject.selectedAlternativeOption;
  }
  return true;
};

/**
 * Function checks if 2 arrays have elements in common.
 * @param {array} arr1
 * @param {array} arr2
 * @returns true, if one or more elements can be found in both arrays.
 */
export const do2ArraysHaveCommonElements = (arr1, arr2) => {
  const result = arr1.filter((element) => arr2.includes(element));
  return result.length !== 0;
};

/**
 *  Function is a compact UUID generator. Credit to
 *  https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 *
 * @returns String
 */
export const uuidGenerator = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Tests if any given JS object is an empty object. Only works for ES5+!
 * @param {{}} obj
 * @returns true if object is emtpy, false if not.
 */
export const isObjectEmtpy = (obj) => {
  if (obj !== undefined) {
    return Object.keys(obj).length === 0;
  } else {
    return true;
  }
};

/**
 *  Function controls which kind of stat card (unit or character) is displayed.
 *
 * @param {[{*}]} unit
 * @returns  JSX element
 */
export const isSingleElementCard = (unit) => {
  const SINGLE_ELEMENTS_LIST = [HERO, MAGE, AUTOMATON, GIANT];
  return SINGLE_ELEMENTS_LIST.includes(unit.unitType);
};

/**
 * This being JS, there is no way to elegantly sort an object collection by more than 2 properites without negating previous sorting. This function divides a list of unitCards by unit type, sorts each new partial array by point cost and alphabetically, then adds the resulting sorted arrays to either one of two arrays, depending on whether they have more than 1 element. Finally, these two arrays are merged into a single array and returned.
 * @param {[unitCard]} unitList
 * @returns [unitCard], sorted in this order, by number of elements (1 or more), unit type, point cost and alphabetically.
 */
export const unitCardMultiSort = (unitList) => {
  let types = [];
  let singleElements = [];
  let multipleElements = [];
  let result = [];

  // Step 1:create an array of the distinct unitTypes present in the unit list
  unitList.forEach((u) => {
    if (!types.includes(u.unitType)) {
      types.push(u.unitType);
    }
  });

  // Step 2: sort and merge into the resulting array
  for (let i = 0; i < types.length; i++) {
    let detailSortResult = unitList
      .filter((u) => u.unitType === types[i])
      .sort((a, b) => {
        return a.points === b.points ? a.unitName > b.unitName : a.points > b.points;
      });

    if (detailSortResult[0].numberOfElements === 1) {
      singleElements = [...singleElements, ...detailSortResult];
    } else {
      multipleElements = [...multipleElements, ...detailSortResult];
    }
  }

  result = [...singleElements, ...multipleElements];

  return result;
};
