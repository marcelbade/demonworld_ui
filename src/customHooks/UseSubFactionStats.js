// components and functions
import { ruleObjectProvider } from "../gameLogic/armyListValidationRules/ruleObjectProvider";
import usePointCostCalculator from "./UsePointCostCalculator";
// constants
import { STATS } from "../constants/textsAndMessages";

const useSubFactionStats = () => {
  const calculator = usePointCostCalculator();

  /**
   * Function calculates the current total point cost.
   * @returns
   */
  const calculateTotal = (unitList) => {
    let total = 0;
    if (unitList) {
      unitList.forEach((u) => (total += calculator.calculateTotalUnitCost(u)));
    }
    return total;
  };

  /**
   * Function calculates the least and most points that can be spent on a subFaction.
   * @returns an object containing the minimum and maximum ponts allowed for that sub faction.
   */
  const calculateMinAndMaxPercentages = (faction, subFaction) => {
    const ruleArray = ruleObjectProvider(faction);

    const filteredArray = ruleArray.filter((r) => r.cardNames.includes(subFaction));

    // when changing armies, the ruleArray briefly becomes undefined. Hence the test for length.
    const minPercentage = filteredArray.length !== 0 ? filteredArray[0].min * 100 : 0;
    const maxPercentage = filteredArray.length !== 0 ? filteredArray[0].max * 100 : 0;

    return {
      min: Math.trunc(minPercentage),
      max: Math.trunc(maxPercentage),
    };
  };

  /**
   * Function returns the total
   * @param {[unitCard]} unitList
   * @returns
   */
  const displayPoints = (unitList) => {
    const total = calculateTotal(unitList);
    return total === 0 ? 0 : `${total} ${STATS.POINTS}`;
  };

  const displayPercentage = (unitList, maxPointsAllowance) => {
    const total = calculateTotal(unitList);
    let percentage = (total / maxPointsAllowance) * 100;
    return percentage * 100 === 0 ? 0 : Number(percentage).toFixed(2);
  };

  return {
    currentTotal: displayPoints,
    currentPercentage: displayPercentage,
    minAndMaxAllowance: calculateMinAndMaxPercentages,
  };
};

export default useSubFactionStats;
