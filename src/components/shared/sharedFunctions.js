import { HERO, MAGE, AUTOMATON, GIANT } from "../../constants/unitTypes";
import StatCardCommander from "./statCards/statCardCommander";
import StatCardUnit from "../shared/statCards/statCardUnit";

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
  return Object.keys(obj).length === 0;
};

/**
 *  Function controls which kind of stat card (unit or Hero/commander) is displayed in the details panel.
 *
 * @param {[{*}]} unit
 * @returns  JSX element
 */
export const unitOrCmdCard = (unit, alignment) => {
  let element;
  const SINGLE_ELEMENTS_LIST = [HERO, MAGE, AUTOMATON, GIANT];

  SINGLE_ELEMENTS_LIST.includes(unit.unitType)
    ? (element = <StatCardCommander unit={unit} alignment={alignment} />)
    : (element = <StatCardUnit unit={unit} alignment={alignment} />);

  return element;
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

  // Step 1: separate array into n arrays by unit type.
  unitList.forEach((u) => {
    if (!types.includes(u.unitType)) {
      types.push(u.unitType);
    }
  });

  // Step 2: sort  and merge into resulting array
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
