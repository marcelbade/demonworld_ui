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
import NaviButton from "./NaviButton";
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
  ];

  return (
    <Grid
      container //
      direction="column"
      // spacing={10}
      sx={{
        width: "100vw", //
        height: "100vh",
      }}
    >
      <TopMenuDrawer
        drawerVariant="permanent" //
        title={LANDINGPAGE.TITLE}
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
            <NaviButton
              key={i}
              relativeURL={n.relativeURL} //
              isIconButton={true}
              isCustomIcon={true}
              icon={n.icon}
              toolTipText={n.text}
            />
          ) : null
        )}
      </Stack>

      <UserAccountDrawer />
    </Grid>
  );
};

export default LandingPage;
