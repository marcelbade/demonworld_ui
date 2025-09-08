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
      {props.displayPageTitle ? (
        <Grid size={4}>
          <Typography variant="h3">{props.title}</Typography>
        </Grid>
      ) : null}
      <Grid
        container
        size={4} //
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <NavigationButton
          displayNavigatonBttn={props.displayNaviBttn}
          relativeURL={"/"} //
          isIconButton={true}
          isCustomIcon={false}
          icon={<ChevronLeft />}
          toolTipText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
          altText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
        />
      </Grid>
      <Grid
        container //
        justifyContent="end"
        alignContent="center"
        size={4}
      >
        <SettingsButton />
        <UserLogButton
          buttonWidth={"2em"}
          buttonHeight={"2em"}
          iconSize={"large"} //
        />
      </Grid>
      <LoginDialog />
      <SettingsMenu />
    </Grid>
  );
};

export default TopMenuDrawer;
