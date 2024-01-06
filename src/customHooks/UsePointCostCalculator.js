const usePointCostCalculator = () => {
  /**
   *
   * @param {[itemCard]} equipmentList
   * @returns the net point los of all single element items.
   */

  /**
   * Function calculates the total point cost of all the unit's items.
   * If the the `onlyLostItems` flag is true, only lostitems are counted.
   * Note that this only factors in items that are carried by a single element.
   * Items held by all elements of a unit are already included to the unit's point cost.
   * @param {[itemCard]} equipmentList an array with all the units items
   * @param {*} onlyLostItems if true, the value of lost items is calculated.
   * @returns the total point cost of all (lost) items
   */
  const calculateEquipmentPointCost = (equipmentList, onlyLostItems) => {
    let result = 0;

    if (equipmentList !== undefined) {
      const filterFunction = onlyLostItems.filter //
        ? (e) => e.itemLost && !e.everyElement
        : (e) => !e.everyElement;

      result = equipmentList.filter(filterFunction).reduce((sum, { points }) => sum + points, 0);
    }
    return result;
  };

  /**
   * Function calculates the total point cost of a unit. Here the total point cost is the unit's point cost plus the cost for every item that is carried by the whole unit, i.e. every element. This is important as the point loss for these items must be per element.
   * @param {unitCard} unit
   * @returns total ppoint cost
   */
  const calculateUnitAndEveryElementItemCost = (unit) => {
    let itemsOnEveryELement = 0;

    if (unit.equipment !== undefined) {
      itemsOnEveryELement = unit.equipment.filter((e) => e.everyElement).reduce((sum, { points }) => sum + points, 0);
    }

    return unit.points + itemsOnEveryELement;
  };

  const calculateTotalUnitCost = (unit) => {
    const unitAndItemsOnEveryElement = calculateUnitAndEveryElementItemCost(unit);
    const singelElementEquipmentCost = calculateEquipmentPointCost(unit.equipment, { filter: false });

    return unitAndItemsOnEveryElement + singelElementEquipmentCost;
  };

  /**
   * Function calculates the net point loss. Loss is calculated as total point cost per lost element plus the cost of every lost item carried by a single lost element.
   * @returns the sum of the army points lost.
   */
  const calculateTotalArmyPointLoss = (unitList) => {
    let sum = 0;

    unitList.forEach((u) => {
      const totalUnitCost = calculateUnitAndEveryElementItemCost(u);

      sum += u.lossCounter * (totalUnitCost / u.maxCounter);
      sum += calculateEquipmentPointCost(u.equipment, { filter: true });
    });

    return sum;
  };

  /**
   * Function calculates the total point cost of the entire army list.
   * @param {[unitCard]} unitList
   * @returns the net point value of the army list.
   */
  const calculateTotalArmyCost = (unitList) => {
    let totalListPointCost = 0;

    unitList.forEach((u) => {
      const unitTotal = calculateTotalUnitCost(u);
      totalListPointCost += unitTotal;
    });

    return totalListPointCost;
  };

  return {
    calculateTotalUnitCost: calculateTotalUnitCost,
    calculateTotalArmyCost: calculateTotalArmyCost,
    calculateTotalArmyPointLoss: calculateTotalArmyPointLoss,
  };
};

export default usePointCostCalculator;
