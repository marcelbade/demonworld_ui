// React
import React from "react";
// Material UI
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
// functions and components
import LandingPageNaviButton from "./LandingPageNaviButton";
import { LANDINGPAGE } from "../../constants/textsAndMessages";

const useStyles = makeStyles((theme) => ({
  homePage: {
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
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  const buttons = [
    { relativURL: "/compendium", icon: bookIcon, altText: LANDINGPAGE.COMPENDIUM },
    { relativURL: "/listGenerator", icon: calculatorIcon, altText: LANDINGPAGE.LIST_GENERATOR },
    { relativURL: "/lossCalculator", icon: deathIcon, altText: LANDINGPAGE.LOSS_CALCULATOR },
  ];

  return (
    <Grid
      container //
      justifyContent="center"
      alignContent="center"
      className={classes.homePage}
    >
      {buttons.map((b) => (
        <LandingPageNaviButton
          relativURL={b.relativURL} //
          icon={b.icon}
          altText={b.altText}
        />
      ))}
    </Grid>
  );
};

export default LandingPage;
