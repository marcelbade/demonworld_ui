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
      justifyContent="center"
      alignItems="flex-start"
    >
      <ArmyListBoxHeader />
      <ArmyListBoxCenter />
      <ArmyListBoxFooter />
    </Grid>
  ) : null;
};

export default ArmyListBox;
