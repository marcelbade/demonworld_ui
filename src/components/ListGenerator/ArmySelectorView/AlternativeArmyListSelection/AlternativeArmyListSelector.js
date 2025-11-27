// React
import { useContext, useEffect, useState } from "react";
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

  const [selectedAlternativeLists, setSelectedAlternativeLists] = useState([]);
  const [selectableAlternatives, setSelectableAlternatives] = useState(ALC.alternateListNames);

  // page loads before the context, necessetating this:
  useEffect(() => {
    setSelectableAlternatives(ALC.alternateListNames);
  }, [ALC.alternateListNames]);

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
    let tempArray = [...selectedAlternativeLists];
    tempArray.push(clanName);
    setSelectedAlternativeLists([...tempArray]);

    if (iterator === 0) {
      setSelectableAlternatives(ALC.alternateListNames.filter((a) => a !== clanName));
    }

    if (iterator === 1) {
      markChoicesAndCloseSelector(tempArray);
    }
  };

  /**
   * Function takes the selected alternative sub faction and searches the sub faction
   * DTOs for them. When found, there are flagged as selected.
   * @param {[String]} selectedAlternativeSubFactions
   */
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
   * The user must choose two marches with the added condition that the secon march
   * must be adjacent to the first selected march.
   * @param {String} marchName
   * @param {integer} iterator
   */
  const setEmpireAlternatives = (marchName, iterator) => {
    const adjacentMarches = {
      northAndSouth: [EMPIRE_TEXTS.SF.WEST_MARCH, EMPIRE_TEXTS.SF.EAST_MARCH],
      eastAndWest: [EMPIRE_TEXTS.SF.NORTH_MARCH, EMPIRE_TEXTS.SF.SOUTH_MARCH],
    };

    let tempArray = [...selectedAlternativeLists];
    tempArray.push(marchName);
    setSelectedAlternativeLists([...tempArray]);

    if ((iterator === 0 && marchName === EMPIRE_TEXTS.SF.NORTH_MARCH) || marchName === EMPIRE_TEXTS.SF.SOUTH_MARCH) {
      setSelectableAlternatives(adjacentMarches.northAndSouth);
    } else if ((iterator === 0 && marchName === EMPIRE_TEXTS.SF.WEST_MARCH) || marchName === EMPIRE_TEXTS.SF.EAST_MARCH) {
      setSelectableAlternatives(adjacentMarches.eastAndWest);
    }
    if (iterator === 1) {
      markChoicesAndCloseSelector(tempArray);
    }
  };

  /**
   *
   */
  const setDwarvesAlternatives = (kingdom, iterator) => {
    let tempArray = [...selectedAlternativeLists];
    tempArray.push(kingdom);
    setSelectedAlternativeLists([...tempArray]);

    if (iterator === 0) {
      setSelectableAlternatives(ALC.alternateListNames.filter((a) => a !== kingdom));
    }

    if (iterator === 1) {
      markChoicesAndCloseSelector(tempArray);
    }
  };

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
            alternatives={selectableAlternatives}
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
