// React
import { useContext } from "react";
// Material UI
import { Grid2 as Grid, Stack } from "@mui/material";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
import scrollIcon from "../../assets/icons/scroll.png";
// functions and components
import NavigationButton from "../shared/navigation/NavigationButton";
import UserAccountDrawer from "../Login/UserAccountDrawer";
// contexts
import { UserContext } from "../../contexts/userContext";
// constants
import { LANDINGPAGE } from "../../constants/textsAndMessages";
import TopMenuDrawer from "../shared/TopMenuDrawer";

const LandingPage = () => {
  const UC = useContext(UserContext);

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
      icon: scrollIcon,
      display: true,
    },
  ];

  return (
    <Grid
      container //
      direction="column"
      sx={{
        width: "100vw", //
        height: "100vh",
      }}
    >
      <TopMenuDrawer
        displayPageTitle={true}
        title={LANDINGPAGE.TITLE}
        drawerVariant="permanent" //
        displayNaviBttn={false}
      />

      <Stack
        direction="row" //
        spacing={20}
        sx={{
          paddingTop: "20em",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {naviButtons.map((n, i) =>
          n.display ? (
            <NavigationButton
              key={i}
              displayNavigatonBttn={true}
              relativeURL={n.relativeURL} //
              isIconButton={true}
              isCustomIcon={true}
              icon={n.icon}
              toolTipText={n.text}
              iconWidth="100px"
              iconHeight="100px"
              boxWidth="200px"
              boxHeight="200px"
            />
          ) : null
        )}
      </Stack>

      <UserAccountDrawer />
    </Grid>
  );
};

export default LandingPage;
