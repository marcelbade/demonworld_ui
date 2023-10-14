// React
import React from "react";
// Material UI
import ListItem from "@material-ui/core/ListItem";
import { Grid } from "@material-ui/core";
// components and functions
import SubFactionUnitList from "./NestedUnitList/SubFactionUnitList";
import ArmyListSubFactionHeader from "./ArmyListSubFactionHeader";
// constants
import ArmyListSubFactionFooter from "./ArmyListSubFactionFooter";

// Creates the suFaction entry of the army list: Head and current and total points.
const ArmyListSubFactionEntry = (props) => {
  return (
    <ListItem>
      <Grid container direction={"column"}>
        <Grid item>
          <ArmyListSubFactionHeader
            subFaction={props.subFaction} //
            valid={props.valid}
            message={props.mesage}
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
