import { uuidGenerator } from "../shared/sharedFunctions";

/**
 * Function filters unit card arrays for a sub faction.
 * @param {String} subFaction
 * @returns An array of unit card objects filtered for a a sub faction.
 */
export const filterForSubFaction = (units, subFaction) => {
  return units.filter((u) => u.subFaction === subFaction);
};

/**
 * Function returns all distinct subFactions of a selected faction.
 * @param {[unitCard object]} units
 * @returns [String] name of all distinct subFactions
 */
export const findDistinctSubfactions = (units) => {
  let distinctSubFactions = [];

  units.forEach((f) => {
    if (!distinctSubFactions.includes(f.subFaction)) {
      distinctSubFactions.push(f.subFaction);
    }
  });

  return distinctSubFactions;
};

export const enrichUnitCardObject = (unit) => {
  unit = addUniqueIdToUnit(unit);
  unit = addLossCounterToUnit(unit);
  unit = addEquipmentSlotsToUnit(unit);

  return unit;
};

/**
 * Functions adds a UUID as unique id so the user can select the
 * same unit twice in a row. Without it, the useEffect does not fire, since the
 * unit objects are identical!
 *
 * @param {} unit
 * @returns {} unit object with a random ID
 */
const addUniqueIdToUnit = (unit) => {
  const randomID = uuidGenerator();
  return { ...unit, uniqueID: randomID };
};

/**
 * Function adds a property that counts the number of lost elements the unit has suffered. Needed for the loss calculator module.
 * @param {*} unit
 * @returns {} unit object with a lossCounter property
 */
const addLossCounterToUnit = (unit) => {
  const max = unit.numberOfElements * unit.hitpoints;

  return {
    ...unit,
    lossCounter: 0,
    maxCounter: max,
    unitDestroyed: false,
  };
};

/**
 * Function adds a property which allows equipment to be added as well as check what equipment can be added.
 * @param {*} unit
 * @returns unit object with equipment + equipmentTypes property.
 */
const addEquipmentSlotsToUnit = (unit) => {
  return {
    ...unit,
    equipment: [],
    equipmentTypes: {
      magicItem: false,
      banner: false,
      musician: false,
    },
  };
};
