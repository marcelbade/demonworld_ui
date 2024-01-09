export const ARMOUR_MELEE = "armourMelee";
export const ARMOUR_RANGE = "armourRange";
export const FEAR = "fear";
export const MOVE = "move";
export const SKIRMISH = "skirmish";
export const CHARGE = "skillMelee";
export const SKILL_MELEE = "skillMelee";
export const SKILL_RANGE = "skillRange";
export const INITIATIVE = "initiative";
export const MORAL1 = "moral1";
export const MORAL2 = "moral2";

const statMapping = {
  armourMelee: "altersArmourMelee",
  armourRange: "altersArmourRange",
  fear: "altersFear",
  move: "altersMove",
  skirmish: "altersSkirmish",
  charge: "altersCharge",
  skillMelee: "altersSkillMelee",
  skillRange: "altersSkillRange",
  initiative: "altersInitiative",
  moral1: "altersMoral1",
  moral2: "altersMoral2",
};

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

/**
 * Function calculates the new value for a unit's stat
 * after choosing an item that permanently changes a stat.
 * @param {unitCard} unit
 * @param {String} statName
 * @returns
 */
export const setStat = (unit, statName) => {
  let stat = unit[statName];

  const result = searchForRelevantModifier(unit, statMapping[statName]);

  if (result.modifierFound) {
    stat += result.modifier;
  }

  return stat;
};

// TODO command stars ->  Uhrgs Stirnreif, range weopon stat -> Der Bogen von Iconessa
// bonus -> Greifenfedern
//TODO übetrqagungsfehler in der DB
// TODO: you somehow destroyed the pdf card view...
// TODO schwerer Fehler! bei den Goblins: Schamamen UND Helden =< 30%!

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
