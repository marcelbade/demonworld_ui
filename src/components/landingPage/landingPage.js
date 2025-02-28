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
        <NaviButton
          relativeURL={"/compendium"} //
          isIconButton={true}
          isCustomIcon={true}
          icon={bookIcon}
          text={LANDINGPAGE.COMPENDIUM}
          width={"20em"}
          height={"20em"}
        />
        <NaviButton
          relativeURL={"/listGenerator"} //
          isIconButton={true}
          isCustomIcon={true}
          icon={calculatorIcon}
          text={LANDINGPAGE.LIST_GENERATOR}
          width={"20em"}
          height={"20em"}
        />
        <NaviButton
          relativeURL={"/lossCalculator"} //
          isIconButton={true}
          isCustomIcon={true}
          icon={deathIcon}
          text={LANDINGPAGE.LOSS_CALCULATOR}
          width={"20em"}
          height={"20em"}
        />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
