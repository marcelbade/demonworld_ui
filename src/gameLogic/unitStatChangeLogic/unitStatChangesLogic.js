//  constants
import { ITEM_TYPE_BOWS, ITEM_TYPE_CROSSBOWS, ITEM_TYPE_WEAPON } from "../../constants/itemShopConstants";
import { RANGED_WEAPON, WEAPON_1, RANGED_WEAPON_STATS } from "../../constants/stats";



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

/**
 * Function sets the passed stat if the unit has no items. Note that the
 * first weapon and ragend weapon always require a name.
 * @param {unitCard} unit
 * @param {String} unitStatName
 * @returns an object containing the stat' value and the name in case it is the
 * units first meleee or ranged weapon.
 */
const setStatWithoutItems = (unit, unitStatName) => {
  return {
    name: setDefaultName(unit, unitStatName), //
    value: unit[unitStatName],
  };
};

/**
 * Function sets default names for weapons. Since Weapons are only renamed when an a weapon type item is equipped, a default name must be set.  
 * @param {Obj} unit 
 * @param {String} unitStatName 
 * @returns 
 */
const setDefaultName = (unit, unitStatName) => {
  let newName = "";

  if (unitStatName === WEAPON_1) {
    newName = unit.weapon1Name;
  }

  if (unitStatName === RANGED_WEAPON_STATS) {
    newName = unit.rangedWeapon;
  }

  return newName;
};

/**
 * Function iterates through a unit's items. If one of the
 * items has a property with a name matching the passed property name
 * and with a value not equal to 0, it is returned. If several items fullfill the requirement,
 * the largest value is returned.
 * @param {unitCard} unit
 * @param {String} unitStat
 * @returns an object containing the name (in case of weapons) and the stats' new value.
 */
const searchForRelevantModifier = (unit, unitStat) => {
  let newStats = {
    name: setDefaultName(unit, unitStat),
    value: unit[unitStat],
  };

  unit.equipment.forEach((item) => {
    const itemFields = Object.entries(item);

    itemFields.forEach((i) => {
      const fieldName = i[0];
      const fieldValue = i[1];

      if (fieldName === unitStat && fieldValue !== 0) {
        newStats = {
          ...newStats, //
          name: setNewName(item, unitStat, unit),
          value: setValue(fieldValue, unitStat, unit),
        };

        newStats.value = setValue(fieldValue, unitStat, unit);
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

/**
 * Function calculates the new value for the given property.
 * @param {number} modificator
 * @param {String} propertyName
 * @param {Obj} unit
 * @returns the new value for the given property.
 */
const setValue = (modificator, propertyName, unit) => {
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

const setNewName = (item) => {
  const isWeapon = item.itemType === ITEM_TYPE_WEAPON;
  const isCrossbow = item.itemType === ITEM_TYPE_CROSSBOWS;
  const isBow = item.itemType === ITEM_TYPE_BOWS;

  let name = "";

  if (isWeapon || isBow || isCrossbow) {
    name = item.itemName;
  }

  return name;
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
  const BONUS = 2;
  const LEADER_BONUS = 1;

  let newWeapon1Value = modifier;

  // size bonus - capped at 4
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
