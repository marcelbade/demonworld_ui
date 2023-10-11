import React, { useContext } from "react";
// components and functions
import SelectionInput from "../../shared/selectionInput";
import { ArmyContext } from "../../../contexts/armyContext";
// constants
import {
  ALL_FACTIONS_ARRAY,
  ALTERNATIVE_ARMY_SELECTION_TEXT,
  ARMIES_WITH_ALTERNATIVE_LISTS,
  ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS,
} from "../../../constants/factions";
import { INPUT_TEXTS } from "../../../constants/textsAndMessages";

const ArmySelector = () => {
  const AC = useContext(ArmyContext);

  /**
   * Function sets all properties of a faction when it is selected.
   * @param {String} factioName
   */
  const setFactionProperties = (factioName) => {
    AC.resetTheState();
    const factionObj = AC.fetchedFactions.filter((f) => f.factionName === factioName)[0];

    AC.setSelectedFactionName(factionObj.factionName);
    AC.setListOfAllFactionUnits(factionObj.units);
    AC.setDistinctSubFactions(factionObj.subFactions);

    if (factionObj.ally) {
      AC.setAllyName(factionObj.ally);
      AC.setListOfAlliedUnits(factionObj.allyUnits);
      AC.setDistinctAllySubFactions(factionObj.allySubFactions);
    }

    AC.setArmyHasAlternativeLists(ARMIES_WITH_ALTERNATIVE_LISTS[factioName]);
    AC.setArmyHasSecondChoice(ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS[factioName]);
    AC.setAlternateArmyListLabelText(ALTERNATIVE_ARMY_SELECTION_TEXT[factioName]);
  };

  return (
    <SelectionInput //
      filterFunction={setFactionProperties}
      isArmySelector={true}
      options={ALL_FACTIONS_ARRAY}
      label={INPUT_TEXTS.SELECT_FACTION}
    />
  );
};

export default ArmySelector;
