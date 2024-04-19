// React
import React, { useContext } from "react";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import SelectionInput from "../../../shared/selectionInput";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { ALTERNATIVE_ARMY_SELECTION_TEXT } from "../../../../constants/factions";

const AlternativeArmyListSelector = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);

 

  /**
   * Filter function for the Selection Inputs. Assigns a value
   * to the element of the selectedAlternativeLists that corrsponds
   * to te selector Number.
   * @param {Event.target.value} value
   * @param {integer} selectorNumber
   */
  const selectAlternateList = (value, selectorNumber) => {
    let tempArray = [...ALC.selectedAlternativeLists];

    tempArray[selectorNumber] = value;
    ALC.setSelectedAlternativeLists(tempArray);
    isSelectionComplete(tempArray.length);
    setAlternatives(tempArray);
  };

  /**
   * Clear functon for the Selection Inputs. Removes
   * the value from selectedAlternativeLists element that corrsponds
   * to the selectorNumber
   * @param {int} selectorNumber
   */
  const clearAlternateList = (selectorNumber) => {
    let tempArray = [...ALC.selectedAlternativeLists];

    tempArray.splice(selectorNumber, 1);

    ALC.setSelectedAlternativeLists(tempArray);
    isSelectionComplete(tempArray.length);
  };

  const setAlternatives = (selectedValues) => {
    tempArray = ALC.alternateListNames.filter((n) => !selectedValues.includes(n));

    return tempArray;
  };

  /**
   * Function tests if the selection is complete. Thhis is the case
   * if the number of selected values is equal to the number of input elements.
   * If complete, the army selection tree is displayed in the UI.
   * @param {int} length
   */
  const isSelectionComplete = (length) => {
    ALC.setAltArmyListSelectionComplete(length === ALC.numberOfAlternativeChoices);
  };

  return ALC.armyHasAlternativeLists
    ? Array(ALC.numberOfAlternativeChoices)
        .fill()
        .map((i, j) => {
          return (
            <SelectionInput //
              key={i}
              selectorNumber={j}
              alternatives={setAlternatives()}
              filterFunction={selectAlternateList}
              clearFunction={clearAlternateList}
              label={ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName]}
            />
          );
        })
    : null;
};

export default AlternativeArmyListSelector;
