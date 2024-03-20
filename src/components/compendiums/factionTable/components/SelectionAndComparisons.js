//  React
import React, { Fragment } from "react";
//  Constants
import { ALL_FACTIONS_ARRAY } from "../../../../constants/factions";
import { INPUT_TEXTS } from "../../../../constants/textsAndMessages";
import SelectionInput from "../../../shared/selectionInput";

const SelectionAndComaparisons = (props) => {
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
    const options = props.singleFilteredFaction.length === 0 ? props.allFactions : props.singleFilteredFaction;
    return options.map((u) => u.unitName).sort();
  };

  /**
   * OnChange function for faction name selector. Allows user to type and see the matching factions in real time.
   * setTableData changes table content after selection.
   * @param {[{}]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    props.setSingleFilteredFaction(props.allFactions.filter((u) => u.faction === selectedFaction));
    props.setTableData(props.allFactions.filter((u) => u.faction === selectedFaction));
  };

  /**
   *  "onChange" function for the unit name selector. getUnitNames() resets it
   *  after the selection to show all units of the faction.
   * @param {[{}]} nameSearchString
   */
  const selectUnit = (nameSearchString) => {
    setSelectorUnitNames();
    props.setTableData(props.allFactions.filter((lf) => lf.unitName.includes(nameSearchString)));
  };

  const clearFaction = () => {
    props.setTableData(props.allFactions);
  };

  const clearUnit = () => {
    props.setTableData(props.singleFilteredFaction);
  };

  return (
    <Fragment>
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
      
    </Fragment>
  );
};

export default SelectionAndComaparisons;
