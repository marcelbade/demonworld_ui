/**
 * File contains the picture / place holder shown when no army is selected
 *
 */

// React
import React from "react";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  message: {
    fontSize: "50px",
    fontFamily: "BreatheOfFire",
    display: "block",
  },
});

const NoSelectionDisplay = (props) => {
  const classes = useStyles();

  return <span className={classes.message}>show this when nothing was selected :D</span>;
};

export default NoSelectionDisplay;
