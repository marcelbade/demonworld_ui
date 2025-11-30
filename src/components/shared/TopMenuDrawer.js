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
      direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
      alignContent={{ xs: "center", sm: "center", md: "", lg: "center" }}
      alignItems={{ xs: "center", sm: "center", md: "", lg: "center" }}
      sx={{
        height: "10%",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <Grid
        size={4} //
        sx={{
          paddingTop: "1em",
          paddingLeft: { md: "3em" },
          backgroundColor: "black",
          width: { xs: "100%", sm: "100%", md: "30%" },
        }}
      >
        {props.displayPageTitle ? ( //
          <Typography variant="h3">{props.title}</Typography>
        ) : null}
        {props.hasLogo ? ( //
          <img
            src={props.logo} //
            alt={props.title}
            width={props.logoWidth}
            height={props.logoHeight}
          />
        ) : null}
      </Grid>

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
        direction={{ xs: "column-reverse", sm: "column", md: "row", lg: "row" }}
        justifyContent={{ xs: "center", sm: "center", md: "end" }}
        justifyItems={{ xs: "center", sm: "center", md: "end" }}
        alignContent={{ xs: "center", sm: "center", md: "end" }}
        size={4}
        spacing={{ md: 8, lg: 8 }}
        sx={{
          paddingTop: "1em",
          paddingRight: { md: "3em" },
          width: { xs: "100%", sm: "100%", md: "30%", lg: "30%" },
        }}
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
