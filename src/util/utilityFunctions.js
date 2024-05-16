//constants
import { CARD_PREVIEW } from "../constants/textsAndMessages";
import { HERO, MAGE, AUTOMATON, GIANT } from "../constants/unitTypes";

/**
 * Function checks if a subFaction is an alternative sub faction.
 * If true, it is only displayed if the flag selectedAlternativeOption is set to true too.
 * @param {subFaction dto} subfactionDataObject
 * @returns
 */
export const isSubFactionAlternativeAndSelected = (subfactionDataObject) => {
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
 * Function controls which kind of stat card (unit or character) is displayed.
 *
 * @param {[{*}]} unit
 * @returns  JSX element
 */
export const isSingleElementCard = (unit) => {
  const SINGLE_ELEMENTS_LIST = [HERO, MAGE, AUTOMATON, GIANT];
  return SINGLE_ELEMENTS_LIST.includes(unit.unitType);
};

/**
 * Function tests if unit is a hero or mage. This is important when it 
 * comes to displaying movement on stat cards.
 *
 * @param {[{*}]} unit
 * @returns  JSX element
 */
export const isHeroOrMage = (unit) => {
  const HERO_MAGE_LIST = [HERO, MAGE];
  return HERO_MAGE_LIST.includes(unit.unitType);
};

  /**
   * Function creates the string that contains the numbe of "normal" elements.
   * Since special elements are mentioned separately,
   * they have to be substracted from the total count.
   * @param {unitCard} unit
   * @returns A String with the correct number of elements and the correct phrasing.
   */
  export const numberOfElements = (unit) => {
    let specialElements = 0;

    if (unit.leader) {
      ++specialElements;
    }
    if (unit.standardBearer) {
      ++specialElements;
    }
    if (unit.musician) {
      ++specialElements;
    }

    let number = `${unit.numberOfElements - specialElements}`;
    let ending =
      unit.numberOfElements === 1 //
        ? ` ${CARD_PREVIEW.SINGLE_ELEMENT}`
        : ` ${CARD_PREVIEW.ELEMENTS}`;

    return number + ending;
  };