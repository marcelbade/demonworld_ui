//  react
import { useContext } from "react";
//  contexts
import { CompendiumContext } from "../contexts/compendiumContext";

const useCompendiumTableControl = () => {
  const CC = useContext(CompendiumContext);

  const addLock = (rawUnits) => {
    for (let i = 0; i < rawUnits.length; i++) {
      rawUnits[i] = { ...rawUnits[i], unitLocked: false };
    }

    return rawUnits;
  };

  /**
   * Function triggered by the Checkboxes. Controls which
   * columns of the table are displayed by setting the
   * displayed property.
   * @param {String} columnName
   */
  const toggleColumn = (columnName) => {
    let tempArray = [...CC.toggleGroups];

    for (let i = 0; i < tempArray.length; i++) {
      const group = tempArray[i];

      for (let j = 0; j < group.columns.length; j++) {
        const col = group.columns[j];
        if (col.column === columnName) {
          col.displayed = !col.displayed;
          break;
        }
      }
    }
    CC.setToggleGroups(tempArray);
  };

  /**
   * Function toggles all table columns of one Group.
   *
   * @param {String} name
   * @param {[String]} columnGroup
   */
  const toggleGroupsOfColumns = (groupName) => {
    let tempArray = [...CC.toggleGroups];

    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].toggleGroup === groupName) {
        tempArray[i].displayGroup = !tempArray[i].displayGroup;
        tempArray[i].columns.forEach((c) => (c.displayed = tempArray[i].displayGroup));
      }
    }
    CC.setToggleGroups(tempArray);
  };

 
  /**
   * Function toggles the unitCard view on and off for a single table row.
   * @param {UnitCard} unit
   */
  const toggleUnitCard = (unit) => {
    const name = unit.multiCardName === "" ? unit.unitName : unit.multiCardName;

    const id = unit.faction + name;

    CC.selectedStatCards.includes(id)
      ? CC.setSelectedStatCards(CC.selectedStatCards.filter((c) => c !== id))
      : CC.setSelectedStatCards([...CC.selectedStatCards, id]);
  };

  const getAllTableColumns = () => {
    const colGroups = CC.toggleGroups.map((group) => group.columns);
    return [].concat(...colGroups);
  };

  return {
    getAllTableColumns: getAllTableColumns,
    addLock: addLock,
    toggleColumn: toggleColumn,
    toggleGroupsOfColumns: toggleGroupsOfColumns,
    toggleUnitCard: toggleUnitCard,
  };
};

export default useCompendiumTableControl;
