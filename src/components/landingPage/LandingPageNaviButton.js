// React
import React from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { IconButton, Grid, Tooltip, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// Functions And Components
import CustomIcon from "../shared/statCards/CustomIcon";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    width: "20em",
    height: "20em",
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
      width: "20em",
      height: "20em",
    },
    [theme.breakpoints.down("lg")]: {
      width: "10em",
      height: "10em",
    },
  },
  mobileToolTip: {
    fontSize: "15px",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("lg")]: {},
  },

  tooltipText: {
    fontSize: "20px",
  },
}));

const LandingPageNaviButton = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const toPage = (relativeURL) => {
    history.push({
      pathname: relativeURL,
      state: {
        lastPage: "landingPage",
        selectedArmy: [],
      },
    });
  };

  return (
    <Grid item className={classes.iconContainer}>
      <Tooltip title={<Typography className={classes.tooltipText}>{props.altText}</Typography>}>
        <IconButton
          onClick={() => {
            toPage(props.relativeURL);
          }}
          size="large"
        >
          <CustomIcon
            icon={props.icon} //
            altText={props.altText}
            height={100}
            width={100}
          />
        </IconButton>
      </Tooltip>
      <Typography className={classes.mobileToolTip}>{props.altText}</Typography>
    </Grid>
  );
};

export default LandingPageNaviButton;
