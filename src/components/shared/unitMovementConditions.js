// constants
import { GIANT, HERO, MAGE, UNIT, SUMMONED, AUTOMATON } from "../../constants/unitTypes";

/**
 * Function tests whether the passed unit card is of the type.
 * @param {unitCard} unit
 * @returns true, if unit is hero, mage or a single element summons.
 */
export const isHeroMageOrSingleSummon = (unit) => {
  return (
    unit.unitType === HERO || unit.unitType === MAGE || (unit.unitType === SUMMONED && unit.numberOfElements === 1 && !unit.maxFieldsMove)
  );
};

/**
 * Function tests whether the passed unit card is of the type.
 * @param {unitCard} unit
 * @returns true, if unit is a large element or an automaton, siege engine, ....
 */
export const isGiantOrAutomaton = (unit) => unit.unitType === GIANT || unit.unitType === AUTOMATON;

/**
 * Function tests whether the passed unit card is of the type.
 * @param {unitCard} unit
 * @returns true, if unit is a (summoned) infantry or cavalry unit.
 */
export const isUnitOrSummonedUnit = (unit) => {
  return unit.unitType === UNIT || (unit.unitType === SUMMONED && unit.numberOfElements > 1 && !unit.maxFieldsMove);
};

/**
 * Function tests whether the passed unit card is of the type.
 * @param {unitCard} unit
 * @returns true, if the unit is a summons with a given maximum movement range isntead of movement points.
 */
export const isSummonsWithMaxFields = (unit) => {
  return unit.unitType === SUMMONED && unit.maxFieldsMove;
};
