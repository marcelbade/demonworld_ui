// functions and components
import { addAdjustablePadding, drawLineWithChar, addLeftPaddingToNumbers } from "./sharedTextFileFunctions";
import { RANGED_WEAPON_STATS } from "../../constants/stats";
import { NO_RANGE_WEAPON } from "../../constants/textsAndMessages";
import { setUnitStat } from "../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
import { chargeBonusSetter } from "../../gameLogic/cardStatRenderFunctions/unitStatSetters";
import { numberOfElements, renderDynamicIcons, renderSpecialElements } from "../../util/utilityFunctions";

import { HALF_CARD_WIDTH, LINE_END, LINE_START } from "../textFileConstants/TextFileGeneratorConstants";

export const drawHorizontalCardEdge = (width) => {
  return (
    ` ` + //
    drawLineWithChar("=", width) +
    ` \n`
  );
};

export const drawSeparatorLine = () => {
  return `|${drawLineWithChar("-", HALF_CARD_WIDTH)}|${drawLineWithChar("-", HALF_CARD_WIDTH)}` + LINE_END;
};

export const drawleftSeparatorLine = (unit, specialRuleLine) => {
  return `|${drawLineWithChar("-", 43)}|${specialRuleLine}|\n`;
};

export const drawFearAndMoralLine = (unit, specialRuleLine) => {
  const STAT_LINE =
    `Furchtfaktor ` +
    `${unit.fear}` +
    addAdjustablePadding(11, 0) +
    `Moral: ` +
    addLeftPaddingToNumbers(unit.moral1) +
    `/` +
    addLeftPaddingToNumbers(unit.moral2);

  return (
    LINE_START + //
    STAT_LINE +
    addAdjustablePadding(HALF_CARD_WIDTH - 1, STAT_LINE.length) +
    `|${specialRuleLine}` +
    LINE_END
  );
};

export const drawArmorLine = (unit, specialRuleLine) => {
  const skillPrefixString = unit.skillRange > 0 || unit.skillMelee > 0 ? "Kampfg." : "";
  const rangeSkillString = unit.skillRange > 0 ? `Fern: ${unit.skillRange} ` : "";
  const meleeSkillString = unit.skillMelee > 0 ? `Nah: ${unit.skillMelee} ` : "";

  const skillString = skillPrefixString + rangeSkillString + meleeSkillString;

  const armorString = `Panzerung  ${unit.armourRange} / ${unit.armourMelee}`;

  return (
    LINE_START + //
    armorString +
    `${addAdjustablePadding(HALF_CARD_WIDTH - 1, armorString.length + skillString.length)}` +
    skillString +
    `|${specialRuleLine}` +
    LINE_END
  );
};

export const drawWeaponLine = (unit, weapon, specialRuleLine) => {
  let weaponStat = setUnitStat(unit, weapon);
  let weaponName = weaponStat.name;
  let weaponValue = weaponStat.value;

  if (weaponStat === undefined || weaponName === undefined) {
    weaponStat = addAdjustablePadding(43, 0);
    weaponName = "";
    weaponValue = "";
  }

  // turn weaponValue into as string to get the length
  const stringLength = weaponName.length + `${weaponValue})`.length;

  return (
    LINE_START + //
    `${weaponName}` +
    addLeftPaddingToNumbers(weaponValue) +
    addAdjustablePadding(HALF_CARD_WIDTH - 1, stringLength) +
    `|` +
    specialRuleLine +
    LINE_END
  );
};

export const drawRangeWeaponLine = (unit, specialRuleLine) => {
  let rangedWeaponString = "";
  const rangedWeapon = setUnitStat(unit, RANGED_WEAPON_STATS);

  if (rangedWeapon.name !== NO_RANGE_WEAPON) {
    rangedWeaponString = `${rangedWeapon.name} ${rangedWeapon.value}`;
  }

  return (
    LINE_START + //
    `${rangedWeaponString}` +
    addAdjustablePadding(HALF_CARD_WIDTH - 1, rangedWeaponString.length) +
    `|` +
    specialRuleLine +
    LINE_END
  );
};

export const drawNameAndSubFactionLine = (unit) => {
  let commandStars = renderDynamicIcons("*", unit.commandStars);

  let arcana = renderDynamicIcons("/", unit.magic);

  if (arcana.length > 0) {
    commandStars = commandStars + "  ";
  }

  const leftLength = unit.unitName.length + commandStars.length + arcana.length;

  const leftPadding = addAdjustablePadding((HALF_CARD_WIDTH - 1) / 2, leftLength / 2);
  let leftLineString = unit.unitName + leftPadding + commandStars + arcana;

  leftLineString = leftLineString + addAdjustablePadding(HALF_CARD_WIDTH - 1, leftLineString.length);

  return (
    LINE_START +
    leftLineString + //
    `|` +
    `${addAdjustablePadding(HALF_CARD_WIDTH - 1, unit.subFaction.length)}${unit.subFaction} ` +
    LINE_END
  );
};

export const drawMovementFormationsAndElements = (unit) => {
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

export const drawIntiativeAndSizeLine = (unit, specialRuleLine) => {
  const chargeBonusString = unit.chargeBonus > 0 ? chargeBonusSetter(unit) : "";

  const STAT_LINE = `Initiative ${unit.initiative} Größe ${unit.unitSize} ${chargeBonusString}`;

  let result =
    LINE_START + //
    STAT_LINE +
    addAdjustablePadding(HALF_CARD_WIDTH - 1, STAT_LINE.length) +
    `|` +
    specialRuleLine +
    LINE_END;

  return result;
};

export const drawHitPointsAndPointCost = (unit) => {
  return (
    LINE_START +
    drawHP(unit) +
    `|` + //
    addAdjustablePadding(17, 0) +
    `${addLeftPaddingToNumbers(unit.points)} Punkte` +
    addAdjustablePadding(16, 0) +
    LINE_END
  );
};

// === private functions

/**
 * Function draws the hp and centers them with padding
 * on both sides.
 * @param {unitCard} unit
 * @returns a string containing a the unit's hp drawn as "[]", roughly centered.
 */
const drawHP = (unit) => {
  const hp = renderDynamicIcons("[]", unit.hitpoints);

  const padding = Math.floor((HALF_CARD_WIDTH - 2 * unit.hitpoints) / 2);

  return `${addAdjustablePadding(padding, 0)} ${hp}${addAdjustablePadding(padding - 1, 0)}`;
};

/**
 * Function generates the classic formation symbols
 * @param {unitCard} unit
 * @returns a string containing the classic symbols for the
 * in-game troop formations.
 */

export const addClassicFormationStrings = (unit) => {
  let result = "";

  if (unit.wedgeFormation) {
    result = result + "Ke/";
  }

  if (unit.squareFormation) {
    result = result + "Ka/";
  }

  if (unit.skirmishFormation) {
    result = result + "Pl/";
  }

  if (unit.shieldWallFormation) {
    result = result + "Sw";
  }

  // no trailing slash
  if (result.slice(-1) === "/") {
    result = result.slice(0, -1);
  }

  result = result + " ";

  return result;
};
