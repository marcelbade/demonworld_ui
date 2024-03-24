// React
import React from "react";
// Material UI
import { Grid } from "@mui/material";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
// functions and components
import LandingPageNaviButton from "./LandingPageNaviButton";
import { LANDINGPAGE } from "../../constants/textsAndMessages";
import LightSwitch from "../shared/LightSwitch";
import { useTheme } from "@emotion/react";

const LandingPage = () => {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid
        container
        xs={12}
        item //
        justifyContent="flex-end"
        alignContent="center"
      >
        <Grid item sx={{ marginRight: "2em", marginTop: "1em" }}>
          <LightSwitch />
        </Grid>
      </Grid>
      <Grid
        container //
        item
        justifyContent="center"
        alignContent="center"
        sx={{
          width: "100vw",
          height: "100vh",

          [theme.breakpoints.up("md")]: {
            flexDirection: "row",
          },
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
            "@media (orientation:landscape)": {
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "1em",
            },
          },
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
        <LandingPageNaviButton
          relativeURL={"/lossCalculator"} //
          icon={deathIcon}
          altText={LANDINGPAGE.LOSS_CALCULATOR}
        />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
