//  React
import React, { useContext } from "react";
// components & functions
import { CompendiumContext } from "../../../../contexts/compendiumContext";
import SelectionInput from "../../../shared/selectionInput";
//  Constants
import { ALL_FACTIONS_ARRAY } from "../../../../constants/factions";
import { INPUT_TEXTS } from "../../../../constants/textsAndMessages";

const FactionAndUnitSelectors = () => {
  const CC = useContext(CompendiumContext);

  const noSelectedFaction = CC.selectedFaction === "";
  const noSelectedSubFaction = CC.selectedSubFaction === "";
  const factionSelected = CC.selectedFaction !== "";
  const subFactionSelected = CC.selectedSubFaction !== "";

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

    let rawValues = CC.data.filter((u) => u.faction.includes(CC.selectedFaction));
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
    let options = [];

    if (noSelectedFaction && noSelectedSubFaction) {
      options = CC.data;
      //
    } else if (noSelectedFaction && subFactionSelected) {
      options = CC.data.filter((u) => u.subFaction.includes(CC.selectedSubFaction) && !u.unitLocked);
      //
    } else if (factionSelected && noSelectedSubFaction) {
      options = CC.data.filter((u) => u.faction.includes(CC.selectedFaction) && !u.unitLocked);
      //
    } else if (factionSelected && subFactionSelected) {
      options = CC.data.filter(
        (u) =>
          u.faction.includes(CC.selectedFaction) && //
          u.subFaction.includes(CC.selectedSubFaction) &&
          !u.unitLocked
      );
    }

    return options.map((u) => u.unitName).sort();
  };

  /**
   * Function for onChange event. Sets the selected faction and selects all
   * units of one faction to be displayed in the table. Subfactions and units are cleared.
   * @param {[FactionObject]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    CC.setSelectedFaction(CC.data.map((u) => u.faction).find((name) => name === selectedFaction));
    CC.setDisplayUnits(CC.data.filter((u) => u.faction.includes(selectedFaction) || u.unitLocked));
  };

  /**
   * Function for onChange event. Sets  the selected sub faction and selects all units of that subFaction
   * @param {String} selectedSubFaction
   */
  const selectSubFaction = (selectedSubFaction) => {
    CC.setSelectedSubFaction(CC.data.map((u) => u.subFaction).find((name) => name === selectedSubFaction));

    if (noSelectedFaction) {
      CC.setDisplayUnits(CC.data.filter((u) => u.subFaction.includes(selectedSubFaction) || u.unitLocked));
    } else {
      CC.setDisplayUnits(
        CC.data.filter((u) => (u.faction === CC.selectedFaction && u.subFaction.includes(selectedSubFaction)) || u.unitLocked)
      );
    }
  };

  /**
   * Function for onChange event. Select all a single unit.
   * @param {[{}]} selectedUnit
   */
  const selectUnit = (selectedUnit) => {
    CC.setDisplayUnits(CC.data.filter((u) => u.unitName.includes(selectedUnit) || u.unitLocked));
  };

  /**
   * Function for clear event. Clears values for selected faction and sub faction
   * and resets the unit list to all units received from the BE.
   */
  const clearFaction = () => {
    CC.setSelectedFaction("");
    CC.setSelectedSubFaction("");
    CC.setDisplayUnits(CC.data);
  };

  /**
   * Function for clear event. Clears values for selected sub faction
   * and resets the unit list to all units for the selected faction.
   */
  const clearSubFaction = () => {
    CC.setSelectedSubFaction("");
    CC.setDisplayUnits(CC.data.filter((u) => u.faction.includes(CC.selectedFaction)));
  };

  /**
   * Function for clear event. Clears values for selected unit
   * and resets the unit list to all units for the selected faction and sub faction.
   */
  const clearUnit = () => {
    CC.setDisplayUnits(
      CC.data.filter((u) => (u.faction === CC.selectedFaction && u.subFaction.includes(CC.selectedSubFaction)) || u.unitLocked)
    );
  };

  return (
    <>
      <SelectionInput
        width={"20em"}
        alternatives={setFactionNamesOptions()}
        filterFunction={selectFaction}
        clearFunction={clearFaction}
        label={INPUT_TEXTS.SELECT_FACTION}
      />
      <SelectionInput
        width={"20em"}
        alternatives={setSubFactionNamesOptions()}
        filterFunction={selectSubFaction}
        clearFunction={clearSubFaction}
        label={INPUT_TEXTS.SELECT_SUBFACTION}
      />
      <SelectionInput
        width={"20em"}  
        alternatives={setUnitNamesOptions()}
        filterFunction={selectUnit}
        clearFunction={clearUnit}
        label={INPUT_TEXTS.SELECT_UNIT}
      />
    </>
  );
};

export default FactionAndUnitSelectors;
