// React
import React, { useContext, useEffect, useState } from "react";
// Material UI
import ListItem from "@material-ui/core/ListItem";
import { Grid } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { uuidGenerator } from "../../../shared/sharedFunctions";
import SubList from "../NestedUnitList/SubList";
import InvalidHeader from "./InvalidHeader";
import ValidHeader from "./ValidHeader";
// constants
import { ALLIES_MAPPING } from "../../../../constants/allies";

// Creates the suFaction entry of the army list: Head and current and total points.
const SubFactionEntry = (props) => {
  const contextArmy = useContext(ArmyContext);

  const [validatedSubFaction, setValidatedSubFaction] = useState({
    subFactionName: props.subFaction,
    valid: true,
    validationMessage: "",
  });

  useEffect(() => {
    isSubFactionValid();
  }, [contextArmy.addedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Filters the selected units by subFaction. If allied units have been selected, then their subFaction name is replaced with their faction name.
   * @param {[unitCard Objects]} allUnits
   * @param {String} subFaction
   * @returns
   */
  const filterUnitsForSubFaction = (allUnits, subFaction) => {
    allUnits.forEach((u) => (u.faction === ALLIES_MAPPING[contextArmy.selectedFactionName] ? (u.subFaction = u.faction) : null));

    return allUnits.filter((u) => u.subFaction === subFaction);
  };

  /**
   * Function checks for every sub faction with a minimum point allowance > 0 if the condition has been fullfilled. If not, the sub faction name appears in red and a tooltip displays the validation error message.
   */
  const isSubFactionValid = () => {
    let tempObj = { ...validatedSubFaction };

    contextArmy.blockedUnits.subFactionBelowMinimum.forEach((sF) => {
      if (sF.underMinimum.includes(props.subFaction)) {
        tempObj = { ...tempObj, valid: false, validationMessage: sF.message };
      }
    });

    setValidatedSubFaction({ ...tempObj });
  };

  return contextArmy ? (
    <ListItem key={uuidGenerator()}>
      <Grid container direction={"column"} key={uuidGenerator()}>
        {validatedSubFaction.valid ? (
          <ValidHeader subFaction={validatedSubFaction.subFactionName} />
        ) : (
          <InvalidHeader subFaction={validatedSubFaction.subFactionName} message={validatedSubFaction.validationMessage} />
        )}
        {/* DISPLAY UNITS, PONT COST, PERCENTAGES FOR ONE SUBFACTION */}
        <SubList
          key={uuidGenerator()}
          subFactionUnits={filterUnitsForSubFaction(contextArmy.addedUnits, props.subFaction)} //
          subFactionName={props.subFaction}
        />
      </Grid>
    </ListItem>
  ) : null;
};

export default SubFactionEntry;
