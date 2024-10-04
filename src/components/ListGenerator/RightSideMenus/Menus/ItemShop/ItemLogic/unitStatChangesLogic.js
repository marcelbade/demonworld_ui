//  constants
import { ITEM_TYPE_BOWS, ITEM_TYPE_CROSSBOWS, ITEM_TYPE_WEAPON } from "../../../../../../constants/itemShopConstants";
import { RANGED_WEAPON, WEAPON_1 } from "../../../../../../constants/stats";

/**
 * Function calculates the new value for a unit's stat
 * after choosing an item that permanently changes a stat.
 * @param {unitCard} unit
 * @param {String} stateName
 * @returns
 */
export const setUnitStat = (unit, unitStatName) => {
  if (unitHasNoItems(unit)) {
    return setStatWithoutItems(unit, unitStatName);
  }

  return searchForRelevantModifier(unit, unitStatName);
};

const setStatWithoutItems = (unit, unitStatName) => {
  let newName = unitStatName;
  if (unitStatName === WEAPON_1) {
    newName = unit.weapon1Name;
  }
  if (unitStatName === RANGED_WEAPON) {
    newName = unit.rangedWeapon;
  }

  return { name: newName, value: unit[unitStatName] };
};

/**
 * Function iterates through a unit's items, if they exist. If one of the
 * items has a property with a name matching the passed proprty name
 * and with a value !== 0 it is returned. If several items fullfill the requirement,
 * the largest value is returned.
 * @param {unitCard} unit
 * @param {String} propertyName
 * @returns the modifier for the given unit property. If none is found, 0 is returned.
 */
const searchForRelevantModifier = (unit, propertyName) => {
  let newStats = {
    name: null,
    value: 10,
  };

  unit.equipment.forEach((item) => {
    const itemFields = Object.entries(item);

    itemFields.forEach((i) => {
      const fieldName = i[0];
      const fieldValue = i[1];

      if (
        fieldName === propertyName && //
        fieldValue !== 0 &&
        fieldValue > newStats.value
      ) {
        newStats = {
          ...newStats, //
          name: setNewName(item, propertyName), // NEW --> ONLY WEAPONS !!
          value: setModifier(fieldValue, propertyName, unit),
        };
      }
    });
  });

  return newStats;
};

/**
 * Function tests if the unit has been equipped with one or more items.
 * @param {unitCard} unit
 * @returns true, if the unit has no items.
 */
const unitHasNoItems = (unit) => {
  return unit.equipment === undefined || unit.equipment.length === 0;
};

const setModifier = (modificator, propertyName, unit) => {
  let newValue = 0;

  if (propertyName === WEAPON_1) {
    newValue = calculateNewMeleeWeaponValue(unit, modificator);
  } else if (propertyName === RANGED_WEAPON) {
    newValue = modificator;
  } else {
    newValue = unit[propertyName] + modificator;
  }

  return newValue;
};

const setNewName = (item, propertyName) => {
  const isWeapon = item.itemType === ITEM_TYPE_WEAPON;
  const isCrossbow = item.itemType === ITEM_TYPE_CROSSBOWS;
  const isBow = item.itemType === ITEM_TYPE_BOWS;

  console.log("1wwewe");

  if (isWeapon || isBow || isCrossbow) {
    return item.itemName;
  }

  console.log("propertyName", propertyName);

  return propertyName;
};

/**
 * Function recalculates the value of a unit's melee attack
 * after chosing a magical weapon.
 * @param {unitCard} unit
 * @param {int} modifier of chosen weapon
 * @returns the new value of the melee attack
 */
const calculateNewMeleeWeaponValue = (unit, modifier) => {
  const MAX_SIZE = 4;
  const LEADER_BONUS = 1;
  const BONUS = 2;

  let newWeapon1Value = modifier;

  // size bonus - capped at 4 for giant mounts
  newWeapon1Value = unit.unitSize <= MAX_SIZE ? (newWeapon1Value += unit.unitSize) : (newWeapon1Value += MAX_SIZE);

  // leader always has +1
  newWeapon1Value = unit.leader ? (newWeapon1Value += LEADER_BONUS) : newWeapon1Value;

  // unit is mounted
  newWeapon1Value = unit.isMounted ? (newWeapon1Value += BONUS) : newWeapon1Value;

  // 5 miniatures per base (closed order)
  newWeapon1Value = unit.closedOrder ? (newWeapon1Value += BONUS) : newWeapon1Value;

  // unit is equipped with a second hand weapon
  newWeapon1Value = unit.twoHandWeapons ? (newWeapon1Value += BONUS) : newWeapon1Value;

  return newWeapon1Value;
};
