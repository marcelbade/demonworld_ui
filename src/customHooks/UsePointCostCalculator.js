const usePointCostCalculator = () => {
  /**
   * Function calculates the total point cost of all the unit's items that have been lost. Note that this only factors in items that are carried by a single element. Items held by all elements of a unit are already included to the unit's point cost.
   * @param {[itemCard]} equipmentList
   * @returns the net point los of all single element items.
   */
  const calculatePointsOfLostEquipment = (equipmentList) => {
    return equipmentList.filter((e) => e.itemLost && !e.everyElement).reduce((sum, { points }) => sum + points, 0);
  };

  /**
   * Function calculates the total point cost of a unit. Here the total point cost is the unit's point cost plus the cost for every item that is carried by the whole unit, i.e. every element. This is important as the point loss for these items must be per element.
   * @param {unitCard} unit
   * @returns total ppoint cost
   */
  const calculateTotalUnitAndEquipmentCost = (unit) => {
    const itemsOnEveryELement = unit.equipment.filter((e) => e.everyElement).reduce((sum, { points }) => sum + points, 0);

    return unit.points + itemsOnEveryELement;
  };

  /**
   * Function calculates the net point loss. Loss is calculated as total point cost per lost element plus the cost of every lost item carried by a single lost element.
   * @returns the sum of the army points lost.
   */
  const calculateTotalArmyPointLoss = (unitList) => {
    let sum = 0;

    unitList.forEach((u) => {
      const totalUnitCost = calculateTotalUnitAndEquipmentCost(u);

      sum += u.lossCounter * (totalUnitCost / u.maxCounter);
      sum += calculatePointsOfLostEquipment(u.equipment);
    });

    return sum;
  };

  return {
    
    calculateTotalArmyPointLoss: calculateTotalArmyPointLoss,
  };
};

export default usePointCostCalculator;
