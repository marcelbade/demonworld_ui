// React
import React, { useContext, useState } from "react";
// components and functions
import SelectionInput from "../../../shared/selectionInput";
import useAlternativeFactionRules from "../../../../customHooks/UseAlternativeFactionRules";
// context
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
// constants
import { ALTERNATIVE_ARMY_SELECTION_TEXT } from "../../../../constants/factions";

const AlternativeArmyListSelector = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);

  // create an array that has many elements as their are choices to make and give each element "" as default value.
  const [selectionArray, setSelectionArray] = useState(Array(ALC.numberOfAlternativeChoices).fill(""));

  const OPTIONS = useAlternativeFactionRules(AC.selectedFactionName, ALC.alternateListNames);

  /**
   * Filter function for the Selection Inputs. Assigns a value
   * to the element of the selectedAlternativeLists that corresponds
   * to te selector Number.
   * @param {Event.target.value} value
   * @param {integer} selectorNumber
   */
  const selectAlternateList = (value, selectorNumber) => {
    let tempArray = [...selectionArray];
    tempArray[selectorNumber] = value;

    setSelectionArray(tempArray);
    setAlternatives(selectorNumber);
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
    setAlternatives(selectorNumber);
    isSelectionComplete(tempArray);
  };

  /**
   * Function sets the options that are displayed in the selection input's dropdown menu.
   * Allready selected values are filtered out.
   * @returns an array of String values to be displayed.
   */
  const setAlternatives = (selectorNumber) => {
    return OPTIONS[selectorNumber].filter((o) => !selectionArray.includes(o));
  };

  /**
   * Function tests if the selection is complete. This is the case
   * if the number of selected values is equal to the number of input elements.
   * If complete, the army selection tree is displayed in the UI.
   * @param {[String]} the current value of the selectionArray.
   */
  const isSelectionComplete = (tempArray) => {
    const elementsFilled = tempArray.filter((e) => e !== "").length;
    const isComplete = elementsFilled === ALC.numberOfAlternativeChoices;

    setGlobalState(isComplete, tempArray);
    setSelectedAlternateSubFaction(tempArray);
  };

  /**
   * Function sets the relevant fields of the global state
   * once the selection is complete.
   * @param {Boolean} isComplete
   * @param {[String]} tempArray
   */
  const setGlobalState = (isComplete, tempArray) => {
    ALC.setAltArmyListSelectionComplete(isComplete);
    ALC.setSelectedAlternativeLists(tempArray);
  };

  /**
   * Function sets the "selectedAlternativeOption" flag to true for
   * those sub factions that have been selected.
   * @param {[Strings]} tempArray
   */
  const setSelectedAlternateSubFaction = (tempArray) => {
    const dtoList = [...AC.subFactionDTOs];

    dtoList.forEach((dto) => {
      dto.selectedAlternativeOption = tempArray.includes(dto.name);
    });

    AC.setSubFactionDTOs(dtoList);
  };

  return ALC.armyHasAlternativeLists
    ? Array(ALC.numberOfAlternativeChoices)
        .fill()
        .map((i, j) => {
          return (
            <SelectionInput //
              key={j}
              selectorNumber={j}
              alternatives={setAlternatives(j)}
              filterFunction={selectAlternateList}
              clearFunction={clearAlternateList}
              label={ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName][j]}
            />
          );
        })
    : null;
};

export default AlternativeArmyListSelector;
