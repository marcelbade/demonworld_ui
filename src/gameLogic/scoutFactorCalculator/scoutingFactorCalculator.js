/**
 * Function calculates the army's scouting factor. The formula is: number of cavalery  + low flyer + high flyer. Low flyers and cavalery with a movement value >= 40 as well as high flyers are multiplied by 2.
 * @param {unitCard array} selectedUnitList
 * @returns an integer representing the army's scouting factor
 */
const calculateScoutingFactor = (selectedUnitList) => {
  const MULTIPLICATOR = 2;

  const cav = selectedUnitList.filter((unit) => unit.isMounted === true && unit.move < 40).length;
  const fastCav = MULTIPLICATOR * selectedUnitList.filter((unit) => unit.isMounted === true && unit.move >= 40).length;

  const lowFlyer = selectedUnitList.filter((unit) => unit.isLowFlyer === true && unit.move < 40).length;
  const fastlowFlyer = MULTIPLICATOR * selectedUnitList.filter((unit) => unit.isLowFlyer === true && unit.move >= 40).length;

  const highFlyer = MULTIPLICATOR * selectedUnitList.filter((unit) => unit.isHighFlyer === true).length;

  return cav + fastCav + lowFlyer + fastlowFlyer + highFlyer;
};
