// React
import React from "react";
//Material UI
import { Typography, Grid2 as Grid } from "@mui/material";
import { useTheme } from "@emotion/react";

const ListElementName = (props) => {
  const theme = useTheme();

  const STYLES = {
    padding: "1em", //
    wordWrap: "break-word",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    xs: "subtitle1",
    sm: "subtitle1",
    md: "h6",
  };

  /**
   * Function conditionally sets the unit name style:
   * the name is black if the unit suffered no losses, red w. losses
   * and red and crossed out if destroyed.
   * @returns an object with CSS values for Material UI.
   */
  const setStyles = () => {
    if (props.unit.lossCounter > 0 && !props.unit.unitDestroyed) {
      return {
        ...STYLES,
        color: theme.palette.errorColor,
      };
    } else if (props.unit.unitDestroyed)
      return {
        ...STYLES,
        color: theme.palette.errorColor,
        textDecorationLine: "line-through",
        textDecorationThickness: "0.1em",
      };
    else {
      return STYLES;
    }
  };

  return (
    <Grid>
      <Typography sx={setStyles()}>{props.unit.unitName}</Typography>
    </Grid>
  );
};

export default ListElementName;
