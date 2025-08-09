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
   * Function triggered by the Checkboxes. Controls which columns of the table are displayed by
   * setting the displayed property.
   * @param {String} column
   * @param {boolean} isChecked
   */
  const toggleColumn = (column, isChecked) => {
    CC.setColumns(
      CC.columns.filter((c) => {
        if (c.column === column) {
          c.displayed = !isChecked;
        }
        return c;
      })
    );
  };

  /**
   * Function toggles all table columns of one Group.
   *
   * @param {String} name
   * @param {[String]} columnGroup
   * @param {boolean} isChecked
   */
  const toggleGroupsOfColumns = (groupName) => {
    let oldGroupToggleValue;

    CC.setToggleGroups(
      CC.toggleGroups.map((t) => {
        if (t.toggleGroup === groupName) {
          oldGroupToggleValue = t.displayEntireGroup;
          t.displayEntireGroup = !t.displayEntireGroup;
        }
        return t;
      })
    );

    CC.setColumns(
      CC.columns.map((c) => {
        if (c.toggleGroup === groupName) {
          c.displayed = !oldGroupToggleValue;
        }
        return c;
      })
    );
  };

  /**
   * Function toggles all table columns.
   */
  const toggleAllColumns = () => {
    const temp = CC.allBoxes;

    CC.setColumns(
      CC.columns.map((c) => {
        c.displayed = temp;
        return c;
      })
    );

    CC.setToggleGroups(
      CC.toggleGroups.map((t) => {
        t.displayEntireGroup = temp;
        return t;
      })
    );

    CC.setAllBoxes((prevState) => !prevState);
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

  return {
    addLock: addLock,
    toggleColumn: toggleColumn,
    toggleAllColumns: toggleAllColumns,
    toggleGroupsOfColumns: toggleGroupsOfColumns,
    toggleUnitCard: toggleUnitCard,
  };
};

export default useCompendiumTableControl;
