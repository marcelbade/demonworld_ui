// functions and components

import { addFooterLines, addHeaderLines, addAdjustablePadding, addSubfactionLine, drawLineWithChar } from "./sharedTextFileFunctions";
import { numberOfElements, renderDynamicIcons } from "./utilityFunctions";

// width of one half of the old stat card
const HALF_CARD_WIDTH = 43;

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
        const item = unit.equipment[k];
        // text = text + addItemLine(item); TODO : items
      }
    }
  }

  text = text + addFooterLines(textFileData);

  return text;
};

// TODO ###
// add a line with unit name and point cost w. adjustable patting.
const addUnitCard = (unit) => {
  return (
    drawUpperEdge() + //
    drawNameAndSubFactionLine(unit) +
    drawSeparatorLine() +
    drawMovementAndElements(unit) +
    drawSeparatorLine() +
    // center, most values //TODO
    drawRangeWeaponLine(unit) +
    drawFirstWeaponLine(unit) +
    drawSecondWeaponLine(unit) +
    drawThirdWeaponLine(unit) +
    drawOverrunLine(unit) +
    drawleftSeparatorLine() +
    //
    drawSeparatorLine() +
    drawHitPointsAndPointCost(unit) +
    drawSeparatorLine()
  );
};

const drawUpperEdge = () => {
  return ` ${drawLineWithChar("=", 87)} \n`;
};

const drawNameAndSubFactionLine = (unit) => {
  return (
    `| ${unit.unitName}${addAdjustablePadding(42)}` + //
    `|${addAdjustablePadding(42)}${unit.subFaction} |\n`
  );
};

const drawSeparatorLine = () => {
  return `|${drawLineWithChar("-", HALF_CARD_WIDTH)}|${drawLineWithChar("-", HALF_CARD_WIDTH)}|\n`;
};

const drawMovementAndElements = (unit) => {
  return (
    `| B:${unit.move}` + //
    `  A:${unit.charge}` +
    `  P:${unit.skirmish}` +
    `  Manöver: ${unit.hold_maneuvers}` +
    `           ${addClassicFormationStrings(unit)}` +
    ` | ${numberOfElements(unit)} |\n`
  );
};

`+`;

const drawHitPointsAndPointCost = (unit) => {
  return (
    `|${drawHP(unit)}|` + //
    addAdjustablePadding(17, 0) +
    `${addLeftPaddingToNumbers(unit.points)} Punkte` +
    `${addAdjustablePadding(16, 0)}|\n`
  );
};

const drawRangeWeaponLine = (unit) => {
  return `| Wurfspeer 4 Felder:5  6 Felder:3          |${specialRuleWriter(0, unit.specialRules)}|\n`;
};

const drawFirstWeaponLine = (unit) => {
  return `| Wurfspeer 4 Felder:5  6 Felder:3          |${specialRuleWriter(1, unit.specialRules)}|\n`;
};

const drawSecondWeaponLine = (unit) => {
  return `| Wurfspeer 4 Felder:5  6 Felder:3          |${specialRuleWriter(2, unit.specialRules)}|\n`;
};

const drawThirdWeaponLine = (unit) => {
  return `| Wurfspeer 4 Felder:5  6 Felder:3          |${specialRuleWriter(3, unit.specialRules)}|\n`;
};

const drawOverrunLine = (unit) => {
  return `| Wurfspeer 4 Felder:5  6 Felder:3          |${specialRuleWriter(4, unit.specialRules)}|\n`;
};

const drawleftSeparatorLine = (unit) => {
  return `|${drawLineWithChar("-", 43)}|${specialRuleWriter(5, unit.specialRules)}|\n`;
};

// TODO  -> continue with initiative

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

  return `${padding} ${hp}${padding}`;
};

/**
 * Function generates the classic formation symbols
 * @param {unitCard} unit
 * @returns a string containing the classic symbols for the
 * in-game troop formations.
 */
const addClassicFormationStrings = (unit) => {
  let result = "";

  unit.squareFormation ? (result = result + "Ka") : null;
  result.length > 0 ? (result = result + "/") : null;
  unit.wedgeFormation ? (result = result + "Ke") : null;
  result.length > 1 ? (result = result + "/") : null;
  unit.skirmishFormation ? (result = result + "Pl") : null;

  return result;
};

/**
 * Function draws the unit's special rule, line by line. The text is split
 * in lines of 43 characters each (rounded up). Every function call returns
 * one line
 * @param {int} lineNumber
 * @param {String} specialRule
 * @returns a string that represents one line of the special rule text,
 * offset by the line number, i.e., lineNumber = 2 starts printing at the
 * 44th character in the text and prints until the string length hits 43.
 */
const specialRuleWriter = (lineNumber, specialRule) => {
  let result = "";

  const numberOfLines = Math.ceil(specialRule.length / HALF_CARD_WIDTH);

  // remove everything left that's already been printed
  if (lineNumber <= numberOfLines) {
    const offset = lineNumber * HALF_CARD_WIDTH;
    result = specialRule.slice(offset);
  }

  // remove every right that doesn't fit inside the line
  if (result.length > HALF_CARD_WIDTH) {
    result = result.slice(0, 44);
  }

  // padd, if result smaller than line length
  if (result.length < HALF_CARD_WIDTH) {
    result = addAdjustablePadding(HALF_CARD_WIDTH, result);
  }

  return result;
};
