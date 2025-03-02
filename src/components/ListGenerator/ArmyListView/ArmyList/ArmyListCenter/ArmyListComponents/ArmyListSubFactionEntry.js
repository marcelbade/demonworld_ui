// React
import React, { useContext, useState } from "react";
// Material UI
import ListItem from "@mui/material/ListItem";
import {  Grid2 as Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
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

  const theme = useTheme();

  const [fadeAwayFlag, setFadeAwayFlag] = useState(false);

  const fadeOutFunc = () => {
    if (props.units.length === 0) {
      setFadeAwayFlag(true);
    }
  };

  /**
   * Function checks if a sub Faction should be displayed in the army list
   * @returns true, if the subFaction either is not empty or is blow the minimum points
   * needed to make the list valid.
   */
  const displaySubFaction = () => {
    return props.units.length !== 0 || !props.valid;
  };

  return (
    <ListItem //
      key="subfactionEntry"
      sx={displaySubFaction() ? { display: "block" } : { display: "none" }}
    >
      <Grid
        container //
        direction="column"
        sx={{
          ...(fadeAwayFlag //
            ? theme.palette.animation.fadeAway
            : theme.palette.animation.fadeIn),
          minWidth: "30em",
        }}
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
          fadeOutFunc={fadeOutFunc}
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
