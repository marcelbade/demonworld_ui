// functions and components

import { RANGED_WEAPON_STATS, WEAPON_1, WEAPON_2, WEAPON_3 } from "../constants/stats";
import { NO_RANGE_WEAPON } from "../constants/textsAndMessages";
import { setUnitStat } from "../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
import {
  addFooterLines,
  addHeaderLines,
  addAdjustablePadding,
  addSubfactionLine,
  drawLineWithChar,
  addLeftPaddingToNumbers,
} from "./sharedTextFileFunctions";
import { numberOfElements, renderDynamicIcons, renderSpecialElements } from "./utilityFunctions";

// width of one half of the old stat card
const HALF_CARD_WIDTH = 43;
const LINE_START = "| ";
// const RIGHT_LINE_EDGE = " |";
const LINE_END = `|\n`;

/**
 * Function create an army list as a simple text file. file is written as a single
 * formatted string.
 * @param {listDataObject} textFileData
 * @returns
 */
export const statCardsTextFileGenerator = (textFileData) => {
  let text = "";

  text = text + addHeaderLines(textFileData);

  // create unit list
  for (let i = 0; i < textFileData.list.length; i++) {
    const subFactionObj = textFileData.list[i];

    if (subFactionObj.units.length === 0) {
      continue;
    }

    text = text + addSubfactionLine(subFactionObj.subFaction);

    for (let j = 0; j < subFactionObj.units.length; j++) {
      const unit = subFactionObj.units[j];
      text = text + addUnitCard(unit);

      // item start
      if (unit.equipment.length === 0) {
        continue;
      }

      for (let k = 0; k < unit.equipment.length; k++) {
        const item = unit.equipment[k]; // TODO : items
        text = text + addItemCard(item);
      }
    }
  }

  text = text + addFooterLines(textFileData);

  return text;
};

// create stat card
const addUnitCard = (unit) => {
  return (
    drawHorizontalCardEdge() + //
    drawNameAndSubFactionLine(unit) +
    drawSeparatorLine() +
    drawMovementFormationsAndElements(unit) +
    drawSeparatorLine() +
    //  weapons
    drawRangeWeaponLine(unit, 0) +
    drawWeaponLine(unit, WEAPON_1, 1) +
    drawWeaponLine(unit, WEAPON_2, 2) +
    drawWeaponLine(unit, WEAPON_3, 3) +
    // ini, size, moral, armor
    drawleftSeparatorLine(unit, 4) +
    drawIntiativeAndSizeLine(unit, 5) +
    drawArmorLine(unit, 6) +
    drawFearAndMoralLine(unit, 7) +
    //
    drawSeparatorLine() +
    drawHitPointsAndPointCost(unit) +
    drawHorizontalCardEdge() +
    `\n\n\n`
  );
};

const addItemCard = (item) => {
  const numberOfLines = Math.ceil(item.itemRules.length / 87);

  let itemRuleText = "";
  for (let i = 0; i < numberOfLines; i++) {
    itemRuleText = itemRuleText + specialRuleWriter(i, item.itemRules, 87) + LINE_END;
  }

  return (
    drawHorizontalCardEdge() + // ###
    drawItemName(item) +
    `|` +
    drawLineWithChar("-", 87) +
    `|` +
    `\n` +
    `|` +
    itemRuleText +
    drawHorizontalCardEdge() //
  );
};

const drawHorizontalCardEdge = () => {
  return (
    ` ` + //
    drawLineWithChar("=", 87) +
    ` \n`
  );
};

const drawNameAndSubFactionLine = (unit) => {
  return (
    LINE_START +
    `${unit.unitName}${addAdjustablePadding(42, unit.unitName.length)}` + //
    `|` +
    `${addAdjustablePadding(42, unit.subFaction.length)}${unit.subFaction} ` +
    LINE_END
  );
};

const drawSeparatorLine = () => {
  return `|${drawLineWithChar("-", HALF_CARD_WIDTH)}|${drawLineWithChar("-", HALF_CARD_WIDTH)}` + LINE_END;
};

const drawMovementFormationsAndElements = (unit) => {
  const formationsString = addClassicFormationStrings(unit);

  const leftStateLine =
    `B:${addLeftPaddingToNumbers(unit.move)}` + //
    ` A:` +
    `${addLeftPaddingToNumbers(unit.charge)}` +
    ` P:` +
    `${addLeftPaddingToNumbers(unit.skirmish)}` +
    ` Manöver:` +
    `${addLeftPaddingToNumbers(unit.hold_maneuvers)}`;

  const overrunLine = unit.overRun > 0 ? `Überrennen:  ${unit.overRun}` : "";

  const leftTextLength = leftStateLine.length + formationsString.length + overrunLine.length;
  const rightTextLength = renderSpecialElements(unit).length + numberOfElements(unit).length;

  const centerPadding = addAdjustablePadding(HALF_CARD_WIDTH - 1, leftTextLength);
  const rightPadding = addAdjustablePadding(HALF_CARD_WIDTH - 2, rightTextLength);

  return (
    LINE_START +
    leftStateLine +
    centerPadding +
    formationsString +
    overrunLine +
    `| ` +
    renderSpecialElements(unit) +
    rightPadding +
    numberOfElements(unit) +
    " " +
    LINE_END
  );
};

const drawHitPointsAndPointCost = (unit) => {
  return (
    LINE_START +
    `${drawHP(unit)}|` + //
    `${addAdjustablePadding(17, 0)}` +
    `${addLeftPaddingToNumbers(unit.points)} Punkte` +
    `${addAdjustablePadding(16, 0)}` +
    LINE_END
  );
};

const drawRangeWeaponLine = (unit, specialRuleLine) => {
  let rangedWeaponString = "";
  const rangedWeapon = setUnitStat(unit, RANGED_WEAPON_STATS);

  if (rangedWeapon.name !== NO_RANGE_WEAPON) {
    rangedWeaponString = `${rangedWeapon.name} ${rangedWeapon.value}`;
  }

  return (
    LINE_START + //
    `${rangedWeaponString}` +
    `${addAdjustablePadding(HALF_CARD_WIDTH - 1, rangedWeaponString.length)}` +
    `|` +
    `${specialRuleWriter(specialRuleLine, unit.specialRules, HALF_CARD_WIDTH)}` +
    LINE_END
  );
};

const drawWeaponLine = (unit, weapon, specialRuleLine) => {
  let weaponStat = setUnitStat(unit, weapon);
  let name = weaponStat.name;
  let value = weaponStat.value;

  if (weaponStat === undefined || name === undefined) {
    weaponStat = addAdjustablePadding(43, 0);
    name = "";
    value = "";
  }

  const stringLength = name.length + `${value})`.length;

  return (
    LINE_START + //
    `${name}` +
    `${addLeftPaddingToNumbers(value)}` +
    `${addAdjustablePadding(HALF_CARD_WIDTH - 1, stringLength)}` +
    `|` +
    `${specialRuleWriter(specialRuleLine, unit.specialRules, HALF_CARD_WIDTH)}` +
    LINE_END
  );
};

const drawleftSeparatorLine = (unit, specialRuleLine) => {
  return `|${drawLineWithChar("-", 43)}|${specialRuleWriter(specialRuleLine, unit.specialRules, HALF_CARD_WIDTH)}|\n`;
};

const drawIntiativeAndSizeLine = (unit, specialRuleLine) => {
  const STAT_LINE = `Initiative  ${unit.initiative} Größe ${unit.unitSize} Angriffsbonus:${unit.chargeBonus}`;

  return (
    LINE_START + //
    STAT_LINE +
    `${addAdjustablePadding(HALF_CARD_WIDTH - 1, STAT_LINE.length)}` +
    `|${specialRuleWriter(specialRuleLine, unit.specialRules, HALF_CARD_WIDTH)}` +
    LINE_END
  );
};

const drawArmorLine = (unit, specialRuleLine) => {
  const STAT_LINE = `Panzerung  ${unit.armourRange} / ${unit.armourMelee}`;

  return (
    LINE_START + //
    STAT_LINE +
    `${addAdjustablePadding(HALF_CARD_WIDTH - 1, STAT_LINE.length)}` +
    `|${specialRuleWriter(specialRuleLine, unit.specialRules, HALF_CARD_WIDTH)}` +
    LINE_END
  );
};

const drawFearAndMoralLine = (unit, specialRuleLine) => {
  const STAT_LINE =
    `Furchtfaktor ` +
    `${unit.fear}` +
    `${addAdjustablePadding(11, 0)}` +
    `Moral: ` +
    `${addLeftPaddingToNumbers(unit.moral1)}/` +
    `${addLeftPaddingToNumbers(unit.moral2)}`;

  return (
    LINE_START + //
    STAT_LINE +
    addAdjustablePadding(HALF_CARD_WIDTH - 1, STAT_LINE.length) +
    `|${specialRuleWriter(specialRuleLine, unit.specialRules, HALF_CARD_WIDTH)}` +
    LINE_END
  );
};

/**
 * Function draws the hp and centers them with padding
 * on both sides.
 * @param {unitCard} unit
 * @returns a string containing a the unit's hp drawn as "[]"
 * , roughy centered.
 */
const drawHP = (unit) => {
  const hp = renderDynamicIcons({
    iconString: "[]", //
    iconNumber: unit.hitpoints,
    showIfNone: false,
  });

  const padding = Math.floor((HALF_CARD_WIDTH - 2 * unit.hitpoints) / 2);

  return `${addAdjustablePadding(padding, 0)} ${hp}${addAdjustablePadding(padding - 1, 0)}`;
};

/**
 * Function generates the classic formation symbols
 * @param {unitCard} unit
 * @returns a string containing the classic symbols for the
 * in-game troop formations.
 */
const addClassicFormationStrings = (unit) => {
  let result = "";

  //TODO you cannot use tertiaries here :D

  if (unit.squareFormation) {
    result = result + "Ka";
  }
  if (result.length > 0) {
    result = result + "/";
  }

  if (unit.wedgeFormation) {
    result = result + "Ke";
  }
  if (result.length > 0) {
    result = result + "/";
  }

  if (unit.skirmishFormation) {
    result = result + "Pl";
  }

  // no trailing slash
  if (result.slice(-1) === "/") {
    result = result.slice(0, -1);
  }
  result = result + " ";

  return result;
};

/**
 * Function writes a unit's or item's special rule, line by line. The text is split
 * into lines with a given width (rounded up). Every function call
 * returns a single line. The line may be empty if the text is shorter than
 * the number of lines needed to fill out the card. If the special rule fits
 * inside the first line, it is centered (roughly, as the the widht is an odd number).
 * @param {int} lineNumber
 * @param {String} specialRule
 * @returns a string that represents one line of the special rule text,
 * offset by the line number, i.e., lineNumber = 1 starts printing at the
 * n-th character in the text (with n being the given with)
 * and prints until the string length hits 43.
 */
const specialRuleWriter = (lineNumber, specialRule, width) => {
  let result = "";
  let offset = 0;
  result = specialRule;

  // if the special rule fits into a single line, center it
  const isSingleLine = specialRule.length < width;

  if (isSingleLine && lineNumber === 0) {
    result =
      addAdjustablePadding(21, specialRule.length / 2) + //
      specialRule +
      addAdjustablePadding(width / 2, specialRule.length / 2);

    return result;
  } else if (isSingleLine && lineNumber > 0) {
    result = addAdjustablePadding(width, 0);
    return result;
  }

  // for multi line text, remove everything left that's already been printed
  offset = lineNumber * width;

  if (offset > 0) {
    result = specialRule.slice(offset);
  }

  // remove everything that doesn't fit inside the line
  if (result.length > width) {
    result = result.slice(0, width);
    result = dontCutWords(result);

    // if a word was cut, the string will be shorter
    result = result + addAdjustablePadding(width, result);
  }

  // padd, if the result is smaller than line length
  if (result.length < width) {
    result = result + addAdjustablePadding(width, result.length);
  }

  return result;
};

const drawItemName = (item) => {
  return LINE_START + item.itemName + addAdjustablePadding(86, item.itemName.length) + LINE_END;
};
/**
 * Function makes sure that no word is cut off by a the end of the line.
 * It tests if the last character in a a string is a letter. If not, the
 * string is returend as is. Otherwise, the function shortens the string
 * until it hits a character that is not a letter.
 *
 * @param {String} line
 * @returns the same string, but possibly shortened
 * until the last character is not a letter.
 */
const dontCutWords = (line) => {
  if (!isLetter(line.charAt(line.length - 1))) {
    return line;
  }

  while (isLetter(line.charAt(line.length - 1)) && line.length >= 1) {
    line = line.slice(0, line.length - 1);
  }
  return line;
};

/**
 * Function tests if the passed character is a letter by comparing the
 * results of the toLowerCase and toUpperCase function.
 *
 * @param {String} c
 * @returns true, if the character is a letter.
 */
const isLetter = (c) => {
  return /[a-zA-Z]/.test(c);
};
