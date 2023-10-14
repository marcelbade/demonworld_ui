// React
import React, { useContext } from "react";
// Material UI
import List from "@material-ui/core/List";
// components and functions
import ArmyListSubFactionEntry from "./ArmyListComponents/ArmyListSubFactionEntry";
import { ArmyContext } from "../../../../../contexts/armyContext";
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";

const ArmyListBoxCenter = () => {
  const AC = useContext(ArmyContext);
  const validation = useArmyValidation();

  /**
   * Filters the selected units by subFaction. If allied units have been selected, then their subFaction name is replaced with their faction name.
   * @param {[unitCard Objects]} allSelectedUnits
   * @param {String} subFaction
   * @returns
   */
  //TODO: The part where you replace the subfaction w. the faction name should be a separate function - and it should happen in a different file!
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
      subfactions = AC.subFactions;
    } else if (AC.armyHasAlternativeLists) {
      subfactions = AC.alternateListSubFactions;
    }

    return subfactions;
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
