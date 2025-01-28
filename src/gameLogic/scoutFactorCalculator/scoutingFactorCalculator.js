/**
 * Function calculates the army's scouting factor (SF). The formula is:
 *
 * SF = number of cavalary elements + low flyer elements + high flyer elements
 *
 * Low flyers and cavalary elements with a movement value >= 40,
 * as well as high flyers elements are multiplied by 2.
 *
 * @param {unitCard array} selectedUnitList
 * @returns an integer representing the army's scouting factor
 */
const calculateScoutingFactor = (selectedUnitList) => {
  const MULTIPLICATOR = 2;

  const cav = selectedUnitList
    .filter((unit) => unit.isMounted === true && unit.move < 40)
    .reduce((sum, { numberOfElements }) => sum + numberOfElements, 0);

  const lowFlyer = selectedUnitList
    .filter((unit) => unit.isLowFlyer === true && unit.move < 40)
    .reduce((sum, { numberOfElements }) => sum + numberOfElements, 0);

  const fastCav =
    MULTIPLICATOR *
    selectedUnitList
      .filter((unit) => unit.isMounted === true && unit.move >= 40)
      .reduce((sum, { numberOfElements }) => sum + numberOfElements, 0);

  const fastlowFlyer =
    MULTIPLICATOR *
    selectedUnitList
      .filter((unit) => unit.isLowFlyer === true && unit.move >= 40)
      .reduce((sum, { numberOfElements }) => sum + numberOfElements, 0);

  const highFlyer =
    MULTIPLICATOR *
    selectedUnitList.filter((unit) => unit.isHighFlyer === true).reduce((sum, { numberOfElements }) => sum + numberOfElements, 0);

  return cav + fastCav + lowFlyer + fastlowFlyer + highFlyer;
};

export default calculateScoutingFactor;
