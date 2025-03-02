// React
import React from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
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
  ];

  return (
    <Grid container direction="row">
      <Grid
        container //
        item
        xs={12}
        justifyContent="space-between"
        alignContent="center"
      >
        <Grid
          item //
          sx={{ marginLeft: "1em" }}
        >
          <Typography variant="h3">{LANDINGPAGE.TITLE}</Typography>
        </Grid>
        <Grid
          container
          item //
          justifyContent="space-between"
          direction={"row"}
          alignContent="center"
          sx={{
            paddingTop: "2px",
            marginRight: "20px",
            height: "5vh",
            width: "10em",
          }}
        >
          <LightSwitch iconSize={"large"} />
          <LogInButton iconSize={"large"} />
        </Grid>
      </Grid>
      <LoginPrompt />
      <Grid
        container //
        item
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
