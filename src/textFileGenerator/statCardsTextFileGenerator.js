// functions and components
import { WEAPON_1, WEAPON_2, WEAPON_3 } from "../constants/stats";
import { addItemCard } from "./itemCardGenerator";

import { addFooterLines, addHeaderLines, addSubfactionLine } from "./txtFileFunctions/sharedTextFileFunctions";
import { specialRuleTextCreator } from "./txtFileFunctions/specialRuleWriter";

import {
  drawHorizontalCardEdge,
  drawNameAndSubFactionLine,
  drawSeparatorLine,
  drawMovementFormationsAndElements,
  drawRangeWeaponLine,
  drawWeaponLine,
  drawleftSeparatorLine,
  drawIntiativeAndSizeLine,
  drawArmorLine, //
  drawFearAndMoralLine,
  drawHitPointsAndPointCost,
} from "./txtFileFunctions/statCardFunctions";

import { HALF_CARD_WIDTH } from "./textFileConstants/TextFileGeneratorConstants";

/**
 * Function create an army list as a simple text file. file is written as a single
 * formatted string.
 * @param {listDataObject} textFileData
 * @returns
 */
export const statCardsTextFileGenerator = (textFileData) => {
  let text = "";

  text = text + addHeaderLines(textFileData);

  // create unit card list
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
        text = text + addItemCard(item);
      }
    }
  }

  text = text + addFooterLines(textFileData);

  return text;
};

// create a stat card
const addUnitCard = (unit) => {
  const specialRulesLines = specialRuleTextCreator(unit.specialRules, HALF_CARD_WIDTH, true);

  return (
    drawHorizontalCardEdge(HALF_CARD_WIDTH * 2 + 1) + //
    drawNameAndSubFactionLine(unit) +
    drawSeparatorLine() +
    drawMovementFormationsAndElements(unit) +
    drawSeparatorLine() +
    //  weapons
    drawRangeWeaponLine(unit, specialRulesLines[0]) +
    drawWeaponLine(unit, WEAPON_1, specialRulesLines[1]) +
    drawWeaponLine(unit, WEAPON_2, specialRulesLines[2]) +
    drawWeaponLine(unit, WEAPON_3, specialRulesLines[3]) +
    // ini, size, moral, armor
    drawleftSeparatorLine(unit, specialRulesLines[4]) +
    drawIntiativeAndSizeLine(unit, specialRulesLines[5]) +
    drawArmorLine(unit, specialRulesLines[6]) +
    drawFearAndMoralLine(unit, specialRulesLines[7]) +
    //
    drawSeparatorLine() +
    drawHitPointsAndPointCost(unit) +
    drawHorizontalCardEdge(HALF_CARD_WIDTH * 2 + 1) +
    `\n\n\n`
  );
};
