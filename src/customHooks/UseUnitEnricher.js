import { uuidGenerator } from "../util/utilityFunctions";

const useUnitEnricher = () => {
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

  const enrichUnit = (unit) => {
    unit = addUniqueIdToUnit(unit);

    return unit;
  };

  return enrichUnit;
};

export default useUnitEnricher;
