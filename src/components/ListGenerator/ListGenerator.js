// react
import { useContext } from "react";
// material ui
import { Grid2 as Grid, Box, IconButton } from "@mui/material";
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
//  icons
import MenuIcon from "@mui/icons-material/Menu";
import UseRightSideMenuController from "../../customHooks/UseRightSideMenuController";

const ListGenerator = () => {
  const AC = useContext(ArmyContext);

  const theme = useTheme();

  const sideMenuController = UseRightSideMenuController(
    {}, //
    "",
    {
      displayCard: false,
      displayItemShop: false,
      secondSubFaction: false,
      displayOptionButtons: true,
    }
  );

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
    <Grid
      container //
      size={12}
      direction="row"
    >
      <Grid
        container //
        size={4}
      >
        <ArmySelectionBox />
      </Grid>
      <Grid
        container //
        size={4}
        direction="column"
        alignContent="center"
      >
        <CollapsableTopMenuDrawer
          displayPageTitle={false}
          title={""} //
          displayNaviBttn={true}
          displayListBttns={true}
        />
        <TopDrawerButton />
        <ArmyListBox />
      </Grid>
      <Box sx={setArmySelectorBoxStyle()}>
        <ArmySelectorDropdown />
      </Box>

      <Grid
        container
        alignContent="start"
        justifyContent="end"
        sx={{
          paddingRight: "4em",
          paddingTop: "2em",
        }}
        size={4}
      >
        {sideMenuController.buttons.map((b, i) => {
          return (
            <IconButton
              key={i} //
              onClick={b.action}
            >
              <MenuIcon fontSize="large" color="error" />
            </IconButton>
          );
        })}
      </Grid>
      <MenuBox />
    </Grid>
  );
};

export default ListGenerator;
