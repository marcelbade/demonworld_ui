// React
import React, { useContext, useState } from "react";
// Material UI
import ListItem from "@mui/material/ListItem";
import { Grid } from "@mui/material";
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

  return (
    <ListItem //
      key="subfactionEntry"
      sx={props.units.length === 0 && !fadeAwayFlag ? { display: "none" } : { display: "block" }}
    >
      <Grid
        container //
        direction="column"
        sx={
          fadeAwayFlag //
            ? theme.palette.animation.fadeAway
            : theme.palette.animation.fadeIn
        }
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
