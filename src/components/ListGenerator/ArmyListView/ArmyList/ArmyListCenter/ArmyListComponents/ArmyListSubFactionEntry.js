// React
import React from "react";
// Material UI
import ListItem from "@mui/material/ListItem";
import { Grid } from "@mui/material";
// components and functions
import SubFactionUnitList from "./NestedUnitList/SubFactionUnitList";
import ArmyListSubFactionHeader from "./ArmyListSubFactionHeader";
// constants
import ArmyListSubFactionFooter from "./ArmyListSubFactionFooter";

// Creates the suFaction entry of the army list: Head and current and total points.
const ArmyListSubFactionEntry = (props) => {
  return (
    <ListItem //
      key="subfactionEntry"
    >
      <Grid container direction={"column"}>
        <Grid item>
          <ArmyListSubFactionHeader
            subFaction={props.subFaction} //
            valid={props.valid}
            message={props.message}
          />
          <SubFactionUnitList
            subFactionUnits={props.units} //
            subFactionName={props.subFaction}
          />
        </Grid>
        <Grid item>
          <ArmyListSubFactionFooter
            subFactionName={props.subFaction} //
            subFactionUnits={props.units}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ArmyListSubFactionEntry;
