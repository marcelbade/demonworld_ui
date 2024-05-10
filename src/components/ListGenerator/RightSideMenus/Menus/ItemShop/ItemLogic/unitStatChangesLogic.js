/**
 * Since all item properties that alter unit stats follow the same naming convention,
 * the mapping is done via a simple String concotenation
 * + making the first character of the stat's name upper case.
 * E.g.: moral2 => altersMoral2.
 * @param {String} unitStat
 * @returns a String that is the name of the corresponding item property.
 */
const mapUnitStatToItemProperty = (unitStat) => {
  unitStat = unitStat.charAt(0).toUpperCase() + unitStat.slice(1);
  return `alters${unitStat}`;
};

/**
 * Function calculates the stats for a unit's first weapon.
 * (weapon 1)
 * @param {unitCard} unit
 * @returns the value for the property weapon1
 */
export const weapon1Stats = (unit) => {
  let weapon1Properties = { name: unit.weapon1Name, value: unit.weapon1 };
  const result = searchForRelevantModifier(unit, "altersWeapon1");

  if (result.modifierFound) {
    weapon1Properties = {
      ...weapon1Properties, //
      name: result.newName,
      value: calculateNewMeleeWeaponValue(unit, result.modifier),
    };
  }

  return weapon1Properties;
};

/**
 * Function calculates the stats for a unit's range weapon.
 * @param {unitCard} unit
 * @returns
 */
export const rangedWeaponStats = (unit) => {
  let rangedWeaponProperties = { name: unit.rangedWeapon, value: unit.rangedAttackStats };
  const result = searchForRelevantModifier(unit, "altersRangedWeapon");

  if (result.modifierFound) {
    rangedWeaponProperties = {
      ...rangedWeaponProperties, //
      name: result.newName,
      value: result.modifier,
    };
  }

  return rangedWeaponProperties;
};

/**
 * Function calculates the new value for a unit's stat
 * after choosing an item that permanently changes a stat.
 * @param {unitCard} unit
 * @param {String} stateName
 * @returns
 */
export const setUnitStat = (unit, unitStatName) => {

  

  let stat = unit[unitStatName];

  const result = searchForRelevantModifier(unit, mapUnitStatToItemProperty(unitStatName));

  if (result.modifierFound) {
    stat += result.modifier;
  }

  return stat;
};

/**
 * Function iterates through a unit's items, if they exist.
 * If one of the items has the correct property with a value !== 0
 * it is returned. If several items fullfill the requirement,
 * the largest value is returnd.
 * @param {unitCard} unit
 * @param {String} property
 * @returns the modifier for the given unit property. If none is found, 0 is returned.
 */
const searchForRelevantModifier = (unit, property) => {
  let replacementStats = {
    modifierFound: false,
    modifier: 0,
  };

  if (unitHasItems(unit)) {
    unit.equipment.forEach((item) => {
      const itemFields = Object.entries(item);
      itemFields.forEach((i) => {
        //i = [property, value]
        if (i[0] === property && i[1] !== 0 && i[1] > replacementStats.modifier) {
          replacementStats = {
            ...replacementStats, //
            modifierFound: true,
            newName: item.itemName,
            modifier: i[1],
          };
        }
      });
    });
  }

  return replacementStats;
};

/**
 * Function tests if the unit has been equipped with one or more items.
 * @param {unitCard} unit
 * @returns true, if the unit has at least 1 item.
 */
const unitHasItems = (unit) => {
  return unit.equipment !== undefined && unit.equipment.length !== 0;
};

/**
 * Function calculates the new value of the unit's melee attack
 * when chosing a magical weapon.
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
  if (unit.unitSize <= MAX_SIZE) {
    newWeapon1Value += unit.unitSize;
  } else {
    newWeapon1Value += MAX_SIZE;
  }

  // leader always has +1
  if (unit.leader) {
    newWeapon1Value += LEADER_BONUS;
  }

  // has a mount
  if (unit.isMounted) {
    newWeapon1Value += BONUS;
  }

  // 5 Miniatures per base (closed order)
  if (unit.closedOrder) {
    newWeapon1Value += BONUS;
  }

  // second hand weapon
  if (unit.twoHandWeapons) {
    newWeapon1Value += BONUS;
  }

  return newWeapon1Value;
};
