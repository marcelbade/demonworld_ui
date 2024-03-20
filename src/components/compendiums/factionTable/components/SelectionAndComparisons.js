//  React
import React, { useContext } from "react";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";
//  Constants
import { ALL_FACTIONS_ARRAY } from "../../../../constants/factions";
import { INPUT_TEXTS } from "../../../../constants/textsAndMessages";
import SelectionInput from "../../../shared/selectionInput";

const SelectionAndComparisons = (props) => {
  const TC = useContext(TableContext);

  /**
   * Generates the options for the faction name selector.
   * @returns [String]
   */
  const setSelectorFactionNames = () => {
    return ALL_FACTIONS_ARRAY.sort();
  };

  /**
   * Generates the options for the unit name selector. If a faction has been selected, only the names of that faction
   * are shown as options (singleFilteredFaction), otherwise ALL unit names in the games are displayed (localFactions).
   * @returns [String]
   */
  const setSelectorUnitNames = () => {
    const options = TC.singleFilteredFaction.length === 0 ? TC.allFactions : TC.singleFilteredFaction;
    return options.map((u) => u.unitName).sort();
  };

  /**
   * OnChange function for faction name selector. Allows user to type and see the matching factions in real time.
   * setTableData changes table content after selection.
   * @param {[{}]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    TC.setSingleFilteredFaction(TC.allFactions.filter((u) => u.faction === selectedFaction));
    TC.setTableData(TC.allFactions.filter((u) => u.faction === selectedFaction));
  };

  /**
   *  "onChange" function for the unit name selector. getUnitNames() resets it
   *  after the selection to show all units of the faction.
   * @param {[{}]} nameSearchString
   */
  const selectUnit = (nameSearchString) => {
    setSelectorUnitNames();
    TC.setTableData(TC.allFactions.filter((lf) => lf.unitName.includes(nameSearchString)));
  };

  const clearFaction = () => {
    TC.setTableData(TC.allFactions);
  };

  const clearUnit = () => {
    TC.setTableData(TC.singleFilteredFaction);
  };

  return (
    <>
      <SelectionInput
        alternatives={setSelectorFactionNames()}
        filterFunction={selectFaction}
        clearFunction={clearFaction}
        label={INPUT_TEXTS.SELECT_FACTION}
      />
      <SelectionInput
        alternatives={setSelectorUnitNames()}
        filterFunction={selectUnit}
        clearFunction={clearUnit}
        label={INPUT_TEXTS.SELECT_UNIT}
      />
    </>
  );
};

export default SelectionAndComparisons;
