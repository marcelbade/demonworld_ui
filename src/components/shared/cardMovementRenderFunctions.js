// constants
import { CHARGE, MOVE, SKIRMISH, HOLD, OVERRUN } from "../../constants/stats";
import { CARD_TEXT } from "../../constants/textsAndMessages";
// functions
import { setUnitStat } from "../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/unitStatChangesLogic";

/**
 * Function creates a String that contains the movement value for heroes/mages/summons.
 * @param {unitCard} unit
 * @param {Boolean} value
 * @returns a String as content for an HTML or pdf element.
 */
export const renderMovementpoints = (unit, stat) => {
  const resultingValue = stat.isDynamic ? setUnitStat(unit, MOVE) : unit.move;

  return `${resultingValue} ${CARD_TEXT.MOVEMENT_POINTS}`;
};

/**
 * Function creates a String that contains the control zone value for heroes/mages.
 * @param {unitCard} unit
 * @returns a String as content for an HTML or pdf element.
 */
export const renderControlzone = (unit) => {
  return `${CARD_TEXT.CONTROL_AREA}: ${unit.controlZone}`;
};

/**
 * Function creates a String that contains the movement values for (summoned) units.
 * @param {unitCard} unit
 * @param {Boolean} stat
 * @returns a String as content for an HTML or pdf element.
 */
export const renderUnitMovement = (unit, stat) => {
  const resultingMoveValue = stat.isDynamic ? setUnitStat(unit, MOVE) : unit.move;
  const resultingChargeValue = stat.isDynamic ? setUnitStat(unit, CHARGE) : unit.charge;
  const resultingSkirmishValue = stat.isDynamic ? setUnitStat(unit, SKIRMISH) : unit.skirmish;

  return (
    `${CARD_TEXT.MOVE}: ${resultingMoveValue} ` +
    `/ ${CARD_TEXT.CHARGE}: ${resultingChargeValue} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${resultingSkirmishValue}`
  );
};

/**
 * Function creates a String that contains the movement valu for large elements.
 * @param {unitCard} unit
 * @param {Boolean} stat
 * @returns a String as content for an HTML or pdf element.
 */
export const renderMovementLargeElements = (unit, stat) => {
  const resultingMoveValue = stat.isDynamic ? setUnitStat(unit, MOVE) : unit.move;
  const resultingChargeValue = stat.isDynamic ? setUnitStat(unit, CHARGE) : unit.charge;
  const resultingSkirmishValue = stat.isDynamic ? setUnitStat(unit, SKIRMISH) : unit.skirmish;
  const resultingHoldValue = stat.isDynamic ? setUnitStat(unit, HOLD) : unit.hold_maneuvers;

  return (
    `${CARD_TEXT.MOVE}: ${resultingMoveValue} ` +
    `/ ${CARD_TEXT.CHARGE}: ${resultingChargeValue} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${resultingSkirmishValue} ` +
    `/ ${CARD_TEXT.HOLD}: ${resultingHoldValue}`
  );
};

/**
 * Function creates a String that contains the overrun value for automatons and large elements.
 * @param {unitCard} unit
 * @param {Boolean} stat
 * @returns a String as content for an HTML or pdf element.
 */
export const renderOverrunValue = (unit, stat) => {
  const resultingValue = stat.isDynamic ? setUnitStat(unit, OVERRUN) : unit.overRun;
  return `${CARD_TEXT.OVERRUN}: ${resultingValue}`;
};

/**
 * Function creates a String that contains the number of maneuvers.
 * @param {unitCard} unit
 * @returns a String as content for an HTML or pdf element.
 */
export const renderManeuvers = (unit) => {
  return `${unit.hold_maneuvers} ${CARD_TEXT.MANEUVER}`;
};

/**
 * Function creates a String that contains whether the unit is a horde.
 * @param {unitCard} unit
 * @returns a String as content for an HTML or pdf element.
 */
export const renderHorde = (unit) => {
  return `${unit.isHorde ? CARD_TEXT.HORDE : ""}`;
};

/**
 * Function creates a String that contains the maxiumum movmenet for certain summons.
 * @param {unitCard} unit
 * @returns a String as content for an HTML or pdf element.
 */
export const renderMaxFields = (unit) => {
  return `${CARD_TEXT.MAX_FIELDS_MOVE(unit.move)}`;
};
