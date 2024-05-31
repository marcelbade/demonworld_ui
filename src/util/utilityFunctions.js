// React
import React from "react";
//Material UI
import { Tooltip, Typography } from "@mui/material";
//icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
// constants
import { COMPENDIUM, UNIT_TYPES } from "../constants/textsAndMessages";
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

  specialElements = unit.leader ? ++specialElements : specialElements;
  specialElements = unit.standardBearer ? ++specialElements : specialElements;
  specialElements = unit.musician ? ++specialElements : specialElements;

  let number = `${unit.numberOfElements - specialElements}`;
  let ending =
    unit.numberOfElements === 1 //
      ? ` ${CARD_PREVIEW.SINGLE_ELEMENT}`
      : ` ${CARD_PREVIEW.ELEMENTS}`;

  return number + ending;
};

/**
 * Function searches the String value of the special rule property for a space (" ").
 * If a space is found, the special rule is deemed to long and
 * only the String up to the first space is displayed and
 * the rest replaced with an ellipsis. If no space is found,
 * then the special rule consists of a single
 * word (i.e., "two-handed Sword") and is displayed as is.
 * @param {String} rule
 * @returns resized string or "-"
 */
export const renderSpecialRules = (rule) => {
  const firstSpace = rule.indexOf(" ");
  const length = firstSpace === -1 ? rule.length : firstSpace;
  const ellipsis = length !== rule.length ? "..." : "";

  const rulePreview = `${rule.slice(0, length)}${ellipsis}`;

  return (
    <Tooltip title={<Typography>{rule === "-" ? COMPENDIUM.NO_SPECIAL_RULES : rule}</Typography>}>
      <Typography>{rule === "-" ? "-" : rulePreview}</Typography>
    </Tooltip>
  );
};

/**
 * Function calculates Tommy's first effectivenness (melee only) rating from
 * his spreadsheet for a single unit.
 * @param {unitCard} unit
 * @returns a decimal number expressing the effectiveness of the unit.
 */
export const renderEffectiveness_1 = (unit) => {
  const result = (unit.weapon1 + unit.armourMelee) / (unit.points / unit.hitpoints);
  return result.toFixed(2);
};

/**
 * Function calculates Tommy's second effectivenness rating from
 * his spreadsheet for a single unit.
 * @param {unitCard} unit
 * @returns a decimal number expressing the effectiveness of the unit.
 */
export const renderEffectiveness_2 = (unit) => {
  const factor_1 = 0.5;
  const factor_2 = 3;
  const factor_3 = 0.2;

  const result =
    (unit.weapon1 +
      unit.armourMelee + //
      (unit.armourRange - factor_1 * unit.unitSize) + //
      factor_2 * unit.initiative +
      factor_3 * unit.move + //
      factor_1 * unit.numberOfElements) / //
    (unit.points / unit.hitpoints);

  return result.toFixed(2);
};

/**
 * Function takes the unit type abbrevation (G,U,M...) and replaces it with the type name.
 * @param {String} unitType
 * @returns the name of the unit Type from the textsAndMessages file.
 */
export const renderUnitTypeName = (unitType) => {
  return UNIT_TYPES[unitType];
};

/**
 * Function renders an icon for unit stats that are Booleans
 * and only occur in Units that do not consist of a single element
 * (giants, heroes, magic users). For a Unit the function displays either a check mark or X icon,
 * for heroes  and commanders it shows a "-".
 *
 * @param {boolean} flag
 * @returns Material UI icon or "-"
 */
export const renderBooleanAsIcon = (numberOfElements, flag) => {
  const SINGLE_ELEMENT = 1;

  if (numberOfElements === SINGLE_ELEMENT) {
    return "-";
  }

  return flag ? <CheckCircleOutlineIcon /> : <CancelIcon />;
};

/**
 * Functions renders the dynamic icons, i.e., Those who depend on the
 * units stats: hitpoint markers, command stars, magic markers.
 * The icons are simply special characters.
 * @param {{iconString, numberOfIcons, showZeroMarker}} data
 * @returns a string with a number of symbols equal to the unit's stat.
 */
export const renderDynamicIcons = (data) => {
  let result = "";
  let zeroMarker = "";

  for (let i = 0; i < data.iconNumber; i++) {
    result = result + data.iconString;
  }

  return result.length === 0 ? zeroMarker : result;
};
