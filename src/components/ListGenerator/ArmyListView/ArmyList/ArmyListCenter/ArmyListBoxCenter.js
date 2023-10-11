// React
import React, { useContext } from "react";
// Material UI
import List from "@material-ui/core/List";
// components and functions
import ArmyListSubFactionEntry from "./ArmyListComponents/ArmyListSubFactionEntry";
import { ArmyContext } from "../../../../../contexts/armyContext";

const ArmyListBoxCenter = () => {
  const AC = useContext(ArmyContext);

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
      {selectSubFactionList().map((sF) => (
        <ArmyListSubFactionEntry subFaction={sF} key={sF} />
      ))}
    </List>
  );
};

export default ArmyListBoxCenter;
