//  constants
import { WEAPON_1, RANGED_WEAPON_STATS } from "../../constants/stats";
import { ITEM_TYPE_WEAPON, NOT_A_RANGE_WEAPON } from "../../constants/itemShopConstants";

/**
 * Function calculates the new value for a unit's stat
 * after an item that permanently changes a stat was selected.
 * There are two use cases:
 * - weapons: change the weapon name recalculated the weapon#s attack value
 * - items: simply add a fixed bonus to astat
 * @param {unitCard} unit
 * @param {String} stateName
 * @returns the new numeric value of the stat (and new weapon name, if applicable).
 */
export const setUnitStat = (unit, unitStatName) => {
  // return the default value, if no range weapon has been picked
  if (
    unitStatName === RANGED_WEAPON_STATS && //
    (unitHasNoEquipment(unit) || unitHasNoRangeWeapons(unit))
  ) {
    return {
      name: unit.rangedWeapon,
      value: unit[unitStatName],
    };
    // return the default value, if no melee weapon has been picked
  } else if (
    unitStatName === WEAPON_1 && //
    (unitHasNoEquipment(unit) || unitHasNoMeleeWeapon(unit))
  ) {
    return {
      name: unit.weapon1Name,
      value: unit[unitStatName],
    };
    // calculate the final value for the equipped melee weapon
  } else if (unitStatName === WEAPON_1) {
    return calculateMeleeValue(unit, unitStatName);
  }
  // calculate the value for the equipped ranged weapon
  else if (unitStatName === RANGED_WEAPON_STATS) {
    return calculateRangeValue(unit);
  }
  // add any boni given by any other kind of item
  else {
    return addBonus(unit, unitStatName);
  }
};

/**
 * Function tests whether the unit has no equipment.
 * @param {unitCard} unit
 * @returns true, if the equipment array is undefined or empty
 */
const unitHasNoEquipment = (unit) => {
  return unit.equipment === undefined || unit.equipment.length === 0;
};

/**
 * Function tests whether the unit has no items that are range weapons.
 * @param {unitCard} unit
 * @returns true, if the equipment array contains no
 * items that are range weapons
 */
const unitHasNoRangeWeapons = (unit) => {
  let hasNoRangeWeapon = true;

  unit.equipment.forEach((item) => {
    if (item.rangedWeapon !== NOT_A_RANGE_WEAPON) {
      hasNoRangeWeapon = false;
    }
  });

  return hasNoRangeWeapon;
};

/**
 * Function tests whether the unit has no items that are melee weapons.
 * @param {unitCard} unit
 * @returns true, if the equipment array contains no
 * items that are melee weapons
 */
const unitHasNoMeleeWeapon = (unit) => {
  let hasNoMeleeWeapon = true;

  unit.equipment.forEach((item) => {
    if (item.itemType === ITEM_TYPE_WEAPON || item.weapon1 > 0) {
      hasNoMeleeWeapon = false;
    }
  });

  return hasNoMeleeWeapon;
};

/**
 * Function calculates the new melee value of a
 * unit that has a weapon or item that changes the value
 * equipped.
 * @param {unitCard} unit
 * @param {*} unitStatName
 * @returns the new value of the unit's melee attack stat.
 */
const calculateMeleeValue = (unit, unitStatName) => {
  // possible boni
  const MAX_SIZE = 4;
  const BONUS = 2;
  const LEADER_BONUS = 1;

  let weaponStats;
  let isWeapon = false;

  unit.equipment.forEach((item) => {
    if (item[unitStatName] > 0 && item.itemType === ITEM_TYPE_WEAPON) {
      weaponStats = { name: item.itemName, value: item[unitStatName] };
      isWeapon = true;
    } else if (item[unitStatName] > 0 && item.itemType !== ITEM_TYPE_WEAPON) {
      weaponStats = { name: unit.weapon1Name, value: unit.weapon1 + item[unitStatName] };
    }
  });

  if (isWeapon) {
    // size bonus - capped at +4
    weaponStats.value = unit.unitSize <= MAX_SIZE ? (weaponStats.value += unit.unitSize) : (weaponStats.value += MAX_SIZE);

    // leader always has +1
    weaponStats.value = unit.leader ? (weaponStats.value += LEADER_BONUS) : weaponStats.value;

    // unit is mounted
    weaponStats.value = unit.isMounted ? (weaponStats.value += BONUS) : weaponStats.value;

    // 5 miniatures per base (closed order)
    weaponStats.value = unit.closedOrder ? (weaponStats.value += BONUS) : weaponStats.value;

    // unit is equipped with a second hand weapon
    weaponStats.value = unit.hasTwoWeapons ? (weaponStats.value += BONUS) : weaponStats.value;
  }

  return weaponStats;
};

/**
 * Function calculates the new range value of a
 * unit that has a weapon or item that changes the value
 * equipped.
 * @param {unitCard} unit
 * @returns the new value of the unit's range attack stat.
 */
const calculateRangeValue = (unit) => {
  let weapon;

  unit.equipment.forEach((item) => {
    if (item.rangedWeapon !== NOT_A_RANGE_WEAPON) {
      weapon = { name: item.itemName, value: item.rangedWeapon };
    }
  });

  return weapon;
};

/**
 * Function adds boni from any items that is not a weapon.
 * Since theoritcally, multiple items can give a bonus to the same
 * stat, but boni are never cumulative, the logic picks only the highest bonus.
 * If no bonus is found, the stat's default value is returned.
 * @param {unitStatCard} unit
 * @param {String} unitStatName
 * @returns the sum of the value of the stat + the highes bonus.
 */
const addBonus = (unit, unitStatName) => {
  let unmodifiedStat = unit[unitStatName];
  let result = 0;

  unit.equipment.forEach((item) => {
    if (item[unitStatName] !== 0 && item[unitStatName] + unmodifiedStat > result) {
      result = unmodifiedStat + item[unitStatName];
    }
  });

  return unmodifiedStat > result ? unmodifiedStat : result;
};
