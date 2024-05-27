// React
import React, { useContext } from "react";
// Material UI
// components and functions
import ArmyListBoxHeader from "./ArmyList/ArmyListHeader/ArmyListBoxHeader";
import { ArmyContext } from "../../../contexts/armyContext";
import ArmyListBoxCenter from "./ArmyList/ArmyListCenter/ArmyListBoxCenter";
import ArmyListBoxFooter from "./ArmyList/ArmyListFooter/ArmyListBoxFooter";
import { Grid } from "@mui/material";

const ArmyListBox = () => {
  const AC = useContext(ArmyContext);

  return AC ? (
    <Grid
      container //
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        
      }}
    >
      <Grid item>
        <ArmyListBoxHeader />
      </Grid>
      <Grid item>
        <ArmyListBoxCenter />
      </Grid>
      <Grid item>
        <ArmyListBoxFooter />
      </Grid>
    </Grid>
  ) : null;
};

export default ArmyListBox;
