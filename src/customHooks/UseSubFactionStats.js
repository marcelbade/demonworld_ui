// components and functions
import { ruleObjectProvider } from "../gameLogic/armyListValidationRules/ruleObjectProvider";
// constants
import { calculateTotalUnitPointCost } from "../components/shared/sharedFunctions";

const useSubFactionStats = (unitList, subFactionName, factionName, maxPointsAllowance) => {
  const calculateStats = () => {
    let total = 0;
    if (unitList) {
      console.log();

      unitList.forEach((u) => (total += calculateTotalUnitPointCost(u)));
    }

    const limits = calculateMinAndMaxPercentages();
    const currentPoints = displayPoints(total);
    const currentPercent = displayPercents(total);

    return {
      currentTotal: currentPoints,
      currentPercent: currentPercent,
      minPercentage: limits.min, //
      maxPercentage: limits.max,
    };
  };

  const calculateMinAndMaxPercentages = () => {
    const ruleArray = ruleObjectProvider(factionName);

    const filteredArray = ruleArray.filter((r) => r.cardNames.includes(subFactionName));

    // when changing armies, the ruleArray briefly becomes undefined. Hence the test for length.
    const minPercentage = filteredArray.length !== 0 ? filteredArray[0].min * 100 : 0;
    const maxPercentage = filteredArray.length !== 0 ? filteredArray[0].max * 100 : 0;

    return {
      min: Math.trunc(minPercentage),
      max: Math.trunc(maxPercentage),
    };
  };

  const displayPoints = (total) => {
    return total === 0 ? null : `${total} Punkte`;
  };

  const displayPercents = (total) => {
    let percentage = (total / maxPointsAllowance) * 100;
    return percentage * 100 === 0 ? null : `Prozent ${Number(percentage).toFixed(2)} %`;
  };

  return calculateStats;
};

export default useSubFactionStats;
