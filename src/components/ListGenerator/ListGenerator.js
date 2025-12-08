// react
import { useContext, useState } from "react";
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
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// custom hooks
import UseRightSideMenuController from "../../customHooks/UseRightSideMenuController";
import BackToTopContainer from "../shared/BackToTopContainer";

const ListGenerator = () => {
  const AC = useContext(ArmyContext);

  const [openArmySelectionBox, setOpenArmySelectionBox] = useState(true);

  const toggleUnitTree = () => {
    setOpenArmySelectionBox((prevState) => !prevState);
  };

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
    <BackToTopContainer>
      <Grid
        container //
        size={12}
        direction="row"
      >
        <Grid
          container //
          size={3}
        >
          <ArmySelectionBox
            openArmySelectionBox={openArmySelectionBox} //
            toggleUnitTree={toggleUnitTree}
          />
        </Grid>
        <Grid
          container //
          size={6}
          direction="column"
          alignContent="center"
        >
          {/* <CollapsableTopMenuDrawer
            displayPageTitle={false}
            title={""} //
            displayNaviBttn={true}
            displayListBttns={true}
          />
          <TopDrawerButton /> */}
          <ArmyListBox />
        </Grid>
        <Box sx={setArmySelectorBoxStyle()}>
          <ArmySelectorDropdown />
        </Box>

        <Grid
          container
          alignContent="start"
          justifyContent="end"
          spacing={5}
          sx={{
            paddingRight: "4em",
            paddingTop: "2em",
          }}
          size={3}
        >
          <IconButton onClick={toggleUnitTree}>
            <FormatListBulletedIcon fontSize="large" color="error" />
          </IconButton>

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
    </BackToTopContainer>
  );
};

export default ListGenerator;
