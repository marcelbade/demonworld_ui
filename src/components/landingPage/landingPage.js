// React
import React from "react";
// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
// functions and components
import NaviButton from "./NaviButton";
import { LANDINGPAGE } from "../../constants/textsAndMessages";
import LightSwitch from "../shared/LightSwitch";
import LogInButton from "../Login/LogInButton";
import LoginPrompt from "../Login/LogInPrompt";

const LandingPage = () => {
  const naviButtons = [
    { text: LANDINGPAGE.COMPENDIUM, relativeURL: "/compendium", icon: bookIcon },
    { text: LANDINGPAGE.LIST_GENERATOR, relativeURL: "/listGenerator", icon: calculatorIcon },
    { text: LANDINGPAGE.LOSS_CALCULATOR, relativeURL: "/lossCalculator", icon: deathIcon },
    // remove in production for now
    { text: LANDINGPAGE.CARD_CREATOR, relativeURL: "/cardCreator", icon: deathIcon },
  ];

  return (
    <Grid
      container //
      direction="row"
    >
      <Grid
        container //
        justifyContent={"space-between"}
        sx={{
          width: "100%",
          height: "3em",
        }}
      >
        <Typography variant="h3">{LANDINGPAGE.TITLE}</Typography>
        <Grid
          container
          justifyContent={"space-between"} //
          size={0.5}
        >
          <LightSwitch iconSize={"large"} />
          <LogInButton iconSize={"large"} />
        </Grid>
      </Grid>
      <LoginPrompt />
      <Grid
        container //
        justifyContent="center"
        alignContent="center"
        sx={{
          height: "80vh",
          width: "100vw",
        }}
      >
        {naviButtons.map((n, i) => (
          <NaviButton
            key={i}
            relativeURL={n.relativeURL} //
            isIconButton={true}
            isCustomIcon={true}
            icon={n.icon}
            text={n.text}
            width={"20em"}
            height={"20em"}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default LandingPage;
