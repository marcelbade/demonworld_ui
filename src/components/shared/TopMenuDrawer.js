// mui
import { Box, Drawer, Grid2 as Grid, IconButton, Typography } from "@mui/material";
// components and functions
import SettingsButton from "./settings/SettingsButton";
import SettingsMenu from "./settings/SettingsMenu";
import UserLogButton from "../Login/UserLogButton";
import NaviButton from "../landingPage/NaviButton";
import LoginDialog from "../Dialogs/LogInDialog/LogInDialog";
import BackToSelectionButton from "./BackToSelectionButton";
import DeleteArmyListButton from "./DeleteArmyListButton";
// icons
import { ChevronLeft } from "@mui/icons-material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
// constants
import { LANDINGPAGE } from "../../constants/textsAndMessages";
import { useContext } from "react";
import { MenuContext } from "../../contexts/MenuContext";

/**
 * This JSX component displays the main menu.
 * It contains the following components:
 * - page title
 * - NaviButton (conditionally)
 * - delete army list button (conditionally)
 * - change army selection button (conditionally)
 * - SettingsButton
 * - UserLogButton
 * @param {props}
 * - drawerVariant: "permanent"|"persistent"|"temporary"
 * - title: string
 * - displayNaviBttn: boolean
 * @returns JSX
 */
const TopMenuDrawer = (props) => {
  const MC = useContext(MenuContext);

  console.log("MC.openTopMenuDrawer>>>>>> >>",MC.openTopMenuDrawer)

  return (
    <Drawer
      anchor={"top"} //
      variant={props.drawerVariant}
      open={MC.openTopMenuDrawer}
    >
      <Grid
        container //
        size={12}
        direction="row"
        sx={{
          height: "5em",
        }}
      >
        <Grid size={4}>
          <Typography variant="h3">{props.title}</Typography>
        </Grid>
        <Grid
          size={4} //
          justifyContent="flex-end"
          alignContent="center"
        >
          <IconButton
            onClick={() => {
              MC.setOpenTopMenuDrawer((prevState) => !prevState);
            }}
          >
            <KeyboardDoubleArrowUpIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid
          container
          size={3} //
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {props.displayNaviBttn ? (
            <NaviButton
              relativeURL={"/"} //
              isIconButton={true}
              isCustomIcon={false}
              icon={<ChevronLeft />}
              toolTipText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
              altText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
            />
          ) : null}
          {props.displayListBttns ? (
            <>
              <BackToSelectionButton />
              <DeleteArmyListButton />
            </>
          ) : null}
          <Grid size={2}>
            <SettingsButton />
          </Grid>
          <Grid size={2}>
            <UserLogButton
              buttonWidth={"2em"}
              buttonHeight={"2em"}
              iconSize={"large"} //
            />
          </Grid>
        </Grid>

        <LoginDialog />
        <SettingsMenu />
      </Grid>
    </Drawer>
  );
};

export default TopMenuDrawer;
