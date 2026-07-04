// React
import { useContext } from "react";
// Material UI
import { Grid } from "@mui/material";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
import scrollIcon from "../../assets/icons/scroll.png";
import spellbookIcon from "../../assets/icons/spellbook.png";
import customRedGameIcon from "../../assets/icons/logo_red.png";
// functions and components
import NavigationButton from "../shared/navigation/NavigationButton";
import UserAccountDialog from "../Login/UserAccountDialog";
// contexts
import { UserContext } from "../../contexts/userContext";
// constants
import { LANDINGPAGE } from "../../constants/textsAndMessages";
import TopMenuDrawer from "../shared/TopMenuDrawer";
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";
import ChangePasswordsDialog from "../Dialogs/ChangePasswordsDialog/ChangePasswordsDialog";

const LandingPage = () => {
  const UC = useContext(UserContext);

  const displaySize = useCustomMediaQuery();

  const naviButtons = [
    {
      text: LANDINGPAGE.COMPENDIUM, //
      relativeURL: "/compendium",
      icon: bookIcon,
      display: true,
    },
    {
      text: LANDINGPAGE.LIST_GENERATOR, //
      relativeURL: "/listGenerator",
      icon: calculatorIcon,
      display: true,
    },
    {
      text: LANDINGPAGE.LOSS_CALCULATOR, //
      relativeURL: "/lossCalculator",
      icon: deathIcon,
      display: true,
    },
    {
      text: LANDINGPAGE.CARD_CREATOR, //
      relativeURL: "/cardCreator",
      icon: scrollIcon,
      display: UC.userLoggedIn,
    },
    {
      text: LANDINGPAGE.MAGIC, //
      relativeURL: "/spellCompendium",
      icon: spellbookIcon,
      display: true,
    },
  ];

  return (
    <Grid
      container //
      direction="column"
      sx={{
        width: "100%", //
        height: "100%",
      }}
    >
      <Grid container>
        <TopMenuDrawer
          displayPageTitle={false} //
          title={null}
          hasLogo={true}
          logoWidth={displaySize.isTinyDisplay ? "250px" : "350px"}
          logo={customRedGameIcon}
          drawerVariant="permanent"
          displayNaviBttn={false}
        />
      </Grid>
      <Grid
        container //
        direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        alignContent="center"
        justifyContent="center"
        spacing={{ xs: 10, md: 30 }}
        sx={{
          paddingTop: { xs: "5em", sm: "10em", md: "20em" },
        }}
      >
        {naviButtons.map((n, i) =>
          n.display ? (
            <NavigationButton
              key={i}
              displayNavigatonBttn={true}
              relativeURL={n.relativeURL} //
              isIconButton={!displaySize.isSmallDisplay}
              textButtonVariant="outlined"
              isCustomIcon={true}
              icon={n.icon}
              toolTipText={n.text}
              iconWidth="100px"
              iconHeight="100px"
              boxWidth="200px"
              boxHeight="200px"
            />
          ) : null,
        )}
      </Grid>
      <UserAccountDialog />
      <ChangePasswordsDialog/>
    </Grid>
  );
};

export default LandingPage;
