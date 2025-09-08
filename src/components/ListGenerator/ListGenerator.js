// react
import { useContext } from "react";
// material ui
import { Grid2 as Grid, Box } from "@mui/material";
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
import TopDrawerButton from "../shared/TopDrawerButton";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";

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
      {/* display after an army was selected */}
      <Grid
        container
        size={12} //
        direction="column"
        alignContent={"center"}
        justifyContent={"center"}
        sx={{
          overflowY: "hidden", //
          overflowX: "hidden",
        }}
      >
        <CollapsableTopMenuDrawer
          displayPageTitle={false}
          title={""} //
          displayNaviBttn={true}
          displayListBttns={true}
        />
        <TopDrawerButton />
      </Grid>

      <Grid
        container //
        direction="row"
      >
        <ArmySelectionBox />
        <ArmyListBox />
        <MenuBox />
      </Grid>
    </>
  );
};

export default ListGenerator;
