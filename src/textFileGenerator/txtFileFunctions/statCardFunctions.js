// functions and components
import { addAdjustablePadding, drawLineWithChar, addLeftPaddingToNumbers } from "./sharedTextFileFunctions";
import { NO_RANGE_WEAPON } from "../../constants/textsAndMessages";
import { setUnitStat } from "../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
import {
  chargeBonusSetter,
  initiativeSetter,
  fearSetter, //
  moralSetter,
  rangedWeaponSetter,
} from "../../gameLogic/cardStatRenderFunctions/unitStatSetters";
import { isSingleElementCard, numberOfElements, renderDynamicIcons, renderSpecialElements } from "../../util/utilityFunctions";
import { HALF_CARD_WIDTH, LINE_END, LINE_START } from "../textFileConstants/TextFileGeneratorConstants";
import { CARD_TEXT } from "../../constants/textsAndMessages";
import {
  renderControlzone,
  renderManeuvers,
  renderMovementLargeElements,
  renderMovementpoints,
  renderOverrunValue,
  renderUnitMovement,
} from "../../gameLogic/cardStatRenderFunctions/movementStatSetters";
import {
  isGiantOrAutomaton,
  isHeroMageOrSingleSummon,
  isUnitOrSummonedUnit,
} from "../../gameLogic/unitStatChangeLogic/unitMovementConditions";

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

/**
 * Function creates a string containing the fear and moral stats
 * @param {*} unit
 * @param {*} specialRuleLine
 * @returns a string containing fear and (conditionally) moral.
 */
export const drawFearAndMoralLine = (unit, specialRuleLine) => {
  isSingleElementCard(unit);

  const STAT_LINE = isSingleElementCard(unit) //
    ? fearSetter(unit)
    : fearSetter(unit) + "  " + moralSetter(unit);

  return (
    LINE_START + //
    STAT_LINE +
    addAdjustablePadding(HALF_CARD_WIDTH - 1, STAT_LINE.length) +
    `|${specialRuleLine}` +
    LINE_END
  );
};

/**
 *
 * @param {*} unit
 * @param {*} specialRuleLine
 * @returns
 */
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

  if (unit.rangedWeapon !== NO_RANGE_WEAPON) {
    rangedWeaponString = rangedWeaponSetter(unit);
  }

  return (
    LINE_START + //
    rangedWeaponString +
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
  let leftStateLine = "";

  if (isHeroMageOrSingleSummon(unit)) {
    leftStateLine = renderMovementpoints(unit) + " " + renderControlzone(unit);
  }
  if (isGiantOrAutomaton(unit)) {
    leftStateLine = renderMovementLargeElements(unit) + " " + renderOverrunValue(unit);
  }
  if (isUnitOrSummonedUnit(unit)) {
    leftStateLine = renderUnitMovement(unit) + "  " + renderManeuvers(unit);
  }

  // unlike the pdf and html cards, the old txt files had no "/" to separate values.
  leftStateLine = leftStateLine.replaceAll("/", "");

  const formationsString = addClassicFormationStrings(unit);

  const leftTextLength = leftStateLine.length + formationsString.length;
  const rightTextLength = renderSpecialElements(unit).length + numberOfElements(unit).length;

  const centerPadding = addAdjustablePadding(HALF_CARD_WIDTH - 1, leftTextLength);
  const rightPadding = addAdjustablePadding(HALF_CARD_WIDTH - 2, rightTextLength);

  return (
    LINE_START +
    leftStateLine +
    centerPadding +
    formationsString +
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

  const STAT_LINE = initiativeSetter(unit) + ` ${CARD_TEXT.SIZE}${unit.unitSize} ${chargeBonusString}`;

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
