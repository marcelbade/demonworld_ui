//constants
import { HERO, MAGE, AUTOMATON, GIANT } from "../../constants/unitTypes";
import StatCard from "./statCards/StatCard";

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
export const unitOrCmdCard = (unit, alignment) => {
  const SINGLE_ELEMENTS_LIST = [HERO, MAGE, AUTOMATON, GIANT];
  const isSingleElement = SINGLE_ELEMENTS_LIST.includes(unit.unitType);

  return (
    <StatCard
      isSingleElement={isSingleElement} //
      alignment={alignment}
      unit={unit}
    />
  );
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

/**
 * Function returns the total point cost for the unit + all equipment selected for it
 * @param {unitCard} unit
 * @returns total point cost for the unit + equipment
 */
export const calculateTotalUnitPointCost = (unit) => {
  if ("equipment" in unit && unit.equipment.length !== 0) {
    let pointTotal = 0;
    unit.equipment.forEach((pieceOfGear) => {
      pointTotal += pieceOfGear.points;
    });
    return unit.points + pointTotal;
  } else {
    return unit.points;
  }
};

/**
 * Function searches a JS object used as table in a table-driven function for a match. Used to map in the gameRules to map units/subFactions to heroes.
 * @param {unitCard Obj} canditateUnit
 * @param {Object} mapping
 * @returns
 */
export const searchMappingForMatch = (canditateUnit, mapping) => {
  let match = "";

  for (const unit in mapping) {
    if (Object.hasOwnProperty.call(mapping, unit)) {
      match = mapping[canditateUnit];
    }
  }
  return match;
};
