// react
import { useContext, useState } from "react";
// material ui
import { Grid2 as Grid, Box, IconButton, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import ArmyListBox from "./ArmyListView/ArmyListBox";
import MenuBox from "./RightSideMenus/MenuBox";
import ArmyListDrawer from "./ArmySelectorView/ArmyListDrawer";
import ArmySelectorDropdown from "./ArmySelectorView/ArmySelectorDropdown";
import BackToTopContainer from "../shared/BackToTopContainer";
// context
import { ArmyContext } from "../../contexts/armyContext";
// constants
import { NONE } from "../../constants/factions";
import TopDrawerButton from "../shared/TopDrawerButton";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
//  icons
import MenuIcon from "@mui/icons-material/Menu";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import customRedGameIcon from "../../assets/icons/logo_red.png";
// custom hooks
import UseRightSideMenuController from "../../customHooks/UseRightSideMenuController";
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";

/**
 * JSX component returns List generator page. page contains all
 * functionality to display, create, load, update and store army lists
 * as well as print them as PDFs and txt files.
 * @returns a JSX component.
 */
const ListGenerator = () => {
  const AC = useContext(ArmyContext);

  const displaySize = useCustomMediaQuery();

  const [openArmySelectionBox, setOpenArmySelectionBox] = useState(true);

  const toggleUnitTree = () => {
    setOpenArmySelectionBox((prevState) => !prevState);
  };

  const theme = useTheme();

  /**
   * Create button for options menu using the custom controller
   */
  const sideMenuController = UseRightSideMenuController(
    {}, //
    "",
    {
      displayCard: false,
      displayItemShop: false,
      secondSubFaction: false,
      displayOptionButtons: true,
    },
  );

  /**
   * Functions conditionally returns different CSS stylings
   * for the army selection dropdown. Ocne the an army is selected,
   * a fade animation is added and executed.
   *
   * @returns CSS in form of a plain object.
   */
  const setArmySelectorBoxStyle = () => {
    const selectionWidth = { width: { xs: "75%", md: "25%" } };
    return AC.selectedFactionName === NONE //
      ? { ...selectionWidth }
      : { ...selectionWidth, ...theme.palette.animation.fadeAway };
  };

  return (
    <>
      <Grid
        container //
        direction="row"
        justifyContent="center"
        size={12}
      >
        <CollapsableTopMenuDrawer
          displayPageTitle={true} //
          title={""}
          logo={customRedGameIcon}
          hasLogo={true}
          displayNaviBttn={true}
          displayListBttns={true}
          logoWidth={displaySize.isTinyDisplay ? "250px" : "350px"}
        />
        <TopDrawerButton />
      </Grid>

      <BackToTopContainer>
        {/* drawers */}
        <ArmyListDrawer
          openArmySelectionBox={openArmySelectionBox} //
          toggleUnitTree={toggleUnitTree}
        />
        <MenuBox />
        {/* page */}
        <Grid
          container //
          direction="column"
        >
          <Stack
            direction="row" //
            sx={{ position: "fixed", right: "5em" }}
          >
            <IconButton onClick={toggleUnitTree}>
              <FormatListBulletedIcon fontSize="large" color="error" />
            </IconButton>
            <IconButton onClick={sideMenuController.buttons[0].action}>
              <MenuIcon fontSize="large" color="error" />
            </IconButton>
          </Stack>
          <Grid
            container //
            direction="column"
            alignContent={{ xs: "flex-start", md: "center" }}
          >
            <ArmyListBox />
            <Box sx={setArmySelectorBoxStyle()}>
              <ArmySelectorDropdown />
            </Box>
          </Grid>
        </Grid>
      </BackToTopContainer>
    </>
  );
};

export default ListGenerator;
