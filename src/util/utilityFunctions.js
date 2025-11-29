//Material UI
import { Tooltip, Typography } from "@mui/material";
//icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
// constants
import { COMPENDIUM, UNIT_TYPES } from "../constants/textsAndMessages";
import { CARD_TEXT } from "../constants/textsAndMessages";
import { HERO, MAGE, AUTOMATON, GIANT } from "../constants/unitTypes";

/**
 * Function checks if a subFaction is an alternative sub faction.
 * If true, it is only displayed if the flag selectedAlternativeOption is set to true too.
 * @param {subFaction dto} subfactionDataObject
 * @returns true if the subFaction is either:
 *  - not an alternative option
 *  - is an alternative option that has bem selected
 */
export const isSubFactionAlternativeAndSelected = (subfactionDataObject) => {
  if (subfactionDataObject.alternativeListOption) {
    return subfactionDataObject.selectedAlternativeOption;
  }
  return true;
};

export const renderSpecialElements = (unit) => {
  const LEADER = unit.leader ? `${CARD_TEXT.LEADER} ` : "";
  const STANDARD_BEARER = unit.standardBearer ? `/ ${CARD_TEXT.STANDARD_BEARER}` : "";
  const MUSICIAN = unit.musician ? `/ ${CARD_TEXT.MUSICIAN}` : "";

  return `${LEADER}${STANDARD_BEARER}${MUSICIAN}`;
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
 * Function creates the string that contains the number of "normal" elements.
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
      ? ` ${CARD_TEXT.SINGLE_ELEMENT}`
      : ` ${CARD_TEXT.ELEMENTS}`;

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
    <Tooltip title={rule === "-" ? COMPENDIUM.NO_SPECIAL_RULES : rule}>
      <Typography variant="body1">{rule === "-" ? "-" : rulePreview}</Typography>
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
 * Functions renders the dynamic icons, i.e., those that depend on the
 * units stats:
 * - hitpoint markers
 * - command stars
 * - magic markers
 * The icons are simply special characters.
 * @param {*} iconNumber
 * @param {*} iconString
 * @returns a string representing a unit stat as a number of icons.
 */
export const renderDynamicIcons = (iconString, iconNumber) => {
  let result = "";

  for (let i = 0; i < iconNumber; i++) {
    result = result + iconString;
  }

  return result;
};

/**
 * Function creates a string with a random RGB color value.
 * @returns a string with the pattern "rgb(#1,#2,#3)"
 */
export const randomRgbValue = () => {
  let values = [];

  for (let i = 0; i <= 2; i++) {
    values[i] = getRandomIntInclusive(1, 254);
  }

  return `rgb(${values[0]},${values[1]},${values[2]})`;
};

// create a random integer that lies min and max, inclusively.
const getRandomIntInclusive = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

/**
 * Function adds the missing cards for multi state units to the array
 * of selected cards.
 * If a unit has multiple stat cards, then only one is displayed by the
 * app and can be selected for the list.
 * The function puts those card objects back to ensure that the
 * detailed PDF contains all cards needed.
 * @param {[unitCards]} selectedUnits
 * @returns a unitCard array with the all cards for multi state units added.
 */
export const addCardsForMultiStateUnits = (selectedUnits, subFactionDTOs) => {
  selectedUnits.forEach((u) => {
    if (u.isMultiStateUnit) {
      const subFaction = subFactionDTOs.find((sF) => sF.name === u.subFaction);
      const cards = subFaction.units.filter(
        (subFactionUnit) =>
          subFactionUnit.unitName.includes(u.unitName) && //
          subFactionUnit.multiStateOrderNumber > 1
      );

      cards.forEach((c) => selectedUnits.push(c));
    }
  });

  return selectedUnits;
};

/**
 * function calculates the total point cost (unit point cost +
 * point cost for all equipped items of every unit) for the passed units.
 * @param {[unitCard]} selectedUnits
 * @returns the point cost
 */
export const calculateSpentPointsTotal = (selectedUnits) => {
  let result = 0;

  selectedUnits.forEach((selectedUnit) => {
    result += selectedUnit.points;

    const equipmentTotal = calculateEquipmentCost(selectedUnit);
    result += equipmentTotal;
  });

  return result;
};

const calculateEquipmentCost = (selectedUnit) => {
  let result = 0;

  if (selectedUnit.equipment.length === 0) {
    return result;
  }

  selectedUnit.equipment.forEach((item) => {
    result += item.points;
  });

  return result;
};
