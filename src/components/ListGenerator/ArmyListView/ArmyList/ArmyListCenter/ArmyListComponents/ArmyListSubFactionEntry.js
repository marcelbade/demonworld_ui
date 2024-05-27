// React
import React, { useContext } from "react";
// Material UI
import ListItem from "@mui/material/ListItem";
import { Grid } from "@mui/material";
// components and functions
import SubFactionUnitList from "./NestedUnitList/SubFactionUnitList";
import ArmyListSubFactionHeader from "./ArmyListSubFactionHeader";
// context
import { ListDisplayContext } from "../../../../../../contexts/ListDisplayContext";
// constants
import ArmyListSubFactionFooter from "./ArmyListSubFactionFooter";

// Creates the suFaction entry of the army list: Head and current and total points.
const ArmyListSubFactionEntry = (props) => {
  const LDC = useContext(ListDisplayContext);

  return (
    <ListItem //
      key="subfactionEntry"
    >
      <Grid
        container //
        direction="column"
      >
        {LDC.simpleModeOn ? null : (
          <ArmyListSubFactionHeader
            subFaction={props.subFaction} //
            valid={props.valid}
            message={props.message}
          />
        )}
        <SubFactionUnitList
          subFactionUnits={props.units} //
          subFactionName={props.subFaction}
        />
        {LDC.simpleModeOn ? null : (
          <ArmyListSubFactionFooter
            subFactionName={props.subFaction} //
            subFactionUnits={props.units}
          />
        )}
      </Grid>
    </ListItem>
  );
};

export default ArmyListSubFactionEntry;
