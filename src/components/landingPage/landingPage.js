// React
import React from "react";
import { Link, useHistory } from "react-router-dom";
// Material UI
import { IconButton, Grid, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import deathIcon from "../../icons/icons8-death-64.png";
import calculatorIcon from "../../icons/icons8-calculator-64.png";
import bookIcon from "../../icons/icons8-book-64.png";

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

  iconContainer: {
    width: "20em",
    height: "20em",
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
      width: "20em",
      height: "20em",
    },
    [theme.breakpoints.down("md")]: {
      width: "10em",
      height: "10em",
    },
  },
  mobileToolTip: {
    fontFamily: "NotMaryKate",
    fontSize: "15px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {},
  },

  tooltipText: {
    fontFamily: "NotMaryKate",
    fontSize: "20px",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const toLossCalculator = () => {
    history.push({
      pathname: "/lossCalculator",
      state: {
        lastPage: "landingPage",
        selectedArmy: [],
      },
    });
  };

  return (
    <Grid container justify="center" alignContent="center" className={classes.homePage}>
      <Grid item className={classes.iconContainer}>
        <Tooltip title={<Typography className={classes.tooltipText}>Kompendium</Typography>}>
          <IconButton component={Link} to="/compendium">
            <img src={bookIcon} alt="Kompendium" height={100} width={100} />
          </IconButton>
        </Tooltip>
        <Typography className={classes.mobileToolTip}>compendium</Typography>
      </Grid>
      <Grid item className={classes.iconContainer}>
        <Tooltip title={<Typography className={classes.tooltipText}>Armeelistengenerator</Typography>}>
          <IconButton component={Link} to="/listGenerator">
            <img src={calculatorIcon} alt="Armeelistengenerator" height={100} width={100} />
          </IconButton>
        </Tooltip>
        <Typography className={classes.mobileToolTip}>Armeelistengenerator</Typography>
      </Grid>
      <Grid item className={classes.iconContainer}>
        <Tooltip title={<Typography className={classes.tooltipText}>Verlustrechner</Typography>}>
          <IconButton
            onClick={() => {
              toLossCalculator();
            }}
          >
            <img src={deathIcon} alt="Verlustrechner" height={100} width={100} />
          </IconButton>
        </Tooltip>
        <Typography className={classes.mobileToolTip}>Verlustrechner</Typography>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
