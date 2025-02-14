/**
 * File contains the picture / place holder shown when no army is selected
 *
 */

// React
import React from "react";

const NoSelectionDisplay = (props) => {
  const theme = useTheme();

  return <span sx={classes.message}>show this when nothing was selected :D</span>;
};

export default NoSelectionDisplay;
