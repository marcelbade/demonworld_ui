// React
import React from "react";
// Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
// functions and components
import LandingPageNaviButton from "./LandingPageNaviButton";

const useStyles = makeStyles((theme) => ({
  homePage: {
    width: "100vw",
    height: "100vh",

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
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

  return (
    <Grid container justifyContent="center" alignContent="center" className={classes.homePage}>
      <LandingPageNaviButton relativeURL={"/compendium"} icon={bookIcon} altText={"Kompendium"} />
      <LandingPageNaviButton relativeURL={"/listGenerator"} icon={calculatorIcon} altText={"ListenGenerator"} />
      <LandingPageNaviButton relativeURL={"/lossCalculator"} icon={deathIcon} altText={"Verlustrechner"} />
    </Grid>
  );
};

export default LandingPage;
