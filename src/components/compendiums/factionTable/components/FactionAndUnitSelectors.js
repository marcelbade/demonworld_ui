//  React
import React, { useContext } from "react";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";
//  Constants
import { ALL_FACTIONS_ARRAY } from "../../../../constants/factions";
import { INPUT_TEXTS } from "../../../../constants/textsAndMessages";
import SelectionInput from "../../../shared/selectionInput";

const FactionAndUnitSelectors = (props) => {
  const TC = useContext(TableContext);

  /**
   * Function generates the options for the faction name selector.
   * @returns an array containing all faction names.
   */
  const setFactionNamesOptions = () => {
    return ALL_FACTIONS_ARRAY.sort();
  };

  /**
   * Function generates the options for the sub faction name selector.
   * @returns an array containing all sub faction names for the given faction(s).
   */
  const setSubFactionNamesOptions = () => {
    let options = [];

    let rawValues = TC.data.filter((u) => u.faction.includes(TC.selectedFaction));
    rawValues = rawValues.map((u) => u.subFaction).sort();

    // remove duplicate values
    rawValues.forEach((rV) => (!options.includes(rV) ? options.push(rV) : null));

    return options;
  };

  /**
   * Generates the options for the unit name selector. If a faction or subfaction has been selected,
   * only the names of that faction are shown as options (selectedFaction),
   * otherwise ALL unit names in the games are displayed (localFactions).
   * @returns [String]
   */
  const setUnitNamesOptions = () => {
    const options = TC.selectedFaction === "" ? TC.data : TC.displayUnits;
    return options.map((u) => u.unitName).sort();
  };

  /**
   * Function for OnChangeEvent. Sets th selected faction and selects all
   * units of one faction to be displayed in the table. Subfactions and units are cleared.
   * @param {[FactionObject]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    TC.setSelectedFaction(TC.data.map((u) => u.faction).find((name) => name === selectedFaction));
    TC.setDisplayUnits(TC.data.filter((u) => u.faction.includes(selectedFaction) || u.unitLocked));
  };

  const selectSubFaction = (selectedSubFaction) => {
    TC.setSelectedSubFaction(TC.data.map((u) => u.subFaction).find((name) => name === selectedSubFaction));

    TC.setDisplayUnits(
      TC.data.filter((u) => (u.faction === TC.selectedFaction && u.subFaction.includes(selectedSubFaction)) || u.unitLocked)
    );
  };

  /**
   * Function for OnChangeEvent. Select all a single unit fpr the selected faction.
   * @param {[{}]} selectedUnit
   */
  const selectUnit = (selectedUnit) => {
    TC.setDisplayUnits(TC.data.filter((u) => u.unitName.includes(selectedUnit) || u.unitLocked));
  };

  const clearFaction = () => {
    TC.setSelectedFaction("");
    TC.setSelectedSubFaction("");
    TC.setDisplayUnits(TC.data);
  };

  const clearSubFaction = () => {
    TC.setSelectedSubFaction("");
    TC.setDisplayUnits(TC.data.filter((u) => u.faction.includes(TC.selectedFaction)));
  };

  const clearUnit = () => {
    TC.setDisplayUnits(TC.data.filter((u) => u.faction === TC.selectedFaction && u.subFaction.includes(TC.selectedSubFaction)));
  };

  return (
    <>
      <SelectionInput
        alternatives={setFactionNamesOptions()}
        filterFunction={selectFaction}
        clearFunction={clearFaction}
        label={INPUT_TEXTS.SELECT_FACTION}
      />
      <SelectionInput
        alternatives={setSubFactionNamesOptions()}
        filterFunction={selectSubFaction}
        clearFunction={clearSubFaction}
        label={INPUT_TEXTS.SELECT_SUBFACTION}
      />
      <SelectionInput
        alternatives={setUnitNamesOptions()}
        filterFunction={selectUnit}
        clearFunction={clearUnit}
        label={INPUT_TEXTS.SELECT_UNIT}
      />
    </>
  );
};

export default FactionAndUnitSelectors;
