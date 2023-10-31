// React
import React, { useContext } from "react";
// Material UI
import List from "@material-ui/core/List";
// components and functions
import ArmyListSubFactionEntry from "./ArmyListComponents/ArmyListSubFactionEntry";
import { ArmyContext } from "../../../../../contexts/armyContext";
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
import { NO_ALLY } from "../../../../../constants/factions";

const ArmyListBoxCenter = () => {
  const AC = useContext(ArmyContext);
  const validation = useArmyValidation();

  /**
   * Filters the selected units by subFaction. If allied units have been selected, then their subFaction name is replaced with their faction name.
   * @param {[unitCard Objects]} allSelectedUnits
   * @param {String} subFaction
   * @returns
   */
  const filterUnitsForSubFaction = (subFaction) => {
    AC.selectedUnits.forEach((u) => (u.faction === AC.allyName ? (u.subFaction = u.faction) : null));
    return AC.selectedUnits.filter((u) => u.subFaction === subFaction);
  };

  /**
   * Function decides which list of subfactions to display: standard or, for armies w. alternative lists, the alternative.
   * @returns a list of subfaction names
   */
  const selectSubFactionList = () => {
    let subfactions;
    if (!AC.armyHasAlternativeLists) {
      subfactions = [...AC.subFactions];
    } else if (AC.armyHasAlternativeLists) {
      subfactions = [...AC.alternateListSubFactions];
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
    if (AC.allyName !== NO_ALLY && !subFactionList.includes(AC.allyName)) {
      subFactionList.push(AC.allyName);
    }
    return subFactionList;
  };

  return (
    <List>
      {selectSubFactionList()
        .map((sF) => validation.returnValidationResult("subFaction", sF))
        .map((obj) => (
          <ArmyListSubFactionEntry
            key={obj.subFactionName} //
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
