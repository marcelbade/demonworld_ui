// React
import React from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
// functions and components
import LandingPageNaviButton from "./LandingPageNaviButton";
import { LANDINGPAGE } from "../../constants/textsAndMessages";
import LightSwitch from "../shared/LightSwitch";

const LandingPage = () => {
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
          item //
          justifyContent="flex-end"
          alignContent="center"
          sx={{
            paddingTop: "2px",
            height: "5vh",
            width: "3vw",
          }}
        >
          <LightSwitch />
        </Grid>
      </Grid>

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
        <LandingPageNaviButton
          relativeURL={"/compendium"} //
          icon={bookIcon}
          altText={LANDINGPAGE.COMPENDIUM}
        />
        <LandingPageNaviButton
          relativeURL={"/listGenerator"} //
          icon={calculatorIcon}
          altText={LANDINGPAGE.LIST_GENERATOR}
        />
        {/* <LandingPageNaviButton
          relativeURL={"/lossCalculator"} //
          icon={deathIcon}
          altText={LANDINGPAGE.LOSS_CALCULATOR}
        /> */}
      </Grid>
    </Grid>
  );
};

export default LandingPage;
