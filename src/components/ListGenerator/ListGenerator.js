// react
import { useContext } from "react";
// material ui
import { Grid2 as Grid, Box, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import ArmyListBox from "./ArmyListView/ArmyListBox";
import MenuBox from "./RightSideMenus/MenuBox";
import ArmySelectionBox from "./ArmySelectorView/ArmySelectionBox";
import ArmySelectorDropdown from "./ArmySelectorView/ArmySelectorDropdown";
// context
import { ArmyContext } from "../../contexts/armyContext";
// constants
import { NONE } from "../../constants/factions";
import TopMenuDrawer from "../shared/TopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";

const ListGenerator = () => {
  const AC = useContext(ArmyContext);

  const theme = useTheme();

  const factionSelectorStyle = {
    position: "absolute", //
    top: "30%",
    left: "35%",
    width: "30em",
  };

  /**
   * Functions conditionally returns different CSS stylings
   * for the army selection dropdown. Ocne the an army is selected,
   * a fade animation is added and executed.
   *
   * @returns CSS in form of a plain object.
   */
  const setArmySelectorBoxStyle = () => {
    return AC.selectedFactionName === NONE //
      ? factionSelectorStyle
      : { ...factionSelectorStyle, ...theme.palette.animation.fadeAway };
  };

  return (
    // display this first, if no army is selected
    <>
      <Box sx={setArmySelectorBoxStyle()}>
        <ArmySelectorDropdown />
      </Box>

      {/* display after army was selected */}
      <TopMenuDrawer
        title={"AA"} //
        drawerVariant="temporary" //
        displayNaviBttn={true}
        displayListBttns={true}
      />
      <Grid
        direction="column" //
        alignContent="flex-start"
      >
        <Box sx={{marginTop:"1em", marginBottom:"1em"}}>
          <TopDrawerButton />
        </Box>
        <ArmySelectionBox />
      </Grid>
      <ArmyListBox />
      <MenuBox />
    </>
  );
};

export default ListGenerator;
