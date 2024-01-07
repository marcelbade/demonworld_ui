/**
 * Function calculates the value of a unit's first weapon
 * (weapon 1)
 * @param {unitCard} unit
 * @returns the value for the property weapon1
 */
export const weapon1stats = (unit) => {
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
 * Function iterates througha units items, if they exist.
 * If one of the items has the correct property with a value > 0
 * it is returned. If several items fullfill the requirement,
 * the largest value is returnd.
 * @param {unitCard} unit
 * @param {String} property
 * @returns the modifier for the given unit property. If none is found, 0 is returned.
 */
const searchForRelevantModifier = (unit, property) => {
  let replacementStats = {
    modifierFound: false,
    name: null,
    modifier: 0,
  };

  if (unit.equipment !== undefined && unit.equipment.length !== 0) {
    unit.equipment.forEach((e) => {
      const itemFields = Object.entries(e);
      itemFields.forEach((i) => {
        //i = [property, value]
        if (i[0] === property && i[1] > 0 && i[1] > replacementStats.modifier) {
          replacementStats = {
            ...replacementStats, //
            modifierFound: true,
            newName: e.itemName,
            modifier: i[1],
          };
        }
      });
    });
  }

  return replacementStats;
};

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

  // has mount
  if (unit.isMounted) {
    newWeapon1Value += BONUS;
  }

  // 5 Miniatures per base
  //  TODO add to DB!
  if (unit.closedOrder) {
    newWeapon1Value += BONUS;
  }

  // second hand weapon
  if (unit.twoHandWeapons) {
    newWeapon1Value += BONUS;
  }

  return newWeapon1Value;
};

export const meleeArmorValue = (unit, item) => {
  return item.altersArmourMelee //
    ? calculateNewMeleeArmorValue(unit, item)
    : unit.armourMelee;
};

const calculateNewMeleeArmorValue = (unit, item) => {
  return unit.armourMelee + item.altersArmourMelee;
};

export const rangeArmorValue = (unit, item) => {
  return item.altersArmourRange //
    ? calculateNewRangeArmorValue(unit, item)
    : unit.armourRange;
};

const calculateNewRangeArmorValue = (unit, item) => {
  return unit.armourRange + item.altersArmourRange;
};
