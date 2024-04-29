// react
import { useContext } from "react";
// context
import { SelectionContext } from "../contexts/selectionContext";
import { ArmyContext } from "../contexts/armyContext";
// constants
import { SPECIAL_ITEMS } from "../constants/textsAndMessages";
import { SPECIAL } from "../constants/factions";

const useSpecialItems = () => {
  const SEC = useContext(SelectionContext);
  const AC = useContext(ArmyContext);

  /**
   * Function implements the fact, that some items have additional effects
   * beyond changing the units stats. The item is tested and if further
   * rules do exist, they are applied. By default however, nothing happens.
   * @param {*} selectedUnit  the unit for which the item shop was opened.
   * @param {*} selectedItem  item is being added.
   */
  const testForSpecialItems = (selectedUnit, selectedItem) => {
    let result = [];
    const name = selectedItem.itemName;
    switch (name) {
      case SPECIAL_ITEMS.BRACELET_OF_TRANSFORMATION:
        result = braceletOfTransformationLogic(selectedUnit);

        break;
      default:
    }
    return result;
  };

  /**
   * The item "Bracelet Of Transformation / "Reif der Verwandlung" doesn't
   * just change the units stats, but replaces them completely with a new unitCard when
   * used. Function implements this rule by adding an additional unit card to the army
   * list and making it and the selected unit part of a new multiStat unit.
   */
  const braceletOfTransformationLogic = (selectedUnit) => {
    let monsterCard;

    // get the two special unit cards and add the correct one to the list
    const units = AC.listOfAllFactionUnits.filter((u) => u.subFaction === SPECIAL);

    // select and set the correct card
    if (selectedUnit.unitSize === 1) {
      monsterCard = units.find((u) => u.unitName === "Kleines Ungeheuer");
    } else if (selectedUnit.unitSize === 2) {
      monsterCard = units.find((u) => u.unitName === "Ungeheuer");
    }

    monsterCard.faction = selectedUnit.faction;

    monsterCard.belongsToUnit = selectedUnit.unitName;
    monsterCard.multiCardName = monsterCard.unitName;
    monsterCard.isMultiStateUnit = 1;

    // the selected unit is NOT already a multi state unit
    if (!selectedUnit.isMultiStateUnit) {
      selectedUnit.isMultiStateUnit = 1;
      selectedUnit.multiStateOrderNumber = 1;
      monsterCard.multiStateOrderNumber = 2;
      selectedUnit.belongsToUnit = selectedUnit.unitName;
      selectedUnit.multiCardName = selectedUnit.unitName;
    } else {
      const cards = SEC.selectedUnits
        .filter((u) => u.belongsToUnit === selectedUnit.belongsToUnit) //
        .map((u) => u.multiStateOrderNumber);

      let maxOrderNumber = Math.max(...cards);
      monsterCard.multiStateOrderNumber = ++maxOrderNumber;
    }

    // add the card
    let tempArray = [...SEC.selectedUnits];
    tempArray.push(monsterCard);

    return tempArray;
  };

  return {
    testForSpecialItems: testForSpecialItems, //
  };
};

export default useSpecialItems;
