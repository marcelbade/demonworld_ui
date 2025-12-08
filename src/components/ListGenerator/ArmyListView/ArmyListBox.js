// React
import { useContext } from "react";
// components and functions
import ArmyListBoxCenter from "./ArmyList/ArmyListCenter/ArmyListBoxCenter";
// import ArmyListBoxFooter from "./ArmyList/ArmyListFooter/ArmyListBoxFooter";
import { Grid2 as Grid } from "@mui/material";
// context
import { AlternativeListContext } from "../../../contexts/alternativeListContext";
import { NONE } from "../../../constants/factions";
import { ArmyContext } from "../../../contexts/armyContext";

const ArmyListBox = () => {
  const ALC = useContext(AlternativeListContext);
  const AC = useContext(ArmyContext);

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

  return isSelectionComplete() && AC.selectedFactionName !== NONE ? (
    <Grid
      container //
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        overflowY: "auto",
        overflowX:"hidden"
      }}
    >
    
      <ArmyListBoxCenter />
    </Grid>
  ) : null;
};

export default ArmyListBox;
