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
  const testForSpecialItemEffects = (selectedUnit, selectedItem) => {
    const name = selectedItem.itemName;
    switch (name) {
      case SPECIAL_ITEMS.BRACELET_OF_TRANSFORMATION:
        braceletOfTransformationLogic(selectedUnit);

        break;
      default:
    }
  };

  /**
   * Function finds the intersection of equipment array and the SPECIAL_ITEMS_LIST, i.e.,
   * items that are special items and equipped by the selected unit.
   * It then selects the correct logic to remove the item.
   * @param {*} selectedUnit
   */
  const testSpecialItemEffectRemoval = (selectedUnit) => {
    selectedUnit.equipment.forEach((e) => {
      const name = e.itemName;

      switch (name) {
        case SPECIAL_ITEMS.BRACELET_OF_TRANSFORMATION:
          removeBraceletOfTransformation(selectedUnit);
          break;
        default:
      }
    });
  };

  /**
   * The item "Bracelet Of Transformation / "Reif der Verwandlung" doesn't
   * just change the units stats, but turns the unit into a multi state unit
   * by adding a new unitCard whe used (the monster the hero transforms into).
   * This function therefore implements the bracelet's rules
   * by turning the selected unit into a multi state unit.
   *
   * PLEASE NOTE: The cards for the caroussel view that allow the user to switch between
   * the different stat cards of the multi state unit uses are taken from the listOfAllFactionUnits,
   * not the selected units (since selectedUnits only contains the units clicked on by the user)!
   * @param {*} selectedUnit
   */
  const braceletOfTransformationLogic = (selectedUnit) => {
    let monsterCard = {};

    // find the correct card for the monster. There are two depending on the size of the hero.
    const units = AC.listOfAllFactionUnits.filter((u) => u.subFaction === SPECIAL);
    const cardName = selectedUnit.unitSize === 1 ? "Kleines Ungeheuer" : "Ungeheuer";
    const foundUnit = units.find((u) => u.unitName === cardName);

    monsterCard = foundUnit;

    monsterCard.faction = selectedUnit.faction;
    monsterCard.belongsToUnit = selectedUnit.unitName;
    monsterCard.multiCardName = monsterCard.unitName;
    monsterCard.isMultiStateUnit = true;

    // the selected unit is NOT already a multi state unit
    if (!selectedUnit.isMultiStateUnit) {
      selectedUnit.isMultiStateUnit = true;
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

    const tempArray = AC.listOfAllFactionUnits;
    const position = tempArray.findIndex((u) => u.unitName === selectedUnit.unitName);
    tempArray[position] = selectedUnit;

    AC.setListOfAllFactionUnits(tempArray);
  };

  /**
   * Function implements the logic to remove the bracelet from the unit.
   */
  const removeBraceletOfTransformation = (selectedUnit) => {
    let tempArray = AC.listOfAllFactionUnits;

    const cardName = selectedUnit.unitSize === 1 ? "Kleines Ungeheuer" : "Ungeheuer";
    const monsterCard = tempArray.find((e) => e.unitName === cardName);

    // if the selected unit was not already a multi state unit, reset its properties.
    if (monsterCard.multiStateOrderNumber === 2) {
      selectedUnit.multiCardName = "";
      selectedUnit.isMultiStateUnit = false;
      selectedUnit.belongsToUnit = "NONE";
      selectedUnit.multiStateOrderNumber = 0;

      const position = tempArray.findIndex((u) => u.unitName === selectedUnit.unitName);
      tempArray[position] = selectedUnit;
    }

    monsterCard.multiCardName = "";
    monsterCard.isMultiStateUnit = false;
    monsterCard.belongsToUnit = "NONE";
    monsterCard.multiStateOrderNumber = 0;

    AC.setListOfAllFactionUnits(tempArray);
  };

  return {
    testForSpecialItemEffects: testForSpecialItemEffects, //
    testSpecialItemEffectRemoval: testSpecialItemEffectRemoval,
  };
};

export default useSpecialItems;
