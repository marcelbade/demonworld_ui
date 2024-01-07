/**
 * Function calculates the stats for a unit's first weapon.
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

export const meleeArmorStat = (unit) => {
  let meleeArmor = unit.armourMelee;

  const result = searchForRelevantModifier(unit, "altersArmourMelee");

  if (result.modifierFound) {
    meleeArmor += result.modifier;
  }

  return meleeArmor;
};

export const rangeArmorStat = (unit) => {
  let rangeArmor = unit.armourRange;

  const result = searchForRelevantModifier(unit, "altersArmourRange");

  if (result.modifierFound) {
    rangeArmor += result.modifier;
  }

  return rangeArmor;
};

export const fearStat = (unit) => {
  let fearFactor = unit.fear;

  const result = searchForRelevantModifier(unit, "altersFear");

  if (result.modifierFound) {
    fearFactor += result.modifier;
  }

  return fearFactor;
};

export const movementStat = (unit) => {
  let movementFactor = unit.fear;

  const result = searchForRelevantModifier(unit, "altersMove");

  if (result.modifierFound) {
    movementFactor += result.modifier;
  }

  return movementFactor;
};

export const skirmishStat = (unit) => {
  let skirmishFactor = unit.fear;

  const result = searchForRelevantModifier(unit, "altersSkirmish");

  if (result.modifierFound) {
    skirmishFactor += result.modifier;
  }

  return skirmishFactor;
};

export const chargeStat = (unit) => {
  let chargeFactor = unit.fear;

  const result = searchForRelevantModifier(unit, "altersCharge");

  if (result.modifierFound) {
    chargeFactor += result.modifier;
  }

  return chargeFactor;
};

export const meleeSkillStat = (unit) => {
  let skillMelee = unit.skillMelee;

  const result = searchForRelevantModifier(unit, "altersSkillMelee");

  if (result.modifierFound) {
    skillMelee += result.modifier;
  }

  return skillMelee;
};

export const rangeSkillStat = (unit) => {
  let skillRange = unit.skillRange;

  const result = searchForRelevantModifier(unit, "altersSkillRange");

  if (result.modifierFound) {
    skillRange += result.modifier;
  }

  return skillRange;
};

export const initiativeStat = (unit) => {
  let initiative = unit.initiative;

  const result = searchForRelevantModifier(unit, "altersInitiative");

  if (result.modifierFound) {
    initiative += result.modifier;
  }

  return initiative;
};

export const moral1Stat = (unit) => {
  let moral1 = unit.moral1;

  const result = searchForRelevantModifier(unit, "altersMoral1");

  if (result.modifierFound) {
    moral1 += result.modifier;
  }

  return moral1;
};

export const moral2Stat = (unit) => {
  let moral2 = unit.moral2;

  const result = searchForRelevantModifier(unit, "altersMoral2");

  if (result.modifierFound) {
    moral2 += result.modifier;
  }

  return moral2;
};

// TODO command stars ->  Uhrgs Stirnreif, range weopon stat -> Der Bogen von Iconessa
// bonusb -> Greifenfedern

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
    name: null,
    modifier: 0,
  };

  if (unit.equipment !== undefined && unit.equipment.length !== 0) {
    unit.equipment.forEach((e) => {
      const itemFields = Object.entries(e);
      itemFields.forEach((i) => {
        //i = [property, value]
        if (i[0] === property && i[1] !== 0 && i[1] > replacementStats.modifier) {
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
