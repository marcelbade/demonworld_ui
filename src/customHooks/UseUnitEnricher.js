import { uuidGenerator } from "../util/utilityFunctions";

const useUnitEnricher = (unit) => {
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
   * There are, at this moment, 5 types of items. Each type can be selected once.
   * @param {unitCard object} unit
   * @returns unit object with equipment + equipmentTypes property.
   */
  const addEquipmentSlotsToUnit = (unit) => {
    return {
      ...unit,
      equipment: [],
      equipmentTypes: {
        magicItem: false,
        // used for units only
        banner: false,
        instrument: false,
        unit: false,
        fortifications: false,
      },
    };
  };

  const enrichUnit = () => {
    unit = addUniqueIdToUnit(unit);
    unit = addLossCounterToUnit(unit);
    unit = addEquipmentSlotsToUnit(unit);

    return unit;
  };

  return enrichUnit;
};

export default useUnitEnricher;
