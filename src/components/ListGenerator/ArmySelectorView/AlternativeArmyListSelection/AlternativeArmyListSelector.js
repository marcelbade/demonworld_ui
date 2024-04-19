// React
import React, { useContext, useState } from "react";
// components and functions
import SelectionInput from "../../../shared/selectionInput";
import { ALTERNATIVE_ARMY_SELECTION_TEXT } from "../../../../constants/factions";
// context
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
import { AllyContext } from "../../../../contexts/allyContext";

const AlternativeArmyListSelector = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);

  const [selectionArray, setSelectionArray] = useState(Array(ALC.numberOfAlternativeChoices).fill(""));

  const OPTIONS = ALC.alternateListNames;

  /**
   * Filter function for the Selection Inputs. Assigns a value
   * to the element of the selectedAlternativeLists that corrsponds
   * to te selector Number.
   * @param {Event.target.value} value
   * @param {integer} selectorNumber
   */
  const selectAlternateList = (value, selectorNumber) => {
    let tempArray = [...selectionArray];
    tempArray[selectorNumber] = value;

    setSelectionArray(tempArray);
    setAlternatives();
    isSelectionComplete(tempArray);
  };

  /**
   * Clear function for the Selection Inputs. Removes
   * the value from selectedAlternativeLists element that corrsponds
   * to the selectorNumber
   * @param {int} selectorNumber
   */
  const clearAlternateList = (selectorNumber) => {
    let tempArray = [...selectionArray];
    tempArray[selectorNumber] = "";

    setSelectionArray(tempArray);
    setAlternatives();
    isSelectionComplete(tempArray);
  };

  const setAlternatives = () => {
    return OPTIONS.filter((o) => !selectionArray.includes(o));
  };

  /**
   * Function tests if the selection is complete. Thhis is the case
   * if the number of selected values is equal to the number of input elements.
   * If complete, the army selection tree is displayed in the UI.
   * @param {int} length
   */
  const isSelectionComplete = (tempArray) => {
    const elementsFilled = tempArray.filter((e) => e !== "").length;
    const isComplete = elementsFilled === ALC.numberOfAlternativeChoices;

    ALC.setAltArmyListSelectionComplete(isComplete);
    if (isComplete) {
      setGlobalState(tempArray);
    }
  };

  /**
   * Function sets the relevant fields of the global state
   * when the selection is complete.
   */
  const setGlobalState = (tempArray) => {
    ALC.setSelectedAlternativeLists(tempArray);
    ALC.setAllyIsAlternativeOption(tempArray.includes(AYC.setAllyName));
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
