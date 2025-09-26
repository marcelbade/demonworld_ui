// components and functions
import { ruleObjectProvider } from "../gameLogic/armyListValidationRules/ruleObjectProvider";
import usePointCostCalculator from "./UsePointCostCalculator";
// constants
import { STATS } from "../constants/textsAndMessages";

/**
 * Hook contains the logic for the stats displayed in the army
 * list at the bottom of every subfaction:
 * - current subfaction army points total
 * - current subfaction army points as a percentage of the
 *   army point limit (i.e., in a 2000 point list, what is
 *   the percentage)
 * - the alllowed minimum and maximum percentages of the subfaction
 * -
 * @returns  currentTotal, currentPercentage, minAndMaxAllowance()
 */
const useSubFactionStats = () => {
  const calculator = usePointCostCalculator();

  /**
   * Function calculates the current total point cost of the
   * entire army list.
   * @param {[unitCard]} unitList
   * @returns the point value (integer) of the entire army list.
   */
  const calculateTotal = (unitList) => {
    let total = 0;
    if (!unitList) {
      return total;
    }

    unitList.forEach((u) => (total += calculator.calculateTotalUnitCost(u)));
    return total;
  };

  /**
   * Function calculates the least and most points, expressed as a percentage
   * of the total army point limit.
   * that can be spent on a subFaction.
   * @param {String} faction - faction name
   * @param {String} subFaction - sub faction name
   * @returns the minimum and maximum percentage, as a an integer.
   */
  const minAndMaxAllowance = (faction, subFaction) => {
    const ruleArray = ruleObjectProvider(faction);

    const filteredArray = ruleArray.filter((r) => r.cardNames.includes(subFaction));

    // when changing armies, the ruleArray briefly becomes undefined.
    // Hence the need to test for length.
    const minPercentage = filteredArray.length !== 0 ? filteredArray[0].min * 100 : 0;
    const maxPercentage = filteredArray.length !== 0 ? filteredArray[0].max * 100 : 0;

    return {
      min: Math.trunc(minPercentage),
      max: Math.trunc(maxPercentage),
    };
  };

  /**
   * Function returns the current army point value of the sub faction.
   * @param {[unitCard]} unitList
   * @returns a string containing the total army points value of the
   * sub faction.
   */
  const currentTotal = (unitList) => {
    const total = calculateTotal(unitList);
    return total === 0 ? 0 : `${total} ${STATS.POINTS}`;
  };

  /**
   * Function returns the current army point value of the sub faction
   * expressed as a percentage of the total army points limit.
   * @param {[unitCard]} unitList
   * @param {int} maxPointsAllowance
   * @returns a percentage rounded down to two decimal points.
   */
  const currentPercentage = (unitList, maxPointsAllowance) => {
    const total = calculateTotal(unitList);
    let percentage = (total / maxPointsAllowance) * 100;
    return percentage * 100 === 0 ? 0 : Number(percentage).toFixed(2);
  };

  const remaingPointsToMinAndMax = (
    factionName, //
    SubFactionName,
    subFactionUnits,
    maxPointsAllowance
  ) => {
    let result = {
      tilMin: 0,
      tilMax: 0,
    };

    const percentages = minAndMaxAllowance(factionName, SubFactionName);

    const total = calculateTotal(subFactionUnits);

    if (percentages.min > 0) {
      let minPoints = maxPointsAllowance * (percentages.min / 100);
      result.tilMin = minPoints - total;
    }

    if (percentages.max < 100) {
      let maxPoints = maxPointsAllowance * (percentages.max / 100);
      result.tilMax = maxPoints - total;
    }

    return result;
  };

  return {
    currentTotal: currentTotal,
    currentPercentage: currentPercentage,
    minAndMaxAllowance: minAndMaxAllowance,
    remaingPointsToMinAndMax: remaingPointsToMinAndMax,
  };
};

export default useSubFactionStats;
