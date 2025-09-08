// mui
import { Grid2 as Grid, Typography } from "@mui/material";
// components and functions
import SettingsButton from "./settings/SettingsButton";
import SettingsMenu from "./settings/SettingsMenu";
import UserLogButton from "../Login/UserLogButton";
import NavigationButton from "./navigation/NavigationButton";
import LoginDialog from "../Dialogs/LogInDialog/LogInDialog";
// icons
import { ChevronLeft } from "@mui/icons-material";
// constants
import { LANDINGPAGE } from "../../constants/textsAndMessages";

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
  return (
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
      ></Grid>
      <Grid
        container
        size={3} //
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        {props.displayNaviBttn ? (
          <NavigationButton
            relativeURL={"/"} //
            isIconButton={true}
            isCustomIcon={false}
            icon={<ChevronLeft />}
            toolTipText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
            altText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
          />
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
  );
};

export default TopMenuDrawer;
