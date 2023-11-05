// React
import React, { useContext } from "react";
// Material UI
import List from "@mui/material/List";
// components and functions
import ArmyListSubFactionEntry from "./ArmyListComponents/ArmyListSubFactionEntry";
import { ArmyContext } from "../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import { AlternativeListContext } from "../../../../../contexts/alternativeListContext";
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
import { NO_ALLY } from "../../../../../constants/factions";
import { AllyContext } from "../../../../../contexts/allyContext";

const ArmyListBoxCenter = () => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const validation = useArmyValidation();

  /**
   * Filters the selected units by subFaction. If allied units have been selected, then their subFaction name is replaced with their faction name.
   * @param {[unitCard Objects]} allSelectedUnits
   * @param {String} subFaction
   * @returns
   */
  const filterUnitsForSubFaction = (subFaction) => {
    SEC.selectedUnits.forEach((u) => (u.faction === AYC.allyName ? (u.subFaction = u.faction) : null));
    return SEC.selectedUnits.filter((u) => u.subFaction === subFaction);
  };

  /**
   * Function decides which list of subfactions to display: standard or, for armies w. alternative lists, the alternative.
   * @returns a list of subfaction names
   */
  const selectSubFactionList = () => {
    let subfactions;
    if (!ALC.armyHasAlternativeLists) {
      subfactions = [...AC.subFactions];
    } else if (ALC.armyHasAlternativeLists) {
      subfactions = [...ALC.alternateListSubFactions];
    }

    const result = addAlly(subfactions);
    return result;
  };

  /**
   * Function implements the logic to add the allied Faction as an additional subFaction.
   * @param {[String]} subFactionList
   * @returns a list of subfactions that includes the allied faction as element.
   */
  const addAlly = (subFactionList) => {
    if (AYC.allyName !== NO_ALLY && !subFactionList.includes(AYC.allyName)) {
      subFactionList.push(AYC.allyName);
    }
    return subFactionList;
  };

  return (
    <List>
      {selectSubFactionList()
        .map((sF) => validation.returnValidationResult("subFaction", sF))
        .map((obj, i) => (
          <ArmyListSubFactionEntry
            key={i} //
            subFaction={obj.subFactionName}
            valid={obj.valid}
            message={obj.message}
            units={filterUnitsForSubFaction(obj.subFactionName)}
          />
        ))}
    </List>
  );
};

export default ArmyListBoxCenter;
