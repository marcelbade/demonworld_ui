// React
import React, { useContext, useEffect, useState } from "react";
// Material UI
import ListItem from "@material-ui/core/ListItem";
import { Grid } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../../../contexts/armyContext";
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
import SubFactionUnitList from "./NestedUnitList/SubFactionUnitList";
import ArmyListSubFactionHeader from "./ArmyListSubFactionHeader";
// constants
import { ALLIES_MAPPING } from "../../../../../../constants/allies";
import ArmyListSubFactionFooter from "./ArmyListSubFactionFooter";

// Creates the suFaction entry of the army list: Head and current and total points.
const ArmyListSubFactionEntry = (props) => {
  const AC = useContext(ArmyContext);

  const [validatedSubFaction, setValidatedSubFaction] = useState({
    subFactionName: props.subFaction,
    valid: true,
    validationMessage: "",
  });

  useEffect(() => {
    isSubFactionValid();
  }, [AC.selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Filters the selected units by subFaction. If allied units have been selected, then their subFaction name is replaced with their faction name.
   * @param {[unitCard Objects]} allSelectedUnits
   * @param {String} subFaction
   * @returns
   */
  //TODO: The part where you replace the subfaction w. the faction name should be a separate function - and it should happen in a different file!
  const filterUnitsForSubFaction = (allSelectedUnits, subFaction) => {
    allSelectedUnits.forEach((u) => (u.faction === ALLIES_MAPPING[AC.selectedFactionName] ? (u.subFaction = u.faction) : null));

    return allSelectedUnits.filter((u) => u.subFaction === subFaction);
  };

  /**
   * Function checks for every sub faction with a minimum point allowance > 0 if the condition has been fullfilled. If not, the sub faction name appears in red and a tooltip displays the validation error message.
   */
  const isSubFactionValid = () => {
    let tempObj = { ...validatedSubFaction };

    AC.listValidationResults.subFactionBelowMinimum.forEach((sF) => {
      if (sF.subFactionUnderMinimum.includes(props.subFaction)) {
        tempObj = { ...tempObj, valid: false, validationMessage: sF.message };
      }
    });

    setValidatedSubFaction({ ...tempObj });
  };

  return AC ? (
    <ListItem>
      <Grid container direction={"column"}>
        <Grid item>
          <ArmyListSubFactionHeader
            subFaction={validatedSubFaction.subFactionName} //
            valid={validatedSubFaction.valid}
            message={validatedSubFaction.validationMessage}
          />
          <SubFactionUnitList
            subFactionUnits={filterUnitsForSubFaction(AC.selectedUnits, props.subFaction)} //
            subFactionName={props.subFaction}
          />
        </Grid>
        <Grid item>
          <ArmyListSubFactionFooter
            subFactionName={props.subFaction}
            subFactionUnits={filterUnitsForSubFaction(AC.selectedUnits, props.subFaction)}
          />
        </Grid>
      </Grid>
    </ListItem>
  ) : null;
};

export default ArmyListSubFactionEntry;
