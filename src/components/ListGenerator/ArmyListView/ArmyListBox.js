// React
import React, { useContext } from "react";
// components and functions
import ArmyListBoxHeader from "./ArmyList/ArmyListHeader/ArmyListBoxHeader";
import ArmyListBoxCenter from "./ArmyList/ArmyListCenter/ArmyListBoxCenter";
import ArmyListBoxFooter from "./ArmyList/ArmyListFooter/ArmyListBoxFooter";
import { Grid } from "@mui/material";
// context
import { AlternativeListContext } from "../../../contexts/alternativeListContext";

const ArmyListBox = () => {
  const ALC = useContext(AlternativeListContext);

  /**
   * Function checks if the user is done selecting an army,
   * by checking if this army has alternative lists. If that's the case
   * the flag altArmyListSelectionComplete is returned, otherwise it defaults to true.
   * If true, the component is displayed.
   * @returns true, if selection is complete.
   */
  const isSelectionComplete = () => {
    return ALC.armyHasAlternativeLists ? ALC.altArmyListSelectionComplete : true;
  };

  return isSelectionComplete() ? (
    <Grid
      container //
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
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
