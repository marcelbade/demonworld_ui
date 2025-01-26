// constants
import { CHARGE, MOVE, SKIRMISH, HOLD, OVERRUN } from "../../constants/stats";
import { CARD_TEXT } from "../../constants/textsAndMessages";
// functions
import { setUnitStat } from "../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";

/**
 * Function creates a String that contains the movement value for heroes/mages/summons.
 * @param {unitCard} unit
 * @param {Boolean} value
 * @returns a String as content for an HTML or pdf element.
 */
export const renderMovementpoints = (unit) => {
  const MovementStat = setUnitStat(unit, MOVE);

  return `${MovementStat.value} ${CARD_TEXT.MOVEMENT_POINTS}`;
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
export const renderUnitMovement = (unit) => {
  const movementStat = setUnitStat(unit, MOVE);
  const chargeStat = setUnitStat(unit, CHARGE);
  const skirmishStat = setUnitStat(unit, SKIRMISH);

  return (
    `${CARD_TEXT.MOVE}: ${movementStat.value} ` +
    `/ ${CARD_TEXT.CHARGE}: ${chargeStat.value} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${skirmishStat.value}`
  );
};

/**
 * Function creates a String that contains the movement valu for large elements.
 * @param {unitCard} unit
 * @param {Boolean} stat
 * @returns a String as content for an HTML or pdf element.
 */
export const renderMovementLargeElements = (unit) => {
  const movementStat = setUnitStat(unit, MOVE);
  const chargeStat = setUnitStat(unit, CHARGE);
  const skirmishStat = setUnitStat(unit, SKIRMISH);
  const holdStat = setUnitStat(unit, HOLD);

  return (
    `${CARD_TEXT.MOVE}: ${movementStat.value} ` +
    `/ ${CARD_TEXT.CHARGE}: ${chargeStat.value} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${skirmishStat.value} ` +
    `/ ${CARD_TEXT.HOLD}: ${holdStat.value}`
  );
};

/**
 * Function creates a String that contains the overrun value for automatons and large elements.
 * @param {unitCard} unit
 * @param {Boolean} stat
 * @returns a String as content for an HTML or pdf element.
 */
export const renderOverrunValue = (unit) => {
  const overrunStat = setUnitStat(unit, OVERRUN);

  return `${CARD_TEXT.OVERRUN}: ${overrunStat.value}`;
};

/**
 * Function creates a String that contains the number of maneuvers.
 * @param {unitCard} unit
 * @returns a String as content for an HTML or pdf element.
 */
export const renderManeuvers = (unit) => {

  const  holdStat = setUnitStat(unit, HOLD);


  return `${holdStat.value} ${CARD_TEXT.MANEUVER}`;
};

/**
 * Function creates a String that contains whether the unit is a horde.
 * @param {unitCard} unit
 * @returns a String as content for an HTML or pdf element.
 */
export const renderHorde = (isHorde) => {
  return `${isHorde ? CARD_TEXT.HORDE : ""}`;
};

/**
 * Function creates a String that contains the maxiumum movmenet for certain summons.
 * @param {unitCard} unit
 * @returns a String as content for an HTML or pdf element.
 */
export const renderMaxFields = (unit) => {
  return `${CARD_TEXT.MAX_FIELDS_MOVE(unit.move)}`;
};
