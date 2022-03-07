/**
 * File contains the picture / place holder shown when no army is selected 
 * 
 */

// React
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    p: {
        fontSize:"50px",
        fontFamily: "BreatheOfFire",
    }
  });

  const NoSelectionDisplay = (props) => {
    const classes = useStyles();
  
    return (
        <div>
            <p>show this wehen nothing was selected :D</p>
        </div>
    );
  };
 
export default NoSelectionDisplay