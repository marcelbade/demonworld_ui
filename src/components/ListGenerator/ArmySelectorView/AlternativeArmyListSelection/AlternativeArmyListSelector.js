// React
import { useContext, useState } from "react";
// components and functions
import SelectionInput from "../../../shared/selectionInput";
// context
import { ArmyContext } from "../../../../contexts/armyContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";
// constants
import { ALTERNATIVE_ARMY_SELECTION_TEXT, NONE } from "../../../../constants/factions";
import { DWARF_TEXTS, EMPIRE_TEXTS, ORK_CLANS_TEXTS } from "../../../../constants/textsAndMessages";

const AlternativeArmyListSelector = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);

  const [currentAlternativeLists, setCurrentAlternativeLists] = useState([]);

  /**
   * Function is the onChange function for the SelectionInput.
   * Lets user select and set alternative armies for the factions that have them.
   * @param {String} value
   * @param {integer} iterator
   */
  const selectOnInputChange = (value, iterator) => {
    ALC.setSelectedAlternativeLists([...ALC.selectedAlternativeLists, value]);

    switch (AC.selectedFactionName) {
      case ORK_CLANS_TEXTS.FACTION_NAME:
        setOrkAlternatives(value, iterator);
        break;
      case EMPIRE_TEXTS.FACTION_NAME:
        setEmpireAlternatives(value, iterator);
        break;

      case DWARF_TEXTS.FACTION_NAME:
        setDwarvesAlternatives(value, iterator);
        break;

      default:
        throw new Error("AlternativeArmyListSelector: could not find faction to set alternative list options.");
    }
  };

  const setOrkAlternatives = (clanName, iterator) => {
    let tempArray = [...currentAlternativeLists];
    tempArray.push(clanName);

    setCurrentAlternativeLists([...tempArray]);

    if (iterator === 1) {
      markChoicesAndCloseSelector(tempArray);
    }
  };

  const markChoicesAndCloseSelector = (selectedAlternativeSubFactions) => {
    let tempArray = [...AC.subFactionDTOs];

    tempArray.forEach((dto) => {
      if (selectedAlternativeSubFactions.includes(dto.name)) {
        dto.selectedAlternativeOption = true;
      }
    });

    AC.setSubFactionDTOs([...tempArray]);
    ALC.setAltArmyListSelectionComplete(true);
  };

  /**
   * Function sets the alternative sub factions for the empire faction.
   * The user must choose two marches with the added condition that only adjacent
   * marches can be selected.
   * @param {*} marchName
   * @param {*} iterator
   */
  const setEmpireAlternatives = (marchName, iterator) => {
    const adjacentMarches = {
      northAndSouth: ["Westmark", "Ostmark"],
      eastAndWest: ["Nordmark", "Südmark"],
    };

    if ((iterator === 0 && marchName === EMPIRE_TEXTS.SF.NORTH_MARCH) || marchName === EMPIRE_TEXTS.SF.SOUTH_MARCH) {
      setCurrentAlternativeLists(adjacentMarches.northAndSouth);
    }
    if ((iterator === 0 && marchName === EMPIRE_TEXTS.SF.WEST_MARCH) || marchName === EMPIRE_TEXTS.SF.EAST_MARCH) {
      setCurrentAlternativeLists(adjacentMarches.eastAndWest);
    }
    if (iterator === 1) {
      ALC.setAltArmyListSelectionComplete(true);
    }
  };

  /**
   *
   */
  const setDwarvesAlternatives = () => {};

  const clearAlternateList = () => {
    ALC.setSelectedAlternativeLists([]);
  };

  /**
   * Function sets the text for the dropdown menu that let's the user
   * select the alternative army lists.
   * @param {integer} iterator
   * @returns a String
   */
  const setLabel = (iterator) => {
    if (ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName] === undefined) {
      return;
    }
    return ALTERNATIVE_ARMY_SELECTION_TEXT[AC.selectedFactionName][iterator];
  };

  return AC.selectedFactionName !== NONE && ALC.armyHasAlternativeLists && !ALC.altArmyListSelectionComplete
    ? [...Array(ALC.numberOfAlternativeChoices).keys()].map((iterator) => {
        return (
          <SelectionInput //
            width={"32em"}
            key={iterator}
            selectorNumber={iterator}
            alternatives={ALC.alternateListNames}
            filterFunction={(value) => {
              selectOnInputChange(value, iterator);
            }}
            clearFunction={() => {
              clearAlternateList();
            }}
            label={setLabel(iterator)}
          />
        );
      })
    : null;
};

export default AlternativeArmyListSelector;
