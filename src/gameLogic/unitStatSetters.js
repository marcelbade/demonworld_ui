import {
  INITIATIVE, //
  WEAPON_1,
  WEAPON_2,
  CHARGE_BONUS,
  RANGED_WEAPON_STATS,
  FEAR,
  MORAL1,
  MORAL2,
} from "../constants/stats";
import { setUnitStat } from "./unitStatChangeLogic/unitStatChangesLogic";

import { CARD_TEXT } from "../constants/textsAndMessages";

/**
 * Function calculates the initiative stat's display value for the
 * the card preview and pdf.
 * @param {unitCard} unit
 * @returns the stat's value.
 */
export const initiativeSetter = (unit) => {
  return setUnitStat(unit, INITIATIVE);
};

/**
 * Function calculates the weapon stats' display value for the
 * the card preview and pdf.
 * @param {unitCard} unit
 * @returns an array containing the final display values
 * for the unit's weapons.
 */
export const  meleeWeaponSetter = (unit) => {
  const weapon1Stat = setUnitStat(unit, WEAPON_1);
  const weapon2Stat = setUnitStat(unit, WEAPON_2);

  return [
    {
      weaponString:
        unit.weapon1 === 0 //
          ? null
          : `${weapon1Stat.name}: ${weapon1Stat.value}`,
    },
    {
      weaponString:
        unit.weapon2 === 0 //
          ? null
          : `${unit.weapon2Name}: ${weapon2Stat}`,
    },
    {
      weaponString:
        unit.weapon3 === 0 //
          ? null
          : `${unit.weapon3Name}: ${unit.weapon3}`,
    },
  ];
};

/**
 * Function calculates the charge bonus' display value for
 * the card preview, pdf and text file.
 * @param {unitCard} unit
 * @returns the stat's value
 */
export const chargeBonusSetter = (unit) => {
  const result = setUnitStat(unit, CHARGE_BONUS);

  return `${CARD_TEXT.CHARGE_BONUS} ${result}`;
};

export const rangedWeaponSetter = (unit) => {
  const result = setUnitStat(unit, RANGED_WEAPON_STATS);

  return `${result.name} ${result.value}`;
};

/**
 * Function calculates the fear stat's display value
 * for the card preview and pdf.
 * @param {unitCard} unit
 * @returns the stat's value
 */
export const fearSetter = (unit) => {
  const fearStat = setUnitStat(unit, FEAR);

  return `${CARD_TEXT.FEAR}: ${fearStat}`;
};

/**
 * Function calculates the moral stats' display value
 * for the card preview and pdf.
 * @param {unitCard} unit
 * @returns the stats' values
 */
export const moralSetter = (unit) => {
  const moral1Stat = setUnitStat(unit, MORAL1);
  const moral2Stat = setUnitStat(unit, MORAL2);

  return `${CARD_TEXT.MORAL} ${
    unit.moral1 !== 0 //
      ? moral1Stat
      : "-"
  } / ${
    unit.moral2 !== 0 //
      ? moral2Stat
      : "-"
  }`;
};
