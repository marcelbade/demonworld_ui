// React
import React, { useContext, Fragment } from "react";
// Material UI
import List from "@material-ui/core/List";
// components and functions
import ArmyListSubFactionEntry from "../ArmyList/ArmyListSubFactionEntry";
import { ArmyContext } from "../../../../contexts/armyContext";
import { uuidGenerator } from "../../../shared/sharedFunctions";

const ArmyListBoxCenter = () => {
  const AC = useContext(ArmyContext);

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
    <Fragment>
      <List>
        {selectSubFactionList().map((sF) => (
          <ArmyListSubFactionEntry subFaction={sF} key={uuidGenerator()} />
        ))}
      </List>
    </Fragment>
  );
};

export default ArmyListBoxCenter;
